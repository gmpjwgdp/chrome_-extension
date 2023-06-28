const checkbox = document.getElementById('switch1')

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["visible"], (result) => {
    if (result.visible === undefined) {
      chrome.storage.local.set({
        visible: true,
      });
      checkbox.checked = true;
    } else if (result.visible){
      checkbox.checked = true;
    }
  });
});

checkbox.addEventListener('change', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        visible: checkbox.checked,
      }
    );
    chrome.storage.local.set({
      visible: checkbox.checked,
    });
  });
})