<template>
  <div class="relative">
    <button class=" mr-5 p-2 bg-green-600" @click="addItem({name: 'sheetsSimpleJump', x: randomXPos(), y: randomYPos()})">Add Sheets</button>
    <button class=" mr-5 p-2 bg-green-600" @click="addItem({name: 'cubeSmall',        x: randomXPos(), y: randomYPos()})">Add cube</button>
    <button class=" mr-5 p-2 bg-green-600" @click="addItem({name: 'wheel001',         x: randomXPos(), y: randomYPos()})">Add Wheel</button>
    <button class=" mr-5 p-2 bg-green-600" @click="animateAllSprites">Animate</button>
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
            @click="removeItem"
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

const colorRedTransparent03 = 'rgba(255,0,0,0.3)';
const colorRedTransparent02 = 'rgba(255,0,0,0.2)';

let currentStoreGroup = undefined;

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
    addItem(animationParam){
      store.addItem(animationParam);
      // this.reloadAllImages();
      // this.animateAllSprites();
      // TODO: start the animation after new item is added/mounted
    },

    removeItem(e){
      let itemIndex = e.target.parent.itemIid;
      e.target.parent.destroy();
      // store.removeItem(itemIndex);
      console.log('store.state', store.state);


    },




    showActionItems(rectangle) {
      rectangle.actionsAreVisible = true;
    },

    hideActionItems(rectangle) {
      rectangle.actionsAreVisible = false;
    },

    handleMouseOver(e) {
      currentStoreGroup = store.findItem(e.target.parent.attrs.name);
      //console.log('currentStoreGroup', currentStoreGroup)
      currentStoreGroup.sprite.fill = colorRedTransparent02;

      // TODO: be clear about node vs Vue Component vs store...
      // let node = this.$refs.group[e.target.parent.index].getNode();
      // console.log('.node', node.name() );


      this.showActionItems(currentStoreGroup);
    },

    handleMouseOut(e) {
      currentStoreGroup.sprite.fill = "transparent";
      this.hideActionItems(currentStoreGroup);
      currentStoreGroup = undefined;
    },

    handleDragStart(e) {

    },

    handleDragEnd(e) {

    },



    reverseIndexes() {
      store.state.rectangles.reverse();
      return;
    },

    randomXPos : function(){
      return Math.floor(Math.random() * (StageHeight - 1 + 1)) + 1;
    },

    randomYPos : function(){
      return Math.floor(Math.random() * (StageHeight - 1 + 1)) + 1;
    },

    animateAllSprites() {
      // animate sprite contained in items when they are added to the stage
      for (let i = 0; i < this.$refs.group.length; i++) {
        this.$refs.group[i].$children[0].getNode().start();
      }
    },

    reloadAllImages : function(){
      for (let i = 0; i < store.state.rectangles.length; i++) {
        store.state.rectangles[i].sprite.image = image;
      }
    }
  },

  beforeMount(){
    this.addItem({name: 'cubeBig',          x: this.randomXPos(), y: this.randomYPos()});
    this.addItem({name: 'cubeSmall',        x: this.randomXPos(), y: this.randomYPos()});
    this.addItem({name: 'sheetsSimpleJump', x: this.randomXPos(), y: this.randomYPos()});
    this.addItem({name: 'wheel001',         x: this.randomXPos(), y: this.randomYPos()});
  },

  mounted() {
    image.src = require(`@/assets/sprites/cric-test.png`);
    image.onload = () => {
      this.reloadAllImages();
      this.animateAllSprites();
    };
  },

  // TEST:
  updated: function() {
    console.log('updated')
    this.$refs.layer.getStage().batchDraw()
  },

  // TEST
  destroyed() {
    console.log('destroyed')
    var layer = this._stage.getLayer();
    this._stage.destroy();
    if (layer) {
      layer.batchDraw();
    }
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