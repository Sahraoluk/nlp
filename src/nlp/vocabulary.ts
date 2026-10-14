export interface WordDefinition {
  word: string;
  category: string;
  description: string;
  vector: number[];
}

// 16-dimensional semantic feature space:
// [0]: food_fruit (tatlı meyve)
// [1]: food_vegetable (sebze / kök)
// [2]: animal_creature (hayvan / canlı)
// [3]: vehicle_transport (ulaşım / araç)
// [4]: kitchen_tool (mutfak gereci)
// [5]: celestial_space (uzay / gökbilim)
// [6]: digital_tech (bilişim / teknoloji)
// [7]: musical_instrument (müzik aleti)
// [8]: emotion_mind (duygu / psikoloji)
// [9]: clothing_apparel (giyim / kuşam)
// [10]: nature_landscape (doğa / coğrafya)
// [11]: profession_role (meslek / insan rolü)
// [12]: domestic_furniture (ev eşyası / mobilya)
// [13]: sports_athletics (spor / atletizm)
// [14]: sweet_taste (tatlı lezzet)
// [15]: metallic_industrial (metal / sanayi)

export const SEMANTIC_CATEGORIES: Record<string, { label: string; icon: string; description: string }> = {
  meyve: { label: 'Meyveler', icon: 'Apple', description: 'Ağaçta veya bitkide yetişen tatlı ve sulu besinler' },
  sebze: { label: 'Sebzeler', icon: 'Carrot', description: 'Yemeklik bitkiler, yeşillikler ve kök sebzeler' },
  hayvan: { label: 'Hayvanlar & Canlılar', icon: 'Footprints', description: 'Vahşi, evcil veya sucul fauna üyeleri' },
  tasit: { label: 'Taşıtlar & Araçlar', icon: 'Car', description: 'İnsan ve yük taşıyan mekanik ulaşım vasıtaları' },
  mutfak: { label: 'Mutfak Gereçleri', icon: 'Utensils', description: 'Yemek hazırlama, pişirme ve servis aletleri' },
  astronomi: { label: 'Uzay & Astronomi', icon: 'Orbit', description: 'Gök cisimleri, gezegenler ve kozmik olgular' },
  teknoloji: { label: 'Bilişim & Yazılım', icon: 'Cpu', description: 'Dijital sistemler, algoritmalar ve donanım' },
  muzik: { label: 'Müzik Aletleri', icon: 'Music', description: 'Ses ve melodi üreten enstrümanlar' },
  duygu: { label: 'Duygular & Psikoloji', icon: 'Heart', description: 'Ruhsal durumlar, hisler ve hissiyat' },
  giyim: { label: 'Giyim & Kıyafet', icon: 'Shirt', description: 'Giyilen giysiler, aksesuarlar ve koruyucular' },
  doga: { label: 'Doğa & Coğrafya', icon: 'Mountain', description: 'Yeryüzü şekilleri, su kaynakları ve tabii unsurlar' },
  meslek: { label: 'Meslekler & Roller', icon: 'Briefcase', description: 'İnsan uzmanlık alanları ve iş kolları' },
  mobilya: { label: 'Mobilya & Ev', icon: 'Armchair', description: 'Oturma, dinlenme ve ev donatı eşyaları' },
  spor: { label: 'Spor & Oyunlar', icon: 'Trophy', description: 'Fiziksel aktiviteler, yarışmalar ve takım oyunları' },
};

export const VOCABULARY_DATABASE: Record<string, WordDefinition> = {
  // MEYVELER
  elma: {
    word: 'elma',
    category: 'meyve',
    description: 'Ağaçta yetişen, tatlı veya ekşi popüler kabuklu meyve',
    vector: [0.95, 0.08, 0.01, 0.0, 0.05, 0.0, 0.0, 0.0, 0.0, 0.0, 0.25, 0.0, 0.0, 0.0, 0.88, 0.0],
  },
  armut: {
    word: 'armut',
    category: 'meyve',
    description: 'Gül familyasından yumuşak çekirdekli tatlı ağaç meyvesi',
    vector: [0.93, 0.09, 0.01, 0.0, 0.04, 0.0, 0.0, 0.0, 0.0, 0.0, 0.24, 0.0, 0.0, 0.0, 0.86, 0.0],
  },
  muz: {
    word: 'muz',
    category: 'meyve',
    description: 'Tropikal bölgelerde yetişen sarı kabuklu lifli tatlı meyve',
    vector: [0.96, 0.07, 0.01, 0.0, 0.03, 0.0, 0.0, 0.0, 0.0, 0.0, 0.22, 0.0, 0.0, 0.0, 0.92, 0.0],
  },
  cilek: {
    word: 'çilek',
    category: 'meyve',
    description: 'Kırmızı renkli, kokulu ve lezzetli otsu bitki meyvesi',
    vector: [0.94, 0.12, 0.01, 0.0, 0.05, 0.0, 0.0, 0.0, 0.0, 0.0, 0.26, 0.0, 0.0, 0.0, 0.94, 0.0],
  },
  portakal: {
    word: 'portakal',
    category: 'meyve',
    description: 'Turunçgillerden, C vitamini zengini sulu küresel meyve',
    vector: [0.95, 0.06, 0.01, 0.0, 0.05, 0.0, 0.0, 0.0, 0.0, 0.0, 0.23, 0.0, 0.0, 0.0, 0.89, 0.0],
  },
  karpuz: {
    word: 'karpuz',
    category: 'meyve',
    description: 'Kabakgillerden büyük, sulu ve kırmızı etli yaz meyvesi',
    vector: [0.92, 0.18, 0.01, 0.0, 0.04, 0.0, 0.0, 0.0, 0.0, 0.0, 0.30, 0.0, 0.0, 0.0, 0.91, 0.0],
  },
  kiraz: {
    word: 'kiraz',
    category: 'meyve',
    description: 'Çekirdekli kırmızı, sulu ve saplı yaz meyvesi',
    vector: [0.93, 0.06, 0.01, 0.0, 0.03, 0.0, 0.0, 0.0, 0.0, 0.0, 0.25, 0.0, 0.0, 0.0, 0.93, 0.0],
  },
  seftali: {
    word: 'şeftali',
    category: 'meyve',
    description: 'Tüylü kabuklu, tatlı ve bol sulu çekirdekli meyve',
    vector: [0.94, 0.07, 0.01, 0.0, 0.04, 0.0, 0.0, 0.0, 0.0, 0.0, 0.24, 0.0, 0.0, 0.0, 0.90, 0.0],
  },
  uzum: {
    word: 'üzüm',
    category: 'meyve',
    description: 'Asma üzerinde salkım halinde yetişen tatlı taneli meyve',
    vector: [0.95, 0.08, 0.01, 0.0, 0.05, 0.0, 0.0, 0.0, 0.0, 0.0, 0.28, 0.0, 0.0, 0.0, 0.95, 0.0],
  },
  mandalina: {
    word: 'mandalina',
    category: 'meyve',
    description: 'Turunçgillerden, kolay soyulan tatlı kış meyvesi',
    vector: [0.94, 0.06, 0.01, 0.0, 0.04, 0.0, 0.0, 0.0, 0.0, 0.0, 0.22, 0.0, 0.0, 0.0, 0.88, 0.0],
  },
  kavun: {
    word: 'kavun',
    category: 'meyve',
    description: 'Kabakgillerden tatlı, hoş kokulu iri yaz meyvesi',
    vector: [0.91, 0.19, 0.01, 0.0, 0.03, 0.0, 0.0, 0.0, 0.0, 0.0, 0.29, 0.0, 0.0, 0.0, 0.89, 0.0],
  },
  ananas: {
    word: 'ananas',
    category: 'meyve',
    description: 'Sert dikenli kabuklu, lifli ve aromatik tropik meyve',
    vector: [0.93, 0.08, 0.01, 0.0, 0.03, 0.0, 0.0, 0.0, 0.0, 0.0, 0.24, 0.0, 0.0, 0.0, 0.87, 0.0],
  },

  // SEBZELER (KÖK VE YEŞİLLİKLER)
  patates: {
    word: 'patates',
    category: 'sebze',
    description: 'Toprak altında yumru şeklinde yetişen nişastalı kök sebze',
    vector: [0.12, 0.96, 0.01, 0.0, 0.22, 0.0, 0.0, 0.0, 0.0, 0.0, 0.35, 0.0, 0.0, 0.0, 0.10, 0.0],
  },
  havuc: {
    word: 'havuç',
    category: 'sebze',
    description: 'Toprak altında büyüyen turuncu renkli kök sebze',
    vector: [0.18, 0.94, 0.01, 0.0, 0.15, 0.0, 0.0, 0.0, 0.0, 0.0, 0.32, 0.0, 0.0, 0.0, 0.25, 0.0],
  },
  sogan: {
    word: 'soğan',
    category: 'sebze',
    description: 'Yemeklerin temel lezzet bileşeni olan katmanlı kök sebze',
    vector: [0.08, 0.95, 0.01, 0.0, 0.28, 0.0, 0.0, 0.0, 0.0, 0.0, 0.30, 0.0, 0.0, 0.0, 0.05, 0.0],
  },
  ispanak: {
    word: 'ıspanak',
    category: 'sebze',
    description: 'Demir ve vitamin bakımından zengin koyu yeşil yapraklı sebze',
    vector: [0.07, 0.95, 0.01, 0.0, 0.18, 0.0, 0.0, 0.0, 0.0, 0.0, 0.36, 0.0, 0.0, 0.0, 0.04, 0.0],
  },
  brokoli: {
    word: 'brokoli',
    category: 'sebze',
    description: 'Lahana ailesinden yeşil çiçekli besleyici sebze',
    vector: [0.06, 0.96, 0.01, 0.0, 0.16, 0.0, 0.0, 0.0, 0.0, 0.0, 0.34, 0.0, 0.0, 0.0, 0.03, 0.0],
  },
  sarimsak: {
    word: 'sarımsak',
    category: 'sebze',
    description: 'Güçlü kokulu ve doğal antibiyotik etkili dişli sebze',
    vector: [0.05, 0.95, 0.01, 0.0, 0.26, 0.0, 0.0, 0.0, 0.0, 0.0, 0.31, 0.0, 0.0, 0.0, 0.04, 0.0],
  },
  pirasa: {
    word: 'pırasa',
    category: 'sebze',
    description: 'Uzun gövdeli, zambakgillerden pişirilen kış sebzesi',
    vector: [0.06, 0.94, 0.01, 0.0, 0.19, 0.0, 0.0, 0.0, 0.0, 0.0, 0.33, 0.0, 0.0, 0.0, 0.06, 0.0],
  },
  lahana: {
    word: 'lahana',
    category: 'sebze',
    description: 'Kat kat iri yapraklı, turşusu ve sarması yapılan sebze',
    vector: [0.07, 0.95, 0.01, 0.0, 0.17, 0.0, 0.0, 0.0, 0.0, 0.0, 0.32, 0.0, 0.0, 0.0, 0.05, 0.0],
  },

  // HAYVANLAR
  kedi: {
    word: 'kedi',
    category: 'hayvan',
    description: 'Dört ayaklı, miyavlayan popüler evcil memeli hayvan',
    vector: [0.01, 0.01, 0.97, 0.0, 0.0, 0.0, 0.0, 0.0, 0.30, 0.0, 0.35, 0.0, 0.15, 0.05, 0.0, 0.0],
  },
  kopek: {
    word: 'köpek',
    category: 'hayvan',
    description: 'Sadık, havlayan, evcil ve eğitilebilir memeli hayvan',
    vector: [0.01, 0.01, 0.98, 0.0, 0.0, 0.0, 0.0, 0.0, 0.32, 0.0, 0.38, 0.0, 0.12, 0.12, 0.0, 0.0],
  },
  kus: {
    word: 'kuş',
    category: 'hayvan',
    description: 'Tüylü, kanatlı ve yumurtlayan uçucu omurgalı hayvan',
    vector: [0.02, 0.01, 0.96, 0.02, 0.0, 0.0, 0.0, 0.0, 0.15, 0.0, 0.48, 0.0, 0.05, 0.08, 0.0, 0.0],
  },
  aslan: {
    word: 'aslan',
    category: 'hayvan',
    description: 'Kedigillerden, yeleli güçlü yırtıcı kara memelisi',
    vector: [0.0, 0.0, 0.98, 0.0, 0.0, 0.0, 0.0, 0.0, 0.10, 0.0, 0.52, 0.0, 0.0, 0.10, 0.0, 0.0],
  },
  kaplan: {
    word: 'kaplan',
    category: 'hayvan',
    description: 'Çizgili desenli, çevik ve güçlü yırtıcı kedi türü',
    vector: [0.0, 0.0, 0.98, 0.0, 0.0, 0.0, 0.0, 0.0, 0.10, 0.0, 0.50, 0.0, 0.0, 0.10, 0.0, 0.0],
  },
  kurt: {
    word: 'kurt',
    category: 'hayvan',
    description: 'Köpekgillerden sürü halinde yaşayan yabani yırtıcı',
    vector: [0.0, 0.0, 0.97, 0.0, 0.0, 0.0, 0.0, 0.0, 0.12, 0.0, 0.53, 0.0, 0.0, 0.10, 0.0, 0.0],
  },
  fil: {
    word: 'fil',
    category: 'hayvan',
    description: 'Hortumlu, fildişli karada yaşayan en iri memeli',
    vector: [0.01, 0.02, 0.96, 0.0, 0.0, 0.0, 0.0, 0.0, 0.18, 0.0, 0.45, 0.0, 0.0, 0.02, 0.0, 0.0],
  },
  yunus: {
    word: 'yunus',
    category: 'hayvan',
    description: 'Denizlerde yaşayan zeki, oyuncu ve dost canlısı memeli',
    vector: [0.0, 0.0, 0.96, 0.02, 0.0, 0.0, 0.0, 0.0, 0.22, 0.0, 0.55, 0.0, 0.0, 0.10, 0.0, 0.0],
  },
  kartal: {
    word: 'kartal',
    category: 'hayvan',
    description: 'Yükseklerde uçan, keskin bakışlı yırtıcı büyük kuş',
    vector: [0.0, 0.0, 0.96, 0.03, 0.0, 0.0, 0.0, 0.0, 0.12, 0.0, 0.54, 0.0, 0.0, 0.09, 0.0, 0.0],
  },
  ayi: {
    word: 'ayı',
    category: 'hayvan',
    description: 'İri cüsseli, ormanlarda ve dağlarda yaşayan omnivor memeli',
    vector: [0.02, 0.02, 0.96, 0.0, 0.0, 0.0, 0.0, 0.0, 0.12, 0.0, 0.51, 0.0, 0.0, 0.06, 0.0, 0.0],
  },

  // TAŞITLAR
  araba: {
    word: 'araba',
    category: 'tasit',
    description: 'Dört tekerlekli, motorlu kişisel karayolu taşıtı',
    vector: [0.0, 0.0, 0.0, 0.98, 0.0, 0.0, 0.15, 0.0, 0.0, 0.0, 0.05, 0.0, 0.02, 0.08, 0.0, 0.88],
  },
  otobus: {
    word: 'otobüs',
    category: 'tasit',
    description: 'Toplu insan taşımacılığı yapan geniş motorlu kara aracı',
    vector: [0.0, 0.0, 0.0, 0.98, 0.0, 0.0, 0.12, 0.0, 0.0, 0.0, 0.04, 0.0, 0.02, 0.02, 0.0, 0.89],
  },
  tren: {
    word: 'tren',
    category: 'tasit',
    description: 'Raylar üzerinde vagonlar çeken demiryolu ulaşım aracı',
    vector: [0.0, 0.0, 0.0, 0.97, 0.0, 0.0, 0.14, 0.0, 0.0, 0.0, 0.06, 0.0, 0.02, 0.02, 0.0, 0.92],
  },
  ucak: {
    word: 'uçak',
    category: 'tasit',
    description: 'Havadaki kaldırma kuvvetiyle uçan yolcu ve kargo taşıtı',
    vector: [0.0, 0.0, 0.0, 0.98, 0.0, 0.05, 0.22, 0.0, 0.0, 0.0, 0.08, 0.0, 0.01, 0.02, 0.0, 0.90],
  },
  gemi: {
    word: 'gemi',
    category: 'tasit',
    description: 'Deniz ve okyanuslarda yüzen büyük su üstü taşıtı',
    vector: [0.0, 0.0, 0.0, 0.97, 0.0, 0.0, 0.12, 0.0, 0.0, 0.0, 0.25, 0.0, 0.02, 0.02, 0.0, 0.88],
  },
  bisiklet: {
    word: 'bisiklet',
    category: 'tasit',
    description: 'Pedal gücüyle hareket eden iki tekerlekli temiz araç',
    vector: [0.0, 0.0, 0.0, 0.93, 0.0, 0.0, 0.05, 0.0, 0.05, 0.0, 0.12, 0.0, 0.02, 0.45, 0.0, 0.70],
  },
  helikopter: {
    word: 'helikopter',
    category: 'tasit',
    description: 'Döner kanatlı pervanesiyle dikey iniş-kalkış yapabilen hava aracı',
    vector: [0.0, 0.0, 0.0, 0.98, 0.0, 0.03, 0.20, 0.0, 0.0, 0.0, 0.07, 0.0, 0.01, 0.02, 0.0, 0.91],
  },
  motosiklet: {
    word: 'motosiklet',
    category: 'tasit',
    description: 'İki veya üç tekerlekli, motorlu çevik karayolu aracı',
    vector: [0.0, 0.0, 0.0, 0.97, 0.0, 0.0, 0.12, 0.0, 0.05, 0.0, 0.06, 0.0, 0.01, 0.20, 0.0, 0.86],
  },

  // MUTFAK GEREÇLERİ
  tencere: {
    word: 'tencere',
    category: 'mutfak',
    description: 'İçinde sulu yemek pişirilen derin, kapaklı metal kap',
    vector: [0.05, 0.05, 0.0, 0.0, 0.97, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.0, 0.0, 0.85],
  },
  tava: {
    word: 'tava',
    category: 'mutfak',
    description: 'Kızartma ve kavurma yapılan düz tabanlı saplı mutfak gereci',
    vector: [0.05, 0.05, 0.0, 0.0, 0.97, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.0, 0.0, 0.86],
  },
  bicak: {
    word: 'bıçak',
    category: 'mutfak',
    description: 'Yiyecekleri kesmek ve dilimlemek için keskin çelik alet',
    vector: [0.03, 0.03, 0.0, 0.0, 0.95, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.0, 0.0, 0.89],
  },
  catal: {
    word: 'çatal',
    category: 'mutfak',
    description: 'Yiyecekleri tutmak ve ağıza götürmek için dişli servis aracı',
    vector: [0.04, 0.04, 0.0, 0.0, 0.96, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.0, 0.0, 0.88],
  },
  kasik: {
    word: 'kaşık',
    category: 'mutfak',
    description: 'Sıvı veya taneli yiyecekleri yemek için çukur uçlu sofra aracı',
    vector: [0.04, 0.04, 0.0, 0.0, 0.96, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.0, 0.0, 0.87],
  },
  firin: {
    word: 'fırın',
    category: 'mutfak',
    description: 'Hamur işi ve yemekleri ısı veya ızgara ile pişiren cihaz',
    vector: [0.04, 0.04, 0.0, 0.0, 0.94, 0.0, 0.15, 0.0, 0.0, 0.0, 0.0, 0.0, 0.15, 0.0, 0.0, 0.82],
  },
  rende: {
    word: 'rende',
    category: 'mutfak',
    description: 'Peynir ve sebzeleri ufak parçalara ayıran delikli metal alet',
    vector: [0.05, 0.08, 0.0, 0.0, 0.95, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.0, 0.0, 0.86],
  },

  // ASTRONOMİ & UZAY
  gunes: {
    word: 'güneş',
    category: 'astronomi',
    description: 'Güneş sisteminin merkezindeki ışık ve ısı kaynağı yıldız',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.99, 0.05, 0.0, 0.05, 0.0, 0.35, 0.0, 0.0, 0.0, 0.0, 0.0],
  },
  ay: {
    word: 'ay',
    category: 'astronomi',
    description: 'Dünyamızın tek doğal uydusu olan parlak gök cismi',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.98, 0.04, 0.0, 0.08, 0.0, 0.25, 0.0, 0.0, 0.0, 0.0, 0.0],
  },
  mars: {
    word: 'mars',
    category: 'astronomi',
    description: 'Kızıl Gezegen olarak bilinen, Güneş sisteminin 4. gezegeni',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.98, 0.06, 0.0, 0.0, 0.0, 0.20, 0.0, 0.0, 0.0, 0.0, 0.0],
  },
  yildiz: {
    word: 'yıldız',
    category: 'astronomi',
    description: 'Nükleer füzyonla ışık ve enerji yayan kozmik plazma küresi',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.98, 0.05, 0.0, 0.10, 0.0, 0.28, 0.0, 0.0, 0.0, 0.0, 0.0],
  },
  gezegen: {
    word: 'gezegen',
    category: 'astronomi',
    description: 'Bir yıldızın etrafında belirli yörüngede dönen gök cismi',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.99, 0.05, 0.0, 0.0, 0.0, 0.22, 0.0, 0.0, 0.0, 0.0, 0.0],
  },
  galaksi: {
    word: 'galaksi',
    category: 'astronomi',
    description: 'Milyarlarca yıldız, gaz ve toz bulutundan oluşan dev gökada',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.99, 0.08, 0.0, 0.05, 0.0, 0.20, 0.0, 0.0, 0.0, 0.0, 0.0],
  },
  jupiter: {
    word: 'jüpiter',
    category: 'astronomi',
    description: 'Güneş sisteminin en büyük gaz devi devasa gezegeni',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.98, 0.05, 0.0, 0.0, 0.0, 0.18, 0.0, 0.0, 0.0, 0.0, 0.0],
  },

  // TEKNOLOJİ & BİLİŞİM
  bilgisayar: {
    word: 'bilgisayar',
    category: 'teknoloji',
    description: 'Verileri işleyen, depolayan ve programları çalıştıran elektronik aygıt',
    vector: [0.0, 0.0, 0.0, 0.02, 0.0, 0.05, 0.98, 0.0, 0.0, 0.0, 0.0, 0.10, 0.05, 0.0, 0.0, 0.72],
  },
  yazilim: {
    word: 'yazılım',
    category: 'teknoloji',
    description: 'Bilgisayarda işlerin yürütülmesini sağlayan komutlar ve kod bütünü',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.99, 0.0, 0.02, 0.0, 0.0, 0.12, 0.0, 0.0, 0.0, 0.15],
  },
  algoritma: {
    word: 'algoritma',
    category: 'teknoloji',
    description: 'Bir problemi çözmek için adım adım izlenen mantıksal yol',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.08, 0.98, 0.0, 0.05, 0.0, 0.0, 0.15, 0.0, 0.0, 0.0, 0.10],
  },
  internet: {
    word: 'internet',
    category: 'teknoloji',
    description: 'Dünya çapında bilgisayarları birbirine bağlayan devasa küresel ağ',
    vector: [0.0, 0.0, 0.0, 0.05, 0.0, 0.05, 0.98, 0.0, 0.02, 0.0, 0.0, 0.08, 0.0, 0.0, 0.0, 0.35],
  },
  veritabani: {
    word: 'veritabanı',
    category: 'teknoloji',
    description: 'Yapılandırılmış bilgilerin düzenli tutulduğu dijital veri ambarı',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.97, 0.0, 0.0, 0.0, 0.0, 0.10, 0.0, 0.0, 0.0, 0.25],
  },
  sunucu: {
    word: 'sunucu',
    category: 'teknoloji',
    description: 'Ağ üzerinden diğer bilgisayarlara hizmet ve veri sağlayan güçlü sistem',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.97, 0.0, 0.0, 0.0, 0.0, 0.08, 0.02, 0.0, 0.0, 0.70],
  },
  robot: {
    word: 'robot',
    category: 'teknoloji',
    description: 'Programlanabilir, otomatik iş gören elektromekanik akıllı makine',
    vector: [0.0, 0.0, 0.05, 0.05, 0.0, 0.08, 0.96, 0.0, 0.0, 0.0, 0.0, 0.08, 0.0, 0.0, 0.0, 0.85],
  },

  // MÜZİK ALETLERİ
  gitar: {
    word: 'gitar',
    category: 'muzik',
    description: 'Gövdesi ahşap, telleri parmak veya penayla çalınan müzik aleti',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.98, 0.25, 0.0, 0.05, 0.15, 0.05, 0.0, 0.0, 0.30],
  },
  piyano: {
    word: 'piyano',
    category: 'muzik',
    description: 'Klavyesindeki tuşlarla tokmakları tellere vuran akustik çalgı',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.04, 0.98, 0.28, 0.0, 0.04, 0.15, 0.12, 0.0, 0.0, 0.35],
  },
  keman: {
    word: 'keman',
    category: 'muzik',
    description: 'Yay yardımıyla çalınan dört telli tiz orkestra enstrümanı',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.99, 0.30, 0.0, 0.05, 0.16, 0.02, 0.0, 0.0, 0.25],
  },
  flut: {
    word: 'flüt',
    category: 'muzik',
    description: 'Üflenerek ses çıkarılan boru biçimli nefesli çalgı',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.97, 0.22, 0.0, 0.04, 0.12, 0.01, 0.0, 0.0, 0.50],
  },
  davul: {
    word: 'davul',
    category: 'muzik',
    description: 'Tokmak ve çubukla derisine vurularak ritim tutulan vurmalı çalgı',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.96, 0.18, 0.0, 0.04, 0.10, 0.02, 0.0, 0.0, 0.20],
  },
  cello: {
    word: 'çello',
    category: 'muzik',
    description: 'Bacaklar arasına alınarak yayla çalınan bas sesli viyolonsel',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.98, 0.32, 0.0, 0.05, 0.15, 0.04, 0.0, 0.0, 0.28],
  },

  // GİYİM & KIYAFET
  gomlek: {
    word: 'gömlek',
    category: 'giyim',
    description: 'Üst bedene giyilen, yakalı ve düğmeli kumaş giysi',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.98, 0.0, 0.05, 0.02, 0.0, 0.0, 0.0],
  },
  pantolon: {
    word: 'pantolon',
    category: 'giyim',
    description: 'Beli saran ve iki bacağı ayrı örten alt giyim parçası',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.98, 0.0, 0.05, 0.02, 0.0, 0.0, 0.0],
  },
  ceket: {
    word: 'ceket',
    category: 'giyim',
    description: 'Gömlek veya kazak üzerine giyilen kollu dış giysi',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.98, 0.0, 0.08, 0.02, 0.0, 0.0, 0.0],
  },
  ayakkabi: {
    word: 'ayakkabı',
    category: 'giyim',
    description: 'Ayağı dış etkilerden koruyan ve yürümeyi sağlayan giyim ürünü',
    vector: [0.0, 0.0, 0.0, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.97, 0.02, 0.04, 0.02, 0.15, 0.0, 0.0],
  },
  kazak: {
    word: 'kazak',
    category: 'giyim',
    description: 'Yünden veya pamuktan örülen sıcak tutan kışlık üst giysi',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.98, 0.0, 0.02, 0.02, 0.0, 0.0, 0.0],
  },
  sapka: {
    word: 'şapka',
    category: 'giyim',
    description: 'Başa takılan, güneşten veya soğuktan koruyan başlık',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.96, 0.0, 0.04, 0.01, 0.05, 0.0, 0.0],
  },

  // MESLEKLER
  doktor: {
    word: 'doktor',
    category: 'meslek',
    description: 'Hastalıkları teşhis ve tedavi eden tıp uzmanı insan',
    vector: [0.0, 0.0, 0.15, 0.0, 0.0, 0.0, 0.10, 0.0, 0.20, 0.05, 0.0, 0.98, 0.0, 0.0, 0.0, 0.05],
  },
  muhendis: {
    word: 'mühendis',
    category: 'meslek',
    description: 'Bilimsel prensipleri yapı, makine ve sistem geliştirmede kullanan uzman',
    vector: [0.0, 0.0, 0.10, 0.08, 0.0, 0.05, 0.35, 0.0, 0.05, 0.02, 0.0, 0.98, 0.0, 0.0, 0.0, 0.40],
  },
  ogretmen: {
    word: 'öğretmen',
    category: 'meslek',
    description: 'Bilgi ve becerileri öğrencilere aktaran eğitim uzmanı',
    vector: [0.0, 0.0, 0.12, 0.0, 0.0, 0.02, 0.08, 0.05, 0.25, 0.02, 0.0, 0.98, 0.0, 0.0, 0.0, 0.0],
  },
  avukat: {
    word: 'avukat',
    category: 'meslek',
    description: 'Hukuki davalarda kişilerin haklarını savunan adalet uzmanı',
    vector: [0.0, 0.0, 0.10, 0.0, 0.0, 0.0, 0.05, 0.0, 0.18, 0.08, 0.0, 0.98, 0.0, 0.0, 0.0, 0.0],
  },

  // MOBİLYA
  sandalye: {
    word: 'sandalye',
    category: 'mobilya',
    description: 'Tek kişinin oturması için arkalıklı dört ayaklı mobilya',
    vector: [0.0, 0.0, 0.0, 0.0, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.98, 0.0, 0.0, 0.25],
  },
  masa: {
    word: 'masa',
    category: 'mobilya',
    description: 'Üzerinde çalışılan veya yemek yenilen düz yüzeyli ayaklı mobilya',
    vector: [0.0, 0.0, 0.0, 0.0, 0.05, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.98, 0.0, 0.0, 0.25],
  },
  koltuk: {
    word: 'koltuk',
    category: 'mobilya',
    description: 'Kollu, süngerli ve kumaş kaplı konforlu oturma mobilyası',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.05, 0.0, 0.0, 0.98, 0.0, 0.0, 0.15],
  },

  // SPOR
  futbol: {
    word: 'futbol',
    category: 'spor',
    description: 'On birer kişilik iki takımın ayakla topu kaleye soktuğu oyun',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.15, 0.05, 0.05, 0.05, 0.0, 0.98, 0.0, 0.0],
  },
  basketbol: {
    word: 'basketbol',
    category: 'spor',
    description: 'Topu 3.05 metre yükseklikteki çemberden geçirmeye dayalı takım sporu',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.15, 0.05, 0.05, 0.05, 0.0, 0.98, 0.0, 0.0],
  },
  voleybol: {
    word: 'voleybol',
    category: 'spor',
    description: 'File üzerinden topu elle karşı alana düşürmeyi hedefleyen takım sporu',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.14, 0.05, 0.05, 0.05, 0.0, 0.98, 0.0, 0.0],
  },
  tenis: {
    word: 'tenis',
    category: 'spor',
    description: 'Raketle sarı renkli keçeli topa vurularak oynanan kort sporu',
    vector: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.12, 0.05, 0.05, 0.05, 0.0, 0.97, 0.0, 0.10],
  },
};
