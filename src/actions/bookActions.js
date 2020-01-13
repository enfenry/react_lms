import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const BooksActions = {
    readBooks: function () {
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });
        axios.get(`http://www.mocky.io/v2/5e1bca1d3100006c004f33d8`)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: 'read_books_successful',
                    data: res.data
                });
            })
            .catch((error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'read_books_failure'
                });
            });
    },
    addBook: function (book) {
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });
        axios.post(`http://www.mocky.io/v2/5e1bca1d3100006c004f33d8`, book)
            .then(res => {
                console.log('res.data', res.data);
                Dispatcher.dispatch({
                    actionType: 'read_books_successful',
                    data: res.data
                });
            })
            .catch((error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'read_books_failure'
                });
            });
    },
    updateBook: function (book) {
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });
        axios.put(`http://www.mocky.io/v2/5e1bca1d3100006c004f33d8`, book)
            .then(res => {
                console.log('res.data', res.data);
                Dispatcher.dispatch({
                    actionType: 'read_books_successful',
                    data: res.data
                });
            })
            .catch((error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'read_books_failure'
                });
            });
    },
    deleteBook: function (book) {
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });
        axios.delete(`http://www.mocky.io/v2/5e1bca1d3100006c004f33d8`, { params: { id: book.id } })
            .then(res => {
                console.log('res.data', res.data);
                Dispatcher.dispatch({
                    actionType: 'read_books_successful',
                    data: res.data
                });
            })
            .catch((error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'read_books_failure'
                });
            });
    }
}

module.exports = BooksActions;