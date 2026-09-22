import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, ChevronDown, Eye, Heart, RotateCcw, Share2 } from 'lucide-react';
import './styles.css';

const colours = [
  { id: 'red', name: 'Heritage Red', hex: '#A9151D', filter: 'none' },
  { id: 'maroon', name: 'Temple Maroon', hex: '#651A28', filter: 'hue-rotate(335deg) saturate(.82) brightness(.70)' },
  { id: 'blue', name: 'Peacock Blue', hex: '#0A5363', filter: 'hue-rotate(155deg) saturate(.8) brightness(.72)' },
  { id: 'emerald', name: 'Emerald', hex: '#205940', filter: 'hue-rotate(105deg) saturate(.62) brightness(.65)' },
  { id: 'midnight', name: 'Midnight', hex: '#25334A', filter: 'hue-rotate(185deg) saturate(.48) brightness(.56)' },
  { id: 'rose', name: 'Lotus Rose', hex: '#B94861', filter: 'hue-rotate(340deg) saturate(.58) brightness(1.08)' },
];
const motifs = [
  { id: 'manga', label: 'Manga Butti', asset: '/assets/motif-manga.png' },
  { id: 'dot', label: 'Zari Dot', asset: '/assets/motif-dot.png' },
  { id: 'lotus', label: 'Lotus Bloom', asset: '/assets/motif-lotus.png' },
];
const borders = [
  { id: 'elephant', label: 'Royal Elephant', asset: '/assets/border-elephant.png' },
  { id: 'mayil', label: 'Mayil', asset: '/assets/border-mayil.png' },
  { id: 'temple', label: 'Temple', asset: '/assets/border-temple.png' },
];
const defaultDesign = { colour: 'red', motif: 'manga', border: 'elephant', previewMode: 'full', updatedAt: 0 };
const STORAGE_KEY = 'rmkv-live-design-v1';

function normalizeDesign(value = {}) {
  return { ...defaultDesign, ...value, previewMode: value.previewMode === 'detail' ? 'detail' : 'full' };
}

function useSharedDesign() {
  const channel = useRef(null);
  const [design, setDesign] = useState(() => {
    try { return normalizeDesign(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
    catch { return defaultDesign; }
  });

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY && event.newValue) setDesign(normalizeDesign(JSON.parse(event.newValue)));
    };
    window.addEventListener('storage', onStorage);
    if ('BroadcastChannel' in window) {
      channel.current = new BroadcastChannel('rmkv-live-design');
      channel.current.onmessage = (event) => setDesign(normalizeDesign(event.data));
    }

    let pollTimer;
    let stopped = false;
    const pullRemoteState = async () => {
      try {
        const response = await fetch('/api/state', { cache: 'no-store' });
        if (!response.ok) return;
        const remote = await response.json();
        if (stopped || !remote?.updatedAt) return;
        setDesign((current) => {
          if (remote.updatedAt <= (current.updatedAt || 0)) return current;
          const next = normalizeDesign(remote);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          return next;
        });
      } catch {
        // Local state remains available when the remote store is not configured.
      }
    };

    if (import.meta.env.PROD) {
      pullRemoteState();
      pollTimer = window.setInterval(pullRemoteState, 900);
    }

    return () => {
      stopped = true;
      window.removeEventListener('storage', onStorage);
      channel.current?.close();
      if (pollTimer) window.clearInterval(pollTimer);
    };
  }, []);

  const update = (patch) => {
    setDesign((current) => {
      const next = { ...current, ...patch, updatedAt: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      channel.current?.postMessage(next);
      if (import.meta.env.PROD) {
        fetch('/api/state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(next),
        }).catch(() => {});
      }
      return next;
    });
  };
  const reset = () => update(defaultDesign);
  return { design, update, reset };
}

function getActive(design) {
  return {
    colour: colours.find((item) => item.id === design.colour) || colours[0],
    motif: motifs.find((item) => item.id === design.motif) || motifs[0],
    border: borders.find((item) => item.id === design.border) || borders[0],
  };
}

function SareeComposite({ design, className = '' }) {
  const { colour, motif, border } = getActive(design);
  return (
    <div className={`saree-wrap ${className}`} style={{ filter: colour.filter }}>
      <img className="saree base-saree" src="/assets/saree-base-flat.png" alt="Customised Kanchipuram silk saree" />
      <img key={motif.id} className="saree-layer motif-layer" src={motif.asset} alt="" />
      <img key={border.id} className={`saree-layer border-image-layer border-${border.id}`} src={border.asset} alt="" />
    </div>
  );
}

function ChoiceCard({ item, selected, onClick, type }) {
  return (
    <button className={`choice-card image-choice ${selected ? 'active' : ''}`} onClick={onClick} aria-pressed={selected}>
      <span className={`choice-art ${type}`}><img src={item.asset} alt="" /></span>
      <span className="choice-name">{item.label}</span>
      {selected && <i className="choice-check"><Check size={12} /></i>}
    </button>
  );
}

function CustomerApp({ design, update, reset }) {
  const { colour, motif, border } = getActive(design);
  const [saved, setSaved] = useState(false);
  const [step, setStep] = useState('colour');
  const progress = { colour: 34, motif: 67, border: 100 }[step];
  const selection = useMemo(() => `${colour.name} / ${motif.label} / ${border.label}`, [colour, motif, border]);
  const detailMode = design.previewMode === 'detail';
  const resetAll = () => { reset(); setStep('colour'); setSaved(false); };
  const openStep = (nextStep) => {
    setStep(nextStep);
    if (nextStep === 'border' && detailMode) update({ previewMode: 'full' });
  };
  const share = async () => {
    const data = { title: 'My RMKV Saree', text: selection, url: location.href };
    if (navigator.share) await navigator.share(data);
    else await navigator.clipboard?.writeText(`${data.text} - ${data.url}`);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div aria-hidden="true" />
        <a className="brand" href="#top" aria-label="RMKV home"><img src="/assets/logo.png" alt="RMKV Wedding Silks" /></a>
        <nav className="top-actions" aria-label="Design actions">
          <button className="text-button" onClick={resetAll}><RotateCcw size={17} /> Reset</button>
          <button className={`icon-button ${saved ? 'saved' : ''}`} onClick={() => setSaved(!saved)} aria-label="Save design"><Heart size={20} fill={saved ? 'currentColor' : 'none'} /></button>
        </nav>
      </header>
      <section className="studio" id="top">
        <div className="preview-column">
          <div className="preview-card">
            <div className="edition">Heritage No. 01</div>
            <div className="saree-stage"><SareeComposite design={design} /></div>
            <div className="preview-caption"><div><span>Your design</span><strong>{selection}</strong></div><button className="icon-button" onClick={share} aria-label="Share design"><Share2 size={19} /></button></div>
          </div>
        </div>
        <div className="customizer">
          <div className="step-header"><span>Craft your saree</span><strong>{Math.round(progress / 33.4)} of 3</strong></div>
          <div className="progress"><span style={{ width: `${progress}%` }} /></div>
          <section className={`control-section ${step === 'colour' ? 'open' : ''}`}>
            <button className="section-title" onClick={() => openStep('colour')}><span><i>01</i> Silk colour</span><ChevronDown size={19} /></button>
            <div className="section-body"><h2>{colour.name}</h2><div className="swatches">{colours.map((item) => <button key={item.id} className={`swatch ${colour.id === item.id ? 'active' : ''}`} style={{ '--swatch': item.hex }} onClick={() => update({ colour: item.id })} aria-label={item.name}>{colour.id === item.id && <Check size={16} />}</button>)}</div></div>
          </section>
          <section className={`control-section ${step === 'motif' ? 'open' : ''}`}>
            <button className="section-title" onClick={() => openStep('motif')}><span><i>02</i> Body motif</span><ChevronDown size={19} /></button>
            <div className="section-body">
              <div className="choice-grid">{motifs.map((item) => <ChoiceCard key={item.id} item={item} selected={motif.id === item.id} onClick={() => update({ motif: item.id, previewMode: 'full' })} type="motif" />)}</div>
              <div className="motif-detail-actions">
                <button className={`motif-detail-card ${detailMode ? 'active' : ''}`} onClick={() => update({ previewMode: 'detail' })} aria-pressed={detailMode}>
                  <span className="motif-detail-art" style={{ '--motif-image': `url(${motif.asset})` }} />
                  <span><Eye size={18} /> {detailMode ? 'Showing motif detail' : 'View motif detail'}</span>
                </button>
                {detailMode && <button className="return-saree" onClick={() => update({ previewMode: 'full' })}>Return to saree</button>}
              </div>
            </div>
          </section>
          <section className={`control-section ${step === 'border' ? 'open' : ''}`}>
            <button className="section-title" onClick={() => openStep('border')}><span><i>03</i> Zari border</span><ChevronDown size={19} /></button>
            <div className="section-body"><div className="choice-grid">{borders.map((item) => <ChoiceCard key={item.id} item={item} selected={border.id === item.id} onClick={() => update({ border: item.id, previewMode: 'full' })} type="border" />)}</div></div>
          </section>
          <button className="primary-button" onClick={() => setSaved(true)}>{saved ? <><Check size={19} /> Design saved</> : 'Complete my saree'}</button>
          <p className="craft-note">Every selection is woven into a singular RMKV design.</p>
        </div>
      </section>
    </main>
  );
}

function LiveApp({ design }) {
  const { colour, motif, border } = getActive(design);
  const detailMode = design.previewMode === 'detail';

  if (detailMode) {
    return (
      <main className="mapping-output live-detail-view" style={{ '--live-colour': colour.hex }}>
        <div className="live-detail-piece" style={{ '--motif-image': `url(${motif.asset})` }} role="img" aria-label={`${motif.label} motif detail`} />
      </main>
    );
  }

  return (
    <main className="mapping-output live-fabric" style={{ '--live-colour': colour.hex }}>
      <img className="live-motif-layer" src={motif.asset} alt="" />
      <div className="live-border live-border-left">
        <img src={border.asset} alt="" style={{ filter: colour.filter }} />
      </div>
      <div className="live-border live-border-right">
        <img src={border.asset} alt="" style={{ filter: colour.filter }} />
      </div>
    </main>
  );
}

function App() {
  const shared = useSharedDesign();
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/live') return <LiveApp design={shared.design} />;
  return <CustomerApp {...shared} />;
}

createRoot(document.getElementById('root')).render(<App />);
