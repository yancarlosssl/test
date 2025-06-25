export interface Partida {
  id?:         string;  // ID único de la partida
  juego_id:     string;
  fecha:         string;
  jugador1_id:  string;  // FK a usuario.id
  jugador2_id:  string;  // FK a usuario.i
}