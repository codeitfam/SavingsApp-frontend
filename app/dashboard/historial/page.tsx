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
        console.log(data);
      } else {
        console.error("Data is not an array:", data);
        setTransactions([]); 
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Historial de Transacciones</h1>
      {transactions.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p>No hay transacciones registradas.</p>
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">ID</th>
              <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">Tipo</th>
              <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">Fondo</th>
              <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">Monto</th>
              <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.PK} className={`border-b hover:shadow-md transition duration-200`}>
              <td className="py-2 px-6 border-b">{transaction.PK}</td>
              <td className="py-2 px-6 border-b">{transaction.Type}</td>
              <td className="py-2 px-6 border-b">{transaction.FundId}</td>
              <td className="py-2 px-6 border-b">${transaction.Amount.toLocaleString()}</td>
              <td className="py-2 px-6 border-b">{transaction.Timestamp}</td>
            </tr>
            
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistorialDeTransaccionesPage;
