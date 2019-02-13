$(document).ready(function () {

//Hide this buttons at the start of the game for a better user experience
$("#play").hide();

//Variable to store the player's name
var retVal = "";


function card(name, suit, value, trump) {
	this.name = name;
	this.suit = suit;
	this.value = value;
	this.trump = trump;
}

//Array for used cards
var used_cards = new Array();
//Array for my hand
var MarcsHand = [];
//Array for Slick's hand
var SlicksHand = [];
//Array for the starting deck of 52 cards
deck = [
	new card('Ace', 'Hearts', 11, 142),
	new card('Two', 'Hearts', 2, 22),
	new card('Three', 'Hearts', 3, 32),
	new card('Four', 'Hearts', 4, 42),
	new card('Five', 'Hearts', 5, 52),
	new card('Six', 'Hearts', 6, 62),
	new card('Seven', 'Hearts', 7, 72),
	new card('Eight', 'Hearts', 8, 82),
	new card('Nine', 'Hearts', 9, 92),
	new card('Ten', 'Hearts', 10, 102),
	new card('Jack', 'Hearts', 10, 112),
	new card('Queen', 'Hearts', 10, 122),
	new card('King', 'Hearts', 10, 132),
	new card('Ace', 'Diamonds', 11, 141),
	new card('Two', 'Diamonds', 2, 21),
	new card('Three', 'Diamonds', 3, 31),
	new card('Four', 'Diamonds', 4, 41),
	new card('Five', 'Diamonds', 5, 51),
	new card('Six', 'Diamonds', 6, 61),
	new card('Seven', 'Diamonds', 7, 71),
	new card('Eight', 'Diamonds', 8, 81),
	new card('Nine', 'Diamonds', 9, 91),
	new card('Ten', 'Diamonds', 10, 101),
	new card('Jack', 'Diamonds', 10, 111),
	new card('Queen', 'Diamonds', 10, 121),
	new card('King', 'Diamonds', 10, 131),
	new card('Ace', 'Clubs', 11, 143),
	new card('Two', 'Clubs', 2, 23),
	new card('Three', 'Clubs', 3, 33),
	new card('Four', 'Clubs', 4, 43),
	new card('Five', 'Clubs', 5, 53),
	new card('Six', 'Clubs', 6, 63),
	new card('Seven', 'Clubs', 7, 73),
	new card('Eight', 'Clubs', 8, 83),
	new card('Nine', 'Clubs', 9, 93),
	new card('Ten', 'Clubs', 10, 103),
	new card('Jack', 'Clubs', 10, 113),
	new card('Queen', 'Clubs', 10, 123),
	new card('King', 'Clubs', 10, 133),
	new card('Ace', 'Spades', 11, 144),
	new card('Two', 'Spades', 2, 24),
	new card('Three', 'Spades', 3, 34),
	new card('Four', 'Spades', 4, 44),
	new card('Five', 'Spades', 5, 54),
	new card('Six', 'Spades', 6, 64),
	new card('Seven', 'Spades', 7, 74),
	new card('Eight', 'Spades', 8, 84),
	new card('Nine', 'Spades', 9, 94),
	new card('Ten', 'Spades', 10, 104),
	new card('Jack', 'Spades', 10, 114),
	new card('Queen', 'Spades', 10, 124),
	new card('King', 'Spades', 10, 134)
];

//Function to deal the cards ( see hit() )
function deal(){

	for (var i=0;i<1;i++){
		hit();
	}
}	

//Get a random number
function getRandom(num){
	var my_num = Math.floor(Math.random()*num);
	return my_num;
	
}

//Deal the next cards
function hit(){
	// My cards
	var good_card = false;
	do {
		//Get a random card baed on the deck length
		var index = getRandom(deck.length);
		if(!$.inArray(index,used_cards)>-1){
			good_card = true;
			var c = deck[index];
			used_cards[used_cards.length]=index;
			var $d = $("<div>")

			//append the image to the div tag
			$("#pHand2").empty();
			$d.addClass("current_hand")
				.appendTo("#pHand2");
			$("<img>").appendTo($d)
						.attr('src','images/' + c.suit + '/' + c.name + '.jpg')
						
			//push my card into my stack of cards			
			MarcsHand.push(c.value);
		
			//get the sum of my stack of cards
			function getSum(total, num) {
				return total + num;
			}
			//display sum of all the cards in my stack
			document.getElementById("pScore").innerHTML = MarcsHand.reduce(getSum);
			
			//remove the card that was dealt 
			deck.splice(index,1);
			
	
			
		}

	}while(!good_card);
	good_card = false;

	// Slicks Cards
	var good_card = false;
	
	do {
		//Get a random card baed on the deck length
		var index = getRandom(deck.length);
		if(!$.inArray(index,used_cards)>-1){
			good_card = true;
			var c = deck[index];
			used_cards[used_cards.length]=index;
			$("#cHand2").empty();
			var $e = $("<div>")

			//append the image to the div tag
			$e.addClass("ccurrent_hand")
				.appendTo("#cHand2");
			$("<img>").appendTo($e)
						.attr('src','images/' + c.suit + '/' + c.name + '.jpg')
						.fadeOut('3000')
						.fadeIn('3000');

			//push my card into slicks stack of cards
			SlicksHand.push(c.value);
			
			//get the sum of slicks stack of cards
			function getSum(total, num) {
				return total + num;
			}

			//display sum of all the cards in slicks stack
			document.getElementById("cScore").innerHTML = SlicksHand.reduce(getSum);

			//remove the card that was dealt 
			deck.splice(index,1);

			//display how many cards are left to deal
			document.getElementById("cardCount").innerHTML = deck.length;

			
		}

		//if the slicks ending score is greater than my ending score
		if(deck.length==0 && ((SlicksHand.reduce(getSum)) > (MarcsHand.reduce(getSum)))){
				//append the checkmark image to #sWinner
				$("#sWinner").append("<img id='sWinnerImg' src='images/other/check.png'/>");
				//append the red x image to #pWinner	
				$("#pWinner").append("<img id='pWinnerImg' src='images/other/x2.png'/>");
				//display the following message in #win
				$("#win").append("<h1>Slick is the winner!</h1>");
				//hide the play button
				$("#play").hide();
				//change the body background color to red
				$("body").css("background-color", "red");
			
			}
		
		//if the my ending score is greater than slicks ending score
		if(deck.length==0 && ((SlicksHand.reduce(getSum)) < (MarcsHand.reduce(getSum)))){
			//append the red x image to #sWinner
			$("#sWinner").append("<img id='sWinnerImg' src='images/other/x2.png'/>");	
			//append the checkmark image to #pWinner
			$("#pWinner").append("<img id='pWinnerImg' src='images/other/check.png'/>");
			//display the following message in #win
			$("#win").append("<h1>" + retVal + "</h1>" + "<h1> is the winner!</h1>");
			//hide the play button
			$("#play").hide();
			//change the body background color to light green
			$("body").css("background-color", "lightgreen");
		}

		//if the slicks ending score is equal than my ending score
		if(deck.length==0 && ((SlicksHand.reduce(getSum)) == (MarcsHand.reduce(getSum)))){
			//append the red x image to #sWinner
			$("#sWinner").append("<img id='sWinnerImg' src='images/other/x2.png'/>");	
			//append the red x image to #pWinner
			$("#pWinner").append("<img id='pWinnerImg' src='images/other/x2.png'/>");
			//display the following message in #win
			$("#win").append("<h1>No winner! It's a tie!</h1>");
			//hide the play button
			$("#play").hide();
			//change the body background color to yellow
			$("body").css("background-color", "yellow");
		}

	}while(!good_card);
	good_card = false;
	
}

//When "New Player" button is clicked, type a new name and change the appropriate text
$("#newPlayer").click(function(){
			//Prompt to enter your name
			retVal = prompt("Enter your name : ", "* type your name here *");

			//if the user presses "cancel", or if the user presses "ok" and doesn't change the test, or if the value is empty
			if(retVal==null || retVal=="* type your name here *" || retVal==""){
				document.getElementById("pName").innerHTML="Player";
				document.getElementById("pName3").innerHTML="Player";
				alert("You must enter your name to play this game!")
			}else{

			//if user enters their name, start the game by hiding the #newPlayer button and showing the #deal button
			document.getElementById("pName").innerHTML=retVal;
			document.getElementById("pName3").innerHTML=retVal;
			$("#newPlayer").hide();
			$("#deal").show();
			}
});

	/*When "Deal" button is clicked, if a player name has not already been entered, prompt to enter a name. 
	If a name has already been entered, then just start the game*/
		$("#deal").click(function(){
			
			

			//if the user presses "cancel", or if the user presses "ok" and doesn't change the test, or if the value is empty
			if(retVal==null || retVal=="* type your name here *" || retVal==""){
					//
					retVal = prompt("Enter your name : ", "* type your name here *");
						//if the user presses "cancel", or if the user presses "ok" and doesn't change the test, or if the value is empty
						if(retVal==null || retVal=="* type your name here *" || retVal==""){
							document.getElementById("pName").innerHTML="Player";
							document.getElementById("pName3").innerHTML="Player";
							alert("You must enter your name to play this game!")
						}else{
							//If the user enters their name hide the #newPlayer button (this button is no longer needed)
							document.getElementById("pName").innerHTML=retVal;
							document.getElementById("pName3").innerHTML=retVal;
							$("#newPlayer").hide();
						}
			}
			
			
			else{

			//if user enters their name, start the game by hiding the #newPlayer button and showing the #deal button
			document.getElementById("pName").innerHTML=retVal;
			document.getElementById("pName3").innerHTML=retVal;
			$("#newPlayer").hide();
			$("#deal").hide();
			$("#play").show();
			//deal the first two cards
			deal();
			}

	});


		$("#clear").click(function(){
			//when the "clear the game" button is pressed, refresh the page
			location.reload();
		});

		//when the "rules" button is pressed, display a messgage box with the rules
		$("#rules").click(function(){
			var newLine = "\r\n"
			var message = "                                         RULES:"
			message += newLine;
			message += "";
			message += newLine;
            message += "1) Press the 'Player Name' button to enter your name.";
			message += newLine;
            message += "2) Click 'Deal' button to cut the deck and deal the first hand.";
            message += newLine;
			message += "3) To deal the remaining hands, keep clicking 'Play' button.";
			message += newLine;
			message += "4) Click 'Clear The Game' to reset the entire game.";
			message += newLine;
			message += "";
			message += newLine;
			message += "As each player gets dealt a new card, their score will add";
			message += newLine;
			message += "up in the scorebox on the right. The player with the highest";
			message += newLine;
            message += "score after all of the cards have been dealt is the winner!!!";
            alert(message);
		});

		$("#play").click(function(){
			//deal the next two cards
			deal();
		});
	


});
