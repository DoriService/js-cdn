export async function fetchBotDataBySharingID(sharingID) {
  const url = "https://demoapi.dori.tech/bot-sharing-data/" + sharingID;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json(); // assuming the server returns JSON
  return data;
}
