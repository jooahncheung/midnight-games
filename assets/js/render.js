async function render() {
  try {
    const res = await fetch("data/games.json");
    const games = await res.json();

    const featuredGrid = document.getElementById("featuredGrid");
    const trendingGrid = document.getElementById("trendingGrid");
    const appsGrid = document.getElementById("appsGrid");

    // 1. Fill Featured (Shows everything)
    if (featuredGrid) {
      featuredGrid.innerHTML = games.map((g) => createTile(g)).join("");
    }

    // 2. Fill Trending (Filter by "Trending" category)
    if (trendingGrid) {
      const trendingGames = games.filter((g) => g.category === "Trending");
      trendingGrid.innerHTML = trendingGames.map((g) => createTile(g)).join("");
    }

    // 3. Fill Apps (Filter by "App" category)
    if (appsGrid) {
      const appItems = games.filter((g) => g.category === "App");
      appsGrid.innerHTML = appItems.map((g) => createTile(g)).join("");
    }
  } catch (error) {
    console.error("Depth Error: Could not fetch game data.", error);
  }
}

// Level 4 Helper Function: Handles the Bento Grid sizing
function createTile(g) {
  // Check if size is 'large', otherwise default to 'small'
  const sizeClass = g.size === "large" ? "large" : "small";

  return `
        <div class="game-tile ${sizeClass}" onclick="window.location.href='game.html?id=${g.id}'">
            <img src="${g.img}" alt="${g.title}" loading="lazy">
            <div class="tile-info">
                <h3>${g.title}</h3>
                <p>${g.category}</p>
            </div>
        </div>
    `;
}

// Call it once
render();
