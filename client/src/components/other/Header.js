import React, {useContext, useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import '../../styles/header.scss'
import {logout} from "../../actions/auth";
import {connect} from "react-redux";

const Header = (props) => {


    const logoutFromAccount = () => {
        localStorage.removeItem('user')
        props.dispatch(logout())
        props.history.push("/")
    }
    return (
        <div className="header">
            <div className="nav-container">
                <ul>
                    <li className="nav-list">
                        <Link id="app-name-header" to="/home">NEWS-X</Link>
                    </li>
                    <li className="nav-list">
                        <Link to="/sources">Sources</Link>
                    </li>
                </ul>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <div className="user-profile-container">
                    <img src="../../../img/user_avatar.jpg" alt="Avatar" className="avatar"/>
                    <a><p className="user-name">{props.name}</p></a>
                </div>

                <div className="logout-container">
                    <ul>
                        <li className="logout-list"><a onClick={logoutFromAccount}>Logout</a></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        name: state.authReducer.name,
    }
}


export default connect(mapStateToProps)(withRouter(Header))
