/* ═══════════════════════════════════════════════════
   diorama.js — 漁場箱庭資料
   花蓮港漁業文化網站 Demo
   v1.1 | 2026-05-19

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
    url: '#',   // ← 填入報告連結（PDF 或網頁）
    note: '協會出版研究報告，深入了解花蓮傳統看山版定位知識'
  }
];

/* ── 各類別資料 ──────────────────────────────────── */
const DIORAMA_DATA = {

  fishingGrounds: {
    categoryLabel: '漁場',
    items: [
      {
        name: '七星潭',
        subtitle: '花蓮最知名的看山地標',
        description: '七星潭是花蓮市北方的礫石海灣，因形似北斗七星得名。對花蓮漁民而言，七星潭的海岸線輪廓是出海後最常用的目視定位點之一，尤其在近岸漁場作業時，山頭與海岸的相對角度能幫助漁民確認自己的位置。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: [
          'https://picsum.photos/seed/qixingtan-a/800/500',
          'https://picsum.photos/seed/qixingtan-b/800/500'
        ]
      },
      {
        name: '清水斷崖',
        subtitle: '垂直入海的定位牆',
        description: '清水斷崖是台灣最壯觀的海蝕地形之一，山壁幾乎垂直落入太平洋。從海上看去，斷崖的輪廓極為清晰，是漁民辨認北方漁場位置的重要視覺標誌。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: [
          'https://picsum.photos/seed/qingshui-a/800/500',
          'https://picsum.photos/seed/qingshui-b/800/500'
        ]
      },
      {
        name: '鏢尾',
        subtitle: '傳統漁場的盡頭標誌',
        description: '「鏢尾」是漁民對某個山頭地形的俗稱，指鏢魚作業習慣性的南方邊界。當某座山頭的特定角度出現在視野中，有經驗的漁民知道自己已經到了最南的漁場邊緣，再往南就不在熟悉的水域了。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: [
          'https://picsum.photos/seed/biawei-a/800/500',
          'https://picsum.photos/seed/biawei-b/800/500'
        ]
      },
      {
        name: '美崙山',
        subtitle: '花蓮港口的方位基準',
        description: '美崙山位於花蓮市區北側，是漁民從外海返港時最常用的陸地視覺基準點之一。山形圓潤、輪廓清晰，在不同距離與角度下呈現的樣貌各異，是老一輩漁民判斷方位的重要參考。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: [
          'https://picsum.photos/seed/meilun-a/800/500'
        ]
      },
      {
        name: '木瓜溪口',
        subtitle: '季節性近岸魚群的聚集點',
        description: '木瓜溪流入花蓮外海的出海口附近，每到特定季節會帶來豐沛的有機物，吸引魚群聚集。對近岸作業的漁民而言，這片水域是觀察水色變化最容易的地方之一。【�占位文字，待替換】',
        quote: '「那個地方的水跟外面不一樣，你一看顏色就知道有沒有魚。」',
        quoteSource: '漁民，訪談記錄（佔位）',
        images: []
      },
      {
        name: '立霧溪口',
        subtitle: '太魯閣山脈入海的交界',
        description: '立霧溪是太魯閣峽谷的出口，入海後帶來大量山地砂石與有機養分。漁民在秋季特別注意立霧溪口附近的水文變化，因為這段時期常有特定魚種出現在溪口附近的混濁水域邊緣。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: [
          'https://picsum.photos/seed/liwu-a/800/500'
        ]
      }
    ]
  },

  fish: {
    categoryLabel: '魚種',
    items: [
      {
        name: '旗魚',
        subtitle: '花蓮鏢魚的主要目標',
        description: '旗魚是花蓮傳統鏢魚作業最主要的目標魚種，包含黑皮旗魚、白皮旗魚等。每年秋冬季節，旗魚隨黑潮支流洄游至花蓮外海，是鏢魚船最活躍的季節。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '曼波魚',
        subtitle: '在海面曬太陽的巨魚',
        description: '曼波魚（翻車魚）是世界上最重的硬骨魚，偶爾出現在花蓮外海。牠有在海面側躺曬太陽的習性，是賞鯨船乘客最喜歡意外遇見的海洋生物之一。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '煙仔虎',
        subtitle: '成群追魚時翻騰如煙',
        description: '「煙仔虎」是花蓮漁民對東方齒鰆的俗稱，屬鯖科魚類，是延繩釣和拖網的常見漁獲之一。體型雖不大，但集群追逐小魚時，水面會出現如煙霧翻騰的景象，因此得名。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '鬼頭刀',
        subtitle: '夏季洄游的彩虹魚',
        description: '鬼頭刀（學名 Coryphaena hippurus）是花蓮夏季重要的漁獲魚種，體色鮮豔、游速極快。每年五至九月大量洄游花蓮外海，是延繩釣和流刺網的主要捕撈對象。剛離水時全身金藍閃爍，是漁船上最美麗的場景之一。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '黑鮪魚',
        subtitle: '最貴重的深海洄游魚種',
        description: '黑鮪（太平洋黑鮪）是花蓮漁業中經濟價值最高的魚種之一，每逢洄游季節可在拍賣市場創下高價。近年由於資源量下降，捕撈配額嚴格管制，但對老一輩漁民而言，與黑鮪交手的記憶是職業生涯中最難忘的篇章。【佔位文字，待替換】',
        quote: '「一條大的，夠全家吃一個月。那時候海裡多的是，現在不一樣了。」',
        quoteSource: '資深漁民，訪談記錄（佔位）',
        images: []
      },
      {
        name: '飛魚',
        subtitle: '阿美族漁季的開始',
        description: '飛魚是花蓮沿海春末夏初常見的魚種，對花蓮原住民漁業有特殊的文化意涵。飛魚群來臨被視為一年漁季真正開始的訊號，相關的傳統禁忌與儀式至今仍有部分保留。【佔位文字，待替換】',
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
        name: '沿岸流',
        subtitle: '近岸的流，影響定置漁業',
        description: '沿岸流是沿著海岸線流動的近岸洋流，受季風和地形影響明顯。花蓮近岸的沿岸流在不同季節方向會改變，影響定置漁場的設置位置以及近岸小型漁船的作業判斷。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '南流',
        subtitle: '冬季的主要流向',
        description: '「南流」是花蓮漁民對冬季黑潮流速減弱、洋流方向偏南時的俗稱。南流時期，魚群的分布和洄游路徑會改變，有經驗的漁民會依流的變化調整出海方向和作業漁場。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '紅流',
        subtitle: '帶來魚群的溫暖水流',
        description: '「紅流」是漁民用來描述某種溫暖、帶有特定顏色的水流，通常伴隨著豐富的浮游生物，是魚群聚集的訊號。當漁民觀察到水色偏紅或偏棕，往往代表附近有好的漁場。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '黑潮',
        subtitle: '太平洋的暖流主幹',
        description: '黑潮是北太平洋的主要暖流，沿台灣東岸北上，帶來溫暖、清澈、富含氧氣的海水。它是花蓮外海漁場形成的根本原因——暖水帶來浮游生物，浮游生物帶來小魚，小魚帶來大魚。【佔位文字，待替換】',
        quote: '「黑潮在，魚就在。那條流是我們的命。」',
        quoteSource: '漁民，訪談記錄（佔位）',
        images: []
      },
      {
        name: '湧升流',
        subtitle: '深層冷水帶來的養分',
        description: '湧升流是深層冷水被帶到海面的現象，通常發生在海底地形突變的位置。花蓮外海海底地形陡峭，湧升流相對發達，帶來豐富的底層養分，是深海魚種聚集的主要原因之一。【佔位文字，待替換】',
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
        name: '漁場記憶 一',
        subtitle: '跟著流走，就跟著魚走',
        description: '漁場不是固定的地點，而是一個動態的判斷過程。有經驗的漁民會根據水色、流速、海面的氣泡和鳥群，即時判斷當天的魚在哪裡。這種知識無法寫在地圖上，只能跟在老漁民身邊學。【佔位文字，待替換】',
        quote: '「以前我阿爸教我，流到哪裡，魚就在哪裡。地圖沒用，你要去感覺那個水。」',
        quoteSource: '漁民，訪談記錄（佔位）',
        images: []
      },
      {
        name: '漁場記憶 二',
        subtitle: '看山頭，知位置',
        description: '在 GPS 普及之前，花蓮漁民靠著「看山版」——對著陸地山頭的相對角度——來確認自己在海上的位置。每個漁場都有對應的山頭組合，這套知識是漁民的核心技術。【佔位文字，待替換】',
        quote: '「那幾座山，我閉著眼睛也知道自己在哪裡。現在的年輕人只看 GPS，哪天機器壞了就不知道了。」',
        quoteSource: '資深漁民，訪談記錄（佔位）',
        images: []
      },
      {
        name: '漁場記憶 三',
        subtitle: '共享的漁場，不說破的默契',
        description: '花蓮的漁場沒有明確的邊界或所有權，但漁民之間有一套不成文的默契——哪片海是誰常去的、哪個季節哪種漁法的船優先——這些規則從來不是白紙黑字，卻幾十年來默默運作。【佔位文字，待替換】',
        quote: '「大家都知道，但沒有人說出來。那是一種尊重。」',
        quoteSource: '漁民，訪談記錄（佔位）',
        images: []
      },
      {
        name: '延繩釣',
        subtitle: '一根主繩，千個鉤',
        description: '延繩釣是花蓮最主要的漁法之一，以一條長達數十公里的主繩，每隔一段距離掛上帶鉤的支線，可同時在大範圍水域進行作業。針對不同魚種，主繩的深度與支線間距都有對應的調整方式。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: []
      },
      {
        name: '鏢魚',
        subtitle: '站在鏢台上，等待那一刺',
        description: '鏢魚是花蓮最具代表性的傳統漁法，漁民站在船頭突出的鏢台上，手持長達數公尺的鏢槍，等待旗魚靠近時精準投擲。這項技術需要多年練習，全靠眼力、臂力與對海況的判斷。【佔位文字，待替換】',
        quote: '「站在鏢台上，全身要放鬆，眼睛跟著魚的方向，感覺到了就刺。說不清楚，就是感覺。」',
        quoteSource: '鏢魚師傅，訪談記錄（佔位）',
        images: []
      },
      {
        name: '定置漁網',
        subtitle: '在固定位置守株待兔',
        description: '定置漁網是將大型漁網固定在海底特定位置，利用洋流將魚群引入網中的漁法。花蓮近岸有數處定置漁場，需要每天出海收網，是少數不需要追著魚跑的漁法，但選址與架設難度極高。【佔位文字，待替換】',
        quote: null,
        quoteSource: null,
        images: []
      }
    ]
  }

};
