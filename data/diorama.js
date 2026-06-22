/* ═══════════════════════════════════════════════════
   diorama.js — 漁場箱庭資料
   花蓮港漁業文化網站 Demo
   v2.0 | 2026-06-22

   如何更新：
   - items[].description   → 替換說明文字
   - items[].quote         → 替換訪談節錄（null = 不顯示）
   - items[].images        → 替換圖片路徑陣列（[] = 不顯示圖片）
                             正式版建議放在 images/ 資料夾內
   - DIORAMA_LINKS[].url   → 填入實際超連結 URL
═══════════════════════════════════════════════════ */

/* ── 延伸閱讀連結（箱庭區塊底部） ─────────────────
   ★ 填入實際 URL 即生效，保持 '#' 為尚未設定
──────────────────────────────────────────────── */
const DIORAMA_LINKS = [
  {
    label: '完整漁場地圖',
    url: '#',   // ← 填入 Google Maps 連結
    note: '在 Google Maps 上查看花蓮完整漁場標示位置'
  },
  {
    label: '《看山版，聽流水》',
    url: 'https://iiha-formosa.com/%E8%8A%B1%E8%93%AE%E6%BC%81%E6%9D%91%E6%95%85%E4%BA%8B/',
    note: '協會出版研究報告，深入了解花蓮傳統看山版定位知識'
  }
];

/* ── 各類別資料 ──────────────────────────────────── */
const DIORAMA_DATA = {

  fishingGrounds: {
    categoryLabel: '漁場',
    items: [
      {
        name: '溝灣仔 (kau-uân-á)',
        subtitle: '三棧溪與七星潭之間的漁場',
        description: '「溝」意指三棧溪出海口，「灣」指七星潭海灣北側，此處漁場位於三棧溪與七星潭之間。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '鏢尾 (pio-bué)',
        subtitle: '鏢旗魚作業最北端的邊界',
        description: '指四八高地外之漁場，海底是花蓮海脊，海床較高，水深較淺，漁民間認為是一處水流湍急的海域，同時也是鏢旗魚最北端的漁場，故得名「鏢尾」。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '紅目鰱逝 (âng-ba̍k-liân-tsuā)',
        subtitle: '港嘴以南至水璉的捕撈路線',
        description: '指花蓮港港嘴以南至水璉間的海域，漁民作業習慣在船隻行進間下鉤或放網，一趟作業稱為「一逝（tsi̍t-tsuā）」，因此這道紅目鰱豐富的路線，便被稱為紅目鰱逝。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '龜仔口 (ku-á-kháu)',
        subtitle: '近海有深坑，鯊魚常出沒',
        description: '指龜庵山及磯崎海灘附近海域，漁民間又稱其為「龜庵」、「龜頭仔」，近海有海底深坑，經常有鯊魚出沒。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: 'ma-kong-kháu',
        subtitle: '漁民習慣南行的最遠漁場',
        description: '指豐濱貓公溪出海口附近之海域，近岸海底地形陡峭深邃，多窟陷處。此處為花蓮港漁民常用漁場最南端，到此處漁場作業，漁民通常會停留一到兩天，再返回花蓮港。',
        quote: null,
        quoteSource: null,
        images: []
      }
    ]
  },

  fish: {
    categoryLabel: '魚種',
    items: [
      {
        name: '立翅旗魚（白皮旗魚）',
        subtitle: '俗稱丁挽，過去鏢刺漁業的主角',
        description: '即白皮旗魚，俗稱「丁挽」或「翹翅仔」，每年冬季洄游至花東海域，為過去花蓮港鏢刺漁業最主要的目標魚種。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '大棘大眼鯛（紅目鰱）',
        subtitle: '曾遍布花蓮海域，近年已不常見',
        description: '俗稱「紅目鰱」，曾經在花蓮海域數量龐大的魚種，並且分布極廣，但近年來已不常見，漁民也不再以牠為主要目標。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '赤鯥（紅喉）',
        subtitle: '底棲魚類，深水延繩釣的目標',
        description: '俗稱「紅喉」，底棲形魚類，一般由深水的延繩釣，或是底刺網捕獲。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '康氏馬加鰆（馬加）',
        subtitle: '近岸水域的流刺網常見漁獲',
        description: '俗稱「馬加」，漁民一般認為棲息在深度 50 米以內的近岸水域，在花蓮海域經常被流刺網或曳繩釣捕獲。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '鬼頭刀',
        subtitle: '春季洄游，游動於海水表層',
        description: '大洋性洄游魚類，每年春季開始會行經花蓮海域，常見牠游動於海水表層，是延繩釣漁業主要的目標魚種之一。',
        quote: null,
        quoteSource: null,
        images: []
      }
    ]
  },

  currents: {
    categoryLabel: '洋流',
    items: [
      {
        name: '紅流 (âng-lâu)',
        subtitle: '漁民對黑潮的俗稱',
        description: '泛指黑潮，因水色較深成棕、黑色，故被漁民稱之為「紅流」或「黑流」。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '南流 (lâm-lâu)',
        subtitle: '黑潮或其帶動的沿岸水流',
        description: '意指黑潮，或是由黑潮帶動的沿岸水流。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '洘流 (khó-lâu)',
        subtitle: '沿岸流',
        description: '指沿岸流。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '流東 (lâu-tang)',
        subtitle: '向東流時，魚仔抓空空',
        description: '海水向東流，此時通常魚獲不佳，海水向西流動時則通常魚獲滿載。',
        quote: '「流東流東，魚仔抓空空；流內流內，魚仔抓歸載」',
        quoteSource: '花蓮港漁民諺語',
        images: []
      },
      {
        name: '流巡 (lâu-sûn)',
        subtitle: '黑潮邊界的海面色差線',
        description: '海面上的深淺色差線，普遍認為是黑潮邊界。',
        quote: null,
        quoteSource: null,
        images: []
      }
    ]
  },

  techniques: {
    categoryLabel: '漁法',
    items: [
      {
        name: '延繩釣',
        subtitle: '放緄，千鉤遍佈各個漁場',
        description: '延繩釣是花蓮港最普遍的漁法之一，臺語稱為「放緄」。其作業原理是將多條掛有釣鉤的支繩（子線）繫結於一條長達數公里的主繩（母線）上，出航時沿途拋放、綁上浮球與衛星信標定位，待魚群上鉤後折返收線。\n\n延繩釣漁具具備高度的組合彈性。轉環裝於主線與支線之間，可消耗魚掙扎時的扭力，防止釣線纏繞；鉛塊則依目標魚種所棲息的深度加掛於支繩末端，而針對不同魚種，漁民會靈活調整鉤型與釣組深度：捕鬼頭刀以兩時鉤為主，追底棲紅喉則改用二十號鉤，沿岸礁石地帶的紅魚與花鰱則適合寸六鉤。\n\n這種高適應性使延繩釣船的蹤跡遍及花蓮沿岸各漁場。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '流刺網',
        subtitle: '垂直網牆，等魚自己來',
        description: '流刺網也是花蓮漁港相當普遍的漁法之一，作業方式是將裝有浮球與衛星信標的網具施放入海，在水中形成一道長達千餘公尺的垂直網牆，等待隨潮流游過的魚群「刺」入網眼、自行纏繞。\n\n漁民通常天黑前抵達漁場放網，靜待兩三小時後起網，一個夜晚作業兩輪，來回超過十二小時。流刺網浮於海水表層，主要捕撈馬加、土魠、旗魚、煙仔虎等中上層魚種。\n\n2021 年起政府實施實名制，要求漁民在浮筒上標示船編，以便追蹤落海網具。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '底刺網',
        subtitle: '沉底，專捕底棲魚類',
        description: '底刺網的作業原理與流刺網相似，差別在於網具沉放至接近海床的深度，專門捕捉底棲魚類。\n\n底刺網可分為單層網與三層網——單層網針對紅喉、烏魚等特定魚種；三層網結構使魚更不易脫逃、漁獲組成也更多元。\n\n底刺網漁船通常在靠近岸邊的淺水域作業，每次出港約一小時抵達漁場，漁民會根據當天的潮流與海況判斷下網位置，在不同漁場之間靈活移動。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '叉手網',
        subtitle: '以魩仔為主，冬季鰻苗旺季',
        description: '叉手網漁船以魚苗（俗稱魩仔）為主要漁獲，鰻苗則是其中經濟價值最高者，每年冬季是鰻苗捕撈的旺季。叉手網漁船行駛至漁場，在航行過程中張開兩側船舷的長竿，隨著船隻前進，一邊由前方的大網將漁獲撈入網袋，再流到後方的細網，自動篩出體型細小的鰻魚苗。',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '焚寄網',
        subtitle: '投燈誘魚，夜間作業',
        description: '焚寄網屬於燈火漁業，透過在夜間海面投放集魚燈，誘使趨光魚群聚集後再行捕撈。\n\n花蓮港目前僅約四、五艘焚寄網漁船，主要捕捉四破魚，作業季節集中於每年七月至九月。\n\n焚寄網漁船兩側各有一支長形白鐵竿，出航後漁民先投放集魚燈、停船靜待魚群聚集，確認時機成熟後再將鐵竿向外展開，裝設其上的網具便隨之入水展開捕撈。',
        quote: null,
        quoteSource: null,
        images: []
      }
    ]
  }

};
