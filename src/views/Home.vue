<template>
  <div class="fixed top-0 right-0 bottom-0 left-0 flex">
    <div
      class="absolute top-0 left-0 bottom-0 z-10 flex flex-col justify-between bg-green-400"
    >
      <div class="flex flex-col items-center overflow-scroll">
        <div draggable="true" @dragstart="btnDragStart" class="mx-3">
          <draggableButton
            title="bouton7"
            x="-300"
            y="-250"
            width="130"
            height="160"
          />
        </div>
        <div draggable="true" @dragstart="btnDragStart" class="mx-3">
          <draggableButton
            title="bouton6"
            x="-300"
            y="-250"
            width="130"
            height="160"
          />
        </div>
        <div draggable="true" @dragstart="btnDragStart" class="mx-3">
          <draggableButton
            title="sheetsSimpleJump"
            x="-300"
            y="-250"
            width="130"
            height="160"
          />
        </div>
        <div draggable="true" @dragstart="btnDragStart" class="mx-3">
          <draggableButton
            title="cubeBig"
            x="0"
            y="0"
            width="300"
            height="250"
          />
        </div>
        <div draggable="true" @dragstart="btnDragStart" class="mx-3">
          <draggableButton
            title="cubeSmall"
            x="0"
            y="-250"
            width="150"
            height="130"
          />
        </div>
        <div draggable="true" @dragstart="btnDragStart" class="mx-3">
          <draggableButton
            title="wheel001"
            x="0"
            y="-570"
            width="70"
            height="100"
          />
        </div>
      </div>
      <div class="flex flex-col items-stretch bg-green-500 p-2">
        <button class=" mb-1 p-2 bg-yellow-600" @click="updateAnimations">Update animations</button>
        <button class=" mb-1 p-2 bg-yellow-600" @click="animateAllSprites">Animate</button>
        <button class=" mb-1 p-2 bg-green-600" @click="save">Save</button>
        <button class=" mb-1 p-2 bg-green-600" @click="load">Load</button>
      </div>
    </div>
    <!--@mousedown="handleStageMouseDown"-->
    <div class="droptarget" @dragover.prevent @drop="dragDrop">
      <v-stage ref="stage" :config="stageSize">
        <v-layer ref="layer">
          <v-group
            v-for="item in items"
            @dragstart="handleDragStart"
            @dragend="handleDragEnd"
            :key="`group-${item.itemId}`"
            :name="item.name"
            :itemId="item.itemId"
            :x="item.x"
            :y="item.y"
            ref="group"
            type="group"
            draggable="true"
          >
            <v-rect
              :visible="item.actionsAreVisible"
              :config="{
                x: 0,
                y: 0,
                width: item.sprite.width,
                height: item.sprite.height,
                fill: item.actionsAreVisible
                  ? 'rgba(255,0,0,0.2)'
                  : 'transparent'
              }"
            />
            <v-sprite
              @mouseover="handleMouseOver"
              @mouseout="handleMouseOut"
              :config="item.sprite"
              ref="sprite"
              type="sprite"
              :draggable="false"
            />
            <v-rect
              :config="{
                x: item.sprite.width - 60,
                y: -20,
                width: 20,
                height: 20
              }"
            />

            <v-group
              @click="pushItemUp"
              @mouseover="handleMouseOver"
              @mouseout="handleMouseOut"
              :visible="item.actionsAreVisible"
              :config="{
                x: item.sprite.width - 60,
                y: -20,
                width: 20,
                height: 20
              }"
            >
              <v-rect :config="{
                  width: 20,
                  height: 20,
                  fill: '#11cc11'
                }"
              />
              <v-line :config="{
                x: 3,
                y: 6,
                points: [0, 6, 6, 0, 12, 6],
                tension: 0,
                closed: true,
                fill: 'white'
              }"/>
            </v-group>
            <v-group
              @click="pushItemDown"
              @mouseover="handleMouseOver"
              @mouseout="handleMouseOut"
              :visible="item.actionsAreVisible"
              :config="{
                x: item.sprite.width - 40,
                y: -20,
                width: 20,
                height: 20,
              }"
            >
              <v-rect
                :config="{
                  width: 20,
                  height: 20,
                  fill: 'orange'
                }"
              />
              <v-line :config="{
                x: 3,
                y: 6,
                points: [0, 0, 6, 7, 12, 0],
                tension: 0,
                closed: true,
                fill: 'white'
              }"/>
            </v-group>

            <v-group
              @click="removeItem"
                @mouseover="handleMouseOver"
                @mouseout="handleMouseOut"
                :visible="item.actionsAreVisible"
                :config="{
                  x: item.sprite.width - 20,
                  y: -20
                }"
              >
              <v-rect
                :config="{
                  width: 20,
                  height: 20,
                  fill: 'red'
                }"
              />
              <v-rect
                :config="{
                  x: 3,
                  y:6,
                  rotation:-45,
                  width: 3,
                  height: 15,
                  fill: 'white'
                }"
              />
              <v-rect
                :config="{
                  x: 14,
                  y:4,
                  rotation:45,
                  width: 3,
                  height: 15,
                  fill: 'white'
                }"
              />
            </v-group>
          </v-group>
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<script>
const StageWidth = window.innerWidth;
const StageHeight = window.innerHeight;
const imageTest = new window.Image();
const imageButtons = new window.Image();

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
      items: store.state.items
    };
  },

  methods: {
    btnDragStart: function({ dataTransfer, offsetX = 0, offsetY = 0, target }) {
      dataTransfer.setData("offsetX", offsetX);
      dataTransfer.setData("offsetY", offsetY);
      dataTransfer.setData("title", target.firstElementChild.title);
    },

    dragEnd: function() {},

    dragDrop: function({ dataTransfer, x = 0, y = 0 }) {
      let xpos = x - dataTransfer.getData("offsetX");
      let ypos = y - dataTransfer.getData("offsetY");
      this.addItem({
        spriteName: dataTransfer.getData("title"),
        x: xpos,
        y: ypos
      });
      document.activeElement.blur(); // remove focused element
    },

    save() {
      store.save();
    },

    load() {
      store.load();
      this.updateAnimations();
    },

    addItem(animationParam) {
      store.addItem(animationParam);
      this.updateAnimations();
    },

    removeItem(e) {
      store.removeItem(e.target.parent.parent.attrs.name);
    },

    pushItemUp(e) {
      store.pushItemUp(e.target.parent.parent.attrs.name);
    },

    pushItemDown(e) {
      store.pushItemDown(e.target.parent.parent.attrs.name);
    },

    findEventParentName(e){
      return e.target.parent.attrs.name ? e.target.parent.attrs.name : e.target.parent.parent.attrs.name
    },

    handleMouseOver(e) {
      let name = this.findEventParentName(e);
      store.showActionItems(name);
    },

    handleMouseOut(e) {
      let name = this.findEventParentName(e);
      store.hideActionItems(name);
    },

    handleDragStart(e) {},

    handleDragEnd(e) {
      store.setNewPos(e.target);
    },

    randomXPos: function() {
      return Math.floor(Math.random() * (StageHeight - 1 + 1)) + 1;
    },

    randomYPos: function() {
      return Math.floor(Math.random() * (StageHeight - 1 + 1)) + 1;
    },

    animateAllSprites() {
      if (!this.$refs.group) return;
      for (let i = 0; i < this.$refs.group.length; i++) {
        this.$refs.group[i].$children[1].getNode().start();
      }
    },

    reloadAllImages: function() {
      for (let i = 0; i < store.state.items.length; i++) {
        switch(store.state.items[i].sprite.imageName) {
        case 'imageButtons':
          store.state.items[i].sprite.image = imageButtons;
          break;
        case 'imageTest':
          store.state.items[i].sprite.image = imageTest;
          break;
        }
      }
    },

    updateAnimations() {
      imageTest.src = require(`@/assets/sprites/cric-test.png`);
      imageTest.onload = () => {
        this.reloadAllImages();
        this.animateAllSprites();
      };
      imageButtons.src = require(`@/assets/sprites/buttons-test.png`);
      imageButtons.onload = () => {
        this.reloadAllImages();
        this.animateAllSprites();
      };
    }
  },

  beforeMount() {},

  mounted() {
    this.updateAnimations();
  }
};
</script>

<style lang="postcss">
body {
  @apply bg-sylvainFancyBrown;
  background-image: url("https://www.transparenttextures.com/patterns/black-paper.png");
}
/* .actions {
  @apply absolute p-2 bg-gray-500;

  &:hover {
    @apply bg-white text-red-300;
  }
} */
</style>
