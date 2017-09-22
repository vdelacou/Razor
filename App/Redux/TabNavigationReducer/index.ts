
import { NavigationState, NavigationAction } from 'react-navigation';
import { TabNavigation } from '../../Navigation';

/**
 * This reducter is the reducer for the navigation router we define in the tab navigation
 * Each navigation request when user is loggin is manage by this reducer
 */
export function tabNavigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
    const newState = TabNavigation.router.getStateForAction(action, state);
    return newState || state;
}
