<template>
  <div class="relative">
    <button class=" mr-5 p-2 bg-green-400" @click="addItem">Add Item</button>
    <button class=" mr-5 p-2 bg-red-400" @click="removeItem(rectangles.length-1)">Remove Last Item</button>
    <button class=" mr-5 p-2 bg-green-600" @click="animateSprites">Animate</button>
    <button class=" mr-5 p-2 bg-green-600" @click="reverseIndexes">Reverse z-indexes</button>
    <div :class=" isHovering ? 'fixed bottom-0 p-2 bg-green-600' : 'hidden' " :xpos=0 :ypos=0 >
      {{ hoveredItem ? hoveredItem.attrs.name : 'target' }}
    </div>

    <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown">
      <v-layer ref="layer">

        <v-sprite
          v-for="(item, index) in rectangles"
          @mouseover="handleMouseOver"
          @mouseout="handleMouseOut"
          @dragstart="handleDragStart"
          @dragend="handleDragEnd"
          :key="`${index}`"
          :name="`rectangle-${index}`"
          :config="item"
          ref="sprite" />

        <v-group
          name="actions"
          ref="group"
          :config="{
            x: this.actionGroupPosX(),
            y: this.actionGroupPosY()
          }">
            <v-rect :config="{
              x: 0,
              y: 0,
              width: 25,
              height: 25,
              fill: 'green'
            }" />
            <v-rect :config="{
              x: 26,
              y: 0,
              width: 25,
              height: 25,
              fill: 'green'
            }" />
            <v-rect :config="{
              x: 52,
              y: 0,
              width: 25,
              height: 25,
              fill: 'red'
            }" />
        </v-group>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>

const StageWidth = window.innerWidth;
const StageHeight = window.innerHeight;
const image = new window.Image();
let   nRectangles = 4; // TO DO: find solution for the id's

const colorRedTransparent03 = 'rgba(255,0,0,0.3)';
const colorRedTransparent02 = 'rgba(255,0,0,0.2)';

export default {
  data() {
    return {
      stageSize: {
        width: StageWidth,
        height: StageHeight
      },
      image: image,
      dragItemId: null,
      hoveredItem: null,
      isHovering: false,
      isDragging: false,
      rectangles: [
        {
          name: 'rectangle-0',
          image: null,
          x: 200,
          y: 200,
          width: 300,
          height: 250,
          fill: 'transparent',
          draggable: true,
          rotation: 0,
          offset: {
            x: 0,
            y: 0
          },
          animation: 'vibrato',
          frameRate: 10,
          frameIndex: 0,
          animations: {
            vibrato: [
              // x, y, width, height (3 frames)
                0,  0, 300, 250,
               300, 0, 300, 250,
               600, 0, 300, 250 ]
          }
        },
        {
          name: 'rectangle-1',
          image: null,
          x: 150,
          y: 150,
          width: 150,
          height: 130,
          fill: 'transparent',
          draggable: true,
          animation: 'vibrato',
          frameRate: 5,
          frameIndex: 1,
          animations: {
            vibrato: [
              // x, y, width, height (3 frames)
                0,  250, 150, 130,
               150, 250, 150, 130
            ]
          }
        },
        {
          name: 'rectangle-2',
          image: null,
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          fill: 'transparent',
          draggable: true,
          animation: 'vibrato',
          frameRate: 10,
          frameIndex: 1,
          animations: {
            vibrato: [
              // x, y, width, height (3 frames)
              300, 250, 130, 160,
              430, 250, 130, 160,
              560, 250, 130, 160,
              690, 250, 130, 160,
              820, 250, 130, 160,
                0, 410, 130, 160,
              130, 410, 130, 160,
              260, 410, 130, 160,
              390, 410, 130, 160,
              520, 410, 130, 160,
              650, 410, 130, 160,
              780, 410, 130, 160
            ]
          }
        },
        {
          name: 'rectangle-4',
          image: null,
          x: 250,
          y: 150,
          width: 100,
          height: 100,
          fill: 'transparent',
          draggable: true,
          animation: 'vibrato',
          frameRate: 10,
          frameIndex: 1,
          animations: {
            vibrato: [
              // x, y, width, height (3 frames)
                0, 570, 70, 100,
               70, 570, 70, 100,
              140, 570, 70, 100,
              210, 570, 70, 100,
              280, 570, 70, 100,
              350, 570, 70, 100
            ]
          }
        }
      ]
    };
  },
  methods: {
    actionGroupPosX() {
      let xpos = this.hoveredItem ? this.hoveredItem.attrs.x : 0
      return xpos;
    },

    actionGroupPosY() {
      let ypos = this.hoveredItem ? this.hoveredItem.attrs.y : 0
      return ypos;
    },

    handleMouseOver(e) {
      this.isHovering = true;
      this.hoveredItem = e.target;
      this.hoveredItem.attrs.fill = colorRedTransparent02;
      // to test: this.hoveredItem.add(actionGroup);
    },

    handleMouseOut(e) {
      this.hoveredItem.attrs.fill = 'transparent';
      this.hoveredItem = null;
      this.isHovering = false;
    },

    handleDragStart(e) {
      // this.isDragging = true;
      console.log('start drag: ', e.target.attrs)
      e.target.attrs.fill = colorRedTransparent03;
    },

    handleDragEnd(e) {
      // this.isDragging = false;
      e.target.attrs.fill = colorRedTransparent02;
    },

    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.dragItemId = '';
        return;
      }

      // find clicked Vue rectangle by its name
      const name = e.target.name();
      const rectangle = this.rectangles.find(s => s.name === name);


      if (rectangle) {
        this.dragItemId = name;

      } else {
        this.dragItemId = "";
      }
      console.log(this.dragItemId);
    },

    animateSprites() {
      for (let i = 0; i < this.$refs.sprite.length; i++) {
        this.$refs.sprite[i].getNode().start();
      }
    },

    reverseIndexes() {
      this.rectangles.reverse();
      return;
    },

    randomXPos : function(){
      console.log();
      return Math.floor(Math.random() * (StageHeight - 1 + 1)) + 1;
    },

    randomYPos : function(){
      console.log();
      return Math.floor(Math.random() * (StageHeight - 1 + 1)) + 1;
    },

    addItem(){
      // console.log(this.randomNumber() * StageWidth);

      this.rectangles.push({
        name: 'rectangle-'+nRectangles,
        image: this.image,
        x: this.randomXPos(),
        y: this.randomYPos(),
        width: 100,
        height: 100,
        fill: 'transparent',
        draggable: true,
        animation: 'vibrato',
        frameRate: 10,
        frameIndex: 1,
        animations: {
          vibrato: [
            // x, y, width, height (18 frames)
            300, 250, 130, 160,
            430, 250, 130, 160,
            300, 250, 130, 160,
            430, 250, 130, 160,
            300, 250, 130, 160,
            430, 250, 130, 160,
            300, 250, 130, 160,
            430, 250, 130, 160,
            560, 250, 130, 160,
            690, 250, 130, 160,
            820, 250, 130, 160,
              0, 410, 130, 160,
            130, 410, 130, 160,
            260, 410, 130, 160,
            390, 410, 130, 160,
            520, 410, 130, 160,
            650, 410, 130, 160,
            780, 410, 130, 160
          ]
        }
      });

      nRectangles++;

      // TODO: start the animation after new item is added/mounted

    },

    removeItem(index) {
      console.log('index',index);
      this.rectangles.splice(index,1);
      nRectangles--;
    }
  },

  created() {
    image.src = require(`@/assets/sprites/cric-test.png`);
    image.onload = () => {
      // set image only when it is loaded
      for (let i = 0; i < this.rectangles.length; i++) {
        this.rectangles[i].image = image;
      }
    };
  },

  mounted() {
    // this.animateSprites()
  }
};
</script>

<style lang="postcss" scoped>
/* .actions {
  @apply absolute p-2 bg-gray-500;

  &:hover {
    @apply bg-white text-red-300;
  }
} */
</style>