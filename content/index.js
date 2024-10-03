chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "btn__get_element") {
      // Replace this with the specific element you want to get
      var words = document.getElementById('words');
      const wordList = words.getElementsByClassName('word')

      let text = ''
      for (let i = 0; i < wordList.length; i++) {
        const word = wordList[i];
        if (i != 0) text += ' '; 
        text += word.textContent;
      }

      sendResponse({ element: text });
    }
  }
);