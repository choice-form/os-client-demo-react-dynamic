
/**
 * 定位结果
 */
interface ILocatorResult {
  /**
   * 位置信息
   * 当type为success时才有
   */
  data?: CFMapLocation;
  /**
   * 结果类型
   */
  type: 'success' | 'failure' | 'timeout';
}

/**
 * 定位消息传递
 */
interface ILocatorMessage {
  /**
   * 内容
   */
  data: any;
  /**
   * 信息名
   */
  name: string;
  /**
   * 信息类型
   */
  type: 'success' | 'failure' | 'timeout';
}

/**
 * 定位器
 */
interface ILocator {
  /**
   * 负责定位的iframe
   */
  iframe: HTMLIFrameElement;
  /**
   * 定位结果回调函数
   * @param result 结果
   */
  callback(result: ILocatorResult): void;
}

const locators: { [key: string]: ILocator } = {}


/**
 * 加载定位器
 * @param name 名称
 * @param url 地址
 */
async function loadLocator(name: string, url: string): Promise<ILocator> {
  if (locators.baidu) {
    return locators.baidu;
  }
  const promise = new Promise(resolve => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('id', `${name}-locator-iframe`);
    iframe.setAttribute('src', url);
    iframe.onload = () => {
      locators[name] = { iframe, callback: () => { /***/ } };
      resolve(locators[name]);
    }
    window.addEventListener('message', (e) => {
      const data = e.data as ILocatorMessage;
      if (data && data.name === `${name}-locate-result`) {
        locators[name].callback(data);
      }
    })
    document.body.append(iframe);
  }) as Promise<ILocator>;
  return await promise;
}

/**
 * 使用百度定位
 */
async function locateByBaidu(): Promise<ILocatorResult> {
  const locator = await loadLocator('baidu', 'public/baidu-locator.html');
  const promise = new Promise((resolve) => {
    locator.callback = (e) => {
      resolve(e);
    }
    locator.iframe.contentWindow.postMessage({
      name: 'baidu-locate',
    }, '*');
  }) as Promise<ILocatorResult>
  return await promise;
}

/**
 * 定位,当前我们只使用了百度定位
 * 后面我们可以加入多个定位器,如谷歌定位服务,高德定位,
 * 如果某个定位器定位失败,则再尝试使用其他定位器定位,解决在境外无法定位的问题
 * 我们定位的结果CFLocatorResult.data是CFMapLocation类型,
 * 这个类型和百度地图的定位结果数据是一致的,所以百度定位直接把结果拿过来就行
 * 如果换了其他定位则可能定位完成后要把数据转换成该结构
 */
export async function locate(): Promise<ILocatorResult> {
  const result = await locateByBaidu();
  return result;
}