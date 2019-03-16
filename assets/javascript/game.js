$( document ).ready(newGame());


function newGame(){
    var pikachuHP = ($("#pikachu").attr("hp"));
    $("#pikachu-hp").text(pikachuHP);
    var charmanderHP = ($("#charmander").attr("hp"));
    $("#charmander-hp").text(charmanderHP);
    var bulbasaurHP = ($("#bulbasaur").attr("hp"));
    $("#bulbasaur-hp").text(bulbasaurHP);
    var squirtleHP = ($("#squirtle").attr("hp"));
    $("#squirtle-hp").text(squirtleHP);
    var yourPokemonAttack = 0;
    var opponentPokemonAttack = 0;
    var yourPokemonHP = 0;
    var opponentPokemonHP = 0;
    var clonePokemon="";
    var pokemonKills=0;
    var yourPokemonFainted=0;
    var musicPlayOnce=0;
    $("#nextMoves").text("choose your pokemon!");
    $("#yourAttackMessage").text("Defeat 3 Pokemon to win!");

    // if button is clicked, check if battle ares are occupied, then move the pokemon
    $(".button").click(function(){
        if ($("#yourPokemon").children().length===0 && yourPokemonFainted===0){   
            clonePokemon=$(this).closest("div").clone();
            clonePokemon.children("img").attr("style","border:green solid 2px");
            ($(this).parent("div")).attr("style","display:none");
            $("#yourPokemon").append(clonePokemon);
            $("#yourPokemon").children().children("img").removeClass("pokemonimg button");
            $("#nextMoves").text("choose your opponent pokemon!");
            yourPokemonHP = ($("#yourPokemon").children().children("img").attr("hp"))
            yourPokemonAttack = ($("#yourPokemon").children().children("img").attr("attack"))
            if (musicPlayOnce===0){
                $("#audioPlay").trigger("play");
                musicPlayOnce=1;
            }
        }
        else if($("#opponentPokemon").children().length===0){
            clonePokemon=$(this).closest("div").clone();
            clonePokemon.children("img").attr("style","border:red solid 2px");
            ($(this).parent("div")).attr("style","display:none");
            $("#opponentPokemon").append(clonePokemon);
            $("#opponentPokemon").children().children("img").removeClass("pokemonimg button");
            $("#nextMoves").text("click attack to battle!");
            opponentPokemonHP = ($("#opponentPokemon").children().children("img").attr("hp"))
            opponentPokemonAttack = ($("#opponentPokemon").children().children("img").attr("attack"))
        }
    });
    // pokemon attack each other one time if attack button is clicked
    $("#attackButton").click(function(){     
        if (($("#yourPokemon").children().length===1) && $("#opponentPokemon").children().length===1 && yourPokemonFainted===0){
            var yourPokemonName = $("#yourPokemon").children().children("img").attr("name");
            var opponentPokemonName = $("#opponentPokemon").children().children("img").attr("name");
            opponentPokemonHP = opponentPokemonHP - yourPokemonAttack;
            $("#yourAttackMessage").text(yourPokemonName + " attacks " + opponentPokemonName + " for " + yourPokemonAttack + " damage.")
            $("#opponentPokemon").children().children("P").text(opponentPokemonHP);
            if (opponentPokemonHP>0){
                yourPokemonHP = yourPokemonHP - opponentPokemonAttack;
                $("#opponentAttackMessage").text(opponentPokemonName + " attacks " + yourPokemonName + " for " + opponentPokemonAttack + " damage.")
                $("#yourPokemon").children().children("P").text(yourPokemonHP);
            }
            if (opponentPokemonHP<= 0){
                $("#opponentPokemon").empty();
                pokemonKills++;
                $("#opponentAttackMessage").text(opponentPokemonName + " has fainted.");
                $("#nextMoves").text("choose your next opponnent!");
            }
            if (pokemonKills===3){
                $("#nextMoves").text("You Win!");
            }
            if(yourPokemonHP<=0) {
                $("#yourPokemon").empty();
                $("#youFaintedMessage").text(yourPokemonName + " has fainted.");
                yourPokemonFainted++
                $("#nextMoves").text("You Lose.");
            }
            yourPokemonAttack = Math.floor(yourPokemonAttack * (Math.random()+0.75));
        }

    });
    // if new game button is clicked, reset everything
    $("#newGameButton").click(function(){
        var pikachuHP = ($("#pikachu").attr("hp"));
        $("#pikachu-hp").text(pikachuHP);
        var charmanderHP = ($("#charmander").attr("hp"));
        $("#charmander-hp").text(charmanderHP);
        var bulbasaurHP = ($("#bulbasaur").attr("hp"));
        $("#bulbasaur-hp").text(bulbasaurHP);
        var squirtleHP = ($("#squirtle").attr("hp"));
        $("#squirtle-hp").text(squirtleHP);
        $("#pokemon1").removeAttr("style","display:none");
        $("#pokemon2").removeAttr("style","display:none");
        $("#pokemon3").removeAttr("style","display:none");
        $("#pokemon4").removeAttr("style","display:none");
        $("#yourPokemon").empty();
        $("#opponentPokemon").empty();
        $("#nextMoves").text("choose your pokemon!");
        $("#yourAttackMessage").text("Defeat 3 Pokemon to win!");
        $("#opponentAttackMessage").empty()
        $("#youFaintedMessage").empty();
        pokemonKills=0;
        yourPokemonName="";
        opponentPokemonName="";
        yourPokemonFainted=0;
    });
}