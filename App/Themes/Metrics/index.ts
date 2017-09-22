import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

export const METRICS = {
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    itemCellHeight: PixelRatio.roundToNearestPixel(44),
    zero: PixelRatio.roundToNearestPixel(0),
    xxs: PixelRatio.roundToNearestPixel(5),
    xs: PixelRatio.roundToNearestPixel(10),
    s: PixelRatio.roundToNearestPixel(15),
    l: PixelRatio.roundToNearestPixel(20),
    xl: PixelRatio.roundToNearestPixel(30),
    xxl: PixelRatio.roundToNearestPixel(40),
    stroke: PixelRatio.roundToNearestPixel(1),
};
