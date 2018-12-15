import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchPage extends Component {
  componentDidUpdate(prevProps, prevState) {
    if ((!this.props.searchResults.length && this.props.searchQuery) || (this.props.searchResults.length && prevProps.library !== this.props.library)) {
      this.props.searchBooks();
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={this.props.onCloseButton}>Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.props.searchQuery} onChange={ev => this.props.onInputChange(ev.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchResults.map(el => (
              <li key={el.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${el.imageLinks.thumbnail}")` }} />
                    <div className="book-shelf-changer">
                      <select value={el.shelf ? el.shelf : 'none'} onChange={ev => this.props.onShelfChange(el.id, ev.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{el.title}</div>
                  {(() => {
                    if (el.authors) {
                      return el.authors.map(el => (
                        <div className="book-authors" key={el}>{el}</div>
                      ));
                    }
                    return (
                      <div className="book-authors" key={el}>{el.publisher}</div>
                    );
                  })()}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
