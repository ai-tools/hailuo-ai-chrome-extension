function injectScriptFile(filename) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(filename);
//  script.onload = () => script.remove();
  (document.head || document.documentElement).appendChild(script);
}


injectScriptFile('injected.js'); // injects safely with <script src="...">


//injectSetEditorScript();  // Run it once at load

function callInjectedSetEditor() {
  const script = document.createElement('script');
  script.textContent = 'window.setEditor && window.setEditor();';
  (document.head || document.documentElement).appendChild(script);
//  script.remove();
}





var geditor;


window.addEventListener('editorReady', (event) => {

window.dispatchEvent(new CustomEvent('triggerPrompts'));
  // Now you know the editor is available on the page
  // If needed, you can communicate further via messaging or events
});



function triggerSetEditor() {
  window.dispatchEvent(new CustomEvent('triggerSetEditor'));
}

// Listen for the start event from the popup
window.addEventListener('startReplacement', () => {
  // Start replacing text every second
  console.log('startReplacement');
  const prompts = JSON.parse(window.localStorage.getItem('replacementLines') || '[]');
  //setEditor()
//  injectSetEditorScript();
  //callInjectedSetEditor();
  triggerSetEditor();


});







/////////////////
