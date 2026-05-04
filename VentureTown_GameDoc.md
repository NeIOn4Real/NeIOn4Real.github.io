# 創業小鎮（VentureTown）遊戲文件

## 概述
創業小鎮是一款以創業經營為主題的網頁策略遊戲。玩家在 4×4（可擴展至 5×5）的小鎮格子上放置各類設施，透過將手中的資源元素投入小鎮，讓資源沿路經過設施進行轉換與增值，最終以金錢形式產出收益，達成每輪的收益目標即可過關。

---

## Session 索引（desc/實作對照審查批次）

> 本表僅列「desc/實作對照審查」與重大系統批次。完整時序見下方〈全 Session 完整索引〉。

| Session | 主題 | 重點 |
|---|---|---|
| 18b | 多項 bug 修復與物流中心補完 | 莫菲 permCellMods / cellMods 清除 / logistics_vault_v2 遷移 / 物流中心 R 級 |
| 19 | desc 審查第 1 輪（6 項不一致） | 發現 clearance / demolish_fab / talent_storage / talent_market / trade_port / trade_zone 問題 |
| 20 | clearance / bulk_store 機制互換 | clearance 補完「失一半+累積+自毀」；bulk_store 改「商品→金錢+4+工廠加成」 |
| 21 | 中央詞條設施 | 移除 trade_hub/tech_lab；監督局 per-cell；center_elec_net 疊加完整化 |
| 22 | 電子系設施 | elec_conveyor 死碼修復 + bldgUpgradesElec 欄位；mega_elec_supply 每回合 +1 |
| 23 | 大型系設施 | dept_store/mega 加 isLarge；dept_store FX +8/+8/+8；ancient_factory_part |
| 24 | 人力系設施 | talent_bank 改投入觸發；dispatch_hq 去 goods 限制；staff_housing per-turn |
| 25 | 拆遷系設施 | dynamic_amp / unstable_base 重做；mobile_city UI；ruin_monument G.profit |
| 26 | 物流系設施 + 全域規則 | logistics_amp 死碼；spiral_hub 重做；確立 desc 解讀規則 |
| 27 | 貿易系設施 | 期貨交易所完全重做（0/2/4/8+重抽）；匯率波動板 noOverlay |
| 28 | 電子合夥人 | 電子放電惡魔死碼修復（base+overlay）；雷電法王擴展電子池 |
| 29 | 物流合夥人 | 重建驛站 / 全能會計師 desc 修正；計數消耗全域規則 |
| 30 | 貿易合夥人 | 外匯交易員死碼修復；套利者 X 標記 |
| 31 | 拆遷合夥人 | 爆破工程師 3 項修正；混沌建築師排除巨型；廢墟掠奪者完整實作（ruinStacks） |
| 32 | 全合夥人 desc 審查 + 3 修 | 擁慶記房屋 ReferenceError；擴散惡魔 pride 豁免；公路之星 per-cell cellPath 判定 |
| 34 | 8 個惡魔合夥人全面改版 | 對齊新合夥人表；新增 onTurnEnd hook；嫉妒工廠完全重做；激情/貪婪/傲慢機制變更 |
| 35 | Session 34 後續 bug 修復 + 音效動畫系統（5 組 32 接點） | A–G: bug 修復 5 項；H: 7 個關鍵事件音效動畫；I: 🔴 過關/失敗/輪/事件/達標/計數達標 6 項；J: 🟠 合夥人/升級/人材/拖曳錯誤/資源轉換/卡值變化 6 項；K: 🟡 存讀檔/開發者/教學/格選/卡懸停/無法負擔 6 項；L: 🟢 SSR/複合/譚雅稀有/擴大地圖/嫉妒匹配/匯率/物流方向 7 項 |
| 36 | 設施互動審查 + 多項機制修正 | A: cellBonus orphan / pride 上限 / 事件 banner 靠左；B: 臨時加成格子高亮 + BGM；C: 轉運中心複合卡修；D: 古代機械工廠「視為 4 工廠」計數規則；E: 6 個商店 special FX 跳過 shop_owner 系統性修復；F: 中央監督局嚴格按 facPath；G: 環境感應站每格只算一次；H: 人力派遣 fx.hit；I: 強化增幅裝置改被動心願 |
| 37 | 合約系統實作（Phase A→D）+ 數個既有 bug 修補 | A: CONTRACTS / CONTRACT_POOLS / runContractHook / 合約面板 UI 框架；B: R2 池 12 張完整實作；C: 暗叫合約（卡背手牌 + 配對消除 +30）；D: R4 池 12 張（含 6 dupes + 板塊/擴展/電極等永久效果）+ R6 池 9 張（大群/地產/產線/巨人/終點/姊妹/惡魔/工會/暗叫）；附帶修：複合卡 蕾雅疊加 / 大型設施排除複合 / 多輪過關連跳合約補發 / 商業集中追蹤漏算（基礎設施路徑漏 _trackContractHits）/ 收益顯示 +-N / 合約按鈕 UI 移位 + 加大 / 卡背 inspector 洩露 / 暗叫複合卡 emoji 可見 / dept_store_part 配對繞 indestructible |
| 38 | Session 37 合約系統審查後續 + 平衡與 UI 修補 | A: 合約 chooser 模組變數 deserializeGame 不重置，mid-modal 匯入存檔會卡死後續所有合約 chooser；B: 工會合約門檻 6→4 人材；C: mega_elec_supply / giant_village / world_wonder 在無大財團時也能放置（新 findEmpty2x2 helper）；D: 角色立繪 z-index 98→50，拖曳卡片時淡出，避免遮擋手牌與投入箭頭 |
| 39 | 移動 session 統一化（mobile_city 剝削修補）+ 取消還原 + 多項既有 bug | A: 移動都市內反覆 swap 無限觸發 demolish_bureau / dynamic_amp / trade_zone；B: 新增 `_isInMoveSession` / `_flushMoveSession` helper，freeRearrange 與 _mobileCityMode 統一視為移動 session，per-session 1 trigger；C: mobile_city 加 saveGridSnapshot/restoreGridSnapshot，「取消」真的還原 swap（與 cancelRearrange 一致）；D: dynamic_amp / demolish_bureau desc 補上「自由排列／移動都市整段視為 1 次」；E: ancient_factory_part 漏排 isPoolableBldg / dev panel 排除清單，被當 N 級設施抽進手牌；F: adv_booster 作為複合 overlay 不掃 + 複合 'placed' 分支不觸發 recomputeBoosterAura；G: 「積累」合約 達到 20 → 增加 200（新 counter `roundMaxResourceIncrease`，per-send delta 追蹤）；H: BGM 程序化合成 → 外部 mp3，依 `G.round` 切歌（1-4 / 5-8 / 9+） |
| 40 | Post-Session-39 微調批次（系統擴展、平衡、UX、DEV 工具） | A: BGM 預設開啟 + bgm_4 標題畫面音樂 + SM 場景切歌 (`setScene`)；B: 擴展合約平衡（商店費用 ×5→×3、空格懲罰 −10/格 → −5%/格 比例式）；C: 3 個商店限定 N 工具設施（貨櫃屋 / 勞工兄弟屋 / 紅綠燈）+ 物流轉運中心 desc 修正（變物流中心而非物流站，攜帶起始方向）；D: 商店 offer 每回合鎖定（避免取消重開無限刷新，跨存檔同 turn/round 沿用）；E: 物流站 cellRedirectDir 防禦（runtime `isPerTurnRot===true` 嚴格化）+ sell-shake CSS 特異度修正（被 `cell.temp-buff/event-preview` 覆蓋）+ 立繪不裁切（移除 opacity/pointer-events override）；F: 人材批量投入 UI（×1/×2/×5/全部 按鈕條，per-投入完整副作用）+ 第 6 輪後每 2 輪合約 chooser（使用 r2+r4+r6 合併池）；G: DEV 合約面板加「點擊獲得指定合約」grid（池篩選 + 已接受灰階）|
| 42 | 耐用值 UI 血條化 + 詞條權重/鎖池/合約過濾 + 4 處後續修復 | A: 耐用值 UI 從文字徽章改分段血條，N/R/SR/SSR 上限 3/5/7 → 5/7/9/11；B: TAG_WEIGHT 0.12→0.3、多詞條同時命中 ×1.5 boost；C: 流派鎖池 `filterByOwnedTags`：玩家有 ≥2 非中性詞條時，候選池只保留 basic/demon/無詞條/已擁有詞條（大型例外要求對應詞條）；D: 合約前置 `CONTRACT_REQUIRES_TAG` 過濾，玩家未具前置詞條的合約不出現；E: 後續修復 — `TAG_LOCK_IGNORE` 加入 boost/unique（避免 starter 第 1 回合就鎖）、filter 嚴格檢查改用 `lockTags`（避免 mayor/big_corp 自身 unique catch-22）、移除 `electrode_contract`/`giant_contract` 循環前置 |
| 48 | 蕾雅耐用恢復回歸 + 合約結算 UI + 莫菲純預告 + 物流站化 + 教學擴充 | A: 蕾雅同類疊加恢復目標耐用上限一半（向上取整），含複合卡路徑；B: 合約結算側邊 log 可點擊開詳情 modal + 中央 ✓/✗ 印章動畫（queue 依序播放）；C: 莫菲從 `triggerEvent` 即時池排除（只走 `pickNextEvent` 預告流程），同時加入 `MARKET_EVENT_IDS` 讓惡魔巨人觸發；D: `logistics_hub` 放置改為轉成 `logistics_<dir>` 固定方向（與 `transfer_hub` 同），desc 同步；E: 教學從 9 步擴為 12 步，新增耐用值/人材/合約三個 step，互動期間強制只允許教學動作 |
| 49 | 教學 bug 修復 + 排列取消還原手牌 + 高級設施直接覆蓋升級 + 莫菲非預告防禦 + 常駐按鈕 z-index | A: 教學中立繪自動退場（`body.tutorial-active` opacity:0 + pointer-events:none）避免遮 btn-next；B: step8 人材說明強調「恢復 +1 耐用值」（★ 重點 + 急救包比喻）；C: 拆遷隊重排後卡死修復 — `hookConfirmRearrange` 改設新狀態 `tut_post_rearrange_end_turn` + 清空 `G.card` + speak 提示「點⏩結束回合」+ `hookDoNext` 識別新狀態推進到 step12；D: `saveGridSnapshot`/`restoreGridSnapshot` 加 `_handSnapshot`，cancelRearrange 還原手牌（修「取消後手牌設施消失」bug，覆蓋拆遷隊與移動都市兩條路徑）；E: 高級原料廠/高級工廠/超商 直接蓋在對應基礎設施（mat_factory/factory/shop）上，視為升級替換（per-cell 加成 bldgUpgrades/cellMods/cellPctMods 自然繼承，耐用值依新稀有度上限重建，overlay 存在時拒絕避免破壞疊加狀態）+ onCellDragOver 預覽放行 + desc 同步；F: `_contractTriggerEventById` 加莫菲過濾（防禦 latent bug：避免任何合約即時路徑繞過 `pickNextEvent` 預告流程觸發莫菲）；G: 右側 panel 常駐按鈕（`#perm-btns` 商店/轉換、`#btn-next` 結束回合）加 `position:relative; z-index:55` 高於立繪（z-index:50），修復普通遊戲中立繪 img 的 `pointer-events:auto` 攔截轉換收益按鈕點擊 |
| 51 | GameDoc 架構審查 + 全面 code 審查 + 2 真實 bug 修復 | A: GameDoc 11 項修復（表格欄位、Session 編號重複、索引、概覽、G 欄位、KEYED_DATA_FIELDS、分類、雙身份）；B: 5 Explore agent 審查 10+ 區塊產出 17 finding，親自 grep 駁回 15 個（多 by design / agent 看錯）；C: 修 MEGA ruinCells Set 序列化丟失（saveMegaFacilities + serializeGame 加 Set replacer）；D: 修 deserializeGame 動畫世代未取消（cancelStepAnim 補回） |
| 52 | 5 項 bug 修復（投入預覽 / 教學立繪 / 姊妹合約 / 教學人材 / 廢墟手牌） | A: 投入預覽位置偏移（Session 50 `_$('grid')` 快取 detached `#grid` → `getBoundingClientRect=0`，改回 `document.getElementById`）；B: 教學立繪恢復可見（Session 49 `body.tutorial-active #char-tray opacity:0` 把蕾雅/譚雅藏掉，移除規則）；C: 姊妹合約改規則「重疊 3 次 → 重疊過」（compensationText + `ovs.length<3 → <1` + log）；D: 教學人材拖放雙 target 支援（拖資源卡/拖設施都可；新增 `tut_end_turn_after_talent` 狀態，不再直跳 step9，允許先投入再結束）；E: 廢品戰士廢墟手牌放置時同步加入 `G.ruinCells`（修回收阿罵 onTurnStart 看不到手放廢墟） |
| 53 | 教學 BGM + 投入後人材重新解鎖拖曳 + 對話修正 | A: BGM 新增 `'tutorial'` scene → bgm_4（沿用標題音樂 intro 感）；TUT.start setScene('tutorial')、TUT.finish setScene('gameplay')；B: `onTalentDrop` 修 latent bug — 投入後 `_turnInvested=true` 鎖住 canDrag，再用人材時設 `_extraUsePhase=true` + `phase='place'` 解鎖（非教學專屬，一般遊戲「投入後拿到人材」也修）；C: `hookTalentDrop` 對話修正 — 拖設施只引導結束回合（沒 extraUses 不能再 drag），拖資源卡才提示可投入 |
| 50 | 程式碼精簡（CSS 變數 + DOM 快取 + display helper + 巢狀 if 扁平化） | A: `--pill-r:99px` 變數取代 20 處硬編碼（CSS rule 8 + JS template inline 11）；B: 新增 `_$()` DOM 快取 helper + `_ELC` 物件，替換 86 處靜態頂層元素 `document.getElementById`（btn-next/btn-contract/wind-hint/contract-fx/modal/r-turn/r-profit/r-goal/ev-* 等），動態元素如 fancard-N/各 overlay/popup 刻意保留；C: 新增 `_show(el,mode)` / `_hide(el)` helper 替換 49 處 `.style.display='flex'/'none'/'block'`，2 處讀取（檢查 display 狀態）保留；D: 5 處巢狀 if 扁平化（poverty_god onTurnEnd / moveMode 移動分支 / terminal_contract 違約檢查 / `_contractProfitZeroTurns` zero-profit / showContractResolveDetail def 檢查 + `_clearLogisticsCenters` overlay / 手牌物流卡判斷）；總計 −4.7KB；不動 BLDG fn 預填 / PARTNERS desc 自動拼 / `isDemonNegDisabled` 中央化 / `partnerState` 統一 init / 耐用值 UI CSS 合併 / stepWithMover G.buff 順序（依 GameDoc S22/26/28/30/32 教訓判定為高風險） |

### 全 Session 完整索引（時序）

審查批次以外的 session 一行摘要；詳細內容見〈變更記錄〉章節。

| Session | 日期 | 主題 |
|---|---|---|
| 2 | 2026-04-11 | Bug 修復 + 效能（物流放大器、貿易特區、commitTurnLog） |
| 3 | 2026-04-11 | 事件系統大改（8 新事件 + cellPctMods + 預告高亮） |
| 4 | 2026-04-12 | 合夥人全面實作（11 個合夥人補完） |
| 5 | 2026-04-12 | 設施擴充 + 廢墟系統 + 程式碼重構 |
| 6 | 2026-04-12 | 待處理項目清理 + UI 改善（路線規劃師、過關按鈕） |
| 7 | 2026-04-12 | Bug 修復 + 全面驗證 |
| 8 | 2026-04-13 | 架構精簡 + 存檔系統 |
| 9 | 2026-04-13 | 平衡調整（黑市商人削弱）+ 架構精簡 + UI |
| 10a | 2026-04-13 | 程式碼品質修繕（renderFanHand inline style 抽出等） |
| 10b | 2026-04-14 | 工業化系統（巨型設施開發者模式） |
| 11 | 2026-04-15 | 全面審查 + Bug 修復 + 死碼清除 |
| 12 | 2026-04-20 | 新合夥人機制 Excel 同步 + 2×2 保護 |
| 13 | 2026-04-20 | 合夥人效果改版 + 26 新設施 + 18 新合夥人 + 數值平衡 |
| 14 | 2026-04-21 | 未實作項目補齊 + 資料/文件同步修復 |
| 15 | 2026-04-22 | 大型電子供給站改版 + 9 項 Bug 修復 |
| 16 | 2026-04-22 | 第二輪審查 + 永久格子加成系統 + 磁力板永久化 |
| 17 | 2026-04-22 | 音效升級 + 疊加 pipeline + 放置特效 + 規格調整 |
| 18a | 2026-04-22 | 第三輪審查（待處理清單，未修） |
| 18b | 2026-04-23 | 多項 Bug 修復與物流中心補完 ★審查批次 |
| 19–32 | 2026-04-24~25 | desc/實作對照審查 14 批 ★審查批次（見上表） |
| 33 | 2026-04-25 | Session 18 / 32 待處理項目逐一清理 |
| 34 | 2026-04-25 | 8 個惡魔合夥人全面改版 ★審查批次 |
| 35 | 2026-04-26 | Session 34 後續 bug 修復 + 音效動畫系統 ★審查批次 |
| 36 | 2026-04-26 | 設施互動審查 + 多項機制修正 ★審查批次 |
| 37 | 2026-04-27 | 合約系統實作（Phase A→D）★審查批次 |
| 38 | 2026-04-27 | 合約系統審查後續 + 平衡與 UI 修補 ★審查批次 |
| 39 | 2026-04-28 | 移動 session 統一化 + BGM 外部 mp3 ★審查批次 |
| 40 | 2026-04-28 | Post-Session-39 微調批次 ★審查批次 |
| 41 | 2026-04-28 | 投入預覽 UI + 設施耐用值系統 |
| 42 | 2026-04-28 | 耐用值血條 + 詞條鎖池 + 合約過濾 ★審查批次 |
| 43 | 2026-04-30 | 莫菲定律簡化為純市場事件 + 耐用恢復條件放寬 |
| 44 | 2026-05-01 | 蕾雅疊加修復破損耐用 + UI 靠左 + 立繪縮小 |
| 45 | 2026-05-01 | 新合夥人/設施/合約（耐用值流派擴充） |
| 46 | 2026-05-01 | UI/立繪/排列模式中投入 + 雜項修補 |
| 47 | 2026-05-01 | 系統性審查修補（耐用值/合約 6 issues） |
| 48 | 2026-05-01 | 蕾雅耐用恢復 + 合約結算 UI + 莫菲純預告 + 物流站化 + 教學 12 步 ★審查批次 |
| 49 | 2026-05-02 | 教學 bug 修復 + 排列取消還原手牌 + 高級設施直接覆蓋升級 |
| 50 | 2026-05-02 | 程式碼精簡（CSS 變數/DOM 快取/display helper/巢狀 if 扁平化）★審查批次 |
| 51 | 2026-05-03 | GameDoc 架構審查 + 全面 code 審查（5 agent / 17 finding）+ 2 真實 bug 修復 ★審查批次 |
| 52 | 2026-05-04 | 5 項 bug 修復（投入預覽 / 教學立繪 / 姊妹合約 / 教學人材 / 廢墟手牌） |
| 53 | 2026-05-04 | 教學 BGM + 投入後人材解鎖拖曳 + 對話修正 |
| 54 | 2026-05-04 | 教學 BGM 不啟動 regression 修復（SM.goto 跳過 tutorial mode 的 setScene('gameplay')） |
| 55 | 2026-05-04 | 標題 🎵 toggle 首次點擊無效 + BGM race 根因修復（bgmAutoStart capture → bubble phase） |
| 56 | 2026-05-04 | 商店第 2 輪起出現合夥人（更貴、tagWeight 加成）+ 免費格 cache 失效修復 |
| 57 | 2026-05-04 | 商店合夥人改為「輪」級鎖（避免結束回合反覆刷新合夥人） |
| 58 | 2026-05-04 | 訪客計數器（Cloudflare Worker 後端，作者專用暗門 + IP 排除） |
| 59 | 2026-05-04 | 商店合夥人改 4th 額外位置 + 撤回 S57 輪鎖（per-turn roll） |
| 60 | 2026-05-04 | 巨人村 / 大型電子供給站 / 世界奇觀 真正佔用 2×2（補 _part 占位 + cascade destroy） |

### 歷史追蹤的「flag-based 跨格 buff」死碼 pattern
統一根因：`G.inv.someFlag` 消費點寫在 stepWithMover 通用 fn 處理器，但 special FX 設施早 return 永遠不會走到。**修法**：消費點移到 `if(bId)` 起始後、special FX dispatch 之前。
- S22 電子輸送帶、S26 物流放大器、S28 電子放電惡魔、S30 外匯交易員

### 歷史追蹤的「per-send vs per-turn」pattern
desc 寫「此回合」但實作用 `G.inv.xxx`（per-send），多 send 會重複觸發。**修法**：改用 `G._xxxThisTurn` Set/flag + `G._xxxFiredThisTurn` 防重複，startTurn 重置。
- S21 中央監督局、S24 員工住宅、S25 災害控管局、S31 廢墟掠奪者

### 歷史追蹤的「special FX 早 return 跳過 onBuildingHit」pattern
統一根因：FX 內呼叫 `fx.hit()` 時 `_fxDone=true`，stepWithMover 的 `if(_fxDone) return` 會跳過後續通用 onBuildingHit hook，導致 partner 對該設施完全無感（dept_store / ancient_factory 等的「視為 N」計數實作 = 0 而非 N）。**修法**：FX 末尾顯式呼叫 `_runPartnerOnBuildingHit(bId)`；計數型 partner 用 weight helper（`_factoryWeight`/`_shopWeight`）對應「視為 N」效果。
- S36 dept_store / ancient_factory / small_shop / scalper / bulk_store / trade_zone / convenience

### 歷史追蹤的「基礎設施路徑漏執行統計」pattern
統一根因：`_hit()` closure 內呼叫 `_trackContractHits(r,c,bId)`，但「基礎轉換設施」（無 `b.special` 的 mat_factory / factory / shop 等）走的是 stepWithMover 一般處理路徑，**從不呼叫 `_hit()`**，導致合約追蹤計數器漏算（商業集中合約 #10 因此無法計算商店投入次數）。**修法**：在基礎轉換路徑同樣呼叫 `_trackContractHits`（位置：`G.inv.facHit++` 與 `facPath.push` 之後）。
- S37 商業集中 / 工業集中 / 農業集中 投入次數修補

---

## 核心玩法

### 資源系統
遊戲有 4 種資源類型：
| 資源 | 圖示 | 顏色變數 |
|------|------|----------|
| 金錢 (money) | 💰 | `--money` |
| 原料 (material) | 🪨 | `--mat` |
| 商品 (goods) | 📦 | `--goods` |
| ~~鑽石 (diamond)~~ | ~~💎~~ | ~~特殊（舊嫉妒惡魔專屬）~~ — Session 34 隨嫉妒改版移除；UI 常數保留供向後相容 |

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
- **連續結算**：單次結算時若 `G.profit` 同時超越當輪與下一輪（或更多輪）目標，會一次連過多輪；Modal 顯示過關鏈與累計輪數（上限 20 輪）

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
收益 = 資源離開小鎮時的金錢數值 − 進入時的金錢數值（基準 1）
```
資源以金錢值 1 進入，經過設施轉換增值後，以金錢形式離開時差值即為收益。

---

## 效果文本（desc）解讀規則

> ⚠️ **這是所有設施 desc 與實作對照的全域規範**，PM 確認於 Session 26。新增/修改設施時務必依此規則。

| 文本寫法 | 對應實作 | 程式碼欄位 |
|---|---|---|
| **「投入時」** | 視為「投入此設施時」 | — |
| **「獲得 +N」** | 投入資源的 value += N（per-pass）| `fx.el.value += N` |
| **「獲得收益 +N」** | 直接收益 += N | `G.profit += N` |
| **「永久獲得 +N」** | 跨回合持久升級 += N | `G.bldgUpgrades[k] += N` |
| **「本回合獲得 +N」** | 本回合所有經過皆吃 | `G.cellMods[k] += N` |
| **「投入 N 人材」** | 玩家主動投入人材到此設施 N 次 | （on `onTalentDropCell`）|

### 進階變體
- **「永久獲得 +N（電子）」** — 只有電子實例（基底/疊加）才吃 → `G.bldgUpgradesElec[k] += N`
- **「下一個設施 +N」** — 用 flag（如 `G.inv.ampAct` / `G.inv._elecConveyorActive`）在進入下一格時消費 → 必須在 `special FX dispatch` **之前**處理（避免 special FX 早 return 跳過）

### 觸發時機關鍵字
| 寫法 | 觸發點 |
|---|---|
| 「投入時 / 通過時」 | `FACILITY_FX[bId](fx)` 中 |
| 「回合開始時」 | `startTurn()` 中 |
| 「回合結束時」 | `finish()` 中（per-send，需注意多 send 累加問題）|
| 「最終收益時」 | `finish()` 末段（onSettle 之後）|
| 「設置時 / 放置時」 | `onFacilityPlaced(r,c,bId)` 中 |
| 「移動時 / 更動位置時」 | `onFacilityMoved(r,c,sr,sc)` 中 |
| 「消滅時」 | `destroyFacility(r,c)` 中 |

### per-turn 防重複觸發 pattern
若 desc 是「此回合 ... 觸發一次」類型（如 中央監督局、員工住宅、災害控管局、派遣總部、物流中心轉向），需要：
- `G._XxxHitThisTurn` (Set) — 追蹤本回合命中過的 cell
- `G._XxxFiredThisTurn` (Set/bool) — 防止同回合多次 send 重複觸發
- 兩者都在 `startTurn()` 重置

### 通用「flag-based 跨格 buff」死碼陷阱
若實作用 `G.inv.someFlag` 在通用 fn 處理器內消費（line 4900+ 區），會被 special FX 設施 `if(_fxDone) return;` 跳過，導致對 special 設施失效。**正確做法**：消費點要放在 `if(bId)` 起始後、special FX dispatch 之前。

歷史踩坑修復：
- `logistics_amp` 物流放大器（S26）
- `elec_conveyor` 電子輸送帶（S22）
- `elec_discharge_demon` 電子放電惡魔（S28）
- `forex_trader` 外匯交易員（S30）

新增「跨格 buff」設施／合夥人時務必檢查此 pattern。

---

## 對照表（Excel）

`VentureTown_實作對照表.xlsx`（與 GameDoc.md 同目錄）為**程式碼當下實作**自動產生的設施與合夥人對照表。

### 結構
- **單一工作表「設施＆合夥人對照表」**
- 9 欄：合夥人名稱 / Emoji / 效果文本 / 稀有度 / 分隔 / 設施名稱 / Emoji / 效果文本 / 稀有度
- 依 tag 分類：基礎 / 電子 / 物流 / 中央 / 大型 / 人力 / 貿易 / 拆遷 / 商店 / 惡魔 / 特殊
- 合夥人「負面效果」用「【負面】」前綴附加在 pos 之後

### 與 `新合夥人表.xlsx`（設計稿）的差異
- `新合夥人表.xlsx` 是**設計目標**（PM 維護）
- `VentureTown_實作對照表.xlsx` 是**目前程式實作**自動匯出（每次重大修改後重新產生）
- 兩者應該逐漸一致（每次審查 Session 修復差異）

### 重新產生方式
透過 `python` 腳本從 `index.html` 提取 `BLDG` / `PARTNERS` / `BLDG_RARITY` / `PARTNER_RARITY` / `TAGS`：
```bash
python <generate_xlsx_script>
```
（腳本內容見 commit history）

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
| 勞動轉換站 | ⚙️ | 本回合每投入 2 人材，資源通過時 +4 |
| 人材倉庫 | 🗃️ | 持有 5+ 人材時額外 +5 |
| 人才市場 | 🏦 | 金錢通過時消耗 3% 獲得 2 人材 |
| 加班辦公室 | 💼 | 本回合每投入 2 人材，資源通過時 +8 |
| 人力銀行 | 🏧 | 投入 2 人材，下回合開始時獲得人材 +4 |
| 派遣總部 | 🏢 | 本回合投入 8 人材時觸發：場上所有設施 cellMods +2（每回合最多一次） |
| 集體罷工台 | 📢 | 投入資源時失去一半人材，每個 +8 數值 |

### 物流中心流設施
| 設施 | Emoji | 特殊效果 |
|------|-------|----------|
| 螺旋物流站 | 🔄 | 每通過 1 個設施 +2 |
| 終點站 | 🏁 | 資源通過時 +(已通過設施數×4) |
| 物流放大器 | 📡 | 資源投入時，下一設施這回合獲得 +8 |
| 轉運中心 | 🔀 | 放置時決定方向（可選 4 向） |
| 速遞站 | ⚡ | 通過後若下一格有設施立即再觸發一次 |
| 物流倉 | 🏪 | 資源投入時 +1 物流計數，計數 ≥3 時 +8 收益並重置 |
| 環境感應站 | 📊 | 周圍 4 格每有一個設施 +2 |

> 已廢棄：`logistics_vault_v2`（物流倉 v2）— 已併入物流倉，從 `BLDG_RARITY` 移除，新局不再出現；既有存檔仍可運作。

### 貿易流設施
| 設施 | Emoji | 特殊效果 |
|------|-------|----------|
| 外貿港口 | ⚓ | 商品數量每 10 個 +1% |
| 匯率波動板 | 📈 | 資源通過時，隨機 ±2 × 場上設施數量次（加到該設施輸出） |
| 期貨交易所 | 🏛 | 放置時鎖定當前倍率，永久使用 |
| 貿易特區 | 🌏 | 周圍 4 格有商店系設施時輸出×1.5 |
| 清倉拍賣場 | 🏷️ | 商品通過時獲得數值×4 收益，商品變成 1 |
| 進出口稅站 | 🧾 | 商品↔金錢 +4；此回合每通過 1 個物流中心 +2 |
| 自由市場 | 🗽 | 任意資源進入，輸出金錢（當前數值） |

### 拆遷流設施
| 設施 | Emoji | 特殊效果 |
|------|-------|----------|
| 爆破裝置 | 💣 | 3 回合後消滅自身，並隨機消滅一個相鄰設施 |
| 建築廢料廠 | 🏗 | 資源通過時消滅自身，本次投入×2 |
| 臨時工棚 | 🛖 | 每移動一次輸出 +1（最高 +5） |
| 磁力板 | 🧲 | 每回合開始與相鄰隨機設施交換位置 |
| 廢墟紀念碑 | 🗿 | 只能放在廢墟上，輸出 +5；消滅後還原為空地（不變廢墟） |
| 拆遷補償局 | 🏢 | 設施更動位置或被消滅時 +4 收益（排列模式整段視為 1 次，×補償局數量） |
| 動態加強器 | 🔋 | 本回合設施被移動過，此設施輸出×2 |
| 地基不穩定站 | ⚠️ | 相鄰有減益時輸出翻倍；相鄰有增益時 -1 |

### 商店系設施（isShop，視為商店）
| 設施 | Emoji | 特殊效果 |
|------|-------|----------|
| 小型販售商 | 🛍️ | 商品→金錢+1；金錢→商品→金錢+2 |
| 黃牛販子 | 🎫 | 商品→金錢+1→商品(-10%) |
| 量販店 | 🛒 | 投入商品時失去一半數量，每失去 4 個商品 +8 收益（每次觸發 +4 永久累積），單次 ≥100 自毀 |
| 百貨公司 | 🏬 | 只能蓋在 2×2 商店上（佔 4 格，視為 4 商店）。商品→×2金錢→+2%商品→金錢 |

### 電子流設施
| 設施 | Emoji | 稀有度 | 特殊效果 |
|------|-------|--------|----------|
| 電子工廠 | ⚡ | SR | 原料→金錢。場上每有一個電子設施，這個設施**設置時**永久 +2 |
| 電子輸送帶 | ⚡ | SR | 原料投入時，下一個電子設施永久 +2 |
| 電子商店 | ⚡ | SR | 金錢→原料、商品→原料、原料→金錢 +2 |
| 大型電子供給站 | 🔋 | SSR | 大型。金錢→原料 +4、商品→原料 +4；回合開始若本格沒被重疊過，自動疊加 大型電子供給站 於自身 |
| 中央電子網路 | 💻 | R | 中央專屬。中央建築可蓋在此設施上（電子 tag） |

### 中央流設施
| 設施 | Emoji | 稀有度 | 特殊效果 |
|------|-------|--------|----------|
| 中央貿易代理 | 🌐 | SSR | 中央專屬。金錢→原料 +4、原料→金錢 +4、商品→金錢 +4 |
| 中央科技研發 | 🔬 | SSR | 中央專屬。原料→商品 +8、商品→商品 +8 |
| 中央工廠監督局 | 🏛 | R | 中央專屬。此回合沒投入時，每經過一個工廠最終收益 +2 |
| 中央商店監督局 | 🏛 | R | 中央專屬。此回合沒投入時，每經過一個商店最終收益 +2 |
| 中央原料監督局 | 🏛 | R | 中央專屬。此回合沒投入時，每經過一個原料廠最終收益 +2 |

### 大型設施（2×2，各僅能 1 個，除非有惡魔巨人/大地主擴張）
| 設施 | Emoji | 稀有度 | 特殊效果 |
|------|-------|--------|----------|
| 百貨公司 | 🏬 | SSR | 大型商店。只能蓋在 2×2 商店上，視為 4 商店。商品→金錢 +8→商品 +8→金錢 +8 |
| 巨人村 | 🏰 | SSR | 大型。回合開始人材歸 0，獲得 +8 人材 |
| 古代的機械工廠 | 🏛 | SSR | 大型工廠。只能蓋在 2×2 工廠上，視為 4 工廠。所有工廠被投入時 +8，原料→商品 |
| 世界奇觀 | 🏟 | SSR | 大型。最終收益時每有 1 人材 +8 |
| 移動都市 | 🏙 | SSR | 每回合可自由移動周圍 8 格設施；本回合未投入廢墟則最終收益變 0 |
| 廢鐵城 | 🏚 | SSR | 任意→金錢 +8 +x；每消滅一個設施使 x 永久 +2；回合結束消滅所有廢墟並獲得 +x |
| 災害控管局 | 🛡 | SSR | 此回合結束時，每消滅一個設施 +4；此設施不會被消滅 |

### 其他特殊設施
| 設施 | Emoji | 特殊效果 |
|------|-------|----------|
| 嫉妒工廠 | 💚 | 任意→隨機資源（money/material/goods）；本回合首投永久 +4；輸出符合最終 +8（永久 +8）— Session 34 改版 |
| 物流方向 ↑↓←→ | ⬆️⬇️⬅️➡️ | 資源轉向指定方向 |
| 員工食堂 | 🍱 | 投入商品時額外獲得 1 人材 |
| 人力派遣 | 🏢 | 金錢投入時獲得 1 人材 |
| 稅務局 | 🏛 | 每回合開始隨機設施升級，最終收益 -10% |

### 耐用值流派設施
| 設施 | Emoji | 稀有度 | 特殊效果 |
|------|-------|--------|----------|
| 傳統生產線 | 🛠️ | N（shop-only） | 拖到非廢墟、非大型 part、非大型設施的格子上 → 完全恢復該格 base+overlay 所有 bldgId 的耐用值；消耗自身 |
| 機動增殖都市 | 🏙️ | SR | 每回合若自身耐用 >0：所有其他設施 +1 耐用、自身 -1；歸零時整個效果不發動 |

---

## 合夥人系統

### 惡魔系合夥人（isDemon 標記者，受傲慢惡魔增益/保護）
> Session 34（2026-04-25）對照「新合夥人表」全面改版，內容如下：
>
> 部分惡魔同時歸屬其他流派，本表為「isDemon 標記」總覽，詳細效果以主分類為單一真實來源。重複列出者下方標 *「→ 主分類」*。

| 合夥人 | Emoji | 稀有度 | 正面效果 | 負面效果 |
|--------|-------|--------|----------|----------|
| 暴食惡魔 | 👹 | SR | 投入時原料視為商品，商品視為原料 | 回合開始時資源為商品/原料則 -4 收益 |
| 怠惰惡魔 | 😴 | SR | 可放棄行動選項，2/3 機率資源 +2 或 +8 | 投入時 1/3 機率資源 -6 |
| 慾望惡魔 | 💘 | SR | 僅經過 2 設施時，那些設施永久 +4 | 經過 2+ 設施時，每經過一個資源 -6 |
| 激情惡魔 | 🔥 | SR | 每回合獲得 3 張設施 | 回合結束手牌 >1 時，每多一張本輪目標 +10% |
| 嫉妒惡魔 | 💚 | SR | 獲得嫉妒工廠（任意→隨機資源；本回合首投永久 +4；最終輸出符合此設施輸出 +8 並使效果永久 +8） | 嫉妒工廠被消滅或賣出時遊戲結束 |
| 貪婪惡魔 | 💰 | SR | 本回合最終收益達目標 50% 時，所有設施永久 +4 | 每輪開始目標 +50% |
| 傲慢惡魔 | 👑 | SSR | 所有惡魔負面失效，每有一個惡魔最終收益 +8；回合結束時此 +8 效果永久 +2 | 無 |
| 黑市商人 | 🕶️ | SR | 每輪第一次商品→金錢×125% | 之後每次倍率 -0.5（最低×1） |
| 電子放電惡魔 ※ | ⚡ | SSR | → 詳見「電子流合夥人」 | |
| 擴散惡魔 ※ | 🌀 | SSR | → 詳見「中央流合夥人」 | |
| 惡魔巨人 ※ | 👹 | SSR | → 詳見「大型流合夥人」 | |
| 人類惡魔 ※ | 😈 | SSR | → 詳見「人力流合夥人」 | |

> 註 1：標 ※ 者為跨流派合夥人，效果以主分類為準（避免重複維護）。
> 註 2：`爆破工程師`、`貧窮神` 已依 xlsx 移除 `isDemon` 標記，見 拆遷流/獨特 區段。

### 基礎合夥人
| 合夥人 | Emoji | 稀有度 | 效果 |
|--------|-------|--------|------|
| 基礎原料商 | ⛏️ | N | 資源每次經過原料廠 +1 收益 |
| 基礎商店老闆 | 🏪 | N | 資源每次經過商店系設施 +1 收益 |
| 基礎工廠主 | 🏭 | N | 資源每次經過工廠 +1 收益 |

### 耐用值流派合夥人（S45 擴充）
| 合夥人 | Emoji | 稀有度 | 效果 |
|--------|-------|--------|------|
| 設施維護工 | 🛠️ | R | 所有設置在小鎮的非大型設施 +2 耐用值上限（招募即時補上既有設施；失去後超出新上限的耐用 cap 回新上限） |

### 人力流合夥人
| 合夥人 | Emoji | 稀有度 | 正面 | 負面 |
|--------|-------|--------|------|------|
| 人力仲介 | 📋 | SR | 回合開始時 +4 人材 | 無 |
| 工會主席 | ✊ | SR | 持有 8+ 人材時，投入人材額外 +2 人材 | 無 |
| 勞動部長 | 🎩 | SSR | 最終收益時，失去一半人材，每失去一個 +4 | 無 |
| 人力資源總監 | 👔 | SR | 每投入 2 人材，最終收益 +2 | 無 |
| 人類惡魔 | 😈 | SSR | 投入人材時其獲得 +2 永久 | 回合結束時若人材為 0，所有設施永久 -2 |
| 分身大師 | 👥 | SSR | 人材投入設施時，周遭隨機一格設施 +2 | 無 |

### 物流流合夥人
| 合夥人 | Emoji | 稀有度 | 正面 | 負面 |
|--------|-------|--------|------|------|
| 運輸大亨 | 🚢 | SSR | 每次通過物流中心 +3 | 未通過物流中心收益 -50% |
| 倉儲女王 | 👑 | SSR | 可將 2 個設施蓋在物流中心上 | 無 |
| 阿北，物流之王 | 🚛 | SR | 可將 1 個設施蓋在物流中心上 | 無 |
| 快遞達人 | 🚀 | SR | 通過 4 個格子之後，每通過一個格子 +4 收益 | 無 |
| 重建驛站 | 🏗 | SR | 回合開始 +1 計數，≥3 時消耗所有，此設施獲得一次「廢墟→螺旋物流站」 | 無 |
| 路線規劃師 | 🗺️ | R | 回合開始時可免費移動一個物流中心 | 無 |

### 貿易流合夥人
| 合夥人 | Emoji | 稀有度 | 正面 | 負面 |
|--------|-------|--------|------|------|
| 外匯交易員 | 💹 | SSR | 金錢→金錢隨機 +4 或 -2；每投入一次金錢觸發 2 次 | 無 |
| 套利者 | ⚖️ | SR | 同回合金→商且商→金時，+2 收益，之後效果永久 +2 | 原料→商品不會增加數值 |
| 壟斷者 | 🎩 | SR | 小鎮上 4+ 商店時，每個商店最終收益 +6 | 少於 4 商店時，所有商店不參與投入 |
| 進貨合作員 | 🛒 | R | 回合開始資源變商品 +2；若已是商品則 +4 | 無 |
| 擁慶記房屋 | 🏠 | R | 每回合可賣出一個設施（不產生廢墟），+2 收益；每次賣出使此效果永久 +2 | 無 |

### 拆遷流合夥人
| 合夥人 | Emoji | 稀有度 | 正面 | 負面 |
|--------|-------|--------|------|------|
| 回收阿罵 | 👵 | SSR | 回合開始時所有廢墟重疊至一廢墟格；每重疊視為一次移動 | 無 |
| 無冕之王 | 👑 | SSR | 此回合每次投入廢墟前，所有廢墟獲得收益 +2（累積） | 無 |
| 廢品戰士 | ⚔ | SR | 回合開始時將一張廢墟加入手牌 | 無 |
| 地皮炒家 | 🏚️ | SR | 格子變空時該格永久 +4 | 無 |
| 混沌建築師 | 🌀 | SR | 每回合隨機使最多 8 個設施交換位置（含廢墟） | 無（已對齊 xlsx） |
| 廢墟掠奪者 | 💀 | SR | 每回合第一次投入若為廢墟，資源 -4 或 -6；之後按該數量獲得/重疊廢墟 | 無 |
| 炸彈客 | 💣 | R | 回合開始隨機空格放 1~3 個爆破裝置，每個 +2；爆破裝置與被消滅的設施不產生廢墟 | 無 |
| 流浪漢 | 🚶 | R | 回合開始隨機空格放 1 廢墟，每個廢墟 +2 | 無 |
| 設施破壞者 | 💣 | R | 每次設施被消滅時 +4 | 無 |
| 爆破工程師 | 🧨 | R | 每回合可消耗 8 收益消滅一個設施或廢墟（不產生廢墟） | 無 |

### 中央流合夥人
| 合夥人 | Emoji | 稀有度 | 正面 | 負面 |
|--------|-------|--------|------|------|
| 市長 | 🎖 | SSR | 中央每觸發一次，最終收益 +8 | 無 |
| 擴散惡魔 | 🌀 | SSR | 每回合 +1 擴散計數，≥3 時消耗所有，此回合所有設施視為在中央 | 每回合開始隨機設施與中央交換 |
| 中央秘書 | 📋 | SR | 中央每有設施 +4；中央 4 設施時中央外每個 +2 | 未投入中央時，每經過一格 -2 |
| 北漂者 | 🧳 | SR | 回合開始中央每有設施 +1 人材 | 人材投入中央以外設施時，該設施本回合 -2 |
| 訪問網路碼語者 | 💻 | R | 回合開始獲得中央電子網路 | 最終收益 -4 |
| 公路之星 | 🌟 | SR | 每回合中央隨機 2 格 +2；該格被投入則 +2 變永久；未投入中央時最終收益減半 | 無 |

### 大型流合夥人
| 合夥人 | Emoji | 稀有度 | 正面 | 負面 |
|--------|-------|--------|------|------|
| 大地主 | 🏗 | SSR | 獲得時小鎮永久擴大一級 | 每次「設施補給」前隨機消滅一個小鎮上的設施 |
| 惡魔巨人 | 👹 | SSR | 獲得時小鎮擴大；大型設施不限數量 | 每次市場事件後，玩家挑選除自身外的一個合夥人消滅 |
| 大財團 | 🏢 | SSR | 獲得時小鎮擴大；大型設施可取代非大型 2×2 區域；每有一個大型設施 +8 收益 | 無 |

### 電子流合夥人
| 合夥人 | Emoji | 稀有度 | 正面 | 負面 |
|--------|-------|--------|------|------|
| 電子放電惡魔 | ⚡ | SSR | 每次投入電子設施 +2 收益 | 每經過一個非電子設施 -2 |
| 電子精工師 | 🔧 | SSR | 每回合 +1 電子計數，≥3 時消耗所有，獲得一張電子工廠 | 無 |
| 雷電法王 | ⚡ | SR | 每回合 +1 雷電計數，≥3 時消耗所有，消滅隨機設施並獲得一張電子設施 | 無 |

### 獨特合夥人
| 合夥人 | Emoji | 稀有度 | 效果 |
|--------|-------|--------|------|
| 譚雅 | 👩‍💼 | R | 每回合可用手牌設施交換一張稀有度高一級的設施；手牌空或手牌+場上 <24 時自動補 1 張 N 設施 |
| 蕾雅 | 👩‍🔧 | R | 可將手牌相同設施蓋在小鎮設施上，視為不同建築；每次疊加永久 +2，並恢復目標耐用值上限的一半（向上取整） |
| 場風大師 | 🌀 | R | 每回合指定投入方向，從該方向投入 ×2（只能從該方向投入） |
| 拆遷隊 | 🔨 | R | 每回合 +1 拆遷計數，≥3 時消耗 3 獲得 1 次免費重排（可累積）；受全能會計師灌注 |
| 貧窮神 | 🪙 | R | 收益為 0 時 +8，效果累積 +8；收益 >0 時效果清空 |
| 全能會計師 | 📊 | SSR | 每獲得一個計數，本合夥人 +1 全能計數；可拖曳到有計數的合夥人使其計數 +1 |

> 註：xlsx 設計稿曾把 `黃牛販子` 列為合夥人、`公路之星` 列為設施，但程式碼實作為：
> - `scalper` 黃牛販子：BLDG（商店系設施）→ 詳見「商店系設施」表
> - `highway_star` 公路之星：PARTNERS（中央流合夥人）→ 已收錄於上方「中央流合夥人」表

---

## 事件系統

每 3 回合觸發一次隨機事件（共 19 種），預告時即以藍色輪廓標示受影響格子（`event-preview`）。事件受影響區域在預告時即透過 `precomputeEventData()` 預先決定並儲存於 `G.nextEventData`。事件抽選為等權重隨機（`pickNextEvent()`），所有事件（含莫菲定律）皆從同一池中均等抽取。

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

### 莫菲定律
- 等權重事件之一，僅透過市場事件池隨機觸發
- 觸發時打亂所有設施位置並提供 2 張保證複合設施作為補償
- 不再有額外觸發路徑（合約、權重、未移動偵測等）；耐用值機制已取代「強制讓玩家變更產線」的設計需求

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
| `bldgUpgradesElec` | 電子設施專屬升級加成 `{'r,c': bonus}`（S22）|
| `leyaPctMods` | 蕾雅升級百分比加成 `{'r,c': +2/+4/...}`，永久累積 |
| `ruinCells` | 廢墟格子 Set，設施消滅時自動新增 |
| `ruinStacks` | 廢墟堆疊計數 `{'r,c': N}`（廢墟掠奪者 / 回收阿罵 S31） |
| `deptStoreAnchors` | 百貨公司錨點（左上格）`{'r,c': true}` |
| `deptStoreParts` | 百貨公司部分格→錨點映射 `{'r,c': 'anchorR,anchorC'}` |
| `demolitionCharges` | 拆遷隊可用免費重排次數（可累積） |
| `bombTimers` | 爆破裝置倒數 `{'r,c': 3/2/1}` |
| `futuresValue` | 期貨交易所鎖定值 `{'r,c': value}` |
| `bulkStoreBonus` | 量販店累積加成 `{'r,c': value}`（S20） |
| `vaultCounts` | 物流倉計數器 `{'r,c': count}`（S29） |
| `cellRedirectDir` | 物流站方向 `{'r,c': 'up/down/left/right'}` |
| `talentBankCount` | 人力銀行投入人材計數 `{'r,c': count}`（S24） |
| `logisticsVault` | 物流倉儲存值 `{'r,c': value}` |
| `cellOverlay` | 物流之王/倉儲女王/蕾雅疊加設施 `{'r,c': bldgId}` |
| `facilityDurability` | 設施當前耐用值 `{'r,c': N}`（S41） |
| `facilityRecovering` | 設施恢復狀態 flag `{'r,c': bool}`（S41） |
| `partnerState` | 合夥人專屬狀態 `{partnerId: any}` |
| `contracts` | 已接受合約 `[{id, ...}]`（S37） |
| `contractPool` | 待接合約池 `[{id,...}]`（每輪刷新，S37） |
| `roundMaxResourceIncrease` | 「積累」合約 per-send delta 追蹤（S39） |
| `roundHistory` | 每輪結算歷史 `[{round, turnsUsed, goal, profit}]` |
| `difficultyMult` | 動態難度倍率 0.5~3.0 |
| `_eventDeferred` | 跨輪未觸發事件延遲次數 |
| `_futuresMoveNext` | 期貨交易所下回合需移動列表 `[{r,c}]` |
| `_landSpecStale` | 地皮炒家設施未移動回合計數 `{'r,c': count}` |
| `_industrializing` | 工業化模式 flag，`finish()` 攔截結算用 |
| `_compoundSeq` | 複合設施手牌序號（S37+ 卡背手牌等用） |
| `_handSnapshot` | 排列模式手牌快照（S49 cancelRearrange 還原用） |
| `_freeMoveLogistics` | 路線規劃師本回合免費移動 flag |
| `_demonGiantPending` | 惡魔巨人觸發後待玩家挑選消滅合夥人 flag |
| `_resolveMeta` | 合約結算 meta 暫存（S48） |

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
`demolitionCharges`、`_eventDeferred`、`_futuresMoveNext`、`_landSpecStale`、`partnerState`、`eventTriggerCounts`、`roundHistory`、`difficultyMult`

### 共用常數
`KEYED_DATA_FIELDS`：15 個需隨設施位置轉移的鍵值欄位（以 `'r,c'` 為 key），供 `swapCellData`/地震/期貨移動共用：
```
['bldgUpgrades','bldgUpgradesElec','leyaPctMods','cellMods','bombTimers',
 'logisticsVault','cellOverlay','futuresValue','bulkStoreBonus','vaultCounts',
 'cellRedirectDir','talentBankCount','ruinStacks','facilityDurability','facilityRecovering']
```
注意：
- `cellPctMods` 不在其中（事件效果綁定格子位置，不跟隨設施移動）
- `tempShedMoves` 已移除（臨時工棚改機制）
- 早期文件曾列 `futuresPct`，現以 `futuresValue` 為準
- 修改 `KEYED_DATA_FIELDS` 時需同步檢查 `clearKeyedData` 與 `swapCellData` 的處理邏輯

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

- **單檔架構**：所有 HTML / CSS / JS 寫在同一個 `index.html`（~15,900 行 / ~757KB，以 Session 50 為準）
- **無框架**：純 vanilla JS，直接操作 DOM
- **字體**：Noto Sans TC（中文）、DM Mono（數值）
- **配色**：暖色系牛皮紙風格，CSS 變數控制主題色
- **動畫**：CSS keyframes（pulse、burnAway、profitFly 等）
- **拖曳系統**：支援卡牌拖曳到格子放置
- **圖片**：`img/C_1.png` ~ `C_6.png`（6 張角色表情立繪）

### 檔案結構
```
VT/
├── index.html              ← 主檔，所有邏輯（~15,900 行）
├── VentureTown_GameDoc.md  ← 本文件
├── CLAUDE.md               ← 專案設定
├── 新合夥人表.xlsx          ← Excel 設計稿
├── img/C_1~C_6.png         ← 角色表情立繪
├── 實作規格/                ← 補充設計文件
└── 圖片參考/                ← 原始素材
```

### 程式碼架構概覽（區塊與職責，以 Session 50 為準）

> 行號隨每次提交浮動，刻意不列；定位請用 grep / `_$()` / 區塊名稱搜尋。

| 區塊 | 職責 |
|------|------|
| CSS | inline style + `:root` 變數（含 `--pill-r`）+ event-preview 高亮 + 耐用值血條動畫 |
| HTML DOM | header（含存檔按鈕、合約按鈕、BGM 開關）/grid/panels/modal/overlay/`#contract-fx`/`#contract-resolve-detail` |
| BLDG | 設施定義 ~100 種（多次擴充：S5 / S13 +26 / S15 / S17 / S40 / S45）；以實際程式碼為準 |
| PARTNERS | 合夥人 ~60 位；hook 列表：`onSettle` / `onTurnStart` / `onTurnEnd`(S34+) / `onRoundStart` / `onRecruit` / `onBuildingHit` / `onTalentDrop` / `onFacilityPlaced` / `onFacilityMoved` |
| EVENTS | 19 種隨機事件（含莫菲、precomputeEventData 預計算 + 地震滑動 + 危險廢棄物 timer） |
| CONTRACTS | 合約系統 (S37)：`CONTRACTS` / `CONTRACT_POOLS`(R2/R4/R6) / `runContractHook` / `_trackContractHits` / `checkContractDeadlines` / `showContractResolveFx` / `showContractResolveDetail` |
| 工具函數 | `KEYED_DATA_FIELDS` / `COUNT_PARTNERS` / `gainOmniCount` / `rollWindDir` / `hasPartner` / `isFacility` / `isShopType` / `isPoolableBldg` / `hasTag` / `clearKeyedData` / `GN` / `eachCell` / `findCells` / `findEmpty2x2`(S38) / `_isInMoveSession`(S39) / `_$`/`_show`/`_hide`(S50) |
| 格子修正 helper | `applyRowColPctMod` / `apply2x2PctMod` / `flash` 等 |
| newGame() | G 物件初始化（含 `inv:{}` / `facilityDurability` / `contracts` / `contractPool`） |
| startRound() | 每輪開始（合夥人 onRoundStart hook → startTurn()） |
| 事件系統 | `triggerEvent` / `showEv` / `evDone` / `evPick` / `applyBuff` / `pickNextEvent` / `precomputeEventData` / `_contractTriggerEventById`（含莫菲過濾 S48/S49） |
| 放置 / 投入 | `tryPlaceAtCell`（click/drag 統一入口；含蕾雅疊加、物流之王 overlay、高級設施直接覆蓋升級 S49）／`onCell` ／ `onCellDrop` ／ `sendEl` |
| FACILITY_FX | 設施特效 dispatch 調度表（~50 handler，含 dept_store / ancient_factory / clearance / bulk_store / scalper / convenience 顯式 `_runPartnerOnBuildingHit` 補回 S36） |
| stepWithMover() | 資源行進主邏輯：FACILITY_FX 調度 / G.buff 套用順序（matCrash/logisticsDisabled/noMatToGoods/cafeteriaDisabled/...）／cellPctMods／redirect／通用轉換／`_trackContractHits` 投入次數追蹤 |
| finish() | 結算收益順序：onSettle → onSettleFinal? 註：實作只有 `onSettle`，沒有 `onSettleFinal`（runPartnerHook + runContractHook，line ~9120）；之後依序套用稅務局 -10% / 嫉妒匹配 / 黃牛販子 / 勞工保險 |
| 動態難度 | `adjustDifficulty()` 0.5~3.0 倍率，依達標速度與超額調整 |
| 行動選項 | `doAction` / `openActionOverlay` / ACTION_POOL 8 種 |
| 自由排列拖曳 | `onRearrangeDrag*` 系列；移動 session 統一 helper（S39）；`saveGridSnapshot` / `restoreGridSnapshot` 含 `_handSnapshot`（S49） |
| startTurn() | 回合控制（防重入守衛、onTurnStart、稅務局、磁力板、爆破裝置、場風、turnFacMoved 重置、合約 onTurnStart） |
| render / renderGrid() | 主渲染（event-preview 高亮 + cellPctMods + 耐用值血條 `.dur-pip` S42） |
| renderSideLog() | 側邊 log（合約結算可點擊條目 S48 + `_renderLogEntry` 抽出）|
| renderFanHand() | 扇形手牌 |
| renderTalentPanel | 人材面板（×1/×2/×5/全部 批量投入 UI S40） |
| DIALOGUES / DM | 角色台詞與表情管理（DIALOGUE_EXPR 表情對照） |
| 譚雅交換系統 | `tanyaOfferSwap` / `showTanyaHandPick` |
| TUT | 新手教學（**12 步驟** S48；含耐用值/人材/合約三個 step；`hookTalentDrop` / `showTutContractChoice` / `pickTutContract` / `tut_post_rearrange_end_turn` 狀態 S49） |
| 存檔/讀檔系統 | `autoSave` / `autoLoad` / `exportSave` / `importSave` / `showResumePrompt`（Set 序列化、Phase 保護、合約 chooser 模組變數 reset S38） |
| 耐用值系統 | `getDurabilityMax` / `_restoreDurabilityBy`（S41/S42 5/7/9/11；蕾雅疊加恢復一半 S48） |
| 工業化系統 | `MEGA_KEY` / `loadMega` / `saveMega` / `createMegaFacilityFromRun` / `simulateMegaFacility` / MEGA 物件 |
| 戰鬥系統 | `battle-overlay` 區塊（產業化模式衍生） |
| DEV | 開發者面板（合約 grid / 工業化 / 巨型地圖 / 設施與合夥人選擇器） |
| BGM | 外部 mp3 依輪數切歌（S39 S40） |

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

### Session 10b（2026-04-14）— 工業化系統（巨型設施）

> 注：本文件早期 Session 10 編號出現兩段（10a 程式碼品質修繕、10b 工業化系統），時序為 10a (04-13) → 9 (04-13) → 10b (04-14)。為避免破壞 PR 引用，保留原編號加 a/b 後綴區分。

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

### Session 10a（2026-04-13）— 程式碼品質修繕

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
- **`union_chief`（工會主席）8+ 人材判定 off-by-one**：`onTalentDrop`（投入資源卡）與 `onTalentDropCell`（投入設施）兩處在 `G.talentCards--` 之後才檢查 `(G.talentCards||0)>=8`，導致實際需要 9+ 人材才能觸發「持有 8+ 人材額外投入+2」。修復為在扣除前以 `const talentBefore = G.talentCards||0` 記錄，改用 `talentBefore>=8` 判定，符合設計文件「持有 8 個人材以上時」語意

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

### Session 15（2026-04-22）— 大型電子供給站改版 + 9 項 Bug 修復

本輪對 index.html 進行一次全面 bug 掃描並修復。Bug 1 由大型電子供給站改版一併解決。

#### 大型電子供給站改版（修復 Bug 1：指數爆增）
- **舊行為（bug）**：`startTurn` 中每個 `mega_elec_supply` 在空格放置新的 `mega_elec_supply`，新設施下回合也會觸發 → 數量每回合翻倍，4×4 棋盤約 4 回合內被填滿
- **新行為**：每回合開始檢查自身是否已有疊加（`getOverlays(r,c).length>0`），若無則透過 `setOverlays` 在自身疊加一層 `mega_elec_supply`；有疊加則略過
- `BLDG.mega_elec_supply.desc` 文字同步更新為「…回合開始時，如果這個設施此回合沒有被重疊過，這個設施將自動設置一個大型電子供給站於自身。」
- 設置前確保 `G.cellOverlay` 已初始化，避免舊存檔讀入時 `setOverlays` 存取 `undefined` 崩潰

#### Bug 修復列表

| # | 位置 | 類型 | 變更 |
|---|------|------|------|
| 1 | `startTurn` mega_elec_supply 處理 | Critical | 改為自身疊加（見上） |
| 2 | `deserializeGame` KEYED_DATA_FIELDS 清理 | Critical | 迴圈跳過 `cellMods`（空格上合法：地皮炒家+4、公路之星+2、廢墟紀念碑消滅後+4） |
| 3 | `EVENTS.murphy.show` 清理區塊 | High | 補清 `logisticsVault`/`tempShedMoves`/`bulkStoreBonus`/`vaultV2Counts`，避免設施打亂後記憶錯位 |
| 4 | `finish()` 稅務局扣稅基數 | High | 改用 `G.profit - profitAtStart` 作 10% 基數，與文件「最終收益-10%」一致（舊版只對投入差值課稅，漏掉 onSettle 合夥人加成） |
| 5 | `setOverlays()` 防禦 | High | 首行加 `if(!G.cellOverlay) G.cellOverlay={};`，避免舊存檔缺欄位時 `delete`/`=` undefined 崩潰 |
| 6 | `precomputeEventData` + `area_buff.show` 2×2 選取 | Medium | 從非重疊位置集合中隨機挑，僅無候選時 fallback，避免 +10%/-10% 在重疊格互相抵消 |
| 7 | `deserializeGame` buff 清理 | Medium | 由無條件 `data.buff={}` 改為「欄位損壞才重置」，保留本回合事件 buff（原料大降/颱風/商品熱銷等） |
| 8 | `startTurn` 磁力板交換 | Low | 對方若也是磁力板時，雙方格子皆獲得 +2 cellMods；非磁力板維持原本「被交換設施 +2」 |
| 9 | `rebuildDeptStore()` | Low | 重建完映射後清理孤立 `dept_store_part`（格子改 null + `clearKeyedData`），避免斷裂 2×2 留下殭屍格 |

#### 審查過程備註
- 初次自動掃描回報 12 項可疑點，親自驗證後剔除 3 項誤判（`findShop2x2` 邊界、`area_buff` `gn-1` 範圍、`destroyFacility` 百貨公司 `facility_destroyer` 誤判重複），剩下 9 項皆屬可重現問題
- Bug 8 原報告標為「可能符合設計」，與使用者確認後採「兩磁力板對撞雙方 +2」的對稱行為
- `BLDG.mega_elec_supply.desc` / `EVENTS.murphy.show` 的清理範圍 / `deserializeGame` 的 cellMods 與 buff 保留策略均已落檔

### Session 16（2026-04-22）— 第二輪審查 + 永久格子加成系統 + 磁力板永久化

第二輪全面審查由 Explore agent 掃描 8 條候選（BATTLE/MEGA/動畫/拖曳/TUT 等前次未細看區域），親自驗證後 8 條全數為誤判或設計一致性議題。再以人工審查補齊真正 bug 5 條（標 A–E），本輪全部修復（E 屬設計層，暫保留）。

#### 永久格子加成系統（修復 Bug A）

##### 動機
`G.cellMods` 在 `doNext()` 回合結束 + `startRound()` 輪開始會各清空一次。多項設計上標註「永久」的效果在實作上卻寫進 `cellMods`，下回合就消失：
- **地皮炒家**：空格永久 +4（xlsx/doc 明確標示「永久」）— 真 bug
- 公路之星：「投入則變永久」已透過 `bldgUpgrades` 路徑實現；初始 +2 為本回合效果，不算 bug
- 分身大師 / 磁力板 / 工會主席 / 北漂者 / 人材強化：程式碼原本明確註解「本回合」或「暫時」，屬設計意圖的暫時加成

##### 新欄位 `G.permCellMods`
| 屬性 | 說明 |
|------|------|
| 初始化 | `newGame()` 回傳物件新增 `permCellMods:{}` |
| 生命週期 | 永久保留；**不**在 `doNext`/`startRound` 清除 |
| 位置綁定 | 不進 `KEYED_DATA_FIELDS`，**不**跟隨設施移動（swapCellData 不轉移）；也不會被 `clearKeyedData` 在設施消滅時清除 |
| 用途 | 存放真正的「永久、綁定格子」加成（目前僅地皮炒家空格 +4 使用） |

##### 讀取點（6 處）
全部由 `cellMods[k]` 改為 `(cellMods[k]||0)+(permCellMods[k]||0)`：
- `stepWithMover` 通用轉換 Step 3 格子固定加成
- `dept_store` FX 2×2 四格 totalMod 聚合
- `unstable_base` FX 相鄰 4 格判定
- `renderGrid` 格子 badge 顯示
- `simFacilityPath`（MEGA/戰鬥模擬系統）
- cell 懸停 tooltip：改為分兩行顯示「本回合加成」與「永久加成」

##### 寫入點（地皮炒家 3 處）
- `destroyFacility` 廢墟紀念碑消滅分支
- `destroyFacility` 炸彈客爆破不留廢墟分支
- `onFacilityMoved` 來源格變成空格

##### 存檔相容
- `deserializeGame`：舊存檔未含此欄位時自動初始化 `data.permCellMods={}`
- `createMegaFacilityFromRun`：快照深拷貝 `permCellMods`，`simFacilityPath` 從 mega 上下文讀取

#### 磁力板改為永久 +2

##### 規格調整（依使用者指示）
- 舊：「每回合開始與相鄰隨機設施交換位置，並使其獲得+2。」（本回合效果，cellMods 每回合清除）
- 新：「每回合開始與相鄰隨機設施交換位置，並使其**永久**獲得+2。」

##### 實作
- 寫入欄位由 `G.cellMods` 改為 `G.bldgUpgrades`（設施永久升級值，在 `KEYED_DATA_FIELDS` 內 → 跟隨設施之後的搬移、地震、混沌建築師等機制移動）
- 兩磁力板互換時：雙方 `bldgUpgrades` 各 +2（Session 15 的對稱行為保留）
- `addLog` 訊息同步加上「永久」字樣

##### 為什麼不用 permCellMods
`permCellMods` 是格子綁定（不跟設施移動），而磁力板規格明確講「使其（被交換設施）」永久 +2 — 主詞是設施，所以用設施綁定的 `bldgUpgrades`。

#### 其他 Bug 修復（B–D）

| # | 位置 | 嚴重度 | 變更 |
|---|------|--------|------|
| B | `onCell()` 爆破工程師分支 | Medium | 先讀 `bId`，擋掉空格/`ruin`/`indestructible` 後才扣 8 收益，避免點錯白損收益 |
| C | `BATTLE.redraw()` | Medium | 開頭檢查 `_returnNeeded>0` 擋住連續重抽；`_returnNeeded` 改為 `+=returnCount` 累加懲罰 |
| D | `PARTNERS.wrath` | Low | 計數從 `onSettle`（每次投入）移到 `onTurnStart`（每回合一次）；新增時檢查 `cellMods`+`permCellMods`+`cellPctMods` 是否有負值；`onSettle` 僅保留 `>5` 扣 33% 的邏輯 |
| E | `FACILITY_FX` 各 handler 的 facHit 一致性 | Low | **不修**：`staffing` 不計入 hit 可能是為了避免觸發 lust `>2 ÷N` 懲罰、`tax_office` 刻意計入、中央監督局刻意不計（onSettle 條件需要）— 設計層議題，需個別決策 |

#### 第二輪 Agent 誤判紀錄（不入庫）
1. BATTLE `_returnNeeded` 累積 — Agent 判斷方向錯誤，真正問題在 Bug C 修復描述
2. MEGA `futures_market` 不一致 — MEGA 為純模擬系統，每次投入重抽百分比本就是設計
3. `_dispatchHqFiredThisTurn` 跨投入 — 文件規格本就是「每回合一次」，現行行為正確
4. `_futuresMoveNext` 洩漏 — 每次 startTurn 都已處理並 `=[]` 清空
5. MEGA `_megaDragging` upgrade-glow 殘留 — `open()` 會 `render()` 重建 DOM
6. `G.tutorialMode` 洩漏 — 全檔只寫不讀，死碼不是 bug
7. `profit-fly` DOM 洩漏 — 各元素有獨立 `setTimeout remove`
8. BATTLE `_fieldDragSrc`/`_battleDragging` 不對稱 — `onFieldCellDragStart` 已主動清理

### Session 17（2026-04-22）— 音效升級 + 疊加 pipeline + 放置特效 + 規格調整

本輪聚焦體驗層級（音效、視覺回饋、疊加機制一致性）與幾個規格調整。

#### SFX 連續投入音調遞升（爽感）

##### 問題
單次投入內每過一個設施音調會 +1 半音（`SFX.hit(step)` 用 `G.inv.facHit-1`），但每次投入結束 `G.inv.facHit` 歸零 → 下次投入又從 C4 起跳，失去連續投入的爽感。

##### 實作
- 新增 `G._turnPitchOffset`（newGame 初始化 0），`startTurn` 每回合歸零
- `finish()` 每次投入結束累加 `G.inv.facHit` 到 offset
- `SFX.hit` / `SFX.convert` 從 `G._turnPitchOffset` 讀取並加到 step（由 `pitchOffset()` helper 封裝），上限 36 半音（3 個八度）避免尖銳
- 效果：第一次投入 3 設施 C4→D4→D#4，offset=3；下次投入第一個設施從 D#4 起跳，一路往上

##### 存檔相容
`deserializeGame` 將 `_turnPitchOffset` 重置為 0（saves 都是 startTurn 時的乾淨狀態，重置不會造成音階錯亂）

#### 放置設施 SFX + 視覺特效

##### 新增資源
- **`SFX.place()`**：雙 oscillator 疊加
  - 低頻 square wave 180→80 Hz「咔」
  - 高頻 triangle wave 880→1760 Hz 琶音「叮」
- **CSS 動畫**（三層疊加）：
  - `.place-spawn`：scale(.2) rotate(-8deg) → 1.22× rotate(4deg) 過衝 → 回正（彈性曲線）
  - `.place-ring`：橘色外框光環 0.6× → 1.8× 淡出
  - `.place-sparkle`：6 顆 ✨ 從中心向 6 個方向飛散（`--sx`/`--sy` CSS 變數）

##### `placeEffect(r,c)` 統一 helper
呼叫於 `tryPlaceAtCell` 7 個放置成功路徑：
- 一般放置
- 蕾雅一般設施疊加 / 蕾雅百貨公司疊加
- 物流之王/倉儲女王 overlay
- 百貨公司 2×2 取代
- 廢墟紀念碑
- 轉運中心放置

重新排列（onRearrangeDrop）、移動模式等非「新放置」情境保留原本 `pulse` 以區分。

#### 疊加設施 pipeline（`applyOverlayPipeline`）

##### 舊行為
- `cellOverlay` 只在 `redirect` 分支有被 `stepWithMover` 處理
- 各 overlay 的 `FACILITY_FX` 會執行，但 `bldgUpgrades` 加成只套用一次（`_ovUpgApplied` flag）
- 其他加成（`cellMods`/`permCellMods`/`cellPctMods`/`leyaPctMods`）完全不作用到 overlay

##### 新行為（依使用者指示）
「重疊的設施視為不同的建築，遇到重新排列與更換位置的效果時必須一起移動；另外給予加成的效果也會同時作用在那些設施上」

- **共同移動**：已成立（`cellOverlay` 在 `KEYED_DATA_FIELDS` 裡，`swapCellData` / 地震 / 混沌建築師 都會連同 overlay 一起搬）
- **加成同時作用**：新增 `applyOverlayPipeline(el, r, c, cellEl)`，每個 overlay 依序：
  1. 執行其 `FACILITY_FX[special]` 或 `fn(value)` 轉換（帶暴食惡魔類型互換）
  2. 套用與 base 相同的 `cellMod + permCellMod + bldgUpgrades` 固定加成
  3. 套用 `cellPctMods` 百分比 + `leyaPctMods` 蕾雅百分比
  4. `facHit++` 並推入 `facPath`（供終點站 / 快遞達人 / 大熱波等計數）

##### 三處 pipeline 整合
- `_hit` helper（FACILITY_FX 基座路徑）：base 處理完後呼叫，跳過 `redirect` 基座（因為 redirect 分支已自己 call pipeline）
- redirect 分支：取代原本有 `_ovUpgApplied` 旗標的手寫 overlay 迴圈，改為統一呼叫 pipeline
- general conversion path：base 轉換完成後呼叫

##### MEGA 模擬尚未套用
`simFacilityPath` 目前沒呼叫 pipeline，如果要讓巨型設施模擬也一致需另外處理（目前 scope 外）

#### 蕾雅疊加規格（Session 16 後續補強）

配合 overlay pipeline，蕾雅的疊加現在真正有功能：
- 手牌同類設施放到場上同類 → 加入 `cellOverlay` + `bldgUpgrades[cell] += 2`（永久）
- `countAllShops` / `countAdjacentFacilities` / `env_sensor` 等已經會計入 overlay 設施 → 「視為不同的建築」成立
- 每次資源通過該 cell，base 轉換一次 + 每個 overlay 也各轉換一次，且都吃同樣加成

#### 臨時工棚規格改版

##### 舊行為
- `FACILITY_FX.temp_shed`：資源通過時 `+min(tempShedMoves, 5)` 的加成
- `G.tempShedMoves` 計數由 `onFacilityMoved` 累加

##### 新行為（依使用者指示）
「回合結束時，自動賣出自己獲得+2收益；若場上有廢墟，隨機賣出一個廢墟並獲得+2收益。」

- **`BLDG.temp_shed.desc`** 文字更新
- **`FACILITY_FX.temp_shed`** 改為通過 log 不加成
- **`doNext`** 在 `commitTurnLog` 之後新增臨時工棚結算：
  1. 每個 `temp_shed`：`G.grid[r][c]=null` + `clearKeyedData` + `G.profit+=2` + `profitFlyFromCell`
  2. 若 `G.ruinCells.size>0`：隨機挑一個廢墟 → `G.grid[rr][rc]=null` + `G.ruinCells.delete` + `clearKeyedData` + `G.profit+=2` + 動畫
- 由於 `G.tempShedMoves` 不再有寫入來源（FX 不寫、`onFacilityMoved` 也沒意義了），此欄位變成長期空物件，未來可清理

#### 達標立即觸發過關（doPermConvert）

##### 問題
使用者反映「使用轉換收益時，收益超過目標不會立刻達成目標」：`doPermConvert()` 只設 `G._goalReachedTurn`，不觸發 win modal，必須點結束回合才會過關。

##### 實作
`doPermConvert` 在 `G.profit>=G.goal` 時加上與 `finish()` 完全一致的 600 ms 延遲 → `showModal('win', ...)` 流程（`roundHistory` 記錄、`adjustDifficulty`、round++、goal 重算、autoSave、modal）

##### `G._winPending` 重入保護
兩處都加 `G._winPending` 旗標：
- `finish()`：`if(G.profit>=G.goal&&!G._winPending){ G._winPending=true; setTimeout(...) }`，callback 內先 `G._winPending=false`
- `doPermConvert()`：同模式
- 防止「投入剛達標、600 ms 延遲期間再按轉換」造成 modal 被觸發兩次
- `deserializeGame` 重置 `data._winPending=false`，避免跨存檔旗標殘留

#### 合夥人 hook 防禦性 try-catch

##### 動機
使用者回報「繼續遊戲後還可以投入、但結束回合按鈕按了沒反應」。這種「流程在中途靜默中斷」的現象最常見成因是 `startTurn` 中某個合夥人 `onTurnStart` 拋例外，整個函式中止、`render()` 不更新，外顯即為「按了沒反應」。

##### 實作
三處 `G.partners.forEach` 對 hook 的呼叫包 try-catch：
- `startTurn` 的 `onTurnStart` 迴圈
- `startRound` 的 `onRoundStart` 迴圈
- `finish` 的 `onSettle` 迴圈

單一合夥人拋錯只 `console.warn('partner.onXxx 失敗:', pid, e)`，不影響其他合夥人與後續流程。

---

### 【本次更新】對齊「新合夥人表.xlsx」機制

依 `新合夥人表.xlsx`「新合夥人機制」分頁為基準，全面對齊現行實作。

#### 設施機制修復

| 設施 | 舊行為 | 新行為（xlsx） | 位置 |
|------|--------|----------------|------|
| **物流放大器** `logistics_amp` | 下一設施效果 ×2 | 下一設施這回合 **+8** 絕對值 | `FACILITY_FX` + stepWithMover |
| **加班辦公室** `overtime` | 依持有人材百分比 `floor(talents/2)%` | **本回合已投入人材**每 2 個 → **+8** 絕對值 | 改用 `G._hrTalentUsedCount` |
| **勞動轉換站** `labor_convert` | 消耗 2 持有人材 → 資源 ×2 | **本回合已投入人材**每 2 個 → **+4** 絕對值 | 改用 `G._hrTalentUsedCount`，不再消耗 |
| **人力銀行** `talent_bank` | 金錢通過時儲存 10%、下次釋放（與人材無關） | 消耗 2 人材 → 下回合開始 **+4 人材**（新增 `G._talentBankPending` 累計，`startTurn` 發放） | `req/out` 也從 `money` 改為 `any/null` |
| **進出口稅站** `import_tax` | ≥4 物流中心時 ×2，且 -1 收益 | **商品↔金錢 +4 轉換**；每通過一個物流中心 **+2**（絕對），無門檻、無扣收益 | FX 直接做類型轉換 + 物流加成 |
| **物流倉** `logistics_vault` | 儲存數值 50%、下次釋放 | **投入時 +1 物流計數，計數 ≥3 時 +8 收益並重置**（與 xlsx 一致） | 新增 `G.vaultCounts` 鍵入 `KEYED_DATA_FIELDS` |
| **物流倉 v2** `logistics_vault_v2` | （獨立設施）計數版 | v1 已併入 v2 行為，v2 從 `BLDG_RARITY` 移除（新局不再出現；既有存檔仍可運作），desc 加註「已合併至物流倉」 | BLDG_RARITY 移除 |

#### 合夥人機制修復

| 合夥人 | 問題 | 修復 |
|--------|------|------|
| **工會主席** `union_chief` | 人材 8+ 判定在 `G.talentCards--` 之後才跑，實際需要 9+ 才能觸發 | `onTalentDrop`/`onTalentDropCell` 改用 `talentBefore` 記錄扣除前值 |

#### 其他玩法 / UX bug

| 項目 | 問題 | 修復 |
|------|------|------|
| **拆遷隊排列可交換廢墟位置** | 拖設施到廢墟格會觸發 swap，把廢墟移到原設施位置 | `onRearrangeDrop` 拒絕 `dstId==='ruin'`；`onRearrangeDragOver` 對廢墟不 preventDefault，不顯示可投放提示 |
| **拆遷補償局排列模式多段結算** | 排列中每次 swap 都觸發 +4，多步交換會累積超量 | 引入 `G._demolishBureauPending` flag：`onFacilityMoved` 在 `G.freeRearrange` 期間只設 flag 不結算；`confirmRearrange` 結算一次（`1 × 補償局數 × 4`）；`cancelRearrange` 清 flag |

#### 新增 / 變動的 G 狀態

- `G._talentBankPending`：人力銀行預約 +N 人材（下回合開始釋放），跨回合持續，無需 deserialize 清除
- `G._demolishBureauPending`：排列模式期間的延遲結算 flag，`confirmRearrange`/`cancelRearrange` 清除
- `G.vaultCounts`：物流倉每格計數，納入 `KEYED_DATA_FIELDS`（隨設施搬移/清理）

#### 備註：xlsx 比對中未處理項目

- agent 初判報告中多個「完全缺失」實為已實作（如人類惡魔、北漂者、分身大師、擴散惡魔、市長、全能會計師、電子放電惡魔 等），驗證後確認 code 已有對應邏輯
- logistics_vault_v2 被標註為舊版，但 BLDG 定義與 `vaultV2Counts` 機制保留以相容既有存檔

#### 合夥人對齊 xlsx（第二輪）

用 Python 腳本逐一比對 xlsx 47 位合夥人與 code `PARTNERS`/`PARTNER_RARITY`，確認 46/47 文字（pos/neg）已與 xlsx 一致（黃牛販子 scalper 為設施而非合夥人）。

**移除 code 中 xlsx 沒有的額外負面效果：**

| 合夥人 | 移除的額外負面 | 修改 |
|--------|---------------|------|
| **爆破工程師** `demolition_expert` | `neg:'每輪目標+10%'`、`onRoundStart` 中 `G.goal *= 1.1` | 清除整個 `onRoundStart`，`neg:'無'`；併同移除 `isDemon:true` 與 tags 的 `demon`（xlsx 未歸為惡魔） |
| **混沌建築師** `chaos_architect` | `neg:'被移動時 -5% 收益'`、`onTurnStart` 結尾 `G.profit -= floor(profit*0.05)` | 清除該 penalty 區塊，`neg:'無'` |

**稀有度對齊（6 合夥人 + 5 建築）：**

合夥人 `PARTNER_RARITY` 調整：
- `labor_broker`（人力仲介）：R → SR
- `storage_queen`（倉儲女王）：SR → SSR
- `forex_trader`（外匯交易員）：SR → SSR
- `mayor`（市長）：SR → SSR
- `clone_master`（分身大師）：SR → SSR
- `yongqing_house`（擁慶記房屋）：SSR → R

建築 `BLDG_RARITY` 調整：
- `spiral_hub`（螺旋物流站）：SR → SSR
- `terminal`（終點站）：SR → SSR
- `speed_station`（速遞站）：SR → SSR
- `trade_port`（外貿港口）：SR → SSR
- `talent_training`（人力訓練中心）：N → R

**仍未處理項目（需後續處理）：**

1. xlsx「物流中心」(R)「每回合一次，資源投入時改變方向」的 once-per-turn 機制在 code 中缺失。code 只有 `logistics_up/down/left/right`（R, 每次通過都轉向）與 `transfer_hub`/`logistics_hub`（placement-time 決定方向），語意與 xlsx R 版不符
2. `highway_star`（公路之星）xlsx 歸類為建築但 code 置於 `PARTNERS` 作 onTurnStart 合夥人效果；機制完整，僅類別框架不同，未更動
3. `scalper`（黃牛販子）xlsx 歸類為合夥人（R）但 code 作設施（SR），機制已符合 xlsx 文字，暫不更動類別

#### 合夥人實作核驗（第三輪）

逐一讀取 onTurnStart / onSettle / onRoundStart / onRecruit 實作，與 xlsx 比對。

**已修復（4 項）**

| 合夥人 | 舊實作問題 | 修復 |
|--------|------------|------|
| **大地主** `landlord` | `pick_fac` 事件前會消滅「場上 **或 手牌**」設施；xlsx 只寫「小鎮上的設施」 | 移除手牌消滅分支，只從 `gridFac` 隨機選 |
| **中央秘書** `center_secretary` | 負面懲罰 `G.inv.facHit×2`（只算設施）；xlsx 寫「每經過一個格子」 | 改用 `G.inv.cellPath.length×2`（含空格） |
| **快遞達人** `express_master` | 用 `facHit` 計算「超過 4 格後每格 +4」；xlsx 寫「格子」 | 改用 `G.inv.cellPath.length` |
| **貧窮神** `poverty_god` | 標註 `isDemon:true`；xlsx 未歸為惡魔 | 移除 `isDemon` flag |

**核驗通過（機制已符 xlsx）**

`monopolist`、`forex_trader`、`arbitrageur`、`wind_master`、`spread_demon`、`northbound`、`cyber_coder`、`human_demon`、`clone_master`、`goods_buyer`、`elec_discharge_demon`、`elec_artisan`、`thunder_king`、`relay_station`、`ruin_warrior`、`bomber`、`wanderer`、`recycle_grandma`、`ruin_scavenger`、`uncrowned_king`、`yongqing_house`、`tanya`、`omni_accountant`、`demolition`、`labor_broker`、`labor_minister`、`hr_director`、`union_chief`（本 session 稍早已修）

**技術備註**

- `G.inv.cellPath` 於 `sendEl()`（line 3830）初始化為 `[]`，於 stepWithMover 中每一格 push `[r,c]`（line 4500），故 `cellPath.length` 即為本次投入通過的格子數（含空格）

#### 新增合夥人規格實作（第四輪）

**大財團 `big_corp`：大型設施可取代 2×2 非大型**

- 新增 helper `_isEmptyOrNonLargeDestructible(bId)`：判定格子是空 / 非大型可消滅設施（排除 isLarge / indestructible / dept_store* / ruin）
- 新增 `findAny2x2(r,c)`：找出包含 `(r,c)` 的 2×2，4 格都通過 `_isEmptyOrNonLargeDestructible`
- 修改 needs2x2 放置流程：百貨公司先嘗試 `findShop2x2`；若失敗且持有 big_corp，則 fallback 到 `findAny2x2`
  - fallback 命中後：`destroyFacility` 消滅 2×2 內所有現有設施，再呼叫 `placeDeptStore`（百貨公司）或單格 `G.grid[r][c]=bldgId`（其他大型）
  - 一般 log：`🏢 大財團：${name} 取代 ${N} 個非大型設施`
- 百貨公司以外的 isLarge 設施（巨人村/世界奇觀/古代機械工廠/大型電子供給站）目前單格實作，只會消滅 2×2 區域釋出空間，不以 4 格 part 佔格（後續可擴充）

**惡魔巨人 `demon_giant`：市場事件後消滅合夥人**

- 新增常數 `MARKET_EVENT_IDS = ['mat_crash','mat_boom','goods_up','row_buff','col_buff','area_buff']`（原料大降/出口熱/商品熱銷/行業熱潮/區域效應/地塊共鳴）
- `triggerEvent` 開啟事件時記錄 `G._currentEventId = ev.id`
- `evDone` 結束事件時檢查：若為市場事件且持有 demon_giant 且 `!isDemonNegDisabled('demon_giant')` 且有其他合夥人 → 呼叫 `showDemonGiantChooser(candidates)` 並 `return`（不 startTurn）
- `showDemonGiantChooser`：用 `showCardChooser` 顯示所有非 demon_giant 合夥人卡，點擊後呼叫 `demonGiantDestroy(pid)` 並 `startTurn()` 續跑流程
- 強制選擇：顯示後隱藏取消按鈕（`card-chooser-skip` `display:none`），無跳過選項
- `deserializeGame` 清除 `_currentEventId`
- 舊實作（random pick，非市場事件也觸發）已移除

#### 音效系統調整

**連續投入音調不再奇怪**

- 原本 `SFX.hit(step)` 同時用「本回合累積位移」+「step（本投入路徑上第幾個設施）」當半音增量；半音序列會產生小二度/大七度等刺耳音程，連續投入時尤其明顯
- 改為：
  1. 新增 `PENTATONIC = [0,2,4,7,9]`（C 大調五聲音階），`pitchOffset()` 把 `G._turnPitchOffset`（本回合投入次數）映射到五聲音階（`octave*12 + PENTATONIC[n % 5]`），避免刺耳音程
  2. `hit(step)` / `convert(step)` 內部不再使用 step 加成（參數保留相容性，故 caller 不用改），**單一投入路徑內各設施發出同音**，只有跨投入才升調
  3. `G._turnPitchOffset` 的累加由 `+= G.inv.facHit`（依通過設施數）改為 `+= 1`（依投入次數），整體更穩定
- `pitchOffset` 上限仍保留 36 半音

**疊加音效 `SFX.placeOverlay` 與一般放置 `SFX.place` 區分**

- 新增 `SFX.placeOverlay()`：E5→G5→B5 上行大三和弦琶音（0.05s 間隔）+ E4 柔和底噪，共 0.35s，sine/triangle 波（柔和、magical）
- 原 `SFX.place()` 保留（squarewave 低音「咔」+ square/triangle 高音亮片，打擊感）
- `placeEffect(r,c,opts)` 新增 `opts.overlay` 參數，為 `true` 時用 `placeOverlay`
- 套用 overlay 音效的 3 個 caller：
  - 蕾雅百貨公司疊加（line 3465）
  - 蕾雅同設施疊加（line 3535）
  - 物流之王 / 倉儲女王 疊加（line 3589）
- 其他 `placeEffect` caller 維持一般放置音（百貨公司 2×2 首次放置、ruin_monument、一般放置、transfer_hub、大財團 big_corp 取代）

大財團 `big_corp` 的 2×2 取代屬「全新建築替換舊建築」流程而非「疊加」，故維持 `place` 音效

#### 匯率波動板 `exchange_board` 機制重寫

**舊實作（不符 xlsx）**
- 通過時只設 `G.inv.exchBoard=true` flag
- 結算時依 `profit > 0`，從 `[-15,-12,-10,-8,-5,-3,3,5,8,10,12,15]` 選一個百分比一次性調整總收益

**新實作（依 xlsx「隨機 ±2，重複 = 場上設施數量」）**
- `FACILITY_FX.exchange_board`：通過時計 `findFacilityCells().length` 作為重複次數 `N`
  - 每次 roll `Math.random()<0.5 ? +2 : -2`，總和加到 `fx.el.value`（下限 0）
  - log 顯示：`📈 匯率波動板: 重複 N 次（+2×X / -2×Y）= ±Z → 新值`
- 結算處 (`finish()`) 的舊計算完全移除
- `sendEl` 內 `G.inv.exchBoard` flag 保留（cleanup 成本低，避免誤觸其他讀取）

**動畫**
- 新 CSS class `.cell-float`（`@keyframes cellFloat`，0.8s 上浮淡出，不朝收益區飛）
- 新 helper `floatAtCell(r, c, text, positive)`：在格子中央插入浮動數字（綠色 `+2` / 紅色 `-2`）
- 每次 ±2 以 80ms 間隔錯開動畫（setTimeout 分批）
- 例如 N=10 時會連續 10 個 ±2 從格子浮出

**模擬版本同步**
- `MEGA_SIM_FX.exchange_board`：用 `mega.grid` 快照計設施數，roll 次數 ±2 加到 `sim.value`
- `simFacilityPath` 的 `exchBoard` 區域變數與結算時的百分比區塊刪除

#### 電子工廠 `elec_factory` 規格更新與實作修復

**xlsx 最新規格**
> 電子。原料→金錢。場上每有一個電子設施，這個設施設置時永久獲得+2。

**兩階段修復**

1. **原先 FX handler 無法生效**：把 `+2×N` 寫入 `bldgUpgrades[r,c]`，但 `stepWithMover` line 4880 的通用 `upgradeBonus` 只對 `!b.special || b.special==='cafeteria'` 生效，`elec_factory` 有 special 所以永久被排除
2. **原先觸發時機也錯**：xlsx「這個設施設置時」語意是**放置當下**結算一次，並非通過時每次累積

**新實作**

- **`BLDG.elec_factory`**：`out` 由 `'material'` 改為 `'money'`（原料→金錢）
- **`FACILITY_FX.elec_factory`**：只負責通過時的原料→金錢轉換 + 套用累積 `bldgUpgrades`（透過 `applyUpgradeBonus`）
- **新增 `onFacilityPlaced(r, c, bldgId)` hook**：
  - 在 `placeEffect` 結尾呼叫（所有放置情境都會執行）
  - 其中處理電子工廠：`elecCount = findCells(hasTag 'electronic')`，`bldgUpgrades[r,c] += elecCount*2`
  - log：`⚡ 電子工廠 (r,c)：場上 N 個電子設施，永久+2N（累計+X）`
- **`placeEffect(r, c, opts)` 新增 `opts.bldgId`**：供疊加情境（蕾雅/物流之王/倉儲女王）顯式傳入被疊加的設施 id（否則會讀到錨點的 G.grid id）
  - 已更新 3 個疊加 caller：蕾雅百貨公司疊加 → `bldgId:'dept_store'`；蕾雅同設施疊加 → `bldgId`；物流系疊加 → `bldgId`

**行為**
- 放置時：場上 N 個電子設施（含自己）→ `bldgUpgrades[r,c] += 2N`
- 通過時：原料→金錢，value 套用累積 bldgUpgrades
- 若透過 leya 疊加第二張 elec_factory 於同格：兩次放置都觸發，累計加倍

#### 連續結算（大收益跨輪過關）

**動機**
玩家單回合大爆發時，累計收益可能同時超越當輪目標與下一輪（甚至更多輪）目標，原本只結算第 1 輪，之後仍要再跑一輪才能過第 2 輪，體感遲鈍。

**規格**
單回合 `G.profit` 同時超越當輪目標與下一輪（或更多）目標時，連續結算直到 `G.profit < G.goal` 為止，一次性連過多輪。

**實作**
- 新增共用 helper `performWinSettlement(turnsUsed)`：
  - 迴圈 `while(G.profit >= G.goal && _iter<20)`：記錄 roundHistory、`adjustDifficulty()`、`G.round++`、重算 `G.goal = round(oldGoal * 1.4 * difficultyMult + 8)`
  - 上限 20 輪防極端情境
  - 最後：`turn=1`、清 buff/cellMods/cellPctMods、autoSave、show modal
  - Modal 文字：單輪「第 X 輪過關！」；多輪「🎉 連續結算 N 輪！…第1輪(目標X) → 第2輪(目標Y) → …」
- `finish()`（投入路徑結算）與 `doPermConvert()`（資源轉換收益按鈕）兩處改為 `setTimeout(()=>performWinSettlement(turnsUsed), 600)`
- 原本兩處各自展開的結算段落刪除，改呼叫同一 helper

**邊界**
- `adjustDifficulty()` 在每輪都呼叫：連續結算時難度會每輪都加速調整（合理，因為多輪都達標）
- `profit` 不重置（原本設計就不重置），所以每輪消化掉舊 goal 後，餘額仍可能打穿下一輪

#### 電子輸送帶 `elec_conveyor` 生效路徑修復

**Bug**
電子輸送帶本身有實作（FX 設 `G.inv._elecConveyorActive=true`，stepWithMover line 4867 在下一個電子設施 `bldgUpgrades[r,c]+=2`），但**下一個電子設施的 FX 沒有呼叫 `applyUpgradeBonus`**，所以寫入的 +2 永遠不套用到資源輸出，體感像沒效果。

同樣問題存在於 `elec_shop`、`mega_elec_supply` 等所有特殊電子設施——只要它們是 `+2` 的接收端，累積都不會生效。

**修復**

在 3 個電子設施 FX 結尾補呼叫 `applyUpgradeBonus(fx.r, fx.c, fx.el.value, name)`，把累積的 `bldgUpgrades`（來自電子輸送帶 / 蕾雅疊加 / 人材強化等）套到本次輸出：

- `elec_conveyor(fx)`：pass-through 時也套用自身累積
- `elec_shop(fx)`：在類型轉換（金→原 / 商→原 / 原→錢+2）之後套用
- `mega_elec_supply(fx)`：在 `+4` 原料轉換後套用

原先 `elec_factory` 的 `applyUpgradeBonus` 呼叫在電子工廠規格更新段落加入，完成整個電子系的 upgrade 套用鏈。

### Session 18a（2026-04-22）— 第三輪審查：BUG / 未實作 / 可疑清單

本輪為對 `GameDoc.md` 與 `index.html` 的交叉比對檢查，尚未進行修復；僅記錄待處理項目與風險點，供後續 Session 逐項核實與處理。每項標註嚴重度（🔴 高 / 🟠 中 / 🟡 低）。行號為檢查當下的參考值，修復時應再次驗證。

#### A. 未實作功能（文件有、程式碼沒有）

##### A1. 🟡 物流中心 R 級「每回合一次、資源投入時改變方向」
- **文件**：`GameDoc.md:2165` 區描述 R 級物流中心具「每回合一次，資源投入時改變方向」語意
- **現況**：`BLDG` 僅有 `logistics_up/down/left/right`（每次通過都轉向）與 `transfer_hub`（放置時一次性決定方向）
- **結論**：缺少符合文件語意的「per-turn 限制」版本。需確認文件是否為舊設計殘留，或補實作

##### A2. 🟡 連續結算過關鏈 Modal 詳細顯示
- **文件**：`GameDoc.md:2297`「第1輪(目標X) → 第2輪(目標Y) → …」
- **現況**：`performWinSettlement` 已實作連續結算邏輯，但 Modal 文字格式需實機驗證是否完整顯示每一輪的目標鏈
- **驗證方式**：開發者模式衝一筆超大收益跨 3+ 輪，截圖核對 Modal 內容

##### A3. 🟠 電子輸送帶 +2 銜接斷鏈
- **文件**：`GameDoc.md:2305-2318`（Session 17 已描述修復）
- **疑點**：Session 17 log 顯示已在 `elec_conveyor / elec_shop / mega_elec_supply` 三個 FX 結尾補 `applyUpgradeBonus`；但需確認 `elec_factory` 自身 FX 也有呼叫，且所有後續可能接收 `bldgUpgrades` 的電子設施都覆蓋到（例如新增設施時容易遺漏）
- **驗證方式**：grep `FACILITY_FX` 中所有 `tags:['electronic']` 的設施，確認每個都呼叫 `applyUpgradeBonus`

#### B. 實作不完整或可疑

##### B1. 🟠 `logistics_vault_v2` 殘留
- **文件**：`GameDoc.md:2109` 已宣告「併入物流倉、新局不再出現」
- **現況**：`BLDG` 定義、`BLDG_RARITY` 項目、`vaultV2Counts` state 鍵都還在
- **建議**：
  - 若確認要完全移除：刪除 `BLDG.logistics_vault_v2`、`vaultV2Counts`、`FACILITY_FX.logistics_vault_v2`，並在 `deserializeGame` 加入舊存檔的遷移（轉為 `logistics_vault`）
  - 若保留舊存檔相容層：在文件與程式碼顯式標註 `@deprecated`

##### B2. 🟠 黃牛販子 `scalper` 邊界
- **文件**：`GameDoc.md:1766` 規格「商品→金錢+1→商品+1；本回合沒獲得收益時 -8」
- **現況**：`FACILITY_FX.scalper`（`index.html:3459` 附近）有雙段邏輯 + `_scalperHits` 計數；`finish()` 結算檢查
- **驗證方式**：撰寫測試情境——（a）無商品通過、（b）僅觸發第一段、（c）觸發兩段、（d）多次往返——核對 -8 的觸發時機與次數

##### B3. 🟠 臨時工棚改版結算邊界
- **文件**：`GameDoc.md:2049-2063`「回合結束自動賣出 +2」
- **現況**：`FACILITY_FX.temp_shed` 已改為不即時加成，`doNext` 回合結算時掃描並加 +2
- **可疑情境**：
  - 臨時工棚位於百貨公司（蕾雅）2×2 疊加內時，是否仍計入？
  - 同回合中被廢墟消滅的臨時工棚是否還結算？
  - 被莫菲定律打亂後，原位置加成狀態是否正確？
- **建議**：補 3 項單元測試或手動驗證

##### B4. 🟠 大熱波 `G.inv.facPath` 計數正確性
- **文件**：`GameDoc.md:2249-2252`
- **現況**：`stepWithMover` 每步累加 `facPath`
- **可疑情境**：疊加設施（蕾雅/物流之王）、轉運中心二次觸發、速遞站額外觸發時，是否重複或遺漏計數
- **驗證方式**：開發者模式堆 10+ 個設施的長路徑，逐步 log `facPath` 與實際通過設施數比對

##### B5. 🟡 全能會計師計數合夥人 hook 異常路徑
- **文件**：`GameDoc.md:2809-2834`
- **現況**：已有 try-catch 保護（console.warn 7 處）
- **待驗證**：手動注入其中一個 `onTurnStart` 拋例外，確認其他 4 個仍正常執行、會計師計數仍正確

##### B6. 🟡 `tempShedMoves` 死欄位
- **現況**：自臨時工棚改版後無寫入來源，`G.tempShedMoves` 成為恆空物件
- **建議**：移除所有宣告與初始化，清乾淨

#### C. 潛在 BUG（明確風險，建議優先處理）

##### C1. 🔴 莫菲定律打亂未清 `permCellMods`
- **位置**：`index.html:2970-2979` 附近
- **問題**：莫菲定律 shuffle 後清除了 `cellMods / cellOverlay / bombTimers / futuresPct`，但**未清 `permCellMods`**（地皮炒家 +4、公路之星 +2 等永久加成）
- **影響**：舊位置的永久加成殘留，打亂後格子效果錯位
- **修法**：在 shuffle 的清除清單加上 `permCellMods`，或改為「跟隨設施移動」的邏輯（永久加成綁設施而非綁位置）

##### C2. 🔴 讀檔 `cellMods` 清除策略過激
- **位置**：`deserializeGame` 的 `KEYED_DATA_FIELDS` 迴圈
- **文件**：`GameDoc.md:2092` Session 15 Bug 2 曾部分修復
- **問題**：無條件清除空檔位的 `cellMods`，但永久加成（地皮炒家、公路之星等）也存在 `cellMods` 或 `permCellMods`
- **修法**：區分「暫時加成」（回合內重置）與「永久加成」（隨設施存續），只清前者

##### C3. 🟠 `facility_destroyer` 消滅疊加設施計入完整性
- **位置**：`index.html:2549` 附近 `destroyFacility`
- **問題**：遍歷 `cellOverlay` 是否正確累計「每個被消滅的疊加設施都 +4」？loop 順序與 `clearKeyedData` 的時序需驗證
- **驗證方式**：蕾雅疊兩張設施後觸發消滅，log 核對 +4 次數

##### C4. 🟠 `_allCenter` 標記清除時機衝突
- **位置**：`index.html:2286`（擴散惡魔）與 `:2027`（中央秘書）
- **問題**：兩者都用 `G.buff._allCenter`，但清除時機不同（擴散在結算後、中央秘書在 onSettle）
- **影響**：同回合兩者都觸發時可能互相覆蓋或提早清除
- **建議**：改用兩個獨立 flag（`_allCenterDiffuse` / `_allCenterSecretary`），或明確定義誰負責清除

##### C5. 🟠 `big_corp` 2×2 取代的邊界格處理
- **位置**：`index.html:3272-3280` 附近 `findAny2x2`
- **問題**：若目標格本身屬於 2×2 大型設施（如世界奇觀），取出的 2×2 範圍可能包含該大型設施的其他 3 格，消滅/取代時這些格是否正確 reset？
- **驗證方式**：放置世界奇觀後觸發 `big_corp`，確認消滅後 4 格都清乾淨

##### C6. 🟠 拆遷補償局 `_demolishBureauPending` 清理
- **位置**：`confirmRearrange` / `cancelRearrange` 清除 flag
- **可疑情境**：重新排列期間若有非拖曳觸發的設施移動（如事件觸發移動），flag 可能不同步
- **驗證方式**：在排列中強制觸發莫菲定律或其他移動事件，確認後續結算不重複/遺漏

##### C7. 🟠 `talent_bank` 預約跨回合無過期檢查
- **位置**：`G._talentBankPending`（Session 14 新增）
- **問題**：`deserializeGame` 無檢查此欄位是否異常殘留、過期，讀檔可能導致預約人材永遠無法發放
- **修法**：`deserializeGame` 驗證 `_talentBankPending` 結構與回合有效性，失效則清除

##### C8. 🟡 拆遷隊計數消耗語意確認
- **位置**：`index.html:2292` 附近 `st.count -= 3`
- **疑點**：計數到 5 時消耗 3 留下 2，下回合只需再 +1 即達成。這是否符合「≥3 消耗 3」的原設計？
- **動作**：向 PM 確認設計意圖，若需改為「消耗後歸零」則調整

##### C9. 🟡 `exchange_board` 動畫堆疊
- **位置**：FACILITY_FX 區 `exchange_board`
- **問題**：±2 浮出 80ms 錯開，多次往返 + 瀏覽器卡頓時 UI 與實際數值脫節
- **修法**：浮字使用佇列化或去抖動

##### C10. 🟡 連續結算時 `adjustDifficulty` 呼叫次數
- **位置**：`performWinSettlement` 迴圈內
- **文件**：`GameDoc.md:2301-2303` 已記錄此行為為「合理」
- **疑點**：3 輪連過會調 3 次難度倍率，可能跳躍過大。待玩家回饋驗證

#### D. 其他觀察

##### D1. 🟡 除錯殘留 console.warn
- 7 處 `console.warn`（`index.html:3179 / 4626 / 5110 / 5723 / 9102 / 9111 / 9172`）為合夥人 hook 的防禦式捕捉
- **建議**：生產環境包一層 `if (G.debug)` 或改為 telemetry

##### D2. 🟡 硬編碼風險
- 多處 `N=4` 硬編碼、`BASIC_FACILITIES` 抽選池為硬編陣列
- **建議**：新增設施時容易漏更新池；可改為「自動從 `BLDG_RARITY` 推導」

##### D3. 🟡 效能熱點
- `eachCell` 在 5×5 地圖上單回合累積呼叫 1000+ 次
- `getPlayerTagCounts()` 每次完整掃描（購買/招募時各呼叫 1 次）
- 莫菲定律打亂時 grid + keyed data 全複製，記憶體峰值可觀
- **建議**：不急迫；若將來地圖擴大（6×6+）再考慮快取 tagCounts

##### D4. 🟡 冗餘條件判斷
- `_inOtherMode` 等條件判斷在多處重複，可抽成 helper
- 部分舊 Session 改版後留下的判斷分支未同步簡化

##### D5. 🟡 設施 desc 一致性
- Session 14 修過 `logistics_amp / logistics_vault` 等 desc
- **建議**：整表再審一輪，確認所有設施文案與當前規格一致

#### 處理優先序建議

**下一個 Session 應優先處理**：
1. 🔴 C1（莫菲定律 `permCellMods` 未清）— 明確邏輯錯誤
2. 🔴 C2（讀檔 `cellMods` 過激清除）— 影響存檔相容性
3. 🟠 B1（`logistics_vault_v2` 殘留）— 設計與實作不符，易誤導

**後續可分批處理**：B3 / B4 / C3-C7 多為邊界驗證，建議開發者模式實機測試後一次性修復。

**追蹤中但暫不處理**：A1 / A2 / C8 / C10 需 PM 確認設計意圖。

---

### Session 18b（2026-04-23）— 多項 Bug 修復與物流中心補完

> 注：18a (04-22 審查清單) → 18b (04-23 修復實作) 為連續工作，編號重複保留並加 a/b 後綴。

#### A. 修復清單

##### A1. 🔴 莫菲定律未清 `permCellMods`
- **位置**：`index.html` Murphy 事件 show 函式（清除 keyed data 區塊）
- **問題**：莫菲定律打亂設施位置時清除了 `cellMods/cellOverlay/bombTimers/futuresPct/...`，但**未清 `permCellMods`**（地皮炒家空格 +4 等永久加成）
- **修法**：在清除清單追加 `G.permCellMods={}; G.cellRedirectDir={}; if(G._logCenterRotated) G._logCenterRotated.clear();`

##### A2. 🔴 讀檔 `cellMods` 過激清除（移除過時豁免）
- **位置**：`deserializeGame` 的 `KEYED_DATA_FIELDS` 迴圈
- **歷史**：Session 15 曾為了保護「永久加成在空格」而加 `if(dk==='cellMods') return;` 豁免
- **問題**：永久加成已遷至 `permCellMods`，`cellMods` 現在只裝本回合暫時值，豁免邏輯成為過時
- **修法**：移除 `cellMods` 豁免；註解改為「永久綁定格子的加成寫在 permCellMods，不在此清除清單」

##### A3. 🟠 `logistics_vault_v2` 殘留清除（含舊存檔遷移）
- **位置**：BLDG / BLDG_RARITY / BLDG_TAGS / FACILITY_FX / 渲染分支 / `KEYED_DATA_FIELDS` / G 初始
- **問題**：xlsx 規格已併入 `logistics_vault`，但 code 多處仍有死代碼
- **修法**：
  - 完全移除 `logistics_vault_v2` BLDG 定義、FACILITY_FX、render 分支、tags
  - 移除 `vaultV2Counts` 從 KEYED_DATA_FIELDS 與 G 初始
  - `deserializeGame` 加入舊存檔遷移：`logistics_vault_v2` cells → `logistics_vault`，`vaultV2Counts` 累加合併入 `vaultCounts`

##### A4. 🟠 `tempShedMoves` 死欄位移除
- **位置**：KEYED_DATA_FIELDS、G 初始、Murphy 清空、DEV.clearGrid、`onFacilityMoved` 寫入點
- **問題**：臨時工棚改版為「回合結束自動賣出 +2」後，`tempShedMoves` 欄位完全 write-only，永不被讀取
- **修法**：刪除所有定義與寫入點，註解 `onFacilityMoved` 標題從「臨時工棚/拆遷補償局/地皮炒家」改為「拆遷補償局/地皮炒家」

##### A5. 🟢 物流中心 R 級「每回合一次轉向」補完
- **位置**：BLDG/BLDG_RARITY/BLDG_TAGS/COMPOUND_EXCLUDE/KEYED_DATA_FIELDS/G 初始、`stepWithMover` redirect handler、render redirect 分支、Murphy 清空、`startTurn` 重置
- **缺漏**：xlsx 規格的「物流中心」(R) 在 code 中缺失，只有 `logistics_up/down/left/right`（固定方向）與 `transfer_hub/logistics_hub`（放置時決定方向）
- **修法**：
  - 新增 `logistics_center` BLDG（R 級，🔄 emoji，預設方向 right，`perTurnRotate:true` flag）
  - 新增 `G.cellRedirectDir = {'r,c': 'right'|'bottom'|'left'|'top'}`，加入 KEYED_DATA_FIELDS（隨設施移動、設施消滅時清除）
  - 新增 `G._logCenterRotated`（Set，每回合在 startTurn 重置）
  - redirect handler 在 `perTurnRotate` 設施被資源觸發時：使用 `cellRedirectDir[k] || b.dir` 作為當前方向，每回合最多旋轉一次（順序 → ↓ ← ↑ →）
  - render 顯示當前方向箭頭（➡️/⬇️/⬅️/⬆️）取代靜態 🔄
  - `deserializeGame` 為舊存檔初始化 `cellRedirectDir`

##### A6. 🟠 `MEGA_SIM_FX` 缺失電子系設施（巨型重播 + 戰鬥模式）
- **位置**：`MEGA_SIM_FX` 物件
- **問題**：`elec_shop / elec_factory / elec_conveyor / mega_elec_supply / convenience` 全缺，巨型設施重播與戰鬥模式 fallback 到 `b.fn`（identity）+ `b.out`（多為 null）→ **類型不會轉換**
- **使用者複現**：「電子商店不會把金錢換成原料」
- **修法**：補上 5 個 MEGA_SIM_FX handler，與 FACILITY_FX 行為對齊（`elec_conveyor` 跨 cell 累積機制簡化為 pass-through）

##### A7. 🔴 電子工廠 +2×N 計數未含蕾雅疊加
- **位置**：`onFacilityPlaced` 的 `elec_factory` 分支
- **問題**：`findCells((r,c,b)=>hasTag(b,'electronic')).length` 只看基底設施，**完全忽略 `cellOverlay`**。蕾雅疊加上去的電子工廠雖視為獨立設施，但這個計數不算
- **使用者複現**：「電子工廠與蕾雅配合時，將電子工廠重疊，但沒有把已經重疊的設施視為獨立設施」
- **修法**：補上 `eachCell((rr,cc)=>{ getOverlays(rr,cc).forEach(ovId=>{ if(hasTag(ovId,'electronic')) elecCount++; }); });` 補計疊加層（沿用 `countAllShops` 已驗證的寫法）

##### A8. 🔴 結束回合按鈕卡死於殘留 `phase='event'`
- **位置**：`doNext` 容錯條件、`render` 按鈕 enable 條件
- **問題**：`phase='event'` 在某些路徑（事件/商店/動作彈窗關閉時）未被正確 reset 為 `'place'/'done'`，殘留為 `'event'` 後 `doNext` 因 `phase!=='done'` 立即 return；按鈕 disabled 因 render 時序而呈現 `false`（看似可點），形成「按了沒反應」
- **使用者複現**：金手指獲得電子設施組合 + 蕾雅疊加 + 投入後無法結束回合（`G.phase==='event'` 但畫面無事件模態）
- **修法**：
  - 新增 `isAnyEventModalOpen()` 工具：檢查 `ev-banner` `.show` / `card-chooser` `display:flex` / `action-chooser` `display:flex`
  - `doNext` 容錯：`phase='event'` 時若無模態顯示 → 視為殘留狀態，強制 `phase='done'`
  - 按鈕 enable 條件 `_eventBlocking = phase==='event' && isAnyEventModalOpen()`，沒模態時不阻塞

#### B. 後續追蹤項目

##### B1. 🟠 電子商店疊加時升級加成被三次套用（價值 bug）
- **位置**：`FACILITY_FX.elec_shop` 內 `applyUpgradeBonus`、`applyOverlayPipeline` 對 overlay 再套用一次 `upgradeBonus`、overlay 自身的 FX 再呼叫 `applyUpgradeBonus`
- **症狀**：base elec_shop +2 升級的格子，疊加 1 個 elec_shop 時 +2 被套用 3 次（base FX、overlay FX、pipeline post-FX）
- **影響**：收益被高估；非阻塞性 bug
- **建議修法**：擇一：(a) overlay FX 跳過 `applyUpgradeBonus`、(b) `applyOverlayPipeline` 不對「自帶 applyUpgradeBonus 的 special」再加 `upgradeBonus`、(c) 用 flag 避免 double apply

---

### Session 19（2026-04-24）— desc/實作對照修復

#### A. 設施對照審查（共找 6 項真實不一致，本 session 處理 2 項）

審查所有 BLDG 條目的 desc 與 FACILITY_FX/MEGA_SIM_FX 實作。發現 6 項不一致，依設計確認結果先處理 #1（clearance/bulk_store 互換）。

| # | 設施 | 嚴重度 | 處理狀態 |
|---|---|---|---|
| 1 | `clearance` / `bulk_store` 機制混淆 | 🔴 | ✅ 本 session 修復 |
| 2 | `demolish_fab` 缺 +8 base 與廢墟計數 | 🔴 | ⏳ 待處理 |
| 3 | `talent_storage` 閾值/數值/類型 三項不符 | 🟠 | ⏳ 待處理 |
| 4 | `talent_market` 動態 3% vs 固定 -8/+4 | 🟠 | ⏳ 待處理 |
| 5 | `trade_port` 缺類型轉換、公式錯、無上限 | 🟠 | ⏳ 待處理 |
| 6 | `trade_zone` ×1.5 vs +2 永久 | 🟡 | ⏳ 待處理 |

#### B. clearance / bulk_store 機制互換（B 與 C）

##### B1. 問題
兩設施 desc 幾乎一字不差（「失一半 + 每 4 個 +8 + +4 累積 + 100 自毀」），但只有 `bulk_store` 的實作對齊 desc，`clearance` 的實作則是另一套無關的「商品 ×4 全部入收益、商品歸 1」。經 PM 確認：
- `clearance` 應該保持原 desc，實作補完
- `bulk_store` 改為新設計

##### B2. clearance 改動（`index.html:1238 / 4367`）
- BLDG 不變（desc 已正確）
- FX 重寫為「失一半 + 每 4 個 +bonusPer + bonusPer 永久 +4 累積 + ≥100 自毀」
- 收益沿用 `G.inv.clearanceBonus` 結算入帳機制（與舊版相容）
- 累積以 `G.bulkStoreBonus[k]` 存放（為避免遷移成本沿用變數名）

##### B3. bulk_store 改動（`index.html:1206 / 4025`）
- BLDG desc：`商店。商品→金錢+4。投入前每投入過一次工廠，再額外獲得收益+4。`
- BLDG 欄位：`out:'goods'` → `out:'money'`、`fn:v=>v` → `fn:v=>v+4`（供 mega_sim fallback 使用）
- FX 重寫：`商品→金錢+4`，掃描 `G.inv.facPath` 計算過往工廠數（factory + adv_factory），每次 +4 收益
- 移除 per-cell 累積機制（不再需要）

##### B4. MEGA_SIM_FX 同步
- `bulk_store(sim, mega, ctx)`：`商品→金錢+4`，過往設施數×4 加進 `ctx.bonusProfit`（簡化估算，無法精確區分工廠類型）
- `clearance(sim, mega, ctx)`：失一半 + 每 4 個 +8（簡化：mega 模擬不模擬永久累積）

#### C. 待處理（後續 session）
2、3、4、5、6 號設施需設計層確認意圖才動工。優先序建議：#2 `demolish_fab`（明確的設計 vs 實作脫節）→ #3 `talent_storage`（off-by-one 簡單 bug）→ #4/#5/#6（需設計確認）。

---

### Session 20（2026-04-24）— desc/實作對照修復（第 2 批）

承 Session 19 找到的 6 項不一致，逐項對齊（含設計者澄清的新行為）。

#### A. demolish_fab 建築廢料廠

##### A1. 修復內容
- desc 不變：「投入時消滅這個設施，你的最終收益獲得+8。投入前每投入一次廢墟，投入這個設施時額外獲得收益+2。」
- 移除舊實作的 `value ×2`（desc 沒寫，屬於錯誤副作用）
- 新增 `G.inv.ruinHits` 計數：在廢墟 handler 增加 `G.inv.ruinHits++`
- FX：`G.profit += 8 + ruinHits×2`、自毀、資源 value 不變

##### A2. 觸點
- `G.inv` 初始化加 `ruinHits:0`
- 廢墟 handler 加 `G.inv.ruinHits=(G.inv.ruinHits||0)+1`
- `FACILITY_FX.demolish_fab` 全部重寫

#### B. talent_storage 人材倉庫

##### B1. 修復內容（依 PM 釐清）
- desc 不變
- 機制：**回合開始時** 若持有 ≥4 人材 → 本回合此設施對任意資源 → 商品 +4
- 修正 off-by-one（4 而非 5）
- 修正 type 轉換（任意 → goods）
- 修正觸發時機（startTurn 設旗標而非通過時 dynamic check）

##### B2. 觸點
- `startTurn` 加 `G._talentStorageActive = (G.talentCards||0) >= 4`
- `FACILITY_FX.talent_storage` 重寫：active 才 type→goods、value+4；non-active 通過無效果

#### C. talent_market 人材市場

##### C1. 修復內容
- desc 不變：「投入金錢時 -8，獲得人材 +4。」
- type ≠ money 或 value < 8 → 略過（用 `fx.next`，不計 hit、不觸發疊加）
- 否則 value -= 8、`G.talentCards += 4`

##### C2. 設計議題
- 略過用 `fx.next` 還是 `fx.hit`：選 `fx.next` 對齊 elec_factory 等設施的「略過」慣例
- 不調用 `applyUpgradeBonus`：desc 沒提加成

#### D. trade_port 外貿港口

##### D1. 修復內容
- desc 不變：「這個設施無法被重疊。商品→金錢+2。投入商品時，每有一個商品，這個設施額外獲得+2收益，最高為當前收益目標的一半。」
- BLDG 調整：`out:'goods'` → `out:'money'`、`fn:v=>v` → `fn:v=>v+2`、新增 `noOverlay:true`
- FX：`商品→金錢+2`、bonus = `min(prevVal × 2, floor(G.goal / 2))` 加進 `G.profit`
- 上限「目標的一半」是「外貿港口本身單次貢獻」上限，與其他設施收益無關

##### D2. noOverlay 全域機制（同時涵蓋 trade_zone）
新增 BLDG 屬性 `noOverlay:true`，在以下位置攔截：
1. **蕾雅同設施疊加**：`G.grid[r][c]===bldgId&&hasPartner('leya')` 分支首檢
2. **物流之王/倉儲女王雙向疊加**：placing 端或 existing 端任一帶 `noOverlay` 即拒
3. **拖曳預覽 (`isLeyaUpgrade` / `isOverlay`)**：同樣檢查兩端 noOverlay
- 不需修改 `setOverlays`（內部呼叫，只在合法路徑觸發）
- 不影響 `mega_elec_supply` 自疊加（內部直接呼叫，不經 placeBldg 路徑）

##### D3. MEGA_SIM_FX.trade_port
- 加入：`商品→金錢+2`，過往設施數 ×2 加進 `ctx.bonusProfit`（mega 環境無 G.goal，省略上限）

#### E. trade_zone 貿易特區（依 PM 全面重新設計）

##### E1. desc/BLDG 改動
- **新 desc**：「商店。商品→金錢。周圍8格每有一個商店被設置，這個設施永久獲得+2。這個設施無法被重疊。」
- BLDG：`req:'any'` → `req:'goods'`、`out:null` → `out:'money'`、`fn:v=>v`、新增 `isShop:true`、`noOverlay:true`
- 標籤：本身就是商店，會被 `countAllShops()`、`isShopType()`、`findShop2x2()` 計入

##### E2. FACILITY_FX.trade_zone
- 移除舊「相鄰商店 ×1.5」邏輯
- 新邏輯：商品→金錢（value 不變）+ `applyUpgradeBonus`（永久 +2 寫在 bldgUpgrades）
- 非商品略過

##### E3. 永久 +2 的觸發時機（核心邏輯）
**規則**：周圍 8 格每有一個商店被設置或移入 → 此 trade_zone 永久 +2

| 情境 | 觸發點 | 處理 |
|---|---|---|
| 商店放置（含 trade_zone 自身） | `onFacilityPlaced(r,c,bldgId)` | 掃描 8 鄰居中所有 trade_zone +2 |
| trade_zone 自身被放置 | 同上 | 額外 +2（自身為商店，依 PM 規則）+ 掃描 8 鄰居既有商店各 +2 |
| 商店移動到 trade_zone 周圍 | `onFacilityMoved(r,c,sr,sc)` | 僅當「從非鄰接移入鄰接」才 +2（避免鄰接內位移重複觸發） |
| 商店移動離開 trade_zone | 同上 | 不扣回（永久） |
| trade_zone 自己移動 | 同上 | 不重新計算（避免移位刷加成漏洞） |
| 交換（兩端皆設施） | 同上 | 兩端都檢查 `_checkMovedShop`（避免漏算） |

##### E4. 排列模式延遲結算
PM 要求：「必須等拆遷隊的效果確認後，或者其他效果完成移動後才能結算」
- 新增 `G._tradeZonePending = []` 暫存待結算
- 通用入口 `_maybeAddTradeZoneBonus(zr,zc,reason)`：若 `G.freeRearrange` 為 true → push pending；否則直接寫入
- `confirmRearrange`：flush pending（依序 `_addTradeZoneBonus` + log）
- `cancelRearrange`：清空 pending（不結算）
- `deserializeGame`：刪除 `_tradeZonePending`（跨存檔不應殘留）

##### E5. MEGA_SIM_FX.trade_zone
- 簡化為純 `goods → money`；永久 +2 寫在 bldgUpgrades，由 `simFacilityPath` 主迴圈統一套用

##### E6. 輔助函式（新增於 onFacilityPlaced 上方）
- `_eachAdj8(r,c,fn)`：對 8 鄰居（不含自身）執行 fn
- `_isWithin8(r1,c1,r2,c2)`：Chebyshev 距離 = 1 判定
- `_addTradeZoneBonus(zr,zc,reason)`：直接 +2 與 log
- `_maybeAddTradeZoneBonus(zr,zc,reason)`：依 freeRearrange 決定立即 / 延遲

#### F. 後續追蹤項目（已處理）
- B1（電子商店升級加成三次套用）— ✅ 本 session 修復，見 G

#### G. B1 — 疊加 special FX 升級加成重複套用

##### G1. 問題重現
elec_shop 格子 `bldgUpgrades = +2`，蕾雅疊加一個 elec_shop 上去。投入 money 9：
- Base FX: money 9 → material 9 → applyUpgradeBonus +2 → material 11
- Pipeline iterates overlay:
  - Overlay FX: material 11 → money 13 → applyUpgradeBonus +2 → money 15
  - Pipeline post-FX: el.value += upgradeBonus(2) → money 17
- 結果：+2 套用 **3 次**（base FX、overlay FX、pipeline post-FX）

##### G2. 修法（最小改動 / 全域旗標）
新增 `let _inOverlayCtx = false;`（宣告於 `applyOverlayPipeline` 之前避免 TDZ）
- `applyUpgradeBonus(r, c, val, bName)`：開頭加 `if(_inOverlayCtx) return val;` — overlay 中為 no-op
- `applyOverlayPipeline`：呼叫 overlay FX 前後設置/還原旗標
- pipeline post-FX 仍照常套用 `upgradeBonus`，所以每個「設施實例」（base + 每個 overlay）剛好套用一次

##### G3. 修復後行為
- 1 base + 1 overlay：每個實例各 +2 = 共 +4 (vs 修復前 +6)
- 1 base + N overlays：(N+1) × 2

##### G4. 影響範圍
- 16 個 special FX 內部呼叫 `applyUpgradeBonus(fx.r, fx.c, ...)` — 全部受惠
- 沒呼叫 applyUpgradeBonus 的 special FX（如 `small_shop`、`scalper`、`dept_store` 等）行為不變（這些 base context 本來就沒套 upgrade，是另一個既有議題，不在本 session 範圍）
- redirect 設施有自己的 upgrade 邏輯（line 4842 條件：`_hasOverlay ? 0 : ...`），不經 `applyUpgradeBonus`，不受影響

---

### Session 21（2026-04-24）— 中央詞條設施全面對齊

依 PM 指示審查 8 個中央 tag 設施，發現 4 項不一致並修復。

#### A. 移除 trade_hub / tech_lab（重複舊版）

##### A1. 問題
- `trade_hub`（外部貿易代理 R 級）與 `center_trade`（中央貿易代理 SSR 級）desc 幾乎相同但實作差異大（前者 +1% 變動、後者 +4 固定，且舊版缺 material 分支）
- `tech_lab`（科技研發中心 R 級）與 `center_tech`（中央科技研發 SSR 級）同樣情況
- PM 確認：舊版（trade_hub / tech_lab）已被新版（center_trade / center_tech）取代，應移除

##### A2. 修法
- 從 `BLDG` / `BLDG_RARITY` / `TAGS` / `FACILITY_FX` / `MEGA_SIM_FX` / `COMPOUND_EXCLUDE` 全部移除
- `deserializeGame` 加入舊存檔遷移：`trade_hub` cells → `center_trade`、`tech_lab` cells → `center_tech`

#### B. 中央監督局判定改為 per-cell（依 PM 釐清）

##### B1. 問題
desc 寫「此回合沒有資源投入時，每經過一個 X，最終收益 +2」。PM 釐清：「沒有資源投入」指「沒有資源投入**此設施**（per-cell）」，並非「整個 invest 沒命中設施」（per-send）。

##### B2. 舊實作（錯）
```js
if((G.inv.facHit||0)===0){  // per-send 全域判定
  // 觸發
}
```

##### B3. 新實作
- 新增兩個 per-turn Set：
  - `G._bureauHitThisTurn`：本回合被資源投入過的監督局格子
  - `G._bureauFiredThisTurn`：本回合已觸發加成的格子（防同回合多次 send 重複）
- 三個 bureau FX (`center_factory_bureau` / `center_shop_bureau` / `center_mat_bureau`) 通過時 `_bureauHitThisTurn.add(cellKey)`
- finish() 改為 per-cell 判定：cell 不在 `_bureauHitThisTurn` 且不在 `_bureauFiredThisTurn` → 觸發 + 加入 fired
- startTurn 重置兩個 Set

##### B4. 順帶釐清
- `_shop` 計數沿用 `countAllShops()`（含疊加層商店，正確）
- `factory` 計數含 `factory + adv_factory`、`mat` 計數含 `mat_factory + adv_mat_factory`（沿用舊邏輯，正確）

#### C. center_elec_net 中央建築疊加（依 PM 全面實作）

##### C1. desc 重新解讀
「你可以將中央建築蓋在此設施上」原本完全沒實作。PM 釐清：
- 擁有「中央」(center) tag 的建築都可以**直接**疊在 `center_elec_net` 上（無需合夥人）
- 阿北 (logistics_king) / 倉儲女王 (storage_queen)：可在現有規則上額外疊加物流中心，但**總疊加數不超過該合夥人的層數上限**（阿北 1、倉儲女王 2）
- 蕾雅 (leya)：
  - center_elec_net 同名可以重疊（蕾雅機制）
  - 中央建築疊在 center_elec_net 上後，那些**同名**建築也可以疊加（蕾雅疊加路徑要支援「base 或既有 overlay 同名」）

##### C2. 新增疊加路徑
位置：placeBldg 中、蕾雅同名疊加之後、廢墟紀念碑之前
```js
if(G.grid[r][c]==='center_elec_net' && hasTag(bldgId,'center') && bldgId!=='center_elec_net'){
  if(BLDG[bldgId].noOverlay) return false;
  const _maxOv=hasPartner('storage_queen')?2:1;
  if(_ovs.length>=_maxOv) return false;
  // 疊加並呼叫 onFacilityPlaced
}
```
- 自身（center_elec_net）疊在 center_elec_net 上：透過蕾雅同名路徑，不走此路徑（避免與蕾雅獎勵重疊）
- noOverlay 設施（trade_port / trade_zone）即使有 center tag 也擋下

##### C3. 蕾雅同名疊加擴展
- 條件由 `G.grid[r][c]===bldgId` 擴展為 `G.grid[r][c]===bldgId || getOverlays(r,c).includes(bldgId)`
- 支援「中央建築先疊在 center_elec_net 上 → 蕾雅可繼續同名疊加」的情境

##### C4. 拖曳預覽更新
- `isLeyaUpgrade` 加入 `_ovsAtCell.includes(bldgDragging)` 條件
- 新增 `isCenterNetOverlay` 條件，視覺反饋（橘色光暈）

##### C5. 層數合併計算
所有疊加機制共用 `_maxOv = storage_queen ? 2 : 1`：
- 無合夥人 + center_elec_net 上：1 層
- 阿北：1 層（與物流疊加共用）
- 倉儲女王：2 層（與物流疊加共用）
- 蕾雅：無上限（蕾雅同名疊加機制本身不檢查層數）

---

### Session 22（2026-04-24）— 電子系設施全面驗證

#### A. 發現

5 個電子系設施對照後，3 ✅、1 🔴（死碼）、1 🟡（規格落差）：

| # | 設施 | 狀態 |
|---|---|---|
| 1 | `elec_factory` 電子工廠 | ✅ 之前 Session 已對齊 |
| 2 | `elec_conveyor` 電子輸送帶 | 🔴 **完全死碼** — 從未對任何電子設施生效 |
| 3 | `elec_shop` 電子商店 | ✅ 之前 Session 已對齊 |
| 4 | `mega_elec_supply` 大型電子供給站 | 🟡 自疊加邏輯不符 PM 規格（cumulative vs per-turn） |
| 5 | `center_elec_net` 中央電子網路 | ✅ 之前 Session 已對齊 |

#### B. elec_conveyor 死碼 + 規格不全（重大修復）

##### B1. 死碼根因
舊實作 `if(G.inv._elecConveyorActive&&hasTag(bId,'electronic'))` 在 `index.html:4940`，**位於通用 fn 處理器內**。但所有電子設施都是 special FX，FX 結束時 `if(_fxDone) return;` 在 4813 提前 return → 通用處理器永遠不執行。通用處理器處理的非 special 設施全部不是電子，`hasTag(...,'electronic')` 永遠 false。**結論：conveyor 從來沒給任何設施 +2。**

##### B2. PM 規格（新）
- 下一個設施若是電子 → 該電子設施 +2 永久
- 下一個設施若是非電子 → 效果浪費，不轉移到後續電子設施
- 下一個設施重疊多個電子 → **每一個電子實例**都獲得 +2
- 下一個設施基底非電子但疊加有電子 → **只有那些電子實例**獲得 +2

##### B3. 新增 `G.bldgUpgradesElec` 欄位
- per-cell 加成池，**只有電子實例（基底或疊加）才吃**
- 加入 `KEYED_DATA_FIELDS`（隨設施移動、設施消滅時清除）
- G 初始 / `deserializeGame` 補初始化（舊存檔相容）

##### B4. `applyUpgradeBonus` 修改
```js
const baseBId = G.grid[r] && G.grid[r][c];
if(baseBId && hasTag(baseBId,'electronic')){
  upg += (G.bldgUpgradesElec?.[key]||0);
}
```

##### B5. `applyOverlayPipeline` 修改
post-FX cell 加成步驟，每個 overlay 額外檢查：
```js
let totalFixed = cellMod + upgradeBonus;
if(hasTag(ovId,'electronic')){
  totalFixed += (G.bldgUpgradesElec?.[k]||0);
}
```

##### B6. conveyor 觸發點移動
- 從 `stepWithMover` 通用處理器內（line 4940，死碼）移到 `if(bId)` block 起始處、special FX dispatch 之前
- 邏輯：掃 base + overlays，列出所有電子實例名稱；有 → `bldgUpgradesElec += 2`；無 → log「效果浪費」；旗標一律消耗

##### B7. cell 顯示更新
基底為電子時，`baseBonus` 加上 `bldgUpgradesElec`，顯示完整加成

#### C. mega_elec_supply 自疊加（依 PM 全面解釋）

##### C1. PM 解釋
- 回合 1：[A] (僅基底) → A 沒被覆蓋 → 加 B → [A, B]
- 回合 2：[A, B] → topmost B 沒被覆蓋 → 加 C → [A, B, C]
- 每回合 +1 個 overlay（topmost 觸發）

##### C2. 舊實作（錯）
```js
if(getOverlays(mr,mc).length>0) return;  // 只要有任何 overlay 就不疊
```
結果：永遠最多 1 層，不符 PM 設計

##### C3. 新實作
```js
const ovs = getOverlays(mr,mc);
const topmost = ovs.length>0 ? ovs[ovs.length-1] : G.grid[mr][mc];
if(topmost !== 'mega_elec_supply') return;  // topmost 已被別的疊加機制接管則不堆疊
ovs.push('mega_elec_supply');
setOverlays(mr,mc,ovs);
```
- 每回合對每格 mega_elec_supply +1 個 overlay
- 守備：若 topmost 已被其他疊加機制（如蕾雅疊加其他建築）接管，停止堆疊
- 注意：無上限，理論上可無限堆疊（SSR 級設計，由玩家自行決定要不要場上一直留著）

---

### Session 23（2026-04-24）— 大型系設施全面驗證

依 PM 指示審查大型系 4 個設施（含已修過的 mega_elec_supply 共 5 個）。發現多項缺漏並補完。

#### A. dept_store / mega_elec_supply 補旗標
舊狀態：兩設施 desc 寫「大型」「不會被消滅」，但 BLDG 缺旗標：
- `dept_store`：缺 `isLarge` + `indestructible` → 不進入「只能 1 個大型」限制、destroyFacility 不擋下
- `mega_elec_supply`：缺 `isLarge` → 不進入大型限制

修法：
- `dept_store` 加 `isLarge:true` + `indestructible:true`
- `mega_elec_supply` 加 `isLarge:true`（desc 沒明寫不會消滅，不加 indestructible）

#### B. dept_store FX 改為 desc 字面三段鏈

##### B1. 舊實作
公式：`value × 2 → +2%`（×2 + 2% 加成），跟 desc 完全脫鉤

##### B2. 新實作
依 desc「商品→金錢+8 → 商品+8 → 金錢+8」三段鏈：
```js
const step1 = prev + 8;       // goods → money +8
const step2 = step1 + 8;      // money → goods +8
let nv = step2 + 8;           // goods → money +8
```
總增量固定 24，最終 type=money。保留 2×2 cell 加成聚合（`cellMods`/`bldgUpgrades`/`cellPctMods`/`leyaPctMods`）

##### B3. MEGA_SIM_FX.dept_store 同步
`sim.value += 24; sim.type = 'money';`

#### C. ancient_factory「視為 4 工廠」+ 2×2 工廠檢查（依 PM 規格）

##### C1. PM 規格
- **設置**：必須蓋在 2×2 的工廠（factory / adv_factory）區域上
- **計數**：在「場上工廠數」計算時算 4 個（如中央工廠監督局）
- **投入**：投入路徑經過時只算 1 個工廠（不重複）

##### C2. 新增 `ancient_factory_part` BLDG（類比 dept_store_part）
```js
ancient_factory_part:{
  name:'古代的機械工廠', emoji:'🏛',
  desc:'古代機械工廠的一部分',
  req:null, out:null, fn:v=>v,
  special:'ancient_factory_part',
  indestructible:true
}
```
加入 BLDG_TAGS（`['large','production']`）與 COMPOUND_EXCLUDE。

##### C3. 新增 `findFactory2x2` 與 `placeAncientFactory`
類比 `findShop2x2` / `placeDeptStore`：
- `findFactory2x2(r, c)`：找 4 格都是 factory/adv_factory 的 2×2
- `placeAncientFactory(r, c, anchor)`：anchor 占左上、其餘 3 格為 `ancient_factory_part`

##### C4. placeBldg 路徑擴展
`needs2x2` 分支加入 `isAncient` 條件分支，調用 `findFactory2x2` + `placeAncientFactory`。大財團（`big_corp`）仍可取代任意 2×2 區域。

##### C5. ancient_factory_part FX
`fx.next(200)` — passthrough，不計入 facHit / facPath（不會重複觸發 ancient_factory 效果）

##### C6. 計數邏輯
- **「場上工廠數」**（中央工廠監督局 finish）：targets 加入 `'ancient_factory'` 和 `'ancient_factory_part'` → 4 cells × 1 = 4 工廠 ✓
- **「投入路徑經過工廠數」**（古代機械工廠自身 finish 加成）：filter 加入 `'ancient_factory'`（不含 part，因為 part 是 fx.next 不進 facPath）→ 經過 ancient_factory 算 1 次 ✓

#### D. world_wonder / giant_village
- `world_wonder`：✅ 對齊（`finish` 中 `tc * 8` 加成正確）
- `giant_village`：🟡 desc 模糊（「人材為 0」是條件還是動作？實作走「重置為 8」），PM 未答覆，本 session 暫不動

#### E. 邊界備註（未處理）
- ancient_factory + 3 part 在 Murphy 事件被打亂時可能分裂（與 dept_store 同樣問題）。indestructible 旗標只擋 destroyFacility，不擋 Murphy。如需處理需新增 anchor/parts 對應追蹤。本 session 不處理，作為已知邊界。

---

### Session 24（2026-04-24）— 人力系設施全面驗證

11 個人力設施審查（含已修過的 talent_storage / talent_market / giant_village 共 11 個）。發現 3 項問題，全數修復。

#### A. 通用規則（PM 確認）
**「投入時」如未特別說明，皆視為「投入此設施時」**。各設施 desc 解讀以此為準。

#### B. talent_bank 人力銀行 — 觸發條件改為玩家主動投入

##### B1. 舊實作問題
desc：「投入 2 人材，下回合開始時 +4 人材」
舊實作：資源每次通過 talent_bank → 自動消耗 G.talentCards 2 張 → 預約 +4
- 違反「投入此設施時」規則：自動消耗任意人材，與設施位置無關

##### B2. 新實作
- **per-cell 計數**：新增 `G.talentBankCount` 欄位（加入 KEYED_DATA_FIELDS、G init、deserializeGame）
- **觸發點**：`onTalentDropCell(r, c)` 末段加入 talent_bank 檢查
- **邏輯**：每次玩家投入人材到 talent_bank cell 時 `talentBankCount[r,c] += 1`；達到 2 時 `-= 2` 並 `_talentBankPending += 4`
- **FX 改為 passthrough**：資源通過時不消耗人材，僅 log 顯示當前累計

##### B3. 跨回合性
`talentBankCount` 不重置（持續累計），玩家可跨回合分批投入 2 人材觸發。

#### C. dispatch_hq 派遣總部 — 去除 goods 限制

##### C1. 問題
desc：「此回合投入 8 人材時，使場上所有設施投入 2 人材」
舊實作：限 `fx.el.type === 'goods'` 才觸發 + BLDG `req:'goods'`
- desc 完全沒寫此限制

##### C2. 修法
- BLDG：`req:'goods'` → `req:'any'`、`out:'goods'` → `out:null`
- FX：移除 `if(fx.el.type !== 'goods') return;`
- 維持原本「場上設施 cellMods += 2」實作（等同「投入 2 人材」的 value 加成效果，但不觸發合夥人連鎖）

#### D. staff_housing 員工住宅 — per-turn 判定（防多 send 重複）

##### D1. 舊實作問題
- 用 `G.inv._staffHousingHit`（per-send Set）
- finish 觸發 → 同回合多次 send 各別 finish 都會給 +4 人材

##### D2. 新實作（同 bureau pattern）
- 新增 `G._staffHousingHitThisTurn`（per-turn Set）+ `G._staffHousingFiredThisTurn`（防同回合多 send 重複）
- 兩個 Set 在 startTurn 重置
- FX 通過時 `_staffHousingHitThisTurn.add(cellKey)`
- finish 檢查：cell 不在 HitThisTurn 且不在 FiredThisTurn → +4 人材 + 加入 FiredThisTurn

#### E. 其餘人力設施結果

✅ 一致：
| 設施 | 機制 |
|---|---|
| `talent_training` 人力訓練中心 | startTurn 每格 +1 人材 |
| `labor_convert` 勞動轉換站 | 每投入 2 人材 → 通過時 value +4 |
| `overtime` 加班辦公室 | 每投入 2 人材 → 通過時 value +8 |
| `strike_board` 集體罷工台 | 投入時失一半人材，每個 value +8 |
| `cafeteria` 員工食堂 | 商品通過 +1 人材（可被「重大食安」buff 失效） |
| `staffing` 人力派遣 | 金錢通過 +1 人材（不消耗 value） |

#### F. 待釐清（未處理）
- `giant_village` 巨人村「人材為 0，獲得 +8 人材」desc 仍模糊（條件 vs 動作），PM 未答覆，本 session 暫不動

---

### Session 25（2026-04-24）— 拆遷系設施全面驗證

11 個拆遷系設施審查（含已修過的 demolish_fab 共 11 個）。發現多項問題並全數修復。

#### A. dynamic_amp 動態加強器 — 完全重做

##### A1. 舊實作問題
- BLDG `req:'any', out:null, fn:v=>v`（沒換成金錢）
- FX 用 `turnFacMoved`（場上總移動數）×2，與此設施無關

##### A2. 新實作（依 PM 規格）
- BLDG `out:'money', fn:v=>v+4`（任意→金錢+4 base）
- 新增 `G.dynamicAmpMoves = {[r,c]: count}`：per-cell 本回合被移動次數
- onFacilityMoved 兩端都檢查：若是 dynamic_amp 則對該 cell key 計數 +1
- FX：`value += 4 + moves×4`、type='money'
- startTurn 重置 dynamicAmpMoves

#### B. unstable_base 地基不穩定站 — 完全重做

##### B1. 舊實作問題
- 完全沒「交換位置」邏輯
- 而是檢查相鄰 cellMods 正/負，調整自身 value（×2 if neg, -1 if pos）

##### B2. 新實作（依 PM 規格）
- 通過時：找周圍 4 格設施（排除大型/part），shuffle 後兩兩配對交換位置
- 每對交換：swapCellData + 各自 onFacilityMoved 觸發連鎖效果（拆遷補償局/動態加強器計數等）
- 兩格本回合 cellMods += 2（下回合自動清除，符合 desc「下回合清除」）
- 奇數時最後一個落單

#### C. magnet_plate 磁力板 — 排除大型設施

##### C1. 修法
舊：只排除 `dept_store`/`dept_store_part`
新：排除所有 `isLarge:true` 設施 + `dept_store_part` + `ancient_factory_part`
- 涵蓋 `dept_store / mega_elec_supply / giant_village / ancient_factory / world_wonder` 與其 part

#### D. ruin_monument 廢墟紀念碑 — 改為 G.profit 直接收益

##### D1. 修法
- BLDG `fn:v=>v+4` → `fn:v=>v`（避免 mega_sim fallback 加值）
- FX：原本 `value += ruinN*4`（加到通過資源 value），改為 `G.profit += ruinN*4` + `profitFlyFromCell` 動畫
- 符合 desc「獲得**收益**」字面語意

#### E. disaster_bureau 災害控管局 — per-turn fix

##### E1. 舊實作問題
用 `G.inv._facilitiesDestroyedThisTurn`（per-send Set）。每次 send 各自結算。

##### E2. 修法
- 新增 `G._facilitiesDestroyedThisTurn`（per-turn 累計）+ `G._disasterBureauFiredThisTurn`（防多 send 重複）
- destroyFacility 三個寫入點全部改寫到 G._facilitiesDestroyedThisTurn
- finish 檢查 fired 旗標
- startTurn 重置兩者

#### F. mobile_city 移動都市 — UI 完整化

##### F1. 舊實作問題
- 按鈕標題寫「未使用」，給人停用感
- 模式內只能交換一次（首次成功就 `_mobileCityUsedThisTurn=true`）
- 沒有視覺提示哪些格子可移動
- 沒有「完成移動」按鈕

##### F2. 新實作（依 PM 規格）
**視覺提示**：
- 未使用且場上有 mobile_city → mobile_city 自身 `upgrade-glow`（外框發光）
- 模式中 → 周圍 8 格的可移動設施全部 `upgrade-glow`
- 已選 src → src 顯示 `move-src`

**操作流程**：
- 啟動模式：點按鈕「🏙 啟動移動都市」（btn-glow 強調）
- 點第一個設施 → 選為 src
- 點第二個格子 → 交換 + 計數 +1
- 可繼續多次交換（只要 src 與 dst 都在範圍內）
- 按「✅ 完成移動 (N)」結束 + `_mobileCityUsedThisTurn=true`
- 或按「🏙 取消」結束（不算用過）

**規則**：
- 只能在 mobile_city 周圍 8 格內互相交換
- 不能移動 mobile_city 自身
- 不能移動大型設施與其 part（`isLarge` / `dept_store_part` / `ancient_factory_part`）
- 每次交換各自觸發 onFacilityMoved（拆遷補償局/動態加強器/貿易特區商店搬入加成都會生效）

##### F3. 計數
- `G._mobileCityMoveCount` per-turn 計數，按鈕顯示總交換次數
- startTurn 重置

#### G. 其他驗證結果（無需改）
| 設施 | 狀態 |
|---|---|
| `bomb_device` 爆破裝置 | ✅ startTurn 倒數 3 回合 → 消滅自己 + 隨機相鄰 |
| `temp_shed` 臨時工棚 | ✅ doNext 自動賣出 +2 + 隨機賣廢墟 +2 |
| `demolish_bureau` 拆遷補償局 | ✅ onFacilityMoved/destroyFacility 觸發 +4，freeRearrange 整段 1 次 |
| `scrap_city` 廢鐵城 | ✅ destroyFacility 三點寫入 _scrapCity.x；finish 賣廢墟給 +x 收益 |
| `demolish_fab` 建築廢料廠 | ✅ Session 20 修過 |

---

### Session 26（2026-04-24）— 物流系設施全面驗證 + 全域 desc 解讀規則確立

#### A. 全域 desc 解讀規則（PM 確認）

| 文本寫法 | 實作對應 |
|---|---|
| **「投入時」** | 視為「投入此設施時」 |
| **「獲得 +N」** | 投入資源 value += N（per-pass）|
| **「獲得收益 +N」** | `G.profit += N`（直接收益）|
| **「永久獲得 +N」** | `G.bldgUpgrades += N`（持久跨回合）|
| **「本回合獲得 +N」** | `G.cellMods += N`（本回合所有經過皆吃）|

> 此規則為所有設施 desc 解讀依據；之前 Session 中的修法（廢墟紀念碑、清倉拍賣場、量販店、貿易特區、電子工廠、電子輸送帶、外貿港口…）皆已套用。

#### B. 物流放大器 死碼修復（同電子輸送帶手法）

##### B1. 舊實作問題
- `G.inv.ampAct` 消費點在 `stepWithMover` 通用 fn 處理器 (`index.html:5053`)
- 所有特殊 FX 設施都在 `if(_fxDone) return;` 早 return，永遠走不到通用處理器
- 物流放大器 +8 buff 對特殊設施（電子系、終點站、螺旋物流站、商店…）全部失效

##### B2. 修法
- 觸發點移到 `if(bId)` 起始、special FX dispatch 之前
- 任何下一格設施（含 special）都吃到 +8 value（per-pass）
- 旗標一律消耗
- 移除舊死碼

#### C. 螺旋物流站 重做

##### C1. 舊實作問題
- BLDG `req:'any'` 但 desc 寫「商品→商品」（暗示限商品）
- 「獲得 +2 收益」實作為 value += facHit×2（應該是 G.profit）

##### C2. 新實作（依 PM 規格）
- BLDG `req:'goods', out:'goods', fn:v=>v`（限商品輸入；商品數量不變）
- FX：非商品 → fx.next 略過；商品 → `G.profit += facHit × 2` + 飛行動畫
- MEGA_SIM_FX 同步：`if goods, ctx.bonusProfit += facHit*2`

#### D. 其他物流設施驗證結果（無需改）
| 設施 | 狀態 |
|---|---|
| 終點站 | ✅ desc「+4」(無收益) → value+=facHit*4 對齊 |
| 環境感應站 | ✅ desc「+2」(無收益) → value+=adjCount*2 對齊 |
| 物流倉 | ✅ desc「+8 收益」→ G.profit+=8 對齊 |
| 速遞站 | ✅ flag-based 重複觸發；對 redirect 自然失效（buff 浪費可接受）|
| 轉運中心 / 物流轉運中心 | ✅ 放置時 picker 改為方向變體 |
| 物流中心 | ✅ Session 22 已修 |
| 物流↑↓←→ | ✅ 純方向變體 |

---

### Session 27（2026-04-24）— 貿易系設施全面驗證

5 個剩餘貿易系設施審查（其餘已修過：trade_port S20 / trade_zone S20 / clearance S20 / center_trade S21）。

#### A. 期貨交易所 完全重做（依 PM 規格）

##### A1. 舊實作問題
- BLDG `req:'any'`，沒 `noOverlay:true`
- FX 用 `G.futuresPct[k]`：-10~+10 **百分比**（負值！）→ value × pct%
- 標記 `_futuresMoveNext`：下回合自動移動到隨機空格（desc 沒寫）
- 整個機制與 desc 完全脫鉤

##### A2. PM 規格
- 「**回合開始時**獲得 +0/+2/+4/+8（隨機）」— 固定值候選，無負值
- 「**每次投入商品時**重新觸發一次抽選，再加到通過資源 value」— re-roll then apply
- 下回合重置（自然由 startTurn 重抽達成）
- 「無法被重疊」

##### A3. 新實作
- BLDG `req:'goods', out:'goods', fn:v=>v, noOverlay:true`
- 新欄位 `G.futuresValue` 取代舊 `G.futuresPct`
  - 加入 KEYED_DATA_FIELDS（隨設施移動、消滅時清除）
  - G init / deserializeGame 補初始化（舊存檔自動轉空）
  - `delete data.futuresPct` 清掉舊欄位
- 放置時：抽選 `[0,2,4,8]` 之一寫入 futuresValue
- FX：
  - 非商品 → 略過（fx.next）
  - 商品 → re-roll futuresValue + value += futuresValue + fx.hit
- startTurn：每格 futures_market 重抽
- 移除 `_futuresMoveNext` 整段邏輯（自動移動 + 對應重抽）
- 渲染顯示 +N（無負值，單一顏色）
- tooltip 顯示「本回合期貨：+N（投入商品時會重抽）」
- MEGA_SIM_FX 同步：商品輸入 → 加上隨機 0/2/4/8

#### B. 匯率波動板 加 noOverlay
- BLDG 補 `noOverlay:true`
- 其他機制無變動（隨機 ±2 重複場上設施數量，加到 value）

#### C. 其餘貿易系驗證結果（無需改）
| 設施 | 狀態 |
|---|---|
| 進出口稅站 | ✅ 商品/金錢 ±4 + 物流計數 ×2 加值 對齊 desc |
| 自由市場 | ✅ 純 fn 處理（任意→金錢，值不變） |
| 稅務局 | ✅ startTurn 隨機升級 +1；finish 扣本回合增量 10% |

---

### Session 28（2026-04-24）— 電子合夥人全面驗證

4 個電子詞條合夥人審查，發現 1 個死碼 + 1 個範圍漏洞。

#### A. 電子放電惡魔 死碼修復（同 elec_conveyor / logistics_amp 根因）

##### A1. 舊實作問題
追蹤點 `G.inv._elecHits / _nonElecHits` 寫在 `stepWithMover` 通用 fn 處理器內（原 line 5049）。但所有 special FX 設施（**包含全部電子設施** elec_factory / elec_conveyor / elec_shop / mega_elec_supply / center_elec_net、終點站、廢墟紀念碑、商店類等）都在 `if(_fxDone) return;` 早 return，**永遠走不到通用處理器**。

**後果**：
- 通過電子工廠等 special 電子設施 → 不算電子命中（+2 收益拿不到）
- 通過終點站等 special 非電子設施 → 不算非電子命中（-2 也不會扣）
- 只有純 fn 設施（factory / shop / mat_factory / refinery / warehouse / booster / converter）會被計入

##### A2. 新實作（依 PM 規格）
- 追蹤點移到 `if(bId)` 起始後、special FX dispatch 之前
- **base + 每個 overlay 分別計算**（PM 明確指示：物流中心疊加電子設施也會被扣非電子收益、加電子收益）
- 不看 type，不看 special 類型，只看 `hasTag(id, 'electronic')` 判定

##### A3. 範例
| 場景 | 電子命中 | 非電子命中 |
|---|---|---|
| 通過純 factory | 0 | 1 |
| 通過 elec_factory 基底 | 1 | 0 |
| 通過 logistics_up 基底 + 2 個蕾雅疊加 elec_shop | 0（redirect 非電子）→ 1 非電子 | 同上 |
| 通過 logistics_up 基底 + 2 個 elec_shop 疊加 | **+2 電子命中**（2 overlay）+ **+1 非電子命中**（基底）| 綜合 +4 收益 - 2 收益 = +2 |

#### B. 雷電法王 擴展電子設施抽選池

##### B1. 舊實作
抽選池硬寫 `['elec_factory','elec_conveyor','elec_shop']`，漏掉 `mega_elec_supply` 與 `center_elec_net`。

##### B2. 新實作（依 PM 選 B）
改為動態抽選：`Object.keys(BLDG).filter(id => hasTag(id,'electronic') && !id.endsWith('_part'))`
- 包含全部 5 個電子設施
- 排除 part（雖目前無電子 part，防未來擴展）
- 若抽到 mega_elec_supply（需 2×2）或 center_elec_net（需中央格），卡片進手牌可能暫時放不下 — 屬設計特性

#### C. 其餘電子合夥人驗證結果（無需改）
| 合夥人 | 機制 |
|---|---|
| 電子精工師 | ✅ startTurn 計數 +1，≥3 觸發 addHand('elec_factory') |
| 訪問網路碼語者 | ✅ startTurn addHand('center_elec_net')；onSettle G.profit -= 4 |

---

### Session 29（2026-04-24）— 物流合夥人全面驗證

7 個物流詞條合夥人審查。5 ✅ 對齊、2 desc 修正（實作不動）。

#### A. 重建驛站 desc 修正（PM 確認：實作正確，desc 錯字）

##### A1. 舊 desc
「驛站計數 ≥3 時，消耗所有驛站計數，**這個設施獲得一次**將廢墟變成螺旋物流站。」

##### A2. 新 desc
「驛站計數 ≥3 時，消耗所有驛站計數，**這個合夥人獲得一次**將廢墟變成螺旋物流站**的效果**。」
- 修正「設施」→「合夥人」
- 補「的效果」釐清「獲得一次」=自動觸發 1 次效果（非玩家可控使用）

##### A3. 實作（不變）
`processCountTrigger('relay_station')`：達 3 → count=0 + 隨機選一個廢墟 → `G.grid[r][c]='spiral_hub'` + ruinCells 清除。自動觸發，無玩家選擇。

#### B. 全能會計師 desc 修正（PM 確認：保留每回合上限 1）

##### B1. 舊 desc
「**每次**你獲得一個計數時，這個合夥人獲得一個全能計數。」

##### B2. 新 desc
「**每回合最多獲得 1 次**全能計數（任意計數來源觸發）。」
- 明確寫出每回合上限 1 的限制
- 跟現行 `G._omniGainedThisTurn` flag 對齊

##### B3. 實作（不變）
`gainOmniCount()` 在 elec_artisan / thunder_king / relay_station / spread_demon / logistics_vault 等計數來源被呼叫；`_omniGainedThisTurn` flag 擋下本回合第 2 次以上觸發。

#### C. 全域規則：計數消耗（PM 確認）

依 desc 文字決定消耗邏輯：
| desc 寫法 | 實作 |
|---|---|
| 「**消耗所有**」 | `st.count = 0` |
| 「**消耗 N 個**」 | `st.count -= N`（保留多餘計數） |

現行各合夥人符合規則：
- 重建驛站 / 電子精工師 / 雷電法王 / 擴散惡魔：desc「消耗所有」→ `count = 0` ✓
- 拆遷隊：desc「消耗 3」→ `count -= 3`（保留多餘）✓

#### D. 其餘物流合夥人驗證結果（無需改）
| 合夥人 | 機制 |
|---|---|
| 運輸大亨 | ✅ redirect FX +3 value、logHits++；onSettle 無 logHits 時 -50% |
| 倉儲女王 | ✅ placeBldg 路徑允許 maxOv=2 疊加 |
| 路線規劃師 | ✅ startTurn 設 `_freeMoveLogistics=true` |
| 快遞達人 | ✅ onSettle 通過格 > 4 時，每多 1 格 +4 收益 |
| 阿北，物流之王 | ✅ placeBldg 路徑 maxOv=1 疊加 |

---

### Session 30（2026-04-24）— 貿易合夥人全面驗證

5 個貿易詞條合夥人審查：3 ✅ 對齊、1 死碼修復、1 desc 更新。

#### A. 外匯交易員 死碼修復 + desc 更新

##### A1. 舊問題
追蹤點 `G.inv._forexMoneyCount++` 寫在 stepWithMover 通用 fn 處理器（`index.html:5173`）。跟先前修過的同類問題（logistics_amp / elec_conveyor / elec_discharge_demon）一樣：所有 special FX 設施早 return，通用處理器不執行。實質上 `_forexMoneyCount` 永遠為 0，onSettle 從未觸發過。

##### A2. PM 提供新 desc
「金錢→金錢+4。**金錢投入任意設施時獲得+4 或者 -2 收益**，此回合每次以金錢投入任意設施時，這個效果就觸發 2 次。」

##### A3. 新實作
- 追蹤點移到 `if(bId)` 起始後、special FX dispatch 之前
- 條件：`hasPartner('forex_trader') && el.type === 'money'`（此時 el.type 是進入 cell 前的類型）
- per-cell 計數（不另計 overlay）
- onSettle 保持原邏輯：count × 2 triggers，每 trigger 隨機 +4 或 -2 到 G.profit

#### B. 套利者 desc 改用 X 標記

##### B1. PM 確認
- 「那個值 +2X，之後使 X+1」
- X 初始為 1，跨回合永久累積

##### B2. 新 desc
「此回合金錢→商品且商品→金錢後，那個值+2X，之後使X+1（X 初始為 1，跨回合永久累積）。」

##### B3. 實作（數學等價，變數改名為 `x`）
- `partnerState.arbitrageur = {x: 1}`（取代舊 `{bonus: 2}`）
- onSettle：`bonus = 2 * st.x`；`G.profit += bonus`；`st.x += 1`
- 相容舊存檔：若只有 `bonus` 欄位，換算為 `x = bonus / 2`

數學等價：
| 觸發次序 | 舊 bonus | 新 2×X | 結果 |
|:---:|:---:|:---:|:---:|
| 1 | 2 | 2×1 | +2 |
| 2 | 4 | 2×2 | +4 |
| 3 | 6 | 2×3 | +6 |

#### C. 其餘貿易合夥人驗證結果（無需改）
| 合夥人 | 機制 |
|---|---|
| 黑市商人 | ✅ 每輪第 1 次商品→金錢 ×125%；mult -0.5 下限 ×1（實際之後無加成）|
| 壟斷者 | ✅ shop ≥ 4 → G.profit += shop×6；shop < 4 → stepWithMover 商店 value 還原 |
| 進貨合作員 | ✅ onTurnStart：商品+4；非商品轉商品+2 |

---

### Session 31（2026-04-24）— 拆遷合夥人全面驗證（部分）

11 個拆遷合夥人審查：8 ✅ 對齊、3 修復（爆破工程師/混沌建築師/回收阿罵）。廢墟掠奪者因 PM 規格待釐清延後處理。

#### A. 爆破工程師 修正（PM 確認 3 項）

##### A1. 舊問題
- 明確擋下廢墟（desc 寫「設施或廢墟」都可）
- 消滅後變廢墟（desc 寫「不產生廢墟」）
- 無每回合限制（desc 寫「每回合」）

##### A2. 新實作
- onCell handler：支援 `bId==='ruin'` → 直接清除廢墟，觸發地皮炒家連鎖
- 設施消滅：設 `G._demoExpertNoRuin=true` flag，destroyFacility 走 `_noRuin` 路徑（同炸彈客）
- 每回合限制：新增 `G._demoExpertUsedThisTurn`，startTurn 重置
- `useDemoExpert` 檢查 used flag

##### A3. destroyFacility 通用「不產生廢墟」flag
原本只有 `_bomberNoRuin`（硬綁 bomb_device 特定）；新增 `_demoExpertNoRuin` 類似用途，統一為 `_noRuin = _bomberNoRuin || _demoExpertNoRuin`。

#### B. 混沌建築師 排除巨型設施

##### B1. 舊問題
排除清單只有 `dept_store / dept_store_part`，沒排除 `ancient_factory_part`（Session 23 新增），也沒排除其他大型設施（雖實務上只是 1 格但排除更安全）。

##### B2. 新實作
- 排除所有 `isLarge:true` 設施
- 排除 `dept_store_part / ancient_factory_part`

#### C. 回收阿罵 呼叫 onFacilityMoved

##### C1. 舊問題
「每重疊一個廢墟，視為移動一次設施」— 舊實作只 `turnFacMoved += moveCount` + 直接給拆遷補償局 bonus，**漏呼叫** `onFacilityMoved`，導致其他連鎖效果（貿易特區商店搬入 / 動態加強器 / 地皮炒家）沒觸發。

##### C2. 新實作
每次重疊都 `onFacilityMoved(tr, tc, r, c)` 觸發完整連鎖；移除重複的拆遷補償局 bonus 計算（由 onFacilityMoved 內部處理）。

#### D. 其餘拆遷合夥人驗證結果
| 合夥人 | 狀態 | 備註 |
|---|---|---|
| 地皮炒家 | 🟡 邊界 | ruin 也被當空格觸發（可能是設計選擇）|
| 無冕之王 | ✅ | ruin handler 累計 + onSettle 加 G.profit |
| 設施破壞者 | ✅ | destroyFacility 三處觸發 |
| 拆遷隊 | ✅ | 計數制 demolitionCharges |
| 廢品戰士 | ✅ | onTurnStart addHand('ruin') |
| 炸彈客 | ✅ | 放 1-3 bomb + 總數×2 收益 |
| 流浪漢 | ✅ | 放 1 廢墟 + 總數×2 收益 |
| 廢墟掠奪者 | ✅ Session 31 補完（見 E）|

#### E. 廢墟掠奪者 完整實作（PM 選 Q3a.1=B/Q3a.2=B/Q3b=A）

##### E1. PM 規格確認
- **Q3a.1 = B**：隨機選定場上一個廢墟作為疊加目標（非玩家手動）
- **Q3a.2 = B**：疊加廢墟計入「場上廢墟數」（影響流浪漢/廢墟紀念碑/無冕之王等）
- **Q3b = A**：per-turn 觸發（整回合只觸發 1 次，不是 per-send）

##### E2. 新增欄位
- `G.ruinStacks = {'r,c': N}` — per-cell 疊加廢墟計數（基底廢墟之外的額外數量）
- 加入 `KEYED_DATA_FIELDS`（隨廢墟格移動/清除自動處理；swapCellData 帶著走）
- G init / deserializeGame 補初始化

##### E3. 新增 helper
```js
function countAllRuins(){
  if(!G.ruinCells) return 0;
  let total=G.ruinCells.size;
  if(G.ruinStacks) for(const k in G.ruinStacks){
    if(G.ruinCells.has(k)) total+=G.ruinStacks[k]||0;  // 只計仍是廢墟的格子
  }
  return total;
}
```

##### E4. 廢墟掠奪者 FX（ruin handler）
- 條件：`hasPartner('ruin_scavenger') && !G._ruinScavengerUsedThisTurn`
- 觸發時：flag=true；value -= penalty (4/6 隨機)；隨機選一個 `G.ruinCells` 成員作為 target；`G.ruinStacks[target] += penalty`
- `startTurn` 重置 `_ruinScavengerUsedThisTurn`

##### E5. 受 countAllRuins 影響的設施/合夥人
以下改為用 `countAllRuins()` 取代 `G.ruinCells.size`：
- 無冕之王 ruin handler 的「每廢墟 ×2 收益」
- 流浪漢 onTurnStart 的「每廢墟 +2 收益」
- 廢墟紀念碑 FX 的「每廢墟 +4 收益」

保持用 `ruinCells.size`（格子數）的場景：
- UI 提示（ruin_monument 放置時「共 N 個廢墟格」）
- 回收阿罵 onTurnStart 的「廢墟 ≤1 就 return」判斷
- 臨時工棚 / 廢鐵城 finish 選目標廢墟（需要實際格子）

##### E6. 回收阿罵 stacks 轉移
集中廢墟時：非 target 格的 `ruinStacks + 1 (base ruin)` 全部轉移到 target 的 stacks。

##### E7. 渲染
廢墟 cell 右上角顯示 `+N`（疊加數量），cname 顯示「廢墟 ×N+1」（總數包含基底）。

---

### Session 32（2026-04-25）— 全合夥人 desc/實作對照審查 + 3 項修復

逐一審查全部合夥人（11 惡魔、6 人力、6 物流、5 貿易、10 拆遷、4 中央、3 大型、3 電子、8 獨特）pos/neg 文字與 index.html 實作的對齊。結果：絕大多數已對齊（由 Session 28~31 完成）；**3 項直接修、4 項有設計歧義待 PM 決策**。

#### A. 擁慶記房屋 ReferenceError（🔴 嚴重）

##### A1. 舊問題
`yongqingSellCell`（`index.html:7923`）的 addLog 使用了未定義變數：
```js
addLog(`🏠 擁慶記房屋：賣出 ${b.emoji}${b.name}，+${bonus}收益（${pct}%×${turnsPassed}回合）`,'g');
```
`pct` 與 `turnsPassed` 在函式作用域中不存在（是舊版機制的殘留文字），**玩家每次點擊賣出都會拋 ReferenceError**，中斷流程：`_yongqingSellMode` 未重置、render 未呼叫、收益動畫失敗。

##### A2. 新實作
- 移除殘留變數，改顯示累加回饋：`（下次賣出 +${st.bonus}）`
- `renderPartners` 的 `yqClickable` 條件補上 `!G._yongqingSellUsed`（原本只檢查 `!_yongqingSellMode`，賣過一次後卡片仍顯示「賣出設施」可點但點了無效）

##### A3. 驗證
- Wiring：`onCell:3733` → `yongqingSellCell`；`startTurn:5953` 重置 `_yongqingSellUsed`；存檔忽略暫時 flag（9476）
- 累積：首次 +2、之後每次 +2（bonus 2→4→6→…）；跨輪持久保存在 `partnerState.yongqing_house.bonus`
- 百貨公司 2×2 完整清除，不產生廢墟

#### B. 擴散惡魔 pride 豁免 + pos/neg 重分類

##### B1. 舊問題
GameDoc 表格將「每回合隨機設施與中央交換」列為 neg，但 `index.html:1998` 整段寫進 pos（`neg:'無'`），且 `onTurnStart` 中的交換**未檢查** `isDemonNegDisabled('spread_demon')`。擁有傲慢惡魔時本該豁免此負面，實際仍會強制交換。

##### B2. 新實作
```js
pos:'中央。每回合開始時，這個合夥人獲得1擴散計數。擴散計數大於等於3時，消耗所有擴散計數，此回合你所有設施視為在中央。',
neg:'每回合開始時，你的隨機一個設施與中央的格子交換。',
```
- 交換邏輯加 `if(isDemonNegDisabled('spread_demon')) return;` 豁免閘
- 計數 +1 與消耗觸發在 `processCountTrigger` 中，視為 pos 效果（不受豁免）

#### C. 公路之星 +2 變永久改為 per-cell cellPath 判定

##### C1. 舊問題
desc 寫「若這回合投入**該格子**，則該格子獲得+2變為永久」，但實作（`index.html:1763`）用 `G.inv.hwCenter`（任一中央格被投入即 true）作為判定：
```js
if(G._hwStarCells&&G.inv.hwCenter){
  G._hwStarCells.forEach(k=>{ G.bldgUpgrades[k]+=2; });  // 全部變永久
} else {
  G._hwStarCells.forEach(k=>{ G.cellMods[k]-=2; });  // 全部清除
}
```
實際效果：只要資源經過任一中央格（不一定是標記格），**所有 2 個標記格都變永久**；反之若完全沒經中央則全部清除。

另外：原實作只加 `bldgUpgrades` 不扣 `cellMods` 的暫時 +2，造成**雙重計算**（本回合內 +4 效果）。

##### C2. 新實作
```js
if(G._hwStarCells&&G._hwStarCells.length>0){
  const cellPath=G.inv.cellPath||[];
  const pathKeys=new Set(cellPath.map(([r,c])=>`${r},${c}`));
  const remaining=[];
  G._hwStarCells.forEach(k=>{
    if(pathKeys.has(k)){
      G.cellMods[k]-=2; if(G.cellMods[k]===0) delete G.cellMods[k];  // 清暫時
      G.bldgUpgrades[k]+=2;                                           // 加永久
    } else {
      remaining.push(k);  // 本回合後續 send 還有機會觸發
    }
  });
  G._hwStarCells=remaining;
}
```
- 每個標記格獨立以 `cellPath` 判定
- 成功觸發者：從 `cellMods` 扣 -2 後加到 `bldgUpgrades` +2（避免雙重計算）
- 未觸發者：保留於 `_hwStarCells`，多次 send 內仍有機會；`cellMods +2` 留到 `startRound` 自然清理

#### D. 需要 PM 決策（未改）

以下 4 項 desc 與實作有落差，但修法涉及平衡性 / 設計意圖，暫不動：

| 合夥人 | 問題 | 選項 |
|---|---|---|
| 暴食惡魔 | desc「回合開始 -10%」實作在 `onRoundStart`（每輪）| (A) 改文字為「每輪」/ (B) 改實作為 `onTurnStart`（每回合複利 0.9^10≈0.35 過強） |
| 譚雅 | desc「手牌+場上 <24 時補牌」但實作只 `handCount<1`（4×4 盤面 <24 幾乎永遠成立）| (A) 改文字為「手牌空時補」/ (B) 改實作 / (C) 數字 24 視為筆誤改更嚴格 |
| 貪婪惡魔 | desc「每回合結束 +50%」實作在 `onSettle` per-send（多 send 累加）| (A) 改文字為「每次投入結算」/ (B) 改為 end-of-turn hook |
| 工會主席 | desc「投入人材額外 +2 人材」但拖設施格時實作為 `cellMods +2`（+2 收益不是 +2 人材）| (A/B/C/D 各種語意）|

#### E. 表格更新

- 擴散惡魔 neg 文字：index.html 原本為「無」→ 改為實際負面描述；GameDoc 表格（line 340）本就正確，無需改
- 公路之星：desc/表格原本描述與修正後實作一致，無需改
- 擁慶記房屋：表格描述本就正確，無需改

#### F. 產出檔案
- `index.html` 三處修改（yongqing_house 2 處、spread_demon 1 處、highway_star 1 處）
- 本文件此 Session 32 entry

---

### Session 33（2026-04-25）— Session 18 / 32 待處理項目逐一清理

依使用者「逐一處理」指示，清理 GameDoc 累積至 Session 32 列出但未動的待處理項目，共 12 項全數處理完畢。

#### A. 結構/資料修復

##### A1. `_talentBankPending` 結構驗證（Session 18 C7）
- **位置**：`deserializeGame`
- **問題**：欄位無範圍/型別檢查，存檔損壞或竄改可注入 NaN/負值/超大值
- **修法**：讀檔後驗證「非負有限整數、上限 100」，超出範圍則歸零
- **註**：原 GameDoc 所說的「過期檢查」實際不需要，因 `startTurn` 一定會在下一回合釋放

##### A2. 匯率波動板動畫疊加（Session 18 C9）
- **位置**：`FACILITY_FX.exchange_board`
- **問題**：場上 N 個設施 → N 個 setTimeout 浮字（每 80ms），多次往返時動畫疊加，視覺與數值脫節
- **修法**：加 `G._exchangeBoardNextAt[key]` 排程游標，新一波從 `max(now, nextAt)` 開始排，排完更新游標
- **保留**：依使用者要求保留逐次浮字動畫，不合併為單次
- **跨回合**：純動畫狀態，不序列化

##### A3. `BASIC_FACILITIES` 自動推導（Session 18 D2）
- **位置**：`index.html` BLDG_RARITY 之後
- **舊**：`const BASIC_FACILITIES=['mat_factory','factory','shop','refinery','warehouse','booster','converter']`（硬編 7 項）
- **新**：`Object.keys(BLDG_RARITY).filter(id=>BLDG_RARITY[id]==='N'&&BLDG[id]&&!BLDG[id].special)`（自動排除有 special 的，如 bomb_device）
- **副效**：將宣告位置從 line 2309 移到 BLDG_RARITY 後，避免引用未宣告

##### A4. 抽出 `runPartnerHook` helper（Session 18 D1）
- **位置**：startRound 之前新增
- **問題**：`G.partners.forEach + try/catch + console.warn` 模式在 onRoundStart / onSettle / onTurnStart 三處重複
- **修法**：抽出 `runPartnerHook(name, ...args)` 統一封裝；三處改為單行呼叫
- **`console.warn` 計數**：7 處 → 5 處（合夥人 hook 從 3 處變 1 處 helper 內部；overlay FX/3 處 IO 失敗保留各自 try/catch）

#### B. desc/實作對齊（Session 32 D 4 項 + Session 23 D 1 項）

##### B1. 暴食惡魔（gluttony）— neg 文字對齊（A 方案）
- **舊**：「**回合開始時**，資源為商品或原料時減少10%」
- **新**：「**每輪開始時**，…」
- **理由**：實作為 `onRoundStart`（每輪一次）。改為 `onTurnStart` 會複利 0.9¹⁰≈0.35 過強，故選改文字

##### B2. 譚雅（tanya）— pos 文字補完
- **舊**：「…手牌設施與場上設施總和小於24時，獲得隨機一張設施。」
- **新**：「交換後手牌設施與場上設施總和小於24時，獲得隨機一張設施。每回合開始若手牌為空，自動獲得一張隨機設施。」
- **發現**：實作分兩處：line 8828 是「**交換後**檢查 <24」（與舊 desc 對齊），line 1698 是「**手牌空時自動補**」（desc 沒寫的額外行為）。修法為補完 desc 涵蓋兩段實作

##### B3. 貪婪惡魔（greed）— pos 文字對齊（A 方案）
- **舊**：「每回合結束額外獲得本回合收益50%」
- **新**：「每次投入結算時，額外獲得本次收益的50%」
- **理由**：實作為 `onSettle`（per-send），同回合多投入會多次 +50%。改實作為 end-of-turn hook 動工大，選改文字

##### B4. 工會主席（union_chief）— pos 文字補完
- **發現**：實作其實正確（onTalentDrop 對資源 `extraUses += 2`、onTalentDropCell 對格子 `cellMods += 2`，搭配基礎 +1 達成「人材數量×3」效果）；舊 desc 寫「投入設施」漏掉「投入資源」分支
- **新 desc**：「持有8個人材以上時，每次投入人材時（不論投到資源或設施），使該次的人材數量額外+2（以投入前的人材數判定，投入後降至8以下仍生效）。」
- **依使用者澄清**：投入前 ≥8 即觸發，效果不受投入後人材數影響

##### B5. 巨人村（giant_village）— 條件解讀（PM 答覆）
- **舊**：`G.talentCards=8`（無條件設為 8，囤積 12 個會被倒扣）
- **新**：`if((G.talentCards||0)===0 && 場上有 giant_village) G.talentCards=8`（人材>0 不發揮效果）
- **desc 同步**：「回合開始時，**若**你的人材為0，獲得+8人材；人材大於0時不發揮效果。」
- **依使用者**：「巨人村的效果為，如果回合開始時人材為0，獲得8人材，人材大於0時就不發揮效果」

#### C. 平衡性調整

##### C1. 連續結算難度評估改一次性（Session 18 C10）
- **位置**：`performWinSettlement`
- **舊**：while 迴圈內每輪呼叫 `adjustDifficulty()`，3 連過 = 3 次加碼
- **新**：迴圈內只 push roundHistory + 算 goal；迴圈結束後一次性 `adjustDifficulty()`
- **連續結算期間**：每輪用同一個（結算前的）`G.difficultyMult` 計算下一輪 goal，避免複利
- **依使用者選擇**：「在連續結算情境下，最後再一次性評估」

#### D. 邊界情境審查（Session 18 B/C 系列剩餘 + Session 23 E）

審查 8 項邊界情境，**6 項已對齊**（不需修），1 項加防禦，1 項是預期行為：

| # | 項目 | 結論 | 說明 |
|---|---|---|---|
| 1 | 設施破壞者疊加層計數 | ✅ | `destroyFacility` 在 `clearKeyedData` 之前先收集 overlay，每個 +4 |
| 2 | 大財團 2×2 取代 | ✅ | `_isEmptyOrNonLargeDestructible` 已擋下大型/不可消滅格 |
| 3 | 排列模式 `_demolishBureauPending` 同步 | 🛡️ 防禦 | 加進入排列模式時主動 `=false` 重置（兩個入口） |
| 4 | 黃牛販子 -8 觸發 | ✅ | `finish()` 一次判定 `_scalperHits>0 && profit<=0`，不分 send 計次 |
| 5 | 臨時工棚邊界 | ✅ | (a) 在百貨內可被 `findCells` 找到；(b) 被消滅時不結算屬合理 |
| 6 | 大熱波 facPath 計數 | ✅ | overlay 每個 push 一次；速遞站 replay 整個 cell（不重複 push 同一 overlay） |
| 7 | 全能會計師 hook 異常 | ✅ | `runPartnerHook` try/catch 各自獨立，`gainOmniCount` 直接呼叫不受影響 |
| 8 | 古代機械工廠莫菲分裂 | ✅ | murphy shuffle 對 `isLarge` continue，4 格不被內部打散 |

#### E. 防禦性改動

##### E1. 進入排列模式重置 pending flags
- **位置**：`useDemolition()` 與 `move_fac` 行動
- **加**：`G._demolishBureauPending=false; G._tradeZonePending=null;`
- **理由**：理論上這些 flag 只能在排列期間被設，但加重置避免未來新增「排列模式外」事件路徑時誤帶旗標進入排列

#### F. 變更摘要

| 檔案 | 修改處數 |
|---|---|
| `index.html` | 約 14 處（含新增 helper） |
| `venture-town.html` | **未同步**（需另行同步） |
| `VentureTown_GameDoc.md` | 本 entry |

#### G. 已對齊不需動的待處理項目（紀錄）

- **Session 18 B6 `tempShedMoves`**：Session 18 已移除，本 session 確認無殘留
- **Session 18 C4 `_allCenter` 衝突**：實際只一個 flag（`G.buff._allCenter`），不存在 Session 18 假設的 `Diffuse/Secretary` 雙旗衝突
- **Session 18 D4 `_inOtherMode` 重複檢查**：已合併成單行 `||` 鏈，無 3+ 重複站點
- **Session 18 C8 拆遷隊計數消耗**：對齊 Session 29 C 全域規則「消耗 N 個」=`-=N`

#### H. 使用者偏好新增記錄

- VT 專案討論時設施/合夥人**一律使用中文名**，不用程式內部 ID（已寫入 memory: `feedback_chinese_facility_names.md`）

### Session 34（2026-04-25）— 八個惡魔合夥人全面改版（對齊新合夥人表）

#### A. 改版摘要

對齊 PM 提供的新合夥人表，**全面重寫**所有 8 個惡魔系合夥人（含貧窮神）。新增 `runPartnerHook('onTurnEnd')` 機制集中處理回合結束時的合夥人效果。

| 合夥人 | 主要變更 |
|---|---|
| 貧窮神 🪙 | onSettle → onTurnEnd；改用本回合收益基準（G._turnStartProfit），非 per-send |
| 暴食惡魔 👹 | 負面從「資源 -10%」改為「資源為商品/原料時 -4 收益」，移到 onTurnStart |
| 怠惰惡魔 😴 | 正面 +10 改為「+2 或 +8 隨機」；負面從「變 1」改為「投入時 1/3 機率 -6」（每次投入觸發） |
| 慾望惡魔 💘 | 正面從「2 設施 ×2」改為「2 設施永久 +4」；負面從「÷設施數」改為「每經過一個 -6」 |
| 激情惡魔 🔥 | **完全重寫**：正面改為「每回合獲得 3 張設施」；負面改為「回合結束手牌 >1，每多一張本輪目標 +10%」 |
| 嫉妒惡魔 💚 | **完全重寫**：嫉妒工廠改為「任意→隨機資源」+「首投永久 +4」+「輸出符合 +8（永久 +8）」；負面改為「被消滅/賣出 → 遊戲結束」 |
| 貪婪惡魔 💰 | 正面從「per-send +50%」改為「本回合收益達目標 50% 時所有設施永久 +4」 |
| 傲慢惡魔 👑 | 從 `+10% × 惡魔數` 改為 `+8 × 惡魔數`；新增 onTurnEnd 使每惡魔加成永久 +2 |

#### B. 新增 / 改動的核心機制

##### B1. 新增 `runPartnerHook('onTurnEnd')` 鈎子
- 位置：`doNext()` 內，於 `commitTurnLog()` 之後、`G.cellMods={}` 清除之前
- 觸發：貧窮神、貪婪惡魔、傲慢惡魔、激情惡魔（負面）、其他將來新增的回合結束效果

##### B2. 新增 G 物件欄位
| 欄位 | 用途 | 重置時機 |
|---|---|---|
| `G._turnStartProfit` | 本回合開始時的 profit 基準（貧窮神/貪婪用） | startTurn |
| `G._firstFacInvestedThisTurn` | 嫉妒惡魔：本回合是否已有任何設施被投入過 | startTurn |
| `G.inv.facCellPath` | 本次 send 經過的設施座標陣列（慾望惡魔 +4 用） | sendEl |
| `G.inv._envyOut` | 本次 send 嫉妒工廠的隨機輸出類型 | sendEl |
| `G.inv._envyCell` | 本次 send 嫉妒工廠所在格座標 | sendEl |
| `G.partnerState.envy.cellBonus` | 嫉妒工廠每格、每資源類型的永久 +4 累積 | 跨回合保留 |
| `G.partnerState.envy.matchBonus` | 嫉妒工廠輸出匹配獎勵（預設 8，每次 +8） | 跨回合保留 |
| `G.partnerState.pride.bonus` | 傲慢惡魔每惡魔加成（預設 8，每回合結束 +2） | 跨回合保留 |

##### B3. 嫉妒工廠（`envy_factory`）BLDG 重定義
```js
envy_factory:{ name:'嫉妒工廠', emoji:'💚', desc:'任意→隨機資源；本回合首個投入此設施時永久獲得投入資源 +4；最終輸出符合此設施輸出時最終收益 +8（效果永久 +8）',
  req:'any', out:null, fn:v=>v, special:'envy' },
```
- 新增 `FACILITY_FX.envy(fx)` handler 處理隨機輸出 + 首投 +4 + 累積加成
- `finish()` 中比對 `el.type === G.inv._envyOut` 觸發匹配獎勵

##### B4. 嫉妒工廠遊戲結束機制
- `destroyFacility()`：偵測 `bId==='envy_factory'` 且持有 `envy` 且未被傲慢豁免 → setTimeout 300ms 顯示 lose modal
- `yongqingSellCell()`：賣出嫉妒工廠時同樣觸發

##### B5. stepWithMover / _hit 統一更新
- `_hit()` 與通用設施分支同步 `push 到 facCellPath` + `設 G._firstFacInvestedThisTurn=true`
- 兩處需保持一致（嫉妒首投判定才正確）

#### C. 移除的舊邏輯

| 移除項 | 位置 | 原因 |
|---|---|---|
| 嫉妒工廠中斷邏輯（已通過其他設施 → 結束） | stepWithMover ~line 5113 | 新版改為任意→隨機，不再要求第一個設施 |
| 嫉妒工廠 -50% 收益（envyPen flag） | finish + sendEl + MEGA_SIM | 新版負面改為遊戲結束 |
| **鑽石（diamond）×12 商店機制** | stepWithMover ~line 5044 | 新嫉妒工廠不再產出鑽石，整個鑽石資源類型成為死碼；UI 常數（TLABEL/TCOLOR）保留供向後相容 |
| 激情惡魔 noDebuffTurns 計數 | wrath.onTurnStart/onSettle | 新版完全不同機制 |
| 貪婪惡魔 onSettle +50% | greed.onSettle | 改為回合結束時整體加成 |

**鑽石移除影響**：
- 新嫉妒工廠隨機輸出池只剩 `['money','material','goods']`
- `partnerState.envy.cellBonus` 結構移除 diamond 鍵
- `finish()` 與 MEGA_SIM 仍保留 `if(el.type==='diamond') → money` 防呆，避免舊存檔殘留鑽石卡崩潰
- DEV 面板若有「給鑽石」按鈕，鑽石卡通過商店時會走通用分支被略過（req 不符），最終於 finish 換 money

#### D. MEGA_SIM 同步更新

工業化模擬亦同步處理：
- 移除嫉妒中斷與 envyPen 變數
- 移除激情逆轉減益邏輯
- 慾望惡魔模擬：facHit===2 給 +8 等效（代表兩格 +4 永久）；facHit>2 → -6 × facHit
- 貪婪 per-send +50% 移除（新版為回合結束時整體加成，per-send 模擬不適用）

#### E. 待 PM 驗證 / 已知設計取捨

1. **嫉妒工廠首投判定**：採用「本回合任何設施被投入前」 = 第一個。若 PM 期望「per-send 第一個」需再調整
2. **激情惡魔 3 張設施**：以 N 稀有度池均勻抽取，未做加權；若需偏向某 tag 可用 weightedPickN 調整
3. **嫉妒被消滅遊戲結束**：透過 setTimeout 300ms 延遲觸發 modal，避免立即蓋掉 destroy 動畫
4. **慾望 facHit===2 永久 +4**：使用 `facCellPath` 追蹤，包含 envy_factory 自身（若兩設施之一是嫉妒工廠也會 +4）
5. **`_實作對照表.xlsx` 重新匯出**：本次未自動執行，PM 可用 `python build_proposal.py` 或既有匯出腳本重新產生

#### F. 變更檔案

| 檔案 | 修改 |
|---|---|
| `index.html` | PARTNERS 8 改、BLDG.envy_factory 1 改、FACILITY_FX 新增 envy handler、stepWithMover 嫉妒舊邏輯移除、_hit/inline 加 facCellPath、finish 嫉妒匹配新邏輯、destroyFacility/yongqingSellCell 加遊戲結束、startTurn 加旗標、sendEl 加怠惰 -6 + facCellPath 初始化、doNext 加 onTurnEnd hook、MEGA_SIM 同步 |
| `VentureTown_GameDoc.md` | 惡魔表格更新 + 本 Session entry |
| `VentureTown_實作對照表.xlsx` | **未同步**（需 PM 重新匯出） |

---

### Session 35（2026-04-26）— Session 34 後續 bug 排查與修復（5 項）

對 Session 34 惡魔改版做交叉審查，發現 5 項真實 bug 並修復；另 1 項（pride.onTurnEnd 永遠 addLog）經重新檢視為非 bug（pride 自身計入 demonCount，+2 永遠對 onSettle 有效）。

#### A. 嫉妒工廠 overlay 消滅不觸發遊戲結束（🔴 嚴重）

##### A1. 問題
Session 34 嫉妒負面「嫉妒工廠被消滅或賣出時遊戲結束」只檢查 base cell：
- `destroyFacility` line 8218：`if(bId==='envy_factory' ...)` — `bId` 是 `G.grid[r][c]`（基底）
- `yongqingSellCell` line 7968：同上
- 第 8276–8291 行 overlay loop 只觸發 facility_destroyer / scrap_city / disaster_bureau，**未檢查 envy_factory**

##### A2. 可重現情境
玩家擁有「嫉妒 + 物流之王 / 倉儲女王」→ 把唯一一張 envy_factory 疊到物流中心上 → 物流中心被混沌建築師 / 爆破裝置 / 災害事件等消滅 → 整個 cell（含 envy overlay）被清，但 base 是 `logistics_*` 不是 `envy_factory`，遊戲不會結束。

正常流程下玩家最多持有 1 張 envy_factory（`isPoolableBldg` / `COMPOUND_EXCLUDE` 都已排除），蕾雅同名疊加因手牌沒第二張無法觸發；但物流疊加可發生。

##### A3. 修法
新增共用 helper `_triggerEnvyGameOverIfPresent(r, c, reason)`（`index.html:8205`）：
- 檢查 base 與 overlay 任一為 `envy_factory`
- 內建傲慢豁免（`isDemonNegDisabled('envy')`，envy 有 `isDemon:true`）
- 內建 `_envyGameOverFired` 防重複
- 必須在 `clearKeyedData` 之前呼叫（否則 cellOverlay 已清空）

兩處消滅入口統一呼叫：
- `destroyFacility` (`index.html:8227`)：`_triggerEnvyGameOverIfPresent(r, c, '被消滅');`
- `yongqingSellCell` (`index.html:7969`)：`_triggerEnvyGameOverIfPresent(r, c, '被賣出');`

##### A4. 未動的路徑
- `destroyFacility` 內的 dept_store 2×2 分支：dept_store 已 `indestructible`，第 8222 行就 return，永遠走不到
- `yongqingSellCell` 的 dept_store 2×2 分支：envy_factory 不會 overlay 在 dept_store 上（蕾雅同名要同名、物流疊加只發生在物流中心、center_elec_net 要 center tag），且 helper 在 dept_store 處理之前呼叫已涵蓋 base

#### B. 舊存檔 `_turnStartProfit` 未初始化（🟠 中度）

##### B1. 問題
Session 34 新增 `G._turnStartProfit`（startTurn 重置為當前 profit），供 greed.onTurnEnd / poverty.onTurnEnd 計算「本回合收益增量」。但 `deserializeGame` 沒有為缺失此欄位的舊存檔做 fallback：
- `turnGain = (G.profit||0) - (G._turnStartProfit||0) = G.profit - 0 = G.profit`（變成「輪累積值」而非「回合增量」）
- greed：`turnGain >= G.goal*0.5` 容易誤觸發 → 錯誤地給場上所有設施 +4 永久升級
- poverty：`turnGain <= 0` 永不成立 → 應 +8 卻不發

##### B2. 修法
`deserializeGame` (`index.html:9554`) 補入：
```js
if(typeof data._turnStartProfit!=='number') data._turnStartProfit=data.profit||0;
if(typeof data._firstFacInvestedThisTurn!=='boolean') data._firstFacInvestedThisTurn=false;
```

#### C. `_envyGameOverFired` 跨存檔殘留（🟡 輕度 / corner case）

##### C1. 問題
`destroyFacility` / `yongqingSellCell` 將 `G._envyGameOverFired = true` 之後永不重置。若玩家在嫉妒工廠被消滅、modal 顯示前的 300ms 內存檔（autoSave 觸發），讀檔後 flag 殘留 → 下次嫉妒消滅不再 trigger modal。

##### C2. 修法
`deserializeGame` (`index.html:9557`) 加 `delete data._envyGameOverFired;`

#### D. 暴食 log 與實際扣減值不符（🟡 輕度）

##### D1. 問題
`gluttony.onTurnStart` (`index.html:1336`)：
```js
G.profit = Math.max(0, G.profit - 4);
addLog(`收益-4`,'b');           // ← profit=2 時實際只扣 2 但 log 說 -4
profitFlyFromPartner(this.id,-4); // ← 飛行動畫也誤顯示 -4
```

##### D2. 修法
改用實際扣減值：
```js
const before=G.profit||0;
G.profit=Math.max(0, before-4);
const cut=before-G.profit;
if(cut>0){
  addLog(`...收益-${cut}`,'b');
  setTimeout(()=>profitFlyFromPartner(this.id,-cut),100);
}
```
扣 0 時不 log、不飛動畫。

#### E. `G.inv.envyPen` 死碼移除（🟡 清潔）

Session 34 移除嫉妒工廠舊 -50% 收益機制後，`envyPen` flag 完全沒讀取點，僅在 `sendEl` 第 4132 行初始化。移除該欄位。

#### F. 跳過項目

**pride.onTurnEnd 每回合 addLog**（原評估為 UX 問題）：
重新檢視 onSettle (`index.html:1448`)：
```js
const demonCount = G.partners.filter(pid=>PARTNERS[pid]&&PARTNERS[pid].isDemon).length;
```
`pride` 自身有 `isDemon:true`，所以 `demonCount ≥ 1` 永遠成立（hook 會跑代表 pride 在 G.partners 裡）。每回合 +2 累積永遠對 onSettle 的 `demonCount * st.bonus` 有意義，addLog 不算 spam。

#### G. 變更檔案（A–F 段）

| 檔案 | 修改 |
|---|---|
| `index.html` | 新增 `_triggerEnvyGameOverIfPresent` helper + 兩處消滅入口統一呼叫；deserializeGame 補 3 個欄位 fallback / 清除；gluttony.onTurnStart 改用實扣值；sendEl 移除 envyPen 死碼 |
| `VentureTown_GameDoc.md` | Session 索引補 35；本 Session entry |

#### H. 7 個關鍵事件加音效與動畫（cell-only 路線）

依使用者要求，為「進入商店、獲得卡牌、獲得合夥人、購買設施、賣出設施、消滅設施、爆破裝置爆炸」7 個事件補完音效與視覺反饋。視覺強度走 cell-only（不全屏震動，全屏只留給既有的 `hwBoom` 大熱波）。

##### H1. 新增 4 個 SFX 函式（`SFX` IIFE module）

| 函式 | 設計 | 用途 |
|---|---|---|
| `SFX.openShop()` | 上行四音琶音 C5→E5→G5→C6（triangle，每音 40ms 間隔） | 進入商店 / 行動 overlay |
| `SFX.gainCard()` | G5 sine 主音 + B5 triangle 泛音（明亮「叮」） | 獲得卡牌（任何來源） |
| `SFX.recruit()` | C5/E5/G5 大三和弦長音 + C3 低頻鋪底 | 招募合夥人（隆重） |
| `SFX.destroy()` | sawtooth 110→40 Hz 衝擊 + white noise buffer 爆破 | 消滅設施 / 爆破裝置 / 賣出 |

`SFX` 物件 return 值擴充：`{hit, convert, settle, place, placeOverlay, openShop, gainCard, recruit, destroy}`

##### H2. 新增 5 個 CSS 動畫

- `@keyframes overlayPopIn` — chooser 卡片 row 彈性入場（cubic-bezier .34, 1.56, .64, 1，含過衝）
- `.card-fly` + transition — 通用卡牌從來源飛入手牌（縮小 0.55× + 透明度 → 0）
- `@keyframes destroyBoom` — cell 紅閃震動 0.55s（rgba(217,72,40) 背景 + scale 1.18 + 微旋轉）
- `@keyframes destroyShard` — 6 顆 emoji 碎片放射飛散（💥🔥⚙️💢🧱💨）
- `@keyframes recruitPopIn` — 合夥人卡彈性出場（含 -12°→6° 旋轉過衝）

##### H3. 新增 3 個 Helper 函式

| 函式 | 位置 | 說明 |
|---|---|---|
| `flyCardToHand(bldgId, srcEl)` | profitFlyFromCell 附近 | 從 srcEl（或畫面中央 fallback）飛 76×96 卡片到 #hand-fan-area，內含 `SFX.gainCard()` |
| `destroyEffect(r, c)` | placeEffect 後 | cell 套 .destroy-boom + 6 碎片（fixed 定位 append 到 body）+ `SFX.destroy()` |
| `recruitEffect(pid)` | destroyEffect 後 | requestAnimationFrame 等 renderPartners 重建後，對 joker-card 套 .recruit-popin + `SFX.recruit()` |

##### H4. 7 個事件的接入點

| # | 事件 | 接入位置 | 觸發內容 |
|---|---|---|---|
| 1 | 進入商店 | `showCardChooser` | 對 #card-chooser-cards 套 .overlay-popin + `SFX.openShop()` |
| 1 | 進入行動 overlay | `openActionOverlay` | 對 #action-cards 套 .overlay-popin + `SFX.openShop()` |
| 2 | 事件補給卡牌獲得 | `evPick` | 移除舊 fromEl 飛入動畫（永遠 fromEl=null 的死碼），改 `flyCardToHand(id)` 統一處理 |
| 2 | 合夥人 onTurnStart 贈卡 | 廢品戰士 / 訪問網路碼語者 / 電子精工師 / 雷電法王 / 激情惡魔（3 張 stagger 200ms） | `flyCardToHand(id, getPartnerCardEl(this.id))` |
| 2 | 招募 envy 自動贈卡 | `recruitPartner / pickStarterPartner` 內 envy 分支 | `setTimeout(()=>flyCardToHand('envy_factory', getPartnerCardEl(pid)), 300)` |
| 3 | 招募合夥人 | `recruitPartner / pickStarterPartner` | `recruitEffect(pid)`（兩處皆呼叫於 renderPartners 之後） |
| 4 | 購買設施 | `doPermShop` 的 onclick callback | 在 `render()` 後追加 `flyCardToHand('${bid}')` |
| 5 | 賣出設施 | `yongqingSellCell` | `destroyEffect(r,c)`；百貨公司 2×2 分支對其餘 3 格各觸發 |
| 6 | 消滅設施 | `destroyFacility` | `destroyEffect(r,c)`（百貨公司分支內迴圈各別呼叫，避免單次 4 倍音效） |
| 7 | 爆破裝置爆炸 | `startTurn` 的 bombs.forEach | 透過 `destroyFacility` 自動涵蓋（自爆 + 波及相鄰皆走 destroyFacility） |

##### H5. 設計取捨

- **碎片 fixed + body append**：因為 destroyFacility 後緊接 render() 會重建 #grid-area innerHTML，若把碎片掛在 cell.parentElement 會被清掉。改 fixed + body 不受影響。
- **destroy-boom class 仍掛在 cell**：renderGrid 重建時 class 自然消失，動畫已播完不需 cleanup。
- **flyCardToHand 預設從畫面中央**：chooser 關閉後沒有 srcEl 可用；chooser 原本在中央，從中央起飛視覺上合理。
- **複合卡不飛**：`BLDG[compound_N]` 不存在，flyCardToHand 第一行 `if(!b) return` 自動 early return（safe）。
- **激情 +3 張 stagger 200ms**：避免 3 張同時飛入造成視覺擠壓。
- **重複 `SFX.openShop`**：每次 chooser/action overlay 開啟都響，符合「進入商店有音效」直覺；使用者後續若覺吵可加 throttle。

##### H6. 變更檔案（H 段）

| 檔案 | 修改 |
|---|---|
| `index.html` | SFX 4 函式 + CSS 5 keyframes + 3 helper（flyCardToHand / destroyEffect / recruitEffect）+ 接點：showCardChooser / openActionOverlay / evPick / doPermShop / recruitPartner / pickStarterPartner / yongqingSellCell / destroyFacility（含 dept_store 2×2 迴圈）/ ruin_warrior / cyber_coder / wrath / processCountTrigger（elec_artisan / thunder_king） |
| `VentureTown_GameDoc.md` | 本段 H 補完 |

#### I. 🔴 核心循環音效動畫（6 項）

##### I1. 7 個新 SFX 函式
| 函式 | 設計 | 用途 |
|---|---|---|
| `SFX.winFanfare()` | C5→E6 上行 5 音 + B6 高鈴 | 過關 modal |
| `SFX.loseToll()` | A3→D3 下行三和弦 sine | 失敗 modal |
| `SFX.roundStart()` | G4→C5→E5 + A6 鈴鐺 | 新輪開始 |
| `SFX.turnTick()` | 1200Hz square 60ms | 回合推進 |
| `SFX.eventTrigger(type)` | good 上行 / bad 下行 sawtooth / neutral 同音 | 事件觸發分類 |
| `SFX.goalReached()` | C6→E6 雙鈴 | 目標達成瞬間 |
| `SFX.countComplete()` | 660→1320Hz sweep + E6 鈴 | 計數達標 |

##### I2. 6 個 CSS 動畫
- `.modal-pop` / `modalPop` — modal 進場 scale + 旋轉過衝
- `.round-banner` + `roundBannerIn` — 全屏中央「第 N 輪」64px 大字 1.6s
- `.turn-pop` / `turnPop` — header 回合數字 scale 1.35× 短閃
- `.ev-banner-slide-in` / `eventBannerSlideIn` — 事件 banner 從上方 -160% 滑入過衝
- `.goal-flash` + `.goal-reached-chip` + `goalChipIn` — goal 數字綠光脈衝 + 「🎯 達成目標！」chip
- `.count-complete` / `countCompleteGlow` — 合夥人卡金光 box-shadow 脈衝 0.9s × 2

##### I3. 接入點
| 事件 | 位置 | 行為 |
|---|---|---|
| 過關/失敗 modal | `showModal` | mbox `.modal-pop` + winFanfare/loseToll |
| 新輪開始 | `startRound`（round > 1） | `showRoundBanner` + roundStart |
| 回合推進 | `doNext` 的 G.turn++ | `r-turn` 套 .turn-pop + turnTick |
| 事件 banner 出場 | `showEv` | banner `.ev-banner-slide-in`；eventTrigger 提到 `triggerEvent`/`doNext` 兩個 ev.show 之前 |
| 目標達成（finish/doPermConvert 首次達標） | `showGoalReachedFx` | goal-flash + chip + goalReached |
| 計數達標（5 位計數合夥人） | `processCountTrigger` 開頭統一 | `_countTriggerFx`：合夥人卡 .count-complete + countComplete |

##### I4. 順帶重構
`processCountTrigger` 5 個合夥人各自的 `if(st.count<3) return false;` 集中到開頭單一判定，消除 4 行重複，並確保所有達標都觸發 fx。

##### I5. 事件分類映射 `EVENT_SFX_TYPE`
19 個事件全涵蓋：
- **good**：pick_fac / mat_boom / goods_up / tanya_gift / leya_gift / job_assist
- **neutral**：skip / row_buff / col_buff / area_buff
- **bad**：mat_crash / typhoon / rebellion / earthquake / hazardous_waste / transport_error / food_safety / labor_insurance / murphy

##### I6. 審查發現的 6 個問題（全修）
1. `doNext` 路徑事件音效類型錯誤：未設 `_currentEventId` → 補上
2. `pick_fac` 等不走 showEv 的事件沒事件音 → 把 SFX.eventTrigger 從 showEv 抽到 `_playEventSfx(ev)` helper，在兩個 ev.show 之前統一播放；showCardChooser 加 `opts.silent` 讓 pick_fac 跳過 openShop 重複音
3. `destroyEffect` 紅閃被 render 中斷 → 改為獨立 fixed 浮層 + body append
4. `_countTriggerFx` 套 partner card 但 caller 後續 render 重建 DOM → 用 `requestAnimationFrame` 延後加 class
5. `showStarterPartnerSelection` 跳過 popin/SFX → 補上 popin + openShop
6. dept_store 2×2 連 4 次 SFX.destroy 太吵 → `destroyEffect` 加 `opts.silent`，第一格播音其餘只跑視覺

#### J. 🟠 戰術反饋音效動畫（6 項）

##### J1. 6 個新 SFX
| 函式 | 設計 | 用途 |
|---|---|---|
| `SFX.partnerProc()` | G6 sine 60ms | 合夥人技能觸發 |
| `SFX.upgrade()` | E5→A5 兩聲短上行 | 設施升級 |
| `SFX.talentGain()` | C6→F6 sweep | 人材獲得 |
| `SFX.talentLose()` | A3→A2 下行 sine | 人材失去 |
| `SFX.invalid()` | 200Hz triangle 80ms「嗶」 | 無效操作 |
| `SFX.cardChange()` | D5 sine 80ms「滴」 | 元素卡值變化 |

##### J2. 6 個 CSS 動畫
- `.partner-flash` / `partnerFlash` — 合夥人卡 0.4s 短閃白光
- `.invalid-shake` + `.invalid-flash-layer` / `invalidShake` — 紅震 0.35s + 紅閃浮層
- `.value-tween` / `valueTween` — 數字 scale 1.4× 金色（增加版）
- `.value-tween-lose` / `valueTweenLose` — scale 1.3× 紅色（減少版）
- `.upgrade-float` / `upgradeFloatAnim` — 金色「+N」浮現上飄
- `.mover-convert` / `moverConvert` — emoji rotateY 翻轉 + scale 1.25× + box-shadow 金光

##### J3. 接入點
| 事件 | 位置 | 行為 |
|---|---|---|
| 合夥人技能觸發 | `profitFlyFromPartner` | partner-flash + SFX.partnerProc |
| 設施升級（玩家用 ⬆） | `upgradeCell` | upgradeFx：金色 +1 浮動 + SFX.upgrade |
| 人材變動 | `renderTalentPanel` 偵測 G.talentCards 差值 | 增 → SFX.talentGain + value-tween；減 → SFX.talentLose + value-tween-lose |
| 拖曳錯誤 | `onCellDrop` 的 tryPlaceAtCell 失敗 | invalidPlaceFx 紅震 + SFX.invalid |
| 資源轉換 | `updateMover` 內 typeChanged 時 | mover-convert（emoji 翻轉 + 金光） |
| 元素卡值變化 | `updateCard` 偵測 G.card.value 差值 | SFX.cardChange + el-card-fan 套 value-tween |

##### J4. 初始化陷阱修復
`_lastTalentCount` / `_lastCardValue` / `_lastCardType` 是 module-level 變數，若不重置會在「載入存檔 / 失敗重開 / SM 切換」後第一次呼叫誤播音效。  
**修法**：三個變數初始值設為 `null` sentinel；`renderTalentPanel` / `updateCard` 內判斷 `_lastXxx===null` 時 `delta=0` 不播音；`SM.goto` 在場景切換時主動重置三者為 `null`。

#### K. 🟡 UI 互動音效動畫（6 項）

##### K1. 2 個新 SFX
- `SFX.select()` — A5→E6 sweep 50ms「啾」
- `SFX.cardHover()` — A6 triangle 30ms 極輕音（150ms throttle）

##### K2. 3 個 CSS 動畫
- `.char-pop` / `charPop` — 立繪 scale 1.06 + Y -4px 短彈
- `.acard-deny` / `acardDeny` — disabled 行動卡點擊紅震
- `.select-chirp` / `selectChirp` — 格子被選中金光脈衝 0.35s

##### K3. 接入點
| 事件 | 位置 | 行為 |
|---|---|---|
| 存檔匯出 | `exportSave` | SFX.gainCard |
| 存檔匯入 | `importSave` 成功分支 | SFX.openShop |
| 開發者面板 | `DEV.open` / `close` | open: SFX.openShop；close: SFX.cardChange（panel 是 left:0 fixed 不套 popin 動畫避免錯位） |
| 教學/事件台詞 | `DM.trigger` / `DM.onEvent` | charPopFx（立繪 pop，1.5s throttle） |
| 格子被選中（移動模式） | `onCell` G.moveSrc 設定 | SFX.select + cell .select-chirp |
| 手牌懸停 | `fanCardHover` | SFX.cardHover（150ms throttle） |
| 行動費用無法負擔 | acard onclick=`actionDeny(this)` | acard-deny 紅震 + SFX.invalid |

##### K4. 副作用
- `.acard-disabled` 移除 `pointer-events:none`：原本完全擋下 hover/click，現在允許 hover 顯示說明 + click 觸發 actionDeny。`:not(.acard-disabled)` hover 樣式仍正確排除。
- `charPopFx` 只在 `DM.trigger`/`onEvent` 觸發（重要時刻），hover 類台詞不觸發避免立繪反覆抖動。

#### L. 🟢 微互動音效動畫（7 項，原計畫 8 項其中疊加輪播跳過）

##### L1. 6 個新 SFX
| 函式 | 設計 | 用途 |
|---|---|---|
| `SFX.rareDrop()` | B5+D6+F#6 三和弦長音 + B6 泛音 | SSR 招募/抽到 |
| `SFX.compoundLink()` | A5/E6 兩段 square「叩叩」 | 複合鏈接 |
| `SFX.swap()` | 440Hz square 30ms | 疊加切換（保留未接點） |
| `SFX.expand()` | 40→100Hz sawtooth rumble + G4/C5/E5 喇叭 | 地圖擴張 |
| `SFX.envyMatch()` | C6→G6 sweep 250ms | 嫉妒匹配 |
| `SFX.rotateDir()` | 60ms white noise swish | 物流方向旋轉 |

##### L2. 6 個 CSS 動畫
- `.ssr-sparkle` / `ssrSparkleAnim` — 12 顆金 ✨ 放射飛散
- `.envy-match-flash` / `envyMatchAnim` — 「+N！」綠+金光浮現
- `.expand-overlay` + `.expand-banner` + `.expanding` — 全屏擴散圈 + 大字 banner + 主畫面震動（**破例全屏特效**）
- `.dir-rotating` / `dirRotate` — emoji 360° 旋轉
- `.compound-link-fx` / `compoundLinkAnim` — 中央 🔗 旋轉浮現

##### L3. 接入點
| 事件 | 位置 | 行為 |
|---|---|---|
| SSR 招募 | `recruitEffect` 內判定 PARTNER_RARITY[pid]==='SSR' | 100ms 後 showSsrSparkle 從 partner card 飛散 |
| 複合設施生成 | `addHandMaybeCompound` 複合分支 | showCompoundLinkFx |
| 譚雅交換稀有度音 | `tanyaDoSwap` | SSR→showSsrSparkle / SR→recruit / 其他→gainCard |
| ~~疊加輪播音~~ | — | **跳過**（CSS 自動播放無 trigger 點 + spam 風險） |
| 大地主/大財團/惡魔巨人擴大 | 三個 `onRecruit` | showExpandFx（破例全屏） |
| 嫉妒工廠匹配 +8 | `finish` 嫉妒匹配分支 | showEnvyMatchFlash |
| 匯率波動 ±2 浮字 | `floatAtCell` | SFX.partnerProc（80ms throttle）|
| 物流中心方向旋轉 | redirect 的 perTurnRotate 分支 | SFX.rotateDir + .cemoji 套 .dir-rotating |

##### L4. 衝突修復
1. **tanyaDoSwap SSR 雙響 rareDrop**：原本外層呼叫 SFX.rareDrop + 100ms 後 showSsrSparkle 內又響一次。修法：移除外層，showSsrSparkle 自帶。
2. **SSR 大型合夥人三音重疊**（landlord/big_corp/demon_giant 是 SSR 又觸發 showExpandFx）：expand+recruit+rareDrop 三個長音同時。修法：showSsrSparkle 加 `opts.silent`，recruitEffect 偵測擴張類合夥人時 sparkle 視覺保留但跳過 SFX.rareDrop。

#### M. 全系統審查（H–L 跨組互動）

##### M1. 累計新增資源
| 組別 | SFX | CSS | Helper | 接點 |
|---|---|---|---|---|
| H | 4 | 5 | 3 | 7 |
| I | 7 | 6 | 3 | 6 |
| J | 6 | 6 | 4 | 6 |
| K | 2 | 3 | 2 | 6 |
| L | 6 | 6 | 4 | 7 |
| **合計** | **25** | **26** | **16** | **32** |

##### M2. 跨組別衝突檢查（已修復 / 已驗證）
- ✅ tanyaDoSwap SSR 雙響 rareDrop（L 段內修）
- ✅ SSR 大型合夥人三音重疊（L 段內修）
- ✅ doNext 事件音效類型錯誤（I 段修）
- ✅ pick_fac 跳過 showEv 沒事件音（I 段修）
- ✅ destroyEffect 紅閃被 render 中斷（I/H 段交替修）
- ✅ _countTriggerFx 被 render 中斷（I 段 rAF 修）
- ✅ dept_store 2×2 連響 4 次 destroy（I 段 silent 修）
- ✅ 初始化陷阱（J 段 sentinel + SM.goto 重置修）

##### M3. 已驗證無問題的互動
- 連續結算多輪過關時 SFX/banner 時序合理
- 失敗重開（lose modal → 標題 → 新遊戲）SM.goto 重置 sentinel ✓
- 教學期間 hookDoNext 攔截 → turnTick 不響；hookFinishPre 攔截 → goalReached 不誤響；教學中無合夥人 → hook 各 SFX 不跑
- BATTLE / MEGA 模式 simFacilityPath 純模擬不呼叫 SFX；不觸發 destroyFacility/placeBldg
- 連環爆破（炸彈客 6+ bomb 同時爆）每個 destroyFacility 在不同時序觸發，連響像「連環爆」效果可接受
- z-index 層級設計合理（最高層 expand-banner 9310，hwBoom 全屏為 8000+，不衝突）
- 13 個臨時 class 全部有 setTimeout 主動 remove 或由 render 重建自然消失

##### M4. 已知小取捨（不修）
1. 5 個 openShop caller 玩家連續操作可能聽到 3-4 連響（每次間隔 ≥500ms 玩家操作，不算 spam）
2. 同回合多合夥人 onSettle 各響 SFX.partnerProc（setTimeout 100~150ms 延遲分散，「連珠叮叮」效果可接受）
3. goal-reached-chip 與 win modal 部分時間重疊（chip top:25%、modal 居中，視覺位置不衝突）
4. ssr-sparkle 對譚雅交換 SSR 從畫面中央飛散（無 srcEl，符合 cinematic 結束視覺）
5. 沒有全域 SFX 音量控制（各 SFX gain.gain 已平衡 0.025~0.12 之間）

##### M5. 變更檔案（H + I + J + K + L 段）
| 檔案 | 修改 |
|---|---|
| `index.html` | SFX 25 個函式、CSS 26 個動畫 + class、helper 16 個函式、32 個事件接點；audio API 用 Web Audio 無外部檔案；所有動畫 cell-only（破例全屏：showExpandFx + showRoundBanner） |
| `VentureTown_GameDoc.md` | 索引表更新；H–M 段補完 |

---

### Session 36（2026-04-26）— 設施互動審查 + 多項機制修正

#### A. 前期審查發現的 Bug（3 項）

##### A1. 嫉妒工廠 `cellBonus` orphan（🔴 真 bug）
- **問題**：`G.partnerState.envy.cellBonus[k]` 用 `r,c` 為 key 儲存「本回合首投永久 +4」累積，但不在 `KEYED_DATA_FIELDS` 中。設施被消滅 / swap / 排列模式 cancel 時 `clearKeyedData` / `swapCellData` / `restoreGridSnapshot` 無法處理 → 移動嫉妒工廠時加成不跟著走、消滅後同格新建嫉妒會繼承舊加成。
- **修法**：三處 helper 都顯式同步處理：
  - `clearKeyedData`（index.html:2940）：刪除 `eb[key]`
  - `swapCellData`（index.html:9421）：交換 `eb[k1]` / `eb[k2]`
  - `saveGridSnapshot` / `restoreGridSnapshot`（3426/3434）：snapshot `_envyCellBonusSnapshot`

##### A2. 傲慢惡魔 `pride.bonus` 無上限（⚠️ 設計）
- 每回合 +2 永久，長局 50+ 輪可達 100+。
- **修法**：`onTurnEnd` 加 `PRIDE_BONUS_CAP=100`，達上限不再增加（log 顯示「已達上限」）。

##### A3. 事件 banner 靠左 bug（🔴 真 bug）
- `eventBannerSlideIn` keyframe 使用 `transform:translate(-50%, ...)` 但 `#ev-banner` 是普通 block 元素（由 body flex 置中，非 fixed/left:50%），導致動畫結束後 banner 永久向左偏 banner 寬度的一半（`animation-fill-mode: both` 又讓 -50%X 永留）。
- **修法**：keyframe 改成只動 Y 軸 `translateY(...)`，X 不平移。
- **驗證**：其他 14 個 `translate(-50%, ...)` keyframe 都搭配 `position:fixed; left:50%` 容器使用，無同類問題。

#### B. 新功能（2 項）

##### B1. 臨時加成格子脈動高亮
- 新增 CSS `.cell.temp-buff` / `.cell.temp-debuff`（金色 / 紅色脈動光環，1.6s ease-in-out infinite）
- `renderGrid` 偵測 `cellMods` / `cellPctMods` 任一為非零時加 class（永久加成 `permCellMods` / `leyaPctMods` 不算）
- 區分臨時加成（事件、加班辦公室、派遣總部、磁力板）與永久升級

##### B2. 背景音樂模組 `BGM`
- Web Audio API 程序化生成（無外部檔），單檔自包含
- 鋪底：C2 + G2 + E3 sine/triangle 加 LFO 慢震顫，低通 1400Hz 暖化
- 琶音：C 大調五聲音階上下行（C4-E4-G4-A4-C5），620ms 一音
- master gain 0.020（很輕）
- 新 `🎵`/`🔇` toggle 按鈕在 header（保存偏好至 localStorage）
- 偏好為「開」時，BOOT 後等首次 user gesture 自動啟動（避開瀏覽器 autoplay policy）

#### C. 轉運中心 / 物流轉運中心 修復

##### C1. desc 文字錯誤
- 原寫「放置時變成**物流中心**」，實際變成 `logistics_up/down/left/right`（即「**物流方向**」設施，**不是** `logistics_center`）
- desc 改為「放置時變成物流（→↓←↑）」

##### C2. 複合卡含轉運中心時不觸發 picker（🔴 bug）
- 單張放置與 overlay 疊加都會呼叫 `showTransferHubDirPicker`，但 **複合卡放置分支沒呼叫**，導致 grid 卡在 `transfer_hub` ID 永不轉換為實際物流方向（默默使用預設 `dir:'right'`）
- **修法**：複合卡分支加入偵測，若任一 part 為轉運類則呼叫 picker；若兩 part 皆為轉運類，則用 `onDone` callback 串接（`showTransferHubDirPicker(r,c, ()=>showTransferHubDirPicker(r2,c2))`）

##### C3. `showTransferHubDirPicker` 重構
- 集中 finalize 邏輯：替換舊 picker / Esc / 點外面 / 選方向 4 種路徑統一收斂到 `_finalize()`，保證 cell 永遠不會卡在 `transfer_hub`/`logistics_hub`
- 加入 `onDone` 參數，給複合卡串接用

#### D. 古代機械工廠「視為 4 工廠」計數規則（PM 規格）

##### D1. PM 規則
> 投入古代機械工廠時，當成只投入一個設施，但它算做 4 個工廠。即只進行一次投入，**投入觸發的效果只計算一次**。但**涉及「投入工廠次數」的計數時，它算做 4 次**。

##### D2. 新 helper（index.html:4179-4204）
- `_factoryWeight(bId)`：factory/adv_factory=1, ancient_factory=4, 其他=0
- `countFactoryHits(path)`：facPath 加權總和
- `_runPartnerOnBuildingHit(bId)`：抽出 partner hook 觸發邏輯（供 special FX 早 return 路徑顯式呼叫）

##### D3. 修改點
| 位置 | 變更 |
|---|---|
| `bulk_store` factoryHits（5134） | 改用 `countFactoryHits`：ancient ×4 |
| 古代工廠 +8 bonus（6347） | 改用 `countFactoryHits`：ancient ×4 |
| `factory_owner.onBuildingHit`（2311-2316） | 加上 `bId==='ancient_factory'` → +4；同時補上 `adv_factory` → +1 |
| `ore_merchant.onBuildingHit`（2297） | 補上 `adv_mat_factory` → +1（基礎合夥人之前漏認高級版） |
| `ancient_factory(fx)`（5750） | `fx.hit()` 後顯式呼叫 `_runPartnerOnBuildingHit('ancient_factory')`，補上早 return 跳過的 partner hook |
| `ancient_factory_part` desc（2104） | 改為「2×2 占位格，本身無獨立效果；計入『視為 4 工廠』的工廠數量」 |

#### E. 商店類 special FX 跳過 shop_owner（系統性修復）

##### E1. 問題
所有有 special FX 的商店設施，FX 內 `fx.hit()` 設 `_fxDone=true` → 跳過 5970 後的通用 onBuildingHit → **shop_owner 永遠 0 觸發**。涉及 6 個設施：

| 設施 | 行號 | 加入 |
|---|---|---|
| dept_store 百貨公司 | 5183 | `_runPartnerOnBuildingHit('dept_store')` |
| small_shop 小型販售商 | 5119 | `_runPartnerOnBuildingHit('small_shop')` |
| scalper 黃牛販子 | 5135 | `_runPartnerOnBuildingHit('scalper')` |
| bulk_store 量販店 | 5152 | `_runPartnerOnBuildingHit('bulk_store')` |
| trade_zone 貿易特區 | 5514 | `_runPartnerOnBuildingHit('trade_zone')` |
| convenience 超商 | 5646 | `_runPartnerOnBuildingHit('convenience')` |

##### E2. shop_owner 加入「視為 4 商店」規則
- 與古代工廠同模式：`bId==='dept_store'` → +4，其他 isShopType → +1（2304-2308）
- 新 helper `_shopWeight(bId)` / `countShopHits(path)`（同 `_factoryWeight` / `countFactoryHits` 模式）

#### F. 中央監督局 嚴格按 facPath 計算（PM 規格）

##### F1. PM 要求
> 嚴格按照「每經過一個工廠 +2」執行（desc 字面意思）

##### F2. 改動（6423-6443）
- 舊：`eachCell` 計場上工廠**格數** × 2（含 `_bureauFiredThisTurn` 防多 send 重複）
- 新：`countFactoryHits(G.inv.facPath)` / `countShopHits(G.inv.facPath)` / `countMatFactoryHits(G.inv.facPath)`，每次 send 按該 send 實際**經過數**獨立計算
- 移除 `_bureauFiredThisTurn`（無需防重複，每 send facPath 不同）
- 新 helper `countMatFactoryHits(path)`：filter `mat_factory` / `adv_mat_factory`

#### G. 環境感應站 每格只算一次

##### G1. 問題
desc：「周圍 4 格每有 1 個**設施** +2」（per-cell），但 `countAdjacentFacilities` 連疊加設施都算（一格 base + overlay = 2）

##### G2. 修法（9647-9664）
- 移除 `getOverlays(ar,ac).forEach(()=>count++);` 行
- 保留 dept_store anchor 唯一識別邏輯（避免 2×2 part 重複計數）

#### H. 人力派遣 改用 `fx.hit()`

##### H1. 問題
`staffing` 用 `fx.next()` 不推 facPath，跟同類「資源通過時 +1 人材」的 `cafeteria`（用 `fx.hit()`）不一致 → 終點站 / 螺旋物流站等「通過設施數」計數忽略人力派遣

##### H2. 修法（5613-5631）
- 改用 `fx.hit()`
- 移除原本顯式 `fx.pulse(); fx.updateCard();`（`fx.hit` 內部已含）
- 保留 transform-flash + badge 視覺反饋

#### I. 強化增幅裝置 改被動光環機制（PM 規格）

##### I1. PM 規則
> 只要強化增幅裝置在小鎮上，周圍 4 格的設施獲得 +2。位置變動（自己或鄰格設施移動）→ 離開光環範圍的設施失去 +2

##### I2. 舊行為（被改）
- `adv_booster(fx)` 每次資源通過時，周圍 4 格 cellMods += 2
- 多次通過同回合會累積疊加（+2 / +4 / +6）

##### I3. 新架構：derived 欄位 `G.boosterAura`
- `recomputeBoosterAura()`（3541-3554）：掃 grid，每個 強化增幅裝置 給周圍 4 格設施 +2 寫入 `G.boosterAura[k]`
- 設施位置變動時呼叫，覆蓋整張 dict
- derived 性質：可從 grid 完全重建，不需序列化

##### I4. 接點
| 觸發點 | 行號 | 用途 |
|---|---|---|
| `onFacilityPlaced` 結尾 | 8282 | 放置設施 |
| `onFacilityMoved` 結尾 | 9757 | 移動設施 |
| `destroyFacility` 末段 | 9608 | 消滅設施 |
| `restoreGridSnapshot` | 3571 | 排列模式 cancel |
| `deserializeGame` 末段 | 10911 | 讀檔重建 |
| 地震事件結尾 | 3729 | 全圖打亂 |
| 內亂事件結尾 | 3899 | 全圖打亂 |
| `mega` 物件序列化 | 11026 | 工業化 snapshot |

##### I5. 7 個 cellMods 讀取點同步加入 `boosterAura`
| 用途 | 行號 |
|---|---|
| dept_store FX 2×2 加成聚合 | 5211 |
| 疊加 pipeline cellMod | 5843 |
| stepWithMover 通用 cellMod | 6218 |
| renderGrid 顯示 modVal | 7950 |
| 設施 tooltip（單獨顯示「強化增幅裝置光環: +N」） | 8628 |
| MEGA_SIM gridCtx | 11236 |

##### I6. `adv_booster(fx)` 簡化（5697-5703）
- 移除舊「周圍 cellMods += 2」邏輯
- 僅保留「投入時自身 +4」base FX
- 光環由 helper 維護

##### I7. desc 改寫（2090）
舊：「任意+4。周圍設施獲得 +2。」
新：「任意+4。周圍 4 格設施被動獲得 +2（位置變動時更新）。」

#### J. 變更檔案

| 檔案 | 修改 |
|---|---|
| `index.html` | A 段 3 個 bug 修；B 段 BGM 模組 + temp-buff CSS；C 段 picker 重構 + 複合卡分支 + desc；D 段 3 個 helper（`_factoryWeight` / `countFactoryHits` / `_runPartnerOnBuildingHit`）+ 4 處改用；E 段 6 個 special FX 加顯式 partner hook + 2 個 helper（`_shopWeight` / `countShopHits`）；F 段中央監督局重寫 + `countMatFactoryHits`；G 段 `countAdjacentFacilities` 移除 overlay；H 段 staffing fx.hit；I 段 `recomputeBoosterAura` + 11 個接點 + 7 個讀取點 |
| `VentureTown_GameDoc.md` | 索引表 + 新 pattern 補完；本 Session 36 |

#### K. 已知未處理項目

- 大型設施（巨人村 / 世界奇觀 / 移動都市）效果未審
- 電子系（電子工廠 / 電子輸送帶）疊加邏輯未審
- 中央貿易代理 / 中央科技研發 / 中央電子網路 未審
- 拆遷系（爆破裝置倒數 / 地基不穩定站 / 磁力板）未審
- 物流系（螺旋物流站 / 物流放大器 flag 機制）未審
- 人力銀行 / 派遣總部 互動未審
- 強化增幅裝置 desc 疑問已決：被動光環（PM 確認）

---

## Session 37（2026-04-27）— 合約系統實作（Phase A→D）

### A. 框架（Phase A）
- 註冊：`CONTRACTS` 物件 / `CONTRACT_POOLS = {r2,r4,r6}` / `CONTRACT_TRIGGER_ROUNDS = [2,4,6]`
- 結構：每張合約具 `{id, name, emoji, pool, permanent, durationOffset, immediateText, guaranteeText, compensationText, onAccept, checkProgress, onComplete, onFail, hooks, failConvertsToPermanent}`
- runtime 狀態：`G.activeContracts:[]` / `G.contractState:{}` / `G.contractCounters:{}` / `G.contractHistory:[]`
- hook 整合：`runContractHook(name, ...)` 串接 onTurnStart / onTurnEnd / onSettle / onBuildingHit / onRoundStart 五個既有觸發點
- 結算時機：`performWinSettlement` 迴圈內 `G.round++` 之前呼叫 `checkContractDeadlines(G.round)`，到期合約執行 onComplete / onFail
- 多輪連跳補發：performWinSettlement 結尾把跳過的觸發輪 (`startingRound < tr < finalRound`) 加入 `_contractChooserQueue`；startRound 末延遲 800ms 啟動 `_kickContractChooser`，依序逐一彈出
- UI：工具列 📜 大圖示按鈕（含 ×N 角標 / 違約紅點）→ 中央 modal 滾動瀏覽 active 合約 + 進度條
- 合約 chooser modal：重用 `showCardChooser` 但隱藏 skip 按鈕（強制必選）

### B. 第 2 輪池（12 張，全 durationOffset:0）

| 名稱 | 即時 | 擔保 | 賠償 |
|---|---|---|---|
| 商業 / 連鎖 / 加工 / 工業 / 務農 / 量產 | +10 收益 | ≥3 商店/工廠/原料廠（投入過 / 不同格子 各 2 變體） | 下輪目標 ×1.5 |
| 積累 | +10 收益 | 任意資源 ≥20 | 手牌資源 →1 |
| 農業集中 / 工業集中 / 商業集中 | 對應設施 1 張 | ≥5 次原料廠/工廠/商店投入 | 隨機 2 格加成歸零 |
| 爆發 | 1 張 N 設施 | 單次投入 ≥10 收益 | 下輪目標 ×1.5 |
| 進化 | 1 張 N 設施 | 場上有 R 稀有度設施 | 清空小鎮+發 1 原料/1 工/1 商 |

#### 配套追蹤計數器（per-round，startRound 重置）
- `roundShopHits / roundFactoryHits / roundMatFactoryHits`（觸發次數）
- `roundShopCellsHit / roundFactoryCellsHit / roundMatFactoryCellsHit`（Set，已投入過的格子）
- `roundMaxResourceValue`（手牌資源歷史最高，由 updateCard 追蹤）
- `roundMaxSingleSendProfit`（單次投入最高收益，由 finish 追蹤）
- `roundRedirectHits`（轉向次數，由 redirect 分支追蹤）
- `roundMaxTalent`（人材歷史最高，由 renderTalentPanel 追蹤）

#### 違約處罰共用：`G._contractGoalMultPending` 累積倍率
多份合約失敗會相乘累積，套用到下一輪 goal 計算（在 `G.goal=Math.round(...)` 之後乘上）。

### C. 第 4 輪池（12 張）
- **6 dupes**（與第 2 輪共用 id）：accumulate / farm_focus / industry_focus / commerce_focus / burst / evolve
- **6 新合約**：
  - **交通**：沒拆遷隊則贈送；本輪 ≥2 次轉向；違約消滅所有物流中心
  - **板塊（永久）**：贈送動態加強器；每回合 onTurnStart 觸發地震事件
  - **荒蕪**：下次商店 5 張全免費；本輪 ≥4 廢墟；違約：4 格設施變爆破裝置
  - **員工**：+10 人材；本輪 ≥50 人材歷史最高；違約：缺多少從手牌資源扣多少
  - **擴展（永久）**：小鎮永久 +1 級；商店費用 ×5；finish 時每空格 −10 收益
  - **電極（永久）**：沒電子精工師則贈送；非電子設施在 stepWithMover 跳過

### D. 第 6 輪池（9 張，多為 durationOffset:2 或永久）
- **大群**：+20 收益；下兩輪 ≥25 手牌（歷史最高）；違約：清空小鎮設施 + 手牌（保留合夥人/人材/格子加成）
- **地產**：沒擁慶記則贈送；下兩輪 ≥100 個賣出（destroyFacility 計數）；違約：下 3 回合收益歸零
- **產線**：+1 隨機物流方向；下兩輪單次投入 ≥11 格；違約：下 3 回合收益歸零
- **巨人**：贈送惡魔巨人 + 4 種大型；下兩輪設置過 4 種；**failConvertsToPermanent**：違約後永久 demonGiantDestroy 多殺一個合夥人
- **終點（永久）**：場上 <2 終點站時贈送 2 張；finish 檢查 facPath 首末非 terminal → 該次收益歸零
- **姊妹（永久）**：沒譚雅蕾雅則贈送；stepWithMover 跳過 overlay 不滿 3 的設施
- **惡魔（永久）**：沒傲慢則贈送；招募池過濾為 isDemon（含重複）；onTurnStart 隨機失去一個合夥人
- **工會（永久）**：沒工會主席+分身大師則贈送；stepWithMover 跳過 `cellTalentInvested[k] < 6` 的設施
- **暗叫（永久）**：失去拆遷隊（如有）；手牌設施卡背顯示（含商店 chooser）；複合卡透露形狀但 emoji 改 ❓；點擊兩個相同設施配對消除並 +30 收益

### E. 既有系統整合的 hook 點

| 整合 | 位置 | 用途 |
|---|---|---|
| `_trackContractHits(r,c,bId)` | `_hit()` + 基礎設施轉換路徑 | 每經過設施計入 hits 與 cellsHit Set（**S37 修補：基礎路徑漏算**）|
| `_trackContractMaxResource` | `updateCard` | 手牌資源歷史最高（積累合約用）|
| `_trackContractMaxSendProfit` | `finish` | 單次投入最高收益（爆發合約用）|
| `_resetContractRoundCounters` | `startRound` 開頭 | per-round 計數器重置 |
| 合約跳過判定 `_contractCellSkipReason` | `stepWithMover` `if(bId)` 起頭 | 電極/姊妹/工會 三合約的「不參與投入」 |
| terminal / expand / zero-profit-turns | `finish` 末段（totalTurnProfit 計算前） | 終點/擴展/地產‧產線違約 收益修正 |
| `getPermShopCost` ×5 | 商店費用查詢 | 擴展永久效果 |
| `doPermShop` barren boost | 商店打開時 | 荒蕪：5 張全免費（一次性） |
| `demonGiantDestroy` 多殺 | 惡魔巨人 destroy 流程 | 巨人合約違約：第二次 chooser |
| `onTalentDropCell` `cellTalentInvested` | 人材投入設施時 | 工會合約：per-cell 累計 |
| `destroyFacility` soldCount | 設施被消滅時 | 地產合約：累計賣出計數 |
| `id==='get_partner'` 招募 | 招募 chooser 池過濾 | 惡魔合約：限定 isDemon |

### F. 修補的合約相關 bug

1. **多輪連跳合約錯失**：`performWinSettlement` while 迴圈不會呼叫 startRound，第 2/4/6 輪過關被連跳時 chooser 永不觸發 → 補發隊列機制
2. **複合卡無法因蕾雅疊加**：`canPlaceCompound` 直接拒絕非空格 → 改 per-part 走 `_canPlaceCompoundPart` 支援 蕾雅 / 物流之王 / 倉儲女王 / 中央電子網路 多種疊加
3. **大型設施可變複合卡**：`COMPOUND_EXCLUDE` 為硬編碼列表 → 加 `_isCompoundExcluded` helper 自動排除 `isLarge:true`
4. **負收益顯示 +-4**：`<span>+${totalTurnProfit}</span>` 當值為負 → sign-aware + 紅綠色切換
5. **暗叫卡背 inspector 洩露**：`data-bid` attr 仍存在 → hideAsBack 時不輸出
6. **暗叫複合卡 emoji 可見**：CSS `visibility:visible` → `color:transparent` + `::after content:'❓'` 占位
7. **暗叫 dept_store_part 配對繞 indestructible**：`_handleHiddenCallPair` 起頭加 part 名稱攔截
8. **商業集中（及姊妹兩款集中）追蹤漏算**：基礎設施路徑無 `_trackContractHits` 呼叫 → 補在 `facPath.push` 之後
9. **deserializeGame 舊存檔合約欄位 undefined**：renderContractBtn `.length` 立即 crash → reviveSets 後補填預設值
10. **setTimeout chooser round 捕獲**：800ms 內 G.round 可能變動 → 區域變數捕獲

### G. 暗叫合約（Phase C）特殊處理

- **手牌渲染**：`renderFanHand` 加 `card-back-fac` class；compound 額外加 `fc-compound`；data-bid 在卡背模式不輸出
- **chooser 卡背**：`showCardChooser` 自動為「無 pid 且 extraClass 不含 contract-card」的卡套卡背
- **配對消除**：`_handleHiddenCallPair(r,c)` + onCell 攔截（在「正常放置模式」之前）；`G._hiddenCallPickedCell` 跨 startRound 重置；render cell 加 `hidden-pair-selected` / `hidden-pair-target` highlight class
- **CSS**：`.fan-card.card-back-fac` 深紫漸層 + 中央 🃏；`.cell.hidden-pair-selected` 橘脈動 / `.cell.hidden-pair-target` 綠虛線

## Session 38（2026-04-27）— Session 37 合約系統審查後續 + 平衡與 UI 修補

### A. 合約 chooser 模組變數在 deserializeGame 後不重置（critical，commit 1275b98）

**問題**：`_contractChooserQueue` / `_contractChooserActive`（index.html:4109-4110）為 module-level `let`，`autoLoad` 與 `importSave` 兩個進入點都會呼叫 `deserializeGame`，但**不重置這兩個變數**。觸發情境（皆不需重新整理頁面）：

1. 玩家進到第 2 輪、合約 chooser modal 跳出，`_contractChooserActive=true`
2. 玩家此時匯入舊存檔（或失敗後 newGame）→ modal DOM 被收掉，但 `_contractChooserActive` 殘留 true
3. 之後到新存檔的第 2/4/6 輪：`_kickContractChooser()` 第一行 `if(_contractChooserActive) return;` → **chooser 永遠不開**，startRound 已 queue 進去但靜默卡死

**修法**（index.html:12560-12562，2 行）：在 deserializeGame 合約欄位補填區後加重置：
```js
_contractChooserQueue = [];
_contractChooserActive = false;
```

### B. 工會合約：6 人材 → 4 人材

**改動**：
- `union_pact_contract.compensationText`：「至少 6 人材」→「至少 4 人材」（index.html:3839）
- `_contractCellSkipReason` 工會分支：`tcInv < 6` → `tcInv < 4`（index.html:4028），UI 顯示分母 `${tcInv}/6` → `${tcInv}/4`

**理由**：原 6 人材門檻在實際遊玩中過高（每格 6 次 talent drop），玩家難以達到，導致工會合約幾乎是純 debuff 缺乏正向誘因。降到 4 後仍有挑戰但可達。

### C. mega_elec_supply / giant_village / world_wonder 即使周圍 4 格全空也無法放置

**問題**：這三個設施都是 `needs2x2:true, isLarge:true` 但**沒有專屬條件**（不像 dept_store 要 2×2 商店、ancient_factory 要 2×2 工廠）。`tryPlaceAtCell` 的 2×2 放置分支（index.html:6097）：

```js
let anchor = isDept ? findShop2x2(r,c) : (isAncient ? findFactory2x2(r,c) : null);
if(!anchor && hasPartner('big_corp')){ anchor = findAny2x2(r,c); ... }
```

非 dept/ancient 的大型設施 anchor 直接是 `null`；只有持有大財團合夥人才會走 fallback。**沒有大財團時，4 格全空也無路徑可放**，玩家拿到牌但永遠放不下去。

**修法**：
1. 新增 `findEmpty2x2(r,c)` helper（index.html:5683-5691），純空格 2×2 偵測，不破壞任何設施：
   ```js
   function findEmpty2x2(r,c){
     const gn=GN();
     for(let dr=0;dr>=-1;dr--) for(let dc=0;dc>=-1;dc--){
       const tr=r+dr, tc=c+dc;
       if(tr<0||tc<0||tr+1>=gn||tc+1>=gn) continue;
       if(!G.grid[tr][tc]&&!G.grid[tr][tc+1]&&!G.grid[tr+1][tc]&&!G.grid[tr+1][tc+1]) return [tr,tc];
     }
     return null;
   }
   ```
2. 插入專屬條件失敗後、大財團 fallback 之前（index.html:6099-6101）：
   ```js
   if(!anchor && !isDept && !isAncient){
     anchor = findEmpty2x2(r,c);
   }
   ```

**保留**：實際放置仍是「單格行為」（line 6118-6120 `G.grid[r][c]=bldgId`，其餘 3 格保持空），與現有實作一致；UI 預覽也只顯示 1 格，與此一致。`needs2x2` 純粹作為「需要 2×2 空間」的閘門。

### D. 角色立繪遮擋手牌互動

**問題**：
- `#char-tray` z-index **98**（index.html:1109），`#hand-fan-area` z-index **60**（index.html:908） → 立繪疊在手牌之上
- `#char-tray img` `pointer-events: auto`（index.html:1161） → 攔截點擊
- 結果：手牌過多時最右側卡片被立繪覆蓋且無法點擊／拖曳，玩家無法投入資源

**修法**（index.html:1104-1124）：

1. `#char-tray` z-index **98 → 50**（< hand-fan 60），讓手牌視覺與互動都優先
2. 立繪仍可被點擊：`#hand-fan-area` 容器是 `pointer-events: none`（只 `.fan-card` 收事件），未被卡片覆蓋的立繪部分可由事件穿透收到 click → `charClick()` 仍可正常觸發
3. 拖曳卡片時加強：`body.card-dragging #char-tray { opacity: 0.2 }` + `img { pointer-events: none !important }`，立繪幾乎消失避免擋投入箭頭

**z-index 重排對照**：

| 元素 | 舊 | 新 |
|---|---|---|
| #char-tray 角色立繪 | 98 | **50** |
| #hand-fan-area 手牌容器 | 60 | 60（不變）|
| .dbtn 投入箭頭（拖曳時）| 70 | 70（不變）|
| #char-bubble 對話泡泡 | 99 | 99（不變，仍最上層）|

**未做**：當手牌很多時主動偏移立繪位置（如 translate-x），目前以淡出 + 點擊穿透解決即可，視覺保留立繪上半部仍可見。

---

## Session 39（2026-04-28）— 移動 session 統一化（mobile_city 剝削修補）+ 取消還原

### A. 移動都市內反覆 swap 無限觸發拆遷補償局/動態加強器/貿易特區（critical）

**問題**：`mobile_city` 啟動後，玩家可在 8 鄰格內反覆執行 A↔B↔A↔B 交換。每次 swap 都會觸發 `onFacilityMoved`（index.html:6350-6351 共兩呼叫，雙端各一），其內部三項「移動觸發」效果**對 freeRearrange 有 gating，對 mobile_city 沒有**：

| 觸發效果 | 修補前 mobile_city 行為 | 暴利 |
|---|---|---|
| 拆遷補償局 +4 | 每 swap 觸發一次 → +4 × bureauCount | swap N 次 → +4N × bureauCount |
| 動態加強器計數 | 每 swap 雙端各 +1 → cell 計數 +2 | swap N 次 → 計數 +2N，FX 每次 ×4 累加 |
| 貿易特區 +2 永久 | 商店穿越鄰接邊界每次 +2 | 來回 swap 灌爆 |

`onFacilityMoved` 第 11461 行原本只 gate `G.freeRearrange`，未涵蓋 `G._mobileCityMode`；`_maybeAddTradeZoneBonus` 9937 同樣只看 freeRearrange；dynamic_amp 計數 11478-11491 完全沒 gate。

### B. 統一 helper：`_isInMoveSession` / `_flushMoveSession`

新增於 index.html:11444-11485：

```js
function _isInMoveSession(){ return !!(G.freeRearrange || G._mobileCityMode); }
function _flushMoveSession(){
  // 拆遷補償局：每補償局 +4
  if(G._demolishBureauPending){ ...findCells(demolish_bureau)...G.profit+=N*4; }
  // 貿易特區累積 +2 加成
  if(G._tradeZonePending&&G._tradeZonePending.length>0){ ...forEach _addTradeZoneBonus... }
  // 動態加強器：每個被移動過的 dynamic_amp cell 計 1 次
  if(G._dynamicAmpPending&&G._dynamicAmpPending.size>0){ ...forEach G.dynamicAmpMoves[k]++... }
}
```

修法擴及四處：
1. `onFacilityMoved` 11491：拆遷補償局 gate 改 `_isInMoveSession()`
2. `onFacilityMoved` 11513-11527：dynamic_amp 計數 session 內改寫入 `G._dynamicAmpPending`（Set，dedup）；非 session 維持原邏輯
3. `_maybeAddTradeZoneBonus` 9924：`G.freeRearrange` → `_isInMoveSession()`
4. `confirmRearrange` 8644：取代 22 行內聯邏輯 → 單行 `_flushMoveSession()`

新欄位 `G._dynamicAmpPending`（Set<key>）：
- 進入點防禦清空（move_fac 8453、demolition 拆遷隊 10885）
- cancelRearrange 8632 也清（snapshot revert 不該保留 pending）
- deserializeGame 12703 與 `_demolishBureauPending` 同行 delete（mid-session 存檔重載自動清）
- Set 透過既有 `serializeGame`（12539 `v instanceof Set?{_s:[...v]}:v`）與 `reviveSets`（12550-12567）正常 round-trip

### C. mobile_city 加 saveGridSnapshot / restoreGridSnapshot

**動機**：原本 mobile_city「取消」按鈕只清模式而**不還原 swap**（與 cancelRearrange 行為不一致），且不消耗 `_mobileCityUsedThisTurn`，玩家可 啟動→swap→取消→啟動→swap→取消 鏈式繞過 slot。即使 B 已修「per-session 1 trigger」，N 次 cancel = N 次 trigger 仍可累積。

**修法**：新增 `startMobileCityMode()` / `endMobileCityMode(committed)`（index.html:11472-11502），啟動時 `saveGridSnapshot()`，commit 時 `deleteGridSnapshot()` + flush，cancel 時 `restoreGridSnapshot()` + 丟棄 pending。snapshot 涵蓋 grid / 13 個 KEYED_DATA_FIELDS / ruinCells / envy.cellBonus，保證 cancel 完全還原。

按鈕 onclick 改為單一函式呼叫（index.html:9821-9822、9826）：
- `startMobileCityMode()`
- `endMobileCityMode(true)` / `endMobileCityMode(false)`

| 操作 | 修補前 | 修補後 |
|---|---|---|
| 啟動 | 直接設 mode=true，無 snapshot | `saveGridSnapshot()` + 清 pending + 設 mode=true |
| 完成 | 設 used=true（slot 消耗），無 flush，per-swap bonus 已給 | flush bonuses（per-session 1 次）+ deleteSnapshot + used=true |
| 取消 | 清 mode 但保留 swap，per-swap bonus 已給 | restoreSnapshot（grid 還原）+ 丟棄 pending；不消耗 slot（可重新啟動） |

cancel 還原後不消耗 slot 是合理的（玩家明確表達「不要這次操作」），且配合 snapshot 還原無 swap 也無 bonus，無剝削風險。

### D. desc 文字補強

| 設施 | 修補前 desc | 修補後 desc |
|---|---|---|
| 拆遷補償局（demolish_bureau）| 「排列模式整段視為 1 次」 | 「**自由排列／移動都市**整段視為 1 次」 |
| 動態加強器（dynamic_amp）| 「每次使這個設施額外獲得 +4」 | 「每次使這個設施額外獲得 +4（**自由排列／移動都市整段視為 1 次**）」 |

### 行為差異對照（修補前後）

| 場景 | 修補前 | 修補後 |
|---|---|---|
| mobile_city swap 5 次（dynamic_amp 是其中之一）| demolish_bureau +4×5×N、dyn_amp 計數 +2×5=10 | demolish_bureau +4×N×1、dyn_amp 計數 +1（unique cell） |
| freeRearrange 拖曳同 dynamic_amp 多次 | dyn_amp 計數每拖一次 +1 | dyn_amp 計數整段 +1 |
| trade_zone 邊界商店反覆穿越 | 每穿越 +2 永久 | session 結束 1 次 +2 |
| mobile_city 取消 | swap 保留、bonus 已給、slot 不消耗 → 可串接剝削 | grid 還原、無 bonus、slot 不消耗（單純放棄） |
| mid-session 存檔重載 | _dynamicAmpPending 殘留可能誤觸發 | 12703 deserialize 一律 delete |

### 影響的 desc / 數值平衡考量

- dynamic_amp 在 mobile_city 內的數值大幅下降（×N → ×1），原本是 bug 級暴利，修補後恢復為設計預期值。
- 其他「需判斷設施是否被移動過」的合夥人/設施目前審計未見漏網（地皮炒家在 onFacilityMoved 內判定來源格變空，與 swap 次數無關，未受影響）。

### E. ancient_factory_part 被當作 N 級設施抽進玩家手牌

**問題**：`ancient_factory_part` 是古代機械工廠 2×2 的占位格（line 2299），不應出現在玩家手牌中。但：
1. `isPoolableBldg`（index.html:4515）僅排除 `dept_store_part`，**漏排** `ancient_factory_part`
2. `BLDG_RARITY` 沒定義 `ancient_factory_part`，`getBldgRarity` fallback 為 `'N'`（line 4588）
3. N pool 過濾條件 `isPoolableBldg(id)&&getBldgRarity(id)==='N'`（lines 2409 / 2771 / 4928 等）→ 占位格被當 N 級基礎設施抽中
4. Dev panel exclude（line 14156）也漏排，dev 模式下顯示為 N

**修法**：兩處加入排除（與 dept_store_part 對稱）：
- index.html:4516 `isPoolableBldg`：加 `||id==='ancient_factory_part'`
- index.html:14156 dev panel：加 `||id==='ancient_factory_part'`

### F. 強化增幅裝置（adv_booster）作為複合設施 overlay 時光環不立即生效

**問題**（兩個獨立子問題）：
1. `recomputeBoosterAura`（4865-4877）只用 `findCells((r,c,b)=>b==='adv_booster')` 掃 base 層，**完全不檢查 overlay 層**。adv_booster 作為複合卡 overlay 在 `G.cellOverlay[k]`，光環函式看不到 → 周圍格永遠拿不到 +2
2. 複合卡放置流程（6028-6047）後**沒呼叫** `recomputeBoosterAura`。複合卡的 `_placeCompoundPart` 在「empty cell → 'placed'」分支不會走 `placeEffect`/`onFacilityPlaced` 鏈（line 5810-5811 直接 return），於是即使 adv_booster 在 base 層，empty cell placement 也不觸發 aura recompute

**修法**：
1. `recomputeBoosterAura`（4865-4880）改為雙層掃描：
```js
for(let br=0;br<gn;br++) for(let bc=0;bc<gn;bc++){
  const isBase=G.grid[br][bc]==='adv_booster';
  const isOv=getOverlays(br,bc).includes('adv_booster');
  if(!isBase&&!isOv) continue;
  // ... 對周圍 4 格 +2
}
```
2. 複合卡放置末段（line 6052）：`if(part1==='adv_booster'||part2==='adv_booster') recomputeBoosterAura();`
   - leya / logistics_king/queen / center_elec_net 等既有 overlay 路徑透過 `placeEffect → onFacilityPlaced → recomputeBoosterAura` 鏈已能觸發，本次無需修改
   - 'placed'（empty cell）/ 'placedOnRuin' 兩個分支不走鏈，新增的呼叫覆蓋這兩個情境

**遺留**（未在本次處理）：複合卡 'placed' 分支整體不走 `onFacilityPlaced`，意味著 elec_factory（場上電子設施計數）/ trade_zone（鄰接商店設置 +2）等 onPlaced hook 在 empty cell 複合放置時也不觸發。屬更廣泛的 hook 漏發 pattern，影響面與重要性需要單獨評估。

### G. 「積累」合約：達到 20 → **增加 200**（語意改變）

**設計變更**（PM 指定）：合約「積累」的 guarantee 由「本輪任意資源**達到** 20 或以上」改為「本輪任意資源**增加** 200 或以上」。

舊語意只追蹤 `value` 的最大值（`roundMaxResourceValue`，依 hand card 觀察值取 max），新語意需追蹤 **單次送入過程中的成長 delta**（current value − send 起始值）的本輪最大值。

**實作**：
1. 新欄位 `G.contractCounters.roundMaxResourceIncrease`（_resetContractRoundCounters 重置為 0，line 4345）
2. `sendEl`（index.html:6699）在送入起始時記錄 `G._sendBaselineValue=startVal`（怠惰惡魔 -6 已先處理過）
3. `updateCard`（index.html:6613-6618）：每次值變化時計算 `delta = newVal − _sendBaselineValue`，若大於現有最大則更新
4. accumulate.checkProgress（3500-3508）改讀 `roundMaxResourceIncrease`、`max:200`、label 改「本輪資源最大增加值」
5. accumulate.guaranteeText 改寫，加註「（單次送入過程中的最大成長值）」釐清
6. deserializeGame 12738 加 `delete data._sendBaselineValue`（transient state 不跨存檔）
7. 既有 `roundMaxResourceValue` 與 `_trackContractMaxResource` 保留未動（可能供未來合約使用，移除為無謂改動）

**重要差異**：
- 舊「達到 20」：cards 進場 v=1，跑到 20 即達成。第一輪可能就完成
- 新「增加 200」：單次送入需從 baseline 成長 +200。需要設施鏈條足夠長 + 倍率夠高（典型需中後期才可能達成）。難度顯著提高，符合「積累」名稱

### H. BGM 程序化合成 → 外部 mp3，依輪數切歌

**問題**：原 BGM 模組為 Web Audio 程序化合成，主音量 `MASTER_GAIN=0.020`（≈ -34dB）實質聽不見。改為外部 mp3 播放並依輪數切歌：

| 輪數 | 檔案 |
|---|---|
| 1–4 | `bgm/bgm_1.mp3` |
| 5–8 | `bgm/bgm_2.mp3` |
| 9+ | `bgm/bgm_3.mp3` |

**實作**（index.html:2108-2168）：BGM 模組重寫，使用 `HTMLAudioElement` + `loop:true`，音量 `0.18`：
- `pickIdxForRound(round)`：依輪數對應檔
- `ensureAudio(idx)`：延遲建立 / 切換 audio 物件
- `start / stop / toggle / preferOn`：API 保持不變
- 新 `syncToRound()`：輪數變動時切歌（active 才生效）

**hookpoints**：
- `startRound()` 末尾呼叫 `BGM.syncToRound()`（每輪開始）
- `deserializeGame()` 末尾呼叫 `BGM.syncToRound()`（載入存檔後依新輪數切歌）

**自動播放限制**：仍受瀏覽器 autoplay policy 限制，等首次 user gesture 後才能播放（既有 `bgmAutoStart` 機制接住）。

---

## Session 40（2026-04-28）— Post-Session-39 微調批次

Session 39 之後同日累積的多項擴展、平衡、UX、DEV 工具改動。

### A. BGM 預設開啟 + 標題畫面專屬 BGM

**A1. 預設開啟**：原本 `BGM.preferOn()` 只在 `localStorage['vt_bgm_on']==='1'` 時為 true，首次進站不會自動啟動。修法：
```js
function preferOn(){
  const v=localStorage.getItem('vt_bgm_on');
  return v===null?true:v==='1'; // 未設定預設 true，僅顯式 '0' 關閉
}
```
按鈕初始 icon 改為 🎵；`bgmAutoStart` 在 `preferOn=false` 時同步按鈕成 🔇。

**A2. 標題畫面 bgm_4**：BGM 模組加 `_scene` 狀態（'title' / 'gameplay'）與 `setScene(name)` API：
- `pickIdx()`：title → bgm_4 / gameplay → 依 `G.round`（1-4/5-8/9+）
- `_switchToCurrentIdx()`：統一切歌動作，`syncToRound` 與 `setScene` 共用
- `SM.goto(name)` 在 `enter()` 之前呼叫 `BGM.setScene(name)`，確保 enter 內 `autoLoad → deserializeGame → syncToRound` 已基於正確 scene 計算

### B. 擴展合約平衡

**動機**：原 `expand_contract`（永久效果）的負面平衡過重：商店費用 ×5、空格懲罰固定 −10/格。降低數值並改為比例式罰則：

| 項目 | 修補前 | 修補後 |
|---|---|---|
| 商店費用倍率 | ×5 | **×3** |
| 空格懲罰 | `empties × 10`（固定）| `min(1, empties × 0.05) × G.profit`（比例，clamp 到 profitAtStart）|
| compensationText | 「5 倍 / 每缺少一個 −10」 | 「3 倍 / 每缺少一個 −5%」 |

比例式收益越高、空格越多時罰得越重，比固定 −10/格更具壓力曲線。

### C. 3 個商店限定 N 設施 + 物流轉運中心 desc 修正

**新 N 設施**（依 `超賺.xlsx` 合夥人設施對照表）：

| 設施 | Emoji | 行為 |
|---|---|---|
| 貨櫃屋 | 🚛 | 重疊已有設施 → 該格 base + overlay 全部回手牌，每張 -2 收益 |
| 勞工兄弟屋 | 🏘 | 一般設施 passthrough；回合結束時自動清除 + 人材 +2 |
| 紅綠燈 | 🚦 | 只能蓋在 logistics_up/down/left/right；開方向 picker；未選退還 |

**機制接點**：
- 新常數 `SHOP_ONLY_FACILITIES`（index.html:4584）
- `isPoolableBldg` 排除（不會在事件 / 合約 / Tanya 等隨機池出現）
- `COMPOUND_EXCLUDE` 排除（不會在複合卡）
- `doPermShop` 池手動注入（`pool=[...BASIC, ...SHOP_ONLY]`）
- `tryPlaceAtCell` 早期分支處理 container_house / traffic_light 的特殊放置邏輯
- worker_brother_house 在 `finish()` 末段（temp_shed 旁）加 turn-end 清除 + 人材 +2

**物流 desc 修正**：

| 設施 | 舊 desc | 新 desc | 行為變化 |
|---|---|---|---|
| 轉運中心（transfer_hub）| 變成物流（→↓←↑）| 變成**物流站**（→↓←↑）| 文字釐清，無實際變化 |
| 物流轉運中心（logistics_hub）| 變成物流（→↓←↑）| 變成**物流中心**，可決定起始方向 | 放置後變成 `logistics_center`（會 perTurnRotate），玩家選擇的方向寫入 `G.cellRedirectDir[k]` |

**picker 統一化**：`showTransferHubDirPicker` 改成依當前 cell 內容決定行為：
- `transfer_hub` → 變 logistics_X（無 cellRedirectDir）
- `logistics_hub` → 變 logistics_center + 起始方向
- `logistics_X`（紅綠燈情境）→ 改向（不消耗 cellRedirectDir）

picker 加 `onCancel` callback，紅綠燈未選方向時退還手牌。

### D. 商店 offer 每回合鎖定

**問題**：`doPermShop` 每次呼叫都重 roll 池與抽取，玩家可開→取消→重開無限刷新內容，繞過設計上「每回合一次商店」的隨機性。

**修法**（index.html:9117-9168）：將本回合 offer 快取於 `G._permShopOffer = { ids, freeIdx, hasFree, barrenBoost, turn, round }`：
- 進入 doPermShop 時若 turn/round 仍相符則沿用快取，否則重 roll
- 荒蕪 boost 在首次生成時消耗（一次性語意保留）
- 購買時清除 offer（`_permShopUsed=true` 也擋下次開啟，雙保險）
- 取消不清除 offer（同回合再開仍是同一批）
- 跨存檔：offer 隨 G 序列化，載入後 turn/round 仍相符會沿用 → 阻擋 save-scum re-roll

### E. 物流站防禦 + sell-shake 特異度 + 立繪不裁切

**E1. 物流站 cellRedirectDir 防禦**：原本 `cellDir = (G.cellRedirectDir && G.cellRedirectDir[k]) || b.dir`，若 logistics_X 的 cell key 曾誤吃到 stale `cellRedirectDir`（例如過去是 logistics_center 後被覆蓋），會被錯誤覆蓋方向。

修法（index.html:7728-7729）改嚴格：
```js
const isPerTurnRot = b.perTurnRotate === true;
const cellDir = isPerTurnRot ? ((G.cellRedirectDir && G.cellRedirectDir[k]) || b.dir) : b.dir;
```
非 perTurnRotate 設施（logistics_up/down/left/right、transfer_hub）一律用 `b.dir`，**完全忽略** cellRedirectDir。

**E2. sell-shake CSS 特異度**：擁慶記房屋賣出模式下，已有 `.cell.temp-buff` / `.cell.event-preview` / `.cell.temp-debuff` 等 mask 的格子不會發抖。

根因：`.sell-shake` 特異度只有 1 class，被 `.cell.xxx`（2 classes）的 `animation:` 宣告覆蓋。

修法（line 592）：改為 `.cell.sell-shake`（同特異度，宣告較晚勝出）。

**E3. 立繪不裁切**：移除 `body.card-dragging #char-tray { opacity:0.2 }` 與 `img { pointer-events:none !important }`。z-index 50 已讓手牌（60）與投入箭頭（70）覆蓋立繪，符合「只要層級在上即可，不需切割立繪」的指示。

### F. 人材批量投入 UI + 合約輪次擴展

**F1. 批量投入 UI**（renderTalentPanel + onTalentDropCell）：

talent panel 新加按鈕條：

```
[🧑‍💼] ×8  ┃  ×1  ×2  ×5  全部
            ▔▔▔ (selected)
```

- `G._talentBulkSize`（值：1 / 2 / 5 / 'all'，預設 1，跨存檔保留）
- 選擇後拖一次人材到設施格 → 投入 `min(設定, 現有人材)` 次
- 每次投入仍觸發完整副作用：工會主席 +2 / 人類惡魔永久 +2 / 北漂者 -2 / 人力銀行計數 / 分身大師隨機格 +2 / cellMods+1 / cellTalentInvested+1 / `_hrTalentUsedCount`++
- 批量模式抑制 per-投入 log 避免刷屏，由總結 log 取代；人力銀行「+4 預約」trigger log 仍照發
- 重構 `_runTalentInvestSideEffects` 為純副作用 helper（不含 render）

**F2. 第 6 輪後每 2 輪合約 chooser**：

- 新增 `isContractTriggerRound(round)` helper：固定 `[2,4,6]` 與 `(round>6 && round%2===0)` 的聯集
- `pickContractCandidates(round)` 在 round>6 時合併 r2+r4+r6 池供再抽（已接受合約透過 ownedIds 過濾）
- `startRound` 與 `performWinSettlement` 多輪連跳補發改用迭代式檢查（取代原本只迭代固定 [2,4,6]）

| 輪數 | 合約池 |
|---|---|
| 2 / 4 / 6 | r2 / r4 / r6（既有）|
| 8 / 10 / 12... | **r2+r4+r6 合併**（新）|

### G. DEV 合約面板加「點擊獲得指定合約」grid

**新功能**（DEV._contractFilter）：
- 池篩選按鈕（全部 / R2 / R4 / R6）與設施/合夥人區一致
- 卡片 grid：每張合約 emoji + 名稱（依池上色 R2 藍 / R4 紫 / R6 金）
- hover tooltip 顯示完整資訊（池 / 持續輪數 / 立即 / 擔保 / 賠償文字）
- 點擊直接 `acceptContract(id)`；已接受合約灰階 + pointer-events:none
- 額外加「觸發第 8 輪 chooser（合併池）」按鈕測試 F2 邏輯
- 保留既有功能：force resolve / clear / open panel / chooser 觸發

### 整體影響

- **修補問題**：商店 reroll 剝削、移動 session 統計入侵、ancient_factory_part 入手牌、booster 複合 overlay 不亮、yongqing sell mask 衝突、物流站方向誤套、立繪遮擋手牌
- **新功能**：BGM mp3 + 場景切歌、3 個商店工具設施、人材批量、合約輪次擴展、DEV 合約 grid
- **平衡調整**：擴展合約、積累合約（Session 39 G）

---

## Session 41（2026-04-28）— 投入預覽 UI + 設施耐用值系統

### A. 投入預覽（拖卡到方向箭頭顯示估算輸出）

**動機**：玩家拖元素卡到 `dbtn` 時無法預判落點與經設施轉換後的輸出。新增 `#invest-preview` 浮層，於拖曳期間顯示預期出口位置、輸出資源類型與數值。

**結構**（CSS index.html:880-908、HTML index.html:1525-1534）：
- `.ip-arrow` 方向箭頭、`.ip-emoji` 資源 emoji、`.ip-approx`「~」前綴、`.ip-value` 數值、`.ip-type` 類型 label、`.ip-badge` 右上角「估算」徽章
- 動畫：`ipPulse 1.4s` 脈動，徽章一起呼吸

**接線**：
- `onDirDragOver` index.html:6592 → `showInvestPreview(dir,idx)`
- `onDirDragLeave` / `onCardDragEnd` / `onDirDrop` index.html:6593-6603 → `hideInvestPreview()`

**模擬器** `_simulateInvestment(dir,idx)` index.html:6720-6764：
- 沿 `buildPath` 走格、套用 `BLDG.fn` 與 `b.out`
- 處理 `redirect`（含 `perTurnRotate` 物流中心當前方向、颱風/運輸異常時失效視為直通）
- 跳過 `req` 不符與耐用值耗盡格
- 出口格採 `lastCell`

**就近邊定位**（`showInvestPreview` index.html:6655-6697）：
- 出口格中心至格子區四邊距離取最小者，預覽放於該邊外側 + 14px padding
- viewport 邊緣 clamp
- 邊框與數值色用 `TCOLOR[type]`

**估算性質明示**：
- 右上角紅色 pill「估算」徽章
- 數值前綴 `~`（柔化色）

**已知限制**：模擬只跑 `BLDG.fn`，未進入 `FACILITY_FX[special]`、未套用永久加成 / overlay / 事件 buff / 合夥人修正。中後期誤差較大，UI 已用「估算」徽章向玩家明示為非精準值。

**附帶補強**：
- D：颱風 / 場風大師方向不符時 `onDirDragOver` 直接 hide，不誤導玩家以為可投入
- G：颱風 / 運輸異常時 redirect 視為直通（與 `stepWithMover` index.html:7895 對齊）

### B. 設施耐用值系統

**設計**：玩家設置在小鎮上的所有非大型設施（base 與 overlay 各自獨立）擁有耐用值；連續重複投入會耗光，歸 0 後設施暫時不參與投入；不投入即可恢復。

| 稀有度 | 耐用值上限 |
|---|---|
| N | 3 |
| R | 3 |
| SR | 5 |
| SSR | 7 |

**規則**：
- 每次設施實際參與投入（命中）→ 耐用值 −1
- 歸 0：設施暫時不參與投入，資源直通該格不消耗任何耐用值
- 恢復條件：**只有歸 0 過的設施才會自動恢復**（純粹 d>0 但未滿不會自動回升）
- 恢復速率：每回合不被命中 → +1
- recovering 狀態（從 0 恢復中、未滿）若被再次命中 → **中斷恢復**（清旗標、設施仍正常參與投入），之後若再歸 0 才會重啟恢復
- 「不參與投入」的所有情境（req 不符 / 合約 skip / 颱風 redirect / 物流已觸發 / monopolist / 自身 broken）皆不消耗耐用
- 大型設施（`isLarge:true`）與 part 視覺佔位（`dept_store_part` / `ancient_factory_part`）不適用、無耐用值

**狀態結構**：
- `G.facilityDurability = {"r,c": {bldgId: current}}`
- `G.facilityRecovering = {"r,c": {bldgId: true}}`
- `G._turnDurHitSet = {}`（per-turn，跨送累積；startTurn 後清空、不跨存檔）
- 兩者加進 `KEYED_DATA_FIELDS` index.html:4423 → `swapCellData` / `clearKeyedData` / `destroyFacility` / `deserializeGame` 自動同步

**Helpers**（index.html:4663-4752）：
- `getDurabilityMax(bldgId)`：依稀有度回傳 3/3/5/7
- `isDurabilityTracked(bldgId)`：排除 isLarge 與 part
- `getDurability(r,c,bId)`：lazy init 至 max
- `isFacilityBroken(r,c,bId)`：dur<=0
- `consumeDurability(r,c,bId)`：扣 1、清 recovering（中斷）、寫入 hit set；歸 0 時 log 提示
- `_processDurabilityRecovery()`：對 broken/recovering 且本回合未命中者 +1，0→1 設 recovering、回滿清 recovering

**命中扣耐用 hook 點**：

| 路徑 | 位置 |
|---|---|
| FX `fx.hit()` 路徑（base）| `_hit` 內 index.html:7886 |
| FX 手動 `facHit++`（不走 fx.hit）| `tax_office` index.html:7172、`demolish_bureau` index.html:7342、`terminal` index.html:7351 |
| 一般類型轉換路徑 | `if(b.req===effType\|...)` 區塊 index.html:8121 後 |
| Redirect 觸發 | redirect block 颱風/已觸發過 略過後 index.html:8019 |
| Overlay 命中 | `applyOverlayPipeline` 迴圈尾 index.html:7813 後 |

**Broken 直通**：
- `stepWithMover` 合約 skip 後 early-exit（index.html:7945-7949）：base broken → `_next(300); return;`（含 overlay 一併略過）
- `applyOverlayPipeline` 迴圈內 broken overlay → `continue`（base 仍跑）index.html:7775-7781
- `_simulateInvestment` 也跳過 broken（index.html:6735）

**速遞站重投不算**：
- `_next` 排程 replay 前設 `G.inv._speedReplayNext=true`（index.html:7877）
- replay 進入 `stepWithMover` 時將其轉成 `G.inv._speedReplaying=true`（index.html:7841-7844）
- `consumeDurability` 內檢查 `_speedReplaying` → 直接 return

**Overlay context gate**：
- 三個手動 `facHit++` 的 FX 內 `consumeDurability(fx.r,fx.c,G.grid[fx.r][fx.c])` 取的是 base 而非 overlay。當這些 FX 作為 overlay 跑時會錯扣 base
- 修法：`consumeDurability` 內加 gate `if(_inOverlayCtx) return;`（index.html:4698）。pipeline 在 FX 之後另外呼叫 `consumeDurability(r,c,ovId)` 正確扣 overlay

**回合銜接恢復**：
- `startTurn` 在 `_lastStartedTurn` reentry 防護之後呼叫 `_processDurabilityRecovery()`（index.html:9059）
- 每個 turn 切換各跑一次（包含過關後新輪的 startTurn）

**UI 暗化**：
- `.cell.dur-broken`（CSS index.html:465-467）：`filter:grayscale(.85) brightness(.55)` + `opacity:.62`，`::after` 斜紋疊加
- `renderGrid` 在 base broken 時加 class（index.html:10117-10118）
- 依設計：**不顯示耐用值數字、無角標**，只用整格暗化提示

**狀態 lifecycle 範例**（SR 設施 max=5）：
```
T1: 命中 → 5→4
T2: 命中 → 4→3
T3: 不命中 → 3（不恢復；只有歸 0 才會恢復）
T4-T6: 命中 → 3→2→1→0  ✗暫時無法投入
T7: 略過（broken）
T8 startTurn: 恢復 → 0→1，設 recovering
T9: 命中（recovering 中）→ 1→0，清 recovering（中斷）
T10 startTurn: 不恢復（本回合命中過）
T11 startTurn: 恢復 → 0→1，重新進 recovering
... 直到回滿 5 才完全離開 recovering
```

### C. 耐用值系統二輪審查修補

**Bug 1：存檔載入清掉本回合命中記錄**

`deserializeGame` 原本 `data._turnDurHitSet={};` 直接重置。情境：玩家在 turn N 投入過設施 F（dur 1→0），存檔，重載，再結束本回合 → `_processDurabilityRecovery` 看不到 F 在 hit set 裡 → 誤把 F 當成「本回合沒被命中」→ +1 恢復。但 F 是被命中才歸 0 的，依規格本回合不該恢復。

修法（index.html:13193-13196）：改為「跨存檔保留」，僅缺失/損壞時 fallback：
```js
if(!data._turnDurHitSet||typeof data._turnDurHitSet!=='object') data._turnDurHitSet={};
```

**Bug 2：速遞站 → broken 設施浪費 1 個動畫週期**

speedAct 在 stepWithMover line 7868 原本只對空格/廢墟清掉。情境：speed_station 命中後 speedAct=true，下一格是 broken 設施 → speedAct 沒清 → `_speedReplay=true` → 排程重投 → 重投又 broken skip → 才真的前進。功能正確但多一輪動畫，與空格/廢墟處理不對稱。

修法（index.html:7868-7870）：把 broken 設施併入清旗標條件：
```js
const _durBrokenHere = bId&&bId!=='ruin'&&typeof isFacilityBroken==='function'&&isFacilityBroken(r,c,bId);
if((!bId||bId==='ruin'||_durBrokenHere)&&G.inv.speedAct) G.inv.speedAct=false;
```
之後 line 7872 `_speedReplay` 看到 speedAct=false → 不排 replay → 直接前進。

### D. 三輪審查補強

**1. `G._turnDurHitSet` 加入 newGame 初始化**（index.html:5542）

雖然 `consumeDurability` 與 `_processDurabilityRecovery` 都有 lazy-init fallback，但顯式列入新遊戲初始狀態避免不一致。

**2. 通盤 walk-through 結果**

確認所有命中路徑（FX hit、tax_office/demolish_bureau/terminal 手動 facHit++、generic transform、redirect、overlay pipeline）都有對應 `consumeDurability` 呼叫。所有「不參與投入」路徑（合約 skip、req 不符、typhoon redirect、log set 命中過、broken）都不消耗耐用值。`isLarge` / part 視覺佔位 / ruin 完全不追蹤。`KEYED_DATA_FIELDS` 與 `clearKeyedData` / `swapCellData` / `destroyFacility` / `deserializeGame` 同步。

**3. 已知接受的設計權衡（不修）**

| 行為 | 說明 |
|---|---|
| 工業化模式留下 stale durability entries | mega 創建後不會再用到原 cell 的耐用值，僅占少量記憶體 |
| 複合設施 overlay 被替換時舊 entry 殘留 | 同上，記憶體占用可忽略 |
| 玩家連續投入 broken 格時 log 每次都印「💔 略過」 | 提供清楚回饋，比靜默更好 |
| 教學模式不對耐用值特例化 | 教學流程短，N=3 點不會耗光 |
| 速遞站效果落在 redirect 上會被靜默吞掉 | pre-existing 行為（redirect 不走 `_next`），與耐用值無關 |
| 暴食惡魔 + bulk_store 走 generic path 而非 FX | pre-existing 互動，耐用值仍正確扣 1 |

### 整體影響

- **新功能**：投入預覽 UI（估算）、設施耐用值系統 + 暗化視覺
- **修補**：颱風 / 場風大師方向誤導預覽、redirect 颱風時模擬路徑錯誤、二輪審查兩個耐用值 bug（存檔 hit set 清空、speed_station 對 broken 動畫浪費）
- **設計取捨**：投入預覽精度為「估算」非精準（FACILITY_FX 等未模擬），以「估算」徽章 + `~` 前綴向玩家明示
- **耐用值對策略影響**：玩家不能無腦同方向 spam；中後期 SSR 設施有 7 點 buffer，較有彈性
- **三輪審查**：`_turnDurHitSet` 顯式初始化、通盤 walk-through 確認所有 hook 點與設計權衡

---

## Session 42（2026-04-28）— 耐用值 UI 血條化 + 詞條權重/鎖池/合約過濾

承 Session 41 的耐用值系統，改進視覺呈現並調整稀有度上限；同時在「詞條（Tag）系統」上加入流派鎖池與合約前置詞條過濾；最後針對自身審查發現的 4 處問題逐一修復。

### A. 耐用值 UI 改為分段血條 + 上限調整

**動機**：Session 41 採用左上角「當前/最大」文字徽章，視覺上不夠直觀，玩家需讀數字判斷剩餘耐用值；同時平衡上希望給玩家更多操作空間。

**UI 改造**（CSS index.html:468–516、render index.html:10379–10391、即時更新 `_flashDurabilityPip` index.html:4807–4842）：
- `.dur-pip` 從 padding rounded badge 改為頂端橫條容器（`top:3px;left:3px;right:3px;height:5px`）
- 容器內含 N 個 `.dur-seg` 區段（flex:1 平均分配寬度），每段 = 1 點耐用值
- 已填段：綠色漸層（`#7adf83→#3fa44e`）+ 內陰影；消耗段：淺灰底
- 狀態色覆寫：`dur-low`（=1）橘黃、`dur-zero`（=0）整條暗紅 + 紅邊、`dur-recover` 綠色亮度脈動 1.4s
- `dur-shake`/`dur-bloom` 動畫從 `scale` 改 `scaleY`，符合條狀視覺
- 渲染端：依 `_maxDur` 產生 N 個 `<span class="dur-seg [filled]">`
- 即時更新：`_flashDurabilityPip` 對 segment 切換 `.filled`，max 改變時重建（換稀有度時保險）

**數值平衡**（index.html:4732–4742）：
| 稀有度 | 舊 | 新 |
|---|---|---|
| N | 3 | **5** |
| R | 3 | **7** |
| SR | 5 | **9** |
| SSR | 7 | **11** |

舊版只有 3 階（N/R 共用 3）；新版分 4 階拉開 R 與 N 的差異。每階 +2 給玩家更多 buffer 應對連續 spam。

### B. 詞條（Tag）權重強化

**動機**：Session 41 之前的 `TAG_WEIGHT=0.12`（每個匹配詞條加 12% 權重）效果太隱晦，玩家難以察覺加權；想讓「擁有越多某流派 → 抽到該流派物件機率越高」更醒目。

**改動**（index.html:5029–5030、tagWeightFor 5083–5093）：
- `TAG_WEIGHT` 0.12 → **0.3**（每個匹配詞條 +30%；5 件命中：1.6x → 2.5x）
- 新增 `TAG_MULTI_MATCH_BOOST=1.5`：物件本身有 2 個以上詞條同時命中玩家詞條時 ×1.5
- 公式：`w = (1 + Σ(tagCounts[t] × 0.3)) × (matched≥2 ? 1.5 : 1) × rarityWeightByRound(round, rarity)`
- 0.3（非 0.4）以避免早輪過度壓過稀有度曲線（SR/SSR 早輪 weight 約 0.3–0.5）

### C. 流派鎖池（filterByOwnedTags）

**動機**：玩家擁有 2 個以上流派詞條後，仍會抽到第三流派的物件，模糊了「focused build」感受。希望提供「自然鎖定」機制：一旦選定 2 個流派，不再混入其他流派。

**規則**（index.html:5050–5077）：
- 觸發條件：`shouldRestrictByOwnedTags()` 計數玩家擁有的「非中性詞條」≥ 2 即啟動
- 中性詞條（`TAG_LOCK_IGNORE`）：`basic` `demon` `production` `large` `boost` `unique`
  - basic / demon：永遠免限的兩類
  - production：基礎廠都自帶（mat_factory/factory），不算流派選擇
  - large / boost / unique：結構/輔助標籤，避免 starter（皆帶 unique）+ booster（帶 boost）讓 lock 第 1 回合就觸發
- 過濾邏輯（鎖啟動後）：
  | 物件特徵 | 處理 |
  |---|---|
  | 無詞條 | 通行 |
  | 含 demon | 通行（惡魔免限） |
  | 含 large（非 demon）| 必須有任一非 large/basic/demon 詞條被擁有；純 large（如世界奇觀）→ 不出 |
  | 含 basic（非 large/demon）| 通行（基礎免限） |
  | 其他 | 過濾出非 IGNORE 的「鎖定詞條」，必須全部為玩家已擁有 |

**整合到 `weightedPickN`**（index.html:5096–5108）：
- 在 weighted 取樣前先 `filterByOwnedTags(pool)` 過濾候選
- 防呆：`filtered.length===0` 時退回原 pool（避免空池抽不到）

**生效範圍**（共 9 個呼叫點）：
- 設施補給事件（5251）、安全網路徑（5248）、買設施 action（9038）、招募合夥人 action（9078）、商店主池（9667）+ 商店 35% 非基礎（9662）、複合卡 partner（5905）、譚雅交換（12721）、`_contractGiveRandomByRarity`（4014）、DEV testRarityDraw（15134）

### D. 合約前置詞條過濾（CONTRACT_REQUIRES_TAG）

**動機**：玩家為純人力流時，若被丟出「電極合約」（要求電子流）只能違約承擔賠償，但他們從未選擇過電子流派。希望合約 chooser 自動排除玩家無法執行的合約。

**設定表**（index.html:4187–4196）：
| 合約 | 前置詞條 | 設計理由 |
|---|---|---|
| shop_invested / shop_distinct / commerce_focus | `shop` | 條件涉及商店投入 |
| factory_invested/distinct / industry_focus / matfac_invested/distinct / farm_focus | `production` | 涉及工廠/原料廠投入（基礎廠都帶 production，幾乎不過濾） |
| transport_contract / terminal_contract / production_contract | `logistics` | 涉及轉向次數、終點站、單次跨格數 |
| tectonic_contract / barren_contract / real_estate_contract | `demolish` | 涉及廢墟、設施破壞、賣設施 |
| employee_contract / union_pact_contract | `hr` | 涉及人材累積、人材投入 |
| demon_pact_contract | `demon` | 永久 debuff 每回合失去合夥人，僅惡魔玩家有意義 |
| accumulate / burst / evolve / expand_contract / crowd_contract / sisters_contract / hidden_call / electrode_contract / giant_contract | （無）| 通用或「為新流派開頭」的入坑合約 |

**整合到 `pickContractCandidates`**（index.html:4209–4225）：
- 過濾 `CONTRACT_REQUIRES_TAG[id]` 對應詞條 `tc[req] > 0` 通過
- 若全部被過濾掉（玩家流派極窄）→ fallback 留通用合約（無前置）

**例外保留** — `electrode_contract` 與 `giant_contract` 移除前置：本意即「為新流派開頭」（給電子精工師、給惡魔巨人 + 4 大型設施），不該被該流派擋在外。

### E. 後續審查 4 處修復（內部審查發現的 catch-22 與循環）

承 D 之後做了一次自我審查，發現以下問題並逐一修復：

**E.1 Lock 觸發過早（嚴重）**：
- `unique` 不在 `TAG_LOCK_IGNORE` 內 → 三選一起始合夥人（demolition/tanya/leya）皆帶 unique，加上初始手牌的 shop 詞條 → 第 1 回合 non-IGNORE = 2 → LOCK
- `boost` 不在 IGNORE → booster（基礎設施）也帶 boost，買 1 個就觸發
- 修法：兩者加入 `TAG_LOCK_IGNORE`（index.html:5052）

**E.2 filter 嚴格檢查 catch-22（中度）**：
- 舊邏輯 `tags.every(t=>'large'||tc[t]>0)` 要求所有非 large 詞條都被擁有
- mayor `['unique']` 玩家無 unique → 排除（catch-22：mayor 是給 unique 的）
- big_corp `['large','unique']` 大型分支 others=[unique] 同樣 catch-22
- dynamic_amp `['demolish','boost']`、logistics_amp `['logistics','boost']` 玩家無 boost 物件時排除
- 修法：filter 嚴格檢查改用 `lockTags = tags.filter(t=>!TAG_LOCK_IGNORE.has(t))`，輔助詞條（boost/unique/production）通行（index.html:5072–5074）

**E.3 合約循環依賴（輕度）**：
- `electrode_contract` 給電子精工師，要求 electronic → 玩家無電子永遠看不到
- `giant_contract` 給惡魔巨人 + 4 大型，要求 large → 同上
- 修法：兩者從 `CONTRACT_REQUIRES_TAG` 移除（index.html:4187–4196）
- 保留 `demon_pact_contract` / `terminal_contract`：debuff 太重（每回合失合夥人 / 起終點必為終點站），需玩家熟稔該流派才有意義

**E.4 TAG_WEIGHT 過高（輕度）**：
- 0.4 在早輪（rarityWeightByRound 對 SR/SSR ≈ 0.3–0.5）會壓過稀有度曲線，5 件 hr 命中 hr SR 物件 weight 1.2 vs N 物件 1.0
- 修法：0.4 → 0.3（index.html:5029）

### 整體影響

- **新功能**：耐用值血條 UI、詞條鎖池系統、合約前置過濾
- **平衡調整**：耐用值上限 3/3/5/7 → 5/7/9/11（每階 +2，拉開 R 與 N）；TAG_WEIGHT 0.12 → 0.3（傾向更醒目）
- **設計取捨**：
  - 流派鎖池在 ≥2 流派詞條時啟動，basic/demon/無詞條/已擁有詞條通行；大型須對應詞條，純 large 不出
  - 合約過濾僅針對「條件涉及該流派操作」的合約；通用與「入坑」合約不限
  - `TAG_LOCK_IGNORE` 排除 starter/基礎自帶的詞條（unique/boost/production）避免提前鎖死
- **未動**：`venture-town.html` 副本（4/20 舊版本）、`shop` 仍視為一個流派選擇詞條（雖然初始有 2 張基礎商店）

### 已知 fallback 行為

- `weightedPickN`：filtered=0 退回原 pool（lock 精神被打破，但避免抽不到）
- `pickContractCandidates`：filtered=0 退回通用合約池；若完全空 chooser 不出（log「合約池為空」）
- 兩者皆為防呆設計，預期極少觸發

---

## Session 43（2026-04-30）— 莫菲定律簡化為純市場事件

### 動機

Session 41 的耐用值系統已能透過機制本身鼓勵玩家變更產線（設施被命中後耐用值下降，必須輪替），原本由「莫菲定律」承擔的「強制打散同一產線」設計目的已失效。莫菲定律先前的「劫持預告事件 / 替代隨機事件」機制在耐用值之上反而是過度懲罰，因此改為單純的市場事件之一。

### 變更內容

**移除的觸發路徑**：
- `transport_contract.compensationText` / `onFail` 中 `_contractTriggerEventById('murphy')`（仍保留消滅物流中心的補償）
- `triggerEvent()` / 跨輪事件流程中的 `checkMurphyHijack()` 機率劫持（含第 2 輪起的權重判定）
- `send()` 內 `_murphyTrack.repeatCount`（連續同方向投入追蹤）
- `startTurn()` 內 `_murphyTrack.noMove`（未移動回合追蹤）
- `rearrangeFacilities()` 內重置 noMove 的同步邏輯
- 觸發後的 `_murphyNextPool` 限定下次事件池（設施補給/地震/就業輔助/蕾雅的禮物）
- `pickNextEvent()` / `swap_ev` 把 murphy 從預告池排除的 filter
- `G._murphyTrack` / `G._murphyNextPool` state 宣告

**保留的部分**：
- `EVENTS.murphy` 本身（打亂 + 2 張複合設施 + 全屏特效）
- 全屏震動/立繪/台詞效果與 `precomputeEventData` 中對 murphy 的預告高亮
- `EVENT_SFX_TYPE.murphy='bad'` 分類

### 結果

`pickNextEvent()` 改為從完整 `EVENTS` 池等權重抽取（19 事件均等），`triggerEvent()` 同步簡化為 `EVENTS[Math.floor(Math.random()*EVENTS.length)]`。莫菲定律現在與其他事件同等機率出現，無條件觸發、無權重、無預告劫持。

### 補充：耐用值恢復條件放寬

原本 `_processDurabilityRecovery()` 僅對「破損(=0) 或 recovering 中」的設施 +1，意在懲罰連續 spam 後需要漫長恢復。改為**所有未被命中且未滿的設施每回合 +1**：

- `index.html:4870–4895`：移除 `if(!broken&&!recovering) return` 早退，改為 `if(cur>=max) return`
- 註解同步更新（`index.html:4779–4782`、`startTurn()` 4870 行旁註）
- `recovering` 視覺旗標仍保留：僅在「從 0 升 1」時設置，0→1 仍會 log「開始恢復」並走綠色脈動動畫；回滿或被命中即離開 recovering
- 設計效果：玩家暫停某設施一回合即可回 1 點，無需等到完全 broken 才恢復；策略上更鼓勵主動輪替而非「打到歸 0 → 強制冷卻」

---

## Session 44（2026-05-01）— 蕾雅疊加修復破損耐用 + UI 版面靠左 + 立繪縮小

### A. 耐用值修復來源擴充（蕾雅疊加 + 人材投入）

抽出通用 helper `_restoreDurabilityBy(r,c,bldgId,amount)`，集中處理：cap 至上限、0→正進 recovering、回滿離開 recovering、觸發綠色脈動。

**蕾雅疊加修復破損耐用**：
- `_leyaRestoreDurabilityIfBroken(r,c,bldgId)` 改為呼叫 `_restoreDurabilityBy`，amount = `Math.ceil(max/2)`
- 僅在 `cur===0` 觸發；非破損狀態下疊加不影響耐用（避免變成主動回復神技）
- 通用蕾雅疊加路徑（`tryPlaceAtCell` ~6582 行）`bldgUpgrades+=2` 後呼叫
- `dept_store` 蕾雅疊加不需要（`isLarge` 不追蹤耐用值）

**人材投入修復耐用**：
- 在 `_runTalentInvestSideEffects()` 末尾呼叫 `_restoreDurabilityBy(r,c,baseBldgId,1)`
- 每次人材投入 +1 點，cap 至上限；批量投入時每張各 +1
- 等於將人材投入定位為「同時強化（cellMods +1 本回合）+ 維護（耐用 +1 永久）」的雙效作用

### B. UI 整體靠左 + 立繪縮小

**動機**：先前立繪在大寬度視窗下佔據右側空間，導致 UI 中心偏右、台詞泡泡可能被裁切。

**改動**（`index.html`）：
- 新增 CSS 變數 `--char-w: clamp(220px, 22vw, 360px)`（原 276–437px ≈ 縮小至 80%）
- `body` 加 `padding-right: calc(12px + var(--char-w))`，讓 `align-items:center` 把 `#hdr`/`#ev-banner`/`#main` 自然居中於左側可用區
- `#hand-fan-area` `right: 0` 改為 `right: var(--char-w)`，移除上版的 `::before` mask（不再需要）
- `#char-tray` 寬度與 `#char-bubble` 的 `bottom` 計算統一改用 `var(--char-w)`

---

## Session 45（2026-05-01）— 新合夥人/設施/合約（耐用值流派擴充）

依「超賺.xlsx」對照表新增 1 合夥人、2 設施、2 合約，圍繞耐用值機制延伸出新的策略選擇。

### A. 新合夥人

**設施維護工**（R，🛠️，basic 詞條）：
- 效果：所有設置在小鎮的非大型設施 +2 耐用上限
- `getDurabilityMax(bldgId)` 在 `hasPartner('facility_maintainer')` 且非 `isLarge` 時 base+=2
- `onRecruit` 一次性把已存在設施的耐用 +2（cap 至新上限）
- 失去後（衰敗合約 / 惡魔巨人）：超過新上限的耐用值降回新上限

### B. 新設施

**傳統生產線**（N，🛠️，basic）— `SHOP_ONLY_FACILITIES`：
- 只在「商店」出現，不進通用抽選池
- 拖曳到非廢墟、非大型 part、非大型設施的格子上 → 完全恢復該格 base+overlay 所有 bldgId 的耐用值，消耗自身（不留在格子上）
- 拖曳預覽：藍綠色高亮（`outline:#3b8`）區別於貨櫃屋紅色與紅綠燈綠色

**機動增殖都市**（SR，🏙️，basic）— 一般設施可進池：
- `_processMobileBreedCity()` 於 startTurn 在 `_processDurabilityRecovery` 之後執行
- 每個 MBC 個體獨立判斷：dur>0 時，使其他所有可追蹤設施 +1 耐用、自身 -1；dur=0 時整個效果不發動
- 同格內的同 bldgId（自己）跳過，但同格其他 bldgId 仍算「其他」並受惠

### C. 新合約

**分工**（r2 池，🧩）：
- 立即收益 +10
- 擔保：本輪結算前小鎮中沒有設施耐用歸零
- 違約：所有可追蹤設施耐用立即歸零（觸發紅色 dur-shake 動畫）
- `checkProgress` 掃描可追蹤設施計算未破損數量與總數，UI 顯示 `已存活/總數`

**衰敗**（r6 池，🥀，permanent）：
- `onAccept`：失去合夥人「設施維護工」（如有），並把超出新上限的耐用值降回新上限
- 永久效果：耐用值歸零的設施永久從小鎮清除
- `consumeDurability` 內 `next===0` 時檢查 `hasActiveContract('decay_contract')`：base 呼叫 `destroyFacility`，overlay 從 overlay 列表移除 + 清除耐用/recovering 資料
- `_processMobileBreedCity` 自我衰退至 0 也觸發此清除（讓 MBC 在衰敗合約下成為定時炸彈）

### 共用 helper 重用

- `_restoreDurabilityBy(r,c,bldgId,amount)` 為主要的「補耐用」入口，被傳統生產線、機動增殖都市、人材投入共用
- 衰敗合約的耐用歸零→消滅邏輯只在 `consumeDurability` 與 `_processMobileBreedCity` 兩處攔截，避免散落各處

> 註：Session 47 依使用者要求移除「蕾雅疊加修復破損耐用」的呼叫與 `_leyaRestoreDurabilityIfBroken` helper（設施疊加時不恢復耐用）。

---

## Session 46（2026-05-01）— UI / 立繪 / 排列模式中投入 + 雜項修補

### A. UI 與立繪佈局調整

承 Session 44 的避讓策略，依使用者反饋進一步調整：

- `--char-w` 由 `clamp(220, 22vw, 360)` 放大到 `clamp(280, 28vw, 440)`
- `body` 的 `padding-right` 從 `12px + var(--char-w)` 收回為 `12px + var(--char-w)/2`，最終再回到單純 `12px`（UI 整體置中）
- `#hand-fan-area` 漸層改用 `::before` + 水平 mask（`linear-gradient(to right, transparent 0, black 30%, black 70%, transparent 100%)`），漸層只在中央 30%–70% 顯示，避免蓋到「提示」面板與右下立繪
- `#char-tray` 改 `bottom: -10vh`，移除 `max-height: 100vh`，讓立繪自然延伸到視窗外（腿部沒入），不對立繪本體加 mask
- `#char-bubble` `bottom` 計算扣除 10vh 以追蹤新的頭部位置

### B. 立繪顯隱切換鈕

- 新增 `#char-toggle` 小箭頭按鈕（寬 16px、高 40px）
- 永遠貼視窗底部（`bottom: 8px`）+ 立繪左緣（`right: var(--char-w)`）；隱藏狀態下滑到視窗右邊緣 `right: 0`
- 點擊切換 `body.char-hidden` class，隱藏 `#char-tray` 與 `#char-bubble`
- 文字 ▶/◀ 對應顯示／隱藏狀態
- localStorage 持久化未實作，每次重載重置為顯示

### C. 排列模式中允許投入

- `finish()` 結算後若 `G.freeRearrange===true`，phase 維持 `'place'`（非預設的 `'done'`），玩家可繼續拖曳設施
- 元素卡 `canDrag` 加入 `(!_turnInvested || _extraUsePhase)` 守門，避免重複投入；人材延長投入仍正常
- 結束流程：先點「確認排列」離開排列模式，再點「結束回合」（`_canEnd` 在 `_inOtherMode` 為 true 時拒絕）

### D. 設施疊加不恢復耐用

依使用者調整：通用蕾雅疊加路徑不再呼叫 `_leyaRestoreDurabilityIfBroken`，連同 helper 函式一併移除。傳統生產線的「完全恢復耐用」屬於專屬機制（不算疊加）保留。

### E. 惡魔巨人 self-destroy 修補

`demon_pact_contract.hooks.onTurnStart` 隨機消除合夥人時排除 `demon_giant`，避免巨人自我清除。`demonGiantDestroy(pid)` 入口加防呆短路。

---

## Session 47（2026-05-01）— 系統性審查修補（耐用值/合約 6 issues）

audit agent 找到 10 個潛在問題，修復其中 6 個高/中影響度，4 個低風險或屬設計選擇。

### 修補列表

1. **`_processMobileBreedCity` 迭代防呆**（high）：第一個 MBC 自我衰退至 0 觸發 `decay_contract` `destroyFacility` 後，迴圈中後續 mbcCells 條目 stale（已被清除），re-check `G.grid[mr][mc]==='mobile_breed_city' || getOverlays(...).includes(...)` 後才繼續，避免重觸發或誤更新已清除的格子
2. **`decay_contract.onAccept` cap 後清 recovering**（medium）：cap 後若 `cellMap[bId] >= max` 同步清除 `facilityRecovering[k][bId]`，避免永久綠色脈動 desync
3. **`segregation_contract.onFail` 強制歸 0 同時清 recovering**（medium）：避免 `cur=0` 同時 `recovering=true` 的旗標 desync
4. **`_giantSecondKillPending` 加入 deserialize 清除清單**（medium）：避免存讀檔吃掉巨人合約第二殺
5. **freeRearrange + invest 存讀檔軟鎖**（medium）：deserialize 偵測 `phase==='place' && _turnInvested && !_extraUsePhase` 特例 → cap 為 `'done'`，避免結束回合按鈕鎖死
6. **`production_line` 預先掃描**（low）：所有目標已滿耐用時拒絕放置 + 提示，不消耗卡片

### 未修補（已知邊界）

- `runContractHook('onTurnStart')` 在 `_processMobileBreedCity` 之後執行，若該 turn 由 `demon_pact_contract` 隨機消除 `facility_maintainer`，當前 turn 已用舊上限 cap 過耐用，超出值會在下次被命中時被吞但暫不重新 cap（影響極小）
- `cellMods` per-cell 不 per-bldgId 為原設計
- `facility_maintainer.onRecruit` 對 stale `facilityDurability` 條目 +2（記憶體輕微洩漏）
- `consumeDurability` decay 分支對空 `facilityRecovering[k]` 物件不刪除（cosmetic 累積）

---

## Session 48（2026-05-01）— 蕾雅耐用恢復回歸 + 合約結算 UI + 莫菲純預告 + 物流站化 + 教學擴充

### A. 蕾雅同類疊加恢復目標耐用值（上限一半）

Session 46 移除蕾雅疊加修復破損耐用後，使用者要求改為**任何疊加**都恢復一半上限的耐用（不限於破損）。

- `tryPlaceAtCell` 同類 overlay 路徑（~6907）：`bldgUpgrades+=2` + addLog 後加入 `_restoreDurabilityBy(r,c,bldgId, Math.ceil(getDurabilityMax(bldgId)/2))`，實際 `_gained>0` 才 log `🩹 +N（疊加恢復）`
- `_placeCompoundPart` 蕾雅分支（~6463）：複合卡 leya 路徑也同步恢復
- `dept_store` 蕾雅分支（~6806）：`isLarge` 不追蹤耐用值，`isDurabilityTracked` 短路；保持 no-op
- 半值取 `Math.ceil`：N=3 / R=4 / SR=5 / SSR=6
- `_restoreDurabilityBy` 已 cap 至 max，已滿時 0-change 不 log

### B. 合約結算 UI（可點擊側邊 log + 中央印章動畫）

**動機**：合約完成/違約原本只 `addLog('📜✓/📜✗ ...')`，玩家容易錯過；無法回溯查看為什麼失敗。

**`addLog(msg, cls, meta)` 第 3 參數**（向後兼容預設 null）：
- `commitTurnLog` 透過 `[...G.turnLog]` 淺拷貝保留 entry meta 進歷史
- 合約結算的 `addLog` 帶入 `{type:'contract_result', contractId, contractName, contractEmoji, success, label, progress, max, permanent, round}`

**`renderSideLog` 點擊化**：
- 抽出 `_renderLogEntry(e)`，遇到 `e.meta.type==='contract_result'` 加 `log-entry-contract` class（cursor:pointer + 虛線下劃線 + hover 高亮）
- 用 `_contractMetaCache` script-level 陣列（每次 `renderSideLog` 重置）儲存 meta 供 inline onclick 索引

**`showContractResolveDetail(meta)` modal**（`#contract-resolve-detail` z-index 97，背景半透明 + click-outside-close）：
- emoji + 名稱 + ✓/✗ 印章 + 第 N 輪結算 + 進度 + 擔保/賠償文字
- 點 X 或背景關閉

**`showContractResolveFx(def, success, result)` 中央動畫**（`#contract-fx` z-index 120，pointer-events:none）：
- queue + `_kickContractFx` 依序播放（多份合約同輪結算不重疊）
- 卡片：emoji（42px）+ 名稱 + ✓ 完成/✗ 違約 印章（旋轉 -6deg + stamp-down 動畫）+ 進度
- 0.45s pop-in → hold 1.5s → 0.35s fade-out
- 失敗合約若 `failConvertsToPermanent` 顯示「（轉為永久債務）」

**checkContractDeadlines** 同步建立 `_resolveMeta` 並傳給 `addLog` 與 `showContractResolveFx`。

### C. 莫菲定律純預告化

承 Session 43「莫菲簡化為純市場事件」設計，但實作仍允許從 `triggerEvent`（即時觸發路徑，無預告）抽到莫菲 → 玩家觀感是「亂入」。

- `MARKET_EVENT_IDS` 加入 `'murphy'`：莫菲觸發後算市場事件，惡魔巨人等下游效果正確啟動
- `triggerEvent()` 抽取改為 `EVENTS.filter(e=>e.id!=='murphy')`：「⚡ 觸發隨機事件」行動、合約 `_contractTriggerEventById` 等即時路徑都不會抽到莫菲
- `pickNextEvent()` 不變：每 3 回合的預告流程仍可均等抽到莫菲

### D. 物流轉運中心放置變物流站（與轉運中心一致）

`logistics_hub`（SR）原本放置時轉成 `logistics_center`（`perTurnRotate:true` 每回合切換方向），使用者要求改為固定方向（與 `transfer_hub` 同）。

- BLDG.logistics_hub `desc`：「放置時變成物流中心」→「放置時變成物流站（→↓←↑），可決定方向」
- `_finalize`（`showTransferHubDirPicker`）：`logistics_hub` 分支改寫為 `G.grid[r][c]=dirMap[_selectedDir]`（與 transfer_hub 對等）
- 取消預設：`logistics_hub` 一併合併至 `logistics_right` 預設
- 三個轉換分支都加 `delete G.cellRedirectDir[k]`，避免該格之前有 logistics_center 留下的旋轉狀態殘留
- 行 8721 註解早已備註物流站只用 `b.dir`（非 cellRedirectDir），confirm 渲染端不需改

驗證：`transfer_hub` 透過 `logistics_king`/`storage_queen` 疊加在既有設施上時走 `logOnFac` 分支，新物流變 BASE、原設施移到 overlay，picker 開啟後 `_finalize` 看到 transfer_hub 在 base 可正常轉換 → overlay 路徑無 bug，先前的疑慮為誤判。

### E. 教學擴充（9 步 → 12 步）

新增**耐用值 / 人材 / 合約**三個教學 step，互動期間強制只允許教學動作。

| Step | 主題 | 互動 |
|---|---|---|
| 1–2 | 載入 + 自我介紹 | — |
| 3 | 放置原料廠 | 拖原料廠 |
| 4 | 投入金錢看到變原料但無收益 | 拖金錢 |
| **5（新）** | 耐用值 | 高亮原料廠耐用條（4/5），純對話 |
| 6 | 介紹商店：放工廠+商店 | 拖工廠+商店 |
| 7 | 投入金錢看到完整收益 | 拖金錢 |
| **8（新）** | 人材 | 給 1 人材，引導拖到設施 |
| **9（新）** | 合約 | 顯示 chooser（商業/加工），必選 |
| 10 | 合夥人：拆遷隊 | 點選拆遷隊卡 |
| 11 | 行業熱潮 + 用拆遷隊 | 重排+確認 |
| 12 | 結束教學 | — |

**新增 hook / helper**：
- `TUT.hookTalentDrop(r, c)`：在 `onTalentDropCell` 結尾呼叫，命中 `tut_talent_drop` 等待狀態 → 推進
- `TUT.showTutContractChoice()`：用 `showCardChooser` 顯示 `shop_invested` / `factory_invested`，跳過鈕隱藏（強制必選）
- `TUT.pickTutContract(cid)`：呼叫 `acceptContract` 讓玩家看到接受流程（`G = newGame()` 在 `finish()` 會清掉，不帶到正式遊戲）
- 教學 step 9 強制 `btn-contract.style.display='inline-flex'`，讓 `acceptContract.onAccept` 的 `profitFlyFrom(btn-contract, 10)` 動畫有可見錨點（否則飛行特效從 `display:none` 元素飛出，玩家看不到）

**Hook 編號更新**：
- `hookFinishPost`：`step!==6` → `step!==7`
- `hookDoNext`：`tut_end_turn_for_partner` → `tut_end_turn_for_talent`，`step=6→7` → `step=7→8`，`step=8→9` → `step=11→12`

**動作禁用**：
- `TUT.isBlocking()` 在整個教學期間都是 true → 商店/兌換/行動鈕自動 disabled
- 各 step 給的手牌精準限制玩家可放的設施
- step 8 強制 `btn-next.disabled=true`（強迫先玩人材再結束回合）
- 合約 chooser 隱藏跳過鈕（強制必選）

**`setUIVisibility` 新增 `'btn-contract'`**：教學期間預設隱藏，step 9 才解開（visibility=''），讓 `renderContractBtn` 自然 display 切換生效。

### 修改檔案

`index.html`（合計約 +200 行 / -50 行）：
- ~6463 / ~6907：蕾雅疊加耐用恢復（兩處）
- ~6118：`addLog` 第 3 參數
- ~10859：`renderSideLog` + `_renderLogEntry` + `_contractMetaCache`
- ~4467：`checkContractDeadlines` 帶 meta + 傳 result
- ~4588：`showContractResolveFx` queue 動畫實作
- 新增 `showContractResolveDetail` / `closeContractResolveDetail`
- ~6632：`MARKET_EVENT_IDS` 加 `'murphy'`
- ~6634：`triggerEvent()` filter 排除 murphy
- ~2517：BLDG.logistics_hub desc 修正
- ~10640：`_finalize` 三分支改寫 + cellRedirectDir 清理
- ~12313：`onTalentDropCell` 末尾呼叫 `TUT.hookTalentDrop`
- ~13290：`setUIVisibility` 加 `'btn-contract'`
- ~13390 起：教學步驟全面重整（5–12）
- ~13690 起：hook 編號更新 + 新增 hookTalentDrop / showTutContractChoice / pickTutContract
- HTML：新增 `#contract-fx` / `#contract-resolve-detail` 元素
- CSS：新增 `.log-entry-contract` / `#contract-fx` / `.contract-fx-card` / `.contract-fx-stamp` / `contractFxIn` / `contractFxOut` / `stampDown` 動畫

`VentureTown_GameDoc.md`：
- 蕾雅 desc 文字補上「並恢復目標耐用值上限的一半（向上取整）」
- 索引表加入 Session 48
- 新增 Session 48 詳細章節

---

## Session 49（2026-05-02）— 教學 bug 修復 + 排列取消還原手牌 + 高級設施直接覆蓋升級

### A. 教學中立繪自動退場（避免遮按鈕）

**問題**：右下角立繪 `#char-tray`（`position:fixed; z-index:50`）在教學中會遮住右側 panel 底部的「⏩ 結束回合」按鈕（step 7 後出現）。`.panel` 為 `position:static`，子元素無法蓋過 fixed 立繪。

**修法**：
- CSS 新增 `body.tutorial-active #char-tray { opacity:0; pointer-events:none; transition: opacity .3s ease; }` 與 `body.tutorial-active #char-toggle { display:none; }`（line ~1373）
- `TUT.start()` 加 `document.body.classList.add('tutorial-active')`
- `TUT.finish()` 加 `document.body.classList.remove('tutorial-active')`
- 對話泡泡 `#char-bubble`（z-index:99）獨立於立繪，仍正常顯示；`DM.show` 只操作泡泡，不需另外處理

### B. step 8 人材說明強調耐用值恢復

**問題**：使用者反映 step 8 講人材時「恢復 +1 耐用值」混在收益效果同一行，玩家容易忽略。

**修法**：將恢復耐用值獨立成一行重點，配 ★ 與比喻：
```
'太棒了！再來介紹一個重要資源：「人材」。',
'我給你 1 個人材——左下角那張小卡片就是。',
'把人材拖到設施上：本回合該設施 +1 收益。',
'★ 重點：還會「恢復 +1 耐用值」！設施快破損時，人材就是急救包。',
'（也可以拖到資源卡上，讓資源額外多投入一次）',
'試著把人材拖到原料廠上吧！',
```

### C. 拆遷隊重排後卡死修復

**問題鏈**：
1. step 11 給拆遷隊 1 次 + 設 `waitingFor='use_demolition'`
2. 玩家點拆遷隊 → `hookUseDemolition` → `waitingFor='confirm_rearrange'`
3. 玩家重排 → `confirmRearrange` → `hookConfirmRearrange` 把 `waitingFor` 設回 `'use_demolition'`，但**沒呼叫 `TUT.next()`**
4. btn-next 被立繪遮住（A 已修），玩家也找不到「下一步該做什麼」的提示
5. step 11 沒給玩家資源卡，無法投入 → 完全卡死

**修法**：
- 新增 `waitingFor` 狀態 `tut_post_rearrange_end_turn`，`hookConfirmRearrange` 改為設此狀態並 speak 提示玩家點結束回合：
  ```javascript
  hookConfirmRearrange(){
    if(!TUT.active || TUT.waitingFor!=='confirm_rearrange') return false;
    TUT.waitingFor = 'tut_post_rearrange_end_turn';
    document.getElementById('btn-next').disabled=false;
    document.querySelectorAll('.joker-card').forEach(c=>{c.style.outline='';c.style.animation='';});
    G.card = null;  // 不讓玩家投入
    if(typeof renderFanHand==='function') renderFanHand();
    TUT.speak([
      '排列完成！這回合不需要再投入資源了——',
      '直接點右下角「⏩ 結束回合」結束本回合吧～',
    ]);
    return false;
  }
  ```
- `hookDoNext` 加上對新狀態的識別：
  ```javascript
  if(TUT.waitingFor==='use_demolition'||TUT.waitingFor==='confirm_rearrange'||TUT.waitingFor==='tut_post_rearrange_end_turn'){
    TUT.waitingFor=null;
    document.querySelectorAll('.joker-card').forEach(c=>{c.style.outline='';c.style.animation='';});
    TUT.step=11; TUT.next();  // 推進到 step12
    return true;
  }
  ```
- 配合 A（立繪退場）後，btn-next 可見可點 + 文字提示明確 → 教學可以順利完成

### D. 排列取消還原手牌（snapshot 含 hand）

**問題**：玩家進入排列模式（拆遷隊或移動都市），把設施 a 從某格移開，再從手牌把設施 b 放在該位置，點「取消」時：
- ✓ Grid 還原（a 回到原位、b 從格子消失）
- ✗ 手牌沒還原（b 永遠扣掉一張）

**根因**：`saveGridSnapshot` 只快照 `G.grid` + `KEYED_DATA_FIELDS`（含 `bldgUpgrades`/`cellOverlay` 等）+ `ruinCells` + `envyCellBonus`，沒快照 `G.hand`。`tryPlaceAtCell` 各分支都做 `handItem.count--` 扣手牌，cancel 時無法還原。

**修法**（`saveGridSnapshot`/`restoreGridSnapshot`/`deleteGridSnapshot`，line ~5650）：
```javascript
// save 加：
G._handSnapshot = JSON.parse(JSON.stringify(G.hand||[]));
// restore 加：
if(G._handSnapshot) G.hand = G._handSnapshot;
// delete 加：
delete G._handSnapshot;
```

**覆蓋範圍**：`saveGridSnapshot` 共三處呼叫點（拆遷隊 `useDemolition` line ~12023、`useMobileCity` line ~12641、自由排列 entry line ~9522），全部受益於 hand snapshot。

### E. 高級設施直接覆蓋升級（adv_mat_factory / adv_factory / convenience）

**需求**：高級原料廠、高級工廠、超商可直接蓋在對應基礎設施（原料廠 `mat_factory` / 工廠 `factory` / 商店 `shop`）上，視為升級。原設施消失，加成繼承給新設施。

**設計**：
- `bldgUpgrades` / `cellMods` / `cellPctMods` 等 `KEYED_DATA` 都用 `${r},${c}` 為 key、與設施 ID 無關 → 替換 `G.grid[r][c]` 不影響這些資料 → 加成自然繼承
- 耐用值 `facilityDurability` / `facilityRecovering` 與當前設施稀有度上限綁（N=5/R=7/SR=9/SSR=11）→ 升級後上限變 → **必須清除舊耐用值**，下次 `stepWithMover` 命中時依新 ID 重建
- Overlay 存在時（蕾雅疊加 / 物流之王 / 中央電子網路）拒絕升級替換，避免破壞既有疊加狀態

**實作**：

`tryPlaceAtCell` 內、「該格已有設施」擋板之前（line ~7148）：
```javascript
const _UPGRADE_FROM = {
  adv_mat_factory: 'mat_factory',
  adv_factory: 'factory',
  convenience: 'shop',
};
if(_UPGRADE_FROM[bldgId] && G.grid[r][c]===_UPGRADE_FROM[bldgId]){
  if(!handItem||handItem.count<=0) return false;
  if(getOverlays(r,c).length>0){
    addLog(`⬆ ${BLDG[bldgId].name}：該格有疊加設施，無法升級替換`,'b');
    return false;
  }
  handItem.count--;
  const oldId = G.grid[r][c];
  G.grid[r][c] = bldgId;
  const k=`${r},${c}`;
  if(G.facilityDurability) delete G.facilityDurability[k];
  if(G.facilityRecovering) delete G.facilityRecovering[k];
  addLog(`⬆ 升級：${BLDG[oldId].emoji}${BLDG[oldId].name} → ${BLDG[bldgId].emoji}${BLDG[bldgId].name} (${r+1},${c+1})（加成繼承）`,'g');
  TUT.hookPlace(bldgId);
  if(typeof onFacilityPlaced==='function') onFacilityPlaced(r,c,bldgId);
  placeEffect(r,c);
  render();
  return true;
}
```

`onCellDragOver` 擋板放行（line ~7635）：
```javascript
const _UPGRADE_FROM_MAP = { adv_mat_factory:'mat_factory', adv_factory:'factory', convenience:'shop' };
const isUpgradeReplace = _UPGRADE_FROM_MAP[bldgDragging] && G.grid[r][c]===_UPGRADE_FROM_MAP[bldgDragging] && _ovsAtCell.length===0;
if(G.grid[r][c] && !isLeyaUpgrade && !isRuinPlace && !isOverlay && !isCenterNetOverlay
   && !isContainerHouseDrop && !isTrafficLightDrop && !isProductionLineDrop && !isUpgradeReplace) return;
```

預覽高亮（金色）+ 預覽圖示：
```javascript
} else if(isUpgradeReplace && cellEl){
  cellEl.style.outline='3px solid var(--money)';
  cellEl.style.boxShadow='0 0 14px rgba(220,170,30,.55)';
  _insertBldgPreview(cellEl, bldgDragging);
}
```

**desc 同步**（BLDG line ~2492）：
- adv_mat_factory：`'金錢→原料 +4。可直接蓋在原料廠上升級替換（加成繼承）。'`
- adv_factory：`'原料→商品 +4。可直接蓋在工廠上升級替換（加成繼承）。'`
- convenience：`'... 可直接蓋在商店上升級替換（加成繼承）。'`

**路徑覆蓋**：點擊放置（`onCell` → `tryPlaceAtCell`）與拖曳放置（`onCellDrop` → `tryPlaceAtCell`）共用同一入口。複合卡路徑（`tryPlaceAtCell` 早段獨立處理）不受影響。

### F. 莫菲定律「非預告路徑」防禦過濾

**背景**：Session 48 在 `triggerEvent` 過濾莫菲（即時觸發如「⚡ 觸發隨機事件」行動、合約即時觸發等不會抽到莫菲），但 `_contractTriggerEventById(evId)`（line 4274，由合約 onTurnStart 等呼叫）**沒有任何 id 過濾**。雖然目前只有 `earthquake_contract` 用它，但若未來新增「觸發莫菲」的合約則完全繞過 `pickNextEvent` 預告流程。

**修法**（line 4278）：
```javascript
function _contractTriggerEventById(evId){
  if(evId==='murphy'){ console.warn('莫菲定律不允許從即時觸發路徑呼叫'); return; }
  ...
}
```

**現況保證**：莫菲唯一觸發路徑為 `pickNextEvent` → 設定 `G.nextEvent` → 至少 1 回合預告 → `startTurn` 內 `G.turn>=G.nextEventTurn` 才 fire。

**所有 `ev.show` 呼叫點驗證**：
- `pickNextEvent` (9480) → 預告路徑 ✓
- `triggerEvent` (6648) → `EVENTS.filter(e=>e.id!=='murphy')` ✓
- `_contractTriggerEventById` (4278) → 新加 `if(evId==='murphy') return` ✓
- DEV panel (15543) → 開發者模式（不適用 production）

### G. 常駐按鈕 z-index 修復（普通遊戲也會被立繪遮）

**背景**：A 修了「教學中立繪遮按鈕」，但**普通遊戲下立繪仍然遮按鈕**。立繪 `#char-tray` `position:fixed; z-index:50; pointer-events:none`，但子層 `#char-tray img` 為 `pointer-events:auto; cursor:pointer`（為了點立繪跳對話用）。右側 panel `position:static`，子按鈕無 z-index 預設 auto，會被立繪 img 在視覺與點擊上覆蓋。

**症狀**：玩家持非金錢資源時 `#btn-perm-convert` 按鈕看似亮了（`btn-glow`），但點擊被立繪 img 攔截 → 「按鈕無法點擊」。`#btn-perm-shop`、`#btn-next` 同樣會被攔截。

**修法**（CSS line 909）：
```css
#perm-btns, #btn-next { position: relative; z-index: 55; }
```
- 55 > 50（立繪），按鈕在立繪上方
- 55 < 60（手牌扇形區）、< 70（投入箭頭 `.dbtn`）、< 99（對話泡泡）— 不影響其他互動層級
- `position:relative` 創建 stacking context 才能讓 z-index 生效

### 修改檔案

`index.html`：
- ~909：CSS `#perm-btns, #btn-next` z-index:55
- ~1373：CSS `body.tutorial-active #char-tray` / `#char-toggle` 樣式
- ~2492-2494：BLDG.adv_mat_factory / adv_factory / convenience desc 同步
- ~4278：`_contractTriggerEventById` 加莫菲過濾
- ~5650-5670：`saveGridSnapshot` / `restoreGridSnapshot` / `deleteGridSnapshot` 加 `_handSnapshot`
- ~7148：`tryPlaceAtCell` 升級替換邏輯
- ~7635：`onCellDragOver` 擋板放行 + ~7660 升級預覽高亮分支
- ~13291：`TUT.start` 加 `tutorial-active` class
- ~13495-13500：step 8 人材台詞重組（強調耐用恢復）
- ~13595：`TUT.finish` 移除 `tutorial-active` class
- ~13780-13800：`hookDoNext` 識別 `tut_post_rearrange_end_turn`、`hookConfirmRearrange` 改設新狀態 + speak 提示

`VentureTown_GameDoc.md`：
- 索引表加入 Session 49
- 新增 Session 49 詳細章節（本節）

---

## Session 50（2026-05-02）— 程式碼精簡（CSS 變數 + DOM 快取 + display helper + 巢狀 if 扁平化）

### 背景

Explore agent 對 index.html（15,482 行 / 761KB）做精簡掃描，初版回報 ~270–340 行（1.8–2.3%）可精簡空間。對照本 GameDoc 後發現多項建議落入「歷史地雷區」（S22/S26/S28/S30 死碼 pattern、S11/S32 isDemonNegDisabled 漏判、S26 desc 解讀規則精確映射），實際安全範圍縮為 ~180 行；高風險項目刻意不動。

### A. CSS `border-radius:99px` 變數化（20 處）

`:root` 加 `--pill-r:99px`，替換所有膠囊樣式。

- CSS rule（8 處）：`.chip` / `#pbar` / `#pbar-fill` / `.eopt` / `#mbtn` / `.change-badge` / `#btn-contract .contract-count`+`.contract-failed-dot` / 卡片 rarity badge
- JS template inline style（11 處）：粒子角標、`omniCount` badge、`stackN` badge、批量投入 label、`magnet_plate` x= 標記等

### B. DOM 靜態元素快取（`_$()` helper + `_ELC` 物件）

新增於 line 1755–1757：

```js
const _ELC = {};
function _$(id){ return _ELC[id] || (_ELC[id] = document.getElementById(id)); }
```

替換 86 處 `document.getElementById(...)` 呼叫，涵蓋：
- 工具列：`btn-next` / `btn-contract` / `btn-export` / `btn-import` / `btn-bgm` / `btn-perm-shop` / `btn-perm-convert`
- Modal/Overlay：`modal` / `mtitle` / `mmsg` / `mbtn` / `mbox` / `memo` / `card-chooser` / `card-chooser-skip` / `card-chooser-cards` / `card-chooser-title` / `action-chooser` / `action-cards` / `contract-panel` / `contract-panel-body` / `contract-resolve-detail` / `contract-resolve-detail-body` / `contract-fx` / `partner-float` / `compound-preview-float`
- Round info：`r-turn` / `r-profit` / `r-goal` / `r-diff` / `pbar` / `pbar-fill`
- Header / 區塊：`hdr` / `logo` / `profit-area` / `main` / `grid` / `grid-area` / `partner-section` / `partner-row` / `pf-row` / `hand-list` / `hand-fan-area` / `side-log` / `el-profit` / `el-mover` / `talent-section-title` / `talent-panel` / `talent-count` / `char-tray` / `char-toggle` / `char-bubble` / `upgrade-hint`
- 場景：`ts-cards` / `title-screen`
- 事件 banner：`ev-banner` / `ev-title` / `ev-desc` / `ev-opts` / `wind-hint` / `wind-hint-text` / `wind-dir-arrow` / `diff-chip` / `invest-preview`
- Mega/Battle/Dev：`mega-overlay` / `mega-grid-area` / `mega-hand-list` / `mega-profit` / `mega-log` / `mega-fan-area` / `mega-inspect-overlay` / `mega-inspect-box` / `battle-overlay` / `battle-mover` / `battle-log` / `battle-field` / `battle-field-area` / `battle-hp-fill` / `battle-hp-text` / `battle-turn-info` / `battle-enemy-name` / `battle-fan-area` / `btn-battle-draw` / `btn-battle-invest` / `btn-battle-redraw` / `dev-panel`

**刻意保留原寫法**（避免 stale 引用）：
- 動態建立/移除：`heatwave-overlay` / `murphy-overlay` / `indust-hint` / `omni-drag-panel` / `omni-source-card` / `omni-confirm-box` / `dev-select-clear-bar` / `tooltip`
- 變數 id：`fancard-${i}` / `getElementById(id)` 內 id 為函式參數

### C. Display helper（`_show` / `_hide`）

新增於 line 1758–1760：

```js
function _show(el,mode){ if(el) el.style.display = mode!==undefined ? mode : 'flex'; }
function _hide(el){ if(el) el.style.display = 'none'; }
```

替換 49 處 `.style.display='flex'/'none'/'block'/'inline-flex'`。

- `mode` 預設 `'flex'`；傳 `''` 可清除回 stylesheet 預設
- 內建 null check（與既有 `if(el)` 防呆模式一致）
- **保留 2 處 `style.display==='flex'` 讀取檢查**（`isAnyEventModalOpen`：判定 card-chooser/action-chooser 是否開啟）

### D. 巢狀 if 扁平化（5 處）

僅扁平化「合併 condition 後語意完全等價」的 case。所有 stepWithMover 內 G.buff 順序、partner hook 條件分支刻意不動（依 GameDoc 歷史教訓）。

| 位置 | 原寫法 | 新寫法 |
|---|---|---|
| `poverty_god.onTurnEnd` | `else { if(st.bonus>8){...} st.bonus=8; }` | `else if(st.bonus>8){...; st.bonus=8;} else { st.bonus=8; }` |
| `onCell` G.moveMode 移動 | `if(!moveSrc){...} else {...}` | `if(!moveSrc){...; return;}` 後直接平鋪 else 區塊 |
| `terminal_contract` 違約檢查 | `if(violated){ if(profit>start){...} }` | `const violated=...; if(violated && profit>start){...}` |
| `_contractProfitZeroTurns` zero-profit | `if(turns>0){ if(profit>start){...} }` | `if(turns>0 && profit>start){...}` |
| `showContractResolveDetail` def 檢查 | `if(def){ if(g){...} if(c){...} }` | `if(def && g){...}` ＋ `if(def && c){...}` 兩段 |
| `_clearLogisticsCenters` overlay 過濾 | `if(filtered≠ovs){ if(typeof setOverlays...){} }` | `if(filtered≠ovs && typeof setOverlays==='function'){...}` |
| `G.hand.forEach` 物流卡判斷 | `} else { if(BLDG[h.id].special...) h.count=0; }` | `} else if(BLDG[h.id].special...){ h.count=0; }` |

### E. 評估後不動的高風險項目

| 項目 | 不動原因（依 GameDoc 章節） |
|---|---|
| 集中化 `isDemonNegDisabled` guard | S32 行 3602–3609（擴散惡魔漏寫被發現）+ S11 行 1497（黑市/爆破工程師 isDemon 判定）：每個合夥人「該不該豁免」是個別設計決策，集中化會讓未來新增漏寫無法被發現 |
| PARTNERS desc 從 pos+neg 自動拼 | S26 行 3237–3247（全域 desc 解讀規則：`本回合→cellMods` / `永久→bldgUpgrades` / `每回合→onTurnStart`）+ S38/S48（Excel 對齊 desc 同步）：desc 是實作的單一真實來源，自動生成會破壞對照規則 |
| BLDG `fn:v=>v` 預設化 | desc 解讀規則要求 fn 精確對應 desc；S22/S26/S28/S30 死碼修復都是 fn 內邏輯位置錯誤造成的，看似佔位的 fn 實為資源行進路徑必須走過的鉤子 |
| `partnerState` 統一 init helper | 各合夥人 state shape 差異大（envy.cellBonus per-cell / pride.bonus scalar / arbitrageur.x / omni.count / yongqing_house.bonus / envy.matchBonus）；S11 行 1511 才剛移除 `poverty_god.state`/`wrath.state` 死欄位；統一 helper 雖可寫但個別 shape 仍要顯式宣告，效益低 |
| 耐用值 UI CSS 共用基類 | S42 + S48 才確立 5/7/9/11 上限與分段血條動畫；`.dur-low`（紅閃）/`.dur-zero`（灰）/`.dur-recover`（綻放）/`.dur-shake`/`.dur-bloom` 各自有獨立動畫 keyframe，合併基類有機會造成動畫互相覆蓋 |
| 「備份舊值算變化」18 處 helper 化 | 看起來像同樣 pattern，實際追蹤的東西不同（forex/arb/contract hits/durability/...）；抽 helper 會模糊「這裡在追蹤什麼」的可讀性 |
| stepWithMover G.buff 檢查鏈 | S22/S26/S28/S30 死碼根因都是 buff 順序錯誤；不可改變判斷順序 |

### F. 量化結果

| 指標 | Session 49 結束 | Session 50 結束 | 差 |
|---|---|---|---|
| 行數 | 15,482 | 15,474 | −8 |
| 大小 | 761,415 bytes | 756,715 bytes | −4,700 bytes（−4.7KB / −0.6%） |

行數淨減少不多（helper 定義 +10 行 ≈ 抵消其他扁平化），但**字元數**減少明顯：
- `document.getElementById('btn-contract')` (40 char) → `_$('btn-contract')` (18 char)：每處省 22 char × 86 處 ≈ 1.9KB
- `.style.display='none'` (21 char) → `_hide(el)` (9 char)：每處省 12 char × 49 處 ≈ 0.6KB
- 其餘 CSS 變數化、巢狀 if 合併

### 修改檔案

`index.html`：
- ~1751–1761：新增 DOM helper / display helper（_ELC / _$ / _show / _hide）
- ~9–17：`:root` 加 `--pill-r:99px`
- 其餘散布替換（86 處 DOM 快取 / 49 處 display helper / 20 處 CSS 變數 / 5 處巢狀 if）

`venture-town.html`：與 index.html 完全同步

`VentureTown_GameDoc.md`：
- 索引表加入 Session 50
- 新增 Session 50 詳細章節（本節）

---

## Session 51（2026-05-03）— GameDoc 架構審查 + 全面 code 審查 + 2 真實 bug 修復

### 動機

使用者要求「整體架構檢查」。本 Session 分兩階段：

1. **GameDoc.md 架構審查**：發現 11 項文件層 bug（表格欄位錯位、Session 編號重複、索引不全、概覽過時等），逐一修復
2. **index.html 程式碼審查**：派 5 個 Explore agent 平行審查 stepWithMover / finish / 合約 / 存檔 / 教學 / 拖曳取消 / partner hook / 工業化 / 戰鬥 / 渲染 10+ 個關鍵區塊，共 17 個 finding，**親自 grep 驗證後駁回 15 個（多為 by design 或 agent 看錯）**，修復 2 個真實 bug

### A. GameDoc.md 修復清單（11 項）

| # | 修復項 | 位置 | 結果 |
|---|---|---|---|
| 1 | 惡魔系合夥人 5 行表格缺稀有度欄 | line 306-310 | 補上稀有度（黑市 SR、其餘 4 個 SSR）+ ※ 跨流派標註 |
| 2 | Session 10/18 編號重複 | line 1020/1423/2447/2598 | 重複編號 → 10a/10b、18a/18b |
| 3 | Session 索引嚴重不完整 | line 8-37 | 新增「全 Session 完整索引（時序）」表覆蓋 Session 2-50 |
| 4 | 程式碼架構概覽行號失準 | line 609-642 | 移除失準行號；改為「以 Session 50 為準」；補入合約系統/耐用值系統/onTurnEnd hook/12 步教學 |
| 5 | G 物件欄位過時 | line 482-518 | 補入 facilityDurability/Recovering、contracts、contractPool、bldgUpgradesElec、ruinStacks、bulkStoreBonus、vaultCounts、cellRedirectDir、talentBankCount、_compoundSeq、_handSnapshot 等 14 個新欄位 |
| 6 | KEYED_DATA_FIELDS 表 | line 555 | 8 → 15 欄位（與 `index.html:4887` 實際 const 對齊） |
| 7 | 跨分類合夥人重複 | line 297-310 | 惡魔系表加註，4 個跨流派惡魔指向「主分類」 |
| 8 | 設施維護工分類 | line 320 | 從「基礎合夥人」移到新建「耐用值流派合夥人（S45 擴充）」 |
| 9 | 黃牛販子/公路之星身份混亂 | line 259/289/451-452 | 程式碼為準：scalper 只在「商店系設施」、highway_star 移到「中央流合夥人」 |
| 10 | 收益公式 (1) 殘留 | line 100 | 改為「進入時的金錢數值（基準 1）」 |
| 11 | 物流倉 v2 廢棄條目 | line 211 | 從主表移除，改為段尾註腳 |

附帶修：移除上方架構概覽中誤導的 `onSettleFinal`（grep 確認程式碼無此 hook，是文件描述錯誤）。

### B. index.html 程式碼審查結果

#### 派出的 5 個 Explore agent 與審查範圍

| Agent | 審查區塊 | Findings | 真實 bug |
|---|---|---|---|
| #1 | stepWithMover + FACILITY_FX 漏 partner hook | 3 | 0 |
| #2 | finish() / 合約 / 存檔 反序列化 | 3 | 0 |
| #3 | 教學 / 拖曳取消還原 / move session | 5 | 0 |
| #4 | partner hook 順序 / partnerState 一致性 | 4 | 0 |
| #5 | 工業化 / 戰鬥 / 場景切換 + 渲染狀態同步 | 2 | **2** |

#### 駁回的 15 個 finding（已驗證）

- **temp_shed / envy 漏 hitWithPartner**：grep 顯示 `onBuildingHit` hook 只有 ore_merchant / shop_owner / factory_owner 三個 partner，且這兩個設施都不被三者反應 → **設計上無 partner 監聽，by design**
- **matCrash + matToMoneyDouble buff 抵銷**：兩個相反方向 buff，事件每 3 回合 1 次幾乎不會同時觸發；即使同時 ÷2 後 ×2 抵銷亦合理
- **finish() onSettle 順序**：line 9117-9119 註解明確說明「順序在此之後：稅務局→嫉妒工廠→勞工保險」→ **by design**
- **onSettleFinal 應該存在**：grep 確認程式碼從未實作此 hook，agent 是被舊 GameDoc 描述誤導
- **deserializeGame mid-modal flag 清不全**：line 14081-14094 已清 14 個 `_xxx` flag，相當完整
- **TUT.tutorialMode 未清**：`G = newGame()` 完全重建 G 物件，舊 tutorialMode 隨之丟棄
- **importSave 教學中繞過 TUT**：line 14153 `triggerImport(){ if(TUT.isBlocking()) return; }` 已擋
- **restoreGridSnapshot envy.cellBonus null 覆蓋**：line 5700 已守 `if(G.partnerState&&G.partnerState.envy)`，且 `||{}` 是合理 default
- **endMobileCityMode cancel 未 flush**：line 12734-12736 已有 `_demolishBureauPending=false` 等三項清理
- **嫉妒+套利招募順序敏感**：套利者 onSettle 只看 `G.inv.arbM2G && G.inv.arbG2M` 兩個 flag，不依賴 G.profit 數值 → 順序無關
- **設施維護工 durability 清理不全**：line 4234 直接 `cellMap[bId]=max` cap，無殘留問題
- **partner 移除 partnerState 未清**：line 6779 等處 latent leak，但實際影響極小（重複招募被 `!hasPartner` 過濾）
- **惡魔合約允許重複招募**：line 4152 compensationText 明確寫「所有的『惡魔』都會重複出現」→ **by design**（合約特殊機制：強力惡魔加成 vs 每回合失去一個合夥人 tradeoff）
- **戰鬥系統 BATTLE._fieldDragSrc 未清**：檢查條件完整，不會產生 bug
- **G.card 未快照**：freeRearrange 模式下玩家不會投入，G.card 不變

#### C. 修復 Bug #1：MEGA ruinCells Set 序列化丟失（🔴 critical latent）

**根因鏈**：
1. `createMegaFacilityFromRun` line 14226：`ruinCells:G.ruinCells?{_s:[...G.ruinCells]}:null` — 建立時存為 `{_s:[...]}` 序列化格式
2. `simulateMegaFacility` line 14514-14515：lazy convert `{_s:[...]}` → `Set` 物件
3. `saveMegaFacilities` line 14196 與 `serializeGame` line 13958：`JSON.stringify(_megaFacilities)` **缺 Set replacer**
4. 結果：simulate 一次後 ruinCells 變 Set → 下次 autoSave 時 `JSON.stringify(Set)` 變 `{}` → reload 後 `mega.ruinCells._s` 是 undefined → `new Set()` 空集合 → **廢墟資料永久丟失**

**修法**：兩處 JSON.stringify 加 Set replacer：
```js
// saveMegaFacilities
localStorage.setItem(MEGA_KEY,JSON.stringify(_megaFacilities,(_,v)=>v instanceof Set?{_s:[...v]}:v));
// serializeGame
mega:JSON.parse(JSON.stringify(_megaFacilities||[],(_,v)=>v instanceof Set?{_s:[...v]}:v)),
```

#### D. 修復 Bug #2：deserializeGame 動畫世代未取消（🟠 中）

**根因**：`_stepAnimGen` 是 global 變數，不隨 G 物件重置。stepWithMover 內 setTimeout 鏈用 `if(_stepAnimGen!==gen) return` 判斷是否中斷，但若玩家在動畫中匯入存檔（line 14154 `importSave`），`deserializeGame` 替換 `G = data` 但 `_stepAnimGen` 不變 → 殘留 setTimeout 仍 fire → 操作新 grid。

**修法**：`deserializeGame` 末尾（return true 前）呼叫 `cancelStepAnim()`：
```js
if(typeof BGM!=='undefined') BGM.syncToRound();
// 取消任何進行中的 stepWithMover 動畫鏈：載入存檔時 G.grid 已替換，
// 殘留的 setTimeout 用舊 _stepAnimGen 比對仍會通過、操作新 grid 造成異常
cancelStepAnim();
return true;
```

`autoLoad` 路徑也走 `deserializeGame`，page-load 時雖無動畫，呼叫 `cancelStepAnim` 也安全（只 increment 計數器 + 隱藏 mover）。

### 量化結果

| 項目 | 變化 |
|---|---|
| index.html | 15,931 → 15,939 行（+8 行 / +約 700 bytes） |
| venture-town.html | 同步至 15,939 行 |
| GameDoc.md | 5,766 → ~5,940 行（+索引補完、Session 51 新增） |
| 真實 bug 修復 | 2 |
| Agent 誤報駁回 | 15 |
| 駁回率 | 88%（agent 在歷經 50 session 反覆審查的 codebase 上很容易誤報，需嚴格 grep 驗證） |

### 修改檔案

`index.html`：
- ~13958：`serializeGame` mega 欄位加 Set replacer
- ~14116：`deserializeGame` 末尾加 `cancelStepAnim()`
- ~14195：`saveMegaFacilities` JSON.stringify 加 Set replacer

`venture-town.html`：與 index.html 完全同步（同 3 處）

`VentureTown_GameDoc.md`：
- 11 項文件層架構修復（表格、索引、概覽、G 欄位、KEYED_DATA_FIELDS、分類、雙身份、語法、廢棄條目）
- 索引表加入 Session 51
- 新增 Session 51 詳細章節（本節）

---

## Session 52（2026-05-04）— 5 項 bug 修復（投入預覽 / 教學立繪 / 姊妹合約 / 教學人材 / 廢墟手牌）

### 動機

使用者連續回報 5 項 bug，皆為近期 session 引入的 regression 或玩家可觀察到的功能缺漏：

1. 投入預覽（拖元素卡到方向箭頭時的浮層）位置偏移到視窗左邊緣
2. 新手教學中蕾雅/譚雅立繪不見了
3. 姊妹合約「重疊 3 次」門檻過嚴，改為「重疊過」即可
4. 新手教學人材步驟拖到資源卡會卡死（無法投入也無法結束回合）
5. 廢品戰士贈卡的廢墟放到不同格子後，回收阿罵不會集中

### A. 投入預覽位置偏移（🟠 中，S50 引入的 regression）

**症狀**：玩家拖元素卡到投入箭頭時的「估算」浮層出現在視窗最左邊，與實際出口格距離很遠；尤其在多次 render（玩家動作後）或視窗大小調整後特別明顯。

**根因**：Session 50 的 DOM 快取重構把 `document.getElementById('grid')` 改成 `_$('grid')`，但 `#grid` 元素由 `area.innerHTML=h`（`index.html:11023`）每次 render 整顆替換 — 也就是說，render 後 `_$` cache 持有的是 **detached node**。`getBoundingClientRect()` 在 detached 元素上回傳全 0，於是位置計算用了 `gr.left=0, gr.right=0, gr.top=0, gr.bottom=0`，與真正在 DOM 中的 `cellEl` rect 比對時邊距判斷錯誤，把浮層丟到視窗左邊。

不是 resize 觸發；任何引發 render 的玩家動作（投入、放置、行動選擇）都會讓 cache stale。使用者誤以為與 resize 相關，是因為 resize 時視覺位置最容易發現偏離。

**修法**：兩處 `_$('grid')` 改回 `document.getElementById('grid')`：
```js
// showInvestPreview（~7508）
const grid=document.getElementById('grid');
// TUT.highlightGrid（~13720）
const grid = document.getElementById('grid');
```

`_$` cache 對 **靜態頂層** 元素（panel/modal/toolbar 等）依然合理，僅 `#grid` 因被 innerHTML 整顆替換需例外。註解標明原因，避免下次重構又被誤改。

### B. 教學立繪恢復可見（S49 過度修復的 regression）

**症狀**：新手教學流程中，蕾雅/譚雅的立繪完全不見，教學主述者只剩對話泡泡。

**根因**：Session 49 為了「立繪退場避免遮住按鈕」加了 CSS 規則：
```css
body.tutorial-active #char-tray {
  opacity: 0;
  pointer-events: none;
  ...
}
```
但教學的主述者本來就是蕾雅與譚雅，把整個立繪藏起來反而讓教學失去 "誰在跟玩家說話" 的視覺錨點。實際遮按鈕的問題已在 S49.G 用 `z-index:55` 解決，CSS 隱藏立繪屬於過度修復。

**修法**：移除 `#char-tray` 的 opacity:0 規則，只保留切換鈕（`#char-toggle`）在教學中隱藏（避免玩家在教學流程中誤點切換）：
```css
/* 教學進行中：立繪保留可見（蕾雅/譚雅是教學主述者）；切換鈕仍隱藏避免干擾 */
body.tutorial-active #char-toggle {
  display: none;
}
```

### C. 姊妹合約規則放寬

**修改**：「沒有被重疊三次的設施不參與投入」→「沒有被重疊過的設施不參與投入」

**動機**：原規則需要疊加 3 次才能投入，搭配蕾雅疊加機制過嚴格，幾乎無法在合理回合數內滿足；放寬為「至少疊加 1 次」與蕾雅機制契合度更好。

**修法**：3 處同步：
```js
// CONTRACTS.sisters_contract.compensationText
'你的小鎮中沒有被重疊過的設施不參與投入。'
// _contractCellSkipReason
if(ovs.length < 1) return '（姊妹合約：未被重疊過）';
```

### D. 教學人材拖放：雙 target 支援 + 不直跳 step9（S48 教學擴充的雙 bug）

**症狀**：
1. 拖人材到資源卡 → 教學完全不前進，結束回合按鈕鎖住
2. 拖人材到設施 → 教學直接跳 step9，玩家沒機會投入資源觀察人材效果
3. step8 提示寫「也可以拖到資源卡上」但拖了反而卡死

**根因**：
- `onTalentDrop`（拖到資源卡）沒呼叫 `TUT.hookTalentDrop`，`waitingFor='tut_talent_drop'` 永不清除
- `step8` 設 `btn-next.disabled=true`，依賴 `hookTalentDrop` 清狀態並啟用按鈕，但只有 `onTalentDropCell`（拖到設施）路徑會觸發
- `hookTalentDrop` 觸發後直接 `TUT.next()` → step9，跳過了「投入資源體驗效果」的環節

**修法**：分三段：

1. **`onTalentDrop`** 加 hook call（區分目標為 'card'）：
```js
if(typeof TUT!=='undefined' && TUT.active && TUT.hookTalentDrop) TUT.hookTalentDrop(null, null, 'card');
```

2. **`onTalentDropCell`** 既有 hook call 加 'cell' 目標：
```js
TUT.hookTalentDrop(r, c, 'cell');
```

3. **`hookTalentDrop`** 改寫：不再 `TUT.next()`，改設新狀態 `tut_end_turn_after_talent`、解鎖 btn-next、依目標說明：
```js
hookTalentDrop(r, c, target){
  if(!TUT.active || TUT.waitingFor!=='tut_talent_drop') return false;
  TUT.waitingFor = 'tut_end_turn_after_talent';
  const btn = _$('btn-next');
  if(btn) btn.disabled = false;
  setTimeout(()=>{
    TUT.speak(target==='card' ? [
      '人材投入資源卡：本回合可額外多投入 1 次！',
      '可以投入資源試試效果，或直接結束回合進入下一階段。',
    ] : [
      '人材投入設施：本回合該設施 +1，並恢復 +1 耐用值！',
      '可以投入資源試試效果，或直接結束回合進入下一階段。',
    ]);
  }, 200);
  return false;
}
```

4. **`hookDoNext`** 加新狀態識別 → 推進到 step9：
```js
if(TUT.waitingFor==='tut_end_turn_after_talent'){
  TUT.waitingFor = null;
  setTimeout(()=>TUT.next(), 200);
  return true;
}
```

`hookFinishPre/Post` 對新 waitingFor 不攔截（既有邏輯只 match `send_el` / `tut_send_for_profit` / `step===7`），自動讓投入結算正常跑、結算後 waitingFor 不變，玩家點結束回合即進 step9。

### E. 廢品戰士廢墟手牌沒加入 ruinCells（回收阿罵失效根因）

**症狀**：玩家持有廢品戰士（每回合贈廢墟卡）+ 回收阿罵（回合開始集中所有廢墟）。把廢墟卡放到不同格後，回收阿罵下回合沒有觸發集中效果，log 沒出現「👵 回收阿罵：...」。

**根因**：`tryPlaceAtCell` 一般放置分支（`index.html:7211`）只更新 `G.grid[r][c]=bldgId`，當 `bldgId==='ruin'` 時沒同步寫入 `G.ruinCells`。回收阿罵 `onTurnStart` 用 `[...G.ruinCells]` 列舉，於是手牌放置的廢墟完全被忽略。

對比 — 其他三條建立廢墟的路徑都正確同步：
- `wanderer.onTurnStart`（流浪漢，`index.html:3214-3216`）：`G.ruinCells.add(...)` ✓
- `destroyFacility` 「放置廢墟」分支（`index.html:12577-12579`）：`G.ruinCells.add(...)` ✓
- 百貨公司 destroy（`index.html:12506-12508`）：`G.ruinCells.add(...)` ✓
- `tryPlaceAtCell` 一般放置（`index.html:7211`）：**遺漏** ✗

ruin 不會走 ruinOnly / centerOnly / 蕾雅疊加 / 物流之王疊加 / 高級升級 等早期分支（廢墟不能蓋在現有設施上、無 special 標記），所以「一般放置」這條就是廢墟手牌唯一路徑。

**修法**：放置後同步加入 ruinCells：
```js
G.grid[r][c]=bldgId;
// 廢墟手牌（廢品戰士贈卡）：放置後同步加入 ruinCells，否則回收阿罵 onTurnStart 找不到
if(bldgId==='ruin'){
  if(!G.ruinCells) G.ruinCells=new Set();
  G.ruinCells.add(`${r},${c}`);
}
```

延伸效應：除了回收阿罵，依賴 `G.ruinCells` 的所有設施/合夥人也順帶修復——
- `countAllRuins`（`index.html:6369`）：流浪漢 `+2 收益每廢墟`、廢墟紀念碑 `+4 每廢墟`、廢墟掠奪者疊加計數
- `臨時工棚` 回合結束隨機賣廢墟（`10049-10059`）
- `廢墟紀念碑` 提示文字列出可放廢墟位置（`7124`）
- 各路徑用 `G.ruinCells.delete` 在格子變動時清除（不影響）

### 量化結果

| 項目 | 變化 |
|---|---|
| index.html | +13 / -10（修 5 個 regression / 雙 hook + 1 新 waitingFor）|
| GameDoc.md | +Session 52 詳細章節 + 雙索引表新增列 |
| 真實 bug 修復 | 5 |
| 駁回 finding | 0（皆使用者直接觀察回報，無誤報） |

### 修改檔案

`index.html`（5 區塊）：
- ~1374：移除 `body.tutorial-active #char-tray` opacity 規則
- ~4137 / ~4403：姊妹合約 compensationText + `_contractCellSkipReason`
- ~7214：`tryPlaceAtCell` 一般放置加 ruinCells 同步
- ~7508：`showInvestPreview` `_$('grid')` → `getElementById`
- ~12277 / ~12390：`onTalentDrop` 加 hook + `onTalentDropCell` hook 加 target
- ~13720：`TUT.highlightGrid` `_$('grid')` → `getElementById`
- ~13865 / ~13877：`hookDoNext` 加新狀態 + `hookTalentDrop` 重寫

`VentureTown_GameDoc.md`：
- 索引表加入 Session 52
- 全 Session 完整索引加入 Session 52
- 新增 Session 52 詳細章節（本節）

---

## Session 53（2026-05-04）— 教學 BGM + 投入後人材解鎖拖曳 + 對話修正

### 動機

Session 52 修完教學人材步驟後，使用者實測發現：

1. 教學流程沒有配樂（與正式遊戲對比）
2. step8 拖人材到金錢卡後，金錢卡仍然無法拖動投入
3. step8 拖人材到設施後的對話誤導玩家「可以投入資源試試效果」（實際上不行）

### A. 教學專屬 BGM（沿用 bgm_4 標題音樂）

**設計**：教學的 intro/學習感受與標題畫面類似，沿用 `bgm_4` 即可，無需新增音檔。

**實作**：
1. `BGM` 模組 `_scene` 型別擴展為 `'title' | 'tutorial' | 'gameplay'`
2. `pickIdx()` 新增 `if(_scene==='tutorial') return 4;` 分支
3. `TUT.start` 結尾呼叫 `BGM.setScene('tutorial')` —— 在 `SM.goto('gameplay')` 之後執行，覆蓋 SM 設的 `'gameplay'` scene
4. `TUT.finish` 開頭呼叫 `BGM.setScene('gameplay')` —— 切回依輪數選曲

**時序**：
```
玩家點「新手教學」
  ↓ click
onFirstGesture (capture)：BGM.start() → bgm_4 (scene='title')
  ↓ bubble
SM.goto('gameplay'): BGM.setScene('gameplay') → bgm_1
  ↓
SM.gameplay.enter: TUT.start() → BGM.setScene('tutorial') → bgm_4
  ↓
教學流程進行中：bgm_4 持續循環
  ↓
TUT.finish: BGM.setScene('gameplay') → 依 G.round 切到 bgm_1/2/3
```

中間有兩次切歌（bgm_4 → bgm_1 → bgm_4），原以為最終穩定在 bgm_4，**但實測 BGM 完全不發聲**——玩家必須額外點 🎵 toggle 才能播放（Session 54 修復；同一 click 事件內的三段 `pause/new Audio/play` 會互相 abort 前一個 play() promise，user gesture 額度耗盡後最終 play() 失敗）。

### B. `_turnInvested` 鎖死 canDrag（latent bug，非教學專屬）

**症狀**：教學 step8 中，玩家先投入金錢（step7）→ 進入 step8 拿到人材 → 拖人材到金錢卡（建立 `elementExtraUses=1`）→ 但金錢卡無法拖動投入。

**根因**：
```js
// renderFanHand line ~11731
const canDrag = G.phase === 'place' && (!G._turnInvested || G._extraUsePhase);
```

step7 投入完成後 `finish()` 設 `_turnInvested=true`、`phase='done'`、`_extraUsePhase=false`。step8 把 `phase` 改回 `'place'`，但 `_turnInvested` 與 `_extraUsePhase` 不變。

`onTalentDrop`（資源卡）只增 `elementExtraUses` 計數，沒切換 `_extraUsePhase`，於是 `canDrag = place && (false || false) = false`。

`finish()` 內部 `if(elementExtraUses>0)` 的分支會在投入時 decrement 並設 `_extraUsePhase=true`，但這要求 **投入前** 就有 extraUses。投入後再用人材的情境沒有任何路徑會打開 `_extraUsePhase`。

正常遊戲也命中：partner 效果（如分身大師、派遣總部）可能在投入後給人材，玩家此時用人材對資源卡 → 一樣鎖死。

**修法**：`onTalentDrop` 增加 `elementExtraUses` 後，若 `_turnInvested` 已 true，立即進入 extra use phase：

```js
G.elementExtraUses = (G.elementExtraUses||0) + 1;
// 已投入後再用人材：進入額外投入階段以解鎖 canDrag（_turnInvested 鎖死的情境）
if(G._turnInvested){
  G._extraUsePhase = true;
  G.phase = 'place';
}
```

完整流程驗證（修後）：
1. step7 投入 → `_turnInvested=true, _extraUsePhase=false, phase='done'`
2. step8 setUp → `phase='place'`
3. 拖人材到金錢卡 → `elementExtraUses=1` + 偵測 `_turnInvested=true` → 設 `_extraUsePhase=true, phase='place'`
4. `canDrag = place && (!true || true) = true` ✓
5. 玩家拖金錢卡到箭頭 → `finish()` 進入 `if(elementExtraUses>0)` 分支：decrement 為 0、`_extraUsePhase=true`、return
6. 玩家點結束回合 → `hookDoNext` 識別 `tut_end_turn_after_talent` → step9

### C. `hookTalentDrop` 對話修正

**問題**：Session 52 的對話對拖到設施 / 資源卡兩種情境都說「可以投入資源試試效果」，但拖設施不增 `elementExtraUses`，`_turnInvested` 仍鎖 canDrag → 對話誤導。

**修法**：依拖放目標分流：

```js
target==='card' ? [
  '人材投入資源卡：本回合可額外多投入 1 次！',
  '可以再拖資源到箭頭試試效果，或直接結束回合進入下一階段。',
] : [
  '人材投入設施：本回合該設施 +1，並恢復 +1 耐用值！',
  '直接結束回合進入下一階段吧。',
]
```

只有資源卡情境提投入；設施情境引導結束回合。

### 量化結果

| 項目 | 變化 |
|---|---|
| index.html | +14 / -4 |
| GameDoc.md | +Session 53 詳細章節 + 雙索引表新增列 |
| 真實 bug 修復 | 1（B：投入後人材鎖死，partner 效果情境也修） |
| 功能新增 | 1（A：教學 BGM） |
| 對話修正 | 1（C） |

### 修改檔案

`index.html`：
- ~2341 / ~2347 / ~2358：BGM 註解、`_scene` 型別、`pickIdx` 加 tutorial 分支
- ~13366：`TUT.start` setScene('tutorial')
- ~13668：`TUT.finish` setScene('gameplay')
- ~12249：`onTalentDrop` 投入後解鎖 canDrag（`_extraUsePhase=true; phase='place'`）
- ~13895：`hookTalentDrop` 對話依 target 分流

`VentureTown_GameDoc.md`：
- 索引表加入 Session 53
- 全 Session 完整索引加入 Session 53
- 新增 Session 53 詳細章節（本節）

## Session 54（2026-05-04）— 教學 BGM 不啟動 regression 修復

### 動機

Session 53 新增「教學專屬 BGM」後，使用者實測：**進入新手教學 BGM 完全不播**，必須額外點右上角 🎵 toggle 才會發聲。Session 53 的時序註解原寫「玩家通常聽不到差異」，實際上整段音訊被瀏覽器靜音。

### 根因：同一 click 事件內三段 `pause/new Audio/play` 互相 abort

點「新手教學」card 後，**同一個 click event** 內依序發生：

```
1. capture-phase listener (bgmAutoStart.onFirstGesture)
   → BGM.start()  [_scene='title' → idx=4]
   → new Audio(bgm_4) → play() ── Promise A pending

2. bubble-phase card.onclick
   → SM.goto('gameplay', {mode:'tutorial'})
   → BGM.setScene('gameplay')  [_scene='gameplay' → idx=1]
   → ensureAudio(1): pause(bgm_4) → Promise A REJECT (AbortError)
                     new Audio(bgm_1) → play() ── Promise B pending
   → SM.gameplay.enter({mode:'tutorial'})
   → TUT.start()
   → BGM.setScene('tutorial')  [_scene='tutorial' → idx=4]
   → ensureAudio(4): pause(bgm_1) → Promise B REJECT
                     new Audio(bgm_4_v2) → play() ── Promise C
```

關鍵：

- `BGM._switchToCurrentIdx` 的 `.catch(()=>{})` **只吞錯**，不 reset `active`，所以 state 顯示仍在播放
- `BGM.start` 的 `.catch` 會 set `active=false`，但 Promise A reject 是 **async** 觸發，到達時 SM 已同步跑完三段切歌
- 瀏覽器 audio user-gesture 配額在連續 abort 後耗盡，**Promise C 雖在原始 click stack 內呼叫但仍可能被靜音**（Chrome / Firefox 對 rapidly orphaned media element 的保守策略）
- 玩家點 🎵 toggle 時觸發新 user gesture，`BGM.start` 重新 play 同一個 audio object 即成功——這就是「需要點開關才能播」的觀察

### 修法：跳過 tutorial entry 的中間 setScene('gameplay')

`'title'` 與 `'tutorial'` 的 `pickIdx` 都返回 `4`（共用 bgm_4）。直接從 title 切 tutorial 時，`_switchToCurrentIdx` 的早退條件 `idx===currentIdx&&audio` 命中，**完全不重建 Audio**——沒有 pause、沒有 play、沒有 race。

修改 `SM.goto`（`index.html` ~15411）：

```js
// 修前
if(typeof BGM!=='undefined'&&BGM.setScene) BGM.setScene(name);

// 修後
const _isTutEntry = name==='gameplay' && opts && opts.mode==='tutorial';
if(typeof BGM!=='undefined'&&BGM.setScene&&!_isTutEntry) BGM.setScene(name);
```

修後時序：

```
1. capture-phase: BGM.start() → new Audio(bgm_4) → play() (active=true)
2. bubble-phase: SM.goto skip setScene
                 TUT.start → BGM.setScene('tutorial')
                 _scene 'title'→'tutorial' (changed)
                 _switchToCurrentIdx: idx 4 === currentIdx 4 && audio → return
                 ── audio 持續循環，無中斷
```

### 不影響其他路徑

- 「開始遊戲」(`mode:'new'`)、「繼續遊戲」(`mode:'resume'`)、「讀取存檔」(`mode:'import'`) 仍走 `setScene('gameplay')`，single switch 沒有 race
- `TUT.finish` 的 `setScene('gameplay')` 在使用者已多次互動後執行，user gesture 額度充足
- title 場景互切不命中此分支

### 量化結果

| 項目 | 變化 |
|---|---|
| index.html | +4 / -1（SM.goto 加 4 行條件 + 註解） |
| GameDoc.md | +Session 54 章節 + 雙索引修正 + Session 53 註解更正 |
| 真實 bug 修復 | 1（Session 53 引入的 regression） |

### 經驗教訓

- **`audio.play()` 回 Promise 失敗時 `.catch(()=>{})` 容易吞掉診斷訊號**——若 `BGM._switchToCurrentIdx` 在失敗時也呼叫 `active=false`，至少 toggle 按鈕能正確顯示
- **同一 user gesture 內連續切換 media element 是反 pattern**——browsers 把 `pause/new Audio/play` 視為新獨立操作，不繼承前一個 element 的 gesture 額度
- **scene state 與 audio idx 不同步是隱憂**——`'title'`/`'tutorial'` 共用 idx=4，scene 變更但 idx 不變的早退路徑就是這次的救命稻草；未來若加 `'menu'`/`'pause'` 等 scene 都應 map 到既有 idx 而非新增 mp3

### 修改檔案

`index.html`：
- ~15411-15415：`SM.goto` 加 `_isTutEntry` 條件，跳過 tutorial 入場的 setScene('gameplay')

`VentureTown_GameDoc.md`：
- 全 Session 完整索引加入 Session 54
- Session 53 時序註解更正（"玩家通常聽不到差異" → 實測完全不發聲）
- 新增 Session 54 詳細章節（本節）

## Session 55（2026-05-04）— 標題 🎵 toggle 首次點擊無效 + BGM race 根因修復

### 動機

Session 54 修完教學 BGM 後，使用者繼續回報：**標題畫面點 🎵 toggle 也不會啟動 BGM**。同時也注意到「開始遊戲」/「繼續遊戲」這類進入 gameplay 的卡片，BGM 也常常打不開——必須額外點 🎵 toggle 才能播放（且 toggle 自身也壞）。Session 54 的 SM.goto 修法只解了 tutorial path，沒解到根因。

### 根因：bgmAutoStart capture-phase 提前啟動 → 與目標 handler 競爭

`bgmAutoStart` 用 capture phase 註冊 listener（第三參數 `true`），事件流序為：

```
[capture] document.onFirstGesture → BGM.start() → audio.play()
[target ] btn-bgm.onclick → toggleBgm() → BGM.toggle()
```

對 🎵 toggle：

1. capture：BGM.start。`active=false → true`，bgm_4 開始播
2. target：toggleBgm → BGM.toggle，看到 `active=true` → 呼叫 `stop()`，audio.pause()，`active=false`，localStorage 寫入 `'0'`
3. 結果：按鈕變 🔇、無聲、偏好被存成「關閉」。**使用者看到的就是「點了沒反應」**，而且因為 localStorage 已寫 `'0'`，下次刷新還是默認關閉

對「開始遊戲」card：

1. capture：BGM.start → play(bgm_4) → Promise A pending
2. target：SM.goto('gameplay', {mode:'new'}) → setScene('gameplay') → ensureAudio(1)：`pause(bgm_4) → Promise A reject async` + new Audio(bgm_1) + play() → Promise B
3. Promise A reject 回到 BGM.start 的 `.catch(()=>{ active=false })` → `active=false`
4. 此後雖然 bgm_1 仍在播（loop），但內部 state `active=false`，下次 syncToRound 會直接 return

教學 path 多一段 setScene('tutorial')，三個 audio 物件鏈式 abort，user gesture 額度耗盡，最終 play 也被瀏覽器靜音——這就是 Session 53/54 觀察到的「教學完全不發聲」。

### 修法：listener 改為 bubble phase

把三組 `addEventListener(..., true)` 改成 `false`。事件流變為：

```
[target ] btn-bgm.onclick → toggleBgm() → BGM.toggle()
[bubble ] document.onFirstGesture → if(!isActive()) BGM.start()
```

對 🎵 toggle：

1. target：toggleBgm → BGM.toggle 看到 `active=false` → start()，audio 開播，`active=true`，localStorage `'1'`
2. bubble：onFirstGesture → `BGM.isActive() === true` → no-op，listeners 撤除
3. ✓ 正常

對「開始遊戲」card：

1. target：SM.goto('gameplay', {mode:'new'}) → setScene('gameplay') → ensureAudio(1) **不 play**（active 仍 false），`_scene='gameplay'`, `currentIdx=1`
2. bubble：onFirstGesture → BGM.start → pickIdx=1 → ensureAudio(1) 早退（同 idx 同 audio）→ play(bgm_1) **單次** → `active=true`
3. ✓ 沒有任何 audio 被 abort，無 race

對「新手教學」card（在 Session 54 修正之上）：

1. target：SM.goto skip setScene → TUT.start → setScene('tutorial') → ensureAudio(4) **不 play**
2. bubble：BGM.start → pickIdx=4 → ensureAudio(4) 早退 → play(bgm_4) **單次**
3. ✓

對標題 logo 點擊（DEV.push，無場景變化）：

1. target：DEV.push('L')
2. bubble：BGM.start → pickIdx=4（_scene 仍 'title'）→ ensureAudio(4) 建立 → play(bgm_4)
3. ✓ 標題畫面也能播 bgm_4

### 為什麼不擔心 stopPropagation

全域 grep `stopPropagation` 只有一處（line ~10768，移動方向選擇 panel），且發生在 gameplay 中後期，那時 BGM 早已啟動、listener 已 self-remove。標題/教學/初始 gameplay 進入路徑無 stopPropagation，bubble listener 必定觸發。

退一步即使首次點擊命中 stopPropagation，listener 不被 remove，下一次正常點擊就會啟動——延遲一拍而非永久失敗。

### Session 54 SM.goto 修法的後續定位

Session 54 在 `SM.goto` 加 `_isTutEntry` 條件跳過 `setScene('gameplay')`。在 bubble phase 修法之後，這個條件變成「**避免建立瞬間用不到的 bgm_1 Audio 物件**」的優化（節省一次 `new Audio()` + 網路請求），不再是必要修。**保留**作為防禦性程式：教學入場明確不需要切到 gameplay 池。

### BGM 模組的 latent state 不一致問題（觀察，未修）

`BGM.start` 的 `.catch(()=>{ active=false })` 會在 play 被 abort 時 async 把 `active` 設 false，但 audio 物件可能此時已被 `_switchToCurrentIdx` 換成新的且仍在播。修復後不會再觸發此 race，但若未來新增 BGM 切換路徑要小心：

- `_switchToCurrentIdx` 的 `.catch(()=>{})` 完全吞錯，不同步 active 狀態
- 兩個 catch 處理的是不同 audio 物件，但共用同一個 `active` 變數

若要徹底乾淨，可考慮：(a) 把 `.catch` 改 `if(audio===this) active=false;` 鎖定當前實例，(b) 或統一使用單一 Audio 物件改 `src` 而非 `new Audio`。本次先不動，等實際遇到再修。

### 量化結果

| 項目 | 變化 |
|---|---|
| index.html | +5 / -3（3 處 `true` → `false` + 4 行註解） |
| GameDoc.md | +Session 55 章節 + 雙索引修正 |
| 真實 bug 修復 | 2（標題 🎵 toggle 首次無效；非教學 card 進入 BGM 不穩定） |
| 設計改進 | 1（從根因解 race，Session 54 SM.goto 修法降為優化） |

### 修改檔案

`index.html`：
- ~15875-15894：`bgmAutoStart` 三組 `addEventListener` 第三參數 `true` → `false`，註解說明 capture vs bubble 對 toggle 與 SM.goto 的競爭

`VentureTown_GameDoc.md`：
- 全 Session 完整索引加入 Session 55
- 新增 Session 55 詳細章節（本節）

## Session 56（2026-05-04）— 商店合夥人池 + 免費格快取失效修復

### 動機

兩件事一起做：

1. **新功能**：第 2 輪起，常駐商店有機率把其中一張替換為合夥人。合夥人比設施貴（×2.5），而且要套用既有的「同詞條合夥人權重加成」設計（Session 42 的 `tagWeightFor`）
2. **回報的 bug**：玩家先看商店（手牌還有設施 → 不滿足免費條件 → cache 寫入 `hasFree=false`）→ 取消、把手牌設施全放上小鎮（達成免費條件）→ 再開商店 → cache 命中沿用舊 offer → **免費格不出現**

### A. 商店合夥人池

新常數（緊鄰 `getPermShopCost`）：

```js
const PARTNER_SHOP_PROB=0.4;       // 觸發機率
const PARTNER_SHOP_MIN_ROUND=2;    // 最早出現輪數
const PARTNER_SHOP_COST_MULT=2.5;  // 對應設施基礎費用的倍率
```

`getPermShopCost(id)` 改為 per-item：基礎 `scaledCost(8)`，`expand_contract` ×3，**合夥人 id 再 ×2.5**。三個倍率串接：基礎合夥人費 = 設施費 × 2.5；擴展合約下 = 設施費 × 7.5。

新 helper `_shopPickPartner(tagCounts)`：

- 排除：已持有 (`G.partners`) / `PARTNERS[pid].isDemon` 為 true（惡魔有獨立招募路徑：契約、事件、特定設施觸發）/ `PARTNERS[pid]` 缺定義
- 過池：直接套 `weightedPickN(pool, 1, tagCounts)`
- 自動命中：
  - `filterByOwnedTags`：玩家有 ≥2 非 IGNORE 詞條時，排除非匹配合夥人（'unique' 在 IGNORE，starter 不會誤鎖）
  - `tagWeightFor`：每匹配詞條 +30%、≥2 詞條同時命中 ×1.5、加上 `rarityWeightByRound` 對 SR/SSR 早期壓制
- 無人選：return null（pool 全空 → 略過合夥人替換）

注入點：在原本 `weightedPickN([...new Set(pool)], numCards, _shopTc)` 取得 `shuffled` 後，獨立判斷：

```js
if(!barrenBoost && G.round>=PARTNER_SHOP_MIN_ROUND && Math.random()<PARTNER_SHOP_PROB){
  const pid=_shopPickPartner(_shopTc);
  if(pid){
    const replaceIdx=Math.floor(Math.random()*shuffled.length);
    shuffled[replaceIdx]=pid;
  }
}
```

**設計理由 — 替換而非追加**：保持 3 張 chooser layout，避免 4 卡撐爆 modal 寬度；同時也避免「合夥人總是多一張」造成滿出機率失衡。

**設計理由 — 排除荒蕪**：`barrenBoost`（荒蕪合約 5 張全免費）路徑 skip 合夥人替換——荒蕪是設施福利，合夥人不應免費招募。

### B. 免費格 cache 失效修復

原 `doPermShop`：

```js
let offer = G._permShopOffer;
if(!offer || offer.turn !== G.turn || offer.round !== G.round){
  // ... 生成新 offer，計算 hasFree / freeIdx
  offer = { ids, freeIdx, hasFree, ... };
  G._permShopOffer = offer;
}
// 直接用 offer.hasFree / offer.freeIdx 渲染
```

問題：cache hit 時不重新計算 `hasFree`/`freeIdx`。玩家在「第一次開」與「第二次開」之間若狀態變化（手牌→小鎮、滿足 `isPermShopFree()`），舊 offer 仍記 `hasFree=false`、`freeIdx=-1`。

修法：cache hit 加一條補位 branch：

```js
} else if(!offer.barrenBoost && !offer.hasFree && isPermShopFree()){
  const fIdx=_pickFreeFacIdx(offer.ids);
  if(fIdx>=0){
    offer.freeIdx=fIdx;
    offer.hasFree=true;
    G._permShopOffer=offer;
  }
}
```

**只升級不降級**：條件嚴格寫 `!offer.hasFree`——若舊 offer 已是 free，狀態反向變化（不太可能，但理論上可能因合約效果加手牌）也不撤回免費。對玩家友善。

**為什麼不直接重 roll**：原註解就提到「取消重開仍是同一批」是有意設計，避免玩家反覆開關刷內容。免費格只是 metadata 補上，不動 `ids`。

### C. 免費格不落在合夥人位置

原 freeIdx 計算 `Math.floor(Math.random()*shuffled.length)` 會均勻落在 0~length-1，可能命中合夥人位置。但合夥人**不應該免費**（已經是稀缺資源）。

新 helper `_pickFreeFacIdx(ids)`：

```js
function _pickFreeFacIdx(ids){
  const facIdx=ids.map((id,i)=>PARTNER_RARITY[id]?-1:i).filter(i=>i>=0);
  if(facIdx.length===0) return -1;
  return facIdx[Math.floor(Math.random()*facIdx.length)];
}
```

兩處用上：

1. 新 offer 生成：`freeIdx=(hasFree && !barrenBoost) ? _pickFreeFacIdx(shuffled) : -1`
2. cache hit 補位：上節 B 的 fIdx 也用此 helper

**邊界**：3 張中最多 1 張替換為合夥人，至少 2 張設施位置 → `_pickFreeFacIdx` 永遠有解。但 helper 仍寫 `facIdx.length===0` 防呆（return -1）。

`offer.hasFree` 改寫：`(hasFree&&(barrenBoost||freeIdx>=0))`——若極端情況 freeIdx=-1（理論不會），`hasFree` 也降為 false 同步。

### D. Chooser map 分流

原本只渲染設施，現新增合夥人分支：

```js
const isPartner = !!PARTNER_RARITY[bid];
const isFree = !isPartner && (offer.barrenBoost || (i===offer.freeIdx));
const c=isFree?0:getPermShopCost(bid);
if(isPartner){
  return {
    emoji:p.emoji, name:p.name,
    desc:(p.pos||'')+(p.neg?'\n⚠ '+p.neg:'')+...,
    pos:'-'+c+' 收益', neg:'',
    extraClass:'shop-partner-card',
    onclick:`cardChooserPick(()=>{G.profit-=${c};...recruitPartner('${bid}');...})`,
  };
}
// 設施 fallback（不變）
```

合夥人 onclick 直接呼叫 `recruitPartner(pid)`（含 `onRecruit` hook、`partnerState` init、招募音效動畫、log）。

### E. CSS：`.sel-card.shop-partner-card`

紫色配色 + 「🤝 招募」絲帶（仿 `.sel-card.free-card` 「🎁 免費」絲帶結構）。避免與面板既有 `.partner-card`（72px 小卡）衝突——名稱加 `shop-` 前綴。

### 平衡考量

| 數值 | 值 | 理由 |
|---|---|---|
| 觸發機率 | 0.4 | 商店 = 主動付費功能，玩家會反覆觀察，0.4 平均 2.5 次見一個合夥人 |
| 最早輪數 | 2 | 第 1 輪玩家還在熟悉基礎，合夥人加入會分散注意；第 2 輪同時也是首個契約 chooser 出現的時點 |
| 費用倍率 | 2.5 | 合夥人為 R/SR/SSR 級長期效益，與設施一次性使用對比；$8 × 2.5 = $20 起跳，第 5 輪變 $20 × 2.7 ≈ $54 |
| 排除惡魔 | isDemon:true | 惡魔系設計上由特定路徑取得（壞事件、契約懲罰、特殊設施）；商店化會破壞稀缺感 |

### 量化結果

| 項目 | 變化 |
|---|---|
| index.html | +約 70 行（CSS +20、shop logic +50） |
| GameDoc.md | +Session 56 章節 + 雙索引列 |
| 新功能 | 1（商店合夥人池） |
| 真實 bug 修復 | 1（免費格 cache 失效） |
| 防禦性修補 | 1（免費格不落在合夥人位置） |

### 修改檔案

`index.html`：
- ~780（CSS）：新增 `.sel-card.shop-partner-card` 紫色配色 + 「🤝 招募」絲帶 + 文字色覆寫
- ~10185-10215：新增 `PARTNER_SHOP_*` 常數、`getPermShopCost(id)` 簽名擴展、`_shopPickPartner` / `_pickFreeFacIdx` helper
- ~10242-10248：partner replacement 注入到 `shuffled`
- ~10252：`freeIdx` 改用 `_pickFreeFacIdx`
- ~10257：`offer.hasFree` 改寫為 `(hasFree&&(barrenBoost||freeIdx>=0))`
- ~10259-10268：cache hit 補免費格 branch
- ~10273-10295：chooser map 加 `isPartner` 分支與 `recruitPartner` onclick

`VentureTown_GameDoc.md`：
- 全 Session 完整索引加入 Session 56
- 新增 Session 56 詳細章節（本節）

## Session 57（2026-05-04）— 商店合夥人改為「輪」級鎖

### 動機

Session 56 的合夥人 roll 寫在 `doPermShop` cache-miss 分支內，**每回合 cache 失效時都會重 roll**。雖然「同一回合」內反覆開關仍是同一份 offer（被 `(turn,round)` cache 鎖住），但玩家可以：

1. 第 R 輪、回合 N 開店 → 看到合夥人 X、不滿意 → 取消
2. 結束回合 → 回合 N+1（cache 因 turn 改變失效）→ 重開店 → roll 出合夥人 Y
3. 重複 step 2 直到看到想要的合夥人

每結束一回合會吃掉「目標收益」的時間預算，**理論上有成本**，但若玩家手上時間預算寬鬆，這仍是一個可行的「以回合換合夥人」cheese path——違反「合夥人是稀缺、戰術性決策」的設計意圖。

### 修法：把 partner roll 抽出 cache-miss 分支，鎖到「輪」級別

新欄位 `G._permShopPartnerLock = { round, pid }`（pid 可為 string | null）：

```js
if(!barrenBoost && G.round>=PARTNER_SHOP_MIN_ROUND){
  let pLock=G._permShopPartnerLock;
  if(!pLock || pLock.round!==G.round){
    // 進入新一輪：roll 一次決定本輪是否出現合夥人、是哪一位
    const rolled=(Math.random()<PARTNER_SHOP_PROB) ? _shopPickPartner(_shopTc) : null;
    pLock={ round:G.round, pid:rolled||null };
    G._permShopPartnerLock=pLock;
  }
  if(pLock.pid && !G.partners.includes(pLock.pid)){
    const replaceIdx=Math.floor(Math.random()*shuffled.length);
    shuffled[replaceIdx]=pLock.pid;
  }
}
```

### 行為對照

| 情境 | Session 56（修前） | Session 57（修後） |
|---|---|---|
| 同回合多次開關商店 | 同 offer（cache 命中） | 同 offer ✓ |
| 跨回合（同輪內）重開 | **新 partner roll**（可換人） | 同一 pid（或同樣 null） |
| 同輪內買下合夥人 | 下回合 cache 重 roll，可能再出一個 | pLock.pid 已被持有，跳過注入；同輪不再出別人 |
| 進入新一輪 | 重 roll | pLock.round 不符 → 重 roll（pid 可能不同或 null） |
| 第 1 輪 | 不出合夥人 | 不出合夥人 ✓ |
| 荒蕪合約批次 | 跳過合夥人 | 跳過合夥人 ✓ |

**設施仍每回合重 roll**：facility 那段不動，玩家還是可以「結束回合刷設施」（與既有設計一致）。但合夥人作為長期戰略資源，鎖到輪級別。

### 邊界處理

- **同輪內買到 pLock.pid**：`G.partners.includes(pLock.pid)` 為 true → 跳過注入；同輪不再出別人。下一輪重 roll。
- **pLock.pid===null（rolled fail）**：同輪固定不出合夥人，玩家必須等下一輪。這是設計意圖：roll 為 0 = 本輪沒命。
- **save/load**：`G._permShopPartnerLock` 是普通物件，沿用預設 G 序列化。`deserializeGame` 沒有 `delete data._permShopPartnerLock`，所以**會被保留**——這是正確行為（玩家存檔當下看到合夥人 X，讀檔回來還應該是 X）。
- **`_shopPickPartner` 在新一輪 roll 時用當下 `_shopTc`**：玩家本輪累積的詞條會影響當輪 roll；同輪內後續詞條變化（買新合夥人/設施）不會改 pid（已鎖）。

### 為什麼不也鎖位置

`replaceIdx=Math.floor(Math.random()*shuffled.length)` 仍在 cache-miss 內，每回合 partner 在 chooser 中的位置會變。沒鎖的理由：

- 設施每回合重 roll，shuffled 內容不同，固定位置反而會跟某張新設施撞
- 玩家視覺辨識合夥人靠「🤝 招募」絲帶 + 紫色卡，不靠位置
- 鎖位置會讓 cache 結構複雜化，收益不大

### 量化結果

| 項目 | 變化 |
|---|---|
| index.html | +約 8 行（partner roll 抽到輪鎖 + 註解） |
| GameDoc.md | +Session 57 章節 + 雙索引列 |
| 設計修補 | 1（堵 Session 56 跨回合刷新 cheese path） |

### 修改檔案

`index.html`：
- ~10242-10258：partner replacement 改為 `G._permShopPartnerLock` 輪級 cache，cache-miss 才 roll；`!G.partners.includes(pLock.pid)` 防同輪重出已買合夥人

`VentureTown_GameDoc.md`：
- 全 Session 完整索引加入 Session 57
- 新增 Session 57 詳細章節（本節）

## Session 58（2026-05-04）— 訪客計數器（作者專用 + IP 排除）

> **本次為 B-only 還原**：原本 Session 58 commit `1b8e19e` 被 `81aae54` revert 掉；這次 revert-the-revert 後，調整 binding 為已部署 worker 的實際設定（`env.KV` 而非 `env.VT_KV`、key `visits` 而非 `count`、CORS allowlist 而非 `*` 通配），並把 `VC_API` 直接填上實際 worker URL。

### 動機

GitHub Pages 上線版需要追蹤遊玩人數，但要把作者自己測試的訪問排除在外。靜態頁面沒後端，需外部服務支援；同時計數器只給作者看，不曝露給玩家。

### 架構

```
┌──────────────────────┐         ┌──────────────────────────┐
│ index.html (靜態頁)   │  ──→   │ Cloudflare Worker        │
│ - VC 模組（暗門偵測） │  fetch │ - /visit  (+1 if !excl)  │
│ - 立繪/標題 click 鉤  │         │ - /get    (read only)    │
│ - 載入時 VC.visit()   │         │ - /exclude (mark IP)     │
└──────────────────────┘         │ + KV binding env.KV      │
                                 │   - visits: number       │
                                 │   - excluded:<ip>: '1'   │
                                 └──────────────────────────┘
```

### A. Cloudflare Worker（`counter-worker.js`）

獨立檔案，部署到 Cloudflare Workers（免費 100k req/日）。三個端點：

- **GET `/visit`** — 若 IP 不在 `excluded:` key prefix 下，`count` +1；回傳 `{ count, excluded, ip }`
- **GET `/get`** — 只讀，回傳 `{ count, excluded, ip }`
- **POST `/exclude`** — 把當前 IP 加入排除列表；首次排除時把 `count` -1 抵消同 session 的 visit；回傳 `{ ok, ip, count, excluded:true }`

CORS 用 allowlist（`ALLOWED_ORIGINS` Set）：`https://neion4real.github.io` + `'null'`（file:// 本地測試），不在白名單的 origin 拒絕。比原版 `*` 通配更嚴格，避免任意網站嵌入 worker 灌計數。

KV binding `KV`（變數名）+ namespace `VT_COUNTER`（顯示名）由部署者在 Worker Settings → Bindings 手動建立。Key 為 `'visits'`（總計數）+ `'excluded:<ip>'`（排除旗標）。

部署步驟：見 `counter-worker.js` 開頭註解（10 步、約 10 分鐘）。

### B. 前端 `VC` 模組

仿 `DEV` 的 pattern detector，但獨立 seq + 不同模式：

```js
const VC_API='https://vt-counter.zzz54872qw.workers.dev'; // 已部署實際 URL
const VC={
  seq:[],
  pattern:['C','C','C','L','L','C','C','C'], // 立繪×3 + 標題×2 + 立繪×3
  enabled(){ return VC_API && !VC_API.includes('YOUR_WORKER_URL'); },
  push(code){ /* timer reset 5s + tail match → open() */ },
  visit(){ /* sessionStorage 防 F5 重複 + fetch /visit */ },
  open(){ /* fetch /get + 渲染 overlay + K 按鈕綁 /exclude */ },
};
```

`enabled()` 守門：未填 Worker URL 時所有方法 no-op，不會發 fetch、不會崩。讓開發者本地測試/未部署狀態安全。

`visit()` 用 `sessionStorage.vc_counted` 旗標避免 F5 / 路由切換重複計數；新分頁 / 新瀏覽器 session 才會再算 1 次。

### C. 暗門觸發

複用既有 `DEV.push('C')` / `DEV.push('L')` 的鉤點，補上 `VC.push`：

- `charClick()` 內 `DEV.push('C')` 之後加 `VC.push('C')`
- `_$('logo').addEventListener('click', ...)` 改成同時 `DEV.push('L')` + `VC.push('L')`

兩個系統共用點擊事件、各自獨立的 seq + pattern，互不干擾。

序列：**立繪 ×3 → 標題 ×2 → 立繪 ×3**（共 8 次點擊，須在 5 秒內完成；timer 任一點擊 reset）。和 DEV 的 `['L','L','C','L','L']` 不重疊，無誤觸風險。

### D. Overlay UI（`#vc-overlay`）

點擊暗門序列觸發 → `VC.open()` 動態建立 modal：

- 標題「🎮 遊玩人數」
- 大字 count
- 小字「（已排除 IP 不再計入）」
- 當前 IP（mono 字體 + 是否已排除標記）
- 按鈕「K — 排除此 IP」（已排除則 disabled）+「關閉」

點擊 overlay 背景或關閉鈕 → 移除。K 按鈕 fetch `/exclude` → 更新 IP 文字 + 顯示新 count（已 -1）。

CSS：`position:fixed; inset:0; z-index:200`，置中黑底半透 mask + 白底卡片。

### E. 為什麼選 Cloudflare Worker

| 方案 | 優點 | 缺點 |
|---|---|---|
| **Cloudflare Worker + KV** ✓ | 免費 100k/日；CF-Connecting-IP 直接給 caller IP；KV 簡單；冷啟動 <50ms | 需要一次性 setup（10 分鐘） |
| 第三方計數器 API（abacus、counterapi） | 0 setup | 沒有 IP 排除機制；服務存活不穩 |
| GitHub Gist 當儲存 | 免設定 | 需暴露 token；GitHub API rate limit |
| Firebase / Vercel functions | 功能多 | 設定相對重；冷啟動較慢 |
| 自架 VPS | 完全自主 | 要付月費 + 維運 |

Worker + KV 是 IP 排除這個需求下唯一同時滿足 (a) 免費 (b) 取得 client IP (c) 有狀態儲存的選項。

### F. 安全與限制

- **誰都能按 K**：暗門序列只是 obscurity，理論上玩家若得知序列也能排除自己 IP（僅影響自己不被計數，無大害）
- **無 auth**：`/visit` 和 `/exclude` 都不需 token；`/exclude` 之所以安全是因為它只能影響「呼叫者自己的 IP」
- **無 anti-spam**：不同瀏覽器 session 都會 +1（但同 IP 一旦排除後就不再 +1）
- **IP 變動**：作者換網路（家裡 → 4G → 公司）每個都要按一次 K
- **CGNAT / 共享 IP**：若作者 IP 在 NAT 後面被多人共用，排除該 IP 會把同 NAT 下的玩家也排除掉（罕見邊界）

對小型同人作品的「我自己測試別污染數字」需求，這些限制可接受。

### G. 部署狀態旗標

`VC_API` 字串內含 `'YOUR_WORKER_URL'` 時，`VC.enabled()` 回傳 false：

- `VC.visit()`：不發 fetch
- `VC.push()`：seq 不累積（直接 return）
- `VC.open()`：no-op

→ 沒部署 Worker 時功能完全隱形，不會跳錯、也不會洩露暗門。設定後（替換 URL）才啟用。

### 量化結果

| 項目 | 變化 |
|---|---|
| index.html | +約 75 行（CSS overlay 27 + VC 模組 47 + 鉤點 2 + boot 1） |
| counter-worker.js | 新檔 64 行（含註解與部署步驟） |
| GameDoc.md | +Session 58 章節 + 雙索引列 |
| 新功能 | 1（訪客計數 + IP 排除） |
| 後端依賴 | 1（Cloudflare Worker，免費） |

### 設定 checklist（部署用）

1. 註冊 cloudflare.com（免費）
2. Workers & Pages → Create Worker → 貼 `counter-worker.js` 內容 → Deploy
3. Settings → Bindings → Add binding → KV namespace：variable name `KV` + 新建 KV namespace（如 `VT_COUNTER`）
4. Overview → 複製 `*.workers.dev` URL
5. 編輯 `index.html` 的 `VC_API` 為實際 URL（本次已填 `https://vt-counter.zzz54872qw.workers.dev`）；同時 worker 內 `ALLOWED_ORIGINS` 要加上 host 網域
6. push 到 GitHub Pages
7. 開瀏覽器測試：載入頁面 → 點立繪×3 → 點標題×2 → 點立繪×3 → 應彈出 overlay → 點 K → 應顯示「✓ 已排除」+ count -1

### 修改檔案

`index.html`：
- ~985 CSS：新增 `#vc-overlay` / `#vc-box` / `#vc-title` / `#vc-count` / `#vc-sub` / `#vc-ip` / `#vc-btns` 樣式
- ~15620（DEV 模組之前）：新增 `VC_API` 常數 + `VC` 模組
- ~13033 `charClick`：補 `VC.push('C')`
- ~15970 `_$('logo')` listener：補 `VC.push('L')`
- ~16080（boot 結尾，bgmAutoStart IIFE 後）：補 `VC.visit()`

`counter-worker.js`（新檔）：
- ES module export default fetch handler
- /visit /get /exclude 三端點
- KV `count` + `excluded:<ip>` schema
- CORS headers + 部署步驟註解

`VentureTown_GameDoc.md`：
- 全 Session 完整索引加入 Session 58
- 新增 Session 58 詳細章節（本節）





## Session 59（2026-05-04）— 商店合夥人改 4th 額外位置 + 撤回 S57 輪鎖

### 動機

兩個累積的回報合併處理：

1. （S56 設計問題）合夥人出現時 **替換** 3 設施其中 1 張 → 設施選擇從 3 張變 2 張，選擇成本太高
2. （S57 副作用）每輪一次 roll、鎖整輪：60% 機率玩家整輪看不到合夥人；玩家實測連 4 輪都沒看到（發生機率 ~22%，落在不舒服區間）

### A. 撤回 S57 輪鎖（per-turn roll）

**修前**（line 10267-10282）：

```js
let pLock=G._permShopPartnerLock;
if(!pLock || pLock.round!==G.round){
  const rolled=(Math.random()<PARTNER_SHOP_PROB) ? _shopPickPartner(_shopTc) : null;
  pLock={ round:G.round, pid:rolled||null };
  G._permShopPartnerLock=pLock;
}
if(pLock.pid && !(G.partners||[]).includes(pLock.pid)){
  const replaceIdx=Math.floor(Math.random()*shuffled.length);
  shuffled[replaceIdx]=pLock.pid;
}
```

**修後**：

```js
if(!barrenBoost && G.round>=PARTNER_SHOP_MIN_ROUND && Math.random()<PARTNER_SHOP_PROB){
  const pid=_shopPickPartner(_shopTc);
  if(pid && !(G.partners||[]).includes(pid)){
    shuffled.push(pid);  // ← 4th 位置；不擠 3 設施
  }
}
```

行為變化：

| 情境 | S57 修前 | S59 修後 |
|---|---|---|
| 同回合反覆開店 | 同 offer（cache 命中）| 同 offer ✓（cache 機制不變） |
| 跨回合（同輪） | 同 partner / null（鎖整輪） | 重新 roll，可能不同 partner / 出現 / 消失 |
| 整輪都不出 | 60% 機率（單次 roll）| 0.6^10 = 0.6%（10 回合各 roll）|
| 連 4 輪都不出 | 0.6^3 = 21.6% | 0.6^30 ≈ 0.00002% |
| cheese path | 結束回合刷 partner 無效（鎖死） | 可結束回合刷不同 partner |

### B. 4th 額外位置

`shuffled.push(pid)` 取代 `shuffled[replaceIdx]=pid`。chooser 從 3 張變 4 張（合夥人出現時），3 張設施完整保留。

`#card-chooser-cards` `max-width:680px; flex-wrap:nowrap`：4×140 + 3×14 = 602px ✓ 內塞得下。荒蕪批次 5 張早就突破 680（既有行為依賴 flex 收縮）。

### C. cheese path 重新評估

S57 當初鎖整輪是為了堵「結束回合刷合夥人」cheese——玩家用「過早結束回合」的時間預算換 partner roll。S59 撤回後該 cheese 復活，但成本與收益重新平衡：

- **設施仍每回合重 roll**（從 S40 起的設計）：玩家本來就有結束回合刷設施的動機
- **合夥人變 4th 額外**：見到合夥人不需犧牲設施選擇 → roll 期望值上升
- **net effect**：純粹「以回合換 partner」的 cheese 成本不變（每回合一定要花掉時間預算），但「順便看 partner」的價值提高 → 玩家行為從「鎖死戰術」變「持續關注」

設計意圖從「合夥人 = 稀缺戰術決策」轉向「合夥人 = 商店常規驚喜」，與設施 roll 節奏對齊。

### D. deserialize 清理

`_permShopPartnerLock` 已不使用，但舊存檔可能殘留。`deserializeGame` 加：

```js
delete data._permShopPartnerLock;
```

避免讀檔時把無用欄位帶入新 G。

### E. 沒動的部分

- `PARTNER_SHOP_PROB=0.4` / `PARTNER_SHOP_MIN_ROUND=2` / `PARTNER_SHOP_COST_MULT=2.5`：不變
- `_shopPickPartner`：不變（`filterByOwnedTags` + `tagWeightFor` + 排除 demon/已持有）
- `_pickFreeFacIdx`：不變（已會跳過合夥人 index，4th slot 也是合夥人，自然不被選為免費）
- chooser map（line ~10302）：不變（既有 partner 分支自然處理 4th 個 id）
- `getPermShopCost`：不變（合夥人 ×2.5 倍率仍套用）

### 量化結果

| 項目 | 變化 |
|---|---|
| index.html | +約 5 / −9（shop 邏輯簡化）+ 1（deserialize 清理）|
| GameDoc.md | +Session 59 章節 + 雙索引列 |
| 設計修補 | 1（合夥人從「整輪鎖」→「per-turn roll」+ 從「替換」→「額外」）|
| 邊界修補 | 1（舊存檔 `_permShopPartnerLock` 清理）|

### 修改檔案

`index.html`：
- ~10267-10283：S57 輪鎖整段移除，改為 per-turn roll + push 到 shuffled 末尾
- ~14243：deserialize 加 `delete data._permShopPartnerLock`

`VentureTown_GameDoc.md`：
- 全 Session 完整索引加入 Session 59
- 新增 Session 59 詳細章節（本節）




## Session 60（2026-05-04）— 巨人村 / 大型電子供給站 / 世界奇觀 真正佔用 2×2

### 動機

玩家回報：「巨人村設置後，不會佔用2*2的格子」。對照 desc「這個設施佔用2*2的格子」，與實作矛盾。

### 根因

`tryPlaceAtCell` 在 `index.html:7117` 的非 dept/ancient 大型設施分支：

```js
} else {
  // 非百貨公司/古代機械工廠的大型設施：目前實作為單格（居主格），其餘 3 格以 null 佔住 anchor 標記
  // 依現行實作保持單格行為，僅消滅 2×2 區域釋出空間
  G.grid[r][c]=bldgId;
  ...
}
```

註解寫「依現行實作保持單格行為」是設計遺留——`dept_store` / `ancient_factory` 早就用 `dept_store_part` / `ancient_factory_part` 占位實現真 2×2，但 `giant_village` / `mega_elec_supply` / `world_wonder` 三個大型設施沒對應 `_part`，被擱置成單格。

### A. 新增 3 個 `_part` 占位定義

仿 `ancient_factory_part` 模式，三個 part 都標 `isLarge:true` + `indestructible:true`：

```js
giant_village_part:    { name:'巨人村', emoji:'🏰', desc:'巨人村（2×2）的占位格，本身無獨立效果',
                         req:null, out:null, fn:v=>v, special:'giant_village_part',
                         isLarge:true, indestructible:true },
mega_elec_supply_part: { name:'大型電子供給站', emoji:'🔋', desc:'...的占位格，本身無獨立效果',
                         req:null, out:null, fn:v=>v, special:'mega_elec_supply_part',
                         isLarge:true, indestructible:true },
world_wonder_part:     { name:'世界奇觀', emoji:'🏟', desc:'...的占位格，本身無獨立效果',
                         req:null, out:null, fn:v=>v, special:'world_wonder_part',
                         isLarge:true, indestructible:true },
```

`isLarge:true` 讓既有過濾自動覆蓋（`COMPOUND_EXCLUDE._isCompoundExcluded` 的 `if(def.isLarge)`、許多 filter 的 `BLDG[b].isLarge` 配對檢查、`isDurabilityTracked` 的 `b.isLarge` 早返）。

`indestructible:true` 讓 `destroyFacility` 在第 12566 行早返保護 part；container_house / production_line 的 `BLDG[cur].indestructible` 配對檢查也擋下。

### B. TAGS 同步

| Part | Tags |
|---|---|
| `giant_village_part` | `['large', 'hr']` |
| `mega_elec_supply_part` | `['electronic', 'large']` |
| `world_wonder_part` | `['large']` |

對齊各自主格的 tags。

### C. `isPoolableBldg` 升級

原本：

```js
if(id==='envy_factory'||id==='ruin'||id==='dept_store_part'||id==='ancient_factory_part') return false;
```

改為加入 `if(b.isLarge) return false;`：

```js
if(id==='envy_factory'||id==='ruin'||id==='dept_store_part'||id==='ancient_factory_part') return false;
if(b.isLarge) return false; // 大型設施 + 標 isLarge 的 *_part 占位格自動排除
```

`dept_store_part` / `ancient_factory_part` 不帶 `isLarge`（既有設計），保留前一條明確排除。新增的 3 個 part 帶 `isLarge`，自動被新一條排除。未來再加大型 part 只要設 `isLarge:true` 就會自動排除。

### D. `placeLarge2x2` 通用 placement

新 helper（仿 `placeAncientFactory`）：

```js
function placeLarge2x2(r,c,anchor,mainId,partId){
  const [tr,tc]=anchor;
  for(let dr=0;dr<2;dr++) for(let dc=0;dc<2;dc++){
    const key=`${tr+dr},${tc+dc}`;
    delete G.bldgUpgrades[key]; delete G.leyaPctMods[key];
  }
  G.grid[tr][tc]=mainId;
  G.grid[tr][tc+1]=partId;
  G.grid[tr+1][tc]=partId;
  G.grid[tr+1][tc+1]=partId;
  SFX.expand();
  // ... transform-flash stagger
}
```

`tryPlaceAtCell` 7117 行原本的單格 fallback 改為：

```js
} else {
  const partId = bldgId + '_part';
  addLog(`放置 ${BLDG[bldgId].emoji}${BLDG[bldgId].name} (${tr+1},${tc+1})~(${tr+2},${tc+2})${useBigCorp?' （大財團取代區域）':''}`,'g');
  placeLarge2x2(r, c, anchor, bldgId, partId);
}
```

### E. FACILITY_FX：3 個 part 的空 handler

仿 `dept_store_part(fx)` / `ancient_factory_part(fx)` 的 `fx.next(200)` pass-through。資源經過 part 時不額外加成（效果歸主格處理）。

### F. Cascade destroy（只有 `mega_elec_supply` 需要）

| 主格 | indestructible? | 需要 cascade? |
|---|---|---|
| `giant_village` | ✓ | ✗（destroyFacility 第 12566 行早返）|
| `world_wonder` | ✓ | ✗（同上）|
| `ancient_factory` | ✓ | ✗（同上）|
| `dept_store` | ✗ | ✓（既有實作於第 12588-12667 行）|
| `mega_elec_supply` | ✗ | ✓（**S60 新增**）|

`destroyFacility` 在 dept_store 分支後新增：

```js
if(bId==='mega_elec_supply'){
  [[0,1],[1,0],[1,1]].forEach(([dr,dc])=>{
    const cr=r+dr, cc=c+dc;
    if(cr<GN()&&cc<GN()&&G.grid[cr]&&G.grid[cr][cc]==='mega_elec_supply_part'){
      destroyEffect(cr,cc,{silent:true});
      G.grid[cr][cc]='ruin';
      if(!G.ruinCells) G.ruinCells=new Set();
      G.ruinCells.add(`${cr},${cc}`);
      clearKeyedData(`${cr},${cc}`);
    }
  });
  addLog('🔋 大型電子供給站 2×2 區域變為廢墟','b');
}
```

假設：anchor 在左上（`findEmpty2x2` 規定）→ part 在 `(r,c+1) (r+1,c) (r+1,c+1)`。當 `destroyFacility(r,c)` 被呼叫且 `bId==='mega_elec_supply'` 時，`r,c` 必為 anchor。

不需 anchor 反查 map（不像 dept_store 的 `deptStoreParts`）— 因為這條只處理「主格被消滅」這一個方向；part 被消滅的方向走 `indestructible` 早返。

### G. 既有過濾的覆蓋情況

掃過 14 處檢查 `dept_store_part || ancient_factory_part`，分類：

| 類型 | 處理 |
|---|---|
| 配 `BLDG[b].isLarge` 檢查（line 2983 / 7344 / 7359 / 8359） | 我的 part 有 `isLarge:true` → 自動覆蓋 ✓ |
| 配 `BLDG[b].indestructible` 檢查（line 3579 / 5037 / 5765 / 6937 / 7707 / 7715） | 我的 part 有 `indestructible:true` → 自動覆蓋 ✓ |
| 配 `BLDG[b].isLarge` 檢查（line 5190 `isDurabilityTracked`） | 同上 ✓ |
| dept_store 專屬路徑（line 3364 / 7041 / 7661 / 7686 / 8665） | 不需動 |
| `_isCompoundExcluded`（line 6384 `def.isLarge`） | 自動覆蓋 ✓ |

零個剩餘的明確列表需要手動加入新 part — 設計乾淨。

### H. 既有設施動到的程度

只動 7117 行的單格 fallback（4 行）+ 12667 行附近加 cascade（13 行）。其他既有設施 / FX / partner 邏輯不動。

巨人村效果「回合開始時若人材為 0，獲得 +8 人材」：原本用 `findCells((r,c,b)=>b==='giant_village')` 找主格。Part 不會被找到（id 不同）→ 邏輯不變。

世界奇觀效果「最終收益時，每有一個人材，獲得 +8」：onSettle 階段用合夥人 / 設施計數，主格獨立計算 → 不變。

大型電子供給站效果「回合開始時自動設置一個於自身」：用 special FX 在主格 anchor 觸發，part 不參與 → 不變。

### 量化結果

| 項目 | 變化 |
|---|---|
| index.html | +約 50 / −5（3 BLDG defs + 3 TAGS + isPoolableBldg + placeLarge2x2 + FX × 3 + cascade）|
| GameDoc.md | +Session 60 章節 + 雙索引列 |
| 真實 bug 修復 | 1（巨人村 / 大型電子供給站 / 世界奇觀 不佔 2×2）|
| 程式碼乾淨度 | 自動覆蓋既有過濾，零手動加入名單 |

### 修改檔案

`index.html`：
- ~2568：新增 `mega_elec_supply_part` 定義
- ~2574：新增 `giant_village_part` 定義
- ~2578：新增 `world_wonder_part` 定義
- ~5462：TAGS 加 `giant_village_part` / `world_wonder_part`
- ~5474：TAGS 加 `mega_elec_supply_part`
- ~5088：`isPoolableBldg` 加 `if(b.isLarge) return false;`
- ~6605：新增 `placeLarge2x2(r,c,anchor,mainId,partId)` helper function
- ~7117：單格 fallback 改為 `placeLarge2x2(r, c, anchor, bldgId, bldgId + '_part')`
- ~7973：FACILITY_FX 新增 `giant_village_part` / `mega_elec_supply_part` / `world_wonder_part` 三個空 handler
- ~12668：destroyFacility 加 `bId==='mega_elec_supply'` cascade destroy 分支

`VentureTown_GameDoc.md`：
- 全 Session 完整索引加入 Session 60
- 新增 Session 60 詳細章節（本節）

