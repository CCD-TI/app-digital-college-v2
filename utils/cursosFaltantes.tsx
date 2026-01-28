export function proporcional(porcentaje: number, total: number): number {
  let avance = Math.round((porcentaje * total) / 100);
  return total - avance;
}
