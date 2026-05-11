// WindowChrome.jsx — shared window/popup primitives for oncite-os
const { useState, useRef, useEffect } = React;

function Window({ title, status, menubar, x, y, w, h, z, active, onFocus, onClose, children }) {
  const [pos, setPos] = useState({ x, y });
  const dragRef = useRef(null);
  function onMouseDown(e) {
    onFocus && onFocus();
    const sx = e.clientX, sy = e.clientY;
    const ox = pos.x, oy = pos.y;
    function move(ev) { setPos({ x: ox + ev.clientX - sx, y: oy + ev.clientY - sy }); }
    function up() { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  }
  return (
    <div className="win" style={{ left: pos.x, top: pos.y, width: w, height: h, zIndex: z }} onMouseDown={onFocus}>
      <div className={"win-title " + (active ? "" : "inactive")} onMouseDown={onMouseDown} ref={dragRef}>
        <span className="name">{title}</span>
        <span className="ctl-grp">
          <span className="ctl min" onClick={(e) => { e.stopPropagation(); }}><i>_</i></span>
          <span className="ctl" onClick={(e) => { e.stopPropagation(); }}>□</span>
          <span className="ctl" onClick={(e) => { e.stopPropagation(); onClose && onClose(); }}>×</span>
        </span>
      </div>
      {menubar && (
        <div className="win-menubar">
          {menubar.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      )}
      <div className="win-body">{children}</div>
      {status && <div className="win-status">{status.map((s,i) => <span key={i}>{s}</span>)}</div>}
    </div>
  );
}

function Popup({ title, kind = 'rust', body, actions, onClose, x = 320, y = 180 }) {
  return (
    <div className="popup" style={{ left: x, top: y }}>
      <div className={"title " + (kind === 'bsod' ? 'bsod' : '')}>
        <span className="name">{title}</span>
        <span className="x" onClick={onClose}>×</span>
      </div>
      <div className="body">
        <div className="ic" style={kind === 'bsod' ? { background: '#1d2dc7', color: 'var(--bone)', borderColor: 'var(--bone)' } : null}>
          {kind === 'bsod' ? '×' : '!'}
        </div>
        <div>{body}</div>
      </div>
      <div className="actions">
        {(actions || [{label: 'ok', onClick: onClose}]).map((a, i) => (
          <button className="btn" key={i} onClick={a.onClick}>{a.label}</button>
        ))}
      </div>
    </div>
  );
}

window.Window = Window;
window.Popup = Popup;
