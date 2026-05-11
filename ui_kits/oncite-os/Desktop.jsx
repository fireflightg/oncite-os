// Desktop.jsx — wallpaper, icon grid, taskbar, window manager
const { useState, useEffect } = React;

const APPS = [
  { id: 'music',   name: 'music.mp3',  cls: 'music',  img: '../../assets/refs/fisheye-portrait.png',       Comp: () => window.MusicPlayer, def: { x: 280, y: 70,  w: 380, h: 540 } },
  { id: 'photos',  name: 'visuals/',   cls: 'photos', img: '../../assets/refs/black-suit-streetlight.png', Comp: () => window.Gallery,     def: { x: 480, y: 130, w: 460, h: 480 } },
  { id: 'memory',  name: 'memories/',  cls: 'memory', img: '../../assets/refs/black-stairs.jpg',           Comp: () => window.Memories,    def: { x: 740, y: 90,  w: 360, h: 420 } },
  { id: 'about',   name: 'about.txt',  cls: 'about',  img: '../../assets/refs/photoshoot-studio.png',      Comp: () => window.About,       def: { x: 200, y: 200, w: 400, h: 380 } },
  { id: 'links',   name: 'links.exe',  cls: 'links',  img: '../../assets/refs/sony-camera-back.png',       Comp: () => window.Links,       def: { x: 820, y: 220, w: 320, h: 300 } },
];

function Clock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000 * 30); return () => clearInterval(id); }, []);
  const hh = String(t.getHours()).padStart(2,'0');
  const mm = String(t.getMinutes()).padStart(2,'0');
  return <div className="clock">{hh}:{mm}<span>oncite_os v0.6</span></div>;
}

function Desktop() {
  const [open, setOpen] = useState([{ id: 'music', z: 1 }]);
  const [zTop, setZTop] = useState(2);
  const [popup, setPopup] = useState(null);
  const [selected, setSelected] = useState(null);
  const [booted, setBooted] = useState(false);
  const [peek, setPeek] = useState(null);

  useEffect(() => {
    if (!booted) return;
    const t = setTimeout(() => setPopup({
      title: '⚠ welcome.exe',
      kind: 'rust',
      body: <span>this is oncite_os.<br/>nothing here is real. you can click around.<br/>click an icon to open it.</span>,
      actions: [{ label: 'ok', onClick: () => setPopup(null) }],
    }), 700);
    return () => clearTimeout(t);
  }, [booted]);

  function focus(id) {
    setOpen(prev => prev.map(w => w.id === id ? { ...w, z: zTop } : w));
    setZTop(zTop + 1);
  }
  function openApp(id) {
    setSelected(id);
    if (open.find(w => w.id === id)) { focus(id); return; }
    setOpen([...open, { id, z: zTop }]);
    setZTop(zTop + 1);
  }
  function closeApp(id) { setOpen(open.filter(w => w.id !== id)); }

  const PEEKS = {
    music:  '../../assets/refs/fisheye-portrait.png',
    photos: '../../assets/refs/black-suit-streetlight.png',
    memory: '../../assets/refs/black-stairs.jpg',
    about:  '../../assets/refs/photoshoot-studio.png',
    links:  '../../assets/refs/sony-camera-back.png',
  };

  return (
    <div className="os-root">
      {!booted && <window.BootScreen onDone={() => setBooted(true)} />}
      <div className="os-wallpaper" />
      <div className={"os-wallpaper-peek " + (peek ? 'on' : '')}
           style={{backgroundImage: peek ? `url(${PEEKS[peek]})` : 'none'}} />
      <div className="os-wallpaper-mark">oncite</div>

      <div className="icon-grid">
        {APPS.map(a => (
          <div key={a.id} className={"dt-icon " + a.cls + (selected === a.id ? ' sel' : '')}
               onClick={() => setSelected(a.id)}
               onMouseEnter={() => setPeek(a.id)}
               onMouseLeave={() => setPeek(null)}
               onDoubleClick={() => openApp(a.id)}>
            <div className="glyph" style={{backgroundImage: `url(${a.img})`}} />
            <div className="lbl">{a.name}</div>
          </div>
        ))}
      </div>

      {open.map(w => {
        const app = APPS.find(a => a.id === w.id);
        const Comp = app.Comp();
        if (!Comp) return null;
        return (
          <Comp key={w.id}
            x={app.def.x} y={app.def.y} w={app.def.w} h={app.def.h}
            z={w.z} active={w.z === zTop - 1}
            onFocus={() => focus(w.id)} onClose={() => closeApp(w.id)} />
        );
      })}

      {popup && <Popup {...popup} />}

      {window.CatGuide && <window.CatGuide />}
      {window.OncTweaks && <window.OncTweaks />}

      <div className="taskbar">
        <div className="start" onClick={() => openApp('about')}>oncite</div>
        <div className="tasks">
          {open.map(w => {
            const app = APPS.find(a => a.id === w.id);
            return (
              <div key={w.id} className={"task " + (w.z === zTop - 1 ? 'active' : '')}
                   onClick={() => focus(w.id)}>
                {app.name}
              </div>
            );
          })}
        </div>
        <Clock />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Desktop />);
