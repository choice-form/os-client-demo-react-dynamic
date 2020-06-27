# 工作日志

我们准备构建一个react项目,其中包含一个react的主程序,还有一个分离的UI插件程序,这两个都是使用react编写,但是ui插件程序不是默认加载到主程序中的,而是根据某些规则按需加载进去的,这其中会设计到很多自定义的构建流程,所以我们不使用react-create-app去初始化项目,而是我们自己独立自主的使用webpack去构建.

## 开始
1. 新建了app目录,在其中添加了index.html和index.js文件.
2. 初始化了git,添加了.gitignore文件.
3. 初始化了包管理配置,添加了package.json文件,我们使用yarn管理

现在,做好了准备工作,但是项目还是跑不起来的

## 基本的webpack构建配置
1. 安装webpack依赖
```shell
yarn add webpack webpack-cli webpack-dev-server
```
2. 添加webpack.config.js配置文件,初始化`entry`和`output`配置,把我们的`app/index.js`构建到`dist`目录下
   + webpack.config.js可以导出一个配置对象,或者导出一个函数,该函数返回配置对象,后者更灵活,我们使用后者
   + 导出函数,会接到一个env参数,我们可以用该参数来进行一些判断,当前,我们使用env来判断是本地开发模式还是产品发布模式,如果本地开发模式,则直接将`app/index.js`构建到`dist/index.js`,如果是产品发布模式,则构建到`dist/index-hashxxxx.js`,其中`hashxxxx`是该文件的内容hash摘要,这样就可以控制缓存.
3. 我们还需要将入口`index.html`文件也构建到`dist`中,并且要自动引入之前构建好的`index.js`脚本,这时候可使用`HtmlWebpackPlugin`插件.`yarn add html-webpack-plugin -D`安装该插件,然后在配置文件中配置一下该插件,指定原始文件为`app/index.html`,目标文件名`index.html`,则文件会自动被构建到之前`entry`中指定的目标文件夹即`dist`目录中,同时注入了所有`output`中输出的脚本链接,如果是产品发布模式,注入的脚本链接也会是携带hash版本的.

4. 在package.json中添加`prod`和`dev`两个可运行的脚本指令,分别对应产品模式的构建,和开发模式的构建, 分别运行这两指令可以发现dist目录中构建出了对应的内容.

5. 更改一下`app/index.js`的内容,重新运行`yarn prod`,我们发现新构建的`index.js`的目标文件hash摘要发生了变化,但是之前文件还残留了,这样的话,我们没多改动一次,构建后,残留的历史版本文件就会多一个,会越堆越多,所以我们希望每次构建只有最新的文件,这时候可以使用一个插件`CleanWebpackPlugin`,`yarn add clean-webpack-plugin -D`,配置好这个插件后,每次构建前.`dist`目录都会被移除,重新构建后就只有最新的内容.

6. 配置`webpack-dev-server`在开发模式下启动热服务器,并在package.json中配置脚本任务,启动任务后,发生任何文件更改时,将自动刷新浏览器.

## 配置favicon
1. 在`HtmlWebpackPlugin`中配置favicon

## 使用Typescript
1. 将`app/index.js`改成`app/index.ts`,并在其中加上些类型声明的代码,然后在`webpack.config.js`中将入口也改成对应的`ts`文件.
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
5. 渲染了几个基本题型:选择,打分,填空,权重,并处理他们的UI事件回调
6. 处理上一题下一题UI事件回调
7. 渲染错误消息,提示消息,预览标志等全局信息
8. 定位单页错误


## 尝试使用开发版核心包sdc
1. 我在本地开发是想导入的是带sourcemap的本地版sdc,而到线上就是用发布的sdc,这需要在webpack的配置文件中做些修改.
2. 本地开发包在相邻项目os-client-core的debug文件下下面,我们需要在webpack的配置文件中检查是否相邻目录的debug文件夹下能找到开发版sdk,能找到则给`@choiceform/os-client-core`设置解析别名,否则就不设置.

## 分离问题组件到插件形式
1. 之前的src目录改成app目录,为后续将nodes组件移动到plugin目录下做准备
2. nodes目录移动到plugin目录之下.

## 插件构建思路
1. 每个插件构建出单独的文件,需要携带hash摘要.
2. 对所有的插件需要一个汇总json文件,这本文件需要被设计端和答题端加载,内容是一个对象,
对象中包含以下格式内容:
```typescript
interface IPluginSummary {
  /**
   * 所有问题类型的插件概要列表
   * 其中每一项的内容格式后面进行说明
   */
  plugins:[],
  /**
   * 各种被plugins依赖的通用小组件的集合,他们本身不是一个插件
   * 其中每一项啊内容格式在后面说明
   */ 
  commons:[]
}
```
每个插件配置项的格式如下:
```typescript
interface IPluginItem {
  /**
   * 插件名称,用于设计端下拉列表中选择
   */
  name: string; // 举例值:'Choice Basic',
  /**
   * 插件id,当设计端选择使用该插件时,ui插件配置中会存储该id,
   * 答题端中从设计端存储好的ui插件配置中获取该id,然后从加载好的该文件中
   * 找到url去加载该插件的内容,达到按需加载的目的
   */
  id: string; // 举例值:'choice_basic',
  /**
   * 用于加载该插件的真实内容
   */
  url: string; // 举例值: 'https://rq.choiceform.io/plugin/nodes/choice/basic-7uhg8thd.js',
  /**
   * 该插件是为哪个类型的题型准备的,一般只为一个类型准备,以防有些插件可以跨题型准别
   * 所有是数组类型,
   * 设计端加载到该配置后,可以按规则给各个题型分别可用的插件列表.
   */
  forTypes: number[]; // 举例值: [1]
  /**
   * 所依赖的通用小组件模板id名列表
   * 虽然每个题型自己单独写插件,但是这些题型中有很多部分可能行为还是一致的
   * 比如,图片显示,其他选项展示等,这些东西在每个插件里都重复写肯定是不好的,
   * 所以依然可以抽出公共部分,但这些小组件会像插件一样独自抽成js文件,
   * 从而方便按需加载
   * 当加载某个插件时,需要先加载其依赖的模板,当然模板又可以依赖其他的模板,
   * 这样就需要深入加载
   */ 
  depends: string[]; // ['common_head', 'common_image', 'common_other_options']
}
```
每个小组件模板配置项结构如下:
```typescript
interface ICommonItems{
  /**
   * 模板id
   */
  id: string; // 举例值: common_head
  url: string // 举例值: 'https://rq.choiceform.io/plugin/common/head-cfsghdth.js',
  /**
   * 依赖的其他模板的id
   * 模板可以再次依赖其他模板
   */ 
  depends: string[] // 举例值: ['common_image']
}
```
3. 插件的写法规范
 + 除了第三方插件之外,其他的依赖导入都从一个虚拟模块中导入.
 + 每个模块都要以某种方式注册到虚拟模块中

4. 样式规则:
 + 通过webpack显式加载以字符串形式注入到组件内,组件初始化的时候会尝试往页面头部插入这些样式,如果该组件id的样式已经插入过,则不再插入.

5. app和plugin是两个独立的程序,不要互相依赖,把他们放一个项目中是因为构建同步方便统一管理资源.

6. 如何通过webpack配置组件的指定规范抽取摘要文件是关键的一步.

## 构建插件入门
1. 单独构建出插件脚本
2. 插件脚本不要注入到index.html中,在WebpackHtmlPlugin中配置要排除的入口id
3. 在插件中以常规方式导入依赖项,仍然能分离构建partials脚本.

## 构建插件进阶
1. 根据webpack的构建依赖树制作出我们自己的插件依赖汇总信息,通过读取webpack的构建树,抽取其中的关键信息描绘了我们的汇总信息,输出成tree.json文件
2. 通过loader入口插件中,是插件粘附到全局的一个属性上.
3. 模块依赖其他不分离的模块时,会针对该模块找到多个chunk,这时候要注意不要在树中生成多个分叉.
4. 添加额外的处理,本地开发是,不自动导入core,而是导入一个转接包,core则在html直接注入,这样才能留住core的原始sourcemap方便调试

## 构建插件高级(可选)
1. 尝试在hot-server中限定某部分chunk携带websocket,以减少本地开发的socket连接,如果每个插件都呆着socket链接的话,会出现非常多的连接
2. 如果添加或者删除了文件,则尝试重启hot-server.

## 打通动态组件加载流程
1. 设计端增加答题客户端选择,接在每个客户端的tree.json.
2. 设计端从tree.json中为每个节点抽出可以用的模板以供选择.
3. 设计端保存时在每个节点身上保存了自己使用的模板,在全局保存了当前所有已经使用的模板.
4. client-core下载到设计端保存的数据后,预先加载需要用到的模板.
5. 在之前,client-live中独立抽出的模板在构建时都把组件粘附到了`window.CF_UI_COMS`上面了,加载这些模板是,这个全局对象上就会自动增加对应的组件.
6. client-core合成题目时,找到设计端在这个题目上面保存的模板id,用这个id到`window.CF_UI_COMS`这个全局对象上找到自己的组件放到自己身上
7. client-live渲染题目时,找到题目身上的渲染组件对象,传入相应参数就能正常渲染.


## 样式的构建
+ 全局样式
+ 每个组件独立的样式
+ 独立样式何时加入到页面中


## 主题的注入案列
+ 从主题中获取动态样式


## 更懒的加载方式
比起之前首页就加载了所有的资源(无论某些组件在该问卷用到与否),现在只有在开始答题时加载了该题目用到的所有组件,这样懒加载是一种进步.


不过还能更懒,我们可以在每个下一题的时候再加载谋面这道题用的模板,不过这样就要把题目合成的流程从现在的同步流程变成异步流程

## I18n的导入和翻译方式
+ 翻译文本用typescript编写
+ 使用时直接调用方法
+ 添加webpack的plugin和loader,分别构建json文件,注入加载地址,替换多语言代号.


## runtimeChunk设置为single
默认情况下如果webpack打包出来多个入口,每个入口又依赖了某个共通通模块,则该模块在每个入口中会生成新的实例,如果你这个共同模块中有些内部缓存数据或跨模块访问数据,则在多个实例间是不共享的,导致你的缓存数据或跨模块访问数据失效

这是可以在webpack的配置中将optimization.runtimeChunk设置为single,则他们就会共享一个实例