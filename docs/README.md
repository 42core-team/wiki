# 🏠 The Art of CORE
## Welcome to the Official CORE Documentation 📚

# 🚀 Getting Started with Your Own CORE Bot

To start building your own CORE bot, ensure you've completed the following prerequisites:

### Prerequisites
1. **Be a Registered CORE Participant/Team** ✨
   - You must be officially registered as a participant or part of a team in the CORE event.
   - Learn how to register here: [How to become a CORE participant](Get a CORE participant).

2. **Receive Your CORE Repository Invite** 📧
   - You will receive an invite link to your dedicated CORE repository on GitHub.
   - This invite will be sent once you're registered and the event is about to begin.

---

### What's Next? 🔜

Once you've completed the steps above, you can move forward with your bot development setup:
- **Follow the [Text Guide](#text-guide)** for detailed, step-by-step instructions.
- **Watch the [Video Guide](#video-guide)** if you prefer learning visually.

> 💡 Happy coding and good luck with your CORE bot project!

---

## 🎥 Video Guide
[![Video Guide](./docs/favicon.ico)](assets/videos/quickstart-uncut.mp4 "Click to Watch the Video")
> **Note**: Video guide will be available soon. 

---

## 🛠️ CORE Repository Setup Guide

Follow these steps to set up your development environment using GitHub, Docker, and Visual Studio Code.

### 1. Get access to your repo 🍴
- Once the invites are out head into you **inbox** on GitHub and accept the **invite** to your teams repository.

### 2. Clone Your Team's Repository 🖥️
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
void ft_user_loop()
{
    // Get my units
    t_obj **my_units = ft_get_my_units();

    // Get my team
    t_team *my_team = ft_get_my_team();

    // Get my core
    t_obj *my_core = ft_get_my_core();

    // Try to spawn a unit
    ft_create(game.config.units[0]);

    // Loop through all of my units (the end of the array is when the unit id is 0)
    for (int i = 0; my_units[i]->id != 0; i++)
    {
        // Get the nearest core to the unit
        t_obj *other_core = ft_get_nearest_core(my_units[i]);

        // Get the nearest opponent unit to the unit
        t_obj *nearest_opp_unit = ft_get_nearest_opponent_unit(my_units[i]);

        // If there is an enemy unit nearby, travel to it and attack
        if (nearest_opp_unit)
        {
            ft_travel_attack(my_units[i], nearest_opp_unit);
        }
        else // Otherwise, attack the closest core
        {
            ft_travel_attack(my_units[i], other_core);
        }
    }

    // Free any allocated memory (here, only my_units because it's a double pointer)
    free(my_units);
}
```

# [📚 Standard Library](./standard-library/README.md)


# [❓ FAQ](./faq.md)

