module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            app: "./App.tsx",
            src: "./src"
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", "native.tsx"]
        }
      ],
      "react-native-reanimated/plugin"
    ]
  }
}
