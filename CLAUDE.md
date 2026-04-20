# VentureTown（創業小鎮）— 專案設定

## 技術棧

- **架構**：單檔 vanilla JS（index.html ~8478 行）
- **語言**：HTML / CSS / JavaScript（ES2020+，無框架）
- **字體**：Noto Sans TC（中文）、DM Mono（數值）
- **音效**：Web Audio API（內建合成，無外部檔案）
- **儲存**：localStorage 自動存檔 + JSON 匯出/匯入
- **版本控制**：Git

## 專案結構

```
VT/
├── index.html              ← 主檔（所有 HTML/CSS/JS）
├── VentureTown_GameDoc.md  ← 開發記錄（變更日誌）
├── CLAUDE.md               ← 本文件（專案設定）
├── game-concept.md         ← 遊戲概念文件
├── economy-model.md        ← 經濟模型
├── difficulty-curve.md     ← 難度曲線
├── 新合夥人表.xlsx          ← Excel 設計稿
├── img/C_1~C_6.png         ← 角色表情立繪（6 張）
└── 圖片參考/               ← 原始素材
```

## 核心架構

| 區塊 | 說明 |
|------|------|
| `BLDG` | 79 種設施定義（id → {name, emoji, desc, req, out, fn, special, centerOnly?, needs2x2?, indestructible?, isShop?, isLarge?}） |
| `PARTNERS` | 56 位合夥人（id → {name, emoji, pos, neg, onTurnStart/onSettle/onRoundStart/onRecruit}） |
| `FACILITY_FX` | 設施特效調度表（special → handler(fx)） |
| `EVENTS` | 19 種隨機事件 |
| `G` | 全域遊戲狀態物件 |
| `SM` | 場景管理器（title / gameplay） |
| `TUT` | 教學系統（集中式鉤子） |
| `MEGA` | 巨型設施系統（開發者模式） |
| `BATTLE` | 戰鬥系統（開發者模式） |
| `BLDG_RARITY` | 79 設施稀有度（N/R/SR/SSR） |
| `PARTNER_RARITY` | 56 合夥人稀有度 |
| `COMPOUND_EXCLUDE` | 30 項排除複合設施的 ID |

## 數值體系

- **稀有度**：N → R → SR → SSR（影響出現權重）
- **輪數加權**：`rarityWeightByRound(round, rarity)` 控制各稀有度在各輪的出現倍率
- **目標公式**：`goal = round(oldGoal × 1.4 × difficultyMult + 8)`，初始 20
- **難度倍率**：`difficultyMult` 範圍 0.5~3.0，依達標速度和超額比率調整
- **費用縮放**：`scaledCost(base) = ceil(base × max(1, 1 + (round-1) × 0.35))`

## 關鍵狀態欄位

- `KEYED_DATA_FIELDS`：8 個隨設施位置轉移的鍵值欄位（bldgUpgrades / leyaPctMods / cellMods / bombTimers / tempShedMoves / logisticsVault / cellOverlay / futuresPct）
- `G.inv`：每次投入重置的臨時 flag（sendEl 初始化）
- `G.partnerState`：合夥人專屬持久狀態
- `G.buff`：事件/回合 buff（每輪清除）

## 編碼規範

- 新增設施：在 `BLDG` 定義 + `FACILITY_FX` 加 handler + `TAGS` 加詞條 + `BLDG_RARITY` 加稀有度
- 新增合夥人：在 `PARTNERS` 定義（含 hook） + `TAGS` 加詞條 + `PARTNER_RARITY` 加稀有度
- 格子資料操作：必須使用 `swapCellData()` + `KEYED_DATA_FIELDS`
- 格子資料清理：使用 `clearKeyedData(key)` 而非手動 `KEYED_DATA_FIELDS.forEach`
- 標籤查詢：使用 `hasTag(id, tag)` 而非 `BLDG[id].tags`（BLDG 上不放 tags 屬性）
- 設施池過濾：使用 `isPoolableBldg(id)` 排除特殊設施
- 設施消滅：必須使用 `destroyFacility()`（統一清理 keyed data + 觸發合夥人效果 + indestructible 檢查）
- 動畫 setTimeout：必須加 `if(_stepAnimGen!==gen) return;` 世代檢查
- 事件監聽器：必須在 `SM.exit()` 中清理

## 協作原則

- 修改前先讀取相關程式碼，理解現有邏輯
- 數值修改需對照 `新合夥人表.xlsx` 確認一致性
- desc 文字必須與實際 fn/handler 行為一致
- 不隨意重構未觸及的程式碼
- 台詞鍵值必須對齊 BLDG.name / PARTNERS.name
