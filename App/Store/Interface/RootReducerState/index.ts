import { NavigationState } from 'react-navigation';
// app component
import { BeverageState, LoadingState } from '../../../Redux';
import { } from '../../../Redux';

// component State inteface for all the reducers the application use
// so by using this interface your components have access to all the reducers connected
export interface RootReducerState {
    // name given to the reducer in the create store function
    tabNavReducer?: NavigationState;
    beverageReducer?: BeverageState;
    loadingReducer?: LoadingState;
}
