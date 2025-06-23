export interface Partida {
  juego_id:     string;
  fecha:         string;
  jugador1_id:  string;  // FK a usuario.id
  jugador2_id:  string;  // FK a usuario.i
}