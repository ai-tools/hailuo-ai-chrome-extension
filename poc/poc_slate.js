

(() => {
  // Step 1: Get the contenteditable root
  const el = document.querySelector('[contenteditable="true"]');
  if (!el) {
    console.error('No contenteditable element found.');
    return;
  }

  // Step 2: Find the React fiber key
  const reactFiberKey = Object.keys(el).find(k => k.startsWith('__reactFiber$'));
  if (!reactFiberKey) {
    console.error('React fiber key not found.');
    return;
  }

  const fiberNode = el[reactFiberKey];

  // Step 3: Traverse up the fiber tree to find the editor
  let node = fiberNode;
  let foundEditor = null;

  while (node) {
    const props = node.memoizedProps;
    const state = node.memoizedState;

    if (props?.editor) {
      foundEditor = props.editor;
      break;
    }
    if (state?.editor) {
      foundEditor = state.editor;
      break;
    }

    node = node.return;
  }

  if (!foundEditor) {
    console.error('Slate editor instance not found in fiber tree.');
    return;
  }

  window.editor = foundEditor;
  console.log('✅ Editor instance found and assigned to window.editor:', window.editor);

  // Step 4: Modify the content by inserting a new paragraph
  const Transforms = window.Slate?.Transforms || window.editor?.Transforms || window.SlateTransforms;

  if (!Transforms) {
    console.warn('Slate Transforms not found. Make sure Slate is exposed on window.');
    return;
  }

  try {
    // Optional: clear all existing nodes
    Transforms.removeNodes(window.editor, { at: [] });

    // Insert new content
    Transforms.insertNodes(window.editor, [
      {
        type: 'paragraph',
        children: [{ text: 'Hello from the browser console!' }],
      },
    ]);

    console.log('✅ Content successfully inserted.');
  } catch (err) {
    console.error('Failed to insert content:', err);
  }
})();




function insertBasicNode(editor, text = 'Hello from fallback insert!') {
  if (!editor || !editor.apply) {
    console.error('Editor is not valid or not ready.');
    return;
  }

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

