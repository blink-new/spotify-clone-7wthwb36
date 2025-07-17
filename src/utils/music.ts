import { Song, Playlist } from '../data/musicDatabase';

export interface MusicContextType {
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

// Shuffle array utility
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};