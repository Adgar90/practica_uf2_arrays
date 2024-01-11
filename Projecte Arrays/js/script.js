
let myChart;
/* 
	ARRAYS CHART
*/

// VARIABLES TRACTAMENT DADES
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
		pokemon.push(element.type);
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
		movie.push(element.genres);
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
	//console.table(dades);
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
			resultat = `La mitjana de pes dels pokemons és de ${(valorNum/pokemons.length).toFixed(2)} kg.`;
			break;
		case "municipi":		
			municipis.forEach(municipi => {
				valorNum += parseFloat(municipi[municipi.length-1]);
			} ); 
			resultat = `La mitjana d'habitants dels municipis és de ${(valorNum/municipis.length).toFixed(2)} habitants.`;
			break;
		case "movie":
			movies.forEach(movie => {
				valorNum += parseFloat(movie[movie.length-1]);
			} ); 
			resultat = `La mitjana de valoració de les pel·lícules és de ${(valorNum/movies.length).toFixed(2)} de rating.`;
			break;
		case "meteorit":
			meteorites.forEach(meteorit => {
				meteorit[meteorit.length-1] != undefined ? valorNum += parseFloat(meteorit[meteorit.length-1]) : valorNum += 0;
			} ); 
			resultat = `La mitjana de massa dels meteorits és de ${(valorNum/meteorites.length).toFixed(2)} kg.`;
			break;
		default:
			console.log("No hi ha cap taula seleccionada");
			return;
	}
	alert(resultat); 
}
// funció que crea la taula i mitjançant el DOM mostra el resultat en el div "resultat"
function printDades() {
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
	printDades();
}
//funció per ordenar de forma descendent (z-a) els valors de l'array
function ordenaDesc() {
	ordenaAsc();
	pokemons.reverse();
	municipis.reverse();
	movies.reverse();
	meteorites.reverse();
	printDades();
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
	return match;
}
// funció que crea una taula de l'array que li passem per paràmetre
function creaTaula(array, trHeader) {
	// seleccionem el div 'resultat' amb el que insertarem la taula a mostrar
	let divResultat = document.getElementById("resultat");
	// inicialitzem el div per esborrar el contingut
	divResultat.innerHTML = "";
	initLabels(array);
	//creació de taula
	let table = document.createElement("table");
	table.appendChild(trHeader);
	array.forEach((element) => { 
		let tr = document.createElement("tr");
		element.forEach((data) => {
			let td = document.createElement("td");
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
			headers = ["#", "Imatge", "Nom", "Tipus", "Pes"];
			break;
		case "municipi":
			headers = ["Municipi", "Imatge", "INE", "Nº Habitants"];		
			break;
		case "movie":
			headers = ["Imatge", "Títol", "Gènere", "Any", "Rating"];
			break;
		case "meteorit":
			headers = ["ID", "Nom", "Any", "Massa"];
			break;
	}
	headers.forEach((value) => {
		let td = document.createElement("td");
		td.innerHTML = value;
		tr.appendChild(td);
	});
	return tr;
}

// funció per inicialitzar els labels segons el radio seleccionat
function initLabels(array) {
	// condicional per comprovar que no existeixi un Chart inicialitzat
	if (myChart != null) { myChart.destroy(); }

	// arrays per la creació del Chart
	let arrayDadesGraf = [];
	let backgroundColor = [];
	let borderColor = [];
	let arrayLabels = [];

	// switch statement per omplir les dades segons el tipus de radio seleccionat
	switch (returnRadio()) {
		case "poke":
			arrayLabels = ["Grass", "Poison", "Fire", "Flying", "Water", "Bug", "Normal", "Electric", "Ground", "Fighting", "Psychic", "Rock", "Ice", "Ghost", "Dragon"];
			arrayDadesGraf = new Array(arrayLabels.length).fill(0);
			backgroundColor = typeBgColors;
			borderColor = typeBorderColors;
			array.forEach(pokemon => {
				pokemon[3].forEach( type => {
					arrayLabels.forEach(label => { if (type == label) { arrayDadesGraf[arrayLabels.indexOf(label)] += 1; } })
				});	
			});
			break;
		case "municipi":
			arrayLabels = [1000, 2000, 3000, 4000, 5000, 10000, 15000, 20000, 30000, 40000, 50000, 100000, 500000, 1000000, 2000000];
			arrayDadesGraf = new Array(arrayLabels.length).fill(0);
			backgroundColor = randomBackgroundColor(arrayLabels.length);
			borderColor = randomBorderColor(arrayLabels.length);
			array.forEach(municipi => {
				arrayLabels.forEach(habitants => { if (municipi[3] <= habitants) { arrayDadesGraf[arrayLabels.indexOf(habitants)] += 1; } })	
			});
			break;
		case "movie":
			arrayLabels = ["Drama", "Crime", "Action", "Thriller", "Biography", "History", "Adventure", "Fantasy", "Westen", "Romance", "Sci-Fi", "Mystery", "Comedy", "War", "Family", "Animation", "Musical", "Music", "Horror", "Film-Noir", "Sport"];
			arrayDadesGraf = new Array(arrayLabels.length).fill(0);
			backgroundColor = randomBackgroundColor(arrayLabels.length);
			borderColor = randomBorderColor(arrayLabels.length);
			array.forEach(movie => {
				movie[2].forEach( genre => {
					arrayLabels.forEach(label => { if (genre == label) { arrayDadesGraf[arrayLabels.indexOf(label)] += 1; } })
				});	
			});
			break;
		case "meteorit":
			arrayLabels = [1000, 2000, 3000, 4000, 5000, 10000, 15000, 20000, 30000, 40000, 50000, 100000, 500000, 1000000, 2000000];
			arrayDadesGraf = new Array(arrayLabels.length).fill(0);
			backgroundColor = randomBackgroundColor(arrayLabels.length);
			borderColor = randomBorderColor(arrayLabels.length);
			array.forEach(meteorit => {
				arrayLabels.forEach(massa => { if (meteorit[3] <= massa) { arrayDadesGraf[arrayLabels.indexOf(massa)] += 1; } })
			});
			break;
	}

	// data del nostre Chart
	const data = {
		labels: arrayLabels,
		datasets: [{
			label: 'Dades Grafica',
			data: arrayDadesGraf,
			backgroundColor: backgroundColor,
			borderColor: borderColor
		}]
	};
	// configuració del nostre Chart
	const config = {
		type: 'polarArea',
		data: data,
		options: {}
	};
	// inicialització del Chart amb la config setejada
	myChart = new Chart(
		document.getElementById('myChart'),
		config
	);
}



// variables with rgb color for pokemons

const typeBgColors = [
	"rgb(122, 199, 76, 0.2)", // grass type
	"rgb(163, 62, 161, 0.2)", // poison type
	"rgb(238, 129, 48, 0.2)", // fire type
	"rgb(169, 143, 243, 0.2)", // flying type
	"rgb(99, 144, 240, 0.2)", // water type
	"rgb(166, 185, 26, 0.2)", // bug type
	"rgb(168, 167, 122, 0.2)", // normal type
	"rgb(247, 208, 44, 0.2)", // electric type
	"rgb(226, 191, 101, 0.2)", // ground type
	"rgb(194, 46, 40, 0.2)", // fighting type
	"rgb(249, 85, 135, 0.2)", // psychic type
	"rgb(182, 161, 54, 0.2)", // rock type
	"rgb(150, 217, 214, 0.2)", // ice type
	"rgb(115, 87, 151, 0.2)", // ghost type
	"rgb(111, 53, 252, 0.2)" // dragon type
];
const typeBorderColors = [
	"rgb(122, 199, 76)", // grass type
	"rgb(163, 62, 161)", // poison type
	"rgb(238, 129, 48)", // fire type
	"rgb(169, 143, 243)", // flying type
	"rgb(99, 144, 240)", // water type
	"rgb(166, 185, 26)", // bug type
	"rgb(168, 167, 122)", // normal type
	"rgb(247, 208, 44)", // electric type
	"rgb(226, 191, 101)", // ground type
	"rgb(194, 46, 40)", // fighting type
	"rgb(249, 85, 135)", // psychic type
	"rgb(182, 161, 54)", // rock type
	"rgb(150, 217, 214)", // ice type
	"rgb(115, 87, 151)", // ghost type
	"rgb(111, 53, 252)" // dragon type
];

function randomBorderColor(length) {
	let colors = [];
	for (let i=0; i<length; i++) {
		colors.push(`rgb(${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)})`);
	}
	return colors;
}
function randomBackgroundColor(length) {
	let colors = [];
	for (let i=0; i<length; i++) {
		colors.push(`rgb(${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)}, 0.2)`);
	}
	return colors;
}