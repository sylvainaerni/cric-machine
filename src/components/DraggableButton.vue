<template>
  <button
    :style="computedStyles"
    :title=this.title
    :width=this.width
    :height=this.height
    class="draggable"
 />
</template>

<script>
export default {
  name: 'DraggableButton',

  props: {
    title: {
      type: String,
      required: true
    },

    x: {
      type: String,
      required: true
    },

    y: {
      type: String,
      required: true
    },

    width: {
      type: String,
      required: true
    },

    height: {
      type: String,
      required: true
    }
  },

  computed: {
    computedStyles() {
      return {
        'background-position': this.x + 'px ' +this.y + 'px',
        'width': this.width + 'px',
        'height': this.height + 'px'
      }
    }
  }
}
</script>


<style lang="css">
  .draggable {
    cursor: grab;
    cursor: grabbing;
    background-color: transparent;
    background-image: url("./../assets/sprites/cric-test.png");
  }

  .draggable:focus {
    outline: none;
    opacity: 0.6;
  }

</style>