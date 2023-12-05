export abstract class VO<T> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }
}
