const cachedIcons: { [key: string]: string } = {};

export async function loadIcon(url: string): Promise<string> {
  const cached = cachedIcons[url];
  if (cached) {
    return cached
  }
  const promise = new Promise(resolve => {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = () => {
      resolve(req.responseText);
    }
  }) as Promise<string>;

  const loaded = await promise;
  cachedIcons[url] = loaded;
  return loaded;
}