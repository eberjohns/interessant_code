#include <stdio.h>

int calculateDoorDimensions(int width, int angle){
    if(angle > 90 && angle <= 180){
        return 0;
    }else if(angle < 0 || angle > 180){
        printf("Invalid angle. Door remains closed\n");
        return width;
    }
    // Calculate the door width based on the angle
    int door_width = width - (width * angle / 90);
    
    return door_width;
}

void displayDoor(int door_width, int width, int height){
    for(int i=0;i<width+2;i++) printf("-");
    printf("\n");

    for(int i=0;i<height;i++){
        printf("|");
        int j=0;
        for(;j<door_width;j++){
            if(i == height/2 && j == door_width - 1){
                printf("o");
            }else{
                printf("#");
            }
        }
        for(; j < width; j++) {
            printf(" ");
        }
        
        printf("|\n");
    }

    for(int i=0;i<width+2;i++) printf("-");
    
    /*
    -------
    |#####|
    |#####|
    |#####|
    |####o|
    |#####|
    |#####|
    |#####|
    -------
    */
}

int main(){
    int width = 5,
        height = 7,
        angle = 0;

    printf("Enter the door height: ");
    scanf("%d", &height);
    printf("Enter the door width: ");
    scanf("%d", &width);
    printf("Enter the door angle: ");
    scanf("%d", &angle);

    int door_width = calculateDoorDimensions(width, angle);

    displayDoor(door_width, width, height);
    

    return 0;
}
