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

