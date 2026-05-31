# 🐰 AziMeow - The Rabbit Game

<div align="center">

![Banner](./assets/banner.png)

**A challenging trap platformer featuring a brave Minecraft-style rabbit escaping through deadly desert levels!**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Platform](https://img.shields.io/badge/Platform-HTML5-orange)
![Game Version](https://img.shields.io/badge/Version-1.0-red)
![Last Update](https://img.shields.io/badge/Last%20Update-May%202026-blue)

**[Play Now](https://azi-meow-the-rabbit-game.vercel.app/)** · **[Report Bug](https://github.com/AzimPial/AziMeow_The_rabbit_game/issues)** · **[Request Feature](https://github.com/AzimPial/AziMeow_The_rabbit_game/issues)**

</div>

---

## 🎮 Game Overview

**AziMeow** is a challenging trap platformer where you control a brave Minecraft-style rabbit trying to escape through **10 increasingly deadly desert levels**. Watch out for hidden traps, moving walls, gravity flips, and troll mechanics that will test your patience and reflexes in a dangerous red-themed wasteland!

### ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **10 Unique Levels** | Each level has different trap mechanics and deadly surprises |
| 🐇 **Minecraft-style Graphics** | Boxy rabbit character, dark sandstone platforms, dangerous cactus obstacles |
| 🌅 **Red/Dangerous Theme** | Ominous red sky, blood-red sun, and dark sandy wastelands |
| 📱 **Touch & Keyboard Controls** | Play on desktop or mobile |
| 🎭 **Challenging Troll Mechanics** | Expect the unexpected! |
| 💀 **Death Counter** | Track how many times you've fallen |
| ⭐ **Performance Rating** | Rate yourself based on total deaths |

---

## 🎯 How to Play

### ⌨️ Keyboard Controls

| Key | Action |
|-----|--------|
| `←` `→` or `A` `D` | Move left/right |
| `Space` / `W` / `↑` | Jump |
| `R` | Restart current level |

### 📱 Mobile Controls

- **Left Button** — Move left
- **Right Button** — Move right
- **Jump Button** — Jump

### 🎯 Objective

1. Navigate your rabbit from the **START** platform to the **EXIT** (sandstone temple door)
2. Avoid **CACTI** traps and other hidden obstacles
3. Complete all **10 levels** to win!
4. Aim for the **LOWEST death count** for the best rating

---

## 🏆 Scoring & Ratings

Your final rating is based on your total death count across all 10 levels:

| Deaths | Rating | Message |
|:------:|:------:|---------|
| 0 | 🏆 **PERFECT** | "The smartest rabbit ever!" |
| 1–4 | ⭐ **IMPRESSIVE** | "True desert hopper!" |
| 5–19 | 👍 **NOT BAD** | "Learning the sands!" |
| 20+ | 😅 **BETTER LUCK** | "Better luck next time!" |

---

## 🗺️ Level Guide

| Level | Name | Challenge |
|:-----:|:-----|:----------|
| 1 | Welcome Fool | Hidden spike near exit |
| 2 | Gravity Lied | Gravity flip trap |
| 3 | The Helpful Button | Pressure plate trapdoor |
| 4 | Closing Time | Moving walls closing in |
| 5 | Trust Issues | Fake platforms that fall |
| 6 | Speed Kills | Speed boost danger |
| 7 | Countdown | Timed pressure plate |
| 8 | Mirror Mirror | Inverted controls tile |
| 9 | Almost There | Running exit |
| 10 | Final Boss | Multiple troll mechanics |

---

## ⚙️ Level Mechanics

### Trap Types

- 🌵 **Cacti** — Sharp desert plants (instant death on contact)
- 📍 **Invisible Spikes** — Hidden traps that appear when you get close
- 🧱 **Fake Platforms** — Look solid but crumble when stepped on
- 🔄 **Gravity Flips** — Gravity reverses direction
- 📦 **Moving Walls** — Walls that close in on you
- ⚡ **Speed Pads** — Golden pads that boost your speed
- 🎚️ **Pressure Plates** — Stand on them to trigger events
- 🚪 **Trapdoors** — Floor sections that open when triggered
- 🪞 **Mirror Tiles** — Invert your left/right controls
- 🏃 **Moving Exit** — The exit door runs away from you!
- 🎭 **Fake Win Screens** — Decoy victory screens in Level 10

### 💡 Pro Tips

> ⚠️ **Always be suspicious** — If something looks too easy, it's a trap!

> 👣 **Watch your step** — Platforms may not be what they seem

> 🚪 **Don't trust the exit** — In later levels, the exit may not be where it appears

> ✋ **Stay still to win** — Level 10 requires you to stand still!

---

## 💀 Death Messages

When you die, your rabbit will be greeted by one of these taunts:

```
"Don't cactus about it!"
"Hop luck next time!"
"You got schooled, bunny!"
"That's gonna make you hopping mad!"
"Bounce back!"
"The sands claim another..."
"Not so burrow now!"
"That one hurt, didn't it?"
"Back to the starting hole!"
"Carrots don't grow in the sky!"
```

---

## 🖥️ Screenshots

### Start Screen
- Game title with cute rabbit character preview
- "START HOPPING" button
- Control hints

### Level Transition
- Level number display
- Level name and tip for the upcoming level
- Auto-transition after 1.5 seconds

### Death Screen
- Sandy dust overlay effect
- Death counter
- Random taunt message
- Auto-respawn after 1 second

### Victory Screen
- "THE RABBIT ESCAPED!" victory banner
- Total death count
- Performance rating
- "PLAY AGAIN" button

---

## 🛠️ Technical Details

| Specification | Value |
|--------------|:-----:|
| **Engine** | Pure HTML5 Canvas |
| **Language** | Vanilla JavaScript |
| **Dependencies** | None (runs directly in browser) |
| **Responsive** | Yes (adapts to screen size) |
| **Mobile Support** | Yes (touch controls included) |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/AzimPial/AziMeow_The_rabbit_game.git

# Open in browser
# (Simply open index.html in any modern browser)
```

**OR visit:** [https://azi-meow-the-rabbit-game.vercel.app/](https://azi-meow-the-rabbit-game.vercel.app/)

---

## 🌐 Hosting Options

### Vercel (Recommended)
1. Import this repository to Vercel
2. Deploy with zero configuration
3. Get a live URL instantly

### GitHub Pages
1. Go to repository **Settings**
2. Navigate to **Pages**
3. Select source branch (`main`)
4. Your game will be live at:
   `https://username.github.io/AziMeow_The_rabbit_game`

### Local Development
```bash
# Just open index.html in any modern browser
open index.html
```

---

## 📁 Project Structure

```
AziMeow_The_rabbit_game/
├── index.html          # Main game file (HTML5 Canvas)
├── README.md           # Documentation
├── LICENSE             # MIT License
├── .gitignore          # Git ignore file
└── CONTRIBUTING.md     # Contribution guidelines
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Commit** your changes (`git commit -m 'Add amazing feature'`)
5. **Push** to the branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- Game design and development by **AzimPial**
- Inspired by Minecraft aesthetics and classic platformer games
- Built with pure HTML5 Canvas and JavaScript

---

## 📬 Contact

- **GitHub:** [AzimPial](https://github.com/AzimPial)
- **Project Link:** [https://github.com/AzimPial/AziMeow_The_rabbit_game](https://github.com/AzimPial/AziMeow_The_rabbit_game)

---

<div align="center">

**Good luck, hopper!** 🐰🏜️

*Last updated: May 2026*

</div>