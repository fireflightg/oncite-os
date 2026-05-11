// MusicPlayer.jsx — loads songs.json (uploadthing CDN urls) and plays via <audio>
function MusicPlayer(props) {
  const [tracks, setTracks] = React.useState([]);
  const [playing, setPlaying] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [cur, setCur] = React.useState(0);
  const [dur, setDur] = React.useState(0);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    fetch('songs.json').then(r => r.json()).then(setTracks).catch(() => setTracks([]));
  }, []);

  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) a.play().catch(() => setIsPlaying(false));
    else a.pause();
  }, [isPlaying, playing, tracks]);

  function fmt(s) { if (!isFinite(s)) return '0:00'; return Math.floor(s/60) + ':' + String(Math.floor(s%60)).padStart(2,'0'); }
  const t = tracks[playing] || { title: 'loading…' };
  const progress = dur ? cur / dur : 0;

  return (
    <Window
      {...props}
      title="music.mp3 — oncite player"
      menubar={["file", "edit", "view", "playback", "help"]}
      status={[`// ${tracks.length} tracks`, "44.1 khz · stereo", "vol: 64%"]}
    >
      <div className="mp-cover">
        <span style={{position:'absolute', inset:0, background:`radial-gradient(circle at 30% 30%, rgba(74,120,200,0.3), transparent 60%)`}} />
        <span className="glitch">{t.title}</span>
        <span className="tt">{t.title}</span>
      </div>
      <audio ref={audioRef} src={t.url}
        onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onEnded={() => setPlaying((playing + 1) % Math.max(1, tracks.length))} />
      <div className="mp-controls">
        <button className="mp-btn" onClick={() => setPlaying((playing - 1 + tracks.length) % Math.max(1, tracks.length))}>◄◄</button>
        <button className="mp-btn play" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '❚❚' : '►'}</button>
        <button className="mp-btn" onClick={() => setPlaying((playing + 1) % Math.max(1, tracks.length))}>►►</button>
        <div className="mp-progress" onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const a = audioRef.current; if (a && dur) a.currentTime = ((e.clientX - r.left) / r.width) * dur;
        }}>
          <div className="fill" style={{width: `${progress * 100}%`}} />
        </div>
        <div className="mp-time">{fmt(cur)}</div>
      </div>
      <div className="mp-list">
        {tracks.map((tr, i) => (
          <div key={i} className={"row " + (i === playing ? 'playing' : '')} onClick={() => { setPlaying(i); setIsPlaying(true); }}>
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            <span>{tr.title}</span>
            <span className="d">{fmt(tr.dur || 0)}</span>
          </div>
        ))}
      </div>
    </Window>
  );
}

window.MusicPlayer = MusicPlayer;
