// System Variables
let fileSystem = null;
let currentPath = [];

// DOM Elements
const historyDiv = document.getElementById("history");
const cmdInput = document.getElementById("cmd-input");
const promptText = document.getElementById("prompt-text");
const terminalContainer = document.getElementById("terminal-container");
const inputLine = document.getElementById("input-line");

// --- 1. INITIALIZATION: AJAX ---
function init() {
  printLine("Initializing AJAX request...", "text-secondary");

  var xhr = new XMLHttpRequest();
  // Ensure this path matches your actual JSON file location
  xhr.open("GET", "data/terminal-info.json", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          fileSystem = JSON.parse(xhr.responseText);
          printLine("System loaded successfully.", "text-success");
          printLine(
            "This is an AI generated part of the website using Google's Gemini 3 Pro",
            "text-info fw-bold",
          );
          printLine("Type 'help' to see available commands.", "text-secondary");
          printLine(
            "Type 'back' to return to the main page.",
            "text-secondary",
          );

          // Use Bootstrap class to show input (remove d-none, add d-flex)
          inputLine.classList.remove("d-none");
          inputLine.classList.add("d-flex");
          cmdInput.focus();
        } catch (e) {
          printLine(
            "CRITICAL ERROR: Invalid JSON format." + e.message,
            "text-danger",
          );
        }
      } else {
        printLine(
          "CRITICAL ERROR: Could not load file system.",
          "text-danger fw-bold",
        );
        printLine("Status: " + xhr.status, "text-danger");
        printLine(
          "Ensure you are running on a local server (localhost), not file://",
          "text-danger",
        );
      }
    }
  };
  xhr.onerror = function () {
    printLine("Network Error occurred.", "text-danger");
  };
  xhr.send();
}

// --- 2. TERMINAL LOGIC ---
document.body.addEventListener("click", () => {
  if (!inputLine.classList.contains("d-none")) cmdInput.focus();
});

cmdInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const input = this.value.trim();
    if (input) processCommand(input);
    else addToHistory(input, "");
    this.value = "";
    scrollToBottom();
  } else if (e.key === "Tab") {
    e.preventDefault();
    handleTabCompletion(this.value);
  }
});

function processCommand(input) {
  const args = input.split(" ");
  const cmd = args[0].toLowerCase();
  const param = args[1];

  switch (cmd) {
    case "help":
      // Added 'back' to the help list
      addToHistory(input, "ls, cd, cat, clear, back, help");
      break;
    case "clear":
      historyDiv.innerHTML = "";
      break;
    case "ls":
      handleLs(input, param);
      break;
    case "cd":
      handleCd(input, param);
      break;
    case "cat":
      handleCat(input, param);
      break;
    // --- NEW COMMAND ADDED HERE ---
    case "back":
      addToHistory(input, "Navigating to index.html...", "text-success");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 500); // Small delay for effect
      break;
    // ------------------------------
    default:
      addToHistory(input, `Command not found: ${cmd}`, "text-danger");
  }
}

// --- 3. FILESYSTEM HANDLERS ---
function getCurrentDirectoryObj() {
  let current = fileSystem;
  for (const folder of currentPath) {
    if (current[folder]) current = current[folder];
  }
  return current;
}

function handleLs(input, target) {
  let dirObj = getCurrentDirectoryObj();
  if (target) {
    if (dirObj[target] && typeof dirObj[target] === "object")
      dirObj = dirObj[target];
    else
      return addToHistory(
        input,
        `ls: cannot access '${target}'`,
        "text-danger",
      );
  }
  const keys = Object.keys(dirObj).sort();
  // Wrap directories in bold blue (Bootstrap primary)
  const formatted = keys
    .map((key) => {
      if (typeof dirObj[key] === "object")
        return `<span class="text-primary fw-bold">${key}/</span>`;
      return key;
    })
    .join("  ");

  addToHistory(input, formatted, "", true); // true = allow HTML
}

function handleCd(input, target) {
  if (!target || target === "~") currentPath = [];
  else if (target === "..") currentPath.pop();
  else {
    const currentDir = getCurrentDirectoryObj();
    if (currentDir[target] && typeof currentDir[target] === "object")
      currentPath.push(target);
    else
      return addToHistory(
        input,
        `cd: no such directory: ${target}`,
        "text-danger",
      );
  }
  promptText.textContent = `user@portfolio:${currentPath.length ? "~/" + currentPath.join("/") : "~"}$`;
  addToHistory(input, "");
}

function handleCat(input, target) {
  const currentDir = getCurrentDirectoryObj();
  if (!target)
    return addToHistory(input, "cat: missing argument", "text-danger");
  if (currentDir[target]) {
    if (typeof currentDir[target] === "string")
      addToHistory(input, currentDir[target]);
    else addToHistory(input, `cat: ${target}: Is a directory`, "text-danger");
  } else addToHistory(input, `cat: ${target}: No such file`, "text-danger");
}

// --- 4. UTILITIES ---
function printLine(text, cssClass) {
  const line = document.createElement("div");
  line.className = cssClass || "";
  line.innerText = text;
  historyDiv.appendChild(line);
}

function addToHistory(
  command,
  output,
  cssClass = "output-text",
  isHtml = false,
) {
  const entry = document.createElement("div");
  entry.className = "mb-2"; // Bootstrap margin bottom

  // Command Line Display
  const cmdLine = document.createElement("div");
  cmdLine.innerHTML = `<span class="text-success fw-bold me-2">${promptText.textContent}</span> <span>${command}</span>`;
  entry.appendChild(cmdLine);

  // Output Display
  if (output) {
    const outDiv = document.createElement("div");
    outDiv.className = cssClass;
    if (isHtml) outDiv.innerHTML = output;
    else outDiv.innerText = output;
    entry.appendChild(outDiv);
  }
  historyDiv.appendChild(entry);
}

function scrollToBottom() {
  terminalContainer.scrollTop = terminalContainer.scrollHeight;
}

function handleTabCompletion(currentInput) {
  const args = currentInput.split(" ");
  const partial = args[1] || "";
  const currentDir = getCurrentDirectoryObj();
  const matches = Object.keys(currentDir).filter((key) =>
    key.startsWith(partial),
  );
  if (matches.length === 1) cmdInput.value = `${args[0]} ${matches[0]}`;
}

init();
