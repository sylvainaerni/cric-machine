
const spriteLibrary = {
  sheetsSimpleJump: {
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
    }
  },
  cubeBig: {
    image: null,
    width: 300,
    height: 250,
    fill: 'transparent',
    animation: 'vibrato',
    frameRate: 10,
    frameIndex: 0,
    animations: {
      vibrato: [
        // x, y, width, height (3 frames)
        0, 0, 300, 250,
        300, 0, 300, 250,
        600, 0, 300, 250]
    }
  },
  cubeSmall: {
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
        0, 250, 150, 130,
        150, 250, 150, 130
      ]
    }
  },
  wheel001: {
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
    }
  }
};

let itemId = 0;

export const store = {
  state: {
    items : []
  },

  addItem(param) {
    let newItem = {
      name: 'group-' + itemId,
      itemId: itemId,
      x: param.x,
      y: param.y,
      actionsAreVisible: false,
      sprite: spriteLibrary[param.name]
    }
    this.state.items.push(newItem);
    itemId++;
  },

  showActionItems(itemName) {
    const index = store.state.items.findIndex(x => x.name === itemName);
    if (index !== undefined) store.state.items[index].actionsAreVisible = true;
  },

  hideActionItems(itemName) {
    const index = store.state.items.findIndex(x => x.name === itemName);
    if (index !== undefined) store.state.items[index].actionsAreVisible = false;
  },

  removeItem(itemName) {
    const index = store.state.items.findIndex(x => x.name === itemName);
    if (index !== undefined) store.state.items.splice(index, 1);
  },


};