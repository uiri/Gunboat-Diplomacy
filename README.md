Gunboat-Diplomacy
=================

text-based mmo under construction

City/map system:
  Cities start off on squares on a grid map (made with Google Maps API)
  
    Each city has three resources: food, fuel, metal
    
    Harvested from nearby squares
    
      Desert yields fuel
      
      Plains yield food
      
      Hills yield metal
      
      Water and mountain (impassable)
      
        Water yields less food
        
        Mountains yield less metal
        
      Special buildings (require a lot of infrastructure) can convert resources
      
        Start out in beginner cities lacking a certain terrain
        
        Ethanol plant - food to fuel
        
        Hydroponics garden - fuel to food
        
        Recycling center - fuel to metal
        
        Nuclear plant - metal to fuel
        
    Each required in certain amounts for builds
    
      Food mainly for population growth, infantry
      
      Fuel mainly for military units
      
      Metal mainly for infrastructure
      
  Each player starts off with one city
  
    May conquer other players' cities
    
    Also NPC "barbarian" or "UN" or w/e cities for new players to conquer
    
  Military units can be grouped into armies, sent out
  
    Player draws waypoints to location on map where armies are sent to
    
      Terrain must be passable
      
      Two methods of moving across impassable territory:
      
        With sufficient aircraft, players can airdrop units directly
        
        In a port city, and with sufficient ships, players can move to opposite shore
        
      Can stop near cities when at war with enemy player
      
    Units can attack cities when adjacent to them
    
  Infrastructure:
    
    Barracks - unlocks infantry units, decreases production costs of infantry
    
    Fortifications - increases city defense
    
    Transportation - decreases transport time, increases commerce, unlocks resource trading
    
    Workshop - unlocks armored units, decreases production costs of armor, increases production
    
    School - increases research, increases education, unlocks government transitions
    
    Hospital (requires School) - keeps population modifier (health) near 1
    
    Foundry (requires Workshop, Warehouse) - increases production, unlocks artillery
    
    Airport (requires Workshop, Transportation) - increases commerce, decreases transport time, unlocks aircraft
    
    Shipyard (requires Factory) - increases commerce, unlocks ships
    
    Laboratory (requires School, Factory) - increases research, increases espionage, unlocks special buildings
    
      Supercomputer - increases espionage
      
      Ethanol Plant - food to fuel
      
      Hydroponics - fuel to food
      
      Recycling Center - fuel to metal
      
      Nuclear Plant - metal to fuel
      
      Space Center - allows missile units, satellite launches

Combat system

  Movement
    
    Each square can hold one army
    
    Players assign units to armies and send out to specific map blocks
      
      Have to draw waypoints to that block
      
      Cannot pass through mountain or water blocks; rivers have no effect
      
    When an army is adjacent to a city, it can attack
    
      Air and naval support can be assigned
    
      Three-round battles
      
        First, bombardment
        
          Air battle if any
          
          Artillery/ships/helicopters/remaining air units add to attack
          
          Losses calculated for artillery and helicopters
          
        Then, armor losses and gains calculated
        
        Then, infantry losses and gains calculated
    
      Battles designed to go until one side loses ~20%
      
      City taken when loyalty/approval drops to 0%, after several battles
        
        Loyalty decreases when attackers win
        
        Loyalty increases when defenders win
        
      Attacks can also be off of ships or paratroops
      
    Armies can also be placed in friendly cities without map movement - requires airport

  Fleets
  
    Ships are super-expensive
  
    Players assign ships to fleets, move like armies
    
    Each fleet can see x number of blocks around it
    
      Depends on air support
      
      Can attack similar distances
      
    Methods of attack
    
      Blockade - choose a specific city, requires closeness to city
        
        No resource shipments, no use of water blocks
        
        Ends when defender defeats fleet
        
      Bombardment
        
        Requires adjacency to city
        
        Depending on ship's guns, damages buildings and infrastructure
        
      Direct attack
      
        Can bombard enemy ships from afar
        
          With ships guns/missiles
          
          With carrier air wings - then starts air battle
        
        Rarely decisive
        
      Amphibious landing
        
        Armies can be put in fleet depending on transport capacity
        
        When fleet adjacent to city, can proceed with attack
  
    Air units
    
      Based in specific city
      
      Can launch air raid
        
        Certain ground units can partake (militia, SAM, helikkkopter)
        
        Battle is such as land war, but with smaller % casualities
        
        Certain buildings damaged, ground or naval units may be destroyed
      
      Can drop paratroopers
  
  Ground Units
  
    Infantry
    
      Militia - good anti-armor defense, average attack
      
      Motor Rifle - good anti-infantry defense, bad attack
      
      Marine - good attack, bad defense
      
    Armor
    
      Tank - good attack, average anti-armor defense
      
      APC - good anti-infantry defense, average attack
      
      IFV - balanced attack and defense
      
    Artillery
    
      Field Gun - destroys fortifications
      
      Artillery - general attack
      
      Train Gun - super-defense, cannot attack
      
  Air Units
  
    Fighter-Bomber - general unit, can destroy aircraft and bombard cities
    
    Close Air Support - attack unit, destroys enemy land and naval units
    
    Paratroop - can embark Marines, see above
  
    Cruise Missile - air unit, sacrifices with use
      
  Naval Units
  
    Carrier - carries fighter-bombers, strong attack (w/airpower), weak defense
    
    Destroyer - can see submarines, weak attack, strong defense
    
    Missile Cruiser - cannot see submarines, strong attack, med. defense, can hold cruise missiles
    
    Transport - adds land unit capacity
    
    Submarine - medium attack, invisible except to destroyers, can hold cruise missiles
  
  Special Units

    Fanatic - one per player, good attack and defense, special ability from religion
  
    Helicopter - hermaphrodite, acts as both air and land unit; good attack, good anti-armor defense
    
    Satellite - can be assigned to city, lingers over for two weeks and gives daily reports of unit numbers
    
    SAM - artillery unit, only attacks helicopters

Politics system

  Different categories for choices:
  
    Politics
    
      Autocracy (symbol: ♔) - faster transitions, faster military recruitment. Loyalty bhanges slower
      
      Consitution (symbol: ✍) - slight commerce bonus
      
      Democracy (symbol: ☑) - more education, more commerce. Loyalty changes faster
      
    Society
    
      Libertarian (symbol: 🗽) - more education, less espionage
      
      Tolerant (symbol: ☮) - slight education bonus
      
      Conservative (symbol: 🔨) - less education, more espionage
      
    Capital
    
      Syndicalist (symbol: Ⓐ) - lower production cost, more resource costs
      
      Decentralized (symbol: ☍) - no effect
      
      Capitalist (symbol: $) - more research, less health, less loyalty
      
    Economy (NOTE: will be elaborated later)
    
      Planned (symbol: ☭)
      
      Mixed (symbol: ☊)
      
      Market (symbol: ⚖)
      
    Religion
      
      Free Religion (symbol: ☪☸xis☩) - increased education
      
      Theocracy (symbol: ♗) - decreased research, increased loyalty
      
      State Atheism (symbol: ⚛) - increased research, decreased loyalty
      
  Players choose from presets at first
    
    Barracks State - conservative, capitalist, planned economy, free religion, autocracy.
    
    Religious Colony - conservative, decentralized, mixed economy, theocracy, autocracy.
    
    Liberal Democracy - libertarian, capitalist, free market, free religion, democracy.
    
    Communist Dictatorship - tolerant, syndicalist, planned economy, state atheism, autocracy.
    
    Social Democracy - libertarian, syndicalist, planned economy, free religion, democracy.
    
  Transitions available with School or Autocracy
  
Religion

  Major Religions
  
    With Theocracy:
    
      Morale bonus against opposing religions
      
        Regular bonus against opposing Theocracies
        
        Double bonus against State Atheist/Pagan players
        
      Religions slowly convert to state religion based on Bulliet curve
      
      Allows Fanatic units, one per city
      
      Allows city religion programs (+1 level to buildings for every 20% of the population in the state religion)
      
        Charity - Hospital
        
        Asceticism - Warehouse
        
        Missionaries - School
        
        Pilgrimage - Transportation
        
        Holy War - Fortification
      
    With Free Religion
    
      If attacking player has state religion, bonus loyalty for population NOT in that religion
      
      Religions fluctuate wildly
      
      No change in loyalty
      
    Religions:
    
      Orthodox (symbol: ☦)
      
        "I believe in one God, Father Almighty, Creator of heaven and earth, and of all things visible and invisible. And in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father before all ages;"    
        
        Fanatic: Varagnian (bonus for Artillery)
        
      Catholic (symbol: ✝)
      
        "Now the Catholic Faith is this: We worship One God in Trinity and Trinity in Unity, neither confounding the Persons nor dividing the substance."
        
        Fanatic: Crusader (bonus for Tanks)
        
      Protestant (symbol: ✞)
      
        "I believe in the Holy Ghost, the Holy Christian Church, the Communion of Saints, the Forgiveness of sins, the Resurrection of the Body, and the Life everlasting.  Amen."
        
        Fanatic: Hugenot (bonus for APC)
        
      Sunni (symbol: ☪)
      
        "I testify that there is no god but God, and Muhammad is the messenger of God."
       
        Fanatic: Mujahadin (bonus for Militia)
      
      Shia (symbol: ☫)
      
        "There is no god but God, and Mohammad is the messenger of God, and Ali is the viceregent of God."
      
        Fanatic: Assassin (bonus for espionage)
        
      Buddhist (symbol: ☸)
        
        "Suffering exists. There is a cause for suffering. There is an end to suffering. In order to end suffering, you must follow the Eightfold Path."
        
        Fanatic: Shaolin Monk (bonus for Infantry)
        
      Sikh (symbol: ☬)
      
        "There exists but one God, who is called The True, The Creator, Free from fear and hate, Immortal, Not begotten, Self-Existent, Great and Compassionate."  
      
        Fanatic: Punjabi (bonus for IFV)
        
  Paganism
  
    Certain percentage of population is "Pagan"
    
    If Paganism adopted as State Religion, each city can do...something
      
    Different Ethnic Religions based on location, holyshit we have 30 in all
    
      Australian Aboriginal
      
      Akan (in Gambia and stuff)
      
      Aztec
      
      Bakongo (in da kkkongo)
      
      Bantu
      
      Berber
      
      Cao Dai (in Vietnam, perhaps just merge into Shen?)
      
      Celtic
      
      Cultus Deorum (like fucking Romans maaaan)
      
      Hellenismos (symbol: ☿)
      
      Hindu (symbol: ॐ)
      
      Hoponopono (its Hawaiian, humor me)
      
      Jewish (symbol: ✡; how many jimmies can we rustle?)
      
      Juche (the religion of Best Korea)
            
      Kemet (symbol: ☥; its in Egypt, followed by approximately 0.00% of the population)
      
      Mapuche (in Chile)
      
      Muisca (in KKKolombia, important because FARC)
      
      Norse (rustle more jimmies by making the symbol a swatstika)
      
      Peyote
      
      Quechua
      
      Rodnovery (the Slavic paganism)
      
      Shen (symbol: ☯)
      
      Shinto (symbol: π)
      
      Tengricilik (the shamanists, let's add in a ulan reference)
      
      Tsonga (in MozambiKKK)
      
      Waaq (in Sudan and Somalia)
      
      Wathaniyya (not an actual pantheon, but what the Arabs refer to Semitic paganism)
      
      Yoruba
      
      Zardoshti (Zoroastrian, because Persians invented everything)
      

Commerce
  
  I'm thinking something with different sectors
    
    Primary makes resource production
    
    Secondary makes production
    
    Tertiary increases the total yields of the previous two, increases loyalty
    
  Maybe each sector hires a certain amount of the population
  
    Do stuff with unemployment?
    
    Hurts the economy to have too much cannon fodder?
    
  Cash economy probably won't be there directly, but...
  
    We could get a rough estimate of GDP, gov't budget, trade surplus, etc
    
    Gov't deficit could paralyze production
    
    Trade surplus could give benefits
    
  Different methods of sector grwoth based on gov't
  
    Under Market, sectors grow on their own (with minimal player input) based on education, infrastructure, gov't
    
    Under Planned, player must pump resources to grow each one
    
    Mixed could maybe have investment into sectors, but otherwise grow on own?
  
  Education
  
  Espionage
  
    Spy satellites give view of all city stats, but are uber-expen$$$ive and temporary
    
    Old fashioned spy networks!

      Would be stored as player-wide variable
      
      Specific cities targeted, or whole players?
      
      Counter-espionage can be infrastructure mebbe?
      
      Anyways, effectiveness of spy network vs. effectiveness of counterespionage determines data gotten
      
      If spies caught, network dismantled and PLAYER KNOWS NOW

  Research
  
    Each city contributes to a player wide pool of research
    
    Pool of research randomly assigned to various categories
    
      Biology/Medicine - increases food production, increases health
      
      Physics/Engineering - increases total production, increases mineral production
            
      Mathematics/Computer Science - increases commerce, increases total research, increases espionage
      
      Chemistry/Materials Science - increases energy production, increases Transportation
      
      ATOMIX (only increases when Nuclear Plant built) - increases health, increases energy production
      
      Astronomy/Rocketry (only increases when Space Center built) - missile effectiveness, increases espionage
  
    Each land or air unit has a certain level from 1 to 3 - AKA level 3 militia, level 1 fighter, level 2 tank
      
      Applies all of the player's units
      
      NOT NAVAL UNITS
      
      Player can only assign a certain amount of upgrades, depending on techs
      
      Therefore, Greater Somali Club Bearer Brigade will do badly against equal number of US Marine Corps