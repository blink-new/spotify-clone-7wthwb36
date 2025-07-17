import React from 'react';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { Song, getArtistById, getAlbumById, formatDuration } from '../data/musicDatabase';
import { useMusicContext } from '../contexts/MusicContext';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface SongCardProps {
  song: Song;
  index?: number;
  showAlbum?: boolean;
  showArtwork?: boolean;
  className?: string;
}

export const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  index, 
  showAlbum = true, 
  showArtwork = true,
  className 
}) => {
  const { 
    currentSong, 
    isPlaying, 
    playSong, 
    pauseSong, 
    resumeSong,
    likedSongs,
    toggleLikeSong 
  } = useMusicContext();
  
  const artist = getArtistById(song.artistId);
  const album = getAlbumById(song.albumId);
  const isCurrentSong = currentSong?.id === song.id;
  const isLiked = likedSongs.has(song.id);

  const handlePlayPause = () => {
    if (isCurrentSong) {
      if (isPlaying) {
        pauseSong();
      } else {
        resumeSong();
      }
    } else {
      playSong(song);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLikeSong(song.id);
  };

  return (
    <div 
      className={cn(
        "group flex items-center gap-4 p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer",
        isCurrentSong && "bg-white/5",
        className
      )}
      onClick={handlePlayPause}
    >
      {/* Track Number / Play Button */}
      <div className="w-4 text-center">
        {isCurrentSong && isPlaying ? (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-3 bg-green-500 animate-pulse"></div>
              <div className="w-0.5 h-2 bg-green-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-0.5 h-4 bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : (
          <>
            <span className={cn(
              "text-sm text-gray-400 group-hover:hidden",
              isCurrentSong && "text-green-500"
            )}>
              {index !== undefined ? index + 1 : ''}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="hidden group-hover:flex w-8 h-8 p-0 hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
            >
              {isCurrentSong && isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
          </>
        )}
      </div>

      {/* Song Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {showArtwork && album && (
          <img
            src={album.coverUrl}
            alt={album.title}
            className="w-10 h-10 rounded object-cover"
          />
        )}
        
        <div className="flex-1 min-w-0">
          <div className={cn(
            "font-medium text-white truncate",
            isCurrentSong && "text-green-500"
          )}>
            {song.title}
            {song.explicit && (
              <span className="ml-2 text-xs bg-gray-600 text-white px-1 rounded">E</span>
            )}
          </div>
          <div className="text-sm text-gray-400 truncate">
            {artist?.name}
          </div>
        </div>
      </div>

      {/* Album */}
      {showAlbum && album && (
        <div className="hidden md:block flex-1 min-w-0">
          <div className="text-sm text-gray-400 truncate hover:text-white hover:underline cursor-pointer">
            {album.title}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "w-8 h-8 p-0 opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-opacity",
            isLiked && "opacity-100"
          )}
          onClick={handleLike}
        >
          <Heart 
            className={cn(
              "w-4 h-4",
              isLiked ? "fill-green-500 text-green-500" : "text-gray-400 hover:text-white"
            )} 
          />
        </Button>
        
        <div className="text-sm text-gray-400 w-12 text-right">
          {formatDuration(song.duration)}
        </div>
        
        <Button
          size="sm"
          variant="ghost"
          className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-white" />
        </Button>
      </div>
    </div>
  );
};