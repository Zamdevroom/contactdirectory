import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { RECORD_API } from '../utils/api';
import { exportRecordsToCSV, ALL_FIELDS, logAction, getActionHistory } from '../utils/csvExport';
import Modal from './subpages/modal.jsx';
import ModalAddRecord from './subpages/ModalAddRecord.jsx';
import Sidebar from './subpages/Sidebar.jsx';
import Import from './subpages/import.jsx';
import Menu from './subpages/MenuOrdering.jsx';
import SearchCollections from './subpages/SearchCollections.jsx';
import './styles/recordpage.css';

const PAGE_SIZE = 10;
const DEFAULT_VISIBLE = ['person_job_title', 'person_personal_email', 'person_phone', 'person_city', 'company_name'];

const RecordPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [viewType, setViewType] = useState('grid');
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearch] = useState('');
  const [searchField, setSearchType] = useState('person_first_name');
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [maxPages, setMaxPages] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalAddRecord, setShowModalAddRecord] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showSearchCollections, setShowSearchCollections] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [visibleFields, setVisibleFields] = useState(DEFAULT_VISIBLE);
  const [activeCollection, setActiveCollection] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const paginate = (records, page) => {
    setMaxPages(Math.ceil(records.length / PAGE_SIZE) || 0);
    setFilteredData(records.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
  };

  const getData = async () => {
    try {
      const user = Cookies.get('user');
      const response = await axios.post(`${RECORD_API}/getRecords`, { user });
      setData(response.data);
      setPageNum(1);
      paginate(response.data, 1);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getFields = async () => {
    try {
      const user = Cookies.get('user');
      const response = await axios.post(`${RECORD_API}/getFields`, { user });
      setFields(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSortedRecords = async () => {
    try {
      const user = Cookies.get('user');
      const response = await axios.post(`${RECORD_API}/getSortedRecords`, {
        user, selectedField, isAscending,
      });
      setData(response.data);
      paginate(response.data, pageNum);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
    getFields();
  }, []);

  useEffect(() => {
    if (selectedField) getSortedRecords();
  }, [selectedField, isAscending]);

  const handlePageChange = (page) => {
    setPageNum(page);
    paginate(data, page);
  };

  const handleDelete = async (e, id_) => {
    e.preventDefault();
    if (!window.confirm('Delete this contact?')) return;
    try {
      await axios.post(`${RECORD_API}/deleteRecord`, { id: id_ });
      logAction('Deleted a contact');
      showToast('Contact deleted');
      await getData();
    } catch (error) {
      console.error(error);
      showToast('Failed to delete');
    }
  };

  const handleEdit = (e, id_) => {
    e.preventDefault();
    navigate('/editrecord', { state: id_ });
  };

  const searchData = async (e) => {
    if (e) e.preventDefault();
    if (!searchValue.trim()) {
      getData();
      return;
    }
    try {
      const user = Cookies.get('user');
      const response = await axios.post(`${RECORD_API}/searchRecords`, {
        searchField, searchValue, user,
      });
      setData(response.data);
      setPageNum(1);
      paginate(response.data, 1);
      logAction(`Searched by ${searchField}`);
      showToast(`Found ${response.data.length} result(s)`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExport = () => {
    if (!data.length) {
      showToast('No records to export');
      return;
    }
    exportRecordsToCSV(data);
    logAction(`Exported ${data.length} contacts`);
    showToast(`Exported ${data.length} contacts`);
  };

  const handleClean = async () => {
    const empty = data.filter((r) => !r.person_personal_email && !r.person_phone);
    if (!empty.length) {
      showToast('No empty contacts to clean');
      return;
    }
    if (!window.confirm(`Remove ${empty.length} contact(s) missing both email and phone?`)) return;
    try {
      await Promise.all(empty.map((r) => axios.post(`${RECORD_API}/deleteRecord`, { id: r._id })));
      logAction(`Cleaned ${empty.length} empty contacts`);
      showToast(`Removed ${empty.length} empty contact(s)`);
      await getData();
    } catch (error) {
      showToast('Clean failed');
    }
  };

  const handleCollectionFilter = async (listName) => {
    setActiveCollection(listName);
    if (!listName) {
      getData();
      return;
    }
    try {
      const user = Cookies.get('user');
      const response = await axios.post(`${RECORD_API}/searchRecords`, {
        searchField: 'list_name', searchValue: listName, user,
      });
      setData(response.data);
      setPageNum(1);
      paginate(response.data, 1);
      showToast(`Showing collection: ${listName}`);
    } catch (error) {
      console.error(error);
    }
  };

  const collections = [...new Set(data.map((r) => r.list_name).filter(Boolean))];

  const toggleVisibleField = (key) => {
    setVisibleFields((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const getContactName = (item) => {
    const name = [item.person_first_name, item.person_last_name].filter(Boolean).join(' ');
    return name || 'Unnamed Contact';
  };

  const LIST_COLUMNS = ['person_first_name', 'person_last_name', 'person_personal_email', 'person_phone', 'person_job_title', 'company_name', 'person_city'];

  if (loading) {
    return (
      <div className="record-page-loading">
        <div className="spinner" />
        <p>Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className={`record-page ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
      {toast && <div className="toast-notification">{toast}</div>}

      {isSidebarOpen && (
        <Sidebar
          toggleSearchCollections={() => setShowSearchCollections(true)}
          recordCount={data.length}
        />
      )}

      <SearchCollections
        show={showSearchCollections}
        onClose={() => setShowSearchCollections(false)}
        collections={collections}
        onSelectCollection={handleCollectionFilter}
      />

      <div className="record-main">
        <div className="record-toolbar">
          <div className="toolbar-left">
            <button className="toolbar-icon-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)} title="Toggle sidebar">
              {isSidebarOpen ? '◀' : '▶'}
            </button>
            <h1 className="toolbar-title">
              Contacts
              {activeCollection && <span className="collection-tag">{activeCollection}</span>}
            </h1>
            <span className="record-count">{data.length} total</span>
          </div>

          <form className="search-bar" onSubmit={searchData}>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchValue}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={searchField} onChange={(e) => setSearchType(e.target.value)}>
              {ALL_FIELDS.map((f) => (
                <option key={f.key} value={f.key}>{f.label}</option>
              ))}
            </select>
            <button type="submit" className="toolbar-btn toolbar-btn-primary">Search</button>
            <button type="button" className="toolbar-btn" onClick={() => { setSearch(''); setActiveCollection(''); getData(); }}>
              Reset
            </button>
          </form>
        </div>

        <div className="record-actions-bar">
          <div className="actions-left">
            <button className="action-btn action-btn-primary" onClick={() => setShowModalAddRecord(true)}>
              + New Contact
            </button>
            <button className="action-btn" onClick={() => setShowImport(true)}>
              Import CSV
            </button>
            <button className="action-btn" onClick={handleExport}>
              Export CSV
            </button>
            <button className="action-btn" onClick={handleClean}>
              Clean Empty
            </button>
          </div>
          <div className="actions-right">
            <Menu fields={fields} onSelectedField={setSelectedField} onIsAscending={setIsAscending} />
            <button className="action-btn action-btn-icon" title="Manage Fields" onClick={() => setShowModal(true)}>
              ⚙️
            </button>
            <button className="action-btn action-btn-icon" title="History" onClick={() => setShowHistory(!showHistory)}>
              🕐
            </button>
            <button
              className="action-btn"
              onClick={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}
            >
              {viewType === 'grid' ? '☰ List' : '⊞ Grid'}
            </button>
            <div className="more-menu-wrapper">
              <button className="action-btn action-btn-icon" onClick={() => setShowMoreMenu(!showMoreMenu)}>⋮</button>
              {showMoreMenu && (
                <div className="more-menu">
                  <button onClick={() => { navigate('/dashboard'); setShowMoreMenu(false); }}>Dashboard</button>
                  <button onClick={() => { navigate('/addrecord'); setShowMoreMenu(false); }}>Add Record Page</button>
                  <button onClick={() => { setShowSearchCollections(true); setShowMoreMenu(false); }}>Collections</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {showHistory && (
          <div className="history-panel">
            <h3>Recent Actions</h3>
            {getActionHistory().length === 0 ? (
              <p className="history-empty">No actions yet this session</p>
            ) : (
              getActionHistory().slice(0, 8).map((h, i) => (
                <div key={i} className="history-item">
                  <span>{h.action}</span>
                  <span className="history-time">{h.time}</span>
                </div>
              ))
            )}
          </div>
        )}

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          visibleFields={visibleFields}
          onToggleField={toggleVisibleField}
        />
        <ModalAddRecord
          show={showModalAddRecord}
          onClose={() => setShowModalAddRecord(false)}
          onSuccess={() => { getData(); logAction('Added new contact'); }}
        />
        <Import
          show={showImport}
          onClose={() => setShowImport(false)}
          onSuccess={() => { getData(); logAction('Imported CSV'); }}
        />

        <div className="record-content">
          {filteredData.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📇</div>
              <h2>No contacts found</h2>
              <p>Add a contact or import a CSV file to get started</p>
              <button className="action-btn action-btn-primary" onClick={() => setShowModalAddRecord(true)}>
                + Add First Contact
              </button>
            </div>
          ) : viewType === 'grid' ? (
            <div className="contacts-grid">
              {filteredData.map((item) => (
                <div key={item._id} className="contact-card">
                  <div className="contact-card-header">
                    <div className="contact-avatar">
                      {(item.person_first_name?.[0] || item.person_last_name?.[0] || '?').toUpperCase()}
                    </div>
                    <div>
                      <h3 className="contact-name">{getContactName(item)}</h3>
                      {item.person_job_title && <p className="contact-title">{item.person_job_title}</p>}
                    </div>
                  </div>
                  <div className="contact-details">
                    {visibleFields.includes('person_personal_email') && item.person_personal_email && (
                      <div className="contact-detail"><span>📧</span>{item.person_personal_email}</div>
                    )}
                    {visibleFields.includes('person_phone') && item.person_phone && (
                      <div className="contact-detail"><span>📞</span>{item.person_phone}</div>
                    )}
                    {visibleFields.includes('person_city') && item.person_city && (
                      <div className="contact-detail"><span>📍</span>{item.person_city}</div>
                    )}
                    {visibleFields.includes('company_name') && (item.company_name || item.person_company_name) && (
                      <div className="contact-detail"><span>🏢</span>{item.company_name || item.person_company_name}</div>
                    )}
                    {visibleFields.includes('person_job_title') && item.person_job_title && (
                      <div className="contact-detail"><span>💼</span>{item.person_job_title}</div>
                    )}
                  </div>
                  <div className="contact-card-actions">
                    <button className="card-btn card-btn-edit" onClick={(e) => handleEdit(e, item._id)}>Edit</button>
                    <button className="card-btn card-btn-delete" onClick={(e) => handleDelete(e, item._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="contacts-table-wrapper">
              <table className="contacts-table">
                <thead>
                  <tr>
                    {LIST_COLUMNS.map((col) => (
                      <th key={col}>{col.replace(/_/g, ' ')}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item._id}>
                      {LIST_COLUMNS.map((col) => (
                        <td key={col}>{item[col] || '—'}</td>
                      ))}
                      <td className="table-actions">
                        <button className="card-btn card-btn-edit" onClick={(e) => handleEdit(e, item._id)}>Edit</button>
                        <button className="card-btn card-btn-delete" onClick={(e) => handleDelete(e, item._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {maxPages > 1 && (
            <div className="pagination">
              <button disabled={pageNum === 1} onClick={() => handlePageChange(pageNum - 1)}>← Prev</button>
              {Array.from({ length: maxPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={page === pageNum ? 'page-active' : ''}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button disabled={pageNum === maxPages} onClick={() => handlePageChange(pageNum + 1)}>Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
