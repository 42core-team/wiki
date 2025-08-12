# ----- OBJECTS -----

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

## `t_obj_state`

Object state.

> Uninitialized objects should only have their type, state, data, team_id & unit_type read and set.

```c
typedef enum e_obj_state
{
	STATE_UNINITIALIZED = 1,
	STATE_ALIVE = 2,
	STATE_DEAD = 3
} t_obj_state;
```

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

## `t_pos`

Position structure for 2D coordinates

-   `x`: X coordinate
-   `y`: Y coordinate

```c
typedef struct s_pos
{
	unsigned short x;
	unsigned short y;
} t_pos;
```

## `t_obj`

Game object structure representing all entities in the game

-   `type`: Type of the obj
-   `state`: State of the obj
-   `data`: Custom data, save whatever you want here.
-   `id`: The unique id of the obj
-   `pos`: The position of the obj
-   `hp`: The current healthpoints of the obj
-   `s_core.team_id`: The id of the team that owns the core.
-   `s_core.balance`: The current balance of the core.
-   `s_unit.unit_type`: Which type of unit this is.
-   `s_unit.team_id`: The id of the team that owns the unit.
-   `s_unit.balance`: The amount of money the unit is carrying.
-   `s_unit.move_cooldown`: Countdown to the next tick the unit can move, defined by it's speed & how much it's carrying.
-   `s_resource_money.balance`: The amount of money the resource / money contains.

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

---

# ----- CONFIG -----

## `t_build_type`

Determines what a unit can build

```c
typedef enum e_build_type
{
	BUILD_TYPE_NONE = 0,
	BUILD_TYPE_WALL = 1,
	BUILD_TYPE_BOMB = 2
} t_build_type;
```

## `t_unit_config`

-   `name`: The name of the unit.
-   `unit_type`: The unit type of the unit.
-   `cost`: What the unit costs to create.
-   `hp`: How much healthpoints the unit has.
-   `dmg_core`: How much damage the unit deals to cores.
-   `dmg_unit`: How much damage the unit deals to units.
-   `dmg_resource`: How much damage the unit deals to resources.
-   `dmg_wall`: How much damage the unit deals to walls.
-   `build_type`: The units build type.
-   `baseMoveCooldown`: The time a unit waits between moves if it is not carrying money.
-   `maxMoveCooldown`: The minimum time a unit waits between moves.
-   `can_build`: Whether the unit can build walls or bombs.

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

## `t_config`

-   `gridSize`: The width & height of the map.
-   `idle_income`: How much idle income you get every second.
-   `idle_income_timeout`: How many ticks you get idle income.
-   `resource_hp`: How much healthpoints a resource has at the start of the game.
-   `resource_income`: How much income you get when you destroy a resource.
-   `money_obj_income`: How much money a money object contains.
-   `core_hp`: How much healthpoints a core has at the start of the game.
-   `initial_balance`: How much money a team starts with.
-   `wall_hp`: How much healthpoints a wall has at the start of the game.
-   `wall_build_cost`: How much it costs for a builder to build a wall.
-   `bomb_hp`: How much healthpoints a bomb has.
-   `bomb_countdown`: How many ticks a bomb takes to explode after being thrown.
-   `bomb_throw_cost`: How much it costs to throw a bomb.
-   `bomb_reach`: How big the explosion of a bomb is.
-   `bomb_damage`: How much damage a bomb does to objects hit by its explosion.
-   `units`: List of all unit types that are available in the game. NULL-terminated.

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

---

# ----- GENERAL -----

## `t_game`

Contains all the data about the game. Read it to your liking! Access it anywhere by typing `game.`

-   `elapsed_ticks`: The elapsed ticks since the game started.
-   `config`: The config contains base informations about the game that don't change like the map size and the unit types.
-   `my_team_id`: The id of the team that you are playing for. Saved in your cores team_id field.
-   `objects`: List of all objects (units, cores, resources, etc.) and their informations. NULL-terminated.

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

-   `team_name`: Name of your team
-   `argc`: Argument count from main function
-   `argv`: Arguments from main function
-   `tick_callback`: Function that will be called every game tick once new server data is available.
-   `debug`: Set to true to enable extensive logging.
-   `return`: 0 on success, another number on failure.

```c
int core_startGame(const char *team_name, int argc, char **argv, void (*tick_callback)(unsigned long), bool debug);
```

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

-   `condition`: Selection function pointer returning if the inputted object should be selected
-   `return`: Null-terminated array of selected objects or NULL if no condition is provided or no objects match the condition.

```c
t_obj **core_get_objs_customCondition(bool (*condition)(const t_obj *));
```

## `core_get_obj_customCondition_first`

Get the first object matching a custom condition.

-   `condition`: Selection function pointer returning if the inputted object should be selected
-   `return`: The first object that matches the condition or NULL if no such object exists or no condition is provided.

```c
t_obj *core_get_obj_customCondition_first(bool (*condition)(const t_obj *));
```

## `core_get_obj_customCondition_nearest`

Get the nearest object to a given position matching a custom condition.

-   `pos`: Position to search from
-   `condition`: Selection function pointer returning if the inputted object should be selected
-   `return`: The nearest object that matches the condition or NULL if no such object exists or no condition is provided.

```c
t_obj *core_get_obj_customCondition_nearest(t_pos pos, bool (*condition)(const t_obj *));
```

## `core_get_unitConfig`

Get the unit config for a specific unit type.

-   `type`: The type of unit to get the config for
-   `return`: The unit config or NULL if no such unit type or unit config exists.

```c
t_unit_config *core_get_unitConfig(t_unit_type type);
```

---

# ----- ACTION FUNCTIONS -----

> ACTION FUNCTIONS are used to perform actions in the game, like creating units, moving them, attacking, etc. Their changes are applied between ticks.

## `core_action_createUnit`

Create a new unit of specified type.
The unit will be uninitialized, meaning you can read & write only read its type, state, data, team_id & unit_type.

-   `unit_type`: The type of unit to create
-   `return`: A newly created, uninitialized unit object or NULL if the unit could not be created.

```c
t_obj *core_action_createUnit(t_unit_type unit_type);
```

## `core_action_move`

Moves a unit to a specific position.
Units can only move one tile up, down, left or right; and only if their move_cooldown is 0.

-   `unit`: The unit that should move
-   `pos`: The position where the unit should move to

```c
void core_action_move(const t_obj *unit, t_pos pos);
```

## `core_action_attack`

Attacks a target position with a unit.
Units can only attack one tile up, down, left or right; and only if their move_cooldown is 0.

-   `attacker`: The unit that should attack
-   `pos`: The position where the unit should attack

```c
void core_action_attack(const t_obj *attacker, t_pos pos);
```

## `core_action_transferMoney`

Gives money to another object or drops it on the floor.

-   `source`: The object that the money should be transferred from
-   `target_pos`: The position of the object to transfer the money to, or the non-occupied position where the money should be dropped
-   `amount`: The amount of money to transfer or drop

```c
void core_action_transferMoney(const t_obj *source, t_pos target_pos, unsigned long amount);
```

## `core_action_build`

Builds a new object.
Units can only build one tile up, down, left or right. Not all units can build, and they may build different things. Please consult config for details.

-   `builder`: The unit that should build a new object. What will be built depends on the buildType of the builder unit
-   `pos`: The position where the object should be built

```c
void core_action_build(const t_obj *builder, t_pos pos);
```

---

# ----- PRINT FUNCTIONS -----

> PRINT FUNCTIONS are used to print information about the game state to the console.

## `core_print_object`

Prints all information about the current game state of a given object.

-   `obj`: The object to print information about

```c
void core_print_object(const t_obj *obj);
```

## `core_print_objects`

Prints all objects that match a custom condition.

-   `condition`: Selection function pointer returning if the inputted object should be selected

```c
void core_print_objects(bool (*condition)(const t_obj *));
```

## `core_print_config_unit`

Prints a selected unit config.

-   `unit_type`: The type of unit to print the config for

```c
void core_print_config_unit(t_unit_type unit_type);
```

## `core_print_config`

Prints the entire game config and all unit configs

```c
void core_print_config(void);
```
