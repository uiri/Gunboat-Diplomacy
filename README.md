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
  
    Warehouse - increases capacity to store resources
    
    Barracks - unlocks infantry units, decreases production costs of infantry
    
    Fortifications - increases city defense
    
    Transportation - decreases transport time, increases commerce, unlocks resource trading
    
    Workshop - unlocks armored units, decreases production costs of armor
    
    School - increases research, increases education, unlocks government transitions
    
    Hospital (requires School) - keeps population modifier (health) near 1
    
    Factory (requires Workshop, Warehouse) - increases production, unlocks artillery
    
    Airport (requires Workshop, Transportation) - increases commerce, decreases transport time, unlocks aircraft
    
    Shipyard (requires Factory) - increases commerce, unlocks ships
    
    Laboratory (requires School, Factory) - increases research, increases espionage, unlocks special buildings
    
      Supercomputer - increases espionage
      
      Ethanol Plant - food to fuel
      
      Hydroponics Garden - fuel to food
      
      Recycling Center - fuel to metal
      
      Nuclear Plant - metal to fuel
      
      Launch Pad - allows missile units, satellite launches

Combat system

  (NOTE: WILL ELABORATE)
  
  Ground Units
  
    Infantry
    
      Militia - good anti-armor defense, average attack
      
      Infantry - good anti-infantry defense, bad attack
      
      Marine - good attack, bad defense
      
    Armor
    
      Tank - good attack, average anti-armor defense
      
      APC - good anti-infantry defense, average attack
      
      IFV - balanced attack and defense
      
    Artillery
    
      Field Gun - destroys fortifications
      
      Artillery - general attack
      
      Fixed Gun - super-defense, cannot move
      
  Air Units
  
  Sea Units
  
  Special Units

    Fanatic - one per player, good attack and defense, special ability from religion
  
    Cruise Missile - air unit, sacrifices with use
    
    Satellite - can be assigned to city, lingers over for two weeks and gives daily reports of unit numbers

Politics system

  Different categories for choices:
  
    Politics
    
      Autocracy (symbol: ♔) - faster transitions, faster military recruitment
      
      Republic (symbol: ✍) - slight commerce bonus
      
      Democracy (symbol: ☑) - more loyalty, enemy loyalty decreases faster
      
    Society
    
      Libertarian (symbol: ☮ + assault rifle) - more education, less espionage
      
      Tolerant (symbol: ✌ + gavel) - slight education bonus
      
      Conservative (fasces) - less education, more espionage
      
    Capital
    
      Syndicalist (symbol: Ⓐ) - lower production cost, more resource costs
      
      Decentralized (symbol: ☍) - no effect
      
      Capitalist (symbol: $) - more research, less health
      
    Economy (NOTE: will be elaborated later)
    
      Planned (symbol: ☭)
      
      Mixed (symbol: ☊)
      
      Market (symbol: scales)
      
    Religion
      
      Free Religion (☪☸xis☩) - increased education
      
      Theocracy (♗) - decreased research, increased loyalty
      
      State Atheism (⚛) - increased research, decreased loyalty
      
  Players choose from presets at first
  
    Constitutional Monarchy - tolerant, decentralized, mixed economy, free religion, republic.
    
    Barracks State - conservative, decentralized, planned economy, theocracy, autocracy.
    
    Libertarian Democracy - libertarian, capitalist, free markey, free religion, democracy.
    
    Communist Dictatorship - tolerant, syndicalist, planned economy, state atheism, autocracy.
    
    Social Democracy - libertarian, syndicalist, planned economy, free religion, democracy.
    
  Transitions available with School or Autocracy
  
Religion

  Major Religions
  
    With Theocracy:
    
      Morale bonus against opposing religions
      
        Regular bonus against opposing Theocracies
        
        Double bonus against State Atheist/Pagan players
      
      Allows city religion programs (+1 level to buildings for every 20% of the population in the state religion)
      
        Charity - Hospital
        
        Asceticism - Warehouse
        
        Missionaries - School
        
        Pilgrimage - Transportation
        
        Holy War - Fortification
      
    With Free Religion
    
      If attacking player has state religion, bonus loyalty for population NOT in that religion
      
      Allows choice between Fanatic types
      
    Religions:
    
      Orthodox (symbol: ☦)
      
        "I believe in one God, Father Almighty, Creator of heaven and earth, and of all things visible and invisible. And in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father before all ages;"
        
        Holy city: Constantinopolis
        
        Fanatic: Varagnian (bonus for Artillery)
        
      Catholic (✝)
      
        "Now the Catholic Faith is this: We worship One God in Trinity and Trinity in Unity, neither confounding the Persons nor dividing the substance."
      
        Holy city: Roma
        
        Fanatic: Crusader (bonus for Tanks)
        
      Protestant (✞)
      
        "I believe in the Holy Ghost, the Holy Christian Church, the Communion of Saints, the Forgiveness of sins, the Resurrection of the Body, and the Life everlasting.  Amen."
        
        Holy city: Canterbury
        
        Fanatic: Puritan (bonus for Marines)
        
      Sunni (☪)
      
        "There is no god but God, and Muhammad is the messenger of God."
        
        Holy city: Mecca
        
        Fanatic: Mujahadin (bonus for Militia)
      
      Shia (☫)
      
        "There is no god but God, and Muhammad is the messenger of God, and Ali is the viceregent of God."
      
        Holy city: Qom
        
        Fanatic: Assassin (bonus for espionage)
        
      Buddhist (☸)
        
        "Suffering exists. There is a cause for suffering. There is an end to suffering. In order to end suffering, you must follow the Eightfold Path."
        
        Holy city: Lopburi
        
        Fanatic: Shaolin Monk (bonus for fortification)
        
      Sikh (☬)
      
        "There exists but one God, who is called The True, The Creator, Free from fear and hate, Immortal, Not begotten, Self-Existent, Great and Compassionate."  
      
        Holy city: Amritsar
        
        Fanatic: Punjabi (bonus for Infantry)
        
  Paganism
  
    Certain percentage of population is "Pagan"
    
    If Paganism adopted as State Religion, each city can be dedicated to a specific god
    
      Creator God - +10% production
      
      War God - +1 barracks level for every 20% pagan
      
      Harvest God - +20% to all resource collection
      
      Sea God - bonus commerce
      
      Underworld God - +1 fortification level for every 20% pagan
      
    Different Pantheons can be chosen (NOTE: purely flavor at this point)
    
      Hindu (ॐ)
      
      Chinese (☯)
      
      Shinto (π)
      
      Norse (☇)
      
      Egyptian (☥)
      
      Greek (☿)
      
      Animist (☀)
      
      Leader-Worship (☟)

Commerce

  (NOTE: These all should tie into commerce.)
  
  Education
  
  Espionage
  
  Research