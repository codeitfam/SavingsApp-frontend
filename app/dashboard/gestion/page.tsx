"use client";
import { Fund } from "@/app/lib/definitions";
import React, { useEffect, useState } from "react";
import "../../ui/global.css";
import {
  cancelSubscription,
  getClients,
  getFunds,
  getSubscriptions,
  sendSubscription,
} from "@/app/lib/data";

export default function Page() {
  const [subscribedFunds, setSubscribedFunds] = useState<any[]>([]);
  const [availableBalance, setAvailableBalance] = useState<number>(500.0);
  const [funds, setFunds] = useState<Fund[]>([]);
  const [userId] = useState<string>("1");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFunds();
      const getBalance = await getClients();
      const getSubs = await getSubscriptions(userId);
      const client = getBalance.find(
        (client: { PK: string }) => client.PK === "1"
      );
      const balance = client ? client.Balance : null;
      setAvailableBalance(balance);
      setFunds(data);
      setSubscribedFunds(getSubs.subscriptions);
    };

    fetchData();
  }, [subscribedFunds, availableBalance]);

  const handleSubscribe = async (fund: Fund) => {
    try {
      if (availableBalance < fund.MinimumInvestment) {
        alert(`No tiene suficiente dinero para suscribirse a ${fund.PK}`);
        return
      } else {
        const getSubs = await getSubscriptions(userId);
        await sendSubscription(fund.PK, userId, fund.MinimumInvestment);
        setSubscribedFunds(getSubs.subscriptions);
        setAvailableBalance(availableBalance);
      }
    } catch (error) {
      alert(`Error subscribing to fund: ${error}`);
      throw new Error("Failed to subscribe fund.");
    }
  };

  const handleCancel = async (fundId: string) => {
    try {
      const canceledFund = subscribedFunds.find((f) => f.fundId === fundId);
      if (canceledFund) {
        await cancelSubscription(fundId, userId);
        const getSubs = await getSubscriptions(userId);
        setSubscribedFunds(getSubs.subscriptions);
        setAvailableBalance(availableBalance);
      }
    } catch (error) {
      alert(`Error canceling subscription: ${error}`);
      throw new Error("Failed to cancel fund.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Gestión de Fondos
      </h1>

      {/* Displaying Available Balance */}
      <div className="mb-8 p-4 bg-blue-100 text-blue-800 text-lg font-semibold rounded-lg shadow-inner">
        <p>
          Saldo Disponible:{" "}
          <span className="font-bold">
            ${availableBalance.toLocaleString()}
          </span>
        </p>
      </div>

      {/* Available Funds Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Fondos Disponibles
        </h2>
        <ul className="space-y-4">
          {funds.map((fund: Fund) => (
            <li
              key={fund.PK}
              className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-gray-700 font-medium">
                {fund.Name} -{" "}
                <span className="font-bold text-green-600">
                  ${fund.MinimumInvestment.toLocaleString()}
                </span>
              </span>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                onClick={() => handleSubscribe(fund)}
              >
                Suscribirse
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Subscribed Funds Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Fondos Suscritos
        </h2>
        <ul className="space-y-4">
          {subscribedFunds.map((fund: any) => (
            <li
              key={fund.PK}
              className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-gray-700 font-medium">
                {fund.fundId} -{" "}
                <span className="font-bold text-yellow-600">
                  ${fund.amount.toLocaleString()}
                </span>
              </span>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => handleCancel(fund.fundId)}
              >
                Cancelar Suscripción
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
