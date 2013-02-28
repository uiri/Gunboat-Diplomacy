//lrn2latin uirifag - significat anglice "hours passed"
var horaepasatae;
var city;

// also change this stuff server side. kthnx
function City() {
    this.update = new Date();
    this.name = "New City";
    this.owner = "";
    this.x = 0;
    this.y = 0;
    this.population = 100000;
    this.queue = new Array();
    this.food = 55000;
    this.fuel = 50000;
    this.mineral = 5000;
    this.buildings = new Array();
    this.buildingTargets = new Array();
    var i;
    while (i < 17) {
	this.buildings[i] = 0;
	this.buildingTargets[i++] = 0;
    }
    this.buildings[2] = 1;
    this.buildings[3] = 1;
    this.buildingTargets[2] = 1;
    this.buildingTargets[3] = 1;
    this.primarySector = 1686;
    this.secondarySector = 90000;
    this.tertiarySector = 1000;
    this.baseStability = 100;
    this.battleStability = 0;
}

function QueueItem(foodcost,fuelcost,mineralcost,productioncost,task,description,onCancel) {
this.cancel = function() { eval(onCancel);}
this.cost = [foodcost,fuelcost,mineralcost,productioncost];
this.prodleft = this.cost[3];
this.task = task; //raw code executed after completion
this.name = description; //whatever this thing is called
}

function Block(type, improvement, level, target){
this.type = type;
this.improvement = improvement;
this.level = level;
this.target = level; //for queue purposes
this.city = null;

return this.type;
}

function loadCity() {
    var req = new XMLHttpRequest();
    req.open("GET", "/city");
    req.onreadystatechange = function() {
	if (req.readyState == 4) {
	    if (req.status == 200) {
		city = JSON.parse(req.response);
		city.update = new Date(city.update);
	    } else {
		city = new City();
	    }
	}
    }
    req.send();
}

function explicitySaveCity() {
    var req = new XMLHttpRequest();
    req.open("POST", "/save");
    req.onreadystatechange = function() {
	if (req.readyState == 4) {
	    if (req.responseText == "You need to register") {
		document.getElementById("wrapper").style.display = "none";
		var iframe = document.createElement("iframe");
		iframe.src = "/signup";
		iframe.id = "iframe";
		/*iframe.onload = function() {
		    if (document.getElementById("iframe").src != "/signup") {
			iframe = document.getElementById("iframe");
			iframe.parentNode.removeChild(iframe);
		    }
		}*/
		document.body.appendChild(iframe);
	    }
	}
    }
    req.send(JSON.stringify(city));
}


function saveCity() {
    var req = new XMLHttpRequest();
    req.open("POST", "/save");
    req.send(JSON.stringify(city));
}

//all of these city properties should go into the django model (unless marked otherwise)
city = new City();
loadCity();
	var health = 0.1; // formula from city stats here
	var unemploymeny = 0; // formula from city stats here
    var foodProduction = 500; // formula from city stats here
	var fuelProduction = 500; // formula from city stats here
	var mineralProduction = 500; // formula from city stats here
	var buildingnames = ["School", "Barracks", "Fortifications", "Municipal Works", "Hospital", "Transportation", "Broadcast Tower", "Workshop", "Foundry", "Airport", "Shipyard","Laboratory","Ethanol Plant","Hydroponics Plant","Recycling Plant","Nuclear Plant","Supercomputer","Space Center"];
	var buildingcosts = [new Array(900,800,700,750),new Array(2000,1700,900,1500),new Array(500,1000,200,3000),new Array(450,400,300,1000),new Array(1600,2000,500,750),new Array(2000,2000,2000,3000),new Array(2200,1800,2400,1000),new Array(2700,2400,2600,5000),new Array(3000,2400,2600,5000),new Array(5000,10000,12500,17000),new Array(7500,15000,5000,50000)]; //hardcoded
	//still have to add costs to hightechs
	var production = 1000; // formula from city stats here
	var productionTech = 1; // formula from city stats here
	var stability = city.baseStability = city.battleStability; 

// it goes NW, N, NE, W, city's own, E, SW, W, SE; derived from block DB
// something like /square/x/y for a URL scheme?
var blocks = [new Block(0,0,5), new Block(0,4,5), new Block(1,1,5), new Block(1,5,5), new Block(2,2,5), new Block(2,6,5), new Block(3,3,5), new Block(4,1,5), new Block(4,5,5)]; //dummy values, normally we'd get from ajax
var blockTypes = ["Plains", "Hills", "Desert", "Water", "Mountain"]; //hardcoded
var blockImprovements = ["Farm", "Mine", "Oil Well", "Fishery", "Quarry", "Coal Mine", "Pasture"];
var blockGraphics = ["http://kingbushido95.ki.funpic.de/ModernDS/graphic/map/gras1.png", "http://kingbushido95.ki.funpic.de/ModernDS/graphic/map/berg2.png", "http://i.imgur.com/CqMI5.png", "http://i.imgur.com/cWv4h.png", "http://i.imgur.com/cE9RQ.png"];

function changeHTML(id, changeTo){
    if (changeTo && document.getElementById(id).innerHTML != changeTo)
	document.getElementById(id).innerHTML = changeTo;
return document.getElementById(id);
}

function upgradeBlock(thingytype) {
var targetNum = document.getElementById("blockchoices").selectedIndex;
var targetBlock = blocks[targetNum];
	targetBlock.target += 1;
var targetTask = "";
var targetName = "";
var cancellation = "blocks[" + targetNum + "].target -= 1;";

var foodcost = 250*Math.pow(1.25,targetBlock.target);
var fuelcost = 300*Math.pow(1.275,targetBlock.target);
var mineralcost = 200*Math.pow(1.245,targetBlock.target);
var productioncost = 250*Math.pow(1.25,(targetBlock.target));
	
if (thingytype=='simple') {
	targetTask = "blocks[" + targetNum + "].level+=1;";
	targetName = "Upgrade&nbsp;" + blockImprovements[targetBlock.improvement];	
} else {
	var targetType = document.getElementById("typechoices").selectedIndex;

	if ((targetBlock.type == 0) && (targetType != 0 && targetType !=4)) {
		window.alert ("You can only build a Farm or a Quarry on this block!");
		return false;
		}
	if ((targetBlock.type == 1) && (targetType != 1 && targetType !=5)) {
		alert ("You can only build a Mine or a Coal Mine on this block!");
		return false;
		}
	if ((targetBlock.type == 2) && (targetType != 2 && targetType !=6)) {
		alert ("You can only build an Oil Well or a Pasture on this block!");
		return false;
		}
	if ((targetBlock.type == 3) && targetType !=3) {
		alert ("You can only build a Fishery this block!");
		return false;
		}
	if ((targetBlock.type == 4) && (targetType != 1 && targetType != 5)) {
		alert ("You can only build a Mine or a Coal Mine on this block!");
		return false;
		}
	if (targetBlock.improvement == targetType) {
		window.alert ("That block is already a " + blockImprovements[targetBlock.improvement] + ".");
		return false;
		}

	targetTask = "blocks[" + targetNum + "].improvement=" + targetType + "; blocks[" + targetNum + "].level=1;";
	targetName = "Change " + blockImprovements[targetBlock.improvement] + " to " + blockImprovements[targetType];
}
	
city.queue.push(new QueueItem(foodcost,fuelcost,mineralcost,productioncost,targetTask,targetName,cancellation));
}
	
function upgradeBuilding(targetBuilding) {
var targetName = "Upgrade&nbsp;" + buildingnames[targetBuilding];
var targetTask = "";
var currentLevel = city.buildingTargets[targetBuilding];
	city.buildingTargets[targetBuilding] += 1;
var cancellation = "buildingTargets[" + targetBuilding + "]-=1;";

if (!currentLevel)
	currentLevel += 1;
	
var foodcost = buildingcosts[targetBuilding][0]*Math.pow(1.25,currentLevel);
var fuelcost = buildingcosts[targetBuilding][1]*Math.pow(1.275,currentLevel);
var mineralcost = buildingcosts[targetBuilding][2]*Math.pow(1.245,currentLevel);
var productioncost = buildingcosts[targetBuilding][3]*Math.pow(1.25,currentLevel);
	
targetTask = "city.buildings[" + targetBuilding + "] +=1;";
	
city.queue.push(new QueueItem(foodcost,fuelcost,mineralcost,productioncost,targetTask,targetName,cancellation));
}

//lrn2latin uirifag - significat anglice "can build"
function potesseAedifacere(numerus) {
if (city.buildings[numerus] > 0)
	return true;
//we should probably tweak some of these requirements later
else if (numerus == 4 && (city.buildings[0] < 1 || city.buildings[3] < 1))
	return false;
else if (numerus == 6 && ((city.buildings[0] < 1) || (city.buildings[5] < 5)))
	return false;
else if (numerus == 7 && (city.buildings[1] < 5 || city.buildings[5] < 5))
	return false;
else if (numerus == 8 && (city.buildings[5] < 5 || city.buildings[7] < 10))
	return false;
else if (numerus == 9 && (city.buildings[5] < 20 || city.buildings[8] < 10))
	return false;
else if (numerus == 10 && (city.buildings[5] < 20 || city.buildings[8] < 20))
	return false;
else if (numerus == 11 && (city.buildings[0] < 10 || city.buildings[7] < 5))
	return false;
else if (numerus > 11 && (!city.buildings[11]/*|| science < buildingcosts[numerus][4]*/))
	return false; //all science buildings - will edit when we add the playerwide science system 
else
	return true;
}//fin functionis "potesseAedifacere"; nolite illam futuere!


function update(){
var iam = new Date();
horaepasatae = (iam-city.update)/3600000;

if (city.queue.length) {
	var q = (horaepasatae*production)/city.queue[0].cost[3];
	if (city.queue[0].cost[0]*q < city.food && city.queue[0].cost[1]*q < city.fuel && city.queue[0].cost[2]*q < city.mineral) {
		city.queue[0].prodleft -= production*horaepasatae;
		city.food -= city.queue[0].cost[0]*q;
		city.fuel -= city.queue[0].cost[1]*q;
		city.mineral -= city.queue[0].cost[2]*q;
		changeHTML("queuestatus", "&nbsp;");
		}
	else
		changeHTML("queuestatus", "Requires more resources! Production halted!");
		if (city.queue[0].prodleft < 0.01) {
			eval(city.queue[0].task);
			city.queue.shift();
		}
}


for (number in blocks) {
		switch (blocks[number].type){
			case 0: {
			city.food += horaepasatae*(foodProduction*Math.pow(1.163118,(blocks[number].level - 1)));
			break;
			}
			case 1: {
			city.mineral += horaepasatae*(mineralProduction*Math.pow(1.163118,(blocks[number].level - 1)));
			break;
			}
			case 2: {
			city.fuel += horaepasatae*(fuelProduction*Math.pow(1.163118,(blocks[number].level - 1)));
			break;
			}
			case 3: {
			city.food += horaepasatae*(foodProduction*Math.pow(1.163118,(blocks[number].level - 1)));
			break;
			}
			case 4: {
			city.mineral += 0.5*horaepasatae*(mineralProduction*Math.pow(1.163118,(blocks[number].level - 1)));
			break;
			}
			case 5: {
			city.fuel += 0.5*horaepasatae*(fuelProduction*Math.pow(1.163118,(blocks[number].level - 1)));
			break;
			}
			case 6: {
			city.food += 0.5*horaepasatae*(foodProduction*Math.pow(1.163118,(blocks[number].level - 1)));
			break;
			}
		}
	}

if (city.food < 1)
	city.food = 1;
if (city.fuel < 1)
	city.fuel = 1;
if (city.mineral < 1)
	city.mineral = 1;

	
health = 0.1;
	health += (200*Math.pow(1.25,city.buildings[3]))/city.population;
	health += (200*Math.pow(1.25,city.buildings[4]))/city.population;
	health += (50*Math.pow(1.25,city.buildings[5]))/city.population;
city.population += health*horaepasatae*(Math.log((city.food+(city.population/2))/city.population)*city.population);
unemployment = (city.population-(city.primarySector+city.secondarySector+city.tertiarySector))/city.population;

city.primarySector = 0;
	for (primary in blocks)
	city.primarySector += 100*Math.pow(1.17,(blocks[primary].level - 1));
city.secondarySector += horaepasatae*(Math.log((city.fuel+(city.secondarySector/2))/city.secondarySector)*city.secondarySector)*((city.buildings[3]+(city.buildings[5]*2)+(city.buildings[7]*2)+(city.buildings[8]*3)+(city.buildings[10]*2))/10);
city.tertiarySector += horaepasatae*(Math.log((city.secondarySector+1)/city.tertiarySector)*city.tertiarySector)*(((city.buildings[0]*3)+city.buildings[3]+(city.buildings[6]*2)+(city.buildings[9]*2)+city.buildings[11])+city.buildings[16]/10); //we'll make it a bit more complex later
productionTech = 10*(city.tertiarySector/city.secondarySector) + 0.1; //eventually we'll make this a part of research

if ((city.primarySector+city.secondarySector) > city.population)
	city.secondarySector = city.population-city.primarySector;
else if ((city.primarySector+city.secondarySector+city.tertiarySector) > city.population)
	city.tertiarySector = city.population-(city.primarySector+city.secondarySector);
	
production = city.secondarySector*productionTech;

city.baseStability = 30*(health+unemployment)+20*(city.food/city.population);
if (city.battleStability > 0)
	city.battleStability -= 8*horaepasatae;
stability = city.baseStability - city.battleStability;
if (stability > 100)
	stability = 100;
	
writeStats();
city.update = new Date();
} //end up update function don't f with this {

function writeStats(){
    doctitle = city.name + " | Gunship Diplomacy";
    if (document.title != doctitle)
	document.title = doctitle;

changeHTML("name", city.name);
changeHTML("cityblock", "<h3>" + city.name + "</h3>" + blockTypes[blocks[4].type] + "<br />" + blockImprovements[blocks[4].improvement]);
changeHTML("population", parseInt(city.population) + " citizens");

changeHTML("primary",parseInt(city.primarySector));
changeHTML("secondary",parseInt(city.secondarySector));
changeHTML("tertiary",parseInt(city.tertiarySector));
changeHTML("mineral",parseInt(city.mineral));

	if (city.food > (city.population/2))
		changeHTML("food", Math.floor(city.food) + " (+" + parseInt(city.food-(city.population/2)) + " surplus)").style.color = "green";
	else
		changeHTML("food", Math.floor(city.food) + " (-" + parseInt((city.population/2)-city.food) + " starvation!)").style.color = "red";
	if (city.fuel > (city.secondarySector/2))
		changeHTML("fuel", Math.floor(city.fuel) + " (+" + parseInt(city.fuel-(city.secondarySector/2)) + " surplus)").style.color = "green";
	else
		changeHTML("fuel",  Math.floor(city.fuel) + " (-" + parseInt((city.secondarySector/2)-city.fuel) + " shortage!)").style.color = "red";
	
	
changeHTML("NW", "<b>" + blockTypes[blocks[0].type] + "</b><br />" + blockImprovements[blocks[0].improvement] + "<br />Level&nbsp;" + blocks[0].level).style.backgroundImage="url(" + blockGraphics[blocks[0].type] + ")";
changeHTML("N", "<b>" + blockTypes[blocks[1].type] + "</b><br />" + blockImprovements[blocks[1].improvement] + "<br />Level&nbsp;" + blocks[1].level).style.backgroundImage="url(" + blockGraphics[blocks[1].type] + ")";
changeHTML("NE",  "<b>" + blockTypes[blocks[2].type] + "</b><br />" + blockImprovements[blocks[2].improvement] + "<br />Level&nbsp;" + blocks[2].level).style.backgroundImage="url(" + blockGraphics[blocks[2].type] + ")";
changeHTML("W",  "<b>" + blockTypes[blocks[3].type] + "</b><br />" + blockImprovements[blocks[3].improvement] + "<br />Level&nbsp;" + blocks[3].level).style.backgroundImage="url(" + blockGraphics[blocks[3].type] + ")";
changeHTML("cityblock", "<b>" + city.name + "</b><br />" + blockTypes[blocks[4].type] + "<br />" + blockImprovements[blocks[4].improvement] + "<br />Level&nbsp;" + blocks[4].level).style.backgroundImage = "url(" + blockGraphics[blocks[4].type] + ")"; // please ensure the similar line in writeStats() matches
changeHTML("E",  "<b>" + blockTypes[blocks[5].type] + "</b><br />" + blockImprovements[blocks[5].improvement] + "<br />Level&nbsp;" + blocks[5].level).style.backgroundImage="url(" + blockGraphics[blocks[5].type] + ")";
changeHTML("SW",  "<b>" + blockTypes[blocks[6].type] + "</b><br />" + blockImprovements[blocks[6].improvement] + "<br />Level&nbsp;" + blocks[6].level).style.backgroundImage="url(" + blockGraphics[blocks[6].type] + ")";
changeHTML("S",  "<b>" + blockTypes[blocks[7].type] + "</b><br />" + blockImprovements[blocks[7].improvement] + "<br />Level&nbsp;" + blocks[7].level).style.backgroundImage="url(" + blockGraphics[blocks[7].type] + ")";
changeHTML("SE", "<b>" + blockTypes[blocks[8].type] + "</b><br />" + blockImprovements[blocks[8].improvement] + "<br />Level&nbsp;" + blocks[8].level).style.backgroundImage="url(" + blockGraphics[blocks[8].type] + ")";

changeHTML("stability", Math.round(stability));
changeHTML("health", Math.round(health*100));
changeHTML("unemployment", parseInt(100*unemployment) + "");

var itemsdiv = document.getElementById("items");
itemsdiv.innerHTML = '';
for (item in city.queue) {
	queuediv = document.createElement("div");
	queuediv.innerHTML = city.queue[item].name + "&nbsp;&nbsp;&nbsp;" + Math.round((1-(city.queue[item].prodleft/city.queue[item].cost[3]))*100) + "%&nbsp;&nbsp;&nbsp;";
	queuediv.innerHTML += Math.floor((city.queue[item].prodleft/production)*60) + " minutes " + Math.floor(((city.queue[item].prodleft/production)*3600)-60*Math.floor((city.queue[item].prodleft/production)*60)) + " seconds left";
	itemsdiv.appendChild(queuediv);
}

var buildingsdiv = document.getElementById("buildlevels");
buildingsdiv.innerHTML = "";
for (what in city.buildings) {
	if (potesseAedifacere(what)){
		var buildingdiv = document.createElement("div");
		buildingdiv.innerHTML = "<b>" + buildingnames[what] + "</b>:&nbsp;Level " + city.buildings[what];
		buildingdiv.innerHTML += '&nbsp;<button onclick="upgradeBuilding(' + what + ');update();">Upgrade</button>';
		buildingdiv.innerHTML += '<br />&nbsp;&nbsp;&nbsp;Cost to upgrade:&nbsp;';
			buildingdiv.innerHTML += '<img src="http://forums.civfanatics.com/images/smilies/civ4/food.gif" alt="Food"/>&nbsp;';
			buildingdiv.innerHTML += parseInt(buildingcosts[what][0]*Math.pow(1.25,city.buildingTargets[what]));
			buildingdiv.innerHTML += '&nbsp;<img src="http://forums.civfanatics.com/images/smilies/civ4/science.gif" alt="Fuel"/>&nbsp;';
			buildingdiv.innerHTML += parseInt(buildingcosts[what][1]*Math.pow(1.275,city.buildingTargets[what]));
			buildingdiv.innerHTML += '&nbsp;<img src="http://cdn2.tribalwars.net/graphic/eisen.png?0e9e5" alt="Minerals"/>&nbsp;';			
			buildingdiv.innerHTML += parseInt(buildingcosts[what][2]*Math.pow(1.245,city.buildingTargets[what]));
			buildingsdiv.appendChild(buildingdiv);
	}
}

}//end of write function don't f with this }

update();
document.body.style.visibility = 'visible';
window.setInterval(update, 1000);