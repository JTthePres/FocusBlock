## FocuBlock ##
FocusBlock is an extension for Chromium-based browsers (written in Manifest 3) that aims to improve productivity during work sessions.
In fact, it's a filter that blocks the selected websites when it's in focus mode. So a user can define a list of sites that he thinks are distracting for him and during studying/work sessions, plug one the focus mode to focus only on what needs to be done.
Sites can be added to the list in two ways: by simply pressing the "Add Site" button of the extension in the desired page or by importing a previous list using the Import menu in the Settings page.
In the settings menu it's possible to see the current list, manage it and export it to a .json file.
**Technologies used:**.
- chrome.storage API --> to store the url list;
-NetDeclarativeRequest API --> to create redirect rules to a splash screen when surfing to a blocked site. All rules are initialised only when focus mode is turned on, turning off will clear all rules.