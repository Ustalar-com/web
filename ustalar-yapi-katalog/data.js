const CATEGORIES = [
  {
    id: 'Cati',
    name: 'ÇATI',
    icon: 'home',
    description: 'Modern çatı kaplama ve yalıtım çözümleri, kiremitler ve çatı pencereleri.',
    keywords: ['roofing', 'roof-tiles', 'modern-house-roof', 'construction-roof']
  },
  {
    id: 'DisCephe',
    name: 'DIŞ CEPHE',
    icon: 'layers',
    description: 'Estetik dış cephe kaplama sistemleri, kompozit paneller ve siding modelleri.',
    keywords: ['building-facade', 'architecture-exterior', 'modern-cladding', 'glass-facade']
  },
  {
    id: 'Hirdavat',
    name: 'HIRDAVAT',
    icon: 'wrench',
    description: 'Profesyonel el aletleri, bağlantı elemanları ve endüstriyel hırdavat ürünleri.',
    keywords: ['tools', 'screws-bolts', 'hardware-store', 'workshop-tools']
  },
  {
    id: 'Iklimlendirme',
    name: 'İKLİMLENDİRME',
    icon: 'wind',
    description: 'Isıtma, soğutma, havalandırma sistemleri ve akıllı termostat üniteleri.',
    keywords: ['air-conditioning', 'hvac-ventilation', 'heating-radiator', 'smart-home-climate']
  },
  {
    id: 'Banyo',
    name: 'BANYO',
    icon: 'bath',
    description: 'Lüks banyo mobilyaları, vitrifiye, bataryalar ve modern duş sistemleri.',
    keywords: ['modern-bathroom', 'bathroom-sink', 'luxury-shower', 'bathroom-design']
  },
  {
    id: 'Dekoratif',
    name: 'DEKORATİF',
    icon: 'palette',
    description: 'Duvar kağıtları, modern aydınlatmalar ve dekoratif aksesuarlar.',
    keywords: ['interior-lighting', 'decorative-wall', 'abstract-sculpture', 'home-decoration']
  },
  {
    id: 'Mermer',
    name: 'MERMER',
    icon: 'gem',
    description: 'Doğal taşlar, lüks mermer kaplamalar ve granit mutfak tezgahları.',
    keywords: ['marble-texture', 'luxury-marble', 'granite-slab', 'stone-tiles']
  },
  {
    id: 'Mobilya',
    name: 'MOBİLYA',
    icon: 'sofa',
    description: 'Tasarım oturma grupları, masalar ve modüler depolama mobilyaları.',
    keywords: ['modern-sofa', 'wooden-dining-table', 'designer-chair', 'living-room-furniture']
  },
  {
    id: 'Ofis',
    name: 'OFİS',
    icon: 'briefcase',
    description: 'Ergonomik çalışma koltukları, ofis masaları ve akustik bölme panelleri.',
    keywords: ['modern-office-interior', 'ergonomic-office-chair', 'workspace-desk', 'office-design']
  },
  {
    id: 'Zemin',
    name: 'ZEMİN',
    icon: 'grid',
    description: 'Lamine parke, suya dayanıklı zemin panelleri ve seramik kaplamalar.',
    keywords: ['hardwood-floor', 'laminate-flooring', 'ceramic-tiles', 'floor-parquet']
  },
  {
    id: 'IsiYalitimi',
    name: 'ISI YALITIM',
    icon: 'shield-alert',
    description: 'Mantolama sistemleri, taş yünü levhalar ve enerji verimli yalıtım çözümleri.',
    keywords: ['wall-insulation', 'foam-insulation', 'energy-saving-house', 'thermal-cladding']
  },
  {
    id: 'Mekanik',
    name: 'MEKANİK',
    icon: 'cpu',
    description: 'Endüstriyel borulama, yangın tesisatı ve mekanik oda ekipmanları.',
    keywords: ['industrial-pipes', 'mechanical-valves', 'boiler-room', 'machinery-system']
  },
  {
    id: 'Peyzaj',
    name: 'PEYZAJ',
    icon: 'tree-pine',
    description: 'Bahçe düzenleme taşları, havuz çevresi kaplamaları ve yeşil alan ürünleri.',
    keywords: ['modern-garden', 'outdoor-patio', 'swimming-pool-landscaping', 'stone-garden-path']
  },
  {
    id: 'SuTesisati',
    name: 'SU TESİSATI',
    icon: 'droplets',
    description: 'Temiz ve pis su boruları, yüksek kaliteli fittings elemanları ve vanalar.',
    keywords: ['plumbing-pipes', 'water-faucet', 'copper-plumbing', 'water-valves']
  },
  {
    id: 'SuYalitimi',
    name: 'SU YALITIM',
    icon: 'umbrella',
    description: 'Likit membranlar, bitümlü örtüler ve sızıntı önleyici özel harçlar.',
    keywords: ['waterproofing-membrane', 'concrete-sealer', 'basement-waterproofing', 'roof-waterproof']
  },
  {
    id: 'Tasarim',
    name: 'TASARIM',
    icon: 'compass',
    description: 'Özel mimari projeler, 3B görselleştirme ve iç mimari konsept katalogları.',
    keywords: ['architectural-blueprint', '3d-interior-render', 'architectural-model', 'sketch-concept']
  },
  {
    id: 'TemelKalip',
    name: 'TEMEL KALIP',
    icon: 'hammer',
    description: 'Endüstriyel kalıp sistemleri, iskele çözümleri ve beton döküm ekipmanları.',
    keywords: ['concrete-formwork', 'construction-scaffolding', 'rebar-foundation', 'concrete-pouring']
  }
];

const imageMap = {
  Cati: [
    'https://images.unsplash.com/photo-1632759162444-12968303ebd2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
  ],
  DisCephe: [
    'https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80'
  ],
  Hirdavat: [
    'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1530124566582-ab0483767fca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?auto=format&fit=crop&w=800&q=80'
  ],
  Iklimlendirme: [
    'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=800&q=80'
  ],
  Banyo: [
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  ],
  Dekoratif: [
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540931900612-c28302bf6e6a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80'
  ],
  Mermer: [
    'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&w=800&q=80'
  ],
  Mobilya: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
  ],
  Ofis: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497215842964-222b430db094?auto=format&fit=crop&w=800&q=80'
  ],
  Zemin: [
    'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1562663474-6cbb3fee4c39?auto=format&fit=crop&w=800&q=80'
  ],
  IsiYalitimi: [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
  ],
  Mekanik: [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80'
  ],
  Peyzaj: [
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558904541-efa8c1a68ec1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  ],
  SuTesisati: [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80'
  ],
  SuYalitimi: [
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80'
  ],
  Tasarim: [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80'
  ],
  TemelKalip: [
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80'
  ]
};

function generateInitialCatalogs() {
  const catalogs = [];

  CATEGORIES.forEach((cat) => {
    const urls = imageMap[cat.id] || [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ];

    for (let i = 1; i <= 3; i++) {
      const catalogId = `${cat.id}-Katalog-${i}`;
      
      const pages = [
        {
          pageNumber: 1,
          imageUrl: urls[0],
          title: `Ustalar Yapı - ${cat.name} Koleksiyonu ${i}`,
          description: `${cat.name} kategorisinde üstün kalite standartları ve modern mühendislik detaylarıyla üretilmiş premium ürün grubu.`
        },
        {
          pageNumber: 2,
          imageUrl: urls[1],
          title: `Teknik Detaylar & Avantajlar`,
          description: `Yüksek dayanıklılık, kolay montaj avantajı ve uluslararası sertifikasyon standartlarına uygun tasarım bileşenleri.`
        },
        {
          pageNumber: 3,
          imageUrl: urls[2],
          title: `Sürdürülebilirlik & Çevre Dostu`,
          description: `Geri dönüştürülebilir bileşenler ile çevreye saygılı üretim teknolojisi ve yüksek enerji tasarrufu oranları.`
        },
        {
          pageNumber: 4,
          imageUrl: urls[3],
          title: `Uygulama Alanları & Örnekler`,
          description: `Konut projeleri, ticari yapılar ve sanayi tesisleri için esnek entegrasyon kapasitesi ve mükemmel uyum.`
        },
        {
          pageNumber: 5,
          imageUrl: urls[4],
          title: `Opsiyonel Çözümler & Aksesuarlar`,
          description: `Farklı renk, doku ve ebat varyasyonları ile projelerinizin tüm estetik gereksinimlerini karşılayan geniş ürün gamı.`
        },
        {
          pageNumber: 6,
          imageUrl: urls[5],
          title: `Garanti & Bakım Standartları`,
          description: `Uzun ömürlü kullanım garantisi, hızlı servis desteği ve zahmetsiz temizlik & periyodik bakım avantajları.`
        }
      ];

      catalogs.push({
        id: catalogId,
        categoryId: cat.id,
        categoryName: cat.name,
        title: `Katalog ${i}`,
        description: `Ustalar Yapı ${cat.name} ${i}. Özel Seri kataloğudur. Modern detaylar içerir.`,
        coverImage: urls[0],
        mediaUrl: i === 1 ? "https://www.youtube.com/watch?v=y881t8ilMyc" : null,
        pages: pages
      });
    }
  });

  return catalogs;
}
