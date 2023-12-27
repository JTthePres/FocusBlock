// Assume che il tuo elemento HTML abbia un ID 'customCheckbox'
const toggle = document.getElementById('customCheckbox');

toggle.addEventListener('change', function() {
  const currentStatus = toggle.checked;

  if (currentStatus) {
    chrome.storage.local.set({ blockStatus: "ON" }, function () {
      console.log("Block status set to ON");
    });
  } else {
    chrome.storage.local.set({ blockStatus: "OFF" }, function () {
      console.log("Block status set to OFF");
    });
  }
});

