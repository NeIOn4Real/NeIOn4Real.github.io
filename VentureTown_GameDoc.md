# 創業小鎮（VentureTown）遊戲文件

## 概述
創業小鎮是一款以創業經營為主題的網頁策略遊戲。玩家在 4×4（可擴展至 5×5）的小鎮格子上放置各類設施，透過將手中的資源元素投入小鎮，讓資源沿路經過設施進行轉換與增值，最終以金錢形式產出收益，達成每輪的收益目標即可過關。

---

## 核心玩法

### 資源系統
遊戲有 4 種資源類型：
| 資源 | 圖示 | 顏色變數 |
|------|------|----------|
| 金錢 (money) | 💰 | `--money` |
| 原料 (material) | 🪨 | `--mat` |
| 商品 (goods) | 📦 | `--goods` |
| 鑽石 (diamond) | 💎 | 特殊（嫉妒惡魔專屬） |

### 回合制流程
- **每輪 10 回合**（`maxTurns: 10`）
- 每回合玩家可執行：放置設施 → 投入資源 → 資源沿路徑經過設施轉換 → 產出收益
- **每 3 回合**觸發一次隨機事件（`EVENT_INTERVAL: 3`）
- 每回合開始時隨機給予 2 個行動選項供選擇
- 回合結束點擊「結束回合」推進

### 勝敗條件
- **過關**：累計收益 ≥ 當輪目標（第 1 輪目標 = 20）
- **失敗**：10 回合用盡仍未達目標
- 過關後進入下一輪，新目標 = `round(舊目標 × (1.4 × difficultyMult) + 8)`

### 動態難度系統
系統追蹤玩家每輪的達標速度和收益超額比率，自動調整難度倍率 `difficultyMult`（範圍 0.5~3.0，初始 1.0）：

| 條件 | 倍率變化 |
|------|----------|
| 平均 ≤3 回合達標 | +25% |
| 平均 ≤5 回合達標 | +15% |
| 平均 ≤7 回合達標 | +5% |
| 平均 ≤9 回合達標 | 不變 |
| 平均 >9 回合達標 | -8% |
| 連續 2 輪 ≤3 回合瞬殺 | 額外 +10% |
| 連續 3 輪 ≤3 回合瞬殺 | 額外 +20% |
| 收益 ≥2 倍目標 | 額外 +8% |
| 收益 ≥3 倍目標 | 額外 +15% |

過關 Modal 顯示達標回合數與難度變化。Header 第 2 輪後顯示倍率指標。失敗重開時難度重置。

### 收益計算
```
收益 = 資源離開小鎮時的金錢數值 − 進入時的數值(1)
```
資源以金錢值 1 進入，經過設施轉換增值後，以金錢形式離開時差值即為收益。

---

## 設施系統

### 基礎設施
| 設施 | Emoji | 效果 | 輸入→輸出 |
|------|-------|------|-----------|
| 原料廠 | ⛏️ | 金錢→原料 +1 | money → material |
| 工廠 | 🏭 | 原料→商品 +1 | material → goods |
| 商店 | 🏪 | 商品→金錢 +1（isShop） | goods → money |
| 精煉廠 | 🔩 | 原料→原料 +2 | material → material |
| 倉庫 | 📦 | 商品→商品 +2 | goods → goods |
| 增幅器 | ⚡ | 任意 +2 | any → 不轉換 |
| 轉化器 | 🔄 | 任意→金錢 | any → money |

### 人力流設施
| 設施 | Emoji | 特殊效果 |
|------|-------|----------|
| 人力訓練中心 | 🎓 | 每回合開始產生 1 人材 |
| 勞動轉換站 | ⚙️ | 消耗 2 人材，資源×2 |
| 人材倉庫 | 🗃️ | 持有 5+ 人材時額外 +5 |
| 人才市場 | 🏦 | 金錢通過時消耗 3% 獲得 2 人材 |
| 加班辦公室 | 💼 | 資源通過時 +人材數量一半% |
| 人力銀行 | 🏧 | 金錢通過時儲存 10% 為加成，下次投入釋放 |
| 派遣總部 | 🏢 | 商品通過時獲得 2 人材 |
| 集體罷工台 | 📢 | 消耗所有人材，每個 +10 數值（主動觸發） |

### 物流中心流設施
| 設施 | Emoji | 特殊效果 |
|------|-------|----------|
| 螺旋物流站 | 🔄 | 每通過 1 個設施 +2 |
| 終點站 | 🏁 | 資源通過時 +(已通過設施數×4) |
| 物流放大器 | 📡 | 下一設施效果×2 |
| 轉運中心 | 🔀 | 放置時決定方向（可選 4 向） |
| 速遞站 | ⚡ | 通過後若下一格有設施立即再觸發一次 |
| 物流倉 | 🏪 | 儲存通過時數值的 50%，下次投入時釋放 |
| 物流倉 v2 | 📦 | 資源投入時獲得 1 物流計數，計數 ≥3 時 +8 收益 |
| 環境感應站 | 📊 | 周圍 4 格每有一個設施 +2 |

### 貿易流設施
| 設施 | Emoji | 特殊效果 |
|------|-------|----------|
| 外貿港口 | ⚓ | 商品數量每 10 個 +1% |
| 匯率波動板 | 📈 | 不參與路徑；每次投入結算時隨機 ±3~15% |
| 期貨交易所 | 🏛 | 放置時鎖定當前倍率，永久使用 |
| 貿易特區 | 🌏 | 周圍 4 格有商店系設施時輸出×1.5 |
| 清倉拍賣場 | 🏷️ | 商品通過時獲得數值×4 收益，商品變成 1 |
| 進出口稅站 | 🧾 | 扣除 1 收益；通過 4+ 物流中心後×2 |
| 自由市場 | 🗽 | 任意資源進入，輸出金錢（當前數值） |

### 拆遷流設施
| 設施 | Emoji | 特殊效果 |
|------|-------|----------|
| 爆破裝置 | 💣 | 3 回合後消滅自身，並隨機消滅一個相鄰設施 |
| 建築廢料廠 | 🏗 | 資源通過時消滅自身，本次投入×2 |
| 臨時工棚 | 🛖 | 每移動一次輸出 +1（最高 +5） |
| 磁力板 | 🧲 | 每回合開始與相鄰隨機設施交換位置 |
| 廢墟紀念碑 | 🗿 | 只能放在廢墟上，輸出 +5；消滅後還原為空地（不變廢墟） |
| 拆遷補償局 | 🏢 | 每次移動或消滅設施 +1 收益 |
| 動態加強器 | 🔋 | 本回合設施被移動過，此設施輸出×2 |
| 地基不穩定站 | ⚠️ | 相鄰有減益時輸出翻倍；相鄰有增益時 -1 |

### 商店系設施（isShop，視為商店）
| 設施 | Emoji | 特殊效果 |
|------|-------|----------|
| 小型販售商 | 🛍️ | 商品→金錢+1；金錢→商品→金錢+2 |
| 黃牛販子 | 🎫 | 商品→金錢+1→商品(-10%) |
| 量販店 | 🛒 | 投入商品時失去一半數量，每失去 4 個商品 +8 收益（每次觸發 +4 永久累積），單次 ≥100 自毀 |
| 百貨公司 | 🏬 | 只能蓋在 2×2 商店上（佔 4 格，視為 4 商店）。商品→×2金錢→+2%商品→金錢 |

### 其他特殊設施
| 設施 | Emoji | 特殊效果 |
|------|-------|----------|
| 嫉妒工廠 | 💚 | 金錢→1 鑽石，鑽石過任何商店系設施×12 |
| 物流方向 ↑↓←→ | ⬆️⬇️⬅️➡️ | 資源轉向指定方向 |
| 員工食堂 | 🍱 | 投入商品時額外獲得 1 人材 |
| 人力派遣 | 🏢 | 金錢投入時獲得 1 人材 |
| 貿易代理 | 🌐 | 中央專屬。金錢→1% 原料；商品→1% 金錢 |
| 科技研發 | 🔬 | 中央專屬。商品投入時獲得 2% 商品 |
| 稅務局 | 🏛 | 每回合開始隨機設施升級，最終收益 -10% |

---

## 合夥人系統

### 惡魔系合夥人（有正面也有負面效果）
| 合夥人 | Emoji | 正面效果 | 負面效果 |
|--------|-------|----------|----------|
| 貧窮神 | 🪙 | 收益為零時 +bonus（逐次累積） | 獲得收益時 bonus 重置為 1 |
| 暴食惡魔 | 👹 | 投入時原料視為商品，商品視為原料 | 回合開始時原料/商品 -10% |
| 怠惰惡魔 | 😴 | 行動選項可放棄選擇，2/3 機率資源 +10 | 1/3 機率資源變成 1 |
| 慾望惡魔 | 💘 | 僅經過 2 設施時輸出×2 | 經過 2+ 設施時資源÷設施數 |
| 激情惡魔 | 🔥 | 減少效果被逆轉為增加 | 超過 5 回合未遇減少效果，收益 -33% |
| 嫉妒惡魔 | 💚 | 獲得嫉妒工廠（金錢→鑽石→×12） | 非鑽石進入嫉妒工廠時收益 -50% |
| 貪婪惡魔 | 💰 | 每回合結束額外獲得收益 50% | 每輪開始目標 +50% |
| 傲慢惡魔 | 👑 | 惡魔系（`isDemon:true`）合夥人負面效果不生效，每個惡魔 +10% | 無 |
| 黑市商人 | 🕶️ | 每輪第一次商品→金錢×125% | 之後每次倍率 -0.5（最低×1） |
| 爆破工程師 | 🧨 | 消耗 2 收益可主動摧毀設施 | 每輪目標 +10% |

### 基礎合夥人
| 合夥人 | Emoji | 效果 |
|--------|-------|------|
| 基礎原料商 | ⛏️ | 資源每次經過原料廠 +1 收益 |
| 基礎商店老闆 | 🏪 | 資源每次經過商店系設施 +1 收益 |
| 基礎工廠主 | 🏭 | 資源每次經過工廠 +1 收益 |

### 人力流合夥人
| 合夥人 | Emoji | 正面 | 負面 |
|--------|-------|------|------|
| 人力仲介 | 📋 | 每回合開始 +1 人材 | 每輪目標 +5% |
| 工會主席 | ✊ | 持有 3+ 人材時輸出 +50% | 少於 3 人材時 -20% |
| 勞動部長 | 🎩 | 使用人材後下次投入 +5 | 未使用每回合 -5% |
| 人力資源總監 | 👔 | 一次全用人材時每個 +15 | 每次只能使用 1 個人材 |

### 物流流合夥人
| 合夥人 | Emoji | 正面 | 負面 |
|--------|-------|------|------|
| 運輸大亨 | 🚢 | 每次通過物流中心 +3 | 未通過物流中心收益 -50% |
| 倉儲女王 | 👑 | 物流中心可疊加 2 層設施 | 每個疊加行動費 +2 |
| 路線規劃師 | 🗺️ | 每回合可免費移動物流中心 | 物流 <2 個時輸出 -30% |
| 快遞達人 | 🚀 | 通過 4+ 格時 +10% | 少於 4 格收益減半 |

### 貿易流合夥人
| 合夥人 | Emoji | 正面 | 負面 |
|--------|-------|------|------|
| 外匯交易員 | 💹 | 金錢↔商品轉換差值 10% 作收益 | 原料時輸出 -50% |
| 套利者 | ⚖️ | 同回合金→商→金時 +20% | 單向轉換 -20% |
| 壟斷者 | 🎩 | 每 3 個商店系設施，商品→金錢時 +5% | 少於 3 商店時每少一個 -10% |

### 拆遷流合夥人
| 合夥人 | Emoji | 正面 | 負面 |
|--------|-------|------|------|
| 地皮炒家 | 🏚️ | 移動設施後下次該位置 +20 | 設施 >3 回合未移動輸出 -1 |
| 混沌建築師 | 🌀 | 每回合隨機移動設施到空格 | 被移動時 -5% 收益 |
| 廢墟掠奪者 | 💀 | 資源通過廢墟時，每個廢墟隨機 +5%~23% | 廢墟 >3 格每格 -2% 收益 |

### 獨特合夥人
| 合夥人 | Emoji | 效果 |
|--------|-------|------|
| 譚雅 | 👩‍💼 | 每回合可用手牌設施交換一張稀有度高一級的設施；手牌為空、或手牌+場上設施 <24 時自動補 1 張 **N 稀有度** 設施 |
| 蕾雅 | 👩‍🔧 | 可將手牌相同設施蓋在小鎮設施上，視為升級並額外+2%（可累積）；重新排列時可合併同類設施升級 |
| 阿北，物流之王 | 🚛 | 可將設施蓋在物流中心上，同時獲得轉向+輸出 |
| 市長 | 🎖 | 每筆資源經過中央格子時最終收益 +5%（可累積） |
| 公路之星 | 🌟 | 每回合中央 2 格隨機 +2；未經中央收益減半 |
| 設施破壞者 | 💣 | 任何機制消滅設施時 +50 收益 |
| 場風大師 | 🌀 | 每回合指定投入方向，從該方向投入×2；只能從指定方向投入 |
| 大地主 | 🏗 | 地圖擴大為 5×5 格；設施補給事件時必須失去一個設施 |
| 拆遷隊 | 🔨 | 每回合開始 +1 拆遷計數，計數 ≥3 時消耗 3 獲得 1 次免費重排機會（可累積）；受全能會計師灌注 |
| 無冕之王 | 👑 | 每有 x 個廢墟，收益 +(x²/2)%；每有人材 45% 機率重複觸發，上限人材數次 |
| 擁慶記房屋 | 🏠 | 每回合可賣出一個設施（不產生廢墟），獲得 0.1×x%×已過回合數 收益，每次賣出 x+1 |

---

## 事件系統

每 3 回合觸發一次隨機事件（共 19 種），預告時即以藍色輪廓標示受影響格子（`event-preview`）。事件受影響區域在預告時即透過 `precomputeEventData()` 預先決定並儲存於 `G.nextEventData`。事件抽選使用加權系統（`pickNextEvent()`），莫菲定律權重根據玩家行為動態調整。

### 事件列表
| 事件 | id | 效果 | 預告高亮 |
|------|----|------|----------|
| 🏗 設施補給 | pick_fac | 從隨機 3 個設施中選 1 加入手牌 | 無 |
| 📉 原料大降 | mat_crash | 金錢→原料×2，原料→金錢÷2，原料→商品×2 | 無 |
| 📈 原料出口熱 | mat_boom | 原料轉換效果×2，累積每次+2x | 無 |
| 🛒 商品熱銷 | goods_up | 商品→金錢額外+2，累積每次+2x | 無 |
| 🌀 颱風來襲 | typhoon | 隨機方向限制，物流失效，原料→金錢翻倍 | 無 |
| ⚔ 地區叛亂 | rebellion | 消滅預定的 1-4 個角落設施 | 角落格子 |
| 🌍 地震 | earthquake | 所有設施往預定方向滑動 | 所有設施格 |
| ☢ 危險廢棄物 | hazardous_waste | 預定 1 空格放置爆破裝置（格子顯示倒數） | 目標空格 |
| 🎁 譚雅的禮物 | tanya_gift | 手牌資源無視單位 +10 | 無 |
| 🎁 蕾雅的禮物 | leya_gift | 預定設施永久 +5 | 目標設施格 |
| 🚫 運輸異常 | transport_error | 物流失效 + 原料無法→商品 | 無 |
| 🍽 重大食安 | food_safety | 員工食堂失效 + 金錢→商品時 -5（最小 1） | 無 |
| 📋 勞工保險 | labor_insurance | 最終收益扣除 人材數×2% | 無 |
| 📈 行業熱潮 | row_buff | 預定行 +10%，另一行 -10% | 兩行格子 |
| 📊 區域效應 | col_buff | 預定列 +10%，另一列 -10% | 兩列格子 |
| 🌀 地塊共鳴 | area_buff | 預定 2×2 +10%，另一 2×2 -10% | 兩個 2×2 區域 |
| 😴 平靜的一天 | skip | 什麼都沒發生 | 無 |
| 🔀 莫菲定律 | murphy | 所有設施隨機打亂位置，獲得 2 張複合設施 | 所有設施格 |
| 💼 就業輔助 | job_assist | 獲得目標 20% 收益 | 無 |

### 莫菲定律權重系統
- 基礎權重 1，其他事件權重均為 1
- 玩家連續從相同方向+位置投入 3+ 次時，每多一次 +3 權重
- 玩家連續 3+ 回合未移動設施時，每多一回合 +2 權重
- 觸發後權重追蹤重置，避免連續觸發
- 觸發後下次事件限定為：設施補給、地震、就業輔助、蕾雅的禮物

---

## 行動選項

每回合開始隨機提供 2 個行動選項（費用隨輪數遞增）：

| 行動 | 基礎費用 | 效果 |
|------|----------|------|
| 🏗 購買設施 | 6 | 從設施池隨機取 3 選 1 加入手牌 |
| ⚡ 觸發隨機事件 | 3 | 立即觸發一個隨機事件 |
| 🔧 重新排列設施 | 4 | 自由移動所有設施後鎖定 |
| 🤝 招募合夥人 | 8 | 隨機 3 選 1 招募合夥人 |
| ⬆ 提升設施數值 | 5 | 選一個設施永久 +1 輸出 |
| ✨ 下次輸出加成 | 4 | 下次元素以特定類型輸出時 +3 |
| 🔄 更換預告事件 | 2 | 重新抽一個下回合的隨機事件 |
| 😴 什麼也沒發生 | 0 | 跳過行動 |

行動費用公式：`ceil(基礎費用 × max(1, 1 + (輪數-1) × 0.35))`

---

## UI 與互動

### 佈局（三欄式）
- **左欄 (155px)**：手牌設施列表、人材面板、合夥人列表、提示
- **中欄**：4×4 格子小鎮（含四方向投入按鈕）
- **右欄 (220px)**：本次收益、回合記錄、結束回合按鈕

### 扇形手牌系統
- 固定在畫面底部，卡牌以扇形展開
- 支援拖曳放置到小鎮格子
- 卡牌有燃燒消失動畫（`burnAway`）

### 投入方向
- 格子四邊有方向箭頭按鈕，拖曳中才顯示
- 場風大師可限制只能從特定方向投入（`wind-blocked` / `wind-active`）
- 颱風事件也會限制投入方向

### 角色系統
- 右下角有角色立繪（`#char-tray`）
- 對話泡泡系統（`#char-bubble`）

### 開發者面板
- 按特定鍵開啟（左側浮動面板）
- 可直接新增設施、跳回合、設定收益等

---

## 遊戲狀態（G 物件關鍵欄位）

| 欄位 | 說明 |
|------|------|
| `round` | 當前輪數 |
| `turn` / `maxTurns` | 當前回合 / 最大回合數(10) |
| `goal` / `profit` | 本輪目標收益 / 已累計收益 |
| `card` | 當前資源卡牌 `{value, type}` |
| `grid` | NxN 二維陣列，儲存設施 ID |
| `hand` | 手牌陣列 `[{id, count}]` |
| `partners` | 持有的合夥人 ID 陣列 |
| `talentCards` | 人材數量 |
| `gridSize` | 地圖大小（預設 4，大地主 5） |
| `windDir` | 場風大師指定方向 |
| `buff` | 本回合臨時增益（matCrash/logisticsDisabled/noMatToGoods/cafeteriaDisabled/moneyToGoodsPenalty/laborInsurance 等） |
| `inv` | 每次投入重置的臨時 flag 物件（`sendEl()` 初始化），含：`facHit`、`logSet`、`envyPen`、`cenHits`、`logHits`、`speedAct`、`ampAct`、`fxM2G`/`fxG2M`、`arbM2G`/`arbG2M`、`windOK`、`hwCenter`、`exchBoard`、`sendIdx`、`cellPath` |
| `turnFacMoved` | 本回合設施移動計數（`startTurn()` 重置），動態加強器用 |
| `cellMods` | 格子固定修正值 `{'r,c': +N/-N}` |
| `cellPctMods` | 格子百分比修正值 `{'r,c': +10/-10}`，向上取整，資源最小 1 |
| `eventTriggerCounts` | 事件累計觸發次數 `{eventId: count}` |
| `nextEventData` | 預計算事件資料 `{cells:[], ...}`，供預告高亮與觸發使用 |
| `bldgUpgrades` | 設施升級加成 `{'r,c': bonus}` |
| `leyaPctMods` | 蕾雅升級百分比加成 `{'r,c': +2/+4/...}`，永久累積 |
| `ruinCells` | 廢墟格子 Set，設施消滅時自動新增 |
| `deptStoreAnchors` | 百貨公司錨點（左上格）`{'r,c': true}` |
| `deptStoreParts` | 百貨公司部分格→錨點映射 `{'r,c': 'anchorR,anchorC'}` |
| `demolitionCharges` | 拆遷隊可用免費重排次數（可累積） |
| `bombTimers` | 爆破裝置倒數 `{'r,c': 3/2/1}` |
| `tempShedMoves` | 臨時工棚移動計數 `{'r,c': count}` |
| `futuresLock` | 期貨交易所鎖定倍率 `{'r,c': mult}` |
| `logisticsVault` | 物流倉儲存值 `{'r,c': value}` |
| `cellOverlay` | 物流之王/倉儲女王疊加設施 `{'r,c': bldgId}` |
| `partnerState` | 合夥人專屬狀態 `{partnerId: any}` |
| `_murphyTrack` | 莫菲定律權重追蹤 `{lastSend, repeatCount, noMove}` |
| `_murphyNextPool` | 莫菲觸發後下次事件限定池 flag |
| `_eventDeferred` | 跨輪未觸發事件延遲次數 |
| `_futuresMoveNext` | 期貨交易所下回合需移動列表 `[{r,c}]` |
| `_landSpecStale` | 地皮炒家設施未移動回合計數 `{'r,c': count}` |
| `_industrializing` | 工業化模式 flag，`finish()` 攔截結算用 |

---

## 存檔/讀檔系統

### 機制
| 功能 | 觸發 | 說明 |
|------|------|------|
| 自動存檔 | 每回合開始、每輪開始、過關時 | 靜默存入 `localStorage`（教學中不存） |
| 匯出存檔 | Header 💾 按鈕 | 下載 `VentureTown_R{輪}_T{回合}_{日期}.json` |
| 匯入存檔 | Header 📂 按鈕 | 選擇 `.json` 檔案，驗證後恢復 |
| 繼續遊戲 | 頁面載入偵測 | 有存檔 → 「繼續/新遊戲」選擇 |
| 存檔清除 | 失敗重開時 | `clearAutoSave()` |

### 存檔格式
```json
{ "v": 1, "ts": "ISO時間", "g": { ... }, "cs": N, "mega": [...] }
```
- `v`：版本號（供未來遷移）
- `g`：完整 G 狀態（`Set` → `{_s:[...]}` 序列化）
- `cs`：複合設施序號計數器 `_compoundSeq`
- `mega`：巨型設施陣列（工業化系統），讀檔時同步到 `MEGA_KEY` localStorage

### 反序列化安全措施
- **驗證必要欄位**：`round`/`hand`/`grid`/`partners` 缺失時拒絕載入
- **Set 還原**：遞迴掃描 `{_s:[...]}` 標記還原為 `Set`
- **臨時狀態清除**：載入時重置 `inv`/`sel`/`moveMode`/`upgradeMode`/`freeRearrange` + 刪除所有 `_` 前綴模式 flag 和快照
- **事件預告重建**：`precomputeEventData()` 重建 `nextEventData`
- **Phase 保護**：resume/import 時非 `place` phase 強制重置

### 跨回合狀態（持久保留）
`demolitionCharges`、`_murphyTrack`、`_murphyNextPool`、`_eventDeferred`、`_futuresMoveNext`、`_landSpecStale`、`partnerState`、`eventTriggerCounts`、`roundHistory`、`difficultyMult`

### 共用常數
`KEYED_DATA_FIELDS`：8 個需隨設施位置轉移的鍵值欄位，供 `swapCellData`/地震/期貨移動共用
```
['bldgUpgrades','leyaPctMods','cellMods','bombTimers','tempShedMoves','logisticsVault','cellOverlay','futuresPct']
```
注意：`cellPctMods` 不在其中（事件效果綁定格子位置，不跟隨設施移動）

---

## 工業化系統（開發者模式）

### 概念
玩家可將當前小鎮（4×4 或 5×5）快照為「巨型設施」。巨型設施在獨立的 4×4 地圖上排列，資源投入流程比照正式遊戲，差別在於格子上是巨型設施。目前僅支援兩層（普通 → 巨型），僅在開發者模式中可用。

### 建立流程
1. 開發者面板 → 🏭 工業化 → 資源卡強制為 💰1
2. 玩家選擇方向投入，資源跑完小鎮路徑（含完整動畫與設施效果）
3. 系統記錄實際路徑、投入/輸出類型、模擬收益
4. 巨型設施存入 `localStorage`（`VentureTown_MegaFacilities`）及遊戲存檔，遊戲繼續

### 巨型設施規則
- 佔巨型地圖 1×1 格，不管原始小鎮大小
- 顯示資源流向圖示（如 💰→📦）
- 不管從哪個方向進入，都走建立時固定的內部路徑
- 輸出方向取決於巨型地圖上的投入方向（非內部終點方向）
- 各巨型設施獨立結算收益
- 巨型地圖只能放巨型設施，不能放一般設施

### 巨型地圖（測試模式）
- 4×4 格子，無回合/目標限制
- 資源投入方式同一般小鎮（四邊方向箭頭，起始 💰1）
- 懸停格子 → 「進入巨型設施」按鈕 → 查看內部佈局

---

## 技術細節

- **單檔架構**：所有 HTML / CSS / JS 寫在同一個 `index.html`（~9564 行）
- **無框架**：純 vanilla JS，直接操作 DOM
- **字體**：Noto Sans TC（中文）、DM Mono（數值）
- **配色**：暖色系牛皮紙風格，CSS 變數控制主題色
- **動畫**：CSS keyframes（pulse、burnAway、profitFly 等）
- **拖曳系統**：支援卡牌拖曳到格子放置
- **圖片**：`img/C_1.png` ~ `C_6.png`（6 張角色表情立繪）

### 檔案結構
```
VT/
├── index.html              ← 主檔，所有邏輯（~9564 行）
├── VentureTown_GameDoc.md  ← 本文件
├── CLAUDE.md               ← 專案設定
├── 新合夥人表.xlsx          ← Excel 設計稿
├── img/C_1~C_6.png         ← 角色表情立繪
├── 實作規格/                ← 補充設計文件
└── 圖片參考/                ← 原始素材
```

### 程式碼架構概覽（行號為粗略近似，以 Session 14 為準）
| 區塊 | 說明 |
|------|------|
| CSS | inline style + CSS 變數 + event-preview 高亮 |
| HTML DOM | header（含存檔按鈕）/grid/panels/modal/overlay |
| BLDG | 79 種設施定義（含新增 26） |
| PARTNERS | 56 位合夥人（含 onSettle/onTurnStart/onRoundStart/onRecruit hook） |
| 工具函數 | KEYED_DATA_FIELDS/COUNT_PARTNERS/gainOmniCount/rollWindDir/hasPartner/isFacility/isShopType/isPoolableBldg/hasTag/clearKeyedData/GN/eachCell/findCells |
| EVENTS | 19 種隨機事件（含預計算 + 地震滑動機制） |
| 格子修正 helper | 1642~1670 | applyRowColPctMod/apply2x2PctMod/flash 函數 |
| newGame() | 1668~1720 | G 物件初始化（含 `inv:{}`） |
| startRound() | 1724~1765 | 每輪開始（合夥人 onRoundStart hook → startTurn()） |
| 事件系統 | 1869~1950 | triggerEvent/showEv/evDone/evPick/applyBuff |
| tryPlaceAtCell() | 1969~2097 | 統一放置邏輯（click/drag 共用） |
| onCell() | 2099~2185 | 格子點擊（模式分流 → tryPlaceAtCell） |
| 拖曳系統 | 2190~2320 | 元素卡牌 + 設施 + 複合設施拖曳（onCellDrop → tryPlaceAtCell） |
| sendEl() | 2325~2388 | 資源投入（G.inv 重置 + 路徑構建） |
| FACILITY_FX | 2390~2760 | 35 個設施特效 handler（dispatch 調度表） |
| stepWithMover() | 2761~3118 | 資源行進（鑽石×12 + FACILITY_FX 調度 + redirect + 通用轉換） |
| finish() | 3119~3315 | 結算收益（onSettle 合夥人 hook + 設施/buff 效果） |
| 動態難度 | 3320~3358 | adjustDifficulty() |
| 行動選項 | 3360~3540 | doAction/openActionOverlay |
| 自由排列拖曳 | 3550~3655 | onRearrangeDrag 系列 |
| startTurn() | 3657~3850 | 回合控制（防重入守衛、onTurnStart、稅務局、磁力板、爆破裝置、場風、turnFacMoved 重置） |
| render / renderGrid() | 3972~4300 | 主渲染（event-preview 高亮 + cellPctMods） |
| renderFanHand() | 4590~4750 | 扇形手牌 |
| 工具函數群 | 4750~5220 | expandGrid/destroyFacility/swapCellData/onFacilityMoved/leyaUpgrade 等 |
| renderTalentPanel | 5219~5260 | 人材面板 |
| DIALOGUES / DM | 5305~5560 | 114 條台詞 + 表情系統 |
| 譚雅交換系統 | 5564~5635 | tanyaOfferSwap/showTanyaHandPick |
| TUT | 5647~6048 | 新手教學（9 步驟） |
| 存檔/讀檔系統 | 6054~6178 | autoSave/autoLoad/exportSave/importSave/showResumePrompt |
| 工業化系統 | 6843~7170 | MEGA_KEY/loadMega/saveMega/createMegaFacilityFromRun/simulateMegaFacility/MEGA 物件 |
| DEV | 7350~7460 | 開發者面板（含工業化按鈕） |

---

## 變更記錄

### Session 2（2026-04-11 前半）— Bug 修復 + 效能
| # | 修復 |
|---|------|
| 1 | 物流放大器 nv 提前引用 → 移到宣告後 |
| 2 | 物流轉向 N=4 → GN() |
| 3 | 貿易特區 ×1.05 → ×1.5 |
| 4 | commitTurnLog 加入 doNext |
| 5 | startRound 場風初始化 |
| 6 | 外貿港口重複計算 |
| 7 | 設施破壞者 +500 → +50 |
| 8-10 | isCenterCell 快取、renderSideLog 節流、mousemove 優化 |

### Session 3（2026-04-11 後半）— 事件系統大改 + Bug 排查
- **新增 8 個事件**：原料大降、地震、危險廢棄物、譚雅的禮物、蕾雅的禮物、運輸異常、重大食安、勞工保險
- **修改 5 個事件**：原料出口熱/商品熱銷（累積機制）、行業熱潮/區域效應/地塊共鳴（+1→+10%）
- **新增 cellPctMods 百分比格子修正系統**（向上取整，最小值 1）
- **新增 eventTriggerCounts 事件累積計數**
- **新增 precomputeEventData 預告系統**（預先決定受影響格子，觸發前 1 回合藍色高亮）
- **爆破裝置改版**：消滅自身 + 隨機消滅一個相鄰設施
- **stepWithMover 新增 6 種 buff 處理**：matCrash/logisticsDisabled/noMatToGoods/cafeteriaDisabled/moneyToGoodsPenalty/laborInsurance
- **新增 17 條台詞 + 表情**
- **自由排列改為拖曳操作**：onRearrangeDrag 系列函數，格子 draggable，拖放交換
- **譚雅點擊台詞修正**：與現行交換機制一致
- **Bug 修復**：matCrash/matOutMult 互斥（防止 ×4 疊加）、爆破裝置迴圈安全（先收集再處理）
- **危險廢棄物**：3 個→1 個爆破裝置
- **爆破裝置格子顯示倒數**：紅色數字（3→2→1→爆炸）
- **爆破工程師實作**：正面（消耗2收益點擊摧毀設施）+ 負面（每輪目標+10%）
- **複合設施系統**：1/3 機率取得兩格黏合卡牌，放置時須同時放兩格設施
- **稅務局修正**：從 startRound（每輪一次）移至 startTurn（每回合一次）

### Session 4（2026-04-12 前半）— 合夥人全面實作
- **傲慢惡魔修正**：`isDemonNegDisabled(pid)` 只豁免名稱含「惡魔」的合夥人
- **完整實作 8 個合夥人**：勞動部長、人力資源總監、倉儲女王、外匯交易員、黑市商人、套利者、壟斷者、地皮炒家
- **補完負面效果 3 個**：人力仲介（每輪目標+5%）、運輸大亨（未通過物流-50%）、廢墟掠奪者（廢墟>3每格-2）
- **設施破壞者 desc**：+500 → +50

### Session 5（2026-04-12 後半）— 設施擴充 + 廢墟系統 + 程式碼重構

#### 新增設施
- **磁力板**：每回合開始與相鄰隨機設施交換位置（startTurn 實作）
- **4 種商店系設施**：小型販售商（🛍️）、黃牛販子（🎫）、量販店（🛒）、百貨公司（🏬）
- **百貨公司 2×2 機制**：需放在 4 個商店上，佔 2×2 格，`dept_store`（錨點）+ `dept_store_part`（3 部分格），消滅時整個 2×2 變廢墟
- **`isShop` 標記 + `isShopType()` 函數**：統一判斷商店系設施，影響基礎商店老闆、貿易特區、壟斷者、鑽石×12

#### 廢墟系統全面實作
- **`ruin` BLDG 條目**（🏚️）：設施消滅後在 grid 放置 `'ruin'`（不再設為 null）
- **`isFacility(bId)` 工具函數**：排除 ruin，更新所有遍歷（稅務局、磁力板、爆破裝置、環境感應站、事件系統等 10+ 處）
- **資源經過廢墟**：不產生任何交互（除廢墟掠奪者隨機 +5%~23%/廢墟）
- **廢墟紀念碑**：只能放在廢墟上（點擊 + 拖曳皆支援），消滅後還原為空地（不變廢墟）
- **渲染**：`.ruin-cell` CSS 斜紋背景 + 半透明 🏚️ emoji
- **不可複合設施**：`ruin`、`ruin_monument` 加入 `COMPOUND_EXCLUDE`

#### 合夥人修改
- **蕾雅改版**：升級時額外 +2%（`G.leyaPctMods`，永久累積）；重新排列時可合併同類設施升級
- **拆遷隊改版**：說明改為「每 3 回合獲得並儲存一次免費重排機會（可累積）」
- **壟斷者改版**：正面效果改為「每 3 個商店系設施，商品→金錢時 +5%」

#### 科技研發動畫修復
- `_hit()` → `_hitM()`：修復格子上 mover 動畫不顯示商品數量增加的問題

#### 拖曳系統改良
- **設施設置預覽**：拖曳到格子時顯示半透明設施 emoji + 名稱（取代綠框）
- **隱藏拖曳跟隨圖像**：`setDragImage` 設為透明 canvas
- **複合設施預覽修復**：用 `.compound-preview` class 追蹤，dragLeave 時正確清除
- **複合設施手牌爆框修復**：加入 `overflow:hidden` + `text-overflow:ellipsis`
- **複合設施懸浮提示**：顯示兩個設施的完整資訊

#### 開發者面板新增
- **隨機複合設施**：從設施池抽取隨機組合
- **清除小鎮所有設施**：含廢墟、百貨公司資料

#### 程式碼重構
- **`swapCellData(r1,c1,r2,c2)`**：統一交換 grid + bldgUpgrades + leyaPctMods（取代 3 處重複）
- **`onFacilityMoved(r,c,sr,sc)`**：統一處理交換後附帶效果（取代 2 處重複）
- **`leyaUpgrade(r,c,bId)`**：統一蕾雅升級邏輯（取代 2 處重複）
- **`leyaPctMods` 快照修復**：重新排列的取消還原加入 `_leyaSnapshot`

### Session 6（2026-04-12 前半）— 待處理項目清理 + UI 改善

#### Bug 修復
- **onMBtn 失敗重開**：lose 時改為 `G=newGame(); showStarterPartnerSelection()`，讓玩家重新選擇起始合夥人（之前直接跳過選擇）

#### 路線規劃師完整實作
- **正面效果**：每回合可免費移動一個物流中心（click-to-select → click-to-move UI）
  - `onTurnStart` 設 `G._freeMoveLogistics=true`
  - `onCell` 中兩段式點擊：第一次選 redirect 設施，第二次移到空格/廢墟
  - 格子高亮：選中的物流中心 `move-src`，未選時所有 redirect 設施 `upgrade-glow`
  - 格子下方顯示「跳過移動」按鈕
- **負面效果**：`finish()` 中物流中心（redirect 設施）< 2 個時收益 -30%

#### UI 改善
- **過關按鈕文字**：`showModal` 根據 mode 動態設定按鈕文字（win→「繼續下一輪」，lose→「重新開始」）
- **開發者面板 tooltip**：所有 `dev-row` 按鈕加入 `title` 懸浮提示
  - 資源操作：說明具體效果
  - 合夥人卡片：改為顯示正面+負面效果
  - 事件：顯示 `ev.desc`
  - 行動：說明「免費執行（暫時補滿收益）」
  - 遊戲控制：說明每個按鈕的作用

### Session 7（2026-04-12 後半）— Bug 修復 + 全面驗證

#### Bug 修復
- **混沌建築師 `onRoundStart` → `onTurnStart`**：從每輪觸發改為每回合觸發，與文件描述一致
- **混沌建築師加入 `swapCellData()`**：移動設施時正確轉移 `bldgUpgrades` 和 `leyaPctMods`
- **混沌建築師加入 `onFacilityMoved()`**：觸發連鎖效果（臨時工棚計數、拆遷補償局 +1、地皮炒家 +20）
- **混沌建築師加入 `ruinCells` 清理**：移動到廢墟格時正確清除廢墟記錄
- **速遞站功能實作**：`_speedStationActive` flag 原本設了但從未消費，效果完全無效
  - 新增消費邏輯：通過速遞站後，下一格設施額外觸發一次
  - 若下一格為空格或廢墟則效果浪費（符合文件「若下一格有設施」的條件）
  - 在 `sendEl` 初始化時重置 `_speedStationActive` 和 `_logisticsAmpActive`
- **教學 Step 8 行業熱潮**：`G.cellMods +1/-1` → `G.cellPctMods +10%/-10%`，與正式 `row_buff` 事件一致
  - 更新 UI 描述文字、台詞、事件預告描述
  - `TUT.finish()` 中加入 `G.cellPctMods = {}` 清理

#### 死碼清除
- 移除 `_tradeMoneyToGoods` / `_tradeGoodsToMoney`（設了但從未讀取，實際使用 `_forexMoneyToGoods` / `_arbMoneyToGoods`）

#### 全面功能驗證
- **確認所有 50 種設施**均已定義 + 邏輯實作完畢
- **確認所有 30 位合夥人**均已定義 + 邏輯實作完畢（hook 或 `hasPartner()` 檢查）
- **確認所有 17 種事件**均已定義 + 觸發邏輯完畢
- **確認所有 8 種行動選項**均已定義 + 費用遞增公式實作完畢
- **教學系統**：9 步驟結構完整，不需要重構

#### 程式碼重構：FACILITY_FX 調度表
- **`const FACILITY_FX`**：35 個設施特效 handler 從 `stepWithMover` 提取為獨立調度表
  - 每個 handler 接收 `fx` context：`{el, r, c, cellEl, hit(), hitM(), next(), pulse(), updateCard(), updateMover()}`
  - `stepWithMover` 從 ~740 行縮減至 ~360 行
  - 新增設施只需在 `BLDG` 定義 + `FACILITY_FX` 新增 handler，不需修改核心函數
  - 保留 inline：鑽石×12、物流中心轉向（redirect）、通用轉換邏輯
- **`onSettle` 合夥人結算 hook**：15 個合夥人結算效果從 `finish()` 提取至 PARTNERS 定義的 `onSettle(G, profit, el)` 方法
  - `finish()` 從 ~321 行縮減至 ~193 行
  - 新增合夥人結算效果只需在 PARTNERS 定義加 `onSettle`，不需修改 `finish()`
  - 統一 hook 名稱：`poverty_god.onFinish`、`greed.onTurnEnd`、`wrath.onTurnEnd` 均改為 `onSettle`
- **`G.inv` 投入臨時 flag 統一管理**：14 個每次投入重置的 `G._xxx` flag 集中到 `G.inv={...}`
  - `sendEl()` 開頭一行重置所有 flag
  - 旗標清單：`facHit`、`logSet`、`envyPen`、`cenHits`、`logHits`、`speedAct`、`ampAct`、`fxM2G`/`fxG2M`、`arbM2G`/`arbG2M`、`windOK`、`hwCenter`、`exchBoard`
- **`G.turnFacMoved` 獨立為每回合 flag**：動態加強器需要本回合（非本次投入）的設施移動計數，從 `G.inv` 移出至 `startTurn()` 重置
- **`eachCell(fn)` / `findCells(pred)` 格子遍歷工具**：取代 8 處重複 `for(r) for(c)` 迴圈

#### 重構後驗證
- 確認無殘留舊 flag 名稱（15 個全部替換）
- 確認 `lust.modifyFinish` 仍在 profit 計算前執行（未被誤改為 onSettle）
- 確認 `G.inv` 在 `newGame()` 初始化為空物件、`sendEl()` 正確重置
- 確認所有 `findCells` 回呼參數正確
- 移除 `newGame()` 中殘留的 `turnFacilitiesHit`、`turnBuildingTypes` 孤兒屬性

#### 地震事件重寫
- **滑動機制修正**：設施逐個往指定方向滑動，直到遇到邊界或其他設施/廢墟
  - 廢墟視為障礙不滑動（原本廢墟也跟著滑）
  - 處理順序：靠近目標邊的設施先處理（避免碰撞）
- **位置鍵值資料轉移**：滑動時一併轉移 `bldgUpgrades`、`leyaPctMods`、`bombTimers`、`tempShedMoves`、`futuresLock`、`logisticsVault`、`cellOverlay`（原本只轉移 bldgUpgrades 和 leyaPctMods）
- 重建百貨公司追蹤和廢墟 Set

#### 教學 Bug 修復
- **Step 8 拆遷隊非強制**：原本玩家必須使用拆遷隊才能繼續，現在可直接按「結束回合」跳過
  - 保持 `G.phase='place'`（拆遷隊可用），手動啟用結束回合按鈕
  - `doNext()` 在 phase check 之前攔截 `waitingFor==='use_demolition'`，直接進入 Step 9
- **教學→正式遊戲狀態轉換**：`TUT.finish()` 改為呼叫 `newGame()` 取得乾淨狀態，僅保留 grid / partners / gridSize
  - 修復教學殘留的 `demolitionCharges=1`、`bombTimers`、`bldgUpgrades`、`partnerState` 等資料帶入正式遊戲

#### UI 修復
- **格子修正重複顯示**：`cellMods`（+N）和 `cellPctMods`（+10%）在有設施的格子上同時顯示在 inline span 和浮動 badge，移除 inline span 重複
- **事件預告格子高亮**：原本只在觸發前 1 回合顯示，改為只要預告橫幅存在就高亮受影響格子
- **手牌卡片放大 1.5 倍**：卡片 76×105 → 114×158，字體等比放大，扇形區域高度 150 → 200px
- **方向箭頭被手牌遮蓋**：拖曳卡牌時箭頭 z-index 提升至 70（手牌區 60），修復底部箭頭無法拖放
- **人材 buff 視覺**：人材拖到資源卡後，左上角顯示綠色 `🧑‍💼×N` badge，卡牌描述改為「額外投入 N 次」
- **移動器數值不更新**：`_hit()` 未呼叫 `updateMover()`，導致 18+ 個 FACILITY_FX handler（集體罷工台、臨時工棚等）修改數值後移動器顯示不變。統一 `_hit` 和 `_hitM`

#### 設施修正
- **集體罷工台描述**：`消耗所有人材，每個+10數值（主動觸發）` → `資源通過時消耗所有人材，每個+10數值`
- **清倉拍賣場效果修正**：原本將商品轉換成金錢（×4），改為商品值×4 加入收益、商品以值 1 繼續流動

#### 重新排列系統修正
- **`cellMods` 跟隨設施移動**：`swapCellData` 新增 `cellMods` 交換，人材加成（+1）和地皮炒家加成（+20）跟隨設施
  - 重新排列快照/取消/確認加入 `G._cellModsSnapshot`
  - `cellPctMods`（事件 +10%/-10%）維持綁定格子位置，不跟隨移動

#### 佈局調整
- **合夥人列表移至左欄**：從主格子下方移到左側面板（人材面板下方、提示上方），不需捲動即可見

#### 新增事件
- **🔀 莫菲定律**（murphy）：所有設施隨機打亂位置 + 獲得 2 張複合設施
  - 加權抽選：重複投入同方向 3+ 次（+3/次）、��移動設施 3+ 回合（+2/回合）
  - 觸發後重置權重、下次事件限定池（設施補給/地震/就業輔助/蕾雅的禮物）
  - 設施附帶資料（bldgUpgrades/leyaPctMods/cellMods）一併轉移
- **💼 就業輔助**（job_assist）：獲得目標 20% 收益

#### 程式碼清理
- 移除未使用的 `applyRowColMod()` / `apply2x2Mod()`（-14 行）
- 修復拆遷隊重排缺少 `cellMods` 快照
- 移除重複 CSS `.dbtn.drag-over`
- 統一 `_hit` / `_hitM` 為單一函數，移除 `fx.hitM()`
- 新增 `.move-src` CSS class

#### 事件系統修復
- **颱風 windDir 被覆蓋**：`startTurn()` 和 `startRound()` 中無場風大師時 `G.windDir=null` 會覆蓋颱風設定的方向限制，改為檢查 `typhoonActive` buff 後才重置
- **Buff 生命週期驗證**：確認所有 7 種 buff 事件與 startTurn 無其他衝突；cellPctMods 清除時機正確
- **莫菲定律改為觸發時劫持**：不進入預告池，在事件觸發時由 `checkMurphyHijack()` 根據權重替換預告事件（第 2 輪起）
- **莫菲定律保證複合設施**：改為直接建立 2 張複合設施（原本 `addHandMaybeCompound` 只有 1/3 機率）
- **跨輪事件保留 + 遞減延遲**：`startRound()` 保留未觸發事件，每延遲一輪觸發回合提前 1（turn 3→2→1），最多延遲 2 輪必觸發。觸發條件改為 `turn>=nextEventTurn`
- **清倉拍賣場收益修正**：收益改用 `G.inv.clearanceBonus` 暫存，在 `finish()` 中入帳，正確計入 totalTurnProfit

#### 收益飛行動畫系統
- **新增 `profitFlyFrom(srcEl, amount)`**：通用動畫，從任意元素飛向收益 UI，負數紅色
- **新增 `profitFlyFromCell(r, c, amount)`**：從格子飛出
- **覆蓋 16 處非標準收益變動**：9 個合夥人 onSettle + 進出口稅站 + 清倉拍賣場 + 拆遷補償局 + 稅務局 + 嫉妒工廠 + 就業輔助事件

#### 資料完整性修復
- **onSettle `this` 綁定**：改用 `.call(p, ...)` 確保 `this.id` 正確
- **G.inv 初始化補全**：加入 `clearanceBonus:0, clearanceCells:[]`
- **swapCellData 完整性**：新增 `bombTimers`、`cellOverlay`、`tempShedMoves`、`futuresLock`、`logisticsVault` 交換
- **莫菲定律打亂**：清除 `cellOverlay` 和 `bombTimers`
- **checkMurphyHijack**：加入 `TUT.active` 防護
- **新增 `.fc-back-mark` CSS**、**新增 `.move-src` CSS**

#### 最終架構驗證
- 15 個舊 flag 名稱全部清除 ✓
- 所有函數均有呼叫者（無死碼）✓
- FACILITY_FX 統一使用 `fx.hit()`（無 hitM）✓
- `swapCellData` 交換 9 種位置鍵值資料 ✓
- `cellPctMods` 正確不跟隨移動（事件效果綁定格子）✓
- `_landSpecStale` 由 `onFacilityMoved` hook 處理 ✓
- 百貨公司 2×2 由重建邏輯處理（非單格交換）✓

#### 莫菲定律觸發條件調整
- 權重閾值：重複投入 3→4 次起才加權，未移動 2→5 回合起才加權
- 機率上限 60%（公式 `min(0.6, weight/(weight+5))`），防止高權重必發
- 跨輪事件遞減延遲：每延遲一輪觸發回合提前 1（turn 3→2→1），觸發條件改為 `turn>=nextEventTurn`

#### 莫菲定律全屏特效
- 觸發時隱藏右下常駐立繪
- 全屏黑幕（`rgba(0,0,0,.7)`）+ 畫面震動（`#main` 震動 3 次）
- 立繪（C_2.png 表情 2）：80vw 寬、填滿畫面、`object-fit:cover` 裁切膝蓋以下
- 台詞在畫面最上方，可與立繪重疊但不遮住頭部
- 點擊或 5 秒自動關閉，恢復常駐立繪

#### 合夥人懸停浮動面板
- 懸停合夥人卡片時，在左側面板右邊彈出 `#partner-float` 浮動面板
- `position:fixed` + `z-index:500`，不受面板 overflow 裁切
- 顯示所有合夥人卡片（正常間距），鼠標可移到面板上保持顯示
- 200ms 延遲隱藏

#### 設施改版
- **轉運中心**：放置後彈出 4 方向選擇器（⬆️⬇️⬅️➡️），點選後變成對應物流箭頭。支援點擊和拖曳放置，ESC/點擊外部可關閉
- **期貨交易所**（全面改版）：
  - 接受任意資源，隨機 ±10%（向上取整，至少 ±1，最小值 1）
  - 百分比每回合重新抽選，在格子上顯示（綠色正/紅色負）
  - 下回合自動移動到隨機空格，無空格時消滅自己
  - `G.futuresPct` 加入 newGame/swapCellData/earthquake/futures 移動
- **清倉拍賣場**：商品值×4 加入收益，商品以值 1 繼續流動（不轉換成金錢）

#### 最終架構驗證（第二次）
- 匯率波動板：`Math.round` → `Math.ceil` + sign（向上取整一致性）
- 地震 keyedData：補入 `cellMods`（人材/地皮炒家加成跟隨滑動）
- futuresPct 資料完整性：newGame/swapCellData/earthquake/futures 移動/handler fallback 全覆蓋
- 廢棄 `futuresLock` 全部移除
- 轉運中心：onCell + onCellDrop 雙路徑均觸發方向選擇器

#### 百貨公司整體化
- **2×2 統一渲染**：錨點格用 `position:absolute` overlay 覆蓋 4 格，顯示大 emoji + 效果說明 + 加成
- **加成聚合**：資源通過時合計 4 格的 cellMods/cellPctMods/bldgUpgrades/leyaPctMods
- **相鄰判定整體化**：新增 `countAdjacentFacilities(r,c)` 和 `hasAdjacentShop(r,c)`，百貨公司用錨點去重
- **映射重建**：新增 `rebuildDeptStore()`，每次 `swapCellData` 後自動呼叫

#### 格子懸停詳細資訊
- 懸停 1 秒後顯示所有加成來源：升級、蕾雅%、格子加成、事件%、期貨%、爆破倒數、疊加設施、事件預告

#### 傲慢惡魔負面豁免修復
- 補齊 5 個缺漏的 `isDemonNegDisabled` 檢查：慾望、怠惰、激情、嫉妒、貪婪、暴食（onRoundStart）

#### 其他修復
- 合夥人浮動面板：修復遞迴 hover + 點擊互動
- 莫菲打亂：清除 `futuresPct`
- 移除死碼 `gluttony.modifyCard()`

#### 新增合夥人
- **👑 無冕之王**（uncrowned_king）：onSettle — x 個廢墟 → +(x²/2)% 收益，每有人材 45% 機率重複（上限 y 次）
- **🏠 擁慶記房屋**（yongqing_house）：每回合可點擊賣出一個設施（不產生廢墟），收益 = `ceil(profit × 0.1 × x / 100 × turn)`，x 每次賣出 +1
  - 百貨公司賣出：用錨點定位只移除該組 2×2
  - 取消機制：點擊空格/廢墟或 ESC 取消賣出模式

#### 譚雅新效果
- **手牌為空時自動補牌**：`onTurnStart` — 手牌無設施時隨機獲得 1 張

#### 設施放置限制修正
- **廢墟紀念碑**：描述更新為「只能放在廢墟上，資源通過時+5」；台詞「唸唸」→「念念」
- **中央限定（centerOnly）拖曳放置**：`onCellDrop` 原本未檢查 centerOnly，拖曳可繞過限制。已加入檢查 + 拖曳預覽過濾
- 放置限制驗證：
  - `ruinOnly`（廢墟紀念碑）：onCell ✓ onCellDrop ✓
  - `centerOnly`（貿易代理、科技研發）：onCell ✓ onCellDrop ✓（本次修復）
  - `needs2x2`（百貨公司）：onCell ✓ onCellDrop ✓

#### 開發者面板新增
- ⏱️ +10 回合（`G.maxTurns+=10`）
- 🗿 獲得廢墟紀念碑

#### 企劃書更新
- `VentureTown_企劃書.xlsx`：市場事件 17→19 種、事件規則更新、新增莫菲定律權重系統與收益飛行動畫至特殊機制

#### 擁慶記房屋賣出動畫
- 進入賣出模式時，小鎮上有設施的格子持續 `sellShake` 抖動動畫
- 滑鼠懸停設施格顯示紅色外框提示
- 賣出/取消後動畫停止

#### 譚雅修正
- **手牌為空自動補牌**：`onTurnStart` — 手牌無設施時隨機獲得 1 張
- **交換技能重複觸發修復**：`doAction` 結束後呼叫 `startTurn()` 導致 `tanyaOfferSwap` 被第二次觸發。改為 `G.phase='place'; render();`，僅在 evDone/evPick/doNext 保留 `startTurn()`

#### QA 測試套件更新
- 新增 section 14：無冕之王 + 擁慶記房屋 + 譚雅補牌
- 新增 section 15：countAdjacentFacilities 百貨公司去重
- 總測試數：249 → 258，全部通過

### Session 8（2026-04-13）— 架構精簡 + 存檔系統

#### Bug 修復
- **`doAction('upgrade')` 5×5 漏格**：遍歷設施用 `N`(4) 硬編碼 → 改為 `GN()`，修復大地主 5×5 地圖時無法升級第 5 行/列設施
- **click 放置缺少譚雅 +1**：onCell 的一般放置路徑未套用譚雅額外 +1 升級（只有 drag 有）→ 提取 `tryPlaceAtCell()` 統一後自動修復

#### 程式碼重構
- **`tryPlaceAtCell(r,c,bldgId)`**：從 `onCell` 和 `onCellDrop` 提取統一放置邏輯（複合/百貨/蕾雅/廢墟紀念碑/中央限定/疊加/一般），兩處各縮減為 1-2 行呼叫（-120 行重複）
- **`KEYED_DATA_FIELDS` 常數**：8 個位置鍵值欄位統一定義，取代地震/期貨/swapCellData 3 處重複列表
- **`swapCellData()` 精簡**：9 種欄位的個別交換邏輯 → 統一 `KEYED_DATA_FIELDS.forEach` 迴圈（35 行 → 11 行）
- **`rollWindDir()` 函數**：取代 `startRound`/`startTurn`/`recruitPartner` 3 處重複場風方向抽選
- **百貨公司重建統一**：地震/莫菲事件的手寫重建 → 呼叫 `rebuildDeptStore()`

#### 死碼清除
- 移除 `PARTNER_AVATARS` 常數（含 ~38KB base64 圖片資料，已無引用）
- 移除 `.jc-avatar`、`.sel-card-avatar` CSS class（已無使用）

#### 存檔/讀檔系統（新增）
- **localStorage 自動存檔**：每回合/每輪開始 + 過關時靜默存入，教學中跳過
- **JSON 匯出/匯入**：Header 💾📂 按鈕，下載/上傳 `.json` 存檔檔案
- **繼續遊戲提示**：頁面載入偵測 localStorage 存檔 → 「繼續遊戲/新遊戲」選擇卡
- **Set 序列化**：`ruinCells` 等 Set → `{_s:[...]}` 標記，反序列化時遞迴還原
- **反序列化安全措施**：
  - 驗證必要欄位（`round`/`hand`/`grid`/`partners`），缺失時拒絕載入
  - 清除 12 個臨時模式 flag（`freeRearrange`/`upgradeMode`/`_demoExpertMode` 等）
  - 清除快照欄位（`_gridSnapshot`/`_upgradesSnapshot`/`_leyaSnapshot`/`_cellModsSnapshot`）
  - 重置 `G.inv={}`（每次 `sendEl` 會重建）
  - `precomputeEventData()` 重建事件預告
  - resume/import 時非 `place` phase 強制重置
- **跨回合狀態完整保留**：`demolitionCharges`/`_murphyTrack`/`_murphyNextPool`/`_eventDeferred`/`_futuresMoveNext`/`_landSpecStale`/`partnerState`/`eventTriggerCounts`/`roundHistory`/`difficultyMult`
- **失敗重開時 `clearAutoSave()`**：確保乾淨重啟

#### 存檔讀檔 Bug 修復
- **讀檔後無法結束回合**：`deserializeGame` 未重置 `elementExtraUses`（人材額外投入次數），殘留 >0 時 `finish()` 不設 `phase='done'`，按鈕永遠禁用
  - 新增重置：`elementExtraUses=0`、`phase='place'`、`actionOptions=[]`

#### 場景管理器（新增）
- **SM（Scene Manager）**：`SM.define(name, {enter, exit})` 註冊場景、`SM.goto(name, opts)` 切換場景
- **場景 `title`**：標題畫面（全屏 overlay），含遊戲標題、角色立繪、選單卡片（繼續遊戲/新手教學/開始遊戲/讀取存檔）
- **場景 `gameplay`**：遊戲主畫面，4 種進入模式（`tutorial`/`resume`/`new`/`import`）
- **轉場流程**：
  - BOOT → `SM.goto('title')`
  - 標題 → 繼續/教學/新遊戲/匯入 → `SM.goto('gameplay', {mode})`
  - 失敗重開 → `SM.goto('title')`（回到標題畫面）
- **清除舊函數**：`showTutorialPrompt`/`startTutorial`/`skipTutorial`/`showResumePrompt`/`resumeSavedGame`/`newGameFromPrompt` 全部由 SM 取代
- **importSave 整合**：偵測 `SM.current`，從標題匯入時自動切換至 gameplay 場景

#### 廢墟掠奪者改版
- **正面效果**：固定 +5 → 每個廢墟隨機 +5%~23%（`Math.floor(Math.random()*19)+5`，乘以廢墟數量）
- **負面效果**：廢墟 >3 格每格 -2（固定值）→ 每格 -2%（百分比，`Math.ceil(profit*pct/100)`）
- 更新 destroyFacility 中的廢墟掠奪者 log 描述

#### 總行數變化
- Session 7 結束：6328 行
- 重構精簡：-134 行（tryPlaceAtCell/KEYED_DATA_FIELDS/rollWindDir/rebuildDeptStore 統一 + 死碼清除）
- 存檔系統 + 場景管理器 + 標題畫面：+94 行
- Session 8 結束：6422 行

### Session 10（2026-04-14）— 工業化系統（巨型設施）

#### 新系統：工業化（開發者模式）
玩家可將當前小鎮快照為「巨型設施」，巨型設施在獨立的 4×4 地圖上排列與投入，形成兩層遊戲結構。

##### 巨型設施建立流程
1. 開發者面板 → 🏭「工業化」按鈕
2. 系統強制資源卡為 💰1，進入工業化模式（頂部顯示金色提示橫幅）
3. 玩家選擇方向箭頭正常投入，資源以完整動畫跑完小鎮路徑
4. `finish()` 攔截結算 → 記錄實際路徑、模擬收益、投入/輸出資源類型
5. 建立巨型設施存入 `localStorage`（`MEGA_KEY`）及遊戲存檔，遊戲繼續（`phase='done'`）

##### 巨型設施屬性
| 欄位 | 說明 |
|------|------|
| `id` | 唯一 ID（`mega_時間戳_亂數`）|
| `grid` | 建立時的小鎮格子快照 |
| `gridSize` | 原始地圖大小（4 或 5）|
| `partners` | 建立時的合夥人列表 |
| `buffs` | 建立時的 buff 狀態 |
| `bldgUpgrades`/`leyaPctMods`/`cellMods`/`cellPctMods` | 所有格子加成快照 |
| `path` | 實際經過的格子座標陣列（含物流轉向） |
| `entryCell` | 投入起點 `[r,c]` |
| `entryDir` | 投入方向 |
| `inputType`/`outputType` | 投入/輸出資源類型 |
| `simProfit` | 建立時的模擬收益 |
| `round` | 建立時的輪數 |
| `timestamp` | 建立時間 |

##### 巨型設施地圖（測試模式）
- 獨立的 4×4 格子（`#mega-overlay`），無回合/目標限制
- 格子上只能放置巨型設施，顯示資源流向圖示（如 💰→📦）
- 四邊方向箭頭投入資源（起始 💰1），資源依序通過巨型設施
- 資源進入巨型設施時：以當前數值模擬內部路徑（`simulateMegaFacility`）
- 不管從哪個方向進入，都走建立時固定的內部路徑
- 輸出方向取決於巨型地圖上的投入方向
- 各巨型設施獨立結算收益
- 右側面板顯示累計收益與投入記錄

##### 巨型設施內部模擬（`simulateMegaFacility`）
- 同步快速計算，無動畫
- 沿記錄路徑逐格處理：跳過 redirect（方向已烘焙）、檢查類型匹配
- 套用 `fn` 基礎效果 + `bldgUpgrades` + `leyaPctMods` + `cellMods` + `cellPctMods`
- 鑽石自動轉金錢，非金錢打 60% 折

##### 巨型設施 UI
- **地圖格子**：顯示 `inputType→outputType` 圖示、輪數、路徑長度、模擬收益
- **懸停按鈕**：「🔍 進入巨型設施」→ 開啟內部檢視 overlay
- **內部檢視**（`#mega-inspect-overlay`）：顯示原始 N×N 格子佈局、入口高亮（橘框）、路徑高亮（淡色底）、升級加成、合夥人列表、模擬收益
- **放置選擇器**：點擊空格 → 彈出已建立的巨型設施列表供選擇

##### 開發者面板新增
| 按鈕 | 功能 |
|------|------|
| 🏭 工業化（建立巨型設施） | 進入工業化模式，模擬投入後建立 |
| 🗺️ 巨型設施地圖（N個） | 開啟巨型設施測試地圖 |
| 🗑️ 清除所有巨型設施 | 清除 localStorage 中所有巨型設施 |

##### 儲存機制
- `MEGA_KEY = 'VentureTown_MegaFacilities'`
- `_megaFacilities` 陣列存入 `localStorage`，跨遊戲保留
- `loadMegaFacilities()` / `saveMegaFacilities()` 讀寫

#### 程式碼變更

##### 既有函數修改
- **`sendEl()`**：工業化時跳過颱風/場風方向限制；`G.inv` 新增 `sendIdx`（投入行/列索引）和 `cellPath:[]`（實際路徑追蹤）
- **`stepWithMover()`**：每步推入 `[r,c]` 到 `G.inv.cellPath`
- **`finish()`**：新增 `G._industrializing` 攔截分支 → `createMegaFacilityFromRun()` → 返回標題
- **`deserializeGame()`**：新增 `delete data._industrializing` 安全清理

##### 新增函數/物件
| 函數 | 說明 |
|------|------|
| `loadMegaFacilities()` | 從 localStorage 讀取巨型設施陣列 |
| `saveMegaFacilities()` | 將巨型設施陣列存入 localStorage |
| `createMegaFacilityFromRun()` | 從實際投入路徑建立巨型設施 |
| `simulateMegaFacility(mega, el)` | 同步模擬資源通過巨型設施 |
| `MEGA.open()` / `close()` | 開關巨型設施地圖 |
| `MEGA.sendMega(dir, idx)` | 巨型地圖資源投入 |
| `MEGA.render()` | 渲染巨型地圖（格子 + 方向箭頭） |
| `MEGA.placeMega(r, c, megaId)` | 放置巨型設施到地圖 |
| `MEGA.showPlacePicker(r, c)` | 顯示巨型設施選擇器 |
| `MEGA.inspect(megaId)` | 開啟內部檢視 overlay |
| `MEGA.startIndustrialize()` | 進入工業化模式 |
| `MEGA.cancelIndustrialize()` | 取消工業化模式 |

##### 新增 CSS
- `#mega-overlay`：巨型設施地圖全屏 overlay
- `.mega-cell`：巨型地圖格子（90×90px，懸停顯示檢視按鈕）
- `.mega-dbtn`：巨型地圖方向箭頭
- `#mega-inspect-overlay` / `#mega-inspect-box`：內部檢視 overlay
- `.mib-cell` / `.mib-entry` / `.mib-path`：內部檢視格子（入口橘框、路徑高亮）
- `#mega-panel` / `#mega-card`：收益面板與資源卡

##### 新增 HTML
- `#mega-overlay`：巨型設施地圖（含 header、格子區、資源卡、收益面板）
- `#mega-inspect-overlay`：巨型設施內部檢視

##### 死碼清除
- 移除 `computeMegaPath()`（舊靜態路徑計算，已被實際投入路徑取代）
- 移除 `createMegaFacility()`（舊建立函數，已被 `createMegaFacilityFromRun()` 取代）
- 移除 `#indust-overlay` HTML 及 40 行相關 CSS（舊手動選擇器 UI）

#### 程式碼架構概覽（更新）
| 區塊 | 行號（約） | 說明 |
|------|-----------|------|
| 工業化系統 | 6843~7170 | MEGA_KEY/loadMega/saveMega/createMegaFacilityFromRun/simulateMegaFacility/MEGA 物件 |

#### 總行數變化
- Session 8 結束：6422 行
- 工業化系統（CSS+HTML+JS）：+230 行
- 工業化改版（移除舊選擇器+死碼）：-130 行
- 路徑追蹤（sendEl/stepWithMover/finish 修改）：+30 行
- Session 10 結束：7458 行

#### 後續修正：建立不結束遊戲 + 存檔整合
- **`finish()` 工業化分支**：移除 `alert` + `clearAutoSave` + `SM.goto('title')`，改為 `G.phase='done'`，遊戲繼續正常流程
- **`serializeGame()`**：新增 `mega` 欄位，存入 `_megaFacilities` 陣列
- **`deserializeGame()`**：讀取 `save.mega`，還原 `_megaFacilities` 並同步到 `MEGA_KEY` localStorage
- **開發者面板 tooltip**：移除「遊戲結束」描述

#### 後續修正：詞條系統 + 巨型設施模擬修復 + UI 重構

##### 詞條（Tag）加權系統
- 新增 `TAGS` 映射表：為所有設施與合夥人定義分類標籤（`basic`/`shop`/`hr`/`logistics`/`trade`/`demolish`/`demon`/`boost`/`production`/`unique`）
- 新增 `getPlayerTagCounts()`：統計玩家持有的詞條數量（格子+手牌+合夥人）
- 新增 `tagWeightFor(id, tagCounts)`：根據匹配詞條計算候選項權重（每匹配 +12%）
- 新增 `weightedPickN(pool, n, tagCounts)`：加權隨機抽取不重複項目
- 影響 5 處隨機選取：設施補給事件、購買設施行動、招募合夥人行動、常駐商店、譚雅交換

##### 巨型設施模擬修復
- **收益計算修正**：非金錢輸入值換算為金錢等值後再比較（`inputMoney = floor(value×0.6)`）
- **特殊設施模擬**：新增 `MEGA_SIM_FX` 調度表，為 13 種 `fn:v=>v` 的特殊設施提供簡化模擬邏輯
  - 商店系：small_shop/scalper/bulk_store/dept_store
  - 物流系：spiral_hub/terminal/env_sensor/trade_zone
  - 貿易系：trade_port/clearance/futures_market/trade_hub/tech_lab
- **額外收益**：`bonusProfit` 支援清倉拍賣場等非標準收益來源

##### 巨型設施地圖 UI 重構
- **三欄式佈局**（沿用正式遊戲）：左欄手牌列表、中欄 4×4 格子（90px 放大版）、右欄收益記錄
- **扇形手牌區**：底部顯示巨型設施卡牌 + 資源卡（💵1），可拖曳
- **拖曳系統**：拖曳巨型設施卡 → 空格子放置；拖曳資源卡 → 方向箭頭投入
- **方向箭頭**：常駐可見（覆寫 `.dbtn` 的 `opacity:0`），支援點擊和拖曳兩種投入方式
- **卡牌圖示改版**：使用起點→終點設施 emoji（如 ⛏️→🏪），取代資源類型圖示（💰→📦）
  - 新增 `startEmoji`/`endEmoji` 欄位於 `createMegaFacilityFromRun()`
  - 新增 `megaIcons(m)` 輔助函數（相容舊資料 fallback）
- **檢視內新增移除按鈕**：進入巨型設施內部檢視後可直接從地圖移除
- **記錄清除按鈕**：右欄記錄面板可清除投入記錄
- **開發者面板不關閉**：進入巨型地圖或工業化模式時不再關閉開發者選單
- **設施不可重複放置**：`placeMega` 檢查同一巨型設施是否已在地圖上，防止無限拖放
- **方向箭頭僅拖曳資源卡時顯示**：箭頭預設隱藏，拖曳資源卡時透過 `.mega-el-dragging` class 顯示；移除箭頭的 `onclick`，僅支援拖放投入
- **`MEGA.close()` 重置拖曳狀態**：關閉巨型地圖時清除 `_megaDragging`、`MEGA._elDragging`、`mega-el-dragging` class，防止殘留狀態影響下次開啟
- **拆遷隊不可移動廢墟**：`onRearrangeDragStart` 新增 `==='ruin'` 檢查阻止拖曳；`onCell` 排列模式點擊廢墟不再顯示拖曳提示

#### 百貨公司修正

##### 放置限制
- **百貨公司只能蓋在一般商店上**：`findShop2x2` 新增 `_isNonDeptShop()` 排除 `dept_store`/`dept_store_part`，不再允許蓋在已有的百貨公司上

##### 蕾雅百貨公司疊加升級
- **`tryPlaceAtCell`**：在 `needs2x2` 分支前新增百貨公司專用蕾雅升級邏輯（手牌百貨公司 + 點擊小鎮百貨公司錨點或部分格 → 2×2 四格各 +1 升級 +2% 蕾雅加成）
- **`onCellDragOver`**：百貨公司拖曳分支新增蕾雅升級預覽（綠色光暈），在 `findShop2x2` 返回 null 前攔截，允許 `e.preventDefault()` 使 drop 事件正常觸發
- **`isLeyaUpgrade`**：擴展為百貨公司拖到錨點或部分格都視為蕾雅升級

##### UI 修正
- **百貨公司升級顯示**：`renderGrid` 百貨公司渲染聚合 2×2 四格 `bldgUpgrades` 總和
- **百貨公司 active-path 閃爍**：`stepWithMover` 跳過 `dept_store`/`dept_store_part` 格子的 `active-path` class 切換
- **`bId` 宣告順序錯誤（嚴重）**：`_isDeptCell` 檢查引用了尚未宣告的 `const bId`，導致 `ReferenceError` 使每次資源投入時 `stepWithMover` 崩潰。修正：將 `const bId=G.grid[r][c]` 移到 `_isDeptCell` 之前
- **百貨公司非商品投入卡住**：`dept_store(fx)` 非 goods 時改為 `fx.next(200)` 而非直接 return
- **`active-path` 全格迭代**：redirect 分支和嫉妒惡魔分支也改為 `stepWithMover._prevActive` 快取

##### 其他修正
- **人材額外投入階段可跳過**：`finish()` 設 `_extraUsePhase=true`，`doNext()` 允許跳過，按鈕文字改為「跳過額外投入」
- **開發者清除選定格子**：DEV 面板新增 🎯 按鈕，點擊格子多選（紅色高亮），確認後批量清除
- **overlay 互斥防護**：`_isAnyOverlayOpen()` 防止 MEGA/戰鬥/工業化同時開啟
- **工業化取消還原 G.card**：備份 `_cardBeforeIndustrialize`，取消時恢復原始資源卡
- **戰鬥凍結 G.round**：`_battleState.round` 取代 `G.round` 引用
- **Murphy noMove 修正**：新輪第 1 回合不計入未移動回合數
- **動態難度加強**：新增 ≥5 倍/≥10 倍目標、最近 3 輪平均超額比率檔位
- **Tag 計數快取**：`doAction`/`doPermShop` 中快取 `getPlayerTagCounts()` 結果

#### 戰鬥系統（開發者模式，新增）

##### 概念
開發者模式下可進入戰鬥場景。玩家小鎮的所有設施被複製成牌組，在 1×8 戰場上排列設施創造收益，收益轉化為傷害攻擊對手。

##### 戰鬥流程
1. 開發者面板 → ⚔ 開始戰鬥
2. 小鎮格子 + 手牌所有設施複製為牌組，洗牌後抽 7 張
3. 每回合：排列手牌設施到 1×8 戰場 → 投入資源 → 收益 = 傷害
4. 結束回合後清空戰場，進入下一回合

##### 牌組與抽牌
- **牌組來源**：小鎮格子所有設施 + 手牌設施（複合設施跳過）
- **初始抽牌**：洗牌後抽 7 張
- **重抽機制**：手牌全部洗回牌組，重抽 7 張；第 N 次重抽需返回 N 張手牌
- **手牌不消耗**：放上戰場不會從手牌移除，可自由排列

##### 戰場（1×8）
- 資源固定從左側投入，右側輸出
- 起始資源 = 玩家在正式遊戲中最後一回合的資源（類型+數值）
- 設施效果使用 `MEGA_SIM_FX`（同步計算，無動畫）+ 基礎 `fn`
- 收益 = `max(0, finalMoney - startVal)` → 傷害

##### 對手
- 目前為固定 HP 100 的「競爭對手」（🏴‍☠️）
- 不會反擊，HP 不會自動回復
- 血量條視覺化顯示

##### 戰鬥控制面板
| 按鈕 | 功能 |
|------|------|
| 💰 投入資源 | 資源從左→右通過戰場，結算傷害 |
| 🔄 重抽手牌 | 洗回重抽（累積返回懲罰） |
| ⏩ 結束回合 | 清空戰場，進入下回合 |
| 🏳 撤退 | 結束戰鬥 |

##### UI
- 全屏 overlay（`#battle-overlay`，z-index 8000）
- 上方：敵人資訊（名稱、emoji、HP 條）
- 中間：1×8 戰場格子（沿用 `.cell` 樣式）+ 左右箭頭
- 右側：戰鬥控制面板 + 記錄
- 底部：扇形手牌（設施卡可拖曳到戰場 + 資源卡）
- 重抽返回模式：手牌卡片紅框，點擊返回

##### 新增函數/物件
| 函數 | 說明 |
|------|------|
| `BATTLE.buildDeck()` | 從小鎮複製設施為牌組 |
| `BATTLE.shuffle(arr)` | Fisher-Yates 洗牌 |
| `BATTLE.start()` | 開始戰鬥（建牌組、抽牌、初始化狀態） |
| `BATTLE.drawCards(n)` | 從牌組抽 n 張 |
| `BATTLE.redraw()` | 重抽手牌（累積返回懲罰） |
| `BATTLE.returnCard(idx)` | 返回一張手牌（重抽懲罰） |
| `BATTLE.placeOnField(idx, bId)` | 放置設施到戰場 |
| `BATTLE.removeFromField(idx)` | 點擊移除戰場設施 |
| `BATTLE.invest()` | 投入資源，計算傷害 |
| `BATTLE.endTurn()` | 結束回合 |
| `BATTLE.endBattle()` | 結束戰鬥 |
| `BATTLE.render()` | 渲染戰場+敵人+控制面板 |
| `BATTLE.renderFan()` | 渲染扇形手牌 |

##### 戰鬥狀態（`_battleState`）
| 欄位 | 說明 |
|------|------|
| `deck` | 牌組（未抽的設施 ID 陣列） |
| `hand` | 手牌（已抽的設施 ID 陣列） |
| `field` | 戰場 `[8]`，每格為設施 ID 或 null |
| `enemy` | `{name, emoji, hp, maxHp}` |
| `turn` | 當前回合 |
| `redrawCount` | 重抽次數（決定返回懲罰） |
| `resource` | 起始資源 `{value, type}` |
| `log` | 戰鬥記錄 |
| `invested` | 本回合是否已投入 |
| `_returnNeeded` | 重抽後需返回的張數 |
| `_drawnThisTurn` | 本回合是否已抽牌 |

##### 戰鬥修正
- **場地設施跨回合保留**：移除 `endTurn` 中 `s.field=Array(8).fill(null)`，結束回合不再清空戰場
- **每回合抽牌按鈕**：新增「🃏 抽牌」按鈕，每回合可從牌組抽 1 張（限一次）
- **重抽限制**：重抽手牌只能在第 1 回合使用
- **投入動畫**：資源逐格移動（帶移動器），傷害數字放大後飛向敵人血量條
- **敵人 HP 歸零阻止操作**：投入和結束回合在 HP≤0 時阻止

#### 架構精簡

##### 共用設施模擬函數 `simFacilityPath()`
- 從 `simulateMegaFacility()` 和 `BATTLE.invest()` 提取共用的設施模擬迴圈
- 接受 `cells`（路徑座標）、`resource`（起始資源）、`gridCtx`（格子上下文：grid/gridSize/round/bldgUpgrades 等）
- `simulateMegaFacility` 縮為一行呼叫；`BATTLE.invest` 內聯建立 `gridCtx={grid:[s.field], gridSize:8, round:G.round}`
- 移除 `BATTLE._buildFieldGrid()`（不再需要）

##### CSS 共用 overlay 基底類別
- `.game-overlay`：取代 `#mega-overlay` 和 `#battle-overlay` 重複的 `display/position/inset/background` 規則
- `.game-overlay-hdr`：取代 `#mega-hdr` 和 `#battle-hdr` 重複的 header 樣式
- `.game-overlay-body`：取代 `#mega-main` 和 `#battle-body` 重複的 flex 佈局
- `.game-overlay-fan`：取代 `#mega-fan-area` 和 `#battle-fan-area` 重複的底部扇形區
- 各 overlay 僅保留 z-index 差異：mega 8000/8100、battle 8200/8300

##### 其他清理
- 移除 `TLABEL_MEGA`，改為 `RESOURCE_EMOJI`（語義更清晰，僅含 emoji 無文字）
- `simFacilityPath` 統一 `b.req` 檢查為 `b.req&&b.req!=='any'&&b.req!==sim.type`，正確處理 `req:null`
- 戰鬥系統 `invest()` 中敵人 HP≤0 時阻止投入；`endTurn()` 中 HP≤0 時阻止結束回合

##### 行數變化
- 精簡前：8141 行
- 精簡後：8087 行（-54 行）

### Session 9（2026-04-13）— 平衡調整 + 架構精簡 + UI 改善

#### 平衡調整
- **黑市商人削弱**：正面效果從「每輪第一次商品→金錢×3」改為「每輪第一次商品→金錢×125%」，副作用不變

#### Bug 修復
- **`showTanyaHandPick()` 複合卡 crash**：手牌含複合設施時 `BLDG[compound_N]` 為 undefined，加入 `!h.compound` 過濾
- **`getWindDir()` 副作用**：`sendEl()` 中呼叫 `getWindDir()` 會在非預期時機設定隨機風向，改為直接讀取 `G.windDir`
- **CSS `--tx` 變數名衝突**：根層 `--tx`（文字色）與 `profitFly` 動畫 `--tx`（位移值）衝突，動畫改用 `--fly-x`

#### 死碼清除（-72 行）
- 移除未使用函數：`EVENT_TURNS`、`G.logs`、`G.partnerPool`、`fdelta()`、`applyBuff()`、`showBubble()`、`demolitionChargeFly()`、`getWindDir()`
- 移除未使用變數：`backHTML`、`tx=0`
- 移除未使用 CSS：`@keyframes cardPulse`、`.center-cell` class

#### 程式碼重構
- **`saveGridSnapshot()` / `restoreGridSnapshot()` / `deleteGridSnapshot()`**：統一快照存取邏輯，取代 3 處重複的 4 欄位快照代碼
- **`findFacilityCells()`**：常用查詢的快捷函數

#### 平衡調整（續）
- **怠惰惡魔改版**：擁有後行動選項的「放棄選擇」按鈕始終可見（不論收益是否足夠），放棄時 2/3 機率資源 +10
- **進出口稅站削弱**：×2 效果需通過 4 個以上物流中心才觸發，扣 1 收益無論是否觸發都執行

#### 常駐行動系統（新增）
- **🏗 商店按鈕**：常駐於右側收益記錄下方，免費進入瀏覽
  - 設施池：7 種基礎設施 + 1 隨機物流方向，35% 機率額外出現非基礎設施
  - 設施以卡牌形式顯示各自價格（基礎 5，隨輪數遞增），有取消選項
  - 手牌無設施 **且** 小鎮設施數少於一半時免費
- **🔄 轉換收益按鈕**：常駐於商店按鈕旁，輸出非金錢資源時發光提示
  - 將當前非金錢資源轉換為 60% 收益值

#### 安全網機制（靜默，新增）
- 連續 3 回合零收益時觸發（玩家不可見）
- **合夥人招募**：譚雅和蕾雅保證出現在選項中
- **設施補給事件**：保證 1 個物流中心在選項中
- 觸發機率隨使用遞減：100%/75%/50%/25%，最多 4 次
- 每回合只判定一次（多處呼叫共用結果）

#### UI 改善
- **複合設施懸浮預覽改版**：懸停複合卡牌時顯示兩張獨立卡片（水平/垂直排列），各自顯示 emoji、名稱、效果描述，中間顯示方向箭頭。拖曳時自動關閉預覽
- **發光特效提示**：事件確認按鈕、行動放棄按鈕（無法負擔時）、資源轉換按鈕（可用時）均有脈衝發光
- **教學中隱藏存讀檔按鈕**：TUT.start 隱藏、TUT.finish 還原
- **標題畫面角色調整**：立繪下移至 `bottom:-28%`、放大至 `clamp(400px,55vw,700px)`，避免被標題遮擋臉部
- **失敗重開修復**：新遊戲選擇合夥人前先 render() 清空格子

#### Bug 修復（續）
- **移動器鑽石 emoji 缺失**：嫉妒工廠轉鑽石後移動器顯示 ❓，補上 `diamond:'💎'`
- **怠惰惡魔 `G.card` null crash**：`onSkipAction` 加入 null 防護
- **`doPermShop` 回合推進**：`evPick()` 會呼叫 `startTurn()`，改用 `addHandMaybeCompound` 直接加入手牌
- **快照不完整**：`saveGridSnapshot` 改為保存全部 8 個 `KEYED_DATA_FIELDS` + `ruinCells`，取消重排不再導致狀態失同步
- **廢墟交換觸發合夥人效果**：`onFacilityMoved` 加入 `isFacility` 檢查

#### 設施改動
- **轉運中心**：取消方向選擇時自動套用預設方向「右」（不再留下不顯示方向的 🔀）

#### 重新排列系統
- **設施可與廢墟互換**：拖曳設施到廢墟格子交換位置（廢墟本身不可拖曳）
- **`swapCellData` 同步 `ruinCells`**：每次交換自動更新廢墟追蹤

#### 大熱波懲罰機制（新增）
- 觸發條件（全部滿足才觸發）：
  1. 連續 3 輪每輪都在第 1 回合達標
  2. 本次投入經過的設施少於 4 個
  3. 有設施的累積收益超過當輪目標的 150%
  4. 連續 5 回合用相同方向、相同設施、相同順序投入
- 效果：全屏紅色爆炸特效 + 角色立繪（表情 4），炸毀收益最高的設施
- 台詞：「地獄之城沒有活著的傳奇。」
- 追蹤：`G._heatwave`（facProfits 每輪重置），`G.inv.facPath`/`facProfitMap` 每次投入記錄
- FACILITY_FX 的 `_hit()` 也追蹤 facPath 和 facProfitMap

#### 物流之王/倉儲女王疊加改版
- **雙向疊加**：設施可蓋在物流中心上，物流中心也可蓋在設施上
- 物流蓋設施：物流變底層，原設施變 overlay
- 有 overlay 時 redirect 的升級加成不重複計算（升級屬於 overlay 設施）
- 拖曳預覽支援雙向疊加（金色邊框）
- 轉運中心蓋在設施上時觸發方向選擇器

#### 疊加設施渲染
- **單層疊加**：設施 emoji 為主，物流方向箭頭常駐右下角
- **雙層疊加（倉儲女王）**：兩設施 emoji 輪播（3 秒循環），物流箭頭常駐右下角
- **懸停提示**：顯示底層物流 + 所有疊加設施的名稱與描述
- `getOverlays(r,c)` / `setOverlays(r,c,arr)`：統一處理 string/array 格式
- `countAllShops()`：計算 grid + overlay 所有商店數量
- `hasAdjacentShop()`、`countAdjacentFacilities()`：檢查 overlay 設施
- `destroyFacility()`：清理 cellOverlay（一般設施 + 百貨公司）
- Overlay 升級加成只套用一次（不隨 overlay 數量倍增）

#### Bug 修復（續）
- **拆遷隊重複進入**：排列模式中再次點擊拆遷隊會覆蓋快照，取消後設施消失。加入 `G.freeRearrange` 防護
- **壟斷者商店計數遺漏 overlay**：改用 `countAllShops()` 計算含 overlay 的商店數
- **貿易特區相鄰商店遺漏 overlay**：`hasAdjacentShop()` 加入 overlay 檢查
- **環境感應站相鄰設施遺漏 overlay**：`countAdjacentFacilities()` 加入 overlay 計數

#### 平衡調整（續）
- **量販店削弱**：+50% 加成上限改為 10×當前輪數（第 1 輪上限 10，第 3 輪上限 30）
- **外貿港口削弱**：從每 10 商品 +10% 改為每 10 商品 +1%

#### 大熱波擴展
- **新觸發方式**：收益 ≥ 目標 × 100 時立即觸發（不需滿足原 4 條件）
- **資源削減**：觸發時手牌資源值 = `max(1, ceil(原值 × 1% ÷ floor(輪數/2)))`
- 程式碼重構：提取 `triggerHeatwave(target)` 和 `findHeatwaveTarget()` 函數

#### 常駐商店改版
- **單品免費**：符合條件時隨機一個設施免費，其餘正常價格
- **發光提示**：有免費設施時商店按鈕 `btn-glow`
- **一回合一次**：`G._permShopUsed` flag，`startTurn` 重置

#### Bug 修復（續）
- **卡牌選擇器取消按鈕失效**：`showCardChooser` 每次重置跳過按鈕 display（起始合夥人選擇隱藏後不再恢復）

#### 開發者面板
- **🔥 觸發大熱波**：簡化為直接呼叫 `triggerHeatwave`
- **🏚️ 獲得廢墟卡**：取代原本的廢墟紀念碑按鈕

### Session 10（2026-04-13）— 程式碼品質修繕

#### renderFanHand inline style 移除
- `.fan-card` 基底 CSS 新增 `background`/`border`/`display:flex`/`gap`/`padding`/`box-shadow`，不再每張卡片重複 inline
- 新增 7 個 CSS class：`fc-selected`、`fc-compound-layout`/`fc-vert`/`fc-compound-emoji`/`fc-compound-link`、`fc-compound-name`、`fc-talent-badge`、`fc-buff-desc`/`fc-buff-active`/`fc-buff-idle`、`fc-pos-mark`
- 卡片 `style=` 僅剩動態 `transform` 和 `z-index`

#### 加班辦公室 desc 修正
- `'資源通過時+人材數量一半%'` → `'資源通過時+(人材數÷2)%加成'`

#### 轉運中心方向選擇器事件監聽洩漏修復
- 選擇方向按鈕時未移除 `_escPicker` keydown 監聽 → 統一提取 `_cleanup()` 函數，所有關閉路徑（選方向/ESC/點擊外部）都呼叫
- `_closePicker` 拆為 `_cleanup` + 各路徑專屬邏輯，避免匿名函數無法 removeEventListener

#### finish() onSettle 順序文件化
- 在 `G.partners.forEach` 上方加入註釋說明執行順序：依招募順序 → 稅務局 → 嫉妒工廠 → 勞工保險

#### venture-town.html 同步
- 從 index.html 複製同步

#### 教學系統（TUT）重構：集中式鉤子
- **問題**：15+ 處核心函數散佈 `if(TUT.active)` 檢查和教學特定邏輯，維護困難
- **解法**：在 TUT 物件新增集中式 hook 方法，核心函數只需一行呼叫
- **新增 hook 方法**（返回 true 表示攔截正常流程）：
  | 方法 | 呼叫處 | 功能 |
  |------|--------|------|
  | `hookPlace(bldgId)` | tryPlaceAtCell | 設施放置後檢查教學進度 |
  | `hookStep(bId)` | stepWithMover | 記錄是否通過原料廠 |
  | `hookFinishPre(el)` | finish 開頭 | 教學第一次投入→攔截正常結算 |
  | `hookFinishPost(profit)` | finish 結尾 | step6 投入後提示結束回合 |
  | `hookDoNext()` | doNext | 教學各階段的回合推進 |
  | `hookConfirmRearrange()` | confirmRearrange | 確認排列後恢復等待 |
  | `hookUseDemolition()` | useDemolition | 教學中使用拆遷隊 |
  | `hookCharClick()` | charClick | 點擊立繪跳到下一句 |
  | `hookDMFilter()` | DM.show | 教學期間過濾非教學台詞 |
  | `isBlocking()` | 6 處 | 統一守衛（大熱波/莫菲/商店/轉換/存讀檔） |
- **結果**：核心函數不再包含任何 `TUT.active`/`TUT.waitingFor`/`TUT.step` 直接存取，所有教學邏輯集中在 TUT 物件內

#### 程式碼精簡
- **`cellQ(r,c)` 工具函數**：取代 16 處重複的 `document.querySelector(`[data-r="${r}"][data-c="${c}"]`)`
- **手動格子迴圈改用 `findCells`/`findFacilityCells`**：消除 6 處 `for(r) for(c)` 重複（doAction upgrade、磁力板、爆破裝置、人力訓練中心、臨時工棚、TUT hookPlace/step5）
- 所有手動格子迴圈已統一為 `eachCell`/`findCells`（除 `eachCell` 定義本身）

#### Bug 修復
- **`destroyFacility` 百貨公司越界**：2×2 迴圈未檢查 `cr<GN()&&cc<GN()`，5×5→4×4 邊界可能存取超出範圍
- **`chaos_architect` 空值存取**：`BLDG[G.grid[fr][fc]].name` 未防護 → 加入 `?.name||'設施'`
- **疊加設施特效未觸發（嚴重）**：overlay 設施通過時只呼叫 `ob.fn()`（恆等函數），完全跳過 `FACILITY_FX` 調度表，導致所有 special 效果（勞動轉換站×2、集體罷工台+10×人材、清倉拍賣場×4 等）在疊加時完全失效。修復為優先走 `FACILITY_FX[ob.special]` 調度，升級加成透過暫存/還原確保只套用一次
- **`cellQ` 無限遞迴（致命）**：`replace_all` 將函數定義內的 querySelector 也替換成 `cellQ(r,c)` 造成自我呼叫 stack overflow
- **`.fc-selected` CSS 優先級**：被 `.fan-card.el-card-fan` 同 specificity 覆蓋 → 加 `!important`
- **商店取消後無法結束回合**：`showCardChooser` 跳過按鈕先 `closeCardChooser()`（清 null）再呼叫回調 → 回調永不執行，`G.phase` 卡在 `'event'`。改為先暫存引用
- **莫菲定律 noMove 閾值 off-by-one**：文件設計 5 回合起加權，代碼 `noMove-5` 需 6 回合 → 改為 `noMove-4`
- **譚雅重複交換**：`evPick`/`evDone` → `startTurn()` 再次觸發 `tanyaOfferSwap`，同回合交換兩次。加 `_tanyaSwappedThisTurn` flag 防護
- **複合設施無法交換**：`tanyaOfferSwap` 初始檢查未排除複合卡，只有複合卡時進入空白選擇器。加入 `!h.compound` 過濾
- **拆遷隊不累積**：累積邏輯放在 `evDone` 中（只有事件回合呼叫），移至 `doNext` 的 `G.turn++` 後穩定觸發
- **`facHit` 雙重計數**：音效新增時在物流轉向和通用轉換路徑多加了 `facHit++`，影響快遞達人和大熱波判定。移除重複
- **更換預告事件可能換到相同事件**：`swap_ev` 行動直接 `pickNextEvent()` 無排除。加入比對，相同時重抽

#### 新功能
- **音效系統（SFX）**：Web Audio API，無外部檔案
  - `SFX.hit(step)`：資源通過設施，triangle 波 C4 起每步升半音
  - `SFX.convert(step)`：資源類型轉換，sine 波 E4 起每步升半音
  - `SFX.settle()`：正收益結算，C5→E5→G5 琶音
- **轉換收益按鈕動態文字**：可用時顯示 `🔄 轉換 +{值}`，懸停提示完整說明
- **場風大師方向箭頭**：改為指向資源前進方向（從左投入 → 顯示 →）

### Session 11（2026-04-15）— 全面審查 + Bug 修復 + 死碼清除

#### 嚴重 Bug 修復

- **普通移動模式不轉移格子附帶資料（嚴重）**：`onCell` 的 `moveMode` 分支只搬 `G.grid[r][c]`，未呼叫 `swapCellData()`，導致升級加成/蕾雅%/炸彈倒數/期貨%等 8 種 `KEYED_DATA_FIELDS` 遺留在舊格子。修復為改用 `swapCellData(sr,sc,r,c)` + `onFacilityMoved(r,c,sr,sc)`，一併觸發臨時工棚計數、拆遷補償局+1、地皮炒家+20 等連鎖效果
- **`onTurnStart` 每輪第一回合觸發兩次（嚴重）**：`startRound()` 在 L2324 直接呼叫 `onTurnStart` 迴圈 + 場風設定 + tanya/actionOverlay，而 `startTurn()` 中也全部存在。第一回合的 `buy_fac`/`trig_ev` 行動路徑透過 `evPick`/`evDone` 再次呼叫 `startTurn()`，導致混沌建築師移動兩次設施並扣兩次 5% 收益。修復為移除 `startRound()` 中重複的 `onTurnStart`/場風/UI 邏輯，改為直接呼叫 `startTurn()`；在 `startTurn()` 開頭加入 `_lastStartedTurn` 防重入機制（以 `round*1000+turn` 為 key），同回合重複呼叫只執行 render + UI 顯示
- **`destroyFacility` 未清理所有 keyed data（嚴重）**：只清除 `bldgUpgrades`/`leyaPctMods`/`cellOverlay`，遺漏 `bombTimers`/`tempShedMoves`/`logisticsVault`/`futuresPct`/`cellMods` 5 個欄位。修復為改用 `KEYED_DATA_FIELDS.forEach(f=>{ if(G[f]) delete G[f][key]; })` 統一清理。同步修復百貨公司 2×2 消滅路徑

#### 中等 Bug 修復

- **`isDemonNegDisabled` 用名稱子字串判定**：檢查 `name.includes('惡魔')`，但黑市商人（`isDemon:true`，名稱「黑市商人」）和爆破工程師（`isDemon:true`，名稱「爆破工程師」）不含「惡魔」字串，傲慢惡魔永遠無法豁免其負面效果。修復為改用 `p.isDemon` 判定
- **廢墟掠奪者懲罰計算錯誤**：描述「超過 3 格每格 -2%」，但代碼用 `ruinCount*2` 而非 `(ruinCount-3)*2`，前 3 格「免費」廢墟也被計入懲罰。修復為 `(ruinCount-3)*2`
- **`reviveSets` 跳過陣列**：`Array.isArray(o[k]) => continue`，若 Set 序列化為 `{_s:[...]}` 嵌套在陣列元素內，反序列化會失敗。修復為加入陣列元素遞迴處理
- **`DM.onEvent` 只映射 9/19 個事件**：地震、危險廢棄物、譚雅/蕾雅的禮物、運輸異常、重大食安、勞工保險、莫菲定律、就業輔助、原料大降等 10 個事件的角色台詞永遠不會觸發。修復為自動從 title 生成 `event_` 鍵 + fallback 子字串匹配，取代硬編碼映射表
- **扇形手牌元素卡重複 drag 屬性**：`ondragover`/`ondrop`/`ondragleave` 在 `dragAttrs` 和後面的字串各輸出一次，後者覆蓋前者。修復為加入 `!card.draggable` 條件，僅在非拖曳卡上補充屬性
- **擁慶記賣出 ESC 監聽器洩漏**：`useYongqingSell` 的 keydown 監聽器只在按 ESC 時移除，正常賣出和點空格取消路徑均未移除，導致累積。修復為將監聽器存為 `G._yongqingSellEsc`，所有退出路徑統一 `removeEventListener`

#### 死碼清除

- 移除嫉妒惡魔空 `if` block：`if(hasPartner('envy')&&...){ if((G.inv.facHit||0)===0){} }` 完全無作用
- 移除 `renderFanHand` 中 `card.type==='talent'` 渲染分支（人材卡已移至左面板，不在手牌陣列）
- 移除 `dragAttrs` 中 `card.type==='talent'` 拖曳分支（同上）
- 移除 CSS `@keyframes hwBomb`（無任何引用，實際用的是 `hwBoom`）
- 統一 `renderGrid` 中 `GN()` 重複呼叫：`_gn` 和 `gn` 統一為 `gn=_gn`
- 移除 `poverty_god.state` 和 `wrath.state` 死欄位（實際使用 `G.partnerState`）

#### 一致性改善

- **`yongqingSellCell` keyed data 清理**：手寫的 8 行個別 delete 改用 `KEYED_DATA_FIELDS.forEach`，與 `destroyFacility`/`swapCellData` 一致
- **`yongqingSellCell` 百貨公司 2×2 清理**：同步改用 `KEYED_DATA_FIELDS.forEach`
- **`deserializeGame` 重置 `_lastStartedTurn`**：確保讀檔後 `startTurn` 正常執行

#### 巨型設施合夥人效果補全

##### 問題
`simFacilityPath` 為純數值模擬，完全不包含合夥人效果。`mega.partners` 僅作為檢視面板的展示資料，模擬收益與實際建立時的收益可能有顯著差異。

##### 建立時快照擴充（`createMegaFacilityFromRun`）
- 新增 `partnerState`：深拷貝合夥人專屬狀態（如黑市商人使用次數）
- 新增 `talentCards`：人材數量（工會主席/勞工保險需要）
- 新增 `ruinCells`：廢墟格子 Set（無冕之王需要），序列化為 `{_s:[...]}`

##### `simFacilityPath` 路徑中效果（新增）
| 效果 | 說明 |
|------|------|
| 暴食惡魔 | material↔goods 互換匹配 + 輸出互換 |
| 嫉妒惡魔 | 進入嫉妒工廠前若已命中設施則中斷 |
| 嫉妒工廠負面 | 非鑽石標記 `envyPen` |
| 運輸異常 buff | 原料無法→商品時跳過 |
| 原料大降/出口熱/颱風/食安/商品熱銷 buff | 類型轉換時套用倍率 |
| 激情惡魔 | `cellMod<0` 時逆轉為正 |
| 匯率波動板 | 通過時標記 `exchBoard` |

##### `simFacilityPath` 結算效果（新增）
| 效果 | 說明 |
|------|------|
| 慾望惡魔 `modifyFinish` | 2 設施×2 / >2 設施÷N |
| 匯率波動板 | 隨機 ±3~15% |
| 貪婪惡魔 `onSettle` | +50% |
| 黑市商人 `onSettle` | 首次+25% |
| 工會主席 `onSettle` | 3+人材+50% / <3人材-20% |
| 運輸大亨 `onSettle` | 物流中心×3 / 無物流-50% |
| 快遞達人 `onSettle` | 4+格+10% / <4格-50% |
| 路線規劃師 `onSettle` | 物流<2時-30% |
| 壟斷者 `onSettle` | 每3商店+5% / 不足-10%/個 |
| 無冕之王 `onSettle` | 廢墟²/2 % |
| 稅務局 | -10% |
| 嫉妒工廠負面 | -50% |
| 勞工保險 | 人材×2% |

##### `simulateMegaFacility` 改善
- 新增 `ruinCells` 反序列化（相容 `{_s:[...]}` 格式）

##### `MEGA.sendMega` 改善
- 改用 `result.profit`（含合夥人效果）取代手動計算的 `finalMoney-inputMoney`

##### 設計決策
- 合夥人效果為**模擬版**：不依賴 DOM 或全域 `G` 狀態，使用快照中的 `partners`/`partnerState`/`talentCards`/`buffs`
- `_isDemonNeg` 使用本地 `_hasPride` 判定，不呼叫全域 `isDemonNegDisabled`
- `onSettle` 為手寫簡化版（非呼叫原始 hook），避免修改全域狀態
- 傲慢惡魔加成（每惡魔+10%）未模擬（需遍歷所有惡魔計數，複雜度較高且影響小）

#### 巨型設施疊加設施（cellOverlay）補全

##### 問題
`createMegaFacilityFromRun` 未快照 `cellOverlay`，`simFacilityPath` 遇到 redirect 格直接跳過，疊加在物流中心上的設施效果（勞動轉換站×2、清倉拍賣場×4 等）在模擬中完全不觸發。

##### 修復
- **`createMegaFacilityFromRun`**：新增 `cellOverlay` 深拷貝快照
- **`simFacilityPath`**：redirect 分支新增疊加設施處理
  - 從 `gridCtx.cellOverlay` 取得疊加設施列表（相容 string/array 格式）
  - 逐個檢查類型匹配（`ob.req`），有 `MEGA_SIM_FX` 走特效調度，否則走 `ob.fn` 基礎轉換
  - 升級加成（`bldgUpgrades`）只套用一次（與 `stepWithMover` 一致）
  - 每個疊加設施計入 `facHit`，影響終點站/快遞達人等計數

### Session 12（2026-04-20）— 新合夥人機制 Excel 同步 + 關鍵 Bug 修 + 2×2 保護

依據 `新合夥人機制.xlsx` 的設計調整，先在舊基底做了一輪後發現本地落後遠端 14 個 commit（含 battle system、industrialization 等），備份為 `backup-pre-sync` 分支後 `git reset --hard origin/main` 重置，再於最新 `1c4ec3f` 上重新套用。

#### PARTNERS 文字同步（pos/neg/desc）
更新以下合夥人的顯示文字以對齊 Excel 設計（多數機制碼保留，僅文字）：
- **人力**：人力仲介（每回合+4人材）、工會主席（8+人材時+2人材）、勞動部長（最終失半+4）、人力資源總監（每2人材+2）
- **物流**：倉儲女王（可2層疊加）、路線規劃師、快遞達人（通過4格後每格+4）
- **貿易**：外匯交易員（金錢→金錢+4/-2）、套利者（+2永久累積）、壟斷者（4商店/+6）
- **拆遷**：地皮炒家（空格+4）、爆破工程師（失收益+8消滅）、混沌建築師（最多8設施交換）、廢墟掠奪者（第一次投廢墟-4/-6）、無冕之王（投廢墟+2累積）、擁慶記房屋（賣+2永久）
- **中央/起始**：市長（每觸發+8）、阿北（1設施疊加）、譚雅（換更高稀有度）、蕾雅（疊加永久+2）、facility_destroyer（消滅+4）、貧窮神（+8累積，onSettle 機制同步）

#### BLDG desc 同步（未動 fn 平衡數值）
- **物流**：螺旋物流站、終點站、物流放大器、轉運中心、速遞站、物流倉、環境感應站
- **貿易**：外貿港口、匯率波動板、期貨交易所、貿易特區、清倉拍賣場、進出口稅站
- **拆遷**：爆破裝置、建築廢料廠、臨時工棚、磁力板、廢墟紀念碑、拆遷補償局、動態加強器、地基不穩定站
- **人力**：人力訓練中心、勞動轉換站、人材倉庫、人才市場、加班辦公室、人力銀行、派遣總部、集體罷工台
- **中央**：貿易代理、科技研發、百貨公司

#### 6 個關鍵 Bug 修復（文字與程式碼直接矛盾）

| 設施/合夥人 | 修復位置 | 變更 |
|-------------|---------|------|
| `facility_destroyer` | `destroyFacility` 兩處 | +50 → +4（含 log / profitFly） |
| `demolish_bureau` | `FACILITY_FX` + `onFacilityMoved` | +1 → +4（log + profit） |
| `magnet_plate` | `startTurn` 交換邏輯 | 新增：被交換設施 `cellMods +2` |
| `ruin_monument` | fn + special handler | 固定 +5 → 廢墟數 ×4（fn 顯示 +4 tooltip） |
| `env_sensor` | `FACILITY_FX.env_sensor` | 每設施 +1 → 每設施 +2 |
| `terminal` | `FACILITY_FX.terminal` | facHit×2 → facHit×4 |

#### 百貨公司（2×2）結構保護
防止 dept_store/dept_store_part 被移動造成 2×2 斷裂：
- **chaos_architect**：`filled` 過濾排除 dept_store/part
- **magnet_plate**：adjacent filter 排除 dept_store/part
- **Rearrange 拖曳**：`onRearrangeDragStart` 擋住源為 dept_store/part；`onRearrangeDrop` 擋住目標為 dept_store/part

#### chaos_architect ruinCells 幽靈項修復
`wasRuin=true` 時 `swapCellData` 會把 'ruin' 放到來源格，ruinCells 新增一條記錄；接著 `G.grid[fr][fc]=null` 卻沒同步 `ruinCells.delete(fr,fc)`，造成幽靈廢墟。已補上 delete。

#### poverty_god onSettle 機制同步
從「收益為 0 時 +bonus（初始 1，每次 ++）」改為「+8 起跳，每次 +8 累積；收益 >0 時清空回 8」，與 Excel 設計一致。

#### 未處理（需後續）
- 疊加設施（cellOverlay）被消滅時 `facility_destroyer` 不觸發 — 設計一致性議題
- 全能會計師（omni_accountant）計數拖曳 UI 待實作
- 分身大師（clone_master）人材拖曳周圍觸發待實作
- 移動都市（mobile_city）周圍8格自由移動 UI 待實作
- 惡魔巨人（demon_giant）大型設施數量限制系統待實作
- 電子系設施的「計數」UI 顯示待實作
- 新設施台詞（45 項）待補

### Session 13（2026-04-20）— 合夥人效果全面改版 + 26 新設施 + 18 新合夥人 + 數值平衡

#### 合夥人效果改版（18 位既有合夥人）

##### 人力流
| 合夥人 | 舊效果 | 新效果 |
|--------|--------|--------|
| 工會主席 | 3+人材+50%/-20% | 8+人材時投入人材額外+2（無負面） |
| 勞動部長 | 使用人材+5/未使用-5% | onSettle：失半人材每個+4（無負面） |
| 人力資源總監 | 全用每個+15/只能用1 | onSettle：每投2人材+2（無負面） |

##### 物流流
| 合夥人 | 舊效果 | 新效果 |
|--------|--------|--------|
| 快遞達人 | 4+格+10%/<4格-50% | 超過4格後每格+4（無負面） |
| 路線規劃師 | 免費移物流/<2-30% | 免費移物流（移除負面） |

##### 貿易流
| 合夥人 | 舊效果 | 新效果 |
|--------|--------|--------|
| 外匯交易員 | 轉換差10%/原料-50% | 每投入金錢觸發2次，隨機+4/-2 |
| 套利者 | 雙向+20%/單向-20% | 雙向+2永久累積/原料→商品不增值 |
| 壟斷者 | 每3商店+5%/<3-10% | 4+商店每商店+6/<4時商店不參與 |

##### 拆遷流
| 合夥人 | 舊效果 | 新效果 |
|--------|--------|--------|
| 地皮炒家 | 移動後+20/>3回合-1 | 空格永久+4（移除負面） |
| 混沌建築師 | 隨機移1設施/-5% | 最多8設施兩兩交換（含廢墟）/-5% |
| 廢墟掠奪者 | 每廢墟+5%~23%/>3-2% | 第一次投廢墟-4或-6，重疊廢墟 |
| 無冕之王 | x²/2%/人材重複 | 投入廢墟每次+ruinCount×2累積 |
| 爆破工程師 | 消耗2收益消滅 | 失去8收益消滅 |

##### 獨特
| 合夥人 | 舊效果 | 新效果 |
|--------|--------|--------|
| 譚雅 | 3選1交換+1升級 | 交換稀有度更高設施(N→R→SR→SSR)+手牌<24補牌 |
| 市長 | 中央+5%累積 | 中央觸發每次+8固定值 |
| 公路之星 | 中央2格+2（暫時） | 中央2格+2，投入則變永久 |
| 擁慶記房屋 | 0.1×x%×回合 | 賣+2收益，永久+2 |
| 大地主 | 固定5×5 | 擴大一級（支持多次） |

#### 新增 26 個設施

##### 基礎升級（R 級，7 個）
高級原料廠(+4)、高級工廠(+4)、超商(商品/原料→金錢+4)、化工精煉廠(+6)、高級倉庫(+6)、強化增幅裝置(+4+周圍+2)、高級轉化器(+4)

##### 中央系（6 個）
中央貿易代理(SSR)、中央科技研發(SSR)、中央工廠/商店/原料監督局(R)、中央電子網路(R)

##### 電子系（4 個，新流派）
大型電子供給站(SSR 2×2)、電子工廠(SR)、電子輸送帶(SR)、電子商店(SR)

##### 大型設施（3 個，2×2 不可消滅）
巨人村(回合開始人材歸0+8)、古代機械工廠(工廠投入+8)、世界奇觀(每人材+8)

##### 拆遷系（3 個）
移動都市(SSR)、廢鐵城(SSR +8+累積)、災害控管局(SSR 不可消滅)

##### 物流/人力（3 個）
物流轉運中心(SR)、物流倉v2(SR 計數≥3+8)、員工住宅(SR 未投入+4人材)

#### 新增 18 位合夥人

##### 拆遷流（4 位）
- **回收阿罵**(SSR)：onTurnStart 所有廢墟集中到一格
- **廢品戰士**(SR)：onTurnStart 獲得廢墟卡
- **炸彈客**(R)：onTurnStart 設1~3爆破裝置+每個+2；爆破不產生廢墟
- **流浪漢**(R)：onTurnStart 空格+1廢墟，每廢墟+2

##### 電子流（3 位，新流派）
- **電子放電惡魔**(SSR)：onSettle 電子設施+2/非電子-2
- **電子精工師**(SSR)：onTurnStart 電子計數≥3→電子工廠
- **雷電法王**(SR)：onTurnStart 雷電計數≥3→消滅設施+電子設施

##### 物流流（2 位）
- **重建驛站**(SR)：onTurnStart 驛站計數≥3→廢墟變螺旋物流站
- **全能會計師**(SSR)：計數系統框架（UI 待後續）

##### 中央流（4 位）
- **擴散惡魔**(SSR)：onTurnStart 擴散計數≥3→所有設施視為中央+交換
- **中央秘書**(SR)：onSettle 中央設施×4/4設施時外部×2/未投中央-2
- **北漂者**(SR)：onTurnStart 中央設施數=人材
- **訪問網路碼語者**(R)：onTurnStart 獲得中央電子網路/onSettle -4

##### 大型系（2 位）
- **惡魔巨人**(SSR)：onRecruit 擴大一級；事件後消滅一個合夥人
- **大財團**(SSR)：onRecruit 擴大一級；onSettle 每大型+8

##### 人力/貿易（3 位）
- **人類惡魔**(SSR)：投入人材+2永久/人材為0時所有設施-2
- **分身大師**(SSR)：框架定義（人材拖曳擴展待後續）
- **進貨合作員**(R)：onTurnStart 資源變商品+2/已是商品+4

#### 稀有度加權系統（新增）
- **BLDG_RARITY**：79 個設施全部分級（N/R/SR/SSR）
- **PARTNER_RARITY**：56 位合夥人全部分級
- **`rarityWeightByRound(round, rarity)`**：依輪數控制各稀有度出現倍率
  - 第1輪：N=1.00, R=0.30, SR=0.05, SSR=0.02
  - 第5輪：N=0.72, R=1.00, SR=1.00, SSR=0.35
  - 第7輪+：N=0.58↓, R/SR/SSR=1.00
- 整合到 `tagWeightFor()`，全部 9 個 `weightedPickN` 呼叫點自動套用
- 新增 `isPoolableBldg()` 統一設施池過濾（排除 centerOnly/needs2x2/ruinOnly/特殊）

#### 基礎設施數值更新（依 Excel）
| 設施 | 舊值 | 新值 |
|------|------|------|
| 原料廠/工廠/商店 | +1 | +2 |
| 精煉廠/倉庫/增幅器 | +2 | +4 |
| 小型販售商 | +1/+2 | +2/+4 |

#### 目標公式與動態難度調整
| 項目 | 舊值 | 新值 |
|------|------|------|
| 初始目標 | 30 | 20 |
| 成長倍率 | ×1.8 | ×1.4 |
| 固定加值 | +15 | +8 |
| 難度倍率範圍 | 0.6~2.5 | 0.5~3.0 |
| 速通閾值 | ≤2/4/6/8 | ≤3/5/7/9 回合 |
| 新增掙扎保護 | — | 超額<1.3倍-5%、連續<1.5倍-5% |

#### 行動/商店費用調整
購買設施 4→6、觸發事件 2→3、重新排列 2→4、招募合夥人 5→8、提升數值 3→5、輸出加成 3→4、更換事件 1→2、常駐商店 5→8。費用成長率 +50%/輪→+35%/輪。統一 `scaledCost()` 函數。

#### 設施名稱統一
- 人才市場 → **人材市場**（全局統一）
- 貿易代理 → **外部貿易代理**（全局統一）
- 科技研發 → **科技研發中心**（全局統一）

#### 台詞修復
- 修正 4 處 DIALOGUES 鍵值不匹配（人材市場/外部貿易代理/科技研發中心/物流方向）
- 新增嫉妒工廠台詞
- 新增 4 個物流方向設施台詞（共用「物流中心」台詞）
- 最終覆蓋率：設施 51/51、合夥人 38/38

#### Bug 修復（21 項）

##### CRITICAL（5 項）
- `destroyFacility` 加入 `indestructible` 檢查（4 個不可消滅設施）+ 炸彈客爆破不產生廢墟
- `elec_discharge_demon` 的 `_elecHits`/`_nonElecHits` 追蹤補全
- `COMPOUND_EXCLUDE` 加入 13 個特殊設施（大型+中央限定+不可消滅）
- `logistics_hub` 放置觸發方向選擇器（5 處硬編碼修正）
- 設施池統一 `isPoolableBldg()` 排除 centerOnly/needs2x2（9 處替換）

##### HIGH（10 項）
- 巨人村 startTurn 人材歸0+8
- 世界奇觀 finish 人材×8 收益
- 古代機械工廠 finish 工廠投入×8
- 廢鐵城 destroyFacility x+2 + finish 消滅廢墟+x
- 災害控管局 destroyFacility 計數 + finish +4/消滅
- 員工住宅 finish 未投入+4 人材
- 中央監督局 finish 未投入時+2/對應設施
- 電子輸送帶 `_elecConveyorActive` 消費邏輯
- 人類惡魔 正面效果（投入人材+2永久）
- 惡魔巨人 負面效果（事件後消滅合夥人）

##### MEDIUM（4 項）
- 超商 FX log 用轉換前 type
- 大型電子供給站原料通過改 `fx.next()`
- 物流倉v2 改用獨立 `_vaultV2Counts`
- 人類惡魔 bldgUpgrades 下限 -10

##### 其他修復（9 項）
- newGame() 補全 13 個缺失欄位初始化
- localStorage 存檔失敗提示玩家
- 擁慶記賣出 ESC 監聽器場景切換清理
- 轉運中心方向選擇器全域追蹤防洩漏
- wind-hint 移除重複 display:none
- 動畫 `_stepAnimGen` 世代計數器（6 處 setTimeout 加入檢查）
- `evPickTanya` 死碼移除
- `showTanyaHandPick` 清理未用參數
- `BLDG_RARITY` 移除誤含的 route_planner

#### 開發者面板更新
- 設施/合夥人卡片依稀有度上色（灰/青/粉紫/金）
- 新增 N/R/SR/SSR 篩選按鈕
- 新增「📊 難度與數值」面板（即時數值顯示 + 難度±0.2 + 跳輪）
- 新增「🎰 稀有度測試」（模擬抽取顯示分布）

#### 程式碼精簡
- 新增 `clearKeyedData(key)` helper，替換 11 處重複的 `KEYED_DATA_FIELDS.forEach` 清理
- 新增 `hasTag(id, tag)` helper，替換 3 處 `BLDG[b].tags.includes` 查詢
- 移除 5 個 BLDG 上冗餘的 `tags` 屬性（統一只用 TAGS 表）
- 移除 `_tanyaNewBldg` 死碼

#### 設計文件建立
- `CLAUDE.md`：專案技術棧、架構、編碼規範、協作原則
- `game-concept.md`：MDA 分析、核心迴圈、設計支柱、目標玩家
- `economy-model.md`：資源體系、收益公式、稀有度機率、費用縮放
- `difficulty-curve.md`：目標公式、動態難度、入門坡度、驗證清單

#### 程式碼架構概覽（更新）
| 區塊 | 說明 |
|------|------|
| BLDG | 79 種設施（原 53 + 新增 26） |
| PARTNERS | 56 位合夥人（原 38 + 新增 18） |
| FACILITY_FX | ~55 個 handler（原 ~35 + 新增 ~20） |
| BLDG_RARITY | 79 設施稀有度 |
| PARTNER_RARITY | 56 合夥人稀有度 |
| TAGS | 133 項詞條（設施+合夥人） |
| COMPOUND_EXCLUDE | 30 項排除複合設施 |

#### 總行數
- Session 12 結束：~8100 行
- Session 13 結束：~8478 行（+378 行：26 設施 + 18 合夥人 + 稀有度系統 + 數值調整 + Bug 修復 - 精簡）

### Session 14（2026-04-21）— 未實作項目補齊 + 資料/文件同步修復

#### 譚雅手牌電影式動畫（改版）
舊版的「從 Tanya 合夥人卡飛一張 76×96 小卡到手牌 + 燒毀舊卡」改為電影式特寫：

- **`closeUIForCinematic()`**：關閉 card-chooser / action-chooser / omni-drag-panel / omni-confirm-box / partner-float，確保中央特寫不被其他 UI 遮蓋
- **`_makeCinematicCardContent(bldgId)`**：200×280 大卡內容 — 56px emoji + 18px 名稱 + 說明（含 `highlightDescTags`）+ 稀有度徽章
- **半透明背幕**：`.tanya-cinematic-backdrop`（`rgba(0,0,0,.5)`，z-index 9150）
- **情境 A - 直接獲得（`tanyaGainCardCinematic`）**：
  1. Pop in：從 `scale(.3) rotate(-10deg)` 彈出放大到原大（500ms，彈性曲線）
  2. 特寫停留（500~1500ms）
  3. 飛向手牌 + 縮小至 76×96 + 淡出（1500~2100ms）
- **情境 B - 交換（`tanyaSwapCardCinematic`）**：
  1. 找出手牌中 give 卡位置 → 將原卡 `opacity:0` 隱藏
  2. 新建 cinematic 卡從 give 位置飛到畫面中央 + 放大到 200×280（0~500ms）
  3. 顫抖 `tanya-shake` keyframe（2×600ms，~550~1700ms）含左右搖晃 + 旋轉
  4. 發光閃爍 `tanya-glow-flash` keyframe（800ms）+ 高峰 320ms 切換內容為 receive 卡（邊框轉綠）
  5. 特寫停留 + 飛向手牌（3000~3700ms）
- **使用時機**：
  - `tanya.onTurnStart` 手牌空補牌 → 情境 A
  - `tanyaDoSwap` → 情境 B；若有 `refillPick`（hand+grid<24）→ 情境 A 接續
  - 完成後 `tanyaSwapDone()` 才會開啟 action overlay
- **防呆**：`tanyaSwapCardCinematic` 使用 `safeComplete()` 包裝 callback，確保即使動畫異常中斷，手牌中被隱藏的原卡（`giveEl.style.opacity='0'`）會被還原；同時 `renderFanHand` 在 callback 中執行會完全替換 DOM，雙保險

#### 譚雅手牌動畫（新增）
- 新增 helper：
  - `getPartnerCardEl(pid)`：取得合夥人卡 DOM
  - `tanyaFlyCardToHand(bldgId, delay)`：從譚雅位置飛一張 76×96 設施卡到 `#hand-fan-area`（兩段：先 pop 放大 scale(1.15)→ 飛向手牌區 scale(.7) 淡出；譚雅卡片同步向上彈跳強調）
  - `tanyaBurnHandCard(bldgId)`：尋找手牌中對應設施卡加上 `.burning` class（沿用既有 `@keyframes burnAway` 動畫）
- `renderFanHand` 為 `.fan-card` 加入 `data-bid` 屬性，方便 `tanyaBurnHandCard` 查找
- `tanya.onTurnStart` 補牌時：呼叫 `renderFanHand()` + `tanyaFlyCardToHand(pick)`
- `tanyaDoSwap` 完整序列（重要：state 立即更新、動畫 deferred，避免 race condition）：
  1. 先對要交出的手牌卡播放燃燒動畫（純視覺：對當前 DOM 卡片加 `.burning` class）
  2. **立即**更新 `G.hand`（移除 give、加入 receive、計算 `hand+grid<24` 補牌）+ 立即呼叫 `tanyaSwapDone()` → `openActionOverlay()`（phase 與狀態正確）
  3. **延遲 700ms** 後才 `renderFanHand()` 並對換入卡 + 補牌卡各播放 `tanyaFlyCardToHand`（補牌卡延遲 450ms 接續）
  - 這樣玩家在 burn 動畫期間仍可選擇行動；若玩家在延遲時間內進行其他操作，遊戲狀態已是最新的
- **防呆**：`startTurn` 強制重置 `G.elementExtraUses=0` 與 `G._extraUsePhase=false`，避免上一輪殘留狀態導致「結束回合」按鈕失效
- **讀檔 `elementExtraUses` 與 `_extraUsePhase` 不同步**：前次修復讓 `_extraUsePhase` 在合法組合下保留，但 `elementExtraUses` 仍無條件設 0，導致讀檔後 UI 顯示「跳過額外投入」按鈕但底層額外次數為 0。修復：`elementExtraUses` 僅在 `phase='place' && _extraUsePhase` 組合下保留
- **`_inOtherMode` 加入 `_omniDragging`**：防禦性擴充，確保全能會計師拖曳中不允許結束回合（雙重保障，雖然拖曳期間玩家其實無法點按鈕）
- **`landlord` 邊界處理**：`pick_fac` 事件中若場上全為不可消滅設施且手牌空，新增 log 提示「無可消滅的設施，事件繼續」避免靜默無效
- **🎯 根因定位：讀檔強制 phase='place' + 刪除 `_turnInvested`**
  - `deserializeGame` 先前無條件 `data.phase='place'` 並 `delete data._turnInvested`；若玩家在「投入完成、phase='done'、尚未點結束回合」的狀態下存檔（手動匯出、或在此狀態被 autoSave 觸發），讀檔後狀態被重置為 `phase='place'` + `_turnInvested=undefined`，按鈕三個 enable 條件全部不成立 → **死鎖：投入已完成，但遊戲以為未投入，且無法再投一次**
  - 修復：phase 白名單化 `'done' | 'place'` 保留原值、其他中間態（`animating`/`event`）才強制 reset 為 `'place'`；`_turnInvested` 只在 `phase!=='done'` 時刪除；`_extraUsePhase` 僅當 `phase='place'&&_extraUsePhase` 的合法組合時保留
  - 此 bug 可能先前被觀察為「重玩後卡住」或「讀取存檔後結束回合失效」
- **容錯旗標 `G._turnInvested`**：先前仍無法定位的「投入後按鈕殘留 disabled」bug 加入終極保險：
  - `finish()` 於 `G.phase='done'` 後設 `G._turnInvested=true`
  - `startTurn` 與 `deserializeGame` 重置該旗標
  - 按鈕 enable 條件擴充：`phase==='done' || (phase==='place' && _extraUsePhase) || (_turnInvested && !互動模式)`
  - `doNext` 加入容錯：若 `_turnInvested` 為 true 且不在互動模式（排列/移動/賣出/摧毀/event/animating）中，強制把 phase 設為 `'done'` 讓流程正常進入
  - 即使 phase 被未知路徑回寫為 `'place'`，只要已完成本回合投入且非其他互動中，玩家仍可正常結束回合

#### 黃牛販子規格更新（依 xlsx）
- 舊：商品→金錢→商品(-10%)
- 新：商品→金錢+1→商品+1；本回合沒有獲得收益時，最終收益 -8
- FX 實作：兩段鍊（+1 → +1）、標記 `G.inv._scalperHits`；`finish()` 檢查該標記且 `profit<=0` 時 -8 收益（含飛行動畫）

#### 卡片稀有度外框
- 新增 CSS class：`rarity-n`（灰）/ `rarity-r`（藍）/ `rarity-sr`（紫）/ `rarity-ssr`（金＋發光脈衝）
- 套用至：`fan-card`（手牌）、`joker-card`（合夥人）、`sel-card`（選擇器）、`omni-drop-card`（全能會計師面板）
- SSR 額外 `rarityGlowSSR` keyframe 發光動畫

#### 詞條醒目化
- 新增 `TAG_KEYWORDS_MAP` 映射（基礎/商店/人力/物流/貿易/拆遷/惡魔/強化/增幅/生產/獨特/電子/大型/中央）
- `highlightDescTags(desc)` 函數：在 desc 首段（第一個句號前）將詞條關鍵字包成 `<span class="tag-chip tag-xxx">`
- 各詞條有專屬色票（如「惡魔」深色底紅字、「大型」深藍底、「獨特」金色漸層）
- 套用至 `fan-card` 設施卡 desc、`sel-card` desc 與 pos

#### 既有 Bug / 不一致修復
- **`landlord`（大地主）負面效果 flag 設置但未消耗**：`_landlordPenaltyPending` 在 `pick_fac` 事件 `show` 中被設為 `true`，但全檔無任何位置讀取該 flag，實際上未消滅任何設施。改為直接在事件 `show` 中同步執行消滅邏輯（grid + hand 隨機一個，排除 `dept_store`/`dept_store_part`/`indestructible`/複合卡）；移除殘留 flag
- **`strike_board`（集體罷工台）實作與 xlsx 新規格不符**：原 impl「消耗所有人材×10」→ 改為「失去**一半**人材×**8**」
- **`dispatch_hq`（派遣總部）實作與 xlsx 新規格不符**：原 impl「商品通過時 +2 人材」→ 改為「本回合投入 ≥8 人材時，通過此設施觸發『場上所有設施 cellMods +2』，每回合最多一次」；新增 `G._dispatchHqFiredThisTurn` flag，startTurn 重置、deserialize 清理
- **`vaultV2Counts` 鍵格式與生命週期 bug**：`logistics_vault_v2` 的計數原用 `v2_r,c` 前綴鍵、存於 `G._vaultV2Counts`，未納入 `KEYED_DATA_FIELDS`。設施被消滅 / 交換位置時 `clearKeyedData` / `swapCellData` 無法處理，導致舊計數殘留。改為 `r,c` 鍵、改名為 `G.vaultV2Counts`、加入 `KEYED_DATA_FIELDS`，與 `bulkStoreBonus` 同待遇
- **確認對話框 click 競爭**：`showOmniConfirm` 的外部點擊偵測原用 `click` 事件 + 10ms 延遲，在 drop 釋放瞬間的事件流可能導致彈出即關閉。改用 `mousedown`（capture phase）+ 180ms 延遲；ESC 及按鈕 onclick 不受影響
- **連續拖曳殘留**：`onOmniDragStart` 補上清理前次未關閉的 `#omni-confirm-box`，避免快速重新拖曳時舊確認框殘留
- **全能會計師無目標時面板不顯示**：`showOmniDragPanel()` 原本在 `G.partners.filter(COUNT_PARTNERS).length===0` 時直接 return → 玩家看不到任何面板、以為功能壞掉。改為顯示紅框提示面板「目前沒有可灌注的合夥人」，並列出應招募的 5 位計數合夥人清單
- **從合夥人浮動面板拖曳 omni 時 drag session 被中斷**：`onOmniDragStart` 原本立即 `partner-float.style.display='none'` 或 `pointer-events:none`，若拖曳來源位於該浮動面板內，這些操作都會讓瀏覽器中斷 drag session → dragend 立即觸發 → 專用面板瞬閃即關。最終解決方案：drag 期間**只對浮動面板做 `opacity:0.35` 淡化**（不觸動 display/pointer-events/DOM），所有關閉延遲到 `onOmniDragEnd` 才執行 `display:none`
- **`partner-float` 自身 mouseleave listener 與 `hidePartnerFloat` 計時器在拖曳時仍會觸發 `display:none`**：上一條修復後仍失敗，因為 dragstart 會讓滑鼠「離開」浮動面板的 hit area → 觸發 pf 的 `mouseleave` listener（以及卡片 onmouseleave 透過 `hidePartnerFloat` 排的 200ms 計時器）→ 兩者都把 pf 設 `display:none` 中斷 drag。最終在這兩處都加入 `if(G._omniDragging) return;` 守衛
- **mouseleave 在 dragstart 之前同步觸發的 race condition**：部分瀏覽器 event 順序使 pf 的 `mouseleave` 在 `onOmniDragStart` 將 `_omniDragging=true` 之前就跑完，守衛永遠看到 false。解法：pf 的 mouseleave 改為 `setTimeout(..., 80)` 延遲關閉，讓 `dragstart` 有機會先設好 flag；延遲後再檢查 `_omniDragging` 才真正執行 `display:none`
- **最終解法：禁止從浮動面板 clone 拖曳**：前幾輪繞著 mouseleave/display:none race 打轉仍不穩定，改採根本解：`showPartnerFloat` 為所有 clone 執行 `removeAttribute('draggable'|'ondragstart'|'ondragend')`，強制拖曳只能由主合夥人列卡片觸發（那裡沒有會互相干擾的父層 listener）。omni clone 底部追加小字提示「請從左側列拖曳」指引玩家
- **MEGA_SIM_FX 落差**：`terminal` 由 `facHit*2`→`facHit*4`、`env_sensor` 由 `adj*1`→`adj*2`（對齊 Session 12 正式 FX 改動，使巨型設施/戰鬥系統模擬收益與實際一致）
- **`logistics_amp` 描述錯誤**：BLDG.desc 從「下一設施這回合獲得+8」改回「下一設施的效果×2」以匹配實作
- **`logistics_vault` 描述錯誤**：BLDG.desc 從誤植的「計數 ≥3 時 +8」改回「儲存 50%，下次釋放」以匹配實作
- **`logistics_vault_v2` 同名衝突**：name 由「物流倉」→「物流倉 v2」，避免與 `logistics_vault` UI 顯示混淆
- **`BLDG_RARITY` 重複鍵值清理**：`magnet_plate`/`ruin_monument`/`demolish_bureau`/`dynamic_amp`/`trade_zone`/`clearance` 6 組重複鍵移除，`mobile_city`/`scrap_city`/`disaster_bureau` 重新歸入 SSR 區

#### 未實作 UI 補齊
- **`clone_master`（分身大師）**：`onTalentDropCell` 加入投入人材時周遭 8 格隨機一格設施 `cellMods+2`，附紫色高光視覺提示
- **`mobile_city`（移動都市）**：
  - `G._mobileCityMode`/`_mobileCitySrc`/`_mobileCityUsedThisTurn`/`_ruinPassedThisTurn` 四個 state flag 加入 newGame 與 startTurn 重置、deserializeGame 清理
  - `info-area` 新增「🏙 移動都市交換（未使用）」按鈕 → 兩段式點擊：選周圍 8 格內設施 → 選目標格（可空、廢墟或另一設施，支援交換）
  - 整合 `swapCellData`+`onFacilityMoved` 觸發連鎖效果
  - 排除百貨公司（`dept_store`/`dept_store_part`）與自身
  - `stepWithMover` 廢墟分支設 `_ruinPassedThisTurn=true`；`finish()` 檢查若有 `mobile_city` 且本回合未投入廢墟 → 本次收益歸零（含飛行動畫）
- **`omni_accountant`（全能會計師）**：
  - 新增 helper `gainOmniCount(label)`（持有時自動 +1，**每回合最多 +1**；`G._omniGainedThisTurn` flag 於 startTurn 重置、deserialize 清理，避免過易取得）
  - 5 處計數來源掛鉤：`elec_artisan`/`thunder_king`/`relay_station`/`spread_demon` 的 `onTurnStart` + `logistics_vault_v2` FX + `demolition` `onTurnStart`
  - `renderPartners` 顯示「📊×N 拖曳給予」橘色 badge 與其他計數合夥人的「計數 N」文字
  - 新增 `COUNT_PARTNERS` 常數定義可接收灌注的合夥人清單
  - **點擊式互動（最終採用）**：當 omni 有計數時，主合夥人列的卡片 `onclick="useOmniAccountant()"`（不再使用從主列拖曳的方式，避免各種浮動面板 mouseleave race condition）
    - `useOmniAccountant()`：呼叫 `showOmniDragPanel()` 建立中央面板
    - **面板佈局（400px 寬、高度自適應）**：
      1. 標題「📊 拖曳下方卡片至目標合夥人給予計數」
      2. **上排**：玩家持有的計數合夥人目標卡（80×80 方卡：emoji + 名稱 + `curr/3→next✨` 單行計數），`overflow-x:auto` 橫向捲動支援超過 5 張；觸發效果預告改為 HTML `title` tooltip
      3. 分隔提示「↑ 拖曳到上方 ↑」
      4. **下方**：omni 源卡（同樣 80×80、`draggable=true`）顯示目前全能計數 `×N`
      5. 關閉按鈕
    - 互動：拖曳下方 omni 源卡 → 上方目標卡（`ondragover`/`ondrop` 接收）→ 釋放後**直接套用計數**（無另外確認對話框，因開啟面板+拖曳已是雙重確認）
    - 套用邏輯：`partnerState[pid].count++`、`omni.count--`、`processCountTrigger(pid)` 即刻觸發達標效果
    - 套用後：若 omni 仍有計數 → `showOmniDragPanel()` 重建面板（目標 counts 更新、willTrigger 重算）；count 歸 0 → `closeOmniPanel()`
    - 關閉方式：`installOmniPanelCloser` 掛載 ESC + `mousedown`（capture phase）外部點擊監聽，延遲 150ms 以避開開啟當下的 click 事件
    - 面板 source 與 target 都在 body 層同一容器內，`draggable` 源在本身 panel DOM 裡、無 partner-float/浮動面板干擾 → **drag session 完全不受外部 listener 影響**
    - 達門檻即將觸發的目標卡：預先呈綠框微發光 + 觸發效果預告（如「✨ 獲得電子工廠」）
    - 拖曳懸停目標時 `.omni-hover` class 放大 1.08× + 亮綠外框
    - 無可灌注目標時顯示紅框提示面板（含關閉按鈕）
    - 主合夥人列 badge 改為「📊×N」+「點擊灌注」提示
    - **移除**舊版從主列拖曳/浮動面板 clone 拖曳的所有相關處理、confirm 對話框（`showOmniConfirm`/`confirmOmniGive`/`cancelOmniGive`）、`showPartnerFloat` 的各種 drag 守衛
    - **Listener 洩漏修復**：`installOmniPanelCloser` 的 `setTimeout(150ms)` 在面板快速關閉/重建時會造成 listener 殘留（面板已消失但 listener 仍掛在 document 上）。修復為：`attached` 狀態旗標 + `clearTimeout(timerId)` + 回呼內檢查 `document.body.contains(panel)`，兩重保險確保不會有孤兒 listener
    - **清理 dead CSS**：刪除 `.joker-card.upgrade-glow` 與 `.joker-card.omni-hover`（已不再套用到 joker-card；前者為舊版主列拖曳提示、後者為舊版目標高亮，均已無使用點）
  - **計數給予後立即觸發達標效果**：抽出共用函數 `processCountTrigger(pid)`，5 位計數合夥人的 `onTurnStart` 與 `confirmOmniGive` 共用；灌注計數後若達門檻（≥3）即刻執行對應效果（獲得設施/消滅設施/廢墟轉物流/全設施視為中央/+1 重排），不必等到下回合

#### 拆遷隊技能改版（依 xlsx 設計同步）
- 舊：`startTurn` 中每 3 回合自動 +1 charge
- 新：`PARTNERS.demolition.onTurnStart` 使用計數制（+1/回合，≥3 消耗 3 → 獲 1 charge）
- 加入 `COUNT_PARTNERS`，`omni_accountant` 可灌注
- `startTurn` 中的 `turn % 3` 邏輯移除

#### 譚雅補牌 bug 修復（跨稀有度）
- `onTurnStart` 手牌空補牌與 `tanyaDoSwap` 中 `hand+grid<24` 補牌皆改為**限 N 稀有度**，避免隨機送出 SR/SSR
- log 顯示「（N）」標記以利辨識

#### 量販店改版（依 xlsx 新規格）
- 舊：商品 →金錢(+50%,上限 10×輪數)→商品
- 新：投入商品時失去一半數量，每失去 4 個商品獲得 +8 收益（每次觸發使 `bonusPer +4` 永久累積），單次提供 ≥100 收益時自毀
- 新增 `G.bulkStoreBonus:{}` 每格追蹤獎勵值（預設 8），加入 `KEYED_DATA_FIELDS` 以跟隨設施位置搬遷
- `MEGA_SIM_FX.bulk_store` 同步簡化為 +8/組（不模擬累積）

#### `demon_giant` 大型設施數量限制系統
- `tryPlaceAtCell` 加入前置檢查：`isLarge` 設施（`giant_village`/`ancient_factory`/`world_wonder`）在場上已存在時擋下
- 持有 `demon_giant` 豁免限制（該合夥人正面描述本就註明）

#### 疊加設施消滅時 `facility_destroyer` 觸發
- `destroyFacility` 在 `clearKeyedData` 前先遍歷 `cellOverlay` 疊加設施，每個觸發：設施破壞者 +4、廢鐵城 `x+=2`、災害控管局消滅數 +1
- 百貨公司 2×2 消滅路徑同步處理 4 格各自的疊加設施

#### 格子計數視覺
`renderGrid` 於有計數/狀態的設施格子右上角加 badge：
- `logistics_vault_v2`：橘色 `N/3`（計數進度）
- `logistics_vault`：灰色 `💼N`（目前儲存值，>0 才顯示）
- `elec_conveyor`：藍色 `⚡ON`（下一個電子設施永久 +2 預載中）
- `scrap_city`：紅色 `x=N`（累積消滅獎勵）

#### 文件同步更新（`VentureTown_GameDoc.md`）
- 概述目標公式、難度範圍、行動費用、費用公式修正為 Session 13 實際值
- 商店系/物流系設施表更新：量販店新規格、終點站 ×4、環境感應站 +2、新增物流倉 v2、修正物流放大器
- 獨特合夥人表：譚雅、拆遷隊更新
- 技術細節：行數、路徑、移除不存在的 `venture-town.html`

#### 總行數
- Session 13 結束：~8478 行
- Session 14 結束：~9564 行（+~1086 行：UI 補齊 + 量販店改版 + 多項 Bug 修復 + 計數視覺 + 歷次增補）
