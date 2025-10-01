const pairs = [
  {label:'text vs meeting-bg', fg:'#323130', bg:'#eaf7ee'},
  {label:'text vs accepted-bg', fg:'#323130', bg:'#b7e3b8'},
  {label:'accent vs meeting-bg', fg:'#277035', bg:'#eaf7ee'},
  {label:'accent vs accepted-bg', fg:'#277035', bg:'#b7e3b8'}
];

function hexToRgb(hex){
  hex = hex.replace('#','');
  if(hex.length===3) hex = hex.split('').map(h=>h+h).join('');
  const r = parseInt(hex.substr(0,2),16);
  const g = parseInt(hex.substr(2,2),16);
  const b = parseInt(hex.substr(4,2),16);
  return [r,g,b];
}
function srgbToLin(c){ c = c/255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4); }
function lum(hex){ const [r,g,b]=hexToRgb(hex); return 0.2126*srgbToLin(r)+0.7152*srgbToLin(g)+0.0722*srgbToLin(b); }
function contrast(a,b){ const L1=lum(a), L2=lum(b); const hi=Math.max(L1,L2), lo=Math.min(L1,L2); return (hi+0.05)/(lo+0.05); }

// helpers HSL
function rgbToHsl(r,g,b){ r/=255; g/=255; b/=255; const max=Math.max(r,g,b), min=Math.min(r,g,b); let h,s,l=(max+min)/2; if(max===min){h=s=0;} else { const d=max-min; s = l>0.5 ? d/(2-max-min) : d/(max+min); switch(max){case r: h=(g-b)/d + (g<b?6:0); break; case g: h=(b-r)/d + 2; break; case b: h=(r-g)/d + 4; break;} h/=6;} return [h,s,l]; }
function hslToRgb(h,s,l){ let r,g,b; if(s===0){ r=g=b=l; } else { function hue2rgb(p,q,t){ if(t<0) t+=1; if(t>1) t-=1; if(t<1/6) return p+(q-p)*6*t; if(t<1/2) return q; if(t<2/3) return p+(q-p)*(2/3-t)*6; return p; } const q = l<0.5 ? l*(1+s) : l+s - l*s; const p = 2*l - q; r = hue2rgb(p,q,h+1/3); g = hue2rgb(p,q,h); b = hue2rgb(p,q,h-1/3); } return [Math.round(r*255), Math.round(g*255), Math.round(b*255)]; }
function rgbToHex([r,g,b]){ return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join(''); }

function suggestBgForContrast(fgHex,bgHex,target){
  const [r,g,b]=hexToRgb(bgHex); let [h,s,l]=rgbToHsl(r,g,b);
  for(let dir of [-1,1]){
    for(let i=1;i<=60;i++){
      const nl = Math.max(0, Math.min(1, l + dir * i * 0.01));
      const rgb = hslToRgb(h,s,nl);
      const hex = rgbToHex(rgb);
      if(contrast(fgHex,hex) >= target) return hex;
    }
  }
  return null;
}

console.log('Contrast check results (WCAG ratios):');
pairs.forEach(function(p){
  const c = contrast(p.fg,p.bg);
  console.log(p.label + ': ' + c.toFixed(2) + ':1');
  const passNormal = c>=4.5; const passLarge = c>=3.0; console.log('  passes AA normal text? ' + passNormal + ' | AA large? ' + passLarge);
  if(!passNormal){ const suggestion = suggestBgForContrast(p.fg,p.bg,4.5); if(suggestion) console.log('  suggestion: adjust background to ' + suggestion + ' to reach 4.5:1'); else console.log('  suggestion: consider darkening text color'); }
});
