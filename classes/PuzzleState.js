'use strict'

const State = require('./State.js')

class PuzzleState extends State {

  constructor(...theArgs){
    super()

    this._tab = []

    if(theArgs.length === 1){
      // I konstruktor
      let str   = theArgs[0]

      if( str.length !== 9)
        throw new Error('Wrong string. Must have 9 digits')

      this._id  = str
      this._g  = 0


      for(let  i = 0; i < 3; ++i){
        this._tab[i] = []
        for(let j = 0; j < 3; ++j){

          this._tab[i][j] = parseInt(str[i*3+j])

        }
      }

      this._h = this.ComputeHeuristicGrade()
    }
    else if(theArgs.length === 5){
      // II konstruktor - stworz potomka [?]
      let parent  = theArgs[0]
      let x       = theArgs[1]
      let y       = theArgs[2]
      let newX     = theArgs[3]
      let newY     = theArgs[4]

      for (let i = 0; i < 3; i++) {
        this._tab[i] = parent._tab[i].slice()
      }


      let tmp = this._tab[x][y]
      this._tab[x][y] = this._tab[newX][newY]
      this._tab[newX][newY] = tmp



      this._id = this._tab.join(',').replace(/,/g,'')
      this._parent = parent
      // sami napisac heurestyke
      this._g = parent._g+1
      this._h = this.ComputeHeuristicGrade()

    }
    else{
      throw new Error('Wrong params')
    }


  }

  get Tab (){ return this._tab }
  set Tab (value){ this._tab = value }


  Print(){
    console.log(this._tab)
  }
}

module.exports = PuzzleState
