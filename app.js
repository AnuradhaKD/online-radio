document.addEventListener("DOMContentLoaded", function () {
    const tiles = document.querySelectorAll(".station-tile");
    const players = document.querySelectorAll(".station-player");

    if (!tiles.length || !players.length) {
        console.warn("Radio Hub: no tiles or players found.");
        return;
    }

    /**
     * Show only the selected player and update active tile.
     * @param {string} targetId - id of the player div to show (e.g. "player-shaa")
     */
    function showPlayer(targetId) {
        // Hide all players
        players.forEach(p => p.classList.remove("active"));

        // Show selected player
        const player = document.getElementById(targetId);
        if (player) {
            player.classList.add("active");
        } else {
            console.warn("Radio Hub: no player found with id:", targetId);
        }

        // Update tile active state
        tiles.forEach(tile => {
            if (tile.dataset.target === targetId) {
                tile.classList.add("active");
            } else {
                tile.classList.remove("active");
            }
        });
    }

    // Attach click handlers to station tiles
    tiles.forEach(tile => {
        tile.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            if (!targetId) {
                console.warn("Radio Hub: tile missing data-target");
                return;
            }
            showPlayer(targetId);
        });
    });

    // Initial state:
    // 1) Use tile that already has .active, OR
    // 2) Fallback to the first tile
    let defaultTile = document.querySelector(".station-tile.active");
    if (!defaultTile) {
        defaultTile = tiles[0];
        defaultTile.classList.add("active");
    }

    const initialTarget = defaultTile.dataset.target;
    if (initialTarget) {
        showPlayer(initialTarget);
    }
});
