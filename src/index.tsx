import './index.css';
import db from './db';
import Render from './render';
import Player from './player';

let time = Date.now();

const me = new Player(true);

const players = {
  [me.id]: me
};

db.ref('player').on('value', data => {
  if (data) {
    const val = data.val();

    Object.keys(val).forEach(key => {
      if (!players[key]) {
        players[key] = new Player(false, key);
      }

      if (!players[key].local) {
        players[key].update(val[key]);
      }
    });
  }
});

(function MainLoop() {
  const now = Date.now();
  const delta = now - time;

  requestAnimationFrame(MainLoop);

  // controls
  me.tick(delta);
  
  // render to scene
  Object.keys(players).forEach(key => {
    players[key].render(delta);
  });

  // Render to Screen.
  Render.tick(delta);

  time = now;
} ());


