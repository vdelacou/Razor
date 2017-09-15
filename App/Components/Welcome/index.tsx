import React, { Component } from 'react';
import { View, ViewProperties, FlatList, ListRenderItem, Text, ListRenderItemInfo } from 'react-native';

// component style
import { style } from './style';

// Interface Beverage in Welcome
export interface BeverageWelcomeProps {
    beverageCategory: string;
}

// Component own local props
export interface WelcomeOwnProps {
    beverages: Array<BeverageWelcomeProps>;
}

// Component Props
interface WelcomeProps extends WelcomeOwnProps, ViewProperties { }

// Component State
interface WelcomeState { }

/**
 * this component display all the territory tile on a map
 */
class WelcomeComponent extends Component<WelcomeProps, WelcomeState> {

    public render(): JSX.Element {

        const { beverages } = this.props;

        function keyExtractor(beverage: BeverageWelcomeProps, index: number): string {
            return beverage.beverageCategory + index;
        }

        function renderItem(): ListRenderItem<BeverageWelcomeProps> {
            return function renderItemInfo(info: ListRenderItemInfo<BeverageWelcomeProps>): JSX.Element {
                return (
                    <Text style={style.item}>
                        {info.item.beverageCategory}
                    </Text>
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

export const Welcome = WelcomeComponent;
