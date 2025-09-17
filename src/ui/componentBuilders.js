window.ComponentBuilders = {
    createStatItem(labelText, valueId, initialValue) {
        const { applyStyles, getResponsiveStyles } = window.StyleUtils
        const statItem = document.createElement('div')
        statItem.className = 'stat-item'
        
        applyStyles(statItem, {
            background: window.darkTheme.statItemBg,
            ...window.baseStyles.borderRadius('10px'),
            padding: getResponsiveStyles('0.75rem', '1rem', '1rem'),
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        })
        const label = document.createElement('div')
        label.className = 'stat-label'
        label.textContent = labelText
        applyStyles(label, {
            fontSize: '0.8rem',
            opacity: '0.9',
            marginBottom: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        })
        const value = document.createElement('div')
        value.className = 'stat-value'
        value.id = valueId
        value.textContent = initialValue
        applyStyles(value, {
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#61dafb'
        })
        statItem.appendChild(label)
        statItem.appendChild(value)
        return statItem
    },
    createHeader() {
        const { applyStyles, getResponsiveStyles } = window.StyleUtils
        const header = document.createElement('div')
        header.className = 'header'
        
        applyStyles(header, {
            ...window.baseStyles.gradient(window.darkTheme.headerBg),
            color: 'white',
            padding: getResponsiveStyles('1.5rem', '2rem', '2.5rem'),
            textAlign: 'center'
        })
        const gameTitle = document.createElement('h1')
        gameTitle.className = 'game-title'
        gameTitle.textContent = 'Währungspiel Quiz'
        applyStyles(gameTitle, {
            fontSize: getResponsiveStyles('1.5rem', '1.8rem', '2rem'),
            fontWeight: '700',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        })
        const statsContainer = document.createElement('div')
        statsContainer.className = 'stats-container'
        applyStyles(statsContainer, {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: getResponsiveStyles('1rem', '1.5rem', '1.5rem'),
            marginTop: '1rem'
        })
        statsContainer.appendChild(this.createStatItem('Coins', 'coins-display', '0'))
        statsContainer.appendChild(this.createStatItem('Level', 'level-display', '0'))
        statsContainer.appendChild(this.createStatItem('XP', 'xp-display', '0'))
        const levelProgress = this.createLevelProgress()
        header.appendChild(gameTitle)
        header.appendChild(statsContainer)
        header.appendChild(levelProgress)
        return header
    },
    createLevelProgress() {
        const { applyStyles } = window.StyleUtils
        const levelProgress = document.createElement('div')
        levelProgress.className = 'level-progress'
        applyStyles(levelProgress, { marginTop: '1rem' })
        const levelBar = document.createElement('div')
        levelBar.className = 'level-bar'
        applyStyles(levelBar, {
            background: window.darkTheme.levelBarBg,
            ...window.baseStyles.borderRadius('10px'),
            height: '8px',
            overflow: 'hidden'
        })
        const levelBarFill = document.createElement('div')
        levelBarFill.className = 'level-bar-fill'
        levelBarFill.id = 'level-progress-bar'
        applyStyles(levelBarFill, {
            ...window.baseStyles.gradient(window.darkTheme.levelBarFill),
            height: '100%',
            width: '3%',
            ...window.baseStyles.transition('width'),
            ...window.baseStyles.borderRadius('10px')
        })
        levelBar.appendChild(levelBarFill)
        const levelText = document.createElement('div')
        levelText.className = 'level-text'
        applyStyles(levelText, {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.8)'
        })
        const currentLevelSpan = document.createElement('span')
        const currentLevelInner = document.createElement('span')
        currentLevelInner.id = 'current-level'
        currentLevelInner.textContent = '0'
        applyStyles(currentLevelInner, {
            color: '#61dafb',
            fontWeight: 'bold'
        })
        currentLevelSpan.appendChild(document.createTextNode('Level '))
        currentLevelSpan.appendChild(currentLevelInner)
        const nextLevelSpan = document.createElement('span')
        const nextLevelInner = document.createElement('span')
        nextLevelInner.id = 'next-level'
        nextLevelInner.textContent = '1'
        applyStyles(nextLevelInner, {
            color: '#ffd700',
            fontWeight: 'bold'
        })
        nextLevelSpan.appendChild(document.createTextNode('Next: Level '))
        nextLevelSpan.appendChild(nextLevelInner)
        levelText.appendChild(currentLevelSpan)
        levelText.appendChild(nextLevelSpan)
        levelProgress.appendChild(levelBar)
        levelProgress.appendChild(levelText)
        return levelProgress
    },
    createTimerContainer() {
        const { applyStyles, getResponsiveStyles } = window.StyleUtils
        const timerContainer = document.createElement('div')
        timerContainer.className = 'timer-container'
        
        applyStyles(timerContainer, {
            textAlign: 'center',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: `2px solid ${window.darkTheme.border}`
        })
        const timerLabel = document.createElement('div')
        timerLabel.className = 'timer-label'
        timerLabel.textContent = 'time passed in HEX milliseconds'
        applyStyles(timerLabel, {
            fontSize: '0.9rem',
            color: window.darkTheme.textSecondary,
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        })
        const timerValue = document.createElement('div')
        timerValue.className = 'timer-value'
        timerValue.id = 'timer-display'
        timerValue.textContent = '00:00'
        applyStyles(timerValue, {
            fontSize: getResponsiveStyles('2rem', '2rem', '2.5rem'),
            fontWeight: '700',
            color: window.darkTheme.timerText,
            fontFamily: '"Courier New", monospace',
            textShadow: '0 0 10px rgba(52, 152, 219, 0.5)'
        })
        timerContainer.appendChild(timerLabel)
        timerContainer.appendChild(timerValue)
        return timerContainer
    }
}
if (window.ModuleLoader) {
    window.ModuleLoader.register('componentBuilders', window.ComponentBuilders)
}
