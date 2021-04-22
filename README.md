# BotArcApi Lib

A lib for **[BotArcApi](https://github.com/TheSnowfield/BotArcAPI)** with **Typescript**.

## Install

Install this package is very easy.
```
npm i botarcapi_lib
```

## Usage

### Create API

Follow the steps below:

1. Deploy a **BotArcApi** server at first.
   This step can just follow docs of BotArcApi.

2. Make sure you deploy the domain name of **BotArcApi**, such as `http://localhost:8088`.

3. Choose a **BotArcApi** version you like, such as `v4`, then input codes below in your project:
   ```typescript
   import { BotArcApiV4 } from "botarcapi_lib"
   const api = new BotArcApiV4("http://localhost:8088", 60000)
   ```

   ...or maybe you are using **Node.js**:

   ```javascript
   const { BotArcApiV4 } = require("botarcapi_lib");
   const api = new BotArcApiV4("http://localhost:8088", 60000)
   ```
   Otherwise, maybe you want to control other request config, so you can provide `AxiosRequestConfig`:

   ```typescript
   import { BotArcApiV4 } from "botarcapi_lib"
   const api = new BotArcApiV4({
       baseURL: "http://localhost:8088",
       timeout: 60000,
       headers: {
           "User-Agent": "SecretAPIUA"
       }
   })
   ```

4. Use APIs you like.

### Use API

For example, you want to check the best 30 of **Nagiha0798** and print result to console, you can:

```typescript
import { BotArcApiV4 } from "botarcapi_lib"
const api = new BotArcApiV4({
    baseURL: "http://localhost:8088",
    timeout: 60000,
    headers: {
        "User-Agent": "SecretAPIUA"
    }
})
api.user.best30("Nagiha0798", true)
    .then(console.log)
    .catch(console.error)
```

...or you may like using **async/await**:

```typescript
import { BotArcApiV4 } from "botarcapi_lib"
const api = new BotArcApiV4({
    baseURL: "http://localhost:8088",
    timeout: 60000,
    headers: {
        "User-Agent": "SecretAPIUA"
    }
})

async function b30() {
    console.log(await api.user.best30("Nagiha0798", true))
}

b30()
```
