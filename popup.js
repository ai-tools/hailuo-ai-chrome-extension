



// Event listener for the "Generate" button
document.getElementById("Generate").addEventListener("click", function() {
	
//  setEditor2();
  process();
  
});





// Prevent default popup close behavior
window.addEventListener('blur', function(e) {
  e.preventDefault();
  window.focus();
});
///// Stirage

function cacheText(eId, elStorage){
	
  //setEditor2();
	
  const textInput = document.getElementById(eId);

  
  // Load saved text from local storage when popup opens
   chrome.storage.local.get([elStorage], function(result) {
    if (result.elStorage) {
      textInput.value = result.elStorage;
    }
  });
  // Save text to local storage when input changes
  textInput.addEventListener('input', function() {
    chrome.storage.local.set({elStorage: this.value}, function() {
      console.log('Text saved', this.value);
    });
  });
  
	
}


document.addEventListener('DOMContentLoaded', function() {

// Prevent popup from closing when clicking outside
/*
  document.addEventListener('click', function(event) {
    event.stopPropagation();
  }, true);
*/
//setEditor2();
  const t1 ='allCharacters';
  const t1Storage ='allCharactersStorage';
  
  

  cacheText(t1,t1Storage);
  
  
  const t2 ='prompts';
  const t2Storage ='promptsStorage';
 // alert('abcdsss')

  cacheText(t2,t2Storage);
    
});








function process(){
	const allCharactersText = document.getElementById("allCharacters").value;
    const promptsText = document.getElementById("prompts").value;

    // Convert character descriptions to app.character
    app.character = convertToJSObject(allCharactersText);
	app.prompts = getAllPromots(promptsText)
	
    console.log("Updated app.character: ", app.character);  // For debugging
	console.log("Updated app.character: ", app.prompts);  // For debugging
	read_all();
	console.log('final_prompts' , app.final_prompts );  // Simulate single_prompt processing
	sendToMain(app.final_prompts);	
	
	
}


function read_all(){

	for (let i = 0; i < app.prompts.length; i++) {
        const curr_prompt = app.prompts[i];
        if (curr_prompt.length > 5) {  // Only process if prompt length is greater than 50
             processSinglePrompt(curr_prompt);  // Wait for the prompt to be processed
        }
    }	
	
}

/// Function to simulate processing a single prompt (dummy function)
function processSinglePrompt(single_prompt) {
    
        console.log(`Processing single_prompt: ${single_prompt}`);  // Simulate single_prompt processing
		let f='';
		c= getCharacterDescriptions(app.character,single_prompt) ;
		if (c){
			f= "Character Description " + c;
		
		}
		f= f + " " + single_prompt ;
		console.log(`Full Processing single_prompt: ${f}`);  // Simulate single_prompt processing
		app.final_prompts.push(f);
	
		console.log('f' , app.final_prompts );  // Simulate single_prompt processing
	
	
}


async function sendToMain(p_data){
	
  try {
    // Query the active tab
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
	
	console.log(tab.id)
	
    // Send the lines to the content script
    await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: (data) => {
        // Store the lines in the page's local storage
        window.localStorage.setItem('replacementLines', JSON.stringify(data));
        
        // Dispatch a custom event to notify the content script
        window.dispatchEvent(new CustomEvent('startReplacement'));
      },
      args: [p_data]
    });

    // Close the popup
  //  window.close();
  } catch (error) 
  {
    console.log('sendToMain Error starting replacement:', error);
  }
	
}


