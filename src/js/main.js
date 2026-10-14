const DATA_URL = "./data/destinations.json";

let dataPromise = null;
const loadData = () => {
  dataPromise ||= fetch(DATA_URL).then((res) => {
    if (!res.ok) throw new Error("Gagal memuat " + DATA_URL + " (" + res.status + ")");
    return res.json();
  });
  return dataPromise;
};

const categoryName = (data, id) => (data.categories.find((c) => c.id === id) || {}).name || "";

const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const imageSrc = (d) => d.image;

const imgTag = (d, cls = "", alt = d.name) =>
  `<img src="${escapeHtml(imageSrc(d))}" alt="${escapeHtml(alt)}" loading="lazy" data-name="${escapeHtml(d.name)}" class="${cls}" />`;

const hoursText = (v) => v || "Belum tersedia";

const hoursSummary = (d) =>
  d.opening_hours && d.closing_hours
    ? d.opening_hours + " - " + d.closing_hours
    : d.closing_hours
      ? "Tutup " + d.closing_hours
      : d.opening_hours
        ? "Buka " + d.opening_hours
        : "";

let detailModal = null;
let detailLastFocus = null;

const buildDetailModal = () => {
  const el = document.createElement("div");
  el.id = "detail-modal";
  el.className = "fixed inset-0 z-[60] hidden items-center justify-center bg-black/70 p-4";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-labelledby", "dm-name");
  el.innerHTML = `
    <div class="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
      <button id="dm-close-btn" type="button" aria-label="Tutup detail" class="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full bg-black/60 text-2xl text-white hover:bg-black/80">&times;</button>
      <div class="overflow-y-auto" style="max-height: calc(100dvh - 2rem)">
      <div id="dm-image" class="aspect-[4/3] w-full overflow-hidden bg-green-950"></div>
      <div class="p-6">
        <p id="dm-source" class="text-xs text-gray-500"></p>
        <h2 id="dm-name" class="mt-2 text-3xl font-bold text-green-950"></h2>
        <p id="dm-address" class="mt-1 text-sm text-gray-500"></p>
        <p id="dm-desc" class="mt-4 leading-relaxed text-gray-700"></p>
        <dl class="mt-6 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
          <div><dt class="font-semibold text-gray-500">Jam buka</dt><dd id="dm-open" class="mt-1 font-semibold text-green-950"></dd></div>
          <div><dt class="font-semibold text-gray-500">Jam tutup</dt><dd id="dm-closing" class="mt-1 font-semibold text-green-950"></dd></div>
        </dl>
      </div>
      </div>
    </div>`;
  document.body.appendChild(el);
  el.addEventListener("click", (e) => {
    if (e.target === el) closeDetail();
  });
  el.querySelector("#dm-close-btn").addEventListener("click", closeDetail);
  return el;
};

const openDetail = async (id) => {
  let data;
  try {
    data = await loadData();
  } catch (err) {
    console.error(err);
    return;
  }
  const d = data.destinations.find((x) => x.id === id);
  if (!d) return;
  detailModal ||= buildDetailModal();
  const $ = (sel) => detailModal.querySelector(sel);
  $("#dm-image").innerHTML = imgTag(d, "size-full object-cover", d.name);
  $("#dm-source").textContent = "Sumber gambar: " + (d.image_source || "Tidak diketahui");
  $("#dm-name").textContent = d.name;
  $("#dm-address").textContent = "📍 " + d.address;
  $("#dm-desc").textContent = d.description;
  $("#dm-open").textContent = hoursText(d.opening_hours);
  $("#dm-closing").textContent = hoursText(d.closing_hours);
  detailLastFocus = document.activeElement;
  detailModal.classList.remove("hidden");
  detailModal.classList.add("flex");
  document.body.style.overflow = "hidden";
  $("#dm-close-btn").focus();
};

const closeDetail = () => {
  if (!detailModal) return;
  detailModal.classList.add("hidden");
  detailModal.classList.remove("flex");
  document.body.style.overflow = "";
  if (detailLastFocus) detailLastFocus.focus();
};

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-detail-id]");
  if (trigger) openDetail(Number(trigger.dataset.detailId));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && detailModal && !detailModal.classList.contains("hidden")) closeDetail();
});

// TOP DESTINATION
const toneByCategory = {
  1: "bg-red-900", // Wisata Sejarah
  2: "bg-green-900", // Wisata Alam
  3: "bg-yellow-800", // Rekreasi
  4: "bg-orange-950", // Kuliner
};

const renderCard = (d, i, data) => {
  const big = i === 0;
  return `
  <article class="group flex flex-col ${big ? "lg:col-span-2 lg:row-span-2" : ""}">
    <div class="${toneByCategory[d.category_id] || "bg-green-950"} motif relative isolate aspect-4/3 overflow-hidden ${big ? "lg:aspect-auto lg:min-h-96 lg:flex-1" : ""}">
      ${imgTag(d, "absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105")}
    </div>
    <div class="border-t-2 border-green-950 pt-4">
      <p class="flex items-baseline gap-3">
        <span class="font-display text-sm font-bold text-red-900">${String(i + 1).padStart(2, "0")}</span>
        <span class="text-xs font-semibold tracking-widest text-stone-600 uppercase">${categoryName(data, d.category_id)}</span>
      </p>
      <h3 class="mt-2 ${big ? "text-3xl md:text-4xl" : "text-2xl"} font-bold text-green-950 transition-colors group-hover:text-red-900">${d.name}</h3>
      <p class="mt-1 text-sm text-stone-600">${d.address}</p>
      <p class="mt-2 text-stone-800">${d.description}</p>
    </div>
  </article>`;
};

const renderTopDestination = async () => {
  const list = document.getElementById("top-destination-list");
  if (!list) return;
  try {
    const data = await loadData();
    list.innerHTML = data.destinations.filter((d) => d.is_top).map((d, i) => renderCard(d, i, data)).join("");
  } catch (err) {
    console.error(err);
    list.innerHTML = '<p class="md:col-span-2 lg:col-span-3 text-stone-600">Data destinasi gagal dimuat.</p>';
  }
};

// NAVBAR
const header = document.getElementById("navbar");
const menu = document.getElementById("menu");
const btn = document.getElementById("menu-btn");
const desktop = window.matchMedia("(min-width: 48rem)"); // = breakpoint md Tailwind

let isOpen = false;

const setMenu = (open) => {
  isOpen = open && !desktop.matches; // di desktop menu tidak pernah "terbuka"
  menu.classList.toggle("translate-x-full", !isOpen);
  menu.toggleAttribute("inert", !desktop.matches && !isOpen); // inert hanya saat mobile & tertutup
  header.toggleAttribute("data-open", isOpen);
  btn.setAttribute("aria-expanded", isOpen);
  btn.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  document.getElementById("icon-open").classList.toggle("hidden", isOpen);
  document.getElementById("icon-close").classList.toggle("hidden", !isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
};

btn.addEventListener("click", () => setMenu(!isOpen));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
desktop.addEventListener("change", () => setMenu(false)); // rapikan state saat layar di-resize
setMenu(false);

renderTopDestination();
