export type Tipo = 'fuoco' | 'acqua' | 'erba' | 'elettro' | 'normale' | 'ghiaccio' | 'roccia' | 'terra' | 'veleno' | 'spettro'
// evo: 1 la prima evoluzione (dal livello 15), 2 la forma finale (dal livello 35).
// Le partite salvate prima della forma finale hanno true al posto di 1.
export type Mostrino = { sp: string; lvl: number; xp: number; hp: number; evo?: number | boolean }
export type Modo = 'menu' | 'inizio' | 'mappa' | 'lotta'
export type Stato = {
  modo: Modo
  // 0 la Prateria, 1 le Vette Gelate, 2 il Deserto Rovente, 3 la Palude Nebbiosa, 4 le Rovine Spettrali
  mondo: number
  x: number
  y: number
  squadra: Mostrino[]
  // i Mostrini catturati con la squadra già piena
  box: Mostrino[]
  // le specie catturate: nel catalogo e in lotta hanno la sfera
  catalogo: string[]
  // le specie incontrate o sconfitte, catturate o no
  visti?: string[]
  // le sfere e le cure nello zaino, una casella per tipo: 0 la Sfera e la Cura, 1 la Mega sfera
  // e la Super cura, e così via (ogni mondo ne aggiunge una al negozio)
  sfere: number[]
  cure: number[]
  // le monete vinte in lotta: al Centro cure si spendono in sfere e cure
  monete: number
  log: string[]
  nemico: Mostrino | null
  scelta: number
  // la sfera appena lanciata non ha preso il Mostrino: il disegno la mostra a terra, del tipo lanciato
  lancio?: boolean
  lanciata?: number
  // lo zaino aperto: in lotta per scegliere quale sfera lanciare o quale cura usare, sulla mappa per le cure
  zaino?: 'sfere' | 'cure' | null
  // lo scambio col box aperto con B: entra è il Mostrino del box già scelto (indice), pagina la decina mostrata
  scambio?: { entra: number | null; pagina: number; rilascia?: boolean } | null
  // in lotta: si sta scegliendo con quale Mostrino della squadra dare il cambio
  cambio?: boolean
  // il negozio del Centro cure aperto con M: prima si sceglie tra sfere e cure
  negozio?: false | 'scelta' | 'sfere' | 'cure'
  // la sfida di un allenatore: squadra sono i Mostrini che deve ancora mandare in campo;
  // palestra dice se è un allievo o il capopalestra della palestra del mondo
  allenatore?: { nome: string; squadra: Mostrino[]; palestra?: 'allievo' | 'capo' } | null
  // le lotte vinte nella palestra di ogni mondo: battuti tutti gli allievi e il capopalestra, arriva la medaglia
  palestre?: number[]
  // le partite delle versioni precedenti: sfere e cure erano numeri, con mega sfere e super cure a parte
  megaSfere?: number
  cureForti?: number
  // la casella di salvataggio (0, 1 o 2) di questa partita
  slot?: number
  // nel menu: si sta scegliendo quale partita cancellare, e quale aspetta la conferma
  cancella?: boolean
  daCancellare?: number | null
  // il catalogo aperto con L: la pagina del mondo mostrata e il Mostrino scelto (0-8)
  catalogoVista?: { mondo: number; sel: number } | null
}

// Le partite salvate, una per casella, e l'ultima giocata.
export type Salvataggi = { partite: (Stato | null)[]; attiva: number }

declare module 'claude-code' {
  interface PluginState {
    // Lo stato che il gioco manda al pannello, per disegnarlo in pixel art nell'app desktop.
    mostrini: { vista: Stato | null }
  }
}
