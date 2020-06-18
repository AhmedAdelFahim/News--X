import React from 'react';
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import AuthRoute from "./components/other/AuthRoute";
import SourcesPage from "./components/SourcesPage/SourcesPage";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <AuthRoute path='/signin' type="guest">
                        <SignInPage/>
                    </AuthRoute>
                    <AuthRoute path='/signup' type="guest">
                        <SignUpPage/>
                    </AuthRoute>
                    <AuthRoute path='/home' type="private">
                        <HomePage/>
                    </AuthRoute>
                    <AuthRoute path='/sources_list' type="private">
                        <SourcesPage/>
                    </AuthRoute>
                    <AuthRoute path='/' type="guest">
                        <SignInPage/>
                    </AuthRoute>
                </Switch>
            </Router>
        </>

    );
}

export default App;
