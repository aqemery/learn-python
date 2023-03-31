import { Assets, Sprite, Container, AnimatedSprite } from 'pixi.js'
import { MessagerQueue } from './messager'
import { Game } from './game'

export class Mouse {
  constructor(sx, sy, fx, fy) {
    this.pos = [sx, sy]
    this.finish = [fx, fy]
    this.moveQueue = []
    this.sprite = null
    this.speed = 2
    this.state = 'idle'
    this.dest = [0, 0]
    console.log('this construct', this)

    const game = Game.getInstance()
    Assets.load('../mouse-sheet.json').then((texture) => {
      this.texture = texture

      console.log('sprite sheet', this.texture)
      console.log('meta', this.texture.data.meta.frameTags)

      this.texture.animations = {}
      this.texture.data.meta.frameTags.forEach((tag) => {
        this.texture.animations[tag.name] = []
        for (let i = tag.from; i <= tag.to; i++) {
          this.texture.animations[tag.name].push(this.texture.textures[i])
        }
      })
      console.log('animations', this.texture.animations)

      const sprite = new AnimatedSprite(this.texture.animations['idle'])
      sprite.animationSpeed = 0.05
      sprite.play()
      sprite.zIndex = 10
      sprite.anchor.set(0.5)
      sprite.x = sx * 32 + 16
      sprite.y = sy * 32 + 16
      this.sprite = sprite
      this.dest = [sprite.x, sprite.y]
      game.app.ticker.add(this.ticker, this)
      console.log('Add Mouse to scene', this.sprite)
      game.scene.addChild(this.sprite)
    })
  }

  ticker(delta) {
    if (this.state == 'win') {
      return
    }

    const deltaSpeed = delta * this.speed
    // get a single distance value
    const dist = Math.sqrt(
      Math.pow(this.dest[0] - this.sprite.x, 2) +
        Math.pow(this.dest[1] - this.sprite.y, 2)
    )

    if (dist == 0) {
      if (this.moveQueue.length > 0) {
        console.log('moveQueue', this.moveQueue)
        this.dest = this.moveQueue.shift()
        this.setState('moving')
        this.sprite.animationSpeed = 0.1
      } else if (this.state != 'idle') {
        if (this.pos[0] == this.finish[0] && this.pos[1] == this.finish[1]) {
          console.log('WIN')
          this.setState('win')
          this.sprite.animationSpeed = 0.1
          let queue = MessagerQueue.getInstance()
          queue.push("win", null, 0)
        } else {
          this.setState('idle')  
          this.sprite.animationSpeed = 0.05
        }
        this.sprite.rotation = 0
        
      } 
    } else {
      // if the distance is less than the speed, just move to the destination
      if (dist < deltaSpeed) {
        this.sprite.x = this.dest[0]
        this.sprite.y = this.dest[1]
      } else {
        // calculate the angle of the line between the two points
        const angle = Math.atan2(
          this.dest[1] - this.sprite.y,
          this.dest[0] - this.sprite.x
        )
        // move the sprite along the line
        this.sprite.x += Math.cos(angle) * deltaSpeed
        this.sprite.y += Math.sin(angle) * deltaSpeed

        // rotate the sprite to face the destination
        this.sprite.rotation = angle - Math.PI / 2
      }
    }
  }

  setAnimation(name) {
    this.sprite.textures = this.texture.animations[name]
    this.sprite.play()
  }

  setState(state) {
    if (this.state !== state) {
      this.state = state
      this.setAnimation(state)
    }
  }

  move(direction) {
    let x = this.pos[0]
    let y = this.pos[1]
    switch (direction) {
      case 0:
        y--
        break
      case 1:
        x++
        break
      case 2:
        y++
        break
      case 3:
        x--
        break
      
    }
    this.pos = [x, y]
    this.moveQueue.push([x * 32 + 16, y * 32 + 16])
  }

  destroy() {
    this.sprite.destroy()
    const game = Game.getInstance()
    game.app.ticker.remove(this.ticker, this)
  }

}
