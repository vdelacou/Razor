import React, { Component } from 'react';
import { View, Text } from 'react-native';

// component style
import { style } from './style';
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

// component own props
interface AppOwnProps { }

// component props
interface AppProps extends AppOwnProps { }

// component State
interface AppStateProps { }

class AppComponent extends Component<AppProps, AppStateProps>  {

    public render(): JSX.Element {
        return (
            <View style={style.container}>
                <Text> Hello Typescript </Text>
            </View>
        );
    }
}

export const App = AppComponent;
