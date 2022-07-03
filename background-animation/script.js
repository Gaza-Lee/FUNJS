const container = document.querySelector(".container");
if (container) {
    for (let i = 1; i < 1200; i++) {
        const shape = document.createElement("span");
        container.appendChild(shape);
    }
} else {
    console.error("Container element not found.");
}