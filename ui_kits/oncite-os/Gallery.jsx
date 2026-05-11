// Gallery.jsx — file-explorer style image viewer
const PHOTOS = [
  { src: "../../assets/refs/fisheye-portrait.png",   name: "fisheye_001.jpg" },
  { src: "../../assets/refs/black-suit-streetlight.png", name: "streetlight.jpg" },
  { src: "../../assets/refs/black-stairs.jpg",       name: "stairs.jpg" },
  { src: "../../assets/refs/area-graffiti-sink.png", name: "area_sink.jpg" },
  { src: "../../assets/refs/blue-tile-bathroom.png", name: "blue_tile.jpg" },
  { src: "../../assets/refs/lounge-couch.jpg",       name: "lounge.jpg" },
  { src: "../../assets/refs/photoshoot-studio.png",  name: "studio_apr15.jpg" },
  { src: "../../assets/refs/sony-camera-back.png",   name: "a7iii_disp.jpg" },
  { src: "../../assets/refs/bsod-silhouette.png",    name: "0xf1534.jpg" },
];

function Gallery(props) {
  const [open, setOpen] = React.useState(null);
  return (
    <Window
      {...props}
      title={"visuals/ — " + PHOTOS.length + " items"}
      menubar={["file", "edit", "view", "go", "favorites"]}
      status={[`// ${PHOTOS.length} files`, "free: 4.2 gb", "view: thumbs"]}
    >
      <div className="gal-toolbar">
        <span className="active">thumbs</span>
        <span>list</span>
        <span>details</span>
        <span style={{marginLeft: 'auto'}}>↕ name</span>
      </div>
      <div className="gal-grid">
        {PHOTOS.map((p, i) => (
          <div key={i} className="gal-thumb"
               style={{backgroundImage: `url(${p.src})`}}
               onClick={() => setOpen(p)}>
            <span>{p.name}</span>
          </div>
        ))}
      </div>
      {open && (
        <div className="gal-viewer" onClick={() => setOpen(null)}>
          <img src={open.src} alt="" />
          <button className="close" onClick={() => setOpen(null)}>close · esc</button>
        </div>
      )}
    </Window>
  );
}

window.Gallery = Gallery;
