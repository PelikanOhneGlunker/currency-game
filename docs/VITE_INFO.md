# Project Folder Structure

## Setup Instructions

### 1. Initialize the project
```bash
npm init -y
npm install express
npm install -D vite
```

### 2. Copy all the files to their respective locations

### 3. Run in development mode
```bash
# Start Vite dev server (recommended)
npm run dev
# Opens at http://localhost:3000 with hot module replacement
```

### 4. Build for production
```bash
# Build the project
npm run build

# Preview production build
npm run preview

# Or serve with Express
npm run serve
```

## Key Improvements Over Previous Version

### 1. **Clean Module System**
- ES6 modules with proper imports/exports
- No global namespace pollution
- Clear dependency tree

### 2. **Simplified Dependencies**
- Modules import what they need directly
- No complex loader or waiting system needed
- Vite handles all bundling and dependencies

### 3. **Better Development Experience**
- Hot Module Replacement (HMR) with Vite
- Instant updates when you save files
- Better error messages and debugging

### 4. **Type Safety Ready**
- Can easily add TypeScript support
- Just rename `.js` to `.ts` and add types

### 5. **Production Ready**
- Optimized builds with Vite
- Code splitting and tree shaking
- Optional Express server for production

### 6. **Cleaner Code Structure**
```javascript
// Old way (with global dependencies)
window.useModule('uiController', (uiController) => {
    uiController.setCoins(100);
});

// New way (with ES6 imports)
import { uiController } from './uiController.js';
uiController.setCoins(100);
```

## Adding Your Own Modules

### Example: Create a new game logic module

```javascript
// src/gameLogic.js
import { uiController } from './uiController.js';
import { answerManager } from './answerManager.js';

export class GameLogic {
    constructor() {
        this.score = 0;
        this.currentQuestion = null;
    }

    loadQuestion(question) {
        this.currentQuestion = question;
        uiController.setQuestion(question.text);
        
        answerManager.clear();
        question.answers.forEach((answer, index) => {
            answerManager.addAnswer(answer, index, () => {
                this.checkAnswer(index);
            });
        });
    }

    checkAnswer(index) {
        if (index === this.currentQuestion.correctIndex) {
            this.score += 10;
            uiController.setCoins(this.score);
            console.log('Correct!');
        } else {
            console.log('Wrong!');
        }
    }
}

export const gameLogic = new GameLogic();
```

Then import it in main.js:
```javascript
import { gameLogic } from './gameLogic.js';
```

## Benefits of This Architecture

1. **No race conditions** - Modules load in order
2. **Clear dependencies** - See imports at top of each file
3. **Easy testing** - Can mock imports for unit tests
4. **Better IDE support** - Auto-complete and refactoring work
5. **Standard tooling** - Works with any modern bundler
6. **Scalable** - Easy to add new features as modules

