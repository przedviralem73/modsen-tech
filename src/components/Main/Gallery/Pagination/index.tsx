import React from "react";
import '../../Gallery/style.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {

    const handlePageClick = (page: number) => {
        if(page >= 1 &&  page !== currentPage && page <= totalPages){
            onPageChange(page);
        }
    }

    return (
        <div className="gallery__pagination">
                <ul className="gallery__pagination-ul">
                    <li
                     className={`gallery__pagination-li ${currentPage === 1 ? "disabled" : ""}`}
                     onClick={() => handlePageClick(currentPage - 1)}
                     >&lt;</li>
                    {Array.from({length: totalPages}, (tP, index) => index + 1).map((page) => (
                        <li
                         key={page} 
                         className={`gallery__pagination-li ${currentPage === page ? 'active' : ''}`}
                         onClick={() => handlePageClick(page)}
                        >{page}</li>
                    ))}
                    <li
                     className={`gallery__pagination-li ${currentPage === totalPages ? 'disabled' : ''}`}
                     onClick={() => handlePageClick(currentPage + 1)}
                     >&gt;</li>
                </ul>
            </div>
    );
}

export default Pagination;