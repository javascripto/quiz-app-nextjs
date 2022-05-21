export function handleFetch(response: Response) {
  if (response.ok) return response.json();
  throw new Error(response.statusText);
}

export const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export function delayPromise(milliseconds: number) {
  return async <T>(data: T) => {
    await wait(milliseconds);
    return data;
  };
}
