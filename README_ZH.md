# BotArcApi Lib

[English](./README.md) | **中文**

使用 **Typescript** 编写的 **[BotArcApi](https://github.com/TheSnowfield/BotArcAPI)** 接口封装库

***面向 botarcapi_lib@1.1.4 或更早用户的迁移说明***：2022 年 4 月 28 日 BotArcAPI (现在称作 Arcaea Unlimited API) 更改了其 songinfo 信息的格式。您可以查看 [类型定义](./src/types.ts) 获取详细信息。

## 安装

安装非常简单，仅需一条命令：

使用 npm:
```
npm i botarcapi_lib
```

或者使用 yarn:
```
yarn add botarcapi_lib
```

## 使用

### 创建 API

使用以下步骤创建 API：

1. 部署一个 **BotArcApi**，或者 **ArcaeaUnlimitedAPI** 服务器。这一步可以按照对应文档完成。如果您有现成的服务器可用，可用跳过这一步。

2. 获取服务器地址，例如 `http://localhost:8088`。

3. 选择你想要的 **BotArcApi** 版本，例如 `v5`，在您的项目中输入以下代码：

   ```typescript
   import BotArcApi from "botarcapi_lib";
   const { BotArcApiV5 } = BotArcApi;
   const api = new BotArcApiV5("http://localhost:8088", 60000);
   ```
   
   或者使用 **Node.js**：
   
   ```javascript
   const { BotArcApiV5 } = require("botarcapi_lib");
   const api = new BotArcApiV5("http://localhost:8088", 60000);
   ```
   
   再或者，如果您需要控制其他的请求配置，您可以直接提供`AxiosRequestConfig`:

   ```typescript
   import BotArcApi from "botarcapi_lib";
   const { BotArcApiV5 } = BotArcApi;
   const api = new BotArcApiV4({
       baseURL: "http://localhost:8088",
       timeout: 60000,
       headers: {
           "Authorization": "Bearer SecretAPItoken"
       }
   });
   ```

4. 使用您想要的 API。

### 使用 API

举个例子，如果需要查找 **Nagiha0798** 的 Best30 成绩并打印到控制台，您可以：

```typescript
import BotArcApi from "botarcapi_lib";
const { BotArcApiV4 } = BotArcApi;
const api = new BotArcApiV4({
    baseURL: "http://localhost:8088",
    timeout: 60000,
    headers: {
        "Authorization": "Bearer SecretAPItoken"
    }
});
api.user.best30("Nagiha0798", true)
    .then(console.log)
    .catch(console.error);
```

或使用 **async/await** 的异步语法：

```typescript
import BotArcApi from "botarcapi_lib";
const { BotArcApiV4 } = BotArcApi;
const api = new BotArcApiV4({
    baseURL: "http://localhost:8088",
    timeout: 60000,
    headers: {
        "Authorization": "Bearer SecretAPItoken"
    }
});

async function b30() {
    console.log(await api.user.best30("Nagiha0798", true));
}

b30();
```

或者，如果您的 **ArcaeaUnlimitedAPI** 或 **BotArcAPI** 版本较旧，您可以提供 `User-Agent` 代替 `token`：

```typescript
import BotArcApi from "botarcapi_lib";
const { BotArcApiV4 } = BotArcApi;
const api = new BotArcApiV4({
    baseURL: "http://localhost:8088",
    timeout: 60000,
    headers: {
        "User-Agent": "SecretAPIUA"
    }
});

async function b30() {
    console.log(await api.user.best30("Nagiha0798", true));
}

b30();
```

### 工具

本库集成了一些使用的工具函数。首先进行导入：

```typescript
import {
  botArcApiDifficulty2DifficultyClass,
  difficultyClass2String,
  botArcApiDifficulty2String,
  formatScore
} from "botarcapi_lib";
```

### botArcApiDifficulty2DifficultyClass

将 **BotArcApi 难度** 转换为 **Difficulty Class**.

比如，**BotArcApi 难度** 是一个介于 2 和 23 之间的数字。 这个函数可以将其转换为以下的形式：

```typescript
{
    rating: number,
    ratingPlus?: boolean
}
```

该格式也在 **ArcaeaDifficultyClass** 中被使用。

#### 示例

```typescript
import BotArcApi from "botarcapi_lib";
const {util} = BotArcApi;
console.log(util.botArcApiDifficulty2DifficultyClass(21));
// { rating: 10, ratingPlus: true }
```

### difficultyClass2String

将 **Difficulty Class** 转换为字符串。

#### 示例

```typescript
import BotArcApi from "botarcapi_lib";
const {util} = BotArcApi;
console.log(util.difficultyClass2String({
    rating: 10,
    ratingPlus: true
}));
// 10+
```

```typescript
import BotArcApi from "botarcapi_lib";
const {BotArcApiv4, util} = BotArcApi;
const api = new BotArcApiv4("http://localhost:3000");
api.song.info("gl").then(info => {
    const futureDifficultyClass = info.difficulties.filter(c => c.ratingClass === 2)[0]
    console.log(util.difficultyClass2String(futureDifficultyClass)) // 11
});
```

### botArcApiDifficulty2String

等同于 `difficultyClass2String(botArcApiDifficulty2DifficultyClass(/* arg */))`。语法糖！

#### 示例

```typescript
import BotArcApi from "botarcapi_lib";
const {util} = BotArcApi;
console.log(util.botArcApiDifficulty2String(21));
// 10+
```

### formatScore

将分数格式化为 Arcaea 游戏内展示的格式。

`9901314` => `09'901'314`

#### 示例

```typescript
import BotArcApi from "botarcapi_lib";
const {util} = BotArcApi;
console.log(util.formatScore(10001540)); // 10'001'540
console.log(util.formatScore(9993506)); // 09'993'506
console.log(util.formatScore(12987)); // 00'012'987
```

