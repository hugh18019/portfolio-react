import { combineReducers } from 'redux';
import reducers from './reducers'

const rootReducer = combineReducers({
    main: reducers
})

export default rootReducer;