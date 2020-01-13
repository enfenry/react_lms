"use strict"

import React from 'react';
import PropTypes from 'prop-types';
// import BookActions from '../actions/bookActions';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const BookModal = (props) => {
    const {
        title,
        author,
        publisher,
        isAdding,
        modal,
        setModal
    } = props;

    const handleSubmit = () => {
        if(isAdding) {
            console.log('add!')
        }
        else {
            console.log('update!')
        }
        setModal();
    }

    return (
        <Modal isOpen={modal} toggle={setModal}>
            <ModalHeader toggle={setModal}>Modal title</ModalHeader>
            <ModalBody>
                <Form>
                    <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                        <input type="text" className="form-control" id="title-name" >{title}</input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Author:</label>
                        <textarea className="form-control" id="author-id">{author}</textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Publisher:</label>
                        <textarea className="form-control" id="publisher-id">{publisher}</textarea>
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
                <Button color="secondary" onClick={setModal}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

BookModal.propTypes = {
    title: PropTypes.string,
    author: PropTypes.number,
    publisher: PropTypes.number,
    isAdding: PropTypes.bool,
    modal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired
};

export default BookModal;