# Core Game C Library for Rush02 Overview

The Core game library works like this:

- You will have the information in the game struct updated between ticks. All objects will get the newest state information from the game server. Both you and your opponent have all of the available information about the game to make exact decisions about, they know the same as you about the current game state.
- You will be able to change things about the game state by executing actions. There are only 4, but don't be fooled - they are quite impactful and offer a huge variety of strategies.

---

# ----- GENERAL -----

## `t_game`

Contains all the data about the game. Read it to your liking! Access it anywhere by typing `game.`

- `elapsed_ticks`: The elapsed ticks since the game started.
- `config`: The config contains base informations about the game that don't change like the map size and the unit types.
- `my_team_id`: The id of the team that you are playing for. Saved in the team_id field of your cores and units.
- `objects`: List of all objects (units, cores, resources, etc.) and their informations. NULL-terminated.

```c
typedef struct s_game
{
	unsigned long elapsed_ticks;
	t_config config;
	unsigned long my_team_id;
	t_obj **objects;
} t_game;
```

## `game`

This variable contains all the data about the game.
It gets updated every time your function is called.

```c
extern t_game game;
```

## `core_startGame`

Starts the connection lib up, initializes the game, connects to the server & starts the game.

- `team_name`: Name of your team
- `argc`: Argument count from main function
- `argv`: Arguments from main function
- `tick_callback`: Function that will be called every game tick once new server data is available.
- `debug`: Set to true to enable extensive logging.
- `return`: 0 on success, another number on failure.

```c
int core_startGame(const char *team_name, int argc, char **argv, void (*tick_callback)(unsigned long), bool debug);
```

> **NOTE**: Do not free the central objects array or the objects themselves. They are fully handled by the library and freeing anything you're not supposed to will probably mess up your bot entirely. Functions that give you the responsibility to free the result when you call them are explicitly marked in this wiki.

---

# ----- OBJECTS -----

## `t_obj`

Game object structure representing all entities in the game

- `type`: Type of the obj
- `state`: State of the obj
- `data`: Custom data, save whatever you want here.
- `id`: The unique id of the obj
- `pos`: The position of the obj
- `hp`: The current healthpoints of the obj
- `s_core.team_id`: The id of the team that owns the core.
- `s_core.balance`: The current balance of the core.
- `s_unit.unit_type`: Which type of unit this is.
- `s_unit.team_id`: The id of the team that owns the unit.
- `s_unit.balance`: The amount of money the unit is carrying.
- `s_unit.move_cooldown`: Countdown to the next tick the unit can move, defined by it's move cooldown & how much money it's carrying.
- `s_resource_money.balance`: The amount of money the resource / money contains.

```c
typedef struct s_obj
{
	t_obj_type type;
	t_obj_state state;
	void *data;
	unsigned long id;
	t_pos pos;
	unsigned long hp;
	union
	{
		struct
		{
			unsigned long team_id;
			unsigned long balance;
		} s_core;
		struct
		{
			unsigned long unit_type;
			unsigned long team_id;
			unsigned long balance;
			unsigned long move_cooldown;
		} s_unit;
		struct
		{
			unsigned long balance;
		} s_resource_money;
	};
} t_obj;
```

> **TIP**: The `void *data` field is especially powerful. The library will never touch this field, it's yours to mess with for whatever you want, and it can already safely be set when a unit is still uninitialized, so immediately after unit creation, in the same tick. It's generally used to store specific jobs, tasks or targets of the unit in the easiest way possible.

## `t_obj_type`

Type of object

```c
typedef enum e_obj_type
{
	OBJ_CORE,
	OBJ_UNIT,
	OBJ_RESOURCE,
	OBJ_WALL,
	OBJ_MONEY
} t_obj_type;
```

- **Cores**: Your team's central hub. When your's is destroyed, you lose, when you destroy your opponents, you win. Also used to spawn new units if it has enough money. And it is the namesake of CORE GAME. There will only ever be one core per team.
- **Unit**: Your pawns, used to execute all the things you want to do in the game. Except for core_action_createUnit, all actions in the game are executed by units.
- **Resource**: Money encased in stone. Use a miner to mine it, making the balance drop as a money object. Will generally have a significantly higher balance than money objects spawning normally.
- **Money**: It's there to be in your way. Walk around it or mine through it.
- **Money**: Balance lying around on the floor. Just walk onto the same space using core_action_move and your unit will be holding the money in no time, ready to deliver it back to your core.

## `t_obj_state`

Object state.

```c
typedef enum e_obj_state
{
    STATE_UNINITIALIZED = 1,
	STATE_ALIVE = 2,
	STATE_DEAD = 3
} t_obj_state;
```

> Uninitialized objects should only have their type, state, data, team_id & unit_type read and set.

> Be careful to verify that a unit is alive before executing an action it. Otherwise, the action will fail.

> **TIP**: Why are uninitialized units even a thing? Because even though when you call `core_action_createUnit` the unit will have a delay of one tick until it can spawn, the memory position will still stay consistent. You can therefore already give the unit a specific task / job.

> **TIP**: Why are dead units a thing? So you can free the things you've allocated in your objects `void *data` field and other places before the program ends, preventing memory leaks.

## `t_unit_type`

Type of unit.

```c
typedef enum e_unit_type
{
	UNIT_WARRIOR = 0,
	UNIT_MINER = 1,
	UNIT_CARRIER = 2
} t_unit_type;
```

- **UNIT_WARRIOR** - Does a lot of damage when used to attack units and cores.
- **UNIT_MINER** - The quickest unit at mining resources.
- **UNIT_CARRIER** - The quickest unit by far, and the unit that does not get slowed down when it is carrying money.

## `t_pos`

Position structure for 2D coordinates

- `x`: X coordinate
- `y`: Y coordinate

```c
typedef struct s_pos
{
	unsigned short x;
	unsigned short y;
} t_pos;
```

> Positions are 0-indexed, so position [0,0] and (assuming a gridSize of 20 in the config) [19, 19] are valid positions, but [-1,-1] and [20,20] are not.

> There can never be two objects at the same position. To check whether there is something at a given position, use `core_get_obj_from_pos()`.

---

# ----- ACTION FUNCTIONS -----

> ACTION FUNCTIONS are used to perform actions in the game, like creating units, moving them, attacking, etc. Their changes are applied between ticks.

## `core_action_createUnit`

Create a new unit of specified type.
The unit will be uninitialized, meaning you can read & write only read its type, state, data, team_id & unit_type.

- `unit_type`: The type of unit to create
- `return`: A newly created, uninitialized unit object or NULL if the unit could not be created.

```c
t_obj *core_action_createUnit(t_unit_type unit_type);
```

## `core_action_move`

Moves a unit to a specific position.
Units can only move one tile up, down, left or right; and only if their move_cooldown is 0.

- `unit`: The unit that should move
- `pos`: The position where the unit should move to

```c
void core_action_move(const t_obj *unit, t_pos pos);
```

## `core_action_attack`

Attacks a target position with a unit.
Units can only attack one tile up, down, left or right; and only if their move_cooldown is 0.

- `attacker`: The unit that should attack
- `pos`: The position where the unit should attack

```c
void core_action_attack(const t_obj *attacker, t_pos pos);
```

> This action is used to damage any object, like for destroying resources as well. It will not work on money objects, they need to be stepped on to be picked up.

> **TIP**: There is friendly fire - you can damage your own units and core. So be careful!

## `core_action_transferMoney`

Gives money to another object or drops it on the floor.

- `source`: The object that the money should be transferred from
- `target_pos`: The position of the object to transfer the money to, or the non-occupied position where the money should be dropped
- `amount`: The amount of money to transfer or drop

```c
void core_action_transferMoney(const t_obj *source, t_pos target_pos, unsigned long amount);
```

> **NOTE**: But what if my core is surrounded by units? How will I get money to it? -> The transferMoney action will work back and forth between a unit and its core provided the unit is at the closest possible unoccupied position to its core. If the core is surrounded, the unit must simply get as close as possible for this action to work then, as determined by a floodfill algorithm and the manhattan distance.

---

# ----- GETTER FUNCTIONS -----

> GETTER FUNCTIONS are used to get information about the current game state.

## `core_get_obj_from_id`

Get any object based on its id.
The object or NULL if no such object exists.

```c
t_obj *core_get_obj_from_id(unsigned long id);
```

## `core_get_obj_from_pos`

Get any object based on its position.
The object at the position or NULL if no such object exists.

```c
t_obj *core_get_obj_from_pos(t_pos pos);
```

## `core_get_objs_customCondition`

Get all objects matching a custom condition.

- `condition`: Selection function pointer returning if the inputted object should be selected
- `return`: Null-terminated array of selected objects or NULL if no condition is provided or no objects match the condition.

```c
t_obj **core_get_objs_customCondition(bool (*condition)(const t_obj *));
```

> **WARNING**: You are responsibility to free the array returned by this function, but not the objects in it themselves, they are the same object instances as in the `game.objects` array.

## `core_get_obj_customCondition_first`

Get the first object matching a custom condition.

- `condition`: Selection function pointer returning if the inputted object should be selected
- `return`: The first object that matches the condition or NULL if no such object exists or no condition is provided.

```c
t_obj *core_get_obj_customCondition_first(bool (*condition)(const t_obj *));
```

> **TIP**: Why is this useful? - Because you won't need an array if you want any instance of an object, regardless of which one specifically. Like when getting your own core.

## `core_get_obj_customCondition_nearest`

Get the nearest object to a given position matching a custom condition.

- `pos`: Position to search from
- `condition`: Selection function pointer returning if the inputted object should be selected
- `return`: The nearest object that matches the condition or NULL if no such object exists or no condition is provided.

```c
t_obj *core_get_obj_customCondition_nearest(t_pos pos, bool (*condition)(const t_obj *));
```

## `core_get_unitConfig`

Get the unit config for a specific unit type.

- `type`: The type of unit to get the config for
- `return`: The unit config or NULL if no such unit type or unit config exists.

```c
t_unit_config *core_get_unitConfig(t_unit_type type);
```

---

# ----- PRINT FUNCTIONS -----

> PRINT FUNCTIONS are used to print information about the game state to the console.

## `core_print_object`

Prints all information about the current game state of a given object.

- `obj`: The object to print information about

```c
void core_print_object(const t_obj *obj);
```

## `core_print_objects`

Prints all objects that match a custom condition.

- `condition`: Selection function pointer returning if the inputted object should be selected

```c
void core_print_objects(bool (*condition)(const t_obj *));
```

## `core_print_config_unit`

Prints a selected unit config.

- `unit_type`: The type of unit to print the config for

```c
void core_print_config_unit(t_unit_type unit_type);
```

## `core_print_config`

Prints the entire game config and all unit configs

```c
void core_print_config(void);
```

---

# ----- CONFIG -----

> **TIP**: Check out the `configs/` folder and look at the values set in the config for your current game. You can even edit them - but it won't make a difference what you put in the final evaluation and tournament. It's just fun to play around with.

## `t_unit_config`

- `name`: The name of the unit.
- `unit_type`: The unit type of the unit.
- `cost`: What the unit costs to create.
- `hp`: How much healthpoints the unit has.
- `dmg_core`: How much damage the unit deals to cores.
- `dmg_unit`: How much damage the unit deals to units.
- `dmg_resource`: How much damage the unit deals to resources.
- `dmg_wall`: How much damage the unit deals to walls.
- `build_type`: The units build type.
- `baseMoveCooldown`: The time a unit waits between moves if it is not carrying any money.
- `maxMoveCooldown`: The maximum boundary of a units wait time between moves if it's carrying a ton of money.
- `can_build`: Whether the unit can build walls or bombs.

```c
typedef struct s_unit_config
{
	char *name;
	t_unit_type unit_type;
	unsigned long cost;
	unsigned long hp;
	unsigned long dmg_core;
	unsigned long dmg_unit;
	unsigned long dmg_resource;
	unsigned long dmg_wall;
	t_build_type build_type;
	unsigned long baseMoveCooldown;
	unsigned long maxMoveCooldown;
	bool can_build;
} t_unit_config;
```

> **NOTE**: Building won't be within the scope of this Rush, so don't worry about constructing walls or blowing things up with bombs.

## `t_config`

- `gridSize`: The width & height of the map. It's always square.
- `idle_income`: How much idle income you get every second.
- `idle_income_timeout`: How many ticks you get idle income.
- `resource_hp`: How much healthpoints a resource has at the start of the game.
- `resource_income`: A money object with what balance the resource will drop at its previous position when it is destroyed.
- `money_obj_income`: How much money a money object contains.
- `core_hp`: How much healthpoints a core has at the start of the game.
- `initial_balance`: How much money in their core a team starts with.
- `wall_hp`: How many healthpoints a wall has at the start of the game.
- `wall_build_cost`: How much it costs for a builder to build a wall.
- `bomb_hp`: How many healthpoints a bomb has.
- `bomb_countdown`: How many ticks a bomb takes to explode after being thrown.
- `bomb_throw_cost`: How much it costs to throw a bomb.
- `bomb_reach`: How big the explosion of a bomb is. (Plus-shaped, like amazing bomberman. This value describes the radius.)
- `bomb_damage`: How much damage a bomb does to objects hit by its explosion.
- `units`: List of all unit types that are available in the game. NULL-terminated.

```c
typedef struct s_config
{
	unsigned long gridSize;
	unsigned long idle_income;
	unsigned long idle_income_timeout;
	unsigned long resource_hp;
	unsigned long resource_income;
	unsigned long money_obj_income;
	unsigned long core_hp;
	unsigned long initial_balance;
	unsigned long wall_hp;
	unsigned long wall_build_cost;
	unsigned long bomb_hp;
	unsigned long bomb_countdown;
	unsigned long bomb_throw_cost;
	unsigned long bomb_reach;
	unsigned long bomb_damage;
	t_unit_config **units;
} t_config;
```
