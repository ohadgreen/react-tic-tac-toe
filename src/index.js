import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function SquareFunc(props) {
    return (
        <button className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }
    playerSign() {
        return (this.state.xIsNext) ? 'X' : 'O';
    }

    handleClick(i) {
        const squaresArray = this.state.squares.slice();
        const nextPlayer = !this.state.xIsNext;
        if (calculateWinner(squaresArray) || squaresArray[i]) {
            return;
        }
        else {
            squaresArray[i] = this.playerSign();
            this.setState({ squares: squaresArray, xIsNext: nextPlayer });
            // this.printSquares();
        }
    }

    printSquares() {
        const squaresArray = [...this.state.squares, 88];
        console.log(squaresArray);
    }

    renderSquare(i) {
        return (<SquareFunc
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
        );
    }

    renderResetBtn() {        
        return (
            <button className="reset"
                onClick={() => {
                    console.log('reset game');
                    this.setState({
                        squares: Array(9).fill(null),
                        xIsNext: true
                    })
                }}>
                reset game
            </button>
        )
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner is: ' + winner;
        }
        else {
            status = 'Next player: ' + this.playerSign();
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div>
                    {this.renderResetBtn()}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);