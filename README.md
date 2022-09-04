# BotArcApi Lib

**English** | [中文](./README_ZH.md)

A lib for **[BotArcApi](https://github.com/TheSnowfield/BotArcAPI)** with **Typescript**.

***Migration (for botarcapi_lib@1.1.4 or earlier users)***: Since 2022.4.28 BotArcAPI (now known as Arcaea Unlimited API) has changed its songinfo format. You can read [Type Definition](./src/types.ts) for more info.

## Install

Install this package is very easy.

Use npm:
```
npm i botarcapi_lib
```

Or use yarn:
```
yarn add botarcapi_lib
```

## Usage

### Create API

Follow the steps below:

1. Deploy a **BotArcApi** server at first.
   This step can just follow docs of BotArcApi.

2. Make sure you deploy the domain name of **BotArcApi**, such as `http://localhost:8088`.

3. Choose a **BotArcApi** version you like, such as `v5`, then input codes below in your project:
   ```typescript
   import BotArcApi from "botarcapi_lib";
   const { BotArcApiV5 } = BotArcApi;
   const api = new BotArcApiV5("http://localhost:8088", 60000);
   ```
   
   ...or maybe you are using **Node.js**:
   
   ```javascript
   const { BotArcApiV5 } = require("botarcapi_lib");
   const api = new BotArcApiV5("http://localhost:8088", 60000);
   ```
   
   Otherwise, maybe you want to control other request config, so you can provide `AxiosRequestConfig`:

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

4. Use APIs you like.

### Use API

For example, you want to check the best 30 of **Nagiha0798** and print result to console, you can:

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

...or you may like using **async/await**:

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

...or you have an older version of **ArcUnlimitedAPI** or **BotArcAPI** and/or use ˋUser-Agentˋ instead of ˋtokenˋ:

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

### Util

This library integrates some practical functions.

To use these functions, you should import command at first:

```typescript
import {
  botArcApiDifficulty2DifficultyClass,
  difficultyClass2String,
  botArcApiDifficulty2String,
  formatScore
} from "botarcapi_lib";
```

Then you may use functions you imported.

### botArcApiDifficulty2DifficultyClass

Convert **BotArcApi Difficulty** to **Difficulty Class**.

You may know, **BotArcApi Difficulty** is a number which >=2 and <=23. This function can convert number into an object:

```typescript
{
    rating: number,
    ratingPlus?: boolean
}
```

This format is also used in **ArcaeaDifficultyClass**.

#### Example

```typescript
import BotArcApi from "botarcapi_lib";
const {util} = BotArcApi;
console.log(util.botArcApiDifficulty2DifficultyClass(21));
// { rating: 10, ratingPlus: true }
```

### difficultyClass2String

Convert **Difficulty Class** to **string**.

#### Example

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

Equals to `difficultyClass2String(botArcApiDifficulty2DifficultyClass(/* arg */))`. Sweet!

#### Example

```typescript
import BotArcApi from "botarcapi_lib";
const {util} = BotArcApi;
console.log(util.botArcApiDifficulty2String(21));
// 10+
```

### formatScore

Format score number into Arcaea score display format.

`9901314` => `09'901'314`

#### Example

```typescript
import BotArcApi from "botarcapi_lib";
const {util} = BotArcApi;
console.log(util.formatScore(10001540)); // 10'001'540
console.log(util.formatScore(9993506)); // 09'993'506
console.log(util.formatScore(12987)); // 00'012'987
```

