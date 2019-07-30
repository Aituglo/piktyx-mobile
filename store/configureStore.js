import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import thunkMiddleware from 'redux-thunk';


export default createStore(
    rootReducer(), 
    compose(
        applyMiddleware(
            thunkMiddleware
        ),
    )
)
