// 为了支持ie9+,引入下面三个包
// 详情:https://reactjs.org/docs/javascript-environment-requirements.html
import "core-js/es/map";
import "core-js/es/set";
import "raf/polyfill"
// 再导入些常用的,但是低级浏览器不支持的小包
import "core-js/es/array/from";
import "core-js/es/array/includes";