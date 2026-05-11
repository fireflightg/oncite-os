// HeartSetup.jsx — secret BIOS "setup" screen reached by pressing DEL during boot.
// Pixel heart you can patch with bandaids on click.

const HEART = [
  "..XXXX...XXXX..",
  ".XXXXXX.XXXXXX.",
  "XXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXX",
  ".XXXXXXXXXXXXX.",
  "..XXXXXXXXXXX..",
  "...XXXXXXXXX...",
  "....XXXXXXX....",
  ".....XXXXX.....",
  "......XXX......",
  ".......X.......",
];

function HeartSetup({ onExit }) {
  const [bandaids, setBandaids] = React.useState([]);
  const cells = [];
  HEART.forEach((row, y) => {
    [...row].forEach((c, x) => { if (c === 'X') cells.push({ x, y }); });
  });

  function place(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    setBandaids([...bandaids, { x, y, r: Math.random() * 0.6 + 0.7, rot: Math.random() * 60 - 30 }]);
  }

  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' || e.key === 'F10') onExit();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExit]);

  return (
    <div className="boot bios setup-screen">
      <div className="setup-bar">oncite_setup — heart maintenance utility · v0.1</div>
      <div className="setup-grid">
        <div className="setup-help">
          <pre className="bios-screen" style={{margin: 0}}>{
`status ............ damaged
warnings .......... 14
suggested action .. apply bandaid

instructions:
  click on the heart to
  apply a bandaid.
  more is better.
  (it never really heals.)

[esc] return to boot
[f10] save and exit`
          }</pre>
        </div>
        <div className="setup-heart-wrap">
          <div className="setup-heart" onClick={place}>
            {cells.map((p, i) => (
              <div key={i} className="hcell"
                   style={{ left: (p.x / 15) * 100 + '%', top: (p.y / 13) * 100 + '%' }} />
            ))}
            {bandaids.map((b, i) => (
              <div key={'b' + i} className="hband"
                   style={{ left: b.x * 100 + '%', top: b.y * 100 + '%',
                            transform: `translate(-50%,-50%) rotate(${b.rot}deg) scale(${b.r})` }} />
            ))}
            <div className="hbeat" />
          </div>
          <div className="setup-count">{bandaids.length.toString().padStart(2,'0')} bandaid{bandaids.length===1?'':'s'} applied</div>
          {bandaids.length > 0 && (
            <button className="setup-reset" onClick={() => setBandaids([])}>reset</button>
          )}
        </div>
      </div>
      <div className="setup-footer">{'>'} f10 = save and exit · esc = back</div>
    </div>
  );
}

window.HeartSetup = HeartSetup;
