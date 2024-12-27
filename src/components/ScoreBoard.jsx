import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ScoreBoard.css';

function ScoreBoard({ score, lives }) {
  const scoreRef = useRef(null);

  useEffect(() => {
    if (scoreRef.current) {
      gsap.from(scoreRef.current, {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [score]);

  return (
    <div className="score-board">
      <div className="lives">
        {[...Array(3)].map((_, index) => (
          <span key={index} className={index < lives ? 'heart active' : 'heart'}>
            ❤️
          </span>
        ))}
      </div>
      <h3>Score:</h3>
      <div ref={scoreRef} className="score">{score}</div>
    </div>
  );
}

export default ScoreBoard;

