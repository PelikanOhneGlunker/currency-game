async function stripData() {
    await deleteCurrencysWithMissingData(database).then(() => {
        alert()
        saveToLocalStorage()
    })
    .catch((e) => alert(e))
    setupFrequencyPerCurrency()
    deleteDobbleEntrys()
}

/**
 * MAIN FUNCTION
 */
async function main() {
    /**
     * Builds the DOM and returns UI controller
     * @see {@link https://github.com/yourproject/docs/uiController.md}
     */
    uiController = buildDom()
    fetchAllAsync()
    window.setTimeout(() => {
        var a_qus = database[22].currency_array[10]
        var b_qus = database[22].currency_array[6]
        uiController.setQuestion(a_qus.name + " 364837 " + a_qus.short + " || " + b_qus.name + " 74596549 " + b_qus.short)
        stripData()
        uiController.hideLoading()
    }, 4000)
    
    uiController.addAnswerButton("US$", 0, () => {alert("$$$$ ")});
}

main()
