const container = document.querySelector(".container")
const input = document.querySelector(".input")
const btnResize = document.querySelector("#btnResize")
const btnReset = document.querySelector("#btnReset")
const btnBw = document.querySelector("#btnBw")
const btnRandom = document.querySelector("#btnRandom")
const btnShade = document.querySelector("#btnShade")

let size = 12;
let colorMethod = 0;



btnBw.addEventListener("click" , () => {
    colorMethod = 0;
})
btnRandom.addEventListener("click" , () => {
    colorMethod = 1;
})
btnShade.addEventListener("click" , () => {
    colorMethod = 2;
    opacity = 0.05;
})


gridMaker();

function gridPainter(object) {
    switch (colorMethod) {
        case 0:
            object.style.backgroundColor = "#000000";
            break;
        case 1:
            const randomHex = Math.floor(Math.random()*16777215).toString(16).padStart(6, `0`);
            object.style.backgroundColor = `#` + randomHex
            break;
        case 2:
            if (object.currentAlpha < 1) {
                object.currentAlpha = Math.min(object.currentAlpha + 0.1, 1);
            }
            object.style.backgroundColor = `rgba(0,0,0, ${object.currentAlpha})`
            console.log(object.currentAlpha);          
            break;
    }
}


function gridMaker(params = 12) {
    size = params;
    container.innerHTML = ""
    let gridsAmount = params ** 2;
    let gridOneSide = (496 / params);
    for (let i = 0; i < gridsAmount; i++) {
        let grid = document.createElement("div");
        grid.currentAlpha = 0;
        grid.className = "grid";
        container.appendChild(grid);
        grid.style.flex = `1 1 ${gridOneSide}px`
        grid.addEventListener("mouseover", () => {
            gridPainter(grid)
        })
    }
}


btnResize.addEventListener("click", () => {
    if (Number.isInteger(size) && input.value >= 1 && input.value <= 100) {
        size = +input.value;
        input.value = ""
        gridMaker(size);
    } else {
        alert("You have to write a number between 0-100")
    }
})

btnReset.addEventListener("click", () => gridMaker(size))






