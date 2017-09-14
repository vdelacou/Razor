
All icons and splashscreen have been generated with: https://github.com/bamlab/generator-rn-toolbox/blob/master/generators/assets/README.md

Icon must be minimum 512X512
The splash screen must be 2208X2208 and the artwork should roughly fit within a center square (1200×1200 px).

yo rn-toolbox:assets --icon .\assets\img\icon.png --splash .\assets\img\splash.png --store

Need to change in \android\app\src\main\res\values\colors.xml rgba(0,0,0,0) by #00000000 or whatever the color you like
Then have to launch several times react-native run-android

To update: react-native-git-upgrade

if pb:
react-native link
rm -rf \node_modules
rm -rf \android\build
rm -rf \android\app\build
