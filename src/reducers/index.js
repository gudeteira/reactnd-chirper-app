import {combineReducers} from 'redux'
import authedUser from './authedUser'
import tweets from './tweets'
import users from './users'
import {loadingBarReducer} from 'react-redux-loading'

export default combineReducers({
  authedUser,
  users,
  tweets,
  loadingBar: loadingBarReducer
})