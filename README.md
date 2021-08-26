# Chess-by-Tahir-v3
2 player local chess game.  
The concepts used in making it are:  
- Forms  
- CSS grids for the blocks on the board.  
- CSS grids for responsiveness also and there's media queries too.
- DOM manipulation mainly calling and recognising arrays through their IDs, reading their content and changing thier parent element and other attributes, such as classes.  

Basically, I took a square div element and set the image of the chess board as its background and set its display property to grid.  
Then I created the 8x8 block matrix made of div elements using two for loops and append them in the parent div element after giving them IDs with names as co-ordinates such as (3,7), (2,2) etc.  
Then cloned the images of the chess pieces and append them into their respective blocks.  
Then I set onclick functions of the chess pieces and the block divs.  
Those functions would determine which piece to pick and where to drop it, all using the IDs of the pieces and the block divs.
The messy part was determining which blocks should be clickable according which the selected piece. This was too done by using the coordinate like IDs.
