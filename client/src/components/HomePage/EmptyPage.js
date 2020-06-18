import React from "react";
import {Link} from "react-router-dom";

const EmptyPage = () => {
    return(<div className="container-center page-container">
        <div className="empty-container">
            <h1>No News available</h1>
            <Link to="/sources_list">Go To Sources And Subscripe More Sources</Link>
        </div>
    </div>)
}

export default EmptyPage
