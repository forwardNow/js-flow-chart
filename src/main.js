import './common/style/tree.scss';
import keyBy from 'lodash.keyby';

// Draw a line between two points.  Slow but sure...
function drawLine(x0, y0, x1, y1) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  let x = x0;
  let y = y0;
  if (Math.abs(dx) > Math.abs(dy)) {
    const yinc = dy / dx;
    if (dx < 0) {
      while (x >= x1) {
        createDot(x, y);
        x -= 1;
        y -= yinc;
      }
    } else {
      while (x <= x1) {
        createDot(x, y);
        x += 1;
        y += yinc;
      }
    }
  } else {
    const xinc = dx / dy;
    if (dy < 0) {
      while (y >= y1) {
        createDot(x, y);
        y -= 1;
        x -= xinc;
      }
    } else {
      while (y <= y1) {
        createDot(x, y);
        y += 1;
        x += xinc;
      }
    }
  }
}

function createDot(x, y) {
  const newDot = document.createElement('div');
  newDot.style.left = `${x}px`;
  newDot.style.top = `${y}px`;
  newDot.classList.add('dot');
  document.body.appendChild(newDot);
}

function createNode(label, x, y, size = 20) {
  const halfSize = size / 2;
  const newNode = document.createElement('div');

  const style = {
    left: `${x - halfSize}px`,
    top: `${y - halfSize}px`,
  };

  newNode.innerHTML = label;

  newNode.classList.add('node');

  Object.getOwnPropertyNames(style).forEach((key) => {
    newNode.style[key] = style[key];
  });

  document.body.appendChild(newNode);
}

class Tree {
  constructor(label, children) {
    this.label = label;
    this.children = children;

    this.offset = 0;
    this.x = 0;
    this.y = 0;
  }

  isLeaf() {
    return this.children.length === 0;
  }
}


const treeData = {
  label: '3',
  children: [
    { label: '1', children: [] },
    { label: '2', children: [] },
  ],
};

const nodeMeta = {
  width: 20,
  height: 20,
  gap: {
    y: 16,
    x: 16,
  },
};

function traverseTree(node, depth) {
  node.children.forEach((child, index) => {
    if (child.children.length === 0) {
      console.log('leaf:', child.label);
      const childX = (nodeMeta.width + nodeMeta.gap.x) * (index + 1);
      const childY = (depth + 1) * (nodeMeta.height + nodeMeta.gap.y);
      createNode(child.label, childX, childY);
      return;
    }
    traverseTree(child, depth + 1);
  });

  console.log('parent:', node.label);
  const parentX = nodeMeta.width + nodeMeta.gap.x;
  const parentY = nodeMeta.height + nodeMeta.gap.y;
  createNode(node.label, parentX, parentY);
}

traverseTree(treeData, 1);

/*


let count = 0;
function generateRandomTree(depth, minChildrenNum) {
  let randomChildrenNum = (depth <= 1 || Math.random() < 0.5) ? 0 : Math.round(Math.random() * 4);
  if (minChildrenNum) {
    randomChildrenNum = Math.max(randomChildrenNum, minChildrenNum);
  }
  const children = [];
  for (let i = 0; i < randomChildrenNum; i += 1) {
    children.push(generateRandomTree(depth - 1, minChildrenNum - 1));
  }
  count += 1;
  return new Tree(count, children);
}

const testTree = generateRandomTree(10, 2);
console.log(count, testTree);


function createElement(label) {
  const elt = document.createElement('div');
  elt.classList.add('node');
  elt.innerHTML = label;
  document.body.appendChild(elt);
}


// traverseTree(testTree);
*/
