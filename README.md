# ❌⭕ Tic Tac Toe

A simple Tic Tac Toe project with both a browser version and a C console version.

## 📌 Project Repository

**Repository:** `Durdona-creator/Durdona-creator.github.io`  
**Repository owner:** `Durdona-creator`  
**GitHub link:** https://github.com/Durdona-creator/Durdona-creator.github.io

## 👥 Team Members

| Name / GitHub Account | Role |
|---|---|
| `Durdona-creator` | Project owner / developer |
| `kezialawita` | Team member / contributor |

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

| Component | Technology |
|---|---|
| Web interface | HTML, CSS, JavaScript |
| Console version | C |
| Compiler | GCC / MinGW |

## Project Files

```text
 tictactoe/
 ├── index.html       # Browser version layout
 ├── style.css        # Browser version design
 ├── script.js        # Browser version game logic
 ├── tictactoe.c      # Main C console version
 ├── tictactoe2.c     # Alternative C version
 ├── .gitignore
 └── README1.md
```

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

## Uploading the Project to GitHub

Use these commands to initialize and push the project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: Tic Tac Toe project"
git branch -M main
git remote add origin https://github.com/Durdona-creator/Durdona-creator.github.io.git
git push -u origin main
```

## Future Improvements

- Add score tracking
- Add a single-player mode
- Add difficulty levels
- Improve animations and sounds

## Authors

University project — 2025

- `Durdona-creator`
- `kezialawita`
