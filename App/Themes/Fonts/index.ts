import { PixelRatio } from 'react-native';
import { COLORS } from '../../Themes';

const SIZE = {
    h1: PixelRatio.getFontScale() * 16,
    h2: PixelRatio.getFontScale() * 14,
    h3: PixelRatio.getFontScale() * 12,
};

export const FONTS = {
    h1: {
        fontSize: SIZE.h1,
        color: COLORS.textColor,
    },
    h1_alternate: {
        fontSize: SIZE.h1,
        color: COLORS.alternateTextColor,
    },
    h2: {
        fontSize: SIZE.h2,
        color: COLORS.textColor,
    },
    h2_alternate: {
        fontSize: SIZE.h2,
        color: COLORS.alternateTextColor,
    },
    h3: {
        fontSize: SIZE.h3,
        color: COLORS.textColor,
    },
    h3_alternate: {
        fontSize: SIZE.h3,
        color: COLORS.alternateTextColor,
    },
};
