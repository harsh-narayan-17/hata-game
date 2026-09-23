# HAYATI — A LITTLE WORLD

## Product Requirements Document

**Project type:** Frontend-only interactive 2D browser game
**Purpose:** A personalized interactive experience to ask Hayati out on a date
**Primary platform:** Desktop web browser
**Secondary platform:** Mobile web
**Backend:** None
**Database:** None
**Authentication:** None

---

# 1. PRODUCT VISION

Build a small, charming, top-down 2D browser game where the player controls a character named **Hayati** and explores a miniature world containing places, objects, food, music, work, memories, and other details inspired by her life.

The experience should feel like:

> **"I built you a little world."**

This is not intended to be a traditional game.

There is:

* no combat
* no enemies
* no weapons
* no complex progression
* no economy
* no multiplayer
* no competitive scoring
* no large open world

The core gameplay loop is:

```text
EXPLORE
   ↓
DISCOVER
   ↓
INTERACT
   ↓
COLLECT
   ↓
UNLOCK
   ↓
FINAL LOCATION
   ↓
ASK OUT
```

The game should take approximately **10–20 minutes** to explore.

---

# 2. TECH STACK

Use:

* React
* TypeScript
* Vite
* Phaser 3
* CSS

Optional:

* Tailwind CSS if it genuinely simplifies UI development

Do NOT introduce unnecessary frameworks.

Do NOT use:

* Node.js backend
* Express
* NestJS
* PostgreSQL
* MongoDB
* Redis
* Firebase
* Supabase
* authentication
* external APIs

The application must be a completely static frontend.

It should be deployable to:

* Vercel
* Netlify
* GitHub Pages

---

# 3. ARCHITECTURE

Use a hybrid architecture.

## Phaser

Phaser is responsible for:

* game world
* player
* car
* movement
* collision
* camera
* buildings
* map
* interaction zones
* collectibles
* game events

## React

React is responsible for:

* intro screen
* modals
* dialogue
* café menus
* certificate
* movie information
* concert information
* collection UI
* settings
* ending
* buttons
* overlays

Architecture:

```text
React Application
│
├── Game Container
│      │
│      └── Phaser Game
│
├── Modal System
├── Dialogue System
├── Collection UI
├── Settings UI
└── Ending UI
```

---

# 4. PROJECT STRUCTURE

Use a structure similar to:

```text
src/
│
├── App.tsx
│
├── main.tsx
│
├── game/
│   │
│   ├── Game.ts
│   │
│   ├── scenes/
│   │   ├── BootScene.ts
│   │   ├── MainScene.ts
│   │   ├── BowlingScene.ts
│   │   └── EndingScene.ts
│   │
│   ├── entities/
│   │   ├── Hayati.ts
│   │   ├── Car.ts
│   │   ├── Building.ts
│   │   ├── Interactable.ts
│   │   └── Collectible.ts
│   │
│   ├── systems/
│   │   ├── InteractionSystem.ts
│   │   ├── GameState.ts
│   │   └── CollisionSystem.ts
│   │
│   └── world/
│       ├── WorldMap.ts
│       └── WorldConfig.ts
│
├── components/
│   ├── IntroScreen.tsx
│   ├── GameUI.tsx
│   ├── Modal.tsx
│   ├── DialogueModal.tsx
│   ├── CafeMenuModal.tsx
│   ├── CertificateModal.tsx
│   ├── CinemaModal.tsx
│   ├── ConcertModal.tsx
│   ├── CollectionModal.tsx
│   ├── SettingsModal.tsx
│   └── EndingModal.tsx
│
├── data/
│   ├── locations.ts
│   ├── dialogue.ts
│   ├── cafes.ts
│   ├── collectibles.ts
│   └── events.ts
│
├── hooks/
│   └── useGameState.ts
│
├── types/
│   └── game.ts
│
├── assets/
│   ├── characters/
│   ├── buildings/
│   ├── environment/
│   ├── objects/
│   ├── ui/
│   └── audio/
│
└── styles/
    └── global.css
```

The exact structure may be adjusted if there is a strong technical reason, but maintain clear separation between game logic, UI, content, and assets.

---

# 5. VISUAL STYLE

Use a **cozy 2D top-down pixel-art / illustrated game style**.

The visual style should be:

* cute
* warm
* minimal
* slightly dreamy
* colorful
* personal
* polished but not graphically complex

Do not use 3D.

Do not build realistic rendering.

Do not use unnecessarily large textures.

The world should resemble a small indie top-down exploration game.

---

# 6. WORLD

Create one connected world.

The map should contain:

```text
                         PARK
                           │
                           │
                        CINEMA
                           │
                           │
       BEAN THEORY ────────┼──────── CONCERT
                           │
                           │
       HIRANANDANI ────────┼──────── BROWN RITUALS
                           │
                           │
                      VIVIANA MALL
                           │
                           │
                         START
```

This is a conceptual layout only.

The actual map should look natural rather than like a diagram.

Include:

* roads
* sidewalks
* grass
* trees
* street lamps
* parked cars
* small decorative buildings
* signs
* flowers
* benches
* other small environmental details

The map should be small enough that the entire game can be explored in 10–20 minutes.

---

# 7. PLAYER CHARACTER

The player controls:

## Hayati

Hayati is the protagonist.

She should have:

* idle state
* movement animation
* four-direction movement

The game should preferably show Hayati inside her car.

If implementing both driving and walking creates unnecessary complexity, use the car as the primary player entity.

---

# 8. PLAYER CONTROLS

Desktop:

```text
W / ↑       Move up
S / ↓       Move down
A / ←       Move left
D / →       Move right

SPACE       Interact
ESC         Close modal
```

The player should not move while a modal is open.

Display controls briefly when the game starts:

```text
WASD / ARROW KEYS
to move

SPACE
to interact
```

This should disappear after the player begins moving.

---

# 9. CAR

Hayati likes driving.

The car should therefore be central to the gameplay.

Requirements:

* top-down car sprite
* four-direction movement
* smooth movement
* world collision
* camera follows car
* no realistic driving physics

The car should feel responsive.

If possible, use slight acceleration/deceleration, but this is optional.

Do not spend significant development time on realistic physics.

---

# 10. INTERACTION SYSTEM

Create one reusable interaction system.

When Hayati enters an interaction zone:

```text
[ SPACE ] Interact
```

appears near the relevant object/building.

Pressing SPACE triggers the relevant interaction.

Examples:

```text
Cafe → CafeMenuModal
Viviana → DialogueModal
Hiranandani → CertificateModal
Cinema → CinemaModal
Concert → ConcertModal
Collectible → Collectible interaction
```

The interaction system must be data-driven where practical.

Do not hardcode all interactions directly inside `MainScene.ts`.

---

# 11. BEAN THEORY

Create a café building.

Label:

# BEAN THEORY

Interaction:

```text
Hayati approaches
       ↓
SPACE
       ↓
CafeMenuModal
```

Modal:

```text
BEAN THEORY

MENU

Coffee
Matcha
Pastries
Desserts

[ CLOSE ]
```

The menu should be configurable through a data file.

---

# 12. BROWN RITUALS

Create another café.

Label:

# BROWN RITUALS

Interaction:

```text
SPACE
↓
CafeMenuModal
```

Display its own menu.

Include a small personalized line if appropriate.

Example:

> "Another café?"

Keep the text configurable.

---

# 13. VIVIANA MALL

Create:

# VIVIANA MALL

This location is important because **this is where we first met**.

When Hayati reaches Viviana:

Open a special dialogue.

Example:

```text
VIVIANA MALL

Some places are just places.

And some places become memories.

You first met here.

[ CONTINUE ]
```

The exact wording should be stored in `dialogue.ts` and easy to change.

---

# 14. VIVIANA BOWLING

After the Viviana dialogue, optionally provide a tiny bowling game.

The bowling game should contain:

* lane
* bowling ball
* pins
* aim
* throw
* simple result

Controls:

```text
← →       Aim
SPACE     Throw
```

It does NOT need realistic physics.

A simple deterministic or lightweight physics implementation is acceptable.

Possible result:

```text
STRIKE! 🎳
```

or:

```text
Nice try 😌
```

If bowling significantly complicates the project, replace it with a short interactive animation.

The core game must remain playable without complex bowling physics.

---

# 15. HOUSE OF HIRANANDANI

Create a building labeled:

# HOUSE OF HIRANANDANI

This represents Hayati's workplace.

She is a real estate consultant.

When Hayati reaches the building:

Open a certificate/achievement modal.

Example:

```text
🏆 CERTIFICATION

CONGRATULATIONS

HAYATI

Outstanding Achievement

Real Estate Consultant

🏆

[ CLOSE ]
```

The certificate should visually resemble an achievement/certificate rather than a generic alert.

---

# 16. CINEMA

Create a movie theatre.

Building label:

# CINEMA

Display:

```text
NOW PLAYING

THE LITTLE PRINCE
```

When Hayati interacts:

Open a movie modal.

Example:

```text
NOW PLAYING

THE LITTLE PRINCE

A little story.
A familiar feeling.

[ CLOSE ]
```

The exact copy should remain editable.

The cinema can contain:

* marquee
* poster
* ticket booth
* lights
* small decorative elements

---

# 17. CONCERT

Create an outdoor concert venue.

The venue should visually differ from the rest of the world.

Display:

# SM

## LIVE

SM is Hayati's favourite artist.

Include:

* stage
* lights
* speakers
* crowd
* stage decorations

Interaction:

```text
SPACE
↓
ConcertModal
```

Modal:

```text
🎤 LIVE TONIGHT

SM

Her favourite artist.

[ CLOSE ]
```

Do not use copyrighted music without appropriate rights.

An original ambient track or simple instrumental atmosphere is acceptable.

---

# 18. FRIDGE MAGNET COLLECTIBLE

Create a hidden collectible somewhere in the world.

Item:

# 🧲 Fridge Magnet

Hayati likes fridge magnets.

The collectible should be slightly hidden.

Use:

* subtle sparkle
* glow
* animation

When discovered:

```text
COLLECTIBLE FOUND

🧲 FRIDGE MAGNET

"Obviously you're keeping this."

[ ADD TO COLLECTION ]
```

After collection:

* remove it from the world
* add it to game state
* show it in Collection UI

---

# 19. COLLECTION UI

Create a simple collection panel.

Example:

```text
COLLECTION

🧲 Fridge Magnet

???
???
???
```

The system should support adding additional collectibles later.

Type:

```typescript
interface Collectible {
  id: string;
  name: string;
  description: string;
  icon: string;
}
```

---

# 20. MATCHA EVENT

During exploration, trigger a personalized event.

The player should receive:

```text
You must be thirsty.

Here.

🍵 MATCHA
```

This should feel like a message directly from the creator.

Use a polished overlay.

The event should only happen once.

Store the event as completed in game state.

---

# 21. TRES LECHES EVENT

Later during exploration:

```text
You must be hungry.

Here.

🍰 TRES LECHES
```

Again:

* show once
* animate subtly
* store event completion

The exact trigger can be based on exploration/time/distance.

Choose the simplest reliable implementation.

---

# 22. GAME STATE

Create:

```typescript
interface GameState {
  visitedLocations: string[];
  collectedItems: string[];
  triggeredEvents: string[];
  completedBowling: boolean;
  endingUnlocked: boolean;
}
```

Persist using `localStorage`.

The game should survive page refreshes.

---

# 23. LOCATION DATA

Use a data-driven system.

Example:

```typescript
const locations = [
  {
    id: "bean-theory",
    name: "Bean Theory",
    type: "cafe",
    x: 420,
    y: 300,
    interaction: "bean-theory"
  },
  {
    id: "brown-rituals",
    name: "Brown Rituals",
    type: "cafe",
    x: 760,
    y: 440,
    interaction: "brown-rituals"
  },
  {
    id: "viviana",
    name: "Viviana Mall",
    type: "special",
    x: 600,
    y: 600,
    interaction: "viviana"
  }
];
```

The exact implementation can vary.

The important requirement is that content should be easy to modify.

---

# 24. CONTENT CONFIGURATION

Keep personalized text separate from game engine code.

Example:

```typescript
export const gameContent = {
  playerName: "Hayati",

  cafes: {
    beanTheory: {
      name: "Bean Theory",
      menu: []
    },

    brownRituals: {
      name: "Brown Rituals",
      menu: []
    }
  },

  mall: {
    name: "Viviana Mall",
    significance: "Where we first met"
  },

  workplace: {
    name: "House of Hiranandani",
    role: "Real Estate Consultant"
  },

  cinema: {
    movie: "The Little Prince"
  },

  concert: {
    artist: "SM"
  },

  food: {
    drink: "Matcha",
    dessert: "Tres Leches"
  },

  collectible: {
    name: "Fridge Magnet"
  }
};
```

---

# 25. INTRO SCREEN

Before entering the game:

```text
A LITTLE WORLD

made for

HAYATI

[ ENTER ]
```

Use a minimal, beautiful design.

Clicking ENTER starts the game.

---

# 26. GAME UI

Keep the HUD minimal.

Possible top-right controls:

```text
☰
```

Opening:

```text
COLLECTION
SETTINGS
RESTART
```

Do not clutter the screen.

---

# 27. FINAL UNLOCK CONDITION

The final location should not be immediately accessible.

Unlock it after meaningful exploration.

Suggested condition:

```text
Visited at least 5 major locations
AND
found the fridge magnet
```

Once unlocked, show a subtle clue:

```text
❤️

Something is waiting for you...
```

A new path/location should become accessible.

---

# 28. FINAL LOCATION

Create a visually beautiful final area.

Possible style:

* sunset
* rooftop
* park
* beach
* city viewpoint

Prefer a calm environment that contrasts with the busy city.

The final area should feel special.

---

# 29. FINAL ASK-OUT

When Hayati reaches the final location:

A second character appears.

This represents the creator.

Dialogue:

```text
So...

You made it.

I've spent a ridiculous amount of time
building this little world.

Mostly because I wanted to show you
something.
```

Then:

```text
Would you go on a date with me?
```

Display two buttons:

```text
YES ❤️

NO
```

---

# 30. YES ENDING

If YES is selected:

Play:

* confetti
* hearts
* subtle particles
* celebratory animation

Then:

```text
❤️

QUEST COMPLETE

You said yes.

Now I actually have to plan the date.
```

Then:

```text
THE END

...or maybe just the beginning.
```

---

# 31. NO ENDING

The NO option must work normally.

Do not:

* disable it
* move it
* make it impossible to click
* repeatedly ask for confirmation
* guilt the player
* force the YES option

Display:

```text
That's okay. ❤️

I'm still really glad you explored
this little world.

Thank you for playing.

[ RESTART ]
```

This should be a genuine choice.

---

# 32. AUDIO

Add audio only after the game is functional.

Potential audio:

* ambient city
* car movement
* interaction
* collectible discovery
* button clicks
* modal open/close
* ending celebration

Include a mute toggle.

Respect browser autoplay restrictions.

Do not automatically play loud audio before user interaction.

---

# 33. RESPONSIVENESS

Desktop is the primary experience.

Mobile should be supported where practical.

Desktop:

```text
WASD / arrows
SPACE
```

Mobile:

Implement a virtual joystick only if it can be done cleanly.

At minimum:

* responsive modals
* responsive UI
* no horizontal page scrolling
* readable text

---

# 34. PERFORMANCE

Target:

* smooth movement
* approximately 60 FPS
* fast loading
* small asset footprint
* no unnecessary rendering
* no 3D
* no large libraries

Use lightweight sprites and compressed assets.

---

# 35. PLACEHOLDER ASSETS

Do NOT block development waiting for final art.

Initially use:

* placeholder sprites
* simple shapes
* placeholder buildings
* simple colors

Example:

```text
grass = green rectangle
road = gray rectangle
building = colored rectangle
player = placeholder sprite
car = placeholder sprite
```

Once the entire game loop works, replace them with proper assets.

---

# 36. DEVELOPMENT PHASES

## Phase 1 — Foundation

Create:

* Vite
* React
* TypeScript
* Phaser
* project structure
* basic game boot

Acceptance criteria:

```text
npm install
npm run dev
```

works.

---

## Phase 2 — World

Create:

* map
* roads
* buildings
* collision
* camera
* Hayati
* car

Acceptance criteria:

> Hayati can drive around the entire map.

---

## Phase 3 — Interaction

Create:

* interaction zones
* SPACE interaction
* React modal system

Add:

* Bean Theory
* Brown Rituals
* Viviana
* Hiranandani
* Cinema
* Concert

---

## Phase 4 — Personalization

Add:

* fridge magnet
* collection
* matcha event
* tres leches event
* personalized dialogue

---

## Phase 5 — Bowling

Add simple Viviana bowling.

If bowling becomes a blocker, replace it with a simple interaction.

---

## Phase 6 — Ending

Add:

* final unlock condition
* final location
* creator character
* dialogue
* YES
* NO
* ending animations

---

## Phase 7 — Polish

Only after all gameplay works:

* replace placeholder art
* animations
* particles
* transitions
* audio
* typography
* responsive improvements
* loading screen
* settings

---

# 37. ACCEPTANCE CRITERIA

The MVP is complete when all of the following work:

* [ ] Intro screen
* [ ] Enter game
* [ ] Hayati playable
* [ ] Car movement
* [ ] Camera follows player
* [ ] World boundaries
* [ ] Building collision
* [ ] Roads
* [ ] Bean Theory
* [ ] Brown Rituals
* [ ] Viviana Mall
* [ ] Viviana dialogue
* [ ] Bowling or fallback interaction
* [ ] House of Hiranandani
* [ ] Certificate modal
* [ ] Cinema
* [ ] The Little Prince interaction
* [ ] Concert
* [ ] SM interaction
* [ ] Fridge magnet
* [ ] Collection
* [ ] Matcha event
* [ ] Tres leches event
* [ ] Game state
* [ ] localStorage persistence
* [ ] Final unlock
* [ ] Final location
* [ ] Ask-out dialogue
* [ ] YES ending
* [ ] NO ending
* [ ] Restart
* [ ] No backend
* [ ] No database

---

# 38. NON-GOALS

Do not implement:

* multiplayer
* login
* backend
* database
* AI NPCs
* combat
* weapons
* realistic driving
* 3D graphics
* procedural generation
* huge maps
* economy
* complex inventory
* character customization
* advanced NPC AI
* online multiplayer
* analytics

---

# 39. IMPORTANT CODING RULES FOR CURSOR

1. Read this entire PRD before modifying the project.

2. Do not build everything in one giant implementation.

3. Work in milestones.

4. After each milestone, verify the application runs.

5. Fix errors before moving to the next milestone.

6. Do not introduce a backend.

7. Do not introduce unnecessary dependencies.

8. Keep the game frontend-only.

9. Keep personalized content in data/configuration files.

10. Keep Phaser game logic separate from React UI.

11. Keep components reusable.

12. Do not put all game logic inside `App.tsx`.

13. Do not put all game logic inside `MainScene.ts`.

14. Use TypeScript types/interfaces.

15. Prefer simple implementations.

16. Use placeholder assets when final assets aren't available.

17. Do not stop development because artwork is missing.

18. Make the game playable before polishing.

19. Do not replace Phaser with a custom game engine.

20. Do not over-engineer.

---

# 40. FIRST TASK

Do NOT immediately implement the entire PRD.

Start with:

### TASK 1

Create the project foundation.

Requirements:

* Vite
* React
* TypeScript
* Phaser 3
* clean folder structure
* basic Phaser game initialization
* React + Phaser integration
* placeholder game canvas
* basic styling

The application must successfully run with:

```bash
npm install
npm run dev
```

Once that is working, report:

1. Files created
2. Dependencies installed
3. How React and Phaser are connected
4. How to run the project
5. Any assumptions made

Then proceed to the next milestone only when instructed.

---

# 41. DESIGN PHILOSOPHY

The final product should not feel like a generic game.

It should feel like:

> **a personalized interactive love letter.**

The player should gradually experience:

```text
"This is cute."
        ↓
"Wait..."
        ↓
"This is about me."
        ↓
"He remembered this."
        ↓
"There's more?"
        ↓
"Why is he taking me here?"
        ↓
"Oh."
        ↓
❤️
```

The technical implementation should remain simple.

The most important aspects are:

1. Personalization
2. Exploration
3. Visual charm
4. Small surprises
5. Emotional pacing
6. The final reveal

Do not sacrifice these qualities for unnecessary technical complexity.
