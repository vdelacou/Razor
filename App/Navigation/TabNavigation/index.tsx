import React from 'react';
import {
    TabNavigator, NavigationContainer,
    NavigationRouteConfigMap,
    TabViewConfig, NavigationParams,
    NavigationTabRouterConfig, TabNavigatorConfig,
    NavigationScreenConfig, NavigationTabScreenOptions,
} from 'react-navigation';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// app component
import { I18n } from '../../I18n';
// need to import with default as Component Class
import CategoryNavigation from '../CategoryNavigation';
// component style
import { style, STYLE_CONST } from './style';

// global config for the navigation
const tabViewConfig: TabViewConfig = {
    tabBarOptions: {
        activeTintColor: STYLE_CONST.activeTintColor,
        activeBackgroundColor: STYLE_CONST.activeBackgroundColor,
        inactiveTintColor: STYLE_CONST.inactiveTintColor,
        inactiveBackgroundColor: STYLE_CONST.inactiveBackgroundColor,
        style: style.tabBar,
        labelStyle: style.labelStyle,
        indicatorStyle: style.indicatorStyle,
        showIcon: true,
        upperCaseLabel: false,
    },
};

// option for all navigations
const navigationParams: NavigationParams = {};

// the navigation router config
const navigationTabRouterConfig: NavigationTabRouterConfig = {
    navigationOptions: navigationParams,
    initialRouteName: 'category',
};

// the  global navigation routeur config
const tabConfig: TabNavigatorConfig = { ...tabViewConfig, ...navigationTabRouterConfig };

function getNavigationOptionsCategory(): NavigationScreenConfig<NavigationTabScreenOptions> {
    const navigationTabScreenOptions: NavigationTabScreenOptions = {
        title: I18n.t('navigation.tabNavigation.category'),
        tabBarIcon: function (options: { tintColor: (string | null), focused: boolean }) {
            return (<IconFontAwesome name="database" size={STYLE_CONST.iconSize} color={options.tintColor} />);
        },
    };
    return navigationTabScreenOptions;
}

function getNavigationOptionsRandom(): NavigationScreenConfig<NavigationTabScreenOptions> {
    const navigationTabScreenOptions: NavigationTabScreenOptions = {
        title: I18n.t('navigation.tabNavigation.random'),
        tabBarIcon: function (options: { tintColor: (string | null), focused: boolean }) {
            return (<IconFontAwesome name="random" size={STYLE_CONST.iconSize} color={options.tintColor} />);
        },
    };
    return navigationTabScreenOptions;
}

function getNavigationOptionsFavorite(): NavigationScreenConfig<NavigationTabScreenOptions> {
    const navigationTabScreenOptions: NavigationTabScreenOptions = {
        title: I18n.t('navigation.tabNavigation.favorite'),
        tabBarIcon: function (options: { tintColor: (string | null), focused: boolean }) {
            return (<IconFontAwesome name="heart" size={STYLE_CONST.iconSize} color={options.tintColor} />);
        },
    };
    return navigationTabScreenOptions;
}

function getNavigationOptionsSetting(): NavigationScreenConfig<NavigationTabScreenOptions> {
    const navigationTabScreenOptions: NavigationTabScreenOptions = {
        title: I18n.t('navigation.tabNavigation.setting'),
        tabBarIcon: function (options: { tintColor: (string | null), focused: boolean }) {
            return (<IconFontAwesome name="ellipsis-h" size={STYLE_CONST.iconSize} color={options.tintColor} />);
        },
    };
    return navigationTabScreenOptions;
}

// here the list of all the screen tab possible
const routeConfigMap: NavigationRouteConfigMap = {
    category: {
        screen: CategoryNavigation,
        navigationOptions: getNavigationOptionsCategory(),
    },
    random: {
        screen: CategoryNavigation,
        navigationOptions: getNavigationOptionsRandom(),
    },
    favorite: {
        screen: CategoryNavigation,
        navigationOptions: getNavigationOptionsFavorite(),
    },
    setting: {
        screen: CategoryNavigation,
        navigationOptions: getNavigationOptionsSetting(),
    },
};

// create the main stackNavigator
export const TabNavigation: NavigationContainer = TabNavigator(routeConfigMap, tabConfig);

