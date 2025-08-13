# 🏠 The Art of CORE

## Welcome to the Official CORE Documentation for the Piscine Rush02 📚

# 🚀 Getting Started with Your Own CORE Bot

> This video contains all the setup info with visuals and an explanation to get you started. It's highly recommended you watch it to make your life easy: https://www.youtube.com/watch?v=4uL3Xc1C4x8

<details>

<summary>But if you don't like the video, here are the same setup instructions in text form.</summary>

To start building your own CORE bot, ensure you've completed the following prerequisites:

### Prerequisites

1. **Be a Registered CORE Participant/Team** ✨

   - You must be subscribed to the normal Rush02 just like the two rushes before

2. **If you dont have a GitHub account already, you will have to create one**

3. **Login and join the Rush event (on the event tab) and create a team on the CORE website**
   > --> [coregame.de](https://coregame.de/) <--
   - You will have to invite your Rush team partners into that theam using the website so that they can access the repo.
   - The team name must be the name of the intra teams team leader.

<details>
  <summary>Where is the subject again?</summary>

https://coregame.de/rush

</details>

## 🛠️ CORE Repository Setup Guide

Follow these steps to set up your development environment create your first bot.

### 1. Once the team was created you should have a repository on GitHub 🍴

It will be linked on the page of your team on the Core Website.

### 2. Clone Your Team's Repository 🖥️

> It is vital that you clone via ssh, not https.

- Open a terminal and run:
  ```bash
  git clone <your repo link>
  ```

### 3. After cloning, follow the guide on the README of your teams repository.

Basically it's just typing `make devcontainer` inside your cloned repo inside a terminal. But for more information check out the teams repo README.

You must set the name of your bot in the main function of src/main.c to your intra teams team leader intra name as well.

### 4. Start Developing 💻

- Navigate to the `src/` folder inside the container (Every .c file in there should get compiled).

🎉 **You are now ready to start coding!** 😎
</details>

### Play and test against other Teams 🎮

If the default test bot is to boring and you always win, feel free to share your compiled
bot with other teams and play against them. Of course, you can't force them but it might
benefit both of you to see your bots in _real_ action.

There are two ways to play against others:

1. Push your code and go on the website - There is a queue. If you and another team enter it, a match between you will start.
2. Have others send you their code or executable, and have a look at the Makefile to see how the game is executed - tweak the right make rule to execute the other teams bot instead of gridmaster.

## 📝 Example Code

Your code will be written in src/ and inc/, but you can also see gridmaster/ - your default enemy that will probably crush you the first time you run the program. You can have a look at its code and understand how it works as a starting off point.
