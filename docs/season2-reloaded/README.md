# 🏠 The Art of CORE

## Welcome to the Official CORE Documentation 📚

# What is CORE?

CORE is a programming competition where you can write a bot and compete against the bots made by other people. Each of you has a base on the map called your core, which is the place you need to protect as if it is destroyed you lose.

To avoid this, you can spawn a variety of units to defend against and attack your opponent. These all have different stats, abilities and drawbacks. To spawn them, you need money.

You can receive money via idle income which you get automatically for a while at the start of the game, or by having your units attack the resources on the map. Good resource management is critical to creating a successful bot.

# 🚀 Getting Started with Your Own CORE Bot

To start building your own CORE bot, ensure you've completed the following prerequisites:

### Prerequisites

1. **Be a Registered CORE Participant/Team** ✨

   - You must be officially registered as a participant or part of a team in the CORE event (Slack).

2. **Receive Your CORE Repository Invite** 📧
   - You will receive an invite link to your dedicated CORE repository on GitHub.
   - This invite will be sent once you're registered and the event is about to begin.

## 🛠️ CORE Repository Setup Guide

Follow these steps to set up your development environment using GitHub, Docker, and Visual Studio Code.

### 1. Get access to your repo 🍴

- Once the invites are out head into you **inbox** on GitHub and accept the **invite** to your teams repository.

### 2. Clone Your Team's Repository 🖥️

> [!WARNING]
> If you want to use SSH, you have to use a terminal, that is not in the Dev Container.

- Open a terminal and run:
  ```bash
  git clone <your repo link>
  ```

### 3. After cloning, follow the guide on the README of your teams repository.

Basically it's just typing `make devcontainer` inside your cloned repo inside a terminal. But for more information check out the teams repo README.

### 4. Start Developing 💻

- Navigate to the `src/` folder inside the container (Every .c file in there should get compiled).

🎉 **You are now ready to start coding!** 😎

### Play and test against other Teams 🎮

If the default test bot is to boring and you always win, feel free to share your compiled
bot with other teams and play against them. Of course, you can't force them but it might
benefit both of you to see your bots in _real_ action.

## 📝 Example Code

Here's a simple example bot to get you started:

```c
void	ft_user_loop(void *data)
{
	(void)data;

	// get all units of own team
	t_obj **units = ft_get_my_units();

	// get the first opponent core there is
	t_obj *enemy_core = ft_get_first_opponent_core();

	ft_create_type(UNIT_WARRIOR); // try to create a warrior

	int i = 0;
	while (units[i]) // loop through every of our units
	{
		t_obj *curr = units[i];
		if (curr->s_unit.type_id == UNIT_WARRIOR) // if the unit is a warrior
		{
			t_obj *enemy = ft_get_nearest_opponent_unit(curr); // try to get the closest core to current unit
			if (enemy)
				ft_travel_attack(curr, enemy); // travel and then attack to the obj
			else
				ft_travel_attack(curr, enemy_core);
		}
		i++;
	}

	free(units);
}
```

The User Loop is called every game tick, so it's the perfect place to put your logic.

<button onclick="inDepthTutorial()" id="in-depth">Check out the in-depth tutorial for the library</button>

# Tips & Tricks

> Be careful about attacking Ghosts! Object could be uninitialized or dead, so take care not to start your full assault on a unit thats already ascended into the afterlife.

> Consider the powerful possibilities of the data field in every object! Here, you can save any data you want, allowing you to easily execute more detailed strategies and coordiante your troops efficiently! Just remember to free everything at the end.

> If you can't find a standard library function to do what you're looking for, don't sweat it! Everything there is to know about the game at the current moment can be found in `the game struct`. Get any info you want yourself!

> Be careful what you free! Some standard library functions need you to free their returned array, some don't! You never need to free anything in the game struct, and you never need to free a single `t_obj *` you haven't manually allocated yourself!

### To win the event

> Don't overcomplicate things! Simple but well-balanced bots may often reign over overcomplicated but ineffective bots.

> Play against other players as often as possible!

# Let's get started!

## [📚 Standard Library](standard-library.md)

## [👥 Unit Configs](unit-configs.md)

## [📖 Lore](lore.md)

## [❓ FAQ](faq.md)
