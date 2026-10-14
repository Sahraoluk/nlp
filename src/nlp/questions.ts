export interface GameQuestion {
  id: string;
  level: number;
  question: string;
  targetCategory: string;
  categoryLabel: string;
  description: string;
  hint: string;
  // Pre-configured test presets for easy 1-click testing
  sampleValid: string[];
  sampleAbsurd: {
    words: string[];
    absurdWord: string;
    absurdReason: string;
  };
}

export const GAME_QUESTIONS: GameQuestion[] = [
  {
    id: 'q1_meyveler',
    level: 1,
    question: 'Bana 5 adet tatlı ve sulu meyve yazın.',
    targetCategory: 'meyve',
    categoryLabel: 'Meyveler',
    description: 'Ağaçlarda veya otsu bitkilerde yetişen tatlı gıdalar.',
    hint: 'Elma, muz, çilek, portakal, karpuz gibi meyveleri düşünebilirsiniz.',
    sampleValid: ['Elma', 'Armut', 'Muz', 'Çilek', 'Portakal'],
    sampleAbsurd: {
      words: ['Elma', 'Armut', 'Muz', 'Patates', 'Çilek'],
      absurdWord: 'Patates',
      absurdReason: 'Patates bir meyve değil, nişastalı bir kök sebzedir! Toprak altında yetişir ve tatlı bir meyve karakteristiği taşımaz.',
    },
  },
  {
    id: 'q2_hayvanlar',
    level: 2,
    question: 'Bana doğada yaşayan 5 memeli veya yabani hayvan yazın.',
    targetCategory: 'hayvan',
    categoryLabel: 'Hayvanlar & Canlılar',
    description: 'Fauna üyeleri, vahşi veya evcil omurgalı canlılar.',
    hint: 'Aslan, kaplan, kurt, fil, ayı gibi canlıları düşünebilirsiniz.',
    sampleValid: ['Aslan', 'Kaplan', 'Kurt', 'Ayı', 'Fil'],
    sampleAbsurd: {
      words: ['Aslan', 'Kaplan', 'Kurt', 'Uçak', 'Ayı'],
      absurdWord: 'Uçak',
      absurdReason: 'Uçak canlı bir hayvan değil, insan yapımı mekanik bir hava taşıtıdır! Hayvanlar biyolojik organizmalardır.',
    },
  },
  {
    id: 'q3_mutfak',
    level: 3,
    question: 'Bana mutfakta yemek pişirirken veya hazırlarken kullanılan 5 gereç yazın.',
    targetCategory: 'mutfak',
    categoryLabel: 'Mutfak Gereçleri',
    description: 'Yemek yapma, kesme, pişirme ve servis ekipmanları.',
    hint: 'Tencere, tava, bıçak, çatal, kaşık gibi eşyaları yazabilirsiniz.',
    sampleValid: ['Tencere', 'Tava', 'Bıçak', 'Kaşık', 'Fırın'],
    sampleAbsurd: {
      words: ['Tencere', 'Tava', 'Bıçak', 'Mars', 'Fırın'],
      absurdWord: 'Mars',
      absurdReason: 'Mars mutfakta kullanılan bir kap ya da alet değil, Güneş sistemindeki 4. gezegendir (Kızıl Gezegen)!',
    },
  },
  {
    id: 'q4_muzik',
    level: 4,
    question: 'Bana bir müzik topluluğunda çalınan 5 enstrüman yazın.',
    targetCategory: 'muzik',
    categoryLabel: 'Müzik Aletleri',
    description: 'Ses, melodi ve ritim üreten akustik veya telli çalgılar.',
    hint: 'Gitar, piyano, keman, flüt, davul gibi çalgıları düşünebilirsiniz.',
    sampleValid: ['Gitar', 'Piyano', 'Keman', 'Flüt', 'Çello'],
    sampleAbsurd: {
      words: ['Gitar', 'Piyano', 'Keman', 'Algoritma', 'Flüt'],
      absurdWord: 'Algoritma',
      absurdReason: 'Algoritma bir müzik aleti değil, yazılım ve matematik dünyasında problemleri çözmek için yazılan mantıksal işlem adımlarıdır!',
    },
  },
  {
    id: 'q5_tasitlar',
    level: 5,
    question: 'Bana insanları veya yükleri taşıyan 5 ulaşım aracı (taşıt) yazın.',
    targetCategory: 'tasit',
    categoryLabel: 'Taşıtlar & Araçlar',
    description: 'Karada, denizde veya havada yolculuk sağlayan vasıtalar.',
    hint: 'Otobüs, tren, uçak, gemi, helikopter gibi araçları yazabilirsiniz.',
    sampleValid: ['Otobüs', 'Tren', 'Uçak', 'Gemi', 'Helikopter'],
    sampleAbsurd: {
      words: ['Otobüs', 'Tren', 'Uçak', 'Pantolon', 'Gemi'],
      absurdWord: 'Pantolon',
      absurdReason: 'Pantolon bir ulaşım vasıtası değil, insanların bacaklarını örtmek için giydiği bir tekstil/giyim eşyasıdır!',
    },
  },
  {
    id: 'q6_astronomi',
    level: 6,
    question: 'Bana uzayda ve Güneş sisteminde bulunan 5 gök cismi yazın.',
    targetCategory: 'astronomi',
    categoryLabel: 'Uzay & Astronomi',
    description: 'Yıldızlar, gezegenler ve kozmik cisimler.',
    hint: 'Güneş, Ay, Mars, Yıldız, Gezegen, Jüpiter gibi kavramları yazabilirsiniz.',
    sampleValid: ['Güneş', 'Ay', 'Mars', 'Jüpiter', 'Yıldız'],
    sampleAbsurd: {
      words: ['Güneş', 'Ay', 'Yıldız', 'Gezegen', 'Avukat'],
      absurdWord: 'Avukat',
      absurdReason: 'Avukat gökyüzünde parlayan bir gök cismi değil, yasal davalarda hak savunan bir insan mesleğidir!',
    },
  },
  {
    id: 'q7_teknoloji',
    level: 7,
    question: 'Bana bilişim ve yazılım dünyasına ait 5 terim veya bileşen yazın.',
    targetCategory: 'teknoloji',
    categoryLabel: 'Bilişim & Yazılım',
    description: 'Kodlama, ağlar, donanım ve dijital sistemler.',
    hint: 'Bilgisayar, yazılım, algoritma, veritabanı, internet, sunucu gibi kavramlar.',
    sampleValid: ['Bilgisayar', 'Yazılım', 'Algoritma', 'İnternet', 'Veritabanı'],
    sampleAbsurd: {
      words: ['Bilgisayar', 'Yazılım', 'Algoritma', 'Çilek', 'Sunucu'],
      absurdWord: 'Çilek',
      absurdReason: 'Çilek bilişim dünyasına ait bir yazılım ya da donanım değil, tatlı kırmızı bir yaz meyvesidir!',
    },
  },
  {
    id: 'q8_spor',
    level: 8,
    question: 'Bana spor sahalarında veya kortlarda yapılan 5 spor dalı yazın.',
    targetCategory: 'spor',
    categoryLabel: 'Spor & Atletizm',
    description: 'Fiziksel aktiviteler, takım ve raket oyunları.',
    hint: 'Futbol, basketbol, voleybol, tenis gibi sporları düşünebilirsiniz.',
    sampleValid: ['Futbol', 'Basketbol', 'Voleybol', 'Tenis', 'Boks'],
    sampleAbsurd: {
      words: ['Futbol', 'Basketbol', 'Voleybol', 'Tenis', 'Sandalye'],
      absurdWord: 'Sandalye',
      absurdReason: 'Sandalye bir spor veya atletizm branşı değil, ev ve ofislerde üzerine oturulan durağan bir mobilyadır!',
    },
  },
  {
    id: 'q9_giyim',
    level: 9,
    question: 'Bana insanların üzerlerine giydiği 5 kıyafet veya giysi parçası yazın.',
    targetCategory: 'giyim',
    categoryLabel: 'Giyim & Moda',
    description: 'Vücudu örten ve koruyan tekstil ürünleri.',
    hint: 'Gömlek, pantolon, ceket, kazak, ayakkabı gibi giysiler.',
    sampleValid: ['Gömlek', 'Pantolon', 'Ceket', 'Kazak', 'Ayakkabı'],
    sampleAbsurd: {
      words: ['Gömlek', 'Pantolon', 'Ceket', 'Kazak', 'Balina'],
      absurdWord: 'Balina',
      absurdReason: 'Balina giyilebilir bir kıyafet parçası değil, okyanuslarda yaşayan devasa memeli bir deniz canlısıdır!',
    },
  },
  {
    id: 'q10_sebzeler',
    level: 10,
    question: 'Bana yemeklerde kullanılan veya toprakta yetişen 5 sebze yazın.',
    targetCategory: 'sebze',
    categoryLabel: 'Sebzeler',
    description: 'Yemeklik kök bitkiler ve yeşillikler.',
    hint: 'Patates, havuç, soğan, ıspanak, brokoli gibi sebzeleri yazabilirsiniz.',
    sampleValid: ['Patates', 'Havuç', 'Soğan', 'Ispanak', 'Brokoli'],
    sampleAbsurd: {
      words: ['Patates', 'Havuç', 'Soğan', 'Motosiklet', 'Brokoli'],
      absurdWord: 'Motosiklet',
      absurdReason: 'Motosiklet yenilebilir bir sebze değil, iki tekerlekli motorlu bir kara taşıtıdır!',
    },
  },
  {
    id: 'q11_mobilya',
    level: 11,
    question: 'Bana bir evin odalarında veya salonunda bulunan 5 mobilya yazın.',
    targetCategory: 'mobilya',
    categoryLabel: 'Mobilya & Ev',
    description: 'Evlerde kullanılan oturma, dinlenme ve çalışma eşyaları.',
    hint: 'Sandalye, masa, koltuk, yatak, dolap gibi eşyaları düşünebilirsiniz.',
    sampleValid: ['Sandalye', 'Masa', 'Koltuk', 'Yatak', 'Dolap'],
    sampleAbsurd: {
      words: ['Sandalye', 'Masa', 'Koltuk', 'Helikopter', 'Dolap'],
      absurdWord: 'Helikopter',
      absurdReason: 'Helikopter ev mobilyası değil, döner pervaneli büyük bir hava taşıtıdır!',
    },
  },
  {
    id: 'q12_meslekler',
    level: 12,
    question: 'Bana toplumda uzmanlık gerektiren 5 farklı meslek unvanı yazın.',
    targetCategory: 'meslek',
    categoryLabel: 'Meslekler & Roller',
    description: 'İnsanların mesleki kariyer ve uzmanlık alanları.',
    hint: 'Doktor, mühendis, öğretmen, avukat, mimar, hakim gibi meslekler.',
    sampleValid: ['Doktor', 'Mühendis', 'Öğretmen', 'Avukat', 'Mimar'],
    sampleAbsurd: {
      words: ['Doktor', 'Mühendis', 'Öğretmen', 'Karpuz', 'Mimar'],
      absurdWord: 'Karpuz',
      absurdReason: 'Karpuz bir insan mesleği değil, yazın tüketilen büyük tatlı bir meyvedir!',
    },
  },
  {
    id: 'q13_doga',
    level: 13,
    question: 'Bana yeryüzündeki tabii coğrafi alanlardan veya su kütlelerinden 5 tanesini yazın.',
    targetCategory: 'doga',
    categoryLabel: 'Doğa & Coğrafya',
    description: 'Dağlar, nehirler, denizler ve doğal yeryüzü şekilleri.',
    hint: 'Dağ, nehir, deniz, orman, çöl, vadi, göl gibi unsurlar.',
    sampleValid: ['Dağ', 'Nehir', 'Deniz', 'Orman', 'Çöl'],
    sampleAbsurd: {
      words: ['Dağ', 'Nehir', 'Deniz', 'Bilgisayar', 'Orman'],
      absurdWord: 'Bilgisayar',
      absurdReason: 'Bilgisayar doğal bir yeryüzü şekli değil, elektronik bir bilişim cihazıdır!',
    },
  },
  {
    id: 'q14_evcil_hayvanlar',
    level: 14,
    question: 'Bana evlerde veya bahçelerde insanlarla yaşayan 5 evcil hayvan yazın.',
    targetCategory: 'hayvan',
    categoryLabel: 'Hayvanlar & Canlılar',
    description: 'İnsanlarla dost yaşayan sevimli evcil canlılar.',
    hint: 'Kedi, köpek, kuş, tavşan, balık gibi evcil hayvanlar.',
    sampleValid: ['Kedi', 'Köpek', 'Kuş', 'Tavşan', 'At'],
    sampleAbsurd: {
      words: ['Kedi', 'Köpek', 'Kuş', 'Traktör', 'Tavşan'],
      absurdWord: 'Traktör',
      absurdReason: 'Traktör canlı bir evcil hayvan değil, tarımda kullanılan ağır motorlu bir araçtır!',
    },
  },
  {
    id: 'q15_yaz_meyveleri',
    level: 15,
    question: 'Bana sıcak havalarda ferahlatan 5 yaz meyvesi yazın.',
    targetCategory: 'meyve',
    categoryLabel: 'Meyveler',
    description: 'Sulu, tatlı ve ferahlatıcı yaz lezzetleri.',
    hint: 'Karpuz, kavun, şeftali, kiraz, çilek, erik gibi meyveler.',
    sampleValid: ['Karpuz', 'Kavun', 'Şeftali', 'Kiraz', 'Çilek'],
    sampleAbsurd: {
      words: ['Karpuz', 'Kavun', 'Şeftali', 'Soğan', 'Kiraz'],
      absurdWord: 'Soğan',
      absurdReason: 'Soğan tatlı bir yaz meyvesi değil, yemeklerde kullanılan acımsı bir kök sebzedir!',
    },
  },
  {
    id: 'q16_deniz_tasitlari',
    level: 16,
    question: 'Bana denizlerde ve göllerde yol alan 5 deniz/su taşıtı yazın.',
    targetCategory: 'tasit',
    categoryLabel: 'Taşıtlar & Araçlar',
    description: 'Suların üzerinde veya altında yüzen araçlar.',
    hint: 'Gemi, vapur, yat, tekne, bot, kano gibi vasıtalar.',
    sampleValid: ['Gemi', 'Vapur', 'Yat', 'Tekne', 'Bot'],
    sampleAbsurd: {
      words: ['Gemi', 'Vapur', 'Piyano', 'Tekne', 'Bot'],
      absurdWord: 'Piyano',
      absurdReason: 'Piyano suda yüzen bir taşıt değil, tuşlu büyük bir müzik enstrümanıdır!',
    },
  },
];

/**
 * Returns a randomized question different from current one
 */
export function getRandomQuestion(excludeId?: string): GameQuestion {
  const filtered = GAME_QUESTIONS.filter((q) => q.id !== excludeId);
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex] || GAME_QUESTIONS[0];
}
