# 🏠 The Art of CORE

## Welcome to the Official CORE Documentation for the Piscine Rush02 📚

# 🚀 Getting Started with Your Own CORE Bot

To start building your own CORE bot, ensure you've completed the following prerequisites:

### Prerequisites

1. **Be a Registered CORE Participant/Team** ✨

   - You must be subscribed to the normal Rush02 just like the two rushes before

2. **If you dont have a GitHub account already, you will have to create one**

3. **Login and join the Rush event (on the event tab) and create a team on the CORE website**
   > --> [coregame.de](https://coregame.de/) <--
   - You will have to invite your Rush team partners into that theam using the website so that they can access the repo.

<details>
  <summary>Where is the subject again?</summary>

https://coregame.de/rush

</details>

## 🛠️ CORE Repository Setup Guide

Follow these steps to set up your development environment create your first bot.

### 1. Once the team was created you should have a repository on GitHub 🍴

If you don't find the repository for some reason head to this organization on GitHub: https://github.com/orgs/42-core-rush-repos/repositories

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

<details>
  <summary>How does this work?</summary>

Ask your peers.. maybe they have figured it out already ;)

</details>

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

	ft_create_unit(UNIT_WARRIOR); // try to create a warrior

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

> You might also want to check out the [Rush02 Introduction Video](https://youtu.be/VzRMj81CbEk) for this Rush.

# [📚 Standard Library](standard-library/)

# [👥 Units](units/)

# [❓ FAQ](../faq.md)
