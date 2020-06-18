import React from "react";
import '../../styles/pagination.scss'
const Pagination = ({page,setPage,hasPrevious,hasNext, disabled}) => {
    return(<div className="center">
            <div className="pagination">
                {hasPrevious && <a onClick={()=>{
                    if(!disabled){
                        setPage(page-1)
                    }
                }}>&laquo;</a>}
                {(hasPrevious || hasNext) && <a className="active">{page}</a>}
                {hasNext && <a onClick={()=>{
                    if(!disabled){
                        setPage(page+1)
                    }
                }}>&raquo;</a>}
            </div>
        </div>)
}

export default Pagination
