			
/* TODO
	ARRAY Multidimensional per emmagatzemar més d'un valor
*/

let longitud = 1000;

let dades = [];
let pokemons = [];
let municipis = [];
let meteorites = [];
let movies = [];
// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	datos= data.pokemon;
	datos.forEach(element => {
		pokemons.push(element.name);	
	});
});




// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	datos = data.elements;
	datos.forEach(element => {	
		municipis.push(element.municipi_nom);
	});
});


// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	datos = data;		
	datos.forEach(element => {	
		meteorites.push(element.name);
	});
});


// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	datos = data.movies;
	datos.forEach(element => {
		movies.push(element.title);
	});
});

function mostraResults() {
	console.clear();
	for (let i=0; i<longitud; i++) {
		dades.push([pokemons[i], municipis[i], movies[i], meteorites[i]]);
	}
	console.table(dades);
}

// funció orderList que rep string per paràmetre (asc o desc) i mostra l'array ordenada
function orderList(order) {
	order == "asc" ? ordenaAsc() : ordenaDesc();
	mostraResults();
}
// funció que retorna la posició d'un element buscat mitjantçant un prompt
function searchList() {
	let inputs = document.querySelectorAll("input");
	let column = "";
	inputs.forEach(type => { if(type.checked) { column = type.id; } });
	console.log(column);
	let name = prompt("Introdueix un nom a buscar").toUpperCase();
	let match = [];
	// dades.forEach((item) => item.forEach(
	// 	(x) => {
	// 		if(x != undefined && x.toUpperCase().includes(name)) {
	// 		match.push(x); 
	// 	}}));
	console.table(match);
}
// funcio que calculi la mitjana d'un valor numèric (fixar a dos decimals amb toFixed(2))
function calcMitjana() {

}
// funció que crea la taula i mitjançant el DOM mostra el resultat en el div "resultat"
function printList() {
}
// funció per ordenar de forma ascedent (a-z) els valors de l'array
function ordenaAsc() {
	pokemons.sort();
	municipis.sort();
	movies.sort();
	meteorites.sort();
}
//funció per ordenar de forma descendent (z-a) els valors de l'array
function ordenaDesc() {
	ordenaAsc();
	pokemons.reverse();
	municipis.reverse();
	movies.reverse();
	meteorites.reverse();
}