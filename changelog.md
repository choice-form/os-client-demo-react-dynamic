# 工作日志

我们准备构建一个react项目,其中包含一个react的主程序,还有一个分离的UI插件程序,这两个都是使用react编写,但是ui插件程序不是默认加载到主程序中的,而是根据某些规则按需加载进去的,这其中会设计到很多自定义的构建流程,所以我们不使用react-create-app去初始化项目,而是我们自己独立自主的使用webpack去构建.

## 开始
1. 新建了src目录,在其中添加了index.html和index.js文件.
2. 初始化了git,添加了.gitignore文件.
3. 初始化了包管理配置,添加了package.json文件,我们使用yarn管理

现在,做好了准备工作,但是项目还是跑不起来的

## 基本的webpack构建配置
1. 安装webpack依赖
```shell
yarn add webpack webpack-cli webpack-dev-server
```
2. 添加webpack.config.js配置文件,初始化`entry`和`output`配置,把我们的`src/index.js`构建到`dist`目录下
   + webpack.config.js可以导出一个配置对象,或者导出一个函数,该函数返回配置对象,后者更灵活,我们使用后者
   + 导出函数,会接到一个env参数,我们可以用该参数来进行一些判断,当前,我们使用env来判断是本地开发模式还是产品发布模式,如果本地开发模式,则直接将`src/index.js`构建到`dist/index.js`,如果是产品发布模式,则构建到`dist/index-hashxxxx.js`,其中`hashxxxx`是该文件的内容hash摘要,这样就可以控制缓存.
3. 我们还需要将入口`index.html`文件也构建到`dist`中,并且要自动引入之前构建好的`index.js`脚本,这时候可使用`HtmlWebpackPlugin`插件.`yarn add html-webpack-plugin -D`安装该插件,然后在配置文件中配置一下该插件,指定原始文件为`src/index.html`,目标文件名`index.html`,则文件会自动被构建到之前`entry`中指定的目标文件夹即`dist`目录中,同时注入了所有`output`中输出的脚本链接,如果是产品发布模式,注入的脚本链接也会是携带hash版本的.

4. 在package.json中添加`prod`和`dev`两个可运行的脚本指令,分别对应产品模式的构建,和开发模式的构建, 分别运行这两指令可以发现dist目录中构建出了对应的内容.

5. 更改一下`src/index.js`的内容,重新运行`yarn prod`,我们发现新构建的`index.js`的目标文件hash摘要发生了变化,但是之前文件还残留了,这样的话,我们没多改动一次,构建后,残留的历史版本文件就会多一个,会越堆越多,所以我们希望每次构建只有最新的文件,这时候可以使用一个插件`CleanWebpackPlugin`,`yarn add clean-webpack-plugin -D`,配置好这个插件后,每次构建前.`dist`目录都会被移除,重新构建后就只有最新的内容.

6. 配置`webpack-dev-server`在开发模式下启动热服务器,并在package.json中配置脚本任务,启动任务后,发生任何文件更改时,将自动刷新浏览器.

## 配置favicon
1. 在`HtmlWebpackPlugin`中配置favicon

## 使用Typescript
1. 将`src/index.js`改成`src/index.ts`,并在其中加上些类型声明的代码,然后在`webpack.config.js`中将入口也改成对应的`ts`文件.
2. 重新运行构建,发现会失败,因为webpack将默认以`javascript`去解析模块,但是读到的文件中有`typescript`的类型声明,不是合法的javascript会读取失败,这时候需要在webpack中添加`ts-loader`,运行`yarn add typescirpt ts-loader -D`安装typescript支持包,在webpack配置文件中增加`module`配置使用`ts-loader`去加载ts文件,然后重新构建可以成功.

## 引入react
1. 安装依赖`yarn add react react-dom`和类型依赖`yarn add @type/react @type/react-dom`.

2. 在index.ts导入`react`和`react-dom`并且写一个最简单的组件渲染到页面.

## 使用tsx语法
1. `tsconfig.json`中新增配置`"jsx": "react"`
2. `webpack.config.js`中新增`resolve.extensions`为`[".ts", '.tsx', '.js']`,这三个解析不能少,他们的顺序也不要变,否则可能解析失败.
3. 将组件分离到一本`app.tsx`中,并且使用jsx的语法,在`webpack.config.js`中对`/tsx?$/`的文件后缀使用`ts-loader`,然后启动项目,可以成功.

## 分离vendor
1. 一开始自己的代码和依赖包`react`,`react-dom`的代码都被构建到了`dist/main.js`中,我们项把第三方包的代码构建到独立的文件中,在webpack配置文件中添加`optimization.splitChunks.chunks:all`,再次构建,发现依赖包已经分离出去.

## 添加路由
1. 安装依赖`yarn add react-router-dom`
2. 按路由添加说明,添加`index`,`questions`,`realtime`,`reward`四个路由,运行项目,路由添加成功.

## 脚本驱动路由跳转
1. 尝试使用脚本驱动路由正常跳转,而不是通过链接.注意直接使用浏览器级别的接口更改浏览器地址,是会重新刷新页面,不会触发框架级别的路由跳转的,这样会丢失内存数据.
2. react-router中不能直接访问到跳转链接的api,而是要在路由组件的几个规则中才能访问到,我们通过路由组件的render方式传入routeProps到Main和Questions两个路由中,这样在里面可以借助这个属性跳转路由,Realtime和Reward两个页面是单独存在的,无与其他路由内存共用的需求,不需要路由跳转,可以浏览器直接跳转,路由跳转方式参考[这里](https://reacttraining.com/react-router/web/api/location)


## 添加os-client-core
1. 安装依赖包
2. 初始化core
3. 在根组件状态上粘附初始化好的核心数据

## 初始化答题程序
1. 调用sdk获取首页,答题页数据
2. 答题核心发生变化后驱动react更新页面

## 分环境构建配置文件
1. 因为在正式环境和测试环境上接口请求地址是不一样的,这些地址分别配置到不同的两本文件中,构建的时候按环境的不同加载不同的文件,但是写代码的时候都是统一的导入方式`import CF_CONFIG from "config"`;
2. 现在types中声明好虚拟的config模块,制定好器类型声明,
3. 创建config文件夹,里面分别放置`dev.ts`,`prod.ts`两本配置文件,各自配置好不同的内容
4. webpack的配置文件总,resolve.alias中设置`config`模块的自定义解析方式,按构建时的环境参数决定指向`config/dev.ts`还是`config/prod.ts`,这在再次构建,就能正确加载对应环境上的配置文件.

## 渲染基本页面
1. 渲染首页
2. 点击下一题获取答题页数据,然后驱动路由跳转.
3. 渲染答题页面第一阶段
4. 处理自动开始下一题功能
5. 渲染了几个基本题型:选择,打分,填空,权重
