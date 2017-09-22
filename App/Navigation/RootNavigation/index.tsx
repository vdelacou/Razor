import React, { Component } from 'react';
import { BackHandler, NetInfo, Alert } from 'react-native';
import ReactNavigation,
{ NavigationProp, NavigationScreenProp, NavigationDispatch, NavigationAction, NavigationState } from 'react-navigation';
import { connect } from 'react-redux';
import { RootReducerState } from '../../Store';
import { TabNavigation } from '../../Navigation';
import LoadingScreen from '../../Containers/LoadingScreen';

// connected reducer props
export interface RootNavigationReduxProps {
    nav: NavigationState;
    dispatch?: NavigationDispatch<NavigationAction>;
    noData: Boolean;
    apiError: Boolean;
}

// component props
interface RootNavigationProps extends RootNavigationReduxProps { }

// component reducer State
interface RootNavigationReduxState extends RootReducerState { }

// component State
interface RootNavigationState {
    isConnected: Boolean;
}

// this component push the screens manage by Redux
class RootNavigationComponent extends Component
    <RootNavigationProps, RootNavigationReduxState & RootNavigationState> {

    public constructor(props: RootNavigationProps) {
        super(props);
        this.state = {
            isConnected: true,
        };
    }

    componentDidMount() {
        // manage the back button on android
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        // manage when the app is offline
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange.bind(this));
    }
    componentWillUnmount() {
        // manage the back button on android
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        // manage when the app is offline
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange.bind(this));
    }

    public render(): JSX.Element {

        // use the props to create navigation object properties
        const navigation: NavigationProp<NavigationState, NavigationAction> = {
            state: this.props.nav,
            dispatch: this.props.dispatch,
        };

        // use redux helper provide by react navigation
        const navigationScreenProp: NavigationScreenProp<NavigationState, NavigationAction> =
            ReactNavigation.addNavigationHelpers(navigation);

        if (!this.state.isConnected) {
            Alert.alert('Disconnected', 'We are sorry but to use our App you need to be connected to internet.');
        }
        if (this.props.noData) {
            return (
                < LoadingScreen />
            );
        } else {
            if (this.props.apiError) {
                Alert.alert('Error', 'We are sorry but an unexpected error occurs. Please try again later.');
            }
            return (
                < TabNavigation navigation={navigationScreenProp} />
            );
        }

    }

    // manage when the app is offline
    private handleConnectionChange(isConnected: boolean) {
        this.setState({
            isConnected: isConnected,
        });
    }

    // manage the back button on android
    private handleBackPress() {
        // use the props to create navigation object properties
        const navigation: NavigationProp<NavigationState, NavigationAction> = {
            state: this.props.nav,
            dispatch: this.props.dispatch,
        };
        const backNavigation = ReactNavigation.addNavigationHelpers(navigation);
        backNavigation.goBack();
        return true;
    }
}

function mapStateToProps(state: RootNavigationReduxState): RootNavigationReduxProps {
    const injectedProps: RootNavigationReduxProps = {
        nav: state.tabNavReducer,
        noData: state.beverageReducer.beverages.length === 0,
        apiError: state.loadingReducer.fetchError,
    };
    return injectedProps;
}

export const RootNavigation = connect(mapStateToProps, null)(RootNavigationComponent);
