import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'alex.johnson',
        email: 'alex.johnson@example.com',
        displayName: 'Alex Johnson',
        profile: { age: 28, fitnessLevel: 'intermediate', goals: ['strength', 'endurance'] },
      },
      {
        username: 'jamie.lee',
        email: 'jamie.lee@example.com',
        displayName: 'Jamie Lee',
        profile: { age: 34, fitnessLevel: 'beginner', goals: ['mobility', 'consistency'] },
      },
      {
        username: 'taylor.smith',
        email: 'taylor.smith@example.com',
        displayName: 'Taylor Smith',
        profile: { age: 25, fitnessLevel: 'advanced', goals: ['performance', 'endurance'] },
      },
    ]);

    await Team.create([
      {
        name: 'Morning Movers',
        description: 'A supportive team for starting each day with movement.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Weekend Warriors',
        description: 'Training together for stronger weekend adventures.',
        members: [users[0]._id, users[2]._id],
      },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 32,
        caloriesBurned: 345,
        completedAt: new Date('2026-09-10T07:30:00Z'),
        notes: 'Steady pace around the neighborhood.',
      },
      {
        user: users[1]._id,
        type: 'Yoga',
        durationMinutes: 25,
        caloriesBurned: 110,
        completedAt: new Date('2026-09-11T18:00:00Z'),
        notes: 'Focused on hips and lower back mobility.',
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        durationMinutes: 55,
        caloriesBurned: 520,
        completedAt: new Date('2026-09-12T09:15:00Z'),
        notes: 'Outdoor interval ride.',
      },
    ]);

    await Leaderboard.create([
      { user: users[2]._id, points: 1280, rank: 1, period: 'September 2026' },
      { user: users[0]._id, points: 1045, rank: 2, period: 'September 2026' },
      { user: users[1]._id, points: 760, rank: 3, period: 'September 2026' },
    ]);

    await Workout.create([
      {
        name: 'Foundations Full Body',
        description: 'A balanced session for building a consistent fitness habit.',
        difficulty: 'beginner',
        durationMinutes: 25,
        targetGoals: ['consistency', 'strength'],
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Plank'],
      },
      {
        name: 'Cardio Power Intervals',
        description: 'A challenging interval workout to improve cardiovascular fitness.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        targetGoals: ['endurance', 'performance'],
        exercises: ['Warm-up jog', 'High knees', 'Mountain climbers', 'Recovery walk'],
      },
      {
        name: 'Athlete Conditioning',
        description: 'An advanced circuit combining strength, speed, and core work.',
        difficulty: 'advanced',
        durationMinutes: 45,
        targetGoals: ['performance', 'endurance'],
        exercises: ['Burpees', 'Jump squats', 'Push-ups', 'V-ups', 'Sprint repeats'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
