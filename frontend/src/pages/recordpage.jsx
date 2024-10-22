import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { set } from 'mongoose';
import Modal from './subpages/modal.jsx';
import './subpages/modal.jsx';
import ModalAddRecord from './subpages/ModalAddRecord.jsx'; // Import the ModalAddRecord component
import './subpages/modal.jsx'; // Import the CSS for the modal
import Sidebar from './subpages/Sidebar.jsx';
import './subpages/Sidebar.jsx';
import './styles/recordpage.css';
import Import from './subpages/import.jsx';
import Menu from './subpages/MenuOrdering.jsx';
import SearchCollections from './subpages/SearchCollections.jsx';



const RecordPage = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [userdata,setUserdata] = useState([]);
    const [fields, setFields] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [isAscending, setIsAscending] = useState(null);
    const [viewType, setViewType] = useState('grid');
    const [showSearch, setShowSearch] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearch] = useState('')
    const [searchField, setSearchType] = useState('person_phone')
    const [selectedCity, setSelectedCity] = useState('');
    const [uniqueCities, setUniqueCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNum, setPageNum] = useState(1);
    const [pages, setPages] = useState([1, 2, 3, 4]);
    const [maxPages, setMaxPages] = useState(0);




    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(prev => !prev);

    const [showModalAddRecord, setShowModalAddRecord] = useState(false);
    const handleOpenModalAddRecord = () => { setShowModalAddRecord(true); };
    const handleCloseModalAddRecord = () => { setShowModalAddRecord(false); };

    const [showImport, setImport] = useState(false);
    const handleOpenImport = () => { setImport(true); };
    const handleCloseImport = () => { setImport(false); };

    
	const [showSearchCollections, setShowSearchCollections] = useState(false);
	const toggleSearchCollections = () => setShowSearchCollections(prevShow => !prevShow);


    const getUserData = async () => {
        try {
            const userId = Cookies.get('user');
            const response = await axios.get(
                'http://localhost:8000/user/current',
                {
                    params: { user: userId }, // Send userId as a query parameter
                    headers: {
                        authorization: userId, // Set the Authorization header
                    },
                }
            );

            setUserdata(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    const handlePageChange = (page) => {
        setPageNum(page);
        let pagesrange = []
        if (page === 1) {
            for (let i = 1; i <= 4; i++) {
                if (i > maxPages) {
                    break;
                }
                pagesrange.push(i);
            }
        }
        else if (page === maxPages - 1) {
            for (let i = maxPages - 3; i <= maxPages; i++) {
                if (i <= 0) {
                    continue;
                }
                pagesrange.push(i);
            }
        }
        else if (page === maxPages) {
            for (let i = maxPages - 3; i <= maxPages; i++) {
                if (i <= 0) {
                    continue;
                }
                pagesrange.push(i);
            }
        }
        else {
            for (let i = page - 1; i <= page + 2; i++) {
                pagesrange.push(i);
            }

        }
        if (!pagesrange.includes(maxPages)) {
            pagesrange.push(maxPages);
        }
        if (!pagesrange.includes(1)) {
            pagesrange.unshift(1);
        }
        setPages(pagesrange);
        setFilteredData(data.slice((page - 1) * 10, (page * 10) - 1));
    }

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    };

    const onChangeSearchType = (e) => {
        setSearchType(e.target.value)
    };

    const handleDelete = async (e, id_) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/record/deleteRecord', { id: id_ });
            await getData();
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = async (e, id_) => {
        e.preventDefault();
        navigate('/editrecord', { state: id_ });
    }

    const getData = async () => {
        try {
            const user = Cookies.get('user');
            const response = await axios.post('http://localhost:8000/record/getRecords', { user });
            if (loading === true) {
                setLoading(false);
            }
            setMaxPages(Math.ceil(response.data.length / 10));
            if (Math.ceil(response.data.length / 10) == 0) {
                setPages([]);
            }

            let pagesr = []
            for (let i = 1; i <= Math.ceil(response.data.length / 10); i++) {
                if (pagesr.length === 4) {
                    break;
                }
                pagesr.push(i);
            }
            if (!pagesr.includes(Math.ceil(response.data.length / 10)) && Math.ceil(response.data.length / 10) != 0) {
                pagesr.push(Math.ceil(response.data.length / 10));
            }
            setPages(pagesr);
            setData(response.data);
            setFilteredData(response.data.slice((pageNum - 1) * 10, (pageNum * 10) - 1));

        }
        catch (error) {
            console.error(error);
        }

    }

    const getFields = async () => {
        try {
            const user = Cookies.get('user');
            const response = await axios.post('http://localhost:8000/record/getFields', { user });
            setFields(response.data);
        } catch (error) {
            console.error("Erro fetching fields:", error);
        }
    };

    const getSortedRecords = async (field) => {
        try {
            const user = Cookies.get('user');
            const response = await axios.post('http://localhost:8000/record/getSortedRecords', { user, selectedField, isAscending });
            setData(response.data);
            setFilteredData(response.data.slice((pageNum - 1) * 10, (pageNum * 10) - 1));
        } catch (error) {
            console.error("Error fetching sorted records:", error);
        }
    }


    const searchData = async (e) => {
        e.preventDefault();
        // console.log(searchValue, searchField);
        if (searchValue === '') {
            setLoading(true);
            getData();
            return;
        }
        try {
            const user = Cookies.get('user');
            const response = await axios.post('http://localhost:8000/record/searchRecords', { searchField, searchValue, user });
            if (loading === true) {
                setLoading(false);
            }
            // console.log(response.data);
            setMaxPages(Math.ceil(response.data.length / 10));
            if (Math.ceil(response.data.length / 10) == 0) {
                setPages([]);
            }
            let pagesr = []
            for (let i = 1; i <= Math.ceil(response.data.length / 10); i++) {
                if (pagesr.length === 4) {
                    break;
                }
                pagesr.push(i);
            }
            if (!pagesr.includes(Math.ceil(response.data.length / 10)) && Math.ceil(response.data.length / 10) != 0) {
                pagesr.push(Math.ceil(response.data.length / 10));
            }
            setPages(pagesr);
            setPageNum(1);
            setData(response.data);
            setFilteredData(response.data.slice((pageNum - 1) * 10, (pageNum * 10) - 1));
            // setUniqueCities([...new Set(response.data.map(item => item.city))]);
        } catch (error) {
            console.error(error);
        }
        setSearch('');
    }

    const onClickSearch = () => {
        setShowSearch(!showSearch);
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Toggle function
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        getData();
        getUserData();
        getFields();
        if (selectedField) {
            getSortedRecords(selectedField, isAscending);
        }
    }, [selectedField, isAscending]);


    return (
        <div className="record-page">
            {loading && <div classname="center">Loading...</div>}
            {!loading && <div>
                {isSidebarOpen && <Sidebar  toggleSearchCollections={toggleSearchCollections}/>}
                {showSearchCollections && <SearchCollections show={showSearchCollections} onClose={() => setShowSearchCollections(false)} />}
                <div className="content">

                    <header className="header">
                        <div className="header-content">
                            <div className="navbar-container">
                                <div className="sidebar-collapse">
                                    <button className="btn" onClick={toggleSidebar}>
                                        {isSidebarOpen ? (
                                            // Arrow pointing left when sidebar is open
                                            <svg
                                                stroke="currentColor"
                                                fill="none"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                color="#FFF"
                                                height="20"
                                                width="20"
                                                xmlns="http://www.w3.org/2000/svg"
                                                style={{ color: 'rgb(255, 255, 255)' }}

                                                // <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                // <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                                // <path d="M15 4v16"></path>
                                                // <path d="M9 10l2 2l-2 2"></path>
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                                <path d="M9 4v16"></path>
                                                <path d="M15 10l-2 2l2 2"></path>
                                                
                                            </svg>
                                        ) : (
                                            // Arrow pointing right when sidebar is closed
                                            <svg
                                                stroke="currentColor"
                                                fill="none"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                color="#FFF"
                                                height="20"
                                                width="20"
                                                xmlns="http://www.w3.org/2000/svg"
                                                style={{ color: 'rgb(255, 255, 255)' }}
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                                <path d="M15 4v16"></path>
                                                <path d="M9 10l2 2l-2 2"></path>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <form className="navbar-form">
                                    <input type="text" placeholder="Search" className="navbar-button" name="value" value={searchValue} onChange={onChangeSearch} />
                                    <select className="navbar-button" onChange={onChangeSearchType}>
                                        <option value="list_name">List Name</option>
                                        <option value="query">Query</option>
                                        <option value="email_format">Email Format</option>
                                        <option value="person_first_name">Person First Name</option>
                                        <option value="person_last_name">Person Last Name</option>
                                        <option value="person_headline">Person Headline</option>
                                        <option value="person_job_title">Person Job Title</option>
                                        <option value="person_location">Person Location</option>
                                        <option value="person_business_email">Person Business Email</option>
                                        <option value="person_personal_email">Person Personal Email</option>
                                        <option value="person_phone">Person Phone</option>
                                        <option value="person_company_name">Person Company Name</option>
                                        <option value="person_city">Person City</option>
                                        <option value="person_linkedin_id">Person Linkedin ID</option>
                                        <option value="person_linkedin_url">Person Linkedin URL</option>
                                        <option value="company_name">Company Name</option>
                                        <option value="company_founded">Company Founded</option>
                                        <option value="company_size">Company Size</option>
                                        <option value="company_type">Company Type</option>
                                        <option value="company_country">Company Country</option>
                                        <option value="company_industry">Company Industry</option>
                                        <option value="company_address">Company Address</option>
                                        <option value="company_linkedin_url">Company Linkedin URL</option>
                                        <option value="company_linkedin_id">Company Linkedin ID</option>
                                        <option value="company_meta_title">Company Meta Title</option>
                                        <option value="company_meta_description">Company Meta Description</option>
                                        <option value="company_meta_keywords">Company Meta Keywords</option>
                                        <option value="company_meta_phones">Company Meta Phones</option>
                                        <option value="company_meta_emails">Company Meta Emails</option>
                                    </select>
                                    <button type="button" className="navbar-button" onClick={searchData}> Search </button>
                                    <button type="button" className="navbar-button" onClick={() => {
                                        getData()
                                        setSelectedCity('')
                                    }
                                    }> Reset Search </button>
                                </form>

                                <nav className="navbar ">
                                    <button className="navbar-button"
                                        onClick={handleOpenImport}>
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            height="16"
                                            width="16"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                        <span>Import</span>
                                    </button>
                                    <Import show={showImport} onClose={handleCloseImport} />
                                    <button className="navbar-button">
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            height="20"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                            <line x1="16" y1="8" x2="16" y2="16"></line>
                                            <line x1="8" y1="8" x2="8" y2="16"></line>
                                            <line x1="3" y1="13" x2="21" y2="13"></line>
                                        </svg>
                                        <span>Export</span>
                                    </button>
                                    <button className="navbar-button">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 24 24"
                                            height="20"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                            <path d="M16 11h-1V3c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v8H8c-2.76 0-5 2.24-5 5v7h18v-7c0-2.76-2.24-5-5-5zm-5-8h2v8h-2V3zm8 18h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3H9v-3c0-.55-.45-1-1-1s-1 .45-1 1v3H5v-5c0-1.65 1.35-3 3-3h8c1.65 0 3 1.35 3 3v5z"></path>
                                        </svg>
                                        <span>Clean</span>
                                    </button>
                                    <button className="navbar-button">
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            height="20"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                        </svg>
                                        <span>Enrich</span>
                                    </button>
                                    <button className="navbar-button">
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            height="20"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M4 8v-2a2 2 0 0 1 2-2h2"></path>
                                            <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
                                            <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
                                            <path d="M16 20h2a2 2 0 0 0 2-2v-2"></path>
                                            <path d="M8 12h8"></path>
                                            <path d="M8 9h6"></path>
                                            <path d="M8 15h4"></path>
                                        </svg>
                                        <span>Extract</span>
                                    </button>
                                    <button className="navbar-button">

                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            height="20"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                        <span>Edit</span>
                                    </button>

                                    <button className="navbar-button thin-button">
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            height="20"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="12" cy="5" r="1"></circle>
                                            <circle cx="12" cy="19" r="1"></circle>
                                        </svg>
                                    </button>

                                </nav>
                            </div>
                        </div>
                    </header>

                    <div className='actions'>
                        <div className="fixed-buttons-container">
                            <div id="columns-right-actions" className="d-flex flex-wrap align-items-center justify-content-between">
                                <div className="d-inline-flex text-bold pr-1 pl-2  text-white">
                                    <span>{data.length} items</span>
                                </div>

                                <button title="Manage Properties" className="btn btn-light mr-1" type="button" onClick={toggleModal}>
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        height="16"
                                        width="16"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                                    </svg>
                                </button>
                                <Modal show={showModal} onClose={toggleModal} />

                                <div className="d-inline-flex">
                                    <Menu fields={fields} onSelectedField={setSelectedField} onIsAscending={setIsAscending} />
                                </div>
                                <div className="d-inline-flex">
                                    <button title="History" className="btn btn-light mr-1">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 24 24"
                                            height="14"
                                            width="14"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path fill="none" strokeWidth="2" d="M1,12 C1,18.075 5.925,23 12,23 C18.075,23 23,18.075 23,12 C23,5.925 18.075,1 12,1 C7.563,1 4,4 2,7.5 M1,1 L1,8 L8,8 M16,17 L12,13 L12,6"></path>
                                        </svg>
                                    </button>
                                </div>

                                <button
                                    className="btn btn-primary d-none d-md-block"

                                    onClick={handleOpenModalAddRecord}
                                >
                                    <span>New Item</span>
                                </button>
                                <ModalAddRecord show={showModalAddRecord} onClose={handleCloseModalAddRecord} />

                                <button
                                    className="btn btn-primary d-none d-md-block"
                                    onClick={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}
                                >
                                    Toggle View
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Conditional Rendering for Grid or List View */}
                    {viewType === 'grid' ? (
                        <div className="grid">
                            {filteredData.map((item, index) => (
                                <div key={index} className="grid-item">
                                    <div className="text-xl font-semibold mb-4">
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>List Name: </span>
                                            <span>{item.list_name}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Query: </span>
                                            <span>{item.query}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Email Format: </span>
                                            <span>{item.email_format}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person First Name: </span>
                                            <span>{item.person_first_name}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person Last Name: </span>
                                            <span>{item.person_last_name}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person Headline: </span>
                                            <span>{item.person_headline}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person Job Title: </span>
                                            <span>{item.person_job_title}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person Location: </span>
                                            <span>{item.person_location}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person Business Email: </span>
                                            <span>{item.person_business_email}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person Personal Email: </span>
                                            <span>{item.person_personal_email}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person Phone: </span>
                                            <span>{item.person_phone}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person Company Name: </span>
                                            <span>{item.person_company_name}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person City: </span>
                                            <span>{item.person_city}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person Linkedin ID: </span>
                                            <span>{item.person_linkedin_id}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Person Linkedin URL: </span>
                                            <span>{item.person_linkedin_url}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Name: </span>
                                            <span>{item.company_name}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Founded: </span>
                                            <span>{item.company_founded}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Size: </span>
                                            <span>{item.company_size}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Type: </span>
                                            <span>{item.company_type}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Country: </span>
                                            <span>{item.company_country}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Industry: </span>
                                            <span>{item.company_industry}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Address: </span>
                                            <span>{item.company_address}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Linkedin URL: </span>
                                            <span>{item.company_linkedin_url}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Linkedin ID: </span>
                                            <span>{item.company_linkedin_id}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Meta Title: </span>
                                            <span>{item.company_meta_title}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Meta Description: </span>
                                            <span>{item.company_meta_description}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Meta Keywords: </span>
                                            <span>{item.company_meta_keywords}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Meta Phones: </span>
                                            <span>{item.company_meta_phones}</span>
                                        </div>
                                        <div className="text-gray-700 mb-2 flex justify-between">
                                            <span>Company Meta Emails: </span>
                                            <span>{item.company_meta_emails}</span>
                                        </div>
                                        <div className="text-gray-700 flex justify-between">
                                            <button className="bg-blue-500 text-white p-2 rounded" onClick={(e) => {
                                                handleDelete(e, item._id)
                                            }}> Delete</button>
                                        </div>
                                        <div className="text-gray-700 flex justify-between">
                                            <button className="bg-blue-500 text-white p-2 rounded" onClick={(e) => {
                                                handleEdit(e, item._id)
                                            }}> Edit</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        {Object.keys(filteredData[0] || {}).map((key) => (
                                            <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                                                {key.replace(/_/g, ' ')}
                                            </th>
                                        ))}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300"></th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredData.map((item) => (
                                        <tr key={item._id}>
                                            {Object.entries(item).map(([key, value]) => (
                                                <td key={key} className="px-6 py-4 whitespace-nowrap border border-gray-300">
                                                    {value}
                                                </td>
                                            ))}
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                                                <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleDelete(item._id)}>Delete</button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                                                <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleEdit(item._id)}>Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}


                    <div className="flex justify-center">
                        {pages.map((page, index) => (
                            page === pageNum ? <button key={index} onClick={() => handlePageChange(page)} className="bg-red-500 text-white p-2 rounded">{page}</button> :
                                <button key={index} onClick={() => handlePageChange(page)} className="bg-blue-500 text-white p-2 rounded">{page}</button>))}
                    </div>

                </div>




            </div>}

        </div>);
}

export default RecordPage;



