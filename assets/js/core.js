const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

async function loadPlayer() {
  const frame = document.getElementById("gameFrame");
  if (!frame || !gameId) return;
  const res = await fetch("data/games.json");
  const games = await res.json();
  const game = games.find((g) => g.id === gameId);
  if (game) {
    document.getElementById("gameTitle").innerText = game.title;
    frame.src = game.url;
  }
}
loadPlayer();
// Game Search Logic
document.addEventListener("input", (e) => {
  // Check if the element being typed in is our search bar
  if (e.target.id === "gameSearch") {
    const term = e.target.value.toLowerCase().trim();
    const tiles = document.querySelectorAll(".game-tile");

    tiles.forEach((tile) => {
      // We search both the Title and the Category for a better experience
      const title = tile.querySelector("h3").innerText.toLowerCase();
      const category = tile.querySelector("p").innerText.toLowerCase();

      if (title.includes(term) || category.includes(term)) {
        tile.style.display = "block";
        // Add a small fade-in effect
        tile.style.opacity = "1";
      } else {
        tile.style.display = "none";
        tile.style.opacity = "0";
      }
    });
  }
});

function launchStealth(url) {
  // 1. Open a new blank tab
  const win = window.open("about:blank", "_blank");

  if (!win) {
    alert("Pop-up blocked! Please allow pop-ups to use Stealth Mode.");
    return;
  }

  // 2. Set the tab's title and favicon to look like something "safe" (Optional but Pro)
  win.document.title = "Google Docs";
  const link = win.document.createElement("link");
  link.rel = "icon";
  link.href = "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
  win.document.head.appendChild(link);

  // 3. Style the page to be a full-screen container
  const style = win.document.createElement("style");
  style.textContent = `
    body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #000; }
    iframe { width: 100%; height: 100%; border: none; }
  `;
  win.document.head.appendChild(style);

  // 4. Inject the iframe
  const iframe = win.document.createElement("iframe");
  iframe.src = url;
  iframe.allow = "autoplay; fullscreen; encrypted-media";
  win.document.body.appendChild(iframe);
}

// whole tab stealth

function siteCloak() {
  const siteUrl = window.location.href; // Grabs your current Vercel URL

  // 1. Open the ghost tab
  const win = window.open("about:blank", "_blank");
  if (!win) {
    alert("Pop-up blocked! Please allow pop-ups for Stealth Mode.");
    return;
  }

  // 2. Setup the Ghost Document
  const doc = win.document;
  doc.title = "Cobalt Academy | Portal"; // The "Fake" Tab Name

  // Inject Favicon (Google Docs icon for maximum stealth)
  const link = doc.createElement("link");
  link.rel = "icon";
  link.href = "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
  doc.head.appendChild(link);

  // 3. Apply Styles for the Ghost Window
  const style = doc.createElement("style");
  style.textContent = `
    body, html { margin: 0; padding: 0; height: 100vh; width: 100vw; overflow: hidden; background: #000; }
    iframe { width: 100%; height: 100%; border: none; }
  `;
  doc.head.appendChild(style);

  // 4. Create the Iframe
  const iframe = doc.createElement("iframe");
  iframe.src = siteUrl;
  iframe.allow =
    "autoplay; fullscreen; encrypted-media; clipboard-read; clipboard-write";
  doc.body.appendChild(iframe);

  // 5. Final Stealth Move: Wipe the evidence
  // This replaces the Cobalt URL in your history with Google
  window.location.replace(
    "https://www.google.com/search?q=educational+resources+for+students",
  );
}

//cloaking
const cloaks = {
  docs: {
    title: "Google Docs",
    favicon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico",
  },
  classroom: {
    title: "Classes",
    favicon: "https://ssl.gstatic.com/classroom/favicon.ico",
  },
  drive: {
    title: "My Drive - Google Drive",
    favicon:
      "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
  },
  google: {
    title: "Google",
    favicon: "https://www.google.com/favicon.ico",
  },
};

function applyCloak(key) {
  const cloak = cloaks[key];
  if (!cloak) return;

  // 1. Update Title
  document.title = cloak.title;

  // 2. Clear old icons and inject the new one
  const existingIcons = document.querySelectorAll("link[rel*='icon']");
  existingIcons.forEach((icon) => icon.remove());

  const link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = cloak.favicon; // Matches the key in the 'cloaks' object

  document.getElementsByTagName("head")[0].appendChild(link);

  // 3. Save to LocalStorage so it persists on game.html
  localStorage.setItem("midnight-cloak", key);
}

// Auto-run on every page load
(function initCloak() {
  const saved = localStorage.getItem("midnight-cloak");
  if (saved) {
    applyCloak(saved);
  }
})();
// panic
function panic() {
  // Instantly redirects the current tab to Google Classroom
  window.location.href = "https://classroom.google.com/";
}

// Level 4 move: Add a keyboard shortcut for the panic button
window.addEventListener("keydown", (e) => {
  // If you press 'Esc' or '`' (tilde), it triggers the panic redirect
  if (e.key === "Escape" || e.key === "`") {
    panic();
  }
});
// This replaces the <i> tags with actual SVG icons
lucide.createIcons();
