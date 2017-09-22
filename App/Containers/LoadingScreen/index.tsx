import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { View } from 'react-native';
// app component
import { getBeverage, GetBeverageAction } from '../../Redux';
import { Loading } from '../../Components';
// component style
import { style } from './style';

// connected props with reducer state
interface LoadingScreenReduxProps { }

// connected functions to dispatch action
interface LoadingScreenDispatchProps {
    callBeverage(): GetBeverageAction;
}

// component own local props
interface LoadingScreenOwnProps { }

// component props (merge of all the props)
interface LoadingScreenProps extends LoadingScreenReduxProps, LoadingScreenDispatchProps, LoadingScreenOwnProps { }

// component State
interface LoadingScreenStateProps { }

/**
 * this component is a loading screen where all the datas are fetch before display the tabs
 */
class LoadingScreen extends Component<LoadingScreenProps, LoadingScreenStateProps> {

    public componentDidMount(): void {
        this.props.callBeverage();
    }

    public render(): JSX.Element {
        return (
            <View style={style.container}>
                <Loading />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch<LoadingScreenDispatchProps>): LoadingScreenDispatchProps {
    return {
        callBeverage: function () {
            return dispatch(getBeverage());
        },
    };
}

export default connect<LoadingScreenReduxProps, LoadingScreenDispatchProps, LoadingScreenOwnProps>
    (null, mapDispatchToProps)(LoadingScreen);
