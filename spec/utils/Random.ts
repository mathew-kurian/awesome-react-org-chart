export default class Random {
  constructor(seed: number) {}
  Next(range: number) {
    return Math.floor(Math.random() * range);
  }
}
