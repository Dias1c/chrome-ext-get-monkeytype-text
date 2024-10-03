document.addEventListener('DOMContentLoaded', function() {
  var getElementButton = document.getElementById('btn__get_element');

  const status = document.getElementById('status')
  const setStatus = (value) => {
    status.innerText = value
    status.style.color = undefined
    if (value == 'success') {
      status.style.color = 'green'
      return
    }
    if (value == 'fail') {
      status.style.color = 'red'
      return
    }
  }

  const loadText = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "btn__get_element"}, function(response) {
        if (chrome.runtime.lastError) {
          // If the content script is not loaded yet, inject it
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content/index.js']
          }, function() {
            try {
              // After injection, try sending the message again
              chrome.tabs.sendMessage(tabs[0].id, {action: "btn__get_element"}, function(response) {
                document.getElementById('result').textContent = response.element;
                setStatus('success')
              });

            } catch (error) {
              setStatus('fail')
            }
          });
        } else {
          document.getElementById('result').textContent = response.element;
          setStatus('success')
        }
      });
    });
  }

  loadText()

  const body = this.querySelector('body')
  console.log("body",body)
  getElementButton.addEventListener('click', loadText);
});