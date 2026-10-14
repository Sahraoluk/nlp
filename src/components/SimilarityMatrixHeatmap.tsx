import React, { useState } from 'react';
import { WordAnalysis } from '../nlp/nlpEngine.ts';

interface SimilarityMatrixHeatmapProps {
  words: WordAnalysis[];
  pairwiseMatrix: { wordA: string; wordB: string; similarity: number }[];
}

export const SimilarityMatrixHeatmap: React.FC<SimilarityMatrixHeatmapProps> = ({
  words,
  pairwiseMatrix,
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ wordA: string; wordB: string; sim: number } | null>(null);

  // Quick lookup map: "wordA:wordB" -> similarity
  const simMap: Record<string, number> = {};
  for (const item of pairwiseMatrix) {
    simMap[`${item.wordA.toLowerCase()}:${item.wordB.toLowerCase()}`] = item.similarity;
  }

  const getSim = (wA: string, wB: string): number => {
    return simMap[`${wA.toLowerCase()}:${wB.toLowerCase()}`] ?? 0;
  };

  // Color generator based on similarity score (0.0 to 1.0)
  const getCellBg = (sim: number, isSelf: boolean) => {
    if (isSelf) return 'bg-slate-200 dark:bg-slate-800 text-slate-400';
    if (sim >= 0.85) return 'bg-emerald-600 text-white font-semibold';
    if (sim >= 0.70) return 'bg-emerald-500/80 text-white font-medium';
    if (sim >= 0.50) return 'bg-teal-500/60 text-white font-medium';
    if (sim >= 0.30) return 'bg-amber-400/40 text-slate-800 dark:text-slate-100';
    if (sim >= 0.15) return 'bg-rose-500/30 text-rose-800 dark:text-rose-200';
    return 'bg-rose-500/60 text-white font-medium';
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Kosinüs Benzerliği Isı Matrisi (Cosine Matrix)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Kelimeler arasındaki ikili anlamsal açı ve kosinüs benzerlik oranları
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="text-xs mr-1">Benzerlik:</span>
          <span className="px-1.5 py-0.5 rounded bg-rose-500/50 text-white text-[10px]">%0-20</span>
          <span className="px-1.5 py-0.5 rounded bg-amber-400/40 text-slate-800 dark:text-white text-[10px]">%30-50</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-medium">%80-100</span>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="p-2 border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-medium text-slate-400 text-left">
                Semantik / Kelime
              </th>
              {words.map((w) => (
                <th
                  key={`th-${w.word}`}
                  className={`p-2 border border-slate-200/60 dark:border-slate-800 text-center font-semibold capitalize ${
                    w.isOutlier
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>{w.word}</span>
                    {w.isOutlier && <span className="text-[9px] text-rose-500">(Absürt)</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {words.map((rowWord) => (
              <tr key={`row-${rowWord.word}`}>
                <td
                  className={`p-2 border border-slate-200/60 dark:border-slate-800 font-semibold capitalize whitespace-nowrap ${
                    rowWord.isOutlier
                      ? 'bg-rose-50/70 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300'
                      : 'bg-slate-50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{rowWord.word}</span>
                    <span className="text-[10px] font-normal text-slate-400 font-mono">
                      (Ort: %{rowWord.avgSimilarity.toFixed(0)})
                    </span>
                  </div>
                </td>

                {words.map((colWord) => {
                  const isSelf = rowWord.word === colWord.word;
                  const sim = getSim(rowWord.word, colWord.word);
                  const isHovered =
                    hoveredCell?.wordA === rowWord.word && hoveredCell?.wordB === colWord.word;

                  return (
                    <td
                      key={`cell-${rowWord.word}-${colWord.word}`}
                      onMouseEnter={() =>
                        setHoveredCell({ wordA: rowWord.word, wordB: colWord.word, sim })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`p-2 border border-slate-200/60 dark:border-slate-800 text-center font-mono transition-transform cursor-pointer ${
                        getCellBg(sim, isSelf)
                      } ${isHovered ? 'ring-2 ring-slate-900 dark:ring-white scale-105 z-10' : ''}`}
                    >
                      {isSelf ? '1.00' : sim.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hoveredCell && hoveredCell.wordA !== hoveredCell.wordB && (
        <div className="mt-3 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200/60 dark:border-slate-800 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 dark:text-white capitalize">
              {hoveredCell.wordA}
            </span>
            <span className="text-slate-400">↔</span>
            <span className="font-semibold text-slate-900 dark:text-white capitalize">
              {hoveredCell.wordB}
            </span>
          </div>
          <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Kosinüs Benzerliği: {(hoveredCell.sim * 100).toFixed(1)}% ({hoveredCell.sim.toFixed(3)})
          </div>
        </div>
      )}
    </div>
  );
};
