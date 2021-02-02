import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Board.scss';

export function Board({ size, onBoxHover }) {
  const [boxes, setBoxes] = useState([]);
  const [innerStyle, setInnerStyle] = useState({});

  useEffect(() => {
    const boxesArr = Array
      .from(Array(size * size).keys())
      .map(box => box + 1);
    setBoxes(boxesArr);

    if (size) {
      setInnerStyle({
        backgroundColor: 'black',
        paddingBottom: '0',
        gridTemplateColumns: `repeat(${size}, 1fr)`,
      });
    }
  }, [size]);

  return (
    <div
      className="Board"
      style={innerStyle}
    >
      {boxes.map(box => (
        <div
          key={box}
          className="Board__box"
          onMouseEnter={() => onBoxHover(box)}
        />
      ))}
    </div>
  );
}

Board.propTypes = {
  size: PropTypes.number.isRequired,
  onBoxHover: PropTypes.func.isRequired,
}
