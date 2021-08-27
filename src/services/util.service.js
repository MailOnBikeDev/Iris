import dayjs from "dayjs";

class Util {
  removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  capitalizar(texto) {
    const nuevoTexto = texto
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

    return nuevoTexto;
  }

  asignarHoy() {
    return dayjs(new Date()).format("YYYY-MM-DDT10:00:00");
  }

  asignarMañana() {
    const manana = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    return dayjs(manana).format("YYYY-MM-DDT10:00:00");
  }

  seisDiasAtras() {
    const seisDiasAtras = new Date(
      new Date().getTime() - 1000 * 60 * 60 * 24 * 6
    );
    return dayjs(seisDiasAtras).format("YYYY-MM-DDT10:00:00");
  }

  primerDiaMes() {
    const primerDia = new Date();
    return dayjs(
      new Date(primerDia.getFullYear(), primerDia.getMonth(), 1)
    ).format("YYYY-MM-DDT10:00:00");
  }
}

export default new Util();
