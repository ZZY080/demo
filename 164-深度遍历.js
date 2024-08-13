// 深度遍历 是纵向的遍历
let tree = [
  {
    id: '1',
    name: '节点1',
    children: [
      {
        id: '1-1',
        name: '节点1-1',
      },
    ],
  },
  {
    id: '2',
    name: '节点2',
    children: [
      {
        id: '2-1',
        name: '节点2-1',
      },
      {
        id: '2-2',
        name: '节点2-2',
        children: [
          {
            id: '2-2-1',
            name: '节点2-2-1',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: '节点3',
  },
];

function deepSearch(tree) {
  for (let i = 0; i < tree.length; i++) {
    const element = tree[i];
    console.log(element.name);
    if (element.children) {
      deepSearch(element.children);
    }
  }
}

deepSearch(tree);
