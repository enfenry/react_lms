import Dispatcher from '../dispatcher/appDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _bookStore = {
    book: {
        bookList: [],
        readState: {
            pending: false,
            success: false,
            failure: false
        },
        error: ''
    }
};

class BookStoreClass extends EventEmitter {

    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }


    getAllBooks() {
        return _bookStore.book;
    }

    resetReadState() {
        _bookStore.book.readState = {
            pending: false,
            success: false,
            failure: false
        }
    }
}

const BookStore = new BookStoreClass();

Dispatcher.register((action) => {

    switch (action.actionType) {
        case 'read_books_successful':
            BookStore.resetReadState();
            _bookStore.book.bookList = action.data;
            _bookStore.book.readState.success = true;
            BookStore.emitChange();
            break;
        case 'read_books_failure':
            BookStore.resetReadState();
            _bookStore.book.readState.failure = true;
            BookStore.emitChange();
            break;
        case 'read_books_started':
            BookStore.resetReadState();
            _bookStore.book.readState.pending = true;
            BookStore.emitChange();
            break;
        case 'add_books_successful': {
            BookStore.resetReadState();
            let newBook = {
                id: _bookStore.book.bookList.length + 1,
                title: action.data.book.title,
                author: action.data.book.author,
                publisher: action.data.book.publisher
            };
            _bookStore.book.bookList.push(newBook);
            _bookStore.book.readState.success = true;
            BookStore.emitChange();
            break;
        }
        case 'update_books_successful': {
            BookStore.resetReadState();
            let newBook = {
                id: action.data.book.id,
                title: action.data.book.title,
                author: action.data.book.author,
                publisher: action.data.book.publisher
            };
            let index = _bookStore.book.bookList.findIndex(book => book.id == newBook.id);
            _bookStore.book.bookList.splice(index, 1, newBook);
            _bookStore.book.readState.success = true;
            BookStore.emitChange();
            break;
        }
        case 'delete_books_successful': {
            BookStore.resetReadState();
            let index = _bookStore.book.bookList.findIndex(book => book.id == action.data.book.id);
            _bookStore.book.bookList.splice(index, 1);
            _bookStore.book.readState.success = true;
            BookStore.emitChange();
            break;
        }
        default:
            return;
    }
});

export default BookStore;