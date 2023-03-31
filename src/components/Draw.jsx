
import { useEffect } from 'react'
import * as PIXI from "pixi.js";
import { useApp, useTick } from '@pixi/react';
import { MessagerQueue } from "./messager";
import { Game } from './game';

let queue = null;

export default function Draw() {
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  

  let app = useApp();
  let level = 1;
  let game = Game.getInstance(app)
  
  useEffect(() => {
    function handleResize() {
      app.resizeTo = window;
      app.renderer.resize(window.innerWidth, window.innerHeight);
      console.log("resize", window.innerWidth, window.innerHeight)
    }
    console.log("background", PIXI)
    window.addEventListener('resize', handleResize)

    game.start(level)

    queue = MessagerQueue.getInstance()
    queue.subscribe("load_level", (data) => {
      game.start(data)
    })

    queue.subscribe("win", (data) => {
      level += 1;
      queue.push("load_level", level, 300)
    })
  }, [])


  useTick((delta) => {
    if (queue !== null) {
      queue._elapsed += delta;
      queue.pop(queue._elapsed)
    }
  });

  return (
    <></>
  );
}



