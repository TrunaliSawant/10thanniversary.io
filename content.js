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
    signature: "",
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
    photo: "photos/our-best-picture.jpeg",
    caption: ""
  },

  // OUR STORY — photo, date and caption for each moment.
  // Photo names are lowercase with hyphens so they work on GitHub (it is case-sensitive).
  timeline: [
    { date: "09 Oct 2016", title: "And then there were two…", photo: "photos/and-then-there-were-two.jpeg", text: "" },
    { date: "5 July 2016", title: "Our first conversation", photo: "photos/first-conversation.jpeg", text: "" },
    { date: "27 Oct 2016", title: "Our first photo", photo: "photos/our-first-picture.jpeg", text: "आम्ही भेटलो…पुन्हा पुन्हा भेटण्यासाठी❤️💫" },
    { date: "2017", title: "Our first date", photo: "photos/our-first-date.jpeg", text: "❤️Empty pockets, full hearts, endless memories🫶🏻" },
    { date: "Feb 2017", title: "Our first trip", photo: "photos/our-first-trip.jpeg", text: "Little blur but beautiful ✨" },
    { date: "10 Oct 2018", title: "Birthdays", photo: "photos/first-birthday.jpeg", text: "celebration of togetherness 👫" },
    { date: "2021", title: "The hard year", photo: "photos/hard-year.jpeg", text: "A hard year passed.... but we stood strong together each time... I am feeling so blessed when I'm looking back at that memory💕" },
    { date: "2022", title: "Proud of you", photo: "photos/proud-of-you.jpeg", text: "Our greatest achievement is standing firmly by each other's side... We have accomplished many things, big and small, in life, but the greatest thing is having each other's support. So much has changed over the years, yet our love has remained constant and I consider that a truly magnificent achievement❤️✨ year 2022" },
    { date: "1st Jan 2025", title: "My favourite ordinary day", photo: "photos/ordinary-day.jpeg", text: "" },
    { date: "23 Sept 2026", title: "Today", photo: "photos/today.jpeg", text: "गेल्या १० वर्षांकडे मागे वळून पाहताना हे सर्व एखाद्या स्वप्नासारखे वाटते. 🥹❤️ तरुणपणी आयुष्याचा शोध घेण्यापासून ते एकमेकांसोबत प्रगती करण्यापर्यंतचा हा प्रवास; या काळात आपण अनेक आठवणी, हास्य-विनोद, छोटी-मोठी भांडणे आणि असे असंख्य क्षण अनुभवले आहेत, जे माझ्यासाठी अत्यंत मोलाचे आहेत. आपल्याकडे कदाचित सर्व काही नसेल, पण आपण नेहमीच एकमेकांच्या पाठीशी खंबीरपणे उभे राहिलो. आपल्या खिशात नेहमीच भरपूर पैसे नसायचे, पण आपली मने मात्र नक्कीच प्रेमाने भरलेली असायची. आणि जर मला पुन्हा भूतकाळात जाण्याची संधी मिळाली, तर प्रत्येक जन्मात मी पुन्हा तुझीच निवड करेन. ♾️❤️" }
  ],

  // 10 YEARS. THOUSANDS OF MEMORIES. — the caption is the photo's name.
  // Optional per photo: date, text, note, secret (a hidden note revealed in full-screen view).
  gallery: [
    { photo: "photos/the-beginning.jpeg", title: "The beginning" },
    { photo: "photos/motichur-ladoo.jpeg", title: "Me and my Motichur Ladoo❤️" },
    { photo: "photos/a-twirl.jpeg", title: "A twirl💫" },
    { photo: "photos/konkan-with-him.jpeg", title: "❤️Konkan with him ✨😍" },
    { photo: "photos/staring-at-him.jpeg", title: "stareing at him is my fav task💫" },
    { photo: "photos/together-we-will-achieve.jpeg", title: "Just like this we will achieve everything in life and will face every challenge together 💪🏻🤟🏻" },
    { photo: "photos/still-together.jpeg", title: "The happiness when someone said ....they are still together 😲🫠❤️" }
  ],

  // Optional extras for the Memories section. Leave photo "" to hide them.
  beforeAfter: {
    before: { photo: "", label: "2016" },
    after:  { photo: "", label: "2026" },
    caption: "Same two people. Ten years more in love."
  },

  featured: { photo: "", line: "Some moments deserve the whole screen." },

  letter: {
    greeting: "",
    paragraphs: [
      "Some things are irreplaceable...❤️",
      "The nicknames you gives me",
      "Sonpari...dreamgirl... sweetheart...truna",
      "Often when I remember old things I remember of you...a young boy madly in love with me💓the things you did to show love...",
      "It's been 10 years and we still love eachother...maybe our style has changed...but feelings are exactly same...and our love is so true that even worse fight can't separate us till now...",
      "So maybe it's all god's blessings and our destiny...",
      "But I am praying and will pray every day to keep our bond that special that even 50 years seems so small..and we can say we just started yesterday...we talked...we wandered...we discovered eachother..each habit..each manner...every detail lovingly...we loved..we accepted and hold ...hold the hand...a breath..a lips and us...tightly.",
      "We will do many more things in life...we will surely succeed one day...but we won at life already that we have each other....love you bhushu...and 10.10.16 is the best day of my life..."
    ],
    closing: "If I had to choose again, I'd still choose you.",
    signoff: "Yours one and only💞"
  },

  // One poem, shown stanza by stanza.
  poems: [
    { title: "", stanzas: [
      "शाळेत एकाच वर्गात होतो, पण तेव्हा कुठे एकमेकांसाठी खास होतो… ना प्रेम होतं, ना प्रेमाची जाणीव, फक्त एकाच शाळेत होतो, एवढीच होती ओळखीची खूण… ❤️",
      "पण २०१६ मध्ये काहीतरी बदललं, आपल्या साध्याशा बोलण्यातून एक नातं फुललं… कधी गप्पा वाढल्या, कधी मैत्रीचं रूप बदललं, आणि नकळत माझं मन तुझ्यातच गुंतत गेलं… 🫶🏻",
      "कधी विचारही केला नव्हता, की एक दिवस तू माझ्या आयुष्याचा इतका महत्त्वाचा भाग होशील… ज्याच्याशी कधीकाळी फक्त शाळेपुरती ओळख होती, त्याच्याशिवाय माझा एकही आनंद पूर्ण होणार नाही… 🥹",
      "या दहा वर्षांत कितीतरी क्षण आले, कधी हसवणारे, तर कधी डोळ्यांत पाणी आणणारे… कधी रुसवे होते, कधी भांडणं होती, पण प्रत्येक वादानंतरही मनाला तुझीच ओढ होती… ❤️",
      "आपण फक्त एकमेकांवर प्रेम केलं नाही, तर एकमेकांच्या स्वभावासकट एकमेकांना स्वीकारलं… एकमेकांचे हट्ट, राग, वेडेपणा सांभाळले, आणि नकळत एकमेकांच्या आयुष्याचे अविभाज्य भाग झालो… 🫂",
      "आज मागे वळून पाहताना एकच गोष्ट जाणवते, २०१६ मध्ये सुरू झालेली आपली गोष्ट आजही तितकीच जवळची वाटते… तेव्हा तू माझ्यासाठी फक्त एक ओळखीचा चेहरा होतास, आणि आज… तू माझ्या उद्याच्या प्रत्येक स्वप्नात असतोस. 💍❤️",
      "दहा वर्षं झाली आपल्या नात्याला, पण मन अजूनही तुझ्याबरोबरच्या पहिल्या क्षणांत हरवतं… आयुष्याने कितीही वळणं घेतली, तरी प्रत्येक वळणावर तुझाच हात हातात असावा, असं वाटतं… ♾️",
      "मला तुझ्यासोबत फक्त प्रेमाचे क्षण नाही जगायचे, तर आयुष्याच्या प्रत्येक टप्प्यावर तुझी साथ अनुभवायची आहे…",
      "आज दहा वर्षं झाली, उद्या कदाचित आपण नव्या नात्याने एकत्र येऊ, पण माझ्यासाठी तू नेहमी तोच असशील… ज्याच्याशी २०१६ मध्ये बोलायला सुरुवात केली, आणि ज्याच्यासोबत संपूर्ण आयुष्य घालवण्याचं स्वप्न पाहिलं… ❤️🥹",
      "कारण भूषण, तू माझ्या आयुष्यात आलेला फक्त एक प्रेमाचा अध्याय नाहीस… तू ती गोष्ट आहेस, जिचा शेवट मला कधीच नकोय. ❤️🧿",
      "१० वर्षं आपल्या प्रेमाची… आणि अजून एक अख्खं आयुष्य आपल्या दोघांचं बाकी आहे. 🫶🏻♾️"
    ] }
  ],

  // answer = position of the right option (0 = first)
  quiz: [
    { q: "आपल्या दोघांमध्ये जास्त रोमँटिक कोण आहे?", options: ["भूषण ❤️", "तृणाली 💗", "दोघेही", "दोघेही प्रेम दाखवत नाहीत 😂"], answer: 2 },
    { q: "भांडण झाल्यावर आधी समजूत कोण काढतं?", options: ["भूषण", "तृणाली", "दोघेही आपापला इगो घेऊन बसतात 😤", "काही वेळाने आपोआप बोलायला लागतात 😂"], answer: 3 },
    { q: "एकमेकांना चिडवण्यात जास्त हुशार कोण आहे?", options: ["भूषण", "तृणाली", "दोघेही एक नंबरचे खोडकर 😜", "जो चिडतो तोच हरतो 😂"], answer: 2 },
    { q: "आपल्या दोघांमध्ये जास्त हट्टी कोण आहे?", options: ["भूषण", "तृणाली", "दोघेही", "दोघेही स्वतःला हट्टी मानत नाहीत 🤣"], answer: 3 },
    { q: "आपल्यापैकी कोण आपल्या भावना जास्त लपवतं?", options: ["भूषण", "तृणाली", "दोघेही 🥹", "भावना लपवता येतच नाहीत ❤️"], answer: 3 },
    { q: "अचानक फिरायला जायचं ठरलं तर प्लॅन कोण बनवेल?", options: ["भूषण", "तृणाली", "दोघे मिळून", "प्लॅन भरपूर, पण तयारी शून्य 😂"], answer: 2 },
    { q: "आपल्यापैकी कोण दुसऱ्याची जास्त काळजी घेतं?", options: ["भूषण", "तृणाली", "दोघेही आपापल्या पद्धतीने 🫶🏻", "काळजी घेतात, पण मान्य कोणीच करत नाही 😏"], answer: 2 },
    { q: "आपल्या नात्यात जास्त नाटक कोण करतं?", options: ["भूषण 🎬", "तृणाली 👑", "दोघेही", "नाटक नाही, आमचं प्रेमच फिल्मी आहे 😂"], answer: 3 },
    { q: "१० वर्षांच्या नात्यात आपल्याला सर्वात जास्त जोडून ठेवणारी गोष्ट कोणती?", options: ["प्रेम ❤️", "मैत्री 🤝", "विश्वास आणि समजूतदारपणा 🥹", "या सगळ्यांचं सुंदर मिश्रण 💗"], answer: 3 },
    { q: "पुढची १० वर्षं आपल्या नात्यात काय असावं असं आपल्याला वाटतं?", options: ["आणखी प्रेम ❤️", "भरपूर प्रवास आणि आठवणी 🌍", "लग्न आणि आयुष्यभराची साथ 💍", "काहीही झालं तरी एकमेकांची साथ ♾️"], answer: 3 }
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

  song: {
    title: "Kehta Hai Pal Pal",
    artist: "Armaan Malik, Shruti Pathak",
    src: "music/kehta-hai-pal-pal.mp3",
    cover: "photos/more/m095.jpeg",
    note: "Every time this plays, I'm back there with you."
  },

  // The stars on the map are drawn in this order; "link" is the Google Maps link that opens.
  places: [
    { name: "Where we met", where: "Marine Lines, Mumbai", lat: 18.9447, lng: 72.8236, link: "https://maps.app.goo.gl/Xw1YQDy3bmRtpnFB6" },
    { name: "Our first date", where: "Hanging Garden, Malabar Hill", lat: 18.9567, lng: 72.8050, link: "https://maps.app.goo.gl/CwUcqfo9SzLQLfkr9" },
    { name: "Our favourite place", where: "Chhota Kashmir, Aarey Colony", lat: 19.1550, lng: 72.8720, link: "https://maps.app.goo.gl/TjrVuM1L47mWmL3o6" },
    { name: "Our favourite trip", where: "Ajanta Caves", lat: 20.5519, lng: 75.7033, link: "https://maps.app.goo.gl/3bynHkbZwM6uDVDSA" }
  ],

  // NEW PHOTO SECTIONS — all in photos/more/
  // "Our little film": a slow slideshow that can play with the song.
  slideshow: ["photos/more/m004.jpeg", "photos/more/m009.jpeg", "photos/more/m010.jpeg", "photos/more/m007.jpeg", "photos/more/m005.jpeg", "photos/more/m056.jpeg", "photos/more/m061.jpeg", "photos/more/m067.jpeg", "photos/more/m069.jpeg", "photos/more/m084.jpeg", "photos/more/m088.jpeg", "photos/more/m091.jpeg", "photos/more/m089.jpeg", "photos/more/m130.jpeg", "photos/more/m072.jpeg", "photos/more/m099.jpeg"],

  // "Our scrapbook": scattered polaroids, then a photo wall.
  scrapbook: ["photos/more/m077.jpeg", "photos/more/m096.jpeg", "photos/more/m112.jpeg", "photos/more/m094.jpeg", "photos/more/m080.jpeg", "photos/more/m086.jpeg", "photos/more/m035.jpeg", "photos/more/m050.jpeg", "photos/more/m053.jpeg", "photos/more/m106.jpeg", "photos/more/m103.jpeg", "photos/more/m120.jpeg"],
  collage: ["photos/more/m001.jpeg", "photos/more/m068.jpeg", "photos/more/m011.jpeg", "photos/more/m012.jpeg", "photos/more/m016.jpeg", "photos/more/m045.jpeg", "photos/more/m066.jpeg", "photos/more/m003.jpeg"],

  // Photos tucked inside the letter's envelope.
  envelope: ["photos/more/m110.jpeg", "photos/more/m124.jpeg", "photos/more/m115.jpeg"],

  // "TRUNALI & BHUSHAN" made of tiny photo tiles. tiles.jpeg holds every photo as a 48px square,
  // in order m001, m002, … so tapping a tile opens that photo.
  mosaic: { lines: ["TRUNALI", "&", "BHUSHAN"], tiles: "photos/more/tiles.jpeg", count: 132, cols: 12, size: 48, folder: "photos/more/" },

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
