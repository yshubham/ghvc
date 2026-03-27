declare module "split-type" {
  export default class SplitType {
    constructor(element: Element, options?: { types?: string; tagName?: string });
    revert(): void;
    chars?: Element[];
    words?: Element[];
    lines?: Element[];
  }
}
