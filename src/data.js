export const trainers = [
  {
    id: 1,
    name: 'James Carter',
    role: 'Strength Training',
    bio: 'James helps members build strength, improve technique, and develop effective workout habits.',
    email: 'james@fitzone.com',
    image: '/images/james-carter.png',
    category: 'Strength',
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Group Fitness',
    bio: 'Sarah brings energy to every class and helps members stay motivated while reaching their goals.',
    email: 'sarah@fitzone.com',
    image: '/images/sarah-mitchell.png',
    category: 'Group',
  },
  {
    id: 3,
    name: 'Daniel Brooks',
    role: 'Personal Training',
    bio: 'Daniel creates personalised training approaches to help members improve fitness and confidence.',
    email: 'daniel@fitzone.com',
    image: '/images/daniel-brooks.png',
    category: 'Personal',
  },
];

export const schedule = [
  { id: 1, className: 'Strength Training', day: 'Monday',    time: '07:00–08:00', trainer: 'James Carter',   level: 'Intermediate' },
  { id: 2, className: 'Group Fitness',     day: 'Tuesday',   time: '17:00–18:00', trainer: 'Sarah Mitchell', level: 'All Levels'   },
  { id: 3, className: 'Personal Training', day: 'Wednesday', time: '09:00–10:00', trainer: 'Daniel Brooks',  level: 'All Levels'   },
  { id: 4, className: 'Strength Training', day: 'Thursday',  time: '17:30–18:30', trainer: 'James Carter',   level: 'Intermediate' },
  { id: 5, className: 'Group Fitness',     day: 'Saturday',  time: '09:00–10:00', trainer: 'Sarah Mitchell', level: 'All Levels'   },
];

export const plans = [
  {
    id: 1,
    tier: 'Basic',
    price: 'R299',
    summary: 'Perfect for independent training.',
    features: ['Gym equipment access', 'Access during standard hours', 'Independent workouts'],
  },
  {
    id: 2,
    tier: 'Standard',
    price: 'R499',
    summary: 'Ideal for members who enjoy group training.',
    features: ['All Basic benefits', 'Group fitness classes', 'Fitness assessment'],
  },
  {
    id: 3,
    tier: 'Premium',
    price: 'R799',
    summary: 'For members who want additional support.',
    features: ['All Standard benefits', 'Personal training session', 'Priority class booking'],
  },
];

export const aboutFeatures = [
  {
    id: 1,
    title: 'Expert Trainers',
    text: 'Get guidance and support from dedicated fitness professionals.',
  },
  {
    id: 2,
    title: 'Supportive Community',
    text: 'Train alongside people who encourage you to keep improving.',
  },
];

export default trainers;
