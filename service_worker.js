'use strict';


  // CLEANING AND INSTANTIATE AT THE FIRST INSTALLATION
  chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === "install") {
      // Questo codice verrà eseguito solo all'installazione dell'estensione
      console.log("Estensione installata!");
  
      // Elimina tutto il Chrome storage
      chrome.storage.sync.clear(function() {
        if (chrome.runtime.lastError) {
          console.error("Errore durante la cancellazione del Chrome storage:", chrome.runtime.lastError);
        } else {
          console.log("Chrome storage eliminato con successo!");
        }
      });
      
    } 
    for (let i = 0; i < 100; i++) {
      chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [i]
  }, function() {
    if (chrome.runtime.lastError) {
      console.error("Errore durante l'eliminazione delle regole di reindirizzamento:", chrome.runtime.lastError);
    } else {
      console.log("Tutte le regole di reindirizzamento eliminate con successo!");
    }
  });
    }
  chrome.storage.sync.set({ urlList: []}, function () {
    console.log("list initialized")
  });
  chrome.storage.local.get(['blockStatus'], async function (result) {
    let blockStatus = result.blockStatus
    if (blockStatus === undefined) {
  
        chrome.storage.local.set({blockStatus: "OFF"}, function () {}); // save it in local.
    }})
});


// SWITCH TO TOGGLE OFF AT STARTUP
chrome.runtime.onStartup.addListener(function() {
  chrome.storage.local.get(['blockStatus'], async function (result) {
    let blockStatus = result.blockStatus
    if (blockStatus === undefined) {
  
        chrome.storage.local.set({blockStatus: "OFF"}, function () {}); // save it in local.
    }})

 })  

 