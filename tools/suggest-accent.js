const accent = '#2f8740';
const backgrounds = ['#e6f4ea','#cfe6d4'];

function hexToRgb(hex){ hex = hex.replace('#',''); if(hex.length===3) hex = hex.split('').map(h=>h+h).join(''); const r=parseInt(hex.substr(0,2),16), g=parseInt(hex.substr(2,2),16), b=parseInt(hex.substr(4,2),16); return [r,g,b]; }
function srgbToLin(c){ c=c/255; return c<=0.03928? c/12.92 : Math.pow((c+0.055)/1.055,2.4); }
function lum(hex){ const [r,g,b]=hexToRgb(hex); return 0.2126*srgbToLin(r)+0.7152*srgbToLin(g)+0.0722*srgbToLin(b); }
function contrast(a,b){ const L1=lum(a), L2=lum(b); const hi=Math.max(L1,L2), lo=Math.min(L1,L2); return (hi+0.05)/(lo+0.05); }
function rgbToHsl(r,g,b){ r/=255; g/=255; b/=255; const max=Math.max(r,g,b), min=Math.min(r,g,b); let h=0,s=0,l=(max+min)/2; if(max!==min){ const d=max-min; s = l>0.5 ? d/(2-max-min) : d/(max+min); switch(max){case r: h=(g-b)/d + (g<b?6:0); break; case g: h=(b-r)/d + 2; break; case b: h=(r-g)/d + 4; break;} h/=6;} return [h,s,l]; }
function hslToRgb(h,s,l){ let r,g,b; if(s===0){ r=g=b=l; } else { function hue2rgb(p,q,t){ if(t<0) t+=1; if(t>1) t-=1; if(t<1/6) return p+(q-p)*6*t; if(t<1/2) return q; if(t<2/3) return p+(q-p)*(2/3-t)*6; return p; } const q = l<0.5 ? l*(1+s) : l + s - l*s; const p = 2*l - q; r = hue2rgb(p,q,h+1/3); g = hue2rgb(p,q,h); b = hue2rgb(p,q,h-1/3); } return [Math.round(r*255), Math.round(g*255), Math.round(b*255)]; }
function rgbToHex([r,g,b]){ return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join(''); }

const [r,g,b] = hexToRgb(accent);
let [h,s,l] = rgbToHsl(r,g,b);
let found = null;
for(let i=1;i<=80;i++){
  const nl = Math.max(0, l - i*0.01);
  const rgb = hslToRgb(h,s,nl);
  const hex = rgbToHex(rgb);
  const ok = backgrounds.every(bg => contrast(hex,bg) >= 4.5);
  if(ok){ found = hex; break; }
}
if(found) console.log('Suggested accent (darker) to meet 4.5:1 vs both backgrounds: ', found);
else console.log('No single darker accent found within -80% lightness that meets 4.5:1 for both backgrounds. Consider using white background or a different accent.');
