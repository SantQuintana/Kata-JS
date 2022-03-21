const fetchPokemon = () => {                                    // funcion que conecta con la API
    const pokeNameInput = document.getElementById("pokeName");  
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {                                  
        if (res.status != "200") {
            //console.log(res);
            pokeImage("Images/pokeSad.png")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;           // Tomamos la imagen del API y se llama la funcion de cambiar imagen
            pokeImage(pokeImg);
            //console.log(pokeImg);

            let pokeNameUrl = data.name + " #" + data.id;                        // Tomamos el nombre del pokemon y se llama la funcion para cambiarlo en el titulo
            changePokeName(pokeNameUrl);

            let type = [];                                      // Tomamos el o los tipos de pokemon y se llama la funcion que lso cambia en el HTML
            for(let i=0; i < data.types.length; i++){
                type.push(data.types[i].type.name);
            }
            pokeType(type);

            let stats = [];                                     // obtener estadisiticas del pokemon
            for (let i=0; i < data.stats.length; i++){
                stats.push(data.stats[i].base_stat);
            }
            console.log(stats);
            changeStats(stats);
            
            let moves =[];
            for (let i=46; i < 50; i++ ){
                moves.push(data.moves[i].move.name);
            }
            console.log(moves);
            changeMoves(moves);
        }
    });
}

const changeMoves = (moves) =>{
    document.getElementById("move1").innerHTML = moves[0];
    document.getElementById("move2").innerHTML = moves[1];
    document.getElementById("move3").innerHTML = moves[2];
    document.getElementById("move4").innerHTML = moves[3];
}

const changeStats = (stats) => {                            // Funcion para establecer las estadisticas pokemones
    document.getElementById("ps").innerHTML = stats[0];
    document.getElementById("attack").innerHTML = stats[1];
    document.getElementById("defense").innerHTML = stats[2];
    document.getElementById("spAttack").innerHTML = stats[3];
    document.getElementById("spDefense").innerHTML = stats[4];
    document.getElementById("speed").innerHTML = stats[5];
}

const pokeType = (type) => {                                // Funcion para mostrar el tipo de pokemon
    document.getElementById("pokeType").innerHTML = type;
}

const changePokeName = (pokeNameUrl) => {                   // Funcion para mostrar el nombre del pokemon
    document.getElementById("pokeNameTitle").innerHTML = pokeNameUrl;
}

const pokeImage = (url) => {                                // Funcion para cambiar la imagen del pokemon
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}
