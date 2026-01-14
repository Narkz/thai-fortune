// Thai Day Colors - Traditional Thai color system based on day of birth
// Each day has a sophisticated dark background gradient with the color as accent
export const THAI_DAY_COLORS = {
  0: {
    name: "Red",
    thai: "สีแดง",
    hex: "#DC2626",
    gradient: "from-red-500 to-rose-600",
    bgGradient: "linear-gradient(165deg, #2d1418 0%, #1a0a0c 50%, #0f0607 100%)",
    glowColor: "rgba(220, 38, 38, 0.15)"
  },
  1: {
    name: "Yellow",
    thai: "สีเหลือง",
    hex: "#EAB308",
    gradient: "from-yellow-400 to-amber-500",
    bgGradient: "linear-gradient(165deg, #2d2a14 0%, #1a1808 50%, #0f0e04 100%)",
    glowColor: "rgba(234, 179, 8, 0.15)"
  },
  2: {
    name: "Pink",
    thai: "สีชมพู",
    hex: "#EC4899",
    gradient: "from-pink-400 to-rose-500",
    bgGradient: "linear-gradient(165deg, #2d1424 0%, #1a0a14 50%, #0f060a 100%)",
    glowColor: "rgba(236, 72, 153, 0.15)"
  },
  3: {
    name: "Green",
    thai: "สีเขียว",
    hex: "#22C55E",
    gradient: "from-green-400 to-emerald-500",
    bgGradient: "linear-gradient(165deg, #0d4a4e 0%, #082a2d 50%, #061f22 100%)",
    glowColor: "rgba(34, 197, 94, 0.15)"
  },
  4: {
    name: "Orange",
    thai: "สีส้ม",
    hex: "#F97316",
    gradient: "from-orange-400 to-amber-500",
    bgGradient: "linear-gradient(165deg, #2d1f14 0%, #1a1208 50%, #0f0b04 100%)",
    glowColor: "rgba(249, 115, 22, 0.15)"
  },
  5: {
    name: "Blue",
    thai: "สีฟ้า",
    hex: "#3B82F6",
    gradient: "from-blue-400 to-cyan-500",
    bgGradient: "linear-gradient(165deg, #14202d 0%, #0a121a 50%, #06090f 100%)",
    glowColor: "rgba(59, 130, 246, 0.15)"
  },
  6: {
    name: "Purple",
    thai: "สีม่วง",
    hex: "#A855F7",
    gradient: "from-purple-400 to-violet-500",
    bgGradient: "linear-gradient(165deg, #1f142d 0%, #120a1a 50%, #09060f 100%)",
    glowColor: "rgba(168, 85, 247, 0.15)"
  },
} as const;

// Thai day names
export const THAI_DAYS = {
  0: { english: "Sunday", thai: "วันอาทิตย์" },
  1: { english: "Monday", thai: "วันจันทร์" },
  2: { english: "Tuesday", thai: "วันอังคาร" },
  3: { english: "Wednesday", thai: "วันพุธ" },
  4: { english: "Thursday", thai: "วันพฤหัสบดี" },
  5: { english: "Friday", thai: "วันศุกร์" },
  6: { english: "Saturday", thai: "วันเสาร์" },
} as const;

// Western Zodiac Signs
export const ZODIAC_SIGNS = [
  { name: "Capricorn", symbol: "♑", thai: "ราศีมังกร", element: "Earth", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: "Aquarius", symbol: "♒", thai: "ราศีกุมภ์", element: "Air", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: "Pisces", symbol: "♓", thai: "ราศีมีน", element: "Water", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: "Aries", symbol: "♈", thai: "ราศีเมษ", element: "Fire", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: "Taurus", symbol: "♉", thai: "ราศีพฤษภ", element: "Earth", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: "Gemini", symbol: "♊", thai: "ราศีเมถุน", element: "Air", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { name: "Cancer", symbol: "♋", thai: "ราศีกรกฎ", element: "Water", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { name: "Leo", symbol: "♌", thai: "ราศีสิงห์", element: "Fire", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: "Virgo", symbol: "♍", thai: "ราศีกันย์", element: "Earth", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: "Libra", symbol: "♎", thai: "ราศีตุลย์", element: "Air", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { name: "Scorpio", symbol: "♏", thai: "ราศีพิจิก", element: "Water", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { name: "Sagittarius", symbol: "♐", thai: "ราศีธนู", element: "Fire", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
] as const;

// Lucky direction based on element
export const ELEMENT_DIRECTIONS = {
  Fire: { direction: "South", degrees: 180, thai: "ทิศใต้" },
  Earth: { direction: "Center/Northeast", degrees: 45, thai: "ทิศตะวันออกเฉียงเหนือ" },
  Air: { direction: "East", degrees: 90, thai: "ทิศตะวันออก" },
  Water: { direction: "North", degrees: 0, thai: "ทิศเหนือ" },
} as const;

// Get the day of week for a date
export function getDayOfWeek(date: Date): number {
  return date.getDay();
}

// Get today's color based on current day
export function getTodayColor() {
  const today = new Date();
  const dayOfWeek = today.getDay() as keyof typeof THAI_DAY_COLORS;
  return THAI_DAY_COLORS[dayOfWeek];
}

// Get birth color based on birthday
export function getBirthColor(birthday: Date) {
  const dayOfWeek = birthday.getDay() as keyof typeof THAI_DAY_COLORS;
  return {
    color: THAI_DAY_COLORS[dayOfWeek],
    day: THAI_DAYS[dayOfWeek],
  };
}

// Calculate lucky number based on birthday (Thai numerology)
export function calculateLuckyNumber(birthday: Date): number {
  const day = birthday.getDate();
  const month = birthday.getMonth() + 1;
  const year = birthday.getFullYear();

  // Sum all digits
  let sum = 0;
  const dateString = `${day}${month}${year}`;
  for (const digit of dateString) {
    sum += parseInt(digit, 10);
  }

  // Reduce to single digit (except master numbers 11, 22, 33)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    let newSum = 0;
    for (const digit of sum.toString()) {
      newSum += parseInt(digit, 10);
    }
    sum = newSum;
  }

  return sum;
}

// Get daily lucky number (changes daily)
export function getDailyLuckyNumber(birthday: Date): number {
  const today = new Date();
  const baseLucky = calculateLuckyNumber(birthday);
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

  // Combine base lucky number with day of year for daily variation
  let dailyNum = (baseLucky + dayOfYear) % 100;
  if (dailyNum < 10) dailyNum = dailyNum * 11; // Ensure 2 digits for visual appeal

  return dailyNum;
}

// Get zodiac sign based on birthday
export function getZodiacSign(birthday: Date) {
  const month = birthday.getMonth() + 1;
  const day = birthday.getDate();

  for (const sign of ZODIAC_SIGNS) {
    if (sign.startMonth === 12) {
      // Handle Capricorn which spans December-January
      if ((month === 12 && day >= sign.startDay) || (month === 1 && day <= sign.endDay)) {
        return sign;
      }
    } else if (
      (month === sign.startMonth && day >= sign.startDay) ||
      (month === sign.endMonth && day <= sign.endDay)
    ) {
      return sign;
    }
  }

  // Default to Capricorn (should never reach here)
  return ZODIAC_SIGNS[0];
}

// Get lucky direction based on zodiac element
export function getLuckyDirection(birthday: Date) {
  const sign = getZodiacSign(birthday);
  return {
    sign,
    direction: ELEMENT_DIRECTIONS[sign.element],
  };
}

// Daily horoscope messages (rotating based on day)
const DAILY_MESSAGES = {
  positive: [
    "The stars align in your favor today. Trust your intuition and embrace new opportunities.",
    "Your energy is magnetic today. Others are drawn to your natural charisma.",
    "A unexpected blessing may arrive. Stay open to receiving abundance.",
    "Your creativity flows freely. This is an excellent day for artistic pursuits.",
    "Harmony surrounds you. Relationships flourish under today's celestial influence.",
    "Fortune favors the bold. Take that leap of faith you've been considering.",
    "Inner peace guides your decisions. Trust the wisdom within.",
  ],
  guidance: [
    "Focus on self-care and nurturing your spirit.",
    "Connect with loved ones and strengthen bonds.",
    "Take time to reflect and plan your next steps.",
    "Express gratitude for the blessings in your life.",
    "Balance work and rest for optimal wellbeing.",
    "Trust the timing of the universe.",
    "Let go of what no longer serves you.",
  ],
} as const;

// Get daily horoscope
export function getDailyHoroscope(birthday: Date) {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const sign = getZodiacSign(birthday);

  // Use birthday month to offset the message selection for personalization
  const birthMonth = birthday.getMonth();
  const messageIndex = (dayOfYear + birthMonth) % DAILY_MESSAGES.positive.length;
  const guidanceIndex = (dayOfYear + birthMonth + 3) % DAILY_MESSAGES.guidance.length;

  return {
    sign,
    message: DAILY_MESSAGES.positive[messageIndex],
    guidance: DAILY_MESSAGES.guidance[guidanceIndex],
    luckyHour: ((dayOfYear + birthMonth) % 12) + 6, // Between 6am and 6pm
  };
}

// Format date for display
export function formatThaiDate(date: Date): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
