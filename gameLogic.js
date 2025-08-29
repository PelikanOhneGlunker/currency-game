function GameLogic() {

    var currency_name = {
        "AUD": "Australischer Dollar (A$)",
        "BGN": "Bulgarischer Lew (лв)",
        "BRL": "Brasilianischer Real (R$)",
        "CAD": "Kanadischer Dollar (C$)",
        "CHF": "Schweizer Franken (CHF)",
        "CNY": "Renminbi Yuan (¥)",
        "CZK": "Tschechische Krone (Kč)",
        "DKK": "Dänische Krone (kr)",
        "GBP": "Britisches Pfund (£)",
        "HKD": "Hongkong-Dollar (HK$)",
        "HUF": "Ungarischer Forint (Ft)",
        "IDR": "Indonesische Rupiah (Rp)",
        "ILS": "Israelischer Neuer Schekel (₪)",
        "INR": "Indische Rupie (₹)",
        "ISK": "Isländische Krone (kr)",
        "JPY": "Japanischer Yen (¥)",
        "KRW": "Südkoreanischer Won (₩)",
        "MXN": "Mexikanischer Peso (MX$)",
        "MYR": "Malaysischer Ringgit (RM)",
        "NOK": "Norwegische Krone (kr)",
        "NZD": "Neuseeländischer Dollar (NZ$)",
        "PHP": "Philippinischer Peso (₱)",
        "PLN": "Polnischer Złoty (zł)",
        "RON": "Rumänischer Leu (lei)",
        "SEK": "Schwedische Krone (kr)",
        "SGD": "Singapur-Dollar (S$)",
        "THB": "Thailändischer Baht (฿)",
        "TRY": "Türkische Lira (₺)",
        "USD": "US-Dollar ($)",
        "ZAR": "Südafrikanischer Rand (R)",
        "EUR": "Euro (€)"
    }

    function Currency(short, mul) {
        this.short = short
        this.mul = mul
        this.name = currency_name[short]
    }

    var currency_array = []
    var a_data = null
    var index = 0

    this.init = async function() {
        await fetch("https://api.frankfurter.dev/v1/latest").then(response => response.text())
                    .then(data => {
                        a_data = JSON.parse(data)
                    })
                    .catch(error => {
                        console.error('ERROR: ', error)
                    })
                    for (let key in a_data['rates']) {
                        var value = a_data['rates'][key]
                        console.log(key)
                        currency_array.push(new Currency(key, value))
                    }
    }

    this.evaluation = function(param) {
        console.log(param.answer)
        console.log(param.selected)
    }

    this.askQuest = function() {
        this.window.gameUI.loadQuestion({
            question: "was ist mehr wert? " + currency_array[index].short + " oder " + currency_array[index + 1].short, 
            answers: [currency_array[index].name, currency_array[index + 1].name]
        }, 
        this.evaluation)
        index++
    }
}
