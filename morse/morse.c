#include <stdio.h>
#include <conio.h>
#include <windows.h>

int left(int index){ return 2*index+1; }

int right(int index){ return 2*index+2; }

int main() {
    char sentence[20];
    for(int i=0; i<20;i++) sentence[i] = '\0'; // set all characters to null

    int sentence_end = 0; // to track where to add
    char key, dot = 'f', dash = 'd', gap = 'g';
    char morse_tree[] = "_TEMNAIOGKDWRUS__QZYCXBJP_LF_VH";

    int index = 0;

    printf("Morse code decoder:\n");

    while (1) {
        // Check for keypress
        if (_kbhit()) {
            key = _getch();

            switch(key){
                case 'd':   index = left(index); break; //dash
                case 'f':   index = right(index); break; //dot
                case 'g': // gap
                    sentence[sentence_end] = morse_tree[index];
                    sentence_end++;
                    index = 0;
                    break;
                default: return 0;
            }
        }

        // Clear screen and show updated info
        system("cls");
        printf("%s",sentence);

        Sleep(500); // Delay to prevent flickering and high CPU usage
    }

    return 0;
}
