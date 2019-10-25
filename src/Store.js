
const library = {
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

export const store = {
  state: {
    rectangles : [
      {
        x: 50,
        y: 200,
        name: 'group-0',
        actionsAreVisible: false,
        sprite: library.cubeBig
      },
      {
        x: 400,
        y: 200,
        name: 'group-1',
        actionsAreVisible: false,
        sprite: library.cubeSmall
      },
      {
        x: 600,
        y: 200,
        name: 'group-2',
        actionsAreVisible: false,
        sprite: library.sheetsSimpleJump
      },
      {
        x: 800,
        y: 200,
        name: 'group-3',
        actionsAreVisible: false,
        sprite: library.wheel001
      }
    ]
  },

  addItem() {
    let nameIndex = 'group-' + this.state.rectangles.length;
    let newItem = {
      x: 600,
      y: 200,
      name: nameIndex,
      actionsAreVisible: false,
      sprite: library.sheetsSimpleJump
    }

    this.state.rectangles.push(newItem);
  }
};