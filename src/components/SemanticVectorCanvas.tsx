import React, { useState } from 'react';
import { WordAnalysis } from '../nlp/nlpEngine.ts';
import { Info, HelpCircle } from 'lucide-react';

interface SemanticVectorCanvasProps {
  words: WordAnalysis[];
  outlierWord: WordAnalysis | null;
  dominantCategoryLabel: string;
}

export const SemanticVectorCanvas: React.FC<SemanticVectorCanvasProps> = ({
  words,
  outlierWord,
  dominantCategoryLabel,
}) => {
  const [hoveredWord, setHoveredWord] = useState<WordAnalysis | null>(null);

  // SVG viewBox is 600x420, center is (300, 210)
  const centerX = 300;
  const centerY = 210;

  // Compute bounding box / radius of inliers to draw cluster perimeter
  const inliers = words.filter((w) => !w.isOutlier);
  let inlierAvgX = 0;
  let inlierAvgY = 0;
  if (inliers.length > 0) {
    inlierAvgX = inliers.reduce((acc, w) => acc + w.coords2D.x, 0) / inliers.length;
    inlierAvgY = inliers.reduce((acc, w) => acc + w.coords2D.y, 0) / inliers.length;
  }
  const clusterCenterX = centerX + inlierAvgX;
  const clusterCenterY = centerY + inlierAvgY;

  // Find max distance from cluster center for radius
  let clusterRadius = 60;
  for (const w of inliers) {
    const dx = centerX + w.coords2D.x - clusterCenterX;
    const dy = centerY + w.coords2D.y - clusterCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist + 36 > clusterRadius) clusterRadius = dist + 36;
  }
  clusterRadius = Math.max(55, Math.min(130, clusterRadius));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            2D Semantik Koordinat Haritası (Vektör Uzayı)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            16-boyutlu semantik özellik uzayının 2 temel bileşen (PCA) üzerine izdüşümü
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Küme İçi ({dominantCategoryLabel})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Absürt / Aykırı Değer</span>
          </span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative mt-4 bg-slate-50/60 dark:bg-slate-950/60 rounded-xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden">
        <svg
          viewBox="0 0 600 420"
          className="w-full h-auto max-h-[460px] select-none"
        >
          <defs>
            {/* Grid pattern */}
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-slate-200/70 dark:text-slate-800/60"
              />
            </pattern>
            {/* Radial gradient for cluster area */}
            <radialGradient id="clusterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
              <stop offset="70%" stopColor="#10b981" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
            {/* Outlier Warning ring */}
            <radialGradient id="outlierGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid background */}
          <rect width="600" height="420" fill="url(#grid)" />

          {/* Coordinate axes */}
          <line
            x1="40"
            y1={centerY}
            x2="560"
            y2={centerY}
            stroke="currentColor"
            strokeWidth="1"
            className="text-slate-300 dark:text-slate-700"
            strokeDasharray="4 4"
          />
          <line
            x1={centerX}
            y1="20"
            x2={centerX}
            y2="400"
            stroke="currentColor"
            strokeWidth="1"
            className="text-slate-300 dark:text-slate-700"
            strokeDasharray="4 4"
          />

          <text
            x="565"
            y={centerY + 4}
            className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
            textAnchor="start"
          >
            PCA-1
          </text>
          <text
            x={centerX}
            y="14"
            className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
            textAnchor="middle"
          >
            PCA-2
          </text>

          {/* Cluster Hull / Ellipse */}
          {inliers.length > 0 && (
            <g>
              <circle
                cx={clusterCenterX}
                cy={clusterCenterY}
                r={clusterRadius}
                fill="url(#clusterGlow)"
                stroke="#10b981"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                className="transition-all duration-300 opacity-80"
              />
              <text
                x={clusterCenterX}
                y={clusterCenterY - clusterRadius - 8}
                textAnchor="middle"
                className="text-[10px] fill-emerald-600 dark:fill-emerald-400 font-medium tracking-wide uppercase"
              >
                {dominantCategoryLabel} Kümesi
              </text>
            </g>
          )}

          {/* Centroid marker */}
          <g>
            <circle
              cx={clusterCenterX}
              cy={clusterCenterY}
              r="4"
              fill="#059669"
              className="dark:fill-emerald-400"
            />
            <text
              x={clusterCenterX + 7}
              y={clusterCenterY + 3}
              className="text-[9px] fill-emerald-700 dark:fill-emerald-300 font-mono"
            >
              Merkez (C)
            </text>
          </g>

          {/* Connecting vector lines between words and cluster center */}
          {words.map((w) => {
            const px = centerX + w.coords2D.x;
            const py = centerY + w.coords2D.y;
            const isHovered = hoveredWord?.word === w.word;

            if (w.isOutlier) {
              // Outlier connection line (dashed red/amber)
              return (
                <g key={`line-outlier-${w.word}`}>
                  <line
                    x1={clusterCenterX}
                    y1={clusterCenterY}
                    x2={px}
                    y2={py}
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    className="opacity-75"
                  />
                  {/* Distance label on midpoint */}
                  <rect
                    x={(clusterCenterX + px) / 2 - 24}
                    y={(clusterCenterY + py) / 2 - 10}
                    width="48"
                    height="18"
                    rx="4"
                    className="fill-rose-100 dark:fill-rose-950 stroke-rose-300 dark:stroke-rose-800"
                    strokeWidth="0.8"
                  />
                  <text
                    x={(clusterCenterX + px) / 2}
                    y={(clusterCenterY + py) / 2 + 2}
                    textAnchor="middle"
                    className="text-[9px] fill-rose-700 dark:fill-rose-300 font-mono font-medium"
                  >
                    d = {w.distanceToCentroid.toFixed(2)}
                  </text>
                </g>
              );
            }

            // Normal inlier connection
            return (
              <line
                key={`line-${w.word}`}
                x1={clusterCenterX}
                y1={clusterCenterY}
                x2={px}
                y2={py}
                stroke={isHovered ? '#10b981' : '#cbd5e1'}
                strokeWidth={isHovered ? 1.5 : 0.8}
                className="dark:stroke-slate-700 transition-all opacity-60"
              />
            );
          })}

          {/* Outlier halo */}
          {outlierWord && (
            <circle
              cx={centerX + outlierWord.coords2D.x}
              cy={centerY + outlierWord.coords2D.y}
              r="28"
              fill="url(#outlierGlow)"
              stroke="#f43f5e"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              className="animate-pulse"
            />
          )}

          {/* Word Nodes */}
          {words.map((w) => {
            const px = centerX + w.coords2D.x;
            const py = centerY + w.coords2D.y;
            const isHovered = hoveredWord?.word === w.word;
            const isOutlier = w.isOutlier;

            return (
              <g
                key={w.word}
                className="cursor-pointer transition-transform"
                onMouseEnter={() => setHoveredWord(w)}
                onMouseLeave={() => setHoveredWord(null)}
              >
                {/* Node circle */}
                <circle
                  cx={px}
                  cy={py}
                  r={isHovered ? 9 : 7}
                  fill={isOutlier ? '#f43f5e' : '#10b981'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="shadow-sm transition-all"
                />

                {/* Word Label Pill */}
                <g transform={`translate(${px}, ${py + 18})`}>
                  <rect
                    x={-45}
                    y={-10}
                    width={90}
                    height={20}
                    rx={6}
                    className={`transition-colors ${
                      isOutlier
                        ? 'fill-rose-600 text-white shadow-xs'
                        : isHovered
                        ? 'fill-slate-900 dark:fill-white text-white dark:text-slate-900 shadow-xs'
                        : 'fill-white dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-700'
                    }`}
                    strokeWidth={isOutlier || isHovered ? 0 : 1}
                  />
                  <text
                    x={0}
                    y={3}
                    textAnchor="middle"
                    className={`text-[10px] font-semibold tracking-tight ${
                      isOutlier
                        ? 'fill-white'
                        : isHovered
                        ? 'fill-white dark:fill-slate-900'
                        : 'fill-slate-800 dark:fill-slate-100'
                    }`}
                  >
                    {w.word}
                  </text>
                </g>

                {/* Similarity Badge */}
                <text
                  x={px}
                  y={py - 12}
                  textAnchor="middle"
                  className={`text-[9px] font-mono font-medium ${
                    isOutlier
                      ? 'fill-rose-600 dark:fill-rose-400 font-bold'
                      : 'fill-slate-500 dark:fill-slate-400'
                  }`}
                >
                  %{w.avgSimilarity.toFixed(0)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover inspection card overlay */}
        {hoveredWord && (
          <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md text-xs max-w-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-slate-900 dark:text-white capitalize text-sm">
                {hoveredWord.word}
              </span>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  hoveredWord.isOutlier
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                }`}
              >
                {hoveredWord.isOutlier ? 'Absürt (Aykırı Değer)' : 'Küme Üyesi'}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {hoveredWord.description}
            </p>
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 font-mono text-[11px]">
              <div>
                <span className="text-slate-400 block text-[9px]">Grup Benzerliği:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  %{hoveredWord.avgSimilarity.toFixed(1)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">Merkeze Uzaklık:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {hoveredWord.distanceToCentroid.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800/60">
        <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Grafikteki noktalar kelimelerin anlamsal uzaydaki konumudur. Küme merkezine yakın olanlar birbiriyle yüksek anlamsal bağ taşırken, çemberin çok uzağında kalan kırmızı nokta (<strong>{outlierWord?.word}</strong>) grubun anlamsal bütünlüğünü bozan absürt öğedir.
        </p>
      </div>
    </div>
  );
};
