import { StyleSheet } from 'react-native';
import { COLORS } from '../../Themes/';

export const STYLE_CONST = {
    headerTintColor: COLORS.accent1Color,
};

export const style = StyleSheet.create({
    header: {
        backgroundColor: COLORS.backgroundColor,
    },
    cardStyle: {
        backgroundColor: COLORS.transparent,
    },
});
