/*
 * Here we declare the typescript definitions of modules node in @types or not declare themselves
 */

// for import images
declare module "*.png" {
    const value: any;
    export default value;
}

declare module "react-native-i18n" {
    interface I18nInterface {
        fallbacks: boolean;
        translations: any;
        t: (key: string, parameters?: any) => string;
        readonly locale: string;
    }

    const I18n: I18nInterface;
    export default I18n;
}
