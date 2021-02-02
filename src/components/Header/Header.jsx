import React from 'react';
import './Header.scss';

export function Header({ appTitle }) {
  return (
    <header className="Header">
      <h1 className="Header__title">
        {appTitle}
      </h1>
    </header>
  );
}