import React, { useEffect, useRef, useState } from "react";
import "./AnimatedCharacter.css";

const AnimatedCharacter = ({ showPassword }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = (eyeCenter, maxDistance = 5) => {
    let dx = mousePos.x - eyeCenter.x;
    let dy = mousePos.y - eyeCenter.y;

    // If showPassword is true, make characters look away from the signup form (to the left)
    if (showPassword) {
      dx = -Math.abs(dx); // Force looking left
    }

    const distance = Math.sqrt(dx * dx + dy * dy);
    const factor = Math.min(distance, maxDistance) / maxDistance;
    const moveX = dx * factor * 0.3;
    const moveY = dy * factor * 0.3;

    return {
      x: eyeCenter.x + Math.max(-2, Math.min(2, moveX)),
      y: eyeCenter.y + Math.max(-2, Math.min(2, moveY)),
    };
  };

  // Orange character eyes
  const orangeLeftPupil = calculatePupilPosition({ x: 109, y: 58.5 });
  const orangeRightPupil = calculatePupilPosition({ x: 151, y: 58.5 });

  // Purple character eyes
  const purpleLeftPupil = calculatePupilPosition({ x: 35, y: 12 });
  const purpleRightPupil = calculatePupilPosition({ x: 85, y: 12 });

  // Black character eyes
  const blackLeftPupil = calculatePupilPosition({ x: 25, y: 25 });
  const blackRightPupil = calculatePupilPosition({ x: 75, y: 25 });

  // Yellow character eye
  const yellowPupil = calculatePupilPosition({ x: 25, y: 35 });

  return (
    <div className="character-group" ref={containerRef}>
      <div className="character orange">
        <div className="face">
          <div className="eye left">
            <div
              className="pupil"
              style={{
                transform: `translate(${orangeLeftPupil.x - 109}px, ${orangeLeftPupil.y - 58.5}px)`,
                transition: "transform 0.1s ease",
              }}
            ></div>
          </div>
          <div className="eye right">
            <div
              className="pupil"
              style={{
                transform: `translate(${orangeRightPupil.x - 151}px, ${orangeRightPupil.y - 58.5}px)`,
                transition: "transform 0.1s ease",
              }}
            ></div>
          </div>
          <div className="mouth"></div>
        </div>
      </div>

      <div className="character purple">
        <div className="eyes">
          <div className="eye small left">
            <div
              className="pupil"
              style={{
                transform: `translate(${purpleLeftPupil.x - 35}px, ${purpleLeftPupil.y - 12}px)`,
                transition: "transform 0.1s ease",
              }}
            ></div>
          </div>
          <div className="eye small right">
            <div
              className="pupil"
              style={{
                transform: `translate(${purpleRightPupil.x - 85}px, ${purpleRightPupil.y - 12}px)`,
                transition: "transform 0.1s ease",
              }}
            ></div>
          </div>
        </div>
        <div className="nose"></div>
      </div>

      <div className="character black">
        <div className="eye left">
          <div
            className="pupil"
            style={{
              transform: `translate(${blackLeftPupil.x - 25}px, ${blackLeftPupil.y - 25}px)`,
              transition: "transform 0.1s ease",
            }}
          ></div>
        </div>
        <div className="eye right">
          <div
            className="pupil"
            style={{
              transform: `translate(${blackRightPupil.x - 75}px, ${blackRightPupil.y - 25}px)`,
              transition: "transform 0.1s ease",
            }}
          ></div>
        </div>
      </div>

      <div className="character yellow">
        <div className="eye">
          <div
            className="pupil"
            style={{
              transform: `translate(${yellowPupil.x - 25}px, ${yellowPupil.y - 35}px)`,
              transition: "transform 0.1s ease",
            }}
          ></div>
        </div>
        <div className="beak"></div>
      </div>
    </div>
  );
};

export default AnimatedCharacter;
