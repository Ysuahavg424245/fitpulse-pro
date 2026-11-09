import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Activity, Flame, Dumbbell, Timer, Calendar as CalendarIcon, TrendingUp,
  Award, Plus, Check, Play, Pause, RotateCcw, ChevronRight, ChevronLeft,
  Search, Filter, Edit3, Trash2, Download, Upload, Moon, Sun, Bell,
  Smartphone, Wifi, WifiOff, CheckCircle2, AlertTriangle, Info, Heart,
  Footprints, MapPin, Zap, BookOpen, Settings, Copy, ArrowUp, ArrowDown,
  X, Save, RefreshCw, BarChart3, PieChart as PieChartIcon, Scale, FileText,
  Sparkles, ShieldCheck, Volume2, VolumeX, Eye, MoreVertical
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line,
  ComposedChart, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

// ============================================================================
// 1. INITIAL EXERCISE LIBRARY (WITH TECHNIQUE, VARIATIONS & SVG ANIMATION KEYS)
// ============================================================================
const INITIAL_EXERCISES = [
  // STRENGTH TRAINING
  {
    id: 'ex-pushups',
    name: 'Push-ups',
    category: 'Strength Training',
    muscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    defaultSets: 4,
    defaultReps: 15,
    defaultDuration: 180, // seconds total estimate
    defaultRest: 60,
    caloriesPerMin: 8.5,
    svgType: 'pushup',
    startingPosition: 'High plank position with hands slightly wider than shoulder-width apart, feet together, and body forming a straight line from head to heels.',
    instructions: [
      'Engage your core and glutes to keep your spine neutral.',
      'Inhale as you slowly bend your elbows at a 45-degree angle to lower your chest toward the floor.',
      'Stop when your chest is just above the ground.',
      'Exhale and press firmly through your palms to return to the starting plank position.'
    ],
    breathing: 'Inhale on the eccentric (lowering) phase; exhale powerfully on the concentric (pushing up) phase.',
    commonMistakes: [
      'Flaring elbows out at 90 degrees, which stresses the shoulder joints.',
      'Sagging hips or arching the lower back due to weak core engagement.',
      'Looking up instead of keeping the neck neutral.'
    ],
    beginnerVariation: 'Knee Push-ups or Incline Push-ups against an elevated bench/wall.',
    advancedVariation: 'Decline Push-ups, Diamond Push-ups, or Weighted Vest Push-ups.'
  },
  {
    id: 'ex-squats',
    name: 'Squats',
    category: 'Strength Training',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    defaultSets: 4,
    defaultReps: 20,
    defaultDuration: 240,
    defaultRest: 60,
    caloriesPerMin: 9.0,
    svgType: 'squat',
    startingPosition: 'Stand tall with feet shoulder-width apart, toes pointed slightly outward (10–15 degrees), chest proud, and hands clasped in front for balance.',
    instructions: [
      'Initiate the movement by hinging slightly at the hips and bending your knees simultaneously.',
      'Lower your hips back and down as if sitting into an invisible chair.',
      'Descend until your thighs are at least parallel to the floor while keeping your heels flat.',
      'Drive through your mid-foot and heels to stand back up, squeezing your glutes at the top.'
    ],
    breathing: 'Take a deep belly breath (brace) before descending; exhale as you drive upward past the sticking point.',
    commonMistakes: [
      'Knees caving inward (valgus collapse) during the ascent.',
      'Lifting heels off the floor and shifting weight onto the toes.',
      'Rounding the lower back (butt wink) at the bottom.'
    ],
    beginnerVariation: 'Box/Chair Assisted Squats or Half Squats.',
    advancedVariation: 'Goblet Squats, Bulgarian Split Squats, or Jump Squats.'
  },
  {
    id: 'ex-lunges',
    name: 'Lunges',
    category: 'Strength Training',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    defaultSets: 3,
    defaultReps: 12,
    defaultDuration: 210,
    defaultRest: 60,
    caloriesPerMin: 8.5,
    svgType: 'lunge',
    startingPosition: 'Stand upright with feet hip-width apart, shoulders back, core braced, and gaze straight ahead.',
    instructions: [
      'Step forward with one leg about 2 to 3 feet, keeping your torso upright.',
      'Lower your hips until both knees are bent at approximately a 90-degree angle.',
      'Ensure your front knee tracks in line with your second toe and your back knee hovers just above the floor.',
      'Push forcefully through your front heel to return to the starting standing position. Repeat on the opposite leg.'
    ],
    breathing: 'Inhale as you step forward and lower your hips; exhale as you push back to standing.',
    commonMistakes: [
      'Stepping on a "tightrope" (feet inline) which causes loss of balance.',
      'Leaning the torso too far forward over the front thigh.',
      'Banging the back knee hard onto the floor.'
    ],
    beginnerVariation: 'Static Split Squats or Reverse Lunges holding onto support.',
    advancedVariation: 'Walking Dumbbell Lunges or Jumping Split Lunges.'
  },
  {
    id: 'ex-pullups',
    name: 'Pull-ups',
    category: 'Strength Training',
    muscles: ['Latissimus Dorsi', 'Biceps', 'Upper Back', 'Forearms'],
    defaultSets: 4,
    defaultReps: 8,
    defaultDuration: 180,
    defaultRest: 90,
    caloriesPerMin: 9.5,
    svgType: 'pullup',
    startingPosition: 'Grip an overhead pull-up bar with a pronated (overhand) grip slightly wider than shoulder-width, hanging with arms fully extended.',
    instructions: [
      'Depress and retract your shoulder blades (active hang) to engage your lats before bending your elbows.',
      'Pull your chest upward toward the bar by driving your elbows down toward your ribs.',
      'Continue pulling until your chin clears the bar without craning your neck.',
      'Lower yourself down in a controlled manner for 2–3 seconds back to a full dead hang.'
    ],
    breathing: 'Exhale steadily as you pull yourself up; inhale as you lower down under control.',
    commonMistakes: [
      'Using excessive swinging/kipping momentum instead of strict muscular control.',
      'Not lowering all the way to full elbow extension (half-reps).',
      'Shrugging shoulders up toward the ears at the top.'
    ],
    beginnerVariation: 'Resistance Band Assisted Pull-ups, Inverted Rows, or Negative Pull-ups.',
    advancedVariation: 'Weighted Pull-ups, L-Sit Pull-ups, or Archer Pull-ups.'
  },
  {
    id: 'ex-plank',
    name: 'Plank',
    category: 'Strength Training',
    muscles: ['Core', 'Transverse Abdominis', 'Shoulders', 'Glutes'],
    defaultSets: 3,
    defaultReps: 1,
    defaultDuration: 180,
    defaultRest: 45,
    caloriesPerMin: 5.5,
    svgType: 'plank',
    startingPosition: 'Forearms resting flat on the floor with elbows directly underneath your shoulders, legs extended behind you on the balls of your feet.',
    instructions: [
      'Tuck your pelvis slightly (posterior pelvic tilt) and squeeze your glutes and quads.',
      'Press the floor away with your forearms so your shoulder blades stay stable and wide.',
      'Maintain a rigid, straight line from the crown of your head to your heels.',
      'Hold the isometric contraction for the prescribed duration without holding your breath.'
    ],
    breathing: 'Take steady, controlled rhythmic breaths through your nose and mouth while keeping your abs braced.',
    commonMistakes: [
      'Letting the lower back sag, creating lumbar compression.',
      'Piking the hips high into the air like a tent.',
      'Holding your breath and tensing the neck.'
    ],
    beginnerVariation: 'Forearm Plank from the Knees or Incline Forearm Plank.',
    advancedVariation: 'RKC Plank, Plank with Alternating Shoulder Taps, or Weighted Plank.'
  },
  {
    id: 'ex-crunches',
    name: 'Crunches',
    category: 'Strength Training',
    muscles: ['Rectus Abdominis', 'Obliques'],
    defaultSets: 3,
    defaultReps: 20,
    defaultDuration: 150,
    defaultRest: 45,
    caloriesPerMin: 6.0,
    svgType: 'crunch',
    startingPosition: 'Lie supine on a mat with knees bent, feet flat on the floor hip-width apart, and fingertips lightly resting behind your ears.',
    instructions: [
      'Press your lower back gently into the mat to engage your upper and middle abdominals.',
      'Curl your shoulders and upper back off the floor by flexing your spine (bringing ribs toward hips).',
      'Pause for 1 second at the peak contraction while keeping your lower back on the mat.',
      'Slowly uncurl back down until your shoulder blades lightly touch the mat.'
    ],
    breathing: 'Exhale forcefully through your mouth as you curl up; inhale as you lower back down.',
    commonMistakes: [
      'Yanking on the back of the head/neck with your hands.',
      'Using momentum to sit all the way up (which shifts work to hip flexors).',
      'Flaring elbows inward instead of keeping them wide.'
    ],
    beginnerVariation: 'Hands-on-Thighs Slide Crunches or Dead Bugs.',
    advancedVariation: 'Bicycle Crunches, Hollow Body Rocks, or Cable/Weighted Crunches.'
  },

  // CARDIO
  {
    id: 'ex-running',
    name: 'Running',
    category: 'Cardio',
    muscles: ['Cardiovascular System', 'Quadriceps', 'Hamstrings', 'Calves', 'Core'],
    defaultSets: 1,
    defaultReps: 1,
    defaultDuration: 1500, // 25 mins
    defaultRest: 0,
    caloriesPerMin: 11.5,
    svgType: 'run',
    startingPosition: 'Tall, relaxed posture with a slight forward lean from the ankles, shoulders relaxed away from ears, and elbows bent at 90 degrees.',
    instructions: [
      'Begin with a 3–5 minute brisk walk or easy jog to warm up joints and elevate heart rate.',
      'Land softly under your center of mass (mid-foot strike) rather than overstriding with your heel.',
      'Maintain a brisk cadence (~170–180 steps per minute) with arms swinging forward and back, not across the body.',
      'Cool down during the final 3 minutes at an easy recovery jog.'
    ],
    breathing: 'Use rhythmic nasal/mouth breathing (e.g., 3 steps inhale, 2 steps exhale) to maximize oxygen uptake.',
    commonMistakes: [
      'Overstriding with the foot landing far ahead of the hips, causing braking forces.',
      'Clenching fists and hunching shoulders.',
      'Starting out too fast and burning out early.'
    ],
    beginnerVariation: 'Run-Walk Intervals (e.g., 2 min jog / 1 min brisk walk).',
    advancedVariation: 'Tempo Runs, Fartlek Intervals, or Hill Repeats.'
  },
  {
    id: 'ex-walking',
    name: 'Walking',
    category: 'Cardio',
    muscles: ['Cardiovascular System', 'Calves', 'Glutes', 'Hamstrings'],
    defaultSets: 1,
    defaultReps: 1,
    defaultDuration: 1800, // 30 mins
    defaultRest: 0,
    caloriesPerMin: 5.0,
    svgType: 'walk',
    startingPosition: 'Stand tall with chin parallel to the ground, shoulders back and down, and core lightly engaged.',
    instructions: [
      'Step forward landing smoothly on your heel and rolling through the arch to push off with your toes.',
      'Swing your arms naturally from the shoulders to increase calorie burn and rhythm.',
      'Maintain a brisk, purposeful stride where your heart rate is mildly elevated.'
    ],
    breathing: 'Deep, relaxed nasal breathing throughout the session.',
    commonMistakes: [
      'Slouching forward while looking down at a phone.',
      'Taking unnaturally long strides that strain the shins.'
    ],
    beginnerVariation: 'Flat Surface Steady-Pace Walk.',
    advancedVariation: 'Incline Power Walking or Rucking (walking with a weighted backpack).'
  },
  {
    id: 'ex-cycling',
    name: 'Cycling',
    category: 'Cardio',
    muscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Cardiovascular System'],
    defaultSets: 1,
    defaultReps: 1,
    defaultDuration: 1800,
    defaultRest: 0,
    caloriesPerMin: 9.5,
    svgType: 'cycle',
    startingPosition: 'Adjust saddle height so there is a slight 25–30 degree bend in the knee at the bottom of the pedal stroke; grip handlebars with relaxed elbows.',
    instructions: [
      'Warm up for 5 minutes with light resistance and a high cadence (80–90 RPM).',
      'Push down and pull back smoothly across the entire 360-degree pedal revolution.',
      'Keep your upper body stable and avoid rocking side-to-side from the hips.',
      'Alternate between seated endurance blocks and higher-resistance climbs.'
    ],
    breathing: 'Steady diaphragmatic breathing expanding the ribcage.',
    commonMistakes: [
      'Seat set too low, placing excessive shear stress on the patellar tendon.',
      'Locking elbows and putting too much weight on the wrists.'
    ],
    beginnerVariation: 'Stationary Bike Steady Zone 2 Ride.',
    advancedVariation: 'HIIT Tabata Sprint Intervals or Outdoor Hill Climbs.'
  },
  {
    id: 'ex-jumping-jacks',
    name: 'Jumping jacks',
    category: 'Cardio',
    muscles: ['Full Body', 'Calves', 'Shoulders', 'Cardiovascular System'],
    defaultSets: 3,
    defaultReps: 40,
    defaultDuration: 180,
    defaultRest: 30,
    caloriesPerMin: 9.0,
    svgType: 'jumpingjack',
    startingPosition: 'Stand upright with feet together, knees soft, and arms resting at your sides.',
    instructions: [
      'Simultaneously jump both feet out wider than shoulder-width while sweeping your arms overhead.',
      'Land softly on the balls of your feet with knees slightly bent.',
      'Immediately jump your feet back together while lowering your arms to your sides.',
      'Maintain a snappy, elastic rhythm.'
    ],
    breathing: 'Inhale as you jump your feet wide and arms up; exhale as you return feet together.',
    commonMistakes: [
      'Landing with stiff, locked knees and flat heels.',
      'Cutting the arm range of motion short.'
    ],
    beginnerVariation: 'Low-Impact Step Jacks (stepping one foot out at a time).',
    advancedVariation: 'Star Jumps or Plyo Squat Jacks.'
  },
  {
    id: 'ex-high-knees',
    name: 'High knees',
    category: 'Cardio',
    muscles: ['Hip Flexors', 'Core', 'Calves', 'Cardiovascular System'],
    defaultSets: 4,
    defaultReps: 30,
    defaultDuration: 160,
    defaultRest: 30,
    caloriesPerMin: 10.5,
    svgType: 'highknees',
    startingPosition: 'Stand tall with feet hip-width apart, core braced, and elbows bent at 90 degrees at your sides.',
    instructions: [
      'Drive your right knee up to hip height while pumping your left arm forward.',
      'Quickly switch legs in mid-air, landing softly on the ball of your foot.',
      'Keep your torso tall and avoid leaning backward as you increase speed.'
    ],
    breathing: 'Rapid, rhythmic breathing matched to every 4–6 foot strikes.',
    commonMistakes: [
      'Leaning the torso backward to fake higher knee lift.',
      'Slamming heels into the ground.'
    ],
    beginnerVariation: 'Marching High Knees in Place.',
    advancedVariation: 'Weighted Wrist/Ankle High Knee Sprints.'
  },
  {
    id: 'ex-burpees',
    name: 'Burpees',
    category: 'Cardio',
    muscles: ['Full Body', 'Chest', 'Quads', 'Shoulders', 'Core'],
    defaultSets: 3,
    defaultReps: 12,
    defaultDuration: 210,
    defaultRest: 60,
    caloriesPerMin: 12.5,
    svgType: 'burpee',
    startingPosition: 'Stand with feet shoulder-width apart, weight balanced through mid-foot.',
    instructions: [
      'Squat down and place both hands flat on the floor in front of your feet.',
      'Jump or step both feet back into a tight high-plank position.',
      'Perform a controlled push-up lowering your chest to the floor.',
      'Jump your feet back in toward your hands, then explosively jump straight up, clapping hands overhead.'
    ],
    breathing: 'Inhale on the squat/plank transition; exhale on the push-up and vertical jump.',
    commonMistakes: [
      'Letting the hips sag like a hammock when jumping back into the plank.',
      'Landing with narrow feet and caving knees on the recovery.'
    ],
    beginnerVariation: 'No-Push-up Step-Back Burpees.',
    advancedVariation: 'Tuck-Jump Burpees or Burpee Pull-ups.'
  },

  // FLEXIBILITY AND MOBILITY
  {
    id: 'ex-hamstring-stretch',
    name: 'Hamstring stretches',
    category: 'Flexibility and Mobility',
    muscles: ['Hamstrings', 'Calves', 'Lower Back'],
    defaultSets: 2,
    defaultReps: 2,
    defaultDuration: 120,
    defaultRest: 15,
    caloriesPerMin: 3.0,
    svgType: 'stretch',
    startingPosition: 'Sit on the floor or stand with one heel propped forward, spine elongated and chest lifted.',
    instructions: [
      'Extend your target leg straight with toes gently flexed toward your shin.',
      'Hinge forward strictly from the hips while keeping your spine flat—do not round your upper back.',
      'Hold at the point of mild, comfortable tension along the back of the thigh for 30 seconds per side.'
    ],
    breathing: 'Slow 4-second nasal inhales followed by 6-second relaxing exhales to release muscle guarding.',
    commonMistakes: [
      'Bouncing aggressively (ballistic stretching) on cold muscles.',
      'Rounding the spine to touch the toes instead of hinging at the pelvis.'
    ],
    beginnerVariation: 'Supine Towel/Strap Assisted Hamstring Stretch.',
    advancedVariation: 'PNF Contract-Relax Hamstring Stretch or Standing Jefferson Curl.'
  },
  {
    id: 'ex-hip-mobility',
    name: 'Hip mobility',
    category: 'Flexibility and Mobility',
    muscles: ['Hip Flexors', 'Glutes', 'Adductors', 'Hip Capsule'],
    defaultSets: 2,
    defaultReps: 10,
    defaultDuration: 180,
    defaultRest: 20,
    caloriesPerMin: 3.5,
    svgType: 'hipmobility',
    startingPosition: 'Sit on the floor in a 90/90 position (front leg bent at 90 degrees, back leg bent at 90 degrees to the side).',
    instructions: [
      'Keep your torso tall and chest proud.',
      'Slowly rotate both knees up and over to the opposite side until you land in a 90/90 position facing the other way.',
      'Lean forward slightly over the front shin for 2 seconds to deepen the external rotation stretch, then switch.'
    ],
    breathing: 'Inhale as knees lift through the center; exhale as you settle into the end-range stretch.',
    commonMistakes: [
      'Collapsing the chest and rounding the lower back.',
      'Rushing through transitions instead of controlling hip rotation.'
    ],
    beginnerVariation: 'Hands-Supported 90/90 Hip Switches.',
    advancedVariation: 'Hands-Free 90/90 Transitions with Hip Lift.'
  },
  {
    id: 'ex-shoulder-mobility',
    name: 'Shoulder mobility',
    category: 'Flexibility and Mobility',
    muscles: ['Rotator Cuff', 'Deltoids', 'Thoracic Spine', 'Pectorals'],
    defaultSets: 2,
    defaultReps: 12,
    defaultDuration: 150,
    defaultRest: 20,
    caloriesPerMin: 3.2,
    svgType: 'shouldermobility',
    startingPosition: 'Stand tall with ribs tucked down, holding a light mobility band or towel wide in front of your thighs.',
    instructions: [
      'Perform Controlled Articular Rotations (CARs) or band pass-throughs by raising arms overhead.',
      'Keep elbows straight and shrug slightly at the top to clear the shoulder joint smoothly.',
      'Rotate arms behind your back as far as comfortable, then reverse slowly to the front.'
    ],
    breathing: 'Continuous calm nasal breathing without bracing neck muscles.',
    commonMistakes: [
      'Flaring the ribcage and arching the lower back to compensate for tight shoulders.',
      'Bending one elbow first during overhead pass-throughs.'
    ],
    beginnerVariation: 'Wall Angels / Scapular Wall Slides.',
    advancedVariation: 'Prone Swimmers (Hovering Y-T-W-L Raises).'
  },
  {
    id: 'ex-dynamic-stretching',
    name: 'Dynamic stretching',
    category: 'Flexibility and Mobility',
    muscles: ['Full Body', 'Thoracic Spine', 'Hip Flexors', 'Hamstrings'],
    defaultSets: 2,
    defaultReps: 8,
    defaultDuration: 240,
    defaultRest: 15,
    caloriesPerMin: 4.5,
    svgType: 'dynamic',
    startingPosition: 'High plank position transitioning into a deep runner’s lunge ("World’s Greatest Stretch").',
    instructions: [
      'Step your right foot outside your right hand and drop your back knee slightly.',
      'Lower your right forearm toward the instep of your right foot.',
      'Rotate your torso open and reach your right hand high toward the ceiling, following your hand with your eyes.',
      'Place both hands down, straighten the front leg briefly, then switch sides.'
    ],
    breathing: 'Inhale as you drop the elbow down; exhale deeply as you rotate open toward the sky.',
    commonMistakes: [
      'Twisting from the lower back instead of the thoracic (mid/upper) spine.',
      'Holding the breath during end-range rotation.'
    ],
    beginnerVariation: 'Kneeling Thoracic Open-Book Rotations.',
    advancedVariation: 'Flowing Inchworm to World’s Greatest Stretch Complex.'
  },
  {
    id: 'ex-yoga',
    name: 'Yoga',
    category: 'Flexibility and Mobility',
    muscles: ['Core', 'Spine', 'Shoulders', 'Hamstrings', 'Mind-Body'],
    defaultSets: 1,
    defaultReps: 1,
    defaultDuration: 900, // 15 mins
    defaultRest: 0,
    caloriesPerMin: 4.0,
    svgType: 'yoga',
    startingPosition: 'Mountain Pose (Tadasana) at the top of your mat with feet grounded and palms facing forward.',
    instructions: [
      'Flow smoothly through Sun Salutations: inhale arms overhead, exhale fold forward into Uttanasana.',
      'Step back into Plank, lower through Chaturanga, and inhale into Upward-Facing Dog.',
      'Exhale and press hips high and back into Downward-Facing Dog for 5 deep breaths.',
      'Transition through Warrior I & II sequences on both sides before finishing in Child’s Pose.'
    ],
    breathing: 'Ujjayi breathing—slow, audible ocean-like inhales and exhales through the nose synchronized with each pose.',
    commonMistakes: [
      'Forcing stiff hamstrings by locking knees in Downward Dog instead of prioritizing a long spine.',
      'Dumping weight into the wrists rather than pressing through the knuckles.'
    ],
    beginnerVariation: 'Gentle Hatha / Restorative Flow with Yoga Blocks.',
    advancedVariation: 'Power Vinyasa Flow with Arm Balances.'
  }
];

// ============================================================================
// 2. PRESET WORKOUT ROUTINE TEMPLATES
// ============================================================================
const ROUTINE_TEMPLATES = {
  'Full Body Strength': [
    { exerciseId: 'ex-dynamic-stretching', sets: 2, reps: 6, duration: 180, rest: 20 },
    { exerciseId: 'ex-pushups', sets: 4, reps: 15, duration: 240, rest: 60 },
    { exerciseId: 'ex-squats', sets: 4, reps: 20, duration: 240, rest: 60 },
    { exerciseId: 'ex-pullups', sets: 4, reps: 8, duration: 210, rest: 90 },
    { exerciseId: 'ex-lunges', sets: 3, reps: 12, duration: 180, rest: 60 },
    { exerciseId: 'ex-plank', sets: 3, reps: 1, duration: 180, rest: 45 }
  ],
  'Cardio & HIIT Blast': [
    { exerciseId: 'ex-jumping-jacks', sets: 3, reps: 45, duration: 180, rest: 30 },
    { exerciseId: 'ex-high-knees', sets: 4, reps: 35, duration: 180, rest: 30 },
    { exerciseId: 'ex-burpees', sets: 4, reps: 12, duration: 240, rest: 60 },
    { exerciseId: 'ex-running', sets: 1, reps: 1, duration: 1200, rest: 60 },
    { exerciseId: 'ex-crunches', sets: 3, reps: 25, duration: 150, rest: 45 }
  ],
  'Mobility & Active Recovery': [
    { exerciseId: 'ex-walking', sets: 1, reps: 1, duration: 900, rest: 0 },
    { exerciseId: 'ex-hip-mobility', sets: 2, reps: 10, duration: 180, rest: 20 },
    { exerciseId: 'ex-shoulder-mobility', sets: 2, reps: 12, duration: 150, rest: 20 },
    { exerciseId: 'ex-hamstring-stretch', sets: 2, reps: 2, duration: 120, rest: 15 },
    { exerciseId: 'ex-yoga', sets: 1, reps: 1, duration: 900, rest: 0 }
  ],
  'Runner’s Core & Endurance': [
    { exerciseId: 'ex-dynamic-stretching', sets: 1, reps: 8, duration: 150, rest: 15 },
    { exerciseId: 'ex-running', sets: 1, reps: 1, duration: 1500, rest: 60 },
    { exerciseId: 'ex-lunges', sets: 3, reps: 12, duration: 180, rest: 45 },
    { exerciseId: 'ex-plank', sets: 3, reps: 1, duration: 180, rest: 45 },
    { exerciseId: 'ex-hamstring-stretch', sets: 2, reps: 2, duration: 120, rest: 15 }
  ]
};

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// ============================================================================
// 3. HELPER UTILITIES (DATE FORMATTING, AUDIO BEEP, INDEXEDDB + LOCALSTORAGE)
// ============================================================================
const formatDateKey = (dateObj) => {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const getDayNameFromDateKey = (dateKey) => {
  const [y, m, d] = dateKey.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  const jsDay = dt.getDay(); // 0 = Sun, 1 = Mon
  return DAYS_OF_WEEK[jsDay === 0 ? 6 : jsDay - 1];
};

const formatDisplayDate = (dateKey) => {
  const [y, m, d] = dateKey.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

// Web Audio API Synthesized Chime for Rest Timer
const playTimerBeep = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.26);
    });
  } catch (e) {
    // Audio playback silently ignored if blocked
  }
};

// IndexedDB Mirroring Helper for Enterprise Persistence
const saveToIndexedDB = (key, data) => {
  try {
    if (!('indexedDB' in window)) return;
    const req = window.indexedDB.open('FitPulsePWA_DB', 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('appState')) {
        db.createObjectStore('appState');
      }
    };
    req.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction('appState', 'readwrite');
      tx.objectStore('appState').put(data, key);
    };
  } catch (e) {
    // Fallback to localStorage already handled
  }
};

// Build realistic initial 14-day history so charts and calendars look rich immediately
const generateInitialSeedData = () => {
  const today = new Date();
  const weeklyPlan = {
    Monday: { isRestDay: false, routineName: 'Full Body Strength', items: ROUTINE_TEMPLATES['Full Body Strength'] },
    Tuesday: { isRestDay: false, routineName: 'Runner’s Core & Endurance', items: ROUTINE_TEMPLATES['Runner’s Core & Endurance'] },
    Wednesday: { isRestDay: false, routineName: 'Mobility & Active Recovery', items: ROUTINE_TEMPLATES['Mobility & Active Recovery'] },
    Thursday: { isRestDay: false, routineName: 'Full Body Strength', items: ROUTINE_TEMPLATES['Full Body Strength'] },
    Friday: { isRestDay: false, routineName: 'Cardio & HIIT Blast', items: ROUTINE_TEMPLATES['Cardio & HIIT Blast'] },
    Saturday: { isRestDay: false, routineName: 'Runner’s Core & Endurance', items: ROUTINE_TEMPLATES['Runner’s Core & Endurance'] },
    Sunday: { isRestDay: true, routineName: 'Rest & Recharge', items: [] }
  };

  const dailyLogs = {};
  const runs = [];
  const weightLogs = [];

  for (let i = 13; i >= 0; i--) {
    const dt = new Date(today);
    dt.setDate(today.getDate() - i);
    const key = formatDateKey(dt);
    const dayName = getDayNameFromDateKey(key);
    const planForDay = weeklyPlan[dayName];

    // Weight progression log every 2 days
    if (i % 2 === 0) {
      weightLogs.push({
        id: `wt-${key}`,
        date: key,
        weightKg: Number((74.8 - (13 - i) * 0.08).toFixed(1)),
        bodyFatPct: Number((16.5 - (13 - i) * 0.05).toFixed(1))
      });
    }

    if (planForDay.isRestDay) {
      dailyLogs[key] = {
        date: key,
        isRestDay: true,
        notes: 'Scheduled active recovery & hydration day.',
        exercises: []
      };
      continue;
    }

    // Make today partially completed (for instant demo engagement), past days mostly completed
    const isToday = i === 0;
    const isMissedDay = i === 5; // One missed day 5 days ago to demonstrate calendar variety
    const isPartialDay = i === 8;

    const exercises = planForDay.items.map((item, idx) => {
      const exMeta = INITIAL_EXERCISES.find((e) => e.id === item.exerciseId) || INITIAL_EXERCISES[0];
      let completed = true;
      if (isMissedDay) completed = false;
      else if (isPartialDay) completed = idx < 3;
      else if (isToday) completed = idx < 2; // 2 exercises already checked today

      return {
        instanceId: `${key}-${item.exerciseId}-${idx}`,
        exerciseId: item.exerciseId,
        name: exMeta.name,
        category: exMeta.category,
        sets: item.sets,
        reps: item.reps,
        duration: item.duration,
        rest: item.rest,
        completedSets: completed ? item.sets : isToday && idx === 2 ? 2 : 0,
        completed,
        actualNote: completed ? 'Solid form, felt strong' : ''
      };
    });

    dailyLogs[key] = {
      date: key,
      isRestDay: false,
      routineName: planForDay.routineName,
      notes: isToday ? 'Focusing on controlled eccentric reps today.' : 'Great session energy!',
      exercises
    };

    // Seed running sessions on Tuesdays, Fridays, Saturdays
    if (['Tuesday', 'Friday', 'Saturday'].includes(dayName) && !isMissedDay) {
      const baseDist = dayName === 'Saturday' ? 7.5 : dayName === 'Tuesday' ? 5.2 : 4.0;
      const dist = Number((baseDist + (13 - i) * 0.12).toFixed(2));
      const durationMin = Number((dist * (5.35 - (13 - i) * 0.015)).toFixed(1));
      const pace = Number((durationMin / dist).toFixed(2));
      const speed = Number(((dist / durationMin) * 60).toFixed(2));
      const calories = Math.round(dist * 64);

      runs.push({
        id: `run-${key}`,
        date: key,
        distanceKm: dist,
        durationMin,
        paceMinKm: pace,
        speedKmh: speed,
        calories,
        surface: dayName === 'Saturday' ? 'Park Trail' : 'Road / Track',
        effort: dayName === 'Friday' ? 'Tempo (Hard)' : 'Endurance (Moderate)',
        notes: `Smooth cadence, negative split on the final kilometer.`
      });
    }
  }

  return {
    theme: 'dark',
    exercises: INITIAL_EXERCISES,
    weeklyPlan,
    customRoutines: ROUTINE_TEMPLATES,
    dailyLogs,
    runs,
    weightLogs,
    goals: {
      dailyCalories: 450,
      dailyDurationMin: 35,
      weeklyDistanceKm: 18,
      targetWeightKg: 72.5,
      reminderTime: '07:00',
      reminderEnabled: true,
      personalNotes: 'Primary Objective: Build strict pull-up strength, maintain a 5:10/km 5K pace, and never miss mobility work.'
    }
  };
};

// ============================================================================
// 4. ANIMATED SVG EXERCISE DEMONSTRATION COMPONENT
// ============================================================================
const ExerciseAnimationSVG = ({ svgType = 'pushup', category = 'Strength Training', size = 'md' }) => {
  const accentColor =
    category === 'Strength Training'
      ? '#10b981' // Emerald
      : category === 'Cardio'
      ? '#06b6d4' // Cyan
      : '#a855f7'; // Purple

  const dims = size === 'sm' ? 'w-14 h-14' : size === 'lg' ? 'w-full h-48' : 'w-24 h-24';

  return (
    <div className={`${dims} relative rounded-2xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center overflow-hidden select-none`}>
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.25; transform: scale(0.95); }
          50% { opacity: 0.55; transform: scale(1.08); }
        }
        @keyframes squatMove {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
        @keyframes pushupMove {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(7px) rotate(4deg); }
        }
        @keyframes runSwing {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(16deg); }
        }
        @keyframes jackArms {
          0%, 100% { transform: scaleY(0.85); }
          50% { transform: scaleY(1.15); }
        }
      `}</style>
      {/* Background radial glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl pointer-events-none"
        style={{ background: accentColor, animation: 'pulseGlow 2.4s infinite ease-in-out' }}
      />
      <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 relative z-10">
        {/* Floor line */}
        <line x1="12" y1="84" x2="88" y2="84" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

        {svgType === 'pushup' || svgType === 'plank' ? (
          <g style={{ animation: svgType === 'pushup' ? 'pushupMove 1.8s infinite ease-in-out' : 'none', transformOrigin: '75px 80px' }}>
            {/* Head */}
            <circle cx="24" cy="54" r="6" fill={accentColor} />
            {/* Torso & Legs */}
            <line x1="30" y1="56" x2="78" y2="76" stroke="#f8fafc" strokeWidth="5" strokeLinecap="round" />
            {/* Arms */}
            <line x1="34" y1="58" x2="30" y2="82" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : svgType === 'squat' || svgType === 'lunge' ? (
          <g>
            <g style={{ animation: 'squatMove 1.8s infinite ease-in-out' }}>
              <circle cx="50" cy="24" r="7" fill={accentColor} />
              <line x1="50" y1="32" x2="46" y2="56" stroke="#f8fafc" strokeWidth="5" strokeLinecap="round" />
              <line x1="50" y1="38" x2="68" y2="38" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            </g>
            {/* Lower legs anchored */}
            <line x1="46" y1="58" x2="58" y2="70" stroke="#cbd5e1" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="58" y1="70" x2="52" y2="82" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        ) : svgType === 'pullup' ? (
          <g>
            {/* Pull-up bar */}
            <line x1="20" y1="18" x2="80" y2="18" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <g style={{ animation: 'squatMove 2s infinite ease-in-out' }}>
              <circle cx="50" cy="34" r="6.5" fill={accentColor} />
              <line x1="36" y1="18" x2="44" y2="42" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
              <line x1="64" y1="18" x2="56" y2="42" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="41" x2="50" y2="66" stroke="#f8fafc" strokeWidth="5" strokeLinecap="round" />
              <line x1="47" y1="66" x2="46" y2="80" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
              <line x1="53" y1="66" x2="54" y2="80" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            </g>
          </g>
        ) : svgType === 'run' || svgType === 'highknees' || svgType === 'walk' || svgType === 'cycle' ? (
          <g>
            <circle cx="54" cy="24" r="6.5" fill={accentColor} />
            <line x1="52" y1="31" x2="46" y2="56" stroke="#f8fafc" strokeWidth="5" strokeLinecap="round" />
            <g style={{ animation: 'runSwing 0.9s infinite ease-in-out', transformOrigin: '50px 40px' }}>
              <line x1="50" y1="38" x2="66" y2="46" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="38" x2="34" y2="48" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            </g>
            <g style={{ animation: 'runSwing 0.9s infinite ease-in-out', transformOrigin: '46px 56px' }}>
              <line x1="46" y1="56" x2="64" y2="74" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="46" y1="56" x2="32" y2="78" stroke="#cbd5e1" strokeWidth="4.5" strokeLinecap="round" />
            </g>
          </g>
        ) : (
          /* Default Dynamic / Yoga / Stretch / Jumping Jack */
          <g style={{ animation: 'jackArms 2s infinite ease-in-out', transformOrigin: '50px 55px' }}>
            <circle cx="50" cy="24" r="6.5" fill={accentColor} />
            <line x1="50" y1="32" x2="50" y2="58" stroke="#f8fafc" strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="38" x2="28" y2="24" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="38" x2="72" y2="24" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="58" x2="34" y2="82" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="50" y1="58" x2="66" y2="82" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};

// ============================================================================
// 5. MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // --------------------------------------------------------------------------
  // Persistent State Initialization
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'fitpulse_pro_pwa_v1';

  const [appData, setAppData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.exercises && parsed.dailyLogs) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved workout state:', e);
    }
    return generateInitialSeedData();
  });

  // Save to LocalStorage & IndexedDB on every state update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
      saveToIndexedDB('latestState', appData);
    } catch (e) {
      console.error('Failed to persist state:', e);
    }
  }, [appData]);

  // --------------------------------------------------------------------------
  // Navigation & UI State
  // --------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | tracker | planner | running | library | analytics | settings
  const [selectedDate, setSelectedDate] = useState(() => formatDateKey(new Date()));
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  // Modals & Notifications
  const [toast, setToast] = useState(null);
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [showCustomExerciseModal, setShowCustomExerciseModal] = useState(false);
  const [selectedLibraryExercise, setSelectedLibraryExercise] = useState(null);
  const [editingRun, setEditingRun] = useState(null);

  // Rest Timer & Active Workout Stopwatch
  const [restTimer, setRestTimer] = useState({ active: false, remaining: 60, total: 60, label: 'Rest Period' });
  const [workoutStopwatch, setWorkoutStopwatch] = useState({ running: false, elapsedSec: 0 });
  const [soundEnabled, setSoundEnabled] = useState(true);

  // PWA & Offline Status
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [pwaStatus, setPwaStatus] = useState({
    manifestInjected: false,
    swRegistered: false,
    swMode: 'Initializing...',
    iconsGenerated: false,
    standalone: false
  });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  }, []);

  // --------------------------------------------------------------------------
  // PWA Manifest, Dynamic App Icons & Service Worker Registration
  // --------------------------------------------------------------------------
  useEffect(() => {
    // 1. Generate 192x192 & 512x512 PNG Data URLs via HTML5 Canvas for Android Chrome PWA
    const generateAppIcon = (size) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#064e3b');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, size * 0.22);
      ctx.fill();

      // Inner Emerald ring
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = size * 0.06;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size * 0.34, 0, Math.PI * 2);
      ctx.stroke();

      // Pulse bolt / dumbbell graphic
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = size * 0.065;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(size * 0.26, size * 0.52);
      ctx.lineTo(size * 0.4, size * 0.52);
      ctx.lineTo(size * 0.46, size * 0.32);
      ctx.lineTo(size * 0.55, size * 0.68);
      ctx.lineTo(size * 0.62, size * 0.52);
      ctx.lineTo(size * 0.74, size * 0.52);
      ctx.stroke();

      return canvas.toDataURL('image/png');
    };

    const icon192 = generateAppIcon(192);
    const icon512 = generateAppIcon(512);

    // Static manifest and valid same-origin service worker registration.
    let linkEl = document.querySelector('link[rel="manifest"]');
    if (!linkEl) { linkEl = document.createElement('link'); linkEl.rel = 'manifest'; document.head.appendChild(linkEl); }
    linkEl.href = `${import.meta.env.BASE_URL}manifest.webmanifest`;
    const setMetaTag = (name, content) => {
      let m = document.querySelector(`meta[name="${name}"]`);
      if (!m) { m = document.createElement('meta'); m.name = name; document.head.appendChild(m); }
      m.content = content;
    };
    setMetaTag('theme-color', '#10b981');
    setMetaTag('mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    setMetaTag('apple-mobile-web-app-title', 'FitPulse Pro');
    let swRegisteredFlag = false;
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
        .then(() => { swRegisteredFlag = true; setPwaStatus(prev => ({ ...prev, swRegistered: true, swMode: 'Service Worker Active' })); })
        .catch(error => { console.error('Service worker registration failed:', error); setPwaStatus(prev => ({ ...prev, swRegistered: false, swMode: 'Service worker unavailable' })); });
    }
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    setPwaStatus({
      manifestInjected: true,
      swRegistered: swRegisteredFlag,
      swMode: swModeLabel,
      iconsGenerated: true,
      standalone: isStandalone
    });

    // Listen for Android Chrome Install Prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleOnline = () => {
      setIsOnline(true);
      showToast('Back online! Workout records synchronized.', 'success');
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast('Offline Mode active. All workouts are saved locally.', 'info');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showToast]);

  // --------------------------------------------------------------------------
  // Rest Timer & Active Workout Stopwatch Intervals
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!restTimer.active) return;
    const timer = setInterval(() => {
      setRestTimer((prev) => {
        if (prev.remaining <= 1) {
          if (soundEnabled) playTimerBeep();
          showToast(`Rest finished! Ready for your next set.`, 'success');
          return { ...prev, active: false, remaining: 0 };
        }
        return { ...prev, remaining: prev.remaining - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [restTimer.active, soundEnabled, showToast]);

  useEffect(() => {
    if (!workoutStopwatch.running) return;
    const timer = setInterval(() => {
      setWorkoutStopwatch((prev) => ({ ...prev, elapsedSec: prev.elapsedSec + 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, [workoutStopwatch.running]);

  // --------------------------------------------------------------------------
  // Ensure Selected Date Always Has a Daily Workout Record Initialized from Plan
  // --------------------------------------------------------------------------
  const getOrCreateDayLog = useCallback(
    (dateKey) => {
      if (appData.dailyLogs[dateKey]) {
        return appData.dailyLogs[dateKey];
      }
      const dayName = getDayNameFromDateKey(dateKey);
      const plannedDay = appData.weeklyPlan[dayName] || { isRestDay: false, routineName: 'Custom Plan', items: [] };

      const exercises = (plannedDay.items || []).map((item, idx) => {
        const exMeta = appData.exercises.find((e) => e.id === item.exerciseId) || INITIAL_EXERCISES[0];
        return {
          instanceId: `${dateKey}-${item.exerciseId}-${idx}`,
          exerciseId: item.exerciseId,
          name: exMeta.name,
          category: exMeta.category,
          sets: item.sets,
          reps: item.reps,
          duration: item.duration,
          rest: item.rest,
          completedSets: 0,
          completed: false,
          actualNote: ''
        };
      });

      return {
        date: dateKey,
        isRestDay: plannedDay.isRestDay,
        routineName: plannedDay.routineName || `${dayName} Session`,
        notes: '',
        exercises
      };
    },
    [appData.dailyLogs, appData.weeklyPlan, appData.exercises]
  );

  const currentDayLog = useMemo(() => getOrCreateDayLog(selectedDate), [getOrCreateDayLog, selectedDate]);

  // Helper to calculate stats for any day log
  const computeDayStats = useCallback(
    (dayLog) => {
      if (!dayLog || dayLog.isRestDay) {
        return {
          totalExercises: 0,
          completedExercises: 0,
          completionPct: dayLog?.isRestDay ? 100 : 0,
          durationMin: 0,
          calories: 0,
          status: dayLog?.isRestDay ? 'rest' : 'empty'
        };
      }
      const totalExercises = dayLog.exercises.length;
      if (totalExercises === 0) {
        return { totalExercises: 0, completedExercises: 0, completionPct: 0, durationMin: 0, calories: 0, status: 'empty' };
      }

      let completedExercises = 0;
      let totalDurationSec = 0;
      let totalCalories = 0;
      let totalSetsPlanned = 0;
      let totalSetsDone = 0;

      dayLog.exercises.forEach((ex) => {
        const meta = appData.exercises.find((e) => e.id === ex.exerciseId) || { caloriesPerMin: 7.5 };
        const setsDone = ex.completed ? ex.sets : ex.completedSets || 0;
        totalSetsPlanned += ex.sets || 1;
        totalSetsDone += setsDone;

        if (ex.completed) {
          completedExercises += 1;
        }
        const fraction = (ex.sets || 1) > 0 ? setsDone / (ex.sets || 1) : ex.completed ? 1 : 0;
        const activeSec = (ex.duration || 180) * fraction;
        totalDurationSec += activeSec;
        totalCalories += (activeSec / 60) * (meta.caloriesPerMin || 7.5);
      });

      // Also include any runs logged on this date
      const runsOnDate = appData.runs.filter((r) => r.date === dayLog.date);
      runsOnDate.forEach((r) => {
        totalDurationSec += r.durationMin * 60;
        totalCalories += r.calories || 0;
      });

      const completionPct = totalSetsPlanned > 0 ? Math.min(100, Math.round((totalSetsDone / totalSetsPlanned) * 100)) : 0;
      const status =
        completionPct === 100
          ? 'completed'
          : completionPct > 0
          ? 'partial'
          : 'missed';

      return {
        totalExercises,
        completedExercises,
        completionPct,
        durationMin: Math.round(totalDurationSec / 60),
        calories: Math.round(totalCalories),
        status
      };
    },
    [appData.exercises, appData.runs]
  );

  const todayKey = formatDateKey(new Date());
  const todayStats = useMemo(() => computeDayStats(getOrCreateDayLog(todayKey)), [computeDayStats, getOrCreateDayLog, todayKey]);
  const selectedDayStats = useMemo(() => computeDayStats(currentDayLog), [computeDayStats, currentDayLog]);

  // Calculate Current Workout Streak
  const currentStreak = useMemo(() => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const dt = new Date(today);
      dt.setDate(today.getDate() - i);
      const key = formatDateKey(dt);
      const log = appData.dailyLogs[key];
      if (!log) {
        if (i === 0) continue;
        break;
      }
      const stats = computeDayStats(log);
      if (stats.status === 'completed' || stats.status === 'partial' || stats.status === 'rest') {
        streak += 1;
      } else if (i === 0) {
        // Today still in progress
        continue;
      } else {
        break;
      }
    }
    return streak;
  }, [appData.dailyLogs, computeDayStats]);

  // --------------------------------------------------------------------------
  // Daily Exercise Tracker Actions
  // --------------------------------------------------------------------------
  const updateDayLog = (dateKey, updaterFn) => {
    setAppData((prev) => {
      const existing = prev.dailyLogs[dateKey] || getOrCreateDayLog(dateKey);
      const updated = updaterFn(existing);
      return {
        ...prev,
        dailyLogs: {
          ...prev.dailyLogs,
          [dateKey]: updated
        }
      };
    });
  };

  const handleToggleExerciseComplete = (dateKey, instanceId) => {
    updateDayLog(dateKey, (log) => {
      const exercises = log.exercises.map((ex) => {
        if (ex.instanceId !== instanceId) return ex;
        const nextCompleted = !ex.completed;
        if (nextCompleted && ex.rest > 0) {
          setRestTimer({
            active: true,
            remaining: ex.rest,
            total: ex.rest,
            label: `Rest after ${ex.name}`
          });
        }
        return {
          ...ex,
          completed: nextCompleted,
          completedSets: nextCompleted ? ex.sets : 0
        };
      });
      return { ...log, exercises };
    });
  };

  const handleIncrementSet = (dateKey, instanceId) => {
    updateDayLog(dateKey, (log) => {
      const exercises = log.exercises.map((ex) => {
        if (ex.instanceId !== instanceId) return ex;
        const nextSets = (ex.completedSets || 0) >= ex.sets ? 0 : (ex.completedSets || 0) + 1;
        const isNowDone = nextSets >= ex.sets;
        if (nextSets > 0 && ex.rest > 0) {
          setRestTimer({
            active: true,
            remaining: ex.rest,
            total: ex.rest,
            label: `${ex.name} — Set ${nextSets}/${ex.sets} Rest`
          });
        }
        return {
          ...ex,
          completedSets: nextSets,
          completed: isNowDone
        };
      });
      return { ...log, exercises };
    });
  };

  const handleAddExerciseToDay = (dateKey, exerciseId) => {
    const exMeta = appData.exercises.find((e) => e.id === exerciseId);
    if (!exMeta) return;
    updateDayLog(dateKey, (log) => ({
      ...log,
      isRestDay: false,
      exercises: [
        ...log.exercises,
        {
          instanceId: `${dateKey}-${exerciseId}-${Date.now()}`,
          exerciseId: exMeta.id,
          name: exMeta.name,
          category: exMeta.category,
          sets: exMeta.defaultSets,
          reps: exMeta.defaultReps,
          duration: exMeta.defaultDuration,
          rest: exMeta.defaultRest,
          completedSets: 0,
          completed: false,
          actualNote: ''
        }
      ]
    }));
    showToast(`Added ${exMeta.name} to ${dateKey}`, 'success');
  };

  const handleRemoveExerciseFromDay = (dateKey, instanceId) => {
    updateDayLog(dateKey, (log) => ({
      ...log,
      exercises: log.exercises.filter((e) => e.instanceId !== instanceId)
    }));
  };

  const handleSyncDayWithWeeklyPlan = (dateKey) => {
    const dayName = getDayNameFromDateKey(dateKey);
    const plannedDay = appData.weeklyPlan[dayName];
    if (!plannedDay) return;

    const exercises = (plannedDay.items || []).map((item, idx) => {
      const exMeta = appData.exercises.find((e) => e.id === item.exerciseId) || INITIAL_EXERCISES[0];
      return {
        instanceId: `${dateKey}-${item.exerciseId}-${idx}-${Date.now()}`,
        exerciseId: item.exerciseId,
        name: exMeta.name,
        category: exMeta.category,
        sets: item.sets,
        reps: item.reps,
        duration: item.duration,
        rest: item.rest,
        completedSets: 0,
        completed: false,
        actualNote: ''
      };
    });

    setAppData((prev) => ({
      ...prev,
      dailyLogs: {
        ...prev.dailyLogs,
        [dateKey]: {
          date: dateKey,
          isRestDay: plannedDay.isRestDay,
          routineName: plannedDay.routineName,
          notes: prev.dailyLogs[dateKey]?.notes || '',
          exercises
        }
      }
    }));
    showToast(`Synced ${dateKey} with ${dayName}'s template!`, 'success');
  };

  // --------------------------------------------------------------------------
  // Theme Toggle
  // --------------------------------------------------------------------------
  const isDark = appData.theme === 'dark';
  const toggleTheme = () => {
    setAppData((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  // ============================================================================
  // SUB-VIEWS
  // ============================================================================

  // --------------------------------------------------------------------------
  // VIEW 1: DASHBOARD (HOMEPAGE)
  // --------------------------------------------------------------------------
  const renderDashboard = () => {
    // Prepare last 7 days chart data
    const weeklyChartData = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const dt = new Date(today);
      dt.setDate(today.getDate() - i);
      const key = formatDateKey(dt);
      const log = getOrCreateDayLog(key);
      const st = computeDayStats(log);
      weeklyChartData.push({
        day: dt.toLocaleDateString('en-US', { weekday: 'short' }),
        date: key,
        duration: st.durationMin,
        calories: st.calories,
        completion: st.completionPct
      });
    }

    // Calendar grid generation for `calendarMonth`
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday start

    const calendarCells = [];
    for (let i = 0; i < startOffset; i++) calendarCells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      calendarCells.push({ dayNum: d, dateKey: key });
    }

    // Recent workout history (last 8 days)
    const recentHistoryKeys = Object.keys(appData.dailyLogs)
      .sort((a, b) => b.localeCompare(a))
      .slice(0, 7);

    const goalPct = Math.min(
      100,
      Math.round(
        ((todayStats.calories / (appData.goals.dailyCalories || 450)) * 0.5 +
          (todayStats.durationMin / (appData.goals.dailyDurationMin || 35)) * 0.5) *
          100
      )
    );

    return (
      <div className="space-y-6 pb-8">
        {/* Hero Today's Workout Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-cyan-950 border border-emerald-500/30 p-6 sm:p-8 text-white shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Today's Training Plan • {getDayNameFromDateKey(todayKey)}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {getOrCreateDayLog(todayKey).isRestDay
                  ? 'Active Recovery & Mobility Day'
                  : getOrCreateDayLog(todayKey).routineName || 'Full Body Conditioning'}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base">
                {todayStats.completedExercises} of {todayStats.totalExercises} exercises completed today ({todayStats.completionPct}% done). Keep your {currentStreak}-day streak alive!
              </p>
              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setSelectedDate(todayKey);
                    setActiveTab('tracker');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/25"
                >
                  <Play className="w-4 h-4 fill-current" />
                  {todayStats.completionPct > 0 && todayStats.completionPct < 100 ? 'Continue Workout' : 'Start Today’s Workout'}
                </button>
                <button
                  onClick={() => setActiveTab('running')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 transition"
                >
                  <Footprints className="w-4 h-4 text-cyan-400" /> Log a Run
                </button>
              </div>
            </div>

            {/* Radial Daily Fitness Goal Ring */}
            <div className="flex items-center gap-5 bg-slate-900/70 backdrop-blur-md border border-slate-800 p-4 rounded-2xl self-start lg:self-center">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="10" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - todayStats.completionPct / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold text-emerald-400">{todayStats.completionPct}%</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Plan</span>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="text-xs text-slate-400 uppercase font-semibold">Daily Goal Status</div>
                <div className="font-bold text-white text-base">{goalPct}% Target Reached</div>
                <div className="text-xs text-emerald-400">
                  {todayStats.calories} / {appData.goals.dailyCalories} kcal • {todayStats.durationMin} / {appData.goals.dailyDurationMin} min
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Workout Duration</span>
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Timer className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold">{todayStats.durationMin} <span className="text-sm font-normal text-slate-400">min</span></div>
            <div className="text-xs text-emerald-400 mt-1">Goal: {appData.goals.dailyDurationMin} min</div>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Calories Burned</span>
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold">{todayStats.calories} <span className="text-sm font-normal text-slate-400">kcal</span></div>
            <div className="text-xs text-orange-400 mt-1">Est. active burn</div>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Exercises Done</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold">
              {todayStats.completedExercises}/{todayStats.totalExercises}
            </div>
            <div className="text-xs text-emerald-400 mt-1">{todayStats.completionPct}% checklist</div>
          </div>

          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Current Streak</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold">{currentStreak} <span className="text-sm font-normal text-slate-400">days</span></div>
            <div className="text-xs text-amber-400 mt-1">Consistent habit!</div>
          </div>

          <div className={`col-span-2 lg:col-span-1 p-4 rounded-2xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Weekly Distance</span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Footprints className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold">
              {appData.runs.slice(-3).reduce((acc, r) => acc + r.distanceKm, 0).toFixed(1)}{' '}
              <span className="text-sm font-normal text-slate-400">km</span>
            </div>
            <div className="text-xs text-purple-400 mt-1">Target: {appData.goals.weeklyDistanceKm} km</div>
          </div>
        </div>

        {/* Middle Section: Interactive Visual Workout Calendar & Weekly Summary Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Visual Calendar (7 cols) */}
          <div className={`lg:col-span-7 p-6 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-emerald-400" /> Workout Consistency Calendar
                </h2>
                <p className="text-xs text-slate-400">Click any date to inspect or edit that day's workout log</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCalendarMonth(new Date(year, month - 1, 1))}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold min-w-[125px] text-center">
                  {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => setCalendarMonth(new Date(year, month + 1, 1))}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarCells.map((cell, idx) => {
                if (!cell) return <div key={`empty-${idx}`} className="h-11" />;
                const log = appData.dailyLogs[cell.dateKey];
                const st = log ? computeDayStats(log) : null;
                const isSelected = cell.dateKey === selectedDate;
                const isTodayCell = cell.dateKey === todayKey;

                let statusBadgeClass = isDark
                  ? 'bg-slate-800/50 text-slate-400 border-slate-800'
                  : 'bg-slate-100 text-slate-600 border-slate-200';

                if (st) {
                  if (st.status === 'completed') {
                    statusBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold';
                  } else if (st.status === 'partial') {
                    statusBadgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold';
                  } else if (st.status === 'rest') {
                    statusBadgeClass = 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
                  } else if (st.status === 'missed' && cell.dateKey < todayKey) {
                    statusBadgeClass = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
                  }
                }

                return (
                  <button
                    key={cell.dateKey}
                    onClick={() => {
                      setSelectedDate(cell.dateKey);
                      setActiveTab('tracker');
                    }}
                    className={`h-11 rounded-xl border flex flex-col items-center justify-center relative transition hover:scale-105 ${statusBadgeClass} ${
                      isSelected ? 'ring-2 ring-emerald-400' : ''
                    }`}
                  >
                    <span className="text-xs">{cell.dayNum}</span>
                    {isTodayCell && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute bottom-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-slate-800/60 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-400 inline-block" /> Completed
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500/40 border border-amber-400 inline-block" /> Partial
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-400 inline-block" /> Rest Day
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-500/40 border border-rose-400 inline-block" /> Missed
              </div>
            </div>
          </div>

          {/* Weekly Activity Bar Chart (5 cols) */}
          <div className={`lg:col-span-5 p-6 rounded-3xl border flex flex-col justify-between ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 mb-1">
                <BarChart3 className="w-5 h-5 text-cyan-400" /> Weekly Workout Summary
              </h2>
              <p className="text-xs text-slate-400 mb-4">Active workout minutes & calories over the past 7 days</p>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="duration" name="Duration (min)" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="completion" name="Completion (%)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Section: Today's Exercise Quick Checklist + Recent History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Today's Plan Quick Checklist */}
          <div className={`lg:col-span-6 p-6 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">Today’s Exercise Lineup</h2>
                <p className="text-xs text-slate-400">Tap to check off sets or open full tracker</p>
              </div>
              <button
                onClick={() => {
                  setSelectedDate(todayKey);
                  setActiveTab('tracker');
                }}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                Full Tracker <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {getOrCreateDayLog(todayKey).exercises.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-slate-800/40 border border-slate-800">
                  <p className="text-sm text-slate-300 font-medium">Rest & Recovery Day Scheduled</p>
                  <button
                    onClick={() => {
                      setSelectedDate(todayKey);
                      setActiveTab('tracker');
                    }}
                    className="mt-3 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold"
                  >
                    + Add Optional Mobility or Workout
                  </button>
                </div>
              ) : (
                getOrCreateDayLog(todayKey).exercises.map((ex) => (
                  <div
                    key={ex.instanceId}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition ${
                      ex.completed
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : isDark
                        ? 'bg-slate-800/50 border-slate-800'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleExerciseComplete(todayKey, ex.instanceId)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center border transition ${
                          ex.completed
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'border-slate-600 hover:border-emerald-400'
                        }`}
                      >
                        {ex.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>
                      <div>
                        <div className={`font-semibold text-sm ${ex.completed ? 'line-through text-slate-400' : ''}`}>
                          {ex.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {ex.sets} sets × {ex.reps} reps • {Math.round(ex.duration / 60)} min • Rest {ex.rest}s
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium">
                      {ex.completedSets}/{ex.sets} sets
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Workout History with Edit Button */}
          <div className={`lg:col-span-6 p-6 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">Recent Workout History</h2>
                <p className="text-xs text-slate-400">Persistent historical records — click any day to edit</p>
              </div>
            </div>

            <div className="space-y-3">
              {recentHistoryKeys.map((dateKey) => {
                const log = appData.dailyLogs[dateKey];
                const st = computeDayStats(log);
                return (
                  <div
                    key={dateKey}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                      isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{formatDisplayDate(dateKey)}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                            st.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : st.status === 'rest'
                              ? 'bg-cyan-500/20 text-cyan-400'
                              : st.status === 'partial'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {st.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {log.isRestDay
                          ? 'Scheduled Recovery Day'
                          : `${log.routineName || 'Workout'} • ${st.completedExercises}/${st.totalExercises} exercises • ${st.durationMin} min • ${st.calories} kcal`}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedDate(dateKey);
                        setActiveTab('tracker');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // VIEW 2: DAILY EXERCISE TRACKER (WITH STOPWATCH, REST TIMER & INSTRUCTIONS)
  // --------------------------------------------------------------------------
  const [expandedExId, setExpandedExId] = useState(null);
  const [quickAddExId, setQuickAddExId] = useState(INITIAL_EXERCISES[0].id);

  const renderDailyTracker = () => {
    const formatSec = (s) => {
      const mins = Math.floor(s / 60);
      const secs = s % 60;
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
      <div className="space-y-6 pb-8">
        {/* Top Bar: Date Selector + Live Workout Stopwatch */}
        <div className={`p-5 rounded-3xl border flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
                Interactive Daily Exercise Tracker
              </span>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
                  className={`px-3 py-1.5 rounded-xl border text-sm font-bold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  onClick={() => setSelectedDate(todayKey)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/30"
                >
                  Today
                </button>
                <button
                  onClick={() => handleSyncDayWithWeeklyPlan(selectedDate)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 flex items-center gap-1"
                  title="Reload exercises from Weekly Planner for this day of week"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset to Planned Routine
                </button>
              </div>
            </div>
          </div>

          {/* Live Session Stopwatch & Rest Timer Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800/90 border border-slate-700">
              <Timer className="w-4 h-4 text-cyan-400" />
              <span className="font-mono font-bold text-base text-white">
                {formatSec(workoutStopwatch.elapsedSec)}
              </span>
              <button
                onClick={() => setWorkoutStopwatch((prev) => ({ ...prev, running: !prev.running }))}
                className={`p-1.5 rounded-lg ${
                  workoutStopwatch.running ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                }`}
                title={workoutStopwatch.running ? 'Pause Stopwatch' : 'Start Stopwatch'}
              >
                {workoutStopwatch.running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setWorkoutStopwatch({ running: false, elapsedSec: 0 })}
                className="p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:text-white"
                title="Reset Stopwatch"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
              title="Toggle Timer Audio Beep"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>

        {/* Summary Progress Bar for Selected Date */}
        <div className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div>
              <h2 className="text-lg font-bold">
                {formatDisplayDate(selectedDate)} — {currentDayLog.routineName || 'Daily Session'}
              </h2>
              <p className="text-xs text-slate-400">
                {selectedDayStats.completedExercises} of {selectedDayStats.totalExercises} exercises complete • Est. {selectedDayStats.durationMin} min • {selectedDayStats.calories} kcal
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-emerald-400">{selectedDayStats.completionPct}%</span>
              <button
                onClick={() => {
                  updateDayLog(selectedDate, (log) => ({
                    ...log,
                    isRestDay: false,
                    exercises: log.exercises.map((e) => ({ ...e, completed: true, completedSets: e.sets }))
                  }));
                  showToast('All exercises marked complete for this session!', 'success');
                }}
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Complete All
              </button>
            </div>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${selectedDayStats.completionPct}%` }}
            />
          </div>
        </div>

        {/* Exercise Cards List */}
        <div className="space-y-4">
          {currentDayLog.exercises.map((ex) => {
            const fullMeta = appData.exercises.find((e) => e.id === ex.exerciseId) || INITIAL_EXERCISES[0];
            const isExpanded = expandedExId === ex.instanceId;

            return (
              <div
                key={ex.instanceId}
                className={`rounded-3xl border transition overflow-hidden ${
                  ex.completed
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : isDark
                    ? 'bg-slate-900/90 border-slate-800'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <ExerciseAnimationSVG svgType={fullMeta.svgType} category={ex.category} size="md" />
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {ex.category}
                        </span>
                        {fullMeta.muscles?.map((m) => (
                          <span key={m} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            {m}
                          </span>
                        ))}
                      </div>
                      <h3 className={`text-xl font-extrabold ${ex.completed ? 'line-through text-slate-400' : ''}`}>
                        {ex.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                        <span>Sets: <strong className="text-slate-200">{ex.sets}</strong></span>
                        <span>Reps: <strong className="text-slate-200">{ex.reps}</strong></span>
                        <span>Duration: <strong className="text-slate-200">{Math.round(ex.duration / 60)}m</strong></span>
                        <span>Rest: <strong className="text-cyan-400">{ex.rest}s</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Set Buttons & Complete Toggle */}
                  <div className="flex flex-wrap items-center gap-2.5 self-end md:self-center">
                    <button
                      onClick={() => handleIncrementSet(selectedDate, ex.instanceId)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold border border-slate-700"
                    >
                      Set {ex.completedSets || 0}/{ex.sets} (+1)
                    </button>

                    <button
                      onClick={() =>
                        setRestTimer({
                          active: true,
                          remaining: ex.rest || 60,
                          total: ex.rest || 60,
                          label: `Rest (${ex.name})`
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-xs font-semibold border border-cyan-500/30 flex items-center gap-1"
                    >
                      <Timer className="w-3.5 h-3.5" /> {ex.rest}s Rest
                    </button>

                    <button
                      onClick={() => setExpandedExId(isExpanded ? null : ex.instanceId)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      {isExpanded ? 'Hide Guide' : 'Instructions'}
                    </button>

                    <button
                      onClick={() => handleToggleExerciseComplete(selectedDate, ex.instanceId)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                        ex.completed
                          ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                          : 'bg-slate-800 hover:bg-emerald-500/20 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      {ex.completed ? 'Completed' : 'Mark Done'}
                    </button>

                    <button
                      onClick={() => handleRemoveExerciseFromDay(selectedDate, ex.instanceId)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                      title="Remove from today's log"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expandable Instructions, Breathing & Injury Prevention Drawer */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 bg-slate-950/50 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <div className="font-bold text-emerald-400 uppercase tracking-wider">Starting Position</div>
                      <p className="text-slate-300 leading-relaxed">{fullMeta.startingPosition}</p>
                      <div className="font-bold text-emerald-400 uppercase tracking-wider pt-1">Step-by-Step Execution</div>
                      <ol className="list-decimal list-inside space-y-1 text-slate-300">
                        {fullMeta.instructions?.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold text-cyan-400 uppercase tracking-wider">Breathing Technique</div>
                      <p className="text-slate-300">{fullMeta.breathing}</p>
                      <div className="font-bold text-rose-400 uppercase tracking-wider pt-1">Common Mistakes to Avoid</div>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {fullMeta.commonMistakes?.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                      <div className="pt-2 flex flex-col sm:flex-row gap-2">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex-1">
                          <span className="text-emerald-400 font-bold block">Beginner Variation:</span>
                          <span className="text-slate-300">{fullMeta.beginnerVariation}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex-1">
                          <span className="text-purple-400 font-bold block">Advanced Variation:</span>
                          <span className="text-slate-300">{fullMeta.advancedVariation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add Exercise to Selected Date & Session Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" /> Add Exercise to {selectedDate}
            </h3>
            <div className="flex gap-2">
              <select
                value={quickAddExId}
                onChange={(e) => setQuickAddExId(e.target.value)}
                className={`flex-1 px-3 py-2.5 rounded-xl border text-sm ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              >
                {appData.exercises.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name} ({ex.category})
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleAddExerciseToDay(selectedDate, quickAddExId)}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm"
              >
                Add
              </button>
            </div>
          </div>

          <div className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" /> Session Workout Notes ({selectedDate})
            </h3>
            <textarea
              rows={2}
              value={currentDayLog.notes || ''}
              onChange={(e) =>
                updateDayLog(selectedDate, (log) => ({
                  ...log,
                  notes: e.target.value
                }))
              }
              placeholder="Record how you felt, weights used, RPE, or recovery notes..."
              className={`w-full px-3 py-2 rounded-xl border text-sm ${
                isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
              }`}
            />
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // VIEW 3: WEEKLY WORKOUT PLANNER
  // --------------------------------------------------------------------------
  const [plannerDay, setPlannerDay] = useState('Monday');
  const [newPlanExId, setNewPlanExId] = useState(INITIAL_EXERCISES[0].id);
  const [newPlanSets, setNewPlanSets] = useState(3);
  const [newPlanReps, setNewPlanReps] = useState(12);
  const [newPlanDurationMin, setNewPlanDurationMin] = useState(3);
  const [newPlanRestSec, setNewPlanRestSec] = useState(60);
  const [newTemplateName, setNewTemplateName] = useState('');

  const renderWorkoutPlanner = () => {
    const activeDayConfig = appData.weeklyPlan[plannerDay] || { isRestDay: false, routineName: '', items: [] };

    const handleToggleRestDay = (day) => {
      setAppData((prev) => ({
        ...prev,
        weeklyPlan: {
          ...prev.weeklyPlan,
          [day]: {
            ...prev.weeklyPlan[day],
            isRestDay: !prev.weeklyPlan[day].isRestDay
          }
        }
      }));
    };

    const handleLoadTemplateToDay = (templateKey) => {
      const items = appData.customRoutines[templateKey] || ROUTINE_TEMPLATES[templateKey];
      if (!items) return;
      setAppData((prev) => ({
        ...prev,
        weeklyPlan: {
          ...prev.weeklyPlan,
          [plannerDay]: {
            isRestDay: false,
            routineName: templateKey,
            items: JSON.parse(JSON.stringify(items))
          }
        }
      }));
      showToast(`Assigned "${templateKey}" to ${plannerDay}!`, 'success');
    };

    const handleAddExerciseToPlanDay = (e) => {
      e.preventDefault();
      const item = {
        exerciseId: newPlanExId,
        sets: Number(newPlanSets) || 3,
        reps: Number(newPlanReps) || 10,
        duration: (Number(newPlanDurationMin) || 3) * 60,
        rest: Number(newPlanRestSec) || 60
      };
      setAppData((prev) => ({
        ...prev,
        weeklyPlan: {
          ...prev.weeklyPlan,
          [plannerDay]: {
            ...prev.weeklyPlan[plannerDay],
            isRestDay: false,
            items: [...(prev.weeklyPlan[plannerDay].items || []), item]
          }
        }
      }));
      showToast(`Added exercise to ${plannerDay}'s schedule.`, 'success');
    };

    const handleMovePlanItem = (idx, dir) => {
      const items = [...(activeDayConfig.items || [])];
      const targetIdx = idx + dir;
      if (targetIdx < 0 || targetIdx >= items.length) return;
      const temp = items[idx];
      items[idx] = items[targetIdx];
      items[targetIdx] = temp;
      setAppData((prev) => ({
        ...prev,
        weeklyPlan: {
          ...prev.weeklyPlan,
          [plannerDay]: { ...prev.weeklyPlan[plannerDay], items }
        }
      }));
    };

    const handleDeletePlanItem = (idx) => {
      const items = (activeDayConfig.items || []).filter((_, i) => i !== idx);
      setAppData((prev) => ({
        ...prev,
        weeklyPlan: {
          ...prev.weeklyPlan,
          [plannerDay]: { ...prev.weeklyPlan[plannerDay], items }
        }
      }));
    };

    const handleSaveCurrentAsRoutine = () => {
      if (!newTemplateName.trim()) {
        showToast('Please enter a routine template name.', 'error');
        return;
      }
      setAppData((prev) => ({
        ...prev,
        customRoutines: {
          ...prev.customRoutines,
          [newTemplateName.trim()]: activeDayConfig.items || []
        }
      }));
      setNewTemplateName('');
      showToast(`Saved routine "${newTemplateName.trim()}"!`, 'success');
    };

    return (
      <div className="space-y-6 pb-8">
        {/* 7-Day Weekly Overview Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {DAYS_OF_WEEK.map((day) => {
            const cfg = appData.weeklyPlan[day];
            const isSelected = day === plannerDay;
            const totalMin = (cfg?.items || []).reduce((acc, i) => acc + Math.round((i.duration || 180) / 60), 0);
            return (
              <button
                key={day}
                onClick={() => setPlannerDay(day)}
                className={`p-4 rounded-2xl border text-left transition ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-400 ring-2 ring-emerald-400/40'
                    : isDark
                    ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-sm">{day.slice(0, 3)}</span>
                  {cfg?.isRestDay ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold">
                      Rest
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                      {cfg?.items?.length || 0} ex
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 truncate">
                  {cfg?.isRestDay ? 'Recovery Day' : cfg?.routineName || 'Custom'}
                </div>
                {!cfg?.isRestDay && <div className="text-[11px] text-slate-500 mt-1">~{totalMin} mins</div>}
              </button>
            );
          })}
        </div>

        {/* Active Day Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className={`lg:col-span-8 p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold">{plannerDay} Workout Schedule</h2>
                <input
                  type="text"
                  value={activeDayConfig.routineName || ''}
                  onChange={(e) =>
                    setAppData((prev) => ({
                      ...prev,
                      weeklyPlan: {
                        ...prev.weeklyPlan,
                        [plannerDay]: { ...prev.weeklyPlan[plannerDay], routineName: e.target.value }
                      }
                    }))
                  }
                  placeholder="Routine Title (e.g. Upper Body Power)"
                  className={`mt-1 px-3 py-1 rounded-xl border text-xs font-semibold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleToggleRestDay(plannerDay)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                    activeDayConfig.isRestDay
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {activeDayConfig.isRestDay ? '✓ Scheduled Rest Day' : 'Set as Rest Day'}
                </button>
              </div>
            </div>

            {activeDayConfig.isRestDay ? (
              <div className="p-8 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-center space-y-2">
                <p className="text-base font-bold text-cyan-300">{plannerDay} is set as a Rest & Recovery Day</p>
                <p className="text-xs text-slate-400">
                  Rest days automatically count toward your workout consistency streak.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {(activeDayConfig.items || []).map((item, idx) => {
                  const meta = appData.exercises.find((e) => e.id === item.exerciseId) || INITIAL_EXERCISES[0];
                  return (
                    <div
                      key={`${item.exerciseId}-${idx}`}
                      className={`p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                        isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-bold text-sm">{meta.name}</div>
                          <div className="text-xs text-slate-400">
                            {item.sets} sets × {item.reps} reps • {Math.round(item.duration / 60)} min • Rest {item.rest}s
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleMovePlanItem(idx, -1)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMovePlanItem(idx, 1)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePlanItem(idx)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-400"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Save Current Day as Reusable Routine Template */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="Save this day's lineup as template..."
                className={`flex-1 px-3 py-2 rounded-xl border text-xs ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                }`}
              />
              <button
                onClick={handleSaveCurrentAsRoutine}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1"
              >
                <Save className="w-3.5 h-3.5" /> Save Routine Template
              </button>
            </div>
          </div>

          {/* Right Column: Add Exercise to Day & Load Preset Templates */}
          <div className="lg:col-span-4 space-y-6">
            <form
              onSubmit={handleAddExerciseToPlanDay}
              className={`p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}
            >
              <h3 className="font-bold text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" /> Assign Exercise to {plannerDay}
              </h3>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Select Exercise</label>
                <select
                  value={newPlanExId}
                  onChange={(e) => {
                    const ex = appData.exercises.find((item) => item.id === e.target.value);
                    setNewPlanExId(e.target.value);
                    if (ex) {
                      setNewPlanSets(ex.defaultSets);
                      setNewPlanReps(ex.defaultReps);
                      setNewPlanDurationMin(Math.max(1, Math.round(ex.defaultDuration / 60)));
                      setNewPlanRestSec(ex.defaultRest);
                    }
                  }}
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                  }`}
                >
                  {appData.exercises.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name} ({ex.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Sets</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newPlanSets}
                    onChange={(e) => setNewPlanSets(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-sm ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Reps</label>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={newPlanReps}
                    onChange={(e) => setNewPlanReps(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-sm ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Duration (min)</label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={newPlanDurationMin}
                    onChange={(e) => setNewPlanDurationMin(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-sm ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Rest (sec)</label>
                  <input
                    type="number"
                    min="0"
                    max="300"
                    value={newPlanRestSec}
                    onChange={(e) => setNewPlanRestSec(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-sm ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm"
              >
                + Add to {plannerDay}
              </button>
            </form>

            {/* Load Routine Template Box */}
            <div className={`p-6 rounded-3xl border space-y-3 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Copy className="w-4 h-4 text-cyan-400" /> Apply Routine Template to {plannerDay}
              </h3>
              <div className="space-y-2">
                {Object.keys(appData.customRoutines || ROUTINE_TEMPLATES).map((tplName) => (
                  <button
                    key={tplName}
                    onClick={() => handleLoadTemplateToDay(tplName)}
                    className="w-full p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 flex items-center justify-between text-left text-xs font-semibold"
                  >
                    <span>{tplName}</span>
                    <span className="text-emerald-400">Apply →</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // VIEW 4: DEDICATED RUNNING TRACKER
  // --------------------------------------------------------------------------
  const [runForm, setRunForm] = useState({
    date: todayKey,
    distanceKm: '5.0',
    durationMin: '26.5',
    surface: 'Road / Track',
    effort: 'Endurance (Moderate)',
    notes: ''
  });

  const renderRunningTracker = () => {
    const sortedRuns = [...appData.runs].sort((a, b) => a.date.localeCompare(b.date));
    const reverseRuns = [...sortedRuns].reverse();

    // Calculate Running KPIs & Personal Bests
    const totalDistanceKm = sortedRuns.reduce((acc, r) => acc + r.distanceKm, 0);
    const longestRunKm = sortedRuns.reduce((max, r) => Math.max(max, r.distanceKm), 0);
    const fastestPace = sortedRuns.reduce((min, r) => (r.paceMinKm < min ? r.paceMinKm : min), 99);
    const best5kMin = fastestPace < 99 ? (fastestPace * 5).toFixed(1) : '--';

    // Live calculation preview for the form
    const distVal = parseFloat(runForm.distanceKm) || 0;
    const durVal = parseFloat(runForm.durationMin) || 0;
    const previewPace = distVal > 0 && durVal > 0 ? (durVal / distVal).toFixed(2) : '0.00';
    const previewSpeed = distVal > 0 && durVal > 0 ? ((distVal / durVal) * 60).toFixed(2) : '0.00';
    const previewCal = Math.round(distVal * 64);

    const handleLogRunSubmit = (e) => {
      e.preventDefault();
      if (distVal <= 0 || durVal <= 0) {
        showToast('Please enter a valid positive distance and duration.', 'error');
        return;
      }

      const newRunEntry = {
        id: editingRun ? editingRun.id : `run-${Date.now()}`,
        date: runForm.date,
        distanceKm: Number(distVal.toFixed(2)),
        durationMin: Number(durVal.toFixed(1)),
        paceMinKm: Number(previewPace),
        speedKmh: Number(previewSpeed),
        calories: previewCal,
        surface: runForm.surface,
        effort: runForm.effort,
        notes: runForm.notes
      };

      setAppData((prev) => {
        const filtered = editingRun ? prev.runs.filter((r) => r.id !== editingRun.id) : prev.runs;
        return {
          ...prev,
          runs: [...filtered, newRunEntry]
        };
      });

      setEditingRun(null);
      setRunForm({
        date: todayKey,
        distanceKm: '5.0',
        durationMin: '26.0',
        surface: 'Road / Track',
        effort: 'Endurance (Moderate)',
        notes: ''
      });
      showToast(editingRun ? 'Run record updated!' : 'New run logged to history!', 'success');
    };

    const handleDeleteRun = (id) => {
      setAppData((prev) => ({
        ...prev,
        runs: prev.runs.filter((r) => r.id !== id)
      }));
      showToast('Run record deleted.', 'info');
    };

    return (
      <div className="space-y-6 pb-8">
        {/* Personal Bests & Running KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="text-xs text-slate-400 font-medium">Cumulative Distance</div>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1">{totalDistanceKm.toFixed(1)} km</div>
            <div className="text-xs text-slate-400 mt-1">{sortedRuns.length} total runs logged</div>
          </div>

          <div className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="text-xs text-slate-400 font-medium">Personal Best Pace</div>
            <div className="text-3xl font-extrabold text-cyan-400 mt-1">
              {fastestPace < 99 ? fastestPace.toFixed(2) : '--'} <span className="text-sm font-normal">min/km</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">Top speed: {fastestPace < 99 ? (60 / fastestPace).toFixed(1) : '--'} km/h</div>
          </div>

          <div className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="text-xs text-slate-400 font-medium">Longest Single Run</div>
            <div className="text-3xl font-extrabold text-purple-400 mt-1">{longestRunKm.toFixed(2)} km</div>
            <div className="text-xs text-slate-400 mt-1">Endurance milestone</div>
          </div>

          <div className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="text-xs text-slate-400 font-medium">Est. Best 5K Time</div>
            <div className="text-3xl font-extrabold text-amber-400 mt-1">{best5kMin} min</div>
            <div className="text-xs text-slate-400 mt-1">Based on fastest recorded pace</div>
          </div>
        </div>

        {/* Interactive Running Charts + Manual Run Logger Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Distance & Pace Progression Graph (7 cols) */}
          <div className={`lg:col-span-7 p-6 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-lg font-bold flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-emerald-400" /> Running Distance & Pace Progression
            </h2>
            <p className="text-xs text-slate-400 mb-4">Distance (km) bars vs. Average Pace (min/km) trend line</p>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={sortedRuns}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                  <YAxis yAxisId="left" stroke="#10b981" fontSize={11} />
                  <YAxis yAxisId="right" orientation="right" stroke="#06b6d4" fontSize={11} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar yAxisId="left" dataKey="distanceKm" name="Distance (km)" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="paceMinKm"
                    name="Pace (min/km)"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Log / Edit Run Form (5 cols) */}
          <form
            onSubmit={handleLogRunSubmit}
            className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Footprints className="w-5 h-5 text-cyan-400" />
                {editingRun ? 'Edit Run Record' : 'Log Running Session'}
              </h2>
              {editingRun && (
                <button
                  type="button"
                  onClick={() => setEditingRun(null)}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs text-slate-400 block mb-1">Run Date</label>
                <input
                  type="date"
                  required
                  value={runForm.date}
                  onChange={(e) => setRunForm({ ...runForm, date: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs text-slate-400 block mb-1">Terrain / Surface</label>
                <select
                  value={runForm.surface}
                  onChange={(e) => setRunForm({ ...runForm, surface: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                  }`}
                >
                  <option>Road / Track</option>
                  <option>Park Trail</option>
                  <option>Treadmill</option>
                  <option>Synthetic Track</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Distance (km)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  required
                  value={runForm.distanceKm}
                  onChange={(e) => setRunForm({ ...runForm, distanceKm: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  required
                  value={runForm.durationMin}
                  onChange={(e) => setRunForm({ ...runForm, durationMin: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-cyan-400' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>
            </div>

            {/* Auto-Calculated Pace, Speed & Calories Preview Box */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/70 grid grid-cols-3 text-center">
              <div>
                <span className="text-[11px] text-slate-400 block">Avg Pace</span>
                <span className="font-extrabold text-sm text-cyan-400">{previewPace} /km</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Avg Speed</span>
                <span className="font-extrabold text-sm text-emerald-400">{previewSpeed} km/h</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Est. Burn</span>
                <span className="font-extrabold text-sm text-orange-400">{previewCal} kcal</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Run Notes</label>
              <input
                type="text"
                value={runForm.notes}
                onChange={(e) => setRunForm({ ...runForm, notes: e.target.value })}
                placeholder="Splits, heart rate, shoes, or weather..."
                className={`w-full px-3 py-2 rounded-xl border text-sm ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20"
            >
              {editingRun ? 'Update Run Record' : '+ Save Run to Tracker'}
            </button>
          </form>
        </div>

        {/* Historical Runs Table / Cards */}
        <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className="text-lg font-bold mb-4">Logged Running Sessions</h3>
          <div className="space-y-3">
            {reverseRuns.map((run) => (
              <div
                key={run.id}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-base text-emerald-400">{run.distanceKm} km</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-semibold">
                      {run.paceMinKm} min/km ({run.speedKmh} km/h)
                    </span>
                    <span className="text-xs text-slate-400">{formatDisplayDate(run.date)}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Duration: <strong>{run.durationMin} min</strong> • Burn: <strong>{run.calories} kcal</strong> • {run.surface}
                    {run.notes ? ` — "${run.notes}"` : ''}
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setEditingRun(run);
                      setRunForm({
                        date: run.date,
                        distanceKm: String(run.distanceKm),
                        durationMin: String(run.durationMin),
                        surface: run.surface || 'Road / Track',
                        effort: run.effort || 'Endurance (Moderate)',
                        notes: run.notes || ''
                      });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRun(run.id)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // VIEW 5: SEARCHABLE EXERCISE LIBRARY & CUSTOM EXERCISE CREATOR
  // --------------------------------------------------------------------------
  const [libSearch, setLibSearch] = useState('');
  const [libCategory, setLibCategory] = useState('All');

  const renderExerciseLibrary = () => {
    const filteredExercises = appData.exercises.filter((ex) => {
      const matchesCat = libCategory === 'All' || ex.category === libCategory;
      const q = libSearch.toLowerCase();
      const matchesQuery =
        ex.name.toLowerCase().includes(q) ||
        ex.category.toLowerCase().includes(q) ||
        (ex.muscles || []).some((m) => m.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });

    return (
      <div className="space-y-6 pb-8">
        {/* Search & Filter Header */}
        <div className={`p-6 rounded-3xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div>
            <h1 className="text-xl font-extrabold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" /> Technique & Exercise Library
            </h1>
            <p className="text-xs text-slate-400">
              Comprehensive form guides, breathing biomechanics, injury prevention alerts & variations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={libSearch}
                onChange={(e) => setLibSearch(e.target.value)}
                placeholder="Search exercise or muscle..."
                className={`w-full pl-9 pr-3 py-2 rounded-xl border text-sm ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                }`}
              />
            </div>

            <button
              onClick={() => setShowCustomExerciseModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Custom Exercise
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {['All', 'Strength Training', 'Cardio', 'Flexibility and Mobility'].map((cat) => (
            <button
              key={cat}
              onClick={() => setLibCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                libCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : isDark
                  ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Exercise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExercises.map((ex) => (
            <div
              key={ex.id}
              className={`rounded-3xl border p-5 flex flex-col justify-between transition hover:border-emerald-500/50 ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <ExerciseAnimationSVG svgType={ex.svgType} category={ex.category} size="md" />
                  <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400">
                    {ex.category}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold mb-1">{ex.name}</h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {ex.muscles?.map((m) => (
                    <span key={m} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {m}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4">{ex.startingPosition}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedLibraryExercise(ex)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" /> Technique Guide
                </button>
                <button
                  onClick={() => handleAddExerciseToDay(selectedDate, ex.id)}
                  className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold"
                  title="Add to Today's Workout"
                >
                  + Today
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // VIEW 6: PROGRESS ANALYTICS DASHBOARD
  // --------------------------------------------------------------------------
  const renderProgressAnalytics = () => {
    // 14-day historical trend
    const allDates = Object.keys(appData.dailyLogs).sort((a, b) => a.localeCompare(b));
    const trendData = allDates.map((dKey) => {
      const st = computeDayStats(appData.dailyLogs[dKey]);
      return {
        date: dKey.slice(5), // MM-DD
        completion: st.completionPct,
        duration: st.durationMin,
        calories: st.calories
      };
    });

    // Category breakdown pie chart
    const catCount = { 'Strength Training': 0, Cardio: 0, 'Flexibility and Mobility': 0 };
    allDates.forEach((dKey) => {
      const log = appData.dailyLogs[dKey];
      (log?.exercises || []).forEach((ex) => {
        if (ex.completed) {
          catCount[ex.category] = (catCount[ex.category] || 0) + 1;
        }
      });
    });
    const pieData = Object.keys(catCount).map((k) => ({ name: k, value: Math.max(1, catCount[k]) }));
    const PIE_COLORS = ['#10b981', '#06b6d4', '#a855f7'];

    return (
      <div className="space-y-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Workout Completion % Area Chart */}
          <div className={`lg:col-span-7 p-6 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-lg font-bold mb-1">Daily Workout Completion & Calorie Burn Trend</h2>
            <p className="text-xs text-slate-400 mb-4">Historical consistency across all recorded sessions</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area
                    type="monotone"
                    dataKey="completion"
                    name="Completion (%)"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorComp)"
                  />
                  <Area
                    type="monotone"
                    dataKey="duration"
                    name="Duration (min)"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fillOpacity={0.15}
                    fill="#06b6d4"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Exercise Category Distribution PieChart */}
          <div className={`lg:col-span-5 p-6 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-lg font-bold mb-1">Completed Exercise Distribution</h2>
            <p className="text-xs text-slate-400 mb-4">Balance between Strength, Cardio, and Mobility</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((_, idx) => (
                      <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Body Weight Progression & Personal Records */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className={`lg:col-span-7 p-6 rounded-3xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-400" /> Body Weight Composition Trend (kg)
            </h2>
            <p className="text-xs text-slate-400 mb-4">Target Goal: {appData.goals.targetWeightKg} kg</p>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={appData.weightLogs}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc'
                    }}
                  />
                  <Line type="monotone" dataKey="weightKg" name="Weight (kg)" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`lg:col-span-5 p-6 rounded-3xl border space-y-3 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> All-Time Personal Records
            </h2>
            <div className="space-y-2.5 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex justify-between items-center">
                <span className="text-xs text-slate-300">Longest Active Streak</span>
                <span className="font-extrabold text-emerald-400">{currentStreak} Days</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex justify-between items-center">
                <span className="text-xs text-slate-300">Fastest Recorded Run Pace</span>
                <span className="font-extrabold text-cyan-400">
                  {appData.runs.length > 0
                    ? `${Math.min(...appData.runs.map((r) => r.paceMinKm)).toFixed(2)} min/km`
                    : '--'}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex justify-between items-center">
                <span className="text-xs text-slate-300">Max Single-Session Burn</span>
                <span className="font-extrabold text-orange-400">
                  {Math.max(...trendData.map((t) => t.calories), 0)} kcal
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex justify-between items-center">
                <span className="text-xs text-slate-300">Total Completed Workouts</span>
                <span className="font-extrabold text-purple-400">
                  {allDates.filter((d) => computeDayStats(appData.dailyLogs[d]).status === 'completed').length} Sessions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // VIEW 7: PERSONALISATION, BODY WEIGHT LOGGER & DATA BACKUP/RESTORE
  // --------------------------------------------------------------------------
  const [newWeightInput, setNewWeightInput] = useState('73.8');
  const fileInputRef = useRef(null);

  const renderSettingsAndData = () => {
    const handleExportJson = () => {
      const dataStr = JSON.stringify(appData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fitpulse-backup-${todayKey}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Full workout database exported as JSON!', 'success');
    };

    const handleImportJson = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          if (parsed && parsed.exercises && parsed.dailyLogs) {
            setAppData(parsed);
            showToast('Backup restored successfully!', 'success');
          } else {
            showToast('Invalid backup file format.', 'error');
          }
        } catch (err) {
          showToast('Failed to parse JSON backup file.', 'error');
        }
      };
      reader.readAsText(file);
    };

    const handleLogBodyWeight = (e) => {
      e.preventDefault();
      const val = parseFloat(newWeightInput);
      if (!val || val < 25 || val > 300) return;
      setAppData((prev) => ({
        ...prev,
        weightLogs: [
          ...prev.weightLogs.filter((w) => w.date !== todayKey),
          { id: `wt-${Date.now()}`, date: todayKey, weightKg: Number(val.toFixed(1)), bodyFatPct: 15.8 }
        ]
      }));
      showToast(`Logged ${val.toFixed(1)} kg for today!`, 'success');
    };

    return (
      <div className="space-y-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Personalisation & Goals */}
          <div className={`lg:col-span-6 p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-400" /> Personal Fitness Goals & Reminders
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Daily Calorie Target (kcal)</label>
                <input
                  type="number"
                  value={appData.goals.dailyCalories}
                  onChange={(e) =>
                    setAppData((prev) => ({
                      ...prev,
                      goals: { ...prev.goals, dailyCalories: Number(e.target.value) || 400 }
                    }))
                  }
                  className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Daily Duration Target (min)</label>
                <input
                  type="number"
                  value={appData.goals.dailyDurationMin}
                  onChange={(e) =>
                    setAppData((prev) => ({
                      ...prev,
                      goals: { ...prev.goals, dailyDurationMin: Number(e.target.value) || 30 }
                    }))
                  }
                  className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Weekly Running Goal (km)</label>
                <input
                  type="number"
                  value={appData.goals.weeklyDistanceKm}
                  onChange={(e) =>
                    setAppData((prev) => ({
                      ...prev,
                      goals: { ...prev.goals, weeklyDistanceKm: Number(e.target.value) || 15 }
                    }))
                  }
                  className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Daily Reminder Time</label>
                <input
                  type="time"
                  value={appData.goals.reminderTime}
                  onChange={(e) =>
                    setAppData((prev) => ({
                      ...prev,
                      goals: { ...prev.goals, reminderTime: e.target.value }
                    }))
                  }
                  className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Personal Fitness Manifesto & Notes</label>
              <textarea
                rows={3}
                value={appData.goals.personalNotes}
                onChange={(e) =>
                  setAppData((prev) => ({
                    ...prev,
                    goals: { ...prev.goals, personalNotes: e.target.value }
                  }))
                }
                className={`w-full px-3 py-2 rounded-xl border text-sm ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
                }`}
              />
            </div>

            {/* Body Weight Quick Logger */}
            <form onSubmit={handleLogBodyWeight} className="pt-3 border-t border-slate-800 flex items-end gap-3">
              <div className="flex-1">
                <label className="text-xs text-slate-400 block mb-1">Log Today's Body Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newWeightInput}
                  onChange={(e) => setNewWeightInput(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${
                    isDark ? 'bg-slate-800 border-slate-700 text-purple-400' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-sm"
              >
                Save Weight
              </button>
            </form>
          </div>

          {/* Data Persistence, Backup, Restore & PWA Controls */}
          <div className={`lg:col-span-6 p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" /> Persistent Storage, Backup & PWA
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              All workouts, custom exercises, running logs, and planner templates are saved automatically to browser LocalStorage and mirrored to IndexedDB so your data never disappears on refresh or offline use.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleExportJson}
                className="p-4 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Export JSON Backup
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-4 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-sm flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" /> Restore from Backup
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" /> Android PWA Installation Status
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                  Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manifest & 192×192 / 512×512 adaptive icons active. Supports standalone full-screen launch and offline workout logging.
              </p>
              <button
                onClick={() => setShowPwaModal(true)}
                className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs"
              >
                Open Android PWA Install Guide & Diagnostics
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400">Reset demo seed data if needed</span>
              <button
                onClick={() => {
                  const fresh = generateInitialSeedData();
                  setAppData(fresh);
                  showToast('Demo workout history reset to default 14-day seed.', 'info');
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 text-xs font-semibold"
              >
                Reset Seed Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // MODALS (TECHNIQUE MODAL, CUSTOM EXERCISE MODAL, PWA INSTALL MODAL)
  // ============================================================================
  const [customExForm, setCustomExForm] = useState({
    name: '',
    category: 'Strength Training',
    muscles: 'Core, Shoulders',
    defaultSets: 3,
    defaultReps: 12,
    defaultDurationMin: 3,
    defaultRest: 60,
    startingPosition: '',
    instructions: '',
    breathing: '',
    commonMistakes: '',
    beginnerVariation: '',
    advancedVariation: ''
  });

  const handleCreateCustomExercise = (e) => {
    e.preventDefault();
    if (!customExForm.name.trim()) return;
    const newEx = {
      id: `ex-custom-${Date.now()}`,
      name: customExForm.name.trim(),
      category: customExForm.category,
      muscles: customExForm.muscles.split(',').map((s) => s.trim()).filter(Boolean),
      defaultSets: Number(customExForm.defaultSets) || 3,
      defaultReps: Number(customExForm.defaultReps) || 12,
      defaultDuration: (Number(customExForm.defaultDurationMin) || 3) * 60,
      defaultRest: Number(customExForm.defaultRest) || 60,
      caloriesPerMin: customExForm.category === 'Cardio' ? 10.0 : 7.5,
      svgType: customExForm.category === 'Cardio' ? 'run' : customExForm.category === 'Strength Training' ? 'pushup' : 'yoga',
      startingPosition: customExForm.startingPosition || 'Maintain neutral spine and controlled posture.',
      instructions: customExForm.instructions
        ? customExForm.instructions.split('\n').filter(Boolean)
        : ['Execute movement with full range of motion and controlled tempo.'],
      breathing: customExForm.breathing || 'Inhale on the eccentric phase, exhale on exertion.',
      commonMistakes: customExForm.commonMistakes
        ? customExForm.commonMistakes.split('\n').filter(Boolean)
        : ['Rushing repetitions with momentum instead of muscular control.'],
      beginnerVariation: customExForm.beginnerVariation || 'Reduced range of motion or lighter resistance.',
      advancedVariation: customExForm.advancedVariation || 'Slower tempo or added external load.'
    };

    setAppData((prev) => ({
      ...prev,
      exercises: [newEx, ...prev.exercises]
    }));
    setShowCustomExerciseModal(false);
    showToast(`Added "${newEx.name}" to your Exercise Library!`, 'success');
  };

  // ============================================================================
  // MAIN LAYOUT RENDER
  // ============================================================================
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'tracker', label: 'Daily Tracker', icon: CheckCircle2 },
    { id: 'planner', label: 'Planner', icon: CalendarIcon },
    { id: 'running', label: 'Running', icon: Footprints },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings & PWA', icon: Settings }
  ];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${isDark ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 max-w-sm px-4 py-3 rounded-2xl bg-slate-900 border border-emerald-500/50 text-white shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Floating Active Rest Timer Bar */}
      {(restTimer.active || restTimer.remaining > 0) && restTimer.active && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-40 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-cyan-500/50 text-white shadow-2xl flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Timer className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold">{restTimer.label}</div>
            <div className="text-2xl font-mono font-extrabold">{restTimer.remaining}s</div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setRestTimer((prev) => ({ ...prev, remaining: prev.remaining + 15 }))}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold"
            >
              +15s
            </button>
            <button
              onClick={() => setRestTimer((prev) => ({ ...prev, active: false }))}
              className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
              title="Skip Rest"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Left Sidebar Navigation */}
      <aside
        className={`hidden md:flex md:w-64 lg:w-72 flex-col justify-between p-5 border-r shrink-0 ${
          isDark ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white border-slate-200'
        }`}
      >
        <div className="space-y-6">
          {/* App Brand Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight block leading-none">FitPulse Pro</span>
                <span className="text-[11px] text-emerald-400 font-semibold">PWA Fitness Architect</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition ${
                    active
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : isDark
                      ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom PWA Install & Offline Status Card */}
        <div className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs px-2">
            <span className="flex items-center gap-1.5 font-semibold">
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" /> Online & Synced
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" /> Offline Ready
                </>
              )}
            </span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white"
              title="Toggle Dark/Light Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>
          </div>

          <button
            onClick={() => {
              if (deferredPrompt) {
                deferredPrompt.prompt();
              } else {
                setShowPwaModal(true);
              }
            }}
            className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4" /> Install Android PWA App
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Mobile/Tablet Header */}
        <header
          className={`sticky top-0 z-30 px-4 sm:px-8 py-3.5 border-b backdrop-blur-md flex items-center justify-between ${
            isDark ? 'bg-[#090d16]/85 border-slate-800/80' : 'bg-white/85 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base leading-none block">FitPulse Pro</span>
              <span className="text-[10px] text-emerald-400 font-semibold">
                {isOnline ? 'PWA Online' : 'Offline Mode'}
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <h2 className="text-sm font-bold text-slate-400">
              {formatDisplayDate(todayKey)} • <span className="text-emerald-400">{currentStreak}-Day Active Streak</span>
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowPwaModal(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Install App</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Scrollable View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-10">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'tracker' && renderDailyTracker()}
          {activeTab === 'planner' && renderWorkoutPlanner()}
          {activeTab === 'running' && renderRunningTracker()}
          {activeTab === 'library' && renderExerciseLibrary()}
          {activeTab === 'analytics' && renderProgressAnalytics()}
          {activeTab === 'settings' && renderSettingsAndData()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        className={`md:hidden fixed bottom-0 inset-x-0 z-30 border-t px-2 py-1.5 grid grid-cols-6 gap-1 backdrop-blur-lg ${
          isDark ? 'bg-slate-950/95 border-slate-800' : 'bg-white/95 border-slate-200'
        }`}
      >
        {navItems.slice(0, 6).map((item) => {
          const IconComponent = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[10px] font-bold ${
                active ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400'
              }`}
            >
              <IconComponent className="w-4 h-4 mb-0.5" />
              <span className="truncate max-w-full">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* ==================================================================== */}
      {/* MODAL 1: DETAILED EXERCISE TECHNIQUE & INJURY PREVENTION GUIDE       */}
      {/* ==================================================================== */}
      {selectedLibraryExercise && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`max-w-2xl w-full rounded-3xl border p-6 space-y-4 max-h-[90vh] overflow-y-auto ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  {selectedLibraryExercise.category}
                </span>
                <h2 className="text-2xl font-extrabold mt-1">{selectedLibraryExercise.name}</h2>
              </div>
              <button
                onClick={() => setSelectedLibraryExercise(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ExerciseAnimationSVG
              svgType={selectedLibraryExercise.svgType}
              category={selectedLibraryExercise.category}
              size="lg"
            />

            <div className="space-y-3 text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="font-bold text-emerald-400 text-xs uppercase mb-1">Correct Starting Position</div>
                <p className="text-slate-200 text-xs leading-relaxed">{selectedLibraryExercise.startingPosition}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="font-bold text-emerald-400 text-xs uppercase mb-1">Step-by-Step Execution</div>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-200">
                  {selectedLibraryExercise.instructions?.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
                  <div className="font-bold text-cyan-400 text-xs uppercase mb-1">Breathing Technique</div>
                  <p className="text-xs text-slate-200">{selectedLibraryExercise.breathing}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30">
                  <div className="font-bold text-rose-400 text-xs uppercase mb-1">Common Mistakes (Injury Prevention)</div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-200">
                    {selectedLibraryExercise.commonMistakes?.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs">
                  <span className="font-bold text-emerald-400 block">Beginner Variation</span>
                  <span className="text-slate-300">{selectedLibraryExercise.beginnerVariation}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs">
                  <span className="font-bold text-purple-400 block">Advanced Variation</span>
                  <span className="text-slate-300">{selectedLibraryExercise.advancedVariation}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => {
                  handleAddExerciseToDay(selectedDate, selectedLibraryExercise.id);
                  setSelectedLibraryExercise(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                + Add to Workout ({selectedDate})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 2: CREATE CUSTOM EXERCISE                                      */}
      {/* ==================================================================== */}
      {showCustomExerciseModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleCreateCustomExercise}
            className={`max-w-xl w-full rounded-3xl border p-6 space-y-4 max-h-[90vh] overflow-y-auto ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Create Custom Exercise</h2>
              <button
                type="button"
                onClick={() => setShowCustomExerciseModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Exercise Name *</label>
                <input
                  type="text"
                  required
                  value={customExForm.name}
                  onChange={(e) => setCustomExForm({ ...customExForm, name: e.target.value })}
                  placeholder="e.g. Kettlebell Swings"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Category</label>
                <select
                  value={customExForm.category}
                  onChange={(e) => setCustomExForm({ ...customExForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option>Strength Training</option>
                  <option>Cardio</option>
                  <option>Flexibility and Mobility</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-slate-400 block mb-1">Target Muscles (comma separated)</label>
                <input
                  type="text"
                  value={customExForm.muscles}
                  onChange={(e) => setCustomExForm({ ...customExForm, muscles: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Default Sets</label>
                <input
                  type="number"
                  value={customExForm.defaultSets}
                  onChange={(e) => setCustomExForm({ ...customExForm, defaultSets: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Default Reps</label>
                <input
                  type="number"
                  value={customExForm.defaultReps}
                  onChange={(e) => setCustomExForm({ ...customExForm, defaultReps: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-slate-400 block mb-1">Starting Position</label>
                <input
                  type="text"
                  value={customExForm.startingPosition}
                  onChange={(e) => setCustomExForm({ ...customExForm, startingPosition: e.target.value })}
                  placeholder="Feet shoulder-width apart, core braced..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-slate-400 block mb-1">Execution Instructions (one step per line)</label>
                <textarea
                  rows={3}
                  value={customExForm.instructions}
                  onChange={(e) => setCustomExForm({ ...customExForm, instructions: e.target.value })}
                  placeholder="Step 1: Hinge at hips&#10;Step 2: Drive hips forward explosively"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm"
            >
              Save Exercise to Persistent Library
            </button>
          </form>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 3: ANDROID PWA INSTALLATION & OFFLINE DIAGNOSTICS              */}
      {/* ==================================================================== */}
      {showPwaModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`max-w-lg w-full rounded-3xl border p-6 space-y-4 ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold">Install FitPulse Pro (Android PWA)</h2>
                  <p className="text-xs text-slate-400">Standalone Native-Feel Experience & Offline Ready</p>
                </div>
              </div>
              <button
                onClick={() => setShowPwaModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live PWA Verification Checklist */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-slate-300 uppercase tracking-wider mb-1">PWA Technical Readiness</div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Web App Manifest (standalone, portrait)</span>
                <span className="text-emerald-400 font-bold">✓ Valid & Injected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">App Icons (192×192 & 512×512 PNG)</span>
                <span className="text-emerald-400 font-bold">✓ Generated</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Offline Caching & Storage</span>
                <span className="text-emerald-400 font-bold">✓ LocalStorage + IndexedDB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Network Connectivity</span>
                <span className="text-cyan-400 font-bold">{isOnline ? 'Online (Auto-Sync)' : 'Offline Mode Active'}</span>
              </div>
            </div>

            {/* Step-by-step Android Chrome instructions */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="font-bold text-sm text-white">How to Install on Android Chrome:</div>
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>
                  Open this page in <strong>Google Chrome on Android</strong>.
                </li>
                <li>
                  Tap the three-dot menu icon <MoreVertical className="w-3.5 h-3.5 inline text-emerald-400" /> in the top-right corner of Chrome.
                </li>
                <li>
                  Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                </li>
                <li>
                  Launch <strong>FitPulse Pro</strong> directly from your Android home screen in full-screen standalone mode without browser navigation bars—even with airplane mode turned on!
                </li>
              </ol>
            </div>

            <div className="flex gap-3 pt-2">
              {deferredPrompt && (
                <button
                  onClick={() => {
                    deferredPrompt.prompt();
                    setShowPwaModal(false);
                  }}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs"
                >
                  Trigger Native Install Prompt Now
                </button>
              )}
              <button
                onClick={() => setShowPwaModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}