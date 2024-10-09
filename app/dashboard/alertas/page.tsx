"use client"
import React, { useEffect, useState } from 'react';

const AlertSettings: React.FC = () => {
  const [alertType, setAlertType] = useState<'email' | 'sms' | null>(null);
  const [isChanging, setIsChanging] = useState(false); // Estado para mostrar el modo de cambio
  const [newAlertType, setNewAlertType] = useState<'email' | 'sms' | null>(null); // Estado para el nuevo tipo de alerta

  useEffect(() => {
    // Cargar la preferencia guardada desde localStorage
    const savedAlertType = localStorage.getItem('alertType');
    if (savedAlertType) {
      setAlertType(savedAlertType as 'email' | 'sms');
    }
  }, []);

  const handleAlertChange = (type: 'email' | 'sms') => {
    setNewAlertType(type); // Cambia el nuevo tipo de alerta
  };

  const handleConfirmChange = () => {
    if (newAlertType) {
      setAlertType(newAlertType); // Actualiza el tipo de alerta actual
      localStorage.setItem('alertType', newAlertType); // Guarda en localStorage
      setIsChanging(false); // Cierra el modo de cambio
    }
  };

  const handleChangeClick = () => {
    setIsChanging(true); // Habilitar el modo de cambio
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Configuración de Alertas</h2>

      {!isChanging ? (
        <div className="flex flex-col space-y-4">
          <p>
            Tipo de alerta actual: <strong>{alertType ? alertType.charAt(0).toUpperCase() + alertType.slice(1) : 'Ninguna'}</strong>
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleChangeClick}
          >
            Cambiar
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <button
              className={`p-2 rounded ${newAlertType === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleAlertChange('email')}
            >
              Alerta por Email
            </button>
            <button
              className={`p-2 rounded ${newAlertType === 'sms' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleAlertChange('sms')}
            >
              Alerta por SMS
            </button>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setIsChanging(false)} // Cerrar el modo de cambio
            >
              Cancelar
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleConfirmChange} // Confirmar el nuevo tipo de alerta
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertSettings;


