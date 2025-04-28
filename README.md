# 🧠 Mental Health Chat & Tracker

A calming, AI-powered space for mental wellness journaling, mood tracking, and supportive conversation.

---

## 🌟 Why This App?

Unlike legacy mental health apps, this platform uses advanced AI (OpenAI & Hugging Face) to generate empathetic, context-aware responses and track your emotional trends over time. It's designed to feel like a gentle, understanding companion—always ready to listen, encourage, and celebrate your "tiny wins."

---

## ✨ Features

- 🤖 **Empathetic AI Chat**: Vent, reflect, or just say hi—the AI responds with understanding and support.
- 📝 **Journaling with Sentiment Analysis**: Write your thoughts and get instant mood insights.
- 📊 **Emotional Trend Tracking**: Visualize your mood, stress, and energy over time.
- 🎉 **Tiny Wins & Streaks**: Celebrate small victories and build positive habits.
- 🌈 **Mood Tracker Emojis**: Log your feelings with a tap—see your emotional journey at a glance.
- 💬 **Motivational Quotes & Tips**: Get gentle nudges and encouragement throughout your experience.
- 📱 **Optional SMS Check-ins**: Stay connected with yourself via Twilio-powered reminders.
- 🔒 **Secure Authentication**: Your data is private and protected.

---

## 🛠️ Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS (with custom calming theme)
- OpenAI API (GPT-4o)
- Hugging Face API (sentiment analysis)
- Twilio (SMS check-ins)
- Prisma (SQLite)
- NextAuth.js

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- API keys for:
  - OpenAI
  - Hugging Face
  - Twilio

### Environment Variables

Create a `.env` file in the root directory with:

```env
OPENAI_API_KEY=your_openai_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Installation

```bash
git clone https://github.com/r123singh/mental-health-checker.git
cd mental-health-checker
npm install
npx prisma migrate dev
npm run dev
```

---

## 🗂️ Project Structure

- `src/app/` – Next.js app router pages
- `src/components/` – React components
- `src/lib/` – Utility functions and API integrations
- `src/types/` – TypeScript type definitions
- `prisma/` – Database schema and migrations

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

---

## 📄 License

MIT License – see the LICENSE file for details.

---

## 🌐 Links

- **GitHub:** [github.com/r123singh/mental-health-checker](https://github.com/r123singh/mental-health-checker)
- **Demo Video:** [YouTube Demo](https://youtu.be/USFvBSNsmK8)
- **Live Preview:** [mental-health-checker.vercel.app](https://mental-health-checker-r123singh-r123singhs-projects.vercel.app)

---

## 🖼️ Preview

![App Preview](./public/preview.png)

---

## 💡 Inspiration

> "You are stronger than you think." 🌟  
> "Consistent sleep is a superpower — keep up the good habits!" 😴

---

## 🧩 Visual/UX Highlights

- Mood tracker emojis: 😊 😐 😔 😴 💪
- Color-coded scorecards for mood, stress, and energy
- Gentle micro-interactions: confetti, checkmarks, and "Tiny Wins" celebrations
- Motivational banners and supportive AI tips

---

**Start your journey to better mental wellness—one check-in at a time!**
