/*----- constants -----*/
const COLORS = {
	'0': 'white',
	'1': 'purple',
	'-1': 'orange'
}

/*----- state variables -----*/

let board; //array of 7 column arrays
let turn; //1 for player 1, -1 for player 2
let winner; // winner: null = no winner, 1/-1 = winner, 'T' = tie


/*----- cached elements  -----*/
const messageEl = document.querySelector('h2')
const playAgainBtn = document.querySelector('button')
const colMarkerEls = [...document.querySelectorAll('#column-markers > div')]

/*----- event listeners -----*/
document.getElementById('column-markers').addEventListener('click', handleDrop)
playAgainBtn.addEventListener('click', init)


/*----- functions -----*/

//Initialize all state, then call render()
function init () {
	//Rotate 90 degrees counter-clockwise and array is visualization of the board
	board = [
		[0, 0, 0, 0, 0, 0], //col0
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0], //col6
	]

	turn = 1
	winner = null
	render()
}

//Visualize all state in the DOM
function render(){
	renderBoard()
	renderMessage()
	renderControls()
}

function renderBoard(){
	board.forEach(function(colArr, colIdx){
		colArr.forEach(function(cellVal, rowIdx){
			//console.log(colIdx, rowIdx, cellVal)
			const cellId = `c${colIdx}r${rowIdx}`
			const cellEl = document.getElementById(cellId)
			
			cellEl.style.backgroundColor = COLORS[cellVal]
		})	
	})
}

function renderMessage(){
	if(winner === 'T'){
		messageEl.innerText = "Tie Game!!!"
	}else if(winner){
		messageEl.innerHTML = 
		`<span style = "color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`
	}else{ //game still in play
		messageEl.innerHTML = 
		`<span style = "color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`
		//messageEl.style.color = `${COLORS[winner]}`
	}
}

function renderControls(){
	playAgainBtn.style.visibility = winner ? 'visible':'hidden'
	colMarkerEls.forEach(
		function(colMarkerEl, colIdx){
			const hideMarker = !board[colIdx].includes(0) || winner
			colMarkerEl.style.visibility = hideMarker ? 'hidden':'visible'
		}
	)
}

//Update board in response to user action
function handleDrop(event){
	const colIdx = colMarkerEls.indexOf(event.target)
	if(colIdx === -1){return} //Guards
	const colArr = board[colIdx] //shortcut to the column
	rowIdx = colArr.indexOf(0)
	colArr[rowIdx] = turn

	turn *= -1 
	winner = getWinner()
	render()
}

function getWinner(){
	checkVerticalWin()
	checkHorizontalWin()
	checkDiagonalWin()
}

function checkVerticalWin(rowIdx, col){

}

init()
render()