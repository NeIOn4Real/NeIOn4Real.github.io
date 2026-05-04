// ═══════════════════════════════════════════════════════════════════════════
// 創業小鎮 — Cloudflare Worker 訪客計數器
// ═══════════════════════════════════════════════════════════════════════════
//
// 部署步驟（一次性，約 10 分鐘）：
//
// 1. 註冊 cloudflare.com（免費）
// 2. Dashboard → Workers & Pages → Create application → Create Worker
// 3. 命名（如 vt-counter）→ Deploy（先放預設模板，下一步覆寫）
// 4. Edit Code → 把整份 worker.js 內容貼進去 → Save and deploy
// 5. Settings → Bindings → Add binding → KV namespace：
//    - Variable name: KV
//    - KV namespace: 點旁邊的 "Create new" 建一個（名稱隨意，如 VT_COUNTER）
//    - Save
// 6. Overview 頁籤 → 複製 worker URL（如 https://vt-counter.your-name.workers.dev）
// 7. 把該 URL 填到 index.html 裡的 `const VC_API = ...` 那行
// 8. 把下方 ALLOWED_ORIGINS 加上你 host 遊戲的網域（如 GitHub Pages URL）
//
// 端點：
//   GET  /visit    增加計數（若 IP 不在排除列表）；回傳 { count, excluded, ip }
//   GET  /get      只讀計數（不增加）；回傳 { count, excluded, ip }
//   POST /exclude  把當前 IP 加入排除列表；首次排除時把 count -1 抵消同一 session 的 visit
// ═══════════════════════════════════════════════════════════════════════════

const ALLOWED_ORIGINS = new Set([
  'https://neion4real.github.io',
  'null', // file:// 本地測試用，穩定後可移除
]);

const COUNT_KEY = 'visits'; // KV 中存放總計數的 key

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'null',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const json = (data, status = 200) => new Response(
      JSON.stringify(data),
      { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

    if (url.pathname === '/visit') {
      const excluded = await env.KV.get(`excluded:${ip}`);
      let count = parseInt(await env.KV.get(COUNT_KEY) || '0', 10);
      if (!excluded) {
        count += 1;
        await env.KV.put(COUNT_KEY, String(count));
      }
      return json({ count, excluded: !!excluded, ip });
    }

    if (url.pathname === '/exclude' && request.method === 'POST') {
      const wasExcluded = await env.KV.get(`excluded:${ip}`);
      let count = parseInt(await env.KV.get(COUNT_KEY) || '0', 10);
      if (!wasExcluded) {
        // 首次排除：把同一 session 剛剛 /visit 的 +1 抵消掉
        count = Math.max(0, count - 1);
        await env.KV.put(COUNT_KEY, String(count));
        await env.KV.put(`excluded:${ip}`, '1');
      }
      return json({ ok: true, ip, count, excluded: true });
    }

    if (url.pathname === '/get') {
      const count = parseInt(await env.KV.get(COUNT_KEY) || '0', 10);
      const excluded = await env.KV.get(`excluded:${ip}`);
      return json({ count, excluded: !!excluded, ip });
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  }
};
