import React from "react";
import {prepareSourceName} from "../../utils/utils";
import {subscribeSource, unsubscribeSource} from "../../services/sources";
import {connect} from "react-redux";
import LoadingSpinner from "../other/LoadingSpinner";

const SourceCard = (props) => {
    const {name, description, category, isSourceSubscribed, id, isSubscribeLoading, isUnsubscribeLoading} = props

    const handleSubscribeClicked = (userId, sourceId) => {
        return () => {
            props.subscribeSource(userId, sourceId)
        }
    }

    const handleUnSubscribeClicked = (userId, sourceId) => {
        return () => {
            props.unsubscribeSource(userId, sourceId)
        }
    }

    return (<div className="source-card-container">
        <div className="source-body">
            <div className="circle">
                <p>{prepareSourceName(name)}</p>
            </div>
            <h2 className="source-name">{name}</h2>
            <div className="module line-clamp">
                <p className="source-description">{description}</p>
            </div>

        </div>
        <div>
            <div className="category-container">
                <p><b>Category: </b>{category}</p>
            </div>
            <div className="subscribe-container">
                {(isSubscribeLoading || isUnsubscribeLoading) ? <LoadingSpinner/> :(isSourceSubscribed ?
                    <button onClick={handleUnSubscribeClicked(props.userId, id)}>Unsubscribe</button> :
                    <button onClick={handleSubscribeClicked(props.userId, id)}>Subscribe</button>)}
            </div>
        </div>

    </div>)
}

const mapStateToProps = (state) => {
    return {
        userId: state.authReducer.userId,
        isSubscribeLoading: state.sourcesReducer.isSubscribeLoading,
        isUnsubscribeLoading: state.sourcesReducer.isUnsubscribeLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        subscribeSource: subscribeSource(dispatch),
        unsubscribeSource: unsubscribeSource(dispatch),
        dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SourceCard)
