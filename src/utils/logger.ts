

export function utilExampleLog(...message: string[]): void {
  const [first, ...others] = message;
  console.log('%c Logged by UtilExampleLogger: ' + first,
   ...others, 'background: #222, color: #bada55');
};