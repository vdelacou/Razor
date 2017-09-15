// app component
import { LoadingState } from '../../../Redux';
import { BeverageState } from '../../../Redux';

// component State inteface for all the reducers the application use
// so by using this interface your components have access to all the reducers connected
export interface RootReducerState {
    // name given to the reducer in the create store function
    beverageReducer?: BeverageState;
    loadingReducer?: LoadingState;
}

