
const SCREEN_FN_ID_FILL: number = 0;
const SCREEN_FN_ID_FILL_RECT: number = 1;

function radioControlRxLoop(theScreen: Bitmap) {
    radio.onReceivedBuffer((buffer: Buffer) => {
        const fn_id: number = buffer[0];
        const params: Buffer = buffer.slice(1);

        basic.showString("Y")
        basic.showNumber(fn_id)
        basic.showString("N");
        basic.showNumber(params[0]);
        basic.showString("n");
        basic.clearScreen();

        switch (fn_id) {
            case SCREEN_FN_ID_FILL: { theScreen.fill(params[0]); break; }
            case SCREEN_FN_ID_FILL_RECT: { theScreen.fillRect(params[0], params[1], params[2], params[3], params[4]); break; }

            default: {
                break;
            }
        }

        basic.showString("D");
    })
}
