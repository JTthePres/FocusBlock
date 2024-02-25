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
    onStatus();
  } else {
    resetStatus();
  }
});

