			
/* TODO
	ARRAY Multidimensional per emmagatzemar més d'un valor
*/

let longitud = 1000;
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
	//dades.push(pokemons);
});




// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	datos = data.elements;
	datos.forEach(element => {	
		municipis.push(element.municipi_nom);
	});
	//dades.push(municipis);
});


// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	datos = data;		
	datos.forEach(element => {	
		meteorites.push(element.name);
	});
	//dades.push(meteorites);
});


// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	datos = data.movies;
	datos.forEach(element => {
		movies.push(element.title);
	});
	//dades.push(movies);
});

function mostraResults() {
	
	let dades = []
	for (let i=0; i<longitud; i++) {
		let data = {
			name : pokemons[i],
			municipi_nom : municipis[i],
			title : movies[i],
			name_meteorite : meteorites[i]
		}
		dades.push(data);
	}
	console.table(dades);
	
}

// funció orderList que rep string per paràmetre (asc o desc) i retorna l'array ordenada
function orderList(order) {

}
// funció que retorna la posició d'un element buscat mitjantçant un prompt
function searchList() {

}
// funcio que calculi la mitjana d'un valor numèric (fixar a dos decimals amb toFixed(2))
function calcMitjana() {

}
// funció que crea la taula i mitjançant el DOM mostra el resultat en el div "resultat"
function printList() {
	console.log(dades.length);
	for (let i=0; i<dades.length; i++) {
		document.write(dades[i]);
	}
}