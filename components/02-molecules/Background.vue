<template>
  <div
    id="canvas"
    class="top-0 right-0 h-screen w-screen fixed -z-1 inset-0"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import P5 from 'p5'

export default defineComponent({
  setup() {},
  mounted() {
    const canvas = document.getElementById('canvas')
    if (!canvas) return
    const p5 = new P5((p: P5) => {
      class LineMotion {
        t0 = 0
        t1 = 0
        y = 0
        sw = 0
        constructor() {
          this.t0 = p.random()
          this.t1 = this.t0
          this.y = p.random(p.height)
          this.sw = p.random(0.5, 8)
        }

        move() {
          this.t0 += 0.01
          this.t1 += 0.01
          if (this.t0 > 1) {
            this.t0 = 0
          }
          if (this.t1 > 1) {
            this.y = p.random(p.height)
            this.t1 = 0
          }
        }

        draw() {
          const x0 = p.map(easyPos0(this.t0), 0, 1, 0, p.width)
          const x1 = p.map(easyPos1(this.t1), 0, 1, 0, p.width)
          p.fill(230, 20)
          p.noStroke()
          p.rect(x0, this.y, x1 - x0, this.sw)
        }
      }

      const lmAr: LineMotion[] = []
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        for (let i = 0; i < 50; i++) {
          lmAr.push(new LineMotion())
        }
      }
      p.draw = () => {
        p.background(4, 11, 21)

        p.drawingContext.shadowBlur = 100
        p.drawingContext.shadowColor = p.color(255, 0, 255)

        for (const lm of lmAr) {
          lm.move()
          lm.draw()
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }

      function easyPos0(t: number) {
        return t * t
      }

      function easyPos1(t: number) {
        return 1 - p5.pow(1 - t, 2)
      }
    }, canvas)
  },
})
</script>
