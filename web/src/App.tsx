import { useState, useCallback, useEffect } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const STYLES = ['Modern', 'Classic', 'Playful', 'Elegant', 'Bold', 'Minimal', 'Vintage', 'Tech'];

function FontPage() {
  const [text, setText] = useState('Your Brand Name'); const [style, setStyle] = useState('Modern');
  const [loading, setLoading] = useState(false); const [fonts, setFonts] = useState<any[]>([]);
  const generate = useAction(api.ai.generateFonts); const save = useMutation(api.functions.saveGeneration);

  useEffect(() => {
    if (fonts.length === 0) return;
    const names = fonts.map((f: any) => f.name).join('|').replace(/ /g, '+');
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${names}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [fonts]);

  const handleGenerate = useCallback(async () => {
    if (!text.trim()) return; setLoading(true);
    try {
      const r = await generate({ inputText: text.trim(), style }); setFonts(r.fonts || []); await save({ inputText: text, style, fonts: r.fonts || [] });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [text, style, generate, save]);

  return (
    <div className="mc"><div className="pg">
      <h1 className="title">Find Your <span className="a">Font</span></h1>
      <p className="sub">Type your text and get AI-curated Google Font suggestions with live previews.</p>
      <input className="inp" value={text} onChange={e => setText(e.target.value)} placeholder="Type your text here..." />
      <div className="chips">{STYLES.map(s => <button key={s} className={`chip ${style === s ? 'sel' : ''}`} onClick={() => setStyle(s)}>{s}</button>)}</div>
      <button className="btn" disabled={!text.trim() || loading} onClick={handleGenerate}>{loading ? '⏳ Finding...' : '🔤 Generate Fonts'}</button>
      {loading && <div className="ld"><span /><span /><span /></div>}
      {fonts.length > 0 && !loading && fonts.map((f: any, i: number) => (
        <div key={i} className="font-card">
          <div className="font-name"><span>{f.name}</span><span className="font-cat">{f.category}</span></div>
          <div className="font-preview" style={{ fontFamily: `'${f.name}', sans-serif` }}>{text}</div>
          <div className="font-css">{f.css}</div>
        </div>
      ))}
    </div></div>
  );
}

function App() {
  return (<BrowserRouter><div className="app">
    <header className="hdr"><a href="/"><span style={{ fontSize: '1.5rem' }}>🔤</span><div><h1>Fontgenerator</h1></div></a></header>
    <Routes><Route path="/" element={<FontPage />} /></Routes>
    <footer className="ftr">© {new Date().getFullYear()} Fontgenerator — An AVS Media App.</footer>
  </div></BrowserRouter>);
}
export default App;
