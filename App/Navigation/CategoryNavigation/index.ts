import {
    StackNavigator, NavigationContainer,
    NavigationRouteConfigMap,
    NavigationStackViewConfig, NavigationParams,
    NavigationStackRouterConfig, StackNavigatorConfig,
    NavigationScreenConfig, NavigationStackScreenOptions,
} from 'react-navigation';
// app component
import { I18n } from '../../I18n';
// need to import with default as Component Class
import CategoryScreen from '../../Containers/CategoryListScreen';
import TitleListScreen from '../../Containers/TitleListScreen';
// component style
import { style, STYLE_CONST } from './style';


// global config for the navigation
const navigationStackViewConfig: NavigationStackViewConfig = {
    cardStyle: style.cardStyle,
};

// option for all navigations
const navigationParams: NavigationParams = {
    headerStyle: style.header,
    headerTintColor: STYLE_CONST.headerTintColor,
};

// the navigation routeur config
const navigationStackRouterConfig: NavigationStackRouterConfig = {
    navigationOptions: navigationParams,
    initialRouteName: 'screen',
};

// the  global navigation routeur config
const stackConfig: StackNavigatorConfig = { ...navigationStackViewConfig, ...navigationStackRouterConfig };

function getNavigationOptionsScreen(): NavigationScreenConfig<NavigationStackScreenOptions> {
    const navigationTabScreenOptions: NavigationStackScreenOptions = {
        title: I18n.t('navigation.categoryNavigation.title'),
        headerTintColor: STYLE_CONST.headerTintColor,
    };
    return navigationTabScreenOptions;
}

function getNavigationOptionsTitleList(): NavigationScreenConfig<NavigationStackScreenOptions> {
    const navigationTabScreenOptions: NavigationStackScreenOptions = {
        headerTintColor: STYLE_CONST.headerTintColor,
    };
    return navigationTabScreenOptions;
}

// here the list of all the screen possible
const routeConfigMap: NavigationRouteConfigMap = {
    screen: {
        screen: CategoryScreen,
        navigationOptions: getNavigationOptionsScreen(),
    },
    titleList: {
        screen: TitleListScreen,
        navigationOptions: getNavigationOptionsTitleList(),
    },
};

// create the main stackNavigator
const CategoryNavigation: NavigationContainer = StackNavigator(routeConfigMap, stackConfig);

export default CategoryNavigation;
