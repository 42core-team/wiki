# Standard Library

## Functions

### void ft_init_con(char \*team_name, int \*argc, char \*\*argv);
This simply initializes the connection to the game server

### void ft_close_con();
This closes the connection to the game server

### void ft_enable_debug();
Calling this function let's you see debug info inside the console
It shows stuff like:
- Both teams
- Units
...

### void ft_loop(void (\*ft_init_func)(void \*ptr), void (\*ft_user_loop)(void \*ptr), void \*ptr);
This is the function to register the userloop which is being called ~50 times a second and where you can place the logic of your bot

### t_team	\*ft_get_my_team(void);
Returns a reference to your team struct where you can access all its info

### t_team	\*ft_get_first_opponent_team(void);
Return a reference to the first oppontent team's struct

### t_obj	\*ft_get_my_core(void);
Return a referece to your core struct

### t_obj	\*ft_get_first_opponent_core(void);
Return a reference to the core of the first opponent

### t_obj	\*ft_get_nearest_core(t_obj \*obj);
Return a reference to the clostest core from `t_obj \*obj`'s position

### t_obj	\*\*ft_get_my_units(void);
Returns a null-terminated array of pointers to your teams units

### t_obj	\*\*ft_get_opponent_units(void);
Returns a null-terminated array of pointers all opponent units

### t_obj	\*ft_get_nearest_unit(t_obj \*unit);
Returns a reference to the closest unit to `t_obj \*unit` (can be team unit)

### t_obj	\*ft_get_nearest_opponent_unit(t_obj \*unit);
Returns a reference to the closest opponent unit to `t_obj \*unit` (cannot be team unit)

### t_obj	\*ft_get_nearest_resource(t_obj \*unit);
Returns a reference to the closest resource to `t_obj \*unit`

### t_unit_config	\*ft_get_unit_config(t_unit_type type);
Returns the config of a unit by it's type

### double	ft_distance(t_obj \*obj1, t_obj \*obj2);
Returns the distance between `t_obj \*obj1` and `t_obj \*obj2` on the playing field

### void ft_travel_to_id(unsigned long id, unsigned long x, unsigned long y);
Lets a unit travel to a specific coordinate. Same as ft_travel_to, besides that this function takes an id instead of a pointer to a unit.

Takes:
- id Which unit should travel.
- x To which x coordinate the unit should travel.
- y To which y coordinate the unit should travel.

### void ft_travel_to(t_obj \*unit, unsigned long x, unsigned long y);
Lets a unit travel to a specific coordinate. Same as ft_travel_to_id, besides that this function takes a pointer to a unit instead of an id.

Takes:
- unit Pointer to the unit that should travel.
- x To which x coordinate the unit should travel.
- y To which y coordinate the unit should travel.

### void ft_travel_dir_id(unsigned long id, long x, long y);
Lets a unit start to travel into a specific direction. Same as ft_travel_dir, besides that this function takes an id instead of a pointer to a unit. When x and y are both 0, the unit will stop traveling.

Takes:
- id Which unit should travel.
- x x vector of the direction the unit should travel.
- y y vector of the direction the unit should travel.

### void ft_travel_dir(t_obj \*unit, long x, long y);
Lets a unit start to travel into a specific direction. Same as ft_travel_dir_id, besides that this function takes a pointer to a unit instead of an id. When x and y are both 0, the unit will stop traveling.

Takes:
- id Which unit should travel.
- x x vector of the direction the unit should travel.
- y y vector of the direction the unit should travel.

### void ft_travel_to_id_obj(unsigned long id, t_obj \*target);
Lets a unit travel to another obj. Same as ft_travel_to_id, besides that this function takes an id instead of a pointer to a unit.

Takes:
- id Which unit should travel.
- target To which obj the unit should travel.

### void ft_travel_to_obj(t_obj \*unit, t_obj \*target);
Lets a unit travel to another obj. Same as ft_travel_to_id_obj, besides that this function takes a pointer to a unit instead of an id.

Takes:
- unit Pointer to the unit that should travel.
- target Pointer to the obj that the unit should travel to.

### void ft_create_type_id(t_unit_type type_id);
Creates a unit of a specific type. Same as ft_create, besides that this function takes an id instead of a pointer to a unit.

Takes:
- type_id Which type of unit should be created.

### void ft_create(t_unit_config \*unit_config);
Creates a unit of a specific type. Same as ft_create_type_id, besides that this function takes a pointer to a unit instead of an id.

Takes:
- unit_config Pointer to the unit config that should be created.

### void ft_attack_id(unsigned long attacker_id, unsigned long target_id);
Lets a unit attack another unit. Same as ft_attack, besides that this function takes an id instead of a pointer to a unit.

Takes:
- attacker_id Which unit should be used to attack.
- target_id Which unit should be attacked.

### void ft_attack(t_obj \*attacker, t_obj \*target);
Tell your unit by reference to attack the other unit by reference

Takes:
- attacker_unit Pointer to the unit that should be used to attack.
- target_obj Pointer to the obj that should be attacked.

### void ft_travel_attack(t_obj \*attacker_unit, t_obj \*attack_obj);
Travel and attack a target. The unit will travel to the target and attack it. Same as calling ft_travel_to_obj and ft_attack.

Takes:
- attacker_unit Pointer to the unit that should be used to attack.
- attack_obj Pointer to the unit that should be attacked.

### void ft_print_status();
Prints the current game status into stdout.

### void ft_print_teams();
Prints the current game teams with inforamtion about their id and balance into stdout.

### void ft_print_cores();
Prints the current game cores with inforamtion about their id, team_id, x, y and hp into stdout.

### void ft_print_resources();
Prints the current game resources with inforamtion about their id, value, x, y and hp into stdout.

### void ft_print_units();
Prints the current game units with inforamtion about their id, type_id, team_id, x, y and hp into stdout.

### void print_team_config(const t_team_config \*team_config);
Prints a team config with inforamtion about their id and name into stdout.

Takes:
- team_config Pointer to the team config

### void print_unit_config(const t_unit_config \*unit_config);
Prints a unit config with inforamtion about their type_id, name, cost, hp, dmg_core, dmg_unit, max_range, min_range and speed into stdout.

Takes:
- unit_config Pointer to the unit config

### void print_resource_config(const t_resource_config \*resource_config);
Prints a resource config with inforamtion about their type_id and hp into stdout.

Takes:
- unit_config Pointer to the resource config

### void ft_print_game_config();
Prints the current game config with inforamtion about their height, width, idle_income, core_hp, teams and units into stdout.

### void ft_print_all();
Prints every info about the gameconfig, status, teams, cores, resources and units into stdout.

## DataTypes

```c
typedef enum e_status
{
	STATUS_OK = 0,
	STATUS_PAUSED = 1,
	STATUS_END = 2,
	STATUS_WAIT_FOR_CLIENTS = 3
} t_status;

typedef struct s_team
{
	unsigned long id;
	unsigned long balance;
} t_team;

typedef enum e_obj_type
{
	OBJ_UNIT,
	OBJ_CORE,
	OBJ_RESOURCE
} t_obj_type;

typedef struct s_obj
{
	t_obj_type	type;

	unsigned long id;
	unsigned long x;
	unsigned long y;
	unsigned long hp;
	union {
		struct
		{
			unsigned long team_id;
		}	s_core;
		struct
		{
			unsigned long type_id;
			unsigned long team_id;
		}	s_unit;
	};
} t_obj;

typedef enum e_unit_type
{
	UNIT_WARRIOR = 1,
	UNIT_WORKER = 2
} t_unit_type;

typedef struct s_unit_config
{
	char *name;
	t_unit_type type_id;
	unsigned long cost;
	unsigned long hp;
	unsigned long dmg_core;
	unsigned long dmg_unit;
	unsigned long dmg_resource;
	unsigned long max_range;
	unsigned long min_range;
	unsigned long speed;
} t_unit_config;

typedef struct s_team_config
{
	unsigned long id;
	char *name;
} t_team_config;

typedef struct s_resource_config
{
	unsigned long type_id;
	unsigned long hp;

	unsigned long balance_value;
} t_resource_config;
typedef struct s_config
{
	unsigned long height;
	unsigned long width;
	unsigned long idle_income;
	unsigned long core_hp;
	t_team_config *teams;
	t_unit_config *units;
	t_resource_config *resources;
} t_config;

typedef struct s_action_create
{
	unsigned long type_id;
} t_action_create;

typedef struct s_action_travel
{
	unsigned long id;
	bool is_vector;
	unsigned long x;
	unsigned long y;
} t_action_travel;

typedef struct s_action_attack
{
	unsigned long attacker_id;
	unsigned long target_id;
} t_action_attack;

typedef struct s_actions
{
	t_action_create *creates;
	unsigned int creates_count;
	t_action_travel *travels;
	unsigned int travels_count;
	t_action_attack *attacks;
	unsigned int attacks_count;
} t_actions;

typedef struct s_game
{
	t_status status;
	t_config config;
	unsigned long my_team_id;
	t_team *teams;
	t_obj *cores;
	t_obj *resources;
	t_obj *units;
	t_actions actions;
} t_game;
```