function Currency(short, mul) {
    this.short = short
    this.mul = mul
    this.name = CURRENCY_NAMES_SHORT_AND_LONG[short]
}

function YearData(year, url) {
    this.year = year
    this.url = url
    this.finish = false
    this.currency_array = []
}

/**
 * ROOT DATA ELEMENT
 */
const database = []

YearData.prototype.fetchData = async function() {
        this.currency_array = []
        fetch(this.url)
        .then(response => response.text())
        .then(data => {
            var a_data = JSON.parse(data)
            for (let key in a_data['rates']) {
                var value = a_data['rates'][key]
                console.log(key)
                this.currency_array.push(new Currency(key, value))
                this.finish = true
            }
        })
        .catch(error => {
            console.error('ERROR: ', error)
        })
    }

var fetchAllAsync = () => {
    let nr = 0
    let loopWileTrue = (func) => {
        if (func()) {
            setTimeout(() => {
                loopWileTrue(func)
                console.log("Set Timeout: " + nr)
                nr++
            }, 200)
        } else {
            console.log("Fetched all data")
        }
    }
    for (let year = 2000; year < 2025; year++) {
        database.push(new YearData(year, "https://api.frankfurter.dev/v1/" + year + "-01-04?base=USD"))
    }
    for (var i = 0; i < database.length; i++) {
        database[i].fetchData()
    }
    loopWileTrue(() => {
        database.forEach((yearObj) => {
            if (!(yearObj.finish)) {
                return true
            }
        })
        return false
    })
}
