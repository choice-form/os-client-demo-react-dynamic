为了实现动态加载,我们在构建程序的时候就把构建树分离出来了,所以我们基于webpack完全使用自己编写的构建流程,这个构建流程对项目编程强制施加一些规则,下面说明这些规则.

基于该模块仓库新建了仓库以后需要对一下设置进行一些[自定义设置](#自定义设置)


## 前提
你必须非常了解如何使用巧思调研的[核心包](https://choice-form.github.io/os-client-doc/doc/modules/_index_d_.html)才能继续后面的主题,如果你还不了解,请先查看核心包的使用方法再继续.

## 目录结构
这里对需要关注的一些目录结构做说明
+ `config`目录中放了一些配置,配置在不同环境中的一些资源和结构的地址
+ `lang`文件夹中放了多语言的文本,初始只有中文和英文.后续可以按自己的需求添加其他语言.语言代号参考[这里](https://choice-form.github.io/os-client-doc/doc/modules/_index_d_.html#%E5%85%B3%E4%BA%8E%E5%A4%9A%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91)
+ `src`文件夹是项目代码
  + `app` 是主程序代码,答题端初始会加载这个程序,但是各个节点的组件还没加载
  + `plugin` 是动态加载的组件,开始答题时主程序会动态按需仅仅加载当前问卷需要用的组件.
    + `standards`目录中的是按节点类型标准划分的组件,进去第一层已经为每个类型的节点创建好的文件夹,这些文件夹名字是固定的,不能更改,在第二层,每个节点文件夹中已经实现了一个`basic`风格的组件,这个`basic`风格的组件是必须实现的.不能删除,除此之外,你能在第二层中`basic`的同级中为这个节点类型添加更多的风格,名字可以任意取.只有`basic`是名字不能变且必须存在的,其他风格的没有要求.
    + `partials`用于放置了比节点更低一级的共通组建,这里面没有限制,你可以添加任何名字和数量的组件,然后在`standards`中引用这里面的组件,如问题的头部所有题目都渲染成一样,则可以在`partials`中创建一个比如叫`node-head`的组件,然后`standards`中的节点组件在引用这个组件;同时`partials`中的某个组件也可以引用`partials`中的另一个组件.但是`partials`中的组件不能引用`standards`中的组件,
    > `plugin`目录中的引用规则:`standards`中的模块可以引用`partials`中的模块,`partials`中的模块可以引用`partials`中的模块,但是`partials`中的模块不能引用`standards`中的模块
  + `utils`目录用于放一些`app`和`plugin`中共同用到的模块
  > `app`和`plugin`是两个独立的程序,不能互相引用对方的模块,`app`可以引用`utils`,`plugin`也可以引用`utils`,反过来,`utils`不能引用`plugin`和`app`中的模块.

## 整理一下思路
+ 主程序,是放到`src/app`下面的程序,是一个完整的前端项目
+ 插件程序,是放到`src/plugin`下面的程序,是一些单独的前端组件,是要和主程序分离构建的,主程序最终会按需使用到这里面的组件,但是构建项目的时候不会构建在一起;编程时,主程序和插件程序之间的模块不能互相引用.
+ 工具程序,是放到`src/utils`下面的程序,指一些单独的模块,是主程序和插件程序都想使用的一些模块,这里面的模块可以被主程序和插件程序引用,但是不能反过来引用主程序和插件程序的模块,比如我们现在就在其中有一个多语言翻译模块,
+ 插件程序内部
 + 标准入口插件,在`src/plugin/standards`文件夹下,每个节点有一个文件夹,这些文件夹名字固定,在这些文件夹下,创建多个任意名字的文件夹,就为该节点创建了多个渲染风格,每个文件下必须是一本`index.tsx`作为组件文件,如`src/plugin/standards/choice/basic/index.tsx`和`src/plugin/standards/choice/advanced/index.tsx`这两个文件,就会选择题创建了`基础`和`高级`两种渲染风格,在设计端选中选择题后,节点右侧的布局设置中,就可以下拉选择使用`basic`或`advanced`风格渲染.
 + 非标准入口插件,在`src/plugin/partials`文件夹下,可以任意自定义目录和文件名,和`standards`中不一样,这里面对文件夹命名没有要求,但是组件文件仍然得交index.tsx,如果是非组件模块则文件名字不限制.一般这里面的组件或模块会在不同的标准入口组件里面都会被使用

 + `plugin`文件加下的所有UI组件都必须使用`export default`导出;逻辑模块则可用`export default`也可用`export`导出

## 引用关系限制图
箭头方向代表可引用的方向
+ `app <=> app => utils <=> utils`
+ `plugin/standards => utils <=> utils`
+ `plugin/standards => plugin/partials <=> plugin/partials`
+ `plugin/partials <=> plugin/partials => utils <=> utils`

如果违反了以上的规则的引用关系,则构建时会报错.

## 样式
+ 全局使用的通用样式放到主程序中,在`app/app.scss`中统一引入,每次都会加载.
+ 插件组件自己独有的样式,在`index.tsx`边上新建一本`style.scss`文件,样式写在里面,然后要记得在index.tsx中的组件类上新加一个导入样式的代码`static style:string = require('./style.scss')`

## 自定义设置
从种子仓库为模板生成仓库后,需要自定义一些配置,再进行开发
+ 应用程序名称:需要在`src/app/app.tsx`中的`Core.setup`方法的参数中设置`clientName`属性,这个名字需要和是设计端中选择答题渲染程序中的名字一样,
+ 构建配置:`build.config.js`文件,请查看其中的注释.



## 开始编写
+ 做好以上准备后就可以开发组件了
+ 通用的第三方资源在app中引入,每次都会被加载
+ 每个组件自己使用的资源在这个组件中引用,每个组件自己的样式需要按basic中的示例规则引入.
+ `html`模板参照`index.html`中的方式引入
+ 多语言直接引用`utils`中`i18n`中的`T(LANG.xxxx.xxxx)`方式进行翻译,可以搜索示例代码.
+ 引用主题
 + `app.tsx`中通过`getTheme`方法获取主题
 + 路由组件中通过`this.state.model.theme`获取主题
 + 节点组件中通过`this.state.theme`获取主题
 + 其他更小分支上的组件中如有要用到主题,通过路由或者节点组件将主题传进去即可.

 ## 题目组件
 上面的`开始编写`中的大部分事情,模板仓库中都已经布置好了,一般不需要改动,后面一般专注于实现各个题目的组件,模板仓库中,为每个题目都实现了basic风格,可作为参照.
 + 对于大部分的题目,其接到的`props`都是一下结构
 ```typescript
 /**
 * 节点组件基础属性
 */
interface IQuesComBaseProps {
  /**
   * 问题对象
   */
  node: CFQuestion;
  /**
   * 事件回调处理器
   */
  handler: CFUIEventHandler;
  /**
   * 主题信息
   */
  theme: CFTheme;
}
 ```
其中node是基础类型`CFQuestion`,真正渲染某个具体节点时,重写一下这个类型为当前渲染的具体节点类型,这样才能获得更精确的typescript提示,这个操作在所有节点的组件里面都有演示
+ 对于`start`和`reward`这两个组件,他们接到的`props`分别是`CFStartState`和`CFRewardState`,在其中包含了`handleEvents`(事件处理器)和`theme`(主题信息)

+ 在我们的演示中,主题信息只做了部分演示,全部内容请查看`CFTheme`中每个主题控制属性的说明

## 插件中引用第三方库注意事项
+ 如果插件程序`src/plugin`中引用了第三方库,记得到`build.config.js`中的`splitChunks`中配置一下,将这个第三方库单独打包,否则会导致许多入口插件的chunk重复包含这个库,不利于动态加载,具体说明请看`build.config.js`中的配置
+ 主程序`src/app`和工具程序`src/utils`下用到的第三方包则不用这样处理.

## typescript规则
+ 我们使用了typescript进行开发,其中的类型提示和报错提供了更友好的编程环境,
+ 核心包中`index.d.ts`提供了暴露给UI使用的数据类型定义,当我们在控制台打印或断点调试时会发现真实的数据对象上的属性会比`index.d.ts`中定义的属性多很多,切记这些属性都不能在UI中使用,因为他们是核心层使用的,随时可能发生变动被移除或被修改名字,UI中只能使用`index.d.ts`中暴露出来的属性,这一点:正好依靠typescript的类型检测可以规避
+ 项目中我们默认添加了一些额外的`tslint`检查规则,来保证更持久的可维护性.
  - 要求所有的方法都显示指定返回类型
  - 要求类的成员按字母排序的方式保证先后顺序,而且属性在方法之前,私有成员在公有成员之前的
  - 如果你不喜欢上述规则,可以更改`tslint.json`文件中的配置来变成你想要的规则.

## 对接与调试
+ 这个仓库写好以后,设计端是不知道的,所以设计端不会时候用这个程序,需要到设计端对接:把之前设置的本仓库的名称和发布后的程序地址写入到设计端主题管理器的代码中.
+ 本地启动项目
+ 打开设计端,发现主题管理器面板中的答题程序选择列表中会出现刚才添加的名称
+ 在下拉列表中选择时候用本项目作为答题程序,然后打开预览窗口,能看到预览窗口中显示的就是本项目的页面.
+ 修改一些本项目的代码,预览窗口会自动刷新.
+ 在设计端中选中某个节点,右侧编辑栏中选择布局tab,在这里面可以看到渲染模板的设置,下拉列表中会展示本项目中为这个节点类型准备好的各种风格,名字和风格文件夹的名字的相同,选择不同的风格后,预览窗口会展示你选择的风格.
+ 本地开发时,如果更改了既有的风格组件,则预览窗口会自动刷新展示更改后的效果;如果为该节点添加了风格,则需要刷新设计端后,才能在风格选择列表中看到新加的风格名称.





## 补充说明
为了实现节点组件的动态按需加载,我们必须把主程序和插件程序分开,构建出来的资源也是分开的.
这样主程序初始运行起来的时候加载的东西就会很小,只有模板+路由引擎(如react,vue等),答题端核心包(os-client-core),主程序自己的代码和一些通用依赖的包,而节点组件的代码一个都还没加载

当开始渲染某些题目的时候,才会去需要渲染的某个类型的题目的某个风格的组件代码.这样的话如果问卷中只用两个题型的两个风格,则答题端从始至终就只会加载这两个组件,(当然开始和结束的组件必然是会加载的).

有了上面的机制,我们在节点类型增加,或因不同客户的需求对某个题型的展现方式发生巨大变化的时候,我们可以毫无负担的在plugin中添加新的题型组件,或者为某个题型添加新的风格组件,这样的横向扩展不再会使得答题端程序的加载包变大,使得以后的UI开放可以更自由.

## 组件
增加 `/utils/ui-components` 文件夹，存放基础的react组件。供app和plugin调用

