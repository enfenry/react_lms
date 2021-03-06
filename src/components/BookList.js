"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import BookModal from '../components/BookModal';
import { Button } from 'reactstrap';

export class BookList extends React.Component {

    createBookRow(book) {
        return (
            <tr key={book.id}>
                <td> {book.id} </td>
                <td> {book.title} </td>
                <td> {book.author} </td>
                <td> {book.publisher} </td>
                <td><button className="btn btn-secondary update" onClick={() => this.handleUpdate(book)}>Update</button></td>
                <td><button className="btn btn-danger delete" onClick={() => this.handleDelete(book)}>Delete</button></td>
            </tr>
        );
    }

    handleAdd() {
        this.props.toggleModal();
        this.props.fillModal({},true);
    }

    handleUpdate(book) {
        this.props.toggleModal();
        this.props.fillModal(book,false);
        console.log('book at handleUpdate',book);
    }

    handleDelete(book) {
        console.log('book at handleDelete', book);
        BookActions.deleteBook(book);
    }

    componentDidMount() {
        BookActions.readBooks();
    }

    render() {

        let content = '';

        if (this.props.book.readState.pending) {
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }


        if (this.props.book.readState.success) {
            content =
                (<table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.book.bookList.map(this.createBookRow, this)}
                    </tbody>
                </table>)
        }

        if (this.props.book.readState.failure) {
            content =
                (
                    <div className="alert alert-danger" role="alert">
                        Error while loading books!
                </div>
                )
        }

        return (
            <div>
                <h1>Books</h1>
                <BookModal modal={this.props.modal} toggleModal={this.props.toggleModal} handleInputChange={this.props.handleInputChange} />
                <Button color="primary" onClick={() => {this.handleAdd()}}>Add Book</Button>
                {content}
            </div>
        );
    }
}

BookList.propTypes = {
    modal: PropTypes.object,
    toggleModal: PropTypes.func,
    fillModal: PropTypes.func,
    handleInputChange: PropTypes.func,
    book: PropTypes.object.isRequired
};



