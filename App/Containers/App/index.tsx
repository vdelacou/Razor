import React, { Component } from 'react';
import { Provider } from 'react-redux';
// app component
import { createCustomStore } from '../../Store';
import { RootContainer } from '../RootContainer';

// component own props
interface AppOwnProps { }

// component props
interface AppProps extends AppOwnProps { }

// component State
interface AppStateProps { }

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * The purpose of this is to setup Redux or any other non-visual "global" modules
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class AppComponent extends Component<AppProps, AppStateProps>  {

    public render(): JSX.Element {
        return (
            <Provider store={createCustomStore}>
                <RootContainer />
            </Provider>
        );
    }
}

export const App = AppComponent;
