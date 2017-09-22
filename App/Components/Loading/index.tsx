import React, { Component } from 'react';
import { View, Text } from 'react-native';

// component own props
interface LoadingOwnProps { }

// component props
interface LoadingProps extends LoadingOwnProps { }

// component State
interface LoadingStateProps { }

/**
 * this component is just to show a loading
 */
class LoadingComponent extends Component<LoadingProps, LoadingStateProps>  {

    public render(): JSX.Element {
        return (
            <View>
                <Text>LOADING ...</Text>
            </View>
        );
    }
}

export const Loading = LoadingComponent;
