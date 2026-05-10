const depositBtn = document.getElementById('depositBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const depositAmt = document.getElementById('deposit');
const withdrawAmt = document.getElementById('withdraw');
const savingsLabel = document.getElementById('savingsLabel');
const walletAddress = document.getElementById('walletAddress');

const getSessionURL = 'http://localhost:3001/getSession';
const updateSessionURL = 'http://localhost:3001/updateSession';

let session;
let currentAmount = 0;

document.addEventListener('DOMContentLoaded', () => {
  getSession();

  if (depositBtn) {
    depositBtn.addEventListener('click', deposit);
  }

  if (withdrawBtn) {
    withdrawBtn.addEventListener('click', withdraw);
  }
});

async function getSession() {
  try {
    const res = await fetch(getSessionURL);

    if (!res.ok) {
      alert('You are not logged in.');
      window.location.href = '/login.html';
      return;
    }

    session = await res.json();
    currentAmount = Number(session.savings || 0);

    updateSavingsLabel();
  } catch (error) {
    console.error(error);
    alert('Could not load account data.');
  }
}

function updateSavingsLabel() {
  if (savingsLabel) {
    savingsLabel.innerHTML = 'Savings: $' + currentAmount.toFixed(2);
  }
}

async function deposit(e) {
  e.preventDefault();

  if (depositAmt.value === '') return;

  const amount = parseFloat(depositAmt.value);

  if (isNaN(amount) || amount <= 0) {
    alert('Invalid amount input!');
    depositAmt.value = '';
    return;
  }

  currentAmount += amount;
  updateSavingsLabel();

  depositAmt.value = '';
  await updateSavings();
}

async function withdraw(e) {
  e.preventDefault();

  if (withdrawAmt.value === '') return;

  const amount = parseFloat(withdrawAmt.value);

  if (isNaN(amount) || amount <= 0) {
    alert('Invalid amount input!');
    withdrawAmt.value = '';
    return;
  }

  if (amount > currentAmount) {
    alert('You do not have enough money in savings.');
    withdrawAmt.value = '';
    return;
  }

  currentAmount -= amount;
  updateSavingsLabel();

  withdrawAmt.value = '';
  await updateSavings();
}

async function updateSavings() {
  try {
    const result = await fetch(updateSessionURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentAmount: currentAmount
      })
    });

    if (!result.ok) {
      alert('Could not save new balance.');
    }
  } catch (error) {
    console.error(error);
    alert('Could not update balance.');
  }
}

async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask is not installed.');
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    const address = accounts[0];

    const balanceWei = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest']
    });

    const balanceEth = parseInt(balanceWei, 16) / 1e18;

    /*
      PROJECT DEMO CONVERSION:
      This converts SepoliaETH test money into dashboard dollars.
      Example: 0.0500 SepoliaETH x 1000 = $50.00
    */
    const convertedMoney = balanceEth * 1000;

    currentAmount += convertedMoney;
    updateSavingsLabel();
    await updateSavings();

    if (walletAddress) {
      walletAddress.innerHTML =
        'Wallet: ' + address + '<br>' +
        'Sepolia Balance: ' + balanceEth.toFixed(4) + ' ETH<br>' +
        'Added to Account: $' + convertedMoney.toFixed(2);
    }

    alert('MetaMask connected and balance added to your account!');
  } catch (error) {
    console.error(error);
    alert('MetaMask connection failed.');
  }
}
