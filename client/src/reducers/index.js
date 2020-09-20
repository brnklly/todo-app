import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import listReducer from './list';

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
  auth: authReducer,
  lists: listReducer,
});
