import React, { useState } from 'react';
import { getWordDefinition, cosineSimilarity } from '../nlp/nlpEngine';
import { Scale, ArrowRightLeft, Sparkles, Check, AlertCircle } from 'lucide-react';

export const PairwiseComparer: React.FC = () => {
  const [wordA, setWordA] = useState('Elma');
  const [wordB, setWordB] = useState('Patates');

  const defA = getWordDefinition(wordA);
  const defB = getWordDefinition(wordB);

  const similarity = cosineSimilarity(defA.vector, defB.vector);
  const simPercent = Math.round(similarity * 100);
  const distance = (1 - similarity).toFixed(2);

  const quickPairs = [
    { a: 'Elma', b: 'Armut', note: 'İki Benzer Meyve' },
    { a: 'Elma', b: 'Patates', note: 'Meyve vs Kök Sebze (Kullanıcı Örneği)' },
    { a: 'Kedi', b: 'Köpek', note: 'İki Evcil Memeli' },
    { a: 'Aslan', b: 'Uçak', note: 'Vahşi Hayvan vs Taşıt' },
    { a: 'Gitar', b: 'Keman', note: 'İki Yaylı/Telli Çalgı' },
    { a: 'Gitar', b: 'Algoritma', note: 'Müzik Aleti vs Bilişim' },
  ];

  // Top semantic dimension matches
  const dimensionLabels = [
    'Tatlı Meyve',
    'Sebze / Kök',
    'Canlı / Hayvan',
    'Ulaşım Taşıtı',
    'Mutfak Gereci',
    'Uzay / Kozmos',
    'Bilişim / Teknoloji',
    'Müzik Enstrümanı',
    'Duygu / Zihin',
    'Giyim / Kıyafet',
    'Doğa / Coğrafya',
    'Meslek / Rol',
    'Mobilya / Ev',
    'Spor / Oyun',
    'Şeker / Tatlılık',
    'Metalik / Donanım',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              İkili Kelime Semantik Benzerlik Karşılaştırıcı
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Herhangi iki kelime arasındaki anlamsal vektör açısını ve kosinüs benzerliğini hesaplayın.
            </p>
          </div>
        </div>

        {/* Quick Pair Chips */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 text-xs border-b border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 text-xs shrink-0 mr-1">Karşılaştırma Örnekleri:</span>
          {quickPairs.map((pair, idx) => (
            <button
              key={idx}
              onClick={() => {
                setWordA(pair.a);
                setWordB(pair.b);
              }}
              className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer text-xs"
            >
              {pair.a} ↔ {pair.b} ({pair.note})
            </button>
          ))}
        </div>

        {/* Two Inputs Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              1. Kelime:
            </label>
            <input
              type="text"
              value={wordA}
              onChange={(e) => setWordA(e.target.value)}
              placeholder="1. kelimeyi girin..."
              className="w-full text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 capitalize"
            />
            <p className="text-[11px] text-slate-400">
              Kategori: <span className="font-medium text-slate-600 dark:text-slate-300 capitalize">{defA.category}</span> · {defA.description}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              2. Kelime:
            </label>
            <input
              type="text"
              value={wordB}
              onChange={(e) => setWordB(e.target.value)}
              placeholder="2. kelimeyi girin..."
              className="w-full text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 capitalize"
            />
            <p className="text-[11px] text-slate-400">
              Kategori: <span className="font-medium text-slate-600 dark:text-slate-300 capitalize">{defB.category}</span> · {defB.description}
            </p>
          </div>
        </div>

        {/* Gauge & Comparison Result Display */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Words comparison callout */}
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                NLP Vektör Karşılaştırma Sonucu
              </span>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold capitalize text-slate-900 dark:text-white">
                  {defA.word}
                </span>
                <ArrowRightLeft className="w-5 h-5 text-emerald-500" />
                <span className="text-2xl sm:text-3xl font-extrabold capitalize text-slate-900 dark:text-white">
                  {defB.word}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md">
                {simPercent >= 70
                  ? `"${defA.word}" ve "${defB.word}" güçlü bir semantik benzerliğe sahiptir (%${simPercent}). İkisi de benzer bağlamlarda ve ortak kategoride kullanılır.`
                  : simPercent >= 35
                  ? `"${defA.word}" ve "${defB.word}" orta seviyede zayıf bir anlamsal örtüşmeye sahiptir (%${simPercent}).`
                  : `"${defA.word}" ve "${defB.word}" birbirine son derece uzak iki farklı kavramdır (%${simPercent}). Bir kümede bir arada bulunmaları absürt bir aykırılık oluşturur.`}
              </p>
            </div>

            {/* Right: Circular score gauge */}
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-200 dark:text-slate-800 fill-none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={simPercent >= 70 ? '#10b981' : simPercent >= 35 ? '#f59e0b' : '#f43f5e'}
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - similarity)}
                    strokeLinecap="round"
                    className="fill-none transition-all duration-500 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                    %{simPercent}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                    Benzerlik
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">Kosinüs Değeri (cos θ):</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {similarity.toFixed(4)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Vektör Uzaklığı (1 - cos θ):</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {distance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Dimension Breakdown */}
        <div className="mt-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Semantik Boyut Karşılaştırması (16 Vektör Özelliği)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {dimensionLabels.map((label, idx) => {
              const valA = Math.round((defA.vector[idx] || 0) * 100);
              const valB = Math.round((defB.vector[idx] || 0) * 100);
              if (valA === 0 && valB === 0) return null; // hide irrelevant

              return (
                <div
                  key={label}
                  className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/60 dark:border-slate-800/80 space-y-1.5"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300 block">
                    {label}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{defA.word}:</span>
                      <span>%{valA}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${valA}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                      <span>{defB.word}:</span>
                      <span>%{valB}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-500 h-full rounded-full"
                        style={{ width: `${valB}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
