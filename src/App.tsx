import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { NlpQuizGame } from './components/NlpQuizGame';
import { CustomGroupPlayground } from './components/CustomGroupPlayground';
import { PairwiseComparer } from './components/PairwiseComparer';
import { NlpGuideView } from './components/NlpGuideView';
import { SemanticVectorCanvas } from './components/SemanticVectorCanvas';
import { SimilarityMatrixHeatmap } from './components/SimilarityMatrixHeatmap';
import { analyzeWordGroup } from './nlp/nlpEngine';
import { PRESET_SCENARIOS } from './nlp/scenarios';
import { Sparkles, Brain, Compass, Cpu, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('oyun');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('semantik_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Default scenario words for standalone 2D map tab
  const [vectorMapWords, setVectorMapWords] = useState<string[]>([
    'Elma',
    'Armut',
    'Muz',
    'Çilek',
    'Patates',
    'Portakal',
  ]);

  const vectorMapAnalysis = analyzeWordGroup(vectorMapWords);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('semantik_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Bar adhering to Top Bar Contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Tab 1: Primary Interactive 5-Word Quiz Game */}
        {activeTab === 'oyun' && <NlpQuizGame />}

        {/* Tab 2: Custom Group Analyzer */}
        {activeTab === 'ozel-analiz' && <CustomGroupPlayground />}

        {/* Tab 3: Dedicated 2D Vector Map Workspace */}
        {activeTab === 'vektor-harita' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    2D Semantik Koordinat ve Vektör Uzayı
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Kelimelerin çok boyutlu semantik uzaydaki konumlarını ve küme merkezinden sapmalarını inceleyin.
                  </p>
                </div>

                {/* Scenario switcher buttons */}
                <div className="flex items-center gap-2 overflow-x-auto text-xs">
                  <span className="text-slate-400 text-xs shrink-0">Küme:</span>
                  {PRESET_SCENARIOS.slice(0, 4).map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setVectorMapWords(sc.words)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer text-xs font-medium ${
                        vectorMapWords.join(',') === sc.words.join(',')
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {sc.theme}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <SemanticVectorCanvas
                  words={vectorMapAnalysis.words}
                  outlierWord={vectorMapAnalysis.outlierWord}
                  dominantCategoryLabel={vectorMapAnalysis.dominantCategory.label}
                />
                <SimilarityMatrixHeatmap
                  words={vectorMapAnalysis.words}
                  pairwiseMatrix={vectorMapAnalysis.pairwiseMatrix}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Pairwise Comparer */}
        {activeTab === 'karsilastir' && <PairwiseComparer />}

        {/* Tab 5: Educational NLP Guide */}
        {activeTab === 'rehber' && <NlpGuideView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs py-6 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              SemantiK NLP Laboratuvarı
            </span>
            <span aria-hidden="true">·</span>
            <span>İstemci Taraflı Doğal Dil İşleme & Kosinüs Benzerliği</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span>Statik Çalışma (0ms API gecikmesi)</span>
            <span aria-hidden="true">·</span>
            <span>Karanlık Mod Destekli</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
