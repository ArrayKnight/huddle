# Huddle Coding Challenge

### `npm install && npm start`

## Instructions

### Overview

We would like you to build a small tile map renderer that takes in a provided layout file and a tile set and renders this world to the screen.

### The goals of this exercise

-   Get a feel for your code approach.
-   Get an understanding of your javascript WebGL skill level.
-   Get an understanding of you ability to optimise a scene.

### Approach

-   Code is either ES6 or Typescript.
-   Created with either pure WebGL or a higher level library (eg Pixi.js)

### Features

-   Load and parse the sprites and the tile world data provided.
-   Build a tile map renderer.
-   Ability to move the ‘Camera’ to scroll the world.
-   _bonus_ Add some little characters moving around but they should be CSS dom elements mapping to the WebGL.
-   _bonus_ Ability to zoom the Camera.
-   _bonus_ decent culling approach and optimization.

### Assets provided

`world-map.json` - A layout of the 16 x 16 block world. It is a two dimensional array with the following format:

```
[
	[ 0, 0, 1, 1, ... 32, 22] // row 1 containing tile ids (length 120)
	[ 1, 5, 1, 1, ... 4, 40] // row 2 tile ids (length 120)
	...
	[ 0, 6, 1, 8, ... 32, 22] // row 70 tile ids (length 120)
]
```

To calculate the tile position on the sprite sheet from the tile id as follows:

```
0,   1,   2,   3,   4,  ..., 27
28, 29,  30,  31,  32,  ..., 56
57, 58,  59,  60,  61,  ..., 84
```

`sprite-world.png` - The tile sprite sheet. Each tile is 16x16 pixels wide.

`sprite-characters.png` - the assets for the characters that move around in the world. The challenge here is making them DOM elements that map directly and correctly to the map itself. Making it seam like they are one thing.

Just like if you were to work with us for real, feel free to ask any questions and we will be happy to help.

### Validation

`world-example.mov` - this a reference to what the world should look like when rendered correctly.
