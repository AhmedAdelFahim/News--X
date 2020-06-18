import React, {useEffect} from "react";
import Header from "../other/Header";
import Pagination from "../other/Pagination";
import NewsCard from "./NewsCard";
import {getAllNews} from "../../services/news";
import {connect} from "react-redux";
import {setCurrentPage} from "../../actions/news";
import {resetStore} from "../../actions/news";
import {setTitle} from "../../actions/appHead";
import EmptyPage from "./EmptyPage";
import LoadingSpinner from "../other/LoadingSpinner";

const HomePage = (props) => {

    useEffect(() => {
        props.getAllNews(`page=${props.currentPage}`)
    }, [props.currentPage])

    useEffect(() => {
        props.dispatch(setTitle('Home'))
        return () => {
            props.dispatch(resetStore())
        }
    }, [])

    const handleChangePage = (page) => {
        props.dispatch(setCurrentPage(page))
    }
    return (<div className="container-horizontal page-container">
        <Header/>

        {props.isLoading && <LoadingSpinner isLoading={props.isLoading}/>}
        {!props.isLoading && (props.news.length === 0 ? <EmptyPage/> : <div className="content">
            <div className="cards-container">
                {props.news.map((news) => {
                    return <NewsCard key={news.title} {...news}/>
                })}
            </div>
            <Pagination page={Number(props.pages.pageNumber)} hasNext={props.pages.hasNext}
                        hasPrevious={props.pages.hasPrevious} setPage={handleChangePage} disabled={props.isLoading}/>
        </div>)}
    </div>)
}

const mapStateToProps = (state) => {
    return {
        news: state.newsReducer.news,
        pages: state.newsReducer.pages,
        currentPage: state.newsReducer.currentPage,
        isLoading: state.newsReducer.isLoading,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllNews: getAllNews(dispatch),
        dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
