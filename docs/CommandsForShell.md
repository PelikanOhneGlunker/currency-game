for (var i = 0, sum = 0; i < NR_OF_YEARS; i++) {
  sum += database[i].currency_array.length
}
sum

------------------

var a_qus = database[22].currency_array[10]
        var b_qus = database[22].currency_array[6]
        uiController.setQuestion(a_qus.name + " 364837 " + a_qus.short + " || " + b_qus.name + " 74596549 " + b_qus.short)

------------------

# USAGE_IT
iteraator = new HexNumber(0x0208)
iteraator.iterate(0x0210, (currentAddress) => {
	alert(currentAddress)
})
