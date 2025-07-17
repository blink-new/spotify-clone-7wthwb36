import React from 'react';
import { BackgroundWallpaper } from './components/BackgroundWallpaper';
import { SpotifyLayout } from './components/SpotifyLayout';
import { MusicProvider } from './contexts/MusicContext';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <BackgroundWallpaper>
          <SpotifyLayout />
        </BackgroundWallpaper>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;