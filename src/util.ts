export function createDebouncedAsyncFunction(fcn: Function) {
  let executing = false;
  return async () => {
    if(executing) return;
    executing = true;
    await fcn();
    executing = false;
  }
}