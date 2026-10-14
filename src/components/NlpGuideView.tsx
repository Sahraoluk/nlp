import React from 'react';
import {
  BookOpen,
  Binary,
  Compass,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Network,
} from 'lucide-react';

export const NlpGuideView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Eğitici NLP Rehberi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Doğal Dil İşleme (NLP) ile Absürt Kelimeler Nasıl Tespit Edilir?
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          İnsanlar için "Elma, Muz, Çilek" listesine eklenen "Patates" kelimesinin yanlış/absürt olduğunu fark etmek saniyenin onda biri kadar sürer. Peki bir bilgisayar veya yapay zeka algoritması bu anlamsal sapmayı nasıl anlar? İşte arka plandaki matematik:
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Word Embeddings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Binary className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            01. Kelime Vektörleri (Word Embeddings)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Bilgisayarlar harfleri doğrudan anlayamaz; kelimeleri çok boyutlu bir koordinat sisteminde sayılara (vektörlere) çeviririz. Örneğin bir kelimenin "tatlı meyve olma", "sebze olma", "taşıt olma" veya "canlı olma" katsayıları hesaplanır.
          </p>
          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg font-mono text-[11px] text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
            <code>Elma = [0.95 (meyve), 0.08 (sebze), 0.88 (tatlı)...]</code>
            <br />
            <code>Patates = [0.12 (meyve), 0.96 (sebze), 0.10 (tatlı)...]</code>
          </div>
        </div>

        {/* Step 2: Cosine Similarity */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            02. Kosinüs Benzerliği (Cosine Similarity)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            İki kelime arasındaki anlamsal benzerlik, bu iki vektör arasındaki açının kosinüsüyle ölçülür. Açı sıfıra yaklaştıkça kosinüs 1'e yaklaşır (aynı anlam); açı dikleştikçe 0'a iner (tamamen ilgisiz).
          </p>
          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg font-mono text-[11px] text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
            <code>cos(θ) = (A · B) / (||A|| × ||B||)</code>
            <br />
            <code>cos(Elma, Muz) = 0.94 (Yüksek Benzerlik)</code>
            <br />
            <code>cos(Elma, Patates) = 0.18 (Zayıf / Uyumsuz)</code>
          </div>
        </div>

        {/* Step 3: Cluster Centroid */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Network className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            03. Küme Merkez Noktası (Centroid)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Bir kelime grubu verildiğinde, sistem tüm kelimelerin vektörlerinin ağırlıklı ortalamasını alarak ortak anlamsal merkez noktasını (Centroid) belirler. Çoğunluk meyve ise merkez noktası "Meyve" bölgesinde yoğunlaşır.
          </p>
          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg font-mono text-[11px] text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
            <code>C = (V_Elma + V_Muz + V_Çilek + V_Portakal + V_Patates) / 5</code>
          </div>
        </div>

        {/* Step 4: Outlier Detection */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            04. Absürt Kelime (Aykırı Değer / Outlier)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Her kelimenin diğer tüm kelimelere olan ortalama kosinüs benzerliği ve merkez noktaya uzaklığı ölçülür. Ortalaması küme ortalamasından radikal biçimde düşük olan kelime "Absürt / Aykırı Öğe" olarak işaretlenir.
          </p>
          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg font-mono text-[11px] text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
            <code>Ortalama Küme Benzerliği = %82</code>
            <br />
            <code className="text-rose-600 dark:text-rose-400">Patates Sapması = %18 (Outlier Tespit Edildi!)</code>
          </div>
        </div>
      </div>

      {/* Real-World Applications */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Bu NLP Mimarisi Günlük Hayatta Nerelerde Kullanılır?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-slate-900 dark:text-white block mb-1">
              Anlamsal Arama (Semantic Search)
            </span>
            Kullanıcı "lezzetli tatlı sarı gıda" yazdığında tam kelime eşleşmesi olmasa bile "Muz" sonucunu getirebilir.
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-slate-900 dark:text-white block mb-1">
              Spam & Sahtecilik Filtreleme
            </span>
            Bir ürün yorumları veya makale metni içinde bağlamla uyuşmayan gizli reklam veya absürt kelimeleri anında yakalar.
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-slate-900 dark:text-white block mb-1">
              Öneri Sistemleri & LLM'ler
            </span>
            Kullanıcının okuduğu makaleler veya dinlediği şarkılarla benzer anlamsal uzaydaki yeni içerikleri önerir.
          </div>
        </div>
      </div>
    </div>
  );
};
