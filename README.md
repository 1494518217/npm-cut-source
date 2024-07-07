#### 1.什么是 npm-cut-source？

​    `npm-cut-source` 能快速切换`npm源`

#### 2.对比npm命令

- npm查看源:
  - npm config get registry
  - 输出结果：https://registry.npmjs.org/
- 使用npm-cut-source查看源
  -  cut-npm current 或者 cut-npm c (简写)
  - 输出结果： npm官方镜像源

#### 3.安装 npm-cut-source

- 建议全局安装使用 npm 或者 yarn

```
npm i -g  npm-cut-source
or
yarn add -g  npm-cut-source
```

#### 4.使用 npm-cut-source

- 查看当前版本

  - cut-npm -v

- 查看当前源

  -  cut-npm current  
  - 简写：cut-npm c  

  - 输出结果：npm官方镜像源
  
- 查看所有源列表

  - cut-npm list 
  - 简写： cut-npm ls  
  - 默认镜像源: 
    - npm官方镜像源: https://registry.npmjs.org/ 
    - taobao镜像源: https://registry.npmmirror.com/

    - yarn镜像源:  https://registry.yarnpkg.com/
    - cnpm镜像源:  https://r.cnpmjs.org/

- 新增镜像源

  - cut-npm add
  - 简写:  cut-npm a

- 删除镜像源

  - cut-npm delete
  - 简写：cut-npm d

- 更新镜像源

  - cut-npm update 
  - 简写： cut-npm u

- 使用镜像源 

  - cut-npm use

  - 选择镜像源:  
    - npm官方镜像源 
    - taobao镜像源   
    - yarn镜像源   
    - cnpm镜像源





