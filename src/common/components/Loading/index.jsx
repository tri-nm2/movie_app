import React from 'react';
import {useSelector} from 'react-redux';
import logo from 'assets/images/logoTixLoading.png';
import style from './style.module.css';
function Loading(props) {
    const {isLoading} = useSelector(state => state.LoadingReducer);
    return (
        <div className={isLoading ? `${style.loadingMain}`: 'hidden'}>
            <div className={`${style.logoloading} animate-wiggle`}>
                <img src={logo} />
            </div>
        </div>
    );
}

export default Loading;