# UI CONTROLLER

Individual Component Setters/Getters:

    Coins: setCoins(value), getCoins()

    Level: setLevel(value), getLevel()

    XP: setXP(value), getXP()

    Current Level: setCurrentLevel(value), getCurrentLevel()

    Next Level: setNextLevel(value), getNextLevel()

    Level Progress: setLevelProgress(percentage), getLevelProgress()

    Question: setQuestion(text), getQuestion()

    Timer: setTimer(value), getTimer()

Answers Container Functions:

    setAnswersHTML(html) - Set raw HTML for answers container

    getAnswersHTML() - Get current HTML of answers container

    clearAnswers() - Clear all answers

    addAnswerButton(text, index, clickHandler) - Add a new answer button

Loading State:

    showLoading() - Show loading spinner

    hideLoading() - Hide loading state

Generic Functions:

    setElementHTML(elementId, html) - Set HTML for any element by ID

    getElementHTML(elementId) - Get HTML from any element by ID

    getAllValues() - Get all UI values at once as an object

    setMultiple(values) - Set multiple values at once
