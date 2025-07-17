export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  followers: number;
  verified: boolean;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  coverUrl: string;
  releaseDate: string;
  totalTracks: number;
  genre: string;
}

export interface Song {
  id: string;
  title: string;
  artistId: string;
  albumId: string;
  duration: number; // in seconds
  trackNumber: number;
  audioUrl?: string;
  previewUrl?: string;
  explicit: boolean;
  popularity: number;
  playCount: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  userId: string;
  public: boolean;
  collaborative: boolean;
  songIds: string[];
  createdAt: string;
}

// Sample artists data
export const artists: Artist[] = [
  {
    id: "artist_1",
    name: "The Weeknd",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
    followers: 85000000,
    verified: true
  },
  {
    id: "artist_2", 
    name: "Billie Eilish",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    followers: 95000000,
    verified: true
  },
  {
    id: "artist_3",
    name: "Dua Lipa",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    followers: 75000000,
    verified: true
  },
  {
    id: "artist_4",
    name: "Post Malone",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    followers: 65000000,
    verified: true
  },
  {
    id: "artist_5",
    name: "Ariana Grande",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=300&h=300&fit=crop&crop=face",
    followers: 80000000,
    verified: true
  },
  {
    id: "artist_6",
    name: "Drake",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    followers: 90000000,
    verified: true
  }
];

// Sample albums data
export const albums: Album[] = [
  {
    id: "album_1",
    title: "After Hours",
    artistId: "artist_1",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    releaseDate: "2020-03-20",
    totalTracks: 14,
    genre: "R&B"
  },
  {
    id: "album_2",
    title: "Happier Than Ever",
    artistId: "artist_2",
    coverUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
    releaseDate: "2021-07-30",
    totalTracks: 16,
    genre: "Alternative"
  },
  {
    id: "album_3",
    title: "Future Nostalgia",
    artistId: "artist_3",
    coverUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    releaseDate: "2020-03-27",
    totalTracks: 11,
    genre: "Pop"
  },
  {
    id: "album_4",
    title: "Hollywood's Bleeding",
    artistId: "artist_4",
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    releaseDate: "2019-09-06",
    totalTracks: 17,
    genre: "Hip-Hop"
  },
  {
    id: "album_5",
    title: "Positions",
    artistId: "artist_5",
    coverUrl: "https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=300&h=300&fit=crop",
    releaseDate: "2020-10-30",
    totalTracks: 14,
    genre: "Pop"
  },
  {
    id: "album_6",
    title: "Certified Lover Boy",
    artistId: "artist_6",
    coverUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    releaseDate: "2021-09-03",
    totalTracks: 21,
    genre: "Hip-Hop"
  }
];

// Sample songs data
export const songs: Song[] = [
  // The Weeknd - After Hours
  {
    id: "song_1",
    title: "Blinding Lights",
    artistId: "artist_1",
    albumId: "album_1",
    duration: 200,
    trackNumber: 1,
    explicit: false,
    popularity: 95,
    playCount: 2500000000
  },
  {
    id: "song_2",
    title: "Save Your Tears",
    artistId: "artist_1",
    albumId: "album_1",
    duration: 215,
    trackNumber: 2,
    explicit: false,
    popularity: 88,
    playCount: 1800000000
  },
  {
    id: "song_3",
    title: "After Hours",
    artistId: "artist_1",
    albumId: "album_1",
    duration: 361,
    trackNumber: 3,
    explicit: true,
    popularity: 82,
    playCount: 950000000
  },
  
  // Billie Eilish - Happier Than Ever
  {
    id: "song_4",
    title: "Happier Than Ever",
    artistId: "artist_2",
    albumId: "album_2",
    duration: 298,
    trackNumber: 1,
    explicit: false,
    popularity: 90,
    playCount: 1200000000
  },
  {
    id: "song_5",
    title: "Therefore I Am",
    artistId: "artist_2",
    albumId: "album_2",
    duration: 174,
    trackNumber: 2,
    explicit: false,
    popularity: 85,
    playCount: 980000000
  },
  {
    id: "song_6",
    title: "Your Power",
    artistId: "artist_2",
    albumId: "album_2",
    duration: 240,
    trackNumber: 3,
    explicit: false,
    popularity: 78,
    playCount: 750000000
  },

  // Dua Lipa - Future Nostalgia
  {
    id: "song_7",
    title: "Don't Start Now",
    artistId: "artist_3",
    albumId: "album_3",
    duration: 183,
    trackNumber: 1,
    explicit: false,
    popularity: 92,
    playCount: 1600000000
  },
  {
    id: "song_8",
    title: "Levitating",
    artistId: "artist_3",
    albumId: "album_3",
    duration: 203,
    trackNumber: 2,
    explicit: false,
    popularity: 89,
    playCount: 1400000000
  },
  {
    id: "song_9",
    title: "Physical",
    artistId: "artist_3",
    albumId: "album_3",
    duration: 193,
    trackNumber: 3,
    explicit: false,
    popularity: 84,
    playCount: 1100000000
  },

  // Post Malone - Hollywood's Bleeding
  {
    id: "song_10",
    title: "Circles",
    artistId: "artist_4",
    albumId: "album_4",
    duration: 215,
    trackNumber: 1,
    explicit: false,
    popularity: 91,
    playCount: 1700000000
  },
  {
    id: "song_11",
    title: "Sunflower",
    artistId: "artist_4",
    albumId: "album_4",
    duration: 158,
    trackNumber: 2,
    explicit: false,
    popularity: 94,
    playCount: 2200000000
  },
  {
    id: "song_12",
    title: "Congratulations",
    artistId: "artist_4",
    albumId: "album_4",
    duration: 220,
    trackNumber: 3,
    explicit: true,
    popularity: 87,
    playCount: 1300000000
  },

  // Ariana Grande - Positions
  {
    id: "song_13",
    title: "positions",
    artistId: "artist_5",
    albumId: "album_5",
    duration: 172,
    trackNumber: 1,
    explicit: true,
    popularity: 86,
    playCount: 1100000000
  },
  {
    id: "song_14",
    title: "34+35",
    artistId: "artist_5",
    albumId: "album_5",
    duration: 173,
    trackNumber: 2,
    explicit: true,
    popularity: 83,
    playCount: 950000000
  },
  {
    id: "song_15",
    title: "pov",
    artistId: "artist_5",
    albumId: "album_5",
    duration: 201,
    trackNumber: 3,
    explicit: false,
    popularity: 79,
    playCount: 800000000
  },

  // Drake - Certified Lover Boy
  {
    id: "song_16",
    title: "Way 2 Sexy",
    artistId: "artist_6",
    albumId: "album_6",
    duration: 267,
    trackNumber: 1,
    explicit: true,
    popularity: 88,
    playCount: 1250000000
  },
  {
    id: "song_17",
    title: "Girls Want Girls",
    artistId: "artist_6",
    albumId: "album_6",
    duration: 244,
    trackNumber: 2,
    explicit: true,
    popularity: 85,
    playCount: 1050000000
  },
  {
    id: "song_18",
    title: "Fair Trade",
    artistId: "artist_6",
    albumId: "album_6",
    duration: 291,
    trackNumber: 3,
    explicit: true,
    popularity: 81,
    playCount: 900000000
  }
];

// Sample playlists
export const samplePlaylists: Playlist[] = [
  {
    id: "playlist_1",
    name: "Today's Top Hits",
    description: "The biggest songs right now",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    userId: "spotify",
    public: true,
    collaborative: false,
    songIds: ["song_1", "song_4", "song_7", "song_10", "song_11"],
    createdAt: "2024-01-01"
  },
  {
    id: "playlist_2",
    name: "Chill Hits",
    description: "Kick back to the best new and recent chill hits",
    coverUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
    userId: "spotify",
    public: true,
    collaborative: false,
    songIds: ["song_2", "song_6", "song_9", "song_15"],
    createdAt: "2024-01-02"
  },
  {
    id: "playlist_3",
    name: "Pop Rising",
    description: "The next generation of pop superstars",
    coverUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    userId: "spotify",
    public: true,
    collaborative: false,
    songIds: ["song_8", "song_13", "song_14", "song_5"],
    createdAt: "2024-01-03"
  },
  {
    id: "playlist_4",
    name: "Hip-Hop Central",
    description: "The sounds that define hip-hop culture",
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    userId: "spotify",
    public: true,
    collaborative: false,
    songIds: ["song_12", "song_16", "song_17", "song_18"],
    createdAt: "2024-01-04"
  }
];

// Utility functions
export const getArtistById = (id: string): Artist | undefined => {
  return artists.find(artist => artist.id === id);
};

export const getAlbumById = (id: string): Album | undefined => {
  return albums.find(album => album.id === id);
};

export const getSongById = (id: string): Song | undefined => {
  return songs.find(song => song.id === id);
};

export const getPlaylistById = (id: string): Playlist | undefined => {
  return samplePlaylists.find(playlist => playlist.id === id);
};

export const getSongsByArtist = (artistId: string): Song[] => {
  return songs.filter(song => song.artistId === artistId);
};

export const getSongsByAlbum = (albumId: string): Song[] => {
  return songs.filter(song => song.albumId === albumId);
};

export const getAlbumsByArtist = (artistId: string): Album[] => {
  return albums.filter(album => album.artistId === artistId);
};

export const searchSongs = (query: string): Song[] => {
  const lowercaseQuery = query.toLowerCase();
  return songs.filter(song => 
    song.title.toLowerCase().includes(lowercaseQuery) ||
    getArtistById(song.artistId)?.name.toLowerCase().includes(lowercaseQuery) ||
    getAlbumById(song.albumId)?.title.toLowerCase().includes(lowercaseQuery)
  );
};

export const searchArtists = (query: string): Artist[] => {
  const lowercaseQuery = query.toLowerCase();
  return artists.filter(artist => 
    artist.name.toLowerCase().includes(lowercaseQuery)
  );
};

export const searchAlbums = (query: string): Album[] => {
  const lowercaseQuery = query.toLowerCase();
  return albums.filter(album => 
    album.title.toLowerCase().includes(lowercaseQuery) ||
    getArtistById(album.artistId)?.name.toLowerCase().includes(lowercaseQuery)
  );
};

export const getTopSongs = (limit: number = 10): Song[] => {
  return [...songs]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getRecentlyPlayed = (): Song[] => {
  // Simulate recently played songs
  return songs.slice(0, 6);
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatPlayCount = (count: number): string => {
  if (count >= 1000000000) {
    return `${(count / 1000000000).toFixed(1)}B`;
  } else if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};