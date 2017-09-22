import { StyleSheet } from 'react-native';
import { FONTS, COLORS, METRICS } from '../../Themes';

export const STYLE_CONST = {
    iconSize: METRICS.l,
    iconTintColor: COLORS.accent1Color,
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: METRICS.screenWidth,
        height: METRICS.itemCellHeight,
        padding: METRICS.xs,
    },
    item: {
        ...FONTS.h2_alternate,
    },
    separator: {
        height: METRICS.stroke,
        width: METRICS.screenWidth,
        backgroundColor: COLORS.accent1Color,
    },
});
