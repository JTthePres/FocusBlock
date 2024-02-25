// ############# AUXILIARY FUNCTIONS #############

// Create a network block list from the urlList
function createNetBlockList() {
    chrome.storage.sync.get({ urlList: [] }, (data) => {
      let urlList = data.urlList;
      urlList.forEach((url, index) => {
        addNetBlockList(url, index + 1);
      });   
  
    });
  }

  // clean the network block list
  function cleanNetBlockList() {
    chrome.storage.sync.get({ urlList: [] }, (data) => {
      // Recupera l'array urlList dallo storage o inizializzalo come un array vuoto se non esiste
      let urlList = data.urlList;
      urlList.forEach((url, index) => {
        deleteRuleNetBlockList(index + 1);
      });   
    });
  }
  
  // delite a single rule
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

  // default behavior when toggle to off status
function resetStatus() {
  chrome.storage.local.set({ blockStatus: "OFF" }, function () {
    console.log("Block status set to OFF");
    cleanNetBlockList();
  });
}

  // default behavior when toggle to om status
function onStatus() {
  chrome.storage.local.set({ blockStatus: "ON" }, function () {
    console.log("Block status set to ON");
    createNetBlockList();
  });
}
