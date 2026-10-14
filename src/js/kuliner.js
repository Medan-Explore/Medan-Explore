let culinaryPlaces = [];

const culinaryGrid = document.getElementById("culinary-grid");
const culinarySearch = document.getElementById("culinary-search");
const culinaryCount = document.getElementById("culinary-count");
const culinaryEmpty = document.getElementById("culinary-empty");
const culinaryFilters = document.querySelectorAll(".culinary-filter");
let activeCulinaryCategory = "Semua";

const renderCulinaryCard = (place, index) => `
  <article class="group flex flex-col border border-green-950/15 bg-white transition-shadow hover:shadow-lg" data-category="${place.sub_category || ""}">
    <div class="relative aspect-[4/3] overflow-hidden bg-green-950">
      ${imgTag(place, "size-full object-cover transition-transform duration-500 group-hover:scale-105", "Hidangan " + place.name)}
      <span class="absolute top-3 left-3 bg-amber-50 px-3 py-1 text-xs font-bold tracking-wide text-green-950">${place.sub_category || "Kuliner"}</span>
      <span class="absolute right-3 bottom-3 bg-green-950 px-3 py-1 text-xs font-semibold text-yellow-400">Halal · sesuai info rekomendasi</span>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <p class="text-xs font-bold tracking-widest text-red-900 uppercase">${String(index + 1).padStart(2, "0")} / Kuliner Medan</p>
      <h3 class="mt-2 font-display text-2xl font-bold leading-tight text-green-950">${place.name}</h3>
      <p class="mt-2 text-sm text-stone-600">${place.address}</p>
      <p class="mt-4 flex-1 text-sm leading-relaxed text-stone-700">${place.description}</p>
      <div class="mt-5 flex flex-wrap justify-between gap-x-4 gap-y-2 text-xs font-semibold text-stone-600">
        <span>${place.ticket_price || ""}</span><span>${hoursSummary(place)}</span>
      </div>
      <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="button" data-detail-id="${place.id}" class="cursor-pointer rounded-lg bg-[#1b3e2b] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#122b1e]">Lihat Detail</button>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.address)}" target="_blank" rel="noopener noreferrer" class="inline-flex w-fit items-center gap-2 border-b border-green-950 pb-1 text-sm font-bold text-green-950 transition-colors hover:text-red-900">Lihat di Google Maps <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </article>`;

const updateCulinaryList = () => {
  const query = culinarySearch.value.trim().toLocaleLowerCase("id");
  const matches = culinaryPlaces.filter((place) => {
    const matchesCategory =
      activeCulinaryCategory === "Semua" ||
      place.sub_category === activeCulinaryCategory;
    const searchableText =
      `${place.name} ${place.address} ${place.description}`.toLocaleLowerCase("id");
    return matchesCategory && searchableText.includes(query);
  });

  culinaryGrid.innerHTML = matches
    .map((place) =>
      renderCulinaryCard(place, culinaryPlaces.indexOf(place)),
    )
    .join("");
  culinaryCount.textContent = `${matches.length} dari ${culinaryPlaces.length} kuliner`;
  culinaryEmpty.classList.toggle("hidden", matches.length > 0);
  culinaryGrid.classList.toggle("hidden", matches.length === 0);
};

culinaryFilters.forEach((button) => {
  button.addEventListener("click", () => {
    activeCulinaryCategory = button.dataset.category;
    culinaryFilters.forEach((filter) => {
      const active = filter === button;
      filter.setAttribute("aria-pressed", String(active));
      filter.classList.toggle("active", active);
      filter.classList.toggle("bg-[#1b3e2b]", active);
      filter.classList.toggle("text-white", active);
      filter.classList.toggle("bg-gray-100", !active);
      filter.classList.toggle("text-gray-700", !active);
      filter.classList.toggle("hover:bg-gray-200", !active);
    });
    updateCulinaryList();
  });
});

culinarySearch.addEventListener("input", updateCulinaryList);

loadData()
  .then((data) => {
    culinaryPlaces = data.destinations.filter((d) => d.category_id === 4);
    updateCulinaryList();
  })
  .catch((err) => {
    console.error(err);
    culinaryCount.textContent = "Data kuliner gagal dimuat.";
  });
