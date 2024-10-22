
import '../styles/Sidebar.css'; // Assuming you save the CSS in Sidebar.css
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import SearchCollections from './SearchCollections';

const Sidebar = ({toggleSearchCollections}) => {


	const [userdata, setUserdata] = useState([]);


	const getUserData = async () => {
		try {
			console.log("Called")
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

	useEffect(() => {
		getUserData();
	}
		, []);

	return (
		<div id="sidebar" className="sidebar">
			<div className="sidebar-inner">
				<div className="sidebar-main">
					<div className="sidebar-scroll">
						<div id="organization-switcher" className="sc-dkzDqf iinjfv no-select">
							<div className="avatar">
								<span className="initials">
									{userdata && userdata.firstname && userdata.lastname
										? `${userdata.firstname[0]}${userdata.lastname[0]}`
										: ''}
								</span>
							</div>
							<div className="info-container flex-grow-1">
								<div className="organization-name">ZAM
								</div>
								<div className="user-display-name">{`${userdata.firstname} ${userdata.lastname}`}</div>
							</div>

						</div>
						<div id="sidebar-data-spaces">
							<hr className="separator-line" />
							<div className="sidebar-heading">
								<div className="heading-title">Data</div>
								<div className="heading-icons">
									<span className="d-inline-block mr-2">
										<button className="heading-icon" onClick={toggleSearchCollections}>
											<div className="heading-icon-inner">
												<span className="heading-icon-symbol">
													<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="19" width="19" xmlns="http://www.w3.org/2000/svg">
														<path d="M15.5 5C13.567 5 12 6.567 12 8.5C12 10.433 13.567 12 15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5ZM10 8.5C10 5.46243 12.4624 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 9.6575 20.6424 10.7315 20.0317 11.6175L22.7071 14.2929L21.2929 15.7071L18.6175 13.0317C17.7315 13.6424 16.6575 14 15.5 14C12.4624 14 10 11.5376 10 8.5ZM3 4H8V6H3V4ZM3 11H8V13H3V11ZM21 18V20H3V18H21Z"></path>
													</svg>
												</span>
											</div>
										</button>
									</span>
									<span className="d-inline-block mr-2">
										<button className="heading-icon">
											<div className="heading-icon-inner">
												<span className="heading-icon-symbol">
													<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="19" width="19" xmlns="http://www.w3.org/2000/svg">
														<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
														<line x1="12" y1="11" x2="12" y2="17"></line>
														<line x1="9" y1="14" x2="15" y2="14"></line>
													</svg>
												</span>
											</div>
										</button>
									</span>
									<span className="d-inline-block">
										<button className="heading-icon">
											<div className="heading-icon-inner">
												<span className="heading-icon-symbol">
													<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="19" width="19" xmlns="http://www.w3.org/2000/svg">
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="8" x2="12" y2="16"></line>
														<line x1="8" y1="12" x2="16" y2="12"></line>
													</svg>
												</span>
											</div>
										</button>
									</span>
								</div>
							</div>


							<div data-rbd-droppable-id="dataspaces" data-rbd-droppable-context-id="0" className="menu-links">
								<div data-rbd-draggable-context-id="0" data-rbd-draggable-id="14b468c6c0e340409b80" tabIndex="0" role="button" aria-describedby="rbd-hidden-text-0-hidden-text-0" data-rbd-drag-handle-draggable-id="14b468c6c0e340409b80" data-rbd-drag-handle-context-id="0" draggable="false">
									<div className="sidebar-link">
										<a className="inner-link" href="/d/J4p2NuQL81tD77pw2rnj/14b468c6c0e340409b80">
											<span className="link-options">
												<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
													<circle cx="12" cy="12" r="1"></circle>
													<circle cx="12" cy="5" r="1"></circle>
													<circle cx="12" cy="19" r="1"></circle>
												</svg>
											</span>
											<span className="icon">👋</span>
											<span className="link_label">contact</span>
										</a>
									</div>
								</div>
								<div data-rbd-draggable-context-id="0" data-rbd-draggable-id="14b468c6c0e340409b81" tabIndex="0" role="button" aria-describedby="rbd-hidden-text-0-hidden-text-0" data-rbd-drag-handle-draggable-id="14b468c6c0e340409b81" data-rbd-drag-handle-context-id="0" draggable="false">
									<div className="sidebar-link">
										<a className="inner-link" href="/d/J4p2NuQL81tD77pw2rnj/14b468c6c0e340409b81" >
											<span className="link-options">
												<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
													<circle cx="12" cy="12" r="1"></circle>
													<circle cx="12" cy="5" r="1"></circle>
													<circle cx="12" cy="19" r="1"></circle>
												</svg>
											</span>
											<span className="icon">👋</span>
											<span className="link_label">contact</span>
										</a>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="sidebar-footer">
					<div className="sidebar-footer-link">
						<a className="inner-link" href="/account/settings">
							<span className="icon">
								<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
									<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
								</svg>
							</span>
							<span className="link_label">Settings</span>
						</a>
					</div>
					<div className="sidebar-footer-link">
						<a className="inner-link" href="/account/logout">
							<span className="icon">
								<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
									<polyline points="16 18 22 12 16 6"></polyline>
									<polyline points="8 6 2 12 8 18"></polyline>
								</svg>
							</span>
							<span className="link_label">Logout</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;