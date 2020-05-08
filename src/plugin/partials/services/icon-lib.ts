/**
 * 每个URL可以被多个地方引用,但是他生成的文档则只能同时被一个地方引用
 * 所以做两层缓存
 */
interface IIconCache {
  [key: string]: {
    group: {
      [key: string]: Node
    },
    node: Node;
  }
}
const cached: IIconCache = {};
/**
 * 加载图标
 * @param url 图标地址
 * @param id 使用者id,用于缓存
 */
export async function loadIcon(url: string, id: string): Promise<Node> {
  const urlCached = cached[url];
  if (urlCached) {
    const docCached = urlCached.group[id];
    if (docCached) {
      return docCached;
    } else {
      const node = urlCached.node.cloneNode(true);
      urlCached.group[id] = node;
      return node;
    }
  } else {
    const promise = new Promise(resolve => {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = () => {
        resolve(req.responseXML);
      }
      req.send();
    }) as Promise<Document>;
    const loaded = await promise;
    const node = loaded.children[0];
    cached[url] = {
      node,
      group: { [id]: node.cloneNode(true) }
    }
    return node;
  }
}