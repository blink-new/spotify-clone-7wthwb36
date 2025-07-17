import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Home, 
  Search, 
  Library, 
  Plus, 
  Heart, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Shuffle,
  Repeat,
  Mic2,
  ListMusic,
  Monitor,
  MoreHorizontal
} from 'lucide-react';
import { Slider } from './ui/slider';
import { HomePage } from './HomePage';
import { useMusicContext } from '../contexts/MusicContext';
import { getArtistById, getAlbumById, formatDuration } from '../data/musicDatabase';
import { cn } from '../lib/utils';

export const SpotifyLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'library'>('home');
  
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    pauseSong,
    resumeSong,
    nextSong,
    previousSong,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    likedSongs,
    toggleLikeSong
  } = useMusicContext();

  const sidebarItems = [
    { icon: Home, label: 'Home', key: 'home' as const },
    { icon: Search, label: 'Search', key: 'search' as const },
    { icon: Library, label: 'Your Library', key: 'library' as const },
  ];

  const playlists = [
    'Liked Songs',
    'My Playlist #1',
    'Discover Weekly',
    'Release Radar',
    'Daily Mix 1',
    'Daily Mix 2'
  ];

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  const handleProgressChange = (value: number[]) => {
    seekTo(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  const currentArtist = currentSong ? getArtistById(currentSong.artistId) : null;
  const currentAlbum = currentSong ? getAlbumById(currentSong.albumId) : null;
  const isCurrentSongLiked = currentSong ? likedSongs.has(currentSong.id) : false;

  const getRepeatIcon = () => {
    if (repeatMode === 'one') {
      return <div className="relative"><Repeat className="h-4 w-4" /><span className="absolute -top-1 -right-1 text-xs">1</span></div>;
    }
    return <Repeat className="h-4 w-4" />;
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'search':
        return (
          <div className="flex-1 bg-gradient-to-b from-white/10 to-black/20 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
            <p className="text-gray-400">Search functionality coming soon...</p>
          </div>
        );
      case 'library':
        return (
          <div className="flex-1 bg-gradient-to-b from-white/10 to-black/20 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Your Library</h1>
            <p className="text-gray-400">Library functionality coming soon...</p>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Main Layout */}
      <div className="flex flex-1 gap-2 p-2">
        {/* Left Sidebar */}
        <div className="w-64 bg-black/60 backdrop-blur-md rounded-lg flex flex-col">
          {/* Navigation */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl">Spotify</span>
            </div>
            
            <nav className="space-y-4">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setCurrentView(item.key)}
                  className={cn(
                    "flex items-center gap-4 w-full p-2 rounded-md transition-colors",
                    currentView === item.key 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Library Section */}
          <div className="flex-1 px-6 pb-6">
            <div className="flex items-center justify-between mb-4">
              <button 
                className="flex items-center gap-2 text-gray-400 hover:text-white"
                onClick={() => setCurrentView('library')}
              >
                <Library className="h-6 w-6" />
                <span className="font-medium">Your Library</span>
              </button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {playlists.map((playlist) => (
                <button
                  key={playlist}
                  className="block w-full text-left p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                >
                  {playlist}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-black/40 backdrop-blur-md rounded-lg overflow-hidden">
          {/* Top Bar */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="sm" className="rounded-full bg-black/40">
                ←
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full bg-black/40">
                →
              </Button>
            </div>

            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="What do you want to listen to?"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </div>

      {/* Bottom Player */}
      <div className="h-24 bg-black/80 backdrop-blur-md border-t border-white/10 px-4 flex items-center justify-between">
        {/* Current Track Info */}
        <div className="flex items-center gap-4 w-1/3">
          {currentSong && currentAlbum ? (
            <>
              <img
                src={currentAlbum.coverUrl}
                alt={currentAlbum.title}
                className="w-14 h-14 rounded-md object-cover"
              />
              <div className="min-w-0">
                <h4 className="text-white font-medium truncate">{currentSong.title}</h4>
                <p className="text-gray-400 text-sm truncate">{currentArtist?.name}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "text-gray-400 hover:text-white",
                  isCurrentSongLiked && "text-green-500"
                )}
                onClick={() => toggleLikeSong(currentSong.id)}
              >
                <Heart className={cn("h-4 w-4", isCurrentSongLiked && "fill-current")} />
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-800 rounded-md"></div>
              <div>
                <h4 className="text-gray-400 font-medium">No song playing</h4>
                <p className="text-gray-500 text-sm">Select a song to play</p>
              </div>
            </div>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 w-1/3">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "text-gray-400 hover:text-white",
                isShuffled && "text-green-500"
              )}
              onClick={toggleShuffle}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-gray-300"
              onClick={previousSong}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              onClick={handlePlayPause}
              disabled={!currentSong}
              className="bg-white hover:bg-gray-200 text-black rounded-full w-8 h-8 p-0 disabled:bg-gray-600 disabled:text-gray-400"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-gray-300"
              onClick={nextSong}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "text-gray-400 hover:text-white",
                repeatMode !== 'off' && "text-green-500"
              )}
              onClick={toggleRepeat}
            >
              {getRepeatIcon()}
            </Button>
          </div>
          
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatDuration(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="flex-1"
              onValueChange={handleProgressChange}
            />
            <span className="text-xs text-gray-400 w-10">
              {formatDuration(duration)}
            </span>
          </div>
        </div>

        {/* Volume and Controls */}
        <div className="flex items-center gap-2 w-1/3 justify-end">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Mic2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ListMusic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Monitor className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={toggleMute}
            >
              <Volume2 className={cn("h-4 w-4", isMuted && "text-red-500")} />
            </Button>
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={handleVolumeChange}
            />
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};