import rankListReducer from './rankList';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    rankList: rankListReducer,
});

export default rootReducer;