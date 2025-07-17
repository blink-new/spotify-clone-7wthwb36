import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Album, Playlist, Artist, getArtistById, getSongsByAlbum } from '../data/musicDatabase';
import { useMusicContext } from '../hooks/useMusicContext';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface MediaCardProps {
  item: Album | Playlist | Artist;
  type: 'album' | 'playlist' | 'artist';
  className?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, type, className }) => {
  const { currentSong, isPlaying, playSong, pauseSong, resumeSong, currentPlaylist } = useMusicContext();
  
  const getImageUrl = () => {
    switch (type) {
      case 'album':
        return (item as Album).coverUrl;
      case 'playlist':
        return (item as Playlist).coverUrl;
      case 'artist':
        return (item as Artist).imageUrl;
      default:
        return '';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'album':
        return (item as Album).title;
      case 'playlist':
        return (item as Playlist).name;
      case 'artist':
        return (item as Artist).name;
      default:
        return '';
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case 'album': {
        const album = item as Album;
        const artist = getArtistById(album.artistId);
        return artist?.name || 'Unknown Artist';
      }
      case 'playlist': {
        const playlist = item as Playlist;
        return `${playlist.songIds.length} songs`;
      }
      case 'artist': {
        const artistItem = item as Artist;
        return `${(artistItem.followers / 1000000).toFixed(1)}M followers`;
      }
      default:
        return '';
    }
  };

  const isCurrentlyPlaying = () => {
    if (type === 'playlist') {
      return currentPlaylist?.id === item.id && isPlaying;
    }
    if (type === 'album') {
      const albumSongs = getSongsByAlbum(item.id);
      return albumSongs.some(song => song.id === currentSong?.id) && isPlaying;
    }
    return false;
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (type === 'album') {
      const albumSongs = getSongsByAlbum(item.id);
      if (albumSongs.length > 0) {
        const isCurrentAlbumPlaying = albumSongs.some(song => song.id === currentSong?.id);
        
        if (isCurrentAlbumPlaying && isPlaying) {
          pauseSong();
        } else if (isCurrentAlbumPlaying && !isPlaying) {
          resumeSong();
        } else {
          playSong(albumSongs[0], albumSongs);
        }
      }
    } else if (type === 'playlist') {
      const playlist = item as Playlist;
      // In a real app, you'd fetch songs by playlist.songIds
      // For now, we'll just play the first song
      if (playlist.songIds.length > 0) {
        const isCurrentPlaylistPlaying = currentPlaylist?.id === playlist.id;
        
        if (isCurrentPlaylistPlaying && isPlaying) {
          pauseSong();
        } else if (isCurrentPlaylistPlaying && !isPlaying) {
          resumeSong();
        } else {
          // In a real implementation, you'd get songs by IDs
          console.log('Playing playlist:', playlist.name);
        }
      }
    }
  };

  const handleCardClick = () => {
    // Navigate to album/playlist/artist page
    console.log(`Navigate to ${type}:`, item.id);
  };

  return (
    <div 
      className={cn(
        "group relative bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-all duration-200 cursor-pointer",
        className
      )}
      onClick={handleCardClick}
    >
      {/* Cover Image */}
      <div className="relative mb-4">
        <img
          src={getImageUrl()}
          alt={getTitle()}
          className={cn(
            "w-full aspect-square object-cover shadow-lg",
            type === 'artist' ? 'rounded-full' : 'rounded-md'
          )}
        />
        
        {/* Play Button Overlay */}
        <Button
          size="sm"
          className={cn(
            "absolute bottom-2 right-2 w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 text-black shadow-lg transition-all duration-200 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
            isCurrentlyPlaying() && "opacity-100 translate-y-0"
          )}
          onClick={handlePlay}
        >
          {isCurrentlyPlaying() ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </Button>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-white mb-1 truncate group-hover:underline">
          {getTitle()}
        </h3>
        <p className="text-sm text-gray-400 truncate">
          {getSubtitle()}
        </p>
        
        {type === 'album' && (
          <p className="text-xs text-gray-500 mt-1">
            {new Date((item as Album).releaseDate).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
};