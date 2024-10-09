"use client"
import { Fund, Transaction } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react';

const availableFunds: Fund[] = [
    { id: '1', name: 'Fondo A', price: 100000 },
    { id: '2', name: 'Fondo B', price: 150000 },
    { id: '3', name: 'Fondo C', price: 200000 },
  ];
export default function Page() {
  const [subscribedFunds, setSubscribedFunds] = useState<Fund[]>([]);
  const [availableBalance, setAvailableBalance] = useState<number>(500000);

  useEffect(() => {
    // Cargar los fondos suscritos desde localStorage al montar el componente
    const savedFunds = localStorage.getItem('subscribedFunds');
    if (savedFunds) {
      setSubscribedFunds(JSON.parse(savedFunds));
    }
  }, []);

  const handleSubscribe = (fund: Fund) => {
    // Verificar si hay suficiente saldo
    if (availableBalance >= fund.price) {
      const updatedFunds = [...subscribedFunds, fund];
      setSubscribedFunds(updatedFunds);
      setAvailableBalance(availableBalance - fund.price);
      updateLocalStorage(updatedFunds);
      logTransaction(fund, 'suscripción');
    } else {
      alert('Saldo insuficiente para suscribirse a este fondo.');
    }
  };

  const handleCancel = (fundId: string) => {
    // Filtrar solo el fondo específico que se desea cancelar
    const updatedFunds = subscribedFunds.filter((f) => f.id !== fundId);
    const canceledFund = subscribedFunds.find((f) => f.id === fundId);

    if (canceledFund) {
      setSubscribedFunds(updatedFunds);
      setAvailableBalance(availableBalance + canceledFund.price); // Devolver el precio al saldo
      updateLocalStorage(updatedFunds);
      logTransaction(canceledFund, 'cancelación');
    }
  };

  const updateLocalStorage = (funds: Fund[]) => {
    // Solo actualizar los fondos suscritos en localStorage
    localStorage.setItem('subscribedFunds', JSON.stringify(funds));
  };

  const logTransaction = (fund: Fund, type: 'suscripción' | 'cancelación') => {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`, // Generar un ID único basado en la fecha actual
      type,
      fund,
      amount: type === 'suscripción' ? fund.price : -fund.price,
      date: new Date().toLocaleString(),
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Gestión de Fondos</h1>
      <p className="mb-4">Saldo disponible: ${availableBalance.toLocaleString()}</p>
      <h2 className="text-xl font-semibold mb-2">Fondos Disponibles</h2>
      <ul className="mb-6">
        {availableFunds.map((fund) => (
          <li key={fund.id} className="flex justify-between items-center mb-2 p-2 border rounded bg-white shadow">
            <span>{fund.name} - ${fund.price.toLocaleString()}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => handleSubscribe(fund)}
            >
              Suscribirse
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Fondos Suscritos</h2>
      <ul>
        {subscribedFunds.map((fund) => (
          <li key={fund.id} className="flex justify-between items-center mb-2 p-2 border rounded bg-white shadow">
            <span>{fund.name} - ${fund.price.toLocaleString()}</span>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => handleCancel(fund.id)} // Pasar solo el ID del fondo
            >
              Cancelar Suscripción
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}



