import { createStore,combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import {QuanLyNguoiDungReducer} from 'redux/reducers/QuanLyNguoiDungReducer';
import {QuanLyPhongVeReducer} from 'redux/reducers/QuanLyPhongVeReducer';
import thunk from 'redux-thunk';
import { LoadingReducer } from 'redux/reducers/LoadingReducer';

const composeEnhancers = composeWithDevTools(applyMiddleware(thunk));

const rootReducer = combineReducers({
    QuanLyNguoiDungReducer,
    QuanLyPhongVeReducer,
    LoadingReducer,
});


const store = createStore(rootReducer,composeEnhancers);

export default store;