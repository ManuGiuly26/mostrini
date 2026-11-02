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
  // le forme catturate (la specie per la forma base, "specie:1" e "specie:2" per l'evoluta e la finale):
  // nel catalogo e in lotta hanno la sfera
  catalogo: string[]
  // le specie sconfitte o catturate in una qualunque forma: servono, con la medaglia, ad aprire i portali
  sconfitti?: string[]
  // le forme incontrate o sconfitte, catturate o no
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
  // le evoluzioni appena avvenute, da mostrare una alla volta con l'animazione (da e a sono gli stadi)
  evoluzioni?: { sp: string; da: number; a: number }[]
  // le schermate di festa da mostrare: tutte le medaglie vinte, il catalogo completo
  feste?: ('medaglie' | 'catalogo')[]
  // dentro la palestra (entrando dalla G): la posizione nel salone; fuori x e y restano davanti alla G
  inPalestra?: { x: number; y: number } | null
  // le partite delle versioni precedenti: sfere e cure erano numeri, con mega sfere e super cure a parte
  megaSfere?: number
  cureForti?: number
  // la casella di salvataggio (0, 1 o 2) di questa partita
  slot?: number
  // nel menu: si sta scegliendo quale partita cancellare, e quale aspetta la conferma
  cancella?: boolean
  daCancellare?: number | null
  // il catalogo aperto con L: la pagina del mondo mostrata e la forma scelta
  catalogoVista?: { mondo: number; sel: number } | null
  // il galleggiante in acqua dopo una pescata andata a vuoto: resta lì finché non ti muovi
  pesca?: { x: number; y: number } | null
  // in lotta, i colpi dell'ultimo turno da animare, in ordine: chi attacca e con che mossa
  // ('botta' è la Botta, uguale per tutti; altrimenti il tipo della mossa)
  colpi?: { chi: 'io' | 'nemico'; mossa: Tipo | 'botta' }[]
}

// Le partite salvate, una per casella, e l'ultima giocata.
export type Salvataggi = { partite: (Stato | null)[]; attiva: number }

declare module 'claude-code' {
  interface PluginState {
    // Lo stato che il gioco manda al pannello, per disegnarlo in pixel art nell'app desktop.
    mostrini: { vista: Stato | null }
  }
}
