import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../Themes/';

export const STYLE_CONST = {
    activeTintColor: COLORS.accent1Color,
    activeBackgroundColor: COLORS.backgroundColor,
    inactiveTintColor: COLORS.primary1Color,
    inactiveBackgroundColor: COLORS.backgroundColor,
    iconSize: METRICS.s,
};

export const style = StyleSheet.create({
    header: {
        backgroundColor: COLORS.backgroundColor,
    },
    tabBar: {
        backgroundColor: COLORS.backgroundColor,
    },
    indicatorStyle: {
        backgroundColor: COLORS.accent1Color,
    },
    labelStyle: {
        ...FONTS.h3_alternate,
        padding: METRICS.zero,
        margin: METRICS.zero,
    },
});
