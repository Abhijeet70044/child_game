import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './StartButton.css';

function StartButton({ onStart }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.from(buttonRef.current, {
        scale: 2,
        rotation: 360,
        duration: 15,
        ease: 'elastic.out(1, 0.3)'
      });
    }
  }, []);

  return (
    <button ref={buttonRef} className="start-button" onClick={onStart}>
      Let's Play!
    </button>
  );
}

export default StartButton;

