# Operation Blackout

A browser-based digital escape room for **Cambridge International AS & A Level Computer Science (9618)**. Students play junior cyber analysts investigating a simulated breach at a university research lab, recovering six key fragments and unlocking the Exam Archive Vault.

**Intended duration:** 40–50 minutes · **Audience:** 17–18 year-olds · **Theme:** Defensive cybersecurity only

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host (GitHub Pages, Netlify, school web server). Scene images are bundled from `src/assets/scenes/` — edit paths in `src/data/sceneImages.ts`.

## How to play (students)

1. Enter an optional callsign and **Accept mission**.
2. Complete six puzzle rooms in order (you may revisit earlier rooms from the mission hub).
3. Use up to **three hints per room** — hints reduce score but never block progress.
4. Collect six hex fragments and solve the **final vault** meta-puzzle.
5. View your debrief, score, and local leaderboard entry.

Progress, timer, hints, and score are saved in **localStorage**.

## Teacher resources (offline)

Solution guides live outside the student app in **`docs/`**:

- [docs/TEACHERS-GUIDE.md](docs/TEACHERS-GUIDE.md) — markdown overview
- [docs/teacher-guide/index.html](docs/teacher-guide/index.html) — illustrated HTML (open in browser → Print to PDF)
- [docs/Operation-Blackout-Complete-Guide.pdf](docs/Operation-Blackout-Complete-Guide.pdf) — full step-by-step PDF

Regenerate the PDF after editing the HTML source:

```bash
npm run guide:pdf
```

Answers and hint text are also in `src/data/puzzles/*.ts` (`teacherAnswer`, `hints` fields).

## Project structure

```
src/
  components/     # Reusable UI (layout, panels, hints, puzzle shell)
  context/        # PuzzleEngine — game state controller
  data/
    puzzles/      # Editable puzzle content (TypeScript objects)
    syllabus.ts   # Syllabus mapping & timings
  pages/          # Intro, game router, completion
  puzzles/        # Room UI components & validators
  styles/         # Tailwind theme extensions
  types/          # Shared TypeScript types
  utils/          # localStorage, scoring, formatting
```

## Editing puzzle content

Puzzle text, answers, hints, and syllabus links live in **`src/data/puzzles/`**:

| File           | Room                          |
|----------------|-------------------------------|
| `room1.ts`     | Corrupted Login Banner        |
| `room2.ts`     | Network Trace                 |
| `room3.ts`     | Threat Console                |
| `room4.ts`     | Certificate Chain             |
| `room5.ts`     | Logic Lock                    |
| `room6.ts`     | Algorithm Vault               |
| `finalVault.ts`| Exam Archive Vault            |

Answer-checking logic is in **`src/puzzles/validators.ts`**. Update both data and validators when changing answers.

### Final vault meta-puzzle

Fragments must be ordered by **TCP/IP stack layer** (lowest first):

| Layer | Room  | Fragment | ASCII |
|-------|-------|----------|-------|
| 1 Physical | room5 | 53 | S |
| 2 Data Link | room1 | 45 | E |
| 3 Network | room2 | 43 | C |
| 4 Transport | room4 | 55 | U |
| 5 Session | room3 | 52 | R |
| 7 Application | room6 | 45 | E |

Unlock phrase: **SECURE**

## PuzzleEngine

`src/context/PuzzleEngineContext.tsx` manages:

- Current room and navigation
- Answer attempts and hint usage
- Fragment collection
- Timer and score calculation
- localStorage persistence (`operation-blackout-v1`)

Scoring: base 1000 + time bonus − hint/attempt penalties + optional bonus.

## Syllabus alignment

Mapped to Cambridge 9618 (2027–2029 syllabus v2), including:

- Data representation (binary, hex, ASCII, two's complement)
- Networks (DNS, TCP/IP, routing, public/private IP)
- Security threats & countermeasures
- Encryption, TLS, certificates, signatures
- Logic gates & Boolean algebra
- Algorithms, ADTs, recursion, Big O
- Validation, integrity, and defensive cyber practice

See `src/data/syllabus.ts` and `docs/` for full mapping.

## Test plan

| # | Test | Expected |
|---|------|----------|
| 1 | `npm install && npm run dev` | App loads at localhost |
| 2 | Accept mission | Timer starts, room 1 opens |
| 3 | Room 1 correct answers | Fragment `45` collected |
| 4 | Room 2 packet order + security | Fragment `43` collected |
| 5 | Room 3 threat matching | Fragment `52` collected |
| 6 | Room 4 cert chain | Fragment `55` collected |
| 7 | Room 5 logic + truth table | Fragment `53` collected |
| 8 | Room 6 algorithm questions | Fragment `45` collected |
| 9 | Vault order + phrase SECURE | Completion screen shown |
| 10 | Refresh mid-game | Progress restored from localStorage |
| 11 | Hints | Three levels reveal; score decreases |
| 12 | Reset progress (intro page) | Fresh game state |
| 13 | `npm run build` | Builds without errors |
| 14 | Chromebook / mobile width | Layout usable (desktop optimised) |

## Deployment notes

- Static SPA: configure your host to serve `index.html` for all routes (`/play/*`, `/complete`).
- No external APIs or internet required during gameplay after initial load.
- For a shared leaderboard across devices, add an optional backend later — currently localStorage only.

## Safety & ethics

All scenarios use **fictional logs, toy traces, and classroom-safe data**. There are no real exploit instructions, offensive tooling, or guidance for attacking live systems.

## Licence

Educational resource — adapt freely for classroom use.
