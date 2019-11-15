<template>
  <div
    class="view fixed top-0 right-0 bottom-0 left-0 flex"
  >
    <div
      class="menu flex absolute w-1/3 top-0 bottom-0 z-10"
      :class="this.menuIsPushed ? 'menu--is-pushed' : ''"
    >
      <div class="bg-green-600 relative z-20">
        <button
          class="tabs__item"
          @click="toggleMenu"
        >
          Menu
        </button>
        <tabs
          v-if="menuIsOpen"
          :tabs="tabs"
          :currentTab="currentTab"
          :wrapper-class="'tabs'"
          :tab-class="'tabs__item'"
          :tab-active-class="'tabs__item_active'"
          :line-class="'tabs__active-line'"
          @onClick="handleTabClick"
        />
      </div>
      <div
        v-if="menuIsOpen"
        class="flex flex-col justify-between bg-green-400 relative z-10"

      >
        <div class="flex flex-col items-center overflow-scroll">

          <div v-if="currentTab === 'tab-buttons'" class="flex flex-col items-center w-full">
            <div
              draggable="true"
              @dragstart="btnDragStart"
              @dragend="btnDragEnd"
              class="inline-block mx-3"
            >
              <draggableButton
                title="bouton01"
                sprite="boutons"
                x="1"
                y="1"
                width="160"
                height="160"
              />
            </div>
            <div
              draggable="true"
              @dragstart="btnDragStart"
              @dragend="btnDragEnd"
              class="inline-block mx-3"
            >
              <draggableButton
                title="bouton02"
                sprite="boutons"
                x="-160"
                y="-320"
                width="120"
                height="80"
              />
            </div>
            <div
              draggable="true"
              @dragstart="btnDragStart"
              @dragend="btnDragEnd"
              class="inline-block mx-3"
            >
              <draggableButton
                title="bouton03"
                sprite="boutons"
                x="0"
                y="-480"
                width="120"
                height="100"
              />
            </div>
            <div
              draggable="true"
              @dragstart="btnDragStart"
              @dragend="btnDragEnd"
              class="inline-block mx-3"
            >
              <draggableButton
                title="bouton04"
                sprite="boutons"
                x="-240"
                y="-480"
                width="120"
                height="80"
              />
            </div>
            <div
              draggable="true"
              @dragstart="btnDragStart"
              @dragend="btnDragEnd"
              class="inline-block mx-3"
            >
              <draggableButton
                title="bouton05"
                sprite="boutons"
                x="-120"
                y="-580"
                width="160"
                height="120"
              />
            </div>
            <div
              draggable="true"
              @dragstart="btnDragStart"
              @dragend="btnDragEnd"
              class="inline-block mx-3"
            >
              <draggableButton
                title="bouton06"
                sprite="boutons"
                x="0"
                y="-700"
                width="120"
                height="80"
              />
            </div>
            <div
              draggable="true"
              @dragstart="btnDragStart"
              @dragend="btnDragEnd"
              class="inline-block mx-3"
            >
              <draggableButton
                title="bouton07"
                sprite="boutons"
                x="-240"
                y="-860"
                width="120"
                height="80"
              />
            </div>
          </div>
          <div v-if="currentTab === 'tab-sheets'" class="flex flex-col items-center w-full">
            <div
              draggable="true"
              @dragstart="btnDragStart"
              @dragend="btnDragEnd"
              class="inline-block mx-3"
            >
              <draggableButton
                title="sheetsSimpleJump"
                sprite="cric-test"
                x="-300"
                y="-250"
                width="130"
                height="160"
              />
            </div>
            <div
              draggable="true"
              @dragstart="btnDragStart"
              @dragend="btnDragEnd"
              class="inline-block mx-3"
            >
              <draggableButton
                title="cubeBig"
                sprite="cric-test"
                x="0"
                y="0"
                width="300"
                height="250"
              />
            </div>
            <div
              draggable="true"
              @dragstart="btnDragStart"
              @dragend="btnDragEnd"
              class="inline-block mx-3"
            >
              <draggableButton
                title="cubeSmall"
                sprite="cric-test"
                x="0"
                y="-250"
                width="150"
                height="130"
              />
            </div>
            <div
              draggable="true"
              @dragstart="btnDragStart"
              @dragend="btnDragEnd"
              class="inline-block mx-3"
            >
              <draggableButton
                title="wheel001"
                sprite="cric-test"
                x="0"
                y="-570"
                width="70"
                height="100"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col items-stretch bg-green-500 p-2">
          <button class=" mb-1 p-2 bg-yellow-600" @click="save">Save</button>
          <button class=" mb-1 p-2 bg-green-600" @click="load">Load</button>
        </div>
      </div>
    </div>
    <!--@mousedown="handleStageMouseDown"-->
    <div
      class="droptarget"
      @dragover.prevent
      @drop="dragDrop"
    >
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
const images = {};
      images.test = new window.Image();
      images.buttons = new window.Image();

import { store } from "../Store.js";
import Tabs from 'vue-tabs-with-active-line';
import DraggableButton from "@/components/DraggableButton.vue";


export default {
  components: {
    Tabs,
    DraggableButton
  },

  data() {
    return {
      stageSize: {
        width: StageWidth,
        height: StageHeight
      },
      menuIsOpen: true,
      menuIsPushed: false,
      tabs: [{
        title: 'Buttons',
        value: 'tab-buttons',
      }, {
        title: 'Sheets',
        value: 'tab-sheets',
      }],
      currentTab: 'tab-buttons',
      items: store.state.items
    };
  },

  methods: {

    toggleMenu () {
      this.menuIsOpen = !this.menuIsOpen
    },

    handleTabClick(newTab) {
      this.currentTab = newTab;
    },
    btnDragStart: function({ dataTransfer, offsetX = 0, offsetY = 0, target }) {
      dataTransfer.setData("offsetX", offsetX);
      dataTransfer.setData("offsetY", offsetY);
      dataTransfer.setData("title", target.firstElementChild.title);

      this.menuIsPushed = true
    },

    btnDragEnd: function() {
      this.menuIsPushed = false
    },

    dragDrop: function({ dataTransfer, x = 0, y = 0 }) {
      let xpos = x - dataTransfer.getData("offsetX");
      let ypos = y - dataTransfer.getData("offsetY");
      this.addItem({
        spriteName: dataTransfer.getData("title"),
        x: xpos,
        y: ypos
      });
      document.activeElement.blur(); // remove focused element
      this.menuIsPushed = false
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

    handleDragStart() {},

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
          store.state.items[i].sprite.image = images.buttons;
          break;
        case 'imageTest':
          store.state.items[i].sprite.image = images.test;
          break;
        }
      }
    },

    updateAnimations() {
      images.test.src = require(`@/assets/sprites/cric-test.png`);
      images.test.onload = () => {
        this.reloadAllImages();
        this.animateAllSprites();
      };
      images.buttons.src = require(`@/assets/sprites/texturePacker/boutons.png`);
      images.buttons.onload = () => {
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

.tabs {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  @apply bg-green-600;
}

.tabs__item {
  @apply cursor-pointer bg-green-500;
  height: 50px;
  width: 50px;
  font-size: 12px;
}

.tabs__item_active {
  @apply bg-green-400;
}

.tabs__item:hover {
  @apply bg-green-700;
}

.tabs__item:focus {
  @apply bg-green-800;
}


.tabs__active-line {
  display: none;
}

.menu {
  transition: transform 300ms ease-in-out;
  position: relative;
  left: 0;
}

.menu--is-pushed {
  transform: translateX(-100%);
}

</style>
