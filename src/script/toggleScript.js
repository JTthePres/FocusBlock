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

function createNetBlockList() {
  chrome.storage.sync.get({ urlList: [] }, (data) => {
    // Recupera l'array urlList dallo storage o inizializzalo come un array vuoto se non esiste
    let urlList = data.urlList;
    urlList.forEach((url, index) => {
      addNetBlockList(url, index + 1);
    });   

  });
}
function cleanNetBlockList() {
  chrome.storage.sync.get({ urlList: [] }, (data) => {
    // Recupera l'array urlList dallo storage o inizializzalo come un array vuoto se non esiste
    let urlList = data.urlList;
    urlList.forEach((url, index) => {
      deleteRuleNetBlockList(index + 1);
    });   
  });
}

function deleteRuleNetBlockList(index) {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [index]
  }, function() {
    if (chrome.runtime.lastError) {
      console.error("Errore durante l'eliminazione delle regole di reindirizzamento:", chrome.runtime.lastError);
    } else {
      console.log("Regola eliminata con successo!");
    }
  }); 
}