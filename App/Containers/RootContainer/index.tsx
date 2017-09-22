import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
// app component
import { RootNavigation } from '../../Navigation';
// component style
import { style } from './style';

// component own props
interface RootContainerOwnProps { }

// component props
interface RootContainerProps extends RootContainerOwnProps { }

// component State
interface RootContainerStateProps { }

/**
 * This is the first visual component in the app.  It is the ancestor of all other screens and components.
 */
class RootContainerComponent extends Component<RootContainerProps, RootContainerStateProps> {

    public render(): JSX.Element {
        return (
            <View style={style.container} >
                <StatusBar barStyle="light-content" />
                <RootNavigation />
            </View>
        );
    }
}

export const RootContainer = RootContainerComponent;
