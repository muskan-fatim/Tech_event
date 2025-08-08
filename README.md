# 🔐 Tech_Event

![GSSoC Logo](Tech_event/public/gssoc%20logo.png)

🌐 Visit the website to explore real-world projects, filter by tech stack, and discover new ideas!

---

<h2 align="center"> 📅 One-Page Next.js Website with CSV Data Handling </h2> 

## 🌟 Overview
This is a single-page web application built with **Next.js**, where all event logic is handled via API routes. The app reads from a **CSV file**, displays upcoming tech events, and lets users add new ones dynamically.

## 🌸 GirlScript Summer of Code 2025
> 💬 **This project is proudly part of GSSoC '25!**
> Thanks to the amazing open-source community, contributors, and mentors for your valuable support.
> Contributions are welcome from GSSoC contributors and open-source enthusiasts!

---
 <a href="https://github.com/muskan-fatim/Tech_event/issues"><strong>🐛 Report a Bug</strong></a>

  <a href="https://github.com/muskan-fatim/Tech_event/issues"><strong>✨ Request a Feature</strong></a>

## 🔧 Features
- 📡 **API-Based Data Fetching**: Fetch and update event data via custom API routes.
- 📁 **CSV Data Management**: Read/write event info using `fs` and `papaparse`.
- 🔍 **Search Functionality**: Filter events by event name.
- ⚡ **Real-Time Updates**: Events update without a full-page refresh.
- 🚀 **Fast UI**: Built with Tailwind CSS and efficient state management.

## 🛠️ Tech Stack
- **Next.js**
- **React**
- **Tailwind CSS**
- **Papaparse**
- **Node.js fs module**

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js (>= 16.x)
- npm or yarn

---

## 📥 Submitting a Pull Request

We welcome contributions as part of GirlScript Summer of Code 2025 (GSSoC'25) and beyond!

Follow these steps to contribute your changes to **DevDisplay**:

1. **🌟 Star & Fork the Repository**  
   Click the **“Star”** button to support the project, then **“Fork”** the repo to create your own copy:  
   👉 [https://github.com/muskan-fatim/Tech_event.git](https://github.com/muskan-fatim/Tech_event.git)

2. **📥 Clone Your Fork**  
   Use the following command to clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/Your-Username/Tech_event.git
   ```
 3. Create a Branch
    Navigate to the project directory and create a new branch for your changes:

    ```bash
    cd Tech_event
    git checkout -b my-feature-branch
    ```

 4. Make Changes
    Add your new ML projects, games, websites, or enhancements. Fix bugs or improve UI/UX as needed.

 5. Commit Your Changes
    Use a meaningful commit message:

    ```bash
    git add .
    git commit -m "📦 [Feature Add] Add XYZ website project"
    ```

 6. Push Your Changes
    Push your branch to your GitHub fork:

    ```bash
    git push origin my-feature-branch
    ```

 7. Submit a Pull Request

    Go to your fork on GitHub.
    
    Click "Compare & pull request".

    Add a descriptive title using one of the prefixes: [UI], [UX], [Feature Add].

    Link the related issue (if any) and clearly describe your changes.

---

> 💡 Good first issues are labeled under [`gssoc`](https://github.com/muskan-fatim/Tech_event/labels/gssoc)

---

### 🧭 Steps to Run the Project

```bash
# 1. Clone the repository
git clone https://github.com/muskan-fatim/Tech_event.git
cd Tech_event

# 2. Install dependencies
npm install  # or yarn install

# 3. Start the development server
npm run dev  # or yarn dev
````

Visit [`http://localhost:3000`](http://localhost:3000) in your browser to see the app live.

---

📂 Explore the Project Directory Structure

```bash

Tech_event/
├── .gitignore
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── README.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json                    #implied by npm/yarn references
├── public/                         #implied by Next.js standard structure
├── app/
│   ├── layout.tsx                  #implied by Next.js app router structur
│   ├── page.tsx                    #main page component
│   └── ...other Next.js app router files
├── components/                     #custom React components
│   └── ...component files
├── pages/
│   ├── api/                        #API routes
│   │   └── ...API route handlers
│   └── ...other page files         #if using pages router alongside app router
├── styles/                         #implied by Tailwind CSS usage
│   └── globals.css
├── data/                           #implied by CSV handling
│   └── events.csv                  #data file mentioned in README
├── node_modules/                   #ignored in .gitignore
└── .next/                          #ignored in .gitignore - Next.js build output
```

---
## 🙌 Contributors

Thanks to these amazing people who have contributed to the **Tech_event** project:

<!-- readme: contributors -start -->
<p align="center">
    <img src="https://api.vaunt.dev/v1/github/entities/muskan-fatim/repositories/Tech_event/contributors?format=svg&limit=54" width="1000" />
</p>
<!-- readme: contributors -end -->

---
## 📬 Contact

Have ideas, feedback, or just want to say hi?

Reach out on Twitter [@mushiiFatima](https://twitter.com/mushiiFatima) or drop an issue to get involved.

---
## 💡 Suggestions & Feedback

Feel free to open issues or discussions if you have any feedback, feature suggestions, or want to collaborate!

---
## 📜 Code of Conduct

To ensure a welcoming and inclusive environment, we have a Code of Conduct that all contributors are expected to follow. In short: **Be respectful, be kind, and be collaborative.** Please read the full [Code of Conduct](https://github.com/muskan-fatim/Tech_event/blob/main/CODE_OF_CONDUCT.md) before participating.

---
## 📄 License

This project is licensed under the [MIT License](https://github.com/muskan-fatim/Tech_event/blob/main/LICENSE).

---
Thank you again for your interest. We can't wait to see what you build with us! ❤️❤️

---
**#GSSoC25 #OpenSource #WomenInTech #NextJS #TechEvents**