class Account {

  constructor() {
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }


  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}


class Withdrawal extends Transaction {

  get value() {
    return -this.amount;

  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('Starting Account Balance: ', myAccount.balance);

let t1 = new Withdrawal(50.25, myAccount);
console.log('Commit Result: ', t1.commit());
console.log('Account Balance: ', myAccount.balance);

let t2 = new Deposit(120.00, myAccount);
console.log('Commit Result', t2.commit());
console.log('Account Balance: ', myAccount.balance);

let t3 = new Withdrawal(9.99, myAccount);
console.log('Commit Result', t3.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Balance:', myAccount.balance);
