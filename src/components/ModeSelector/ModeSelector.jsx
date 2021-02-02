import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ModeSelector.scss';

export function ModeSelector({ modes, onModeSelection }) {
  const [selectedMode, setSelectedMode] = useState('');
  
  function submitMode(event) {
    event.preventDefault();
    onModeSelection(modes.find(mode => mode.name === selectedMode));
  }

  return (
    <form
      action="#"
      method="POST"
      className="ModeSelector"
      onSubmit={submitMode}
    >
      <select
        name="mode"
        id="mode"
        className="ModeSelector__select"
        value={selectedMode}
        onChange={({ target }) => setSelectedMode(target.value)}
        required
      >
        <option value="">
          Select mode
        </option>
        {modes.map(mode => (
          <option value={mode.name} key={mode.size}>
            {`${mode.name} mode: ${mode.size}`}
          </option>
        ))}
      </select>
      
      <button
        type="submit"
        className="ModeSelector__button"
      >
        Start
      </button>
    </form>
  );
}

ModeSelector.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  })).isRequired,
  onModeSelection: PropTypes.func.isRequired,
};
