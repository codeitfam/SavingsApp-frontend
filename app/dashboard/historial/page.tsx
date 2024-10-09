"use client"
import { Transaction } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react';

const HistorialDeTransaccionesPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Historial de Transacciones</h1>
      {transactions.length === 0 ? (
        <p>No hay transacciones registradas.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Tipo</th>
              <th className="py-2 px-4 border">Fondo</th>
              <th className="py-2 px-4 border">Monto</th>
              <th className="py-2 px-4 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="py-2 px-4">{transaction.id}</td>
                <td className="py-2 px-4">{transaction.type}</td>
                <td className="py-2 px-4">{transaction.fund.name}</td>
                <td className="py-2 px-4">${transaction.amount.toLocaleString()}</td>
                <td className="py-2 px-4">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistorialDeTransaccionesPage;

