import React, { Component } from 'react';
import { View, ViewProperties, FlatList, ListRenderItem, Text, ListRenderItemInfo } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// component style
import { style, STYLE_CONST } from './style';

// Interface Beverage in TitleList
export interface BeverageTitleListProps {
    beverageName: string;
}

// Component own local props
export interface TitleListOwnProps {
    beverages: Array<BeverageTitleListProps>;
}

// Component Props
interface TitleListProps extends TitleListOwnProps, ViewProperties { }

// Component State
interface TitleListState { }

/**
 * this component display all the beverage TitleList in a list
 */
class TitleListComponent extends Component<TitleListProps, TitleListState> {

    public render(): JSX.Element {

        const { beverages } = this.props;

        function keyExtractor(beverage: BeverageTitleListProps, _index: number): string {
            return beverage.beverageName;
        }

        function renderItem(): ListRenderItem<BeverageTitleListProps> {
            return function renderItemInfo(info: ListRenderItemInfo<BeverageTitleListProps>): JSX.Element {
                return (
                    <View style={style.itemContainer}>
                        <Text style={style.item}>
                            {info.item.beverageName}
                        </Text>
                        <IconFontAwesome name="chevron-right" size={STYLE_CONST.iconSize} color={STYLE_CONST.iconTintColor} />
                    </View>
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

export const TitleList = TitleListComponent;
