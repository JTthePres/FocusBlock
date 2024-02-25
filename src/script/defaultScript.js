document.addEventListener("DOMContentLoaded", function () {

document.getElementById("addSite").addEventListener("click", addSite);

document.getElementById("settingsButton").addEventListener("click",function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("../src/pages/settingsPage.html") });
});

//create an item on the storage for the site and then call the function to add the rule
  function addSite() {
    var storageLen;
      chrome.storage.local.get(['blockStatus'], function (result) {
        let blockStatus = result.blockStatus;
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const current_urll = new URL(tabs[0].url);
        const url = current_urll.origin;
        chrome.storage.sync.get({ urlList: [] }, (data) => {
          let urlList = data.urlList || [];
        
          urlList.push(url);
        
          chrome.storage.sync.set({ urlList: urlList }, () => {
            console.log("URL aggiunto in ultima posizione alla lista.");
            updateUI();
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

  //create a rule from one url 
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

