import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';

const AuthorsActions = {
    readAuthors: function(){
        Dispatcher.dispatch({
            actionType: 'read_authors_started'
        });
        axios.get(`http://www.mocky.io/v2/5e1bcad53100007a004f33da`)
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'read_authors_successful',
                data:  res.data
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_authors_failure'
            });
        });
    }
}

module.exports = AuthorsActions;