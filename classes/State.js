'use strict'

class State {

  constructor(parent=null){
    this._alpha = -Infinity
    this._beta = Infinity
    this._children = []
    this._depth = 0
    this._g = 0
    this._h = 0
    this._rootMove = ''
    this._parent = parent
    this._id = ''

    this._isAdmissible = true

  }
  get Alpha (){ return this._alpha }
  set Alpha (value){ this._alpha = value }

  get Beta (){ return this._beta }
  set Beta (value){ this._beta = value }

  get Children (){ return this._children }
  set Children (value){ this._children = value }

  get Depth (){ return this._depth }
  set Depth (value){ this._depth = value }

  get F (){ return this._g + this._h }

  get G (){ return this._g }
  set G (value){ this._g = value }

  get H (){ return this._h }
  set H (value){ this._h = value }

  get ID (){ return this._id }

  get isAdmissible (){ return this._isAdmissible }

  get Parent (){ return this._parent }
  set Parent (value){ this._parent = value }

  get RootMove (){ return this._rootMove }
  set RootMove (value){ this._rootMove = value }

  ComputeHeuristicGrade(){
    let heuristicValue = 0
    // i - rzedy
    // j - kolumny
    // x - kolumny
    // y - rzedy

    for (let x = 0; x < 3; x++){
      for (let y = 0; y < 3; y++) {
        let value = parseInt(this._tab[x][y])
        if (value !== 0) {

          let targetX = parseInt((value - 1) / 3)
          let targetY =  (value - 1) % 3
          let dx = x - targetX
          let dy = y - targetY

          heuristicValue += Math.abs(dx) + Math.abs(dy)
        }
      }
    }

    return heuristicValue


  }

  CompareTo(other) {
    return this.F <= other.F ? -1 : 1
  }

}

module.exports = State
