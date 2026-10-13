// ====== DATA GALERI ======
// Untuk memakai foto sendiri, ganti "src" dengan path file, misalnya
// "./images/gallery/istana-maimun.jpg". Jika foto gagal dimuat, kartu
// menampilkan blok hijau berisi judul foto.
const photos = [
  { src: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800", title: "Istana Maimun", category: "Wisata Sejarah", location: "Jl. Sultan Ma'moun Al Rasyid, Medan", desc: "Istana peninggalan Kesultanan Deli dengan paduan arsitektur Melayu, Islam, dan Eropa." },
  { src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800", title: "Masjid Raya Al-Mashun", category: "Wisata Sejarah", location: "Jl. Mahkamah, Medan", desc: "Masjid bersejarah khas Kesultanan Deli berpola segi delapan dengan kubah megah." },
  { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800", title: "Tjong A Fie Mansion", category: "Wisata Sejarah", location: "Jl. Ahmad Yani, Kesawan, Medan", desc: "Kediaman bersejarah dengan arsitektur perpaduan Tionghoa, Eropa, dan Melayu." },
  { src: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800", title: "Gereja Annai Velangkanni", category: "Wisata Sejarah", location: "Taman Sakura Indah, Medan", desc: "Gereja Katolik unik dengan arsitektur menyerupai kuil bertingkat khas India Tamil." },
  { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800", title: "Taman Cadika Pramuka", category: "Alam", location: "Jl. Karya Wisata, Medan Johor", desc: "Ruang terbuka hijau dengan danau buatan, area piknik, dan fasilitas olahraga." },
  { src: "https://images.unsplash.com/photo-1511497584788-8767611136f6?w=800", title: "Taman Hutan Kota Mabar", category: "Alam", location: "Mabar, Medan Deli", desc: "Kawasan hijau rindang yang cocok untuk olahraga pagi dan bersantai." },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", title: "Danau Siombak", category: "Alam", location: "Paya Pasir, Medan Marelan", desc: "Danau buatan di pesisir Medan dengan panorama matahari terbenam." },
  { src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800", title: "Rahmat Wildlife Museum", category: "Rekreasi", location: "Jl. S. Parman, Medan", desc: "Museum satwa dengan koleksi diorama beragam." },
  { src: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800", title: "Medan Zoo", category: "Rekreasi", location: "Simalingkar B, Medan Tuntungan", desc: "Taman satwa edukatif keluarga dengan koleksi fauna khas Sumatera." },
  { src: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=800", title: "Wonders Water World", category: "Rekreasi", location: "CBD Polonia, Medan", desc: "Taman bermain air dengan seluncuran dan kolam gelombang." }
];

const badgeStyles = {
  "Wisata Sejarah": "bg-amber-100 text-amber-800",
  Alam: "bg-emerald-100 text-emerald-800",
  Rekreasi: "bg-blue-100 text-blue-800"
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
      p.location.toLowerCase().includes(term);
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

    const badge = document.createElement("span");
    badge.className =
      "mb-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold " +
      (badgeStyles[photo.category] || "bg-gray-100 text-gray-800");
    badge.textContent = photo.category;

    const title = document.createElement("h3");
    title.className = "mb-1 text-xl font-bold text-gray-900";
    title.textContent = photo.title;

    const loc = document.createElement("p");
    loc.className = "text-xs text-gray-500";
    loc.textContent = "📍 " + photo.location;

    body.append(badge, title, loc);
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
  lbMeta.textContent = photo.category + " · " + photo.location;
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
applyFilters();