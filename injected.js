// File: injected-editor.js

var ed1;

window.setEditor = function () {
    console.log("Injected setEditor running");
  
    const el = document.getElementById('video-create-textarea');
    if (!el) {
      console.warn('Element not found');
      return;
    }
  
    const fiberKey = Object.keys(el).find(k => k.startsWith('__reactFiber$'));
    if (!fiberKey) {
      console.warn('React fiber key not found');
      return;
    }
  
    const fiberNode = el[fiberKey];
    let node = fiberNode;
    let editor = null;
  
    while (node) {
      const props = node.memoizedProps;
      const state = node.memoizedState;
  
      if (props?.editor) {
        editor = props.editor;
        break;
      }
      if (state?.editor) {
        editor = state.editor;
        break;
      }
  
      node = node.return;
    }
  
    if (editor) {
      window.editor = editor;
      ed1=editor;
      console.log('✅ Slate editor instance attached to window.editor:', editor);
  
  
      const detail=  {
        hasEditor: true,
       // editor: editor,
        children: editor.children,
        selection: editor.selection
      }

      
  
      const event = new CustomEvent('editorReady', {
        detail
      });

      window.dispatchEvent(event);

      console.log('✅ Slate editor instance attached to window.editor: informred', editor);
  
  
  
  
  
  
  
  
  
    } else {
      console.warn('Editor not found in fiber tree');
    }
  };
  





  function clearEditorContent(editor) {
    if (!editor || !editor.children || !editor.apply) {
      console.error('clearEditorContent Invalid editor instance');
      return;
    }
  
    const ops = [];
  
    for (let i = editor.children.length - 1; i >= 0; i--) {
      ops.push({
        type: 'remove_node',
        path: [i],
        node: editor.children[i],
      });
    }
  
    ops.forEach(op => editor.apply(op));
  
    console.log('✅ All content removed.');
  }
  
  
  function insertBasicNode(editor, text = 'Hello from fallback insert!') {
    console.log(editor);
    console.log(window.editor);
    
    
    if (!editor || !editor.apply) {
      console.log('Editor is not valid or not ready.', editor, geditor, window.editor);
      //return;
    }
  
    console.log(editor.children);
  
  
  
    const node = {
      type: 'paragraph',
      children: [{ text }]
    };
  
    const operation = {
      type: 'insert_node',
      path: [editor.children.length],
      node
    };
  
    editor.apply(operation);
  
    console.log('✅ Node inserted directly using editor.apply');
  }
  
  
  function queuePrompts(prompts) {
      
      let currentlyProcessing = 0;
      let queuedPrompts = [...prompts];
  
      function processNextPrompt() {
          if (queuedPrompts.length === 0 || currentlyProcessing >= 3) {
              return;
          }
          
  
          if (!isGenerationCancellable()) {
              currentlyProcessing++;
              console.error("Queue Empty");
              const prompt = queuedPrompts.shift();
              genVideo(prompt, prompts.length - queuedPrompts.length);
              console.log("genVideo");
              console.log(prompt);
              setTimeout(() => {
                  currentlyProcessing--;
                  processNextPrompt();
              }, 15000); // 12 second  delay between prompts
          } else {
              console.log("Queue Found wait 5 sec");
              setTimeout(processNextPrompt, 5000);
          }
      }
      console.error("Next Item");
      processNextPrompt();
  }
  
  
  function findText(){
  
      let textAreaDiv = document.getElementById('video-create-textarea');
  
      // Check if the txElement exists and interact with it
      if (textAreaDiv) {
        console.log("Element found:", textAreaDiv);
        console.log("Element not found");
        // Example: Change the background color of the txElement
  //	  textAreaDiv.style.backgroundColor = 'lightblue';
      } else {
        console.log("Element not found");
      }
  
      return 	textAreaDiv;
      
  }
  
  
  function findButton(){
  
    let el =document.querySelector('.pink-gradient-btn');
    return el;

      let spanElement = document.evaluate(
      '//span[text()="30"]', 
      document, 
      null, 
      XPathResult.FIRST_ORDERED_NODE_TYPE, 
      null
  ).singleNodeValue;

  if (!spanElement){

    spanElement = document.evaluate(
        '//span[text()="2"]', 
        document, 
        null, 
        XPathResult.FIRST_ORDERED_NODE_TYPE, 
        null
    ).singleNodeValue;
  

  }

  if (!spanElement){
    spanElement = document.evaluate(
        '//span[text()="4"]', 
        document, 
        null, 
        XPathResult.FIRST_ORDERED_NODE_TYPE, 
        null
    ).singleNodeValue;
  

  }

  if (!spanElement){
    spanElement = document.evaluate(
        '//span[text()="1"]', 
        document, 
        null, 
        XPathResult.FIRST_ORDERED_NODE_TYPE, 
        null
    ).singleNodeValue;
  

  }
  const parentDiv = spanElement.parentElement;
  
  return parentDiv;
  
      
  }
  
  async function genVideo(prompt, index) {
   
      const main="Cinematic realastic greek european 7th century dark theme natural dark gloomy colors earthy environment real-looking 6th-century toga "
      let el_textarea = findText();
      
      if (!el_textarea){
          console.error("Text Area not found");
      }
      
      let createButton = findButton();
      console.log('createButton' ,createButton);
      
  
      if (el_textarea && createButton) {
          setTextArea(el_textarea,  main + " " + prompt);
  
          createButton.dispatchEvent(new MouseEvent('mouseover'));
          setTimeout(() => createButton.click(), 50);
      } else {
          console.error("Button not found.");
      }
  }
  
  
  /////////////////
  
  
  function isGenerationCancellable() {

    if (isGenerationCountMany()){
      return false;
    }
   // return false; //todo remove
      return Array.from(document.querySelectorAll('div'))
          .some(div => div.innerHTML.trim().toLowerCase().includes("cancel generation"));
  }
  
  function isGenerationCountMany() {
    const cnt = Array.from(document.querySelectorAll('div'))
        .filter(div => div.innerHTML.trim().toLowerCase().includes("content generation"))
        .length;

    return cnt >= 7;
  }

  
  
  
  
  
  function setTextArea(el_textarea, text) {
  
    //clear old content
     clearEditorContent(window.editor);

      console.log(window.editor);
  
      insertBasicNode(window.editor,text);
  

  }
  
  
  function hoverElement(txElement) {
      if (!txElement) {
          console.log("Button txElement not found.");
          return;
      }
  
      // Simulate mouse events
      ['mouseenter', 'mouseover'].forEach(eventType => {
          txElement.dispatchEvent(new MouseEvent(eventType, {
              bubbles: true,
              cancelable: true
          }));
      });
  }
  


  // Listen for external trigger
  window.addEventListener('triggerSetEditor', () => {
    window.setEditor?.();
  });
  

  window.addEventListener('triggerPrompts', () => {
    
    //prompts=['dddd','ddddd'];
    const prompts = JSON.parse(window.localStorage.getItem('replacementLines') || '[]');

    
    queuePrompts(prompts);
    
  });




