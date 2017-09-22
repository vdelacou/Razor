import React, { Component } from 'react';
import { View, ViewProperties, FlatList, ListRenderItem, Text, ListRenderItemInfo, TouchableHighlight } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// component style
import { style, STYLE_CONST } from './style';

// Interface Beverage in CategoryList
export interface BeverageCategoryListProps {
    beverageCategoryList: string;
}

// Component own local props
export interface CategoryListOwnProps {
    beverages: Array<BeverageCategoryListProps>;
    touchAction(categoryIdClicked: String): void;
}

// Component Props
interface CategoryListProps extends CategoryListOwnProps, ViewProperties { }

// Component State
interface CategoryListState { }

/**
 * this component display all the beverage CategoryList in a list
 */
class CategoryListComponent extends Component<CategoryListProps, CategoryListState> {

    public render(): JSX.Element {

        const { beverages, touchAction } = this.props;

        function keyExtractor(beverage: BeverageCategoryListProps, _index: number): string {
            return beverage.beverageCategoryList;
        }

        function renderItem(): ListRenderItem<BeverageCategoryListProps> {
            return function renderItemInfo(info: ListRenderItemInfo<BeverageCategoryListProps>): JSX.Element {
                return (
                    <TouchableHighlight onPress={() => touchAction(info.item.beverageCategoryList)} underlayColor={STYLE_CONST.underlayColor}>
                        <View style={style.itemContainer}>
                            <Text style={style.item}>
                                {info.item.beverageCategoryList}
                            </Text>
                            <IconFontAwesome name="chevron-right" size={STYLE_CONST.iconSize} color={STYLE_CONST.iconTintColor} />
                        </View>
                    </TouchableHighlight>
                );
            };
        }

        function renderSeparator(): JSX.Element {
            return (
                <View style={style.separator} />
            );
        }

        return (
            <View style={style.container}>
                <FlatList
                    data={beverages}
                    renderItem={renderItem()}
                    keyExtractor={keyExtractor}
                    ItemSeparatorComponent={renderSeparator}
                />
            </View>
        );
    }
}

export const CategoryList = CategoryListComponent;
