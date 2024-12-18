const SCREEN_FN_ID_RESET_SCREEN_IMAGE: number = 5;
const SCREEN_FN_ID_SET_IMAGE_SIZE: number = 6;
const SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE: number = 7;
const SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE_XFRM: number = 8;
const SCREEN_FN_ID_DRAW_LINE: number = 9;
const SCREEN_FN_ID_DRAW_LINE_XFRM: number = 10;
const SCREEN_FN_ID_DRAW_LINE_SHADED: number = 11;
const SCREEN_FN_ID_DRAW_RECT: number = 12;
const SCREEN_FN_ID_DRAW_RECT_XFRM: number = 13;
const SCREEN_FN_ID_FILL: number = 14;
const SCREEN_FN_ID_FILL_RECT: number = 15;
const SCREEN_FN_ID_FILL_RECT_XFRM: number = 16;
const SCREEN_FN_ID_FILL_BOUNDS_XFRM: number = 17;
const SCREEN_FN_ID_DRAW_BOUNDS_XFRM: number = 18;
const SCREEN_FN_ID_OUTLINE_BOUNDS_XFRM: number = 19;
const SCREEN_FN_ID_OUTLINE_BOUNDS_XFRM4: number = 20;
const SCREEN_FN_ID_SET_PIXEL: number = 21;
const SCREEN_FN_ID_SET_PIXEL_XFRM: number = 22;
const SCREEN_FN_ID_PRINT: number = 23;

import Screen = user_interface_base.Screen

function radioControlRxLoop() {
    let latestString: string = "";

    radio.onReceivedString((recievedString: string) => {
        basic.showString("R");
        latestString = recievedString;
    })


    radio.onReceivedBuffer((buffer: Buffer) => {
        const fn_id: number = buffer[0];
        const params: Buffer = buffer.slice(1);

        // basic.showString("Y")
        // basic.showNumber(fn_id)
        // basic.showString("N");
        // basic.showNumber(params[0]);
        // basic.showString("n");

        switch (fn_id) {
            case SCREEN_FN_ID_RESET_SCREEN_IMAGE: { Screen.resetScreenImage(); break; }
            case SCREEN_FN_ID_SET_IMAGE_SIZE: { Screen.setImageSize(params[0], params[1]); break; }
            case SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE: {
                const from: Bitmap = microdata.icons.get(latestString);
                Screen.drawTransparentImage(from, params[1], params[2]);
                break;
            }
            // case SCREEN_FN_ID_DRAW_TRANSPARENT_IMAGE_XFRM: { Screen.drawTransparentImageXfrm(params[0], params[1], params[2], params[3]); break; }
            case SCREEN_FN_ID_DRAW_LINE: { Screen.drawLine(params[0], params[1], params[2], params[3], params[4]); break; }
            // case SCREEN_FN_ID_DRAW_LINE_XFRM: { Screen.drawLineXfrm(params[0], params[1], params[2], params[3], params[4], params[5]); break; }
            // case SCREEN_FN_ID_DRAW_LINE_SHADED: { Screen.drawLineShaded(params[0], params[1], params[2], params[3], params[4]); break; }
            case SCREEN_FN_ID_DRAW_RECT: { Screen.drawRect(params[0], params[1], params[2], params[3], params[4]); break; }
            // case SCREEN_FN_ID_DRAW_RECT_XFRM: { Screen.drawRectXfrm(params[0], params[1], params[2], params[3], params[4], params[5]); break; }
            case SCREEN_FN_ID_FILL: { Screen.fill(params[0]); break; }
            case SCREEN_FN_ID_FILL_RECT: { Screen.fillRect(params[0], params[1], params[2], params[3], params[4]); break; }
            // case SCREEN_FN_ID_FILL_RECT_XFRM: { Screen.fillRectXfrm(params[0], params[1], params[2], params[3], params[4], params[5]); break; }
            // case SCREEN_FN_ID_FILL_BOUNDS_XFRM: { Screen.fillBoundsXfrm(params[0], params[1], params[2]); break; }
            // case SCREEN_FN_ID_DRAW_BOUNDS_XFRM: { Screen.drawBoundsXfrm(params[0], params[1], params[2]); break; }
            // case SCREEN_FN_ID_OUTLINE_BOUNDS_XFRM: { Screen.outlineBoundsXfrm(params[0], params[1], params[2], params[3]); break; }
            // case SCREEN_FN_ID_OUTLINE_BOUNDS_XFRM4: { Screen.outlineBoundsXfrm4(params[0], params[1], params[2], params[3]); break; }
            case SCREEN_FN_ID_SET_PIXEL: { Screen.setPixel(params[0], params[1], params[2]); break; }
            // case SCREEN_FN_ID_SET_PIXEL_XFRM: { Screen.setPixelXfrm(params[0], params[1], params[2], params[3]); break; }
            // case SCREEN_FN_ID_PRINT: { Screen.print(params[0], params[1], params[2], params[3], params[4], params[5]); break; }

            default: { break; }
        }
        // basic.showString("D");
    })
}
