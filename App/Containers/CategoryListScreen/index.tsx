import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { ViewProperties } from 'react-native';
import { NavigationAction, NavigationActions } from 'react-navigation';
// app component
import { RootReducerState } from '../../Store';
import { Beverage } from '../../Models';
import { TitleNavigationParam } from '../../Navigation';
import { Background, CategoryList, CategoryListOwnProps, BeverageCategoryListProps } from '../../Components';
// component style
import { style } from './style';

// connected props with reducer state
interface CategoryListScreenReduxProps extends CategoryListOwnProps { }

// connected functions to dispatch action
interface CategoryListScreenDispatchProps {
    goToTitleList(categoryId: String): NavigationAction;
}

// component own local props
interface CategoryListScreenOwnProps extends ViewProperties { }

// component props (merge of all the props)
interface CategoryListScreenProps extends CategoryListScreenReduxProps, CategoryListScreenDispatchProps, CategoryListScreenOwnProps { }

// component State
interface CategoryListScreenStateProps extends RootReducerState { }

/**
 * This component is the CategoryList screen on first tab
 * Here we get from redux state all data and inject it to the components
 */
class CategoryListScreenComponent extends Component<CategoryListScreenProps, CategoryListScreenStateProps> {

    public render(): JSX.Element {
        const { beverages, goToTitleList } = this.props;
        return (
            <Background style={style.container}>
                <CategoryList
                    beverages={beverages}
                    touchAction={goToTitleList}
                />
            </Background>
        );
    }
}

function mapStateToProps(state: CategoryListScreenStateProps): CategoryListScreenReduxProps {
    // if data needed is fill in the redux state we convert it for our components
    if (state.beverageReducer && state.beverageReducer.beverages.length > 0) {
        const beveragesReducer: Array<Beverage> = state.beverageReducer.beverages;
        const beverages: Array<BeverageCategoryListProps> = beveragesReducer
            .map(function (beverage: Beverage) {
                const beverageCategoryListProps: BeverageCategoryListProps = {
                    beverageCategoryList: beverage.cat,
                };
                return beverageCategoryListProps;
            })
            .filter(function (beverageCategoryListProps: BeverageCategoryListProps, index: number, self: Array<BeverageCategoryListProps>) {
                return (self.findIndex(find => find.beverageCategoryList === beverageCategoryListProps.beverageCategoryList) === index);
            })
            .sort(function (first: BeverageCategoryListProps, second: BeverageCategoryListProps) {
                return first.beverageCategoryList.toLocaleLowerCase().localeCompare(second.beverageCategoryList.toLocaleLowerCase());
            });
        const categoryListOwnProps: CategoryListOwnProps = {
            beverages: beverages,
            touchAction: function (_categoryIdClicked: String) { return undefined; },
        };
        return categoryListOwnProps;
    }
    // if state is not filled
    return {
        beverages: new Array<BeverageCategoryListProps>(),
        touchAction: function (_categoryIdClicked: String) { return undefined; },
    };
}

function mapDispatchToProps(dispatch: Dispatch<CategoryListScreenDispatchProps>): CategoryListScreenDispatchProps {
    return {
        goToTitleList: function (categoryId: string) {
            const titleNavigationParam: TitleNavigationParam = { categoryId: categoryId };
            return dispatch(NavigationActions.navigate({ routeName: 'titleList', params: titleNavigationParam }));
        },
    };
}

const CategoryListScreen = connect<CategoryListScreenReduxProps, CategoryListScreenDispatchProps, CategoryListScreenOwnProps>
    (mapStateToProps, mapDispatchToProps)(CategoryListScreenComponent);

export default CategoryListScreen;
