# Workout Buddy

A responsive fitness tracking web application with an integrated AI personal trainer named Nero. Built with Next.js, Tailwind CSS, and Shadcn UI components.

## Overview

Workout Buddy helps you plan, track, and optimize your fitness journey. With an intuitive interface and mobile-responsive design, you can manage your workouts from any device. The standout feature is Nero, your AI-powered workout companion that provides personalized coaching, form corrections, and motivation to keep you on track.

## Features

- 🤖 **Nero AI Coach**: Your personal AI trainer that offers real-time feedback and personalized workout recommendations
- 📱 Fully responsive design that works on desktop, tablet, and mobile devices
- 🏋️ Create and customize workout routines with AI assistance
- 📊 Track your progress with visual performance metrics
- 🗓️ Schedule and manage your workout calendar
- ⏱️ Built-in workout timer and rest period tracking
- 🔄 Sync your workout data across devices
- 💬 Chat with Nero for workout advice, nutritional guidance, and motivation

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **AI Integration**: Custom-trained model for fitness coaching (Nero)
- **Natural Language Processing**: For Nero's conversational abilities
- **Deployment**: [Vercel](https://vercel.com/)

## Live Demo

Check out Workout Buddy live at: [workout-buddy-gray.vercel.app/workout-buddy](https://workout-buddy-gray.vercel.app/workout-buddy)

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kannan/workout-buddy.git
cd workout-buddy
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
workout-buddy/
├── app/
│   ├── api/         # API routes
│   ├── dashboard/   # Dashboard pages
│   ├── workout/     # Workout pages
│   ├── profile/     # User profile pages
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Home page
├── components/
│   ├── ui/          # Shadcn UI components
│   ├── workout/     # Workout-related components
│   ├── dashboard/   # Dashboard components
│   ├── nero/        # Nero AI components
│   └── shared/      # Shared components
├── lib/
│   ├── utils.ts     # Utility functions
│   ├── db.ts        # Database client
│   └── nero-ai/     # Nero AI model and logic
├── public/          # Static files
├── styles/          # Global styles
├── next.config.js   # Next.js configuration
├── tailwind.config.js # Tailwind configuration
└── package.json     # Project dependencies
```

## Screenshots

*[Add screenshots of your application here]*

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Kannan - [GitHub](https://github.com/kannanhacker123)

Project Link: [https://github.com/kannan/workout-buddy](https://github.com/kannanhacker123/workout-buddy)

Live Demo: [workout-buddy-gray.vercel.app/workout-buddy](https://workout-buddy-gray.vercel.app/workout-buddy)
