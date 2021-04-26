//Assigning variable to images and divs by calling through IDs
var boardContainer=document.getElementById("boardContainer");
var greenSquare=document.getElementById("greenSq");
var redSquare=document.getElementById("redSq");
var matchEndDiv= document.getElementById("matchEnd");
var blackPromotion= document.getElementById("blackPromotion");
var whitePromotion= document.getElementById("whitePromotion");
var trashDiv= document.getElementById("trashDiv");
//White chess pieces
var whitePawn=document.getElementById("wp");
whitePawn.onclick=pieceClick;
var wRook1=document.getElementById("wr");
var wRook2=wRook1.cloneNode(true);
var wBishop1=document.getElementById("wb");
var wBishop2=wBishop1.cloneNode(true);
var wKnight1=document.getElementById("wkn");
var wKnight2=wKnight1.cloneNode(true);
var wKing=document.getElementById("wk");
var wQueen=document.getElementById("wq");
//Black chess pieces
var blackPawn=document.getElementById("bp"); 
var bRook1=document.getElementById("br");
var bRook2=bRook1.cloneNode(true);
var bBishop1=document.getElementById("bb");
var bBishop2=bBishop1.cloneNode(true);
var bKnight1=document.getElementById("bkn");
var bKnight2=bKnight1.cloneNode(true);
var bKing=document.getElementById("bk");
var bQueen=document.getElementById("bq");

var wPawn=new Array(8);//For storing the clones of white pawns
var bPawn=new Array(8);//For storing the clones of black pawns
var greenSqArray=new Array(56);//For storing the clones of green square
var redSqArray=new Array(56);//For storing the clones of red square
var newWhitePieceArray=new Array(8);//For storing the new promoted white pieces
var newBlackPieceArray=new Array(8);//For storing the new promoted black pieces
var wpieces= [wRook1, wKnight1, wBishop1, wQueen, wKing, wBishop2, wKnight2, wRook2];//To make it easier to use them throught a loop istead of referrin to them one by one
var bpieces= [bRook1, bKnight1, bBishop1, bKing, bQueen, bBishop2, bKnight2, bRook2];
var i, j, moveCounter=0, newBlackPieceCounter=0, newWhitePieceCounter=0, p1, p2, pname, pieceSelector;

for(i=0; i<56; i++)//Cloning 1 square to 28 squares
{  
  greenSqArray[i]=greenSquare.cloneNode(true);
  redSqArray[i]=redSquare.cloneNode(true);
}

//We don't need these now
greenSquare.remove();
redSquare.remove();

for(i=0; i<8; i++)//Defining blocks divs and cloning 1 pawn to 8 pawns
{
  for(j=0; j<8; j++)
  {
    var block= document.createElement("div");
    block.className="boardBlock";
    block.id=i + "," + j;
    boardContainer.appendChild(block);  
  }
  wPawn[i]=whitePawn.cloneNode(true);//Cloning 1 pawn to 8 pawns
  bPawn[i]=blackPawn.cloneNode(true);
}

//We don't need these now
whitePawn.remove();
blackPawn.remove();

//Initially positioning the pieces
for(i=0; i<8; i++)
  for(j=0; j<8; j++)
  {
    var block=document.getElementById(i+ "," + j);
    if(i==0)
      block.appendChild(wpieces[j]);
    else if(i==1)
      block.appendChild(wPawn[j]);
    else if(i==6)
      block.appendChild(bPawn[j]);
    else if(i==7)
      block.appendChild(bpieces[j]);
  }

blackPieceOnclickDisable();//Disable black peices on first move because white has the first move

function promotionalPieceClick(event)
{
  if(event.target.id[0]== "w")
  {
    newWhitePieceArray[newWhitePieceCounter]= event.target.cloneNode(true);
    newWhitePieceArray[newWhitePieceCounter].onclick= pieceClick;
    pieceSelector.parentNode.appendChild(newWhitePieceArray[newWhitePieceCounter]);
    newWhitePieceCounter++;
    whitePromotion.className= "initialPromotionDisplay";
    whitePieceOnclickDisable();
  }
  else
  {
    newBlackPieceArray[newBlackPieceCounter]= event.target.cloneNode(true);
    newBlackPieceArray[newBlackPieceCounter].onclick= pieceClick;
    pieceSelector.parentNode.appendChild(newBlackPieceArray[newBlackPieceCounter]);
    newBlackPieceCounter++;
    blackPromotion.className= "initialPromotionDisplay";
    blackPieceOnclickDisable();
  }
  pieceSelector.className= "deadPiece";
  trashDiv.appendChild(pieceSelector);
}

function greenSquareClickFn(event)
{
  if(pieceSelector.id== "bp" && event.target.parentNode.id[0]== "0")
  {
    blackPromotion.className= "pawnPromotion";
  }
  else if(pieceSelector.id== "wp" && event.target.parentNode.id[0]== "7")
  {
    whitePromotion.className= "pawnPromotion";
  }
  event.target.parentNode.appendChild(pieceSelector);
  moveCounter++;
  if((moveCounter)%2==0)
  {
    pname.innerHTML=p1+"\'s Turn";
    blackPieceOnclickDisable();
  }
  else
  {
    pname.innerHTML=p2+"\'s Turn";
    whitePieceOnclickDisable();
  }
  squareRemover();
}

function redSquareClickFn(event)
{
  if(pieceSelector.id== "bp" && event.target.parentNode.id[0]== "0")
  {
    blackPromotion.className= "pawnPromotion";
  }
  else if(pieceSelector.id== "wp" && event.target.parentNode.id[0]== "7")
  {
    whitePromotion.className= "pawnPromotion";
  }
  if(event.target.parentNode.firstChild.id== "wk" || event.target.parentNode.firstChild.id== "bk")//Checking the end of match
  {
    matchEndDiv.className= "showMatchEnd";
    if(event.target.parentNode.firstChild.id== "wk")
      document.getElementById("winnerName").innerHTML=p2;
    else
      document.getElementById("winnerName").innerHTML=p1; 
    document.getElementById("gameDiv").className= "initGameCls";
  }
  event.target.parentNode.firstChild.className="deadPiece";
  trashDiv.appendChild(event.target.parentNode.firstChild);
  event.target.parentNode.appendChild(pieceSelector);
  moveCounter++;
  if((moveCounter)%2==0)
  {
    pname.innerHTML=p1+"\'s Turn";
    blackPieceOnclickDisable();
  }
  else
  {
    pname.innerHTML=p2+"\'s Turn";
    whitePieceOnclickDisable();
  }
  squareRemover();
}

function victimPiece(event)
{
  if(event.target.id== "wk" || event.target.id== "bk")//Checking the winner
  {
    matchEndDiv.className= "showMatchEnd";
    if(event.target.id== "wk")
      document.getElementById("winnerName").innerHTML=p2;
    else
      document.getElementById("winnerName").innerHTML=p1; 
    document.getElementById("gameDiv").className= "initGameCls";
  }
  if(pieceSelector.id== "bp" && event.target.parentNode.id[0]== "0")
  {
    blackPromotion.className= "pawnPromotion";
  }
  else if(pieceSelector.id== "wp" && event.target.parentNode.id[0]== "7")
  {
    whitePromotion.className= "pawnPromotion";
  }
  event.target.className="deadPiece";
  event.target.parentNode.appendChild(pieceSelector);
  trashDiv.appendChild(event.target);
  moveCounter++;
  if((moveCounter)%2==0)
  {
    pname.innerHTML=p1+"\'s Turn";
    blackPieceOnclickDisable();
  }
  else
  {
    pname.innerHTML=p2+"\'s Turn";
    whitePieceOnclickDisable();
  }
  squareRemover();
}

function whitePieceOnclickReset()
{
  for(i=0; i<8; i++)
  {
    wpieces[i].onclick=pieceClick;
    wPawn[i].onclick=pieceClick;
  }
  for(i=0; i<newWhitePieceCounter; i++)
  {
    newWhitePieceArray[i].onclick=pieceClick;
  }
}

function blackPieceOnclickReset()
{
  for(i=0; i<8; i++)
  {
    bPawn[i].onclick=pieceClick;
    bpieces[i].onclick=pieceClick;
  }
  for(i=0; i<newBlackPieceCounter; i++)
  {
    newBlackPieceArray[i].onclick=pieceClick;
  }
}

function whitePieceOnclickDisable()
{
  for(i=0; i<8; i++)
  {
    wpieces[i].onclick= null;
    wPawn[i].onclick= null;
  }
  for(i=0; i<newWhitePieceCounter; i++)
  {
    newWhitePieceArray[i].onclick= null;
  }
  blackPieceOnclickReset();
}

function blackPieceOnclickDisable()
{
  for(i=0; i<8; i++)
  {
    bpieces[i].onclick= null;
    bPawn[i].onclick= null;
  }
  for(i=0; i<newBlackPieceCounter; i++)
  {
    newBlackPieceArray[i].onclick= null;
  }
  whitePieceOnclickReset();
}

function squareRemover()
{
  for(i=0; i<56; i++)
  {
    greenSqArray[i].remove(); 
    redSqArray[i].remove(); 
  }
  if((moveCounter%2)== 0)
    blackPieceOnclickDisable();
  else
    whitePieceOnclickDisable();
}

//This is the most important function
function pieceClick(event)//Lit the worthy blocks with green or red colour
{
  var targetBlockId, targetBlock;
  pieceSelector=event.target;
  var divId= pieceSelector.parentNode.id;
  squareRemover();
  var upPerm= true, downPerm= true, rightPerm= true, leftPerm= true, upperLeftPerm= true, upperRightPerm= true, lowerLeftPerm= true, lowerRightPerm= true; 
  
  ////////////////////////////////////WHITE PAWNS//////////////////////////////////////
  if(event.target.id=="wp")
  {  
    targetBlockId= divId.replace(divId[0],parseInt(divId[0])+1);
    targetBlock= document.getElementById(targetBlockId);
    if(targetBlock.innerHTML!= "")
      downPerm= false;
    else
      targetBlock.appendChild(greenSqArray[0]);
    //Second upper block used on the first move
    targetBlockId= divId.replace(divId[0],parseInt(divId[0])+2);
    targetBlock= document.getElementById(targetBlockId);
    if(targetBlockId[0]<8 && targetBlock.innerHTML== "" && downPerm && divId[0] == "1")
      targetBlock.appendChild(greenSqArray[1]);
    //Lower left block
    if((parseInt(divId[0])+1)>=0 && (parseInt(divId[0])+1)<8 && (parseInt(divId[2])-1)>=0 && (parseInt(divId[2])-1)<8)
    {  
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML!= "" && targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[1]);   
        }       
    }
    //Lower right block
    if((parseInt(divId[0])+1)>=0 && (parseInt(divId[0])+1)<8 && (parseInt(divId[2])+1)>=0 && (parseInt(divId[2])+1)<8)
    { 
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+1);
      targetBlockId= targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[0]);   
        }       
    }
  }

  ////////////////////////////////////BLACK PAWNS//////////////////////////////////////
  else if(event.target.id=="bp")  
  { 
    //Upper block
    targetBlockId= divId.replace(divId[0],parseInt(divId[0])-1);
    targetBlock= document.getElementById(targetBlockId);
    if(targetBlock.innerHTML!= "")
      upPerm= false;
    else
      targetBlock.appendChild(greenSqArray[0]);
    //Second upper block used on the first move
    targetBlockId= divId.replace(divId[0],parseInt(divId[0])-2);
    targetBlock= document.getElementById(targetBlockId);
    if(targetBlockId[0]>0 && targetBlock.innerHTML== "" && upPerm && divId[0] == "6")
      targetBlock.appendChild(greenSqArray[1]);
    //Upper left block
    if((parseInt(divId[0])-1)>=0 && (parseInt(divId[0])-1)<8 && (parseInt(divId[2])-1)>=0 && (parseInt(divId[2])-1)<8)
    {  
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML!= "" && targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[1]);   
        }       
    }
    //Upper right block
    if((parseInt(divId[0])-1)>=0 && (parseInt(divId[0])-1)<8 && (parseInt(divId[2])+1)>=0 && (parseInt(divId[2])+1)<8)
    { 
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+1);
      targetBlockId= targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[0]);   
        }       
    }
  }

  ////////////////////////////////////ROOKS////////////////////////////////////////////
  else if(event.target.id=="wr" || event.target.id=="br")
  {  
    for(i=0; i<28; i++)
    {  
      //All lower blocks
      if(i<7 && (parseInt(divId[0])+i+1)>=0 && (parseInt(divId[0])+i+1)<8 && downPerm)
      {
        targetBlockId= divId.replace(divId[0],parseInt(divId[0])+i+1);
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          downPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          downPerm= false;
      }
      //All upper blocks
      else if(i>=7 && i<14 && (parseInt(divId[0])-(i-6))>=0 && (parseInt(divId[0])-(i-6))<8 && upPerm)
      { 
        targetBlockId= divId.replace(divId[0],parseInt(divId[0])-(i-6));
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          upPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          upPerm= false;
        }
      //All right blocks
      else if(i>=14 && i<21 && (parseInt(divId[2])+(i-13))>=0 && (parseInt(divId[2])+(i-13))<8 && rightPerm)
      {  
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+(i-13));
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          rightPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          rightPerm= false;
      }
      //All left blocks
      else if(i>=21 && i<28 && (parseInt(divId[2])-(i-20))>=0 && (parseInt(divId[2])-(i-20))<8 && leftPerm)
      {  
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-(i-20));
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")//If the block is empty
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          leftPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          leftPerm= false;
      }
    }
  }
  
  ////////////////////////////////////BISHOPS//////////////////////////////////////////
  else if(event.target.id=="wb" || event.target.id=="bb")
  {  
    for(i=0; i<28; i++)
    {  
      //All lower right blocks
      if(i<7 && (parseInt(divId[0])+i+1)>=0 && (parseInt(divId[0])+i+1)<8 && (parseInt(divId[2])+i+1)>=0 && (parseInt(divId[2])+i+1)<8 && lowerRightPerm)
      {
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+i+1);
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+i+1);
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          lowerRightPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          lowerRightPerm= false;
      }
      //All upper right blocks
      else if(i>=7 && i<14 && (parseInt(divId[0])-(i-6))>=0 && (parseInt(divId[0])-(i-6))<8 && (parseInt(divId[2])+(i-6))>=0 && (parseInt(divId[2])+(i-6))<8 && upperRightPerm)
      { 
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+(i-6));
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-(i-6));
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          upperRightPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          upperRightPerm= false;
      }
      //All lower left blocks
      else if(i>=14 && i<21 && (parseInt(divId[0])+(i-13))>=0 && (parseInt(divId[0])+(i-13))<8 && (parseInt(divId[2])-(i-13))>=0 && (parseInt(divId[2])-(i-13))<8 && lowerLeftPerm)
      {  
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-(i-13));
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+(i-13));
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          lowerLeftPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          lowerLeftPerm= false;
      }
      //All upper left blocks
      else if(i>=21 && i<28 && (parseInt(divId[0])-(i-20))>=0 && (parseInt(divId[0])-(i-20))<8 && (parseInt(divId[2])-(i-20))>=0 && (parseInt(divId[2])-(i-20))<8 && upperLeftPerm)
      {  
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-(i-20));
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-(i-20));
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          upperLeftPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          upperLeftPerm= false;
      }
    }
  }
  ////////////////////////////////////QWEENS///////////////////////////////////////////
  else if(event.target.id=="wq" || event.target.id=="bq")
  {  
    for(i=0; i<56; i++)
    {  
      //All lower right blocks
      if(i<7 && (parseInt(divId[0])+i+1)>=0 && (parseInt(divId[0])+i+1)<8 && (parseInt(divId[2])+i+1)>=0 && (parseInt(divId[2])+i+1)<8 && lowerRightPerm)
      {
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+i+1);
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+i+1);
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          lowerRightPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          lowerRightPerm= false;
      }
      //All upper right blocks
      else if(i>=7 && i<14 && (parseInt(divId[0])-(i-6))>=0 && (parseInt(divId[0])-(i-6))<8 && (parseInt(divId[2])+(i-6))>=0 && (parseInt(divId[2])+(i-6))<8 && upperRightPerm)
      { 
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+(i-6));
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-(i-6));
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          upperRightPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          upperRightPerm= false;
      }
      //All lower left blocks
      else if(i>=14 && i<21 && (parseInt(divId[0])+(i-13))>=0 && (parseInt(divId[0])+(i-13))<8 && (parseInt(divId[2])-(i-13))>=0 && (parseInt(divId[2])-(i-13))<8 && lowerLeftPerm)
      {  
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-(i-13));
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+(i-13));
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          lowerLeftPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          lowerLeftPerm= false;
      }
      //All upper left blocks
      else if(i>=21 && i<28 && (parseInt(divId[0])-(i-20))>=0 && (parseInt(divId[0])-(i-20))<8 && (parseInt(divId[2])-(i-20))>=0 && (parseInt(divId[2])-(i-20))<8 && upperLeftPerm)
      {  
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-(i-20));
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-(i-20));
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          upperLeftPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          upperLeftPerm= false;
      }
      //All lower blocks
      else if(i>=28 && i<35 && (parseInt(divId[0])+(i-27))>=0 && (parseInt(divId[0])+(i-27))<8 && downPerm)
      {
        targetBlockId= divId.replace(divId[0],parseInt(divId[0])+(i-27));
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          downPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          downPerm= false;
      }
      //All upper blocks
      else if(i>=35 && i<42 && (parseInt(divId[0])-(i-34))>=0 && (parseInt(divId[0])-(i-34))<8 && upPerm)
      { 
        targetBlockId= divId.replace(divId[0],parseInt(divId[0])-(i-34));
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          upPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          upPerm= false;
      }
      //All right blocks
      else if(i>=42 && i<49 && (parseInt(divId[2])+(i-41))>=0 && (parseInt(divId[2])+(i-41))<8 && rightPerm)
      {  
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+(i-41));
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          rightPerm= false;
        }       
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          rightPerm= false;
      }
      //All left blocks
      else if(i>=49 && i<56 && (parseInt(divId[2])-(i-48))>=0 && (parseInt(divId[2])-(i-48))<8 && leftPerm)
      {  
        targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-(i-48));
        targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
        targetBlock= document.getElementById(targetBlockId);
        if(targetBlock.innerHTML== "")
          targetBlock.appendChild(greenSqArray[i]);
        else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[i]);   
          leftPerm= false;
        }              
        else if(targetBlock.firstChild.id[0]==pieceSelector.id[0])
          leftPerm= false;
      }
    }
  }
  ////////////////////////////////////KINGS////////////////////////////////////////////
  else if(event.target.id=="wk" || event.target.id=="bk")
  {  
    //Upper block
    if((parseInt(divId[0])-1)>=0 && (parseInt(divId[0])-1)<8)
    { 
      targetBlockId= divId.replace(divId[0],parseInt(divId[0])-1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[0]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[0]);   
        }       
    }
    //Upper right block
    if((parseInt(divId[0])-1)>=0 && (parseInt(divId[0])-1)<8 && (parseInt(divId[2])+1)>=0 && (parseInt(divId[2])+1)<8)
    { 
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[1]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[1]);   
        }       
    }
    //Right block
    if((parseInt(divId[2])+1)>=0 && (parseInt(divId[2])+1)<8)
    {  
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[2]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[2]);   
        }       
    }
    //Lower right block
    if((parseInt(divId[0])+1)>=0 && (parseInt(divId[0])+1)<8 && (parseInt(divId[2])+1)>=0 && (parseInt(divId[2])+1)<8)
    {
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[3]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[3]);   
        }       
    }
    //Lower block
    if((parseInt(divId[0])+1)>=0 && (parseInt(divId[0])+1)<8)
    {
      targetBlockId= divId.replace(divId[0],parseInt(divId[0])+1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[4]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[4]);   
        }       
    }
    //Lower left block
    if((parseInt(divId[0])+1)>=0 && (parseInt(divId[0])+1)<8 && (parseInt(divId[2])-1)>=0 && (parseInt(divId[2])-1)<8)
    {  
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[5]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[5]);   
        }       
    }
    //All left blocks
    if((parseInt(divId[2])-1)>=0 && (parseInt(divId[2])-1)<8)
    {  
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[6]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[6]);   
        }       
    }
    //Upper left block
    if((parseInt(divId[0])-1)>=0 && (parseInt(divId[0])-1)<8 && (parseInt(divId[2])-1)>=0 && (parseInt(divId[2])-1)<8)
    {  
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[7]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[7]);   
        }       
    }
  }
  ////////////////////////////////////KNIGHTS//////////////////////////////////////////
  else if(event.target.id=="wkn" || event.target.id=="bkn")
  {  
    //1 o'clock
    if((parseInt(divId[0])-2)>=0 && (parseInt(divId[0])-2)<8 && (parseInt(divId[2])+1)>=0 && (parseInt(divId[2])+1)<8)
    { 
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-2);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[0]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[0]);   
        }       
  }
    //2 o'clock
    if((parseInt(divId[0])-1)>=0 && (parseInt(divId[0])-1)<8 && (parseInt(divId[2])+2)>=0 && (parseInt(divId[2])+2)<8)
    { 
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+2);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[1]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[1]);   
        }       
    }
    //4 o'clock
    if((parseInt(divId[0])+1)>=0 && (parseInt(divId[0])+1)<8 && (parseInt(divId[2])+2)>=0 && (parseInt(divId[2])+2)<8)
    { 
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+2);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[2]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[2]);   
        }       
    }
    //5 o'clock
    if((parseInt(divId[0])+2)>=0 && (parseInt(divId[0])+2)<8 && (parseInt(divId[2])+1)>=0 && (parseInt(divId[2])+1)<8)
    { 
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])+1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+2);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[3]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[3]);   
        }       
    }
    //7 o'clock
    if((parseInt(divId[0])+2)>=0 && (parseInt(divId[0])+2)<8 && (parseInt(divId[2])-1)>=0 && (parseInt(divId[2])-1)<8)
    { 
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+2);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[4]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[4]);   
        }       
    }
    //8 o'clock
    if((parseInt(divId[0])+1)>=0 && (parseInt(divId[0])+1)<8 && (parseInt(divId[2])-2)>=0 && (parseInt(divId[2])-2)<8)
    { 
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-2);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])+1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[5]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[5]);   
        }       
    }
    //10 o'clock
    if((parseInt(divId[0])-1)>=0 && (parseInt(divId[0])-1)<8 && (parseInt(divId[2])-2)>=0 && (parseInt(divId[2])-2)<8)
    { 
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-2);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-1);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[6]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[6]);   
        }       
    }
    //11 o'clock
    if((parseInt(divId[0])-2)>=0 && (parseInt(divId[0])-2)<8 && (parseInt(divId[2])-1)>=0 && (parseInt(divId[2])-1)<8)
    { 
      targetBlockId= divId.replaceAll(divId[2],parseInt(divId[2])-1);
      targetBlockId=targetBlockId.replace(targetBlockId[0],divId[0]);
      targetBlockId= targetBlockId.replace(divId[0],parseInt(divId[0])-2);
      targetBlock= document.getElementById(targetBlockId);
      if(targetBlock.innerHTML== "")
        targetBlock.appendChild(greenSqArray[7]);
      else if(targetBlock.firstChild.id[0]!=pieceSelector.id[0])
        {  
          targetBlock.firstChild.onclick=victimPiece;
          targetBlock.appendChild(redSqArray[7]);   
        }       
    }
  }
}


//Form hiding Function
function submitForm(event){
   document.getElementById("gameDiv").className="showGame";
   //Name of players
   p1=document.getElementById("p1name").value;
   p2=document.getElementById("p2name").value;
   pname=document.getElementById("pname");
   pname.innerHTML=p1+"\'s Turn";
   event.target.parentNode.remove();
}

//To detect keypress
/*
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
          left();
          break;
        case 38:
          up();
          break;
        case 39:
          right();
          break;
        case 40:
          down();
          break;
        case 13:
          enter();
          break;
    }
  };
  */