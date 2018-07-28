import React from 'react';
import '../index.css';

class SubmarinesBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(100).fill(null),
            turns: 0,
            destroyed: 0
        }
    }

    handleClick(i) {
        let squares = this.state.squares.slice();        
        let turnsCount = this.state.turns;
        let destroyed = this.state.destroyed;
        const afterClickValue = findSquare(i) ? 'X' : '-';      
        squares[i] = afterClickValue;
        let newDestroyed = findSubsDestroyed(squares);
        if(newDestroyed > destroyed)
            alert("another sub destroyed!");

        this.setState({ squares: squares, turns: turnsCount + 1, destroyed: newDestroyed });
    }

    render() {
        // Build the rows in an array
        let rows = [];
        for (let y = 0; y < 10; y++) {
            // Build the cells in an array
            const cells = [];
            for (let x = 0; x < 10; x++) {
                cells.push(<Cell key={y * 10 + x}
                    value={this.state.squares[y * 10 + x]}
                    onClick={() => this.handleClick(y * 10 + x)}
                    disabled={this.state.squares[y * 10 + x]}
                />);
            }
            // Put them in the row
            rows.push(<tr>{cells}</tr>);
        }
        // Return the table
        return (<div>
            <div><table><tbody>{rows}</tbody></table></div>
            <div className="game-info">
                <p>turns: {this.state.turns}</p> 
                <p>destroyed: {this.state.destroyed} / 5</p>
            </div>
        </div>);
    }
}

class Cell extends React.Component {

    render() {
        return <td><button className="square" onClick={this.props.onClick} disabled={this.props.disabled}>
            {this.props.value}
        </button></td>;
    }
}

function submarinesMap() {
    return [
        [0, 10, 20, 30],
        [24, 34],
        [53, 54, 55],
        [68, 78, 88],
        [80, 90]
    ];
}

function findSquare(squareIndex) {
    const subsMap = submarinesMap();
    let found = false;
    for (let i = 0; i < subsMap.length; i++) {
        const subSquares = subsMap[i];
        for (let j = 0; j < subSquares.length; j++) {
            if (squareIndex === subSquares[j]) {
                found = true;
            }
        }
    }
    return found;
}

function findSubsDestroyed(squares) {
    const subsMap = submarinesMap();
    let destroyed = 0;
    for (let i = 0; i < subsMap.length; i++) {
        const subSquares = subsMap[i];
        let hitCounter = 0;
        for (let j = 0; j < subSquares.length; j++) {
            if (squares[subSquares[j]] === 'X') {
                hitCounter++;                
            }
            if (hitCounter === subSquares.length){
                destroyed ++;
            }
        }
    }
    return destroyed;
}

export default SubmarinesBoard;