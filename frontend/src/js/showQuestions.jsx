import React, { Component } from "react";
import QuestionPagination from './questionPagination'

class ShowQuestions extends Component {
  state = {
    searchQuestions: [],
    loading: false,
    currentPage: 1,
    perPage: 5,
    searchInput: '',
    searchInputError: '',
    noResult: false
  }

  componentDidMount() {
    this.setState({
      loading: true,
      searchQuestions: []
    })
    fetch(
      'http://127.0.0.1:8000/search/cache'
    )
      .then(res => res.json())
      .then(res => {
        if (res.status) {

          this.setState({
            searchQuestions: res.data,
            searchInput: res.question,
            loading: false
          })

        } else {
          this.setState({
            loading: false
          })

        }
      })
  }
  searchInputHandler = (e) => {

    let value = e.target.value
    this.setState({
      searchInput: value,
      searchInputError: '',
      noResult: false
    })
  }

  enterForSearch = (e) => {
    if (e.key === 'Enter') {
      this.handleSearchQuestions()
    }
  }

  handleSearchQuestions = () => {

    if (this.state.searchInput) {

      this.setState({
        loading: true,
        searchQuestions: []
      })

      fetch(
        `http://127.0.0.1:8000/search/search-questions/${this.state.searchInput}`
      )
        .then(res => res.json())
        .then(res => {
          if (res.status) {

            this.setState({
              searchQuestions: res.data,
              loading: false
            })

          } else {
            this.setState({
              loading: false,
              noResult: true
            })

          }
        })

    } else {
      this.setState({
        searchInputError: 'Search field not empty, Enter questions'
      })
    }
  }

  paginateQuestion = (pageNumber) => {
    this.setState({
      currentPage: pageNumber
    })
  }


  render() {
    
    let loadingStatus = this.state.loading

    const indexLastPage = this.state.currentPage * this.state.perPage;
    const indexFirstPage = indexLastPage - this.state.perPage;

    const currentPageQuestion = this.state.searchQuestions.slice(indexFirstPage, indexLastPage);

    return (
      <div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={this.state.searchInput}
            onChange={(e) => this.searchInputHandler(e)}
            onKeyPress={(e) => this.enterForSearch(e)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="submit"
              onClick={this.handleSearchQuestions}
            >Search
            </button>
          </div>
        </div>
        <div className="check-point-name-qx01 m-0 p-0" style={{ color: "red" }}>{this.state.searchInputError}</div>

        <h6 className="text-primary mb-3">StackOverflowAPI for searching questions</h6>

        {
          loadingStatus ? <p>Loading...</p> :
            <>{this.state.noResult ? <p>0 Result</p>: null}

              <ul className="list-group list-group-flush custom-list-height4x0">

                {
                  currentPageQuestion.map((item, i) => (
                    <li key={i} className="list-group-item">
                      <div className="d-flex">
                        <div>

                          <strong className="m-1">{item["score"]}</strong>
                          <p className="m-1">votes</p>
                          <strong className="m-1">{item["answer_count"]}</strong>
                          <p className="m-1">answers</p>
                          <p className="m-1"><strong>{item['view_count']}</strong> views</p>
                        </div>
                        <div>
                          <h4 >
                            <a href={item["link"]} target="_blank">{item["title"]}</a>
                          </h4>

                          <div className='d-flex' style={{ marginLeft: "2%" }}>

                            {
                              item["tags"].map((tag, i) => (
                                <div >
                                  <button
                                    style={{ border: "none", background: "none", outline: "none" }}
                                  >{tag}
                                  </button>

                                </div>
                              ))
                            }

                          </div>

                        </div>
                      </div>
                    </li>
                  ))
                }

              </ul></>
        }

        <QuestionPagination
          perPage={this.state.perPage}
          totalQuestion={this.state.searchQuestions.length}
          paginateQuestion={this.paginateQuestion}
        />

      </div>
    );
  }

}

export default ShowQuestions;