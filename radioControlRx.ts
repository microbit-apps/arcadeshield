const SCREEN_FN_ID_RESET_SCREEN_IMAGE: number = 5;
const SCREEN_FN_ID_SET_IMAGE_SIZE: number = 6;
const SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE: number = 7;
const SCREEN_FN_ID_DRAW_LINE: number = 9;
const SCREEN_FN_ID_DRAW_RECT: number = 12;
const SCREEN_FN_ID_FILL: number = 14;
const SCREEN_FN_ID_FILL_RECT: number = 15;
const SCREEN_FN_ID_SET_PIXEL: number = 21;
const SCREEN_FN_ID_PRINT: number = 23;

import Screen = user_interface_base.Screen
function radioControlRxLoop() {
    let latestString: string = "";

    radio.onReceivedString((recievedString: string) => {
        basic.showString("R");
        latestString = recievedString;
        basic.showNumber(latestString.length);
    })

    radio.setGroup(5)
    radio.setFrequencyBand(14)


    radio.onReceivedBuffer((buffer: Buffer) => {
        const fn_id: number = buffer[0];
        const params: Buffer = buffer.slice(1);

        basic.showString("R")

        switch (fn_id) {
            // case SCREEN_FN_ID_ASSET_SETUP: { break;}
            case SCREEN_FN_ID_RESET_SCREEN_IMAGE: { Screen.resetScreenImage(); break; }
            case SCREEN_FN_ID_SET_IMAGE_SIZE: { Screen.setImageSize(params[0], params[1]); break; }

            // semi-cheat; the assets are pre-loaded.
            case SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE: {
                const from: Bitmap = microdata.icons.get(latestString);
                Screen.drawTransparentImage(from, params[1] - Screen.HALF_WIDTH, params[2] - Screen.HALF_HEIGHT);
                break;
            }

            case SCREEN_FN_ID_DRAW_LINE: { Screen.drawLine(params[0] - Screen.HALF_WIDTH, params[1] - Screen.HALF_HEIGHT, params[2] - Screen.HALF_WIDTH, params[3] - Screen.HALF_HEIGHT, params[4]); break; }
            case SCREEN_FN_ID_DRAW_RECT: { Screen.drawRect(params[0] - Screen.HALF_WIDTH, params[1] - Screen.HALF_HEIGHT, params[2], params[3], params[4]); break; }
            case SCREEN_FN_ID_FILL: { Screen.fill(params[0]); break; }
            case SCREEN_FN_ID_FILL_RECT: { Screen.fillRect(params[0] - Screen.HALF_WIDTH, params[1] - Screen.HALF_HEIGHT, params[2], params[3], params[4]); break; }
            case SCREEN_FN_ID_SET_PIXEL: { Screen.setPixel(params[0] - Screen.HALF_WIDTH, params[1] - Screen.HALF_HEIGHT, params[2]); break; }

            case SCREEN_FN_ID_PRINT: { Screen.print(latestString, params[0] - Screen.HALF_WIDTH, params[1] - Screen.HALF_HEIGHT, params[2]); break; }

            default: { break; }
        }
        basic.clearScreen()
    })
}
