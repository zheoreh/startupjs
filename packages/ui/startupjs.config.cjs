module.exports = {
  type: 'plugin',
  bundler: {
    forceCompile: {
      web: [
        '@ptomasroos/react-native-multi-slider',
        '@miblanchard/react-native-slider',
        '@startupjs/ui'
      ]
    }
  }
}
