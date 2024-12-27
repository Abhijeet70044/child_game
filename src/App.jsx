import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import StartButton from './components/StartButton';
import FruitBasket from './components/FruitBasket';
import ScoreBoard from './components/ScoreBoard';
import ResetButton from './components/ResetButton';
import './App.css';

gsap.registerPlugin(Draggable);

const fruits = [
  { name: 'Apple', image: '/Assets/apple.png' },
  { name: 'Banana', image: '/Assets/banana.png' },
  { name: 'Orange', image: '/Assets/orange.png' },
  { name: 'Grapes', image: '/Assets/grapes.png' },
  { name: 'Strawberry', image: '/Assets/strawberry.png' },
  { name: 'Guava', image: '/Assets/guava.png' },
  { name: 'Pineapple', image: '/Assets/pineapple.png' },
  { name: 'Mango', image: '/Assets/mango.png' },
];

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentFruit, setCurrentFruit] = useState(null);
  const [lives, setLives] = useState(3);
  const gameRef = useRef(null);
  const cartRef = useRef(null);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLives(3);
    pickRandomFruit();
  };

  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setCurrentFruit(null);
    setLives(3);
  };

  const pickRandomFruit = () => {
    const randomIndex = Math.floor(Math.random() * fruits.length);
    setCurrentFruit(fruits[randomIndex]);
  };

  const handleDrop = (fruitName) => {
    if (fruitName === currentFruit?.name) {
      setScore(prevScore => prevScore + 1);
      playSound('/Assets/right.wav');
      showConfetti();
    } else {
      playSound('/Assets/wrong.wav');
      setLives(prevLives => prevLives - 1);
      if (lives === 1) {
        setGameStarted(false);
        return;
      }
    }
    pickRandomFruit();
  };

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const showConfetti = () => {
    if (gameRef.current) {
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        gameRef.current.appendChild(confetti);

        gsap.to(confetti, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          rotation: gsap.utils.random(0, 360),
          duration: 1,
          ease: 'power2.out',
          onComplete: () => {
            if (gameRef.current) gameRef.current.removeChild(confetti);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (gameStarted && gameRef.current && cartRef.current) {
      Draggable.create('.fruit', {
        type: 'x,y',
        edgeResistance: 0.65,
        bounds: gameRef.current,
        onDragEnd: function() {
          const fruitName = this.target.getAttribute('data-fruit');
          const fruitRect = this.target.getBoundingClientRect();
          const cartRect = cartRef.current.getBoundingClientRect();

          if (
            fruitRect.left < cartRect.right &&
            fruitRect.right > cartRect.left &&
            fruitRect.top < cartRect.bottom &&
            fruitRect.bottom > cartRect.top
          ) {
            handleDrop(fruitName);
          }

          gsap.to(this.target, { x: 0, y: 0, duration: 0.3 });
        }
      });
    }
  }, [gameStarted, currentFruit]);

  return (
    <div className="game-container" ref={gameRef}>
      <div className="animated-bg">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
      </div>
      {!gameStarted ? (
        <StartButton onStart={startGame} />
      ) : (
        <>
          <ScoreBoard score={score} lives={lives} />
          <div className="fruit-container">
            {fruits.map((fruit) => (
              <div
                key={fruit.name}
                className="fruit"
                data-fruit={fruit.name}
              >
                <img src={fruit.image} alt={fruit.name} />
              </div>
            ))}
          </div>
          <FruitBasket currentFruit={currentFruit} ref={cartRef} />
          <ResetButton onReset={resetGame} />
        </>
      )}
    </div>
  );
}

export default App;


