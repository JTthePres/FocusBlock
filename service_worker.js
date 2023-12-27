'use strict';
/* chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      // URL del sito a cui si sta cercando di accedere
      const requestedUrl = details.url;
  
      // Recupera l'elenco di URL salvati nello storage
      chrome.storage.sync.get({ key: [] }, (data) => {
        const urlList = data.key;
        console.log("ciao");
        // Controlla se il sito corrisponde a uno dei siti nell'elenco
        if (urlList.includes(requestedUrl)) {
          // Esegui il redirect a un'altra pagina
          chrome.tabs.update({ url: "../pages/blockPage.html" });
          //return { redirectUrl: "https://www.pagina-di-redirect.com" };
        }
      });
    },
    {
      urls: ["<all_urls>"],
      types: ["main_frame"],
    },
    ["blocking"]
  ); */

  // 

  // chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
  //   const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
  //   console.log(msg);
  // });
  
  // console.log('Service worker started.');
  // chrome.declarativeNetRequest.onRequest.getBlocked((details) => {
  //   // Verifica se la richiesta è stata bloccata per uno degli URL nella tua lista
  //     // La richiesta è stata bloccata, quindi crea una nuova scheda con la "splash screen"
  //     chrome.tabs.create({ url: "src/pages/blockPage.html" });
  // });

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
});
  
  
 