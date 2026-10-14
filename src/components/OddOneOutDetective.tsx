import React, { useState, useEffect } from 'react';
import { PRESET_SCENARIOS, ScenarioPreset } from '../nlp/scenarios';
import { analyzeWordGroup, GroupAnalysisResult } from '../nlp/nlpEngine';
import { SemanticVectorCanvas } from './SemanticVectorCanvas';
import { SimilarityMatrixHeatmap } from './SimilarityMatrixHeatmap';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Target,
  Trophy,
  BrainCircuit,
  Sliders,
  TrendingDown,
  Layers,
} from 'lucide-react';

export const OddOneOutDetective: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<GroupAnalysisResult | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const scenario: ScenarioPreset = PRESET_SCENARIOS[currentScenarioIndex];

  // Run NLP analysis whenever scenario changes
  useEffect(() => {
    setSelectedWord(null);
    setIsRevealed(false);
    const result = analyzeWordGroup(scenario.words);
    setAnalysisResult(result);
  }, [currentScenarioIndex]);

  const handleWordClick = (word: string) => {
    if (isRevealed) return;
    setSelectedWord(word);
    setIsRevealed(true);

    const isCorrect =
      word.toLowerCase() === scenario.expectedOutlier.toLowerCase() ||
      word.toLowerCase() === analysisResult?.outlierWord?.word.toLowerCase();

    if (isCorrect) {
      setScore((prev) => prev + 100);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNlpSolve = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsRevealed(true);
      if (analysisResult?.outlierWord) {
        setSelectedWord(analysisResult.outlierWord.word);
      }
    }, 450);
  };

  const handleNextScenario = () => {
    setCurrentScenarioIndex((prev) => (prev + 1) % PRESET_SCENARIOS.length);
  };

  const isSelectedCorrect =
    selectedWord &&
    (selectedWord.toLowerCase() === scenario.expectedOutlier.toLowerCase() ||
      selectedWord.toLowerCase() === analysisResult?.outlierWord?.word.toLowerCase());

  return (
    <div className="space-y-8">
      {/* Hero Banner & Scenario Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        {/* Decorative subtle background grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
              <span className="text-emerald-400 font-semibold tracking-wide uppercase">
                {scenario.badge}
              </span>
              <span aria-hidden="true">·</span>
              <span>Zorluk: {scenario.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>Senaryo {currentScenarioIndex + 1} / {PRESET_SCENARIOS.length}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              {scenario.title}
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {scenario.description}
            </p>
          </div>

          {/* Score Counter */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-3 px-5 backdrop-blur-xs shrink-0 self-start lg:self-center">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-medium">Toplam Puan</span>
                <span className="text-lg font-bold font-mono text-white tabular-nums">{score}</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <span className="text-[10px] uppercase text-slate-400 block font-medium">Seri</span>
              <span className="text-lg font-bold font-mono text-emerald-400 tabular-nums">{streak} 🔥</span>
            </div>
          </div>
        </div>

        {/* Preset Selector Carousel */}
        <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 text-xs shrink-0 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Senaryolar:
          </span>
          {PRESET_SCENARIOS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentScenarioIndex(idx)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer text-xs font-medium ${
                currentScenarioIndex === idx
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage: Word Cards */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Gruptaki Absürt / Uyumsuz Kelimeyi Bulun
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Aşağıdaki kelimelerden hangisi gruptaki diğer kelimelerin anlamsal kümesine ait değildir?
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isRevealed && (
              <button
                onClick={handleNlpSolve}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>{isAnalyzing ? 'Vektörler Hesaplanıyor...' : 'NLP ile Otomatik Çöz'}</span>
              </button>
            )}

            {isRevealed && (
              <button
                onClick={handleNextScenario}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
              >
                <span>Sonraki Senaryo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Word Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-6">
          {scenario.words.map((word) => {
            const wordAnalysis = analysisResult?.words.find(
              (w) => w.word.toLowerCase() === word.toLowerCase()
            );
            const isTargetOutlier =
              word.toLowerCase() === scenario.expectedOutlier.toLowerCase();
            const isUserPicked = selectedWord?.toLowerCase() === word.toLowerCase();

            let cardStyle =
              'border-slate-200 dark:border-slate-800 hover:border-emerald-500/80 bg-slate-50/70 dark:bg-slate-950/60 text-slate-800 dark:text-slate-100';

            if (isRevealed) {
              if (isTargetOutlier) {
                cardStyle =
                  'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/40';
              } else if (isUserPicked && !isTargetOutlier) {
                cardStyle =
                  'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200';
              } else {
                cardStyle =
                  'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200';
              }
            }

            return (
              <button
                key={word}
                onClick={() => handleWordClick(word)}
                disabled={isRevealed}
                className={`p-4 rounded-2xl border text-center transition-all duration-200 relative group flex flex-col items-center justify-between min-h-[110px] cursor-pointer ${cardStyle} ${
                  !isRevealed ? 'hover:-translate-y-0.5 hover:shadow-sm' : ''
                }`}
              >
                {/* Status indicator on revealed */}
                {isRevealed && isTargetOutlier && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded-full mb-1">
                    Absürt Kelime
                  </span>
                )}
                {isRevealed && !isTargetOutlier && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full mb-1">
                    Küme Üyesi
                  </span>
                )}
                {!isRevealed && (
                  <span className="text-[10px] text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Tıkla ve Seç
                  </span>
                )}

                <span className="text-base sm:text-lg font-bold tracking-tight capitalize my-auto">
                  {word}
                </span>

                {/* Similarity score on revealed */}
                {isRevealed && wordAnalysis && (
                  <div className="text-[11px] font-mono mt-1 pt-1 border-t border-slate-200/60 dark:border-slate-800/80 w-full flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>Benzerlik:</span>
                    <span
                      className={`font-semibold ${
                        isTargetOutlier
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      %{wordAnalysis.avgSimilarity.toFixed(0)}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Revelation & Explanation Box */}
        {isRevealed && analysisResult && (
          <div
            className={`p-5 rounded-2xl border transition-all animate-in fade-in duration-200 ${
              isSelectedCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-100'
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/80 text-rose-950 dark:text-rose-100'
            }`}
          >
            <div className="flex items-start gap-3">
              {isSelectedCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-base">
                    {isSelectedCorrect
                      ? `Tebrikler! Doğru Teşhis: "${scenario.expectedOutlier}" Absürt Kelimedir.`
                      : `Yanlış Tercih: Bu gruptaki gerçek absürt kelime "${scenario.expectedOutlier}" idi.`}
                  </h4>
                  <span className="text-xs font-mono bg-white/60 dark:bg-black/40 px-2.5 py-1 rounded-lg border border-black/5 dark:border-white/10">
                    NLP Güvenilirlik Oranı: %{analysisResult.confidenceScore}
                  </span>
                </div>

                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                  {analysisResult.explanation.details}
                </p>

                <p className="text-xs opacity-75 font-mono">
                  {analysisResult.explanation.comparison}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deep NLP Analytics: 2D Canvas & Cosine Heatmap */}
      {analysisResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SemanticVectorCanvas
            words={analysisResult.words}
            outlierWord={analysisResult.outlierWord}
            dominantCategoryLabel={analysisResult.dominantCategory.label}
          />
          <SimilarityMatrixHeatmap
            words={analysisResult.words}
            pairwiseMatrix={analysisResult.pairwiseMatrix}
          />
        </div>
      )}
    </div>
  );
};
