/* Norynta site monitor beacon (shared by all of Zach's sites; source of truth: zachhhhh/tester-exchange web/public/m.js).
   No cookies, no personal data. Records pageviews, clicks, rage clicks, scroll depth, time on page,
   JS errors and Web Vitals, and sends them in small batches to public.mon_track() (Supabase free tier).
   Use: <script defer src="/m.js" data-site="example.com"></script>; custom events: window.mon('signup', {plan:'x'}) */
(function () {
  try {
    if (navigator.webdriver || /bot|crawl|spider|headless|lighthouse/i.test(navigator.userAgent)) return;
    var S = document.currentScript;
    var site = (S && S.getAttribute('data-site')) || location.hostname.replace(/^www\./, '');
    // PostHog (Norynta account, admin@norynta.com, free tier): product analytics, funnels, heatmaps,
    // session replay (inputs masked) and error tracking for every business, tagged by site/business.
    var BIZ = { '64types.app': '64 Types', 'testerexchange.com': 'Tester Exchange', 'norynta.com': 'Norynta',
      'collect.norynta.com': 'Norynta', 'sourcing.norynta.com': 'Norynta Sourcing', 'comms.norynta.com': 'Norynta', 'getrankroot.com': 'RankRoot', 'agentatlas.dev': 'AgentAtlas' }[site] || site;
    // Email link scanners (e.g. Microsoft Safe Links) open links from our emails and throw this rejection.
    // They are not people: stop recording that visit so visitor counts and error reports stay real.
    var SCAN = /Object Not Found Matching Id/;
    var scanner = false;
    addEventListener('unhandledrejection', function (e) {
      var r = e && e.reason; if (scanner || !SCAN.test(String((r && r.message) || r))) return;
      scanner = true; try { e.preventDefault(); window.posthog && window.posthog.opt_out_capturing(); } catch (x) {}
    });
    // Errors that aren't ours: browser extensions and in-app browsers inject scripts that throw on every page
    // ("Cannot read properties of undefined (reading 'M_ID')": 230 a week on testerexchange.com, all from 3 desktop
    // sessions with an extension, 15 Nov; that name is in none of our code). Also "Script error." with no source.
    // Ours always have a stack frame or filename on an http(s) page script; these have none, or only extension frames.
    var INJECTED = /reading 'M_ID'|Java object is gone|__gCrWeb|webkit\.messageHandlers|instantSearchSDKJSBridge|ucbrowser|zaloJSV2|vivoNewsDetailPage|ResizeObserver loop/i;
    var foreign = function (msg, src, stack) {
      msg = String(msg || ''); src = String(src || ''); stack = String(stack || '');
      if (INJECTED.test(msg)) return true;
      if (/^Script error\.?$/.test(msg) && !src) return true;
      if (/^(chrome|moz|safari(-web)?|ms-browser)-extension:|^about:|^blob:|^webkit-masked-url:/.test(src)) return true;
      if (/(chrome|moz|safari(-web)?)-extension:\/\//.test(stack)) return true;
      return false;
    };
    // Only real production hosts go to PostHog: local dev, *.pages.dev previews and odd ports (port scanners)
    // were mixed into the numbers (localhost:4177, sajuwise.pages.dev, salarynet.app:2087 ..., 15 Nov).
    var REAL = !location.port && !/^(localhost|127\.|\d+\.\d+\.\d+\.\d+$)|\.pages\.dev$|\.workers\.dev$|\.vercel\.app$/.test(location.hostname);
    // "Script error." = a cross-origin script failed and the browser hides every detail; nothing to act on.
    var opaque = function (ev) {
      try { var l = ev.properties && ev.properties.$exception_list; if (ev.event !== '$exception' || !l || !l.length) return false;
        if (INJECTED.test(l[0].value || '')) return true;
        return /^Script error\.?$/.test(l[0].value || '') && !(l[0].stacktrace && l[0].stacktrace.frames && l[0].stacktrace.frames.length); } catch (x) { return false; }
    };
    if (REAL && !(window.posthog && window.posthog.__loaded) && !(window.posthog && window.posthog._i)) {
      !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify reset get_distinct_id get_session_id get_session_replay_url set_config startSessionRecording stopSessionRecording captureException opt_out_capturing".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
      window.posthog.init('phc_wEUxRVQa93MbnxvrA78bd2KpZ9RGVqESJ8Xeete9NPTE', {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
        persistence: 'localStorage',
        capture_pageview: 'history_change',
        capture_pageleave: true,
        autocapture: true,
        enable_heatmaps: true,
        capture_exceptions: true,
        session_recording: { maskAllInputs: true },
        before_send: function (ev) { return scanner || opaque(ev) ? null : ev; }
      });
      window.posthog.register({ site: site, business: BIZ });
    }
    var EP = 'https://vvrlxzbngxfxddywidoq.supabase.co/rest/v1/rpc/mon_track';
    var K = 'sb_publishable_OwXT7OfwIGkuIn420mavVA_MsAkzZGf';
    var sid;
    try { sid = sessionStorage.getItem('_msid'); if (!sid) { sid = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem('_msid', sid); } }
    catch (e) { sid = 'x' + Math.random().toString(36).slice(2); }
    var q = [], path = location.pathname, t0 = Date.now(), maxScroll = 0, left = false;
    var lcp = null, cls = 0, inp = 0, vitalsSent = false, clicks = [];

    function add(k, n, v, p) {
      if (q.length >= 60) return;
      q.push({ k: k, n: String(n == null ? '' : n).slice(0, 200), v: (typeof v === 'number' && isFinite(v)) ? v : null, p: p || null, path: path });
    }
    function send() {
      if (!q.length || scanner) return;
      var body = JSON.stringify({ e: { site: site, sid: sid, lang: navigator.language || '', ref: (document.referrer || '').slice(0, 300),
        mobile: /Mobi|Android|iPhone/i.test(navigator.userAgent), events: q.splice(0, 60) } });
      try { fetch(EP, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json', apikey: K, Authorization: 'Bearer ' + K }, body: body }).catch(function () {}); } catch (e) {}
    }
    function leave() {
      if (left) return; left = true;
      add('leave', '', Math.round((Date.now() - t0) / 1000), { scroll: maxScroll });
    }
    function pageview() {
      // utm_source / ref tags on posted links, so each community's visits can be counted (Post Everywhere Playbook)
      var u = null; try { var sp = new URLSearchParams(location.search), us = sp.get('utm_source'); if (us) u = { utm: us.slice(0, 60), camp: (sp.get('utm_campaign') || '').slice(0, 60) }; } catch (e) {}
      add('pageview', (document.title || '').slice(0, 120), null, u);
    }
    function route() {
      if (location.pathname === path) return;
      leave(); send();
      path = location.pathname; t0 = Date.now(); maxScroll = 0; left = false;
      setTimeout(pageview, 50);
    }

    pageview();
    var ps = history.pushState, rs = history.replaceState;
    history.pushState = function () { var r = ps.apply(this, arguments); route(); return r; };
    history.replaceState = function () { var r = rs.apply(this, arguments); route(); return r; };
    addEventListener('popstate', route);

    addEventListener('scroll', function () {
      var h = document.documentElement, s = Math.round((h.scrollTop + innerHeight) / Math.max(h.scrollHeight, 1) * 100);
      if (s > maxScroll) maxScroll = Math.min(s, 100);
    }, { passive: true });

    addEventListener('click', function (ev) {
      var t = ev.target, el = t && t.closest ? t.closest('a,button,[role=button],[data-track],input[type=submit],summary') : null;
      var now = Date.now();
      clicks = clicks.filter(function (c) { return now - c.t < 1000 && Math.abs(c.x - ev.clientX) < 30 && Math.abs(c.y - ev.clientY) < 30; });
      clicks.push({ t: now, x: ev.clientX, y: ev.clientY });
      if (clicks.length === 3) add('rage', ((el || t).innerText || (t && t.tagName) || '').trim().replace(/\s+/g, ' ').slice(0, 80));
      if (!el) return;
      var label = (el.getAttribute('data-track') || el.innerText || el.value || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().replace(/\s+/g, ' ').slice(0, 80);
      var href = (el.getAttribute('href') || '').slice(0, 200);
      add('click', label, null, { tag: el.tagName.toLowerCase(), href: href });
      if (href && /^https?:/.test(href) && href.indexOf(location.host) < 0) send();
    }, true);

    addEventListener('error', function (e) {
      if (e && e.message) { if (!foreign(e.message, e.filename, e.error && e.error.stack)) add('error', e.message, null, { src: String(e.filename || '').slice(0, 150), line: e.lineno || 0 }); }
      // Skip analytics scripts that ad blockers stop (Cloudflare beacon, PostHog): not a user-facing failure, only noise.
      else if (e && e.target && (e.target.src || e.target.href) && !/cloudflareinsights\.com|posthog\.com/.test(e.target.src || e.target.href)) add('error', 'failed to load ' + e.target.tagName.toLowerCase(), null, { src: String(e.target.src || e.target.href).slice(0, 150) });
    }, true);
    addEventListener('unhandledrejection', function (e) { var r = e && e.reason; if (SCAN.test(String((r && r.message) || r)) || foreign((r && r.message) || r, '', r && r.stack)) return; add('error', 'promise: ' + String((r && r.message) || r).slice(0, 180)); });

    // LCP only counts while the tab was visible (as in Google's web-vitals): pages opened in a background tab reported hours.
    var firstHidden = document.visibilityState === 'hidden' ? 0 : Infinity;
    addEventListener('visibilitychange', function (e) { if (document.visibilityState === 'hidden') firstHidden = Math.min(firstHidden, e.timeStamp); }, true);
    try { new PerformanceObserver(function (l) { l.getEntries().forEach(function (x) { if (x.startTime < firstHidden) lcp = x.startTime; }); }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch (e) {}
    try { new PerformanceObserver(function (l) { l.getEntries().forEach(function (x) { if (!x.hadRecentInput) cls += x.value; }); }).observe({ type: 'layout-shift', buffered: true }); } catch (e) {}
    try { new PerformanceObserver(function (l) { l.getEntries().forEach(function (x) { if (x.interactionId && x.duration > inp) inp = x.duration; }); }).observe({ type: 'event', buffered: true, durationThreshold: 40 }); } catch (e) {}

    function flush() {
      if (!vitalsSent) {
        vitalsSent = true;
        var nav = performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : null;
        if (lcp != null) add('vital', 'LCP', Math.round(lcp));
        add('vital', 'CLS', Math.round(cls * 1000) / 1000);
        if (inp) add('vital', 'INP', Math.round(inp));
        if (nav) add('vital', 'TTFB', Math.round(nav.responseStart));
      }
      leave();
      send();
    }
    addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); else if (left) { left = false; t0 = Date.now(); } });
    addEventListener('pagehide', flush);
    setTimeout(send, 5000);

    window.mon = function (name, props) {
      add('event', name, null, props && typeof props === 'object' ? props : null); send();
      try { window.posthog && window.posthog.capture(name, props && typeof props === 'object' ? props : {}); } catch (e) {}
    };

    // Conversions on every site, with no per-site code: a form submitted, or a mail/phone link clicked.
    // Records only which form (id/name/path) and which page. Never field values, emails or phone numbers.
    var cvSeen = {};
    function conv(name, props) {
      var k = name + '|' + (props.form || props.kind) + '|' + location.pathname;
      if (cvSeen[k] && Date.now() - cvSeen[k] < 3000) return; // double clicks / double submit
      cvSeen[k] = Date.now();
      window.mon(name, props);
    }
    addEventListener('submit', function (ev) {
      try {
        var f = ev.target; if (!f || f.tagName !== 'FORM' || (f.closest && f.closest('[class*="nfb-"]'))) return;
        var act = (f.getAttribute('action') || '').split('?')[0].slice(0, 120);
        conv('form_submit', { form: (f.id || f.getAttribute('name') || act || 'form').slice(0, 60), action: act, path: location.pathname });
      } catch (x) {}
    }, true);
    addEventListener('click', function (ev) {
      try {
        var a = ev.target && ev.target.closest ? ev.target.closest('a[href^="mailto:"],a[href^="tel:"]') : null;
        if (a) conv('contact_click', { kind: a.getAttribute('href').indexOf('tel:') === 0 ? 'tel' : 'mailto', path: location.pathname });
      } catch (x) {}
    }, true);
  } catch (e) {}
})();

/* Feedback / report-a-problem button (every site that loads /m.js). Small tab on the left edge; opens a form that
   posts to the comms hub inbox (comms.norynta.com/feedback), which the daily brief reads. Recent JS errors and the
   page URL are attached so bugs can be reproduced. Turn off with data-feedback="off" on the script tag (do this on sites
   that have their own feedback form, e.g. 64 Types). Class names use the nfb- prefix so they never clash with a site's CSS.
   Any element with a data-feedback attribute (e.g. a footer link) or window.feedback() also opens it. */
(function () {
  try {
    var S = document.currentScript;
    if ((S && S.getAttribute('data-feedback') === 'off') || window.__fb || navigator.webdriver || /bot|crawl|spider|headless|lighthouse/i.test(navigator.userAgent)) return;
    window.__fb = 1;
    var errs = [];
    addEventListener('error', function (e) { if (e && e.message && errs.length < 5) errs.push(e.message + ' @' + (e.filename || '').split('/').pop() + ':' + (e.lineno || 0)); }, true);
    addEventListener('unhandledrejection', function (e) { var r = e && e.reason; if (errs.length < 5) errs.push('promise: ' + String((r && r.message) || r).slice(0, 150)); });
    var T = {
      en: ['Feedback', 'Report a problem or share an idea', ['Problem', 'Idea', 'Other'], 'What happened? What did you expect?', 'Your email (optional, for a reply)', 'Send', 'Thanks! We read every message.', "Couldn't send. Please try again."],
      'zh-hant': ['意見回饋', '回報問題或提供建議', ['問題', '建議', '其他'], '發生了什麼事？你原本預期什麼？', '你的 Email（選填，方便回覆）', '送出', '謝謝！每則訊息我們都會看。', '送出失敗，請再試一次。'],
      zh: ['意见反馈', '报告问题或提出建议', ['问题', '建议', '其他'], '发生了什么？你原本期望什么？', '你的邮箱（选填，方便回复）', '提交', '谢谢！每条消息我们都会看。', '提交失败，请重试。'],
      es: ['Comentarios', 'Informa un problema o comparte una idea', ['Problema', 'Idea', 'Otro'], '¿Qué pasó? ¿Qué esperabas?', 'Tu email (opcional, para responderte)', 'Enviar', '¡Gracias! Leemos todos los mensajes.', 'No se pudo enviar. Inténtalo de nuevo.'],
      pt: ['Feedback', 'Relate um problema ou compartilhe uma ideia', ['Problema', 'Ideia', 'Outro'], 'O que aconteceu? O que você esperava?', 'Seu e-mail (opcional, para resposta)', 'Enviar', 'Obrigado! Lemos todas as mensagens.', 'Não foi possível enviar. Tente novamente.'],
      fr: ['Avis', 'Signaler un problème ou proposer une idée', ['Problème', 'Idée', 'Autre'], "Que s'est-il passé ? Qu'attendiez-vous ?", 'Votre e-mail (facultatif, pour une réponse)', 'Envoyer', 'Merci ! Nous lisons chaque message.', "Échec de l'envoi. Réessayez."],
      de: ['Feedback', 'Problem melden oder Idee teilen', ['Problem', 'Idee', 'Sonstiges'], 'Was ist passiert? Was hast du erwartet?', 'Deine E-Mail (optional, für eine Antwort)', 'Senden', 'Danke! Wir lesen jede Nachricht.', 'Senden fehlgeschlagen. Bitte erneut versuchen.'],
      id: ['Masukan', 'Laporkan masalah atau bagikan ide', ['Masalah', 'Ide', 'Lainnya'], 'Apa yang terjadi? Apa yang kamu harapkan?', 'Email kamu (opsional, untuk balasan)', 'Kirim', 'Terima kasih! Kami membaca setiap pesan.', 'Gagal mengirim. Coba lagi.'],
      vi: ['Góp ý', 'Báo lỗi hoặc chia sẻ ý tưởng', ['Lỗi', 'Ý tưởng', 'Khác'], 'Đã xảy ra chuyện gì? Bạn mong đợi điều gì?', 'Email của bạn (tùy chọn, để phản hồi)', 'Gửi', 'Cảm ơn! Chúng tôi đọc mọi tin nhắn.', 'Không gửi được. Vui lòng thử lại.'],
      ja: ['フィードバック', '問題の報告・ご意見', ['問題', 'アイデア', 'その他'], '何が起きましたか？本来どうなるはずでしたか？', 'メールアドレス（任意・返信用）', '送信', 'ありがとうございます！すべて読んでいます。', '送信できませんでした。もう一度お試しください。'],
      ko: ['피드백', '문제 신고 또는 아이디어 공유', ['문제', '아이디어', '기타'], '무슨 일이 있었나요? 무엇을 기대했나요?', '이메일 (선택, 답장용)', '보내기', '감사합니다! 모든 메시지를 읽습니다.', '보내지 못했습니다. 다시 시도해 주세요.'],
      ru: ['Отзыв', 'Сообщить о проблеме или предложить идею', ['Проблема', 'Идея', 'Другое'], 'Что произошло? Чего вы ожидали?', 'Ваш email (необязательно, для ответа)', 'Отправить', 'Спасибо! Мы читаем каждое сообщение.', 'Не удалось отправить. Попробуйте ещё раз.'],
      tr: ['Geri bildirim', 'Sorun bildir veya fikir paylaş', ['Sorun', 'Fikir', 'Diğer'], 'Ne oldu? Ne bekliyordun?', 'E-postan (isteğe bağlı, yanıt için)', 'Gönder', 'Teşekkürler! Her mesajı okuyoruz.', 'Gönderilemedi. Tekrar dene.'],
      hi: ['फ़ीडबैक', 'समस्या बताएं या सुझाव दें', ['समस्या', 'सुझाव', 'अन्य'], 'क्या हुआ? आप क्या उम्मीद कर रहे थे?', 'आपका ईमेल (वैकल्पिक, जवाब के लिए)', 'भेजें', 'धन्यवाद! हम हर संदेश पढ़ते हैं।', 'भेजा नहीं जा सका। फिर कोशिश करें।'],
      ar: ['ملاحظات', 'أبلغ عن مشكلة أو شارك فكرة', ['مشكلة', 'فكرة', 'أخرى'], 'ماذا حدث؟ وماذا كنت تتوقع؟', 'بريدك الإلكتروني (اختياري، للرد)', 'إرسال', 'شكرًا! نقرأ كل رسالة.', 'تعذّر الإرسال. حاول مرة أخرى.']
    };
    var L = String(document.documentElement.lang || navigator.language || 'en').toLowerCase();
    var key = /^zh-(hant|tw|hk|mo)/.test(L) ? 'zh-hant' : L.split('-')[0];
    var t = T[key] || T.en, rtl = key === 'ar';
    var css = '.nfb-tab{position:fixed;left:0;top:50%;transform:translateY(-50%) rotate(180deg);writing-mode:vertical-rl;z-index:2147483000;background:#222;color:#fff;border:0;border-radius:0 6px 6px 0;padding:10px 5px;font:600 12px/1 system-ui,sans-serif;letter-spacing:.3px;opacity:.72;cursor:pointer}'
      + '.nfb-tab:hover{opacity:1}.nfb-bg{position:fixed;inset:0;z-index:2147483001;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:16px}'
      + '.nfb-box{background:#fff;color:#111;width:100%;max-width:420px;border-radius:14px;padding:20px;font:15px/1.4 system-ui,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.3)}'
      + '.nfb-box h2{font-size:17px;margin:0 0 12px}.nfb-k{display:flex;gap:8px;margin-bottom:10px}.nfb-k button{flex:1;border:1px solid #ccc;background:#fff;color:#111;border-radius:8px;padding:8px;font:inherit;cursor:pointer}'
      + '.nfb-k button[aria-pressed=true]{background:#111;color:#fff;border-color:#111}.nfb-box textarea,.nfb-box input{width:100%;box-sizing:border-box;border:1px solid #ccc;border-radius:8px;padding:10px;font:inherit;margin-bottom:10px;background:#fff;color:#111}'
      + '.nfb-box textarea{min-height:110px;resize:vertical}.nfb-row{display:flex;gap:8px;justify-content:flex-end}.nfb-row button{border:0;border-radius:8px;padding:10px 18px;font:600 15px system-ui,sans-serif;cursor:pointer}'
      + '.nfb-send{background:#111;color:#fff}.nfb-x{background:#eee;color:#111}.nfb-msg{margin:8px 0 0;font-size:14px}.nfb-hp{position:absolute;left:-9999px}';
    function el(tag, attrs, kids) {
      var n = document.createElement(tag); for (var a in attrs || {}) { if (a === 'text') n.textContent = attrs[a]; else n.setAttribute(a, attrs[a]); }
      (kids || []).forEach(function (k) { n.appendChild(k); }); return n;
    }
    var open = false;
    function show() {
      if (open) return; open = true;
      var kind = 'problem', kinds = ['problem', 'idea', 'other'];
      var kb = kinds.map(function (k, i) { return el('button', { type: 'button', 'aria-pressed': String(k === kind), text: t[2][i], 'data-k': k }); });
      var ta = el('textarea', { placeholder: t[3], maxlength: '4000', 'aria-label': t[3] });
      var em = el('input', { type: 'email', placeholder: t[4], 'aria-label': t[4], autocomplete: 'email' });
      var hp = el('input', { 'class': 'nfb-hp', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true' });
      var send = el('button', { type: 'submit', 'class': 'nfb-send', text: t[5] });
      var x = el('button', { type: 'button', 'class': 'nfb-x', text: '×', 'aria-label': 'Close' });
      var msg = el('p', { 'class': 'nfb-msg', role: 'status' });
      var form = el('form', { 'class': 'nfb-box', role: 'dialog', 'aria-modal': 'true', 'aria-label': t[1], dir: rtl ? 'rtl' : 'ltr' },
        [el('h2', { text: t[1] }), el('div', { 'class': 'nfb-k' }, kb), ta, em, hp, el('div', { 'class': 'nfb-row' }, [x, send]), msg]);
      var bg = el('div', { 'class': 'nfb-bg' }, [form]);
      function close() { open = false; bg.remove(); removeEventListener('keydown', esc); }
      function esc(e) { if (e.key === 'Escape') close(); }
      addEventListener('keydown', esc);
      bg.addEventListener('click', function (e) { if (e.target === bg) close(); });
      x.onclick = close;
      kb.forEach(function (b) { b.onclick = function () { kind = b.getAttribute('data-k'); kb.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); }); }; });
      form.onsubmit = function (e) {
        e.preventDefault(); if (ta.value.trim().length < 3) { ta.focus(); return; }
        send.disabled = true; msg.textContent = '';
        fetch('https://comms.norynta.com/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kind: kind, text: ta.value, email: em.value, website: hp.value, url: location.href, lang: L, screen: innerWidth + 'x' + innerHeight, errors: errs }) })
          .then(function (r) { if (!r.ok) throw 0; form.replaceChildren(el('h2', { text: t[6] })); setTimeout(close, 2200);
            try { window.mon && window.mon('feedback_sent', { kind: kind }); } catch (z) {} })
          .catch(function () { send.disabled = false; msg.textContent = t[7]; });
      };
      document.body.appendChild(bg); ta.focus();
    }
    window.feedback = show;
    function init() {
      document.head.appendChild(el('style', { text: css }));
      document.body.appendChild(el('button', { type: 'button', 'class': 'nfb-tab', text: t[0], 'aria-label': t[1], 'data-feedback': '' }));
      document.addEventListener('click', function (e) { var a = e.target && e.target.closest && e.target.closest('[data-feedback]'); if (a) { e.preventDefault(); show(); } });
    }
    if (document.body) init(); else addEventListener('DOMContentLoaded', init);
  } catch (e) {}
})();
