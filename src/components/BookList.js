"use strict"

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';

export default function BookList(props) {

    useEffect(() => {
        BookActions.readBooks();
        props.setBook(props.book);
    }, [props.book.readState]);

    const createBookRow = (book) => {
        return (
            <tr key={book.book_id}>
                <td> {book.book_id} </td>
                <td> {book.title} </td>
                <td> {book.author} </td>
            </tr>
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('hitting handleSubmit');
    }

    const renderContent = () => {
        let content = '';

        if (props.book.readState.pending) {
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }


        if (props.book.readState.success) {
            content =
                (<table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.book.bookList.map(createBookRow, this)}
                    </tbody>
                </table>)
        }

        if (props.book.readState.failure) {
            content =
                (
                    <div className="alert alert-danger" role="alert">
                        Error while loading books!
                </div>
                )
        }
        return content;
    }

    return (
        <div>
            <h1>Books</h1>
            {renderContent()}
            <form>
                <input id="add-book-title" placeholder="title"></input>
                <input id="add-book-author" placeholder="author"></input>
                <button type="submit" onClick={handleSubmit}>Submit Book</button>
            </form>
        </div>
    );
}


BookList.propTypes = {
    book: PropTypes.object.isRequired,
    setBook: PropTypes.func.isRequired
};



