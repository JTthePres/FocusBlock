document.addEventListener("DOMContentLoaded", function () {
document.getElementById("addSite").addEventListener("click", addSite);

function addSite(params) {
    // Query per l'URL della pagina attualmente attiva
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;

      // Recupera l'elenco esistente di URL dallo storage di sincronizzazione
      chrome.storage.sync.get({ key: [] }, (data) => {
        let urlList = data.key;

        // Aggiungi l'URL attuale alla lista
        urlList.push(url);

        // Salva la lista aggiornata nello storage di sincronizzazione
        chrome.storage.sync.set({ key: urlList }, () => {
          console.log("URL added to the list.");
        });
        updateUI(urlList);
      });
      updateNetBlockList(url,0);
    });
  }

  // Chiama la funzione updateUI al caricamento della pagina
  chrome.storage.sync.get({ key: [] }, (data) => {
    const urlList = data.key;
    updateUI(urlList);
  });

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
function updateNetBlockList(url,len) {

/*       let id = len + 1;
    
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 10,
            priority: 1,
            action: { type: 'block' },
            condition: { urlFilter: url, resourceTypes: ['main_frame'] },
          },
        ],
        removeRuleIds: [id],
    }); */
/*     const newRules =  [
      {
        id: 10,
        priority: 1,
        action: { type: 'block' },
        condition: { urlFilter: url, resourceTypes: ['main_frame'] },
      },
    ];
const oldRules =  chrome.declarativeNetRequest.getDynamicRules();
const oldRuleIds = oldRules.map(rule => rule.id);

// Use the arrays to update the dynamic rules
 chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: oldRuleIds,
  addRules: newRules
}); */
chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [1],
    addRules: [
    {
      id: 1,
      priority: 1,
      action: { type: 'block' },
      condition: { urlFilter: "https://www.google.com/*", resourceTypes: ['main_frame'] },
    },
  ],
});
url+= "*"
chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [10],
  addRules: [
    {
      id: 10,
      priority: 1,
      action: { type: 'block' },
      condition: { urlFilter: url, resourceTypes: ['main_frame'] },
    },
  ],
});
}