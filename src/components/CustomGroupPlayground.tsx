import React, { useState } from 'react';
import { analyzeWordGroup, GroupAnalysisResult } from '../nlp/nlpEngine.ts';
import { SemanticVectorCanvas } from './SemanticVectorCanvas.tsx';
import { SimilarityMatrixHeatmap } from './SimilarityMatrixHeatmap.tsx';
import {
  Wand2,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';

export const CustomGroupPlayground: React.FC = () => {
  const [wordList, setWordList] = useState<string[]>([
    'Elma',
    'Muz',
    'Çilek',
    'Patates',
    'Portakal',
    'Karpuz',
  ]);
  const [inputWord, setInputWord] = useState('');
  const [rawBulkInput, setRawBulkInput] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<GroupAnalysisResult | null>(() =>
    analyzeWordGroup(['Elma', 'Muz', 'Çilek', 'Patates', 'Portakal', 'Karpuz'])
  );

  const handleAddWord = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputWord.trim();
    if (!clean) return;
    if (wordList.map((w) => w.toLowerCase()).includes(clean.toLowerCase())) {
      setInputWord('');
      return;
    }
    const updated = [...wordList, clean];
    setWordList(updated);
    setInputWord('');
    setAnalysisResult(analyzeWordGroup(updated));
  };

  const handleRemoveWord = (wordToRemove: string) => {
    if (wordList.length <= 3) return; // keep at least 3
    const updated = wordList.filter((w) => w.toLowerCase() !== wordToRemove.toLowerCase());
    setWordList(updated);
    setAnalysisResult(analyzeWordGroup(updated));
  };

  const handleApplyBulk = () => {
    const parsed = rawBulkInput
      .split(/[,;\n]+/)
      .map((w) => w.trim())
      .filter((w) => w.length > 0);

    if (parsed.length >= 3) {
      setWordList(parsed);
      setAnalysisResult(analyzeWordGroup(parsed));
      setShowBulkModal(false);
      setRawBulkInput('');
    }
  };

  const handleLoadExample = (exampleWords: string[]) => {
    setWordList(exampleWords);
    setAnalysisResult(analyzeWordGroup(exampleWords));
  };

  return (
    <div className="space-y-8">
      {/* Configuration & Input Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Serbest Kelime Grubu Analizörü
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              İstediğiniz kelimeleri ekleyin; Doğal Dil İşleme motoru semantik vektörleri hesaplayıp absürt olanı otomatik tespit etsin.
            </p>
          </div>

          <button
            onClick={() => setShowBulkModal(!showBulkModal)}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            Toplu Kelime Yapıştır
          </button>
        </div>

        {/* Quick Example Presets */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 text-xs border-b border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 text-xs shrink-0 mr-1">Hızlı Örnekler:</span>
          <button
            onClick={() =>
              handleLoadExample(['Elma', 'Muz', 'Çilek', 'Patates', 'Portakal', 'Armut'])
            }
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md transition-colors whitespace-nowrap cursor-pointer text-xs"
          >
            🍎 Meyveler + Patates (Kullanıcı Örneği)
          </button>
          <button
            onClick={() =>
              handleLoadExample(['Aslan', 'Kaplan', 'Kurt', 'Uçak', 'Ayı', 'Tilki'])
            }
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md transition-colors whitespace-nowrap cursor-pointer text-xs"
          >
            🦁 Hayvanlar + Uçak
          </button>
          <button
            onClick={() =>
              handleLoadExample(['Gitar', 'Piyano', 'Keman', 'Algoritma', 'Flüt', 'Çello'])
            }
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md transition-colors whitespace-nowrap cursor-pointer text-xs"
          >
            🎻 Enstrümanlar + Algoritma
          </button>
          <button
            onClick={() =>
              handleLoadExample(['Tencere', 'Tava', 'Bıçak', 'Mars', 'Kaşık', 'Fırın'])
            }
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md transition-colors whitespace-nowrap cursor-pointer text-xs"
          >
            🍳 Mutfak + Mars
          </button>
        </div>

        {/* Bulk paste collapse area */}
        {showBulkModal && (
          <div className="my-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 block">
              Virgülle veya satırla ayrılmış kelimeleri yapıştırın:
            </label>
            <textarea
              value={rawBulkInput}
              onChange={(e) => setRawBulkInput(e.target.value)}
              placeholder="Örn: Elma, Muz, Armut, Patates, Karpuz, Çilek"
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                İptal
              </button>
              <button
                onClick={handleApplyBulk}
                className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg"
              >
                Grubu Güncelle
              </button>
            </div>
          </div>
        )}

        {/* Word Chips & Add Form */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {wordList.map((w) => {
              const isOutlier = analysisResult?.outlierWord?.word.toLowerCase() === w.toLowerCase();
              return (
                <div
                  key={w}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                    isOutlier
                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 ring-1 ring-rose-400'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span className="capitalize">{w}</span>
                  {isOutlier && (
                    <span className="text-[10px] bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 px-1.5 py-0.2 rounded font-semibold">
                      Absürt
                    </span>
                  )}
                  {wordList.length > 3 && (
                    <button
                      onClick={() => handleRemoveWord(w)}
                      className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                      title="Kelimeyi sil"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add single word form */}
          <form onSubmit={handleAddWord} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              placeholder="Yeni kelime yazın (örn: Havuç, Araba)..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ekle</span>
            </button>
          </form>
        </div>

        {/* NLP Detection Verdict Banner */}
        {analysisResult?.outlierWord && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50/30 dark:from-rose-950/30 dark:to-slate-900 border border-rose-200 dark:border-rose-900/60">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/60 px-2.5 py-0.5 rounded-full">
                    Tespit Edilen Absürt Kelime
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Merkez Sapma Güveni: %{analysisResult.confidenceScore}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-3xl font-extrabold capitalize text-rose-600 dark:text-rose-400 tracking-tight">
                    {analysisResult.outlierWord.word}
                  </span>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    ({analysisResult.outlierWord.categoryLabel} kategorisi)
                  </span>
                </div>
              </div>

              {/* Metric stats */}
              <div className="grid grid-cols-2 gap-3 bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl border border-rose-100 dark:border-rose-900/40 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">
                    Küme İçi Benzerlik:
                  </span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    %{analysisResult.clusterAvgSimilarity}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">
                    Absürt Kelime Skoru:
                  </span>
                  <span className="text-base font-bold text-rose-600 dark:text-rose-400 font-mono">
                    %{analysisResult.outlierWord.avgSimilarity.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-4 leading-relaxed pt-3 border-t border-rose-200/60 dark:border-rose-900/40">
              {analysisResult.explanation.details}
            </p>
          </div>
        )}
      </div>

      {/* Visual Analytics */}
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
