document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("deleteAll").addEventListener("click", deleteAll);
  document.getElementById("exportBtn").addEventListener("click", exportAll);
  document.getElementById("openInportMenu").addEventListener("click", openInportPopup);


  chrome.storage.sync.get({ urlList: [] }, (data) => {
    let urlList = data.urlList;
    updateUI(urlList);
  });

  function updateUI(urlList) {
    this.document.querySelector('#list').innerHTML = '';
    var element_index = 1;
    urlList.forEach((url) => {
      document.querySelector('#list').insertAdjacentHTML('beforeend', `
        <div  class="site" data-value="${element_index}">
          <span class="key" data-value="${url}">${url}</span>
          <img  alt = "settings" class = "deleteButton" src  = "../../src/style/img/trash-can-solid.png" >
          </img>
        </div>
      `);
      element_index++;
    });

    var deleteButtons = document.getElementsByClassName("deleteButton");

    for (var i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", function(event) {
        manageDelete(event, element_index);
      });
    }
  }
          

  
function manageDelete(event,element_index) {
  var key = event.currentTarget.parentNode.children[0].getAttribute("data-value");
  console.log(key);
  typeof key;
  chrome.storage.sync.get({ urlList: [] }, (data) => {
    let urlList = data.urlList;
    remove_index = urlList.indexOf(key);
    let tmp = urlList.splice(remove_index, 1);

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
          console.log("Regola eliminata con successo!", j);
        }
      });
    }

    urlList.forEach((url, index) => {
      url += "*";
      if (index >= remove_index) {
        chrome.declarativeNetRequest.updateDynamicRules({
          addRules: [
            {
              id: index + 1,
              priority: 1,
              action: {
                type: 'redirect',
                "redirect": {
                  "extensionPath": "/src/pages/splashPage.html"
                }
              },
              condition: { urlFilter: url, resourceTypes: ['main_frame'] },
            },
          ],
        });
      }
    });
  });
} 

function deleteAll() {
  cleanNetBlockList();
  chrome.storage.sync.set({ urlList: [] }, () => {
    console.log("Lista pulita correttamente.");
  });    
  document.querySelector('#list').innerHTML = '';

}
function exportAll(params) {
  chrome.storage.sync.get(null, function(items) { 
    // Convert object to a string.
    var result = JSON.stringify(items);

    // Save as file
    var url = 'data:application/json;base64,' + btoa(result);
    chrome.downloads.download({
        url: url,
        filename: 'exported_list.json'
    });
});
}
function openInportPopup() {
  popupContainer = document.getElementById("popupContainer");

  popupContainer.innerHTML = `
    <div id="popupInport">
        <div id="closePopup">&times;</div>
        <input type="file" id="fileInput"  />
        <img alt = "settings" id = "importBtn" src  = "../../src/style/img/upload.png" >
        </img>
    </div>
  `;  
  document.addEventListener("mousedown", handleOutClick);
  document.getElementById("importBtn").addEventListener("click", importAll);
  document.querySelector("#closePopup").addEventListener("click", function() {
  popupContainer.innerHTML = "";
  });
}

function importAll() {

  var reader = new FileReader();
  reader.addEventListener('load', function() {
    deleteAll();
    resetStatus();
    var result = JSON.parse(reader.result);
    console.log(result);
    chrome.storage.sync.set(result, () => {
      console.log("Dati importati correttamente.");
    });
    updateUI(result.urlList);    

  });
  reader.readAsText(document.querySelector('input').files[0]);
  createNetBlockList();
}
});
function handleOutClick(event) {
  popupContainer = document.getElementById("popupContainer");
  if (!popupContainer.contains(event.target)) {
    popupContainer.innerHTML = "";

    document.removeEventListener("mousedown", handleOutClick);
  }
}