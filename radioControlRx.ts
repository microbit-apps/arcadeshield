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

    // radio.sendString("ASSET_TX_START" + ", " + iconNames.length)
    // iconNames.forEach(name => {
    //     Screen.sendBitmap(name, icons.get(name))
    // })

    // radio.sendString("ASSET_TX_END")
    // basic.showString("Done")


    radio.setGroup(5)
    radio.setTransmitPower(7)
    radio.setFrequencyBand(14)


    // First message should be an ASSET_TX_START + "," + number of assets
    // Then asset_name + "," + bitmap.height (number of rows of this asset)
    // Each row of the bitmap of each asset is sent & reconstructed


    const waitForAck = () => {
        basic.showString("W")

        let ackReceived = false;
        let timeOut = false;
        radio.onReceivedString(_ => {
            ackReceived = true;
        })

        // timeout:
        control.inBackground(() => {
            basic.pause(200);
            timeOut = true
        })

        while (!ackReceived && !timeOut) { basic.pause(25) }
        radio.onReceivedValue(_ => { }) // reset radio

        return timeOut;
    };


    // Get the 'radio.sendString("ASSET_TX_START" + ", " + iconNames.length)':
    basic.showString("S")
    // waitForAck();
    let receivedStartAssetTransfer = false;
    radio.onReceivedString(_ => receivedStartAssetTransfer = true);
    while (!receivedStartAssetTransfer) { basic.pause(25) }
    basic.showString("D")


    let numberOfAssets = 0;
    let received = false;

    // Wait for the start message that states how many assets there are:
    radio.onReceivedString((receivedString: string) => {
        basic.showString("R")
        numberOfAssets = +receivedString.split(",")[1]
        received = true;
        basic.showString("A: " + numberOfAssets)
    })

    while (!received) {
        basic.pause(10)
    }


    radio.sendString("ACK");
    basic.showString("D")

    received = false;
    let rowsReceived = 0;
    let assetsReceived = 0;
    let assetBuffer: Buffer = null;

    // Handle first message per asset
    radio.onReceivedString((receivedString: string) => {
        basic.showString("R");
        // latestString = recievedString;
        // basic.showNumber(latestString.length);


        const data = receivedString.split(",");
        // const assetName: string = data[0];
        const assetRowsExpected: number = +data[1];

        rowsReceived = 0;
        while (rowsReceived != assetRowsExpected) {
            basic.pause(10) // radio.onReceivedBuffer() needs some time to work; but we don't want extraneous delays
        }

        // Send an ack since all rows are received; now the Tx will send the next bitmap
        radio.sendString("ACK," + assetsReceived);
        assetsReceived++;

        basic.showNumber(assetsReceived % 10);
        // basic.showString(assetName)
    })


    // Process each row of the bitmap into a single asset:
    radio.onReceivedBuffer((onReceivedBuffer: Buffer) => {
        if (assetBuffer == null)
            assetBuffer = onReceivedBuffer
        else
            assetBuffer = Buffer.concat([assetBuffer, onReceivedBuffer])
        rowsReceived++;

        // basic.showNumber(rowsReceived % 10);
    })

    while (assetsReceived != numberOfAssets) {
        basic.pause(25)
    }


    radio.onReceivedBuffer((buffer: Buffer) => {
        const fn_id: number = buffer[0];
        const params: Buffer = buffer.slice(1);

        // basic.showString("R")

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
