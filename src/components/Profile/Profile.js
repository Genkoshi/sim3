import React, {Component} from 'react';
import './Profile.css';

export default class Profile extends Component{
    render(){
        return(
            <div>
                <div className='dashboard'>
                    <div className='menu-container' >
                        <div className='menu-buttons-left' >
                            <span>Helo</span>
                            <img />
                            <img />
                        </div>
                        <div className='page-title' >
                            <span>Dashboard</span>
                        </div>
                        <div className='logout' >
                            <span><a className='logout-link' href='http://localhost:9000/auth/logout' >Logout</a></span>
                        </div>
                    </div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div></div>
            </div>
        )
    }
}