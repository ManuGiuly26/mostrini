export type Tipo = 'fuoco' | 'acqua' | 'erba' | 'elettro' | 'normale' | 'ghiaccio' | 'roccia'
export type Mostrino = { sp: string; lvl: number; xp: number; hp: number }
export type Modo = 'inizio' | 'mappa' | 'lotta'
export type Stato = {
  modo: Modo
  // 0 la Prateria, 1 le Vette Gelate
  mondo: number
  x: number
  y: number
  squadra: Mostrino[]
  // i Mostrini catturati con la squadra già piena
  box: Mostrino[]
  catalogo: string[]
  sfere: number
  // le cure nell'inventario: C ne usa una sul Mostrino in testa
  cure: number
  // le super cure, in vendita dalle Vette Gelate: X ne usa una
  cureForti: number
  // le monete vinte in lotta: al Centro cure si spendono in cure
  monete: number
  log: string[]
  nemico: Mostrino | null
  scelta: number
  // la sfera appena lanciata non ha preso il Mostrino: il disegno la mostra a terra
  lancio?: boolean
  // lo scambio col box aperto con B: entra è il Mostrino del box già scelto (indice), pagina la decina mostrata
  scambio?: { entra: number | null; pagina: number } | null
}

declare module 'claude-code' {
  interface PluginState {
    // Lo stato che il gioco manda al pannello, per disegnarlo in pixel art nell'app desktop.
    mostrini: { vista: Stato | null }
  }
}
