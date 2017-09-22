import React, { Component } from 'react';
import { View, ViewProperties, FlatList, ListRenderItem, Text, ListRenderItemInfo } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// component style
import { style, STYLE_CONST } from './style';

// Interface Beverage in Content
export interface BeverageContentProps {
    beverageName: string;
    beverageDescription: string;
}

// Component own local props
export interface ContentOwnProps {
    beverages: Array<BeverageContentProps>;
}

// Component Props
interface ContentProps extends ContentOwnProps, ViewProperties { }

// Component State
interface ContentState { }

/**
 * this component display all the beverage Content in a list
 */
class ContentComponent extends Component<ContentProps, ContentState> {

    public render(): JSX.Element {

        const { beverages } = this.props;

        function keyExtractor(beverage: BeverageContentProps, _index: number): string {
            return beverage.beverageName;
        }

        function renderItem(): ListRenderItem<BeverageContentProps> {
            return function renderItemInfo(info: ListRenderItemInfo<BeverageContentProps>): JSX.Element {
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

export const Content = ContentComponent;
