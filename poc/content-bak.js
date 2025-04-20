// Function to handle text replacement
//alert('content-app11-v4');

let replacementInterval;

// Listen for the start event from the popup
window.addEventListener('startReplacement', () => {
  // Start replacing text every second
  console.log('startReplacement');
  const prompts = JSON.parse(window.localStorage.getItem('replacementLines') || '[]');
  queuePrompts(prompts)
  
//  replacementInterval = setInterval(replaceText, 1000);
});





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

	let txElement = document.querySelector('[placeholder="Unleash Your Creativity! Share Your Story Here"]');

	// Check if the txElement exists and interact with it
	if (txElement) {
	  console.log("Element found:", txElement);
	  console.log("Element not found");
	  // Example: Change the background color of the txElement
	  txElement.style.backgroundColor = 'lightblue';
	} else {
	  console.log("Element not found");
	}

	return 	txElement;
	
}

async function genVideo(prompt, index) {
 
	let el_textarea = findText(); 
	let createButton = document.querySelector(".create-form-create-button").childNodes[1];
	console.log('createButton' ,createButton);
	
    if (el_textarea) {        
        setTextArea(el_textarea, prompt);
        
    }

    if (el_textarea && createButton) {
        hoverElement(createButton);
        setTimeout(() => {
            createButton.click();
            console.log(`Button clicked for prompt ${index + 1}`);
        }, 500);
    } else {
        console.error("Button not found.");
    }
}


/////////////////


function isGenerationCancellable() {
    return Array.from(document.querySelectorAll('div'))
        .some(div => div.innerHTML.trim().toLowerCase().includes("cancel generation"));
}


function setTextArea(el_textarea, text) {
    if (!el_textarea) {
        console.error("Error : setTextArea  Textarea not found.");
        return;
    }

    try {
        // Directly set innerHTML
        el_textarea.innerHTML = text;

        // If it's a React-managed el_textarea, you might need to trigger updates
        const nativeInputDescriptor = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype, 
            'value'
        );

        if (nativeInputDescriptor) {
            const nativeInputSetter = nativeInputDescriptor.set;
            nativeInputSetter.call(el_textarea, text);
        }

        // Dispatch events to ensure framework detection
        const events = ['input', 'change', 'blur'];
        events.forEach(eventType => {
            const event = new Event(eventType, { 
                bubbles: true, 
                cancelable: true 
            });
            el_textarea.dispatchEvent(event);
        });

        console.log("Textarea innerHTML updated successfully");
    } catch (error) {
        console.error("Error updating el_textarea innerHTML:", error);
    }
}


function hoverElement(txElement) {
    if (!txElement) {
        console.error("Button txElement not found.");
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
//////////////////////////////////
/*
  // Find the textarea and submit button
  //const textarea = document.querySelector('textarea');
  //const submitButton = document.querySelector('button:contains("submit")');
  
function replaceText() {
  // Retrieve the stored lines
  const storedLines = JSON.parse(window.localStorage.getItem('replacementLines') || '[]');
  
  
    // If no more lines, stop the interval
    if (storedLines.length === 0) {
		console.log('replaceText empty'); 
		clearInterval(replacementInterval);
			
	}
	
  
  console.log('replaceText');
  console.log('storedLines', storedLines);
  console.log('storedLines', storedLines.length);
  let textarea1='ss';
  let submitButton1='aass';
  
  if (storedLines.length <10 ){
	 const currentLine = storedLines.shift();
	 window.localStorage.setItem('replacementLines', JSON.stringify(storedLines));
	 return ;	
	  
  }
  
  if (storedLines.length > 0 && textarea1 && submitButton1) {
    // Remove and return the first line
    const currentLine = storedLines.shift();
    
	console.log(currentLine)
	
	alert(currentLine);
	
    // Update the textarea
    //textarea.value = currentLine;
    
    // Click the submit button
    //submitButton.click();
    
    // Update the stored lines
    window.localStorage.setItem('replacementLines', JSON.stringify(storedLines));
    
	
  }
}

*/