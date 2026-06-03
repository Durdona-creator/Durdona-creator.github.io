#include <stdio.h>
#include <stdlib.h>
#include <conio.h>

#define SIZE 3

char board[SIZE][SIZE] = {{'1', '2', '3'}, {'4', '5', '6'}, {'7', '8', '9'}};

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

int isValidMove(int input) {
    if (input < 1 || input > 9) {
        return 0;
    }

    int row = (input - 1) / SIZE;
    int col = (input - 1) % SIZE;
    return board[row][col] == ' ';
}

void move(int input, int player) {
    char ch = player == 1 ? 'X' : 'O';
    int row = (input - 1) / SIZE;
    int col = (input - 1) % SIZE;
    board[row][col] = ch;
}

int main() {
    int input;
    int player = 1;

    draw();
    printf("Press any key to start!");
    getch();

    system("cls");
    removeNumber();

    for (int i = 0; i < 9; i++) {
        system("cls");
        draw();

        do {
            printf("Player %c, enter a number (1-9): ", player == 1 ? 'X' : 'O');
            scanf("%d", &input);
        } while (!isValidMove(input));

        move(input, player);

        if (check()) {
            system("cls");
            draw();
            printf("Player %c wins!\n", player == 1 ? 'X' : 'O');
            return 0;
        }

        player = !player;
    }

    system("cls");
    draw();
    printf("It's a draw!\n");
    return 0;
}
