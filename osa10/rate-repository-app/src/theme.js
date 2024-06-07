import { Platform } from "react-native";

const theme = {
  colors: {
    appBarBackground: '#24292e',
    white: '#ffffff',
    mainBackground: '#e1e4e8',
    secondaryColor: '#586069',
    blue: '#0366d6',
    red: '#d73a4a'
  },
  fontSizes: {
    normal: 20
  },
  fontWeights: {
    normal: '400',
    bold: '700'
  },
  fonts: {
    default: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  }
};

export default theme;