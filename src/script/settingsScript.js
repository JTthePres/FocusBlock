document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("deleteAll").addEventListener("click", deleteAll);
  chrome.storage.sync.get({ urlList: [] }, (data) => {
    // Recupera l'array urlList dallo storage o inizializzalo come un array vuoto se non esiste
    let urlList = data.urlList;
    updateUI(urlList);
  });

  function updateUI(urlList) {
    // Crea un elenco non ordinato (ul) per visualizzare gli URL
    var element_index = 1;
    // Popola l'elenco con gli URL dallo storage
    urlList.forEach((url) => {
      document.querySelector('#list').insertAdjacentHTML('beforeend', `
        <div  class="site" data-value="${element_index}">
          <div class="key" data-value="${url}">${url}</div>
          <button class="deleteButton">delete</button>
        </div>
      `);
      element_index++;
    });

    // Seleziona tutti gli elementi con classe "deleteButton"
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
          remove_index = urlList.indexOf(key);
          let tmp = urlList.splice(remove_index, 1);
          // Salva l'array aggiornato nello storage di sincronizzazione
          chrome.storage.sync.set({ urlList: urlList }, () => {
            console.log("URL eliminato correttamente.");
            updateUI(urlList);
          });
          tmp = remove_index + 1;
          console.log(remove_index);
          chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [tmp]
          }, function () {
            if (chrome.runtime.lastError) {
              console.error("Errore durante l'eliminazione delle regole di reindirizzamento:", chrome.runtime.lastError);
            } else {
              console.log("Regola eliminata con successo!");
            }
          });
          for (let j = tmp; j < element_index; j++) {
              chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [j]
              }, function () {
                if (chrome.runtime.lastError) {
                  console.error("Errore durante l'eliminazione delle regole di reindirizzamento:", chrome.runtime.lastError);
                } else {
                  console.log("Regola eliminata con successo!",j);
                }
              });
            }
          urlList.forEach((url, index) => {
            url+= "*"
            if (index >= remove_index){
            chrome.declarativeNetRequest.updateDynamicRules({
              addRules: [
                {
                  id: index+1,
                  priority: 1,
                  action: { type: 'redirect',       
                   "redirect": {
                    "extensionPath": "/src/pages/splashPage.html"   
                  } },
                  condition: { urlFilter: url, resourceTypes: ['main_frame'] },
                },
              ],
            });}
          });


          
        });
      });
    }
  }
});

function deleteAll() {
  cleanNetBlockList();
  chrome.storage.sync.set({ urlList: [] }, () => {
    console.log("Lista pulita correttamente.");
    updateUI(urlList);
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