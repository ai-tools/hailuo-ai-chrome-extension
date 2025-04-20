

function setEditor()
{
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

};


function clearEditorContent(editor) {
  if (!editor || !editor.children || !editor.apply) {
    console.error('Invalid editor instance');
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

//setEditor();
//clearEditorContent(window.editor);

//insertBasicNode(window.editor,"This is working");


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

//insertBasicNode(window.editor,"This is working");

