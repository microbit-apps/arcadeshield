# MakeCode extension: Arcade Shield for BBC micro:bit (V2)

This MakeCode extension allows you to use any of the  MakeCode Arcade shields with the MakeCode for BBC micro:bit editor. The extension provides access 
to the screen and buttons on the shield, and has
a Bitmap abstraction with numerous drawing primitives
(draw line, circle, square, etc).
Bitmaps also can be created using the built-in
image editor in MakeCode.

> **NOTE: This extension will only work in https://makecode.microbit.org/beta**. The extension is still under development and is subject to changes. Please file issues at https://github.com/microbit-apps/pxt-arcadeshield/issues 

## Arcade Shields for the micro:bit V2

Various Arcade shields for the micro:bit V2 are available on the market today, including:

<table>
<tr valign="top">
<td width="33%" >
<a href="https://www.kittenbot.cc/products/newbit-arcade-shield">
Kittenbot's newbit Arcade shield
</a>
</td><td width="33%" >
<a href="https://shop.elecfreaks.com/products/micro-bit-retro-programming-arcade">
ELECFREAK's micro:bit Arcade shield
</a>
</td>
<td width="33%" >
<a href="https://www.icshop.com.tw/products/368112100137?locale=en">
ICShopping's Game:bit Arcade shield
</a>
</td></tr>
<tr>
<td>
<a alt="Kittenbot's newbit Arcade shield" href="https://www.kittenbot.cc/products/newbit-arcade-shield">
<img src="assets/newbit-shield.png">
</a>
</td><td>
<a alt="ELECFREAK's micro:bit Retro Arcade shield" href="https://shop.elecfreaks.com/products/micro-bit-retro-programming-arcade">
<img src="assets/elecfreaks-shield.png">
</a>
</td><td>
<a alt="ICShopping's Game:bit" href="https://www.icshop.com.tw/products/368112100137?locale=en">
<img src="assets/gamebit-shield.png">
</a>
</td></tr>
<tr valign="top">
<td>

Small screen. No battery or battery pack included. 3.7V JST power jack on back. One <a href="https://aka.ms/jacdac">Jacdac</a> port.

</td>

<td>

Assembly required. Small screen. AAA Battery pack on back. One <a href="https://aka.ms/jacdac">Jacdac</a> port.

</td>
<td>

No assembly required. Large screen and 3d-printed enclosure with LiPo battery inside. Two <a href="https://aka.ms/jacdac">Jacdac</a> ports.

</td>
</tr>

</table>


## Simulator support

As shown below, the extension provides a simulator for the display,
with keyboard controls mapping to the inputs of
the display shield (A and B buttons, and the four directions of the
D-pad, see arrow buttons).  Blocks
for the shield are under the toolbox categories `Controller` and
`Drawing` and are described further below.

![MakeCode with Arcade Shield Simulator](https://microbit-apps.github.io/pxt-arcadeshield/assets/shieldSim.png)

## Blocks

The examples below are illustrative. All blocks have their own
detailed help pages, available from the MakeCode editor. 
More APIs are available via TypeScript.

### Controller

The controller API has event handlers for the A,B and four directions
on the D-pad, as well as the menu button. There also are functions
for polling the buttons. Some example code:

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    screen().fill(Math.randomRange(1,14))
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    screen().fill(15)
})
```

Display present/absent
```blocks
```

### Drawing into the screen bitmap

#### Screen coordinates and lines

The screen bitmap is 160 pixels wide and 120 pixels high. 
The upper left of the screen is coordinate (0,0); The lower 
right of the screen is coordinate (159,119).  We draw two lines 
to the screen bitmap to show the four corners of the screen:

```blocks
screen().drawLine(0, 0, 159, 119, 2)
screen().drawLine(159, 0, 0, 119, 5)
```
The first two parameters to the function are the (x,y)
coordinate where the line should start, while the next
two parameters are the (x',y') coordinate where the line
should end. The final parameter is the color to draw.

### Drawing out of bounds

You don't need to worry (for any drawing command) about drawing off
the screen. So, for example,
```blocks
screen().drawLine(-10,-10,10,10,2)
```
has the same effect as 
```blocks
screen().drawLine(0,0,10,10,2)
```
While the following code won't display anything on the screen at all:
```blocks
screen().drawLine(-1,-1,-10,-10,2)
```

#### Screen center, setting a pixel, and floating point

Since the width and height of the screen are both even, the center of
the screen is bounded by these four pixels, as shown by the following
four commands that each draw a single pixel:
```
screen().setPixel(79, 59, 1)
screen().setPixel(80, 59, 1)
screen().setPixel(79, 60, 1)
screen().setPixel(80, 60, 1)
```

You can pass floating point numbers to any drawing command that takes 
a coordinate. For efficiency, the underlying representation is fixed point 
in the MakeCode runtime. Fractional values are ignored when setting a pixel in a bitmap, so
```blocks
screen().setPixel(79.6, 59.6, 1)
```
has the same effect as 
```blocks
screen().setPixel(79.4, 59.4, 1)
```
which has the same effect as
```blocks
screen().setPixel(79, 59, 1)
```
#### Getting a pixel's (color index) value

The following code will show a 2 on the micro:bit screen, as this is the color index 
stored in the pixel:
```blocks
screen().setPixel(80, 60, 2)
basic.showNumber(screen().getPixel(80, 60))
```
So we can see that each pixel is like a variable that stores a value (in the range 0-15)
that can later be retrieved.

#### Drawing shapes

You can draw a recentangle by first specifying the upper left
corner with the first two parameters to the `drawRect` 
function, followed by the width and the height of the
rectangle, and ending with the draw color:

```blocks
screen().drawRect(0, 0, 10, 10, 1)
screen().drawRect(10, 10, 20, 20, 2)
screen().drawRect(0, 10, 10, 20, 3)
screen().drawRect(10, 0, 20, 10, 4)
```

You can have the rectangle filled with the specified color instead:
```blocks
screen().fillRect(0, 0, 10, 10, 1)
screen().fillRect(10, 10, 20, 20, 2)
screen().fillRect(0, 10, 10, 20, 3)
screen().fillRect(10, 0, 20, 10, 4)
```

To draw a circle, first specify the coordinate
of the center of the circle, followed by the radius
of the circle and the draw color. Again, you can choose
to fill the circle or just draw its outline:
```blocks
screen().fillCircle(10, 10, 10, 2)
screen().drawCircle(10, 10, 10, 5)
```
### Bitmap

Let's dig into bitmaps, which you can create yourself (the screen is represented by a bitmap, as we have seen already).

A bitmap is some number of rows and columns of color pixels that make up rectangular picture. A _pixel_ is a single point of color inside the bitmap.

Bitmaps are two-dimensional so they have a known height and width. When a bitmap is declared, or created, the height and width are specified either by the _layout_ of the bitmap or as parameters to it's `create` method.

#### Bitmap layout

You _declare_ a bitmap by creating a layout. This is done in JavaScript with the ``bmp'...'`` string declaration. The pixels are single characters inside the string.

##### Zero size bitmap

An zero size bitmap has no height or width and has no pixels, so the **bmp** string is just ``bmp''``.

```typescript
let emptyBitmap = bmp``
```

You can also use the `create` function and make another zero size bitmap with no pixels.

```blocks
let emptyBitmap1 = bmp``
let emptyBitmap2 = bitmaps.create(0, 0)
```

A zero size bitmap isn't really useful so MakeCode actually makes it have some size if you declare it without any.

#### Bitmaps with size

To make a bitmap with some size, just set the pixel characters in the rows of the **bmp** string. A bitmap that is 1 pixel high by 1 pixel wide (1 x 1) is:

```typescript
let oneByOne = bmp`.`
```

A bitmap that is 2 x 2 is declared like this:

```typescript
let twoBytwo = bmp`
. .
. .
`
```

Here they are in blocks:

```blocks
let oneByOne = bmp`.`
let twoBytwo = bmp`
. .
. .
`
```

You'll notice that they look the same. That's because the pixel colors are not set so the bitmaps are empty.

Bitmaps don't have to be exactly square. The height and width can be different. Here's a 6 x 2 bitmap:

```typescript
let sixByTwo = bmp`
. . . . . .
. . . . . .
`
```

#### Setting pixels

##### Transparent pixels

A pixel value of `.` means an empty pixel. This pixel has no color and that pixel _location_ in the bitmap is _transparent_. Being transparent means that if this bitmap is on top of another bitmap (overlapping) that has some pixel color, then the color of the pixel in the bitmap underneath shows through to the bitmap above it.

##### Pixel colors

Besides the empty, or transparent pixel `.`, there are 16 color pixels you can use. These are matched to colors in a _palette_. A palette is a group of colors you can choose from. The colors are selected by using a single number or letter to match them. The default palette, for example, uses these colors:

* `.`: empty or transparent
* `0`: transparent
* `1`: white
* `2`: light blue
* `3`: medium blue
* `4`: dark blue
* `5`: violet
* `6`: lime
* `7`: olive
* `8`: brown
* `9`: cyan
* `a`: red
* `b`: purple
* `c`: pink
* `d`: orange
* `e`: yellow
* `f`: black

A 1 x 1 bitmap with a red pixel is declared as:

```typescript
let oneRed = bmp`a`
```

As a block it looks like this:

```block
let oneRed = bmp`a`
```

We can make 4 x 4 bitmap that uses all of the colors:

```typescript
let allColors = bmp`
0 1 2 3
4 5 6 7
8 9 a b
c d e f
`
```

This the same bitmap as a block:

```block
let allColors = bmp`
0 1 2 3
4 5 6 7
8 9 a b
c d e f
`
```

#### Transparency and overlap

Let's see how transparency works with bitmaps. A `.` means that a pixel is transparent. Only the pixels with a color will show in a bitmap and any pixels with color in a bitmap below it will show through. So, to demonstrate, let's make two bitmaps that are the same size and put one that has some transparent pixels on top of one that doesn't.

Our first bitmap is a green circle inside a 8 x 8 rectangle. All of the pixels around the circle are transparent.

```typescript
let greenBall = bmp`
. . . . . . . .
. . . 6 6 . . .
. . 6 6 6 6 . .
. 6 6 6 6 6 6 .
. 6 6 6 6 6 6 .
. . 6 6 6 6 . .
. . . 6 6 . . .
. . . . . . . .
`
```

The other bitmap is the same size but with all yellow pixels.

```blocks
let greenBall = bmp`
. . . . . . . .
. . . 6 6 . . .
. . 6 6 6 6 . .
. 6 6 6 6 6 6 .
. 6 6 6 6 6 6 .
. . 6 6 6 6 . .
. . . 6 6 . . .
. . . . . . . .
`

let yellowSquare = bmp`
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
`
```

Putting the green circle bitmap exactly over the yellow square, you see that the yellow from the bitmap below isn't blocked out by the transparent pixels from the bitmap on top.

```sim
let greenBall = bmp`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . 6 6 6 6 . . . . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . 6 6 6 6 6 6 6 6 6 6 . . . 
. . . 6 6 6 6 6 6 6 6 6 6 . . . 
. . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
. . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
. . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
. . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
. . . 6 6 6 6 6 6 6 6 6 6 . . . 
. . . 6 6 6 6 6 6 6 6 6 6 . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . . . . 6 6 6 6 . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`
let yellowSquare = bitmaps.create(16, 16)
yellowSquare.fill(5)

screen().drawBitmap(yellowSquare, 0, 0)
screeb().drawTransparentBitmap(greenBall, 0, 0)
```

#### Setting pixels at locations

You can create your bitmaps while your program is running too (dynamically). To make a bitmap this way, you set the color of a pixel at its location with code. Pixels are addressed by their row (``x`` value) and column (``y`` value) inside the bitmap. You could create and empty bitmap and make some or all of the bitmap by setting pixel colors in your code. Let's make a 32 x 32 box by creating an empty bitmap and then draw an orange border around it.

```blocks
let orangeBox = bitmaps.create(32, 32)
for (let i = 0; i <= 31; i++) {
    orangeBox.setPixel(0, i, 4)
    orangeBox.setPixel(i, 0, 4)
    orangeBox.setPixel(i, 31, 4)
    orangeBox.setPixel(31, i, 4)
}
screen().drawTransparentBitmap(orangeBox, 0, 0)
```


#### Creating your own bitmaps

There are two ways you can create your own bitmap. 

##### Bitmap editor and hex literal

The first way to create a bitmap is with the bitmap editor, 
which represents the bitmap in code as a hex literal that 
must be assigned to a program variable. The bitmap won't appear
on the screen unless it is draw using the function below:
```
```block
let bitmap = bmp`
    . . . . . . . . . . . . . . . . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    . 2 . . . . . . . . . . . . 2 . 
    . 2 . 2 2 2 2 2 2 2 2 2 2 . 2 . 
    . 2 . 2 . . . . . . . . 2 . 2 . 
    . 2 . 2 . . . . . . . . 2 . 2 . 
    . 2 . 2 . . 5 5 5 5 . . 2 . 2 . 
    . 2 . 2 . . 5 5 5 5 . . 2 . 2 . 
    . 2 . 2 . . 5 5 5 5 . . 2 . 2 . 
    . 2 . 2 . . 5 5 5 5 . . 2 . 2 . 
    . 2 . 2 . . . . . . . . 2 . 2 . 
    . 2 . 2 . . . . . . . . 2 . 2 . 
    . 2 . 2 2 2 2 2 2 2 2 2 2 . 2 . 
    . 2 . . . . . . . . . . . . 2 . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    . . . . . . . . . . . . . . . . 
    `
    screen().fill(5)
    screen().drawBitmap(0,0,bitmap)
```
The `.` in string representation of the bitmap represents the
color value 0, which is interpreted as `transparent` by the following
function:
```blocks
    screen().fill(5)
    screen().drawTransparentBitmap(0,0,bitmap)
```

##### Bitmap create function

#### Drawing to a bitmap

All the functions we previously reviewed for drawing to the
screen can also be applied to a bitmap. EXAMPLE

## TypeScript APIs

# Supported targets

- for PXT/microbit

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
