"use client";
import { getHistorical } from '@/app/lib/data';
import { Transaction } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react';

const HistorialDeTransaccionesPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistorical("1");
      if (Array.isArray(data)) {
        setTransactions(data as Transaction[]);
        console.log(data)
      } else {
        console.error("Data is not an array:", data);
        setTransactions([]); 
      }
    };

    fetchData();
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
              <tr key={transaction.PK} className="border-b">
                <td className="py-2 px-4">{transaction.PK}</td>
                <td className="py-2 px-4">{transaction.Type}</td>
                <td className="py-2 px-4">{transaction.FundId}</td>
                <td className="py-2 px-4">${transaction.Amount.toLocaleString()}</td>
                <td className="py-2 px-4">{transaction.Timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistorialDeTransaccionesPage;


