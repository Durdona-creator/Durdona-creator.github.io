#include <stdio.h>
#include <stdlib.h>
#include <conio.h>

#define SIZE 3
#define TOTAL_MOVES 9

char board[SIZE][SIZE] = {{'1', '2', '3'}, {'4', '5', '6'}, {'7', '8', '9'}};

void clearScreen() {
    system("cls");
}

void removeNumber() {
    for (int i = 0; i < SIZE; i++) {
        for (int j = 0; j < SIZE; j++) {
            board[i][j] = ' ';
        }
    }
}

void draw() {
    printf("\n\t\t\tTIC TAC TOE\n\n");
    printf("\t\t\t %c %c %c %c %c \n", board[0][0], 186, board[0][1], 186, board[0][2]);
    printf("\t\t\t%c%c%c%c%c%c%c%c%c%c%c\n", 205, 205, 205, 206, 205, 205, 205, 206, 205, 205, 205);
    printf("\t\t\t %c %c %c %c %c \n", board[1][0], 186, board[1][1], 186, board[1][2]);
    printf("\t\t\t%c%c%c%c%c%c%c%c%c%c%c\n", 205, 205, 205, 206, 205, 205, 205, 206, 205, 205, 205);
    printf("\t\t\t %c %c %c %c %c \n\n", board[2][0], 186, board[2][1], 186, board[2][2]);
}

int check() {
    for (int i = 0; i < SIZE; i++) {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != ' ') {
            return 1;
        }

        if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != ' ') {
            return 1;
        }
    }

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        return 1;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        return 1;
    }

    return 0;
}

void inputValue(int input, char player) {
    int row = (input - 1) / SIZE;
    int col = (input - 1) % SIZE;
    board[row][col] = player;
}

int isValidMove(int input) {
    if (input < 1 || input > 9) {
        return 0;
    }

    int row = (input - 1) / SIZE;
    int col = (input - 1) % SIZE;
    return board[row][col] == ' ';
}

int readMove(char player) {
    int input;

    while (1) {
        printf("Player %c, choose a position (1-9): ", player);

        if (scanf("%d", &input) != 1) {
            while (getchar() != '\n');
            printf("Please enter numbers only.\n");
            continue;
        }

        if (isValidMove(input)) {
            return input;
        }

        printf("That position is not available. Try again.\n");
    }
}

int main() {
    int input;
    char player = 'X';

    draw();
    printf("Press any key to start!\n");
    getch();

    clearScreen();
    removeNumber();

    for (int turn = 0; turn < TOTAL_MOVES; turn++) {
        draw();
        input = readMove(player);
        inputValue(input, player);

        if (check()) {
            clearScreen();
            draw();
            printf("Player %c wins!\n", player);
            return 0;
        }

        player = (player == 'X') ? 'O' : 'X';
        clearScreen();
    }

    draw();
    printf("It's a draw!\n");
    return 0;
}
