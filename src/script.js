const navLinks = [
  {
    name: "Home",
    link: "./",
  },
  {
    name: "About",
    link: "./about",
  },
  {
    name: "Work+Research",
    link: "./work-research",
  },
  {
    name: "Projects",
    link: "./projects",
  },
];

function insertNavbar(navLinks) {
  const ulTag = document.createElement("ul");

  navLinks.map((link) => {
    const linkTag = document.createElement("a");
    linkTag.href = link.link;
    linkTag.textContent = link.name;
    const liTag = document.createElement("li");
    liTag.appendChild(linkTag);
    ulTag.appendChild(liTag);
  });

  const navTag = document.getElementsByTagName("nav")[0];
  navTag.appendChild(ulTag);
}

function highlightActiveNav() {
  const activePath = window.location.pathname;

  const liTags = document
    .getElementsByTagName("nav")[0]
    .getElementsByTagName("ul")[0]
    .getElementsByTagName("li");

  Array.from(liTags).map((liTag) => {
    const linkTag = liTag.getElementsByTagName("a")[0];
    if (cleanPath(linkTag.href) === activePath)
      linkTag.style = "border: 4px inset rgb(65,108,109)";
  });
}

function cleanPath(path) {
  const cleanedPath = path.replace("http://", "");
  return cleanedPath.substring(cleanedPath.indexOf("/"), cleanedPath.length);
}

insertNavbar(navLinks);
highlightActiveNav();
