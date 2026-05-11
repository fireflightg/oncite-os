// About.jsx — raw .txt window
function About(props) {
  const text = `// about.txt — last edited 02/14 02:00am

oncite

artist · b. somewhere · based nowhere
makes music when the upload goes through.

genre:        unsorted / static / b-side
inspirations: long uploads, dead crts,
              bathroom tile, late buses,
              the moment after the popup closes.

current:      cerebral aura — out 06.06
contact:      message via links.exe
press:        no.

— end of file —`;
  return (
    <Window
      {...props}
      title="about.txt — notepad"
      menubar={["file", "edit", "format", "view", "help"]}
      status={["// read-only", "ascii · 1 of 1", "ln 18, col 14"]}
    >
      <div className="about-body">{text}</div>
    </Window>
  );
}

window.About = About;
