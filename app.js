// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // hide result
    document.getElementById('result').style.display = 'none'
    // show loader
    document.getElementById('loading').style.display = 'block'

    setTimeout(calculateResult, 2000)

    e.preventDefault()
})

// calculate result
function calculateResult(){
    console.log('calculating..')
    // UI var
    const amount = document.getElementById('amount')
    const interest = document.getElementById('interest')
    const years = document.getElementById('years')
    const monthlyPayment = document.getElementById('monthly-payment')
    const totalPayment = document.getElementById('total-payment')
    const totalInterest = document.getElementById('total-interest')

    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12
    const calculatedPayment = parseFloat(years.value) * 12

    // compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment)
    const monthly = (principal * x * calculatedInterest) / (x - 1)

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayment).toFixed(2)
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2)

        // show result
        document.getElementById('result').style.display = 'block'
        // hide loader
        document.getElementById('loading').style.display = 'none'
    } else {
        showError('Please check your numbers')
    }
}                       

function showError(error){
    // hide result
    document.getElementById('result').style.display = 'none'
    // hide loader
    document.getElementById('loading').style.display = 'none'
    // create a div
    const errorDiv = document.createElement('div')
    // get element
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    // add a class
    errorDiv.className = ' alert alert-danger'
    // create textnode
    errorDiv.appendChild(document.createTextNode(error))

    // insert error above heading
    card.insertBefore(errorDiv, heading)

    // clear error after 3s
    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000)
}