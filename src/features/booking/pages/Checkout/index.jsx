import React from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import {USER_LOGIN} from 'common/contants/myContant';

function Checkout(props) {
    //Check user login
    if(localStorage.getItem(USER_LOGIN)){
        return <Redirect to="/Signin" />
    }
    
    return (
        <div>
            Checkout 
        </div>
    );
}

export default Checkout;