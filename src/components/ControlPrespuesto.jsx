import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPrespuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0,
    );

    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porcentaje gastado
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setDisponible(totalDisponible);
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const handleResetApp = () => {
    const resultado = confirm("¿Deseas reiniciar el presupuesto y gastos?");
    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            pathColor:
              porcentaje > 100
                ? "#DC2626"
                : porcentaje > 50
                  ? "orange"
                  : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor:
              porcentaje > 100
                ? "#DC2626"
                : porcentaje > 50
                  ? "orange"
                  : "#3B82F6",
          })}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          Presupuesto: <span>{formatearCantidad(presupuesto)}</span>
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          Disponible: <span>{formatearCantidad(disponible)}</span>
        </p>
        <p>
          Gastado: <span>{formatearCantidad(gastado)}</span>
        </p>
      </div>
    </div>
  );
};

export default ControlPrespuesto;
