import {
  Application,
  autoDetectRenderer,
  Container,
  WebGLRenderer,
} from "pixi.js";

export const app = new Application();
await app.init({
  view: document.createElement("canvas"),
  resizeTo: window,
  preference: "webgl",
  background: "#000000",
  antialias: true,
  //   canvas: ,
});

document.body.appendChild(app.canvas);

// const renderer = await autoDetectRenderer({
//   preference: "webgpu", // or 'webgl'
// });

// const container = new Container();
// renderer.render(container);
