export default function calcularEstadisticas(distancia) {
  const emisionAutomovil = 0.3; // 300 gramos de CO2 por cada Km

  const velocidadPromedioBicicleta = 15; // 15 Km/h velocidad estimada de un ciclista

  const co2 = +(distancia * emisionAutomovil).toFixed(1);

  const ruido = +(distancia / velocidadPromedioBicicleta).toFixed(1);

  return { co2, ruido };
}
