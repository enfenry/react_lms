"use strict"

import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './header.js';
import Home from './home.js';
import BookList from '../components/BookList';
import AuthorList from '../components/AuthorList';
import BookStore from '../stores/bookStore';

export default function App() {

    const [book, setBook] = useState({
        bookList: [],
        authorList: [],
        readState: {
            pending: false,
            success: false,
            failure: false
        },
        error: ''
    });

    const _onBookChange = () => {
        setBook(BookStore.getAllBooks());
    }

    useEffect(() => {
        BookStore.addChangeListener(_onBookChange);

        return () => {
            BookStore.removeChangeListener(_onBookChange);
        }
    });

    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/books' render={(props) => <BookList {...props} book={book} />}/>
                <Route path='/authors' render={(props) => <AuthorList {...props} book={book} />}/>
            </Switch>
        </div>
    );
}
