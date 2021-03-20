import "/scripts/vendors/pixi.min.js";
import Game from "./lib/game.js";

let app = new PIXI.Application({
  antialiasing: true,
  transparent: false,
  resolution: window.devicePixelRatio || 1,
});
app.renderer.view.style.position = "absolute";
app.renderer.view.style.top = "0";
app.renderer.view.style.left = "0";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);
PIXI.Loader.shared.load(() => {
  const game = new Game(app);
  window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    game.scale();
  });
  app.ticker.add((delta) => game.renderFrame(delta));
});
