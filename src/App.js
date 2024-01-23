import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import useImage from 'use-image';
import StageViewer from "./components/stage"

function App() {
  return (
    <div className="App">
      <StageViewer />
    </div>
  );
}

export default App;
