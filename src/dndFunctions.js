export function allowDrop(e) {
    e.preventDefault();
}

export function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

export function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
}