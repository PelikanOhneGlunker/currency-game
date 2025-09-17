window.createExchangeTicker = () => {
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
    ]
    const tickerContainer = document.createElement('div')
    tickerContainer.className = 'ticker-container'
    tickerContainer.id = 'exchange-ticker'
    
    window.StyleUtils.applyStyles(tickerContainer, {
        background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
        borderBottom: '2px solid #2d3748',
        overflow: 'hidden',
        position: 'relative',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
    })
    const scrollWrapper = document.createElement('div')
    scrollWrapper.className = 'ticker-scroll'
    window.StyleUtils.applyStyles(scrollWrapper, {
        display: 'flex',
        whiteSpace: 'nowrap',
        animation: 'scroll-ticker 60s linear infinite',
        paddingRight: '50px'
    })
    const updateRate = (baseRate) => {
        const variation = (Math.random() - 0.5) * 0.01 * baseRate
        return baseRate + variation
    }
    const createTickerItem = (currency) => {
        const item = document.createElement('span')
        item.className = 'ticker-item'
        
        const changeColor = currency.change >= 0 ? '#00ff88' : '#ff4757'
        const arrow = currency.change >= 0 ? '▲' : '▼'
        
        window.StyleUtils.applyStyles(item, {
            padding: '0 20px',
            fontSize: '14px',
            fontFamily: '"Courier New", monospace',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            borderRight: '1px solid #2d3748'
        })
        const pairSpan = document.createElement('span')
        pairSpan.textContent = currency.pair
        window.StyleUtils.applyStyles(pairSpan, {
            color: '#ffffff',
            fontWeight: 'bold',
            letterSpacing: '1px'
        })
        const rateSpan = document.createElement('span')
        rateSpan.textContent = currency.rate.toFixed(currency.rate > 100 ? 2 : 4)
        window.StyleUtils.applyStyles(rateSpan, {
            color: '#61dafb',
            fontWeight: '600'
        })
        const changeSpan = document.createElement('span')
        changeSpan.textContent = `${arrow} ${Math.abs(currency.changePercent).toFixed(2)}%`
        window.StyleUtils.applyStyles(changeSpan, {
            color: changeColor,
            fontWeight: '500',
            fontSize: '12px'
        })
        item.appendChild(pairSpan)
        item.appendChild(rateSpan)
        item.appendChild(changeSpan)
        setInterval(() => {
            const newRate = updateRate(currency.rate)
            const change = newRate - currency.rate
            const changePercent = (change / currency.rate) * 100
            
            rateSpan.textContent = newRate.toFixed(currency.rate > 100 ? 2 : 4)
            
            const newChangeColor = change >= 0 ? '#00ff88' : '#ff4757'
            const newArrow = change >= 0 ? '▲' : '▼'
            changeSpan.textContent = `${newArrow} ${Math.abs(changePercent).toFixed(2)}%`
            changeSpan.style.color = newChangeColor
            
            rateSpan.style.transition = 'none'
            rateSpan.style.textShadow = `0 0 10px ${newChangeColor}`
            setTimeout(() => {
                rateSpan.style.transition = 'text-shadow 0.5s ease'
                rateSpan.style.textShadow = 'none'
            }, 100)
        }, 2000 + Math.random() * 3000)
        return item
    }
    const createTickerSet = () => {
        currencies.forEach(currency => {
            scrollWrapper.appendChild(createTickerItem(currency))
        })
    }
    createTickerSet()
    createTickerSet()
    tickerContainer.appendChild(scrollWrapper)
    const tickerStyle = document.createElement('style')
    tickerStyle.textContent = `
        .ticker-scroll:hover { animation-play-state: paused; }
        .ticker-item { transition: transform 0.3s ease; }
        .ticker-item:hover { transform: scale(1.05); }
    `
    document.head.appendChild(tickerStyle)
    return {
        container: tickerContainer,
        pause: () => scrollWrapper.style.animationPlayState = 'paused',
        play: () => scrollWrapper.style.animationPlayState = 'running',
        setSpeed: (duration) => scrollWrapper.style.animationDuration = `${duration}s`,
        hide: () => tickerContainer.style.display = 'none',
        show: () => tickerContainer.style.display = 'flex'
    }
}
if (window.ModuleLoader) {
    window.ModuleLoader.register('ticker', { createExchangeTicker: window.createExchangeTicker })
}
