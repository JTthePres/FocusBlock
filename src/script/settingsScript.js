document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get({ urlList: [] }, (data) => {
    // Recupera l'array urlList dallo storage o inizializzalo come un array vuoto se non esiste
    let urlList = data.urlList;
    updateUI(urlList);
  });

  function updateUI(urlList) {
    // Crea un elenco non ordinato (ul) per visualizzare gli URL
    var index =1;
    // Popola l'elenco con gli URL dallo storage
    urlList.forEach((url) => {
    document.querySelector('#list').insertAdjacentHTML('beforeend', ` 
    <div  class="site" data-value="${index}">
        <div class="key" data-value="${url}">${url}</div>
        <button class="deleteButton">delete</button>
        </div>
    `)
      index ++;
    });// Seleziona tutti gli elementi con classe "deleteButton"
var deleteButtons = document.getElementsByClassName("deleteButton");

// Itera su ciascun pulsante e aggiungi un gestore di eventi
for (var i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", function () {
    var key = this.parentNode.children[0].getAttribute("data-value");

    console.log(key);
    typeof key;
    var index;
    chrome.storage.sync.get({ urlList: [] }, (data) => {
      // Recupera l'array urlList dallo storage o inizializzalo come un array vuoto se non esiste
      let urlList = data.urlList;
      index = urlList.indexOf(key);
      let tmp = urlList.splice(index,1);
      // Salva l'array aggiornato nello storage di sincronizzazione
      chrome.storage.sync.set({ urlList: urlList }, () => {
        console.log("URL eliminato correttamente.");      
        updateUI(urlList);

      });
       tmp =index+1;
    console.log(index);
        chrome.declarativeNetRequest.updateDynamicRules({

      removeRuleIds: [tmp]
    }, function() {
      if (chrome.runtime.lastError) {
        console.error("Errore durante l'eliminazione delle regole di reindirizzamento:", chrome.runtime.lastError);
      } else {
        console.log("Regola eliminata con successo!");
      }
    }); 
  });
    });
    
}
 }
 });
