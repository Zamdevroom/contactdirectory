import React, { useState } from 'react';
import '../styles/ModalAddRecord.css'; // Assuming you save the CSS in ModalAddRecord.css
import axios from 'axios';
import Cookies from 'js-cookie';

const ModalAddRecord = ({ show, onClose }) => {
	const [formData, setFormData] = useState({
		list_name: "",
		query: "",
		email_format: "",
		person_first_name: "",
		person_last_name: "",
		person_headline: "",
		person_job_title: "",
		person_location: "",
		person_business_email: "",
		person_personal_email: "",
		person_phone: "",
		person_company_name: "",
		person_city: "",
		person_linkedin_id: "",
		person_linkedin_url: "",
		company_name: "",
		company_founded: "",
		company_size: "",
		company_type: "",
		company_country: "",
		company_industry: "",
		company_address: "",
		company_linkedin_url: "",
		company_linkedin_id: "",
		company_meta_title: "",
		company_meta_description: "",
		company_meta_keywords: "",
		company_meta_phones: "",
		company_meta_emails: ""


	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const onHandleSubmit = async (e) => {
		if (!formData.person_personal_email || !formData.person_phone) {
			alert("Please fill in email or phone")
			return;
		}
		e.preventDefault();
		try {
			const token = Cookies.get('user');
			const response = await axios.post('http://localhost:8000/record/createRecord', {
				user: token,
				formData
			});
			setFormData({
				list_name: "",
				query: "",
				email_format: "",
				person_first_name: "",
				person_last_name: "",
				person_headline: "",
				person_job_title: "",
				person_location: "",
				person_business_email: "",
				person_personal_email: "",
				person_phone: "",
				person_company_name: "",
				person_city: "",
				person_linkedin_id: "",
				person_linkedin_url: "",
				company_name: "",
				company_founded: "",
				company_size: "",
				company_type: "",
				company_country: "",
				company_industry: "",
				company_address: "",
				company_linkedin_url: "",
				company_linkedin_id: "",
				company_meta_title: "",
				company_meta_description: "",
				company_meta_keywords: "",
				company_meta_phones: "",
				company_meta_emails: ""
			});

			alert("Added")
			onClose();
		} catch (error) {
			console.log(error)
		}
	}

	if (!show) {
		return null;
	}

	return (
		<div className="modal-overlay">
			<div className="modal-content flex-auto  p-0">
				<button className="modal-close" onClick={onClose}>
					&times;
				</button>
				<div className="modal-body">
					<h2>Add New Item</h2>

					<form className="grid grid-cols-3 grid-flow-row justify-items-center" onSubmit={onHandleSubmit}>
						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="listName">List Name</label>
							{/* <button className="modal-close" onClick={onClose}>
								&times;
							</button> */}
							<input
								type="text"
								id="listName"
								name="list_name"
								value={formData.list_name}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>
						{/* <div className="grid grid-cols-1 justify-items-start mb-4">
							<label className="text-right" htmlFor="listName">List Name</label>
							<input
								type="text"
								id="listName"
								name="list_name"
								value={formData.list_name}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-10 "
							/>
						</div> */}
						
						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="query">Query</label>
							<input
								type="text"
								id="query"
								name="query"
								value={formData.query}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>
						

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="emailFormat">Email Format</label>
							<input
								type="text"
								id="emailFormat"
								name="email_format"
								value={formData.email_format}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personFirstName">Person First Name</label>
							<input
								type="text"
								id="personFirstName"
								name="person_first_name"
								value={formData.person_first_name}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personLastName">Person Last Name</label>
							<input
								type="text"
								id="personLastName"
								name="person_last_name"
								value={formData.person_last_name}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personHeadline">Person Headline</label>
							<input
								type="text"
								id="personHeadline"
								name="person_headline"
								value={formData.person_headline}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personJobTitle">Person Job Title</label>
							<input
								type="text"
								id="personJobTitle"
								name="person_job_title"
								value={formData.person_job_title}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personLocation">Person Location</label>
							<input
								type="text"
								id="personLocation"
								name="person_location"
								value={formData.person_location}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personBusinessEmail">Person Business Email</label>
							<input
								type="email"
								id="personBusinessEmail"
								name="person_business_email"
								value={formData.person_business_email}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personPersonalEmail">Person Personal Email</label>
							<input
								type="email"
								id="personPersonalEmail"
								name="person_personal_email"
								value={formData.person_personal_email}
								onChange={handleChange}
								required
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personPhone">Person Phone</label>
							<input
								type="tel"
								id="personPhone"
								name="person_phone"
								value={formData.person_phone}
								onChange={handleChange}
								required
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personCompanyName">Person Company Name</label>
							<input
								type="text"
								id="personCompanyName"
								name="person_company_name"
								value={formData.person_company_name}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personCity">Person City</label>
							<input
								type="text"
								id="personCity"
								name="person_city"
								value={formData.person_city}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personLinkedinId">Person Linkedin ID</label>
							<input
								type="text"
								id="personLinkedinId"
								name="person_linkedin_id"
								value={formData.person_linkedin_id}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="personLinkedinUrl">Person Linkedin URL</label>
							<input
								type="text"
								id="personLinkedinUrl"
								name="person_linkedin_url"
								value={formData.person_linkedin_url}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyName">Company Name</label>
							<input
								type="text"
								id="companyName"
								name="company_name"
								value={formData.company_name}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyFounded">Company Founded</label>
							<input
								type="text"
								id="companyFounded"
								name="company_founded"
								value={formData.company_founded}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companySize">Company Size</label>
							<input
								type="text"
								id="companySize"
								name="company_size"
								value={formData.company_size}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyType">Company Type</label>
							<input
								type="text"
								id="companyType"
								name="company_type"
								value={formData.company_type}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyCountry">Company Country</label>
							<input
								type="text"
								id="companyCountry"
								name="company_country"
								value={formData.company_country}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyIndustry">Company Industry</label>
							<input
								type="text"
								id="companyIndustry"
								name="company_industry"
								value={formData.company_industry}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyAddress">Company Address</label>
							<input
								type="text"
								id="companyAddress"
								name="company_address"
								value={formData.company_address}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyLinkedinUrl">Company Linkedin URL</label>
							<input
								type="text"
								id="companyLinkedinUrl"
								name="company_linkedin_url"
								value={formData.company_linkedin_url}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyLinkedinId">Company Linkedin ID</label>
							<input
								type="text"
								id="companyLinkedinId"
								name="company_linkedin_id"
								value={formData.company_linkedin_id}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyMetaTitle">Company Meta Title</label>
							<input
								type="text"
								id="companyMetaTitle"
								name="company_meta_title"
								value={formData.company_meta_title}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyMetaDescription">Company Meta Description</label>
							<input
								type="text"
								id="companyMetaDescription"
								name="company_meta_description"
								value={formData.company_meta_description}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyMetaKeywords">Company Meta Keywords</label>
							<input
								type="text"
								id="companyMetaKeywords"
								name="company_meta_keywords"
								value={formData.company_meta_keywords}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyMetaPhones">Company Meta Phones</label>
							<input
								type="text"
								id="companyMetaPhones"
								name="company_meta_phones"
								value={formData.company_meta_phones}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>

						<div className="flex flex-row mb-4 justify-between">
							<label htmlFor="companyMetaEmails">Company Meta Emails</label>
							<input
								type="email"
								id="companyMetaEmails"
								name="company_meta_emails"
								value={formData.company_meta_emails}
								onChange={handleChange}
								className="border border-gray-300 rounded py-1 mr-4 ml-2"
							/>
						</div>


						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</form>
				</div>
			</div >
		</div >
	);
};

export default ModalAddRecord;