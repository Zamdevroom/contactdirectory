import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Modal = ({show, Close, title, children}) => {

    if(!show)
        return null;

    return (
        <div>
            <div>{title}</div>
            <div>
                {children}
            </div>
            <div>
                <button onClick={Close}>Upload</button>
            </div>
        </div>
    )

}

export default Modal;

