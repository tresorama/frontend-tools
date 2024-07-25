const $ = (selector) => document.querySelector(selector);

const utils = {
  copyToClipboard: async (text) => {
    return await navigator.clipboard.writeText(text);
  },
  alert: {
    success: (message) => {
      const el = $('#alert');
      el.classList.remove('success', 'error');
      el.classList.add('success');
      el.textContent = message;
    },
    error: (message) => {
      const el = $('#alert');
      el.classList.remove('success', 'error');
      el.classList.add('error');
      el.textContent = message;
    },
    delete: () => {
      $('#alert').textContent = "";
    }
  },
  transformInput: (input) => {
    const contentMap = new Map();

    // Step 1: Create a map of all content by id
    input.content.forEach(item => {
      contentMap.set(item.id, {
        ...item,
        children: []
      });
    });

    // Step 2: Build the nested structure
    let root = null;
    input.content.forEach(item => {
      if (item.parent === 0) {
        root = contentMap.get(item.id);
      } else {
        const parent = contentMap.get(item.parent);
        parent.children.push(contentMap.get(item.id));
      }
    });

    // Step 3: Construct the final output object
    const output = {
      content: [root]
    };

    return output;
  }
};

function real() {

  $('#real #submit').addEventListener('click', () => {
    try {
      debugger;
      const inputCodeRaw = $('#real #input-code').value;
      const inputCode = JSON.parse(inputCodeRaw);
      const outputCode = utils.transformInput(inputCode);
      $('#real #output-code').value = JSON.stringify(outputCode, null, 2);
    } catch (err) {
      $('#real #output-code').value = err.message;
      utils.alert.error(err.message);
    }
  });


  $('#real #copy-to-clipboard').addEventListener('click', async () => {
    try {
      debugger;
      const outputCode = $('#real #output-code').value;
      await utils.copyToClipboard(outputCode);
      utils.alert.success('copied');
    } catch (err) {
      utils.alert.error(err.message);
    }
  });


}

function demo() {

  const input = {
    "content": [{
      "id": "zero",
      "name": "container",
      "parent": 0,
      "children": ["one", "two"],
      "settings": {
        "_display": "grid",
        "_gridTemplateColumns": "minmax(0,5fr) minmax(0,7fr)",
        "_gridGap": "var(--bce--spacing-lg)"
      }
    }, {
      "id": "one",
      "name": "section",
      "parent": "zero",
      "children": ["three"],
      "settings": {
        "_padding": {
          "top": "var(--bce--spacing-xl)",
          "bottom": "var(--bce--spacing-xl)"
        },
        "_rowGap": "var(--spacing-md)"
      }
    }, {
      "id": "two",
      "name": "block",
      "parent": "zero",
      "settings": {
        "_display": "flex",
        "_direction": "column",
        "_justifyContent": "center",
        "_alignItems": "flex-start",
        "_rowGap": "var(--bce--spacing-md)"
      }
    }, {
      "id": "three",
      "name": "text",
      "parent": "one",
      "children": [],
      "settings": {
        "text": "<h2>Heading</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at dictum metus, sit amet aliquam odio. Sed ut massa nisi.</p>",
        "_cssGlobalClasses": ["azwebp"]
      }
    }],
    "source": "bricksCopiedElements",
    "sourceUrl": "https://test-playground.local",
    "version": "1.9.9",
    "globalClasses": [{
      "id": "azwebp",
      "name": "bce--prose",
      "settings": {
        "_cssCustom": ".bafc--prose :where(p, ul, ol) {\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n}\n\n.bafc--prose :where(blockquote, pre) {\n    margin-top: 1.5rem;\n    margin-bottom: 1.5rem;\n}\n\n.bafc--prose :where(figure) {\n    margin-top: 2em;\n    margin-bottom: 2em;\n}\n\n.bafc--prose :where(figure figcaption) {\n    margin-top: 1.3em;\n}\n\n.bafc--prose *:first-child,\n.bafc--prose :where(:where(h2, h3, h4, h5, h6) + *) {\n    margin-top: 0;\n}\n\n.bafc--prose :where(h1, h2, h3, h4, h5, h6) {\n    margin-top: 3.5rem;\n    margin-bottom: 1.25rem;\n}\n\n.bafc--prose :where(li) {\n    margin-top: .5rem;\n    margin-bottom: .5rem;\n}"
      },
      "modified": 1721686815,
      "user_id": 1,
      "category": "mdguvj"
    }],
    "globalElements": []
  };

  const expectedOutput = {
    "content": [{
      "id": "zero",
      "name": "container",
      "children": [{
        "id": "one",
        "name": "section",
        "children": [{
          "id": "three",
          "name": "text",
          "children": [],
          "settings": {
            "text": "<h2>Heading</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at dictum metus, sit amet aliquam odio. Sed ut massa nisi.</p>",
            "_cssGlobalClasses": ["azwebp"]
          }
        }],
        "settings": {
          "_padding": {
            "top": "var(--bce--spacing-xl)",
            "bottom": "var(--bce--spacing-xl)"
          },
          "_rowGap": "var(--spacing-md)"
        }
      },
      {
        "id": "two",
        "name": "block",
        "settings": {
          "_display": "flex",
          "_direction": "column",
          "_justifyContent": "center",
          "_alignItems": "flex-start",
          "_rowGap": "var(--bce--spacing-md)"
        }
      }
      ],
      "settings": {
        "_display": "grid",
        "_gridTemplateColumns": "minmax(0,5fr) minmax(0,7fr)",
        "_gridGap": "var(--bce--spacing-lg)"
      }
    }]
  };

  const output = utils.transformInput(input);

  console.log({
    expectedOutput,
    output
  });
  document.getElementById('result-one').textContent = JSON.stringify(expectedOutput, null, 2);
  document.getElementById('result-two').textContent = JSON.stringify(output, null, 2);


}


// main
real();
