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

---

## 🛠️ CORE Repository Setup Guide

Follow these steps to set up your development environment using GitHub, Docker, and Visual Studio Code.

### 1. Get access to your repo 🍴
- Once the invites are out head into you **inbox** on GitHub and accept the **invite** to your teams repository.

### 2. Clone Your Team's Repository 🖥️
> Clone with HTTP instead of SSH, so that you are able to push from inside the Container.
- Open a terminal and run:
	```bash
	git clone <your-repo-url>
	```
- After cloning, open the project in **Visual Studio Code (VSCode)**.

### 3. Install Dev Container Extension 🔧
- Install the **Dev Container Extension** for VSCode:
	- Open the extensions panel in VSCode.
	- Search for **Remote - Containers**.
	- Click **Install**.

### 4. Start Docker 🐋
- Ensure the **Docker Engine** is running on your machine. You can download Docker [here](https://www.docker.com/products/docker-desktop).

### 5. Reopen in Container 🔄
- In VSCode, head to the bottom-left corner and click the **Docker** icon (or the square icon with arrows).
- A menu will pop up. Click **Reopen in Container**.
- VSCode will automatically handle the setup and container initialization.

### 6. Wait for the Setup to Complete ⏳
- Allow VSCode to download and set up the development environment inside the container. This process may take a few minutes.

### 7. Verify the Setup ✅
- Open a terminal in VSCode and run the `make` command:
	```bash
	make
	```
- Open your browser and type `localhost` (no port number) in the address bar.
- You should see the **Visualizer** in your browser.
- In the VSCode terminal, the message **"Crazy CORE Bot"** should be printed continuously.

### 8. Start Developing 💻
- Navigate to the `src/` folder inside the container.

🎉 **You are now ready to start coding!** 😎


## 📝 Example Code
> Here's a simple example bot to get you started.

> **INFO**: The [game variable](./standard-library/README.md#DataTypes) is a global variable containing all the game information.

```c
void	ft_user_loop(void *data)
{
	(void)data;

    // get all units of own team
	t_obj **units = ft_get_my_units();

    // get the first opponent core there is
	t_obj *enemy_core = ft_get_first_opponent_core();

	ft_create_type_id(UNIT_WARRIOR); // try to create a warrior

	i = -1;
	while (units[++i]) // loop through every of our units
	{
		curr = units[i];
		if (curr->s_unit.type_id == UNIT_WARRIOR) // if the unit is a warrior
		{
			t_obj *war = ft_get_nearest_opponent_unit(curr); // try to get the closest core to current unit
			if (war)
				ft_travel_attack(curr, war); // travel and then attack to the obj
			else
				ft_traval_attack(curr, enemy_core);
		}
	}

	free(units);
}
```

# [📚 Standard Library](./standard-library/README.md)


# [❓ FAQ](./faq.md)

