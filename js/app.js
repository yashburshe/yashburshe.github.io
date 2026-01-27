async function init() {
  const response = await fetch("data/skills.json");
  const skills = await response.json();
  addSkills(skills);
}

function addSkills(skills) {
  const container = document.getElementById("skill-graph");
  const gridWrapper = document.createElement("div");
  gridWrapper.id = "skill-grid-container";

  skills.forEach((skill) => {
    const card = document.createElement("div");
    card.className = "skill-card";

    const front = document.createElement("div");
    front.className = "skill-front";

    const img = document.createElement("img");
    img.src = skill.icon;
    img.alt = skill.name;
    img.className = "skill-icon";

    front.appendChild(img);

    const overlay = document.createElement("div");
    overlay.className = "skill-overlay";

    const overlayTitle = document.createElement("h3");
    overlayTitle.textContent = skill.name;

    const descText = document.createElement("p");
    descText.textContent = skill.desc;

    overlay.appendChild(overlayTitle);
    overlay.appendChild(descText);

    card.appendChild(front);
    card.appendChild(overlay);
    gridWrapper.appendChild(card);
  });

  container.appendChild(gridWrapper);
}

init();
