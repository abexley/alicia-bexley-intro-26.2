// ---------- Select Elements ----------
const artworksBtn = document.getElementById("artworksBtn");
const artistsBtn = document.getElementById("artistsBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageIndicator = document.getElementById("pageIndicator");


let artistPage = 1;
let artworkPage = 1;
let currentView = "artworks";

function updatePagination() {
  if (currentView === "artists") {
    pageIndicator.textContent = `Page ${artistPage}`;
    prevBtn.disabled = artistPage === 1;
  } else {
    pageIndicator.textContent = `Page ${artworkPage}`;
    prevBtn.disabled = artworkPage === 1;
  }
}

// ---------- Fetch Artworks ----------
async function fetchArtworks() {
  results.innerHTML = "<p>Loading artworks...</p>";

  prevBtn.disabled = true;
  nextBtn.disabled = true;

  try {
     const response = await fetch(
  `https://api.artic.edu/api/v1/artworks?page=${artworkPage}&limit=20&fields=id,title,image_id,artist_title,date_display`
);

    const data = await response.json();

    displayArtworks(data.data);

    updatePagination();

    nextBtn.disabled = false;

  } catch (error) {
    results.innerHTML =
      "<p>Unable to load artworks. Please try again later.</p>";

    console.error(error);
  }
}

// ---------- Fetch Artists ----------
async function fetchArtists() {
  results.innerHTML = "<p>Loading artists...</p>";

  prevBtn.disabled = true;
  nextBtn.disabled = true;

  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artists?page=${artistPage}&limit=20&fields=id,title,birth_date,death_date`
    );

    const data = await response.json();

    displayArtists(data.data);

    updatePagination();

    nextBtn.disabled = false;

  } catch (error) {
    results.innerHTML =
      "<p>Unable to load artists. Please try again later.</p>";

    console.error(error);
  }
}

// ---------- Display Artworks ----------
function displayArtworks(artworks) {
  results.innerHTML = "";
  
  if (!artworks.length) {
    results.innerHTML = "<p>No artworks found.</p>";
    return;
  }

  artworks.forEach(item => {
    const imgUrl = item.image_id
      ? `https://www.artic.edu/iiif/2/${item.image_id}/full/300,/0/default.jpg`
      : "https://via.placeholder.com/300x300?text=No+Image";

    const card = `
      <div class="card">
        <img src="${imgUrl}" alt="Artwork titled ${item.title}">
        <h3>${item.title}</h3>
        <p><strong>Artist:</strong> ${item.artist_title || "Unknown"}</p>
        <p><strong>Date:</strong> ${item.date_display || "N/A"}</p>
      </div>
    `;

    results.innerHTML += card;
  });
}

// ---------- Display Artists ----------
function displayArtists(artists) {
  results.innerHTML = "";
  if (!artists.length) {
    results.innerHTML = "<p>No artists found.</p>";
    return;
  }

  artists.forEach(person => {
    const card = `
      <div class="card">
        <h3>${person.title}</h3>
        <p><strong>Born:</strong> ${person.birth_date || "Unknown"}</p>
        <p><strong>Died:</strong> ${person.death_date || "Unknown"}</p>
      </div>
    `;

    results.innerHTML += card;
  });
}

// ---------- Search Filter ----------
searchInput.addEventListener("input", () => {
  const cards = document.querySelectorAll(".card");
  const query = searchInput.value.toLowerCase();

  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(query)
      ? "block"
      : "none";
  });
});

// ---------- Button Event Listeners ----------

artworksBtn.addEventListener("click", () => {
  currentView = "artworks";
  artworkPage = 1;
  fetchArtworks();
});

artistsBtn.addEventListener("click", () => {
  currentView = "artists";
  artistPage = 1;
  fetchArtists();
});


nextBtn.addEventListener("click", () => {
  if (currentView === "artists") {
    artistPage++;
    fetchArtists();
  } else {
    artworkPage++;
    fetchArtworks();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentView === "artists") {
    if (artistPage > 1) {
      artistPage--;
      fetchArtists();
    }
  } else {
    if (artworkPage > 1) {
      artworkPage--;
      fetchArtworks();
  
    }
  }
});
fetchArtworks();
updatePagination();