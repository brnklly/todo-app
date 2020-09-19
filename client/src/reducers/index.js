import { combineReducers } from 'redux';
import alertReducer from './alert';
import userReducer from './user';

/* 
Root reducer containing: 

- Alert reducer 
- Auth reducer 
- User reducer 
- List reducer 
- Item reducer 

*/
export default combineReducers({
  alerts: alertReducer,
  user: userReducer,
});
