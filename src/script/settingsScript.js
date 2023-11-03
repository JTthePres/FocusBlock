document.addEventListener("DOMContentLoaded", function () {
chrome.storage.sync.get({ key: [] }, (data) => {
    const urlList = data.key;
    updateUI(urlList);
  });

  function updateUI(urlList) {
    // Crea un elenco non ordinato (ul) per visualizzare gli URL
    var index =1;
    // Popola l'elenco con gli URL dallo storage
    urlList.forEach((url) => {
    document.querySelector('#list').insertAdjacentHTML('beforeend', ` 
    <div  class="site" data-value="${index}">
        ${url}
        <button class="deleteButton">delete</button>
        </div>
    `)
      index ++;
    });// Seleziona tutti gli elementi con classe "deleteButton"
var deleteButtons = document.getElementsByClassName("deleteButton");

// Itera su ciascun pulsante e aggiungi un gestore di eventi
for (var i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", function () {
    var index = this.parentNode.getAttribute("data-value");
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [index]
    }, function() {
      if (chrome.runtime.lastError) {
        console.error("Errore durante l'eliminazione delle regole di reindirizzamento:", chrome.runtime.lastError);
      } else {
        console.log("Regola eliminata con successo!");
      }
    });
    chrome.storage.sync.remove(index-1, function() {
      if (chrome.runtime.lastError) {
        console.error("Errore durante la rimozione dell'elemento:", chrome.runtime.lastError);
      } else {
        console.log("Elemento rimosso con successo!");
      }
    });
  });
}
  }

})