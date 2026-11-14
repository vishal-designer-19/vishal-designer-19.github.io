/* Live festival card. Dates for moving festivals come from The Eternal's
   public calendar API (Delhi/IST); fixed Gregorian observances recur by rule. */
const festivalCard = document.getElementById('festivalCard');

if (festivalCard) {
  const dateLabel = document.getElementById('festivalDate');
  const title = document.getElementById('festivalTitle');
  const message = document.getElementById('festivalMessage');
  const more = document.getElementById('festivalMore');
  const artwork = document.getElementById('festivalArtwork');
  const source = document.getElementById('festivalSource');
  const cacheHours = 6;

  // These observances use the same month and day every Gregorian year.
  const fixedObservances = {
    '01-01': ['English New Year'],
    '01-12': ['Swami Vivekananda Jayanti', 'National Youth Day'],
    '01-23': ['Subhas Chandra Bose Jayanti'],
    '01-26': ['Republic Day'],
    '01-30': ['Gandhi Punyatithi'],
    '02-04': ['World Cancer Day'],
    '02-14': ["Valentine's Day"],
    '02-19': ['Chhatrapati Shivaji Maharaj Jayanti'],
    '03-08': ["International Women's Day"],
    '03-23': ['Shaheed Diwas'],
    '04-01': ["Bank's Holiday"],
    '04-14': ['Ambedkar Jayanti'],
    '04-22': ['Earth Day'],
    '05-01': ["International Workers' Day"],
    '05-07': ['Rabindranath Tagore Jayanti'],
    '05-31': ['World No Tobacco Day'],
    '06-05': ['World Environment Day'],
    '06-21': ['International Yoga Day'],
    '08-15': ['Independence Day'],
    '09-05': ["Teachers' Day"],
    '09-14': ['Hindi Diwas'],
    '09-15': ['Visvesvaraya Jayanti', "Engineer's Day"],
    '10-02': ['Gandhi Jayanti'],
    '11-14': ['Nehru Jayanti', "Children's Day"],
    '12-01': ['World AIDS Day'],
    '12-25': ['Merry Christmas']
  };

  function localDateKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function festivalIcon(name) {
    if (/Chhath|Solstice|Shortest Day|Equinox|Sankranti|Pongal|Onam/i.test(name)) return '☀️';
    if (/Christmas/i.test(name)) return '🎄';
    if (/Diwali|Lakshmi|Deep|Lohri/i.test(name)) return '🪔';
    if (/New Year/i.test(name)) return '🎉';
    if (/Guru|Jayanti|Birthday|Vivekananda|Ravidas/i.test(name)) return '🌼';
    if (/Republic|Independence|Gandhi|National|Day|Diwas/i.test(name)) return '✦';
    if (/Holi|Rang|Panchami/i.test(name)) return '🌸';
    if (/Eid|Ramadan|Jamat/i.test(name)) return '🌙';
    if (/Valentine|Mother|Father/i.test(name)) return '♥';
    return '✦';
  }

  function festivalImage(name, key) {
    const colors = ['#a3e635', '#ffb200', '#00d9c0', '#ff6f3c', '#7b5cff'];
    const color = colors[[...key].reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length];
    const icon = festivalIcon(name).replaceAll('&', '&amp;').replaceAll('<', '&lt;');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192"><rect width="192" height="192" rx="30" fill="#181826"/><circle cx="155" cy="35" r="64" fill="${color}" opacity=".18"/><circle cx="24" cy="170" r="76" fill="${color}" opacity=".12"/><circle cx="96" cy="96" r="68" fill="none" stroke="${color}" stroke-width="2" opacity=".45"/><circle cx="96" cy="96" r="56" fill="${color}" opacity=".16"/><text x="96" y="116" text-anchor="middle" font-size="71" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif" fill="${color}">${icon}</text><circle cx="28" cy="37" r="4" fill="${color}"/><circle cx="158" cy="146" r="5" fill="${color}"/></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function readCache(key) {
    try {
      const value = JSON.parse(localStorage.getItem('festival-api-cache'));
      return value?.key === key && Array.isArray(value.events) ? value : null;
    } catch {
      return null;
    }
  }

  function writeCache(key, events) {
    try {
      localStorage.setItem('festival-api-cache', JSON.stringify({ key, savedAt: Date.now(), events }));
    } catch {
      // Private browsing can disable storage; the card still works online.
    }
  }

  function renderFestival(date, apiEvents = []) {
    const key = localDateKey(date);
    const fixed = fixedObservances[key.slice(5)] || [];
    const names = [...new Set([...apiEvents, ...fixed])];
    // Put familiar major festivals first when the API lists several on a day.
    const priority = name => /^(Guru Nanak|Chhath|Diwali|Holi|Eid)/i.test(name) ? 0 : 1;
    names.sort((a, b) => priority(a) - priority(b));
    dateLabel.textContent = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric' }).format(date);
    title.textContent = names[0] || 'Have a lovely day!';
    message.textContent = names.length ? `Wishing you a wonderful ${names[0]}!` : 'Good to see you here. Make today a little brighter.';
    more.replaceChildren();
    names.slice(1).forEach(name => {
      const chip = document.createElement('span');
      chip.textContent = name;
      more.append(chip);
    });
    artwork.src = festivalImage(names[0] || 'A lovely day', key);
    source.hidden = apiEvents.length === 0;
  }

  let shownDate = '';
  async function loadFestival() {
    const date = new Date();
    const key = localDateKey(date);
    const cached = readCache(key);
    shownDate = key;
    renderFestival(date, cached?.events || []);
    if (cached && Date.now() - cached.savedAt < cacheHours * 60 * 60 * 1000) return;

    try {
      const params = new URLSearchParams({ year: String(date.getFullYear()), from: key, to: key, city: 'delhi' });
      const response = await fetch(`https://eternalsanskriti.com/api/v1/public/festivals?${params}`, {
        signal: AbortSignal.timeout(8000)
      });
      if (!response.ok) throw new Error(`Festival API returned ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data.festivals)) throw new Error('Unexpected festival API response');
      const events = [...new Set(data.festivals
        .filter(item => item.date === key && typeof item.name?.en === 'string')
        .map(item => item.name.en))];
      writeCache(key, events);
      if (localDateKey() === key) renderFestival(new Date(), events);
    } catch (error) {
      // Keep a previously fetched result or the friendly greeting when offline.
      console.info('Festival calendar unavailable:', error);
    }
  }

  loadFestival();
  setInterval(() => {
    if (localDateKey() !== shownDate) loadFestival();
  }, 60_000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) loadFestival();
  });
}
