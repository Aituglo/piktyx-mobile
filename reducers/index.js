import { combineReducers } from 'redux';
import auth from './auth';
import data from './data';
import pictures from './pictures';
import folders from './folders';

const rootReducer = () => combineReducers({
    /* your reducers */
    auth,
    pictures,
    folders,
    data,
});

export default rootReducer;
