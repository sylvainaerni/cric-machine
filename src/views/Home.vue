<template>
  <div class="relative">
    <button class=" mr-5 p-2 bg-green-400" @click="addItem">Add Item</button>
    <button class=" mr-5 p-2 bg-red-400" @click="removeItem(rectangles.length-1)">Remove Last Item</button>
    <button class=" mr-5 p-2 bg-green-600" @click="animateSprites">Animate</button>
    <button class=" mr-5 p-2 bg-green-600" @click="reverseIndexes">Reverse z-indexes</button>

      <!--@mousedown="handleStageMouseDown"-->
    <v-stage
      ref="stage"
      :config="stageSize"
    >
      <v-layer ref="layer">

        <v-group
          v-for="(item, index) in rectangles"

          :key="`group-${index}`"
          :name="`group-${index}`"
          ref="group"
          type="group"
          draggable="true"
          :x=300*index
          :y=200
        >
          <v-sprite
            @mouseover="handleMouseOver"
            @mouseout="handleMouseOut"
            @dragstart="handleDragStart"
            @dragend="handleDragEnd"
            :key="`sprite-${index}`"
            :config="item"
            ref="sprite"
            type="sprite"
            :draggable=false
          />

          <v-rect
            @mouseover="handleMouseOver"
            @mouseout="handleMouseOut"
            :visible=item.actionsAreVisible
            :config="{
            x: item.width -60,
            y: -20,
            width: 20,
            height: 20,
            fill: '#22dd22'}" />
          <v-rect
            @mouseover="handleMouseOver"
            @mouseout="handleMouseOut"
            :visible=item.actionsAreVisible
            :config="{
            x: item.width -40,
            y: -20,
            width: 20,
            height: 20,
            fill: '#11cc11'}" />
          <v-rect
            @click="deleteItem"
            @mouseover="handleMouseOver"
            @mouseout="handleMouseOut"
            :visible=item.actionsAreVisible
            :config="{
            x: item.width -20,
            y: -20,
            width: 20,
            height: 20,
            fill: 'red'}" />

        </v-group>

      </v-layer>
    </v-stage>
  </div>
</template>

<script>

let rectanglesListExample = [
  {
    name: 'group-0',
    image: null,
    width: 300,
    height: 250,
    fill: 'transparent',
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
    },
    actionsAreVisible: false
  },
  {
    name: 'group-1',
    image: null,
    width: 150,
    height: 130,
    fill: 'transparent',
    animation: 'vibrato',
    frameRate: 5,
    frameIndex: 1,
    animations: {
      vibrato: [
        // x, y, width, height (3 frames)
          0,  250, 150, 130,
          150, 250, 150, 130
      ]
    },
    actionsAreVisible: false
  },
  {
    name: 'group-2',
    image: null,
    width: 130,
    height: 160,
    fill: 'transparent',
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
    },
    actionsAreVisible: false
  },
  {
    name: 'group-3',
    image: null,
    width: 70,
    height: 100,
    fill: 'transparent',
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
    },
    actionsAreVisible: false
  }
];
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
      currentRectangle: null,
      rectangles: rectanglesListExample
    };
  },
  methods: {

    deleteItem(e){
      let rectangleName = e.target.parent.name();

      this.rectangles = this.rectangles.filter(item => item.name != rectangleName);
    },

    findVueRectangleItem(target) {
      // find target name in the rectangles list and return the rectangle:
      let rectangleName = target.parent.name();
      return this.rectangles.find(s => s.name === rectangleName);
    },

    showActionItems(rectangle) {
      rectangle.actionsAreVisible = true;
    },

    hideActionItems(rectangle) {
      rectangle.actionsAreVisible = false;
    },

    handleMouseOver(e) {
      const rectangle = this.findVueRectangleItem(e.target);
      rectangle.fill = colorRedTransparent02;
      this.showActionItems(rectangle);
    },

    handleMouseOut(e) {
      const rectangle = this.findVueRectangleItem(e.target);
      rectangle.fill = "transparent";
      this.hideActionItems(rectangle);
    },

    handleDragStart(e) {
      // const item = this.findVueRectangleItem(e.target);
      // console.log('item: ', item)
      // if (item) item.fill = colorRedTransparent03;
    },

    handleDragEnd(e) {
      // const item = this.findVueRectangleItem(e.target);
      // if (item) item.fill = colorRedTransparent02;
    },

    // handleStageMouseDown(e) {
    //   // clicked on stage - clear selection
    //   if (e.target === e.target.getStage() ) {
    //     if (!this.currentRectangle) return;

    //     this.currentRectangle.fill = "transparent";
    //     this.currentRectangle = null;
    //     return;
    //   }

    //   const rectangle = this.findVueRectangleItem(e.target);

    //   if (rectangle) {
    //     this.currentRectangle = rectangle;
    //     this.currentRectangle.fill = colorRedTransparent02;
    //   } else {
    //     this.currentRectangle.fill = "transparent";
    //     this.currentRectangle = null;
    //   }
    // },

    animateSprites() {
      // TO DO: animate items when they are added to the stage
      for (let i = 0; i < this.$refs.group.length; i++) {
        this.$refs.group[i].$children[0].getNode().start();
      }
    },

    reverseIndexes() {
      this.rectangles.reverse();
      return;
    },

    randomXPos : function(){
      return Math.floor(Math.random() * (StageHeight - 1 + 1)) + 1;
    },

    randomYPos : function(){
      return Math.floor(Math.random() * (StageHeight - 1 + 1)) + 1;
    },

    addItem(){

      this.rectangles.push({
        name: 'rectangle-'+nRectangles,
        image: this.image,
        x: this.randomXPos(),
        y: this.randomYPos(),
        width: 100,
        height: 100,
        fill: 'transparent',
        draggable: false,
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