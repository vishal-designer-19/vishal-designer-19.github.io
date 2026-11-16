import fs from 'node:fs';
import path from 'node:path';

const output = path.resolve('assets/packaging-samples');
fs.mkdirSync(output, { recursive: true });

const samples = [
  { id:'mavela', brand:'MAVELA', product:'Botanical soap', lines:['LAVENDER','SOAP'], type:'Folding carton', kind:'carton', size:'75 × 105 × 35 mm', w:75, h:105, d:35, bg:'#F5E9EC', ink:'#452744', accent:'#C782AB', scene:'#F3EDF0', motif:'flowers', note:'100 g / CONCEPT' },
  { id:'rondo', brand:'RONDO ROAST', product:'Whole bean coffee', lines:['WHOLE BEAN','COFFEE'], type:'Stand-up pouch', kind:'pouch', size:'160 × 230 × 80 mm', w:160, h:230, d:80, bg:'#4A2C22', ink:'#FFF0DC', accent:'#C4854E', scene:'#EDE2D5', motif:'beans', note:'250 g / CONCEPT' },
  { id:'kivo', brand:'KIVO SNACKS', product:'Plantain crisps', lines:['PLANTAIN','CRISPS'], type:'Stand-up pouch', kind:'pouch', size:'170 × 250 × 70 mm', w:170, h:250, d:70, bg:'#FFF6D7', ink:'#1E291D', accent:'#F3BF21', scene:'#FFF0B4', motif:'chips', note:'180 g / CONCEPT' },
  { id:'rasa', brand:'RASA TRAIL', product:'Garam masala', lines:['GARAM','MASALA'], type:'Folding carton', kind:'carton', size:'95 × 135 × 45 mm', w:95, h:135, d:45, bg:'#123D31', ink:'#F8EED7', accent:'#CB9A5B', scene:'#E9E2D2', motif:'spices', note:'75 g / CONCEPT' },
  { id:'orua', brand:'ORUA STUDIO', product:'Scented candle', lines:['STILL','CANDLE'], type:'Candle carton', kind:'carton', size:'90 × 120 × 90 mm', w:90, h:120, d:90, bg:'#C6A27F', ink:'#1D252B', accent:'#8FB9D9', scene:'#E8E3DD', motif:'stones', note:'180 g / CONCEPT' },
];

function motif(s) {
  switch (s.motif) {
    case 'flowers': return `<g fill="none" stroke="${s.ink}" stroke-width="2.6" opacity=".9"><path d="M150 284v-103M150 226c-26-31-40-43-65-47M150 239c24-34 42-50 64-60"/><path d="M149 202c-26-20-23-38 1-56 23 20 24 39-1 56Z" fill="${s.accent}"/><path d="M85 179c-18-22-9-35 17-35 12 23 4 36-17 35ZM213 179c3-24 17-30 35-14-2 25-17 31-35 14Z" fill="${s.accent}"/><path d="M115 277c-23-16-33-15-49 5 17 21 34 18 49-5ZM185 268c21-19 37-18 53 5-17 20-33 18-53-5Z" fill="${s.accent}"/></g><circle cx="150" cy="174" r="8" fill="${s.ink}"/>`;
    case 'beans': return `<g fill="${s.accent}" stroke="${s.ink}" stroke-width="3"><ellipse cx="111" cy="194" rx="26" ry="37" transform="rotate(-29 111 194)"/><ellipse cx="167" cy="166" rx="27" ry="39" transform="rotate(20 167 166)"/><ellipse cx="206" cy="223" rx="27" ry="39" transform="rotate(-19 206 223)"/><ellipse cx="133" cy="255" rx="25" ry="36" transform="rotate(14 133 255)"/></g><g fill="none" stroke="${s.ink}" stroke-width="3"><path d="M97 164c19 25 22 46 29 60M179 130c-19 25-23 42-19 69M196 189c14 23 17 47 18 66M132 221c-8 26-7 45 8 66"/></g>`;
    case 'chips': return `<path d="M25 296c65-28 94-16 137 15s81 30 138-1v32H25Z" fill="${s.accent}"/><g fill="#F7CE55" stroke="${s.ink}" stroke-width="3"><ellipse cx="111" cy="201" rx="34" ry="47" transform="rotate(-22 111 201)"/><ellipse cx="183" cy="163" rx="34" ry="47" transform="rotate(25 183 163)"/><ellipse cx="206" cy="253" rx="34" ry="47" transform="rotate(-28 206 253)"/><ellipse cx="135" cy="272" rx="31" ry="42" transform="rotate(37 135 272)"/></g><g fill="none" stroke="#CC9B26" stroke-width="3"><ellipse cx="111" cy="201" rx="17" ry="27" transform="rotate(-22 111 201)"/><ellipse cx="183" cy="163" rx="17" ry="27" transform="rotate(25 183 163)"/><ellipse cx="206" cy="253" rx="17" ry="27" transform="rotate(-28 206 253)"/></g>`;
    case 'spices': return `<path d="M59 279c53-27 129-28 182 0-4 33-37 56-91 56s-87-23-91-56Z" fill="${s.accent}" stroke="${s.ink}" stroke-width="3"/><path d="M67 277c18-42 54-66 83-66s65 24 83 66Z" fill="#A95B2B"/><path d="M87 251c21-21 42-31 63-31s42 10 63 31" fill="none" stroke="#DD8E42" stroke-width="5"/><g fill="${s.accent}"><circle cx="72" cy="190" r="7"/><circle cx="226" cy="188" r="7"/><circle cx="112" cy="177" r="5"/><circle cx="190" cy="171" r="5"/></g><g fill="none" stroke="${s.accent}" stroke-width="3"><path d="M91 164c-16-17-19-33-10-51 18 15 22 30 10 51ZM208 158c17-16 20-31 13-47-20 13-24 29-13 47Z"/></g>`;
    case 'stones': return `<g fill="${s.ink}"><ellipse cx="150" cy="294" rx="102" ry="27"/><ellipse cx="150" cy="245" rx="75" ry="23"/><ellipse cx="150" cy="200" rx="53" ry="21"/><ellipse cx="150" cy="159" rx="29" ry="17"/></g><g fill="none" stroke="${s.accent}" stroke-width="4"><path d="M91 293c45-12 93-12 118 0M107 245c28-8 57-9 85-1"/></g>`;
  }
}

function front(s) {
  const serif = s.motif === 'flowers' || s.motif === 'spices' ? 'Georgia,serif' : 'Poppins,Arial,sans-serif';
  const titleSize = s.motif === 'beans' ? 32 : s.motif === 'chips' ? 39 : 36;
  return `<rect width="300" height="400" fill="${s.bg}"/>
  <rect x="18" y="18" width="264" height="364" fill="none" stroke="${s.ink}" stroke-width="1.5" opacity=".5"/>
  <text x="150" y="53" text-anchor="middle" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="18" font-weight="800" letter-spacing="2">${s.brand}</text>
  <path d="M87 67h126" stroke="${s.accent}" stroke-width="4"/>
  <text x="150" y="105" text-anchor="middle" fill="${s.ink}" font-family="${serif}" font-size="${titleSize}" font-weight="800" letter-spacing="-1">${s.lines[0]}</text>
  <text x="150" y="141" text-anchor="middle" fill="${s.ink}" font-family="${serif}" font-size="${titleSize}" font-weight="800" letter-spacing="-1">${s.lines[1]}</text>
  ${motif(s)}
  <path d="M47 349h206" stroke="${s.ink}" stroke-width="1.5" opacity=".7"/>
  <text x="150" y="370" text-anchor="middle" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="10" font-weight="700" letter-spacing="2">${s.note}</text>`;
}

function back(s) {
  return `<rect width="300" height="400" fill="${s.bg}"/>
  <rect x="18" y="18" width="264" height="364" fill="none" stroke="${s.ink}" stroke-width="1.5" opacity=".5"/>
  <text x="33" y="56" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="21" font-weight="800" letter-spacing="1">${s.brand}</text>
  <path d="M33 72h234" stroke="${s.accent}" stroke-width="5"/>
  <text x="33" y="117" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="18" font-weight="700">MADE TO ENJOY.</text>
  <text x="33" y="154" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="12">A sample packaging concept for</text>
  <text x="33" y="175" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="12">${s.product.toLowerCase()}.</text>
  <path d="M33 203h234M33 293h234" stroke="${s.ink}" stroke-width="1.5" opacity=".6"/>
  <text x="33" y="233" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="10" font-weight="700" letter-spacing="1">PRODUCT INFORMATION</text>
  <text x="33" y="254" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="11">Final ingredients, instructions and</text>
  <text x="33" y="273" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="11">regulatory copy to be supplied.</text>
  <text x="33" y="325" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="11" font-weight="700">CONCEPT ARTWORK</text>
  <text x="33" y="348" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="10">Dimensions: ${s.size}</text>`;
}

function cartonMockup(s) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${s.brand} ${s.product} carton packaging mockup">
  <defs><filter id="shadow" x="-30%" y="-30%" width="180%" height="180%"><feDropShadow dx="16" dy="26" stdDeviation="18" flood-color="#312c29" flood-opacity=".25"/></filter></defs>
  <rect width="800" height="600" fill="${s.scene}"/><circle cx="690" cy="91" r="175" fill="${s.accent}" opacity=".12"/>
  <path d="M0 515c199-64 353-51 510 1s210 54 290 31v53H0Z" fill="${s.accent}" opacity=".12"/>
  <g filter="url(#shadow)">
    <path d="M220 91 550 75l96 35-330 17Z" fill="${s.bg}" stroke="${s.ink}" stroke-opacity=".35"/>
    <path d="M550 75 646 110v440l-96-35Z" fill="${s.ink}" opacity=".85"/>
    <path d="M220 91 550 75v440l-330 21Z" fill="${s.bg}"/>
    <g transform="translate(220 91) scale(1.1 1.1)">${front(s)}</g>
    <path d="M220 91 550 75v440l-330 21Z" fill="none" stroke="${s.ink}" stroke-width="2" opacity=".45"/>
    <text x="572" y="175" fill="${s.bg}" font-family="Poppins,Arial,sans-serif" font-size="15" font-weight="800" letter-spacing="2" transform="rotate(20 572 175)">${s.brand}</text>
  </g>
  <text x="32" y="568" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="12" font-weight="700" letter-spacing="3">SAMPLE PROJECT / ${s.type.toUpperCase()} / ${s.size}</text>
  </svg>`;
}

function pouchMockup(s) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${s.brand} ${s.product} pouch packaging mockup">
  <defs><filter id="shadow" x="-30%" y="-30%" width="180%" height="180%"><feDropShadow dx="16" dy="26" stdDeviation="17" flood-color="#312c29" flood-opacity=".28"/></filter><clipPath id="pouch"><path d="M218 90h364l-13 70 21 345c-5 32-18 39-50 39H260c-32 0-45-7-50-39l21-345Z"/></clipPath></defs>
  <rect width="800" height="600" fill="${s.scene}"/><circle cx="676" cy="111" r="166" fill="${s.accent}" opacity=".15"/>
  <path d="M0 516c211-52 372-41 510 8s211 56 290 36v40H0Z" fill="${s.accent}" opacity=".14"/>
  <g filter="url(#shadow)">
   <path d="M218 90h364l-13 70 21 345c-5 32-18 39-50 39H260c-32 0-45-7-50-39l21-345Z" fill="${s.bg}"/>
   <g clip-path="url(#pouch)" transform="translate(235 112) scale(1.1 1.08)">${front(s)}</g>
   <path d="M218 90h364l-13 70 21 345c-5 32-18 39-50 39H260c-32 0-45-7-50-39l21-345Z" fill="none" stroke="${s.ink}" stroke-width="3" opacity=".4"/>
   <path d="M229 138h342M236 157h328" stroke="${s.ink}" stroke-width="3" opacity=".55"/>
   <path d="M246 481c36 25 90 33 154 33s118-8 154-33" fill="none" stroke="${s.ink}" stroke-width="3" opacity=".25"/>
  </g>
  <text x="32" y="568" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="12" font-weight="700" letter-spacing="3">SAMPLE PROJECT / ${s.type.toUpperCase()} / ${s.size}</text>
  </svg>`;
}

function cartonDieline(s) {
  const unit = Math.min(780 / (2 * s.w + 2 * s.d), 390 / s.h);
  const frontWidth = s.w * unit;
  const sideWidth = s.d * unit;
  const panelHeight = s.h * unit;
  const x0 = (1000 - 2 * frontWidth - 2 * sideWidth) / 2;
  const x1 = x0 + frontWidth;
  const x2 = x1 + sideWidth;
  const x3 = x2 + frontWidth;
  const x4 = x3 + sideWidth;
  const y0 = 86 + (390 - panelHeight) / 2;
  const y1 = y0 + panelHeight;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 570" role="img" aria-label="${s.brand} ${s.type} concept dieline with dimensions">
   <rect width="1000" height="570" fill="#F8F7F3"/>
   <text x="49" y="35" fill="#303735" font-family="Poppins,Arial,sans-serif" font-size="17" font-weight="800">${s.brand} / BOX ARTWORK + CONCEPT DIELINE</text>
   <g transform="translate(${x0} ${y0}) scale(${frontWidth / 300} ${panelHeight / 400})">${front(s)}</g>
   <rect x="${x1}" y="${y0}" width="${sideWidth}" height="${panelHeight}" fill="${s.ink}"/>
   <text x="${x1 + sideWidth / 2}" y="${y0 + panelHeight / 2}" text-anchor="middle" fill="${s.bg}" font-family="Poppins,Arial,sans-serif" font-size="15" font-weight="800" letter-spacing="2" transform="rotate(-90 ${x1 + sideWidth / 2} ${y0 + panelHeight / 2})">${s.brand}</text>
   <g transform="translate(${x2} ${y0}) scale(${frontWidth / 300} ${panelHeight / 400})">${back(s)}</g>
   <rect x="${x3}" y="${y0}" width="${sideWidth}" height="${panelHeight}" fill="${s.accent}"/>
   <text x="${x3 + sideWidth / 2}" y="${y0 + panelHeight / 2}" text-anchor="middle" fill="${s.ink}" font-family="Poppins,Arial,sans-serif" font-size="14" font-weight="800" transform="rotate(-90 ${x3 + sideWidth / 2} ${y0 + panelHeight / 2})">${s.product.toUpperCase()}</text>
   <path d="M${x0} ${y0}H${x4}M${x0} ${y1}H${x4}M${x1} ${y0}V${y1}M${x2} ${y0}V${y1}M${x3} ${y0}V${y1}" fill="none" stroke="#555" stroke-width="1.5" stroke-dasharray="7 6"/>
   <path d="M${x0} ${y0 - 24}H${x1}m-${frontWidth} -7v14m${frontWidth} -14v14M${x1} ${y0 - 24}H${x2}m-${sideWidth} -7v14m${sideWidth} -14v14M${x4 + 12} ${y0}V${y1}" fill="none" stroke="#454545" stroke-width="1.5"/>
   <text x="${x0 + frontWidth / 2}" y="${y0 - 29}" text-anchor="middle" fill="#303735" font-family="Poppins,Arial,sans-serif" font-size="12" font-weight="700">${s.w} mm front</text>
   <text x="${x1 + sideWidth / 2}" y="${y0 - 29}" text-anchor="middle" fill="#303735" font-family="Poppins,Arial,sans-serif" font-size="12" font-weight="700">${s.d} mm depth</text>
   <text x="${x4 + 40}" y="${y0 + panelHeight / 2}" fill="#303735" font-family="Poppins,Arial,sans-serif" font-size="12" font-weight="700" transform="rotate(90 ${x4 + 40} ${y0 + panelHeight / 2})">${s.h} mm height</text>
   <path d="M${x0} ${y1}H${x4}l-26 34H${x0 + 26}Z" fill="${s.bg}" stroke="#666" stroke-width="1.5"/>
   <path d="M${x0} ${y0}H${x4}l-26-30H${x0 + 26}Z" fill="${s.bg}" stroke="#666" stroke-width="1.5" opacity=".5"/>
   <text x="50" y="554" fill="#555" font-family="Poppins,Arial,sans-serif" font-size="10" font-weight="600">PROPORTIONAL PANEL SCHEMATIC · FINAL DIELINE, BLEED AND FLAPS REQUIRE PRINT-VENDOR APPROVAL</text>
  </svg>`;
}

function pouchDieline(s) {
  const panelWidth = 300;
  const panelHeight = panelWidth * s.h / s.w;
  const y0 = 70;
  const y1 = y0 + panelHeight;
  const sealTop = y0 + 21;
  const foldBottom = y1 - 36;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 570" role="img" aria-label="${s.brand} pouch front and back artwork with dimensions">
   <rect width="1000" height="570" fill="#F8F7F3"/>
   <text x="44" y="34" fill="#303735" font-family="Poppins,Arial,sans-serif" font-size="17" font-weight="800">${s.brand} / POUCH ARTWORK + CONCEPT DIMENSIONS</text>
   <g transform="translate(80 ${y0}) scale(1 ${panelHeight / 400})">${front(s)}</g>
   <g transform="translate(520 ${y0}) scale(1 ${panelHeight / 400})">${back(s)}</g>
   <path d="M80 ${y0}h300v${panelHeight}H80ZM520 ${y0}h300v${panelHeight}H520Z" fill="none" stroke="#555" stroke-width="1.5" stroke-dasharray="7 6"/>
   <path d="M80 ${sealTop}h300M520 ${sealTop}h300M80 ${foldBottom}h300M520 ${foldBottom}h300" stroke="#555" stroke-width="1.5" stroke-dasharray="5 5"/>
   <path d="M80 51h300m-300-7v14m300-14v14M840 ${y0}v${panelHeight}" stroke="#454545" stroke-width="1.5"/>
   <text x="230" y="47" text-anchor="middle" fill="#303735" font-family="Poppins,Arial,sans-serif" font-size="12" font-weight="700">${s.w} mm width</text>
   <text x="870" y="${y0 + panelHeight / 2}" fill="#303735" font-family="Poppins,Arial,sans-serif" font-size="12" font-weight="700" transform="rotate(90 870 ${y0 + panelHeight / 2})">${s.h} mm height</text>
   <text x="500" y="535" text-anchor="middle" fill="#303735" font-family="Poppins,Arial,sans-serif" font-size="12" font-weight="700">Bottom gusset: ${s.d} mm · dashed lines show seal / fold areas</text>
   <text x="42" y="557" fill="#555" font-family="Poppins,Arial,sans-serif" font-size="10" font-weight="600">PROPORTIONAL PANEL SCHEMATIC · FINAL SEALS, BLEED AND MATERIAL REQUIRE PRINT-VENDOR APPROVAL</text>
  </svg>`;
}

for (const s of samples) {
  fs.writeFileSync(path.join(output, `${s.id}-dieline.svg`), s.kind === 'pouch' ? pouchDieline(s) : cartonDieline(s));
}
console.log(`Generated ${samples.length} dieline SVGs in ${output}`);
