# 🔄 User Loop Documentation

The **User Loop** is a critical function that is called multiple times per second. It’s where you’ll write the core logic of your bot. Think of it as the main heartbeat of your bot's behavior.

If you're familiar with Unity, the `ft_user_loop` function is very similar to the **Update** function in Unity scripts. Just as Unity's Update function handles per-frame logic, the user loop manages per-cycle logic for your bot, enabling it to react and adapt in real time.

---

### 💡 How to Use the User Loop
You can implement your bot’s core behavior directly within the `ft_user_loop` function. This is where you'll define the actions, decision-making, and responses that your bot should perform continuously.

- **Core Logic**: The user loop is where you handle real-time operations and interactions.
- **Execution Speed**: Since the function runs many times per second, it’s optimized for responsive bot behavior.

---

### 📄 Example Usage
For a more detailed example on how to implement the user loop, check out the [example code](../README.md#Example-code).

---

> 💻 **Pro Tip**: Keep your logic efficient! Since the user loop is called frequently, ensuring your code runs smoothly will help avoid performance bottlenecks. 
