class Account {

  constructor() {
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}




class Transaction  {

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

// Withdrawal Class
class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }

}

// Deposit Class
class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }

}


const myAccount = new Account("snow-patrol");
// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const t1 = new Deposit(120, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

const t2 = new Withdrawal(50.25, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

const t3 = new Withdrawal(45, myAccount);
console.log('Commit result:', t3.commit());
console.log('Account Balance: ', myAccount.balance);


console.log('Account Transaction History: ', myAccount.transactions);
