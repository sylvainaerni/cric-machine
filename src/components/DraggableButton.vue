<template>
  <button
    :style="computedStyles"
    :title="this.title"
    :sprite="this.sprite"
    :width="this.width"
    :height="this.height"
    class="draggable cursor-grab cursor-grabbing bg-transparent focus:outline-none focus:opacity-50"
  />
</template>

<script>
export default {
  name: "DraggableButton",

  props: {
    title: {
      type: String,
      required: true
    },

    sprite: {
      type: String,
      required: true
    },

    x: {
      type: String,
      default: "0",
      required: true
    },

    y: {
      type: String,
      default: "0",
      required: true
    },

    width: {
      type: String,
      default: "0",
      required: true
    },

    height: {
      type: String,
      default: "0",
      required: true
    }
  },

  computed: {
    computedStyles() {
      return {
        "background-position": this.x + "px " + this.y + "px",
        "background-image": "url('" + require(`@/assets/sprites/${this.sprite}.png`) ,
        width: this.width + "px",
        height: this.height + "px"
      };
    }
  }
};
</script>

<style lang="css">

</style>
