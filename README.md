# Cambridge IELTS Academic Mock Examination Platform

An authentic, high-fidelity Computer-Delivered IELTS (CD-IELTS) testing platform designed to replicate the official British Council and IDP examination environment. Covers Cambridge IELTS Academic Books **18, 19, 20, and 21** with all four practice test sets for both **Reading** and **Listening**.

---

## 🌟 Key Features

### 1. 100% Authentic CD-IELTS Examination Experience
- **Top Header Bar:**
  - Candidate details and test title.
  - Live countdown timer (`59:42 remaining`) with a `Hide` button.
  - Automatic emergency alert: the timer becomes unhideable and turns bold red during the final 10 and 5 minutes.
  - Text size scaler (`A` / `A+`) and official exam help documentation.
- **Reading Test Engine (Split-Screen):**
  - **Draggable vertical resizer:** Customize passage vs. question pane width in real-time.
  - **Interactive Text Highlighter & Sticky Notes:** Select any text in the reading passage to highlight it in yellow or attach notes.
  - Passage tabs for rapid navigation across Passage 1 (Q 1–13), Passage 2 (Q 14–26), and Passage 3 (Q 27–40).
- **Listening Test Engine:**
  - Audio controller with progress scrubber and volume slider.
  - Section tabs for Parts 1, 2, 3, and 4.
  - Audio check tool for headset testing before starting the test.
- **Official 40-Question Navigation Palette:**
  - 1 to 40 button grid with visual indicators:
    - **Active Question:** Highlighted with red accent ring.
    - **Answered Question:** Filled grey block.
    - **Unanswered Question:** Clean white card.
    - **Review Question:** Amber flag badge.
  - `< Back` and `Next >` navigation.
  - `Finish Test` modal warning about remaining unanswered questions.

### 2. Supported Question Types
- True / False / Not Given & Yes / No / Not Given
- Multiple Choice (Single answer & Multi-select)
- Matching Headings (Roman numerals i to viii)
- Matching Information / Paragraphs
- Sentence & Summary Completion with strict word limits (e.g., "NO MORE THAN TWO WORDS")
- Form, Note & Table Completion
- Diagram / Map Labelling

### 3. Diagnostic Band Score Engine
- Instant conversion of raw score (out of 40) into the official Cambridge IELTS Academic Band (0 to 9.0).
- Complete question-by-question breakdown comparing candidate answers against canonical answer keys.
- **Passage & Transcript Evidence:** Quotes the exact paragraph lines and provides pedagogical rationales explaining why the answer is correct.
- Local persistence in `localStorage` so candidates can track progress across test attempts.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm

### Installation & Launch
```bash
# Install dependencies
npm install

# Run the local development server
npm run dev

# Build production bundle
npm run build
```

---

## 📂 Project Structure

```
ielts-mock-test/
├── src/
│   ├── components/
│   │   ├── exam/
│   │   │   ├── CDHeader.tsx          # Official CD-IELTS header with countdown timer
│   │   │   ├── ReadingExamView.tsx   # Resizable split-screen with passage highlighter
│   │   │   ├── ListeningExamView.tsx # Audio player & Listening question panels
│   │   │   └── QuestionPalette.tsx   # 40-question palette with review flags
│   │   ├── landing/
│   │   │   └── LandingPage.tsx       # Book 18-21 & Test 1-4 selection hub
│   │   └── results/
│   │       └── ResultReport.tsx      # Diagnostic Band Score review & passage evidence
│   ├── data/
│   │   ├── cambridge18.ts            # Complete Cambridge 18 Reading & Listening datasets
│   │   └── mockTests.ts              # Catalog covering Cambridge 18, 19, 20 & 21
│   ├── types/
│   │   └── ielts.ts                  # TypeScript schemas and data models
│   ├── utils/
│   │   └── scoring.ts                # Official Cambridge Raw-to-Band converters
│   ├── App.tsx                       # Master exam state machine
│   ├── main.tsx                      # Application mount
│   └── index.css                     # Tailwind v4 styles & CD-IELTS typography
├── package.json
└── vite.config.ts
```
