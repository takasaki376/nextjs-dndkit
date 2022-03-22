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

## tsconfig.json 設定変更

`"compilerOptions": {`の最終行に、`"baseUrl": "."`を追加する

## next.config.js 設定変更

`pageExtensions: ["page.tsx", "page.ts"],`を追加する。

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts"],
}

module.exports = nextConfig
```

## ファイル名変更

- `src\pages\_app.tsx` -> `src\pages\_app.page.tsx`
- `src\pages\index.tsx` -> `src\pages\index.page.tsx`
- `src\pages\api\hello.ts` -> `src\pages\api\hello.page.ts`


## tailwind css のインストール

```
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
yarn add -D @jarrodldavis/eslint-plugin-tailwindcss@latest
yarn add -D prettier-plugin-tailwind
```

## tailwind.config.js, postcss.config.js の生成

```
npx tailwindcss init -p
```

## tailwind.config.js の 設定追加

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


## index.page.tsxの変更

```
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <h1 className="text-xl font-bold underline text-red-600">
      Hello world!
    </h1>
  )
}

export default Home
```

## 開発サーバ起動

```
yarn dev
```

# dnd kitのインストール

```
yarn add @dnd-kit/core
yarn add @dnd-kit/sortable
```