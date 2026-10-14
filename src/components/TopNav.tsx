import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
}) => {
  const navItems = [
    { id: 'oyun', label: 'Kelime Avı Oyunu' },
    { id: 'ozel-analiz', label: 'Serbest Analizör' },
    { id: 'vektor-harita', label: '2D Vektör Haritası' },
    { id: 'karsilastir', label: 'İkili Karşılaştırıcı' },
    { id: 'rehber', label: 'NLP Nasıl Çalışır?' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links) - Zone 3 (Primary Action) */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => setActiveTab('dedektif')}
            className="flex items-center gap-2 text-left focus:outline-none group cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              SemantiK <span className="text-emerald-600 dark:text-emerald-400 font-medium">NLP</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`transition-colors whitespace-nowrap py-1 relative cursor-pointer ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Dark Mode Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors whitespace-nowrap cursor-pointer"
              title={isDarkMode ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
              aria-label="Karanlık Mod Değiştir"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Aydınlık Mod</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Karanlık Mod</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav row */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === item.id
                  ? 'bg-emerald-600 text-white font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
