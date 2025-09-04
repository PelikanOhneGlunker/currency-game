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

var uiController = null
var centralKeyArray = []
var allFetched = false

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
                centralKeyArray.push(key)
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
            allFetched = true
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

var deleteDoubleEntrys = function (oldArray) {
	var copy = Object.assign({}, oldArray)
	var len = oldArray.length
	var doubleIndexArray = []
	var resultArr = []
	function checkBanIndex(index) {
		var b = true
		for (var i = 0; i < doubleIndexArray.length; i++) {
			if (doubleIndexArray[i] == index) {
				b = false
			}
		}
		return b
	}
	function compare(a, b) {// return true if the content is the same
		return (a[0] === b[0] && a[1] === b[1])
	}
	for (var i = 0; i < len; i++) {
		if (checkBanIndex(i)) {
			for (var j = 0; j < len; j++) {
				if (!(i == j)) {
					if (compare(oldArray[i], copy[j])) {
						doubleIndexArray.push(j)
					}
				}
			}
		}
	}
	for (var k = 0; k < len; k++) {
		if (checkBanIndex(k)) {
			resultArr.push(oldArray[k])
		}
	}
	return resultArr
}

function deleteDobbleEntrys() {
  console.log("Bevore: " + centralKeyArray.length)
  centralKeyArray = deleteDoubleEntrys(centralKeyArray)
  console.log("After:  " + centralKeyArray.length)
}
