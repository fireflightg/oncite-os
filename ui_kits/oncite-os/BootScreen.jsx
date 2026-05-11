// BootScreen.jsx — BIOS text boot → linux-style progress bar → fade
const { useEffect: useBootEffect, useState: useBootState } = React;

const BIOS_LINES = [
  'oncite_os bios v2.04.r1 · (c) 2026',
  'main processor: pentium III 866mhz',
  'memory test : 524288k ok',
  '',
  'detecting ide drives ...',
  '  primary master  : oncite_disk_0  [38.4 gb]',
  '  primary slave   : none',
  '  secondary master: cdrom unit',
  '',
  'usb devices: 2 found',
  'pci scan ...... done',
  '',
  'loading kernel ......... ok',
  'mounting /memories ..... ok',
  'mounting /visuals  ..... ok',
  'mounting /music    ..... ok',
  'mounting /her      ..... partial',
  '  warn: signal unstable. felt real anyway.',
  'mounting /people   ..... 3/12 verified',
  '  warn: 9 instances flagged simulated.',
  'reality check ......... fail',
  '  retrying ........... fail',
  '  retrying ........... no longer caring',
  'isolation daemon ...... running (pid 0001)',
  'overthinking service .. running (high cpu)',
  'starting oncite_shell ..',
  '',
  'looking for something real ...',
  'press DEL to enter setup',
  '',
];

const STAGES = [
  'unpacking initramfs',
  'starting udev',
  'mounting /dev/onc0',
  'loading audio modules',
  'starting oncite_shell',
];

function BootScreen({ onDone }) {
  const [phase, setBootPhase] = useBootState('bios'); // bios -> load -> fade -> done -> setup
  const [biosShown, setBiosShown] = useBootState(0);
  const [pct, setPct] = useBootState(0);

  // DEL → secret setup screen
  useBootEffect(() => {
    function onKey(e) {
      if ((e.key === 'Delete' || e.code === 'Delete') && (phase === 'bios' || phase === 'load')) {
        setBootPhase('setup');
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  useBootEffect(() => {
    if (phase !== 'bios') return;
    if (biosShown >= BIOS_LINES.length) {
      const t = setTimeout(() => setBootPhase('load'), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBiosShown(n => n + 1), biosShown < 3 ? 180 : 90);
    return () => clearTimeout(t);
  }, [phase, biosShown]);

  useBootEffect(() => {
    if (phase !== 'load') return;
    if (pct >= 100) {
      const t1 = setTimeout(() => setBootPhase('fade'), 500);
      const t2 = setTimeout(() => { setBootPhase('done'); onDone && onDone(); }, 1000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    const t = setTimeout(() => setPct(p => Math.min(100, p + (Math.random() * 7 + 2))), 80);
    return () => clearTimeout(t);
  }, [phase, pct]);

  if (phase === 'done') return null;

  if (phase === 'setup') {
    return <window.HeartSetup onExit={() => setBootPhase('bios')} />;
  }

  if (phase === 'bios') {
    return (
      <div className="boot bios">
        <pre className="bios-screen">{BIOS_LINES.slice(0, biosShown).join('\n') + (biosShown < BIOS_LINES.length ? '\n_' : '')}</pre>
      </div>
    );
  }

  // linux-style text progress bar
  const p = Math.floor(pct);
  const width = 40;
  const filled = Math.floor((p / 100) * width);
  const bar = '#'.repeat(filled) + '.'.repeat(width - filled);
  const stageIdx = Math.min(STAGES.length - 1, Math.floor((p / 100) * STAGES.length));
  const stage = STAGES[stageIdx];

  return (
    <div className={"boot bios " + (phase === 'fade' ? 'fade' : '')}>
      <pre className="bios-screen">
{BIOS_LINES.join('\n')}
[ {stage.padEnd(28, ' ')} ] [{bar}] {String(p).padStart(3, ' ')}%
      </pre>
    </div>
  );
}

window.BootScreen = BootScreen;
