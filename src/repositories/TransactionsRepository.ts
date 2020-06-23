import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  // private balance: Omit<Balance, 'total'>;

  constructor() {
    this.transactions = [];
    // this.balance = { outcome: 0, income: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeReducer2 = (a: number, c: Transaction): number => {
      return c.type === 'income' ? a + c.value : a + 0;
    };

    const outcomeReducer = (a: number, c: Transaction): number => {
      return c.type === 'outcome' ? a + c.value : a + 0;
    };

    const income = this.transactions.reduce(incomeReducer2, 0);
    const outcome = this.transactions.reduce(outcomeReducer, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };

    // return {
    //   income: this.balance.income || 0,
    //   outcome: this.balance.outcome || 0,
    //   total: this.balance.income - this.balance.outcome || 0,
    // };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    // if (type === 'income') this.balance.income += value;
    // else this.balance.outcome += value;

    return transaction;
  }
}

export default TransactionsRepository;
