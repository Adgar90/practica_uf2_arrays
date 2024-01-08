			
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
	dades= data.pokemon;
	dades.forEach(element => {
		let pokemon = [];
		pokemon.push(element.num);
		pokemon.push(element.img);
		pokemon.push(element.name);
		pokemon.push(element.weight);
		pokemons.push(pokemon);	
	});
});




// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;
	dades.forEach(element => {	
		let municipi = [];
		municipi.push(element.municipi_nom);
		municipi.push(element.municipi_escut);
		municipi.push(element.ine);
		municipi.push(element.nombre_habitants);
		municipis.push(municipi);
	});
});


// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;		
	dades.forEach(element => {	
		let meteorit = [];
		meteorit.push(element.id);
		meteorit.push(element.name);
		meteorit.push(element.year);
		meteorit.push(element.mass);
		meteorites.push(meteorit);
	});
});


// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;
	dades.forEach(element => {
		let movie = [];
		movie.push(element.url);
		movie.push(element.title);
		movie.push(element.year);
		movie.push(element.rating);
		movies.push(movie);
	});
});

function mostraResults() {
	console.clear();
	dades = [];
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
	let name = prompt("Introdueix un nom a buscar").toUpperCase();
	let match = returnMatches(name);
	// iteració per mostrar les concondances amb el paràmetre que li passem
	// dades.forEach((item) => item.forEach(
	// 	(x) => {
	// 		if(x != undefined && x.toUpperCase().includes(name)) {
	// 		match.push(x); 
	// 	}}));
	creaTaula(match, returnHeaders(returnRadio()));
}
// funcio que calculi la mitjana d'un valor numèric (fixar a dos decimals amb toFixed(2))
function calcMitjana() {
	let valorNum = 0;
	let resultat = 0;
	let radio = returnRadio();
	switch (radio) {
		case "poke":
			pokemons.forEach(pokemon => {
				valorNum += parseFloat(pokemon[pokemon.length-1].substr(0, pokemon[pokemon.length-1].search(" ")));
			} ); 
			resultat = (valorNum/pokemons.length).toFixed(2);
			break;
		case "municipi":		
			municipis.forEach(municipi => {
				valorNum += parseFloat(municipi[municipi.length-1]);
			} ); 
			resultat = (valorNum/municipis.length).toFixed(2);
			break;
		case "movie":
			movies.forEach(movie => {
				valorNum += parseFloat(movie[movie.length-1]);
			} ); 
			resultat = (valorNum/movies.length).toFixed(2);
			break;
		case "meteorit":
			meteorites.forEach(meteorit => {
				meteorit[meteorit.length-1] != undefined ? valorNum += parseFloat(meteorit[meteorit.length-1]) : valorNum += 0;
			} ); 
			resultat = (valorNum/meteorites.length).toFixed(2);
			break;
		default:
			console.log("No hi ha cap taula seleccionada");
			return;
	}
	alert(resultat); // TODO: editar el missatge de resultat 
}
// funció que crea la taula i mitjançant el DOM mostra el resultat en el div "resultat"
function printList() {
	let radio = returnRadio();
	let trHeader = document.createElement("tr");
	switch (radio) {
		case "poke":
			trHeader = returnHeaders(radio);
			creaTaula(pokemons, trHeader);
			break;
		case "municipi":		
			trHeader = returnHeaders(radio);
			creaTaula(municipis, trHeader);
			break;
		case "movie":
			trHeader = returnHeaders(radio);
			creaTaula(movies, trHeader);
			break;
		case "meteorit":
			trHeader = returnHeaders(radio);
			creaTaula(meteorites, trHeader);
			break;
		default:
			console.log("No hi ha cap taula seleccionada");
			return;
	}
}
// funció per ordenar de forma ascedent (a-z) els valors de l'array
function ordenaAsc() {
	pokemons.sort();
	municipis.sort();
	movies.sort();
	meteorites.sort();
	printList();
}
//funció per ordenar de forma descendent (z-a) els valors de l'array
function ordenaDesc() {
	ordenaAsc();
	pokemons.reverse();
	municipis.reverse();
	movies.reverse();
	meteorites.reverse();
	printList();
}
// funció que retorna les coincidencies amb el paràmetre proposat
function returnMatches(name) {
	let index = 0;
	let array = [];
	let radio = returnRadio();
	switch (radio) {
		case "poke":
			array = pokemons;
			index = 2;
			break;
		case "municipi":
			array = municipis;
			index = 0;
			break;
		case "movie":
			array = movies;
			index = 1;
			break;
		case "meteorit":
			array = meteorites;
			index = 1;
			break;
		default:
			console.log("No hi ha cap taula seleccionada");
			return;
	}
	let match = [];
	array.forEach((element) => {
		if(element[index].toUpperCase().includes(name)) {
			match.push(element);
		}
	});
	return match.sort();
}
// funció que crea una taula de l'array que li passem per paràmetre
function creaTaula(array, trHeader) {
	// seleccionem el div 'resultat' amb el que insertarem la taula a mostrar
	let divResultat = document.getElementById("resultat");
	// inicialitzem el div per esborrar el contingut
	divResultat.innerHTML = "";

	//creació de taula
	let table = document.createElement("table");
	table.appendChild(trHeader);
	array.forEach((element) => { 
		let tr = document.createElement("tr");
		element.forEach((data) => {
			let td = document.createElement("td");
			console.log(data);
			if (data != undefined && (data.toString().endsWith(".png") || data.toString().endsWith(".jpg"))) {
				let img = document.createElement("img");
				img.src = data;
				td.appendChild(img);
			} else {
				td.innerHTML = data;
			}
			tr.appendChild(td);
		})
		table.appendChild(tr);
	});

	divResultat.appendChild(table);
}

// funció que retorna la taula seleccionada o empty en cas de no haber cap
function returnRadio() {
	let inputs = document.querySelectorAll("input");
	let radio = "";
	inputs.forEach(type => { if(type.checked) { radio = type.id; } });
	return radio;
}

// funció que retorna els headers de la nostra taula segons quina hagi seleccionada
function returnHeaders(radio) {
	let tr = document.createElement("tr");
	let headers = [];
	switch (radio) {
		case "poke":
			headers = ["#", "Imatge", "Nom", "Pes"];
			break;
		case "municipi":
			headers = ["Municipi", "Imatge", "INE", "Nº Habitants"];		
			break;
		case "movie":
			headers = ["Imatge", "Títol", "Any", "Rating"];
			break;
		case "meteorit":
			headers = ["#", "Nom", "Any", "Massa"];
			break;
	}
	headers.forEach((value) => {
		let td = document.createElement("td");
		td.innerHTML = value;
		tr.appendChild(td);
	});
	return tr;
}