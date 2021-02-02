import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { Board } from './components/Board';
import { Tracker } from './components/Tracker';
import { getModes } from './helpers/api';

import './App.scss';

export function App() {
  const APP_TITLE = 'Box Tracker - React App';
  const [modes, setModes] = useState([]);
  const [modesLoadingFailed, setModesLoadingFailed] = useState(false);
  const [activeMode, setActiveMode] = useState({});
  const [positionLog, setPositionLog] = useState([]);

  useEffect(() => {
    clearLog();
  }, [activeMode])

  const fetchModes = useCallback(async() => {
    try {
      const modes = await getModes();
      setModes(processModes(modes));
    } catch (error) {
      setModesLoadingFailed(true);
    }
  }, []);

  useEffect(() => {
    fetchModes();
  }, [fetchModes]);

  function processModes(modes) {
    return Object.keys(modes).map(key => (
      {
        name: key.replace('Mode', ''),
        size: modes[key].field,
      }
    ));
  }

  function addEntryToLog(boxNum) {
    const { size } = activeMode;
    const rowNum = Math.ceil(boxNum / size);
    const colNum = boxNum % size || size;

    setPositionLog(positionLog => ([
      `row: ${rowNum}, col: ${colNum}`,
      ...positionLog,
    ]));
  };

  function clearLog() {
    setPositionLog([]);
  }

  return (
    <div className="App">
      <div className="App__container">
        <Header appTitle={APP_TITLE} />

        <main className="App__main">
          <div className="App__content">
            {modesLoadingFailed && (
              <div className="App__loading-error">
                Failed loading modes from server
              </div>
            )}

            <div className="App__selector">
              <ModeSelector
                modes={modes}
                onModeSelection={setActiveMode}
              />
            </div>

            <Board
              size={activeMode.size || 0}
              onBoxHover={addEntryToLog}
            />
          </div>

          <div className="App__sidebar">
            <Tracker log={positionLog}/>
          </div>
        </main>
      </div>
    </div>
  );
}
