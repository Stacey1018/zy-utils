# zy-utils

## 初始化

```sh
npm init -y
// 安装ts
npm install typescript -D
npm install ts-jest  -D
npm install @types/jest -D
```

## 配置 ts

```sh
tsc --init
```

## 添加.gitignore 文件

## 配置 webpack

<!-- 需要安装ts-loader 转为webpack能识别的语言 -->

```sh
npm install  ts-loader -D
npm install webpack -D
npm install webpack-cli -D
```

## 本地测试方法

工具库目录下执行

```bash
npm link
```

测试项目中执行

```bash
import { sum } from 'zy-utils';

console.log(sum(2, 3)); // 输出: 5
```

## 配置 tsconfig.json

// 是否生成`.d.ts`的类型声明文件
"declaration": true,


## 配置package.json

  "main": "dist/index.js", // 修改入口
  "types": "dist/index.d.ts", // 类型声明文件

## 添加单元测试

 npm install --save-dev jest ts-jest @types/jest
 配置文件

jest.config.js

```js
 const config = {
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  // The test environment that will be used for testing
  testEnvironment: 'node',
  // The glob patterns Jest uses to detect test files
  testMatch: ['<rootDir>/tests/**/*.test.ts'], // 只运行 tests 目录下的测试文件
  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'js', 'json'],
 }
```

package.json

```json
{
    "test": "jest"
}

```
