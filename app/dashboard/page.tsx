import React from "react";
import "../ui/global.css";

const WelcomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido al Gestor de Fondos
      </h1>
      <p className="text-lg text-center mb-6">
        Administra tus fondos de manera sencilla y eficiente. Aquí puedes
        suscribirte a fondos, gestionar tus transacciones y recibir alertas
        sobre tus movimientos.
      </p>
    </div>
  );
};

export default WelcomePage;
