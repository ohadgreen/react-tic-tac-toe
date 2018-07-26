import React from 'react';
import '../index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return (<Square key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
        );
    }

    renderBoardTable(i) {
        let boardRow = [];
        // boardRow.push('<div>');
        for (let col = 0; col <= 2; col++) {
            boardRow.push(this.renderSquare(col + i * 3))
        }
        return boardRow;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderBoardTable(0)}
                </div>
                <div className="board-row">
                    {this.renderBoardTable(1)}
                </div>
                <div className="board-row">
                    {this.renderBoardTable(2)}

                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                quordinates: ''
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }

    nextPlayer() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.nextPlayer();

        this.setState({
            history: history.concat([{
                squares: squares,
                quordinates: squares[i] + ' - ' + squareQuordinates(i)
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner is: ' + winner;
        }
        else {
            status = 'Next player: ' + this.nextPlayer();
        }

        const moves = history.map((step, move) => {
            const qrdnt = history[move].quordinates;
            const desc = move ? 'Go to move # ' + move + ' ' + qrdnt : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
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

function squareQuordinates(i) {
    const qrdnts = [
        "a:1",
        "a:2",
        "a:3",
        "b:1",
        "b:2",
        "b:3",
        "c:1",
        "c:2",
        "c:3"
    ]
    return qrdnts[i];
}

export default Game;