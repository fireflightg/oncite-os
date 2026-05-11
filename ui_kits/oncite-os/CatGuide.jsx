// CatGuide.jsx — pixel cat in the corner with reactive speech bubble
const QUIPS = {
  'icon:music':   ["six tracks. you've heard 'em all.", "press play. or don't. i'm not your mom.", "another listen? bold.", "this one's mid. send help."],
  'icon:photos':  ["you've already seen these.", "ctrl+click does nothing. stop trying.", "yes the photos are blurry on purpose.", "art. allegedly."],
  'icon:memory':  ["this folder is mostly regret.", "don't open this one sober.", "the .txt files are crying.", "literally just feelings.zip"],
  'icon:about':   ["it's literally just my name.", "wow you really wanted to know huh", "spoiler: i make music sometimes", "imagine reading an about file."],
  'icon:links':   ["clicking these opens a new tab. shocking.", "follow me, coward.", "spotify? on a tuesday?", "the arrow means it leaves. amazing."],

  'win:music':    ["the music is fine. you are tired.", "skip button is right there friend", "is the bass kicking? are you?", "headphones on. ego off."],
  'win:photos':   ["yes that's me. it's always me.", "every photo. me. crazy right?", "i blink for the camera. revolutionary.", "yes i own one outfit."],
  'win:memory':   ["close this. you're stalling.", "the past is not load-bearing.", "you said you wouldn't open this one.", "we agreed: no nostalgia before noon."],
  'win:about':    ["you really opened a .txt file in 2026", "this is the lore. drink it in.", "spoiler: i'm a cat with internet access."],
  'win:links':    ["external. links. wow.", "the arrow means it leaves. amazing.", "click it. i dare you.", "fine. follow me. weirdo."],

  'btn:start':    ["nothing happens. like windows me.", "click harder, it'll matter eventually", "start what. a fight?", "the start button. famously useful."],
  'btn:close':    ["bye then.", "rude.", "wow okay", "leaving so soon? coward.", "this is fine. don't worry about me."],
  'btn:min':      ["minimizing won't fix anything.", "out of sight, still your problem.", "hide me. classic.", "you can't shrink your way out of this."],
  'btn:max':      ["bigger ≠ better.", "this won't help.", "fullscreen me. i dare you.", "yes. make it worse."],

  'btn:play':     ["finally. some audio.", "yes. press the music button. on the music app.", "playback engaged. hubris detected.", "loud is the only volume."],
  'btn:pause':    ["coward.", "you can take it. press play.", "buffering on purpose", "needed a moment? same."],
  'btn:next':     ["next song is also a song.", "skip skip skip. lame.", "running from the music huh"],
  'btn:prev':     ["going backwards. classic move.", "rewinding feelings won't work.", "play it again, sam. (don't.)"],
  'btn:prog':     ["scrubbing is for cowards.", "seek with intention.", "fast forward through the boring part. relatable."],

  'tray:clock':   ["the clock. it tells time.", "it's later than you think.", "tick tock. you're old now."],
  'tray:task':    ["that's a window. you opened it. hi.", "task. bar. tasking. barring.", "clicking this brings it back. magic."],
  'taskbar':      ["the taskbar. it does tasks. wow.", "click something already"],

  'drag':         ["wheeeee", "moving day", "dragging me too far. literally.", "stop dragging me into this.", "where are we going. i'm a window not a horse.", "PUT ME DOWN", "yes drag the window. the cure for all ailments."],

  'menubar':      ["it's a menu bar. of menus.", "file, edit, view. the holy trinity.", "you won't open this. nobody does."],
  'status':       ["the status bar. it has status.", "44.1 khz. trust the numbers."],

  'mark':         ["that's me. oncite. don't wear it out.", "yes the logo is huge. on purpose.", "branding. it's branding."],
  'cat':          ["pet me and i bite.", "what do you want", "yes hi hello", "i'm the cat. i live here."],
  'desktop':      ["it's empty out here. like inside my head.", "double click an icon. that's the whole game.", "hover for thoughts. click for chaos."],
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function CatGuide() {
  const [msg, setMsg] = React.useState(pick(QUIPS['desktop']));
  const [visible, setVisible] = React.useState(true);
  const [dragging, setDragging] = React.useState(false);
  const lastKey = React.useRef(null);

  function findKey(el) {
    let n = el;
    while (n && n !== document.body) {
      if (n.dataset && n.dataset.quip) return n.dataset.quip;
      if (n.classList) {
        if (n.classList.contains('cg-cat') || n.classList.contains('cg-bubble')) return 'cat';
        if (n.classList.contains('dt-icon')) {
          const ic = ['music','photos','memory','about','links'].find(x => n.classList.contains(x));
          if (ic) return 'icon:' + ic;
        }
        if (n.classList.contains('start')) return 'btn:start';
        if (n.classList.contains('task'))  return 'tray:task';
        if (n.classList.contains('clock')) return 'tray:clock';
        if (n.classList.contains('taskbar')) return 'taskbar';
        if (n.classList.contains('mp-btn')) {
          if (n.classList.contains('play')) {
            // play vs pause based on glyph
            const txt = (n.textContent || '').trim();
            return txt.includes('❚') ? 'btn:pause' : 'btn:play';
          }
          const txt = (n.textContent || '').trim();
          if (txt.startsWith('◄')) return 'btn:prev';
          if (txt.startsWith('►')) return 'btn:next';
        }
        if (n.classList.contains('mp-progress')) return 'btn:prog';
        if (n.classList.contains('ctl')) {
          if (n.classList.contains('min')) return 'btn:min';
          const txt = (n.textContent || '').trim();
          if (txt === '×') return 'btn:close';
          if (txt === '□') return 'btn:max';
        }
        if (n.classList.contains('x') && n.parentNode && n.parentNode.classList && n.parentNode.classList.contains('title')) return 'btn:close';
        if (n.classList.contains('win-menubar')) return 'menubar';
        if (n.classList.contains('win-status')) return 'status';
        if (n.classList.contains('win-title')) {
          // identified later via parent .win
        }
        if (n.classList.contains('win') || n.classList.contains('popup')) {
          const tt = n.querySelector('.win-title .name, .title .name');
          const ttl = tt ? tt.textContent.toLowerCase() : '';
          if (ttl.includes('music'))    return 'win:music';
          if (ttl.includes('visuals'))  return 'win:photos';
          if (ttl.includes('memor'))    return 'win:memory';
          if (ttl.includes('about'))    return 'win:about';
          if (ttl.includes('links'))    return 'win:links';
        }
        if (n.classList.contains('os-wallpaper-mark')) return 'mark';
      }
      n = n.parentNode;
    }
    return 'desktop';
  }

  function setKey(key, force) {
    if (!force && key === lastKey.current) return;
    lastKey.current = key;
    const opts = QUIPS[key] || QUIPS['desktop'];
    setMsg(pick(opts));
  }

  React.useEffect(() => {
    function onMove(e) {
      if (dragging) return; // drag has its own message
      setKey(findKey(e.target));
    }
    function onDown(e) {
      let n = e.target;
      while (n && n !== document.body) {
        if (n.classList && n.classList.contains('win-title')) {
          setDragging(true);
          setKey('drag', true);
          // rotate quip mid-drag
          const id = setInterval(() => setMsg(pick(QUIPS['drag'])), 1100);
          function up() {
            clearInterval(id);
            setDragging(false);
            window.removeEventListener('mouseup', up);
          }
          window.addEventListener('mouseup', up);
          return;
        }
        n = n.parentNode;
      }
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
    };
  }, [dragging]);

  if (!visible) return null;

  return (
    <div className="cat-guide">
      <div className="cg-bubble">
        <span className="cg-x" onClick={() => setVisible(false)}>×</span>
        <div className="cg-msg">{msg}</div>
        <div className="cg-tail" />
      </div>
      <div className="cg-cat" />
    </div>
  );
}

window.CatGuide = CatGuide;
