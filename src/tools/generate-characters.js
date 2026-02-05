import fs from "fs";

const names = [
  "Spider-Man",
  "Iron Man",
  "Captain America",
  "Thor",
  "Hulk",
  "Black Widow",
  "Hawkeye",
  "Doctor Strange",
  "Black Panther",
  "Scarlet Witch",
  "Vision",
  "Ant-Man",
  "Wasp",
  "Star-Lord",
  "Gamora",
  "Drax",
  "Rocket Raccoon",
  "Groot",
  "Loki",
  "Nick Fury",
  "Wolverine",
  "Deadpool",
  "Storm",
  "Cyclops",
  "Jean Grey",
  "Magneto",
  "Professor X",
  "Daredevil",
  "Punisher",
  "Venom",
  "Doctor Doom",
  "Fantastic Four",
  "Silver Surfer",
  "Galactus",
  "Thanos",
  "Shang-Chi",
  "Moon Knight",
  "Ms. Marvel",
  "Captain Marvel",
  "Ghost Rider",
  "Blade",
  "Elektra",
  "Kingpin",
  "Green Goblin",
  "Ultron",
  "Red Skull",
  "Winter Soldier",
  "Falcon",
  "She-Hulk",
  "War Machine",
];

const characters = names.map((name, index) => {
  const id = index + 1;
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  return {
    id,
    name,
    description: `${name} is one of Marvel's iconic characters.`,
    modified: "2024-01-01T00:00:00Z",
    thumbnail: {
      path: `assets/img/characters/${slug}`,
      extension: "jpg",
    },
    resourceURI: `http://gateway.marvel.com/v1/public/characters/${id}`,
    comics: { available: 0, collectionURI: "", items: [], returned: 0 },
    series: { available: 0, collectionURI: "", items: [], returned: 0 },
    stories: { available: 0, collectionURI: "", items: [], returned: 0 },
    events: { available: 0, collectionURI: "", items: [], returned: 0 },
    urls: [],
  };
});

const output = {
  data: {
    results: characters,
  },
};

fs.writeFileSync(
  "./src/assets/mock/characters.json",
  JSON.stringify(output, null, 2),
);

console.log("✅ characters.json generated!");
