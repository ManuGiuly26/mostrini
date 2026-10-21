export type Tipo = 'fuoco' | 'acqua' | 'erba' | 'elettro' | 'normale' | 'ghiaccio' | 'roccia'
export type Mostrino = { sp: string; lvl: number; xp: number; hp: number }
export type Modo = 'menu' | 'inizio' | 'mappa' | 'lotta'
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
  scambio?: { entra: number | null; pagina: number; rilascia?: boolean } | null
  // in lotta: si sta scegliendo con quale Mostrino della squadra dare il cambio
  cambio?: boolean
  // le mega sfere, in vendita dalle Vette Gelate: catturano più facilmente
  megaSfere?: number
  // il negozio del Centro cure è aperto (M)
  negozio?: boolean
  // la sfida di un allenatore: squadra sono i Mostrini che deve ancora mandare in campo
  allenatore?: { nome: string; squadra: Mostrino[] } | null
  // la casella di salvataggio (0, 1 o 2) di questa partita
  slot?: number
  // nel menu: si sta scegliendo quale partita cancellare, e quale aspetta la conferma
  cancella?: boolean
  daCancellare?: number | null
}

// Le partite salvate, una per casella, e l'ultima giocata.
export type Salvataggi = { partite: (Stato | null)[]; attiva: number }

declare module 'claude-code' {
  interface PluginState {
    // Lo stato che il gioco manda al pannello, per disegnarlo in pixel art nell'app desktop.
    mostrini: { vista: Stato | null }
  }
}
