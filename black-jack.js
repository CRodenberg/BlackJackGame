//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: This program allocates 2 cards to a Player and to a computerized dealer. Then gives the player the option to hit or stand. The program will compare the score of the player and the dealer, and determine who the winner is. 

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: Creates a structure named Card with two elements: suit and value
function Card(value, suit) {
    this.value = value;
    this.suit = suit;
}

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: Creates a Deck object and initializes the deck with 52 cards. Assigns the cards in the deck to the values of an actual deck. As in suit = 1-4 and value = 1-13
function Deck() {
   this.deck = new Array(52);
   this.count = 52;
   var c = 0;
   for (var i = 1; i <= 4; i++){
      for (var j = 1; j <= 13; j++){
         this.deck[c++] = new Card(j,i);
      }
   }
}

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: Uses a temp to randomly shuffle the deck. Math.random generates a random number.
Deck.prototype.shuffle = function() {
   for (var i = 51; i > 0; i--) {
       var r = Math.floor((i+1)*Math.random(i));
       var temp = this.deck[r];
       this.deck[r] = this.deck[i];
       this.deck[i] = temp;
   }
   this.count = 52;
}

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: This function returns the card on top of the deck.
Deck.prototype.nextCard = function() {
   if (this.count === 0)
   {
      document.write("Deck is out of cards");
   }
   else
   {
        return this.deck[--this.count];
   }
}

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: This function changes the variable from integers to string so that they will display like the players would read them.
Card.prototype.toString = function() {
    if (this.value == -1){
       return "(Card not shown)";
    }
    var s = "";
    switch (this.value) {
       case 1: s += "Ace"; break;
       case 11: s += "Jack"; break;
       case 12: s += "Queen"; break;
       case 13: s += "King"; break;
       default: s += this.value; break;
    }
    s += " of ";
    switch (this.suit) {
       case 1: s += "Clubs"; break;
       case 2: s += "Diamonds"; break;
       case 3: s += "Hearts"; break;
       case 4: s += "Spades"; break;
    }
    return s;
}

//Variable declarations
var money = 100;
var win;
var moneyDisplay;
var userTotal = 0;
var dealerTotal = 0;
var userHand = [];
var dealerHand = [];
var gameDeck = new Deck();
gameDeck.shuffle();

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: Deals the first two cards to the player and second two cards to the dealer. Then displays the user's cards and one of the dealer's cards.
dealCards = function(){
    userHand[0] = gameDeck.nextCard();
    userHand[1] = gameDeck.nextCard();
    dealerHand[0] = gameDeck.nextCard();
    dealerHand[1] = gameDeck.nextCard();
document.write("Your cards are "  + userHand[0] + " and " + userHand[1]);
document.write("<br><br>");
document.write("The Dealer has " + dealerHand[0] + " and ??????");
}

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: Pushes a new card into the player's hand and displays the new card. Converts the string values to integers, and checks to see if the user has busted. If the user busted and the user had an ace, it converts the ace to a 1.
userHitCard = function(hand){
	userHand.push(gameDeck.nextCard());
	document.write("<br>");
	document.write("Your New Card: " + userHand[userHand.length-1]);
	var temp = userTotal;
	 var temp2 = userHand[userHand.length-1].value;
	    if(userHand[userHand.length-1].value > 10)
	    {
	        var temp2 = 10;
	    }
	    else if(userHand[userHand.length-1].value === 1)
	    {
	        var temp2 = 11;
	    }
		userTotal += temp2;
		
if(userTotal > 21 && temp2===11)
    {
        userTotal = temp + 1;
    }
    if(userTotal<21)
    {
        document.write("<br>Your Score: " + userTotal);
    }
}

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: Same as the previous function but for the dealer.
dealerHitCard = function(){
	dealerHand.push(gameDeck.nextCard());
	document.write("<br>");
	document.write("New Dealer Card: " + dealerHand[dealerHand.length-1]);
	var temp = dealerTotal;
	var temp2 = dealerHand[dealerHand.length-1].value;
	 if(dealerHand[dealerHand.length-1].value > 10)
	    {
	        var temp2 = 10;
	    }
	    else if(dealerHand[dealerHand.length-1].value === 1)
	    {
	        var temp2 = 11;
	    }
	dealerTotal += temp2;
	if(dealerTotal > 21 && temp2 === 11)
    {
        dealerTotal = temp + 1;
    }
}

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: Gets the user's hand and adds the total together. Displays the total to the screen. 
getUserTotal = function(){
    userTotal = 0;
	for(var i = 0; i<userHand.length; i++)
	{
	    var temp = userHand[i].value;
	    if(userHand[i].value > 10)
	    {
	        var temp = 10;
	    }
	    else if(userHand[i].value === 1)
	    {
	        var temp = 11;
	    }
		userTotal += temp;  	
	}
	document.write("<br>Your Score: " + userTotal);
}

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: Same functionality as the getUserTotal, but it does not display the dealer's score.
getDealerTotal = function(){
    dealerTotal = 0;
	for(var i = 0; i<dealerHand.length; i++)
	{
	    var temp = dealerHand[i].value;
	    if(dealerHand[i].value > 10)
	    {
	        var temp = 10;
	    }
	    else if(dealerHand[i].value === 1)
	    {
	        var temp = 11;
	    }
		dealerTotal += temp;  
	}
}

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: This function reveals the dealer's second card and check to see whether or not the dealer needs to hit. The dealer must hit while their hand is below a score of 17. Then displays whether the player won or the dealer won, and sets win to 1 or 0.
dealersFunction = function(){
    document.write("<br><br>The Dealer’s 2nd Card is " + dealerHand[1]);
	getDealerTotal();
	if (dealerTotal === 21)
	{
		document.write("<br>Dealer has 21. You lose!");
		win = 0;
	}
	else if(dealerTotal<21 && dealerTotal>userTotal)
	{
	    document.write("<br>The Dealer wins with a higher score!!");
	    win = 0;
	}
	else if (dealerTotal < 17)
	{
	    var checkLoop = 0;
	    while(dealerTotal<17 && checkLoop === 0)
	    {
		dealerHitCard();
		if (dealerTotal > 21){
	    	document.write("<br>The Dealer has busted! You Win!!!");
	    	win = 1;
	    	checkLoop = 1;
	        }
	    else if (dealerTotal === 21)
	    {
	        document.write("<br>Dealer has 21. You Lose...");  
	        checkLoop = 1;
	        win = 0;
	    }
	    else if (dealerTotal<21 && dealerTotal > userTotal)
		{
			document.write("<br>The Dealer has a higher score! You lose!");
			checkLoop = 1;
			win = 0;
		}
		else if(dealerTotal>17 && dealerTotal<21 && dealerTotal < userTotal)
		{
			document.write("<br>You win!! Dealer has a lower score!");
			checkLoop = 1;
			win = 1;
		}
	    }
	}
	else if(dealerTotal >= 17 && dealerTotal < 21 && userTotal > dealerTotal)
	{
	    document.write("<br>You win!! Dealer has a lower score!");
	    win = 1;
	}   
	else if(dealerTotal === 21)
	{
	    document.write("<br>The dealer has 21! You lose!");
	    win = 0;
    }
	else if (dealerTotal<21 && dealerTotal > userTotal)
	{
	    document.write("<br>The dealer has won!");
	    win = 0;
	}
	else if (dealerTotal === userTotal)
	{
	    document.write("<br>It's a tie!");
    }
	else if (dealerTotal>21)
    {
	    document.write("<br>The dealer has busted! You win!");
	    win = 1;
	}	
}

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: Checks the player's score and gives the player the option to hit or stand. If the player stands, then the program goes to the Dealersfunction.
checkUserScore = function(){
	if(userTotal === 21)
	{
		document.write("<br> 21 You won!!!");	
		win = 1;
	}
	else if(userTotal > 21)
	{
		document.write("<br>You busted! Dealer wins!");
		win = 0;
    }
    else if(userTotal < 21)
    {
        var hitOrStand = 0;
        while(userTotal < 21 && hitOrStand != "2")
        {
	        hitOrStand = prompt("Press 1: Hit or 2: Stand");
	        if(hitOrStand === "1")
	        {
	        	userHitCard();
    	    }
        }
        if(userTotal === 21)
        {
            document.write("<br>21! You won!");
            win = 1;
        }
        else if(userTotal > 21)
	    {
	    	    document.write("<br>You busted! The dealer wins!");
	    	    win = 0;
	    }
	    else if(hitOrStand === "2")
	    {
	    	dealersFunction();
	    }
	}
}



//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: This function uses the other functions to display the program to the screen. 
var splashScreen = function(start) {
    if (start === 1)
    {
        document.write("Welcome! Time to play!<br>");
        document.write("Money: $" + money + "<br>");
        dealCards();
        getUserTotal();
        checkUserScore();
        if(win === 1)
        {
            money += numBet;
        }
        else if(win === 0){
            money-=numBet;
        }
   
    }
    else
    {
        document.getElementById("Main").innerHTML = "";
        document.write("Next Round!<br>"); 
        document.write("Money: $" + money + "<br>");
        gameDeck.shuffle();
        userHand.length = 2;
        dealerHand.length = 2;
        userTotal = 0;
        dealerTotal = 0;
        dealCards();
        getUserTotal();
        checkUserScore();
        if(win === 1)
        {
            money += numBet;
        }
        else if(win === 0){
            money -= numBet;
        }
       
        
    }
};

var i = 1

//Programmer: Cole Rodenberg Date: 5/11/2015
//Description: Main 
var newGame = prompt("Press 1: New game 2: Quit");
while(newGame === "1")
{
    if(newGame === "1")
    {
        var betInput = prompt("How much would you like to bet?");
        var numBet = parseInt(betInput);
        splashScreen(i++);
        document.write("<br>Your Overall Score: " + userTotal);
        document.write("<br>");
        
        if(dealerTotal === 0)
        {
            document.write("The Dealer’s 2nd Card is " + dealerHand[1] + "<br>");
            getDealerTotal();
            document.write("Dealer Score: " + dealerTotal);
        }
        else{
            document.write("Dealer Score: " + dealerTotal);
        }
   
    }
    else
    {
        document.getElementById("Main").innerHTML = "";
    }   
};

document.write("Thanks for Playing!");
document.write("<br><br>You finished with $" + money);



   
   
   
