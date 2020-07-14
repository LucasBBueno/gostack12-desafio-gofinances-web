import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Header from '../../components/Header/index';

import formatValue from '../../utils/formatValue';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
  formattedValue: string;
  formattedDate: string;
  created_at: Date;
  category: {
    title: string;
  };
}

interface Balance {
  income: string; // formatValue gera string
  outcome: string;
  total: string;
}

const DashBoard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');

      const formattedTransactions = response.data.transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: new Date(transaction.created_at).toLocaleDateString(
            'pt-BR',
          ),
        }),
      );

      const formattedBalance = {
        income: formatValue(response.data.balance.income),
        outcome: formatValue(response.data.balance.outcome),
        total: formatValue(response.data.balance.total),
      };

      setTransactions(formattedTransactions);
      setBalance(formattedBalance);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        {balance && (
          <CardContainer>
            <Card>
              <header>
                <p>Entradas</p>
                <img src={income} alt="Entradas" />
              </header>
              <h1 data-testid="balance-income">{balance.income}</h1>
            </Card>
            <Card>
              <header>
                <p>Saídas</p>
                <img src={outcome} alt="Saídas" />
              </header>
              <h1 data-testid="balance-outcome">{balance.outcome}</h1>
            </Card>
            <Card total>
              <header>
                <p>Total</p>
                <img src={total} alt="Total" />
              </header>
              <h1 data-testid="balance-total">{balance.total}</h1>
            </Card>
          </CardContainer>
        )}
        {transactions && (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Data</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="title">{transaction.title}</td>
                    <td className={transaction.type}>
                      {transaction.type === 'outcome' && ' - '}
                      {transaction.formattedValue}
                    </td>
                    <td>{transaction.category.title}</td>
                    <td>{transaction.formattedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default DashBoard;
