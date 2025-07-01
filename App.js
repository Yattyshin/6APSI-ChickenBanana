import React, { useState } from 'react';
import './App.css';

const chickenUrl =
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg';
const bananaUrl =
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768';
const hiddenUrl =
  'https://cdn-icons-png.flaticon.com/512/565/565547.png'; // hidden tile

const generateTiles = (count = 36) => {
  const tiles = [];
  for (let i = 0; i < count; i++) {
    const type = Math.random() < 0.5 ? 'banana' : 'chicken';
    tiles.push({ id: i, type, clicked: false });
  }
  return tiles;
};

function App() {
  const [tiles, setTiles] = useState([]);
  const [player, setPlayer] = useState('');
  const [status, setStatus] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [hasChosen, setHasChosen] = useState(false);

  const handleClick = (id) => {
    if (gameOver) return;

    setTiles((prevTiles) =>
      prevTiles.map((tile) => {
        if (tile.id === id && !tile.clicked) {
          const isCorrect = tile.type === player;
          const updated = [...prevTiles];
          updated[id].clicked = true;

          if (!isCorrect) {
            setStatus('❌ Wrong tile! You lose!');
            setGameOver(true);
          } else {
            setScore(score + 1);
            const remaining = updated.filter(
              (t) => t.type === player && !t.clicked
            );
            if (remaining.length === 0) {
              setStatus('✅ You win! All correct tiles found!');
              setGameOver(true);
            }
          }

          return { ...tile, clicked: true };
        }
        return tile;
      })
    );
  };

  const handleRestart = () => {
  setTiles([]);
  setStatus('');
  setGameOver(false);
  setScore(0);
  setPlayer('');
  setHasChosen(false); 
  };


  const handleStartGame = (choice) => {
    setPlayer(choice);
    setTiles(generateTiles());
    setHasChosen(true);
  };

  return (
    <div className="game-background">
      <div className="container">
        {!hasChosen ? (
          <>
            <h1>🐔🍌 Chicken Banana Game 🍌🐔</h1>
            <h2>Select Your Side</h2>
            <div className="choice-buttons">
              <button onClick={() => handleStartGame('chicken')}>
                🐔 Play as Chicken
              </button>
              <button onClick={() => handleStartGame('banana')}>
                🍌 Play as Banana
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>🐔🍌 Chicken Banana Game 🍌🐔</h1>
            <div className="top-bar">
              <div>Role: {player}</div>
              <div className="score">Score: {score}</div>
            </div>

            <div className="grid-6x6">
              {tiles.map((tile) => (
                <div
                  key={tile.id}
                  className={`flip-card ${tile.clicked ? 'flipped' : ''}`}
                  onClick={() => handleClick(tile.id)}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <div className="square number-tile">
                       {tile.id + 1}
                      </div>
                    </div>
                    <div className="flip-card-back">
                      <img
                        src={tile.type === 'banana' ? bananaUrl : chickenUrl}
                        alt={tile.type}
                        className="square"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2>{status}</h2>
            <button onClick={handleRestart}>Restart Game</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
