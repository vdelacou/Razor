import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { View, ViewProperties } from 'react-native';
// app component
import { getBeverage, GetBeverageAction } from '../../Redux';
import { RootReducerState } from '../../Store';
import { Beverage } from '../../Models';
import { Welcome, WelcomeOwnProps, BeverageWelcomeProps } from '../../Components';
// component style
import { style } from './style';

// connected props with reducer state
interface HomeScreenReduxProps extends WelcomeOwnProps { }

// connected functions to dispatch action
interface HomeScreenDispatchProps {
    callBeverage(): GetBeverageAction;
}

// component own local props
interface HomeScreenOwnProps extends ViewProperties { }

// component props (merge of all the props)
interface HomeScreenProps extends HomeScreenReduxProps, HomeScreenDispatchProps, HomeScreenOwnProps { }

// component State
interface HomeScreenStateProps extends RootReducerState { }

/**
 * this component is a Home screen where all the datas are fetch
 */
class HomeScreenComponent extends Component<HomeScreenProps, HomeScreenStateProps> {

    public componentDidMount(): void {
        this.props.callBeverage();
    }

    public render(): JSX.Element {
        return (
            <View style={style.container}>
                <Welcome style={style.welcome} beverages={this.props.beverages} />
            </View>
        );
    }
}

function mapStateToProps(state: HomeScreenStateProps): HomeScreenReduxProps {
    if (state.beverageReducer && state.beverageReducer.beverages) {
        const beveragesReducer: Array<Beverage> = state.beverageReducer.beverages;
        const beverages: Array<BeverageWelcomeProps> = beveragesReducer
            .map(function (beverage: Beverage) {
                const beverageWelcomeProps: BeverageWelcomeProps = {
                    beverageCategory: beverage.cat,
                };
                return beverageWelcomeProps;
            })
            .filter(function (beverageWelcomeProps: BeverageWelcomeProps, index: number, self: Array<BeverageWelcomeProps>) {
                return (self.findIndex(find => find.beverageCategory === beverageWelcomeProps.beverageCategory) === index);
            })
            .sort(function (first: BeverageWelcomeProps, second: BeverageWelcomeProps) {
                return first.beverageCategory.localeCompare(second.beverageCategory);
            });
        const welcomeOwnProps: WelcomeOwnProps = {
            beverages: beverages,
        };
        return welcomeOwnProps;
    }
    // if state is not filled
    return {
        beverages: new Array<BeverageWelcomeProps>(),
    };
}

function mapDispatchToProps(dispatch: Dispatch<HomeScreenDispatchProps>): HomeScreenDispatchProps {
    return {
        callBeverage: function () {
            return dispatch(getBeverage());
        },
    };
}

export const HomeScreen = connect<HomeScreenReduxProps, HomeScreenDispatchProps, HomeScreenOwnProps>
    (mapStateToProps, mapDispatchToProps)(HomeScreenComponent);
