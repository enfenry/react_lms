"use strict"

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import BookActions from '../actions/bookActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const BookModal = (props) => {
  const {
    buttonLabel,
    className,
    modal,
    setModal
  } = props;

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

BookModal.propTypes = {
//     book: PropTypes.object.isRequired
    modal: PropTypes.bool,
    setModal: PropTypes.func,
    buttonLabel: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};

export default BookModal;