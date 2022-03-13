# 初期セットアップ

## Next.js

```
yarn create next-app . --typescript
```

## 必要 module のインストール

```
yarn add -D prettier
yarn add -D eslint-config-prettier
yarn add -D @typescript-eslint/eslint-plugin
yarn add -D @typescript-eslint/parser
```

# tailwind css のインストール

```
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
yarn add -D @jarrodldavis/eslint-plugin-tailwindcss@latest
yarn add -D prettier-plugin-tailwind
```
# tailwind.config.js, postcss.config.js の生成

```
npx tailwindcss init -p
```

# tailwind.config.js の 設定追加

- content にパスを追記する。パスの対象となる tsx ファイルの中身を tailwind から css に変換される。
- `mode: 'jit',`を先頭に追加する。

```
module.exports = {
  mode: 'jit',
  content: ["./src/**/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## globals.css の編集

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## vs code のワークスペース設定

validate チェック off


# dnd kitのインストール

```
yarn add @dnd-kit/core
```