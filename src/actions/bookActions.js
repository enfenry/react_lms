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

        let payload = {
            token: "93yNwqSZUQ6sJMEtHFIs8Q",
            data: {
                book
            }
        };

        axios({
            method: "post",
            url: "https://app.fakejson.com/q",
            data: payload
        }).then(function (res) {
            Dispatcher.dispatch({
                actionType: 'add_books_successful',
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

        let payload = {
            token: "93yNwqSZUQ6sJMEtHFIs8Q",
            data: {
                book
            }
        };

        axios({
            method: "put",
            url: "https://app.fakejson.com/q",
            data: payload
        }).then(function (res) {
            console.log('updateBook res.data', res.data);
            Dispatcher.dispatch({
                actionType: 'update_books_successful',
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

        let payload = {
            token: "93yNwqSZUQ6sJMEtHFIs8Q",
            data: {
                book
            }
        };
        axios({
            method: "put",
            url: "https://app.fakejson.com/q",
            data: payload,
            params: { id: book.id }
        })
            .then(res => {
                console.log('deleteBook res.data', res.data);
                Dispatcher.dispatch({
                    actionType: 'delete_books_successful',
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