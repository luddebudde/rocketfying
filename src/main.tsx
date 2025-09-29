import {
  Application,
  Assets,
  TilingSprite,
  compileInputs,
  Container,
  Sprite,
} from "pixi.js";
import { createPlanet } from "./createPlanet";
import { app, game } from "./gameObject";

(async () => {
  // Initialize the application
  await app.init({ resizeTo: window });
  const texture = await Assets.load("/public/background.png"); // eller URL

  // Skapa en sprite från texture
  // const background = new Sprite(texture);

  // const background = new TilingSprite(
  //   texture,
  //   app.screen.width,
  //   app.screen.height
  // );

  const bgContainer = new Container();
  app.stage.addChildAt(bgContainer, 0);

  const spriteWidth = texture.width;
  const spriteHeight = texture.height;

  // Repetera så många gånger som behövs för att fylla skärmens höjd
  for (let y = 0; y < app.screen.height; y += spriteHeight) {
    for (let x = 0; x < app.screen.width; x += spriteWidth) {
      const sprite = new Sprite(texture);
      sprite.y = y; // placera sprite vertikalt
      sprite.x = x; // vänsterkanten
      bgContainer.addChild(sprite);
    }
  }

  // Justera storlek så den täcker hela skärmen
  // background.width = app.screen.width / 8;
  // background.height = app.screen.height / 8;

  // // Lägg bakgrunden längst bak
  // app.stage.addChildAt(background, 0); // 0 = längst bak
  document.body.appendChild(app.canvas);

  // Create and add a container to the stage
  // const container = new Container();

  // app.stage.addChild(container);

  // Load the bunny texture
  // const texture = await Assets.load("/public/planet.png");

  // Create a 5x5 grid of bunnies in the container
  for (let i = 0; i < 5; i++) {
    createPlanet({
      x: Math.random() * app.screen.width,
      y: Math.random() * app.screen.height,
    });
    // const planet = new Sprite(texture);
    // planet.x = (i % 5) * 40;
    // planet.y = Math.floor(i / 5) * 40;
    // log;
  }

  //   const texture = await Assets.load("https://pixijs.com/assets/bunny.png");

  // // Create a 5x5 grid of bunnies in the container
  // for (let i = 0; i < 25; i++) {
  //   const bunny = new Sprite(texture);

  //   bunny.x = (i % 5) * 40;
  //   bunny.y = Math.floor(i / 5) * 40;
  //   container.addChild(bunny);
  // }

  // Move the container to the center
  game.planets.forEach((container) => {
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;

    // Center the bunny sprites in local container coordinates
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
  });

  // Listen for animate update
  app.ticker.add((time) => {
    // Continuously rotate the container!
    // * use delta to create frame-independent transform *

    game.planets.forEach((container) => {
      // container.pivot.x = container.width / 2;
      // container.pivot.y = container.height / 2;
      // Center the bunny sprites in local container coordinates
      container.rotation -= 0.05 * time.deltaTime;

      bgContainer.children.forEach((child) => {
        const sprite = child as Sprite;
        sprite.y += 1; // scrollhastighet

        if (sprite.y >= app.screen.height) {
          sprite.y = -sprite.height;
        }
      });
    });
  });
})();
