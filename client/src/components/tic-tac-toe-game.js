import React, { Component } from "react";
import { Button, Container, Spinner } from "reactstrap";
import _ from "lodash";
import Square from "./square";
import AlertMessage from "./alert-message";
class TicTacToeGame extends Component {

  constructor(props) {
    super(props);
    this.initalState = {
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      turnNumber: 1,
      gameEnded: false,
      playAI: true,
      waitingTurn: false,
      message: "Welcome to Tic Tac Toe",
      winner: "",
      highLightSpaces: []
    };
    this.state = _.cloneDeep(this.initalState);
  }

  componentDidMount() {}

  componentDidUpdate(prevState) {
    const {
      board,
      turnNumber,
      gameEnded,
      playAI,
      waitingTurn,
      winner,
    } = this.state;

    if (
      turnNumber !== prevState.turnNumber &&
      waitingTurn !== prevState.waitingTurn &&
      !waitingTurn
    ) {
      if (playAI && !gameEnded && turnNumber % 2 == 0) {
        this.promptAPIForMove(board);
      }
    }
  }

  placeMove = (e, row, col) => {
    const { turnNumber, gameEnded } = this.state;

    if (!gameEnded) {
      let space;
      let r;
      let c;
      if (e) {
        // click place
        space = e.target;
        r = parseInt(space.getAttribute("data-r"));
        c = parseInt(space.getAttribute("data-c"));
      } else {
        // coordinate place
        r = row;
        c = col;
        space = document.querySelectorAll(`[data-r="${r}"][data-c="${c}"]`)[0];
      }

      // console.log(space);
      // console.log("turn:", turnNumber);
      // console.log(space.innerText);

      if (space) {
        if (!space.innerText) {
          // move is open
          this.updateBoardState(r, c);
          let isEndGame = this.checkGameEndingMove(r, c);
          this.determineWinner(isEndGame);
          if (!isEndGame) {
            this.incrementTurn();
          }
        }
      }
    }
  };

  updateBoardState = (r, c) => {
    let { turnNumber, board } = this.state;
    if (turnNumber % 2 == 1) {
      board[r][c] = "X";
      console.log(`Turn# ${turnNumber} - Player X move to row:${r}  col:${c}`);
    } else {
      board[r][c] = "O";
      console.log(`Turn# ${turnNumber} - Player O move to row:${r}  col:${c}`);
    }
    this.setState({ board: board });
  };

  determineWinner = (isEndGame) => {
    const { turnNumber } = this.state;
    if (isEndGame || isEndGame == null) {
      //null - draw
      if (isEndGame == null) {
        this.setState({ winner: "Draw!" });
      } else if (turnNumber % 2 == 1) {
        this.setState({ winner: "You Win!" });
      } else if (turnNumber % 2 == 0) {
        this.setState({ winner: "AI win!" });
      }
      this.setState({ gameEnded: isEndGame });
    }
  };

  checkGameEndingMove = (r, c) => {
    let { turnNumber, board } = this.state;
    let piece = turnNumber % 2 == 1 ? "X" : "O";
    let isWin = true;

    if (turnNumber >= 5) {
      // check row
      for (let i = 0; i < 3; i++) {
        if (piece !== board[r][i]) {
          break;
        }
        if (i == 2) {
          console.log("row win");
          return isWin;
        }
      }

      // check col
      for (let i = 0; i < 3; i++) {
        if (piece !== board[i][c]) {
          break;
        }
        if (i == 2) {
          console.log("col win");
          return isWin;
        }
      }

      // check diag
      if (r == c) {
        for (let i = 0; i < 3; i++) {
          if (piece != board[i][i]) {
            break;
          }
          if (i == 2) {
            console.log("diag win");
            return isWin;
          }
        }
      }

      // check anti diag
      if (r + c == 2) {
        for (let i = 0; i < 3; i++) {
          if (piece != board[i][2 - i]) {
            break;
          }
          if (i == 2) {
            console.log("anti diag win");
            return isWin;
          }
        }
      }

      // check draw
      if (turnNumber == 9) {
        console.log("draw");
        return null;
      }
    }
    return false;
  };

  incrementTurn = () => {
    this.setState((prevState) => {
      return { turnNumber: prevState.turnNumber + 1 };
    });
  };

  promptAPIForMove = async (board) => {
    const token = sessionStorage.getItem("ticTacToeUserToken");
    const response = await fetch("/engine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board: board,
        token: token,
      }),
    });

    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ waitingTurn: true });

    if (body.success) {
      // console.log(body.board);
      // console.log(move);

      let move = this.findBoardDifference(board, body.board);
      //  console.log(move);
      
      this.placeMove(null, move.r, move.c);
     
      // setInterval(() => {
      //   this.setState({ waitingTurn: false });
      // }, 1000);

      this.setState({ waitingTurn: false });
    }
  };

  findBoardDifference = (oldBoard, newBoard) => {
    for (let i = 0; i < oldBoard.length; i++) {
      let oldRow = oldBoard[i];
      let newRow = newBoard[i];
      // console.log(oldRow, newRow);
      for (let j = 0; j < oldBoard.length; j++) {
        if (oldRow[j] !== newRow[j]) {
          return { r: i, c: j };
        }
      }
    }
    return false;
  };

  handleHover = (e) => {
    let space = e.target;
    let r = space.getAttribute("data-r");
    let c = space.getAttribute("data-c");
    let spaces = _.union(document.querySelectorAll(`[data-r="${r}"]`), document.querySelectorAll(`[data-c="${c}"]`))
    this.state.highLightSpaces.map(space => space.classList.remove('hover'));
    spaces.map( space => space.classList.add('hover'));
    this.setState({highLightSpaces: spaces});
  }

  initBoard = () => {
    return (
      <div className="board" 
        onMouseOver={(e)=>{this.handleHover(e)}} 
      >
        {[0, 1, 2].map((r) => {
          return (
            <div key={r} className="board-row">
              {[0, 1, 2].map((c) => {
                return (
                  <Square
                    key={c}
                    row={r}
                    col={c}
                    value={this.state.board[r][c]}
                    placeMove={this.placeMove}
                    waitingTurn={this.state.waitingTurn}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  onResetClick = (e) => {
    e.preventDefault();

    this.setState(() => {
      return _.cloneDeep(this.initalState);
    });
  };

  render() {
    return (
      <Container className="mt-5">
        <AlertMessage
          classes="mb-3"
          spinner={true}
          value={this.state.message}
          waitingTurn={this.state.waitingTurn}
          gameEnded={this.state.gameEnded}
        />
        {this.initBoard()}
        <AlertMessage classes="mt-3" value={this.state.winner} />
        <Button
          className="mt-3"
          type="submit"
          color="info"
          onClick={() => this.promptAPIForMove()}
        >
          Get Move Suggestion
        </Button>
        <Button
          className="mt-3 ml-3"
          type="submit"
          color="info"
          onClick={(e) => this.onResetClick(e)}
        >
          New Game
        </Button>
      </Container>
    );
  }
}

export default TicTacToeGame;
