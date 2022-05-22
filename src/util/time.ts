export default class Time {
  currentFrameTimestamp: number = new Date().getTime();
  lastFrameTime: number = this.currentFrameTimestamp;
  deltaTime: number = 0;

  update() {
    this.currentFrameTimestamp = new Date().getTime();
    this.deltaTime = (this.currentFrameTimestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = this.currentFrameTimestamp;
  }
}
