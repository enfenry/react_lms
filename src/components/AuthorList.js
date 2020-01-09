"use strict"

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';

export default function AuthorList(props) {

    const createAuthorRow = (author) => {
        return (
            <tr key={author.author_id}>
                <td> {author.author_id} </td>
                <td> {author.author} </td>
            </tr>
        );
    }

    useEffect(() => {
        BookActions.readBooks();
    });

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
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>

                    {props.book.authorList.map(createAuthorRow, this)}
                </tbody>
            </table>)
    }

    if (props.book.readState.failure) {
        content =
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading authors!
                </div>
            )
    }

    return (
        <div>
            <h1>Authors</h1>
            {content}
        </div>
    );
}

AuthorList.propTypes = {
    book: PropTypes.object.isRequired
};



