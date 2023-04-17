const API_KEY = "642140f6-94c7-4dcb-8b3a-24015dec022c";
const PLAYER_NAME = "Qyrhal";
const skillsList = document.getElementById('skills');

async function fetchData() {
  try {
    const response = await fetch(
      `https://api.hypixel.net/player?key=${API_KEY}&name=${PLAYER_NAME}&game=skyblock`
    );
    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to fetch data");
    }

    const { stats } = data.player;

    if (!stats) {
      throw new Error("Player has no stats");
    }

    const skillsData = [
      { name: "farming", level: stats.SkyBlockSkills?.FARMING?.level ?? 0 },
      { name: "mining", level: stats.SkyBlockSkills?.MINING?.level ?? 0 },
      { name: "combat", level: stats.SkyBlockSkills?.COMBAT?.level ?? 0 },
      { name: "foraging", level: stats.SkyBlockSkills?.FORAGING?.level ?? 0 },
      { name: "fishing", level: stats.SkyBlockSkills?.FISHING?.level ?? 0 },
      { name: "enchanting", level: stats.SkyBlockSkills?.ENCHANTING?.level ?? 0 },
      { name: "alchemy", level: stats.SkyBlockSkills?.ALCHEMY?.level ?? 0 },
      { name: "carpentry", level: stats.SkyBlockSkills?.CARPENTRY?.level ?? 0 },
      { name: "runecrafting", level: stats.SkyBlockSkills?.RUNECRAFTING?.level ?? 0 },
      { name: "taming", level: stats.SkyBlockSkills?.TAMING?.level ?? 0 },
    ];

    displaySkills(skillsData);
  } catch (error) {
    console.error(error);
    alert("Failed to fetch data");
  }
}


fetchData();
