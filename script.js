// Set Variables
let drawingState = 'pen'
let isDisplayingGrid = true
let gridSize = 16
let containerSize = 500
let continuous = true


// Set Constants
const gridContainer = document.getElementById("grid")

const penButton = document.getElementById("pen")
const pencilButton = document.getElementById("pencil")
const eraserButton = document.getElementById("eraser")
const rainbowButton = document.getElementById("rainbow")
const lightenButton = document.getElementById("lighten")
const darkenButton = document.getElementById("darken")

const clearButton = document.getElementById('clear')
const setSizeButton = document.getElementById('setSize')
const toggleBorderButton = document.getElementById('toggleBorder')
const toggleContinuousButton = document.getElementById('continuous')

penButton.addEventListener('click', () => setTool('pen'))
pencilButton.addEventListener('click', () => setTool('pencil'))
eraserButton.addEventListener('click', () => setTool('eraser'))
rainbowButton.addEventListener('click', () => setTool('rainbow'))
lightenButton.addEventListener('click', () => setTool('lighten'))
darkenButton.addEventListener('click', () => setTool('darken'))

clearButton.addEventListener('click', () => clearGrid())
setSizeButton.addEventListener('click', () => setSize())
toggleBorderButton.addEventListener('click', () => toggleBorder())
toggleContinuousButton.addEventListener('click', () => toggleContinuous())


clearGrid()


// Creating Grid
function createGrid(){
    gridArea = gridSize * gridSize
    let squareSize = containerSize / gridSize
    gridContainer.style.grid = 'repeat(' + gridSize + ', ' + squareSize + 'px) / auto-flow ' + squareSize + 'px'
    for (let i = 0; i < gridArea; i++) {        
        const gridSlot = document.createElement('div')
        gridSlot.classList.add('gridSquare')
        gridSlot.addEventListener('pointerenter', (e) => squarePointerEnter(e))
        gridSlot.style.backgroundColor = 'rgb(255,255,255)'
        gridContainer.appendChild(gridSlot)
    }
    setBorders(true)
}
// Deleting Grid
function deleteGrid(){
    isDisplayingGrid = false
    while (!isDisplayingGrid) {
        const gridSquares = document.getElementsByClassName('gridSquare')
        if(gridSquares.length > 0)gridContainer.removeChild(gridContainer.firstChild)
        else isDisplayingGrid = true
    }
}

// Clear Grid
function clearGrid(){
    deleteGrid()
    createGrid()
}

function setBorders(bordersOn){
    const gridSquares = document.getElementsByClassName('gridSquare')
    for (let i = 0; i < gridSquares.length; i++) {
        const element = gridSquares[i];
        (bordersOn) ? element.classList.add('border') :  element.classList.remove('border') ;
    }
    (bordersOn) ? toggleBorderButton.classList.add('active') :  toggleBorderButton.classList.remove('active') ;
}
function toggleBorder(){
    const gridSquares = document.getElementsByClassName('gridSquare')
    for (let i = 0; i < gridSquares.length; i++) {
        const element = gridSquares[i];
        element.classList.toggle('border')
    }
    toggleBorderButton.classList.toggle('active')    
}
function toggleContinuous(){
    continuous = !continuous
    toggleContinuousButton.classList.toggle('active')
}

// Paint in grid
function squarePointerEnter(event) {  
    if (continuous || !continuous && event.buttons === 1) 
    {
        console.log(event.buttons)
        let r, g, b, colorString, colorArray
        let getColorArray = (s) => s.slice(4, -1).split(', ')
        let getRGBString = (s) => 'rgb(' + s.join(', ') + ')';
        switch (drawingState) {
            case 'pen':
                event.target.style.backgroundColor = 'rgb(000,000,000)'
                break;

            case 'pencil':
                event.target.style.backgroundColor = 'rgb(127.5,127.5,127.5)'
                break;

            case 'eraser':
                event.target.style.backgroundColor = 'rgb(255,255,255)'
                break;

            case 'rainbow':
                r = Math.floor(Math.random() * (254 - 1 + 1) + 1)
                g = Math.floor(Math.random() * (254 - 1 + 1) + 1)
                b  = Math.floor(Math.random() * (254 - 1 + 1) + 1)
                colorString = 'rgb(' + r + ' ' + g + ' ' + b + ')'
                event.target.style.backgroundColor = colorString
                break;

            case 'lighten':
                colorArray = getColorArray(event.target.style.backgroundColor)
                if(colorArray[0] >= 229.5) colorArray[0] = 255; else colorArray[0] = Number(colorArray[0]) + 25.5;
                if(colorArray[1] >= 229.5) colorArray[1] = 255; else colorArray[1] = Number(colorArray[1]) + 25.5;
                if(colorArray[2] >= 229.5) colorArray[2] = 255; else colorArray[2] = Number(colorArray[2]) + 25.5;
                event.target.style.backgroundColor = getRGBString(colorArray)
                break;

            case 'darken':
                colorArray = getColorArray(event.target.style.backgroundColor)
                if(colorArray[0] <= 25.5) colorArray[0] = 0; else colorArray[0] = Number(colorArray[0]) - 25.5;
                if(colorArray[1] <= 25.5) colorArray[1] = 0; else colorArray[1] = Number(colorArray[1]) - 25.5;
                if(colorArray[2] <= 25.5) colorArray[2] = 0; else colorArray[2] = Number(colorArray[2]) - 25.5;
                event.target.style.backgroundColor = getRGBString(colorArray)
                break;
        }
    }
}
function setTool(tool) {
    drawingState = tool
    switch (tool) {
        case 'pen':
            penButton.classList.add('active')
            pencilButton.classList.remove('active')
            eraserButton.classList.remove('active')
            rainbowButton.classList.remove('active')
            lightenButton.classList.remove('active')
            darkenButton.classList.remove('active')
            break;

        case 'pencil':
            penButton.classList.remove('active')
            pencilButton.classList.add('active')
            eraserButton.classList.remove('active')
            rainbowButton.classList.remove('active')
            lightenButton.classList.remove('active')
            darkenButton.classList.remove('active')
            break;

        case 'eraser':
            penButton.classList.remove('active')
            pencilButton.classList.remove('active')
            eraserButton.classList.add('active')
            rainbowButton.classList.remove('active')
            lightenButton.classList.remove('active')
            darkenButton.classList.remove('active')
            break;

        case 'rainbow':
            penButton.classList.remove('active')
            pencilButton.classList.remove('active')
            eraserButton.classList.remove('active')
            rainbowButton.classList.add('active')
            lightenButton.classList.remove('active')
            darkenButton.classList.remove('active')
            break;

        case 'lighten':
            penButton.classList.remove('active')
            pencilButton.classList.remove('active')
            eraserButton.classList.remove('active')
            rainbowButton.classList.remove('active')
            lightenButton.classList.add('active')
            darkenButton.classList.remove('active')
            break;

        case 'darken':
            penButton.classList.remove('active')
            pencilButton.classList.remove('active')
            eraserButton.classList.remove('active')
            lightenButton.classList.remove('active')
            darkenButton.classList.add('active')
            break;
    }
}

function setSize() {
    gridSize = prompt('Set the size of the grid between 1 and 64', 16)
    if (gridSize < 1)  gridSize = 1
    else if (gridSize > 64) gridSize = 64
    clearGrid()
}