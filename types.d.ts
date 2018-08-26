declare module '*.svg' {
  const svg: string;
  export default svg;
}

declare module 'isomorphic-unfetch' {
  const fetch: any;
  export default fetch;
}

declare global {
  interface Window {
    foo: string;
  }
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
