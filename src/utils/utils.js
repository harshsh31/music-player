function getAudioDuration(url) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);
    });
    audio.addEventListener("error", (event) => {
      reject(`Error loading audio file: ${url}`);
    });
  });
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export async function addDurationsToSongs(songs) {
  for (const song of songs) {
    try {
      const duration = await getAudioDuration(song.url);
      song.duration = formatDuration(duration);
    } catch (error) {
      console.error(error);
      song.duration = null;
    }
  }
  return songs;
}
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? parseInt(result[1], 16) +
        "," +
        parseInt(result[2], 16) +
        "," +
        parseInt(result[3], 16)
    : null;
}
export function changeTheme(color) {
  document.documentElement.style.setProperty("--base", hexToRgb(color));
}
