			
// POKEMONS

let dades = [
];
let longitud = 0;
let pokemons;
let municipis;
let meteorites;
let movies;

// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	pokemons= data.pokemon;
	longitud += pokemons.length;
});




// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	municipis = data.elements;	
	longitud += municipis.length;
});


// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	meteorites = data;		
	longitud += meteorites.length;
	// meteorites.forEach(element => {	
	// 	console.log(element.name)
	// });
});


// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	movies = data.movies;		
	
	// movies.forEach(element => {	
	// 	console.log(element.title)
	// });
});

function ompleDades() {

	for (let i=0; i<longitud; i++) {
		let data = {
			name : pokemons[i],
		}
		dades.push(data);
	}
}

function mostraResults() {
	ompleDades();
	let prova = [
		dade = {
			nom : "",
			municipisi : "Pepito",
			meteor : "Gamma",
			mov : "Pep"
		},
		dade = {
			nom : "Pepe",
			municipisi : "Garcia",
			meteor : "Gamma",
			mov : "Pep"
		}
	]
	console.clear();
	console.table(dades.data, );
	console.log(dades.length);
	console.log(municipis.length);
	console.log(meteorites.length);
	console.log(movies.length); 
}

