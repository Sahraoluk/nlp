import React, { useState, useEffect, useRef } from 'react';
import { GAME_QUESTIONS, GameQuestion, getRandomQuestion } from '../nlp/questions';
import { evaluateGameSubmission, GameEvaluationResult } from '../nlp/nlpEngine';
import { sounds } from '../utils/audio';
import {
  Heart,
  Trophy,
  Flame,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Volume2,
  VolumeX,
  Shuffle,
  Wand2,
  Layers,
  ListFilter,
} from 'lucide-react';

export const NlpQuizGame: React.FC = () => {
  // Random starting question so each session starts with a different question!
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() =>
    Math.floor(Math.random() * GAME_QUESTIONS.length)
  );
  const [words, setWords] = useState<string[]>(['', '', '', '', '']);
  const [evaluation, setEvaluation] = useState<GameEvaluationResult | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>([]);
  const [showCategorySelector, setShowCategorySelector] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const currentQuestion: GameQuestion = GAME_QUESTIONS[currentQuestionIndex] || GAME_QUESTIONS[0];

  // Focus on 1st input on question change
  useEffect(() => {
    setWords(['', '', '', '', '']);
    setEvaluation(null);
    setHasEvaluated(false);
    setShowHint(false);
    inputRefs.current[0]?.focus();
  }, [currentQuestionIndex]);

  const handleWordChange = (index: number, value: string) => {
    const updated = [...words];
    updated[index] = value;
    setWords(updated);
    if (hasEvaluated) {
      setHasEvaluated(false);
      setEvaluation(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < 4) {
        inputRefs.current[index + 1]?.focus();
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    const cleanWords = words.map((w) => w.trim()).filter((w) => w.length > 0);
    if (cleanWords.length < 5) {
      alert('Lütfen 5 kelimenin tamamını doldurunuz.');
      return;
    }

    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      const result = evaluateGameSubmission(words, currentQuestion.targetCategory);
      setEvaluation(result);
      setHasEvaluated(true);

      if (result.isSuccess) {
        if (soundEnabled) sounds.playSuccess();
        setScore((prev) => prev + 150 + streak * 25);
        setStreak((prev) => prev + 1);
        setAnsweredQuestionIds((prev) =>
          prev.includes(currentQuestion.id) ? prev : [...prev, currentQuestion.id]
        );
      } else {
        if (soundEnabled) sounds.playError();
        setStreak(0);
        setLives((prev) => {
          const nextLives = Math.max(0, prev - 1);
          if (nextLives === 0) {
            setIsGameOver(true);
          }
          return nextLives;
        });
      }
    }, 280);
  };

  // Switch to another random question
  const handleRandomNextQuestion = () => {
    // Pick a question different from current
    const nextQ = getRandomQuestion(currentQuestion.id);
    const nextIdx = GAME_QUESTIONS.findIndex((q) => q.id === nextQ.id);
    setCurrentQuestionIndex(nextIdx >= 0 ? nextIdx : 0);
  };

  const handleSelectSpecificQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowCategorySelector(false);
  };

  const handleFillValidSample = () => {
    setWords([...currentQuestion.sampleValid]);
    setHasEvaluated(false);
    setEvaluation(null);
  };

  const handleFillAbsurdSample = () => {
    setWords([...currentQuestion.sampleAbsurd.words]);
    setHasEvaluated(false);
    setEvaluation(null);
  };

  const handleRestartGame = () => {
    setScore(0);
    setStreak(0);
    setLives(3);
    setIsGameOver(false);
    // Pick another random question on restart!
    handleRandomNextQuestion();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game HUD Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
        {/* Lives */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-1 hidden sm:inline">
            Can:
          </span>
          {[1, 2, 3].map((heartIndex) => (
            <Heart
              key={heartIndex}
              className={`w-5 h-5 transition-transform duration-200 ${
                heartIndex <= lives
                  ? 'fill-rose-500 text-rose-500 scale-100'
                  : 'fill-slate-200 dark:fill-slate-800 text-slate-300 dark:text-slate-700 scale-90'
              }`}
            />
          ))}
        </div>

        {/* Score & Streak */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-slate-500 dark:text-slate-400 text-xs hidden sm:inline">Skor:</span>
            <span className="font-bold text-slate-900 dark:text-white tabular-nums">{score}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-slate-500 dark:text-slate-400 text-xs hidden sm:inline">Seri:</span>
            <span className="font-bold text-orange-500 tabular-nums">{streak}</span>
          </div>
        </div>

        {/* Sound & Skip/Random Button */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Quick "Başka Soruya Geç" Action in HUD */}
          <button
            onClick={handleRandomNextQuestion}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
            title="Rastgele başka bir soruya geç"
          >
            <Shuffle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Başka Soruya Geç</span>
            <span className="sm:hidden">Başka Soru</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Game Over Screen */}
      {isGameOver ? (
        <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-3xl p-8 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Oyun Bitti!</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Tüm canlarınızı tükettiniz. Doğal Dil İşleme analizinde absürt kelimelere takıldınız!
            </p>
            <p className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-2">
              Toplam Puanınız: {score}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestartGame}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Yeniden Başla (Yeni Soruyla)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Question Banner & Navigation */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Hedef Kategori: {currentQuestion.categoryLabel}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <button
                  onClick={() => setShowCategorySelector(!showCategorySelector)}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer underline decoration-dotted"
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>Kategori Seç ({GAME_QUESTIONS.length} Soru)</span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs">
                {/* Secondary Button to switch question */}
                <button
                  onClick={handleRandomNextQuestion}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Başka Soru Getir</span>
                </button>

                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'İpucunu Gizle' : 'İpucu Gör'}</span>
                </button>
              </div>
            </div>

            {/* Category Dropdown Modal / Drawer */}
            {showCategorySelector && (
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 my-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    İstediğiniz Bir Konuyu Seçin:
                  </span>
                  <button
                    onClick={handleRandomNextQuestion}
                    className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Shuffle className="w-3 h-3" />
                    <span>Rastgele Seç</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {GAME_QUESTIONS.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => handleSelectSpecificQuestion(idx)}
                      className={`p-2 rounded-lg text-left truncate transition-colors cursor-pointer ${
                        currentQuestionIndex === idx
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="block font-medium truncate">{q.categoryLabel}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {currentQuestion.question}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {currentQuestion.description}
            </p>

            {showHint && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2 animate-in fade-in">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{currentQuestion.hint}</span>
              </div>
            )}
          </div>

          {/* Quick Test Buttons for Instant Demonstrations */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-400 text-xs mr-1">Hızlı Test Doldur:</span>
            <button
              type="button"
              onClick={handleFillAbsurdSample}
              className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
              title="Absürt kelime içeren hatalı örneği test et"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>Absürt Kelime Testi ({currentQuestion.sampleAbsurd.absurdWord})</span>
            </button>

            <button
              type="button"
              onClick={handleFillValidSample}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
              title="Tüm kelimelerin doğru olduğu örneği test et"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>5 Doğru Kelime Doldur</span>
            </button>
          </div>

          {/* 5 Word Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {[0, 1, 2, 3, 4].map((index) => {
              const wordVal = words[index];
              const wordEval = evaluation?.wordEvaluations[index];

              let inputBorder =
                'border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500';
              if (hasEvaluated && wordEval) {
                inputBorder = wordEval.isAbsurd
                  ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500'
                  : 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500';
              }

              return (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>{index + 1}. Kelime</span>
                    {hasEvaluated && wordEval && (
                      <span
                        className={`text-[10px] font-bold ${
                          wordEval.isAbsurd
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {wordEval.isAbsurd ? 'ABSÜRT' : 'UYUMLU'}
                      </span>
                    )}
                  </div>

                  <input
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    value={wordVal}
                    onChange={(e) => handleWordChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    placeholder={`Kelime ${index + 1}...`}
                    className={`w-full text-sm font-semibold px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white capitalize transition-all focus:outline-none ${inputBorder}`}
                  />

                  {hasEvaluated && wordEval && (
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {wordEval.isAbsurd ? (
                        <span className="text-rose-600 dark:text-rose-400">
                          {wordEval.categoryLabel}
                        </span>
                      ) : (
                        <span>%{wordEval.similarityToTarget} Uyum</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Button & Switch Question Option */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleRandomNextQuestion}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto py-1"
            >
              <Shuffle className="w-3.5 h-3.5 text-emerald-500" />
              <span>Bu Soruyu Geç / Başka Soru İste</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={isEvaluating}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Wand2 className="w-4 h-4" />
              <span>{isEvaluating ? 'Semantik Analiz Yapılıyor...' : 'Cevabı NLP ile Kontrol Et'}</span>
            </button>
          </div>

          {/* Evaluation Result Feedback Card */}
          {hasEvaluated && evaluation && (
            <div
              className={`p-6 rounded-2xl border transition-all animate-in fade-in duration-200 ${
                evaluation.isSuccess
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-100'
              }`}
            >
              <div className="flex items-start gap-4">
                {evaluation.isSuccess ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-7 h-7 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}

                <div className="space-y-3 flex-1">
                  <div>
                    <h3 className="text-lg font-bold">
                      {evaluation.summaryMessage}
                    </h3>
                    <p className="text-xs sm:text-sm mt-1 opacity-90 leading-relaxed font-sans whitespace-pre-line">
                      {evaluation.explanationDetails}
                    </p>
                  </div>

                  {/* Individual breakdown list if absurd words exist */}
                  {!evaluation.isSuccess && (
                    <div className="space-y-1.5 pt-2 border-t border-rose-200/80 dark:border-rose-900/60">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                        Neden Yanlış Olduğunun NLP Açıklaması:
                      </h4>
                      {evaluation.wordEvaluations.map((w, idx) => (
                        <div
                          key={idx}
                          className={`text-xs p-2 rounded-lg flex items-center justify-between ${
                            w.isAbsurd
                              ? 'bg-rose-100/80 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200 font-semibold'
                              : 'bg-white/60 dark:bg-black/20 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{idx + 1}.</span>
                            <span className="capitalize">{w.word}</span>
                            <span className="text-[11px] opacity-75 font-normal">
                              ({w.categoryLabel})
                            </span>
                          </div>
                          <div className="text-[11px] font-mono">
                            {w.isAbsurd ? (
                              <span className="text-rose-700 dark:text-rose-300">
                                ❌ Absürt! (Benzerlik: %{w.similarityToTarget})
                              </span>
                            ) : (
                              <span className="text-emerald-600 dark:text-emerald-400">
                                ✅ Doğru (Uyum: %{w.similarityToTarget})
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Next Step / Action Button */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={handleRandomNextQuestion}
                      className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Farklı Bir Soruya Geç</span>
                    </button>

                    {evaluation.isSuccess ? (
                      <button
                        onClick={handleRandomNextQuestion}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Sonraki Soruya Geç (+150 Puan)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                        Absürt olan kelimeyi yukarıdan değiştirip tekrar "NLP ile Kontrol Et"e basın!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
