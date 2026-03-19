import { useState, useEffect, useRef } from "react";

// ─── EXERCISES ────────────────────────────────────────────────────────────────
const EX = {
  upper: [
    {id:"bench",name:"Développé couché",muscle:"Pectoraux",icon:"🏋️",grp:"Pectoraux",regions:{chest_l:1,chest_r:1,shoulder_l:.3,shoulder_r:.3,tricep_l:.5,tricep_r:.5}},
    {id:"incline",name:"Développé incliné",muscle:"Pecto haut",icon:"📐",grp:"Pectoraux",regions:{chest_l:.9,chest_r:.9,shoulder_l:.5,shoulder_r:.5,tricep_l:.4,tricep_r:.4}},
    {id:"decline",name:"Développé décliné",muscle:"Pecto bas",icon:"📉",grp:"Pectoraux",regions:{chest_l:.9,chest_r:.9,tricep_l:.6,tricep_r:.6}},
    {id:"flat_db",name:"DB à plat",muscle:"Pectoraux",icon:"🏅",grp:"Pectoraux",regions:{chest_l:1,chest_r:1,shoulder_l:.3,shoulder_r:.3}},
    {id:"cable_fly",name:"Écarté câble croisé",muscle:"Pectoraux",icon:"🦅",grp:"Pectoraux",regions:{chest_l:1,chest_r:1}},
    {id:"pec_deck",name:"Pec Deck machine",muscle:"Pectoraux",icon:"🦋",grp:"Pectoraux",regions:{chest_l:1,chest_r:1}},
    {id:"dips",name:"Dips lestés",muscle:"Triceps / Pecto",icon:"⬇️",grp:"Pectoraux",regions:{tricep_l:1,tricep_r:1,chest_l:.6,chest_r:.6}},
    {id:"pushup",name:"Pompes lestées",muscle:"Pecto / Triceps",icon:"✊",grp:"Pectoraux",regions:{chest_l:.8,chest_r:.8,tricep_l:.7,tricep_r:.7}},
    {id:"svend",name:"Svend Press",muscle:"Pecto internes",icon:"🤜",grp:"Pectoraux",regions:{chest_l:1,chest_r:1}},
    {id:"ohp",name:"Développé militaire",muscle:"Épaules",icon:"🔺",grp:"Épaules",regions:{shoulder_l:1,shoulder_r:1,tricep_l:.6,tricep_r:.6,trap:.3}},
    {id:"arnold",name:"Arnold Press",muscle:"Épaules 3 chefs",icon:"🌀",grp:"Épaules",regions:{shoulder_l:1,shoulder_r:1,tricep_l:.4,tricep_r:.4}},
    {id:"lateral",name:"Élévations latérales",muscle:"Deltoïdes lat.",icon:"↔️",grp:"Épaules",regions:{shoulder_l:1,shoulder_r:1}},
    {id:"facepull",name:"Face Pull câble",muscle:"Deltoïdes arr.",icon:"🎯",grp:"Épaules",regions:{shoulder_l:.8,shoulder_r:.8,trap:.6}},
    {id:"shrug",name:"Haussements épaules",muscle:"Trapèzes",icon:"🤷",grp:"Épaules",regions:{trap:1}},
    {id:"pullup",name:"Tractions pronation",muscle:"Dos / Biceps",icon:"🔝",grp:"Dos",regions:{lat_l:1,lat_r:1,bicep_l:.7,bicep_r:.7,trap:.5}},
    {id:"chinup",name:"Chin-ups supination",muscle:"Biceps / Dos",icon:"☝️",grp:"Dos",regions:{bicep_l:1,bicep_r:1,lat_l:.7,lat_r:.7}},
    {id:"row",name:"Rowing barre",muscle:"Dos épaisseur",icon:"🪝",grp:"Dos",regions:{lat_l:.8,lat_r:.8,trap:1,bicep_l:.5,bicep_r:.5}},
    {id:"db_row",name:"Rowing haltère 1 bras",muscle:"Grand dorsal",icon:"🪜",grp:"Dos",regions:{lat_l:1,lat_r:1,bicep_l:.4,bicep_r:.4}},
    {id:"lat_pull",name:"Tirage poulie haute",muscle:"Grand dorsal",icon:"⬇️",grp:"Dos",regions:{lat_l:1,lat_r:1,bicep_l:.5,bicep_r:.5}},
    {id:"rack_pull",name:"Rack Pull",muscle:"Dos / Trapèzes",icon:"🏗️",grp:"Dos",regions:{trap:1,lat_l:.6,lat_r:.6,lower_back:.8}},
    {id:"seal_row",name:"Seal Row",muscle:"Dos épaisseur",icon:"🦭",grp:"Dos",regions:{lat_l:.9,lat_r:.9,trap:.9}},
    {id:"curl",name:"Curl biceps barre",muscle:"Biceps",icon:"💪",grp:"Biceps",regions:{bicep_l:1,bicep_r:1,forearm_l:.4,forearm_r:.4}},
    {id:"hammer",name:"Curl marteau",muscle:"Brachial",icon:"🔨",grp:"Biceps",regions:{bicep_l:.8,bicep_r:.8,forearm_l:.7,forearm_r:.7}},
    {id:"preacher",name:"Curl pupitre",muscle:"Biceps pic",icon:"🪑",grp:"Biceps",regions:{bicep_l:1,bicep_r:1}},
    {id:"incl_curl",name:"Curl incliné haltères",muscle:"Biceps long",icon:"↗️",grp:"Biceps",regions:{bicep_l:1,bicep_r:1}},
    {id:"cable_curl",name:"Curl câble",muscle:"Biceps",icon:"〽️",grp:"Biceps",regions:{bicep_l:1,bicep_r:1}},
    {id:"tricep_pd",name:"Extension poulie haute",muscle:"Triceps",icon:"🔱",grp:"Triceps",regions:{tricep_l:1,tricep_r:1}},
    {id:"skull",name:"Skull Crusher",muscle:"Triceps",icon:"💀",grp:"Triceps",regions:{tricep_l:1,tricep_r:1}},
    {id:"cg_bench",name:"Développé serré",muscle:"Triceps / Pecto",icon:"🤜",grp:"Triceps",regions:{tricep_l:1,tricep_r:1,chest_l:.4,chest_r:.4}},
    {id:"oh_ext",name:"Extension overhead",muscle:"Triceps long",icon:"🙌",grp:"Triceps",regions:{tricep_l:1,tricep_r:1}},
    {id:"farmer",name:"Farmer Walk",muscle:"Avant-bras / Trap.",icon:"🧺",grp:"Avant-bras",regions:{forearm_l:1,forearm_r:1,trap:.7}},
    {id:"plank",name:"Gainage planche",muscle:"Core",icon:"🧱",grp:"Avant-bras",regions:{abs:1,lower_back:.6}},
    {id:"ab_wheel",name:"Roue abdominale",muscle:"Abdos / Core",icon:"⚙️",grp:"Avant-bras",regions:{abs:1,lower_back:.4}},
  ],
  lower: [
    {id:"squat",name:"Squat barre",muscle:"Quad / Fessiers",icon:"🦵",grp:"Quadriceps",regions:{quad_l:1,quad_r:1,glute_l:.7,glute_r:.7,hamstring_l:.3,hamstring_r:.3}},
    {id:"front_sq",name:"Squat avant",muscle:"Quadriceps",icon:"🔲",grp:"Quadriceps",regions:{quad_l:1,quad_r:1,glute_l:.4,glute_r:.4}},
    {id:"hack_sq",name:"Hack Squat machine",muscle:"Quadriceps",icon:"🏗️",grp:"Quadriceps",regions:{quad_l:1,quad_r:1}},
    {id:"leg_press",name:"Presse cuisses",muscle:"Quadriceps",icon:"⚙️",grp:"Quadriceps",regions:{quad_l:1,quad_r:1,glute_l:.5,glute_r:.5}},
    {id:"leg_ext",name:"Leg Extension",muscle:"Quadriceps",icon:"⚡",grp:"Quadriceps",regions:{quad_l:1,quad_r:1}},
    {id:"goblet",name:"Goblet Squat",muscle:"Quad / Core",icon:"🏆",grp:"Quadriceps",regions:{quad_l:.9,quad_r:.9,abs:.4,glute_l:.5,glute_r:.5}},
    {id:"deadlift",name:"Soulevé de terre",muscle:"Ischio / Dos",icon:"⚡",grp:"Ischio",regions:{hamstring_l:1,hamstring_r:1,lower_back:1,glute_l:.8,glute_r:.8,trap:.5}},
    {id:"rdl",name:"SdT jambes tendues",muscle:"Ischio-jambiers",icon:"📏",grp:"Ischio",regions:{hamstring_l:1,hamstring_r:1,lower_back:.7,glute_l:.6,glute_r:.6}},
    {id:"nordic",name:"Nordic Curl",muscle:"Ischio-jambiers",icon:"❄️",grp:"Ischio",regions:{hamstring_l:1,hamstring_r:1}},
    {id:"leg_curl",name:"Leg Curl couché",muscle:"Ischio-jambiers",icon:"🌀",grp:"Ischio",regions:{hamstring_l:1,hamstring_r:1}},
    {id:"leg_curl_s",name:"Leg Curl assis",muscle:"Ischio-jambiers",icon:"💺",grp:"Ischio",regions:{hamstring_l:1,hamstring_r:1}},
    {id:"hip_thr",name:"Hip Thrust",muscle:"Fessiers",icon:"🍑",grp:"Fessiers",regions:{glute_l:1,glute_r:1,hamstring_l:.4,hamstring_r:.4}},
    {id:"glute_k",name:"Kickback câble fessiers",muscle:"Fessiers",icon:"↗️",grp:"Fessiers",regions:{glute_l:1,glute_r:1}},
    {id:"abductor",name:"Abducteur machine",muscle:"Abducteurs",icon:"↔️",grp:"Fessiers",regions:{glute_l:.8,glute_r:.8}},
    {id:"lunge",name:"Fentes avant",muscle:"Quad / Fessiers",icon:"🚶",grp:"Fentes",regions:{quad_l:.9,quad_r:.9,glute_l:.7,glute_r:.7}},
    {id:"bulgarian",name:"Fentes bulgares",muscle:"Quad / Fessiers",icon:"🏔️",grp:"Fentes",regions:{quad_l:1,quad_r:1,glute_l:.8,glute_r:.8}},
    {id:"step_up",name:"Step-up",muscle:"Quad / Fessiers",icon:"🪜",grp:"Fentes",regions:{quad_l:.8,quad_r:.8,glute_l:.7,glute_r:.7}},
    {id:"rev_lunge",name:"Fentes arrière",muscle:"Quad / Fessiers",icon:"↩️",grp:"Fentes",regions:{quad_l:.8,quad_r:.8,glute_l:.8,glute_r:.8}},
    {id:"calf_s",name:"Mollets debout",muscle:"Gastrocnémien",icon:"👣",grp:"Mollets",regions:{calf_l:1,calf_r:1}},
    {id:"calf_sit",name:"Mollets assis",muscle:"Soléaire",icon:"🪑",grp:"Mollets",regions:{calf_l:1,calf_r:1}},
    {id:"donkey_c",name:"Donkey Calf Raise",muscle:"Gastrocnémien",icon:"🫏",grp:"Mollets",regions:{calf_l:1,calf_r:1}},
    {id:"sumo_dl",name:"Soulevé sumo",muscle:"Fessiers / Adduc.",icon:"🥋",grp:"Ischio",regions:{glute_l:1,glute_r:1,hamstring_l:.6,hamstring_r:.6,quad_l:.4,quad_r:.4}},
    {id:"good_m",name:"Good Morning",muscle:"Ischio / Lombaires",icon:"🌄",grp:"Ischio",regions:{hamstring_l:.9,hamstring_r:.9,lower_back:1}},
  ],
};

const TEMPLATES=[
  {id:"push",name:"Push",icon:"💪",desc:"Pecto, Épaules, Triceps",exos:["bench","ohp","lateral","cable_fly","tricep_pd","oh_ext"]},
  {id:"pull",name:"Pull",icon:"🔝",desc:"Dos, Biceps, Trapèzes",exos:["pullup","row","lat_pull","curl","hammer","facepull"]},
  {id:"legs",name:"Legs",icon:"🦵",desc:"Quad, Ischio, Fessiers, Mollets",exos:["squat","rdl","leg_press","leg_curl","hip_thr","calf_s"]},
  {id:"upper",name:"Haut du corps",icon:"🏋️",desc:"Full upper body",exos:["bench","row","ohp","pullup","curl","tricep_pd"]},
  {id:"fullbody",name:"Full Body",icon:"⚡",desc:"Corps complet",exos:["squat","bench","row","ohp","deadlift","curl"]},
  {id:"glutes",name:"Fessiers",icon:"🍑",desc:"Fessiers & Ischio focus",exos:["hip_thr","romanian","bulgarian","glute_k","leg_curl","donkey_c"]},
];

const CARDIO_TYPES=[
  {id:"run",name:"Course",icon:"🏃",unit:"km",color:"#FF6B2C",met:9.8},
  {id:"bike",name:"Vélo",icon:"🚴",unit:"km",color:"#3B82F6",met:7.5},
  {id:"swim",name:"Natation",icon:"🏊",unit:"m",color:"#06B6D4",met:6.0},
  {id:"stairs",name:"Escaliers",icon:"🪜",unit:"étages",color:"#F59E0B",met:8.0},
  {id:"incline_w",name:"Marche inclinée",icon:"📈",unit:"km",color:"#10B981",met:5.0},
  {id:"elevation",name:"Rando/Dénivelé",icon:"⛰️",unit:"m D+",color:"#8B5CF6",met:6.5},
  {id:"rowing",name:"Rameur",icon:"🚣",unit:"m",color:"#EC4899",met:7.0},
  {id:"hiit_c",name:"HIIT",icon:"⚡",unit:"min",color:"#EF4444",met:10.5},
  {id:"jump_rope",name:"Corde à sauter",icon:"🪢",unit:"sauts",color:"#FF6B2C",met:11.0},
  {id:"boxing",name:"Boxe / MMA",icon:"🥊",unit:"rounds",color:"#EF4444",met:9.5},
  {id:"walk",name:"Marche",icon:"🚶",unit:"km",color:"#22C55E",met:3.5},
  {id:"yoga",name:"Yoga",icon:"🧘",unit:"min",color:"#A78BFA",met:2.5},
  {id:"football",name:"Foot / Sports coll.",icon:"⚽",unit:"min",color:"#4ADE80",met:7.5},
  {id:"tennis",name:"Tennis / Padel",icon:"🎾",unit:"sets",color:"#FBBF24",met:7.3},
  {id:"cycling_indoor",name:"Vélo indoor",icon:"🏠",unit:"km",color:"#60A5FA",met:8.0},
  {id:"ski",name:"Ski / Snow",icon:"⛷️",unit:"km",color:"#93C5FD",met:7.0},
];

const SWIM_STYLES=[{id:"crawl",name:"Crawl",icon:"🌊"},{id:"brasse",name:"Brasse",icon:"🐸"},{id:"apnee",name:"Apnée",icon:"🤿"},{id:"dos",name:"Dos crawlé",icon:"🔄"}];
const DAYS_FR=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
const DAYS_FULL=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const MUS_GRP_UPPER=["Pectoraux","Épaules","Dos","Biceps","Triceps","Avant-bras"];
const MUS_GRP_LOWER=["Quadriceps","Ischio","Fessiers","Fentes","Mollets"];

const OBJECTIVES=[
  {id:"mass",label:"Prise de masse",icon:"💪",color:"#FF6B2C",tip:"6-10 reps lourd, surplus +300 kcal/j"},
  {id:"strength",label:"Force pure",icon:"⚡",color:"#F59E0B",tip:"1-5 reps, repos 3-5 min, progression"},
  {id:"cut",label:"Sèche",icon:"🔥",color:"#EF4444",tip:"Déficit -300 kcal/j, maintien charges"},
  {id:"cardio",label:"Cardio",icon:"🏃",color:"#3B82F6",tip:"Zone 2 (65-75% FC max), 3-5×/semaine"},
  {id:"wellness",label:"Bien-être",icon:"🌟",color:"#22C55E",tip:"Activité régulière, écoute du corps"},
];

const THEME_COLORS=[
  {id:"orange",label:"Orange",v:"#FF6B2C"},{id:"blue",label:"Bleu",v:"#3B82F6"},
  {id:"green",label:"Vert",v:"#22C55E"},{id:"purple",label:"Violet",v:"#8B5CF6"},
  {id:"pink",label:"Rose",v:"#EC4899"},{id:"red",label:"Rouge",v:"#EF4444"},
  {id:"teal",label:"Teal",v:"#14B8A6"},{id:"gold",label:"Or",v:"#F59E0B"},
];

const BADGES_DEF=[
  {id:"first_session",icon:"🥇",label:"Première séance",desc:"Bienvenue !",check:(s)=>s.length>=1},
  {id:"sessions_10",icon:"🔟",label:"10 séances",desc:"La régularité paye.",check:(s)=>s.length>=10},
  {id:"sessions_50",icon:"🔥",label:"50 séances",desc:"Machine de guerre !",check:(s)=>s.length>=50},
  {id:"first_pr",icon:"⭐",label:"Premier PR",desc:"Ton premier record !",check:(s,c,pr)=>Object.keys(pr).length>=1},
  {id:"pr_10",icon:"👑",label:"10 PR différents",desc:"Légende.",check:(s,c,pr)=>Object.keys(pr).length>=10},
  {id:"kg_1000",icon:"💪",label:"1 000 kg soulevés",desc:"Première tonne !",check:(s)=>s.reduce((a,x)=>a+(x.totalKg||0),0)>=1000},
  {id:"kg_10000",icon:"🚀",label:"10 000 kg soulevés",desc:"10 tonnes !",check:(s)=>s.reduce((a,x)=>a+(x.totalKg||0),0)>=10000},
  {id:"first_cardio",icon:"🏃",label:"Premier cardio",desc:"Bienvenue côté cardio.",check:(s,c)=>c.length>=1},
  {id:"cardio_10",icon:"🚴",label:"10 sessions cardio",desc:"Cardio régulier.",check:(s,c)=>c.length>=10},
  {id:"early_bird",icon:"🌅",label:"Séance matinale",desc:"Avant 7h !",check:(s)=>s.some(x=>new Date(x.date).getHours()<7)},
  {id:"week_3",icon:"📅",label:"3 séances en 7j",desc:"Belle semaine !",check:(s)=>{const w=new Date();w.setDate(w.getDate()-7);return s.filter(x=>new Date(x.date)>w).length>=3;}},
];

const FUN=[{max:25,fn:kg=>`${Math.round(kg/4)} chats 🐱`},{max:200,fn:kg=>`${Math.round(kg/30)} labradors 🐕`},{max:1000,fn:kg=>`${(kg/200).toFixed(1)} motos 🏍️`},{max:Infinity,fn:kg=>`${(kg/1400).toFixed(2)} voitures 🚗`}];
const funCmp=kg=>(FUN.find(f=>kg<f.max)||FUN.at(-1)).fn(Math.max(kg,0.1));

// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmt=s=>`${String(Math.floor(Math.max(0,s)/60)).padStart(2,"0")}:${String(Math.max(0,s)%60).padStart(2,"0")}`;
const fmtD=iso=>new Date(iso).toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"});
const todayISO=()=>new Date().toISOString().slice(0,10);
const pace=(km,sec)=>km>0&&sec>0?`${Math.floor(sec/60/km)}'${String(Math.round((sec/km)%60)).padStart(2,"0")}"`:null;
const calcVol=sets=>sets.reduce((a,s)=>a+(+(s.reps)||0)*(+(s.weight)||0),0);
const calcKcalCardio=(ct,form,w=75)=>{const h=((+form.min||0)*60+(+form.sec||0))/3600;return h>0?Math.round(ct.met*w*h*1.05):0;};
const calcKcalGym=(totalKg,durationMin=45)=>totalKg>0?Math.round(5.5*Math.max(durationMin,20)+totalKg*.015):0;

function playBeep(){
  try{const ctx=new(window.AudioContext||window.webkitAudioContext)();[[0,523,.15,.45],[.17,659,.15,.5],[.34,784,.15,.55],[.51,1047,.3,.6]].forEach(([t,f,d,v])=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=f;o.type="triangle";g.gain.setValueAtTime(0,ctx.currentTime+t);g.gain.linearRampToValueAtTime(v,ctx.currentTime+t+.02);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+t+d+.08);o.start(ctx.currentTime+t);o.stop(ctx.currentTime+t+d+.12);});}catch{}
}

// ─── STORAGE (robust, non-crashing) ──────────────────────────────────────────
const sGet=async k=>{try{const r=await window.storage.get(k);return r?JSON.parse(r.value):null;}catch{return null;}};
const sSet=(k,v)=>{try{window.storage.set(k,JSON.stringify(v));}catch{}};
const sGetShared=async k=>{try{const r=await window.storage.get(k,true);return r?JSON.parse(r.value):null;}catch{return null;}};
const sSetShared=(k,v)=>{try{window.storage.set(k,JSON.stringify(v),true);}catch{}};

// ─── BODY SCHEMA SVG ──────────────────────────────────────────────────────────
// Color scale: gray→red(beginner)→orange→green→blue→purple(elite)
const intensityColor=(v,accent="#FF6B2C")=>{
  if(!v||v<=0)return"#1E2035";
  // For exercise highlights (values 0-1 = intensity)
  if(v<.3)return"#EF444460";
  if(v<.6)return"#F59E0B90";
  return`${accent}CC`;
};
const heatColor=pct=>{
  if(pct<=0)return"#1E2035";
  if(pct<.15)return"#EF444480"; // rouge débutant
  if(pct<.35)return"#F59E0B90"; // orange
  if(pct<.6)return"#22C55E90";  // vert intermédiaire
  if(pct<.85)return"#3B82F690"; // bleu avancé
  return"#8B5CF6BB";            // violet élite
};
const heatLabel=pct=>{
  if(pct<=0)return"Non travaillé";
  if(pct<.15)return"Débutant";
  if(pct<.35)return"Intermédiaire";
  if(pct<.6)return"Avancé";
  if(pct<.85)return"Expert";
  return"ÉLITE 💜";
};

function BodySchema({highlights={},mode="exercise",gender="male",accent="#FF6B2C",dark=true}){
  const[view,setView]=useState("front");
  const bg=dark?"#13131E":"#fff";
  const outline=dark?"#2a2a3f":"#ddd";
  const skin=dark?"#2a2433":"#f5e6d3";
  const skinDark=dark?"#1e1a2a":"#e8d4c0";
  const c=(r)=>mode==="exercise"?intensityColor(highlights[r],accent):heatColor(highlights[r]||0);
  const W=130,H=280;
  return<div>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:8}}>
      {["front","back"].map(v=><button key={v} onClick={()=>setView(v)} style={{padding:"4px 12px",border:`1px solid ${view===v?accent:"#333"}`,borderRadius:12,background:view===v?`${accent}22`:"transparent",color:view===v?accent:"#666",cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:11,letterSpacing:.5}}>{v==="front"?"FACE":"DOS"}</button>)}
    </div>
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{display:"block",maxHeight:260}}>
      {/* BODY OUTLINE */}
      {/* Head */}
      <ellipse cx={W/2} cy={22} rx={gender==="female"?16:17} ry={19} fill={skin} stroke={outline} strokeWidth={.5}/>
      {/* Neck */}
      <rect x={W/2-8} y={39} width={16} height={12} rx={4} fill={skin}/>
      {/* Torso */}
      <path d={`M${W/2-28},51 Q${W/2-32},55 ${W/2-30},${gender==="female"?130:120} Q${W/2-${gender==="female"?22:18}},${gender==="female"?140:130} ${W/2-${gender==="female"?20:18}},155 L${W/2+${gender==="female"?20:18}},155 Q${W/2+${gender==="female"?22:18}},${gender==="female"?140:130} ${W/2+30},${gender==="female"?130:120} Q${W/2+32},55 ${W/2+28},51 Z`} fill={skinDark} stroke={outline} strokeWidth={.5}/>
      {/* Hips */}
      <ellipse cx={W/2} cy={160} rx={gender==="female"?28:22} ry={10} fill={skinDark}/>
      {/* Upper legs */}
      <rect x={W/2-28} y={162} width={24} height={62} rx={10} fill={skin} stroke={outline} strokeWidth={.5}/>
      <rect x={W/2+4} y={162} width={24} height={62} rx={10} fill={skin} stroke={outline} strokeWidth={.5}/>
      {/* Lower legs */}
      <rect x={W/2-26} y={226} width={20} height={44} rx={9} fill={skin} stroke={outline} strokeWidth={.5}/>
      <rect x={W/2+6} y={226} width={20} height={44} rx={9} fill={skin} stroke={outline} strokeWidth={.5}/>
      {/* Feet */}
      <ellipse cx={W/2-16} cy={273} rx={13} ry={7} fill={skinDark}/>
      <ellipse cx={W/2+16} cy={273} rx={13} ry={7} fill={skinDark}/>
      {/* Arms */}
      <rect x={W/2-46} y={52} width={15} height={46} rx={7} fill={skin} stroke={outline} strokeWidth={.5}/>
      <rect x={W/2+31} y={52} width={15} height={46} rx={7} fill={skin} stroke={outline} strokeWidth={.5}/>
      {/* Forearms */}
      <rect x={W/2-44} y={100} width={13} height={38} rx={6} fill={skin} stroke={outline} strokeWidth={.5}/>
      <rect x={W/2+31} y={100} width={13} height={38} rx={6} fill={skin} stroke={outline} strokeWidth={.5}/>

      {view==="front"&&<>
        {/* CHEST */}
        <ellipse cx={W/2-13} cy={80} rx={14} ry={${gender==="female"?18:14}} fill={c("chest_l")} style={{transition:"fill .3s"}}/>
        <ellipse cx={W/2+13} cy={80} rx={14} ry={${gender==="female"?18:14}} fill={c("chest_r")} style={{transition:"fill .3s"}}/>
        {/* SHOULDERS */}
        <ellipse cx={W/2-34} cy={62} rx={11} ry={13} fill={c("shoulder_l")} style={{transition:"fill .3s"}}/>
        <ellipse cx={W/2+34} cy={62} rx={11} ry={13} fill={c("shoulder_r")} style={{transition:"fill .3s"}}/>
        {/* BICEPS */}
        <rect x={W/2-45} y={56} width={14} height={40} rx={7} fill={c("bicep_l")} style={{transition:"fill .3s"}}/>
        <rect x={W/2+31} y={56} width={14} height={40} rx={7} fill={c("bicep_r")} style={{transition:"fill .3s"}}/>
        {/* FOREARMS */}
        <rect x={W/2-43} y={100} width={12} height={36} rx={6} fill={c("forearm_l")} style={{transition:"fill .3s"}}/>
        <rect x={W/2+31} y={100} width={12} height={36} rx={6} fill={c("forearm_r")} style={{transition:"fill .3s"}}/>
        {/* ABS */}
        <rect x={W/2-11} y={100} width={22} height={50} rx={5} fill={c("abs")} style={{transition:"fill .3s"}}/>
        {/* QUADS */}
        <rect x={W/2-27} y={165} width={22} height={55} rx={9} fill={c("quad_l")} style={{transition:"fill .3s"}}/>
        <rect x={W/2+5} y={165} width={22} height={55} rx={9} fill={c("quad_r")} style={{transition:"fill .3s"}}/>
        {/* CALVES */}
        <rect x={W/2-25} y={228} width={18} height={38} rx={8} fill={c("calf_l")} style={{transition:"fill .3s"}}/>
        <rect x={W/2+7} y={228} width={18} height={38} rx={8} fill={c("calf_r")} style={{transition:"fill .3s"}}/>
      </>}
      {view==="back"&&<>
        {/* TRAPS */}
        <path d={`M${W/2-20},52 Q${W/2},65 ${W/2+20},52 L${W/2+26},80 Q${W/2},85 ${W/2-26},80 Z`} fill={c("trap")} style={{transition:"fill .3s"}}/>
        {/* LATS */}
        <path d={`M${W/2-26},78 L${W/2-30},120 L${W/2-14},130 L${W/2-12},82 Z`} fill={c("lat_l")} style={{transition:"fill .3s"}}/>
        <path d={`M${W/2+26},78 L${W/2+30},120 L${W/2+14},130 L${W/2+12},82 Z`} fill={c("lat_r")} style={{transition:"fill .3s"}}/>
        {/* LOWER BACK */}
        <rect x={W/2-14} y={120} width={28} height={28} rx={5} fill={c("lower_back")} style={{transition:"fill .3s"}}/>
        {/* TRICEPS */}
        <rect x={W/2-45} y={56} width={13} height={40} rx={6} fill={c("tricep_l")} style={{transition:"fill .3s"}}/>
        <rect x={W/2+32} y={56} width={13} height={40} rx={6} fill={c("tricep_r")} style={{transition:"fill .3s"}}/>
        {/* GLUTES */}
        <ellipse cx={W/2-13} cy={163} rx={14} ry={13} fill={c("glute_l")} style={{transition:"fill .3s"}}/>
        <ellipse cx={W/2+13} cy={163} rx={14} ry={13} fill={c("glute_r")} style={{transition:"fill .3s"}}/>
        {/* HAMSTRINGS */}
        <rect x={W/2-27} y={175} width={22} height={48} rx={9} fill={c("hamstring_l")} style={{transition:"fill .3s"}}/>
        <rect x={W/2+5} y={175} width={22} height={48} rx={9} fill={c("hamstring_r")} style={{transition:"fill .3s"}}/>
        {/* CALVES BACK */}
        <rect x={W/2-25} y={226} width={18} height={38} rx={8} fill={c("calf_l")} style={{transition:"fill .3s"}}/>
        <rect x={W/2+7} y={226} width={18} height={38} rx={8} fill={c("calf_r")} style={{transition:"fill .3s"}}/>
      </>}
    </svg>
    {mode==="heatmap"&&<div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",marginTop:6}}>
      {[{c:"#EF444480",l:"Débutant"},{c:"#F59E0B90",l:"Interm."},{c:"#22C55E90",l:"Avancé"},{c:"#3B82F690",l:"Expert"},{c:"#8B5CF6BB",l:"Élite 💜"}].map(x=><div key={x.l} style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:8,height:8,borderRadius:2,background:x.c}}/><span style={{fontSize:8,color:"#888",fontFamily:"DM Sans,sans-serif"}}>{x.l}</span></div>)}
    </div>}
  </div>;
}

// ─── CHARTS ───────────────────────────────────────────────────────────────────
function BarChart({data,vKey,color="#FF6B2C",unit=""}){
  if(!data?.length||!data.some(d=>d[vKey]>0))return<Empty/>;
  const mx=Math.max(...data.map(d=>d[vKey]||0),1),W=Math.max(40,300/data.length),H=80;
  return<div style={{overflowX:"auto"}}><svg width={data.length*W} height={H+20} style={{minWidth:"100%",display:"block"}}>{data.map((d,i)=>{const bh=((d[vKey]||0)/mx)*(H-20);return<g key={i}><rect x={i*W+3} y={H-12-bh} width={W-6} height={Math.max(bh,0)} fill={color} rx={3} opacity={.9}/><text x={i*W+W/2} y={H} textAnchor="middle" fontSize={8} fill="#666">{d.label}</text>{(d[vKey]||0)>0&&<text x={i*W+W/2} y={H-15-bh} textAnchor="middle" fontSize={8} fill={color}>{d[vKey]%1!==0?d[vKey].toFixed(1):d[vKey]}{unit}</text>}</g>;})}</svg></div>;
}
function LineChart({data,vKey,color="#FF6B2C",unit=""}){
  const valid=data.filter(d=>d[vKey]>0);
  if(valid.length<2)return<div style={{textAlign:"center",color:"#555",padding:"14px 0",fontSize:11,fontFamily:"DM Sans,sans-serif"}}>2 mesures min. pour voir la courbe.</div>;
  const mx=Math.max(...valid.map(d=>d[vKey])),mn=Math.min(...valid.map(d=>d[vKey]));
  const range=mx-mn||1,W=Math.max(48,280/valid.length),H=70;
  const pts=valid.map((d,i)=>`${i*W+W/2},${H-6-((d[vKey]-mn)/range)*(H-16)}`).join(" ");
  return<div style={{overflowX:"auto"}}><svg width={valid.length*W} height={H+14} style={{minWidth:"100%",display:"block"}}>
    <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    {valid.map((d,i)=><g key={i}><circle cx={i*W+W/2} cy={H-6-((d[vKey]-mn)/range)*(H-16)} r="3.5" fill={color}/><text x={i*W+W/2} y={H+10} textAnchor="middle" fontSize={8} fill="#666">{d.label}</text><text x={i*W+W/2} y={H-6-((d[vKey]-mn)/range)*(H-16)-7} textAnchor="middle" fontSize={8} fill={color}>{d[vKey]}{unit}</text></g>)}
  </svg></div>;
}
const Empty=()=><div style={{textAlign:"center",color:"#555",padding:"14px 0",fontSize:11,fontFamily:"DM Sans,sans-serif"}}>Pas encore de données.</div>;

// ─── BADGE TOAST ──────────────────────────────────────────────────────────────
function BadgeToast({badge,onDone}){
  useEffect(()=>{const t=setTimeout(onDone,3500);return()=>clearTimeout(t);},[]);
  return<div style={{position:"fixed",top:65,left:"50%",transform:"translateX(-50%)",zIndex:9999,background:"linear-gradient(135deg,#1a1a2e,#16213e)",border:"2px solid #F59E0B",borderRadius:16,padding:"13px 18px",display:"flex",alignItems:"center",gap:11,boxShadow:"0 8px 30px rgba(245,158,11,.45)",maxWidth:290,width:"90%",animation:"badgePop .4s cubic-bezier(.34,1.56,.64,1)"}}>
    <style>{`@keyframes badgePop{from{opacity:0;transform:translateX(-50%) scale(.5) translateY(-20px)}to{opacity:1;transform:translateX(-50%) scale(1) translateY(0)}}`}</style>
    <span style={{fontSize:30}}>{badge.icon}</span>
    <div><div style={{fontSize:8,color:"#F59E0B",fontFamily:"DM Sans,sans-serif",fontWeight:700,letterSpacing:2}}>BADGE DÉBLOQUÉ !</div><div style={{fontSize:15,fontFamily:"Bebas Neue,sans-serif",color:"#fff"}}>{badge.label}</div><div style={{fontSize:9,color:"#aaa",fontFamily:"DM Sans,sans-serif"}}>{badge.desc}</div></div>
  </div>;
}

// ─── REST TIMER (persistent background) ──────────────────────────────────────
function RestOverlay({onClose,T,accent,notifEnabled}){
  const getInit=()=>{try{const raw=localStorage.getItem("it8-timer");if(raw){const s=JSON.parse(raw);if(s.startTime&&s.duration){const e=Math.floor((Date.now()-s.startTime)/1000);if(e<s.duration)return{val:s.duration,elapsed:e,state:"running"};return{val:s.duration,elapsed:s.duration,state:"done"};}}return null;}catch{return null;}};
  const init=getInit();
  const[val,setVal]=useState(init?.val||90),[elapsed,setElapsed]=useState(init?.elapsed||0),[state,setState]=useState(init?.state||"idle");
  const ref=useRef();
  useEffect(()=>{
    if(state==="running"){ref.current=setInterval(()=>{setElapsed(e=>{const ne=e+1;if(ne>=val){clearInterval(ref.current);setState("done");localStorage.removeItem("it8-timer");playBeep();try{navigator.vibrate?.([100,50,200]);}catch{};if(notifEnabled&&"Notification"in window&&Notification.permission==="granted"){try{new Notification("⏱️ IronTrack",{body:"Repos terminé — GO! 💪"});}catch{}}return val;}return ne;});},1000);}
    else clearInterval(ref.current);return()=>clearInterval(ref.current);
  },[state,val,notifEnabled]);
  const start=v=>{const sv=v||val;setVal(sv);setElapsed(0);setState("running");localStorage.setItem("it8-timer",JSON.stringify({startTime:Date.now(),duration:sv}));};
  const toggle=()=>setState(s=>{if(s==="running"){localStorage.removeItem("it8-timer");return"paused";}localStorage.setItem("it8-timer",JSON.stringify({startTime:Date.now()-(elapsed*1000),duration:val}));return"running";});
  const reset=()=>{setState("idle");setElapsed(0);localStorage.removeItem("it8-timer");};
  const prog=val>0?(elapsed/val)*100:0,R=66,circ=2*Math.PI*R;
  return<div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.92)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200,backdropFilter:"blur(12px)"}}><div onClick={e=>e.stopPropagation()} style={{background:T.card,borderRadius:"20px 20px 0 0",padding:"16px 20px 28px",width:"100%"}}>
    <div style={{width:36,height:4,background:T.border,borderRadius:4,margin:"0 auto 14px"}}/>
    <div style={{textAlign:"center"}}>
      <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:10,letterSpacing:3,color:T.muted,marginBottom:12}}>REPOS ENTRE LES SÉRIES</div>
      <div style={{position:"relative",width:154,height:154,margin:"0 auto 12px"}}>
        <svg width="154" height="154" style={{transform:"rotate(-90deg)"}}><circle cx="77" cy="77" r={R} fill="none" stroke={T.border} strokeWidth="9"/><circle cx="77" cy="77" r={R} fill="none" stroke={state==="done"?"#22C55E":accent} strokeWidth="9" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ*(1-prog/100)} style={{transition:"stroke-dashoffset .9s,stroke .3s"}}/></svg>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          {state==="done"?<div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:40,color:"#22C55E",lineHeight:1}}>GO! 💪</div>:<><div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:40,lineHeight:1,color:T.text}}>{fmt(Math.max(0,val-elapsed))}</div><div style={{fontSize:8,color:T.muted,letterSpacing:2,marginTop:2}}>{state==="running"?"EN COURS":state==="paused"?"PAUSE":"PRÊT"}</div></>}
        </div>
      </div>
      <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:11,flexWrap:"wrap"}}>
        {[30,45,60,90,120,180].map(s=><button key={s} onClick={()=>start(s)} style={{padding:"5px 9px",border:`2px solid ${val===s&&state!=="idle"?accent:T.border}`,borderRadius:13,background:val===s&&state!=="idle"?`${accent}22`:T.bg,color:val===s&&state!=="idle"?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:13}}>{s<60?`${s}s`:`${s/60}min`}</button>)}
      </div>
      <div style={{display:"flex",gap:7,justifyContent:"center"}}>
        {state==="idle"||state==="done"?<button onClick={()=>start()} style={{padding:"11px 28px",background:accent,color:"#fff",border:"none",borderRadius:11,fontFamily:"Bebas Neue,sans-serif",fontSize:18,letterSpacing:1,cursor:"pointer",boxShadow:`0 4px 14px ${accent}55`}}>▶ DÉMARRER</button>:<><button onClick={toggle} style={{padding:"11px 18px",background:accent,color:"#fff",border:"none",borderRadius:11,fontFamily:"Bebas Neue,sans-serif",fontSize:16,cursor:"pointer"}}>{state==="running"?"⏸ PAUSE":"▶ REPRENDRE"}</button><button onClick={reset} style={{padding:"11px 12px",background:"transparent",color:T.muted,border:`1px solid ${T.border}`,borderRadius:11,fontFamily:"Bebas Neue,sans-serif",fontSize:15,cursor:"pointer"}}>↺</button></>}
      </div>
    </div>
  </div></div>;
}

// ─── HIIT TIMER ───────────────────────────────────────────────────────────────
function HIITOverlay({onClose,T,accent}){
  const[work,setWork]=useState(40),[rest,setRest]=useState(20),[rounds,setRounds]=useState(8);
  const[curRound,setCurRound]=useState(0),[phase,setPhase]=useState("idle"),[elapsed,setElapsed]=useState(0);
  const isWork=phase==="work"||phase==="idle";
  const phaseDur=phase==="work"?work:phase==="rest"?rest:work;
  const ref=useRef();
  useEffect(()=>{
    if(phase==="work"||phase==="rest"){
      ref.current=setInterval(()=>{
        setElapsed(e=>{
          const ne=e+1;
          if(ne>=phaseDur){
            clearInterval(ref.current);
            playBeep();
            if(phase==="work"){setPhase("rest");setElapsed(0);}
            else{const next=curRound+1;if(next>=rounds){setPhase("done");}else{setCurRound(next);setPhase("work");setElapsed(0);}}
            return 0;
          }
          return ne;
        });
      },1000);
    }
    return()=>clearInterval(ref.current);
  },[phase,phaseDur,curRound,rounds]);
  const start=()=>{setCurRound(0);setPhase("work");setElapsed(0);};
  const stop=()=>{clearInterval(ref.current);setPhase("idle");setCurRound(0);setElapsed(0);};
  const prog=phaseDur>0?(elapsed/phaseDur)*100:0;
  const phaseColor=phase==="work"?"#EF4444":phase==="rest"?"#22C55E":accent;
  return<div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.92)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:201,backdropFilter:"blur(12px)"}}><div onClick={e=>e.stopPropagation()} style={{background:T.card,borderRadius:"20px 20px 0 0",padding:"16px 20px 28px",width:"100%"}}>
    <div style={{width:36,height:4,background:T.border,borderRadius:4,margin:"0 auto 12px"}}/>
    <div style={{fontSize:15,fontFamily:"Bebas Neue,sans-serif",letterSpacing:2,textAlign:"center",marginBottom:12}}>⚡ TIMER HIIT</div>
    {(phase==="idle"||phase==="done")&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
      {[{l:"TRAVAIL",v:work,sv:setWork,u:"sec"},{l:"REPOS",v:rest,sv:setRest,u:"sec"},{l:"ROUNDS",v:rounds,sv:setRounds,u:""}].map(f=><div key={f.l}><div style={{fontSize:8,color:T.muted,letterSpacing:1,fontFamily:"DM Sans,sans-serif",marginBottom:3,textAlign:"center"}}>{f.l}</div><div style={{display:"flex",gap:3,alignItems:"center"}}><button onClick={()=>f.sv(v=>Math.max(5,v-5))} style={{width:22,height:22,background:T.card2,border:`1px solid ${T.border}`,borderRadius:5,cursor:"pointer",color:T.muted,fontSize:11}}>−</button><div style={{flex:1,textAlign:"center",fontFamily:"Bebas Neue,sans-serif",fontSize:18,color:T.text}}>{f.v}{f.u}</div><button onClick={()=>f.sv(v=>Math.min(180,v+5))} style={{width:22,height:22,background:T.card2,border:`1px solid ${T.border}`,borderRadius:5,cursor:"pointer",color:T.muted,fontSize:11}}>+</button></div></div>)}
    </div>}
    {(phase==="work"||phase==="rest")&&<div style={{textAlign:"center",marginBottom:12}}>
      <div style={{fontSize:11,letterSpacing:3,color:phaseColor,fontFamily:"Bebas Neue,sans-serif",marginBottom:6}}>{phase==="work"?"🔥 TRAVAIL":"💚 REPOS"} — ROUND {curRound+1}/{rounds}</div>
      <div style={{height:8,background:T.card2,borderRadius:4,overflow:"hidden",marginBottom:8}}><div style={{height:"100%",width:`${prog}%`,background:phaseColor,transition:"width 1s linear"}}/></div>
      <div style={{fontSize:52,fontFamily:"Bebas Neue,sans-serif",color:phaseColor,lineHeight:1}}>{fmt(Math.max(0,phaseDur-elapsed))}</div>
    </div>}
    {phase==="done"&&<div style={{textAlign:"center",marginBottom:12}}><div style={{fontSize:40,marginBottom:6}}>🎉</div><div style={{fontSize:22,fontFamily:"Bebas Neue,sans-serif",color:"#22C55E"}}>TERMINÉ !</div><div style={{fontSize:12,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{rounds} rounds × {work}s/{rest}s = {Math.round((work+rest)*rounds/60)} min</div></div>}
    <div style={{display:"flex",gap:8,justifyContent:"center"}}>
      {(phase==="idle"||phase==="done")?<button onClick={start} style={{padding:"11px 28px",background:"#EF4444",color:"#fff",border:"none",borderRadius:11,fontFamily:"Bebas Neue,sans-serif",fontSize:17,cursor:"pointer"}}>▶ DÉMARRER</button>:<button onClick={stop} style={{padding:"11px 22px",background:T.card2,color:T.text,border:`1px solid ${T.border}`,borderRadius:11,fontFamily:"Bebas Neue,sans-serif",fontSize:15,cursor:"pointer"}}>⏹ ARRÊTER</button>}
    </div>
  </div></div>;
}

// ─── AI COACH ─────────────────────────────────────────────────────────────────
function AICoach({T,accent,sessions,cardioLog,pr,profile,enabled,onToggle}){
  const[advice,setAdvice]=useState(""),[loading,setLoading]=useState(false),[error,setError]=useState("");
  const getAdvice=async()=>{
    setLoading(true);setError("");setAdvice("");
    try{
      const stats={sessions:sessions.length,recentSessions:sessions.slice(-3).map(s=>({date:s.date.slice(0,10),kg:s.totalKg,kcal:s.kcalBurned||0,exos:Object.keys(s.sets||{}).length})),topPRs:Object.entries(pr).slice(0,5).map(([id,v])=>({id,weight:v.weight})),objective:profile?.objective||"mass",weight:profile?.weight,totalKcalCardio:cardioLog.reduce((a,c)=>a+(c.kcal||0),0),totalCardio:cardioLog.length};
      const resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:`Tu es un coach fitness expert francophone. Analyse ces données d'entraînement et donne 3-4 conseils personnalisés, concis et actionnables. Réponds en français, format bullet points courts.\n\nDonnées: ${JSON.stringify(stats)}`}]})});
      const data=await resp.json();
      const text=data?.content?.[0]?.text||"Aucun conseil généré.";
      setAdvice(text);
    }catch(e){setError("Erreur de connexion. Vérifie ta connexion internet.");}
    setLoading(false);
  };
  if(!enabled)return<div style={{background:T.card2,borderRadius:12,padding:14,textAlign:"center"}}>
    <div style={{fontSize:18,marginBottom:6}}>🤖</div>
    <div style={{fontSize:13,color:T.muted,fontFamily:"DM Sans,sans-serif",marginBottom:10}}>Le coach IA est désactivé.</div>
    <button onClick={onToggle} style={{background:accent,color:"#fff",border:"none",borderRadius:9,padding:"8px 18px",fontFamily:"Bebas Neue,sans-serif",fontSize:14,cursor:"pointer"}}>ACTIVER</button>
  </div>;
  return<div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:13}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
      <div style={{fontSize:14,letterSpacing:1}}>🤖 COACH IA</div>
      <button onClick={onToggle} style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:7,padding:"3px 9px",cursor:"pointer",color:"#EF4444",fontFamily:"Bebas Neue,sans-serif",fontSize:10}}>DÉSACTIVER</button>
    </div>
    {!advice&&!loading&&<div style={{fontFamily:"DM Sans,sans-serif",fontSize:11,color:T.muted,marginBottom:10,lineHeight:1.5}}>Analyse tes {sessions.length} séances et {cardioLog.length} sessions cardio pour des conseils personnalisés.</div>}
    {loading&&<div style={{textAlign:"center",padding:"16px 0"}}><div style={{fontSize:22,animation:"spin 1s linear infinite",display:"inline-block"}}>⚙️</div><div style={{fontSize:11,color:T.muted,fontFamily:"DM Sans,sans-serif",marginTop:6}}>Analyse en cours...</div></div>}
    {error&&<div style={{color:"#EF4444",fontFamily:"DM Sans,sans-serif",fontSize:11,marginBottom:8}}>{error}</div>}
    {advice&&<div style={{fontFamily:"DM Sans,sans-serif",fontSize:12,color:T.text,lineHeight:1.7,marginBottom:10,whiteSpace:"pre-wrap"}}>{advice}</div>}
    <button onClick={getAdvice} disabled={loading} style={{width:"100%",background:loading?"#333":accent,color:"#fff",border:"none",borderRadius:9,padding:"10px",fontFamily:"Bebas Neue,sans-serif",fontSize:15,cursor:loading?"wait":"pointer",opacity:loading?.6:1}}>
      {loading?"⚙️ ANALYSE...":"🤖 OBTENIR MES CONSEILS"}
    </button>
  </div>;
}

// ─── GOAL EDITOR ──────────────────────────────────────────────────────────────
function GoalEditor({exId,current,T,accent,onSave}){
  const[open,setOpen]=useState(false),[w,setW]=useState(current?.weight||""),[r,setR]=useState(current?.reps||"");
  const iS={background:T.bg,border:`1px solid ${T.border}`,color:T.text,borderRadius:7,padding:"7px",fontFamily:"DM Sans,sans-serif",fontSize:14,width:"100%",outline:"none",textAlign:"center"};
  if(!open)return<button onClick={()=>setOpen(true)} style={{background:"none",border:`1px dashed ${T.border}`,color:T.muted,borderRadius:8,padding:"5px 9px",fontSize:10,cursor:"pointer",fontFamily:"DM Sans,sans-serif",marginBottom:7,width:"100%",textAlign:"left"}}>🎯 {current?`Objectif: ${current.weight}kg × ${current.reps}r`:"Définir objectif"}</button>;
  return<div style={{background:T.card2,borderRadius:9,padding:"9px",marginBottom:7}}><div style={{fontSize:10,color:"#3B82F6",marginBottom:7,letterSpacing:1}}>🎯 OBJECTIF</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:6}}>{[{v:w,sv:setW,l:"CHARGE (kg)"},{v:r,sv:setR,l:"REPS"}].map((f,i)=><div key={i}><div style={{fontSize:7,color:T.muted,marginBottom:2,fontFamily:"DM Sans,sans-serif",letterSpacing:1}}>{f.l}</div><input type="number" value={f.v} onChange={e=>f.sv(e.target.value)} style={iS}/></div>)}</div><div style={{display:"flex",gap:5}}><button onClick={()=>{onSave(exId,{weight:+w,reps:+r});setOpen(false);}} style={{flex:1,background:"#3B82F6",color:"#fff",border:"none",borderRadius:7,padding:"7px",fontFamily:"Bebas Neue,sans-serif",fontSize:14,cursor:"pointer"}}>✓</button><button onClick={()=>setOpen(false)} style={{background:"none",border:`1px solid ${T.border}`,color:T.muted,borderRadius:7,padding:"7px 9px",cursor:"pointer",fontSize:12}}>✕</button></div></div>;
}

// ─── CARDIO FIELDS ────────────────────────────────────────────────────────────
function CardioFields({form,setForm,iStyle,ct}){
  const f=(k,l,ph)=><div key={k}><div style={{fontSize:8,color:"#5A6070",letterSpacing:1,marginBottom:2,fontFamily:"DM Sans,sans-serif"}}>{l}</div><input type="number" value={form[k]||""} placeholder={ph} onChange={e=>setForm(x=>({...x,[k]:e.target.value}))} style={{...iStyle,textAlign:"center",fontSize:16}}/></div>;
  return<div style={{marginBottom:8}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:6}}>
      {ct.id==="stairs"&&f("floors","ÉTAGES","10")}
      {ct.id==="elevation"&&f("elev","DÉNIVELÉ (m)","500")}
      {ct.id==="jump_rope"&&f("jumps","SAUTS","500")}
      {ct.id==="boxing"&&f("rounds","ROUNDS","6")}
      {ct.id==="tennis"&&f("rounds","SETS","3")}
      {!["stairs","elevation","hiit_c","yoga","pilates","football","jump_rope","boxing","tennis"].includes(ct.id)&&f("dist","DISTANCE","0")}
      {f("min","MIN","0")}{f("sec","SEC","0")}
    </div>
    {ct.id==="incline_w"&&f("incline","INCLINAISON (%)","5")}
    {ct.id==="hiit_c"&&f("rounds","ROUNDS","8")}
    {ct.id==="elevation"&&<div style={{marginTop:6}}>{f("dist","DISTANCE (km)","0")}</div>}
  </div>;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const[tab,setTab]=useState("home");
  const[dark,setDark]=useState(true);
  const[accent,setAccent]=useState("#FF6B2C");
  const[showRest,setShowRest]=useState(false);
  const[showHIIT,setShowHIIT]=useState(false);
  const[gymSub,setGymSub]=useState("upper");
  const[gymGrp,setGymGrp]=useState("all");
  const[selEx,setSelEx]=useState(null);
  const[searchQ,setSearchQ]=useState("");
  const[favorites,setFavorites]=useState(new Set());
  const[showFavOnly,setShowFavOnly]=useState(false);
  const[supersets,setSupersets]=useState({});
  const[curSets,setCurSets]=useState({});
  const[sessNote,setSessNote]=useState("");
  const[sessStart]=useState(()=>Date.now());
  const[goals,setGoals]=useState({});
  const[sessions,setSessions]=useState([]);
  const[pr,setPr]=useState({});
  const[cardioType,setCardioType]=useState("run");
  const[swimStyle,setSwimStyle]=useState("crawl");
  const[cardioForm,setCardioForm]=useState({dist:"",floors:"",elev:"",min:"",sec:"",incline:"",note:"",rounds:"",jumps:""});
  const[cardioLog,setCardioLog]=useState([]);
  const[program,setProgram]=useState({0:[],1:[],2:[],3:[],4:[],5:[],6:[]});
  const[planDay,setPlanDay]=useState(()=>{const d=new Date().getDay();return d===0?6:d-1;});
  const[planSub,setPlanSub]=useState("upper");
  const[statsEx,setStatsEx]=useState("bench");
  const[statsView,setStatsView]=useState("weight");
  const[statsMusView,setStatsMusView]=useState("upper");
  const[cardioStatsType,setCardioStatsType]=useState("run");
  const[cardioPeriod,setCardioPeriod]=useState("month");
  const[cardioMetric,setCardioMetric]=useState("dist");
  const[strCat,setStrCat]=useState("all");
  const[strTimer,setStrTimer]=useState({id:null,elapsed:0,running:false});
  const strRef=useRef();
  const[profile,setProfile]=useState({name:"",weight:"",height:"",objective:"mass",photo:"",gender:"male"});
  const[measures,setMeasures]=useState({});
  const[profileTab,setProfileTab]=useState("infos");
  const[badgeToast,setBadgeToast]=useState(null);
  const[earnedBadgeIds,setEarnedBadgeIds]=useState(new Set());
  const[badgeDates,setBadgeDates]=useState({});
  const[notifEnabled,setNotifEnabled]=useState(false);
  const[aiEnabled,setAIEnabled]=useState(true);
  const[bodyEx,setBodyEx]=useState(null); // exercise for body schema popup
  const[beforeAfterPhotos,setBeforeAfterPhotos]=useState({before:"",after:""});
  const[showTemplates,setShowTemplates]=useState(false);

  // Stretches data
  const STRETCHES=[
    {id:"neck_l",name:"Inclinaison latérale cou",muscle:"Cou",dur:30,icon:"🧠",cat:"upper"},
    {id:"chest_op",name:"Ouverture poitrine",muscle:"Pectoraux",dur:45,icon:"🦅",cat:"upper"},
    {id:"lat_str",name:"Étirement grand dorsal",muscle:"Dos",dur:45,icon:"🔝",cat:"upper"},
    {id:"child",name:"Posture de l'enfant",muscle:"Dos / Hanches",dur:60,icon:"🧘",cat:"full"},
    {id:"cobra",name:"Posture du cobra",muscle:"Lombaires",dur:40,icon:"🐍",cat:"full"},
    {id:"hip_flex",name:"Fente hip flexor",muscle:"Psoas",dur:45,icon:"🦵",cat:"lower"},
    {id:"pigeon",name:"Posture pigeon",muscle:"Fessiers",dur:60,icon:"🕊️",cat:"lower"},
    {id:"hamstring",name:"Ischio assis",muscle:"Ischio",dur:45,icon:"📏",cat:"lower"},
    {id:"quad_st",name:"Quadriceps debout",muscle:"Quadriceps",dur:30,icon:"🦵",cat:"lower"},
    {id:"calf_w",name:"Mollets contre mur",muscle:"Mollets",dur:30,icon:"👣",cat:"lower"},
  ];

  useEffect(()=>{
    (async()=>{
      const[s,p,c,g,prog,prof,meas,dk,bd,notif,ai,favs,ss,bap,ac]= await Promise.all([
        sGet("it8-sessions"),sGet("it8-pr"),sGet("it8-cardio"),sGet("it8-goals"),
        sGet("it8-program"),sGet("it8-profile"),sGet("it8-measures"),sGet("it8-dark"),
        sGet("it8-badge-dates"),sGet("it8-notif"),sGet("it8-ai"),sGet("it8-favs"),
        sGet("it8-supersets"),sGet("it8-bap"),sGet("it8-accent")
      ]);
      if(s)setSessions(s);if(p)setPr(p);if(c)setCardioLog(c);if(g)setGoals(g);
      if(prog)setProgram(prog);if(prof)setProfile(prof);if(meas)setMeasures(meas);
      if(dk!==null)setDark(dk);if(bd)setBadgeDates(bd);if(notif)setNotifEnabled(notif);
      if(ai!==null)setAIEnabled(ai);if(favs)setFavorites(new Set(favs));
      if(ss)setSupersets(ss);if(bap)setBeforeAfterPhotos(bap);if(ac)setAccent(ac);
    })();
  },[]);

  // Badge checker
  useEffect(()=>{
    BADGES_DEF.forEach(b=>{
      if(!earnedBadgeIds.has(b.id)&&b.check(sessions,cardioLog,pr)){
        setEarnedBadgeIds(prev=>{const n=new Set(prev);n.add(b.id);return n;});
        setBadgeToast(b);
        const nd={...badgeDates,[b.id]:new Date().toISOString()};
        setBadgeDates(nd);sSet("it8-badge-dates",nd);
      }
    });
  },[sessions,cardioLog,pr]);

  useEffect(()=>{sSet("it8-dark",dark);},[dark]);

  useEffect(()=>{
    if(strTimer.running){strRef.current=setInterval(()=>{setStrTimer(t=>{const ex=STRETCHES.find(s=>s.id===t.id);if(t.elapsed+1>=(ex?.dur||30)){clearInterval(strRef.current);playBeep();return{...t,elapsed:ex?.dur||30,running:false};}return{...t,elapsed:t.elapsed+1};});},1000);}
    else clearInterval(strRef.current);
    return()=>clearInterval(strRef.current);
  },[strTimer.running]);

  const T=dark?{bg:"#0B0B10",card:"#13131E",card2:"#1A1A28",border:"#1E2035",text:"#F2F2F2",muted:"#5A6070",input:"#0F0F1C"}:{bg:"#F0F2F7",card:"#FFFFFF",card2:"#EEF0F8",border:"#DDE0EE",text:"#0F0F1A",muted:"#6B7080",input:"#F4F5FC"};
  const iStyle={background:T.input,border:`1px solid ${T.border}`,color:T.text,borderRadius:9,padding:"8px 10px",fontFamily:"DM Sans,sans-serif",fontSize:14,width:"100%",outline:"none"};

  const allEx=[...EX.upper,...EX.lower];
  const sessionKg=Object.values(curSets).reduce((a,s)=>a+calcVol(s),0);
  const sessMin=Math.round((Date.now()-sessStart)/60000);
  const sessKcal=calcKcalGym(sessionKg,Math.max(sessMin,20));
  const now=new Date();
  const monthKg=sessions.filter(s=>{const d=new Date(s.date);return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();}).reduce((a,s)=>a+(s.totalKg||0),0)+sessionKg;
  const totalKgAll=sessions.reduce((a,s)=>a+(s.totalKg||0),0)+sessionKg;
  const totalKcalGym=sessions.reduce((a,s)=>a+(s.kcalBurned||0),0);
  const totalKcalCardio=cardioLog.reduce((a,c)=>a+(c.kcal||0),0);

  const earnedBadgesList=BADGES_DEF.filter(b=>earnedBadgeIds.has(b.id)||b.check(sessions,cardioLog,pr));

  const todayDayIdx=now.getDay()===0?6:now.getDay()-1;
  const todayPlan=program[todayDayIdx]||[];
  const todayDone=sessions.filter(s=>s.date.slice(0,10)===todayISO());
  const doneTodayExIds=new Set(todayDone.flatMap(s=>Object.keys(s.sets||{})));
  const pendingToday=todayPlan.filter(id=>!doneTodayExIds.has(id));

  // Streak
  const getStreak=()=>{let c=0;for(let i=0;i<60;i++){const d=new Date();d.setDate(d.getDate()-i);if(sessions.find(s=>s.date.slice(0,10)===d.toISOString().slice(0,10)))c++;else if(i>0)break;}return c;};
  const streak=getStreak();

  // Week stats for dashboard
  const weekStart=new Date();weekStart.setDate(weekStart.getDate()-6);
  const weekSessions=sessions.filter(s=>new Date(s.date)>=weekStart);
  const weekCardio=cardioLog.filter(c=>new Date(c.date)>=weekStart);
  const weekKg=weekSessions.reduce((a,s)=>a+(s.totalKg||0),0);
  const weekKcal=weekSessions.reduce((a,s)=>a+(s.kcalBurned||0),0)+weekCardio.reduce((a,c)=>a+(c.kcal||0),0);

  // Heatmap for body schema
  const bodyHeatmap=()=>{
    const regionVols={};
    sessions.forEach(sess=>{
      Object.entries(sess.sets||{}).forEach(([exId,sets])=>{
        const ex=allEx.find(e=>e.id===exId);
        if(!ex||!ex.regions)return;
        const vol=calcVol(sets);
        Object.entries(ex.regions).forEach(([reg,intensity])=>{
          regionVols[reg]=(regionVols[reg]||0)+vol*intensity;
        });
      });
    });
    const maxVol=Math.max(...Object.values(regionVols),1);
    const result={};
    Object.entries(regionVols).forEach(([k,v])=>result[k]=v/maxVol);
    return result;
  };

  // Cardio chart
  const ctDef=CARDIO_TYPES.find(c=>c.id===cardioStatsType)||CARDIO_TYPES[0];
  const cardioFiltered=cardioLog.filter(c=>c.type===cardioStatsType);
  const getCardioChart=(period,metric)=>{
    const now2=new Date();
    const getVal=items=>{if(metric==="dist")return items.reduce((a,c)=>a++(c.dist||c.floors||c.elev||c.rounds||c.jumps||0),0);if(metric==="kcal")return items.reduce((a,c)=>a+(c.kcal||0),0);return items.reduce((a,c)=>a+(+c.min||0)*60+(+c.sec||0),0)/60;};
    if(period==="day"){const days=[];for(let i=13;i>=0;i--){const d=new Date(now2);d.setDate(d.getDate()-i);days.push(d.toISOString().slice(0,10));}return days.map(day=>({label:day.slice(5),[metric]:+getVal(cardioFiltered.filter(c=>c.date.slice(0,10)===day)).toFixed(1)}));}
    if(period==="month"){const months=[];for(let i=11;i>=0;i--){const d=new Date(now2.getFullYear(),now2.getMonth()-i,1);months.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`);}return months.map(mo=>{const d2=new Date(mo+"-01");return{label:d2.toLocaleDateString("fr-FR",{month:"short"}),[metric]:+getVal(cardioFiltered.filter(c=>c.date.slice(0,7)===mo)).toFixed(1)};});}
    const years=[];for(let y=now2.getFullYear()-3;y<=now2.getFullYear();y++)years.push(y);
    return years.map(y=>({label:`${y}`,[metric]:+getVal(cardioFiltered.filter(c=>new Date(c.date).getFullYear()===y)).toFixed(1)}));
  };

  const exStats=sessions.filter(s=>(s.sets?.[statsEx]||[]).length>0).map(s=>({label:fmtD(s.date),weight:Math.max(0,...(s.sets[statsEx]||[]).map(x=>+(x.weight)||0)),volume:calcVol(s.sets[statsEx]||[])})).slice(-12);
  const musGroupStats=view=>(view==="upper"?MUS_GRP_UPPER:MUS_GRP_LOWER).map(grp=>{const exs=EX[view].filter(e=>e.grp===grp);const vol=sessions.reduce((t,sess)=>t+exs.reduce((a,ex)=>a+calcVol(sess.sets?.[ex.id]||[]),0),0)+exs.reduce((a,ex)=>a+calcVol(curSets[ex.id]||[]),0);return{label:grp.length>7?grp.slice(0,6)+"…":grp,vol:Math.round(vol)};});

  // Actions
  const addSet=id=>setCurSets(p=>({...p,[id]:[...(p[id]||[]),{reps:"",weight:"",done:false,note:""}]}));
  const updSet=(id,i,f,v)=>setCurSets(p=>{const c=[...(p[id]||[])];c[i]={...c[i],[f]:v};return{...p,[id]:c};});
  const delSet=(id,i)=>setCurSets(p=>{const c=[...(p[id]||[])];c.splice(i,1);return{...p,[id]:c};});
  const finishSession=()=>{
    if(sessionKg===0)return;
    const kcalBurned=calcKcalGym(sessionKg,Math.max(sessMin,20));
    const sess={id:Date.now(),date:new Date().toISOString(),sets:curSets,totalKg:sessionKg,note:sessNote,kcalBurned,durationMin:Math.max(sessMin,20)};
    const newPr={...pr};
    Object.entries(curSets).forEach(([id,sets])=>{const mx=Math.max(0,...sets.map(s=>+(s.weight)||0));if(mx>0&&(!newPr[id]||mx>newPr[id].weight))newPr[id]={weight:mx,date:new Date().toISOString()};});
    const newS=[...sessions,sess];setSessions(newS);sSet("it8-sessions",newS);setPr(newPr);sSet("it8-pr",newPr);setCurSets({});setSessNote("");
  };
  const deleteSess=id=>{const ns=sessions.filter(s=>s.id!==id);setSessions(ns);sSet("it8-sessions",ns);};
  const saveGoal=(id,g)=>{const ng={...goals,[id]:g};setGoals(ng);sSet("it8-goals",ng);};

  const logCardio=()=>{
    try{
      const ct=CARDIO_TYPES.find(c=>c.id===cardioType)||CARDIO_TYPES[0];
      const kcal=calcKcalCardio(ct,cardioForm,+profile.weight||75);
      const entry={...cardioForm,type:ct.id,swimStyle:ct.id==="swim"?swimStyle:undefined,kcal,id:Date.now(),date:new Date().toISOString()};
      const nl=[...cardioLog,entry];
      setCardioLog(nl);
      sSet("it8-cardio",nl);
      setCardioForm({dist:"",floors:"",elev:"",min:"",sec:"",incline:"",note:"",rounds:"",jumps:""});
    }catch(e){console.error("logCardio error:",e);}
  };

  const deleteCardio=id=>{const nl=cardioLog.filter(c=>c.id!==id);setCardioLog(nl);sSet("it8-cardio",nl);};
  const toggleProg=(dayIdx,id)=>{const day=program[dayIdx]||[];const np={...program,[dayIdx]:day.includes(id)?day.filter(e=>e!==id):[...day,id]};setProgram(np);sSet("it8-program",np);};
  const saveProfile=p=>{setProfile(p);sSet("it8-profile",p);};
  const toggleFav=id=>{const nf=new Set(favorites);nf.has(id)?nf.delete(id):nf.add(id);setFavorites(nf);sSet("it8-favs",[...nf]);};
  const toggleSuperset=(id)=>{const ns={...supersets,[id]:!supersets[id]};setSupersets(ns);sSet("it8-supersets",ns);};
  const loadTemplate=t=>{const day=[...new Set([...(program[planDay]||[]),...t.exos.filter(id=>allEx.find(e=>e.id===id))])];const np={...program,[planDay]:day};setProgram(np);sSet("it8-program",np);setShowTemplates(false);};

  const upperGroups=["all","⭐ Favoris",...[...new Set(EX.upper.map(e=>e.grp))]];
  const lowerGroups=["all","⭐ Favoris",...[...new Set(EX.lower.map(e=>e.grp))]];
  const filterEx=(list)=>{
    let r=list;
    if(gymGrp==="⭐ Favoris")r=r.filter(e=>favorites.has(e.id));
    else if(gymGrp!=="all")r=r.filter(e=>e.grp===gymGrp);
    if(searchQ.trim())r=r.filter(e=>e.name.toLowerCase().includes(searchQ.toLowerCase())||e.muscle.toLowerCase().includes(searchQ.toLowerCase()));
    return r;
  };
  const filteredEx=filterEx(EX[gymSub]);

  const TABS=[{id:"home",icon:"🏠",label:"HOME"},{id:"gym",icon:"🏋️",label:"GYM"},{id:"cardio",icon:"🏃",label:"CARDIO"},{id:"stats",icon:"📊",label:"STATS"},{id:"profil",icon:"👤",label:"PROFIL"}];

  return(
    <div style={{height:"100vh",background:T.bg,color:T.text,fontFamily:"Bebas Neue,sans-serif",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:${accent};border-radius:2px;}@keyframes si{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}.si{animation:si .15s ease forwards;}@keyframes prp{0%{transform:scale(1)}50%{transform:scale(1.3)}100%{transform:scale(1)}}.pr-pop{animation:prp .35s ease;}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}input::-webkit-inner-spin-button{opacity:.3;}select option{background:#13131E;}`}</style>

      {badgeToast&&<BadgeToast badge={badgeToast} onDone={()=>setBadgeToast(null)}/>}

      {/* Body schema popup */}
      {bodyEx&&<div onClick={()=>setBodyEx(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:"0 16px"}}><div onClick={e=>e.stopPropagation()} style={{background:T.card,borderRadius:16,padding:18,width:"100%",maxWidth:360}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div><div style={{fontSize:17,letterSpacing:.5}}>{bodyEx.icon} {bodyEx.name}</div><div style={{fontSize:10,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{bodyEx.muscle}</div></div>
          <button onClick={()=>setBodyEx(null)} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:18}}>✕</button>
        </div>
        <BodySchema highlights={bodyEx.regions||{}} mode="exercise" gender={profile.gender||"male"} accent={accent} dark={dark}/>
        <div style={{display:"flex",gap:5,marginTop:10,flexWrap:"wrap"}}>
          {Object.entries(bodyEx.regions||{}).map(([reg,v])=><span key={reg} style={{background:`${accent}22`,color:accent,fontSize:9,padding:"2px 6px",borderRadius:5,fontFamily:"DM Sans,sans-serif"}}>{reg}: {Math.round(v*100)}%</span>)}
        </div>
      </div></div>}

      {/* HEADER */}
      <div style={{background:T.bg,borderBottom:`1px solid ${T.border}`,padding:"8px 12px 7px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{width:28,height:28,background:accent,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>⚡</div>
          <div><span style={{fontSize:17,letterSpacing:2}}>IRON</span><span style={{fontSize:17,color:accent,letterSpacing:2}}>TRACK</span><span style={{background:accent,color:"#fff",fontSize:7,padding:"1px 3px",borderRadius:3,letterSpacing:1,marginLeft:4,verticalAlign:"middle",fontFamily:"DM Sans,sans-serif",fontWeight:700}}>V8</span></div>
        </div>
        <div style={{display:"flex",gap:5,alignItems:"center"}}>
          {streak>=3&&<div style={{background:"rgba(245,158,11,.15)",border:"1px solid rgba(245,158,11,.3)",borderRadius:7,padding:"3px 7px",display:"flex",alignItems:"center",gap:3}}><span style={{fontSize:11}}>{"🏋️".repeat(Math.min(3,Math.floor(streak/3)))}</span><span style={{fontSize:11,color:"#F59E0B",fontFamily:"Bebas Neue,sans-serif"}}>{streak}j</span></div>}
          {sessionKg>0&&<button onClick={()=>setShowRest(true)} style={{background:`${accent}18`,border:`1px solid ${accent}55`,borderRadius:7,padding:"3px 7px",cursor:"pointer",color:accent,fontFamily:"DM Sans,sans-serif",fontSize:9,fontWeight:600,lineHeight:1.3}}>⏱️ {sessionKg}kg<br/>🔥 {sessKcal}kcal</button>}
          <div style={{width:26,height:26,borderRadius:"50%",background:T.card2,border:`2px solid ${T.border}`,overflow:"hidden",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setTab("profil")}>
            {profile.photo?<img src={profile.photo} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:<span style={{fontSize:10}}>👤</span>}
          </div>
          <button onClick={()=>setDark(d=>!d)} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:7,padding:"4px 5px",cursor:"pointer",fontSize:12,lineHeight:1}}>{dark?"☀️":"🌙"}</button>
        </div>
      </div>

      {pendingToday.length>0&&tab==="gym"&&<div style={{background:`${accent}12`,borderBottom:`1px solid ${accent}30`,padding:"6px 12px",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
        <span style={{fontSize:11}}>🗓️</span>
        <div style={{flex:1,minWidth:0}}><div style={{fontSize:9,color:accent,letterSpacing:1}}>AUJOURD'HUI</div><div style={{fontSize:9,color:T.muted,fontFamily:"DM Sans,sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{pendingToday.map(id=>allEx.find(e=>e.id===id)?.name).filter(Boolean).join(" · ")}</div></div>
        <span style={{background:accent,color:"#fff",fontSize:8,fontFamily:"DM Sans,sans-serif",fontWeight:700,padding:"2px 6px",borderRadius:8,flexShrink:0}}>{pendingToday.length} exo{pendingToday.length>1?"s":""}</span>
      </div>}

      <div style={{flex:1,overflowY:"auto",padding:"8px 11px 6px",position:"relative"}}>

        {/* ══ HOME ══ */}
        {tab==="home"&&<div className="si">
          {profile.name&&<div style={{marginBottom:11}}><div style={{fontSize:20,letterSpacing:1}}>👋 Salut, {profile.name} !</div><div style={{fontSize:10,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"})}</div></div>}
          {/* Weekly summary */}
          <div style={{background:`${accent}10`,border:`1px solid ${accent}30`,borderRadius:13,padding:13,marginBottom:11}}>
            <div style={{fontSize:13,letterSpacing:1,marginBottom:9}}>📊 CETTE SEMAINE</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>
              {[{l:"SÉANCES",v:weekSessions.length,c:accent,icon:"🏋️"},{l:"CARDIO",v:weekCardio.length,c:"#3B82F6",icon:"🏃"},{l:"KG",v:Math.round(weekKg),c:"#22C55E",icon:"💪"},{l:"KCAL",v:Math.round(weekKcal),c:"#F59E0B",icon:"🔥"}].map(s=><div key={s.l} style={{background:T.card,borderRadius:9,padding:"8px 5px",textAlign:"center"}}><div style={{fontSize:13}}>{s.icon}</div><div style={{fontSize:18,color:s.c,lineHeight:1,fontFamily:"Bebas Neue,sans-serif"}}>{s.v}</div><div style={{fontSize:7,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{s.l}</div></div>)}
            </div>
          </div>
          {/* Today's plan */}
          {todayPlan.length>0&&<div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:13,padding:12,marginBottom:11}}>
            <div style={{fontSize:13,letterSpacing:1,marginBottom:8,color:accent}}>🗓️ AUJOURD'HUI</div>
            {todayPlan.slice(0,5).map(id=>{const ex=allEx.find(e=>e.id===id);if(!ex)return null;const done=doneTodayExIds.has(id);return<div key={id} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 0",borderBottom:`1px solid ${T.border}`}}><span style={{fontSize:13}}>{ex.icon}</span><div style={{flex:1}}><div style={{fontSize:11,opacity:done?.5:1,textDecoration:done?"line-through":"none"}}>{ex.name}</div></div>{done&&<span style={{color:"#22C55E",fontSize:13}}>✓</span>}</div>;})}
            {todayPlan.length>5&&<div style={{fontSize:9,color:T.muted,fontFamily:"DM Sans,sans-serif",marginTop:5,textAlign:"center"}}>+{todayPlan.length-5} autres...</div>}
            <button onClick={()=>setTab("gym")} style={{width:"100%",marginTop:9,background:accent,color:"#fff",border:"none",borderRadius:9,padding:"9px",fontFamily:"Bebas Neue,sans-serif",fontSize:14,cursor:"pointer",letterSpacing:.5}}>🏋️ COMMENCER LA SÉANCE</button>
          </div>}
          {/* Badges progress */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:13,padding:12,marginBottom:11}}>
            <div style={{fontSize:13,letterSpacing:1,marginBottom:8}}>🏆 PROGRESSION BADGES</div>
            <div style={{height:7,background:T.card2,borderRadius:4,overflow:"hidden",marginBottom:6}}><div style={{height:"100%",width:`${(earnedBadgesList.length/BADGES_DEF.length)*100}%`,background:accent,borderRadius:4,transition:"width .5s"}}/></div>
            <div style={{fontSize:10,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{earnedBadgesList.length}/{BADGES_DEF.length} badges débloqués</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:7}}>{earnedBadgesList.slice(0,8).map(b=><span key={b.id} style={{fontSize:18}}>{b.icon}</span>)}</div>
          </div>
          {/* Total stats */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:11}}>
            {[{l:"TOTAL SOULEVÉ",v:`${Math.round(totalKgAll).toLocaleString("fr-FR")} kg`,c:accent,sub:funCmp(Math.round(totalKgAll))},{l:"CALORIES BRÛLÉES",v:`${(totalKcalGym+totalKcalCardio).toLocaleString("fr-FR")} kcal`,c:"#F59E0B",sub:`💪 ${Math.round(totalKcalGym)} + 🏃 ${Math.round(totalKcalCardio)}`}].map(s=><div key={s.l} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"11px 10px"}}><div style={{fontSize:7,color:T.muted,letterSpacing:1,fontFamily:"DM Sans,sans-serif",marginBottom:3}}>{s.l}</div><div style={{fontSize:18,color:s.c,lineHeight:1,marginBottom:2}}>{s.v}</div><div style={{fontSize:8,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{s.sub}</div></div>)}
          </div>
          {/* Quick actions */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            <button onClick={()=>{setTab("gym");}} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:11,padding:"11px",fontFamily:"Bebas Neue,sans-serif",fontSize:13,cursor:"pointer",color:T.text,letterSpacing:.5}}>🏋️ NOUVELLE SÉANCE</button>
            <button onClick={()=>{setTab("cardio");}} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:11,padding:"11px",fontFamily:"Bebas Neue,sans-serif",fontSize:13,cursor:"pointer",color:T.text,letterSpacing:.5}}>🏃 NOUVEAU CARDIO</button>
            <button onClick={()=>setShowHIIT(true)} style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:11,padding:"11px",fontFamily:"Bebas Neue,sans-serif",fontSize:13,cursor:"pointer",color:"#EF4444",letterSpacing:.5}}>⚡ TIMER HIIT</button>
            <button onClick={()=>setShowRest(true)} style={{background:`${accent}12`,border:`1px solid ${accent}30`,borderRadius:11,padding:"11px",fontFamily:"Bebas Neue,sans-serif",fontSize:13,cursor:"pointer",color:accent,letterSpacing:.5}}>⏱️ CHRONO REPOS</button>
          </div>
        </div>}

        {/* ══ GYM ══ */}
        {tab==="gym"&&<div className="si">
          {sessionKg>0&&<div style={{background:`${accent}10`,border:`1px solid ${accent}30`,borderRadius:12,padding:11,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div><div style={{fontSize:14,letterSpacing:1}}>⚡ SESSION EN COURS</div><div style={{fontSize:9,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{funCmp(sessionKg)}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:26,color:accent,lineHeight:1}}>{sessionKg}kg</div><div style={{fontSize:9,color:"#F59E0B",fontFamily:"DM Sans,sans-serif"}}>🔥 ~{sessKcal} kcal</div></div>
            </div>
            <input placeholder="📝 Note de séance..." value={sessNote} onChange={e=>setSessNote(e.target.value)} style={{...iStyle,marginBottom:6,fontSize:11,padding:"6px 9px"}}/>
            <div style={{display:"flex",gap:5}}>
              <button onClick={()=>setShowRest(true)} style={{flex:1,background:T.card2,color:T.text,border:`1px solid ${T.border}`,borderRadius:8,padding:"8px",fontFamily:"Bebas Neue,sans-serif",fontSize:13,cursor:"pointer"}}>⏱️ REPOS</button>
              <button onClick={()=>setShowHIIT(true)} style={{flex:1,background:"rgba(239,68,68,.1)",color:"#EF4444",border:"1px solid rgba(239,68,68,.3)",borderRadius:8,padding:"8px",fontFamily:"Bebas Neue,sans-serif",fontSize:13,cursor:"pointer"}}>⚡ HIIT</button>
              <button onClick={finishSession} style={{flex:2,background:accent,color:"#fff",border:"none",borderRadius:8,padding:"8px",fontFamily:"Bebas Neue,sans-serif",fontSize:13,cursor:"pointer",boxShadow:`0 3px 10px ${accent}44`}}>✅ TERMINER</button>
            </div>
          </div>}
          {/* Search + filters */}
          <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="🔍 Rechercher un exercice..." style={{...iStyle,marginBottom:8,fontSize:12}}/>
          <div style={{display:"flex",gap:5,marginBottom:8}}>{[{id:"upper",l:"💪 HAUT"},{id:"lower",l:"🦵 BAS"}].map(g=><button key={g.id} onClick={()=>{setGymSub(g.id);setSelEx(null);setGymGrp("all");setSearchQ("");}} style={{flex:1,padding:"8px",border:`2px solid ${gymSub===g.id?accent:T.border}`,borderRadius:10,background:gymSub===g.id?`${accent}18`:T.card,color:gymSub===g.id?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:13,letterSpacing:1,transition:"all .12s"}}>{g.l}</button>)}</div>
          <div style={{display:"flex",gap:3,marginBottom:8,overflowX:"auto",paddingBottom:2}}>{(gymSub==="upper"?upperGroups:lowerGroups).map(g=><button key={g} onClick={()=>setGymGrp(g)} style={{padding:"4px 8px",border:`1px solid ${gymGrp===g?accent:T.border}`,borderRadius:12,background:gymGrp===g?`${accent}18`:T.card2,color:gymGrp===g?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:10,flexShrink:0,whiteSpace:"nowrap"}}>{g==="all"?"Tout":g}</button>)}</div>

          {/* Templates */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <div style={{fontSize:10,color:T.muted,fontFamily:"DM Sans,sans-serif",letterSpacing:.5}}>{filteredEx.length} exercice{filteredEx.length>1?"s":""}</div>
            <button onClick={()=>setShowTemplates(t=>!t)} style={{background:showTemplates?`${accent}22`:T.card2,border:`1px solid ${showTemplates?accent:T.border}`,borderRadius:8,padding:"4px 9px",cursor:"pointer",color:showTemplates?accent:T.muted,fontFamily:"Bebas Neue,sans-serif",fontSize:11}}>📋 TEMPLATES</button>
          </div>
          {showTemplates&&<div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:11,marginBottom:10}}>
            <div style={{fontSize:12,letterSpacing:1,marginBottom:8}}>📋 CHARGER UN PROGRAMME</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
              {TEMPLATES.map(t=><button key={t.id} onClick={()=>loadTemplate(t)} style={{background:T.card2,border:`1px solid ${T.border}`,borderRadius:9,padding:"8px 5px",cursor:"pointer",textAlign:"center"}}>
                <div style={{fontSize:18,marginBottom:2}}>{t.icon}</div>
                <div style={{fontSize:11,color:T.text,fontFamily:"Bebas Neue,sans-serif"}}>{t.name}</div>
                <div style={{fontSize:8,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{t.desc}</div>
              </button>)}
            </div>
          </div>}

          {filteredEx.map(ex=>{
            const sets=curSets[ex.id]||[],open=selEx===ex.id,maxW=sets.length?Math.max(0,...sets.map(s=>+(s.weight)||0)):0;
            const isNewPR=pr[ex.id]&&maxW>0&&maxW>pr[ex.id].weight,goal=goals[ex.id],vol=calcVol(sets);
            const inPlan=todayPlan.includes(ex.id),donePlan=doneTodayExIds.has(ex.id);
            const isFav=favorites.has(ex.id),isSS=supersets[ex.id];
            return<div key={ex.id} style={{background:T.card,border:`1px solid ${isNewPR?"rgba(245,158,11,.5)":isSS?"rgba(59,130,246,.4)":inPlan&&!donePlan?`${accent}50`:T.border}`,borderRadius:11,marginBottom:5,overflow:"hidden"}}>
              <div style={{padding:"8px 10px",display:"flex",alignItems:"center",justifyContent:"space-between",minHeight:48}}>
                <div style={{display:"flex",alignItems:"center",gap:7,flex:1,cursor:"pointer"}} onClick={()=>setSelEx(open?null:ex.id)}>
                  <span style={{fontSize:15}}>{ex.icon}</span>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:3,flexWrap:"wrap"}}><span style={{fontSize:11,letterSpacing:.3}}>{ex.name}</span>{isNewPR&&<span className="pr-pop" style={{background:"#F59E0B",color:"#fff",fontSize:7,padding:"1px 4px",borderRadius:3,fontFamily:"DM Sans,sans-serif",fontWeight:700}}>🏆PR!</span>}{isSS&&<span style={{background:"rgba(59,130,246,.2)",color:"#3B82F6",fontSize:7,padding:"1px 4px",borderRadius:3,fontFamily:"DM Sans,sans-serif",fontWeight:700}}>SS</span>}{inPlan&&<span style={{color:donePlan?"#22C55E":accent,fontSize:9}}>{donePlan?"✓":"📅"}</span>}</div>
                    <div style={{fontSize:8,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{ex.muscle}</div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
                  <button onClick={()=>setBodyEx(ex)} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:6,padding:"2px 5px",cursor:"pointer",color:T.muted,fontSize:10}}>🫀</button>
                  <button onClick={()=>toggleFav(ex.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,opacity:isFav?1:.3}}>{isFav?"⭐":"☆"}</button>
                  {sets.length>0&&<span style={{background:accent,color:"#fff",fontSize:8,fontFamily:"DM Sans,sans-serif",fontWeight:700,padding:"1px 5px",borderRadius:14}}>{sets.filter(s=>s.done).length}/{sets.length}</span>}
                  <span onClick={()=>setSelEx(open?null:ex.id)} style={{color:T.muted,fontSize:12,cursor:"pointer"}}>{open?"▲":"▼"}</span>
                </div>
              </div>
              {open&&<div style={{padding:"0 10px 10px",borderTop:`1px solid ${T.border}`}}><div style={{paddingTop:7}}>
                <GoalEditor exId={ex.id} current={goal} T={T} accent={accent} onSave={saveGoal}/>
                <div style={{display:"flex",gap:5,marginBottom:7}}>
                  <button onClick={()=>toggleSuperset(ex.id)} style={{flex:1,background:isSS?"rgba(59,130,246,.15)":"none",border:`1px solid ${isSS?"#3B82F6":T.border}`,borderRadius:7,padding:"5px",fontFamily:"Bebas Neue,sans-serif",fontSize:10,cursor:"pointer",color:isSS?"#3B82F6":T.muted}}>🔄 SUPERSET</button>
                </div>
                {sets.length>0&&<div style={{marginBottom:6}}>
                  {sets.map((s,i)=><div key={i} style={{marginBottom:5}}>
                    <div style={{display:"grid",gridTemplateColumns:"24px auto 1fr 1fr 24px",gap:3,alignItems:"center",opacity:s.done?.5:1}}>
                      <button onClick={()=>updSet(ex.id,i,"done",!s.done)} style={{width:24,height:24,borderRadius:"50%",border:`2px solid ${s.done?accent:T.border}`,background:s.done?accent:"transparent",cursor:"pointer",color:"#fff",fontSize:9,display:"flex",alignItems:"center",justifyContent:"center"}}>{s.done?"✓":""}</button>
                      <div style={{textAlign:"center",color:T.muted,fontFamily:"DM Sans,sans-serif",fontSize:10,fontWeight:600}}>#{i+1}</div>
                      <input type="number" value={s.reps||""} placeholder="reps" onChange={e=>updSet(ex.id,i,"reps",e.target.value)} style={{...iStyle,textAlign:"center",padding:"6px 2px",fontSize:14}}/>
                      <input type="number" value={s.weight||""} placeholder="kg" onChange={e=>updSet(ex.id,i,"weight",e.target.value)} style={{...iStyle,textAlign:"center",padding:"6px 2px",fontSize:14}}/>
                      <button onClick={()=>delSet(ex.id,i)} style={{width:24,height:24,background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                    </div>
                    {open&&<input placeholder="💬 Commentaire (facultatif)..." value={s.note||""} onChange={e=>updSet(ex.id,i,"note",e.target.value)} style={{...iStyle,fontSize:10,padding:"4px 7px",marginTop:3,color:T.muted}}/>}
                  </div>)}
                  {vol>0&&<div style={{textAlign:"right",fontSize:9,color:T.muted,fontFamily:"DM Sans,sans-serif",marginBottom:5}}>Vol: <span style={{color:accent,fontWeight:600}}>{vol}kg</span></div>}
                </div>}
                <div style={{display:"flex",gap:5}}><button onClick={()=>addSet(ex.id)} style={{flex:1,background:accent,color:"#fff",border:"none",borderRadius:8,padding:"9px",fontFamily:"Bebas Neue,sans-serif",fontSize:14,cursor:"pointer",letterSpacing:1}}>+ SÉRIE</button><button onClick={()=>setShowRest(true)} style={{width:38,background:T.card2,border:`1px solid ${T.border}`,borderRadius:8,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>⏱️</button></div>
              </div></div>}
            </div>;
          })}
        </div>}

        {/* ══ CARDIO ══ */}
        {tab==="cardio"&&<div className="si">
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:11,marginBottom:10}}>
            <div style={{fontSize:16,letterSpacing:2,marginBottom:9}}>🏃 NOUVELLE ACTIVITÉ</div>
            <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:9}}>{CARDIO_TYPES.map(ct=><button key={ct.id} onClick={()=>{setCardioType(ct.id);setCardioForm({dist:"",floors:"",elev:"",min:"",sec:"",incline:"",note:"",rounds:"",jumps:""});}} style={{padding:"5px 8px",border:`2px solid ${cardioType===ct.id?ct.color:T.border}`,borderRadius:15,background:cardioType===ct.id?`${ct.color}18`:T.card2,color:cardioType===ct.id?ct.color:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:10,display:"flex",alignItems:"center",gap:2}}>{ct.icon} {ct.name}</button>)}</div>
            {cardioType==="swim"&&<div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:8}}>{SWIM_STYLES.map(s=><button key={s.id} onClick={()=>setSwimStyle(s.id)} style={{padding:"4px 8px",border:`1px solid ${swimStyle===s.id?"#06B6D4":T.border}`,borderRadius:13,background:swimStyle===s.id?"rgba(6,182,212,.12)":T.card2,color:swimStyle===s.id?"#06B6D4":T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:10}}>{s.icon} {s.name}</button>)}</div>}
            <CardioFields form={cardioForm} setForm={setCardioForm} iStyle={iStyle} ct={CARDIO_TYPES.find(c=>c.id===cardioType)||CARDIO_TYPES[0]}/>
            {(()=>{const ct=CARDIO_TYPES.find(c=>c.id===cardioType)||CARDIO_TYPES[0];const kcalEst=calcKcalCardio(ct,cardioForm,+profile.weight||75);const dist=+(cardioForm.dist||0);const secT=(+cardioForm.min||0)*60+(+cardioForm.sec||0);const paceVal=pace(ct.unit==="km"?dist:dist/1000,secT);if(!kcalEst&&!paceVal)return null;return<div style={{background:T.card2,borderRadius:7,padding:"6px 9px",marginBottom:7,display:"flex",gap:10,flexWrap:"wrap"}}>{kcalEst>0&&<span style={{fontFamily:"DM Sans,sans-serif",fontSize:11}}>🔥 <b style={{color:"#F59E0B"}}>{kcalEst} kcal</b> {profile.weight?`(${profile.weight}kg)`:""}</span>}{paceVal&&["run","bike","walk"].includes(ct.id)&&<span style={{fontFamily:"DM Sans,sans-serif",fontSize:11}}>⏱️ <b style={{color:ct.color}}>{paceVal}/km</b></span>}</div>;})()}
            <input placeholder="📝 Notes..." value={cardioForm.note} onChange={e=>setCardioForm(f=>({...f,note:e.target.value}))} style={{...iStyle,marginBottom:7,fontSize:11}}/>
            <button onClick={logCardio} style={{width:"100%",background:CARDIO_TYPES.find(c=>c.id===cardioType)?.color||accent,color:"#fff",border:"none",borderRadius:10,padding:"10px",fontFamily:"Bebas Neue,sans-serif",fontSize:16,cursor:"pointer",letterSpacing:1}}>💾 ENREGISTRER</button>
          </div>
          {[...cardioLog].reverse().slice(0,20).map(c=>{
            const ct=CARDIO_TYPES.find(t=>t.id===c.type)||CARDIO_TYPES[0];
            const secT=(+c.min||0)*60+(+c.sec||0),mainV=+(c.dist||c.floors||c.elev||c.rounds||c.jumps||0);
            return<div key={c.id} style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`3px solid ${ct.color}`,borderRadius:10,padding:"9px",marginBottom:4}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}><span style={{fontSize:12}}>{ct.icon} {ct.name}</span><div style={{display:"flex",gap:5,alignItems:"center"}}><span style={{fontSize:8,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{fmtD(c.date)}</span><button onClick={()=>deleteCardio(c.id)} style={{background:"none",border:"1px solid rgba(239,68,68,.3)",borderRadius:4,padding:"1px 5px",cursor:"pointer",color:"#EF4444",fontSize:9}}>🗑️</button></div></div>
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{mainV>0&&<span style={{background:T.card2,color:ct.color,fontSize:9,padding:"1px 5px",borderRadius:4,fontFamily:"DM Sans,sans-serif",fontWeight:600}}>{mainV} {ct.unit}</span>}{secT>0&&<span style={{background:T.card2,color:T.muted,fontSize:9,padding:"1px 5px",borderRadius:4,fontFamily:"DM Sans,sans-serif"}}>⏱️ {fmt(secT)}</span>}{c.kcal>0&&<span style={{background:T.card2,color:"#F59E0B",fontSize:9,padding:"1px 5px",borderRadius:4,fontFamily:"DM Sans,sans-serif",fontWeight:600}}>🔥 {c.kcal} kcal</span>}</div>
            </div>;
          })}
        </div>}

        {/* ══ STATS ══ */}
        {tab==="stats"&&<div className="si">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5,marginBottom:9}}>
            {[{l:"SÉANCES",v:sessions.length,c:accent},{l:"CE MOIS",v:Math.round(monthKg)+"kg",c:"#3B82F6"},{l:"TOTAL SOULEVÉ",v:Math.round(totalKgAll)+"kg",c:"#22C55E"}].map(s=><div key={s.l} style={{background:T.card,border:`1px solid ${T.border}`,borderTop:`3px solid ${s.c}`,borderRadius:10,padding:"8px 4px",textAlign:"center"}}><div style={{fontSize:7,color:T.muted,letterSpacing:1,fontFamily:"DM Sans,sans-serif",marginBottom:2}}>{s.l}</div><div style={{fontSize:17,color:s.c,lineHeight:1}}>{s.v}</div></div>)}
          </div>

          {/* Body heatmap */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:12,marginBottom:9}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:13,letterSpacing:1}}>🫀 CARTE MUSCULAIRE</div>
              <div style={{display:"flex",gap:5}}>
                <button onClick={()=>saveProfile({...profile,gender:"male"})} style={{padding:"3px 8px",border:`1px solid ${profile.gender!=="female"?accent:T.border}`,borderRadius:8,background:profile.gender!=="female"?`${accent}22`:T.card2,color:profile.gender!=="female"?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:10}}>♂ HOMME</button>
                <button onClick={()=>saveProfile({...profile,gender:"female"})} style={{padding:"3px 8px",border:`1px solid ${profile.gender==="female"?accent:T.border}`,borderRadius:8,background:profile.gender==="female"?`${accent}22`:T.card2,color:profile.gender==="female"?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:10}}>♀ FEMME</button>
              </div>
            </div>
            <BodySchema highlights={bodyHeatmap()} mode="heatmap" gender={profile.gender||"male"} accent={accent} dark={dark}/>
            <div style={{fontSize:9,color:T.muted,fontFamily:"DM Sans,sans-serif",textAlign:"center",marginTop:7}}>Basé sur le volume total soulevé par zone musculaire</div>
          </div>

          {/* AI Coach */}
          <AICoach T={T} accent={accent} sessions={sessions} cardioLog={cardioLog} pr={pr} profile={profile} enabled={aiEnabled} onToggle={()=>{const n=!aiEnabled;setAIEnabled(n);sSet("it8-ai",n);}}/>

          {/* PRs */}
          {Object.keys(pr).length>0&&<div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:11,marginBottom:9}}><div style={{fontSize:13,letterSpacing:1,color:"#F59E0B",marginBottom:7}}>🏆 RECORDS PERSONNELS</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>{Object.entries(pr).slice(0,8).map(([id,rec])=>{const ex=allEx.find(e=>e.id===id);if(!ex)return null;return<div key={id} style={{background:T.card2,borderRadius:8,padding:"7px 8px",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:13}}>{ex.icon}</span><div><div style={{fontSize:9,fontFamily:"DM Sans,sans-serif",color:T.text,lineHeight:1.2}}>{ex.name}</div><div style={{fontSize:15,color:"#F59E0B",lineHeight:1,marginTop:1}}>{rec.weight}kg</div></div></div>;})} </div></div>}

          {/* Progression */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:11,marginBottom:9}}>
            <div style={{fontSize:13,letterSpacing:1,marginBottom:8}}>📈 PROGRESSION</div>
            <select value={statsEx} onChange={e=>setStatsEx(e.target.value)} style={{...iStyle,marginBottom:6}}><optgroup label="💪 Haut">{EX.upper.map(e=><option key={e.id} value={e.id}>{e.icon} {e.name}</option>)}</optgroup><optgroup label="🦵 Bas">{EX.lower.map(e=><option key={e.id} value={e.id}>{e.icon} {e.name}</option>)}</optgroup></select>
            <div style={{display:"flex",gap:4,marginBottom:7}}>{[{id:"weight",l:"⚖️ Charge"},{id:"volume",l:"📦 Volume"}].map(v=><button key={v.id} onClick={()=>setStatsView(v.id)} style={{flex:1,padding:"5px",border:`1px solid ${statsView===v.id?accent:T.border}`,borderRadius:6,background:statsView===v.id?`${accent}18`:T.card2,color:statsView===v.id?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:11}}>{v.l}</button>)}</div>
            <LineChart data={exStats} vKey={statsView} color={statsView==="weight"?accent:"#3B82F6"} unit="kg"/>
          </div>

          {/* Muscle groups */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:11,marginBottom:9}}>
            <div style={{fontSize:13,letterSpacing:1,marginBottom:7}}>💪 VOLUME PAR GROUPE</div>
            <div style={{display:"flex",gap:4,marginBottom:7}}>{[{id:"upper",l:"💪 Haut"},{id:"lower",l:"🦵 Bas"}].map(v=><button key={v.id} onClick={()=>setStatsMusView(v.id)} style={{flex:1,padding:"5px",border:`1px solid ${statsMusView===v.id?accent:T.border}`,borderRadius:6,background:statsMusView===v.id?`${accent}18`:T.card2,color:statsMusView===v.id?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:11}}>{v.l}</button>)}</div>
            <BarChart data={musGroupStats(statsMusView)} vKey="vol" color="#8B5CF6" unit="kg"/>
          </div>

          {/* Cardio stats */}
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:11,marginBottom:9}}>
            <div style={{fontSize:13,letterSpacing:1,marginBottom:8}}>🏃 STATS CARDIO</div>
            <div style={{display:"flex",gap:3,marginBottom:7,overflowX:"auto"}}>{CARDIO_TYPES.map(ct=><button key={ct.id} onClick={()=>setCardioStatsType(ct.id)} style={{padding:"4px 7px",border:`2px solid ${cardioStatsType===ct.id?ct.color:T.border}`,borderRadius:14,background:cardioStatsType===ct.id?`${ct.color}18`:T.card2,color:cardioStatsType===ct.id?ct.color:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:10,flexShrink:0}}>{ct.icon} {ct.name}</button>)}</div>
            <div style={{display:"flex",gap:3,marginBottom:6}}>{[{id:"day",l:"14j"},{id:"month",l:"12m"},{id:"year",l:"Années"}].map(p=><button key={p.id} onClick={()=>setCardioPeriod(p.id)} style={{flex:1,padding:"4px",border:`1px solid ${cardioPeriod===p.id?ctDef.color:T.border}`,borderRadius:5,background:cardioPeriod===p.id?`${ctDef.color}18`:T.card2,color:cardioPeriod===p.id?ctDef.color:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:9}}>{p.l}</button>)}</div>
            <div style={{display:"flex",gap:3,marginBottom:7}}>{[{id:"dist",l:"📏 Dist."},{id:"kcal",l:"🔥 Cal."},{id:"time",l:"⏱️ Durée"}].map(m=><button key={m.id} onClick={()=>setCardioMetric(m.id)} style={{flex:1,padding:"4px",border:`1px solid ${cardioMetric===m.id?ctDef.color:T.border}`,borderRadius:5,background:cardioMetric===m.id?`${ctDef.color}18`:T.card2,color:cardioMetric===m.id?ctDef.color:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:9}}>{m.l}</button>)}</div>
            <BarChart data={getCardioChart(cardioPeriod,cardioMetric)} vKey={cardioMetric} color={ctDef.color} unit={cardioMetric==="dist"?` ${ctDef.unit}`:cardioMetric==="kcal"?" kcal":" min"}/>
          </div>

          {/* Historique */}
          {sessions.length>0&&<div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:11}}>
            <div style={{fontSize:13,letterSpacing:1,marginBottom:7}}>📅 DERNIÈRES SÉANCES</div>
            {[...sessions].reverse().slice(0,5).map(s=><div key={s.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:`1px solid ${T.border}`}}><div><div style={{fontSize:11}}>📅 {fmtD(s.date)}</div><div style={{fontSize:8,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{Object.keys(s.sets||{}).length} exo · {s.durationMin||"?"}min</div></div><div style={{textAlign:"right"}}><div style={{fontSize:16,color:accent,fontFamily:"Bebas Neue,sans-serif"}}>{s.totalKg}kg</div>{s.kcalBurned>0&&<div style={{fontSize:9,color:"#F59E0B",fontFamily:"DM Sans,sans-serif"}}>🔥 {s.kcalBurned} kcal</div>}<button onClick={()=>deleteSess(s.id)} style={{background:"none",border:"none",color:"#EF4444",cursor:"pointer",fontSize:9}}>🗑️</button></div></div>)}
          </div>}
        </div>}

        {/* ══ PROFIL ══ */}
        {tab==="profil"&&<div className="si">
          <div style={{display:"flex",gap:4,marginBottom:11,overflowX:"auto"}}>
            {[{id:"infos",l:"👤 Infos"},{id:"plan",l:"🗓️ Plan"},{id:"badges",l:"🏆 Badges"},{id:"theme",l:"🎨 Thème"},{id:"save",l:"💾 Sauvegarde"}].map(t=><button key={t.id} onClick={()=>setProfileTab(t.id)} style={{padding:"5px 9px",border:`2px solid ${profileTab===t.id?accent:T.border}`,borderRadius:13,background:profileTab===t.id?`${accent}18`:T.card,color:profileTab===t.id?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:10,flexShrink:0}}>{t.l}</button>)}
          </div>

          {profileTab==="infos"&&<div>
            {/* Photo + name */}
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:11,background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:12}}>
              <div style={{width:60,height:60,borderRadius:"50%",background:T.card2,border:`3px solid ${accent}`,overflow:"hidden",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}} onClick={()=>document.getElementById("photo-v8").click()}>
                {profile.photo?<img src={profile.photo} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:<div style={{textAlign:"center"}}><div style={{fontSize:22}}>👤</div></div>}
                <input id="photo-v8" type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f){const r=new FileReader();r.onload=ev=>saveProfile({...profile,photo:ev.target.result});r.readAsDataURL(f);}}}/>
              </div>
              <div style={{flex:1}}><input value={profile.name} onChange={e=>saveProfile({...profile,name:e.target.value})} placeholder="Ton prénom..." style={{...iStyle,fontSize:16,fontFamily:"Bebas Neue,sans-serif",letterSpacing:1,marginBottom:4}}/></div>
            </div>
            {/* Objectif */}
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontSize:12,letterSpacing:1,marginBottom:7}}>🎯 OBJECTIF</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:9}}>{OBJECTIVES.map(o=><button key={o.id} onClick={()=>saveProfile({...profile,objective:o.id})} style={{padding:"6px 9px",border:`2px solid ${profile.objective===o.id?o.color:T.border}`,borderRadius:14,background:profile.objective===o.id?`${o.color}18`:T.card2,color:profile.objective===o.id?o.color:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:11}}>{o.icon} {o.label}</button>)}</div>
              {OBJECTIVES.find(o=>o.id===profile.objective)&&<div style={{background:`${OBJECTIVES.find(o=>o.id===profile.objective).color}12`,borderRadius:8,padding:"7px 10px",fontFamily:"DM Sans,sans-serif",fontSize:11,color:T.text,lineHeight:1.5}}>💡 {OBJECTIVES.find(o=>o.id===profile.objective).tip}</div>}
            </div>
            {/* Poids/Taille */}
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontSize:12,letterSpacing:1,marginBottom:7}}>⚖️ CORPOREL</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:8}}>{[{k:"weight",l:"POIDS (kg)",ph:"75"},{k:"height",l:"TAILLE (cm)",ph:"175"}].map(f=><div key={f.k}><div style={{fontSize:8,color:T.muted,letterSpacing:1,marginBottom:2,fontFamily:"DM Sans,sans-serif"}}>{f.l}</div><input type="number" value={profile[f.k]||""} onChange={e=>saveProfile({...profile,[f.k]:e.target.value})} placeholder={f.ph} style={{...iStyle,textAlign:"center",fontSize:18}}/></div>)}</div>
              {profile.weight&&profile.height&&(()=>{const bmi=(profile.weight/(profile.height/100)**2).toFixed(1);const bf=Math.max(5,Math.min(40,(bmi*1.2+0.23*30-10.8*1-5.4))).toFixed(1);const lbl=bmi<18.5?"Insuffisant":bmi<25?"Normal ✅":bmi<30?"Surpoids":"Obésité";const col=bmi<25?"#22C55E":bmi<30?"#F59E0B":"#EF4444";return<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5}}>{[{l:"IMC",v:bmi,c:col,sub:lbl},{l:"MASSE GRASSE EST.",v:`${bf}%`,c:"#3B82F6",sub:`~${Math.round(profile.weight*bf/100)}kg`},{l:"MASSE MAIGRE",v:`${Math.round(profile.weight*(1-bf/100))}kg`,c:"#22C55E",sub:"estimation"}].map(s=><div key={s.l} style={{background:T.card2,borderRadius:8,padding:"7px 5px",textAlign:"center"}}><div style={{fontSize:7,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{s.l}</div><div style={{fontSize:16,color:s.c,fontFamily:"Bebas Neue,sans-serif",lineHeight:1}}>{s.v}</div><div style={{fontSize:7,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{s.sub}</div></div>)}</div>;})()}
            </div>
            {/* Avant/Après */}
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontSize:12,letterSpacing:1,marginBottom:9}}>📸 AVANT / APRÈS</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {["before","after"].map(k=><div key={k}><div style={{fontSize:9,color:T.muted,letterSpacing:1,marginBottom:4,fontFamily:"DM Sans,sans-serif"}}>{k==="before"?"AVANT":"APRÈS"}</div>
                  <div style={{width:"100%",height:100,background:T.card2,borderRadius:9,overflow:"hidden",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",border:`2px dashed ${T.border}`}} onClick={()=>document.getElementById(`bap-${k}`).click()}>
                    {beforeAfterPhotos[k]?<img src={beforeAfterPhotos[k]} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:<div style={{textAlign:"center"}}><div style={{fontSize:22}}>📷</div><div style={{fontSize:9,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>Ajouter</div></div>}
                    <input id={`bap-${k}`} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f){const r=new FileReader();r.onload=ev=>{const nb={...beforeAfterPhotos,[k]:ev.target.result};setBeforeAfterPhotos(nb);sSet("it8-bap",nb);};r.readAsDataURL(f);}}}/>
                  </div>
                </div>)}
              </div>
            </div>
            {/* Notifications */}
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:12}}>
              <div style={{fontSize:12,letterSpacing:1,marginBottom:4}}>🔔 NOTIFICATIONS</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{fontFamily:"DM Sans,sans-serif",fontSize:11,color:T.muted}}>Alertes chrono terminé</div>
                <button onClick={async()=>{if("Notification"in window){if(Notification.permission!=="granted"){await Notification.requestPermission();}const n=!notifEnabled;setNotifEnabled(n);sSet("it8-notif",n);}}} style={{padding:"6px 12px",background:notifEnabled?"#22C55E":accent,color:"#fff",border:"none",borderRadius:7,fontFamily:"Bebas Neue,sans-serif",fontSize:12,cursor:"pointer"}}>{notifEnabled?"✅ ON":"⭕ OFF"}</button>
              </div>
            </div>
          </div>}

          {profileTab==="plan"&&<div>
            <div style={{fontSize:16,letterSpacing:2,marginBottom:10}}>🗓️ PROGRAMME HEBDO</div>
            <div style={{display:"flex",gap:3,marginBottom:10}}>
              {DAYS_FR.map((d,i)=>{const count=(program[i]||[]).length,isToday=(now.getDay()===0?6:now.getDay()-1)===i;return<button key={i} onClick={()=>setPlanDay(i)} style={{flex:1,padding:"6px 1px",border:`2px solid ${planDay===i?accent:isToday?`${accent}55`:T.border}`,borderRadius:7,background:planDay===i?`${accent}18`:isToday?`${accent}08`:T.card,color:planDay===i?accent:T.text,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:9,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                <span>{d}</span>{count>0?<span style={{background:planDay===i?accent:"#444",color:"#fff",fontSize:7,padding:"1px 3px",borderRadius:5}}>{count}</span>:<span style={{fontSize:7,opacity:.2}}>—</span>}
              </button>;})}
            </div>
            <button onClick={()=>setShowTemplates(t=>!t)} style={{width:"100%",marginBottom:8,background:T.card2,border:`1px solid ${T.border}`,borderRadius:9,padding:"8px",fontFamily:"Bebas Neue,sans-serif",fontSize:13,cursor:"pointer",color:T.text}}>📋 CHARGER UN TEMPLATE</button>
            {showTemplates&&<div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:10,marginBottom:10}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5}}>
                {TEMPLATES.map(t=><button key={t.id} onClick={()=>loadTemplate(t)} style={{background:T.card2,border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 4px",cursor:"pointer",textAlign:"center"}}>
                  <div style={{fontSize:16}}>{t.icon}</div>
                  <div style={{fontSize:10,fontFamily:"Bebas Neue,sans-serif"}}>{t.name}</div>
                  <div style={{fontSize:7,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{t.exos.length} exos</div>
                </button>)}
              </div>
            </div>}
            {(program[planDay]||[]).length>0&&<div style={{background:T.card,border:`1px solid ${accent}44`,borderRadius:10,padding:9,marginBottom:9}}>
              <div style={{fontSize:11,color:accent,marginBottom:6}}>✅ {DAYS_FULL[planDay]} — {(program[planDay]||[]).length} exo(s)</div>
              {(program[planDay]||[]).map(id=>{const ex=allEx.find(e=>e.id===id);if(!ex)return null;return<div key={id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:`1px solid ${T.border}`}}><div style={{display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:12}}>{ex.icon}</span><span style={{fontSize:10}}>{ex.name}</span></div><button onClick={()=>toggleProg(planDay,id)} style={{background:"none",border:"none",color:"#EF4444",cursor:"pointer",fontSize:12}}>✕</button></div>;})}
            </div>}
            <div style={{fontSize:10,color:T.muted,letterSpacing:1,marginBottom:6}}>AJOUTER DES EXERCICES</div>
            <div style={{display:"flex",gap:5,marginBottom:8}}>{[{id:"upper",l:"💪 Haut"},{id:"lower",l:"🦵 Bas"}].map(g=><button key={g.id} onClick={()=>setPlanSub(g.id)} style={{flex:1,padding:"7px",border:`2px solid ${planSub===g.id?accent:T.border}`,borderRadius:9,background:planSub===g.id?`${accent}18`:T.card,color:planSub===g.id?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:12}}>{g.l}</button>)}</div>
            {[...new Set(EX[planSub].map(e=>e.grp))].map(grp=>(
              <div key={grp} style={{marginBottom:8}}>
                <div style={{fontSize:8,color:T.muted,letterSpacing:1,marginBottom:4,borderBottom:`1px solid ${T.border}`,paddingBottom:3,fontFamily:"DM Sans,sans-serif",fontWeight:600}}>{grp.toUpperCase()}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:3}}>{EX[planSub].filter(e=>e.grp===grp).map(ex=>{const inDay=(program[planDay]||[]).includes(ex.id);return<button key={ex.id} onClick={()=>toggleProg(planDay,ex.id)} style={{padding:"3px 7px",border:`1px solid ${inDay?accent:T.border}`,borderRadius:11,background:inDay?`${accent}18`:T.card2,color:inDay?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:9,display:"flex",alignItems:"center",gap:2}}>{ex.icon} {ex.name}{inDay&&" ✓"}</button>;})}</div>
              </div>
            ))}
            {/* Stretch */}
            <div style={{marginTop:8,borderTop:`1px solid ${T.border}`,paddingTop:10}}>
              <div style={{fontSize:13,letterSpacing:1,marginBottom:7}}>🤸 ÉTIREMENTS</div>
              <div style={{display:"flex",gap:3,marginBottom:7,overflowX:"auto"}}>{[{id:"all",l:"Tout"},{id:"upper",l:"💪"},{id:"lower",l:"🦵"},{id:"full",l:"🌀"}].map(c=><button key={c.id} onClick={()=>setStrCat(c.id)} style={{padding:"4px 8px",border:`2px solid ${strCat===c.id?accent:T.border}`,borderRadius:12,background:strCat===c.id?`${accent}18`:T.card2,color:strCat===c.id?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:10,flexShrink:0}}>{c.l}</button>)}</div>
              {STRETCHES.filter(s=>strCat==="all"||s.cat===strCat).map(s=>{const active=strTimer.id===s.id,pct=active&&s.dur>0?(strTimer.elapsed/s.dur)*100:0,done=active&&strTimer.elapsed>=s.dur;return<div key={s.id} style={{background:T.card,border:`1px solid ${active?accent:T.border}`,borderRadius:10,padding:9,marginBottom:4}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:active?6:0}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:15}}>{s.icon}</span><div><div style={{fontSize:11}}>{s.name}</div><div style={{fontSize:8,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{s.muscle} · {s.dur}s</div></div></div><button onClick={()=>{if(active&&strTimer.running)setStrTimer(t=>({...t,running:false}));else if(active&&!strTimer.running&&!done)setStrTimer(t=>({...t,running:true}));else setStrTimer({id:s.id,elapsed:0,running:true});}} style={{minWidth:60,height:30,background:active?(done?"#22C55E":`${accent}22`):"#FF6B2C",border:`2px solid ${active?(done?"#22C55E":accent):"transparent"}`,borderRadius:8,cursor:"pointer",color:active?(done?"#fff":accent):"#fff",fontFamily:"Bebas Neue,sans-serif",fontSize:10}}>{!active?"▶ START":done?"✓ DONE":strTimer.running?"⏸":"▶"}</button></div>
                {active&&<div><div style={{height:4,background:T.card2,borderRadius:3,overflow:"hidden",marginBottom:2}}><div style={{height:"100%",width:`${pct}%`,background:done?"#22C55E":accent,borderRadius:3,transition:"width 1s linear"}}/></div><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:9,color:T.muted,fontFamily:"DM Sans,sans-serif"}}>{fmt(strTimer.elapsed)} / {fmt(s.dur)}</span>{done&&<span style={{color:"#22C55E",fontFamily:"DM Sans,sans-serif",fontSize:9}}>✅ Terminé !</span>}</div></div>}
              </div>;})}
            </div>
          </div>}

          {profileTab==="badges"&&<div>
            <div style={{fontFamily:"DM Sans,sans-serif",fontSize:11,color:T.muted,marginBottom:9}}>{earnedBadgesList.length} / {BADGES_DEF.length} badges débloqués 🎉</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr",gap:5}}>
              {BADGES_DEF.map(b=>{const earned=earnedBadgesList.find(e=>e.id===b.id);const eDate=badgeDates[b.id];return<div key={b.id} style={{background:T.card,border:`1px solid ${earned?`${accent}44`:"rgba(255,255,255,.04)"}`,borderRadius:10,padding:"10px 12px",opacity:earned?1:.4,display:"flex",alignItems:"center",gap:9}}>
                <span style={{fontSize:22,filter:earned?"none":"grayscale(1)"}}>{b.icon}</span>
                <div style={{flex:1}}><div style={{fontSize:12,color:earned?accent:T.text,letterSpacing:.3}}>{b.label}</div><div style={{fontSize:9,color:T.muted,fontFamily:"DM Sans,sans-serif",marginTop:1}}>{b.desc}</div>{earned&&eDate&&<div style={{fontSize:8,color:"#22C55E",fontFamily:"DM Sans,sans-serif",marginTop:1}}>✅ {new Date(eDate).toLocaleDateString("fr-FR",{day:"2-digit",month:"long",year:"numeric"})}</div>}</div>
                {earned&&<span style={{fontSize:16}}>✅</span>}
              </div>;})}
            </div>
          </div>}

          {profileTab==="theme"&&<div>
            <div style={{fontSize:15,letterSpacing:1,marginBottom:11}}>🎨 PERSONNALISATION</div>
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontSize:12,letterSpacing:1,marginBottom:9}}>🌈 COULEUR PRINCIPALE</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:7}}>
                {THEME_COLORS.map(tc=><button key={tc.id} onClick={()=>{setAccent(tc.v);sSet("it8-accent",tc.v);}} style={{height:44,borderRadius:10,background:tc.v,border:`3px solid ${accent===tc.v?"#fff":"transparent"}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"DM Sans,sans-serif",fontSize:10,color:"#fff",fontWeight:600,boxShadow:accent===tc.v?"0 0 0 2px "+tc.v:"none"}}>{accent===tc.v?"✓ ":""}{tc.label}</button>)}
              </div>
            </div>
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:12}}>
              <div style={{fontSize:12,letterSpacing:1,marginBottom:9}}>🌗 MODE</div>
              <div style={{display:"flex",gap:7}}>{[{l:"🌙 Sombre",v:true},{l:"☀️ Clair",v:false}].map(m=><button key={m.l} onClick={()=>setDark(m.v)} style={{flex:1,padding:"11px",border:`2px solid ${dark===m.v?accent:T.border}`,borderRadius:10,background:dark===m.v?`${accent}18`:T.card2,color:dark===m.v?accent:T.muted,cursor:"pointer",fontFamily:"Bebas Neue,sans-serif",fontSize:13}}>{m.l}</button>)}</div>
            </div>
          </div>}

          {profileTab==="save"&&<div>
            {/* Partage */}
            {(()=>{const[myCode,setMyCode]=useState(""),[msg,setMsg]=useState(""),[impCode,setImpCode]=useState("");return<div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontSize:13,letterSpacing:1,marginBottom:4}}>🤝 PARTAGE 2 TÉLÉPHONES</div>
              <div style={{fontFamily:"DM Sans,sans-serif",fontSize:11,color:T.muted,marginBottom:9,lineHeight:1.5}}>Publie avec un code unique. L'autre personne l'importe.</div>
              <div style={{display:"flex",gap:5,marginBottom:8}}><input value={myCode} onChange={e=>setMyCode(e.target.value.replace(/\s/g,""))} placeholder="Mon code (ex: alex)" style={{flex:1,background:T.input,border:`1px solid ${T.border}`,color:T.text,borderRadius:8,padding:"7px 10px",fontFamily:"DM Sans,sans-serif",fontSize:12,outline:"none"}}/><button onClick={async()=>{if(!myCode.trim())return setMsg("❌ Entre un code.");const d={sessions,cardioLog,pr,goals,program,profile,measures,publishedAt:new Date().toISOString()};sSetShared(`share-${myCode.trim().toLowerCase()}`,d);setMsg(`✅ Publié ! Code: "${myCode.trim().toLowerCase()}"`)}} style={{background:accent,color:"#fff",border:"none",borderRadius:8,padding:"7px 11px",fontFamily:"Bebas Neue,sans-serif",fontSize:13,cursor:"pointer"}}>📤</button></div>
              <div style={{display:"flex",gap:5}}><input value={impCode} onChange={e=>setImpCode(e.target.value.replace(/\s/g,""))} placeholder="Code de l'autre" style={{flex:1,background:T.input,border:`1px solid ${T.border}`,color:T.text,borderRadius:8,padding:"7px 10px",fontFamily:"DM Sans,sans-serif",fontSize:12,outline:"none"}}/><button onClick={async()=>{const d=await sGetShared(`share-${impCode.trim().toLowerCase()}`);if(!d)return setMsg("❌ Code introuvable.");setMsg(`✅ "${impCode}" trouvé ! Recharge la page.`);}} style={{background:T.card2,color:T.text,border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 11px",fontFamily:"Bebas Neue,sans-serif",fontSize:13,cursor:"pointer"}}>📥</button></div>
              {msg&&<div style={{marginTop:7,fontFamily:"DM Sans,sans-serif",fontSize:11,color:msg.startsWith("✅")?"#22C55E":"#EF4444"}}>{msg}</div>}
            </div>;})()}
            {/* Local backup */}
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:12}}>
              <div style={{fontSize:13,letterSpacing:1,marginBottom:9}}>💾 SAUVEGARDE LOCALE</div>
              <button onClick={()=>{const d={sessions,cardioLog,pr,goals,program,profile,measures,badgeDates,date:new Date().toISOString()};const b=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=`irontrack-v8-${todayISO()}.json`;a.click();URL.revokeObjectURL(u);}} style={{width:"100%",background:accent,color:"#fff",border:"none",borderRadius:9,padding:"10px",fontFamily:"Bebas Neue,sans-serif",fontSize:15,cursor:"pointer",marginBottom:7}}>⬇️ EXPORTER</button>
              <label style={{display:"block",width:"100%",background:T.card2,color:T.text,border:`1px solid ${T.border}`,borderRadius:9,padding:"10px",fontFamily:"Bebas Neue,sans-serif",fontSize:15,cursor:"pointer",textAlign:"center"}}>⬆️ IMPORTER<input type="file" accept=".json" onChange={e=>{const f=e.target.files?.[0];if(f){const r=new FileReader();r.onload=ev=>{try{const d=JSON.parse(ev.target.result);if(d.sessions)setSessions(d.sessions);if(d.cardioLog)setCardioLog(d.cardioLog);if(d.pr)setPr(d.pr);if(d.goals)setGoals(d.goals);if(d.program)setProgram(d.program);if(d.profile)setProfile(d.profile);if(d.measures)setMeasures(d.measures);if(d.badgeDates)setBadgeDates(d.badgeDates);}catch{}};r.readAsText(f);}}} style={{display:"none"}}/></label>
            </div>
          </div>}
        </div>}

        {showRest&&<RestOverlay onClose={()=>setShowRest(false)} T={T} accent={accent} notifEnabled={notifEnabled}/>}
        {showHIIT&&<HIITOverlay onClose={()=>setShowHIIT(false)} T={T} accent={accent}/>}
      </div>

      {/* NAV */}
      <div style={{background:T.card,borderTop:`1px solid ${T.border}`,display:"flex",flexShrink:0}}>
        {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"8px 1px 6px",border:"none",background:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1,color:tab===t.id?accent:T.muted,transition:"color .12s",position:"relative"}}>
          {tab===t.id&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:18,height:3,background:accent,borderRadius:"0 0 4px 4px"}}/>}
          {t.id==="profil"&&earnedBadgesList.length>0&&<div style={{position:"absolute",top:2,right:"18%",width:5,height:5,background:"#F59E0B",borderRadius:"50%"}}/>}
          <span style={{fontSize:14}}>{t.icon}</span>
          <span style={{fontFamily:"Bebas Neue,sans-serif",fontSize:8,letterSpacing:.4}}>{t.label}</span>
        </button>)}
      </div>
    </div>
  );
}
