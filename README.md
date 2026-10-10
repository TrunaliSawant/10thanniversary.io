# Ten Years of Us

A private anniversary website. Before **10 October 2026, 12:00 AM IST** it shows only a live countdown. At midnight it unlocks by itself (no refresh needed) and plays the opening animation.

## Files

```
index.html     the site (design + code) — you shouldn't need to edit this
content.js     ALL your personal content — edit this
photos/        put your photos here
music/         put your song here
```

## Preview before the unlock

Open the site with `#secret-dev` at the end of the address, e.g. `https://your-site.netlify.app/#secret-dev`, and enter your passcode.

The preview bar at the top lets you:
- **Countdown** – see what she will see before midnight
- **Play unlock** – simulate the last 6 seconds and the unlock animation
- **Reset progress** – clear quiz, answers and found secrets
- **Exit** – leave preview

Preview lasts until the browser tab is closed.

## Add your content

Everything is in `content.js`. Lines marked ✏️ are examples to replace.

- **Photos:** copy into `photos/`, then set e.g. `photo: "photos/first-date.jpg"`. Name photos in lowercase with hyphens and no spaces, emojis or `#` (GitHub is case-sensitive, and `#` breaks web addresses). Empty `""` shows a soft placeholder. Resize to ~1600px wide (JPG/WebP) so it loads fast on her phone.
- **Video:** add `video: "photos/clip.mp4"` to any timeline item.
- **Song:** copy into `music/`, set `song.src: "music/our-song.mp3"` and optionally `song.cover`. Until then a gentle placeholder melody plays.
- **Quiz:** `answer` is the position of the right option, starting at 0.
- **Places:** rough latitude/longitude is enough; `future: true` puts it under "Someday".
- **Her answers:** saved on her phone. Set `meta.whatsappNumber` (country code + number, digits only) so the "Send my answers to you" button goes straight to your chat.

## Change the passcode

The code only stores a SHA-256 hash of the passcode. To set a new one:
1. Open the site in a browser, open the developer console and run `await __tyouHash("YourNewPasscode")`
   (or run `python3 -c "import hashlib;print(hashlib.sha256(b'10.10.2016|always-us|YourNewPasscode').hexdigest())"`).
2. Paste the result into `meta.devPasscodeHash` in `content.js`.

## Put it online

Any static host works. Easiest: drag this whole folder onto **app.netlify.com/drop**. Vercel, Cloudflare Pages or GitHub Pages also work. Use https so the time check and passcode check run properly.

## Easter eggs (5)

1. Tap the heart next to "10 Years of Us" ten times
2. Type `iloveyou` or the Konami code on a keyboard, or press and hold "I love you." at the end
3. Some gallery photos have a hidden note (✦) in the full-screen view
4. Open every photo in the gallery
5. The tiny ✦ star at the very bottom

## About privacy

This is a static site, so the passcode is never in the code, but the content files are still downloadable by someone technical who goes looking before midnight. For a normal visit she will only ever see the countdown. If you want it locked at the server too, put the site behind your host's password protection or a small server check.
