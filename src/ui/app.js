// src/app.js
import { 
    darkTheme, 
    applyStyles, 
    baseStyles, 
    getResponsiveValue,
    injectGlobalStyles 
} from './styles.js';
import { uiController } from './uiController.js';
import { answerManager } from './answerManager.js';
import { ExchangeTicker } from './ticker.js';

class App {
    constructor() {
        this.ticker = null;
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        
        // Inject global styles
        injectGlobalStyles();
        
        // Build UI
        this.buildUI();
        
        // Cache DOM elements for UI controller
        uiController.cacheElements();
        
        // Initialize components
        answerManager.init();
        answerManager.showLoading();
        
        // Setup event listeners
        this.setupEventListeners();
        
        this.initialized = true;
        console.log('App initialized');
        
        // Emit ready event
        uiController.emit('ready', { timestamp: Date.now() });
    }

    buildUI() {
        // Apply body styles
        applyStyles(document.body, {
            ...baseStyles.reset(),
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: darkTheme.background,
            minHeight: '100vh',
            ...baseStyles.flexCenter(),
            padding: getResponsiveValue('1rem', '1rem', '2rem'),
            color: darkTheme.text
        });

        // Create main container
        const container = this.createContainer();
        
        // Create sections
        const header = this.createHeader();
        const content = this.createContent();
        
        container.appendChild(header);
        container.appendChild(content);
        document.body.appendChild(container);
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = 'game-container';
        
        applyStyles(container, {
            background: darkTheme.containerBg,
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            maxWidth: getResponsiveValue('500px', '600px', '700px'),
            width: '100%',
            overflow: 'hidden',
            border: `1px solid ${darkTheme.border}`,
            margin: '50px'
        });

        return container;
    }

    createHeader() {
        const header = document.createElement('div');
        
        applyStyles(header, {
            background: darkTheme.headerBg,
            color: 'white',
            padding: getResponsiveValue('1.5rem', '2rem', '2.5rem'),
            textAlign: 'center'
        });

        // Title
        const title = document.createElement('h1');
        title.textContent = 'Währungspiel Quiz';
        applyStyles(title, {
            fontSize: getResponsiveValue('1.5rem', '1.8rem', '2rem'),
            fontWeight: '700',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        });

        // Stats container
        const stats = document.createElement('div');
        applyStyles(stats, {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginTop: '1rem'
        });

        // Create stat items
        ['Coins', 'Level', 'XP'].forEach((label, i) => {
            const stat = this.createStatItem(
                label, 
                `${label.toLowerCase()}-display`, 
                '0'
            );
            stats.appendChild(stat);
        });

        // Level progress
        const progress = this.createLevelProgress();

        header.appendChild(title);
        header.appendChild(stats);
        header.appendChild(progress);

        return header;
    }

    createStatItem(label, id, value) {
        const item = document.createElement('div');
        
        applyStyles(item, {
            background: darkTheme.statItemBg,
            borderRadius: '10px',
            padding: '1rem',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        });

        const labelEl = document.createElement('div');
        labelEl.textContent = label;
        applyStyles(labelEl, {
            fontSize: '0.8rem',
            opacity: '0.9',
            marginBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        });

        const valueEl = document.createElement('div');
        valueEl.id = id;
        valueEl.textContent = value;
        applyStyles(valueEl, {
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#61dafb'
        });

        item.appendChild(labelEl);
        item.appendChild(valueEl);
        return item;
    }

    createLevelProgress() {
        const container = document.createElement('div');
        applyStyles(container, { marginTop: '1rem' });

        const bar = document.createElement('div');
        applyStyles(bar, {
            background: darkTheme.levelBarBg,
            borderRadius: '10px',
            height: '8px',
            overflow: 'hidden'
        });

        const fill = document.createElement('div');
        fill.id = 'level-progress-bar';
        applyStyles(fill, {
            background: darkTheme.levelBarFill,
            height: '100%',
            width: '0%',
            transition: 'width 0.3s ease',
            borderRadius: '10px'
        });

        bar.appendChild(fill);
        container.appendChild(bar);

        return container;
    }

    createContent() {
        const content = document.createElement('div');
        applyStyles(content, {
            padding: getResponsiveValue('2rem', '2.5rem', '3rem')
        });

        /**
         * @function TryToApplyModiTicker
         * @todo OnlyTest
         */
        try {
            throw Error("")
            this.ticker = new ExchangeTicker()
            content.appendChild(this.ticker.create())
        } catch (except) {
            try {
                const ticker = new ExchangeTicker()
                ticker.pause()
                ticker.play()
                ticker.setSpeed(30)
                ticker.hide()
                ticker.show()
                const tickerElement = ticker.create()
                content.appendChild(tickerElement)
            } catch (except) {
            }
        }

        // Question section
        const questionSection = document.createElement('div');
        applyStyles(questionSection, { marginBottom: '2rem' });

        const questionText = document.createElement('div');
        questionText.id = 'question-text';
        questionText.textContent = 'Loading...';
        applyStyles(questionText, {
            fontSize: getResponsiveValue('1.1rem', '1.25rem', '1.3rem'),
            fontWeight: '600',
            lineHeight: '1.5',
            marginBottom: '2rem',
            textAlign: 'center',
            color: darkTheme.questionText
        });

        const answersContainer = document.createElement('div');
        answersContainer.id = 'answers-container';
        applyStyles(answersContainer, {
            display: 'flex',
            flexDirection: getResponsiveValue('column', 'row', 'row'),
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '150px'
        });

        questionSection.appendChild(questionText);
        questionSection.appendChild(answersContainer);

        // Timer
        const timerSection = this.createTimer();

        content.appendChild(questionSection);
        content.appendChild(timerSection);

        return content;
    }

    createTimer() {
        const container = document.createElement('div');
        applyStyles(container, {
            textAlign: 'center',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: `2px solid ${darkTheme.border}`
        });

        const label = document.createElement('div');
        label.textContent = 'Time Played';
        applyStyles(label, {
            fontSize: '0.9rem',
            color: darkTheme.textSecondary,
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        });

        const timer = document.createElement('div');
        timer.id = 'timer-display';
        timer.textContent = '00:00';
        applyStyles(timer, {
            fontSize: getResponsiveValue('2rem', '2rem', '2.5rem'),
            fontWeight: '700',
            color: darkTheme.timerText,
            fontFamily: 'monospace',
            textShadow: '0 0 10px rgba(52, 152, 219, 0.5)'
        });

        container.appendChild(label);
        container.appendChild(timer);

        return container;
    }

    setupEventListeners() {
        // Listen for UI updates
        uiController.on('update', (data) => {
            console.log('UI Update:', data);
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Could rebuild UI or adjust styles here
                console.log('Window resized');
            }, 250);
        });
    }
}

// Export singleton instance
export const app = new App();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}
