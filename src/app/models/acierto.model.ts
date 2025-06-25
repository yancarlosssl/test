export interface Acierto {
  partida_id: number;
  user_id: number;
  aciertos: number;
  tiempo?: number; // Opcional, si se quiere registrar el tiempo
}
