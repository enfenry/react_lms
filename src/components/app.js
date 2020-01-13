"use strict"

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './header.js';
import Home from './home.js';
import { AuthorList } from '../components/AuthorList';
import { BookList } from '../components/BookList';
import AuthorStore from '../stores/authorStore';
import BookStore from '../stores/bookStore';


export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: {
                show: false,
                book: {
                    title: '',
                    author: null,
                    publisher: null,
                    isAdding: false,
                }
            },
            book: {
                bookList: [],
                readState: {
                    pending: false,
                    success: false,
                    failure: false
                },
                error: ''
            },
            author: {
                authorList: [],
                readState: {
                    pending: false,
                    success: false,
                    failure: false
                },
                error: ''
            }
        }
    }

    toggleModal() {
        // this.setState({ modal: { show: !(this.state.modal.show) } })

        this.setState(state => (({
            modal: {
                ...state.modal,
                show: !(this.state.modal.show)
            }
        })))
    }

    fillModal(book, isAdding) {
        this.setState(state => (({
            modal: {
                ...state.modal,
                book: {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    publisher: book.publisher,
                    isAdding: isAdding
                }
            }
        })))
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/books' render={(props) => (
                        <BookList {...props} book={this.state.book} modal={this.state.modal} toggleModal={this.toggleModal.bind(this)}
                            fillModal={this.fillModal.bind(this)} />
                    )} />
                    <Route path='/authors' render={(props) => (<AuthorList {...props} author={this.state.author} />)} />
                </Switch>
            </div>
        );
    }

    componentDidMount() {
        BookStore.addChangeListener(this._onBookChange.bind(this));
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this));
    }

    componentWillUnmount() {
        BookStore.removeChangeListener(this._onBookChange.bind(this));
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this));
    }

    _onBookChange() {
        this.setState({ book: BookStore.getAllBooks() });
    }

    _onAuthorChange() {
        this.setState({ author: AuthorStore.getAllAuthors() });
    }
}