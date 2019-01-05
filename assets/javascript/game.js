$(document).ready(function(){ 

  // A new game is ready to play on opening the page.
  // var x = document.getElementById("contemplation"); 
  // function playAudio() { 
  //   x.play(); 
  // } 
  // function pauseAudio() { 
  //   x.pause(); 
  // }
  // console.log(x);


  window.onload = function(){
    // audioElement.play();
    // document.getElementById("contemplation").play();
    $("#contemplation").html("<audio autoplay><source src='assets/audio/the_sky.mp3' type='audio/mpeg'></audio>");
    // playAudio();
    reset();
  };

  // function audioPlayer(){
  //   var currentSong = 0;
  //   $("#audioPlayer")[0].src = $("#playlist li a")[0];
  //   $("#audioPlayer")[0].play();
  // }
  // document.getElementById('contemplation').play();

	// function play_single_sound() {
	// 	document.getElementById('contemplation').play();
	// }


  // $("#contemplation").get(0).play();


  // window.onload = function() {
  //   document.getElementById("contemplation").play();
  // };

  var randomPick = function() {
   return Math.floor(Math.random() * 10);
  } 
  var correctAnswer = "undetermined";
  var clozeText = "_"; 
  var philosopher = {};
  var wins = 0;
  var losses = 0;
  var wrongGuesses = 0;
  var wrongGuessesLeft = 6;

  var updatePhilosopher = function() {
    return philosophers[randomPick()];
  }

  var hideAnswer = function() {
    document.getElementById("portrait").src = "assets/images/Thinker.jpg";
    document.getElementById("greek spelling").innerHTML="";
    document.getElementById("lifespan").innerHTML="";
  }

  var reset = function() {
    // audioElement.play();

    philosopher = updatePhilosopher();
    revealClue();
    wrongGuessesLeft = 6;
    wrongGuesses = "";
    document.getElementById("cloze").innerHTML = insertBlanksInDocument();
    document.getElementById("eliminated").innerHTML = "∅";
    document.getElementById("remaining").innerHTML = "Remaining: " + wrongGuessesLeft;
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    document.getElementById("losses").innerHTML = "Losses: " + losses;
  }

  var revealClue = function() {
    correctAnswer = philosopher.name;
    clozeText = convertLettersToBlankSpaces(correctAnswer);
    document.getElementById("clue").innerHTML = philosopher.idea;
  }

  var isALetter = function(char) {
    return char.toLowerCase() !== char.toUpperCase();
  }

  // This function will run whenever the user presses a key.
  document.onkeyup = function(event) {
    // Determines which key was pressed.
    var letterEntered = event.key; 
    replaceBlanksWithLetters(letterEntered); 
    document.getElementById("cloze").innerHTML = clozeText;
  };

  var convertLettersToBlankSpaces = function(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
      if(str.charAt(i) !== " ") {
        result += "_";
      } else {
        result += " ";
      }
    }
    return result;
  }

  var showWrongGuesses = function(char) {
    wrongGuessesLeft--;
    wrongGuesses += char.toUpperCase() + " ";
    if(wrongGuessesLeft < 0) {
      losses++;
      document.getElementById("losses").innerHTML = "Losses: " + losses;
      $('#popup_text').html("<h1>WHOOPS!</h1><p>Over six wrong guesses</><p>Click here for a new challenge</p>");
      $("#contemplation").html("autostart='false'");
      $("#loser").html("<audio controls autoplay id='loser'><source src='assets/audio/tommy_doesnt_know.mp3' type='audio/mpeg'></audio>");
      $('.hover_background').show();
      return;
    }

    document.getElementById("eliminated").innerHTML = wrongGuesses;
    document.getElementById("remaining").innerHTML = "Remaining: " + wrongGuessesLeft;
  }


  var revealAnswer = function() {

    // pauseAudio(); 
    $("#contemplation").html("autostart='false'");
  
    $("#winner").html("<audio autoplay><source src='assets/audio/tom_sawyer.mp3' type='audio/mpeg'></audio>");
    
    document.getElementById("portrait").src = philosopher.image;
    document.getElementById("greek spelling").innerHTML = philosopher.greek;
    document.getElementById("lifespan").innerHTML = philosopher.dates;
  }

  // Iterate through each char in the correct answer string.
  // If the char entered doesn't match a char in the answer,
  // use the underscore from the cloze text.
  // If a char is in the correct answer, insert the char at that
  // position in the string to create the updated cloze text. 
  var replaceBlanksWithLetters = function(char) {
    if(!isALetter(char)) {
      alert("Enter a letter");
      return;
    }
    if(!correctAnswer.toLowerCase().includes(char)) {
      showWrongGuesses(char);
      return;
    }
    var updatedClozeText = "";
    for(var i = 0; i < correctAnswer.length; i++) {
      if(char.toUpperCase() === correctAnswer.charAt(i).toUpperCase()) {
        updatedClozeText += correctAnswer.charAt(i);
      } else {
        updatedClozeText += clozeText.charAt(i);
      }
    }

    clozeText = updatedClozeText;

    if(!clozeText.includes("_")) {
      revealAnswer();
      $('#popup_text').html("<h1>GREAT JOB!</h1><p>Click here for the next challenge</p>");
      $('.hover_background').show();
      wins++;
    }

    $(".trigger_popup").click(function(){
      $('.hover_background').show();
    });
  
    $('.hover_background').click(function(){
      reset();
      $("#winner").html("autostart='false'");
      $("#loser").html("autostart='false'");
      $("#contemplation").html("<audio autoplay><source src='assets/audio/the_sky.mp3' type='audio/mpeg'></audio>");
      $('.hover_background').hide();
      hideAnswer();
    });

  }
  
  var insertBlanksInDocument = function() {
    return convertLettersToBlankSpaces(correctAnswer);
  }

  var philosophers = [
    { 
      name: "Empedocles", 
      idea: "Analyzed physical reality into four fundamental elements: Earth, Water, Air, and Fire.",
      image: "assets/images/Empedocles.jpg",
      dates: "494–434 BCE",
      greek:  "Ἐμπεδοκλῆς"
    },
    {
      name:  "Zeno of Elea", 
      idea: "Using the example of an arrow in flight, he argued that motion is impossible.",
      image: "assets/images/Zeno.jpg",
      dates: "495—430 BCE",
      greek: "Ζήνων ὁ Ἐλεάτης"
    },
    {
      name: "Parmenides of Elea", 
      idea: "Speculated that the universe as a whole is timeless and unified; therefore change at the macro level is impossible.",
      image: "assets/images/Parmenides.jpg",
      dates: "540—early fifth century BCE",
      greek: "Παρμενίδης ὁ Ἐλεάτης"
    },
    {
      name: "Protagoras", 
      idea: "Since “man is the measure of all things,” subjective interpretations are all that any of us can access. So what is true for one person may be untrue for another.",
      image: "assets/images/Protagoras.jpg",
      dates: "490—420 BCE",
      greek: "Πρωταγόρας" 
    },
    {
      name: "Gorgias",
      idea: "The original nihilist, he logically demonstrated that nothing can exist.",
      image: "assets/images/Gorgias.jpg",
      dates: "483—375 BCE",
      greek: "Γοργίας"
    },
    { 
      name: "Anaxagoras",
      idea: "He was imprisoned for impiety in Athens for asserting that all events have naturalistic explanations, rather than being caused by the gods.",
      image: "assets/images/Anaxagoras.jpg",
      dates: "510—428 BCE",
      greek: "Ἀναξαγόρας"
    },
    { 
      name: "Heraclitus of Ephesus",
      idea: "As everything is a state of flux, you cannot step into the same river twice; the river will have changed, and you will have changed as well.",
      image: "assets/images/Heraclitus.jpg",
      dates: "535–475 BCE",
      greek: "Ἡράκλειτος ὁ Ἐφέσιος"
    },
    {
      name: "Thales of Miletus",
      idea: "The first to study states electricity by rubbing threads of fiber on amber, he used logic for financial gain by observing patterns and predicting bumper crop years.",
      image: "assets/images/Thales.jpg",
      dates: "624–546 BCE",
      greek: "Θαλῆς ὁ Μιλήσιος"
    },
    {
      name: "Democritus",
      idea: "Known as the Laughing Philosopher, he argued that the universe at the fundamental level consists exclusively of atoms in a vacuum.",
      image: "assets/images/Democritus.jpg",
      dates: "460–370 BCE",
      greek: "Δημόκριτος"
    },
    {
      name: "Pythagoras of Samos",
      idea: "Devised formulas for calculating the sides of geometric shapes and solids, while founding a reincarnation cult.",
      image: "assets/images/Pythagoras.png",
      dates: "570–495 BCE",
      greek: "Πυθαγόρας ὁ Σάμος"
    }
  ];

});















