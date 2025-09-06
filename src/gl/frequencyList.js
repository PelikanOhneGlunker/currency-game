const frequencyList = []

var setupFrequencyPerCurrency = () => {
    Object.keys(CURRENCY_NAMES_SHORT_AND_LONG).forEach(key => {
        frequencyList.push({short: key, used: 0})
    })
}

var getLowestCurrency = () => {
    short_list = currency_array
    var arr = []
    for (var i = 0; i < CURRENCY_NAMES_SHORT_AND_LONG_LENGTH; i++) {
        arr.push(frequencyList[i].used)
    }
    let minn = Math.min(...arr)
    for (var i = 0; i < CURRENCY_NAMES_SHORT_AND_LONG_LENGTH; i++) {
        if (frequencyList[i].used == minn) {
            frequencyList[i].used++
            console.log("Incremented: " + frequencyList[i].short)
            return frequencyList[i].short
        }
    }
}
