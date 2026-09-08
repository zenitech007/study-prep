// High-energy Nigerian student encouragement, warmth, and resilience copy
// For toasts, streaks, results celebrations, and wrong-answer encouragement.

export const CORRECT_FEEDBACK_PHRASES = [
  "You sabi this thing die! 🔥",
  "Correct! Sharp nurse in the making! 🩺",
  "Oya! You dey run this course well well!",
  "A1 material! Keep that fire burning! ⚡",
  "Spot on! Distinctions only! 🌟",
  "No shaking! Your clinical eye is too sharp!",
  "Gbam! Exactly as the Ibadan manual stated!",
  "Odogwu student! That's how to master NSG 215!",
];

export const INCORRECT_FEEDBACK_PHRASES = [
  "Chai, small mistake! No shaking, review the rationale below.",
  "E reach to doubt! Check the explanation and lock it down.",
  "Easy! Even Florence Nightingale made mistakes. Sabi it now!",
  "No panic, nurse! Read the rationale well well, we go again.",
  "Close call! Look at why that distractor tripped you up.",
  "Chop that knowledge and move! Master the concept below.",
];

export const STREAK_PHRASES = [
  "Streak on fire! 🔥 3 correct in a row! Oya keep pressing!",
  "5-streak hit! You dey cook something serious! 👨‍🍳",
  "7 straight! UI professors will be proud of you!",
  "10-streak combo! Certified genius mode activated! 🚀",
];

export const COMPLETION_HIGH_PHRASES = [
  "Chai! Outstanding result! You sabi this course finish! 🎓",
  "Pure distinction vibes! NSG 215 don bow for you! 🏆",
  "Top-tier performance! Nurse extraordinaire in the making! 🩺",
];

export const COMPLETION_MEDIUM_PHRASES = [
  "Solid work! You get good ground, just polish the weak topics! 💪",
  "Good hustle! Drill the missed ones and you go smash 90%+!",
];

export const COMPLETION_LOW_PHRASES = [
  "We don start the journey! Rome was not built in a day, do another drill!",
  "No surrender! Re-read the Quick-Prep notes and drill again!",
];

export function getRandomPhrase(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

export function getCompletionPhrase(percentage: number): string {
  if (percentage >= 75) return getRandomPhrase(COMPLETION_HIGH_PHRASES);
  if (percentage >= 50) return getRandomPhrase(COMPLETION_MEDIUM_PHRASES);
  return getRandomPhrase(COMPLETION_LOW_PHRASES);
}
