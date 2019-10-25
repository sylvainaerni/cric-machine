<template>
  <div class="relative">
    <button class=" mr-5 p-2 bg-green-600" @click="addItem('sheetsSimpleJump')">Add Sheets</button>
    <button class=" mr-5 p-2 bg-green-600" @click="addItem('cubeSmall')">Add cube</button>
    <button class=" mr-5 p-2 bg-green-600" @click="addItem('wheel001')">Add Wheel</button>
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
          :x=item.x
          :y=item.y
        >
          <v-sprite
            @mouseover="handleMouseOver"
            @mouseout="handleMouseOut"
            @dragstart="handleDragStart"
            @dragend="handleDragEnd"
            :key="`sprite-${index}`"
            :config="item.sprite"
            ref="sprite"
            type="sprite"
            :draggable=false
          />

          <v-rect
            @mouseover="handleMouseOver"
            @mouseout="handleMouseOut"
            key="actionMoveTop"
            :visible=item.actionsAreVisible
            :config="{
              x: item.sprite.width -60,
              y: -20,
              width: 20,
              height: 20,
              fill: '#22dd22'
            }"
          />
          <v-rect
            @mouseover="handleMouseOver"
            @mouseout="handleMouseOut"
            key="actionMoveDown"
            :visible=item.actionsAreVisible
            :config="{
              x: item.sprite.width -40,
              y: -20,
              width: 20,
              height: 20,
              fill: '#11cc11'
            }"
          />
          <v-rect
            @click="deleteItem"
            @mouseover="handleMouseOver"
            @mouseout="handleMouseOut"
            key="actionDelete"
            :visible=item.actionsAreVisible
            :config="{
              x: item.sprite.width -20,
              y: -20,
              width: 20,
              height: 20,
              fill: 'red'}"
          />

        </v-group>

      </v-layer>
    </v-stage>
  </div>
</template>

<script>

const StageWidth = window.innerWidth;
const StageHeight = window.innerHeight;
const image = new window.Image();
let   nGroups = 4; // TO DO: find solution for the id's

const colorRedTransparent03 = 'rgba(255,0,0,0.3)';
const colorRedTransparent02 = 'rgba(255,0,0,0.2)';

import { store } from "../Store.js";

export default {
  data() {
    return {
      stageSize: {
        width: StageWidth,
        height: StageHeight
      },
      sprite: {
        image: image
      },
      rectangles: store.state.rectangles
    };
  },

  methods: {
    addItem(type){
      store.addItem(type);
      this.reloadAllImages();
      // TODO: start the animation after new item is added/mounted
    },

    deleteItem(e){
      console.log('item', e.target.parent.name());
      let index = e.target.parent.index;
      this.rectangles.splice(index,1);
      // // let rectangleName = e.target.parent.name();
      // let index =  this.rectangles.map(function(e) { return e.name; }).indexOf(item.name);

      // console.log('index', index);
      // this.rectangles.splice(index,1);
      // // nGroups--;
    },

    // deleteItem(item){
    //   console.log('item', item.name);
    //   // let rectangleName = e.target.parent.name();
    //   let index =  this.rectangles.map(function(e) { return e.name; }).indexOf(item.name);

    //   console.log('index', index);
    //   this.rectangles.splice(index,1);
    //   // nGroups--;
    // },

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
      console.log('rectangles', this.rectangles);
      rectangle.sprite.fill = colorRedTransparent02;
      this.showActionItems(rectangle);
    },

    handleMouseOut(e) {
      const rectangle = this.findVueRectangleItem(e.target);
      rectangle.sprite.fill = "transparent";
      this.hideActionItems(rectangle);
    },

    handleDragStart(e) {

    },

    handleDragEnd(e) {

    },

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

    reloadAllImages : function(){
      for (let i = 0; i < this.rectangles.length; i++) {
        this.rectangles[i].sprite.image = image;
      }
    }
  },

  mounted() {
    image.src = require(`@/assets/sprites/cric-test.png`);
    image.onload = () => {
      // set image only when it is loaded
      this.reloadAllImages();
    };
  }
};
</script>

<style lang="postcss" >
body {
  background-color: #ccb786;
  background-image: url("https://www.transparenttextures.com/patterns/black-paper.png");
}
/* .actions {
  @apply absolute p-2 bg-gray-500;

  &:hover {
    @apply bg-white text-red-300;
  }
} */
</style>