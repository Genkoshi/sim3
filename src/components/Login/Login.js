import React, {Component} from 'react';
import './Login.css';
import logo from './logo.png'


export default class Login extends Component{
    render(){
        return(
            <div className='background'>
                <div className='login-box'>
                    <div className='logo-container' >
                        <img src={logo} alt='logo' />
                        <div className='logo-text' >Helo</div>
                    </div>
                    <a href={ process.env.REACT_APP_LOGIN} className='login-button' >
                        <div className='logbutton-text'  >Login / Register</div>
                    </a>
                </div>
            </div>
        )
    }
}