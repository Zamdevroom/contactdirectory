import React from 'react';
import '../styles/SearchCollections.css'; // Assuming you save the CSS in SearchCollections.css


const SearchCollections = ({ show, onClose }) => {
    if (!show) {
        return null;
    }
    return (
        <div className="modal-overlay inner thin-padding">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-body">
                    <form className="search-wrapper search-nav mb-3">
                        <input
                            type="search"
                            className="search-input"
                            placeholder="Search for collections"
                            autoComplete="off"
                            name="q"
                            value=""
                        />
                    </form>
                    <div className="launcher-listing">
                        <div className="content-scroll">
                            <div>
                                <div>
                                    <span className="section-title">Collections</span>
                                    <ul>
                                        <li value="0">
                                            <div className="cursor elem">
                                                <div className="cursor-pointer p-2 d-flex align-items-center">
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchCollections;
