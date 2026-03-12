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
