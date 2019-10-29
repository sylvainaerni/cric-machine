
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
    console.log('ADD ITEM param')
    let newItem = {
      name: 'group-' + itemId,
      itemId: itemId,
      x: param.x,
      y: param.y,
      actionsAreVisible: false,
      spriteName: param.spriteName,
      sprite: spriteLibrary[param.spriteName]
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

  setNewPos(itemGroup) {
    const index = store.state.items.findIndex(x => x.name === itemGroup.attrs.name);
    store.state.items[index].x = itemGroup.attrs.x;
    store.state.items[index].y = itemGroup.attrs.y;
  },

  removeItem(itemName) {
    const index = store.state.items.findIndex(x => x.name === itemName);
    if (index !== undefined) store.state.items.splice(index, 1);
  },

  pushItemUp(itemName) {
    const index = store.state.items.findIndex(x => x.name === itemName);
    console.log('push the item up here', index)
    if (index < store.state.items.length - 1)
      this.moveItem(store.state.items, index, index + 1)
  },

  pushItemDown(itemName) {
    const index = store.state.items.findIndex(x => x.name === itemName);
    console.log('push the item down here', index)
    if (index > 0)
      this.moveItem(store.state.items, index, index - 1);
  },

  moveItem(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  },

  removeAllItems() {
    store.state.items.splice(0, store.state.items.length);
  },

  load() {
    this.removeAllItems();
    const data = localStorage.getItem('storage') || '[]';
    let fetchedArray = JSON.parse(data);
    for (let i = 0; i < fetchedArray.length; i++) {
      store.addItem(fetchedArray[i]);
    }
  },

  save() {
    let storedArray = [];
    for (let i = 0; i < this.state.items.length; i++) {
      storedArray[i] = {};
      storedArray[i].spriteName = this.state.items[i].spriteName;
      storedArray[i].x = this.state.items[i].x;
      storedArray[i].y = this.state.items[i].y;
    }
    console.log('SAVE storedArray', storedArray);
    localStorage.setItem('storage', JSON.stringify(storedArray));
  }

};
