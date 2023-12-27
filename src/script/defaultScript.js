document.addEventListener("DOMContentLoaded", function () {

document.getElementById("addSite").addEventListener("click", addSite);

document.getElementById("settingsButton").addEventListener("click",function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("../src/pages/settingsPage.html") });
});



  // Chiama la funzione updateUI al caricamento della pagina
  chrome.storage.sync.get({ key: [] }, (data) => {
    const urlList = data.key;
    updateUI(urlList);
  });


function addSite() {
  var storageLen;
    // Query per l'URL della pagina attualmente attiva
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
          updateNetBlockList(url, urlList.length );
        });
        updateUI(urlList);
      });
      
    });
  }




  function updateUI(urlList) {
    const listContainer = document.getElementById("list");

    // Crea un elenco non ordinato (ul) per visualizzare gli URL
    const ul = document.createElement("ul");

    // Popola l'elenco con gli URL dallo storage
    urlList.forEach((url) => {
      const li = document.createElement("li");
      li.textContent = url;
      ul.appendChild(li);
    });

    // Sostituisci il contenuto precedente con il nuovo elenco
    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    listContainer.appendChild(ul);
  }});

function updateNetBlockList(url,storageLen) {

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

