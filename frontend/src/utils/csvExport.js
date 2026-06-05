const DISPLAY_FIELDS = [
  'list_name', 'person_first_name', 'person_last_name', 'person_job_title',
  'person_personal_email', 'person_business_email', 'person_phone',
  'person_city', 'person_company_name', 'company_name', 'company_industry',
  'company_country', 'company_address',
];

export const exportRecordsToCSV = (records, fields = DISPLAY_FIELDS) => {
  if (!records.length) return;

  const header = fields.join(',');
  const rows = records.map((record) =>
    fields.map((field) => {
      const value = record[field] ?? '';
      const escaped = String(value).replace(/"/g, '""');
      return `"${escaped}"`;
    }).join(',')
  );

  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `contacts_export_${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

export const ALL_FIELDS = [
  { key: 'list_name', label: 'List Name' },
  { key: 'person_first_name', label: 'First Name' },
  { key: 'person_last_name', label: 'Last Name' },
  { key: 'person_job_title', label: 'Job Title' },
  { key: 'person_headline', label: 'Headline' },
  { key: 'person_location', label: 'Location' },
  { key: 'person_personal_email', label: 'Personal Email' },
  { key: 'person_business_email', label: 'Business Email' },
  { key: 'person_phone', label: 'Phone' },
  { key: 'person_city', label: 'City' },
  { key: 'person_company_name', label: 'Person Company' },
  { key: 'company_name', label: 'Company Name' },
  { key: 'company_industry', label: 'Industry' },
  { key: 'company_country', label: 'Country' },
  { key: 'company_address', label: 'Address' },
];

export const logAction = (action) => {
  const history = JSON.parse(sessionStorage.getItem('actionHistory') || '[]');
  history.unshift({ action, time: new Date().toLocaleString() });
  sessionStorage.setItem('actionHistory', JSON.stringify(history.slice(0, 20)));
};

export const getActionHistory = () =>
  JSON.parse(sessionStorage.getItem('actionHistory') || '[]');
