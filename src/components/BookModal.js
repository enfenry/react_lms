"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const BookModal = (props) => {
    const {
        modal,
        toggleModal
    } = props;

    const handleSubmit = () => {
        if(modal.book.isAdding) {
            BookActions.addBook(modal.book);
            console.log('add!')
        }
        else {
            BookActions.updateBook(modal.book);
            console.log('update!')
        }
        toggleModal();
    }

    return (
        <Modal isOpen={modal.show} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>{modal.isAdding ? `Add Book` : `Update Book`}</ModalHeader>
            <ModalBody>
                <Form>
                    <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                        <textarea className="form-control" id="title-name" defaultValue= {modal.title}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Author:</label>
                        <textarea className="form-control" id="author-id" defaultValue= {modal.author}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Publisher:</label>
                        <textarea className="form-control" id="publisher-id" defaultValue={modal.publisher} />
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

BookModal.propTypes = {
    modal: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired
};

export default BookModal;