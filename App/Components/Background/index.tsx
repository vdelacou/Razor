import React, { Component } from 'react';
import { ImageBackground, ViewProperties } from 'react-native';
// component style
import { style } from './style';

// Component own local props
export interface BackgroundOwnProps {
}

// Component Props
interface BackgroundProps extends BackgroundOwnProps, ViewProperties { }

// Component State
interface BackgroundState { }

/**
 * this component display all the beverage Background in a list
 */
class BackgroundComponent extends Component<BackgroundProps, BackgroundState> {

    public render(): JSX.Element {
        return (
            <ImageBackground
                source={require('../../Assets/Image/Background/background.png')}
                resizeMode="cover"
                style={style.container}
            >
                {this.props.children}
            </ImageBackground>
        );
    }
}

export const Background = BackgroundComponent;
