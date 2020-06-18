import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = (props) => {
    console.log(props)
    const { isAuthUser, type } = props;
    if (type === "guest" && isAuthUser) return <Redirect to="/home" />;
    else if (type === "private" && !isAuthUser) {
        console.log("done")
        return <Redirect to="/"/>;
    }

    return <Route {...props} />;
};

const mapStateToProps = (state) => ({
    isAuthUser: state.authReducer.isAuthUser
});

export default connect(mapStateToProps)(AuthRoute);
