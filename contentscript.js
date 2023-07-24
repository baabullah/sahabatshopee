document.addEventListener("contextmenu", (event) => {
  const target = event.target;
  if (target.style.backgroundImage.indexOf("url") != -1){
    event.preventDefault();
    const imageUrl = getBackgroundImageUrl(target);
    chrome.runtime.sendMessage({ action: "downloadImage", imageUrl });
  }
});

function getBackgroundImageUrl(element) {
  const backgroundImageStyle = element.style.backgroundImage;
  return backgroundImageStyle.slice(5, -2).replace(/"/g, "");
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "playAudio") {
    playDownloadCompleteAudio();
  }
});

function playDownloadCompleteAudio() {
  const audioUrl = chrome.runtime.getURL("download.mp3");
  const audio = new Audio(audioUrl);
  audio.play();
}