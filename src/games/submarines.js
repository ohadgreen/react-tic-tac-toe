import React from 'react';
import '../index.css';

class SubmarinesBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(100).fill(null)
        }
    }
   
    handleClick(i) {
        const squares = this.state.squares.slice();
        const afterClickValue = submarinesMap(i) ? 'X' : '-';
        console.log(i, afterClickValue, squares[i]);
        squares[i] = afterClickValue;
        this.setState({squares: squares});
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
                />);
            }
            // Put them in the row
            rows.push(<tr>{cells}</tr>);
        }
        // Return the table
        return <table><tbody>{rows}</tbody></table>;
    }
}

class Cell extends React.Component {

    render() {
        return <td><button className="square" onClick={this.props.onClick}>
            {this.props.value}
        </button></td>;
    }
}

function submarinesMap(squareIndex) {
    const subs = [
        [0, 10, 20, 30],
        [24, 34],
        [53, 54, 55],
        [68, 78, 88],
        [80, 90]
    ];

    let found = false;
    for (let i = 0; i < subs.length; i++) {
        const subSquares = subs[i];
        for (let j = 0; j < subSquares.length; j++) {
            if (squareIndex === subSquares[j]) {
                found = true;
            }
        }
    }
    return found;
}

export default SubmarinesBoard;