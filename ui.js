

/*
document.getElementById("Generate1").addEventListener("click", async function() {
  const allCharactersText = document.getElementById("allCharacters").value;
  const promptsText = document.getElementById("prompts").value;

  // Convert input to structured data
  app.character = convertToJSObject(allCharactersText);
  app.prompts = getAllPromots(promptsText);
  
  // Clear previous final prompts
  app.final_prompts = [];

  // Process prompts with character descriptions
  app.prompts.forEach(prompt => {
    if (prompt.length > 5) {
      let f = '';
      let c = getCharacterDescriptions(app.character, prompt);
      
      if (c) {
        f = "Character Description " + c;
      }
      
      f = f + " " + prompt;
      app.final_prompts.push(f);
    }
  });

  // Send prompts to active tab
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Queue and process prompts
    for (const prompt of app.final_prompts) {
      await new Promise(resolve => {
        chrome.tabs.sendMessage(tab.id, { 
          action: "submitPrompt", 
          prompt: prompt 
        }, response => {
          console.log('Prompt submission response:', response);
          // Wait between prompts to avoid overwhelming the page
          setTimeout(resolve, 5000);
        });
      });
    }
  } catch (error) {
    console.error('Error submitting prompts:', error);
  }
});
*/




/*

// Event listener for the "Generate" button
document.getElementById("Generate").addEventListener("click", function() {
    const allCharactersText = document.getElementById("allCharacters").value;
    const promptsText = document.getElementById("prompts").value;

    // Convert character descriptions to app.character
    app.character = convertToJSObject(allCharactersText);
	app.prompts = getAllPromots(promptsText)
	
    console.log("Updated app.character: ", app.character);  // For debugging
	console.log("Updated app.character: ", app.prompts);  // For debugging
	
    processPromptsAsync(app.prompts)
	
});

function copyPromot(f){

}

/// Function to simulate processing a single prompt (dummy function)
function processSinglePrompt(prompt) {
    return new Promise(resolve => {
        console.log(`Processing prompt: ${prompt}`);  // Simulate prompt processing
		let f='';
		c= getCharacterDescriptions(app.character,prompt) ;
		if (c){
			f= "Character Description " + c;
		
		}
		f= f + " " + prompt ;
		copyPromot(f);
		
		console.log(`Full Processing prompt: ${f}`);  // Simulate prompt processing
		
		
        setTimeout(() => {
            console.log(`Completed processing: ${prompt}`);
            resolve();  // Resolve after processing
        }, 120000);  // 120 seconds (120,000 milliseconds) delay
    });
}

// Function to process prompts asynchronously with delay
async function processPromptsAsync(promptsArray) {
    for (let i = 0; i < promptsArray.length; i++) {
        const prompt = promptsArray[i];
        if (prompt.length > 50) {  // Only process if prompt length is greater than 50
            await processSinglePrompt(prompt);  // Wait for the prompt to be processed
        }
    }
}




*/


/*



function processFullText(content){
	const prompts = content.split(/-{2,}/)
		.map(p => p.trim())
		.filter(p => p.length > 0);

	queuePrompts(prompts);
}

*/
