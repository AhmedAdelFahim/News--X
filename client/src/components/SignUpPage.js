import React, {useEffect, useState} from "react";
import ErrorMessage from "./other/ErrorMessage";
import {connect} from 'react-redux';
import {signup} from '../services/auth'
import {addNewErrorToSignUp} from "../actions/auth";
import {setTitle} from "../actions/appHead";
import LoadingSpinner from "./other/LoadingSpinner";

const SignUpPage = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    useEffect(() => {
        props.dispatch(setTitle('News-X::SignUp'))
    }, [])
    const handleChangeName = (e) => {
        const {target: {value}} = e
        setName(value)
    }
    const handleChangeEmail = (e) => {
        const {target: {value}} = e
        setEmail(value)
    }

    const handleChangePassword = (e) => {
        const {target: {value}} = e
        setPassword(value)
    }

    const handleChangePasswordConfirmation = (e) => {
        const {target: {value}} = e
        setPasswordConfirmation(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (passwordConfirmation !== password) {
            props.dispatch(addNewErrorToSignUp('passwordConfirmation', 'Password & Confirm Password does not match'))
            return
        }
        const date = {
            fullName: name,
            email,
            password
        }
        props.signup(date)
    }
    return (<div className="container-center page-container">
        <div className="form-container">
            <h1 className="title">News-X</h1>
            <h1 className="from-title">Sign Up</h1>
            <div className="inputs-container">
                <div>
                    <input className="custom-input" type="text" placeholder="Full Name" value={name}
                           onChange={handleChangeName}/>
                    {props.errors.fullName && <ErrorMessage message={props.errors.fullName}/>}
                </div>
                <div>
                    <input className="custom-input" type="email" placeholder="Email" value={email}
                           onChange={handleChangeEmail}/>
                    {props.errors.email && <ErrorMessage message={props.errors.email}/>}
                </div>
                <div>
                    <input className="custom-input" type="password" placeholder="Password" value={password}
                           onChange={handleChangePassword}/>
                    {props.errors.password && <ErrorMessage message={props.errors.password}/>}
                </div>
                <div>
                    <input className="custom-input" type="password" placeholder="Password Confirmation"
                           value={passwordConfirmation} onChange={handleChangePasswordConfirmation}/>
                    {props.errors && props.errors.passwordConfirmation &&
                    <ErrorMessage message={props.errors.passwordConfirmation}/>}
                </div>
                <div>
                    <button className="submit-btn" onClick={handleSubmit} disabled={props.isLoadingSignup}>SIGN UP
                    </button>
                </div>
            </div>
        </div>
        {props.isLoadingSignup && <LoadingSpinner isLoading={props.isLoadingSignup}/>}
    </div>)
}
const mapStateToProps = (state) => {
    return {
        errors: state.authReducer.signupErrors,
        isLoadingSignup: state.authReducer.isLoadingSignup,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: signup(dispatch),
        dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
