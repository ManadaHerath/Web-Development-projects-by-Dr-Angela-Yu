var randomNum1 =Math.floor(Math.random()*6)+1;
var randomNum2 =Math.floor(Math.random()*6)+1;

var list = document.querySelectorAll("img");

list[0].setAttribute("src","images/dice"+randomNum1+".png");
list[1].setAttribute("src","images/dice"+randomNum2+".png");

if (randomNum1===randomNum2){
    document.querySelector("h1").innerHTML="Draw"
}
else if (randomNum1>randomNum2){
    document.querySelector("h1").innerHTML="Player 1 Wins"
}
else {document.querySelector("h1").innerHTML="Player 2 Wins"}
