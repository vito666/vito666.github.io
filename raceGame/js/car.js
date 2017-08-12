const GROUNDSPEED_DECAY_MULT = 0.94,
    DRIVE_POWER = 0.5,
    REVERSE_POWER = 0.2,
    TURN_RATE = 0.05,
    MIN_SPEED_TO_TURN = 0.5;


function carClass() {

    this.X = 75;
    this.Y = 75;
    this.ang = 0;
    this.speed = 0;
    this.myCarPic; // which picture to use
    this.name = "Untitled car"

    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;


    this.setupInput = (upKey, rightKey, downKey, leftKey) => {
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
    };

    this.reset = (whichImage, carName) => {
        this.name =  carName;
        this.myCarPic = whichImage;
        this.speed = 0;

        for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    this.ang = -Math.PI / 2;
                    this.x = eachCol * TRACK_W + TRACK_W / 2;
                    this.y = eachRow * TRACK_H + TRACK_H / 2;
                    return;
                } // end of player start if
            } // end of col for
        } // end of row for
        console.log("No player start found");
    }; // end of carReset func

    this.move = () => {
        this.speed *= GROUNDSPEED_DECAY_MULT;

        if (this.keyHeld_Gas) {
            this.speed += DRIVE_POWER;
        }
        if (this.keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
        }
        if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
            if (this.keyHeld_TurnRight) {
                this.ang += TURN_RATE;
            }
            if (this.keyHeld_TurnLeft) {
                this.ang -= TURN_RATE;
            }
        }


        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        carTrackHandling(this);

    };

    this.draw = () => {
        drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
    };
}