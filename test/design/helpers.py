import json,math
D=json.load(open('/home/claude/gsl/design/fm_data.json')); OUT='/home/claude/gsl/design/out9'
N=lambda c:(D['names'].get(c,{}).get('n') or c).title().replace('Fc','FC').replace('Rb ','RB ')
DASH='<span class="gsl-dash">–</span>'; SEP='<span class="gsl-sep">•</span>'
def rec(w,d,l): return f'<span class="gsl-wdl"><span class="text-emerald-700">{w}</span>{SEP}<span class="text-amber-700">{d}</span>{SEP}<span class="text-rose-700">{l}</span></span>'
EB='text-[11px] font-semibold uppercase tracking-[0.1em]'
BIG='gsl-big font-extrabold tabular-nums tracking-[var(--big-track)]'
def section(title,sub,body,right=''):
    return (f'<div class="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col gap-5"><div class="flex items-start justify-between gap-4"><div><div class="text-[22px] leading-tight font-extrabold text-slate-900">{title}</div>'
            f'<div class="text-sm text-slate-500 mt-1">{sub}</div></div>{right}</div>{body}</div>')
def opt(label,desc,inner): return f'<div class="flex flex-col gap-3"><div><div class="text-lg font-extrabold text-slate-900">{label}</div><div class="text-sm text-slate-500 max-w-[980px]">{desc}</div></div>{inner}</div>'
def chip(r): c={'W':'bg-emerald-50 text-emerald-700 ring-emerald-200','D':'bg-amber-50 text-amber-700 ring-amber-200','L':'bg-rose-50 text-rose-700 ring-rose-200'}[r]; return f'<span class="w-6 h-6 shrink-0 rounded-md ring-1 inline-flex items-center justify-center text-[11px] font-semibold {c}">{r}</span>'
def seg_toggle(opts,active): return '<div class="inline-flex items-center gap-0.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600">'+''.join(f'<span class="px-3 py-1 rounded-md {"bg-white text-slate-900 shadow-sm" if o==active else ""}">{o}</span>' for o in opts)+'</div>'
boards={}
# ── 1 Outcomes
W,Dr,Lo,T=245,52,31,328
def bar_lab():
    seg=lambda n,cls,lab: f'<div class="{cls} h-full flex items-center px-3 text-sm font-semibold whitespace-nowrap overflow-hidden" style="width: {n/T*100:.2f}%">{lab}</div>'
    return (f'<div class="h-10 rounded-lg overflow-hidden flex">{seg(W,"bg-emerald-600 text-white",f"{W} wins · 74.7%")}{seg(Dr,"bg-amber-400 text-[#0f172a]",f"{Dr} · 15.9%")}{seg(Lo,"bg-rose-500 text-white",f"{Lo} · 9.5%")}</div>')
optA=section('Outcomes','Every league match: 328 played.',bar_lab())
nums=''.join(f'<div class="flex-1"><div class="{EB} text-slate-500">{lab}</div><div class="mt-1 flex items-baseline gap-2"><span class="text-3xl leading-none {BIG} text-slate-900">{n}</span><span class="text-sm font-semibold {cls}">{p}</span></div></div>' for lab,n,p,cls in [('Wins',W,'74.7%','text-emerald-700'),('Draws',Dr,'15.9%','text-amber-700'),('Losses',Lo,'9.5%','text-rose-700')])
thin=f'<div class="h-2 rounded-full overflow-hidden flex"><div class="bg-emerald-600" style="width:{W/T*100}%"></div><div class="bg-amber-400" style="width:{Dr/T*100}%"></div><div class="bg-rose-500" style="width:{Lo/T*100}%"></div></div>'
optB=section('Outcomes','328 league matches.',f'<div class="flex gap-8">{nums}</div>{thin}')
boards['FM1_outcomes']=('1 · Outcomes',opt('A · One labelled bar','The chips go; the bar carries the counts and percentages once, inside each segment.',optA)+opt('B · Numbers first','Three big numbers with their share, and a thin bar under them as the picture.',optB))
# ── 2 Ranked lists
def rlist(title,total,rows,cls):
    mx=max(r[1] for r in rows)
    rr=''.join(f'<div class="flex flex-col gap-1.5"><div class="flex items-center justify-between text-sm"><span class="font-medium text-slate-700">{lab}</span><span class="tabular-nums"><span class="font-semibold text-slate-900">{n}</span><span class="text-slate-500 ml-2">{p}</span></span></div><div class="h-1.5 rounded-full bg-slate-100 overflow-hidden"><div class="h-full rounded-full {cls}" style="width:{n/mx*100:.1f}%"></div></div></div>' for lab,n,p in rows)
    return f'<div class="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col gap-3"><div class="flex items-baseline justify-between"><span class="text-[15px] font-extrabold text-slate-900">{title}</span><span class="text-sm font-medium text-slate-500 tabular-nums">{total}</span></div>{rr}</div>'
lists=('<div class="grid grid-cols-3 gap-3">'+rlist('Wins by margin','245',[('1 goal',90,'36.7%'),('2 goals',61,'24.9%'),('3 goals',49,'20.0%'),('4+ goals',45,'18.4%')],'bg-emerald-500')
      +rlist('Draws by score','52',[('1–1',26,'50.0%'),('2–2',14,'26.9%'),('0–0',9,'17.3%'),('3–3 or more',3,'5.8%')],'bg-amber-400')
      +rlist('Losses by margin','31',[('1 goal',16,'51.6%'),('2 goals',11,'35.5%'),('3 goals',3,'9.7%'),('4+ goals',1,'3.2%')],'bg-rose-500')+'</div>')
boards['FM2_lists']=('2 · Ranked bar lists',opt('Refined (one proposal)','Light grey section cards (R8); the count chips become a plain total; bars scale to the largest row so the shape reads; count dark, share grey.',section('Margins','How wins, draws and losses were decided.',lists)))
# ── 3 Margin distribution
TIERS=[('w4','4+ goal win'),('w3','3 goal win'),('w2','2 goal win'),('w1','1 goal win'),('d3','3+ draws'),('d2','2–2'),('d1','1–1'),('d0','0–0'),('l1','1 goal loss'),('l2','2 goal loss'),('l3','3 goal loss'),('l4','4+ goal loss')]
TONE={'w4':'#065f46','w3':'#047857','w2':'#10b981','w1':'#6ee7b7','d3':'#b45309','d2':'#d97706','d1':'#fbbf24','d0':'#fde68a','l1':'#fda4af','l2':'#fb7185','l3':'#e11d48','l4':'#9f1239'}
INK={'w4':'#fff','w3':'#fff','w2':'#fff','w1':'#064e3b','d3':'#fff','d2':'#fff','d1':'#451a03','d0':'#451a03','l1':'#4c0519','l2':'#4c0519','l3':'#fff','l4':'#fff'}
YRS=['2024–25','2025–26','2026–27','2027–28','2028–29','2029–30','2030–31','2031–32']
def legendA():
    grp=lambda name,keys: f'<div class="flex items-center gap-2"><span class="{EB} text-slate-500">{name}</span><span class="flex">'+''.join(f'<span class="w-6 h-3" style="background:{TONE[k]}"></span>' for k in keys)+'</span></div>'
    return f'<div class="flex flex-wrap gap-6 text-xs">{grp("Wins · 4+ → 1",["w4","w3","w2","w1"])}{grp("Draws · 3+ → 0–0",["d3","d2","d1","d0"])}{grp("Losses · 1 → 4+",["l1","l2","l3","l4"])}</div>'
def rowA(s):
    c=D['seasons'][str(s)]; tot=sum(c.values())
    segs=''.join(f'<div class="h-full flex items-center justify-center text-[11px] font-semibold" style="width:{c.get(k,0)/tot*100:.2f}%;background:{TONE[k]};color:{INK[k]}">{c.get(k,"") if c.get(k,0)>=2 else ""}</div>' for k,_ in TIERS if c.get(k,0))
    return f'<div class="flex items-center gap-4"><span class="w-24 text-sm font-semibold text-slate-900">S{s} <span class="text-xs font-medium text-slate-500">{YRS[s-1]}</span></span><div class="flex-1 h-6 rounded-md overflow-hidden flex">{segs}</div></div>'
A3=section('Margin distribution','How each season’s results were decided, from the biggest wins to the heaviest losses.',legendA()+'<div class="flex flex-col gap-2">'+''.join(rowA(s) for s in range(1,9))+'</div>')
def rowB(s):
    c=D['seasons'][str(s)]; px=14
    wins=sum(c.get(k,0) for k in ['w1','w2','w3','w4']); draws=sum(c.get(k,0) for k in ['d0','d1','d2','d3']); loss=sum(c.get(k,0) for k in ['l1','l2','l3','l4'])
    blk=lambda keys: ''.join(f'<div class="h-full" style="width:{c.get(k,0)*px}px;background:{TONE[k]}"></div>' for k in keys if c.get(k,0))
    return (f'<div class="flex items-center gap-0"><span class="w-24 shrink-0 text-sm font-semibold text-slate-900">S{s} <span class="text-xs font-medium text-slate-500">{YRS[s-1]}</span></span>'
            f'<div class="w-[160px] shrink-0 flex justify-end items-center gap-2 pr-1"><span class="text-xs font-semibold tabular-nums text-rose-700">{loss or ""}</span><div class="h-5 flex rounded-l-sm overflow-hidden">{blk(["l4","l3","l2","l1"])}</div></div>'
            f'<div class="w-[140px] shrink-0 flex justify-center border-x border-slate-300"><div class="h-5 flex">{blk(["d3","d2","d1","d0"])}</div></div>'
            f'<div class="flex-1 flex items-center gap-2 pl-1"><div class="h-5 flex rounded-r-sm overflow-hidden">{blk(["w1","w2","w3","w4"])}</div><span class="text-xs font-semibold tabular-nums text-emerald-700">{wins}</span></div></div>')
B3=section('Margin distribution','Losses to the left, draws in the middle, wins to the right: each season’s balance at a glance.',
   f'<div class="flex items-center {EB} text-slate-500"><span class="w-24"></span><span class="w-[160px] text-right pr-1">Losses</span><span class="w-[140px] text-center">Draws</span><span class="flex-1 pl-1">Wins</span></div><div class="flex flex-col gap-2">'+''.join(rowB(s) for s in range(1,9))+'</div>'+legendA())
boards['FM3_distribution']=('3 · Margin distribution',opt('A · Tonal stacked bars','Same chart, three hues instead of thirteen colours: each result is one family, darker for more decisive. The legend reads as three ramps.',A3)+opt('B · Diverging bars','Wins grow right, losses grow left, draws sit in the middle. The balance of each season (and how few losses) shows without reading numbers.',B3))
# ── 4 Momentum
s8=D['s8']; n=len(s8); W_=1300; H_=220; mid=130; sc=18
bw=W_/n*0.62
bars=''.join(f'<rect x="{i*W_/n+ (W_/n-bw)/2:.1f}" y="{mid-max(v,0)*sc if v>0 else mid:.1f}" width="{bw:.1f}" height="{abs(v)*sc if v!=0 else 3:.1f}" rx="2" fill="{"#10b981" if v>0 else "#f43f5e" if v<0 else "#fbbf24"}"></rect>' for i,v in enumerate(s8))
avg=[sum(s8[max(0,i-4):i+1])/len(s8[max(0,i-4):i+1]) for i in range(n)]
pts=' '.join(f'{i*W_/n+W_/n/2:.1f},{mid-a*sc:.1f}' for i,a in enumerate(avg))
grid=''.join(f'<line x1="0" x2="{W_}" y1="{mid-g*sc}" y2="{mid-g*sc}" stroke="#e2e8f0" stroke-width="1" {"stroke-dasharray=\"3 3\"" if g else ""}></line><text x="-8" y="{mid-g*sc+4}" font-size="11" text-anchor="end" fill="#64748b">{g:+d}</text>' for g in [-2,0,2,4,6])
svg=f'<svg viewBox="-30 0 {W_+40} {H_}" width="100%" height="{H_}">{grid}{bars}<polyline points="{pts}" fill="none" stroke="#0f172a" stroke-width="2" stroke-linejoin="round"></polyline></svg>'
leg=f'<div class="flex gap-5 text-xs font-medium text-slate-600"><span class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-emerald-500"></span>Win</span><span class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-amber-400"></span>Draw</span><span class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-rose-500"></span>Loss</span><span class="inline-flex items-center gap-1.5"><span class="w-5 h-0.5 bg-slate-900"></span>5-game average</span></div>'
boards['FM4_momentum']=('4 · Momentum Pulse',opt('Refined (one proposal)','Unchanged as a chart; the average line moves from League indigo to ink (accents never colour data). Gridlines from the line colour token, so they dim in dark mode.',section('Momentum pulse','Goal difference match by match, Season 8, with a 5-game average.',leg+svg)))
# ── 5 Records
def match_line(m,score_cls='text-slate-900'):
    return f'<div class="flex items-center justify-between text-sm"><span class="text-slate-700 truncate">{N(m["opp"])} <span class="text-xs text-slate-400">S{m["s"]} · MD{m["md"]} · {m["ha"]}</span></span><span class="font-semibold tabular-nums {score_cls}">{m["f"]}{DASH}{m["a"]}</span></div>'
def rcard(title,count,hero,rest,res):
    h=hero
    return (f'<div class="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4"><div class="flex items-center justify-between"><span class="{EB} text-slate-500">{title}</span><span class="text-xs font-medium text-slate-500">{count}</span></div>'
            f'<div class="flex items-center justify-between gap-3"><div><div class="text-base font-semibold text-slate-900">{N(h["opp"])}</div><div class="text-xs text-slate-500">Season {h["s"]} · MD {h["md"]} · {"Home" if h["ha"]=="H" else "Away"}</div></div><div class="flex items-center gap-2">{chip(res)}<span class="text-4xl leading-none {BIG} text-slate-900">{h["f"]}{DASH}{h["a"]}</span></div></div>'
            f'<div class="flex flex-col gap-2 pt-3 border-t border-slate-100">{"".join(match_line(m) for m in rest)}</div></div>')
cardsA='<div class="grid grid-cols-3 gap-3">'+rcard('Biggest wins','45 by 4+ goals',D['wins'][0],D['wins'][1:4],'W')+rcard('Heaviest defeats','31 losses',D['losses'][0],D['losses'][1:4],'L')+rcard('Highest-scoring draws','52 draws',D['draws'][0],D['draws'][1:4],'D')+'</div>'
def lrow(lab,m,res,second):
    return (f'<div class="grid grid-cols-[200px_90px_1fr_160px_1fr] items-center gap-4 px-4 py-3 border-b border-slate-100 last:border-b-0 bg-white"><span class="text-sm font-semibold text-slate-900">{lab}</span>'
            f'<span class="flex items-center gap-2">{chip(res)}<span class="text-lg font-extrabold tabular-nums text-slate-900">{m["f"]}{DASH}{m["a"]}</span></span><span class="text-sm text-slate-700">{N(m["opp"])}</span><span class="text-xs font-medium text-slate-500">S{m["s"]} · MD {m["md"]} · {"Home" if m["ha"]=="H" else "Away"}</span>'
            f'<span class="text-xs text-slate-500">Next: {second}</span></div>')
sc1,sc2=D['common'][0],D['common'][1]
ledgerB=('<div class="rounded-xl border border-slate-200 overflow-hidden">'+f'<div class="grid grid-cols-[200px_90px_1fr_160px_1fr] gap-4 px-4 py-2 bg-slate-50 border-b border-slate-200 {EB} text-slate-500"><span>Record</span><span>Score</span><span>Opponent</span><span>When</span><span>Runners-up</span></div>'
  +lrow('Biggest win',D['wins'][0],'W',f'{D["wins"][1]["f"]}–{D["wins"][1]["a"]} {N(D["wins"][1]["opp"])}, {D["wins"][2]["f"]}–{D["wins"][2]["a"]} {N(D["wins"][2]["opp"])}')
  +lrow('Heaviest defeat',D['losses'][0],'L',f'{D["losses"][1]["f"]}–{D["losses"][1]["a"]} {N(D["losses"][1]["opp"])}, {D["losses"][2]["f"]}–{D["losses"][2]["a"]} {N(D["losses"][2]["opp"])}')
  +lrow('Highest-scoring draw',D['draws'][0],'D',f'{D["draws"][1]["f"]}–{D["draws"][1]["a"]} {N(D["draws"][1]["opp"])}, {D["draws"][2]["f"]}–{D["draws"][2]["a"]} {N(D["draws"][2]["opp"])}')
  +lrow('Most goals in a match',D['fests'][0],'W',f'{D["fests"][1]["f"]}–{D["fests"][1]["a"]} {N(D["fests"][1]["opp"])}')
  +f'<div class="grid grid-cols-[200px_90px_1fr_160px_1fr] items-center gap-4 px-4 py-3 bg-white"><span class="text-sm font-semibold text-slate-900">Most common score</span><span class="text-lg font-extrabold tabular-nums text-slate-900">{sc1[0].replace("-","–")}</span><span class="text-sm text-slate-700">{sc1[1]} times</span><span class="text-xs font-medium text-slate-500">{sc1[1]/328*100:.1f}% of matches</span><span class="text-xs text-slate-500">Next: {sc2[0].replace("-","–")} ({sc2[1]})</span></div>'
  +'</div>')
filt=seg_toggle(['All','Wins','Defeats','Draws','Extremes'],'All')
boards['FM5_records']=('5 · Highs & Lows',opt('A · Neutral record cards','Same six cards (three shown), all white: the score is the hero with its W / D / L chip; no tinted backgrounds or gradients. Colour only in the chip.',section('Highs & lows','The extremes of 328 league matches.',cardsA,filt))+opt('B · Records ledger','One table instead of six cards: each record on a row with its runners-up. Denser and easier to scan; loses the poster feel of the cards.',section('Highs & lows','The extremes of 328 league matches.',ledgerB)))
# ── 6 Streaks
ws,us=D['ws'],D['us']
def tile(lab,val,unit,line,bar=None):
    b=f'<div class="h-1.5 rounded-full bg-slate-200 overflow-hidden mt-1"><div class="h-full rounded-full bg-emerald-500" style="width:{bar:.0f}%"></div></div>' if bar is not None else ''
    return f'<div class="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col gap-1.5"><div class="{EB} text-slate-500">{lab}</div><div class="flex items-baseline gap-1.5"><span class="text-3xl leading-none {BIG} text-slate-900">{val}</span><span class="text-sm font-medium text-slate-500">{unit}</span></div><div class="text-xs font-medium text-slate-500">{line}</div>{b}</div>'
tiles=('<div class="grid grid-cols-4 gap-3">'+tile('Record win streak',ws[0]['len'],'matches',f'S{ws[0]["from"]["s"]} MD{ws[0]["from"]["md"]} → S{ws[0]["to"]["s"]} MD{ws[0]["to"]["md"]}')
       +tile('Current win streak',D['aw'],'matches',f'Record is {ws[0]["len"]}',D['aw']/ws[0]['len']*100)
       +tile('Record unbeaten run',us[0]['len'],'matches',f'S{us[0]["from"]["s"]} MD{us[0]["from"]["md"]} → S{us[0]["to"]["s"]} MD{us[0]["to"]["md"]}')
       +tile('Current unbeaten run',D['au'],'matches',f'Record is {us[0]["len"]}',D['au']/us[0]['len']*100)+'</div>')
def srow(i,x):
    return (f'<div class="grid grid-cols-[40px_110px_1fr_1fr] items-center gap-4 px-4 py-3 bg-white even:bg-slate-50/50 border-b border-slate-100 last:border-b-0"><span class="text-sm font-semibold text-slate-500 tabular-nums">#{i}</span>'
            f'<span class="flex items-baseline gap-1.5"><span class="text-lg font-extrabold tabular-nums text-slate-900">{x["len"]}</span><span class="text-xs text-slate-500">matches</span></span>'
            f'<span class="text-sm text-slate-700">S{x["from"]["s"]} MD{x["from"]["md"]} → S{x["to"]["s"]} MD{x["to"]["md"]}</span><span class="h-1.5 rounded-full bg-slate-100 overflow-hidden"><span class="block h-full rounded-full bg-emerald-500" style="width:{x["len"]/ws[0]["len"]*100:.0f}%"></span></span></div>')
table=f'<div class="rounded-xl border border-slate-200 overflow-hidden"><div class="grid grid-cols-[40px_110px_1fr_1fr] gap-4 px-4 py-2 bg-slate-50 border-b border-slate-200 {EB} text-slate-500"><span>#</span><span>Length</span><span>From → to</span><span>Against the record</span></div>'+''.join(srow(i+1,x) for i,x in enumerate(ws))+'</div>'
boards['FM6_streaks']=('6 · Streaks',opt('Refined (one proposal)','The two gradient hero cards and the two tiles above them become four neutral section cards: record and current, for wins and unbeaten runs. The current runs carry a bar against their record. Table rows neutral, with a length bar.',section('Streaks','Winning and unbeaten runs across all seasons.',tiles+f'<div class="flex items-center justify-between">{seg_toggle(["Winning streaks","Unbeaten runs"],"Winning streaks")}{seg_toggle(["All (2+)","5+","10+"],"All (2+)")}</div>'+table,seg_toggle(['All seasons','One season'],'All seasons'))))
# ── 7 Dropped points
st=('<div class="grid grid-cols-4 gap-3">'+tile('Points dropped','197','of 984','From 83 draws and defeats')+tile('From draws','104','pts','52 draws, 2 each')+tile('From defeats','93','pts','31 defeats, 3 each')
    +f'<div class="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col gap-1.5"><div class="{EB} text-slate-500">Most dropped against</div><div class="text-2xl leading-none font-extrabold text-slate-900">Juventus</div><div class="text-xs font-medium text-slate-500">11 pts dropped in 10 matches</div></div></div>')
def drow(i,code,o):
    pw=o['w']*3+o['d']; mx=o['gp']*3
    return (f'<div class="grid grid-cols-[36px_1fr_40px_92px_60px_70px_120px] items-center gap-4 px-4 py-2.5 bg-white even:bg-slate-50/50 border-b border-slate-100 last:border-b-0"><span class="text-xs font-semibold text-slate-400 tabular-nums">#{i}</span>'
            f'<span class="text-sm font-semibold text-slate-900">{N(code)}</span><span class="text-sm text-slate-500 tabular-nums text-right">{o["gp"]}</span><span class="text-sm font-semibold tabular-nums">{rec(o["w"],o["d"],o["l"])}</span>'
            f'<span class="text-sm tabular-nums text-slate-900 text-right">{pw}<span class="text-slate-400">/{mx}</span></span><span class="text-sm font-semibold tabular-nums text-rose-700 text-right">−{o["drop"]}</span>'
            f'<span class="h-1.5 rounded-full bg-slate-100 overflow-hidden"><span class="block h-full bg-rose-400 rounded-full" style="width:{o["drop"]/11*100:.0f}%"></span></span></div>')
tbl=(f'<div class="rounded-xl border border-slate-200 overflow-hidden"><div class="grid grid-cols-[36px_1fr_40px_92px_60px_70px_120px] gap-4 px-4 py-2 bg-slate-50 border-b border-slate-200 {EB} text-slate-500"><span>#</span><span>Opponent</span><span class="text-right">GP</span><span>Record</span><span class="text-right">Pts</span><span class="text-right">Dropped</span><span></span></div>'
     +''.join(drow(i+1,c,o) for i,(c,o) in enumerate(D['topDrop']))+'</div>')
boards['FM7_dropped']=('7 · Dropped Points',opt('Refined (one proposal)','Neutral section cards (the tints go; \"Juventus\" stays the story). The table loses its green and red column washes: dropped points are rose text with a small bar, points won in ink. Same columns otherwise; season-impact chips (not shown) become grey season tags.',section('Dropped points','Where the points went: by opponent, all seasons.',st+tbl,seg_toggle(['By opponent','By season'],'By opponent'))))
for k,(t,h) in boards.items():
    open(f'{OUT}/{k}.html','w').write(f'<div class="min-h-screen bg-slate-50 p-8 flex flex-col gap-10">{h}</div>')
json.dump({k:t for k,(t,h) in boards.items()},open(f'{OUT}/titles.json','w'))
print('ok',list(boards))
