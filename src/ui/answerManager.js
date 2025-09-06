/**
 * @AutoComment <D163>  "Register module" (0x2dF9)
 * @AutoComment <D160>  "Create global instance" (0x2dF9)
 * @AutoComment <D117>  "Emit event for UI update" (0x2dF9)
 */
window.AnswerManager = class AnswerManager {

    constructor() {
        this.container = null
        this.buttons = []
    }

    init() {
        this.container = document.getElementById('answers-container')
    }

    /**
     * @private
     */
    createAnswerButton(text, index) {
        const button = document.createElement('button')
        button.className = 'answer-button'
        button.textContent = text
        
        const buttonGradient = index % 2 === 0 ? 
            window.darkTheme.answerButton1 : 
            window.darkTheme.answerButton2
        
        const { applyStyles, getResponsiveStyles, baseStyles, isTablet } = window.StyleUtils
        
        applyStyles(button, {
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
        })
        this.addButtonEffects(button)
        return button
    }

    /**
     * @private
     */
    addButtonEffects(button) {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)'
            button.style.boxShadow = '0 10px 20px rgba(52, 152, 219, 0.3)'
        })
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)'
            button.style.boxShadow = 'none'
        })
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.98)'
        })
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-2px)'
        })
        button.addEventListener('focus', () => {
            button.style.outline = '3px solid #3498db'
            button.style.outlineOffset = '2px'
        })
        button.addEventListener('blur', () => {
            button.style.outline = 'none'
        })
    }

    clearAnswers() {
        if (this.container) {
            this.container.innerHTML = ''
            this.buttons = []
        }
    }

    addAnswerButton(text, index, clickHandler) {
        if (!this.container) this.init()
        
        const button = this.createAnswerButton(text, index)
        if (clickHandler) {
            button.addEventListener('click', clickHandler)
        }
        
        this.container.appendChild(button)
        this.buttons.push(button)
        
        window.uiController.emitUpdate('answerAdded', { text, index })
        
        return button
    }



    showLoading() {
        if (!this.container) this.init()
        
        if (!this.container) {
            return
        }
        
        this.container.innerHTML = `
            <div class="loading-state" style="text-align: center; padding: 2rem; color: ${window.darkTheme.textSecondary}; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div class="loading-spinner" style="width: 50px; height: 50px; border: 4px solid ${window.darkTheme.border}; border-top: 4px solid ${window.darkTheme.loadingSpinner}; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
                <p style="color: ${window.darkTheme.textSecondary}">Preparing your money</p>
            </div>
        `
    }

    hideLoading() {
        this.clearAnswers()
    }

    disableAllButtons() {
        this.buttons.forEach(button => {
            button.disabled = true
            button.style.opacity = '0.6'
            button.style.cursor = 'not-allowed'
        })
    }

    enableAllButtons() {
        this.buttons.forEach(button => {
            button.disabled = false
            button.style.opacity = '1'
            button.style.cursor = 'pointer'
        })
    }
}
window.answerManager = new AnswerManager()
if (window.ModuleLoader) {
    window.ModuleLoader.register('answerManager', window.answerManager)
}
var isLoadingScreen = true
var attr_robj = null
async function winGame() {
    window.useModule('uiController', (uiController) => {
        let label = uiController.getCoins()
        label = parseInt(label) + 100
        uiController.setCoins(100)
    })
}
async function lossGame() {
    window.useModule('uiController', (uiController) => {
        let label = uiController.getCoins()
        label = parseInt(label) + 100
        uiController.setCoins(100)
    })
}
/**
 * @event <button>
 * @param {int} buttonId 
  */
async function click_button(buttonId) {
    robj = attr_robj
    if (robj[0].mul > robj[1].mub && buttenId == 1) {
        winGame()
        return
    }
    if (robj[0].mul < robj[1].mub && buttenId == 2) {
        winGame()
        return
    }
    lossGame()
}
