# 🏠 The Art of CORE
## Welcome to the Official CORE Documentation 📚

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

### 4. Start Developing 💻
> [!INFO]
> After running make again you might have to reload the visualizer page for it to work!
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

	ft_create_type_id(UNIT_WARRIOR); // try to create a warrior

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

<button onclick="inDepthTutorial()" id="in-depth">Check out the in-depth tutorial for the library</button>

# [📚 Standard Library](./standard-library/README.md)

# [👥 Units](./units/README.md)

# [❓ FAQ](../faq.md)

