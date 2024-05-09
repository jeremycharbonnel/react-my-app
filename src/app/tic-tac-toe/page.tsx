'use client'

import { useState, MouseEventHandler } from 'react'

export default function TicTacToe() {
    return (
        <main className="min-h-screen p-24">
            <Game />
        </main>
    )
}

function Game() {
    type nextSquaresType = ('X' | 'O' | null)[]
    type historyType = nextSquaresType[]

    const [history, setHistory] = useState<historyType>([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)

    const xIsNext = currentMove % 2 === 0
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares: nextSquaresType) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)

        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove)
    }

    const moves = history.map((squares, move) => {
        let description =
            move === history.length - 1
                ? 'You are at move ' + move
                : move > 0
                  ? 'Go to move #' + move
                  : 'Go to game start'

        return (
            <li key={move}>
                <button
                    className="rounded-md bg-white p-2 text-black"
                    onClick={() => jumpTo(move)}
                >
                    {description}
                </button>
            </li>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <ol className="space-y-2">{moves}</ol>
            </div>
        </div>
    )
}

interface BoardProps {
    xIsNext: boolean
    squares: ('X' | 'O' | null)[]
    onPlay: Function
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
    const winner = calculateWinner(squares)

    let status: string = winner
        ? 'Winner: ' + winner
        : 'Next player: ' + (xIsNext ? 'X' : 'O')

    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) {
            return
        }

        const nextSquares = squares.slice()

        xIsNext ? (nextSquares[i] = 'X') : (nextSquares[i] = 'O')

        onPlay(nextSquares)
    }

    type squaresType = ('X' | 'O' | null)[]

    function calculateWinner(squares: squaresType) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]

            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a]
            }
        }

        return null
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square
                    value={squares[0]}
                    onSquareClick={() => handleClick(0)}
                />
                <Square
                    value={squares[1]}
                    onSquareClick={() => handleClick(1)}
                />
                <Square
                    value={squares[2]}
                    onSquareClick={() => handleClick(2)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[3]}
                    onSquareClick={() => handleClick(3)}
                />
                <Square
                    value={squares[4]}
                    onSquareClick={() => handleClick(4)}
                />
                <Square
                    value={squares[5]}
                    onSquareClick={() => handleClick(5)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[6]}
                    onSquareClick={() => handleClick(6)}
                />
                <Square
                    value={squares[7]}
                    onSquareClick={() => handleClick(7)}
                />
                <Square
                    value={squares[8]}
                    onSquareClick={() => handleClick(8)}
                />
            </div>
        </>
    )
}

function Square({
    value,
    onSquareClick,
}: {
    value: 'X' | 'O' | null
    onSquareClick: MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    )
}
