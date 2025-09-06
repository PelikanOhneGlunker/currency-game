/**
 * @AutoComment <D137> " Register module" (0x2dF9)
 * @AutoComment <D129> " Emit ready event SAFELY" (0x2dF9)
 * @AutoComment <D119> " Emit resize event SAFELY" (0x2dF9)
 * @AutoComment <D116> " Re-apply responsive styles" (0x2dF9)
 * @AutoComment <D111> " Handle window resize" (0x2dF9)
 * @AutoComment <D103> " Initialize answer manager after DOM is ready" (0x2dF9)
 * @AutoComment <D100> " Finally, append to document body" (0x2dF9)
 * @AutoComment <D096> " Append to game container" (0x2dF9)
 * @AutoComment <D091> " Append elements to game content" (0x2dF9)
 * @AutoComment <D088> " Create timer using component builder" (0x2dF9)
 * @AutoComment <D072> " Create answers container" (0x2dF9)
 * @AutoComment <D052> " Create question container" (0x2dF9)
 * @AutoComment <D048> " Create ticker" (0x2dF9)
 * @AutoComment <D041> " Create game content section" (0x2dF9)
 * @AutoComment <D038> " Create header using component builder" (0x2dF9)
 * @AutoComment <D030> " Add hover effect" (0x2dF9)
 * @AutoComment <D005> " Apply global styles to body" (0x2dF9)
 * @AutoComment <D000> " createUI.js - Main UI Builder" (0x2dF9)
*/
window.buildDom = () => {
    const { applyStyles, getResponsiveStyles, isTablet } = window.StyleUtils
    
    applyStyles(document.body, {
        ...window.baseStyles.reset(),
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        background: window.darkTheme.background,
        minHeight: '100vh',
        ...window.baseStyles.flexCenter(),
        padding: getResponsiveStyles('1rem', '1rem', '2rem'),
        color: window.darkTheme.text
    })
    const gameContainer = document.createElement('div')
    gameContainer.className = 'game-container'
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
    })
    gameContainer.addEventListener('mouseenter', () => {
        gameContainer.style.transform = 'translateY(-5px)'
    })
    gameContainer.addEventListener('mouseleave', () => {
        gameContainer.style.transform = 'translateY(0)'
    })
    const header = window.ComponentBuilders.createHeader()
    const gameContent = document.createElement('div')
    gameContent.className = 'game-content'
    applyStyles(gameContent, {
        padding: getResponsiveStyles('2rem', '2.5rem', '3rem')
    })
    const ticker = window.createExchangeTicker()
    window.currentTicker = ticker; // Store globally for access
    const questionContainer = document.createElement('div')
    questionContainer.className = 'question-container'
    applyStyles(questionContainer, {
        marginBottom: '2rem'
    })
    const questionText = document.createElement('div')
    questionText.className = 'question-text'
    questionText.id = 'question-text'
    questionText.textContent = 'Loading data...'
    applyStyles(questionText, {
        fontSize: getResponsiveStyles('1.1rem', '1.25rem', '1.3rem'),
        fontWeight: '600',
        lineHeight: '1.5',
        marginBottom: getResponsiveStyles('1.5rem', '1.5rem', '2rem'),
        textAlign: 'center',
        color: window.darkTheme.questionText
    })
    const answersContainer = document.createElement('div')
    answersContainer.className = 'answers-container'
    answersContainer.id = 'answers-container'
    applyStyles(answersContainer, {
        display: 'flex',
        flexDirection: isTablet() ? 'row' : 'column',
        gap: getResponsiveStyles('1rem', '1.5rem', '2rem'),
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '150px'
    })
    questionContainer.appendChild(questionText)
    questionContainer.appendChild(answersContainer)
    const timerContainer = window.ComponentBuilders.createTimerContainer()
    gameContent.appendChild(ticker.container)
    gameContent.appendChild(questionContainer)
    gameContent.appendChild(timerContainer)
    gameContainer.appendChild(header)
    gameContainer.appendChild(gameContent)
    document.body.appendChild(gameContainer)
    
    setTimeout(() => {
        if (window.answerManager) {
            window.answerManager.init()
            window.answerManager.showLoading()
        }
    }, 0)
    let resizeTimeout
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
            document.body.innerHTML = ''
            window.buildDom()
            window.useModule('uiController', (uiController) => {
                uiController.emitUpdate('resize', {
                    width: window.innerWidth,
                    height: window.innerHeight
                })
            })
        }, 250)
    })
    window.useModule('uiController', (uiController) => {
        uiController.emitUpdate('domReady', true)
    })
    
    return window.ModuleLoader.get('uiController')
}
if (window.ModuleLoader) {
    window.ModuleLoader.register('createUI', { buildDom: window.buildDom })
}
