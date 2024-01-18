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
		let pokemon = {
			num : element.num,
			img : element.img,
			name : element.name,
			type : element.type,
			weight : element.weight
		}
		pokemons.push(pokemon);	
	});
});

// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;
	dades.forEach(element => {
		let municipi = {
			name : element.municipi_nom,
			img : element.municipi_escut,
			ine : element.ine,
			habitants : parseInt(element.nombre_habitants)
		}
		municipis.push(municipi);
	});
});

// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;		
	dades.forEach(element => {
		let meteorit = {
			id : parseInt(element.id),
			name : element.name,
			year : parseInt(element.year),
			mass : element.mass == undefined ? 0 : parseInt(element.mass)
		}
		meteorites.push(meteorit);
	});
});

// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies
	dades.forEach(element => {
		let movie = {
			img : element.url,
			name : element.title,
			genres : element.genres,
			year : element.year,
			rating : element.rating
		}
		movies.push(movie);
	});
});

// esdeveniment que detecta cada vegada que escrivim dins del camp de text
let inputSearch = document.getElementById('txtSearch')
inputSearch.addEventListener('input', (e) => {
    searchList(inputSearch.value);
});

// funcio que calcula la mitjana d'un valor numèric (fixar a dos decimals amb toFixed(2))
function calcMitjana() {
	let valorNum = 0;
	let resultat = 0;
	let radio = returnRadio();
	arrayUsat.forEach(data => {
		valorNum += parseFloat(Object.values(data)[Object.keys(data).length-1]);
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
// funció que retorna la posició d'un element buscat mitjantçant un prompt
function searchList(value) {
	let match = returnMatches(value.toUpperCase());
	creaTaula(match, returnHeaders(returnRadio()));
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
	
	arrayUsat.sort(function(a, b) { return comparaValors(Object.values(a)[index], Object.values(b)[index]); });
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
// funció que crea la taula i mitjançant el DOM mostra el resultat en el div "resultat"
function printDades() {
	document.getElementById("btn").hidden = false;
	document.getElementById('txtSearch').value = "";
	if (arrayUsat.length == 0 || radioMarcat == false) { arrayUsat = returnTaula(); }

	creaTaula(arrayUsat, returnHeaders(returnRadio()));
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
		// iteració amb object.entries() que ens permet inserir les dades del nostre objecte a la taula. A més a més, la variable key ens permet saber quan es tracta d'una imatge per afegir l'etiqueta img
		for (const [key, value] of Object.entries(element)) {
			let td = document.createElement("td");
			if (key == "img") {
				let img = document.createElement("img");
				img.src = value;
				td.appendChild(img);
			} else {
				td.innerHTML = value;
			}
			tr.appendChild(td);
		};
		table.appendChild(tr);
	});
	divResultat.appendChild(table);
}
// funció que retorna les coincidencies amb el paràmetre proposat
function returnMatches(name) {
	arrayUsat = [];
	returnTaula().forEach((element) => {
		if(element.name.toUpperCase().includes(name)) {
			arrayUsat.push(element);
		}
	});
	return arrayUsat;
}
// funcio que retorna la taula que em seleccionat amb el radio
function returnTaula() {
	switch (returnRadio()) {
		case "poke":
			return pokemons;
		case "municipi":
			return municipis;
		case "movie":
			return movies;
		case "meteorit":
			return meteorites;
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
				pokemon.type.forEach( type => {
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
						if (municipi.habitants <= habitants) { 
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
				movie.genres.forEach( genre => {
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
						if (meteorit.mass <= massa) { 
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
// funció que retorna un array de borderColors aleatoris
function randomBorderColor(length) {
	let colors = [];
	for (let i=0; i<length; i++) {
		colors.push(`rgb(${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)})`);
	}
	return colors;
}
// funció que retorna un array de backgroundColors aleatoris
function randomBackgroundColor(length) {
	let colors = [];
	for (let i=0; i<length; i++) {
		colors.push(`rgb(${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)}, 0.2)`);
	}
	return colors;
}
// funció que canvia vista entre taula i chart
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