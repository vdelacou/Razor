import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ViewProperties } from 'react-native';
import { NavigationScreenProps, NavigationStackScreenOptions } from 'react-navigation';
// app component
import { RootReducerState } from '../../Store';
import { TabNavigation, TitleNavigationParam } from '../../Navigation';
import { Beverage } from '../../Models';
import { TitleList, TitleListOwnProps, BeverageTitleListProps } from '../../Components';
// component style
import { style } from './style';

// connected props with reducer state
interface TitleListScreenReduxProps extends TitleListOwnProps { }

// connected functions to dispatch action
interface TitleListScreenDispatchProps { }

// component own local props
interface TitleListScreenOwnProps extends ViewProperties { }

// component props (merge of all the props)
interface TitleListScreenProps extends TitleListScreenReduxProps, TitleListScreenDispatchProps, TitleListScreenOwnProps { }

// component State
interface TitleListScreenStateProps extends RootReducerState { }

/**
 * This component is the TitleList screen on first tab
 * Here we get from redux state all data and inject it to the components
 */
class TitleListScreenComponent extends Component<TitleListScreenProps, TitleListScreenStateProps> {

    static navigationOptions = function (screenProps: NavigationScreenProps<TitleNavigationParam>) {
        const navigationTabScreenOptions: NavigationStackScreenOptions = {
            title: screenProps.navigation.state.params.categoryId,
        };
        return navigationTabScreenOptions;
    };

    public render(): JSX.Element {
        return (
            <View style={style.container}>
                <TitleList
                    beverages={this.props.beverages}
                />
            </View>
        );
    }
}

function mapStateToProps(state: TitleListScreenStateProps): TitleListScreenReduxProps {
    // if data needed is fill in the redux state we convert it for our components
    if (state.beverageReducer && state.beverageReducer.beverages.length > 0) {
        const params: TitleNavigationParam = TabNavigation.router.getPathAndParamsForState(state.tabNavReducer).params as TitleNavigationParam;
        // if we get nothing form navigation
        if (params === undefined || params.categoryId === undefined) {
            return {
                beverages: new Array<BeverageTitleListProps>(),
            };
        }
        const beveragesReducer: Array<Beverage> = state.beverageReducer.beverages;
        const beverages: Array<BeverageTitleListProps> = beveragesReducer
            .filter(function (beverage: Beverage) {
                return (beverage.cat === params.categoryId);
            })
            .map(function (beverage: Beverage) {
                const beverageTitleListProps: BeverageTitleListProps = {
                    beverageName: beverage.nm,
                };
                return beverageTitleListProps;
            })
            .sort(function (first: BeverageTitleListProps, second: BeverageTitleListProps) {
                return first.beverageName.toLocaleLowerCase().localeCompare(second.beverageName.toLocaleLowerCase());
            });
        const titleListOwnProps: TitleListOwnProps = {
            beverages: beverages,
        };
        return titleListOwnProps;

    }
    // if state is not filled
    return {
        beverages: new Array<BeverageTitleListProps>(),
    };
}

const TitleListScreen = connect<TitleListScreenReduxProps, TitleListScreenDispatchProps, TitleListScreenOwnProps>
    (mapStateToProps, null)(TitleListScreenComponent);

export default TitleListScreen;
