import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Song, Playlist, getArtistById, getSongById, formatDuration } from '../data/musicDatabase';

interface MusicContextType {
  // Current playback state
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: 'off' | 'all' | 'one';
  
  // Queue management
  queue: Song[];
  currentIndex: number;
  
  // Playback controls
  playSong: (song: Song, queue?: Song[], startIndex?: number) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  nextSong: () => void;
  previousSong: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  
  // Playlist management
  currentPlaylist: Playlist | null;
  setCurrentPlaylist: (playlist: Playlist | null) => void;
  
  // Liked songs
  likedSongs: Set<string>;
  toggleLikeSong: (songId: string) => void;
  
  // Recently played
  recentlyPlayed: Song[];
  addToRecentlyPlayed: (song: Song) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  // Playback state
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  
  // Queue management
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [originalQueue, setOriginalQueue] = useState<Song[]>([]);
  
  // Playlist management
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  
  // User preferences
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);

  // Shuffle array utility
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const playSong = useCallback((song: Song, newQueue?: Song[], startIndex?: number) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(song.duration);
    
    if (newQueue) {
      setOriginalQueue(newQueue);
      const queueToUse = isShuffled ? shuffleArray(newQueue) : newQueue;
      setQueue(queueToUse);
      
      // Find the index of the current song in the queue
      const songIndex = queueToUse.findIndex(s => s.id === song.id);
      setCurrentIndex(songIndex !== -1 ? songIndex : 0);
    } else if (startIndex !== undefined) {
      setCurrentIndex(startIndex);
    }
    
    // Add to recently played
    addToRecentlyPlayed(song);
  }, [isShuffled]);

  const pauseSong = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resumeSong = useCallback(() => {
    if (currentSong) {
      setIsPlaying(true);
    }
  }, [currentSong]);

  const nextSong = useCallback(() => {
    if (queue.length === 0) return;
    
    let nextIndex = currentIndex + 1;
    
    if (repeatMode === 'one') {
      // Stay on the same song
      nextIndex = currentIndex;
    } else if (nextIndex >= queue.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        // End of queue, stop playing
        setIsPlaying(false);
        return;
      }
    }
    
    const nextSong = queue[nextIndex];
    if (nextSong) {
      setCurrentSong(nextSong);
      setCurrentIndex(nextIndex);
      setCurrentTime(0);
      setDuration(nextSong.duration);
      addToRecentlyPlayed(nextSong);
    }
  }, [queue, currentIndex, repeatMode]);

  const previousSong = useCallback(() => {
    if (queue.length === 0) return;
    
    // If we're more than 3 seconds into the song, restart it
    if (currentTime > 3) {
      setCurrentTime(0);
      return;
    }
    
    let prevIndex = currentIndex - 1;
    
    if (prevIndex < 0) {
      if (repeatMode === 'all') {
        prevIndex = queue.length - 1;
      } else {
        prevIndex = 0;
      }
    }
    
    const prevSong = queue[prevIndex];
    if (prevSong) {
      setCurrentSong(prevSong);
      setCurrentIndex(prevIndex);
      setCurrentTime(0);
      setDuration(prevSong.duration);
      addToRecentlyPlayed(prevSong);
    }
  }, [queue, currentIndex, currentTime, repeatMode]);

  const seekTo = useCallback((time: number) => {
    setCurrentTime(Math.max(0, Math.min(time, duration)));
  }, [duration]);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    if (clampedVolume > 0) {
      setIsMuted(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(prev => {
      const newShuffled = !prev;
      
      if (newShuffled) {
        // Shuffle the queue, but keep current song at current position
        const shuffled = shuffleArray(originalQueue);
        const currentSongIndex = shuffled.findIndex(s => s.id === currentSong?.id);
        
        if (currentSongIndex !== -1 && currentSongIndex !== currentIndex) {
          // Move current song to current position
          const [currentSongItem] = shuffled.splice(currentSongIndex, 1);
          shuffled.splice(currentIndex, 0, currentSongItem);
        }
        
        setQueue(shuffled);
      } else {
        // Restore original order
        setQueue(originalQueue);
        const originalIndex = originalQueue.findIndex(s => s.id === currentSong?.id);
        setCurrentIndex(originalIndex !== -1 ? originalIndex : 0);
      }
      
      return newShuffled;
    });
  }, [originalQueue, currentSong, currentIndex]);

  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      switch (prev) {
        case 'off': return 'all';
        case 'all': return 'one';
        case 'one': return 'off';
        default: return 'off';
      }
    });
  }, []);

  const toggleLikeSong = useCallback((songId: string) => {
    setLikedSongs(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(songId)) {
        newLiked.delete(songId);
      } else {
        newLiked.add(songId);
      }
      return newLiked;
    });
  }, []);

  const addToRecentlyPlayed = useCallback((song: Song) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 20); // Keep last 20 songs
    });
  }, []);

  // Simulate time progression (in a real app, this would be handled by audio element)
  React.useEffect(() => {
    if (!isPlaying || !currentSong) return;
    
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        if (newTime >= duration) {
          nextSong();
          return 0;
        }
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying, currentSong, duration, nextSong]);

  const value: MusicContextType = {
    // Current playback state
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    
    // Queue management
    queue,
    currentIndex,
    
    // Playback controls
    playSong,
    pauseSong,
    resumeSong,
    nextSong,
    previousSong,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    
    // Playlist management
    currentPlaylist,
    setCurrentPlaylist,
    
    // Liked songs
    likedSongs,
    toggleLikeSong,
    
    // Recently played
    recentlyPlayed,
    addToRecentlyPlayed
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};