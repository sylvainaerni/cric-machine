<template>
  <div class="fixed top-0 right-0 bottom-0 left-0 flex">
    <div class="absolute top-0 left-0 bottom-0 z-10 flex flex-col justify-between bg-green-400">
      <div class="flex flex-col items-center overflow-scroll">
        <div draggable="true" @dragstart="btnDragStart">
          <draggableButton
            title="sheetsSimpleJump"
            x="-300" y="-250"
            width="130" height="160" />
        </div>
        <div draggable="true" @dragstart="btnDragStart">
          <draggableButton
            title="cubeBig"
            x="0" y="0"
            width="300" height="250" />
        </div>
        <div draggable="true" @dragstart="btnDragStart">
          <draggableButton
            title="cubeSmall"
            x="0" y="-250"
            width="150" height="130" />
        </div>
        <div draggable="true" @dragstart="btnDragStart">
          <draggableButton
            title="wheel001"
            x="0" y="-570"
            width="70" height="100" />
        </div>
      </div>
      <div class="flex flex-col items-stretch bg-green-500 p-2">
        <button class=" mb-1 p-2 bg-yellow-600" @click="animateAllSprites">Animate</button>
        <button class=" mb-1 p-2 bg-green-600" @click="save">Save</button>
        <button class=" mb-1 p-2 bg-green-600" @click="load">Load</button>
      </div>
    </div>
      <!--@mousedown="handleStageMouseDown"-->
    <div
      class="droptarget"
      @dragover.prevent
      @drop="dragDrop"
    >
      <v-stage
        ref="stage"
        :config="stageSize"
      >
        <v-layer ref="layer">

          <v-group
            v-for="item in items"
            @dragstart="handleDragStart"
            @dragend="handleDragEnd"
            :key="`group-${item.itemId}`"
            :name=item.name
            :itemId=item.itemId
            :x=item.x
            :y=item.y
            ref="group"
            type="group"
            draggable="true"
          >
            <v-rect
              :visible=item.actionsAreVisible
              :config="{
                x: 0,
                y: 0,
                width: item.sprite.width,
                height: item.sprite.height,
                fill: item.actionsAreVisible ? 'rgba(255,0,0,0.2)' : 'transparent'
              }"
            />
            <v-sprite
              @mouseover="handleMouseOver"
              @mouseout="handleMouseOut"
              :config="item.sprite"
              ref="sprite"
              type="sprite"
              :draggable=false
            />
            <v-rect
              :config="{
                x: item.sprite.width -60,
                y: -20,
                width: 20,
                height: 20,

              }"
            />
            <v-rect
              @click="pushItemUp"
              @mouseover="handleMouseOver"
              @mouseout="handleMouseOut"
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
              @click="pushItemDown"
              @mouseover="handleMouseOver"
              @mouseout="handleMouseOut"
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
  </div>
</template>

<script>

const StageWidth = window.innerWidth;
const StageHeight = window.innerHeight;
const image = new window.Image();


import { store } from "../Store.js";
import DraggableButton from "@/components/DraggableButton.vue";

export default {
  components: {
    DraggableButton
  },

  data() {
    return {
      stageSize: {
        width: StageWidth,
        height: StageHeight
      },
      sprite: {
        image: image
      },
      items: store.state.items
    };
  },

  methods: {
    btnDragStart: function(e) {
      console.log('START', e)
      this.draggedButton = e.target.children[0]
    },

    dragEnd: function(e) {

    },

    dragDrop: function(e) {
      let xpos= e.x - this.draggedButton.getAttribute('width')/2
      let ypos= e.y - this.draggedButton.getAttribute('height')/2
      this.addItem({spriteName: this.draggedButton.title, x: xpos, y: ypos})
      this.draggedButton = undefined
    },

    save(){
      store.save();
    },

    load(){
      store.load();
    },

    addItem(animationParam){
      store.addItem(animationParam);
    },

    removeItem(e){
      store.removeItem(e.target.parent.attrs.name);
    },

    pushItemUp(e){
      store.pushItemUp(e.target.parent.attrs.name);
    },

    pushItemDown(e){
      store.pushItemDown(e.target.parent.attrs.name);
    },

    handleMouseOver(e) {
      store.showActionItems(e.target.parent.attrs.name);
    },

    handleMouseOut(e) {
      store.hideActionItems(e.target.parent.attrs.name);
    },

    handleDragStart(e) {},

    handleDragEnd(e) {
      console.log('e.target.parent.attrs.name', e.target)
      store.setNewPos(e.target);
    },


    reverseIndexes() {
      // just a test
      store.state.items.reverse();
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
      console.log('animateAllSprites', this.$refs)
      if(!this.$refs.group) return;
      for (let i = 0; i < this.$refs.group.length; i++) {
        this.$refs.group[i].$children[1].getNode().start();
      }
    },

    reloadAllImages : function(){
      for (let i = 0; i < store.state.items.length; i++) {
        store.state.items[i].sprite.image = image;
      }
    }
  },

  beforeMount(){
    // at the moment, we must `addItem` here all the shapes manually,
    // otherwise it doen't draw when a new item is added.
    // TO DO: remove these four lines without breaking everything...

    this.addItem({spriteName: 'cubeBig',          x: -10000, y: 0});
    this.addItem({spriteName: 'cubeSmall',        x: -10000, y: 0});
    this.addItem({spriteName: 'sheetsSimpleJump', x: -10000, y: 0});
    this.addItem({spriteName: 'wheel001',         x: -10000, y: 0});

    // this.addItem({spriteName: 'cubeBig',          x: this.randomXPos(), y: this.randomYPos()});
    // this.addItem({spriteName: 'cubeSmall',        x: this.randomXPos(), y: this.randomYPos()});
    // this.addItem({spriteName: 'sheetsSimpleJump', x: this.randomXPos(), y: this.randomYPos()});
    // this.addItem({spriteName: 'wheel001',         x: this.randomXPos(), y: this.randomYPos()});
  },

  mounted() {
    image.src = require(`@/assets/sprites/cric-test.png`);
    image.onload = () => {
      this.reloadAllImages();
      this.animateAllSprites();
      console.log('IMAGE IS LOADED')
    };
  },

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