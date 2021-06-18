import { useContext } from 'react';
import ReactReduxContext from '../ReactReduxContext';
// this hook should not use frequently
export const useStore = () => {
  return useContext(ReactReduxContext);
};
