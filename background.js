chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "downloadImage") {
    const imageUrl = message.imageUrl;
    chrome.downloads.download({ url: imageUrl }, () => {
      console.log("Image downloaded");
	  playDownloadCompleteAudio();
    });
  }
});

function playDownloadCompleteAudio() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	const activeTab = tabs[0];
	chrome.tabs.sendMessage(activeTab.id, { action: "playAudio" });
  });
}