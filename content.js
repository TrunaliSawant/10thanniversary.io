/* ==========================================================================
   10 YEARS OF US — YOUR CONTENT
   --------------------------------------------------------------------------
   Everything personal lives in this one file. Edit text, dates, photos,
   questions and songs here; you never need to touch index.html.

   PHOTOS  → put files in /photos and write the path, e.g. "photos/first-date.jpg"
             Leave "" to show a soft placeholder. Use JPG/WebP, ~1600px wide max.
   VIDEO   → optional "photos/clip.mp4" on any timeline item.
   SONG    → put the file in /music and set song.src.
   Lines marked  ✏️  are examples you should replace with your real story.
   ========================================================================== */

window.CONTENT = {
  meta: {
    herName: "My Love",
    signature: "Me",
    startDate: "2016-10-10T00:00:00+05:30",
    unlockAt:  "2026-10-10T00:00:00+05:30",          // 12:00 AM IST
    // SHA-256 of the dev passcode (never the passcode itself).
    // To change it, see README.md.
    devPasscodeHash: "156d1a074d30bed599cce52edd7975d2dc27d3a8ac3d2c7aaf70842f2d04aa52",
    // Optional: your WhatsApp number with country code, digits only, e.g. "919876543210".
    // Lets her send her answers straight to you.
    whatsappNumber: ""
  },

  hero: {
    photo: "",                                        // ✏️ your best photo together
    caption: "Us, somewhere between then and forever"
  },

  timeline: [
    { date: "10 October 2016", title: "And then there were two…", text: "The day everything quietly changed. Neither of us knew it yet, but a story had just started.", photo: "", location: "", quote: "" },
    { date: "October 2016", title: "Our first conversation", text: "✏️ What you talked about, who said what first, how long it went on.", photo: "", quote: "I remember thinking: I could talk to her forever." },
    { date: "November 2016", title: "Our first photo", text: "✏️ Slightly blurry, badly lit, and still one of my favourite pictures in the world.", photo: "" },
    { date: "December 2016", title: "Our first date", text: "✏️ Where you went, what you ate, the moment you knew it was going well.", photo: "", location: "✏️ The café" },
    { date: "2017", title: "Our first trip", text: "✏️ The first time we packed bags for the same place.", photo: "", location: "✏️ Goa" },
    { date: "2018", title: "The time we laughed until it hurt", text: "✏️ One of those days we still bring up out of nowhere.", photo: "" },
    { date: "2019", title: "Birthdays, festivals and everything between", text: "✏️ Diwali lights, cakes with too many candles, the people we became part of.", photo: "" },
    { date: "2020", title: "The hard year", text: "✏️ The distance, the waiting, the calls that kept us going. We made it through together.", photo: "", quote: "We were never apart in the ways that mattered." },
    { date: "2022", title: "Proud of you", text: "✏️ A big achievement, a new job, a degree. I have never clapped louder.", photo: "" },
    { date: "2024", title: "My favourite ordinary day", text: "✏️ Nothing special happened. That's exactly why I loved it.", photo: "" },
    { date: "10 October 2026", title: "Today", text: "Ten years later. Still you. Always you.", photo: "" }
  ],

  gallery: [
    { photo: "", date: "2016", title: "The beginning", text: "Before we knew how much this would mean.", note: "This was one of those ordinary days that somehow became one of my favourite memories." },
    { photo: "", date: "2017", title: "First trip", text: "✏️ Sunburnt and happy.", note: "" },
    { photo: "", date: "2017", title: "Late night chai", text: "✏️ The tiny stall that became ours.", note: "", secret: "Hidden note: I still owe you that last sip." },
    { photo: "", date: "2018", title: "Your birthday", text: "✏️ The surprise that almost wasn't.", note: "" },
    { photo: "", date: "2019", title: "Festival lights", text: "✏️ You in that colour. I forgot to breathe.", note: "" },
    { photo: "", date: "2020", title: "Video call era", text: "✏️ Screens between us, but never distance.", note: "" },
    { photo: "", date: "2021", title: "Road trip", text: "✏️ Wrong turns, best songs.", note: "", secret: "Hidden note: you were right about the shortcut. Once." },
    { photo: "", date: "2022", title: "Proud moment", text: "✏️ I was the loudest one in the room.", note: "" },
    { photo: "", date: "2023", title: "Monsoon", text: "✏️ Soaked, laughing, no umbrella.", note: "" },
    { photo: "", date: "2025", title: "Just us", text: "✏️ A Sunday that felt like home.", note: "" }
  ],

  beforeAfter: {
    before: { photo: "", label: "2016" },             // ✏️ an early photo of you two
    after:  { photo: "", label: "2026" },             // ✏️ a recent one, same pose if you have it
    caption: "Same two people. Ten years more in love."
  },

  featured: { photo: "", line: "Some moments deserve the whole screen." },

  letter: {
    greeting: "My love,",
    paragraphs: [
      "I've started this letter a hundred times. Every version felt too small for what I wanted to say, so I'm going to stop trying to make it perfect and just tell you the truth.",
      "Ten years ago, on the tenth of October, my life split into two parts: everything before you, and everything after. I didn't know it that day. I just knew I wanted to keep talking to you, and then I wanted to see you again, and then I couldn't imagine a week without you in it.",
      "You've seen every version of me. The nervous one, the stubborn one, the one who forgets to text back, the one who gets lost even with the map open. You stayed through all of them. You made each one a little better.",
      "Thank you for the ordinary days. The chai, the long drives, the arguments about nothing, the way you laugh at your own jokes before you finish them. Those small things are the biggest part of my life.",
      "We've had hard years too. I'm proud of how we held on. Every time it got heavy, we chose each other again, and I think that's what love really is. Choosing again, on the difficult days most of all.",
      "So here is what I want you to know, today and every day after: I am still choosing you. I'll keep choosing you in every city, every argument, every celebration, every quiet morning we haven't had yet."
    ],
    closing: "If I had to choose again, I'd still choose you.",
    signoff: "Always yours,"
  },

  poems: [
    { title: "The Day We Met", lines: ["It wasn't loud, the way it started,", "no thunder, no falling stars;", "just a hello that stayed a little longer", "than hellos are meant to stay.", "I didn't know I'd met my life.", "I only knew I wanted more of the day."] },
    { title: "Ten Years", lines: ["Ten Octobers, ten small rains,", "three thousand mornings, give or take;", "a thousand fights we never meant,", "a million reasons to stay awake.", "If time is the price of a love like this,", "I'd pay it twice for one more year of you."] },
    { title: "You", lines: ["You are the quiet in a crowded room,", "the warm side of every winter,", "the song I hum without knowing,", "the answer before the question.", "I've tried to find the edges of you.", "There aren't any."] },
    { title: "Home", lines: ["I used to think home was a place:", "four walls, a door, a light left on.", "Then you leaned into my shoulder", "on a slow bus, half asleep,", "and I understood.", "Home was never where. It was who."] },
    { title: "Still You", lines: ["Different haircut, different city,", "different worries, different dreams;", "everything around us changed its shape", "except the thing that matters most.", "Ask me in ten more years.", "Still you."] },
    { title: "Forever", lines: ["People say forever like it's far,", "a word for the ends of stories.", "But forever is just today,", "chosen again tomorrow,", "and again the day after that.", "I'm ready. Let's keep choosing."] }
  ],

  // answer = index of the correct option (0 = first). ✏️ Fill with your real answers.
  quiz: [
    { q: "Where did we first meet?", options: ["College", "A friend's party", "Online", "At work"], answer: 0, reveal: "✏️ Write a cute line about it here." },
    { q: "Who texted first?", options: ["You", "Me", "It was a tie", "Nobody remembers"], answer: 1, reveal: "Obviously. I couldn't wait." },
    { q: "Who said \"I love you\" first?", options: ["You", "Me", "We said it together", "The dog"], answer: 1, reveal: "And I meant it more every year." },
    { q: "What was our first movie together?", options: ["✏️ Movie A", "✏️ Movie B", "✏️ Movie C", "✏️ Movie D"], answer: 0, reveal: "I don't remember the plot. I was watching you." },
    { q: "Who gets angry first?", options: ["You", "Me", "Depends on hunger", "Both, instantly"], answer: 2, reveal: "Feed us and all is forgiven." },
    { q: "Who apologises first?", options: ["You", "Me", "Whoever's hungrier", "We both do, at the same time"], answer: 1, reveal: "Because being right is overrated." },
    { q: "Who is more dramatic?", options: ["You", "Me", "Equally iconic", "Let's not answer this"], answer: 3, reveal: "Wise choice." },
    { q: "Who takes longer to get ready?", options: ["You", "Me", "Same", "The mirror decides"], answer: 0, reveal: "Worth every minute. Every single time." },
    { q: "What's our favourite food together?", options: ["✏️ Biryani", "✏️ Pizza", "✏️ Pani puri", "✏️ Maggi at 2am"], answer: 0, reveal: "Our love language." },
    { q: "What was our first trip?", options: ["✏️ Goa", "✏️ Lonavala", "✏️ Udaipur", "✏️ Manali"], answer: 0, reveal: "The first of many more." }
  ],

  questions: [
    "What's your favourite memory of us?",
    "When did you realise you loved me?",
    "What is something about us you never want to change?",
    "Where should we travel together next?",
    "What do you want our next 10 years to look like?",
    "What's one thing I do that always makes you smile?",
    "What's your favourite version of us?",
    "If we could relive one day, which would you choose?"
  ],

  reasons: [
    { title: "Your Smile", text: "It changes the weather in any room. Mine included." },
    { title: "Your Laugh", text: "The real one, the one that snorts a little. My favourite sound." },
    { title: "The Way You Care", text: "Quietly, completely, before anyone even asks." },
    { title: "Your Strength", text: "You've carried hard things with so much grace." },
    { title: "Your Honesty", text: "You tell me the truth, especially when I need it." },
    { title: "How You Remember", text: "Tiny details I mentioned once, years ago. You kept them all." },
    { title: "Your Kindness", text: "To waiters, strangers, stray dogs and to me on my worst days." },
    { title: "Your Silliness", text: "The voices, the dances, the made-up songs. Never stop." },
    { title: "How You Believe in Me", text: "Even when I don't. Especially then." },
    { title: "Just You", text: "All of it. Every version. For ten years and counting." }
  ],

  jokes: [
    { emoji: "🍕", title: "That one fight about…", punchline: "✏️ …whether pineapple belongs on pizza. It does not. We agreed to disagree forever." },
    { emoji: "🗺️", title: "The legendary shortcut", punchline: "✏️ 45 minutes longer. Zero regrets. Several regrets." },
    { emoji: "🙈", title: "You still haven't admitted…", punchline: "✏️ …that you ate the last piece. I have evidence." },
    { emoji: "🎤", title: "Our 2am concert", punchline: "✏️ The neighbours remember. They have not forgiven us." },
    { emoji: "🐒", title: "Only we understand why this is funny", punchline: "✏️ The monkey. You know the monkey." },
    { emoji: "📸", title: "\"Just one more photo\"", punchline: "✏️ Famous last words. Approximately 400 photos later." }
  ],

  song: {
    title: "✏️ Our Song",
    artist: "✏️ Artist name",
    src: "",                                          // ✏️ e.g. "music/our-song.mp3"
    cover: "",                                        // ✏️ e.g. "photos/song-cover.jpg"
    note: "Every time this plays, I'm back there with you."
  },

  // lat/lng only need to be roughly right; they place the stars on the memory map.
  places: [
    { name: "✏️ Where we met",          lat: 19.07, lng: 72.88, date: "2016", text: "Where it all started.", photo: "" },
    { name: "✏️ Our first date",         lat: 19.20, lng: 72.97, date: "2016", text: "The nervous laughter, the shared dessert.", photo: "" },
    { name: "✏️ Favourite restaurant",   lat: 18.52, lng: 73.86, date: "Always", text: "Same table, same order, every time.", photo: "" },
    { name: "✏️ First trip — Goa",       lat: 15.30, lng: 74.12, date: "2017", text: "Sand everywhere. Happiness everywhere.", photo: "" },
    { name: "✏️ Favourite place",        lat: 24.58, lng: 73.71, date: "2021", text: "The sunset we still talk about.", photo: "" },
    { name: "Someday: Paris",           lat: 48.86, lng: 2.35,  date: "Soon", text: "A promise for the next ten years.", photo: "", future: true },
    { name: "Someday: Kyoto",           lat: 35.01, lng: 135.77, date: "Soon", text: "Cherry blossoms, together.", photo: "", future: true }
  ],

  surprise: {
    lines: ["10 years was never the destination.", "It was just the beginning."],
    after: "Here's to the next 10. ❤️"
  },

  future: [
    { title: "Places we'll go", text: "Paris, Kyoto, and every small town in between." },
    { title: "Things we'll do", text: "Learn to cook that dish properly. Finally." },
    { title: "A home that's ours", text: "With a balcony for chai and plants we'll forget to water." },
    { title: "Dreams we'll chase", text: "Yours, mine, and the ones we haven't dreamt yet." },
    { title: "Memories we haven't made", text: "Saving this frame for something wonderful." },
    { title: "Year 20", text: "Same us. More stories." }
  ],

  secrets: {
    heart: "You found it. I hid this here because you always find the little things. I love you more than all ten years put together.",
    keyboard: "Secret unlocked: you are, officially and forever, my favourite person.",
    star: "This is the last secret. I'll keep writing you love letters until we're old and grey, and then I'll write bigger ones so you can read them.",
    gallery: "You looked at every single memory. That's the most you thing ever. ❤️"
  }
};
