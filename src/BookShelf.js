import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BookShelf extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.filter(el => el.shelf === 'currentlyReading').map(el => (
                    <li key={el.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${el.cover}")` }} />
                          <div className="book-shelf-changer">
                            <select value={el.shelf} onChange={ev => this.props.onShelfChange(el.id, ev.target.value)}>
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.filter(el => el.shelf === 'wantToRead').map(el => (
                    <li key={el.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${el.cover}")` }} />
                          <div className="book-shelf-changer">
                            <select value={el.shelf} onChange={ev => this.props.onShelfChange(el.id, ev.target.value)}>
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.filter(el => el.shelf === 'read').map(el => (
                    <li key={el.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${el.cover}")` }} />
                          <div className="book-shelf-changer">
                            <select value={el.shelf} onChange={ev => this.props.onShelfChange(el.id, ev.target.value)}>
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
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BookShelf;
