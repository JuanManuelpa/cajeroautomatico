var accounts = [
  { nombre: "Juan", saldo: 100, password: "123" },
  { nombre: "Manuel", saldo: 200, password: "1234" },
  { nombre: "Sara", saldo: 1000, password: "12345" }
];

var selectedAccount;
var passwordInput = document.getElementById("password-input");
var loginError = document.getElementById("login-error");
var accountName = document.getElementById("account-name");
var balance = document.getElementById("balance");
var transactionForm = document.getElementById("transaction-form");
var amountInput = document.getElementById("amount-input");
var transactionError = document.getElementById("transaction-error");

// Función para mostrar el error de inicio de sesión
function showLoginError(message) {
  loginError.textContent = message;
}

// Función para ocultar el error de inicio de sesión
function hideLoginError() {
  loginError.textContent = "";
}

// Función para mostrar el saldo actual
function showBalance() {
  balance.textContent = "Saldo actual: $" + selectedAccount.saldo.toFixed(2);
}

// Función para mostrar el error de transacción
function showTransactionError(message) {
  transactionError.textContent = message;
}

// Función para ocultar el error de transacción
function hideTransactionError() {
  transactionError.textContent = "";
}

// Función para realizar el inicio de sesión
function login() {
  var accountId = document.getElementById("account-select").value;
  var password = passwordInput.value;
  
  // Verificar la contraseña
  if (password === accounts[accountId].password) {
    selectedAccount = accounts[accountId];
    accountName.textContent = "Cuenta: " + selectedAccount.nombre;
    showBalance();
    passwordInput.value = "";
    hideLoginError();
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("transaction-screen").classList.remove("hidden");
  } else {
    showLoginError("Contraseña incorrecta. Intenta nuevamente.");
  }
}

// Función para realizar un depósito
function deposit() {
  transactionForm.classList.remove("hidden");
  hideTransactionError();
  amountInput.placeholder = "Ingresa el monto a depositar";
  document.getElementById("confirm-button").textContent = "Depositar";
  amountInput.value = "";
}

// Función para realizar un retiro
function withdraw() {
  transactionForm.classList.remove("hidden");
  hideTransactionError();
  amountInput.placeholder = "Ingresa el monto a retirar";
  document.getElementById("confirm-button").textContent = "Retirar";
  amountInput.value = "";
}

// Función para confirmar una transacción
function confirmTransaction() {
  var amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    showTransactionError("Ingresa un monto válido.");
    return;
  }

  if (document.getElementById("confirm-button").textContent === "Depositar") {
    selectedAccount.saldo += amount;
    showBalance();
    hideTransactionError();
    transactionForm.classList.add("hidden");
  } else {
    if (amount > selectedAccount.saldo) {
      showTransactionError("No tienes suficiente saldo.");
    } else if (selectedAccount.saldo - amount < 10 || selectedAccount.saldo - amount > 990) {
      showTransactionError("No puedes retirar ese monto debido a una regla de negocio.");
    } else {
      selectedAccount.saldo -= amount;
      showBalance();
      hideTransactionError();
      transactionForm.classList.add("hidden");
    }
  }
}

// Función para cancelar una transacción
function cancelTransaction() {
  transactionForm.classList.add("hidden");
  hideTransactionError();
}

// Función para cerrar sesión
function logout() {
  document.getElementById("transaction-screen").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
}

// Event Listeners
document.getElementById("login-button").addEventListener("click", login);
document.getElementById("deposit-button").addEventListener("click", deposit);
document.getElementById("withdraw-button").addEventListener("click", withdraw);
document.getElementById("confirm-button").addEventListener("click", confirmTransaction);
document.getElementById("cancel-button").addEventListener("click", cancelTransaction);
document.getElementById("check-balance-button").addEventListener("click", showBalance);
document.getElementById("logout-button").addEventListener("click", logout);
