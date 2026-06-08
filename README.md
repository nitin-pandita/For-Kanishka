# 💖 Premium Cinematic Romantic Website

## Setup Instructions

### 1. Add Her Photos
Place **10 photos** in the `/images/` folder with these exact names:
```
images/photo1.jpg
images/photo2.jpg
images/photo3.jpg
images/photo4.jpg
images/photo5.jpg
images/photo6.jpg
images/photo7.jpg
images/photo8.jpg
images/photo9.jpg
images/photo10.jpg
```

### 2. Add the Song
Place her song in the `/music/` folder:
```
music/her.mp3
```

### 3. Open the website
Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

> ⚠️ **Note:** For music autoplay to work, the file must be served from a web server (not opened directly as a file). You can use VS Code's **Live Server** extension, or any simple local server.

---

## 🎬 Scenes

| Scene | Description |
|-------|-------------|
| **Loading** | Heartbeat animation + sparkle particles + progress bar |
| **Scene 1** | Gift accept card with YES/NO — NO button runs away! Angry cat if pressed twice |
| **Scene 2** | Music player with rotating album art, equalizer, floating memories |
| **Scene 3** | Masonry memory gallery + Polaroids + lightbox |
| **Scene 4** | Swipeable reasons carousel (5 cards with her photos) |
| **Scene 5** | Handwritten love letter with petal rain + scrapbook photos |
| **Scene 6** | Final love scene with slideshow, confetti, balloons & "❤️ I Love You ❤️" |

---

## ✨ Special Features
- **Custom sparkle cursor trail** (move mouse to see)
- **Heart counter** (bottom left) — increments on every click
- **Random romantic quotes** (bottom right, cycle every 9 seconds)
- **Fireflies** floating in background
- **Confetti + heart explosion** on YES
- **Angry cat GIF** if NO is clicked twice
- **3D tilt effect** on gallery cards (hover to see)
- **Lightbox** — click any gallery photo to open it fullscreen
- **Keyboard shortcut:** Press `H` for instant heart explosion 🎉

---

## 📱 Mobile Friendly
Fully responsive — looks great on phones, tablets, and desktops.
Touch-swipe works on the reasons carousel.

---

## 🎨 Customization

### Change the love letter (script.js line ~26):
```js
const letterText = `My love,\n\nYour custom message here...`;
```

### Change reasons (index.html, scene-4):
Edit the `.reason-text` paragraphs in each `.reason-card`

### Change colors (style.css line ~3):
```css
--pink:       #ff2d78;   /* Main pink */
--rose:       #e8005a;   /* Deep rose */
--pink-light: #ff80b0;   /* Light pink */
```
