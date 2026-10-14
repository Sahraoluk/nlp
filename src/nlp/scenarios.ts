export interface ScenarioPreset {
  id: string;
  title: string;
  theme: string;
  difficulty: 'Kolay' | 'Orta' | 'İleri';
  description: string;
  words: string[];
  expectedOutlier: string;
  badge: string;
}

export const PRESET_SCENARIOS: ScenarioPreset[] = [
  {
    id: 'meyve_patates',
    title: 'Meyve Bahçesi & Gizli Kök Sebze',
    theme: 'Meyveler vs Sebzeler',
    difficulty: 'Kolay',
    description: 'Kullanıcının klasik örneği: Tatlı ağaç meyveleri arasına gizlenmiş nişastalı kök sebze.',
    words: ['Elma', 'Armut', 'Muz', 'Çilek', 'Patates', 'Portakal'],
    expectedOutlier: 'Patates',
    badge: 'Kullanıcı Örneği',
  },
  {
    id: 'hayvanlar_ucak',
    title: 'Vahşi Doğa & Mekanik Gökyüzü',
    theme: 'Canlılar vs Taşıtlar',
    difficulty: 'Kolay',
    description: 'Doğal orman canlıları ve memeliler arasına karışmış insan yapımı hava taşıtı.',
    words: ['Aslan', 'Kaplan', 'Kurt', 'Ayı', 'Uçak', 'Fil'],
    expectedOutlier: 'Uçak',
    badge: 'Fauna & Taşıt',
  },
  {
    id: 'mutfak_mars',
    title: 'Şefin Mutfağı & Kızıl Gezegen',
    theme: 'Mutfak vs Astronomi',
    difficulty: 'Orta',
    description: 'Yemek hazırlama ve pişirme aletleri arasında kozmik bir gezegen.',
    words: ['Tencere', 'Tava', 'Bıçak', 'Kaşık', 'Mars', 'Fırın'],
    expectedOutlier: 'Mars',
    badge: 'Mutfak & Kozmos',
  },
  {
    id: 'enstruman_algoritma',
    title: 'Klasik Senfoni & Yazılım Kodu',
    theme: 'Müzik vs Bilişim',
    difficulty: 'Orta',
    description: 'Akustik yaylı ve nefesli müzik aletleri arasına yerleşmiş soyut bir yazılım kavramı.',
    words: ['Gitar', 'Piyano', 'Keman', 'Flüt', 'Algoritma', 'Çello'],
    expectedOutlier: 'Algoritma',
    badge: 'Müzik & Kod',
  },
  {
    id: 'tasitlar_pantolon',
    title: 'Ulaşım Ağı & Tekstil Gardırobu',
    theme: 'Taşıtlar vs Giyim',
    difficulty: 'Kolay',
    description: 'İnsanları ve yükleri taşıyan araçlar kümesinde giyilebilir bir tekstil parçası.',
    words: ['Otobüs', 'Tren', 'Uçak', 'Gemi', 'Pantolon', 'Helikopter'],
    expectedOutlier: 'Pantolon',
    badge: 'Ulaşım & Moda',
  },
  {
    id: 'uzay_avukat',
    title: 'Samanyolu Galaksisi & Hukuk Bürosu',
    theme: 'Gökbilim vs Meslekler',
    difficulty: 'İleri',
    description: 'Yıldızlar ve gezegenler sisteminde insan adalet sisteminin bir temsilcisi.',
    words: ['Güneş', 'Ay', 'Yıldız', 'Gezegen', 'Galaksi', 'Avukat'],
    expectedOutlier: 'Avukat',
    badge: 'Astrofizik & Hukuk',
  },
  {
    id: 'spor_sandalye',
    title: 'Olimpiyat Sahası & Oturma Odası',
    theme: 'Spor vs Mobilya',
    difficulty: 'Kolay',
    description: 'Kondisyon ve rekabete dayalı spor branşları arasına karışmış durağan bir ev mobilyası.',
    words: ['Futbol', 'Basketbol', 'Voleybol', 'Tenis', 'Sandalye'],
    expectedOutlier: 'Sandalye',
    badge: 'Spor & Yaşam',
  },
  {
    id: 'yazilim_cilek',
    title: 'Sunucu Odası & Yaz Meyvesi',
    theme: 'Teknoloji vs Meyveler',
    difficulty: 'Kolay',
    description: 'Kodlar, algoritmalar ve veritabanları ortasında taze ve kırmızı bir çilek.',
    words: ['Yazılım', 'Bilgisayar', 'Algoritma', 'İnternet', 'Veritabanı', 'Çilek'],
    expectedOutlier: 'Çilek',
    badge: 'Bilişim & Doğa',
  },
];
