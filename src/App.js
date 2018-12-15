import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchQuery: '',
      searchResults: [],
    };
    this.getUserBooks = this.getUserBooks.bind(this);
    this.onShelfChange = this.onShelfChange.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCloseButton = this.onCloseButton.bind(this);
  }

  componentDidMount() {
    this.getUserBooks();
  }

  getUserBooks() {
    BooksAPI.getAll()
      .then((res) => {
        this.setState({
          books: (
            res.map(el => ({
              id: el.id,
              title: el.title,
              authors: el.authors,
              publisher: el.publisher,
              cover: el.imageLinks.thumbnail,
              shelf: el.shelf,
            }))
          ),
        });
      });
  }

  onShelfChange(bookId, shelf) {
    BooksAPI.update({ id: bookId }, shelf)
      .then(() => {
        this.getUserBooks();
      });
  }

  searchBooks() {
    BooksAPI.search(this.state.searchQuery)
      .then((res) => {
        if (Array.isArray(res)) {
          this.setState({
            searchResults: (
              res
                .filter(el => (!!(el.imageLinks && el.authors)))
                .map((el) => {
                  const inShelf = this.state.books.find(book => book.id === el.id);
                  if (inShelf) {
                    el.shelf = inShelf.shelf;
                  }
                  return el;
                })
            ),
          });
        }
      });
  }

  onInputChange(query) {
    this.setState({
      searchQuery: query,
      searchResults: [],
    });
  }

  onCloseButton() {
    this.setState({
      searchQuery: '',
      searchResults: [],
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => <BookShelf books={this.state.books} onShelfChange={this.onShelfChange} />} />
          <Route exact path="/search" render={() => <SearchPage library={this.state.books} searchQuery={this.state.searchQuery} searchResults={this.state.searchResults} onShelfChange={this.onShelfChange} searchBooks={this.searchBooks} onInputChange={this.onInputChange} onCloseButton={this.onCloseButton} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
