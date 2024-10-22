import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import FileUpload from '../components/uploadFile';
import Cookies from 'js-cookie';
// import { get } from 'http';


const AddRecord = () => {
    const [listName, setListName] = useState('');
    const [query, setQuery] = useState('');
    const [emailFormat, setEmailFormat] = useState('');
    const [personFirstName, setPersonFirstName] = useState('');
    const [personLastName, setPersonLastName] = useState('');
    const [personHeadline, setPersonHeadline] = useState('');
    const [personJobTitle, setPersonJobTitle] = useState('');
    const [personLocation, setPersonLocation] = useState('');
    const [personBusinessEmail, setPersonBusinessEmail] = useState('');
    const [personPersonalEmail, setPersonPersonalEmail] = useState('');
    const [personPhone, setPersonPhone] = useState('');
    const [personCompanyName, setPersonCompanyName] = useState('');
    const [personCity, setPersonCity] = useState('');
    const [personLinkedinId, setPersonLinkedinId] = useState('');
    const [personLinkedinUrl, setPersonLinkedinUrl] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyFounded, setCompanyFounded] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [companyCountry, setCompanyCountry] = useState('');
    const [companyIndustry, setCompanyIndustry] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyLinkedinUrl, setCompanyLinkedinUrl] = useState('');
    const [companyLinkedinId, setCompanyLinkedinId] = useState('');
    const [companyMetaTitle, setCompanyMetaTitle] = useState('');
    const [companyMetaDescription, setCompanyMetaDescription] = useState('');
    const [companyMetaKeywords, setCompanyMetaKeywords] = useState('');
    const [companyMetaPhones, setCompanyMetaPhones] = useState('');
    const [companyMetaEmails, setCompanyMetaEmails] = useState('');

    const onChangeListName = (e) => setListName(e.target.value);
    const onChangeQuery = (e) => setQuery(e.target.value);
    const onChangeEmailFormat = (e) => setEmailFormat(e.target.value);
    const onChangePersonFirstName = (e) => setPersonFirstName(e.target.value);
    const onChangePersonLastName = (e) => setPersonLastName(e.target.value);
    const onChangePersonHeadline = (e) => setPersonHeadline(e.target.value);
    const onChangePersonJobTitle = (e) => setPersonJobTitle(e.target.value);
    const onChangePersonLocation = (e) => setPersonLocation(e.target.value);
    const onChangePersonBusinessEmail = (e) => setPersonBusinessEmail(e.target.value);
    const onChangePersonPersonalEmail = (e) => setPersonPersonalEmail(e.target.value);
    const onChangePersonPhone = (e) => setPersonPhone(e.target.value);
    const onChangePersonCompanyName = (e) => setPersonCompanyName(e.target.value);
    const onChangePersonCity = (e) => setPersonCity(e.target.value);
    const onChangePersonLinkedinId = (e) => setPersonLinkedinId(e.target.value);
    const onChangePersonLinkedinUrl = (e) => setPersonLinkedinUrl(e.target.value);
    const onChangeCompanyName = (e) => setCompanyName(e.target.value);
    const onChangeCompanyFounded = (e) => setCompanyFounded(e.target.value);
    const onChangeCompanySize = (e) => setCompanySize(e.target.value);
    const onChangeCompanyType = (e) => setCompanyType(e.target.value);
    const onChangeCompanyCountry = (e) => setCompanyCountry(e.target.value);
    const onChangeCompanyIndustry = (e) => setCompanyIndustry(e.target.value);
    const onChangeCompanyAddress = (e) => setCompanyAddress(e.target.value);
    const onChangeCompanyLinkedinUrl = (e) => setCompanyLinkedinUrl(e.target.value);
    const onChangeCompanyLinkedinId = (e) => setCompanyLinkedinId(e.target.value);
    const onChangeCompanyMetaTitle = (e) => setCompanyMetaTitle(e.target.value);
    const onChangeCompanyMetaDescription = (e) => setCompanyMetaDescription(e.target.value);
    const onChangeCompanyMetaKeywords = (e) => setCompanyMetaKeywords(e.target.value);
    const onChangeCompanyMetaPhones = (e) => setCompanyMetaPhones(e.target.value);
    const onChangeCompanyMetaEmails = (e) => setCompanyMetaEmails(e.target.value);

    const onHandleSubmit = async (e) => {
        if (!personPersonalEmail || !personPhone) {
            alert("Please fill in email or phone")
            return;
        }
        e.preventDefault();
        try {
            const token = Cookies.get('user');
            const response = await axios.post('http://localhost:8000/record/createRecord', {
                user: token,
                list_name: listName,
                query: query,
                email_format: emailFormat,
                person_first_name: personFirstName,
                person_last_name: personLastName,
                person_headline: personHeadline,
                person_job_title: personJobTitle,
                person_location: personLocation,
                person_business_email: personBusinessEmail,
                person_personal_email: personPersonalEmail,
                person_phone: personPhone,
                person_company_name: personCompanyName,
                person_city: personCity,
                person_linkedin_id: personLinkedinId,
                person_linkedin_url: personLinkedinUrl,
                company_name: companyName,
                company_founded: companyFounded,
                company_size: companySize,
                company_type: companyType,
                company_country: companyCountry,
                company_industry: companyIndustry,
                company_address: companyAddress,
                company_linkedin_url: companyLinkedinUrl,
                company_linkedin_id: companyLinkedinId,
                company_meta_title: companyMetaTitle,
                company_meta_description: companyMetaDescription,
                company_meta_keywords: companyMetaKeywords,
                company_meta_phones: companyMetaPhones,
                company_meta_emails: companyMetaEmails,
            });
            console.log(response.data)
            alert("Added")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Add Record</h1>
            <form onSubmit={onHandleSubmit}>
                <label>
                    List Name:
                    <input type="text" name="listName" value={listName} onChange={onChangeListName} />
                </label>
                <br /><br />
                <label>
                    Query:
                    <input type="text" name="query" value={query} onChange={onChangeQuery} />
                </label>
                <br /><br />
                <label>
                    Email Format:
                    <input type="text" name="emailFormat" value={emailFormat} onChange={onChangeEmailFormat} />
                </label>
                <br /><br />
                <label>
                    Person First Name:
                    <input type="text" name="personFirstName" value={personFirstName} onChange={onChangePersonFirstName} />
                </label>
                <br /><br />
                <label>
                    Person Last Name:
                    <input type="text" name="personLastName" value={personLastName} onChange={onChangePersonLastName} />
                </label>
                <br /><br />
                <label>
                    Person Headline:
                    <input type="text" name="personHeadline" value={personHeadline} onChange={onChangePersonHeadline} />
                </label>
                <br /><br />
                <label>
                    Person Job Title:
                    <input type="text" name="personJobTitle" value={personJobTitle} onChange={onChangePersonJobTitle} />
                </label>
                <br /><br />
                <label>
                    Person Location:
                    <input type="text" name="personLocation" value={personLocation} onChange={onChangePersonLocation} />
                </label>
                <br /><br />
                <label>
                    Person Business Email:
                    <input type="email" name="personBusinessEmail" value={personBusinessEmail} onChange={onChangePersonBusinessEmail} />
                </label>
                <br /><br />
                <label>
                    Person Personal Email:
                    <input type="email" name="personPersonalEmail" value={personPersonalEmail} onChange={onChangePersonPersonalEmail} />
                </label>
                <br /><br />
                <label>
                    Person Phone:
                    <input type="tel" name="personPhone" value={personPhone} onChange={onChangePersonPhone} />
                </label>
                <br /><br />
                <label>
                    Person Company Name:
                    <input type="text" name="personCompanyName" value={personCompanyName} onChange={onChangePersonCompanyName} />
                </label>
                <br /><br />
                <label>
                    Person City:
                    <input type="text" name="personCity" value={personCity} onChange={onChangePersonCity} />
                </label>
                <br /><br />
                <label>
                    Person Linkedin ID:
                    <input type="text" name="personLinkedinId" value={personLinkedinId} onChange={onChangePersonLinkedinId} />
                </label>
                <br /><br />
                <label>
                    Person Linkedin URL:
                    <input type="text" name="personLinkedinUrl" value={personLinkedinUrl} onChange={onChangePersonLinkedinUrl} />
                </label>
                <br /><br />
                <label>
                    Company Name:
                    <input type="text" name="companyName" value={companyName} onChange={onChangeCompanyName} />
                </label>
                <br /><br />
                <label>
                    Company Founded:
                    <input type="text" name="companyFounded" value={companyFounded} onChange={onChangeCompanyFounded} />
                </label>
                <br /><br />
                <label>
                    Company Size:
                    <input type="text" name="companySize" value={companySize} onChange={onChangeCompanySize} />
                </label>
                <br /><br />
                <label>
                    Company Type:
                    <input type="text" name="companyType" value={companyType} onChange={onChangeCompanyType} />
                </label>
                <br /><br />
                <label>
                    Company Country:
                    <input type="text" name="companyCountry" value={companyCountry} onChange={onChangeCompanyCountry} />
                </label>
                <br /><br />
                <label>
                    Company Industry:
                    <input type="text" name="companyIndustry" value={companyIndustry} onChange={onChangeCompanyIndustry} />
                </label>
                <br /><br />
                <label>
                    Company Address:
                    <input type="text" name="companyAddress" value={companyAddress} onChange={onChangeCompanyAddress} />
                </label>
                <br /><br />
                <label>
                    Company Linkedin URL:
                    <input type="text" name="companyLinkedinUrl" value={companyLinkedinUrl} onChange={onChangeCompanyLinkedinUrl} />
                </label>
                <br /><br />
                <label>
                    Company Linkedin ID:
                    <input type="text" name="companyLinkedinId" value={companyLinkedinId} onChange={onChangeCompanyLinkedinId} />
                </label>
                <br /><br />
                <label>
                    Company Meta Title:
                    <input type="text" name="companyMetaTitle" value={companyMetaTitle} onChange={onChangeCompanyMetaTitle} />
                </label>
                <br /><br />
                <label>
                    Company Meta Description:
                    <input type="text" name="companyMetaDescription" value={companyMetaDescription} onChange={onChangeCompanyMetaDescription} />
                </label>
                <br /><br />
                <label>
                    Company Meta Keywords:
                    <input type="text" name="companyMetaKeywords" value={companyMetaKeywords} onChange={onChangeCompanyMetaKeywords} />
                </label>
                <br /><br />
                <label>
                    Company Meta Phones:
                    <input type="text" name="companyMetaPhones" value={companyMetaPhones} onChange={onChangeCompanyMetaPhones} />
                </label>
                <br /><br />
                <label>
                    Company Meta Emails:
                    <input type="email" name="companyMetaEmails" value={companyMetaEmails} onChange={onChangeCompanyMetaEmails} />
                </label>
                <br /><br />
                <button type="submit">Submit</button>
                <br /><br />
            </form>
            <div>Attach a file instead:</div>
            <FileUpload />
        </div>
    )
}

export default AddRecord;