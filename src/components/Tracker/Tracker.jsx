import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './Tracker.scss';

export function Tracker({ log }) {
  return (
    <div className="Tracker">
      <h2 className="Tracker__title">
        History
      </h2>
      <div className="Tracker__log">
        {log.map(entry => (
          <p
            key={uuidv4()}
            className="Tracker__entry"
          >
            {entry}
          </p>
        ))}
      </div>
    </div>
  );
}

Tracker.propTypes = {
  log: PropTypes.arrayOf(PropTypes.string).isRequired,
};
