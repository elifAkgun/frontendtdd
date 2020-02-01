import React from 'react';
import logo from '../assets/tdd-cloud-logo.png'
import { Link } from 'react-router-dom'

export class TopBar extends React.Component {
    render() {
        return (
            <div className="bg-white shadow-sm mb-2">
                <div className="container">
                    <nav className="navbar navbar-light navbar-expand">
                        <Link to="/" className="navbar-brand">
                            <img src={logo} width='60' alt="Clody" />Clody
                        </Link>
                        <ul className ="nav navbar-nav ml-auto" >
                            <li className="nav-item">
                                <Link to='/signup' className='nav-link'>
                                        Sign Up
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/login' className='nav-link'>
                                        Log In
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default TopBar;