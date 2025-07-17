import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Palette, ChevronLeft, ChevronRight } from 'lucide-react';

// Naruto-themed wallpapers with anime aesthetic
const wallpapers = [
  {
    id: 1,
    name: "Naruto Sunset",
    url: "https://images.unsplash.com/photo-1677143016687-8dbb7e71db08?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxuYXJ1dG8lMjBhbmltZSUyMHdhbGxwYXBlcnxlbnwwfDB8fHwxNzUyNzQwNTgyfDA&ixlib=rb-4.1.0&q=85",
    gradient: "from-orange-900/40 via-red-900/30 to-black/60"
  },
  {
    id: 2,
    name: "Anime Collection",
    url: "https://images.unsplash.com/photo-1705927450843-3c1abe9b17d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwyfHxuYXJ1dG8lMjBhbmltZSUyMHdhbGxwYXBlcnxlbnwwfDB8fHwxNzUyNzQwNTgyfDA&ixlib=rb-4.1.0&q=85",
    gradient: "from-blue-900/40 via-purple-900/30 to-black/60"
  },
  {
    id: 3,
    name: "Comic Style",
    url: "https://images.unsplash.com/photo-1639634252346-0a27c7d168dc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwzfHxuYXJ1dG8lMjBhbmltZSUyMHdhbGxwYXBlcnxlbnwwfDB8fHwxNzUyNzQwNTgyfDA&ixlib=rb-4.1.0&q=85",
    gradient: "from-yellow-900/40 via-orange-900/30 to-black/60"
  },
  {
    id: 4,
    name: "Anime Figures",
    url: "https://images.unsplash.com/photo-1742919037270-78cc9f5220df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHxuYXJ1dG8lMjBhbmltZSUyMHdhbGxwYXBlcnxlbnwwfDB8fHwxNzUyNzQwNTgyfDA&ixlib=rb-4.1.0&q=85",
    gradient: "from-indigo-900/40 via-purple-900/30 to-black/60"
  },
  {
    id: 5,
    name: "Anime Store",
    url: "https://images.unsplash.com/photo-1716085487003-217f0e459f30?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw1fHxuYXJ1dG8lMjBhbmltZSUyMHdhbGxwYXBlcnxlbnwwfDB8fHwxNzUyNzQwNTgyfDA&ixlib=rb-4.1.0&q=85",
    gradient: "from-green-900/40 via-teal-900/30 to-black/60"
  }
];

interface BackgroundWallpaperProps {
  children: React.ReactNode;
}

export const BackgroundWallpaper: React.FC<BackgroundWallpaperProps> = ({ children }) => {
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);

  // Auto-rotate wallpapers every 5 seconds
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setCurrentWallpaperIndex((prev) => (prev + 1) % wallpapers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const currentWallpaper = wallpapers[currentWallpaperIndex];

  const handleWallpaperChange = (index: number) => {
    setCurrentWallpaperIndex(index);
    setIsAutoRotating(false); // Stop auto-rotation when user manually selects
    setShowWallpaperSelector(false);
  };

  const nextWallpaper = () => {
    setCurrentWallpaperIndex((prev) => (prev + 1) % wallpapers.length);
    setIsAutoRotating(false);
  };

  const prevWallpaper = () => {
    setCurrentWallpaperIndex((prev) => (prev - 1 + wallpapers.length) % wallpapers.length);
    setIsAutoRotating(false);
  };

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Smooth Transition */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentWallpaper.url})`,
          }}
        />
        {/* Gradient Overlay for better readability */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentWallpaper.gradient}`} />
        {/* Additional dark overlay for Spotify's dark theme */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Wallpaper Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Previous/Next Controls */}
        <Button
          variant="outline"
          size="sm"
          onClick={prevWallpaper}
          className="bg-black/50 border-white/20 text-white hover:bg-black/70"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={nextWallpaper}
          className="bg-black/50 border-white/20 text-white hover:bg-black/70"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Wallpaper Selector Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowWallpaperSelector(!showWallpaperSelector)}
          className="bg-black/50 border-white/20 text-white hover:bg-black/70"
        >
          <Palette className="h-4 w-4" />
        </Button>

        {/* Auto-rotation Toggle */}
        <Button
          variant={isAutoRotating ? "default" : "outline"}
          size="sm"
          onClick={toggleAutoRotation}
          className={isAutoRotating 
            ? "bg-[#1DB954] hover:bg-[#1ED760] text-black" 
            : "bg-black/50 border-white/20 text-white hover:bg-black/70"
          }
        >
          Auto
        </Button>
      </div>

      {/* Wallpaper Selector Panel */}
      {showWallpaperSelector && (
        <div className="fixed top-16 right-4 z-50 bg-black/90 backdrop-blur-md rounded-lg p-4 border border-white/20">
          <h3 className="text-white font-semibold mb-3">Choose Wallpaper</h3>
          <div className="grid grid-cols-2 gap-2 max-w-xs">
            {wallpapers.map((wallpaper, index) => (
              <button
                key={wallpaper.id}
                onClick={() => handleWallpaperChange(index)}
                className={`relative aspect-video rounded-md overflow-hidden border-2 transition-all ${
                  index === currentWallpaperIndex
                    ? 'border-[#1DB954] ring-2 ring-[#1DB954]/50'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <img
                  src={wallpaper.url}
                  alt={wallpaper.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${wallpaper.gradient}`} />
                <div className="absolute bottom-1 left-1 text-xs text-white font-medium">
                  {wallpaper.name}
                </div>
              </button>
            ))}
          </div>
          
          {/* Auto-rotation indicator */}
          {isAutoRotating && (
            <div className="mt-3 text-xs text-[#1DB954] flex items-center gap-1">
              <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse" />
              Auto-rotating every 5s
            </div>
          )}
        </div>
      )}

      {/* Current wallpaper indicator */}
      <div className="fixed bottom-4 right-4 z-40 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/80">
        {currentWallpaper.name} ({currentWallpaperIndex + 1}/{wallpapers.length})
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
};