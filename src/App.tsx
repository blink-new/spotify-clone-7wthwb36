import React from 'react';
import { BackgroundWallpaper } from './components/BackgroundWallpaper';
import { SpotifyLayout } from './components/SpotifyLayout';
import { MusicProvider } from './contexts/MusicContext';
import './App.css';

function App() {
  return (
    <MusicProvider>
      <BackgroundWallpaper>
        <SpotifyLayout />
      </BackgroundWallpaper>
    </MusicProvider>
  );
}

export default App;