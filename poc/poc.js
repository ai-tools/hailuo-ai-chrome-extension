// Find the div by ID

let textAreaDiv2 = document.getElementById('video-create-textarea');


// Find the div by ID
let textAreaDiv = document.getElementById('video-create-textarea');

textAreaDiv = document.getElementById('video-create-textarea');

if (textAreaDiv) {
  // Dispatch a click event to simulate clicking the div (focus it)
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  textAreaDiv.dispatchEvent(clickEvent);

  // Ensure the div is focused (some frameworks require explicit focus)
  textAreaDiv.focus();

  // Simulate pasting the prompt
  const promptText = 'abc'; // Your prompt

  try {
    // Create a paste event with clipboard data
    const clipboardData = new DataTransfer();
    clipboardData.setData('text/plain', promptText);

    const pasteEvent = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      clipboardData: clipboardData
    });

    // Dispatch the paste event
    textAreaDiv.dispatchEvent(pasteEvent);

    // Dispatch an input event as a fallback to ensure view model updates
    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true
    });
    textAreaDiv.dispatchEvent(inputEvent);

    console.log('Paste simulation completed.');
  } catch (err) {
    console.error('Error simulating paste:', err);

    // Fallback: Simulate typing each character
    const simulateTyping = (text) => {
      for (const char of text) {
        // Simulate keydown
        const keydownEvent = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: char
        });
        textAreaDiv.dispatchEvent(keydownEvent);

        // Simulate keypress
        const keypressEvent = new KeyboardEvent('keypress', {
          bubbles: true,
          cancelable: true,
          key: char
        });
        textAreaDiv.dispatchEvent(keypressEvent);

        // Simulate input (append character)
        const inputEvent = new InputEvent('input', {
          bubbles: true,
          cancelable: true,
          data: char
        });
        textAreaDiv.dispatchEvent(inputEvent);
      }
    };

    simulateTyping(promptText);
    console.log('Typing simulation completed as fallback.');
  }
} else {
  console.log('Div with ID video-create-textarea not found.');
}

/*

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('#video-create-textarea').click();
  //await page.locator('#video-create-textarea').fill('eeeeeeWwewewe');
  //await page.goto('https://hailuoai.video/create');
  
  await page.locator('#video-create-textarea').fill('Nawal');
});

if (textAreaDiv) {
  // Dispatch a click event to simulate clicking the div
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  textAreaDiv.dispatchEvent(clickEvent);

  // Simulate copy-paste by updating the DOM
  const promptText = 'abc'; // Your prompt
  const leafSpan = textAreaDiv.querySelector('span[data-slate-leaf="true"]');

  if (leafSpan) {
    // Update the span to match the desired structure
    leafSpan.innerHTML = `<span data-slate-string="true">${promptText} </span>`;

    // Dispatch an input event to notify listeners of the change
    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true
    });
    textAreaDiv.dispatchEvent(inputEvent);

    console.log('Click and paste simulation completed.');
  } else {
    console.log('Span with data-slate-leaf="true" not found.');
  }
} else {
  console.log('Div with ID video-create-textarea not found.');
}

*/

