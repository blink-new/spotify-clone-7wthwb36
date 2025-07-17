import React from 'react';
import { MediaCard } from './MediaCard';
import { SongCard } from './SongCard';
import { 
  albums, 
  artists, 
  samplePlaylists, 
  getTopSongs, 
  getRecentlyPlayed 
} from '../data/musicDatabase';
import { useMusicContext } from '../contexts/MusicContext';

export const HomePage: React.FC = () => {
  const { recentlyPlayed } = useMusicContext();
  const topSongs = getTopSongs(6);
  const recentSongs = recentlyPlayed.length > 0 ? recentlyPlayed : getRecentlyPlayed();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-white/10 to-black/20 rounded-lg p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {getGreeting()}
        </h1>
      </div>

      {/* Recently Played */}
      {recentSongs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Recently played</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {recentSongs.slice(0, 6).map((song) => (
              <div
                key={song.id}
                className="flex items-center bg-white/10 hover:bg-white/20 rounded-md p-2 group cursor-pointer transition-colors"
              >
                <SongCard 
                  song={song} 
                  showAlbum={false} 
                  showArtwork={true}
                  className="flex-1 p-0 hover:bg-transparent"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Made for you */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Made for you</h2>
          <button className="text-sm text-gray-400 hover:text-white font-semibold">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {samplePlaylists.map((playlist) => (
            <MediaCard
              key={playlist.id}
              item={playlist}
              type="playlist"
            />
          ))}
        </div>
      </section>

      {/* Popular albums */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Popular albums</h2>
          <button className="text-sm text-gray-400 hover:text-white font-semibold">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {albums.slice(0, 5).map((album) => (
            <MediaCard
              key={album.id}
              item={album}
              type="album"
            />
          ))}
        </div>
      </section>

      {/* Popular artists */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Popular artists</h2>
          <button className="text-sm text-gray-400 hover:text-white font-semibold">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {artists.map((artist) => (
            <MediaCard
              key={artist.id}
              item={artist}
              type="artist"
            />
          ))}
        </div>
      </section>

      {/* Top songs */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Top songs</h2>
          <button className="text-sm text-gray-400 hover:text-white font-semibold">
            Show all
          </button>
        </div>
        <div className="space-y-1">
          {topSongs.map((song, index) => (
            <SongCard
              key={song.id}
              song={song}
              index={index}
              showAlbum={true}
              showArtwork={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
};