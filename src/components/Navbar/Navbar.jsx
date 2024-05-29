import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-dark.webp';
export default function Navbar ( { loginData, logout } )
{
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/home">
                    <img src={ logo } alt="logo-dark.webp" />
                </NavLink>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        { loginData ?
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active" to="/home">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active" to="/movies">Movies</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active" to="/tvshow">Tv Shows</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active" to="/people">People</NavLink>
                                </li>
                                <li className="nav-item">
                                    Welcome:{ loginData.first_name }
                                    </li>
                            </>
                            : "" }
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <i className='fab fa-facebook m-2'></i>
                            <i className='fab fa-instagram m-2'></i>
                            <i className='fab fa-youtube m-2'></i>
                        </li>
                        { loginData ?
                            <li className="nav-item">
                                <button className="btn btn-outline-danger " onClick={ logout }>Logout</button>
                            </li> :
                            <>
                                <li className="nav-item me-2">
                                    <NavLink className="nav-link fw-bold " to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link fw-bold glyphicon " to="/register">Register</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>


    );
}
