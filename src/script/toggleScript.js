// Assume your HTML element has an ID 'customCheckbox'
const toggle = document.getElementById('customCheckbox');

// Set the initial state of the toggle based on the stored blockStatus
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get('blockStatus', function(data) {
    toggle.checked = data.blockStatus == "ON";
  });
});

toggle.addEventListener('change', function() {
  const currentStatus = toggle.checked;

  if (currentStatus) {
    chrome.storage.local.set({ blockStatus: "ON" }, function () {
      console.log("Block status set to ON");
      createNetBlockList();
    });
  } else {
    chrome.storage.local.set({ blockStatus: "OFF" }, function () {
      console.log("Block status set to OFF");
      cleanNetBlockList();
    });
  }
});

