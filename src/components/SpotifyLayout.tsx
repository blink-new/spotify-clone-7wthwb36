import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Home, 
  Search, 
  Library, 
  Plus, 
  User,
  LogOut
} from 'lucide-react';
import { HomePage } from './HomePage';
import { AnimeTaskbar } from './AnimeTaskbar';
import { AuthModal } from './AuthModal';
import { useMusicContext } from '../hooks/useMusicContext';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

export const SpotifyLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'library'>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const { currentSong } = useMusicContext();

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
      <div className="flex flex-1 gap-2 p-2 pb-28">
        {/* Left Sidebar */}
        <div className="w-64 bg-black/60 backdrop-blur-md rounded-lg flex flex-col">
          {/* Navigation */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-xl">Spotify</span>
              </div>
              
              {/* User Profile / Auth */}
              <div className="flex items-center gap-2">
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatarUrl || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face`}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full border border-white/20"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                )}
              </div>
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

      {/* Anime Taskbar */}
      <AnimeTaskbar 
        onLyricsToggle={() => setShowLyrics(!showLyrics)}
        showLyrics={showLyrics}
      />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};