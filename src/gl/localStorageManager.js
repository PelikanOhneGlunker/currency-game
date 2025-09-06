/**
 * @see {@link /docs/CommandsForShell # 0x0C0000}
*/
const definitions = {}
function defineHex(key, opts) {
  definitions[key] = { ...opts }
}
const hexStorage = new Proxy(localStorage, {
  get(target, prop, receiver) {
    if (prop in definitions) {
      const { parse, defaultValue } = definitions[prop]
      const raw = target.getItem(prop)
      return raw !== null ? parse(raw) : defaultValue
    }
    const val = Reflect.get(target, prop, receiver)
    if (typeof val === 'function') {
      return val.bind(target)
    }
    return val
  },
  set(target, prop, value) {
    if (prop in definitions) {
      const { transform, validate } = definitions[prop]
      if (!validate(value)) {
        throw new Error(`Invalid value for ${prop}`)
      }
      target.setItem(prop, transform(value))
      return true
    }
    target[prop] = value
    return true
  }
})
var hexStorageTest = () => {
  defineHex('0xB20000', {
    transform: JSON.stringify,
    parse:     JSON.parse,
    validate:  v => typeof v === 'object',
    defaultValue: {}
  })
  var mess = {value: "Hallo, I'm a Object and existing on " + "0xB20000"}
  hexStorage['0xB20000'] = mess
  var mess_restore = hexStorage['0xB20000']
  if (mess_restore == mess) {
    console.log("Can read 0xB20000")
  } else {
    console.log("ERROR: Storage # 0xB20000")
    console.log(mess)
    console.log(mess_restore)
  }
}
var writeToStorage = () => {
  var startAdress = new HexNumber(0x0C0000)
  var range = new HexNumber(sumCurrencyArrayInDB())
  var endAdress = startAdress.add(range)
  console.log("Start Adress: " + startAdress)
  console.log("Range Adress: " + range)
  console.log("End__ Adress: " + endAdress)
  console.log("Database length: " + database.length)
  var yearIndex = 0
  var currencyIndex = 0
  startAdress.iterate(endAdress, (currentAddress) => {
    try {
        var short = database[yearIndex].currency_array[currencyIndex].short
        var mul = database[yearIndex].currency_array[currencyIndex].mul
        var name = database[yearIndex].currency_array[currencyIndex].name
        var year = database[yearIndex].year
        var cn = 0
        if (Object.prototype.toString.call(short) === "[object String]" && short.length > 0) cn++
        if (Object.prototype.toString.call(name) === "[object String]" && name.length > 0) cn++
        if (Object.prototype.toString.call(mul) === "[object Number]") cn++
        if (cn == 3) {
            var plocalStorageAdress = currentAddress.toString()
            defineHex(plocalStorageAdress, {
              transform: JSON.stringify,
              parse:     JSON.parse,
              validate:  v => typeof v === 'object',
              defaultValue: {}
            })
            hexStorage[plocalStorageAdress] = {
                short: short, 
                mul: mul, 
                name: name, 
                year: year, 
                localStorageAdress: plocalStorageAdress
            }
            if (currencyIndex < database[yearIndex].currency_array.length) {
              currencyIndex++
            }
            if (currencyIndex == database[yearIndex].currency_array.length) {
              yearIndex++
              currencyIndex = 0
            }
            if (yearIndex == database.length) {
              return false
            }
        }
    } catch (error) {
      alert("ERROR " + plocalStorageAdress + ": " + error + " Year " + yearIndex + " currency ind " + currencyIndex)
      if (database[yearIndex].currency_array.length < currencyIndex) {
        currencyIndex++
      } else {
        currencyIndex = 0
      }
      if (database.length < NR_OF_YEARS) {
        yearIndex++
      } else {
        return false
      }
      return true
    }
  })
}
var readStorage = (ptr = 0x0C0000) => {
  var startAdress = new HexNumber(ptr)
  var endAdress = new HexNumber(0xFFFFFF)
  console.log("Start Adress: " + startAdress)
  var resultList = []
  startAdress.iterate(endAdress, (currentAddress) => {
    try {
      var plocalStorageAdress = currentAddress.toString()
      if (hexStorage[plocalStorageAdress] == undefined) {
        return false
      }
      resultList.push(hexStorage[plocalStorageAdress])
    } catch (error) {
      alert("ERROR " + plocalStorageAdress + ": " + error + " Year " + yearIndex + " currency ind " + currencyIndex)
    }
  })
  return resultList
}