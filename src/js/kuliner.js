const culinaryPlaces = [
  {
    name: "Miesop Vinde",
    category: "Mie",
    location: "Jl. Sunggal, depan Somerset",
    image: "photo-1569718212165-3a8278d5f624",
    description:
      "Video @stevaniexu meraih 12 ribu likes; pernah menjual 700 porsi saat akhir pekan. Rekomendasi menu: tulang goreng. Info yang diberikan menyebut sertifikat Halal Indonesia.",
    price: "Mulai Rp14.000",
    hours: "17.30-00.30",
    mapsSearch: "Miesop Vinde Jl Sunggal Medan",
  },
  {
    name: "NASTE - Nasi Goreng Daging Sate",
    category: "Nasi",
    location: "Jl. Multatuli dan Jl. Wahid Hasyim",
    image: "photo-1512058564366-18510be2db19",
    description:
      "Satu koki memasak 25 porsi sekaligus dengan bumbu rempah, bukan kecap manis. Gerobak memasang logo halal; komentar pelanggan menyorot acar bawang gratis.",
    price: "Cek menu aplikasi",
    hours: "Buka hingga 01.00",
    mapsSearch: "NASTE Nasi Goreng Daging Sate Medan",
  },
  {
    name: "Pondok Kikil / Katupek Gulai Tunjang",
    category: "Lainnya",
    location: "Bromo Ujung, Medan",
    image: "photo-1547592180-85f173990554",
    description:
      "Pernah diulas @makanhalalmedan. Seporsi berisi ketupat, gulai kikil, dan salabulek; pengunjung mengambil nomor antrean. Kikil lembut dengan gulai yang tidak terlalu kuat.",
    price: "Sekitar Rp18.000",
    hours: "Cek jam terbaru di Maps",
    mapsSearch: "Pondok Kikil Bromo Ujung Medan",
  },
  {
    name: "Mie Balap Oma",
    category: "Mie",
    location: "Jl. Balai Desa, Helvetia",
    image: "photo-1555126634-323283e090fa",
    description:
      "Disebut hidden gem oleh @kulinerkoko. Mie balap dimasak dari teras rumah, sekitar 25 porsi per wajan; pemilik menyatakan sajiannya 100% halal dan Muslim-friendly.",
    price: "Sekitar Rp6.000",
    hours: "Cek jam terbaru di aplikasi",
    mapsSearch: "Mie Balap Oma Jl Balai Desa Helvetia",
  },
  {
    name: "Onde Mutiara",
    category: "Jajanan",
    location: "Ruko Mutiara Residence dan Jl. Sutrisno",
    image: "photo-1601050690597-df0568f70950",
    description:
      "Resep keluarga diteruskan oleh pemilik muda; lebih dari 10 ribu onde dibuat per bulan. Ubi ditumbuk manual di lesung batu, dengan isian kacang hijau, cokelat, atau keju. Tanpa telur dan bawang.",
    price: "Rp3.000 per buah",
    hours: "09.00-17.30",
    mapsSearch: "Onde Mutiara Medan",
  },
  {
    name: "Mie Ayam Abadi 88",
    category: "Mie",
    location: "Komplek Buckingham, Ring Road",
    image: "photo-1569718212165-3a8278d5f624",
    description:
      "Misoa homemade berkuah sumsum sapi, brisket sapi Australia, dan bakso. Pilihan lain termasuk kwetiau goreng seafood, telur bebek, serta bacang telur asin. Info yang diberikan menyebut sertifikasi halal.",
    price: "Cek menu aplikasi",
    hours: "07.00-21.00",
    mapsSearch: "Mie Ayam Abadi 88 Buckingham Ring Road Medan",
  },
  {
    name: "Nasi Uduk Jelambar Fajar",
    category: "Nasi",
    location: "Jl. Wahidin No. 3F",
    image: "photo-1516684732162-798a0062be99",
    description:
      "Video @wilson.ngjelraldo ramai dibagikan dengan keterangan 'NO PORK NO LARD'. Menu yang disebut antara lain ayam berbumbu, ikan garam asam, kerabu haisom, dan Indomie Jelambar.",
    price: "Cek menu aplikasi",
    hours: "Buka malam; cek jam terbaru",
    mapsSearch: "Nasi Uduk Jelambar Fajar Jl Wahidin Medan",
  },
  {
    name: "Sawah Kita - Nasi Goreng Khusus",
    category: "Nasi",
    location: "Medan",
    image: "photo-1603133872878-684f208fb84b",
    description:
      "Nasi goreng dimasak dengan aroma asap wajan, tersedia dengan rendang, kangkung terasi, atau ayam cabai hijau. Porsi jumbo dan kerap masuk rekomendasi nasi goreng Medan.",
    price: "Cek menu aplikasi",
    hours: "Cek jam terbaru di aplikasi",
    mapsSearch: "Sawah Kita Nasi Goreng Khusus Medan",
  },
  {
    name: "Restoran Garuda",
    category: "Nasi",
    location: "Jl. Gajah Mada No. 8",
    image: "photo-1547592180-85f173990554",
    description:
      "Rumah makan Padang yang berdiri sejak 1976. Soto Medan, rendang, dan ayam gulai menjadi pilihan; sering dikunjungi keluarga dan direkomendasikan pencinta kuliner lokal.",
    price: "Cek menu aplikasi",
    hours: "Cek jam terbaru di Maps",
    mapsSearch: "Restoran Garuda Jl Gajah Mada No 8 Medan",
  },
  {
    name: "Hapi Ramen Gyoza",
    category: "Mie",
    location: "Cemara Asri dan Jl. S. Parman",
    image: "photo-1569718212165-3a8278d5f624",
    description:
      "Pilihan Jepang halal dengan menu berganti, seperti ramen, bento, dan yakitori. Banyak direkomendasikan sebagai pilihan makan halal di Medan.",
    price: "Cek menu aplikasi",
    hours: "10.30-21.00",
    mapsSearch: "Hapi Ramen Gyoza Medan",
  },
];

const culinaryGrid = document.getElementById("culinary-grid");
const culinarySearch = document.getElementById("culinary-search");
const culinaryCount = document.getElementById("culinary-count");
const culinaryEmpty = document.getElementById("culinary-empty");
const culinaryFilters = document.querySelectorAll(".culinary-filter");
let activeCulinaryCategory = "Semua";

const renderCulinaryCard = (place, index) => `
  <article class="group flex flex-col border border-green-950/15 bg-white transition-shadow hover:shadow-lg" data-category="${place.category}">
    <div class="relative aspect-[4/3] overflow-hidden bg-green-950">
      <img src="https://images.unsplash.com/${place.image}?auto=format&fit=crop&w=900&q=80" alt="Hidangan ${place.name}" loading="lazy" class="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <span class="absolute top-3 left-3 bg-amber-50 px-3 py-1 text-xs font-bold tracking-wide text-green-950">${place.category}</span>
      <span class="absolute right-3 bottom-3 bg-green-950 px-3 py-1 text-xs font-semibold text-yellow-400">Halal · sesuai info rekomendasi</span>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <p class="text-xs font-bold tracking-widest text-red-900 uppercase">${String(index + 1).padStart(2, "0")} / Kuliner Medan</p>
      <h3 class="mt-2 font-display text-2xl font-bold leading-tight text-green-950">${place.name}</h3>
      <p class="mt-2 text-sm text-stone-600">${place.location}</p>
      <p class="mt-4 flex-1 text-sm leading-relaxed text-stone-700">${place.description}</p>
      <div class="mt-5 flex flex-wrap justify-between gap-x-4 gap-y-2 text-xs font-semibold text-stone-600">
        <span>${place.price}</span><span>${place.hours}</span>
      </div>
      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapsSearch)}" target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex w-fit items-center gap-2 border-b border-green-950 pb-1 text-sm font-bold text-green-950 transition-colors hover:text-red-900">Lihat di Google Maps <span aria-hidden="true">↗</span></a>
    </div>
  </article>`;

const updateCulinaryList = () => {
  const query = culinarySearch.value.trim().toLocaleLowerCase("id");
  const matches = culinaryPlaces.filter((place) => {
    const matchesCategory =
      activeCulinaryCategory === "Semua" ||
      place.category === activeCulinaryCategory;
    const searchableText =
      `${place.name} ${place.location} ${place.description}`.toLocaleLowerCase("id");
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
updateCulinaryList();