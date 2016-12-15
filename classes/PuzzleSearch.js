'use strict'

const AStarSearch = require('./AStarSearch.js')
const PuzzleState = require('./PuzzleState.js')

class PuzzleSearch extends AStarSearch{

  constructor(state){
    super(state,true,true)
  }

  buildChildren(state){



    for(let i = 0; i < 3; ++i){

      for(let j = 0; j < 3; ++j){

        if( state._tab[i][j] === 0){

          if(i + 1 < 3){
            let child = new PuzzleState(state, i,j,i+1,j)
            this._parent = state
            this._parent._children.push(child)
          }
          if(i - 1 >= 0){
            let child = new PuzzleState(state, i,j,i-1,j)
            this._parent = state
            this._parent._children.push(child)
          }
          if(j + 1 < 3){
            let child = new PuzzleState(state, i,j,i,j+1)
            this._parent = state
            this._parent._children.push(child)
          }
          if(j - 1 >= 0){
            let child = new PuzzleState(state, i,j,i,j-1)
            this._parent = state
            this._parent._children.push(child)
          }
          return

        }

      }
    }

  }

  isSolution(state){

    return state._h === 0

  }


}

module.exports = PuzzleSearch

