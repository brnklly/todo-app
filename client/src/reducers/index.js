import { combineReducers } from 'redux';
import alertReducer from './alert';

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
});
