import { combineReducers } from 'redux';
import { authReducer } from '../store/auth/reducer'
import errorReducer from '../store/errors/reducer'
import loadingReducer from '../store/loading/reducer'
import { globalReducer } from '../store/global/reducer'
import { userReducer } from '../store/user/reducer'

export default combineReducers({
	auth: authReducer,
	loading: loadingReducer,
	errors: errorReducer,
	global: globalReducer,
    user: userReducer,
})
