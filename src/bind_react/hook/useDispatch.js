import { useContext } from 'react';
import ReactReduxContext from '../ReactReduxContext';
export const useDispatch = () => {
  return useContext(ReactReduxContext).dispatch;
};
