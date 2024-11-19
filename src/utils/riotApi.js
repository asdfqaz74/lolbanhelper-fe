import axios from "axios";

const riotApi = axios.create({
  baseURL: "https://kr.api.riotgames.com/lol",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchPUUIDBySummonerName = async (summonerName) => {
  try {
    const response = await riotApi.get(
      `/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`,
      {
        headers: {
          "X-Riot-Token": `${process.env.LEAGUE_OF_LEGENDS_API_KEY}`,
        },
      }
    );
    return response.data.puuid;
  } catch (e) {
    console.error(e);
  }
};

export default riotApi;
