// Style utility functions
const applyStyles = (element, styles) => {
    Object.assign(element.style, styles);
};

const getViewportWidth = () => window.innerWidth;
const isTablet = () => getViewportWidth() >= 768;
const isDesktop = () => getViewportWidth() >= 1024;

// Define color scheme for dark mode
const darkTheme = {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    containerBg: '#0f0f1e',
    headerBg: 'linear-gradient(135deg, #2d3561 0%, #1e3c72 100%)',
    text: '#e2e8f0',
    textSecondary: '#a0aec0',
    border: '#2d3748',
    statItemBg: 'rgba(255, 255, 255, 0.1)',
    questionText: '#f0f4f8',
    timerText: '#cbd5e0',
    answerButton1: 'linear-gradient(135deg, #8e44ad 0%, #c0392b 100%)',
    answerButton2: 'linear-gradient(135deg, #2980b9 0%, #3498db 100%)',
    levelBarBg: 'rgba(255, 255, 255, 0.15)',
    levelBarFill: 'linear-gradient(90deg, #f39c12 0%, #e67e22 100%)',
    loadingSpinner: '#3498db'
};

// Base styles prototype
const baseStyles = {
    reset: () => ({
        margin: '0',
        padding: '0',
        boxSizing: 'border-box'
    }),
    
    flexCenter: () => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }),
    
    transition: (property = 'all', duration = '0.3s', easing = 'ease') => ({
        transition: `${property} ${duration} ${easing}`
    }),
    
    borderRadius: (size) => ({
        borderRadius: size
    }),
    
    gradient: (colors) => ({
        background: colors
    })
};

// Responsive styles function
const getResponsiveStyles = (base, tablet = {}, desktop = {}) => {
    if (isDesktop()) return { ...base, ...tablet, ...desktop };
    if (isTablet()) return { ...base, ...tablet };
    return base;
};

// Create Exchange Rate Ticker
const createExchangeTicker = () => {
    // Currency pairs and their data
    const currencies = [
        { pair: 'EUR/USD', rate: 1.0856, change: 0.0012, changePercent: 0.11 },
        { pair: 'GBP/USD', rate: 1.2643, change: -0.0008, changePercent: -0.06 },
        { pair: 'USD/JPY', rate: 149.32, change: 0.45, changePercent: 0.30 },
        { pair: 'USD/CHF', rate: 0.8912, change: 0.0003, changePercent: 0.03 },
        { pair: 'AUD/USD', rate: 0.6534, change: -0.0021, changePercent: -0.32 },
        { pair: 'USD/CAD', rate: 1.3687, change: 0.0015, changePercent: 0.11 },
        { pair: 'NZD/USD', rate: 0.5892, change: -0.0009, changePercent: -0.15 },
        { pair: 'EUR/GBP', rate: 0.8587, change: 0.0006, changePercent: 0.07 },
        { pair: 'EUR/JPY', rate: 162.08, change: 0.82, changePercent: 0.51 },
        { pair: 'GBP/JPY', rate: 188.75, change: -0.23, changePercent: -0.12 },
        { pair: 'USD/CNY', rate: 7.2845, change: 0.0089, changePercent: 0.12 },
        { pair: 'USD/INR', rate: 83.94, change: 0.18, changePercent: 0.21 },
        { pair: 'BTC/USD', rate: 43567.89, change: 892.45, changePercent: 2.09 },
        { pair: 'ETH/USD', rate: 2298.67, change: -45.23, changePercent: -1.93 },
        { pair: 'XAU/USD', rate: 2045.30, change: 12.85, changePercent: 0.63 }
    ];

    // Create ticker container
    const tickerContainer = document.createElement('div');
    tickerContainer.className = 'ticker-container';
    tickerContainer.id = 'exchange-ticker';
    applyStyles(tickerContainer, {
        background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
        borderBottom: '2px solid #2d3748',
        overflow: 'hidden',
        position: 'relative',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
    });

    // Create scrolling content wrapper
    const scrollWrapper = document.createElement('div');
    scrollWrapper.className = 'ticker-scroll';
    applyStyles(scrollWrapper, {
        display: 'flex',
        whiteSpace: 'nowrap',
        animation: 'scroll-ticker 60s linear infinite',
        paddingRight: '50px'
    });

    // Function to generate random rate changes
    const updateRate = (baseRate) => {
        const variation = (Math.random() - 0.5) * 0.01 * baseRate;
        return baseRate + variation;
    };

    // Function to create ticker items
    const createTickerItem = (currency) => {
        const item = document.createElement('span');
        item.className = 'ticker-item';
        
        // Determine color based on change
        const changeColor = currency.change >= 0 ? '#00ff88' : '#ff4757';
        const arrow = currency.change >= 0 ? '▲' : '▼';
        
        applyStyles(item, {
            padding: '0 20px',
            fontSize: '14px',
            fontFamily: '"Courier New", monospace',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            borderRight: '1px solid #2d3748'
        });

        // Create pair name
        const pairSpan = document.createElement('span');
        pairSpan.textContent = currency.pair;
        applyStyles(pairSpan, {
            color: '#ffffff',
            fontWeight: 'bold',
            letterSpacing: '1px'
        });

        // Create rate span
        const rateSpan = document.createElement('span');
        rateSpan.textContent = currency.rate.toFixed(currency.rate > 100 ? 2 : 4);
        applyStyles(rateSpan, {
            color: '#61dafb',
            fontWeight: '600'
        });

        // Create change span
        const changeSpan = document.createElement('span');
        changeSpan.textContent = `${arrow} ${Math.abs(currency.changePercent).toFixed(2)}%`;
        applyStyles(changeSpan, {
            color: changeColor,
            fontWeight: '500',
            fontSize: '12px'
        });

        item.appendChild(pairSpan);
        item.appendChild(rateSpan);
        item.appendChild(changeSpan);

        // Update rate randomly every 2-5 seconds
        setInterval(() => {
            const newRate = updateRate(currency.rate);
            const change = newRate - currency.rate;
            const changePercent = (change / currency.rate) * 100;
            
            rateSpan.textContent = newRate.toFixed(currency.rate > 100 ? 2 : 4);
            
            const newChangeColor = change >= 0 ? '#00ff88' : '#ff4757';
            const newArrow = change >= 0 ? '▲' : '▼';
            changeSpan.textContent = `${newArrow} ${Math.abs(changePercent).toFixed(2)}%`;
            changeSpan.style.color = newChangeColor;
            
            // Flash effect on update
            rateSpan.style.transition = 'none';
            rateSpan.style.textShadow = `0 0 10px ${newChangeColor}`;
            setTimeout(() => {
                rateSpan.style.transition = 'text-shadow 0.5s ease';
                rateSpan.style.textShadow = 'none';
            }, 100);
        }, 2000 + Math.random() * 3000);

        return item;
    };

    // Create two sets of ticker items for seamless loop
    const createTickerSet = () => {
        currencies.forEach(currency => {
            scrollWrapper.appendChild(createTickerItem(currency));
        });
    };

    // Add two sets for seamless scrolling
    createTickerSet();
    createTickerSet();

    tickerContainer.appendChild(scrollWrapper);

    // Add CSS animation
    const tickerStyle = document.createElement('style');
    tickerStyle.textContent = `
        @keyframes scroll-ticker {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-50%);
            }
        }
        
        .ticker-scroll:hover {
            animation-play-state: paused;
        }
        
        .ticker-item {
            transition: transform 0.3s ease;
        }
        
        .ticker-item:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(tickerStyle);

    // Ticker control functions
    return {
        container: tickerContainer,
        // Control functions
        pause: () => {
            scrollWrapper.style.animationPlayState = 'paused';
        },
        
        play: () => {
            scrollWrapper.style.animationPlayState = 'running';
        },
        
        setSpeed: (duration) => {
            scrollWrapper.style.animationDuration = `${duration}s`;
        },
        
        hide: () => {
            tickerContainer.style.display = 'none';
        },
        
        show: () => {
            tickerContainer.style.display = 'flex';
        },
        
        // Add custom currency pair
        addCurrency: (pair, rate, change, changePercent) => {
            const newCurrency = { pair, rate, change, changePercent };
            currencies.push(newCurrency);
            scrollWrapper.innerHTML = '';
            createTickerSet();
            createTickerSet();
        },
        
        // Update specific currency
        updateCurrency: (pair, newRate) => {
            const currency = currencies.find(c => c.pair === pair);
            if (currency) {
                const change = newRate - currency.rate;
                currency.rate = newRate;
                currency.change = change;
                currency.changePercent = (change / newRate) * 100;
            }
        }
    };
};

const buildDom = () => {
    // Apply global styles to body
    applyStyles(document.body, {
        ...baseStyles.reset(),
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        background: darkTheme.background,
        minHeight: '100vh',
        ...baseStyles.flexCenter(),
        padding: getResponsiveStyles('1rem', '1rem', '2rem'),
        color: darkTheme.text
    });

    const gameContainer = document.createElement('div');
    gameContainer.className = 'game-container';
    applyStyles(gameContainer, {
        background: darkTheme.containerBg,
        ...baseStyles.borderRadius('20px'),
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        maxWidth: getResponsiveStyles('500px', '600px', '700px'),
        width: '100%',
        overflow: 'hidden',
        ...baseStyles.transition('transform'),
        border: `1px solid ${darkTheme.border}`,
        margin: '50px'
    });

    // Add hover effect
    gameContainer.addEventListener('mouseenter', () => {
        gameContainer.style.transform = 'translateY(-5px)';
    });
    gameContainer.addEventListener('mouseleave', () => {
        gameContainer.style.transform = 'translateY(0)';
    });

    // Create the header section
    const header = document.createElement('div');
    header.className = 'header';
    applyStyles(header, {
        ...baseStyles.gradient(darkTheme.headerBg),
        color: 'white',
        padding: getResponsiveStyles('1.5rem', '2rem', '2.5rem'),
        textAlign: 'center'
    });

    // Create the game title
    const gameTitle = document.createElement('h1');
    gameTitle.className = 'game-title';
    gameTitle.textContent = 'Währungspiel Quiz';
    applyStyles(gameTitle, {
        fontSize: getResponsiveStyles('1.5rem', '1.8rem', '2rem'),
        fontWeight: '700',
        marginBottom: '1rem',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    });

    // Create the stats container
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-container';
    applyStyles(statsContainer, {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: getResponsiveStyles('1rem', '1.5rem', '1.5rem'),
        marginTop: '1rem'
    });

    // Function to create stat items
    const createStatItem = (labelText, valueId, initialValue) => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        applyStyles(statItem, {
            background: darkTheme.statItemBg,
            ...baseStyles.borderRadius('10px'),
            padding: getResponsiveStyles('0.75rem', '1rem', '1rem'),
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        });

        const label = document.createElement('div');
        label.className = 'stat-label';
        label.textContent = labelText;
        applyStyles(label, {
            fontSize: '0.8rem',
            opacity: '0.9',
            marginBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        });

        const value = document.createElement('div');
        value.className = 'stat-value';
        value.id = valueId;
        value.textContent = initialValue;
        applyStyles(value, {
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#61dafb'
        });

        statItem.appendChild(label);
        statItem.appendChild(value);
        return statItem;
    };

    // Create stat items
    statsContainer.appendChild(createStatItem('Coins', 'coins-display', '0'));
    statsContainer.appendChild(createStatItem('Level', 'level-display', '0'));
    statsContainer.appendChild(createStatItem('XP', 'xp-display', '0'));

    // Create level progress section
    const levelProgress = document.createElement('div');
    levelProgress.className = 'level-progress';
    applyStyles(levelProgress, {
        marginTop: '1rem'
    });

    const levelBar = document.createElement('div');
    levelBar.className = 'level-bar';
    applyStyles(levelBar, {
        background: darkTheme.levelBarBg,
        ...baseStyles.borderRadius('10px'),
        height: '8px',
        overflow: 'hidden'
    });

    const levelBarFill = document.createElement('div');
    levelBarFill.className = 'level-bar-fill';
    levelBarFill.id = 'level-progress-bar';
    applyStyles(levelBarFill, {
        ...baseStyles.gradient(darkTheme.levelBarFill),
        height: '100%',
        width: '3%',
        ...baseStyles.transition('width'),
        ...baseStyles.borderRadius('10px')
    });
    levelBar.appendChild(levelBarFill);

    // Create level text section
    const levelText = document.createElement('div');
    levelText.className = 'level-text';
    applyStyles(levelText, {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '0.5rem',
        fontSize: '0.85rem',
        color: 'rgba(255, 255, 255, 0.8)'
    });

    const currentLevelSpan = document.createElement('span');
    const currentLevelInner = document.createElement('span');
    currentLevelInner.id = 'current-level';
    currentLevelInner.textContent = '0';
    applyStyles(currentLevelInner, {
        color: '#61dafb',
        fontWeight: 'bold'
    });
    currentLevelSpan.appendChild(document.createTextNode('Level '));
    currentLevelSpan.appendChild(currentLevelInner);

    const nextLevelSpan = document.createElement('span');
    const nextLevelInner = document.createElement('span');
    nextLevelInner.id = 'next-level';
    nextLevelInner.textContent = '1';
    applyStyles(nextLevelInner, {
        color: '#ffd700',
        fontWeight: 'bold'
    });
    nextLevelSpan.appendChild(document.createTextNode('Next: Level '));
    nextLevelSpan.appendChild(nextLevelInner);

    levelText.appendChild(currentLevelSpan);
    levelText.appendChild(nextLevelSpan);
    levelProgress.appendChild(levelBar);
    levelProgress.appendChild(levelText);

    // Append elements to header
    header.appendChild(gameTitle);
    header.appendChild(statsContainer);
    header.appendChild(levelProgress);

    // Create game content section
    const gameContent = document.createElement('div');
    gameContent.className = 'game-content';
    applyStyles(gameContent, {
        padding: getResponsiveStyles('2rem', '2.5rem', '3rem')
    });

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
        color: darkTheme.questionText
    });

    // Create answers container
    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';
    answersContainer.id = 'answers-container';
    applyStyles(answersContainer, {
        display: 'flex',
        flexDirection: isTablet() ? 'row' : 'column',
        gap: getResponsiveStyles('1rem', '1.5rem', '2rem'),
        justifyContent: 'center',      // NEW: Centers horizontally
        alignItems: 'center',          // NEW: Centers vertically
        minHeight: '150px'             // NEW: Minimum height for vertical centering
    });

    // Loading state
    const loadingState = document.createElement('div');
    loadingState.className = 'loading-state';
    applyStyles(loadingState, {
        textAlign: 'center',
        padding: '2rem',
        color: darkTheme.textSecondary,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',      // NEW: Stack vertically
        alignItems: 'center',         // NEW: Center horizontally
        justifyContent: 'center'      // NEW: Center vertically
    });

    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    applyStyles(loadingSpinner, {
        width: '50px',
        height: '50px',
        border: `4px solid ${darkTheme.border}`,
        borderTop: `4px solid ${darkTheme.loadingSpinner}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
    });

    // Add keyframes for spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    const loadingText = document.createElement('p');
    loadingText.textContent = 'Preparing your money';
    applyStyles(loadingText, {
        color: darkTheme.textSecondary
    });

    loadingState.appendChild(loadingSpinner);
    loadingState.appendChild(loadingText);
    answersContainer.appendChild(loadingState);

    questionContainer.appendChild(questionText);
    questionContainer.appendChild(answersContainer);

    // Create timer container
    const timerContainer = document.createElement('div');
    timerContainer.className = 'timer-container';
    applyStyles(timerContainer, {
        textAlign: 'center',
        marginTop: '1.5rem',
        paddingTop: '1.5rem',
        borderTop: `2px solid ${darkTheme.border}`
    });

    const timerLabel = document.createElement('div');
    timerLabel.className = 'timer-label';
    timerLabel.textContent = 'Time Played';
    applyStyles(timerLabel, {
        fontSize: '0.9rem',
        color: darkTheme.textSecondary,
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    });

    const timerValue = document.createElement('div');
    timerValue.className = 'timer-value';
    timerValue.id = 'timer-display';
    timerValue.textContent = '00:00';
    applyStyles(timerValue, {
        fontSize: getResponsiveStyles('2rem', '2rem', '2.5rem'),
        fontWeight: '700',
        color: darkTheme.timerText,
        fontFamily: '"Courier New", monospace',
        textShadow: '0 0 10px rgba(52, 152, 219, 0.5)'
    });

    timerContainer.appendChild(timerLabel);
    timerContainer.appendChild(timerValue);

    this.ticker = createExchangeTicker();
    const tickerContainer = this.ticker.container

    // Append elements to game content
    // -------------------------
    gameContent.appendChild(tickerContainer)
    gameContent.appendChild(questionContainer);
    gameContent.appendChild(timerContainer);

    // Append header and game content to game container
    gameContainer.appendChild(header);
    gameContainer.appendChild(gameContent);

    // Finally, append the game container to the document body
    document.body.appendChild(gameContainer);

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Re-apply responsive styles
            document.body.innerHTML = '';
            buildDom();
        }, 250);
    });
    
    // Return UI control object
    return createUIController();
};

// Function to create answer buttons dynamically (for use after loading)
window.createAnswerButton = (text, index) => {
    const button = document.createElement('button');
    button.className = 'answer-button';
    button.textContent = text;
    
    const buttonGradient = index % 2 === 0 ? darkTheme.answerButton1 : darkTheme.answerButton2;
    
    applyStyles(button, {
        ...baseStyles.gradient(buttonGradient),
        color: 'white',
        border: 'none',
        ...baseStyles.borderRadius('15px'),
        padding: getResponsiveStyles('1rem 1.5rem', '1rem 1.5rem', '1.25rem 2rem'),
        fontSize: getResponsiveStyles('1rem', '1.1rem', '1.15rem'),
        fontWeight: '600',
        cursor: 'pointer',
        ...baseStyles.transition(),
        textAlign: 'center',
        minHeight: getResponsiveStyles('60px', '80px', '90px'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: isTablet() ? '1' : 'auto',
        outline: 'none',
        position: 'relative',
        overflow: 'hidden'
    });

    // Add hover effects
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 10px 20px rgba(52, 152, 219, 0.3)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });

    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.98)';
    });

    button.addEventListener('mouseup', () => {
        button.style.transform = 'translateY(-2px)';
    });

    // Focus styles for accessibility
    button.addEventListener('focus', () => {
        button.style.outline = '3px solid #3498db';
        button.style.outlineOffset = '2px';
    });

    button.addEventListener('blur', () => {
        button.style.outline = 'none';
    });

    return button;
};

// Create UI Controller with setter/getter functions
const createUIController = () => {
    return {
        // Coins functions
        setCoins: (value) => {
            const element = document.getElementById('coins-display');
            if (element) element.innerHTML = value;
        },
        getCoins: () => {
            const element = document.getElementById('coins-display');
            return element ? element.innerHTML : null;
        },

        // Level functions
        setLevel: (value) => {
            const element = document.getElementById('level-display');
            if (element) element.innerHTML = value;
        },
        getLevel: () => {
            const element = document.getElementById('level-display');
            return element ? element.innerHTML : null;
        },

        // XP functions
        setXP: (value) => {
            const element = document.getElementById('xp-display');
            if (element) element.innerHTML = value;
        },
        getXP: () => {
            const element = document.getElementById('xp-display');
            return element ? element.innerHTML : null;
        },

        // Current Level functions
        setCurrentLevel: (value) => {
            const element = document.getElementById('current-level');
            if (element) element.innerHTML = value;
        },
        getCurrentLevel: () => {
            const element = document.getElementById('current-level');
            return element ? element.innerHTML : null;
        },

        // Next Level functions
        setNextLevel: (value) => {
            const element = document.getElementById('next-level');
            if (element) element.innerHTML = value;
        },
        getNextLevel: () => {
            const element = document.getElementById('next-level');
            return element ? element.innerHTML : null;
        },

        // Level Progress Bar functions
        setLevelProgress: (percentage) => {
            const element = document.getElementById('level-progress-bar');
            if (element) {
                element.style.width = percentage + '%';
            }
        },
        getLevelProgress: () => {
            const element = document.getElementById('level-progress-bar');
            return element ? element.style.width : null;
        },

        // Question Text functions
        setQuestion: (text) => {
            const element = document.getElementById('question-text');
            if (element) element.innerHTML = text;
        },
        getQuestion: () => {
            const element = document.getElementById('question-text');
            return element ? element.innerHTML : null;
        },

        // Timer functions
        setTimer: (value) => {
            const element = document.getElementById('timer-display');
            if (element) element.innerHTML = value;
        },
        getTimer: () => {
            const element = document.getElementById('timer-display');
            return element ? element.innerHTML : null;
        },

        // Answers Container functions
        setAnswersHTML: (html) => {
            const element = document.getElementById('answers-container');
            if (element) element.innerHTML = html;
        },
        getAnswersHTML: () => {
            const element = document.getElementById('answers-container');
            return element ? element.innerHTML : null;
        },
        clearAnswers: () => {
            const element = document.getElementById('answers-container');
            if (element) element.innerHTML = '';
        },
        addAnswerButton: (text, index, clickHandler) => {
            const container = document.getElementById('answers-container');
            if (container) {
                const button = window.createAnswerButton(text, index);
                if (clickHandler) {
                    button.addEventListener('click', clickHandler);
                }
                container.appendChild(button);
                return button;
            }
            return null;
        },

        // Loading state functions
        showLoading: () => {
            const container = document.getElementById('answers-container');
            if (container) {
                container.innerHTML = `
                    <div class="style="text-align: center; padding: 2rem; color: ${darkTheme.textSecondary}; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <div class="loading-spinner" style="width: 10%; height: 10%; border: 4px solid ${darkTheme.border}; border-top: 4px solid ${darkTheme.loadingSpinner}; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
                        <p style="color: ${darkTheme.textSecondary}">Loading...</p>
                    </div>
                `;
            }
        },
        hideLoading: () => {
            const container = document.getElementById('answers-container');
            if (container) {
                container.innerHTML = '';
            }
            var ss = ".loading-spinner"
            const containerdef = document.getElementById('answers-container');
            if (containerdef) {
                containerdef.innerHTML = ss;
            }
        },

        // Generic setter/getter for any element by ID
        setElementHTML: (elementId, html) => {
            const element = document.getElementById(elementId);
            if (element) element.innerHTML = html;
        },
        getElementHTML: (elementId) => {
            const element = document.getElementById(elementId);
            return element ? element.innerHTML : null;
        },

        // Get all UI values at once
        getAllValues: () => {
            return {
                coins: document.getElementById('coins-display')?.innerHTML,
                level: document.getElementById('level-display')?.innerHTML,
                xp: document.getElementById('xp-display')?.innerHTML,
                currentLevel: document.getElementById('current-level')?.innerHTML,
                nextLevel: document.getElementById('next-level')?.innerHTML,
                levelProgress: document.getElementById('level-progress-bar')?.style.width,
                question: document.getElementById('question-text')?.innerHTML,
                timer: document.getElementById('timer-display')?.innerHTML,
                answers: document.getElementById('answers-container')?.innerHTML
            };
        },

        // Set multiple values at once
        setMultiple: (values) => {
            Object.entries(values).forEach(([key, value]) => {
                const methodName = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
                if (typeof this[methodName] === 'function') {
                    this[methodName](value);
                }
            });
        }
    };
};


