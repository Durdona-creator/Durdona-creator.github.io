# ❌⭕ Tic Tac Toe

A simple Tic Tac Toe project with both a browser version and a C console version.

## About
This project keeps the classic 3×3 Tic Tac Toe rules: two players take turns as **X** and **O**, and the first player to place three marks in a row wins.

## Features
- Two-player gameplay
- 3×3 board
- Win checking for rows, columns, and diagonals
- Draw detection
- Restart option in the web version
- Input validation in the C version
- Simple, beginner-friendly code structure

## Tech Stack
- HTML
- C

## How to Run the Web Version
Open `index.html` in your browser.

## How to Run the C Version
Compile and run the C file with GCC:

```bash
gcc tictactoe.c -o tictactoe
./tictactoe
```

On Windows, you can run:

```bash
gcc tictactoe.c -o tictactoe.exe
tictactoe.exe
```

## Gameplay
- Players: X and O
- Input: positions 1–9 in the C version
- Turns alternate after every valid move
- Winner: first player with 3 marks in a row
- Draw: all 9 cells filled with no winner

## Future Improvements
- Add score tracking
- Add a single-player mode
- Add difficulty levels
- Improve animations and sounds
