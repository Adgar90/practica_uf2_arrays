// variable global tractament dades
let arrayUsat = [];
let radioMarcat = false;
// variable chart
let myChart;

// VARIABLES TRACTAMENT DADES
let longitud = 1000;
let dades = [];
let pokemons = [];
let municipis = [];
let meteorites = [];
let movies = [];


let order = "asc";
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
	//console.table(pokemons);
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
		municipi.push(parseInt(element.nombre_habitants));
		municipis.push(municipi);
	});
	//console.table(municipis);
});

// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;		
	dades.forEach(element => {	
		let meteorit = [];
		meteorit.push(parseInt(element.id));
		meteorit.push(element.name);
		meteorit.push(parseInt(element.year));
		element.mass == undefined ? meteorit.push(0) : meteorit.push(parseInt(element.mass));
		meteorites.push(meteorit);
	});
	//console.table(meteorites);
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
	//console.table(movies);
});

// esdeveniment que detecta cada vegada que escrivim dins del camp de text
let inputSearch = document.getElementById('txtSearch')
inputSearch.addEventListener('input', (e) => {
    searchList(inputSearch.value);
});


function mostraResults() {
	console.clear();
	dades = [];
	for (let i=0; i<longitud; i++) {
		dades.push([pokemons[i], municipis[i], movies[i], meteorites[i]]);
	}
	console.table(dades);
}
// funció que retorna la posició d'un element buscat mitjantçant un prompt
function searchList(value) {
	let match = returnMatches(value.toUpperCase());
	creaTaula(match, returnHeaders(returnRadio()));
}
// funcio que calculi la mitjana d'un valor numèric (fixar a dos decimals amb toFixed(2))
function calcMitjana() {
	let valorNum = 0;
	let resultat = 0;
	let radio = returnRadio();
	arrayUsat.forEach(data => {
		valorNum += parseFloat(data[data.length-1]);
	} ); 
	switch (radio) {
		case "poke":
			resultat = `La mitjana de pes dels pokemons és de ${(valorNum/arrayUsat.length).toFixed(2)} kg.`;
			break;
		case "municipi":		
			resultat = `La mitjana d'habitants dels municipis és de ${(valorNum/arrayUsat.length).toFixed(2)} habitants.`;
			break;
		case "movie":
			resultat = `La mitjana de valoració de les pel·lícules és de ${(valorNum/arrayUsat.length).toFixed(2)} de rating.`;
			break;
		case "meteorit":
			resultat = `La mitjana de massa dels meteorits és de ${(valorNum/arrayUsat.length).toFixed(2)} kg.`;
			break;
		default:
			console.log("No hi ha cap taula seleccionada");
			return;
	}
	alert(resultat); 
}
// funció que crea la taula i mitjançant el DOM mostra el resultat en el div "resultat"
function printDades() {
	document.getElementById("btn").hidden = false;
	document.getElementById('txtSearch').value = "";
	if (arrayUsat.length == 0 || radioMarcat == false) { arrayUsat = returnTaula(); }

	creaTaula(arrayUsat, returnHeaders(returnRadio()));
}
// funció que retorna les coincidencies amb el paràmetre proposat
function returnMatches(name) {
	let index = 0;
	switch (returnRadio()) {
		case "poke":
			index = 2;
			break;
		case "municipi":
			index = 0;
			break;
		case "movie":
			index = 1;
			break;
		case "meteorit":
			index = 1;
			break;
		default:
			console.log("No hi ha cap taula seleccionada");
			return;
	}
	arrayUsat = [];
	returnTaula().forEach((element) => {
		if(element[index].toUpperCase().includes(name)) {
			arrayUsat.push(element);
		}
	});
	return arrayUsat;
}
// funció que crea una taula de l'array que li passem per paràmetre
function creaTaula(array, trHeader) {
	// seleccionem el div 'resultat' amb el que insertarem la taula a mostrar
	let divResultat = document.getElementById("resultat");
	// inicialitzem el div per esborrar el contingut
	divResultat.innerHTML = "";
	initChart(array);
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
// funcio que retorna la taula que em seleccionat amb el radio
function returnTaula() {
	switch (returnRadio()) {
		case "poke":
			return pokemons;
			break;
		case "municipi":
			return municipis;
			break;
		case "movie":
			return movies;
			break;
		case "meteorit":
			return meteorites;
			break;
	}
}
// funció que retorna el radio seleccionada o empty en cas de no haber cap
function returnRadio() {
	let inputs = document.querySelectorAll("input");
	let radio = "";
	inputs.forEach(type => { if(type.checked) { radio = type.id; } });
	return radio;
}

// funció que retorna els headers de la nostra taula segons quina hagi seleccionada
function returnHeaders(radio) {
	let trId = `tr${radio}`;
	let existent = document.getElementById(trId);
	if (existent != null && existent.id == trId) { return existent; }
	let tr = document.createElement("tr");
	tr.id = trId;
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
		// create div
		let div = document.createElement("div");
		div.id = "header"; // set id
		// create p
		let p = document.createElement("p");
		p.textContent = value; // set value
		// create button & img 
		let button = document.createElement("button");
		let img = document.createElement("img");
		// set attributes
		button.setAttribute('onclick', `sortColumn(${headers.indexOf(value)})`);
		img.classList = "header"; // set class
		img.src = "img/sort_up.png"; // set src
		img.width = 20; // set width
		//create th
		let th = document.createElement("th");
		if (value == "Imatge") { button.setAttribute("style", "visibility: hidden"); } // en la columna de les imatges amaguem els buttons
		// appends
		button.appendChild(img);
		div.appendChild(p); 
		div.appendChild(button);
		th.appendChild(div);
		tr.appendChild(th);
	});
	return tr;
}
function sortColumn(index) {
	let img = document.getElementsByClassName("header");
	for (let imatge of img) {
		if (imatge.src.includes("down")) {
			imatge.src = "img/sort_up.png";
			order = "asc";
		} else {
			imatge.src = "img/sort_down.png";
			order = "desc";
		}
	};
	
	arrayUsat.sort(function(a, b) { return comparaValors(a[index], b[index]); });
	if (order == "desc") { arrayUsat.reverse(); }
	creaTaula(arrayUsat, returnHeaders(returnRadio()));
}

// funció per comparar valors
function comparaValors(a, b) {
	if (Number.isInteger(a)) { return a - b; }
	if (returnRadio() == "poke" && a.includes("kg")) { 
		return a.substr(0, a.search(" ")) - b.substr(0, b.search(" "));
	}
	if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	} else {
		return 0;
	}
}
// funció per inicialitzar els labels segons el radio seleccionat
function initChart(array) {
	// condicional per comprovar que no existeixi un Chart inicialitzat
	if (myChart != null) { myChart.destroy(); }

	// arrays per la creació del Chart
	let arrayDadesGraf = [];
	let backgroundColor = [];
	let borderColor = [];
	let arrayLabels = [];

	// variable de cotrol
	let added = false;
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
				arrayLabels.forEach(habitants => { 
					if (!added) {
						if (municipi[3] <= habitants) { 
							arrayDadesGraf[arrayLabels.indexOf(habitants)] += 1;
							added = true; 
						} 
					}
				})
				added = false;	
			});
			break;
		case "movie":
			arrayLabels = ["Drama", "Crime", "Action", "Thriller", "Biography", "History", "Adventure", "Fantasy", "Westen", "Romance", "Sci-Fi", "Mystery", "Comedy", "War", "Family", "Animation", "Musical", "Music", "Horror", "Film-Noir", "Sport"];
			arrayDadesGraf = new Array(arrayLabels.length).fill(0);
			backgroundColor = randomBackgroundColor(arrayLabels.length);
			borderColor = randomBorderColor(arrayLabels.length);
			array.forEach(movie => {
				movie[2].forEach( genre => {
					arrayLabels.forEach(label => { 
						if (genre == label) { arrayDadesGraf[arrayLabels.indexOf(label)] += 1; } 
					})
				});	
			});
			break;
		case "meteorit":
			arrayLabels = [1000, 2000, 3000, 4000, 5000, 10000, 15000, 20000, 30000, 40000, 50000, 100000, 500000, 1000000, 2000000];
			arrayDadesGraf = new Array(arrayLabels.length).fill(0);
			backgroundColor = randomBackgroundColor(arrayLabels.length);
			borderColor = randomBorderColor(arrayLabels.length);
			array.forEach(meteorit => {
				arrayLabels.forEach(massa => {  
					if (!added) {
						if (meteorit[3] <= massa) { 
							arrayDadesGraf[arrayLabels.indexOf(massa)] += 1; 
							added = true;
						} 
					}
				});
				added = false;
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

function switchVista() {
	let btn = document.getElementById("btn");
	let chart = document.getElementById("chart-container");
	let taula = document.getElementById("resultat");
	if (btn.textContent == "Mostra Chart") {
		btn.textContent = "Mostra Taula";
		taula.hidden = true;
		chart.hidden = false;
	} else {
		btn.textContent = "Mostra Chart";
		chart.hidden = true;
		taula.hidden = false;
	}
}