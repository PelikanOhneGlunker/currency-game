// createUI.js - Main UI Builder

window.buildDom = () => {
    const { applyStyles, getResponsiveStyles, isTablet } = window.StyleUtils;
    
    // Apply global styles to body
    applyStyles(document.body, {
        ...window.baseStyles.reset(),
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        background: window.darkTheme.background,
        minHeight: '100vh',
        ...window.baseStyles.flexCenter(),
        padding: getResponsiveStyles('1rem', '1rem', '2rem'),
        color: window.darkTheme.text
    });

    const gameContainer = document.createElement('div');
    gameContainer.className = 'game-container';
    applyStyles(gameContainer, {
        background: window.darkTheme.containerBg,
        ...window.baseStyles.borderRadius('20px'),
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        maxWidth: getResponsiveStyles('500px', '600px', '700px'),
        width: '100%',
        overflow: 'hidden',
        ...window.baseStyles.transition('transform'),
        border: `1px solid ${window.darkTheme.border}`,
        margin: '50px'
    });

    // Add hover effect
    gameContainer.addEventListener('mouseenter', () => {
        gameContainer.style.transform = 'translateY(-5px)';
    });
    gameContainer.addEventListener('mouseleave', () => {
        gameContainer.style.transform = 'translateY(0)';
    });

    // Create header using component builder
    const header = window.ComponentBuilders.createHeader();

    // Create game content section
    const gameContent = document.createElement('div');
    gameContent.className = 'game-content';
    applyStyles(gameContent, {
        padding: getResponsiveStyles('2rem', '2.5rem', '3rem')
    });

    // Create ticker
    const ticker = window.createExchangeTicker();
    window.currentTicker = ticker; // Store globally for access

    // Create question container
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    applyStyles(questionContainer, {
        marginBottom: '2rem'
    });

    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.id = 'question-text';
    questionText.textContent = 'Loading data...';
    applyStyles(questionText, {
        fontSize: getResponsiveStyles('1.1rem', '1.25rem', '1.3rem'),
        fontWeight: '600',
        lineHeight: '1.5',
        marginBottom: getResponsiveStyles('1.5rem', '1.5rem', '2rem'),
        textAlign: 'center',
        color: window.darkTheme.questionText
    });

    // Create answers container
    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';
    answersContainer.id = 'answers-container';
    applyStyles(answersContainer, {
        display: 'flex',
        flexDirection: isTablet() ? 'row' : 'column',
        gap: getResponsiveStyles('1rem', '1.5rem', '2rem'),
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '150px'
    });

    questionContainer.appendChild(questionText);
    questionContainer.appendChild(answersContainer);

    // Create timer using component builder
    const timerContainer = window.ComponentBuilders.createTimerContainer();

    // Append elements to game content
    gameContent.appendChild(ticker.container);
    gameContent.appendChild(questionContainer);
    gameContent.appendChild(timerContainer);

    // Append to game container
    gameContainer.appendChild(header);
    gameContainer.appendChild(gameContent);

    // Finally, append to document body
    document.body.appendChild(gameContainer);
    
    // Initialize answer manager after DOM is ready
    setTimeout(() => {
        if (window.answerManager) {
            window.answerManager.init();
            window.answerManager.showLoading();
        }
    }, 0);

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Re-apply responsive styles
            document.body.innerHTML = '';
            window.buildDom();
            // Emit resize event SAFELY
            window.useModule('uiController', (uiController) => {
                uiController.emitUpdate('resize', {
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            });
        }, 250);
    });

    // Emit ready event SAFELY
    window.useModule('uiController', (uiController) => {
        uiController.emitUpdate('domReady', true);
    });
    
    return window.ModuleLoader.get('uiController');
};

// Register module
if (window.ModuleLoader) {
    window.ModuleLoader.register('createUI', { buildDom: window.buildDom });
}