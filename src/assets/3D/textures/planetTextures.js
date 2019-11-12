const mercuryTexture = require('./mercuryTexture.jpg');
// const mercuryBumpMap = require('./mercuryBumpMap.jpg');
const venusTexture = require('./venusTexture.jpg');
const earthTexture = require('./earthTexture.jpg');
// const earthNightTexture = require('./earthNightTexture.jpg');
// const earthBumpMap = require('./earthBumpMap.jpg');
const marsTexture = require('./marsTexture.jpg');
const marsBumpMap = require('./marsBumpMap.png');
const jupiterTexture = require('./jupiterTexture.jpg');
const saturnTexture = require('./saturnTexture.jpg');
const uranusTexture = require('./uranusTexture.jpg');
const neptuneTexture = require('./neptuneTexture.jpg');
// const plutoTexture = require('./plutoTexture.jpg');
// const plutoBumpMap = require('./plutoBumpMap.jpg');

const textures = {
  mercury: {
    texture: mercuryTexture,
    bumpMap: mercuryTexture
  },
  venus: {
    texture: venusTexture
  },
  earth: {
    texture: earthTexture,
    bumpMap: earthTexture
  },
  mars: {
    texture: marsTexture,
    bumpMap: marsBumpMap
  },
  jupiter: {
    texture: jupiterTexture,
    bumpMap: jupiterTexture
  },
  saturn: {
    texture: saturnTexture,
    bumpMap: saturnTexture
  },
  uranus: {
    texture: uranusTexture,
    bumpMap: uranusTexture
  },
  neptune: {
    texture: neptuneTexture,
    bumpMap: neptuneTexture
  }
  //   pluto: {
  //     texture: plutoTexture,
  //     bumpMap: plutoTexture
  //   }
};

export default textures;
