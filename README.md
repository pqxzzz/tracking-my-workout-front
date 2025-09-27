# 💪 Tracking My Workout

A comprehensive workout tracking application built with Next.js and Nest.js, designed to help you monitor your fitness journey with detailed analytics and progress tracking.
Nest.Js Repo: https://github.com/pqxzzz/tracking-my-workout-nest

## 📱 Screenshots

<img width="1512" height="771" alt="image" src="https://github.com/user-attachments/assets/667a2ecc-d4b2-4239-9cfa-554cf4414af6" />
<img width="1348" height="627" alt="image" src="https://github.com/user-attachments/assets/2be9ab1f-07f1-4f18-b203-4fed8a76daa7" />
<img width="1034" height="667" alt="image" src="https://github.com/user-attachments/assets/6978a518-f7ef-4c7a-b63c-71307ab96d48" />
<img width="1278" height="839" alt="image" src="https://github.com/user-attachments/assets/9063cc69-3e1c-4975-97d4-63f7b429ca97" />

## 🚀 Features

### 🔐 Authentication System

- **Secure Login/Register**: Complete authentication flow with form validation
- **User Management**: Profile creation and management
- **Protected Routes**: Secure access to workout data
- **Session Management**: Persistent login with token-based authentication

### 🏋️ Workout Management

- **Create Workout Sets**: Design custom workout routines with multiple exercises
- **Exercise Management**: Add, edit, and delete exercises with detailed specifications
- **Workout Logging**: Track your daily workout sessions
- **Progress Tracking**: Monitor your workout history and performance

### 📊 Weight Tracking & Analytics

- **Weight Logging**: Record your weight measurements over time
- **Progress Charts**: Visual weight progression with interactive charts
- **Analytics Dashboard**: Comprehensive view of your fitness metrics
- **Trend Analysis**: Track weight changes and patterns

### 🏆 Streak & Progress Tracking

- **Workout Streaks**: Track consecutive workout days
- **Achievement System**: Celebrate your fitness milestones
- **Progress Visualization**: Beautiful charts and graphs for data analysis
- **Goal Setting**: Set and track your fitness objectives

### 👤 Profile Management

- **Workout Customization**: Create and modify your workout routines
- **Exercise Library**: Manage your personal exercise database
- **Settings**: Customize your fitness tracking experience
- **Data Export**: Access your workout and weight data

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **State Management**: React Context + TanStack Query
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd tracking-my-workout-front
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Configure your environment variables
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── profile/           # User profile pages
│   ├── workout/           # Workout tracking pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── auth/              # Authentication components
│   ├── Weight/            # Weight tracking components
│   ├── Workout/            # Workout management components
│   ├── Profile/            # Profile management components
│   └── ui/                 # Base UI components
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── services/              # API service layer
└── lib/                   # Utility functions
```

## 🎯 Key Components

### Authentication

- **Login/Register Forms**: Secure user authentication
- **Auth Context**: Global authentication state management
- **Protected Routes**: Route protection with authentication gates

### Workout Tracking

- **TodayWorkoutInfo**: Current workout session information
- **NewDay**: Start new workout sessions
- **MostRecentWorkoutDay**: View recent workout history
- **StreakDays**: Track workout consistency

### Weight Management

- **WeightInfo**: Weight tracking dashboard
- **WeightProgressChart**: Interactive weight progression charts
- **Weight Analytics**: Comprehensive weight data analysis

### Profile & Settings

- **WorkoutTable**: Manage workout routines
- **ChangeWorkoutForm**: Create and edit workout sets
- **Exercise Management**: Add, edit, and delete exercises

## 🚀 Getting Started

1. **Register an account** or **login** to access the application
2. **Complete your profile** setup in the onboarding process
3. **Create your first workout set** with custom exercises
4. **Start logging workouts** and track your progress
5. **Monitor your weight** and view analytics
6. **Maintain your streak** and achieve your fitness goals


## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (if configured)
- **Husky**: Git hooks for code quality

## 🌟 Features in Detail

### Workout Set Management

- Create custom workout routines with multiple exercises
- Set series, repetitions, and weight for each exercise
- Organize exercises by muscle groups
- Track workout history and progress

### Weight Tracking

- Log weight measurements with timestamps
- Visual progress charts with trend analysis
- Weight goal setting and tracking
- Historical data analysis

### Streak System

- Track consecutive workout days
- Visual streak indicators
- Achievement celebrations
- Progress motivation

### Data Visualization

- Interactive charts for weight progression
- Workout frequency analytics
- Performance trend analysis
- Goal achievement tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)

---

**Start your fitness journey today!** 💪
