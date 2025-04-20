
  // Define a global app object to store the character data
let app = {
  character: {},
  prompts: [],  // Array to store prompts
  final_prompts: [],  // Array to store prompts
  current_prompt:''
  
};

function getAllPromots(content){
	const prompts = content.split(/-{2,}/)
		.map(p => p.trim())
		.filter(p => p.length > 0);

	return prompts;
}




// Function to convert the character descriptions to an object
function convertToJSObject(text) {
    const result = {};
    const lines = text.split('\n'); // Split the text into lines

    lines.forEach(line => {
        // Match lines in the format: CharacterName: Description
        const match = line.match(/^([^\:]+)\:\s*(.*)$/); 

        if (match) {
            const name = match[1].trim();  // Get the character name
            const description = match[2].trim();  // Get the character description
            
            // If the character name already exists in the result object, 
            // push the new description to the array
            if (result[name]) {
                result[name].push(description);
            } else {
                result[name] = [description];  // Initialize an array for new character name
            }
        }
    });

    return result;
}


// Function to get character descriptions for a given prompt
function getCharacterDescriptions(characters, prompt) {
    let descriptionText = '';

    // Loop through all characters in app.character
    for (let characterName in characters) {
        if (characters.hasOwnProperty(characterName)) {
            // Use a regular expression to match the whole word of the character name in the prompt
            const regex = new RegExp(`\\b${characterName}\\b`, 'i');  // \b ensures whole word match and 'i' makes it case-insensitive
            
            if (regex.test(prompt)) {
                // Add character description in the desired format
                descriptionText += `${characterName}: ${characters[characterName].join(', ')}\n`;
            }
        }
    }

    return descriptionText;
}
