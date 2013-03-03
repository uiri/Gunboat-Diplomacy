//lrn2latin uirifag - significat anglice "hours passed"
var horaepasatae, city, health, unemployment, foodProduction, fuelProduction
  , mineralProduction, buildingcosts, production, productionTech
  , stability;
var blockTypes = ["Plains", "Hills", "Desert", "Water", "Mountain"]; //hardcoded
var blockImprovements = ["Farm", "Mine", "Oil Well", "Fishery", "Quarry", "Coal Mine", "Pasture"];
var blockGraphics = ["http://kingbushido95.ki.funpic.de/ModernDS/graphic/map/gras1.png", "http://kingbushido95.ki.funpic.de/ModernDS/graphic/map/berg2.png", "http://i.imgur.com/CqMI5.png", "http://i.imgur.com/cWv4h.png", "http://i.imgur.com/cE9RQ.png"];
var buildingnames = ["School", "Barracks", "Fortifications", "Municipal Works", "Hospital", "Transportation", "Broadcast Tower", "Workshop", "Foundry", "Airport", "Shipyard","Laboratory","Ethanol Plant","Hydroponics Plant","Recycling Plant","Nuclear Plant","Supercomputer","Space Center"];
var buildingids = ["school", "barracks", "fortifications", "municipalworks", "hospital", "transportation", "broadcasttower", "workshop", "foundry", "airport", "shipyard", "laboratory", "ethanolplant", "hydroponicsplant", "recyclingplant", "nuclearplant", "supercomputer", "spacecenter"];

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

function changeHTML(id, changeTo){
    if (changeTo && document.getElementById(id).innerHTML != changeTo)
	document.getElementById(id).innerHTML = changeTo;
return document.getElementById(id);
}

function upgradeBlock(thingytype) {
var targetNum = document.getElementById("blockchoices").selectedIndex;
var targetBlock = city.blocks[targetNum];
	targetBlock.target += 1;
var targetTask = "";
var targetName = "";
var cancellation = "city.blocks[" + targetNum + "].target -= 1;";

var foodcost = 250*Math.pow(1.25,targetBlock.target);
var fuelcost = 300*Math.pow(1.245,targetBlock.target);
var mineralcost = 200*Math.pow(1.275,targetBlock.target);
var productioncost = 250*Math.pow(1.25,(targetBlock.target));
	
if (thingytype=='simple') {
	targetTask = "city.blocks[" + targetNum + "].level+=1;";
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

	targetTask = "city.blocks[" + targetNum + "].improvement=" + targetType + "; city.blocks[" + targetNum + "].level=1;";
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
    var idklol = [
	[4,  0,  1, 3,  1],
	[6,  0,  1, 3,  5],
	[7,  1,  5, 5,  5],
	[8,  5,  5, 7, 10],
	[9,  5, 20, 8, 10],
	[10, 5, 20, 8, 20],
	[11, 0, 10, 7,  5]]
      , j;
    for (j in idklol)
	if (numerus == idklol[j][0] && 
	    (city.buildings[idklol[j][1]] < idklol[j][2] || 
	     city.buildings[idklol[j][3]] < idklol[j][4]))
	    return false;
    if (numerus > 11 && (!city.buildings[11]/*|| science < buildingcosts[numerus][4]*/))
	return false; //all science buildings - will edit when we add the playerwide science system 
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


for (number in city.blocks) {
    var k=1;
    if (city.blocks[number].type > 3)
	k=0.5;
    if (city.blocks[number].type%3 == 0)
	city.food += k*horaepasatae*(
	    foodProduction*Math.pow(1.63118, (city.blocks[number].level - 1)));
    else if (city.blocks[number].type%3 == 1)
	city.mineral += k*horaepasatae*(
	    mineralProduction*Math.pow(1.63118, (city.blocks[number].level - 1)));
    else if (city.blocks[number].type%3 == 2)
	city.fuel += k*horaepasatae*(
	    fuelProduction*Math.pow(1.63118, (city.blocks[number].level - 1)));
    else
	console.log("Houston we have a problem in for (number in city.blocks)");
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
	for (primary in city.blocks)
	city.primarySector += 100*Math.pow(1.17,(city.blocks[primary].level - 1));
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

function writeStats() {
    doctitle = city.name + " | Gunship Diplomacy";
    if (document.title != doctitle)
	document.title = doctitle;

changeHTML("name", city.name);
changeHTML("cityblock", "<h3>" + city.name + "</h3>" + blockTypes[city.blocks[4].type] + "<br />" + blockImprovements[city.blocks[4].improvement]);
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
	
    // medi you are a retard
    directions = ["NW", "N", "NE", "W", "cityblock", "E", "SW", "S", "SE"];
    var i;
    for (i in directions)
	changeHTML(directions[i], "<b id='blocktype"+i+"'>" + blockTypes[city.blocks[i].type] + "</b><br>"+blockImprovements[city.blocks[i].improvement] + "<br>Level&nbsp;" + city.blocks[i].level).style.backgroundImage = "url(" + blockGraphics[city.blocks[i].type] + ")";
    changeHTML("blocktype4", city.name);

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

for (what in city.buildings) {
	if (potesseAedifacere(what)){
	    var htmlidtags = ["-level", "-food", "-fuel", "-mineral"];
	    var buildingdiv = document.getElementById(buildingids[what]);
	    var buildcosts = [
		city.buildings[what],
		parseInt(buildingcosts[what][0]*Math.pow(1.25,city.buildingTargets[what])),
		parseInt(buildingcosts[what][1]*Math.pow(1.275,city.buildingTargets[what])),
		parseInt(buildingcosts[what][2]*Math.pow(1.245,city.buildingTargets[what]))
	    ];
	    if (buildingdiv.className == "hidden-building") {
		buildingdiv.className = "";
		buildingdiv.innerHTML = "<b>" + buildingnames[what] + "</b>:";
		buildingdiv.innerHTML += "&nbsp;Level ";
		buildingdiv.innerHTML += "<span id='"+buildingids[what]+htmlidtags[0]+"'>";
		buildingdiv.innerHTML += "</span>";
		buildingdiv.innerHTML += '&nbsp;<button onclick="upgradeBuilding(' + what + ');update();">Upgrade';
		buildingdiv.innerHTML += '</button><br>&nbsp;&nbsp;&nbsp;Cost to upgrade:&nbsp;';
		buildingdiv.innerHTML += '<img src="/food.gif" alt="Food"/>&nbsp;';
		buildingdiv.innerHTML += '<span id="'+buildingids[what]+htmlidtags[1]+'">' + buildcosts[1];
		buildingdiv.innerHTML += '</span>&nbsp;';
		buildingdiv.innerHTML += '<img src="/fuel.gif" alt="Fuel"/>&nbsp;';
		buildingdiv.innerHTML += '<span id="'+buildingids[what]+htmlidtags[2]+'">' + buildcosts[2];
		buildingdiv.innerHTML += '</span>&nbsp;';
		buildingdiv.innerHTML += '<img src="/mineral.png" alt="Minerals"/>&nbsp;';
		buildingdiv.innerHTML += "<span id='"+buildingids[what]+htmlidtags[3]+"'>"+buildcosts[3];
		buildingdiv.innerHTML += "</span>";
	    } else {
		var curdiv, k;
		for (k in htmlidtags) {
		    curdiv = document.getElementById(buildingids[what]+htmlidtags[k]);
		    if (curdiv.innerHTML !== buildcosts[k]) {
			curdiv.innerHTML = buildcosts[k];
		    }
		}
	    }
	}
}

}//end of write function don't f with this }

function loadCity() {
    var req = new XMLHttpRequest();
    req.open("GET", "/city");
    req.onreadystatechange = function() {
	if (req.readyState == 4) {
	    if (req.status == 200) {
		city = JSON.parse(req.response);
		city.update = new Date(city.update);
		health = 0.1; // formula from city stats here
		unemployment = 0; // formula from city stats here
		foodProduction = 500; // formula from city stats here
		fuelProduction = 500; // formula from city stats here
		mineralProduction = 500; // formula from city stats here
		buildingcosts = [new Array(700,800,900,750),new Array(800,450,1000,1500),new Array(500,200,7500,1500),new Array(400,300,450,500),new Array(800,250,1000,750),new Array(500,500,750,1500),new Array(1100,900,1200,500),new Array(1200,1200,1350,2500),new Array(1500,1200,1300,2500),new Array(2500,5000,6250,8500),new Array(3750,2500,7500,25000)];
		//still have to add costs to hightechs
		production = 1000; // formula from city stats here
		productionTech = 1; // formula from city stats here
		stability = city.baseStability - city.battleStability;
		// it goes NW, N, NE, W, city's own, E, SW, W, SE; derived from block DB
		// something like /square/x/y for a URL scheme?
		if (!city.blocks)
		    city.blocks = [new Block(0,0,5), new Block(0,4,5), new Block(1,1,5), new Block(1,5,5), new Block(2,2,5), new Block(2,6,5), new Block(3,3,5), new Block(4,1,5), new Block(4,5,5)]; //default values
		update();
		document.body.style.visibility = 'visible';
		window.setInterval(update, 1000);
	    } else {
		loadCity();
	    }
	}
    }
    req.send();
}

loadCity();

