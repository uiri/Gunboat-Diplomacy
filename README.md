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
    Make conquer other players' cities
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
    Missile
    Fanatic - one per player, good attack and defense, special ability from religion
Politics system
  Different categories for choices:
    Politics
      Autocracy (♔) - faster transitions, faster military recruitment
      Republic (✍) - slight commerce bonus
      Democracy (☑) - more loyalty, enemy loyalty decreases faster
    Society
      Libertarian (☮ + assault rifle) - more education, less espionage
      Tolerant (✌ + gavel) - slight education bonus
      Conservative (fasces) - less education, more espionage
    Capital
      Syndicalist (Ⓐ) - lower production cost, more resource costs
      Decentralized (☍) - no effect
      Capitalist ($) - more research, less health
    Economy (NOTE: will be elaborated later)
      Planned (☭)
      Mixed (☊)
      Market (scales)
    Religion
      Free Religion (☪☸xis☩) - increased education
      Theocracy (♗) - decreased research, increased loyalty
      State Atheism (⚛) - increased research, decreased loyalty
  Players choose from presets at first
    Constitutional Monarchy - tolerant, decentralized, mixed economy, free religion, republic.
    Warlord Barracks State - conservative, decentralized, planned economy, theocracy, autocracy.
    Libertarian Democracy - libertarian, capitalist, free markey, free religion, democracy.
    Communist Dictatorship - tolerant, syndicalist, planned economy, state atheism, autocracy.
    Social Democracy - libertarian, syndicalist, planned economy, free religion, democracy.
  Transitions available with School or Autocracy
Religion
  Major Religions
    With Theocracy
      Morale bonus against opposing religions
      Allows city religion programs (+1 level to buildings for every 20% of the population in the state religion)
        Almsgiving - Warehouse
        Asceticism - Hospital
        Study - School
        Pilgrimage - Transportation
        Holy Defense - Fortification
      Double bonus attack against Pagan, State Atheist players
    With Free Religion
      If attacking player has state religion, bonus loyalty for population NOT in that religion
      Allows choice between Fanatic types
    Religions:
      Orthodox (☦)
        Holy city: Constantinopolis
        Fanatic: Varagnian (bonus for Artillery)
      Catholic (✝)
        Holy city: Roma
        Fanatic: Crusader (bonus for Tanks)
      Protestant (✞)
        Holy city: Canterbury
        Fanatic: Puritan (bonus for Fixed Guns)
      Sunni (☪)
        Holy city: Mecca
        Fanatic: Mujahadin (bonus for Militia)
      Shia (☫)
        Holy city: Qom
        Fanatic: Assassin (bonus for espionage)
      Buddhist (☸)
        Holy city: Lopburi
        Fanatic: Shaolin (bonus for Infantry)
      Sikh (☬)
        Holy city: Amritsar
        Fanatic: Punjabi (bonus for Marines)
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
Commerce
  (NOTE: These all should tie into commerce.)
  Trade Routes
  Espionage
  Research