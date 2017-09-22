

After clone the project launch `yarn` to install all libraries

To Launch the project:

* `yarn watch` to compile the typescript project in the build folder and waiting for change to compile it again
* `react-native run-andoid` or `react-native run-ios` to launch your project on simulator or devices

All your change in typescript will be displayed with hot-reloading in your device.

All icons and splashscreen have been generated with: https://github.com/bamlab/generator-rn-toolbox/blob/master/generators/assets/README.md

Icon must be minimum 512X512
The splash screen must be 2208X2208 and the artwork should roughly fit within a center square (1200×1200 px).

`yo rn-toolbox:assets --icon ./App/Assets/IconSplash/icon.png --splash ./App/Assets/IconSplash/splash.png --store`

I  got a problem so I have  to change in \android\app\src\main\res\values\colors.xml rgba(0,0,0,0) by #000000 or whatever the color you like
Then have to launch several times react-native run-android

To update: `react-native-git-upgrade`

if pb:

rm -rf node_modules
rm -rf android\build
rm -rf android\app\build
yarn
react-native link


* v 0.0.3 Add redux, react-redux, redux-sagaredux-persist, redux-persist-transform-encrypt, redux-logger. Create store and api call with loading reducer. Create first screen with data got by api
* v 0.0.2 Hello world with typescript
* v 0.0.1 Javascript version Hello world with icon and splashScreen