# 🧵 Intertwine

A Threads.net clone with React, Node.js, MongoDB and TypeScript. I built the side project for learning how to build a full-stack web application. The app is fully responsive with the help of Chakra UI.

## 📦 Technologies

- `Vite`
- `React.js`
- `TypeScript`
- `Node.js`
- `MongoDB`
- `Chakra UI`
- `Tanstack React Query`
- `Recoil`

## 👨‍💻 Features (Because my web application is hosted on free services so most of the features APIs are rate limited)

Here's what you can do with Intertwine:

- **Create post**: You can upload picture to your post additionally to your post content.

- **Update your profile**: You can update your name, username, password, profile picture, and bio.

- **Interact with other users**: You can follow/unfollow users, like and reply to their posts.

- **Delete Post**: You can delete your posts and replies.

- **Change theme**: You can switch between dark mode and light mode.

## 👨‍🍳 The Process

I started by building the back-end of this project listing all features I want to clone from threads.net for this project. Listing all the features really helped me creating fitting schemas for MongoDB. I learned how to query nested properties and populating data in MongoDB with mongoose.

Next, I wanted to add some tweaks to the UI because I didn't want the project to look exactly the same as threads.net especially the colors. I was struggling deciding what colors I should use. I fortunately stumbled on a tool called Realtime Colors which helped picking the colors for light mode and dark mode so much easier.

Finally, I deployed both the front-end and back-end to free service on render. But there was a problem with authentication feature on my backend. Google Chrome was blocking the cookies that was sent from my authentication API because It was a third-party cookie (the "onrender.com" is a listed public suffix so cookies can’t be shared across different subdomains). I learned so much about the web in general because of this. So at first, I implemented a session-cookie authentication but after that I had to switch to JWT authentication.

## 📚 What I Learned

During this project, I've picked up important skills and a better understanding of building a full-stack web application project with TypeScript.

### 🧠 `TypeScript`:

- **New programming language**: I finally understand why it's getting so popular.

### 📝 Learning more about the web and browser in general

### 🛒 Discovering new tools:

- **Recoil**: Recoil is purely awesome and very easy to understand how it works. Global state management has never been easier.

- **Chakra UI**: Chakra UI provided a lot of great components straight out of the box and also very easy to custom them.

- **React Query**: The best tool to manage remote state and handling data from the server!

### 📈 Overall Growth:

Each part of this project helped me understand more about building apps, managing complex information, and improving user experience. It was more than just cloning one of my favorite app at the moment. It was about solving problems, learning new tools, and improving my skills for future work.

## 💭 How can it be improved?

- Add Redis for caching data. (I'm looking forward to do it in a near future)
- Add more features like updating a post, updating replies.
- Improve the UI/UX on the client side.
- Improve authentication feature.
- Improve folders structure.

## 🚦 Running the Project

To run the project in your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` in the project directory to install the required dependencies.
3. Run `npm run dev` to get the project started.
4. Open [http://localhost:5173](http://localhost:5173) (or the address shown in your console) in your web browser to view the app.

## 🔗 Live Demo Link: [Demo Link](https://intertwine.onrender.com)

## 📸 Images
![Screenshot of login page.](https://github.com/nguyenhuynhlong99/intertwine/blob/master/frontend/public/intertwine.onrender.com_auth.png)

![Screenshot of home page.](https://github.com/nguyenhuynhlong99/intertwine/blob/master/frontend/public/intertwine.onrender.com_home.png)
