import {combineReducers} from 'redux'
import authedUser from './authedUser'
import tweets from './tweets'
import users from './users'

export default combineReducers({
  authedUser,
  users,
  tweets
})