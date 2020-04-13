import React from 'react'

const QuestionPagination = ({ perPage, totalQuestion, paginateQuestion}) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalQuestion / perPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav style={{marginTop:"5px"}}>
            <ul className="pagination">
                {
                    pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <span
                                className="page-link"
                                onClick={() => paginateQuestion(number)}
                                style={{cursor: "pointer"}}
                            >
                                {number}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default QuestionPagination