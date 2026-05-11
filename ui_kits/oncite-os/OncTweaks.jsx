// OncTweaks.jsx — Tweaks panel for oncite_os
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#0b4dd6",
  "wallpaper": "white",
  "iconStyle": "photo",
  "showMark": true,
  "scanlines": true,
  "titleStyle": "gradient",
  "wordmark": "oncite"
}/*EDITMODE-END*/;

function OncTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--onc-accent', t.accent);
    const wallBg = t.wallpaper === 'white' ? '#ffffff'
      : t.wallpaper === 'silver' ? '#c0c0c0'
      : t.wallpaper === 'teal'   ? '#3a6a78'
      : '#000000';
    r.style.setProperty('--onc-wall', wallBg);
    r.style.setProperty('--onc-wall-fg', t.wallpaper === 'black' ? '#fff' : '#000');
    r.style.setProperty('--onc-mark-vis', t.showMark ? '1' : '0');
    r.style.setProperty('--onc-scan-vis', t.scanlines ? '1' : '0');
    document.body.dataset.iconStyle = t.iconStyle;
    document.body.dataset.titleStyle = t.titleStyle;
    const mark = document.querySelector('.os-wallpaper-mark');
    if (mark) mark.textContent = t.wordmark || '';
  }, [t]);

  return (
    <TweaksPanel title="tweaks">
      <TweakSection label="theme" />
      <TweakColor label="accent" value={t.accent}
        options={['#0b4dd6','#1d2dc7','#cf3a2e','#3a6a78','#000000']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakRadio label="title bar" value={t.titleStyle}
        options={['gradient','flat','mono']}
        onChange={(v) => setTweak('titleStyle', v)} />

      <TweakSection label="desktop" />
      <TweakRadio label="wallpaper" value={t.wallpaper}
        options={['white','silver','teal','black']}
        onChange={(v) => setTweak('wallpaper', v)} />
      <TweakToggle label="scanlines" value={t.scanlines}
        onChange={(v) => setTweak('scanlines', v)} />
      <TweakToggle label="show wordmark" value={t.showMark}
        onChange={(v) => setTweak('showMark', v)} />
      <TweakText label="wordmark text" value={t.wordmark}
        onChange={(v) => setTweak('wordmark', v)} />

      <TweakSection label="icons" />
      <TweakRadio label="icon style" value={t.iconStyle}
        options={['photo','pixel','flat']}
        onChange={(v) => setTweak('iconStyle', v)} />
    </TweaksPanel>
  );
}

window.OncTweaks = OncTweaks;
