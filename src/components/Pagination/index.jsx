import React from "react"
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss'

const Pagination = ({onChangePage}) => (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={event => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3} // в идеале бек должен вернуть кол-во страниц
        renderOnZeroPageCount={null}
    />
)

export default Pagination;