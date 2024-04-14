// eslint-disable-next-line @typescript-eslint/space-before-function-paren
async function To<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (err: Error | any) {
    return [err, null];
  }
}

export default To;
