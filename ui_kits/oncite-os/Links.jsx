// Links.jsx — small popup window
const LINKS = [
  { lg: "♫", label: "spotify",     url: "https://open.spotify.com/artist/5I6XC9NLe7olIUzIZmUA6B?si=7hcKfUvCSq-2W4ovIu__wA" },
  { lg: "▶", label: "apple music", url: "https://music.apple.com/us/artist/oncite/1608202664" },
  { lg: "@", label: "instagram",   url: "https://www.instagram.com/0ncite/" },
  { lg: "t", label: "tiktok",      url: "https://www.tiktok.com/@notoncite" },
  { lg: "→", label: "soundcloud",  url: "https://soundcloud.com/oncite/tracks" },
  { lg: "✉", label: "email — booking only", url: "mailto:onncite@gmail.com" },
];

function Links(props) {
  return (
    <Window
      {...props}
      title="links.exe"
      status={[`// ${LINKS.length} destinations`, "all ext.", "no tracking"]}
    >
      <div className="links-body">
        {LINKS.map((l, i) => (
          <a className="link-row" key={i} href={l.url} target="_blank" rel="noopener noreferrer">
            <span className="lg">{l.lg}</span>
            <span>{l.label}</span>
            <span className="arrow">↗</span>
          </a>
        ))}
      </div>
    </Window>
  );
}

window.Links = Links;
