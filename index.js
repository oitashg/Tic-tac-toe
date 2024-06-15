const boxes = document.querySelectorAll(".box")
const gameInfo = document.querySelector(".game-info")
const newGameBtn = document.querySelector(".btn")


let currentPlayer
let gameGrid

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//let's start the game
function initGame() {
    currentPlayer = "X" //initialize the current player
    gameGrid = ["", "", "", "", "", "", "", "", ""] //initially grid is empty

    //when new game button is clicked whole grid must be empty and change to be reflected in UI
    boxes.forEach((box, index) => {
        box.innerText = "" //make the grid empty
        boxes[index].style.pointerEvents = "all" //activate the cursor pointer for new game

        //one more thing is missing..i.e after starting new game..green color must be removed i.e initialize box with original css properties
        box.classList = `box box${index + 1}`
    })
    newGameBtn.classList.remove("active") //active class removed
    gameInfo.innerText = `Current Player - ${currentPlayer}` //make the change in UI
}

//call the function to see the effect
initGame()

//swap turn
function swapTurn() {
    if(currentPlayer === "X")
        currentPlayer = "O"
    else
        currentPlayer = "X"

    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

//check if game is over or not
function checkGameOver() {
    let answer = ""
    
    //all 3 boxes should be non-empty and exactly same in value, then winner comes
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
                
                //check if winner is X
                if(gameGrid[position[0]] === "X")
                    answer = "X"
                else
                    answer = "O"

                //disable pointer event for every box
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none"
                })

                //now we know the winner, so mark those winning boxes green
                boxes[position[0]].classList.add("win")
                boxes[position[1]].classList.add("win")
                boxes[position[2]].classList.add("win")
            }
    })

    //if winner found
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`
        newGameBtn.classList.add("active")

        return //don't calculate further
    }

    //match tied
    let fillCount = 0

    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++
    })

    //board is filled
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !"
        newGameBtn.classList.add("active")
    }
}


//handles the click function
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer //changes made in UI
        gameGrid[index] = currentPlayer //changes made in the gameGrid array 
        boxes[index].style.pointerEvents = "none" //pointer cursor removed where move is already made

        //swap turn
        swapTurn()

        //check if any player has already won or not
        checkGameOver()
    }
}


//funtion for clicking the grid
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index)
    })
})

//adding event listener to new game button
newGameBtn.addEventListener("click", initGame)
