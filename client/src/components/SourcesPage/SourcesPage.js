import React, {useEffect} from "react";
import '../../styles/sources.scss'
import Header from "../other/Header";
import SourceCard from "./SourceCard";
import {getAllSources} from "../../services/sources";
import {connect} from "react-redux";
import Pagination from "../other/Pagination";
import {setCurrentPage, resetStore} from "../../actions/sources";
import {setTitle} from "../../actions/appHead";
import EmptyPage from "./EmptyPage";
import LoadingSpinner from "../other/LoadingSpinner";

const SourcesPage = (props) => {
    useEffect(()=>{
        props.getAllSources(`page=${props.currentPage}`)
    },[props.currentPage])

    useEffect(()=>{
        props.dispatch(setTitle('Sources'))
        return () => {
            props.dispatch(resetStore() )
        }
    },[])
    const handleChangePage = (page) => {
        props.dispatch(setCurrentPage(page))
    }
    return(<div className="container-horizontal page-container">
        <Header/>
        {props.isLoading && <LoadingSpinner isLoading={props.isLoading}/>}
        {!props.isLoading && (props.sources.length === 0 ? <EmptyPage/> :<div className="content">
            <div className="cards-container">
                {props.sources.map((source) => <SourceCard key={source.id} {...source}/>)}
            </div>
            <Pagination page={props.currentPage} hasNext={props.pages.hasNext} hasPrevious={props.pages.hasPrevious}
                        setPage={handleChangePage}/>
        </div>)}
    </div>)
}
const mapStateToProps = (state) => {
    return {
        sources: state.sourcesReducer.sources,
        pages: state.sourcesReducer.pages,
        currentPage: state.sourcesReducer.currentPage,
        isLoading: state.sourcesReducer.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSources: getAllSources(dispatch),
        dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SourcesPage)
