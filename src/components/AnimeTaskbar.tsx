import React, { useState } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  VolumeX,
  Heart,
  Shuffle,
  Repeat,
  Mic2,
  ListMusic,
  MoreHorizontal,
  Music
} from 'lucide-react';
import { useMusicContext } from '../hooks/useMusicContext';
import { getArtistById, getAlbumById, formatDuration } from '../data/musicDatabase';
import { cn } from '../lib/utils';

interface AnimeTaskbarProps {
  onLyricsToggle?: () => void;
  showLyrics?: boolean;
}

export const AnimeTaskbar: React.FC<AnimeTaskbarProps> = ({ 
  onLyricsToggle, 
  showLyrics = false 
}) => {
  const [showQueue, setShowQueue] = useState(false);
  
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
      return (
        <div className="relative">
          <Repeat className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 text-xs font-bold bg-[#1DB954] text-black rounded-full w-3 h-3 flex items-center justify-center">
            1
          </span>
        </div>
      );
    }
    return <Repeat className="h-4 w-4" />;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Anime-styled gradient background with glow effect */}
      <div className="relative bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-pink-900/95 backdrop-blur-xl border-t border-white/20">
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 animate-pulse"></div>
        
        {/* Neon border effect */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
        
        <div className="relative px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Current Track Info */}
            <div className="flex items-center gap-4 w-1/3 min-w-0">
              {currentSong && currentAlbum ? (
                <>
                  {/* Album Art with anime glow */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-purple-500/50 rounded-lg blur-md group-hover:blur-lg transition-all duration-300"></div>
                    <img
                      src={currentAlbum.coverUrl}
                      alt={currentAlbum.title}
                      className="relative w-16 h-16 rounded-lg object-cover shadow-2xl border border-white/20 group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Vinyl record effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Track Info */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold truncate text-sm hover:text-cyan-300 transition-colors cursor-pointer">
                      {currentSong.title}
                    </h4>
                    <p className="text-gray-300 text-xs truncate hover:text-white transition-colors cursor-pointer">
                      {currentArtist?.name}
                    </p>
                  </div>
                  
                  {/* Like Button with anime effect */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "text-gray-400 hover:text-white transition-all duration-300 hover:scale-110",
                      isCurrentSongLiked && "text-pink-500 hover:text-pink-400"
                    )}
                    onClick={() => toggleLikeSong(currentSong.id)}
                  >
                    <Heart className={cn(
                      "h-4 w-4 transition-all duration-300",
                      isCurrentSongLiked && "fill-current drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
                    )} />
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-white/10 flex items-center justify-center">
                    <Music className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 font-medium text-sm">No song playing</h4>
                    <p className="text-gray-500 text-xs">Select a song to play</p>
                  </div>
                </div>
              )}
            </div>

            {/* Center Section - Player Controls */}
            <div className="flex flex-col items-center gap-3 w-1/3">
              {/* Control Buttons */}
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "text-gray-400 hover:text-white transition-all duration-300 hover:scale-110",
                    isShuffled && "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  )}
                  onClick={toggleShuffle}
                >
                  <Shuffle className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:text-cyan-300 transition-all duration-300 hover:scale-110"
                  onClick={previousSong}
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                
                {/* Main Play/Pause Button with anime glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-md opacity-75"></div>
                  <Button
                    onClick={handlePlayPause}
                    disabled={!currentSong}
                    className="relative bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-black rounded-full w-12 h-12 p-0 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 transition-all duration-300 hover:scale-110 shadow-2xl"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:text-cyan-300 transition-all duration-300 hover:scale-110"
                  onClick={nextSong}
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "text-gray-400 hover:text-white transition-all duration-300 hover:scale-110",
                    repeatMode !== 'off' && "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  )}
                  onClick={toggleRepeat}
                >
                  {getRepeatIcon()}
                </Button>
              </div>
              
              {/* Progress Bar */}
              <div className="flex items-center gap-3 w-full max-w-lg">
                <span className="text-xs text-gray-300 w-12 text-right font-mono">
                  {formatDuration(currentTime)}
                </span>
                <div className="flex-1 relative">
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    className="w-full [&_.slider-track]:bg-white/20 [&_.slider-range]:bg-gradient-to-r [&_.slider-range]:from-cyan-400 [&_.slider-range]:to-purple-500 [&_.slider-thumb]:bg-white [&_.slider-thumb]:border-2 [&_.slider-thumb]:border-cyan-400 [&_.slider-thumb]:shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                    onValueChange={handleProgressChange}
                  />
                </div>
                <span className="text-xs text-gray-300 w-12 font-mono">
                  {formatDuration(duration)}
                </span>
              </div>
            </div>

            {/* Right Section - Additional Controls */}
            <div className="flex items-center gap-2 w-1/3 justify-end">
              {/* Lyrics Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "text-gray-400 hover:text-white transition-all duration-300 hover:scale-110",
                  showLyrics && "text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]"
                )}
                onClick={onLyricsToggle}
              >
                <Mic2 className="h-4 w-4" />
              </Button>
              
              {/* Queue Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "text-gray-400 hover:text-white transition-all duration-300 hover:scale-110",
                  showQueue && "text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                )}
                onClick={() => setShowQueue(!showQueue)}
              >
                <ListMusic className="h-4 w-4" />
              </Button>
              
              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-gray-400 hover:text-white transition-all duration-300 hover:scale-110",
                    isMuted && "text-red-400"
                  )}
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <div className="w-24">
                  <Slider
                    value={[isMuted ? 0 : volume * 100]}
                    max={100}
                    step={1}
                    className="[&_.slider-track]:bg-white/20 [&_.slider-range]:bg-gradient-to-r [&_.slider-range]:from-green-400 [&_.slider-range]:to-blue-500 [&_.slider-thumb]:bg-white [&_.slider-thumb]:border-2 [&_.slider-thumb]:border-green-400 [&_.slider-thumb]:shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                    onValueChange={handleVolumeChange}
                  />
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};