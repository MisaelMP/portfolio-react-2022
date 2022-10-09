import p5Types from 'p5';

declare global {
  interface Window {
    p5: p5Types;
  }
}

export {};