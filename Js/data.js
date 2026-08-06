/* ============================================================
   Kimi to Haru — data.js
   Shared content used to render cards across multiple pages.
   ============================================================ */

const KTH_CHARACTERS = [
  {
    id: "ren",
    name: "Ren Aizawa",
    role: "Male Lead · Guitarist",
    age: 17,
    personality: "Reserved and quiet on the surface, but carries a deep well of warmth. Ren listens more than he speaks and expresses what he can't say out loud through melody.",
    dream: "To write one song good enough for the person who matters most to hear.",
    place: "The rooftop, just before the last bell.",
    quote: "Some melodies wait an entire lifetime for the right person to hear them.",
    img: "assets/images/characters/ren.svg",
    gallery: ["assets/images/characters/ren_g1.svg", "assets/images/characters/ren_g2.svg"],
  },
  {
    id: "hina",
    name: "Hina Tachibana",
    role: "Female Lead · Photographer",
    age: 17,
    personality: "Curious, bright, and unafraid to knock on a stranger's quiet world. Hina notices the small details everyone else walks past.",
    dream: "To photograph a full year of Hoshikawa before the memories fade.",
    place: "Cherry Blossom Park, camera in hand.",
    quote: "Every frame is a season I can hold onto forever.",
    img: "assets/images/characters/hina.svg",
    gallery: ["assets/images/characters/hina_g1.svg", "assets/images/characters/hina_g2.svg"],
  },
  {
    id: "yuto",
    name: "Yuto Nakamura",
    role: "Ren's Best Friend",
    age: 17,
    personality: "Loud, warm, and always hungry — Yuto is the group's comic relief and its emotional glue, the one who notices when someone's gone quiet.",
    dream: "To open a small café where regulars become family.",
    place: "Behind the counter at Hoshikawa Café.",
    quote: "Life. Best served warm.",
    img: "assets/images/characters/yuto.svg",
    gallery: ["assets/images/characters/yuto_g1.svg", "assets/images/characters/yuto_g2.svg"],
  },
  {
    id: "mei",
    name: "Mei Sato",
    role: "Hina's Close Friend",
    age: 17,
    personality: "Composed, dryly funny, and rarely surprised. Mei reads people as easily as she reads novels, though she keeps most of what she notices to herself.",
    dream: "To write a novel about the year everything quietly changed.",
    place: "The back corner of the library, third window seat.",
    quote: "The best stories are the ones we live before we write them.",
    img: "assets/images/characters/mei.svg",
    gallery: ["assets/images/characters/mei_g1.svg", "assets/images/characters/mei_g2.svg"],
  },
  {
    id: "kaito",
    name: "Kaito Fujimoto",
    role: "Music Club Senpai",
    age: 18,
    personality: "Confident and encouraging, Kaito is the upperclassman who pushes the group forward — protective of the music room and the people in it.",
    dream: "To become a professional composer and score a film someday.",
    place: "The music room, tuning a guitar no one asked him to tune.",
    quote: "Spring only comes once a year. Make it count.",
    img: "assets/images/characters/kaito.svg",
    gallery: ["assets/images/characters/kaito_g1.svg", "assets/images/characters/kaito_g2.svg"],
  },
];

const KTH_WORLD = [
  { id: "hoshikawa", name: "Hoshikawa City", desc: "A quiet seaside town where the story unfolds, wrapped in cherry blossoms every spring.", img: "assets/images/world/hoshikawa.svg" },
  { id: "school", name: "Sakura Hills High School", desc: "Home to our five classmates, and the cherry tree that blooms earliest in town.", img: "assets/images/world/school.svg" },
  { id: "musicroom", name: "Music Room", desc: "Where Ren and Kaito spend their afternoons, and where Hina first heard him play.", img: "assets/images/world/musicroom.svg" },
  { id: "library", name: "Library", desc: "Mei's kingdom of quiet. Third window seat, always reserved.", img: "assets/images/world/library.svg" },
  { id: "rooftop", name: "Rooftop", desc: "The best view of Hoshikawa, and Ren's favorite place to disappear for a while.", img: "assets/images/world/rooftop.svg" },
  { id: "park", name: "Cherry Blossom Park", desc: "Where Hina's photo project began, one petal at a time.", img: "assets/images/world/park.svg" },
  { id: "cafe", name: "Hoshikawa Café", desc: "Yuto's second home, and the group's unofficial meeting spot after school.", img: "assets/images/world/cafe.svg" },
  { id: "station", name: "Train Station", desc: "Where every school day begins and ends — and where a few of the story's biggest moments happen.", img: "assets/images/world/station.svg" },
];

const KTH_EPISODES = [
  { num: 1, title: "First Petal", tagline: "A new season, a new face in the classroom.", summary: "Hina Tachibana transfers to Sakura Hills High School on the same morning the cherry trees bloom — and wastes no time asking the quietest boy in class to be in her photographs.", status: "released", img: "assets/images/episodes/ep01.svg" },
  { num: 2, title: "The Sound After Rain", tagline: "Some songs only make sense once you've heard the silence first.", summary: "A sudden downpour strands Ren and Hina in the music room, where she hears him play for the first time.", status: "released", img: "assets/images/episodes/ep02.svg" },
  { num: 3, title: "Borrowed Umbrella", tagline: "One umbrella. Two people. A very long walk home.", summary: "Yuto's meddling leads to Ren and Hina sharing an umbrella — and an uncomfortably honest conversation.", status: "released", img: "assets/images/episodes/ep03.svg" },
  { num: 4, title: "Rooftop Secrets", tagline: "Everyone has a place they go to disappear.", summary: "Hina finds Ren's rooftop hideout, and he finally shows her the song he's never played for anyone.", status: "released", img: "assets/images/episodes/ep04.svg" },
  { num: 5, title: "Summer Left Behind", tagline: "The festival ends. The feelings don't.", summary: "A summer festival brings the whole group together — and forces Ren to face what he's been avoiding.", status: "upcoming", img: "assets/images/episodes/ep05.svg" },
  { num: 6, title: "Where Spring Waits", tagline: "A year of photographs, and one more season to go.", summary: "As the cherry trees prepare to bloom again, Hina's project reaches its final frame.", status: "upcoming", img: "assets/images/episodes/ep06.svg" },
];

const KTH_NEWS = [
  { date: "2026.07.28", tag: "Announcement", title: "Kimi to Haru Official Website Opens", body: "Welcome to Hoshikawa City — explore the story, characters, and world of Kimi to Haru right here." },
  { date: "2026.07.14", tag: "Episode", title: "Episode 4 \u201cRooftop Secrets\u201d Now Available", body: "The fourth episode of Kimi to Haru is streaming now. Ren finally opens up on the rooftop." },
  { date: "2026.06.30", tag: "Music", title: "Opening Theme \u201cHaru no Oto\u201d Released", body: "The official opening theme, performed for the series, is now available on the Music page." },
  { date: "2026.06.10", tag: "Manga", title: "Manga Adaptation Begins Serialization", body: "A companion manga adaptation begins with Episode 1, Part 1 — read it in the Manga Reader." },
  { date: "2026.05.22", tag: "Announcement", title: "Kimi to Haru Greenlit for a Full Season", body: "Thank you for the incredible response to the pilot. A full season is officially in production." },
];
