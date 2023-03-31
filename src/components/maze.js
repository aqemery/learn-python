import { Assets, Sprite, Container } from 'pixi.js'
import { MessagerQueue } from './messager'
import { Game } from './game'
import { Mouse } from './mouse'

export class Maze {
  constructor(level) {
    this.level = level
    this.mazeData = []
    this.map = null
    this.mouse = null
    this.height = 0
    this.width = 0
    this.tileTypes = null

    const game = Game.getInstance()
    Promise.allSettled([
      Assets.load('../maze/maze.json'),
      fetch(`../maze/${this.level}.tmj`).then((response) => response.json()),
    ]).then((results) => {
      const texture = results[0].value
      const data = results[1].value
      console.log('data height', data['height'], data.height)
      const layer = data.layers[0]
      const map = new Container()
      // create mazeData for layer data split into rows
      for (let i = 0; i < layer.height; i++) {
        this.mazeData.push(
          layer.data.slice(i * layer.width, (i + 1) * layer.width)
        )
      }
      this.height = layer.height * data.tilewidth
      this.width = layer.width * data.tilewidth

      const tileSize = data.tilewidth
      this.mazeData.forEach((row, y) => {
        row.forEach((col, x) => {
          const sprite = new Sprite(texture.textures[col - 1])
          sprite.x = x * tileSize
          sprite.y = y * tileSize
          map.addChild(sprite)
        })
      })


      // get the the type property of all tiles in the tileset and create a map of id to type
      const tileTypes = data.tilesets[0].tiles.map((tile) => {
        return {
          id: tile.id,
          type: tile.properties[0].value,
        }
      })
      const tileTypeMap = new Map()
      tileTypes.forEach((tile) => tileTypeMap.set(tile.id, tile.type))
      console.log('tileTypeMap', tileTypeMap)
      this.tileTypes = tileTypeMap

      // find the start and finish tiles

      const start = data.tilesets[0].tiles.find(
        (tile) => tile.properties[0].value === 'start'
      )
      const finish = data.tilesets[0].tiles.find(
        (tile) => tile.properties[0].value === 'finish'
      )

      // find the x and y of the start tile
      const startTile = this.mazeData.find((row) => row.includes(start.id + 1))
      const startY = this.mazeData.indexOf(startTile)
      const startX = startTile.indexOf(start.id + 1)

      this.start = [startX, startY]
      this.mouse = [startX, startY]

      // find the x and y of the finish tile
      const finishTile = this.mazeData.find((row) =>
        row.includes(finish.id + 1)
      )
      const finishY = this.mazeData.indexOf(finishTile)
      const finishX = finishTile.indexOf(finish.id + 1)
      this.finish = [finishX, finishY]
      this.mouse = new Mouse(startX, startY, finishX, finishY)

      game.scene.addChild(map)
      map.zIndex = 1

      window.maze = this
    })
    console.log('this construct', this)
  }
  checkTile(direction) {
    // check if mouse can move in direction of value 0-3
    // 0 = up, 1 = right, 2 = down, 3 = left
    // return the property type of the tile the mouse is moving to
    
    let x = this.mouse.pos[0]
    let y = this.mouse.pos[1]
    switch (direction) {
      case 0:
        y -= 1
        break
      case 1:
        x += 1
        break
      case 2:
        y += 1
        break
      case 3:
        x -= 1
        break
      default:
        break
    }

    console.log('x', x, 'y', y)
    console.log('mazeData', this.mazeData)

    const tile = this.mazeData[y][x]
    return this.tileTypes.get(tile - 1)
  }


  moveMouse(direction) {
    // move mouse in direction of value 0-3
    // 0 = up, 1 = right, 2 = down, 3 = left
    
    const type = this.checkTile(direction)
    console.log('type', type)



    if (type === undefined) {
      return false
    }

    if (type === 'wall') {
      return false
    }

    this.mouse.move(direction)
    return true
  }


  destroy() {
    console.log('destroying maze')
    if (this.mouse !== undefined && this.mouse !== null) {
      this.mouse.destroy();
  }
  }
}
