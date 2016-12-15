'use strict'
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const PuzzleState = require('./classes/PuzzleState.js')
const PuzzleSearch = require('./classes/PuzzleSearch.js')

// rysowanie puzzle

let bw = 405
let bh = 405
let p = 0
let size = 135
let baseTxtX = 15+45
let baseTxtY = 34+45

let canvas = document.getElementById('puzzle')

// canvas.style.width = (bw + 1) + 'px';
// canvas.style.height = (bh + 1) + 'px';

let context = canvas.getContext('2d')



let puzzleResults
let index = 0

function findSolutionPuzzle(string){
  if(!string)
    alert('Musisz podać string!')

  let time = new Date()
  let state = new PuzzleState(string)
  let search = new PuzzleSearch(state)
  search.DoSearch()

  time = new Date() - time

  document.getElementById('time').textContent = `${time/1000}s`

  // sciezka stanow do rozwiazania
  let result = search.Solutions[0]


  puzzleResults = []

  while(result !== null){
    // result.Print()
    puzzleResults.push(result.Tab)
    result = result.Parent
  }

}

function drawPuzzle(){
  document.getElementById('step').textContent = `${puzzleResults.length-index}/${puzzleResults.length}`
  // czyszczenie widoku
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.font = '30px Arial'

  let puzzleArray = puzzleResults[index]


  for (let i = 0; i < puzzleArray.length; i++) {
    let posX =  baseTxtX + size * i
    let posImgX = size * i

    for (let j = 0; j < puzzleArray[i].length; j++) {
      if (puzzleArray[j][i] && puzzleArray[j][i] !== '0'){

        let posY = baseTxtY + size * j
        let posImgY = size * j
        let clipX = cord[puzzleArray[j][i]][0]
        let clipY = cord[puzzleArray[j][i]][1]

        context.fillText(puzzleArray[j][i],posX,posY)
        context.drawImage(img,clipX,clipY,size,size,posImgX,posImgY,size,size)
      }
    }

  }


}

let cord = {
  '1': [0,0],
  '2': [135,0],
  '3': [270,0],
  '4': [0,135],
  '5': [135,135],
  '6': [270,135],
  '7': [0,270],
  '8': [135,270],
  '9': [270,270]
}


// drawPuzzle()

let img = document.getElementById('img')
let random = document.getElementById('random')

let draw = document.getElementById('draw')

let next = document.getElementById('next')
let prev = document.getElementById('prev')
let reverse = document.getElementById('reverse')
let data = document.getElementById('data')


random.addEventListener('click',() => {
  let puzzleOrder = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','0']
  ]

  for (let i = 0; i < 1000; i++) {
    randomMix(puzzleOrder)
  }

  let string = puzzleOrder.join(',')
  string = string.replace(/,/g,'')
  data.value = string
})

draw.addEventListener('click',() => {
  index = 0
  findSolutionPuzzle(data.value)
  drawPuzzle()
})

reverse.addEventListener('click',() => {
  puzzleResults.reverse()
  drawPuzzle()

})

prev.addEventListener('click',() => {
  index++
  if(index > puzzleResults.length-1)
    index = puzzleResults.length-1
  drawPuzzle()
})

next.addEventListener('click',() => {
  index--
  if(index < 0)
    index = 0
  drawPuzzle()
})

function randomMix(puzzleOrder){
  let x = 0
  let y = 0

  for (let i = 0; i < puzzleOrder.length; i++) {
    for (let j = 0; j < puzzleOrder[i].length; j++) {
      if(puzzleOrder[i][j] ==='0'){
        x = i
        y = j
        break
      }
    }
    if(puzzleOrder[x][y] ==='0')
      break

  }

  let newX = x
  let newY = y

  let move = parseInt(Math.random()*10)%2

  if(x == 1){
    if(move)
      newX+=1
    else
      newX-=1
  }
  else{
    if(move){
      if(x)
        newX-=move
      else
        newX+=move
    }
    else{
      move = parseInt(Math.random()*10)%2

      if(y == 1){
        if(move)
          newY+=1
        else
          newY-=1
      }
      else
        if(y)
          newY-=move
        else
          newY+=move
    }

  }

  let tmp = puzzleOrder[x][y]
  puzzleOrder[x][y] = puzzleOrder[newX][newY]
  puzzleOrder[newX][newY] = tmp
  // console.log(`${Math.abs(x-newX)},${Math.abs(y-newY)}`)
}
