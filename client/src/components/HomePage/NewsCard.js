import React from "react";
import '../../styles/news.scss';
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import createDOMPurify from "dompurify";
const NewsCard = (props) => {
    const DOMPurify = createDOMPurify(window);
    const {title, description, publishedAt, author, urlToImage, url} = props;
    return(<div className="news-card-container">
        <div className="news-image-container" >
            <img src={urlToImage} alt={title} onError={(event)=>{
                // console.log("AAA", event.target)
                event.target.src='../../../img/BREAKING-NEWS.png'
            }}/>
        </div>
        <div className="news-card-body">
            <div className="module title-clamp news-title" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`<a href=${url}><p>${title}</p></a>`)}}>

            </div>
            <div className="module line-clamp">
                <p className="source-description">{description}</p>
            </div>
            <div className="details-container">
                <div><FontAwesomeIcon icon={faClock} color="#ffffff"/> <p className="published-at">{publishedAt}</p></div>
                {/*<div><p><b>BY :</b>{author}</p></div>*/}
            </div>
        </div>

    </div>)
}

export default NewsCard
