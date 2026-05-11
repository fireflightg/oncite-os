// Memories.jsx — typewriter notes window
function Memories(props) {
  return (
    <Window
      {...props}
      title="memories/ — untitled.txt"
      menubar={["file", "edit", "format", "view"]}
      status={["// note 04 of 11", "modified 04/12 03:41", "unsaved"]}
    >
      <div className="mem-body">
        <p>04/12 — 03:41</p>
        <p>i don't deserve anything i want</p>
        <p>i'm not better enough yet please stay</p>
        <p>i am trying for u</p>
        <p className="strike">i can't try anymore this hurts just go</p>
        <p className="faded">— deleted at 03:43</p>
        <p style={{height: 8}}>&nbsp;</p>
        <p className="center">me + u = ♡</p>
        <p className="center">me − u = :(</p>
        <p style={{height: 14}}>&nbsp;</p>
        <p className="faded">// note 003 — recovered from cache</p>
        <p>the upload finally went through. ok.</p>
      </div>
    </Window>
  );
}

window.Memories = Memories;
