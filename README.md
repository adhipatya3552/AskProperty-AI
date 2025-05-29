# 🏠 AskProperty AI

## 🤖 Project Overview

**AskProperty AI** is an interactive, single-page real estate chatbot application built with React, TypeScript, Vite, and Tailwind CSS. It guides users through a step-by-step conversational flow—collecting location, land size, and budget—to recommend matching properties from a predefined sample dataset or via an API. The platform also visualizes market insights and agent contact details, making property discovery seamless for buyers, renters, and investors.

---

## ✨ Key Features

1. 🗣️ **Conversational Chatbot**

   * Multi-step dialogue (`intro → city → size → budget → results → connection → final`) manages user input and context.
2. 📍 **Location Input**

   * Users enter city or neighborhood to filter property suggestions.
3. 📏 **Land Size Filtering**

   * Specify land size (in acres) to narrow results.
4. 💰 **Budget Range**

   * Input maximum budget (INR) for tailored matches.
5. 🏘️ **Sample & API Data**

   * Preloaded `sampleProperties` array with location, size, price, seller, contact.
   * `getChatResponse` service stub simulates OpenRouter/OpenAI API calls.
6. 📊 **Market Insights**

   * Summary cards and charts (via Recharts) display price trends and comparisons.
7. 🔌 **Extensible Service Layer**

   * `src/services/chatService.ts` for real API integration.
8. 🌐 **Responsive Design**

   * Mobile-first layout styled with Tailwind CSS.
9. 🎨 **Particle Background**

   * `tsparticles` for interactive decorative effects.

---

## 🛠 Tech Stack

* **Framework**: React + TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **Icons**: lucide-react
* **Background Effects**: tsparticles
* **Charting**: Recharts (via `src/components/StatsChart.tsx`)
* **State & Forms**: React `useState`, `useEffect`, and `useContext`
* **API Layer**: Fetch-based service in `src/services/chatService.ts`
* **Routing**: Single-page application (no router)

---

## 📂 Folder Structure

```bash
askproperty-ai/
├── .gitignore
├── index.html             # HTML template with meta tags and root div
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite configuration
├── postcss.config.js      # PostCSS for Tailwind
├── tailwind.config.js     # Tailwind CSS settings
├── src/
│   ├── main.tsx           # React entrypoint
│   ├── index.css          # Tailwind base imports
│   ├── App.tsx            # App component orchestrating layout and Chatbot
│   ├── components/        # UI modules:
│   │   ├── Header.tsx     # Landing and navigation header
│   │   ├── Chatbot.tsx    # Conversational chatbot UI
│   │   ├── About.tsx      # About section
│   │   ├── Contact.tsx    # Contact form
│   │   ├── StatsChart.tsx # Chart component for market insights
│   │   └── Footer.tsx     # Site footer
│   ├── services/          # API and chat service
│   │   └── chatService.ts
│   ├── types/             # Shared TypeScript interfaces
│   │   └── property.ts
│   └── context/           # React context for modals and UI state
│       └── ModalsContext.tsx
│
```

---

## 🚀 Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/adhipatya3552/askproperty-ai.git
   cd askproperty-ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run Locally**

   ```bash
   npm run dev
   ```

   Open: `http://localhost:5173`

---

## 🎯 Usage Guide

1. **Welcome Prompt**: Click "Start Chat" to begin the conversation.
2. **Step-by-Step Flow**:

   * Provide your city or neighborhood.
   * Enter desired land size.
   * Specify your budget.
3. **View Results**: The chatbot shows matching properties with details.
4. **Next Steps**: Option to connect with seller or request more insights.

---

## 🔧 Customization & Extensibility

* **Real API Integration**: Update `getChatResponse` in `src/services/chatService.ts` with actual LLM or backend endpoints.
* **Dataset**: Replace `sampleProperties` in `Chatbot.tsx` or fetch from real estate APIs.
* **Styling**: Tweak Tailwind config or component classes in `src/index.css` and JSX files.
* **Add Routing**: Integrate React Router for multi-page flows (e.g., dashboard, profile pages).
* **Analytics**: Plug in Google Analytics or Plausible via `index.html`.

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork this repository.
2. Create a branch:

   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add feature description"
   ```
4. Push to GitHub:

   ```bash
   git push origin feature/YourFeature
   ```
5. Open a Pull Request describing your improvements.
