# Home
## This is the official CORE documentation

### Getting started
#### Installation
To get started to write your own CORE bot you will have to do the following:
- Be a registered CORE participant/team ([How?](Get a CORE participant))
- Have received an invite link to your CORE repository on GitHub (You will get that once you are a registered CORE participant and the event is about to start)

After you got all that you can either follow the step-by-step guide in [text-form](#text-guide) or you watch the [video guide](#video-guide)

##### Video Guide
[![Video Guide](./docs/favicon.ico)](assets/videos/quickstart-uncut.mp4 "Click to Watch the Video")
> available soon
##### Text Guide
1. Fork your CORE-Repository on GitHub
2. Clone it and open it in preferably [Visual Studio Code](https://code.visualstudio.com/)
3. Get the [Dev Container Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 
4. Start the Docker Engine
5. Then head to the bottom left of your VSCode window and click on the most bottom left icon. Once that's done a small VSCode menu should have opened where you have to click the "Reopen in Container" option and let it download and set-up everything on it's own.
6. Let it sit until it's complete and you are inside the Container Developing Area
7. To confirm that it worked open a new Terminal from inside VSCode and run the `make` command. Head to your browser of choice and type `localhost` (yes without port) into the search bar. You should see the Visualizer and in VSCode your console should be spamming "Crazy CORE Bot"
8. Once you are inside the Container Developing Area head to the `src/` folder and start coding 😎

## Example code
> Here we have a simple example bot

(INFO: the [game variable](./standard-library/README.md#DataTypes) is a global variable that has all the game information inside it)
```c
void ft_user_loop()
{
	// get my units
	t_obj **my_units = ft_get_my_units();

	// get my team
	t_team *my_team = ft_get_my_team();

	// get my core
	t_obj *my_core = ft_get_my_core();
	

	// try to spawn unit
	ft_create(game.config.units[0]);

	// loop through all of my units (the end of the array is when the unit id is 0)
	for (int i = 0; my_units[i]->id != 0; i++)
	{
		// we get the nearest core to the unit
		t_obj *other_core = ft_get_nearest_core(my_units[i]);

		// we get the nearest opponent unit to the unit
		t_obj *nearest_opp_unit = ft_get_nearest_opponent_unit(my_units[i]);

		// we don't differenciate what kind of unit we have

		// if there is still currently an enemy unit we travel to it and attack
		if (nearest_opp_unit)
		{
			ft_travel_attack(my_units[i], nearest_res);
		}
		else // otherwise we just try to attack the closest core
			ft_travel_attack(my_units[i], other_core);
	}

	// finally we free everything that was malloc'd
	free(my_units); // in this case it's only my_units because its a double pointer and double pointers are usually malloc'd here

}

```

## Standard Library
Head to the [standard library function docs](./standard-library/README.md)

## FAQ
You find the FAQ here [FAQ](./faq.md)

