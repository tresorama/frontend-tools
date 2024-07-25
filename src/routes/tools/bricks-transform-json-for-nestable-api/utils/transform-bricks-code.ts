/**
 * Bricks code , from Right Click > Copy on a Bricks element on Structure Panel
 */
type BricksInputCode = {
  content: Array<{
    id: string;
    name: string;
    parent: string | 0;
    children: string[];
    settings: {
      [key: string]: any;
    };
  }>;
};


/**
 * Transform Bricks code to Nestable JSON
 */
export const transformBricksCode = (input: BricksInputCode) => {

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
};
