// 创建一个自定义 React 框架
function createElement(type, props, ...children) {
    console.log("type:",type);
    console.log("props:",props);
    console.log("children:",children);
    return {
        type: type,
        props: {
            ...props,
            children: children.map((child) => {
                return typeof child === "object" ? child : createTextElement(child)
            }),
        },
    };
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        },
    };
}

function render(element, container) {
    const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);
    const isProperty = key => key !== "children";
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name];
        });
    element.props.children.forEach(child=>render(child,dom));
    container.appendChild(dom);
}

// 使用自定义的 React 框架
const React = {
    createElement,
}
const ReactDOM = {
    render,
}