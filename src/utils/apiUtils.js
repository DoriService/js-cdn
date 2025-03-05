import { urls } from "./urls.js";

export async function fetchBotDataBySharingID(sharingID) {
  const url = urls.demoSharingData + sharingID;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json(); // assuming the server returns JSON
  return data;
}
