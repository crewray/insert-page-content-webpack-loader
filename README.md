# uniapp 通用页面插入内容 loader

## 说明

该插件只会作用于在 pages.js 中注册的页面, 需将项目的 pages.json 改为使用 pages.js.


## 安装

```bash
npm i insert-page-content-webpack-loader
```

## 使用

```js
// vue.config.js

configureWebpack: (config) => {
  config.module.rules.push(
    ...[
      {
        test: /^(?!.*(?:uni_modules|node_modules)).*\.vue$/,
        use: [
          {
            loader: "insert-page-content-webpack-loader",
            options: {
              // 正则表达式 (换成你需要的替换内容的正则表达式)
              regexp: /<view([\s\S]*?)>([\s\S]*?)<\/view>/,
              // replace回调 (换成你需要的替换内容)
              callback: (match, p1, p2) => {
                return `<view${p1}><mpDevBubble/>${p2}</view>`;
              },
            },
          },
        ],
      },
    ]
  );
};
```
