# 📚 Standard Library

## 🛠 Functions Overview

### ⚙️ `void ft_init_con(char *team_name, int *argc, char **argv);`
Initializes the connection to the game server.

---

### ❌ `void ft_close_con();`
Closes the connection to the game server.

---

### 🐞 `void ft_enable_debug();`
Enables debug mode, allowing you to see additional info in the console such as:
- Both teams
- Units
- And more...

---

### 🔄 `void ft_loop(void (*ft_init_func)(void *ptr), void (*ft_user_loop)(void *ptr), void *ptr);`
Registers the user loop function, which is called approximately 50 times per second. This is where you can place your bot's main logic.

---

### 🏅 `t_team *ft_get_my_team();`
Returns a reference to your team’s struct, allowing you to access all its information.

---

### 🥇 `t_team *ft_get_first_opponent_team();`
Returns a reference to the first opponent team's struct.

---

### 🏰 `t_obj *ft_get_my_core();`
Returns a reference to your core’s struct.

---

### 🏴‍☠️ `t_obj *ft_get_first_opponent_core();`
Returns a reference to the core of the first opponent.

---

### 🎯 `t_obj *ft_get_nearest_core(t_obj *obj);`
Returns a reference to the closest core from `t_obj *obj`'s position.

---

### 👥 `t_obj **ft_get_my_units();`
Returns a null-terminated array of pointers to your team's units.

---

### 👥 `t_obj **ft_get_opponent_units();`
Returns a null-terminated array of pointers to all opponent units.

---

### 🔍 `t_obj *ft_get_nearest_unit(t_obj *unit);`
Returns a reference to the closest unit to `t_obj *unit` (can be from your team).

---

### 🔍 `t_obj *ft_get_nearest_opponent_unit(t_obj *unit);`
Returns a reference to the closest opponent unit to `t_obj *unit` (cannot be from your team).

---

### 🌾 `t_obj *ft_get_nearest_resource(t_obj *unit);`
Returns a reference to the closest resource to `t_obj *unit`.

---

### 🛠️ `t_unit_config *ft_get_unit_config(t_unit_type type);`
Returns the configuration of a unit based on its type.

---

### 📏 `double ft_distance(t_obj *obj1, t_obj *obj2);`
Calculates the distance between `t_obj *obj1` and `t_obj *obj2` on the playing field.

---

### 🚶‍♂️ `void ft_travel_to_id(unsigned long id, unsigned long x, unsigned long y);`
Commands a unit to travel to a specific coordinate based on the unit’s ID.

Takes:
- `id`: Unit's ID.
- `x`: Destination X-coordinate.
- `y`: Destination Y-coordinate.

---

### 🚶‍♀️ `void ft_travel_to(t_obj *unit, unsigned long x, unsigned long y);`
Commands a unit to travel to a specific coordinate based on a unit pointer.

---

### ↔️ `void ft_travel_dir_id(unsigned long id, long x, long y);`
Commands a unit to move in a specific direction based on the unit’s ID.

---

### ↔️ `void ft_travel_dir(t_obj *unit, long x, long y);`
Commands a unit to move in a specific direction based on a unit pointer.

---

### 🎯 `void ft_travel_to_id_obj(unsigned long id, t_obj *target);`
Commands a unit to travel to another object based on the unit’s ID.

---

### 🎯 `void ft_travel_to_obj(t_obj *unit, t_obj *target);`
Commands a unit to travel to another object based on a unit pointer.

---

### 🛠️ `void ft_create_type_id(t_unit_type type_id);`
Creates a unit of a specific type based on its type ID.

---

### 🛠️ `void ft_create(t_unit_config *unit_config);`
Creates a unit of a specific type based on a unit configuration pointer.

---

### ⚔️ `void ft_attack_id(unsigned long attacker_id, unsigned long target_id);`
Commands a unit to attack another unit using their IDs.

---

### ⚔️ `void ft_attack(t_obj *attacker, t_obj *target);`
Commands a unit to attack another unit using pointers to the units.

---

### ⚔️ `void ft_travel_attack(t_obj *attacker_unit, t_obj *attack_obj);`
Commands a unit to travel to a target and attack it. Equivalent to calling `ft_travel_to_obj` and `ft_attack` sequentially.

---

### 📊 `void ft_print_status();`
Prints the current game status to the console.

---

### 🏅 `void ft_print_teams();`
Prints information about both teams, including their ID and balance.

---

### 🏰 `void ft_print_cores();`
Prints information about all cores, including their ID, team ID, coordinates, and health points.

---

### 🌾 `void ft_print_resources();`
Prints information about all resources, including their ID, value, coordinates, and health points.

---

### 👥 `void ft_print_units();`
Prints information about all units, including their ID, type ID, team ID, coordinates, and health points.

---

### 🛠️ `void print_team_config(const t_team_config *team_config);`
Prints a team’s configuration to the console.

---

### 🛠️ `void print_unit_config(const t_unit_config *unit_config);`
Prints a unit’s configuration to the console, including details such as type ID, name, cost, health, and damage.

---

### 🛠️ `void print_resource_config(const t_resource_config *resource_config);`
Prints a resource’s configuration to the console.

---

### ⚙️ `void ft_print_game_config();`
Prints the current game configuration, including game dimensions, income, core health, teams, and units.

---

### 📜 `void ft_print_all();`
Prints all available game information, including the game configuration, status, teams, cores, resources, and units.


# 📊 Data Types

Here you'll find the main data types and structures used in the game logic. These are essential for understanding how to interact with game elements, control units, and manage actions.

---

### 🏳️ `typedef enum e_status`
Defines the possible states of the game.

```c
typedef enum e_status
{
	STATUS_OK = 0,                // Game is running smoothly
	STATUS_PAUSED = 1,            // Game is currently paused
	STATUS_END = 2,               // Game has ended
	STATUS_WAIT_FOR_CLIENTS = 3   // Waiting for clients to connect
} t_status;
```

### 🏅 `typedef struct s_team`
Represents a team in the game.

```c
typedef struct s_team
{
	unsigned long id;            // Unique identifier for the team
	unsigned long balance;       // Team's current balance (used for unit creation, etc.)
} t_team;
```

*Good to know:*
- Balance is crucial for determining whether you can create new units or take certain actions. (Or just spam spawn the units but keep in mind that it's better having a logic behind buying units)

### 🔗 `typedef enum e_obj_type`
Represents the types of objects in the game.

```c
typedef enum e_obj_type
{
	OBJ_UNIT,                    // A unit (e.g., warrior, worker)
	OBJ_CORE,                    // A core (the base of a team)
	OBJ_RESOURCE                 // A resource (e.g., minerals)
} t_obj_type;
```

### 🧩 `typedef struct s_obj`
Represents an object in the game, which could be a unit, core, or resource.

```c
typedef struct s_obj
{
	t_obj_type type;             // Object type (unit, core, or resource)
	unsigned long id;            // Unique identifier
	unsigned long x, y;          // Object's coordinates
	unsigned long hp;            // Object's health points

	union {                      // Type-specific details for cores or units
		struct {
			unsigned long team_id;   // Team identifier (for cores)
		} s_core;

		struct {
			unsigned long type_id;   // Unit type identifier (for units)
			unsigned long team_id;   // Team identifier (for units)
		} s_unit;
	};
} t_obj;
```

*Good to know:*
- Cores belong to teams and are essential for the game's victory conditions (Your core has to be the last one alive to win the game).
- Units can either be workers or warriors and have specific stats like HP and position.
- Resources are critical for a team’s economic strength.

### ⚔️ `typedef enum e_unit_type`
Defines the different types of units.

```c
typedef enum e_unit_type
{
	UNIT_WARRIOR = 1,           // Combat unit
	UNIT_WORKER = 2             // Resource-gathering unit
} t_unit_type;
```

*Good to know:*
- Warriors deal damage, while workers gather resources or perform other tasks to support the team.

### 🛠️ `typedef struct s_unit_config`
Defines the configuration for units, including their stats and abilities.

```c
typedef struct s_unit_config
{
	char *name;                 // Name of the unit (e.g., "Warrior")
	t_unit_type type_id;        // Type of the unit (warrior, worker)
	unsigned long cost;         // Cost to create the unit
	unsigned long hp;           // Health points
	unsigned long dmg_core;     // Damage to cores
	unsigned long dmg_unit;     // Damage to other units
	unsigned long dmg_resource; // Damage to resources
	unsigned long max_range;    // Maximum attack range
	unsigned long min_range;    // Minimum attack range
	unsigned long speed;        // Unit movement speed
} t_unit_config;
```

*Good to know:*
- Units have specialized roles: some are better for attacking cores, while others excel at resource gathering or unit combat.

### 🏴‍☠️ `typedef struct s_team_config`
Defines the configuration of a team, including its ID and name.

```c
typedef struct s_team_config
{
	unsigned long id;           // Team's unique identifier
	char *name;                 // Name of the team
} t_team_config;
```

### 🌾 `typedef struct s_resource_config`
Defines the configuration for resources, including their health and value.

```c
typedef struct s_resource_config
{
	unsigned long type_id;      // Resource type identifier
	unsigned long hp;           // Health points of the resource
	unsigned long balance_value; // Value added to the team’s balance when collected
} t_resource_config;
```

*Good to know:*
- Resources are vital for team economy, and their balance_value increases the team’s resource pool.

### 🗺️ `typedef struct s_config`
Represents the game's configuration, containing global settings like map size and team/unit configurations.

```c
typedef struct s_config
{
	unsigned long height;        // Map height
	unsigned long width;         // Map width
	unsigned long idle_income;   // Income generated while idle
	unsigned long core_hp;       // Health points for cores
	t_team_config *teams;        // Pointer to the team configurations
	t_unit_config *units;        // Pointer to the unit configurations
	t_resource_config *resources; // Pointer to the resource configurations
} t_config;
```

### 🛠️ `typedef struct s_action_create`
Represents the action of creating a unit.

```c
typedef struct s_action_create
{
	unsigned long type_id;       // Type ID of the unit to create
} t_action_create;
```

### 🚶‍♂️ `typedef struct s_action_travel`
Represents the action of moving a unit to a specific location.

```c
typedef struct s_action_travel
{
	unsigned long id;            // ID of the unit to travel
	bool is_vector;              // Determines whether the travel is a directional move
	unsigned long x, y;          // Destination coordinates
} t_action_travel;
```

### ⚔️ `typedef struct s_action_attack`
Represents the action of a unit attacking another unit or object.

```c
typedef struct s_action_attack
{
	unsigned long attacker_id;   // ID of the attacking unit
	unsigned long target_id;     // ID of the target unit or object
} t_action_attack;
```

### 🎯 `typedef struct s_actions`
A collection of actions taken in the game.

```c
typedef struct s_actions
{
	t_action_create *creates;    // Array of create actions
	unsigned int creates_count;  // Count of create actions
	t_action_travel *travels;    // Array of travel actions
	unsigned int travels_count;  // Count of travel actions
	t_action_attack *attacks;    // Array of attack actions
	unsigned int attacks_count;  // Count of attack actions
} t_actions;
```

### 🕹️ `typedef struct s_game`
Represents the entire game state, containing everything from status to teams, cores, resources, units, and actions.

> Note: This struct is globally accessable by just typing `game`

```c
typedef struct s_game
{
	t_status status;             // Current game status (OK, Paused, End, etc.)
	t_config config;             // Game configuration (map size, teams, units, etc.)
	unsigned long my_team_id;    // ID of your team
	t_team *teams;               // Pointer to all teams in the game
	t_obj *cores;                // Pointer to all cores
	t_obj *resources;            // Pointer to all resources
	t_obj *units;                // Pointer to all units
	t_actions actions;           // List of actions (create, travel, attack)
} t_game;
```

*Good to know:*
- **t_game** is the central structure that stores everything happening in the game. Interacting with this structure gives you full access to game data like team status, units, and actions.