/**
 * MIDNIGHT GAMES - Render Engine
 * Restored Internal Embedding + Multi-Category Filtering
 */

let allGames = []; // Global variable to store data

async function render() {
  try {
    const res = await fetch("data/games.json");
    if (!res.ok) throw new Error("Failed to fetch");
    allGames = await res.json();

    // Initial load: fill all grids
    updateGrids(allGames, true);
  } catch (error) {
    console.error("Depth Error:", error);
  }
}

/**
 * Filter Logic: Works with the new Category Buttons
 */

function filterByCategory(category) {
  // Update button visual state
  document.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.innerText.toLowerCase().includes(category.toLowerCase()) ||
        (category === "all" && btn.innerText === "All"),
    );
  });

  if (category === "all") {
    updateGrids(allGames, false);
  } else {
    const filtered = allGames.filter((g) => {
      // Check for array format (new) or string format (old)
      const matchArray =
        g.categories &&
        g.categories.some(
          (cat) => cat.toLowerCase() === category.toLowerCase(),
        );
      const matchString =
        g.category && g.category.toLowerCase() === category.toLowerCase();

      return matchArray || matchString;
    });
    updateGrids(filtered, false);
  }
}

function updateGrids(gamesList, isInitialLoad) {
  const featuredGrid = document.getElementById("featuredGrid");
  const trendingGrid = document.getElementById("trendingGrid");
  const appsGrid = document.getElementById("appsGrid");

  if (featuredGrid) {
    featuredGrid.innerHTML = gamesList.map((g) => createTile(g)).join("");
  }

  if (isInitialLoad) {
    if (trendingGrid) {
      const trending = allGames.filter(
        (g) =>
          (g.categories && g.categories.includes("Trending")) ||
          g.category === "Trending",
      );
      trendingGrid.innerHTML = trending.map((g) => createTile(g)).join("");
    }
    if (appsGrid) {
      const apps = allGames.filter(
        (g) =>
          (g.categories &&
            g.categories.some((c) => c.toLowerCase() === "app")) ||
          g.category === "App",
      );
      appsGrid.innerHTML = apps.map((g) => createTile(g)).join("");
    }
  }
}

function createTile(g) {
  const sizeClass = g.size === "large" ? "large" : "small";
  const destination = `window.location.href='game.html?id=${g.id}'`;

  // Determine the label to show on the tile
  let label = "Game";
  if (g.categories && g.categories.length > 0) {
    label = g.categories[0]; // Show the first category
  } else if (g.category) {
    label = g.category;
  }

  return `
    <div class="game-tile ${sizeClass}" onclick="${destination}">
        <img src="${g.img}" alt="${g.title}" loading="lazy">
        <div class="tile-info">
            <h3>${g.title}</h3>
            <p>${label}</p>
        </div>
    </div>
  `;
}

render();
