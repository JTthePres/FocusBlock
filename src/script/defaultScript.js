document.addEventListener("DOMContentLoaded", function () {

document.getElementById("addSite").addEventListener("click", addSite);

document.getElementById("settingsButton").addEventListener("click",function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("../src/pages/settingsPage.html") });
});

  function addSite() {
    var storageLen;
      // Query per l'URL della pagina attualmente attiva
      chrome.storage.local.get(['blockStatus'], function (result) {
        let blockStatus = result.blockStatus;
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const current_urll = new URL(tabs[0].url);
        const url = current_urll.origin;
        chrome.storage.sync.get({ urlList: [] }, (data) => {
          // Recupera l'array urlList dallo storage o inizializzalo come un array vuoto se non esiste
          let urlList = data.urlList || [];
        
          // Aggiungi il nuovo URL alla fine dell'array
          urlList.push(url);
        
          // Salva l'array aggiornato nello storage di sincronizzazione
          chrome.storage.sync.set({ urlList: urlList }, () => {
            console.log("URL aggiunto in ultima posizione alla lista.");
            updateUI();
            //if(checkStatus())
            if (blockStatus == "ON") {
              addNetBlockList(url, urlList.length );}

          });
        });
        
      });

    });}
  
  

  function updateUI() {
    const banner = document.getElementById("banner");
    banner.style.display = "block";
    // Set the banner text
    banner.textContent = "URL successfully added to the list!";
    setTimeout(function() {
      banner.style.display = "none";
    }, 1000);
  }});

function addNetBlockList(url,storageLen) {

console.log(storageLen);
url+= "*"
chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [storageLen],
  addRules: [
    {
      id: storageLen,
      priority: 1,
      action: { type: 'redirect',       
       "redirect": {
        "extensionPath": "/src/pages/splashPage.html"   
      } },
      condition: { urlFilter: url, resourceTypes: ['main_frame'] },
    },
  ],
});
}

