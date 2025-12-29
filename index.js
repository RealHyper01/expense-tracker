// DOM 
const balanceTotal = document.getElementById("balance")
const incomeTotal = document.getElementById("income-total")
const expenseTotal = document.getElementById("expense-total")
const titleInput = document.getElementById("title-input")
const amountInput = document.getElementById("amount-input")
const errorMessage = document.getElementById("error-message")
const list = document.getElementById("transaction-list")
const form = document.getElementById("transaction-form")
const typeInput = document.getElementById("type-input")

// values
let history = JSON.parse(localStorage.getItem("history")) || []
let balanceValue = 0
let incomeValue = 0
let expenseValue = 0

// on page reload/load
recalcTotals()
addToList()

// form submit
form.addEventListener("submit", (e) => {
    e.preventDefault()
    addTransaction()
})

// add a transaction
function addTransaction() {

    if (!titleInput.value || !amountInput.value) {
        errorMessage.textContent = "Please enter both title and amount!"
        return
    } else {
        errorMessage.textContent = ""
    }

    const transaction = {
        title: titleInput.value,
        amount: Number(amountInput.value),
        type: typeInput.value
    }

    history.push(transaction)
    saveHistory()
    addToList()
    recalcTotals()

    titleInput.value = ""
    amountInput.value = ""
}

// save
function saveHistory() {
    localStorage.setItem("history", JSON.stringify(history))
}

// add to list
function addToList() {
    list.innerHTML = ""
    history.forEach((item, index) => {
        const newEntry = document.createElement("li")
        newEntry.classList.add("transaction", item.type)
        newEntry.innerHTML = `
            <strong>${item.title}</strong>
            Amount: ${item.amount} <br>
            Type: ${item.type}
            <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>
        `
        list.appendChild(newEntry)
    })
}

// recalc total
function recalcTotals() {
    balanceValue = 0
    incomeValue = 0
    expenseValue = 0

    history.forEach(item => {
        if (item.type === "income") {
            incomeValue += item.amount
            balanceValue += item.amount
        } else {
            expenseValue += item.amount
            balanceValue -= item.amount
        }
    })

    incomeTotal.textContent = incomeValue
    expenseTotal.textContent = expenseValue
    balanceTotal.textContent = balanceValue
}

// delete 
function deleteTransaction(index) {
    history.splice(index, 1)
    saveHistory()
    addToList()
    recalcTotals()
}
