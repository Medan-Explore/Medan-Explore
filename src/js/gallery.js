let photos = [];

const badgeStyles = {
  "Wisata Sejarah": "bg-amber-100 text-amber-800",
  "Wisata Alam": "bg-emerald-100 text-emerald-800",
  Rekreasi: "bg-blue-100 text-blue-800",
  Kuliner: "bg-orange-100 text-orange-800"
};

const grid = document.getElementById("galleryGrid");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");
const countEl = document.getElementById("count");
const emptyEl = document.getElementById("empty");
const lightbox = document.getElementById("lightbox");
const lbMedia = document.getElementById("lb-media");
const lbTitle = document.getElementById("lb-title");
const lbMeta = document.getElementById("lb-meta");
const lbDesc = document.getElementById("lb-desc");

let currentCategory = "All";
let visible = [];
let currentIndex = 0;
let lastFocus = null;

function placeholder(photo, big) {
  const div = document.createElement("div");
  div.className =
    "flex items-center justify-center bg-[#1b3e2b] p-4 text-center font-bold text-[#f2c94c] " +
    (big ? "aspect-[4/3] w-full max-w-3xl text-3xl" : "h-full w-full text-xl");
  div.textContent = photo.title;
  return div;
}

function imageEl(photo, big) {
  if (!photo.src) return placeholder(photo, big);
  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.title;
  img.className = big
    ? "max-h-[65vh] w-auto max-w-full rounded-xl object-contain"
    : "h-64 w-full object-cover transition duration-500 group-hover:scale-105";
  if (!big) img.loading = "lazy";
  img.onerror = () => img.replaceWith(placeholder(photo, big));
  return img;
}

function applyFilters() {
  const term = searchInput.value.trim().toLowerCase();
  visible = photos.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(term) ||
      p.desc.toLowerCase().includes(term);
    const matchesCategory =
      currentCategory === "All" || p.category === currentCategory;
    return matchesSearch && matchesCategory;
  });
  renderGrid();
}

function renderGrid() {
  grid.innerHTML = "";
  emptyEl.classList.toggle("hidden", visible.length > 0);
  countEl.textContent = visible.length + " foto";

  visible.forEach((photo, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.setAttribute("aria-label", "Lihat foto " + photo.title);
    card.className =
      "group block w-full cursor-pointer overflow-hidden rounded-2xl border bg-white text-left shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-4 focus-visible:outline-yellow-500";

    const frame = document.createElement("div");
    frame.className = "h-64 overflow-hidden bg-[#1b3e2b]";
    frame.appendChild(imageEl(photo, false));

    const body = document.createElement("div");
    body.className = "p-5";

    const title = document.createElement("h3");
    title.className = "mb-1 text-xl font-bold text-gray-900";
    title.textContent = photo.title;

    const loc = document.createElement("p");
    loc.className = "text-xs text-gray-500";
    loc.textContent = "Sumber gambar: " + (photo.source || "Tidak diketahui");

    body.append(title, loc);
    card.append(frame, body);
    card.addEventListener("click", () => openLightbox(i));
    grid.appendChild(card);
  });
}

function setActiveButton(category) {
  filterBtns.forEach((btn) => {
    const active = btn.dataset.category === category;
    btn.classList.toggle("bg-[#1b3e2b]", active);
    btn.classList.toggle("text-white", active);
    btn.classList.toggle("bg-gray-100", !active);
    btn.classList.toggle("text-gray-700", !active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    setActiveButton(currentCategory);
    applyFilters();
  });
});
searchInput.addEventListener("input", applyFilters);

// ====== LIGHTBOX ======
function showPhoto() {
  const photo = visible[currentIndex];
  lbMedia.innerHTML = "";
  lbMedia.appendChild(imageEl(photo, true));
  lbTitle.textContent = photo.title;
  lbMeta.textContent = "Sumber gambar: " + (photo.source || "Tidak diketahui");
  lbDesc.textContent = photo.desc;
}

function openLightbox(i) {
  lastFocus = document.activeElement;
  currentIndex = i;
  showPhoto();
  lightbox.classList.remove("hidden");
  lightbox.classList.add("flex");
  document.body.classList.add("overflow-hidden");
  document.getElementById("lb-close").focus();
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightbox.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
  if (lastFocus) lastFocus.focus();
}

function step(dir) {
  currentIndex = (currentIndex + dir + visible.length) % visible.length;
  showPhoto();
}

document.getElementById("lb-close").addEventListener("click", closeLightbox);
document.getElementById("lb-prev").addEventListener("click", () => step(-1));
document.getElementById("lb-next").addEventListener("click", () => step(1));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("hidden")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});

setActiveButton("All");
loadData()
  .then((data) => {
    photos = data.destinations.map((d) => ({
      src: d.image,
      title: d.name,
      category: categoryName(data, d.category_id),
      source: d.image_source,
      desc: d.description,
    }));
    applyFilters();
  })
  .catch((err) => {
    console.error(err);
    countEl.textContent = "";
    emptyEl.textContent = "Data galeri gagal dimuat.";
    emptyEl.classList.remove("hidden");
  });
