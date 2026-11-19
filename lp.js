// Local price next to the USD price on the static guide pages: "$16.99 · ≈ Rp 215.000".
// Same country guess (time zone first) and the same cached rates (localStorage tx_rates) as the app (src/currency.ts).
// Checkout charges USD (cards convert), so this is only a guide; nothing shows for US visitors or on any failure.
(function () {
  var els = document.querySelectorAll('[data-usd]')
  if (!els.length) return
  var TZ = { 'Asia/Kolkata': 'INR', 'Asia/Calcutta': 'INR', 'Asia/Karachi': 'PKR', 'Asia/Dhaka': 'BDT', 'Asia/Jakarta': 'IDR',
    'Asia/Makassar': 'IDR', 'Asia/Jayapura': 'IDR', 'Asia/Pontianak': 'IDR', 'Asia/Ho_Chi_Minh': 'VND', 'Asia/Saigon': 'VND',
    'Asia/Bangkok': 'THB', 'Asia/Manila': 'PHP', 'Asia/Kuala_Lumpur': 'MYR', 'Europe/Istanbul': 'TRY', 'Africa/Cairo': 'EGP',
    'Africa/Lagos': 'NGN', 'Africa/Nairobi': 'KES', 'Africa/Accra': 'GHS', 'Africa/Johannesburg': 'ZAR', 'Africa/Casablanca': 'MAD',
    'Africa/Algiers': 'DZD', 'Asia/Riyadh': 'SAR', 'Asia/Dubai': 'AED', 'Asia/Kathmandu': 'NPR', 'Asia/Colombo': 'LKR',
    'America/Sao_Paulo': 'BRL', 'America/Fortaleza': 'BRL', 'America/Recife': 'BRL', 'America/Manaus': 'BRL', 'America/Bahia': 'BRL',
    'America/Belem': 'BRL', 'America/Mexico_City': 'MXN', 'America/Monterrey': 'MXN', 'America/Bogota': 'COP', 'America/Lima': 'PEN',
    'America/Argentina/Buenos_Aires': 'ARS', 'America/Santiago': 'CLP', 'Europe/Moscow': 'RUB', 'Europe/Kyiv': 'UAH', 'Europe/Kiev': 'UAH',
    'Europe/London': 'GBP', 'Europe/Berlin': 'EUR', 'Europe/Paris': 'EUR', 'Europe/Madrid': 'EUR', 'Europe/Rome': 'EUR',
    'Europe/Amsterdam': 'EUR', 'Europe/Warsaw': 'PLN', 'Asia/Tokyo': 'JPY', 'Asia/Seoul': 'KRW', 'Asia/Taipei': 'TWD',
    'Asia/Shanghai': 'CNY', 'Asia/Hong_Kong': 'HKD', 'Asia/Singapore': 'SGD', 'Asia/Tashkent': 'UZS', 'Asia/Almaty': 'KZT' }
  var cur
  try { cur = TZ[Intl.DateTimeFormat().resolvedOptions().timeZone] } catch (e) { return }
  if (!cur) return
  function show(rates) {
    var rate = rates && rates[cur]
    if (!rate) return
    els.forEach(function (el) {
      var v = parseFloat(el.getAttribute('data-usd')) * rate
      if (!v) return
      var step = v >= 1000 ? Math.pow(10, Math.floor(Math.log10(v)) - 1) : v >= 100 ? 10 : 1
      var s
      try { s = new Intl.NumberFormat(document.documentElement.lang || undefined, { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(Math.round(v / step) * step) } catch (e) { return }
      var span = document.createElement('span')
      span.className = 'local'
      span.textContent = '≈ ' + s
      el.appendChild(span)
    })
  }
  try {
    var c = JSON.parse(localStorage.getItem('tx_rates') || 'null')
    if (c && Date.now() - c.at < 86400000) return show(c.rates)
  } catch (e) { /* ignore */ }
  fetch('https://open.er-api.com/v6/latest/USD').then(function (r) { return r.json() }).then(function (j) {
    if (!j || j.result !== 'success') return
    try { localStorage.setItem('tx_rates', JSON.stringify({ at: Date.now(), rates: j.rates })) } catch (e) { /* ignore */ }
    show(j.rates)
  }).catch(function () {})
})()
