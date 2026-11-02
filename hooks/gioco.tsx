import type { ClientModule, ClientKeyEvent } from 'claude-code'
import type { Tipo, Mostrino, Stato } from '../types'

export type { Tipo, Mostrino, Modo, Stato } from '../types'

// ---------- Dati di gioco ----------

// mondo: 0 la Prateria, 1 le Vette Gelate, 2 il Deserto Rovente, 3 la Palude Nebbiosa, 4 le Rovine Spettrali.
// Per aprire il portale di un mondo servono la medaglia della sua palestra e tutti i suoi Mostrini sconfitti o catturati.
// evo: i nomi della forma evoluta e di quella finale.
// rarita: senza è un Mostrino comune; ogni mondo ha un raro, un epico e un leggendario.
// I Mostrini d'acqua non stanno nell'erba alta: si trovano solo pescando.
export type Specie = {
  nome: string
  evo: [string, string]
  tipo: Tipo
  hp: number
  atk: number
  mondo: number
  arte: [string, string]
  rarita?: Exclude<Rarita, 'comune'>
}

export type Rarita = 'comune' | 'raro' | 'epico' | 'leggendario'

export const SPECIE: Record<string, Specie> = {
  braciotto: { nome: 'Braciotto', evo: ['Bracione', 'Pirodrago'], tipo: 'fuoco', hp: 19, atk: 7, mondo: 0, arte: [' ,^^, ', '(o.o)~'] },
  fumarello: { nome: 'Fumarello', evo: ['Fumarone', 'Ciminiero'], tipo: 'fuoco', hp: 22, atk: 6, mondo: 0, arte: ['  )) ', '(-_-)'] },
  goccetto: { nome: 'Goccetto', evo: ['Goccione', 'Diluvione'], tipo: 'acqua', hp: 21, atk: 6, mondo: 0, arte: ['  ^  ', '(o_o)'] },
  ondina: { nome: 'Ondina', evo: ['Maroso', 'Maremagno'], tipo: 'acqua', hp: 18, atk: 7, mondo: 0, arte: [' ~~~ ', '<°_°>'] },
  germoglio: { nome: 'Germoglio', evo: ['Fogliardo', 'Arborone'], tipo: 'erba', hp: 22, atk: 6, mondo: 0, arte: [' \\|/ ', '(^.^)'] },
  muschietto: { nome: 'Muschietto', evo: ['Muschione', 'Muschiosauro'], tipo: 'erba', hp: 25, atk: 5, mondo: 0, arte: [' .:. ', '{u_u}'] },
  zampetto: { nome: 'Zampetto', evo: ['Zampardo', 'Zampaleone'], tipo: 'normale', hp: 20, atk: 6, mondo: 0, arte: [' /\\_/\\', '( •ᴗ•)'] },
  piumino: { nome: 'Piumino', evo: ['Piumastro', 'Aquilastro'], tipo: 'normale', hp: 17, atk: 7, mondo: 0, arte: ['  __ ', '<(v)>'] },
  scintillo: { nome: 'Scintillo', evo: ['Saettone', 'Fulminardo'], tipo: 'elettro', hp: 18, atk: 8, mondo: 0, arte: [' /\\/ ', '[*_*]'], rarita: 'raro' },
  trifoglio: { nome: 'Trifoglio', evo: ['Quadrifoglio', 'Fortunardo'], tipo: 'erba', hp: 23, atk: 9, mondo: 0, arte: [' 8 8 ', '(^o^)'], rarita: 'epico' },
  carpadoro: { nome: 'Carpadoro', evo: ['Carpareale', 'Dragocarpa'], tipo: 'acqua', hp: 26, atk: 10, mondo: 0, arte: [' ><> ', '(°o°)'], rarita: 'leggendario' },
  gelino: { nome: 'Gelino', evo: ['Gelone', 'Glaciardo'], tipo: 'ghiaccio', hp: 20, atk: 7, mondo: 1, arte: [' * * ', '(o~o)'] },
  nevischio: { nome: 'Nevischio', evo: ['Bufera', 'Tormenta'], tipo: 'ghiaccio', hp: 23, atk: 6, mondo: 1, arte: [' .*. ', '(-.-)'] },
  sassolo: { nome: 'Sassolo', evo: ['Sassone', 'Granitone'], tipo: 'roccia', hp: 26, atk: 6, mondo: 1, arte: ['  __ ', '[o_o]'] },
  macigno: { nome: 'Macigno', evo: ['Montagnone', 'Colossasso'], tipo: 'roccia', hp: 30, atk: 5, mondo: 1, arte: [' /--\\', '[=_=]'] },
  lavotto: { nome: 'Lavotto', evo: ['Magmotto', 'Eruttone'], tipo: 'fuoco', hp: 21, atk: 8, mondo: 1, arte: [' ^^^ ', '(>_<)'] },
  brinella: { nome: 'Brinella', evo: ['Galaverna', 'Borealia'], tipo: 'acqua', hp: 22, atk: 7, mondo: 1, arte: [' ~*~ ', '(o.o)'] },
  licheno: { nome: 'Licheno', evo: ['Tundrone', 'Taigone'], tipo: 'erba', hp: 24, atk: 6, mondo: 1, arte: [' ,., ', '{o_o}'] },
  yetino: { nome: 'Yetino', evo: ['Yetone', 'Yetirex'], tipo: 'normale', hp: 27, atk: 6, mondo: 1, arte: [' MMM ', '(o_O)'] },
  tuonello: { nome: 'Tuonello', evo: ['Tuonardo', 'Uraganone'], tipo: 'elettro', hp: 22, atk: 9, mondo: 1, arte: [' >>> ', '[@_@]'], rarita: 'raro' },
  cristallino: { nome: 'Cristallino', evo: ['Cristallone', 'Diamantico'], tipo: 'ghiaccio', hp: 25, atk: 10, mondo: 1, arte: [' /\\ ', '<o.o>'], rarita: 'epico' },
  aurorino: { nome: 'Aurorino', evo: ['Aurorale', 'Boreadrago'], tipo: 'elettro', hp: 28, atk: 11, mondo: 1, arte: [' ~*~*', '(*o*)'], rarita: 'leggendario' },
  sabbiotto: { nome: 'Sabbiotto', evo: ['Sabbione', 'Ghiblone'], tipo: 'terra', hp: 24, atk: 8, mondo: 2, arte: ['  ∴  ', '(°.°)'] },
  dunetto: { nome: 'Dunetto', evo: ['Dunastro', 'Sirocco'], tipo: 'terra', hp: 27, atk: 7, mondo: 2, arte: [' ~-~ ', '(-.-)'] },
  cactello: { nome: 'Cactello', evo: ['Cactone', 'Saguarone'], tipo: 'erba', hp: 25, atk: 8, mondo: 2, arte: [' _|_ ', '|(^_^)|'] },
  pungiglio: { nome: 'Pungiglio', evo: ['Scorpione', 'Scorpiorex'], tipo: 'veleno', hp: 22, atk: 9, mondo: 2, arte: ['  __/', '(>.<)'] },
  solletto: { nome: 'Solletto', evo: ['Solleone', 'Solarca'], tipo: 'fuoco', hp: 23, atk: 9, mondo: 2, arte: [' \\ | / ', '-(^o^)-'] },
  cammellino: { nome: 'Cammellino', evo: ['Dromedone', 'Carovaniere'], tipo: 'normale', hp: 30, atk: 7, mondo: 2, arte: [' n n ', '(u.u)'] },
  oasina: { nome: 'Oasina', evo: ['Oasirena', 'Miraggia'], tipo: 'acqua', hp: 24, atk: 8, mondo: 2, arte: [' \\Y/ ', '(o~o)'] },
  pietrolo: { nome: 'Pietrolo', evo: ['Pietrone', 'Monolito'], tipo: 'roccia', hp: 29, atk: 7, mondo: 2, arte: ['  /\\ ', '[o.o]'] },
  mummietto: { nome: 'Mummietto', evo: ['Faraone', 'Sfingeo'], tipo: 'spettro', hp: 24, atk: 10, mondo: 2, arte: [' #=# ', '(*_*)'], rarita: 'raro' },
  scarabello: { nome: 'Scarabello', evo: ['Scarabone', 'Scarabeoro'], tipo: 'terra', hp: 30, atk: 10, mondo: 2, arte: [' (|) ', '[o_o]'], rarita: 'epico' },
  fenicino: { nome: 'Fenicino', evo: ['Fenicione', 'Fenice'], tipo: 'fuoco', hp: 30, atk: 12, mondo: 2, arte: [' \\^/ ', '<(^v^)>'], rarita: 'leggendario' },
  melmino: { nome: 'Melmino', evo: ['Melmone', 'Melmastro'], tipo: 'veleno', hp: 28, atk: 8, mondo: 3, arte: ['  o  ', '(~_~)'] },
  fanghetto: { nome: 'Fanghetto', evo: ['Fangone', 'Pantanone'], tipo: 'terra', hp: 30, atk: 8, mondo: 3, arte: [' ~.~ ', '(ò_ó)'] },
  rospetto: { nome: 'Rospetto', evo: ['Rospone', 'Rosporex'], tipo: 'acqua', hp: 27, atk: 9, mondo: 3, arte: [' @ @ ', '(___)'] },
  tossilla: { nome: 'Tossilla', evo: ['Tossicona', 'Tossiregina'], tipo: 'veleno', hp: 25, atk: 10, mondo: 3, arte: [' .-o-. ', ' (^_^) '] },
  ninfeo: { nome: 'Ninfeo', evo: ['Lotone', 'Lotoregale'], tipo: 'erba', hp: 29, atk: 8, mondo: 3, arte: ['  *  ', '~(^‿^)~'] },
  zanzarello: { nome: 'Zanzarello', evo: ['Zanzarone', 'Zanzarex'], tipo: 'normale', hp: 24, atk: 10, mondo: 3, arte: [' \\ / ', '-(o>o)-'] },
  lucciolo: { nome: 'Lucciolo', evo: ['Luccicone', 'Lanternone'], tipo: 'elettro', hp: 25, atk: 10, mondo: 3, arte: [' * * ', '(°o°)'] },
  nebbietta: { nome: 'Nebbietta', evo: ['Foschiona', 'Caligine'], tipo: 'spettro', hp: 26, atk: 9, mondo: 3, arte: [' ~ ~ ', '(-o-)'] },
  draghetto: { nome: 'Draghetto', evo: ['Paludrago', 'Idragone'], tipo: 'veleno', hp: 30, atk: 11, mondo: 3, arte: [' /\\/\\ ', '<(ò.ó)>'], rarita: 'raro' },
  anguillo: { nome: 'Anguillo', evo: ['Murenone', 'Leviatano'], tipo: 'acqua', hp: 30, atk: 11, mondo: 3, arte: [' ~~~~', '(o_o)~'], rarita: 'epico' },
  basiliscolo: { nome: 'Basiliscolo', evo: ['Basilisco', 'Basiliscorex'], tipo: 'veleno', hp: 32, atk: 13, mondo: 3, arte: [' /^^\\ ', '<(ò_ó)>'], rarita: 'leggendario' },
  fantasmino: { nome: 'Fantasmino', evo: ['Fantasmone', 'Spettrarca'], tipo: 'spettro', hp: 28, atk: 10, mondo: 4, arte: [' .-. ', '(o o)'] },
  lumicino: { nome: 'Lumicino', evo: ['Fuocofatuo', 'Lumarca'], tipo: 'fuoco', hp: 27, atk: 11, mondo: 4, arte: ['  )  ', '(°w°)'] },
  ossicino: { nome: 'Ossicino', evo: ['Scheletrone', 'Ossidrago'], tipo: 'terra', hp: 31, atk: 9, mondo: 4, arte: [' o=o ', '(x.x)'] },
  pipistrillo: { nome: 'Pipistrillo', evo: ['Vampirone', 'Draculone'], tipo: 'veleno', hp: 27, atk: 11, mondo: 4, arte: ['/\\ /\\', '(o^o)'] },
  gargolino: { nome: 'Gargolino', evo: ['Gargolone', 'Gargantuo'], tipo: 'roccia', hp: 34, atk: 9, mondo: 4, arte: [' ^ ^ ', '[ò_ó]'] },
  ombretta: { nome: 'Ombretta', evo: ['Tenebra', 'Notturna'], tipo: 'spettro', hp: 26, atk: 12, mondo: 4, arte: [' ▒▒▒ ', '(•_•)'] },
  corvetto: { nome: 'Corvetto', evo: ['Corvaccio', 'Corvomante'], tipo: 'normale', hp: 28, atk: 11, mondo: 4, arte: ['  ,  ', '(o>o)'] },
  brividino: { nome: 'Brividino', evo: ['Brividone', 'Assiderato'], tipo: 'ghiaccio', hp: 29, atk: 10, mondo: 4, arte: [' *^* ', '(>.<)'] },
  eclissino: { nome: 'Eclissino', evo: ['Eclissone', 'Eclissarca'], tipo: 'spettro', hp: 32, atk: 12, mondo: 4, arte: [' C . ', '(*.*)'], rarita: 'raro' },
  stillino: { nome: 'Stillino', evo: ['Stillone', 'Stalattone'], tipo: 'acqua', hp: 30, atk: 10, mondo: 4, arte: ['  .  ', '(o.o)'] },
  golemino: { nome: 'Golemino', evo: ['Golemone', 'Titanico'], tipo: 'roccia', hp: 36, atk: 12, mondo: 4, arte: [' [=] ', '[O_O]'], rarita: 'epico' },
  chimerino: { nome: 'Chimerino', evo: ['Chimerone', 'Chimera'], tipo: 'fuoco', hp: 34, atk: 14, mondo: 4, arte: [' ^v^ ', '<(°_°)>'], rarita: 'leggendario' },
}

// Quanto spesso esce ogni rarità, nell'erba alta e quando si pesca (il resto sono comuni).
// Se il mondo non ha un Mostrino di quella rarità lì (il leggendario della Prateria si pesca soltanto),
// esce un comune.
const PROB_RARITA = {
  erba: { leggendario: 0.015, epico: 0.04, raro: 0.08 },
  pesca: { leggendario: 0.04, epico: 0.08, raro: 0.1 },
}
// I Mostrini più rari sono qualche livello più su, e più difficili da catturare.
const LIVELLI_RARITA: Record<Rarita, number> = { comune: 0, raro: 1, epico: 2, leggendario: 3 }
export const CATTURA_RARITA: Record<Rarita, number> = { comune: 1, raro: 0.8, epico: 0.6, leggendario: 0.4 }

export const rarita = (sp: string): Rarita => SPECIE[sp]?.rarita ?? 'comune'
export const comune = (sp: string) => rarita(sp) === 'comune'
// Dove si trova: i Mostrini d'acqua si pescano, gli altri vivono nell'erba alta.
export const doveSiTrova = (sp: string) => `${SPECIE[sp]!.tipo === 'acqua' ? 'Si pesca' : 'Vive'} ${MONDI[SPECIE[sp]!.mondo]!.nel}`

export const INIZIALI = ['braciotto', 'goccetto', 'germoglio']

const MOSSA: Record<Tipo, string> = {
  fuoco: 'Fiammata',
  acqua: 'Spruzzo',
  erba: 'Frustata',
  elettro: 'Scossa',
  normale: 'Rotolone',
  ghiaccio: 'Gelo',
  roccia: 'Frana',
  terra: 'Polverone',
  veleno: 'Tossina',
  spettro: 'Spavento',
}

const COLORE_TIPO: Record<Tipo, string> = {
  fuoco: '#ff8a4c',
  acqua: '#4cb4ff',
  erba: '#6fd36f',
  elettro: '#ffd84c',
  normale: '#d6c7b0',
  ghiaccio: '#9fe6ff',
  roccia: '#b89a72',
  terra: '#d9a85c',
  veleno: '#c46cd9',
  spettro: '#9c8cf0',
}

// Gli elementi sono disposti in cerchio, e ognuno batte quello subito dopo e quello tre posti più avanti:
// così ogni tipo è forte contro due tipi e debole contro due, e allo stesso modo prende più danni da due
// tipi e meno da altri due. Nessun tipo vale più degli altri.
export const ANELLO: Tipo[] = ['acqua', 'fuoco', 'erba', 'roccia', 'ghiaccio', 'terra', 'veleno', 'spettro', 'elettro', 'normale']
// L'attacco del tipo forte fa il 10% in più, quello del tipo debole il 5% in meno.
export const VANTAGGIO = 1.1
export const SVANTAGGIO = 0.95

export function efficacia(att: Tipo, dif: Tipo): number {
  const passi = (ANELLO.indexOf(dif) - ANELLO.indexOf(att) + ANELLO.length) % ANELLO.length
  if (passi === 1 || passi === 3) return VANTAGGIO
  if (passi === ANELLO.length - 1 || passi === ANELLO.length - 3) return SVANTAGGIO

  return 1
}

// Contro chi è forte un tipo, e contro chi è debole.
export const fortiContro = (t: Tipo) => ANELLO.filter(d => efficacia(t, d) > 1)
export const deboliContro = (t: Tipo) => ANELLO.filter(d => efficacia(t, d) < 1)

// Le bio del catalogo, una per specie.
export const BIO: Record<string, string> = {
  braciotto: 'Ha una fiammella sulla testa che si gonfia quando è contento.',
  fumarello: 'Sbuffa nuvolette di fumo quando sonnecchia al sole.',
  goccetto: 'Una goccia curiosa che rimbalza da una pozzanghera all\'altra.',
  ondina: 'Cavalca le piccole onde dei laghetti della Prateria.',
  germoglio: 'Il germoglio sulla testa cresce un po\' ogni volta che prende il sole.',
  muschietto: 'Dorme così tanto che gli cresce il muschio addosso.',
  zampetto: 'Corre nell\'erba alta a zampe leggere e non si fa mai sentire.',
  piumino: 'Ha una piuma sola, ma ne va fierissimo.',
  scintillo: 'Raro e scattante: quando si emoziona lascia scintille nell\'aria.',
  gelino: 'Le sue antenne di ghiaccio tintinnano col vento delle vette.',
  nevischio: 'Si confonde con la neve fresca e sbadiglia fiocchi.',
  sassolo: 'Rotola giù dai pendii per divertimento.',
  macigno: 'Pesante e paziente: può restare fermo per giorni.',
  lavotto: 'Porta il calore della lava anche in mezzo alla neve.',
  brinella: 'Lascia una scia di brina dovunque nuoti.',
  licheno: 'Cresce sulle rocce più fredde e non teme il gelo.',
  yetino: 'Un batuffolo di pelo bianco che adora le valanghe.',
  tuonello: 'Raro: il suo grido rimbomba tra le vette come un tuono.',
  sabbiotto: 'Si nasconde sotto la sabbia lasciando fuori solo gli occhi.',
  dunetto: 'Si sposta col vento insieme alle dune.',
  cactello: 'Fiorisce una volta all\'anno, e allora diventa gentilissimo.',
  pungiglio: 'Agita la coda velenosa per spaventare, ma è un tenerone.',
  solletto: 'Si ricarica al sole di mezzogiorno e scotta al tatto.',
  cammellino: 'Fa scorta d\'acqua nelle gobbe per attraversare il deserto.',
  oasina: 'Dove si ferma spuntano palme e acqua fresca.',
  pietrolo: 'Le sue punte di roccia indicano sempre la strada per l\'oasi.',
  mummietto: 'Raro: si dice che custodisca i segreti delle piramidi.',
  melmino: 'È fatto di melma lilla e gocciola dappertutto.',
  fanghetto: 'Adora i bagni di fango e ne esce sempre più forte.',
  rospetto: 'Gracida di notte e salta da una ninfea all\'altra.',
  tossilla: 'Il suo cappello a pois è bello da vedere, ma meglio non toccarlo.',
  ninfeo: 'Galleggia sulle acque ferme con un fiore rosa in testa.',
  zanzarello: 'Ronza intorno a chi attraversa la palude.',
  lucciolo: 'Di notte illumina la palude con la pancia luminosa.',
  nebbietta: 'Appare e scompare nella nebbia del mattino.',
  draghetto: 'Raro: un piccolo drago che sputa bolle velenose.',
  fantasmino: 'Si diverte a fare "bu!" a chi passa, poi scappa.',
  lumicino: 'Una fiammella blu che danza tra le rovine.',
  ossicino: 'Rosicchia ossa antiche e ne porta una in testa.',
  pipistrillo: 'Dorme a testa in giù sotto gli archi delle rovine.',
  gargolino: 'Di giorno sembra una statua, di notte fa la guardia.',
  ombretta: 'Vive nelle ombre e ha occhi rosa che brillano al buio.',
  corvetto: 'Colleziona gli oggetti luccicanti che trova tra le rovine.',
  brividino: 'Fa venire i brividi a chiunque gli passi vicino.',
  eclissino: 'Raro: compare solo quando la luna si nasconde.',
  trifoglio: 'Epico: chi trova le sue quattro foglie ha fortuna per un anno intero.',
  carpadoro: 'Leggendario: un pesce d\'oro che abbocca solo ai pescatori più pazienti.',
  cristallino: 'Epico: il suo corpo di cristallo spezza la luce in mille arcobaleni.',
  aurorino: 'Leggendario: danza nel cielo delle notti polari e accende l\'aurora.',
  scarabello: 'Epico: rotola palline di sabbia d\'oro e le nasconde nelle piramidi.',
  fenicino: 'Leggendario: quando si stanca rinasce dalle sue stesse ceneri.',
  anguillo: 'Epico: lungo e scivoloso, sparisce nell\'acqua torbida al primo rumore.',
  basiliscolo: 'Leggendario: il re dei serpenti della palude, con una corona di squame.',
  stillino: 'Una goccia che cola dagli archi delle rovine e si raccoglie nei pozzi.',
  golemino: 'Epico: un guardiano di pietra antica che si sveglia ogni cent\'anni.',
  chimerino: 'Leggendario: testa di leone, ali di drago e fiato di fuoco.',
}

// Ogni casella occupa due caratteri a schermo.
// # albero  , erba alta  ~ acqua  . sentiero  C centro cure  G palestra
// P portale verso il mondo dopo (si apre con la medaglia della palestra)  R portale verso il mondo prima
// lvlMin e lvlMax: la fascia di livelli dei Mostrini di quel mondo.
// forti e deboli: il bioma potenzia del 5% le mosse dei tipi forti e indebolisce del 5% quelle dei tipi deboli.
// palestra: il capopalestra, il tipo dei suoi Mostrini e la medaglia che dà.
export type Mondo = {
  nome: string
  nel: string
  del: string
  mappa: string[]
  lvlMin: number
  lvlMax: number
  forti: Tipo[]
  deboli: Tipo[]
  palestra: { capo: string; tipo: Tipo; medaglia: string }
}

export const MONDI: Mondo[] = [
  {
    nome: 'Prateria',
    nel: 'nella Prateria',
    del: 'della Prateria',
    lvlMin: 2,
    lvlMax: 7,
    forti: ['erba', 'normale'],
    deboli: ['ghiaccio', 'spettro'],
    palestra: { capo: 'Capopalestra Flora', tipo: 'erba', medaglia: 'Medaglia Foglia' },
    mappa: [
      '####################',
      '#....,,,,,,.G..~~~~#',
      '#.C..,,,,,,.....~~~#',
      '#....,,,,,,,,.....,#',
      '#..........,,,,..,,#',
      '#,,,,..##.....,,,,,#',
      '#,,,,..##..~~..,,,,#',
      '#,,,,,.....~~..,,,,#',
      '#,,,,,,,,......,,,P#',
      '####################',
    ],
  },
  {
    nome: 'Vette Gelate',
    nel: 'sulle Vette Gelate',
    del: 'delle Vette Gelate',
    lvlMin: 8,
    lvlMax: 14,
    forti: ['ghiaccio', 'roccia'],
    deboli: ['fuoco', 'erba'],
    palestra: { capo: 'Capopalestra Brina', tipo: 'ghiaccio', medaglia: 'Medaglia Cristallo' },
    mappa: [
      '####################',
      '#G..,,,,,..##,,,,,P#',
      '#.C.,,,,,..##,,,,,,#',
      '#...,,,,,......,,,,#',
      '#.....~~~~...,,,,,,#',
      '#,,,..~~~~..,,,..,,#',
      '#,,,,......,,,,..,,#',
      '#,,,,,,..##..,,,,,,#',
      '#R,,,,,..##.....,,,#',
      '####################',
    ],
  },
  {
    nome: 'Deserto Rovente',
    nel: 'nel Deserto Rovente',
    del: 'del Deserto Rovente',
    lvlMin: 15,
    lvlMax: 21,
    forti: ['fuoco', 'terra'],
    deboli: ['acqua', 'ghiaccio'],
    palestra: { capo: 'Capopalestra Ambra', tipo: 'terra', medaglia: 'Medaglia Duna' },
    mappa: [
      '####################',
      '#R..,,,,,....,,,,,G#',
      '#.C.,,,,,..#.,,,,,.#',
      '#...,,,,,....,,,,,.#',
      '#.......~~.........#',
      '#,,,,...~~..,,,,,,,#',
      '#,,,,,......,,,,#,,#',
      '#,,#,,,,..,,,,,,,,,#',
      '#,,,,,,,..,,,,,,,,P#',
      '####################',
    ],
  },
  {
    nome: 'Palude Nebbiosa',
    nel: 'nella Palude Nebbiosa',
    del: 'della Palude Nebbiosa',
    lvlMin: 22,
    lvlMax: 28,
    forti: ['veleno', 'acqua'],
    deboli: ['fuoco', 'roccia'],
    palestra: { capo: 'Capopalestra Ortica', tipo: 'veleno', medaglia: 'Medaglia Miasma' },
    mappa: [
      '####################',
      '#G..,,,~~~,,,,..,,R#',
      '#.C.,,,~~~,,,,..,,.#',
      '#...,,,,,,,,~~.....#',
      '#~~..,,,,,..~~,,,,,#',
      '#~~..,,#,,......,,,#',
      '#,,,,,,#,,,~~~,,,,,#',
      '#,,,,......~~~,,,,,#',
      '#P,,,,,,,......,,,,#',
      '####################',
    ],
  },
  {
    nome: 'Rovine Spettrali',
    nel: 'tra le Rovine Spettrali',
    del: 'delle Rovine Spettrali',
    lvlMin: 29,
    lvlMax: 36,
    forti: ['spettro', 'roccia'],
    deboli: ['normale', 'erba'],
    palestra: { capo: 'Capopalestra Corvino', tipo: 'spettro', medaglia: 'Medaglia Eclisse' },
    mappa: [
      '####################',
      '#G..,,,,#,,,,,,,,,R#',
      '#.C.,,,,#,,,,#,,,,.#',
      '#...,,,,...,,#,,,,.#',
      '#.....##.....#.....#',
      '#,,,,,##,,,,...,,,,#',
      '#,,,,,,,,,~~~,,#,,,#',
      '#,,#,,,,,,~~~,,#,,,#',
      '#,,#,,,,,,,,,,,,,,,#',
      '####################',
    ],
  },
]
export const MAPPA = MONDI[0]!.mappa
export const CENTRO = { x: 2, y: 2 }

// La versione mostrata nel menu: la stessa di version in .claude-plugin/plugin.json.
export const VERSIONE = '0.9.1'

// Le sfere e le cure: ogni mondo ne aggiunge una al negozio, più forte di quelle prima.
// cattura: quanto moltiplica la probabilità di catturare; ps: i PS che ridà (Infinity: tutti).
export const SFERE = [
  { nome: 'Sfera', plurale: 'Sfere', cattura: 1, prezzo: 10 },
  { nome: 'Mega sfera', plurale: 'Mega sfere', cattura: 1.5, prezzo: 25 },
  { nome: 'Ultra sfera', plurale: 'Ultra sfere', cattura: 2, prezzo: 45 },
  { nome: 'Iper sfera', plurale: 'Iper sfere', cattura: 2.6, prezzo: 70 },
  { nome: 'Sfera stellare', plurale: 'Sfere stellari', cattura: 3.5, prezzo: 100 },
]
export const CURE = [
  { nome: 'Cura', plurale: 'Cure', ps: 20, prezzo: 15 },
  { nome: 'Super cura', plurale: 'Super cure', ps: 50, prezzo: 40 },
  { nome: 'Iper cura', plurale: 'Iper cure', ps: 100, prezzo: 80 },
  { nome: 'Mega cura', plurale: 'Mega cure', ps: 180, prezzo: 130 },
  { nome: 'Cura totale', plurale: 'Cure totali', ps: Infinity, prezzo: 200 },
]
// Quante se ne possono tenere di ogni tipo.
export const SFERE_MAX = 20
export const CURE_MAX = 10
// Più si va avanti, più è difficile catturare: la probabilità si moltiplica per questo valore in ogni mondo.
export const CATTURA_MONDO = [1, 0.85, 0.7, 0.58, 0.48]
export const SQUADRA_MAX = 3
export const PARTITE = 3

// Al livello 15 un Mostrino si evolve e al 35 arriva alla forma finale: ogni volta nome nuovo,
// PS e attacco più alti (+20% la prima evoluzione, +45% la forma finale).
export const LIVELLI_EVO = [15, 35]
const EVO_BONUS = [1, 1.2, 1.45]

// Lo stadio di un Mostrino: 0 base, 1 evoluto, 2 forma finale (true nelle partite vecchie vale 1).
export const stadio = (m: Mostrino) => Number(m.evo ?? 0)
// Lo stadio a cui arriva un Mostrino di quel livello.
export const stadioPer = (lvl: number) => LIVELLI_EVO.filter(l => lvl >= l).length

export const maxHp = (m: Mostrino) => Math.round((SPECIE[m.sp]!.hp + m.lvl * 3) * EVO_BONUS[stadio(m)]!)
const atk = (m: Mostrino) => Math.round((SPECIE[m.sp]!.atk + m.lvl * 2) * EVO_BONUS[stadio(m)]!)
// Ogni specie ha tre forme, e nel catalogo ognuna ha la sua voce: la chiave è la specie per la forma
// base, "specie:1" per l'evoluta e "specie:2" per la finale.
export const FORME = 3
export const forma = (sp: string, st: number) => (st > 0 ? `${sp}:${st}` : sp)
export const formaDi = (m: Mostrino) => forma(m.sp, stadio(m))
export const nomeForma = (sp: string, st: number) => (st > 0 ? SPECIE[sp]!.evo[st - 1]! : SPECIE[sp]!.nome)
export const nome = (m: Mostrino) => nomeForma(m.sp, stadio(m))

export const specieDel = (mondo: number) => Object.keys(SPECIE).filter(k => SPECIE[k].mondo === mondo)

// Le chiavi di tutte le forme delle specie date, in ordine di catalogo.
const formeDi = (specie: string[]) => specie.flatMap(sp => Array.from({ length: FORME }, (_, st) => forma(sp, st)))

// Il catalogo di un mondo conta le forme catturate di quel mondo e dei mondi prima: 27 nella Prateria, 54 nelle Vette e così via.
export function catalogoDel(s: Stato): { presi: number; tot: number } {
  const forme = formeDi(Object.keys(SPECIE).filter(k => SPECIE[k]!.mondo <= s.mondo))

  return { presi: forme.filter(k => s.catalogo.includes(k)).length, tot: forme.length }
}

// La palestra del mondo n (contando da 1) ha n+2 allievi e poi il capopalestra.
export const allievi = (mondo: number) => mondo + 3
export const vinteIn = (s: Stato, mondo: number) => s.palestre?.[mondo] ?? 0
export const medaglia = (s: Stato, mondo: number) => vinteIn(s, mondo) > allievi(mondo)

// La specie di una forma del catalogo: "specie:1" è l'evoluzione di "specie".
const specieDi = (chiave: string) => chiave.split(':')[0]!

// Quanti Mostrini di quel mondo non hai ancora sconfitto né catturato (in una qualunque delle loro forme).
export const mancantiIn = (s: Stato, mondo: number) => specieDel(mondo).filter(sp => !(s.sconfitti ?? []).includes(sp)).length

// Il portale P di un mondo si apre con la medaglia della sua palestra e con tutti i Mostrini del mondo
// sconfitti o catturati; l'ultimo mondo non ne ha.
export function portaleAperto(s: Stato, mondo = s.mondo): boolean {
  return mondo + 1 < MONDI.length && medaglia(s, mondo) && mancantiIn(s, mondo) === 0
}

// Cosa manca per aprire il portale del mondo dove sei.
export function perIlPortale(s: Stato): string {
  const servono: string[] = []
  if (!medaglia(s, s.mondo)) servono.push(`la ${MONDI[s.mondo]!.palestra.medaglia} (palestra G)`)
  const mancano = mancantiIn(s, s.mondo)
  if (mancano > 0) servono.push(`${mancano} Mostrini di questo mondo da sconfiggere o catturare`)

  return `Il portale è chiuso: ti mancano ${servono.join(' e ')}.`
}

// +5% o -5% a seconda del tipo della mossa e del bioma del mondo.
export function bioma(mondo: number, tipo: Tipo): number {
  const m = MONDI[mondo]
  if (m?.forti.includes(tipo)) return 1.05
  if (m?.deboli.includes(tipo)) return 0.95

  return 1
}

export const affinita = (mondo: number) =>
  `${MONDI[mondo]!.forti.join(' e ')} +5%, ${MONDI[mondo]!.deboli.join(' e ')} -5%`

function nuovo(sp: string, lvl: number, evo = 0): Mostrino {
  const m: Mostrino = evo > 0 ? { sp, lvl, xp: 0, hp: 0, evo } : { sp, lvl, xp: 0, hp: 0 }
  m.hp = maxHp(m)

  return m
}

// I Mostrini di un mondo hanno i livelli della sua fascia; gli allenatori stanno nella metà alta.
export function livelloNel(mondo: number, rnd: () => number, allenatore = false): number {
  const { lvlMin, lvlMax } = MONDI[mondo]!
  const da = allenatore ? Math.ceil((lvlMin + lvlMax) / 2) : lvlMin

  return da + Math.floor(rnd() * (lvlMax - da + 1))
}

export function statoIniziale(): Stato {
  return {
    modo: 'inizio',
    mondo: 0,
    x: CENTRO.x + 1,
    y: CENTRO.y,
    squadra: [],
    box: [],
    catalogo: [],
    sconfitti: [],
    visti: [],
    sfere: [5, 0, 0, 0, 0],
    cure: [2, 0, 0, 0, 0],
    palestre: MONDI.map(() => 0),
    monete: 0,
    log: ['Scegli il tuo primo Mostrino: premi 1, 2 o 3.'],
    nemico: null,
    scelta: 0,
  }
}

// Il menu principale: da qui si sceglie quale partita giocare.
export function statoMenu(): Stato {
  return { ...statoIniziale(), modo: 'menu', log: ['Scegli una partita con il suo numero.'] }
}

// Le partite salvate prima delle ultime novità: squadra oltre 3 nel box, campi nuovi ai valori iniziali,
// e l'evoluzione salvata come true diventa lo stadio 1.
// Prima delle palestre e degli zaini a caselle: sfere e cure diventano caselle (con mega sfere e super cure
// nella seconda), il catalogo tiene solo le specie che hai ancora in squadra o nel box (le altre restano
// viste), e le palestre dei mondi già lasciati alle spalle contano come vinte.
// Le forme dei Mostrini che hai in squadra e nel box entrano sempre nel catalogo come catturate.
export function normalizza(salvato: Partial<Stato>): Stato {
  const s: Stato = { ...statoIniziale(), ...salvato }
  const conStadio = (m: Mostrino): Mostrino => (m.evo === true ? { ...m, evo: 1 } : m)
  const box = [...(s.box ?? []), ...s.squadra.slice(SQUADRA_MAX)].map(conStadio)
  const squadra = s.squadra.slice(0, SQUADRA_MAX).map(conStadio)
  const mondo = MONDI[s.mondo ?? 0] ? (s.mondo ?? 0) : 0
  const caselle = (v: unknown, seconda: number | undefined, prima: number) =>
    Array.isArray(v) ? MONDI.map((_, i) => Number(v[i] ?? 0)) : [Number(v ?? prima), seconda ?? 0, 0, 0, 0]
  const vecchia = salvato.visti === undefined
  const catalogo = [...new Set([...(vecchia ? [] : s.catalogo), ...[...squadra, ...box].map(formaDi)])]

  return {
    ...s,
    modo: s.modo === 'lotta' || s.modo === 'menu' ? 'mappa' : s.modo,
    nemico: null,
    lancio: false,
    zaino: null,
    scambio: null,
    cambio: false,
    negozio: false,
    allenatore: null,
    cancella: false,
    daCancellare: null,
    catalogoVista: null,
    evoluzioni: [],
    feste: [],
    pesca: null,
    colpi: undefined,
    sfere: caselle(salvato.sfere, salvato.megaSfere, 5),
    cure: caselle(salvato.cure, salvato.cureForti, 2),
    megaSfere: undefined,
    cureForti: undefined,
    catalogo,
    visti: [...new Set([...(vecchia ? s.catalogo : (s.visti ?? [])), ...catalogo])],
    sconfitti: [...new Set([...(salvato.sconfitti ?? [...(s.visti ?? []), ...s.catalogo].map(specieDi)), ...catalogo.map(specieDi)])],
    inPalestra: null,
    palestre: MONDI.map((_, i) => (salvato.palestre ? (salvato.palestre[i] ?? 0) : i < mondo ? allievi(i) + 1 : 0)),
    squadra,
    box,
    mondo,
  }
}

function conLog(s: Stato, ...righe: string[]): Stato {
  return { ...s, log: [...s.log, ...righe].slice(-3) }
}

// Il Centro cure rimette in forma la squadra; le sfere invece si comprano al negozio.
function curaTutti(s: Stato): Stato {
  return { ...s, squadra: s.squadra.map(m => ({ ...m, hp: maxHp(m) })) }
}

// Una forma incontrata in lotta diventa vista: nel catalogo si vede a colori, ma senza la sfera.
function vedi(s: Stato, chiave: string): Stato {
  return s.visti?.includes(chiave) ? s : { ...s, visti: [...(s.visti ?? []), chiave] }
}

// I Mostrini che possiedi, anche appena evoluti: le loro forme sono catturate.
function possiedi(s: Stato, mostrini: Mostrino[]): Stato {
  const nuove = mostrini.map(formaDi).filter(k => !s.catalogo.includes(k))
  if (nuove.length === 0) return s
  const catalogo = [...new Set([...s.catalogo, ...nuove])]

  return { ...s, catalogo, visti: [...new Set([...(s.visti ?? []), ...nuove])] }
}

// Solo catturare mette una forma nel catalogo, con la sfera accanto al nome.
function registra(s: Stato, m: Mostrino): { s: Stato; righe: string[] } {
  const chiave = formaDi(m)
  const visto = vedi(s, chiave)
  if (s.catalogo.includes(chiave)) return { s: visto, righe: [] }
  const n = { ...visto, catalogo: [...s.catalogo, chiave] }
  const righe = [`Nuovo nel catalogo: ${nome(m)}!`]
  if (n.catalogo.length === Object.keys(SPECIE).length * FORME) righe.push('Hai catturato tutti i Mostrini. Il catalogo è completo!')

  return { s: n, righe }
}

// Sconfiggere o catturare un Mostrino segna la sua specie per il portale; quando il mondo è al completo
// e hai già la medaglia, il portale si apre.
function sconfiggi(s: Stato, sp: string): { s: Stato; righe: string[] } {
  if ((s.sconfitti ?? []).includes(sp)) return { s, righe: [] }
  const n = { ...s, sconfitti: [...(s.sconfitti ?? []), sp] }
  const mondo = SPECIE[sp]!.mondo
  if (mancantiIn(n, mondo) > 0) return { s: n, righe: [] }
  const righe = [`Hai sconfitto o catturato tutti i Mostrini ${MONDI[mondo]!.nel}!`]
  if (!portaleAperto(s) && portaleAperto(n)) righe.push(`Il portale (P) verso ${MONDI[s.mondo + 1]!.nome} è aperto.`)

  return { s: n, righe }
}

// ---------- Logica ----------

export function scegliIniziale(s: Stato, i: number): Stato {
  const sp = INIZIALI[i]
  if (!sp) return s

  return {
    ...s,
    modo: 'mappa',
    squadra: [nuovo(sp, 5)],
    catalogo: [sp],
    sconfitti: [sp],
    visti: [sp],
    log: [`Hai scelto ${SPECIE[sp].nome}! Cammina nell'erba alta per trovare Mostrini.`],
  }
}

// Prima si tira la rarità, poi la specie tra quelle di quella rarità.
function scegliSpecie(pool: string[], prob: Record<'leggendario' | 'epico' | 'raro', number>, rnd: () => number): string {
  const r = rnd()
  let soglia = 0
  for (const t of ['leggendario', 'epico', 'raro'] as const) {
    soglia += prob[t]
    if (r >= soglia) continue
    const tra = pool.filter(sp => rarita(sp) === t)
    if (tra.length > 0) return tra[Math.floor(rnd() * tra.length)]!
    break
  }
  const comuni = pool.filter(comune)

  return comuni[Math.floor(rnd() * comuni.length)]!
}

// Nell'erba alta tutti i Mostrini del mondo tranne quelli d'acqua; pescando solo quelli d'acqua.
export const nellErba = (mondo: number) => specieDel(mondo).filter(sp => SPECIE[sp]!.tipo !== 'acqua')
export const nellAcqua = (mondo: number) => specieDel(mondo).filter(sp => SPECIE[sp]!.tipo === 'acqua')

function incontro(s: Stato, rnd: () => number, pescato = false): Stato {
  const sp = scegliSpecie(pescato ? nellAcqua(s.mondo) : nellErba(s.mondo), PROB_RARITA[pescato ? 'pesca' : 'erba'], rnd)
  const lvl = Math.min(MONDI[s.mondo]!.lvlMax + 3, livelloNel(s.mondo, rnd) + LIVELLI_RARITA[rarita(sp)])
  // Dal livello 15 circa un selvatico su tre è già evoluto; dal 35 uno su tre è nella forma finale
  // e uno su quattro nella prima evoluzione.
  const max = stadioPer(lvl)
  const r = max > 0 ? rnd() : 1
  const nemico = nuovo(sp, lvl, r < 0.35 ? max : r < 0.6 ? max - 1 : 0)
  const quale = comune(sp) ? '' : ` ${rarita(sp)}`

  return conLog(
    vedi({ ...s, modo: 'lotta', nemico, scelta: 0, lancio: false, zaino: null, cambio: false, allenatore: null, pesca: null }, formaDi(nemico)),
    pescato
      ? `Abbocca qualcosa! Hai pescato un ${nome(nemico)} selvatico${quale} (Lv ${lvl})!`
      : `Un ${nome(nemico)} selvatico${quale} (Lv ${lvl}) ti sbarra la strada!`,
  )
}

// La casella d'acqua accanto a te (sopra, sotto, a destra o a sinistra), se c'è.
export function acquaVicina(s: Stato): { x: number; y: number } | null {
  if (s.inPalestra) return null
  for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]] as const) {
    if (casellaDi(s, s.x + dx, s.y + dy) === '~') return { x: s.x + dx, y: s.y + dy }
  }

  return null
}

// F sulla riva: lanci la lenza nell'acqua accanto. Metà delle volte abbocca un Mostrino d'acqua
// (si trovano solo così); se no il galleggiante resta in acqua finché non ti muovi.
export function pesca(s: Stato, rnd: () => number = Math.random): Stato {
  const acqua = acquaVicina(s)
  if (!acqua) return conLog(s, 'Per pescare mettiti sulla riva, accanto all\'acqua.')
  if (rnd() < 0.5) return incontro(s, rnd, true)

  return conLog({ ...s, pesca: acqua }, 'Il galleggiante dondola... non abbocca niente. Riprova con F.')
}

// L'inizio di una lotta contro un allenatore: il primo Mostrino della sua squadra scende in campo.
function controAllenatore(s: Stato, nomeAll: string, squadra: Mostrino[], palestra?: 'allievo' | 'capo'): Stato {
  const [primo, ...resto] = squadra
  const allenatore = palestra ? { nome: nomeAll, squadra: resto, palestra } : { nome: nomeAll, squadra: resto }

  return vedi({ ...s, modo: 'lotta', nemico: primo!, scelta: 0, lancio: false, zaino: null, cambio: false, allenatore }, formaDi(primo!))
}

// Gli allenatori che si incontrano per strada e sfidano con la loro squadra.
const ALLENATORI = [
  'Allenatrice Lia', 'Allenatore Teo', 'Esploratrice Gea', 'Ranger Bruno', 'Campionessa Vera', 'Montanaro Ugo',
  'Nomade Sami', 'Erborista Nora', 'Custode Elio',
]

export function sfida(s: Stato, rnd: () => number = Math.random): Stato {
  const pool = specieDel(s.mondo).filter(comune)
  const quanti = s.mondo === 0 ? 2 : 3
  // Gli allenatori fanno evolvere i loro Mostrini appena possono.
  const squadra = Array.from({ length: quanti }, () => {
    const sp = pool[Math.floor(rnd() * pool.length)]!
    const lvl = livelloNel(s.mondo, rnd, true)

    return nuovo(sp, lvl, stadioPer(lvl))
  })
  const nomeAll = ALLENATORI[Math.floor(rnd() * ALLENATORI.length)]!

  return conLog(
    controAllenatore(s, nomeAll, squadra),
    `${nomeAll} ti sfida con ${quanti} Mostrini! Manda in campo ${nome(squadra[0]!)} (Lv ${squadra[0]!.lvl}).`,
  )
}

// Gli allievi delle palestre.
const ALLIEVI = ['Allievo Dario', 'Allieva Sole', 'Allievo Nino', 'Allieva Lara', 'Allievo Pietro', 'Allieva Viola', 'Allievo Enea']

// La squadra del capopalestra: Mostrini del suo tipo un livello sopra la fascia del mondo,
// e per ultimo il Mostrino raro del mondo (mai l'epico o il leggendario), ancora più forte. Ogni due mondi ne ha uno in più.
export function squadraCapo(mondo: number): Mostrino[] {
  const m = MONDI[mondo]!
  const comuni = specieDel(mondo).filter(comune)
  const ordinati = [...comuni.filter(sp => SPECIE[sp]!.tipo === m.palestra.tipo), ...comuni.filter(sp => SPECIE[sp]!.tipo !== m.palestra.tipo)]
  const quanti = 3 + Math.floor(mondo / 2)
  const lvl = m.lvlMax + 1

  return [...ordinati.slice(0, quanti - 1).map(sp => nuovo(sp, lvl, stadioPer(lvl))), nuovo(raroDel(mondo), lvl + 2, stadioPer(lvl + 2))]
}

// Il Mostrino di una rarità di un mondo (ce n'è uno solo per rarità).
export const raroDel = (mondo: number, r: Exclude<Rarita, 'comune'> = 'raro') => specieDel(mondo).find(sp => rarita(sp) === r)!

// Entrare in palestra (G) fa partire la sfida successiva: prima gli allievi, uno alla volta, poi il capopalestra.
// Le vittorie restano anche se perdi: torni al Centro cure e riprendi dalla sfida dove eri.
export function sfidaPalestra(s: Stato, rnd: () => number = Math.random): Stato {
  const m = MONDI[s.mondo]!
  const vinte = vinteIn(s, s.mondo)
  const tot = allievi(s.mondo)
  if (vinte > tot) return conLog(s, `Palestra ${m.del}: hai già la ${m.palestra.medaglia}.`)
  if (vinte === tot) {
    const squadra = squadraCapo(s.mondo)

    return conLog(
      controAllenatore(s, m.palestra.capo, squadra, 'capo'),
      `${m.palestra.capo} ti aspetta con ${squadra.length} Mostrini! Manda in campo ${nome(squadra[0]!)} (Lv ${squadra[0]!.lvl}).`,
    )
  }
  const comuni = specieDel(s.mondo).filter(comune)
  const delTipo = comuni.filter(sp => SPECIE[sp]!.tipo === m.palestra.tipo)
  const squadra = Array.from({ length: s.mondo === 0 ? 2 : 3 }, () => {
    const lista = delTipo.length > 0 && rnd() < 0.5 ? delTipo : comuni
    const lvl = livelloNel(s.mondo, rnd, true)

    return nuovo(lista[Math.floor(rnd() * lista.length)]!, lvl, stadioPer(lvl))
  })
  const nomeAll = ALLIEVI[(vinte + s.mondo * 2) % ALLIEVI.length]!

  return conLog(
    controAllenatore(s, nomeAll, squadra, 'allievo'),
    `Palestra ${m.del}, sfida ${vinte + 1} di ${tot}: ${nomeAll} manda in campo ${nome(squadra[0]!)} (Lv ${squadra[0]!.lvl}).`,
  )
}

// ---------- La palestra dentro ----------

// Un salone lungo col tappeto: si entra dalla porta a sinistra, gli allievi aspettano in fila sul tappeto
// e il capopalestra è in fondo. Ci si muove solo sul tappeto; fermarsi davanti al prossimo allievo
// (o al capopalestra) fa partire la sfida, e chi è battuto si sposta di lato e lascia passare.
export const SALONE_ALTO = 7
export const TAPPETO = 3
export const saloneLargo = (mondo: number) => 2 * allievi(mondo) + 5
// La colonna del k-esimo sfidante: k = allievi(mondo) è il capopalestra.
export const postoSfidante = (k: number) => 3 + 2 * k

// # muro, < porta, = tappeto, o colonna, . pavimento, a allievo da battere, b allievo battuto (di lato),
// K capopalestra. Il giocatore lo aggiunge chi disegna.
export function casellaSalone(s: Stato, x: number, y: number): string {
  const tot = allievi(s.mondo)
  const vinte = vinteIn(s, s.mondo)
  if (y === 0 || y === SALONE_ALTO - 1 || x === saloneLargo(s.mondo) - 1) return '#'
  if (x === 0) return y === TAPPETO ? '<' : '#'
  for (let k = 0; k <= tot; k++) {
    if (x !== postoSfidante(k)) continue
    if (k === tot && y === TAPPETO) return 'K'
    if (k < tot && k >= vinte && y === TAPPETO) return 'a'
    if (k < tot && k < vinte && y === TAPPETO + (k % 2 ? 1 : -1)) return 'b'
  }
  if (y === TAPPETO) return '='
  if ((y === 1 || y === SALONE_ALTO - 2) && x % 2 === 0) return 'o'

  return '.'
}

// Entrare nella G: si resta davanti alla palestra sulla mappa e si comincia dalla porta del salone.
export function entraPalestra(s: Stato): Stato {
  const m = MONDI[s.mondo]!
  const vinte = vinteIn(s, s.mondo)
  const tot = allievi(s.mondo)

  return conLog(
    { ...s, inPalestra: { x: 1, y: TAPPETO }, negozio: false, zaino: null },
    `Entri nella palestra ${m.del}.`,
    vinte > tot
      ? `Hai già la ${m.palestra.medaglia}.`
      : vinte < tot
        ? `Fermati davanti agli allievi per sfidarli: ne restano ${tot - vinte}, poi ${m.palestra.capo}.`
        : `${m.palestra.capo} ti aspetta in fondo al salone.`,
  )
}

export function muoviInPalestra(s: Stato, dx: number, dy: number, rnd: () => number = Math.random): Stato {
  const p = s.inPalestra!
  if (dy !== 0) return s
  const x = p.x + dx
  if (x <= 0) return conLog({ ...s, inPalestra: null }, 'Esci dalla palestra.')
  const tot = allievi(s.mondo)
  const prossimo = Math.min(vinteIn(s, s.mondo), tot)
  // Gli allievi ancora da battere e il capopalestra stanno sul tappeto e non fanno passare.
  for (let k = prossimo; k <= tot; k++) if (x === postoSfidante(k)) return s
  const n = { ...s, inPalestra: { x, y: TAPPETO } }
  if (x !== postoSfidante(prossimo) - 1) return n
  if (medaglia(s, s.mondo)) {
    const m = MONDI[s.mondo]!

    return conLog(n, `${m.palestra.capo}: hai già la ${m.palestra.medaglia}. Torna quando vuoi!`)
  }

  return sfidaPalestra(n, rnd)
}

export function casellaDi(s: Stato, x: number, y: number): string | undefined {
  const t = MONDI[s.mondo]!.mappa[y]?.[x]
  // Il portale chiuso è un muro.
  if (t === 'P' && !portaleAperto(s)) return '#'

  return t
}

export function muovi(s: Stato, dx: number, dy: number, rnd: () => number = Math.random): Stato {
  const nx = s.x + dx
  const ny = s.y + dy
  const t = casellaDi(s, nx, ny)
  if (MONDI[s.mondo]!.mappa[ny]?.[nx] === 'P' && t === '#' && s.mondo + 1 < MONDI.length) return conLog(s, perIlPortale(s))
  if (t === undefined || t === '#' || t === '~') return s
  const n: Stato = { ...s, x: nx, y: ny }
  if (t === 'C') return conLog(curaTutti(n), 'Centro cure: squadra in forma. Premi M per il negozio.')
  if (t === 'G') return entraPalestra(s)
  if (t === 'P' || t === 'R') {
    const mondo = s.mondo + (t === 'P' ? 1 : -1)
    if (!MONDI[mondo]) return s

    return conLog(
      { ...n, mondo, x: CENTRO.x + 1, y: CENTRO.y },
      `Attraversi il portale: benvenuto ${MONDI[mondo]!.nel}!`,
      `Il bioma qui: ${affinita(mondo)}.`,
    )
  }
  // Nell'erba alta spuntano Mostrini selvatici, e a volte un allenatore; sul sentiero solo gli allenatori.
  if (t === ',' && rnd() < 0.14) return rnd() > 0.85 ? sfida(n, rnd) : incontro(n, rnd)
  if (t === '.' && rnd() < 0.02) return sfida(n, rnd)

  return n
}

function danno(a: Mostrino, d: Mostrino, potenza: number, tipo: Tipo, mondo: number, rnd: () => number) {
  const eff = efficacia(tipo, SPECIE[d.sp].tipo)
  const val = Math.max(1, Math.round(((atk(a) * potenza) / 10) * eff * bioma(mondo, tipo) * (0.85 + rnd() * 0.3)))

  return { val, eff }
}

function nota(eff: number) {
  if (eff > 1) return ' Tipo avvantaggiato: +10%!'
  if (eff < 1) return ' Tipo svantaggiato: -5%.'

  return ''
}

function turnoNemico(s: Stato, rnd: () => number): Stato {
  const nem = s.nemico!
  const io = s.squadra[0]
  const tipoMossa: Tipo = rnd() < 0.5 ? SPECIE[nem.sp].tipo : 'normale'
  const nomeMossa = tipoMossa === 'normale' ? 'Botta' : MOSSA[tipoMossa]
  const { val, eff } = danno(nem, io, tipoMossa === 'normale' ? 5 : 7, tipoMossa, s.mondo, rnd)
  const hp = Math.max(0, io.hp - val)
  const squadra = [{ ...io, hp }, ...s.squadra.slice(1)]
  const colpi = [...(s.colpi ?? []), { chi: 'nemico' as const, mossa: nomeMossa === 'Botta' ? ('botta' as const) : tipoMossa }]
  let n = conLog({ ...s, squadra, colpi }, `${nome(nem)} usa ${nomeMossa}: -${val} PS.${nota(eff)}`)
  if (hp > 0) return n
  // chi entra al posto dell'esausto non deve sembrare colpito
  n = { ...n, colpi: undefined }
  const vivo = n.squadra.findIndex(m => m.hp > 0)
  if (vivo === -1) {
    n = curaTutti({ ...n, modo: 'mappa', nemico: null, lancio: false, zaino: null, allenatore: null, inPalestra: null, x: CENTRO.x + 1, y: CENTRO.y })

    return conLog(n, `${nome(io)} è esausto. Corri al Centro cure!`)
  }
  const ordinata = [n.squadra[vivo], ...n.squadra.filter((_, i) => i !== vivo)]

  return conLog({ ...n, squadra: ordinata }, `${nome(io)} è esausto. Vai, ${nome(ordinata[0])}!`)
}

// evoluzioni: dove annunciare le evoluzioni, che vanno in fondo al registro per non perderle.
function cresce(m: Mostrino, xp: number, righe: string[], evoluzioni: string[]): Mostrino {
  let io = { ...m, xp: m.xp + xp }
  while (io.xp >= io.lvl * 8) {
    io = { ...io, xp: io.xp - io.lvl * 8, lvl: io.lvl + 1 }
    io.hp = Math.min(maxHp(io), io.hp + 4)
    righe.push(`${nome(io)} sale al livello ${io.lvl}!`)
  }

  return evolve(io, evoluzioni)
}

// Un Mostrino si evolve al livello 15 e arriva alla forma finale al 35; i PS in più arrivano già pieni.
export function evolve(m: Mostrino, righe: string[]): Mostrino {
  let io = m
  while (stadio(io) < stadioPer(io.lvl)) {
    const evoluto: Mostrino = { ...io, evo: stadio(io) + 1 }
    righe.push(
      stadio(evoluto) === 2
        ? `Incredibile! ${nome(io)} raggiunge la forma finale: ${nome(evoluto)}!`
        : `Cosa succede? ${nome(io)} si evolve in ${nome(evoluto)}!`,
    )
    io = { ...evoluto, hp: io.hp + maxHp(evoluto) - maxHp(io) }
  }

  return io
}

// Chi combatte prende tutta l'esperienza, il resto della squadra in forma la metà.
// Contro un allenatore la lotta continua finché ha Mostrini, poi arriva il premio.
function vittoria(s: Stato, rnd: () => number): Stato {
  const nem = s.nemico!
  const xp = nem.lvl * 4
  const vinte = nem.lvl * 2
  const righe = [`${nome(nem)} è sconfitto! +${xp} esperienza, +${vinte} monete.`]
  const evoluzioni: string[] = []
  const squadra = s.squadra.map((m, i) =>
    i === 0 ? cresce(m, xp, righe, evoluzioni) : m.hp > 0 ? cresce(m, Math.ceil(xp / 2), righe, evoluzioni) : m,
  )
  const monete = s.monete + vinte
  const all = s.allenatore
  // la forma sconfitta diventa vista e la sua specie è sconfitta; quelle dei tuoi Mostrini appena evoluti
  // sono catturate; le evoluzioni si mostrano poi una alla volta con l'animazione
  const nuoveEvo = squadra
    .map((m, i) => ({ sp: m.sp, da: stadio(s.squadra[i]!), a: stadio(m) }))
    .filter(e => e.a > e.da)
  const sconfitto = sconfiggi(vedi(s, formaDi(nem)), nem.sp)
  righe.push(...sconfitto.righe)
  const visto = {
    ...possiedi(sconfitto.s, squadra),
    ...(nuoveEvo.length > 0 ? { evoluzioni: [...(s.evoluzioni ?? []), ...nuoveEvo] } : {}),
  }
  if (all && all.squadra.length > 0) {
    const [prossimo, ...resto] = all.squadra
    // il prossimo Mostrino dell'allenatore entra fresco: niente colpo da animare su di lui
    const n = vedi({ ...visto, nemico: prossimo!, lancio: false, squadra, monete, allenatore: { ...all, squadra: resto }, colpi: undefined }, formaDi(prossimo!))

    return conLog(n, ...righe, ...evoluzioni, `${all.nome} manda in campo ${nome(prossimo!)} (Lv ${prossimo!.lvl}).`)
  }
  if (all) {
    // Il capopalestra paga più degli altri allenatori.
    const premio = nem.lvl * (all.palestra === 'capo' ? 25 : 10)
    righe.push(`Hai battuto ${all.nome}! Premio: +${premio} monete.`)
    const palestre = MONDI.map((_, i) => vinteIn(s, i) + (all.palestra && i === s.mondo ? 1 : 0))
    const n = { ...visto, modo: 'mappa' as const, nemico: null, lancio: false, squadra, monete: monete + premio, allenatore: null, palestre }
    const m = MONDI[s.mondo]!
    if (all.palestra === 'capo') {
      const dopo = MONDI[s.mondo + 1]
      const mancano = mancantiIn(n, s.mondo)
      righe.push(
        `Hai vinto la ${m.palestra.medaglia}! ${
          !dopo
            ? 'Sei il campione di Mostrini!'
            : mancano === 0
              ? `Il portale (P) verso ${dopo.nome} è aperto.`
              : `Per aprire il portale (P) ti mancano ancora ${mancano} Mostrini di questo mondo da sconfiggere o catturare.`
        }`,
      )
    } else if (all.palestra) {
      const fatte = palestre[s.mondo]!
      righe.push(fatte === allievi(s.mondo) ? `Allievi battuti: ${m.palestra.capo} ti aspetta in fondo al salone.` : `Palestra: ${fatte}/${allievi(s.mondo)} allievi battuti.`)
    }

    return conLog(n, ...righe, ...evoluzioni)
  }
  // A volte il Mostrino selvatico sconfitto lascia una cura.
  const trovata = (s.cure[0] ?? 0) < CURE_MAX && rnd() < 0.25
  if (trovata) righe.push('Hai trovato una cura!')
  const cure = trovata ? s.cure.map((q, i) => (i === 0 ? q + 1 : q)) : s.cure

  return conLog({ ...visto, modo: 'mappa', nemico: null, lancio: false, squadra, cure, monete }, ...righe, ...evoluzioni)
}

// 5 in lotta: scegli con il numero chi della squadra prende il posto di chi combatte. Costa il turno.
export function cambiaInLotta(s: Stato, i: number, rnd: () => number = Math.random): Stato {
  if (s.modo !== 'lotta' || !s.nemico) return s
  const nuovo = s.squadra[i]
  if (i === 0 || !nuovo) return conLog(s, `${nome(s.squadra[0]!)} sta già combattendo.`)
  if (nuovo.hp === 0) return conLog(s, `${nome(nuovo)} è esausto e non può combattere.`)
  const vecchio = s.squadra[0]!
  const squadra = [nuovo, ...s.squadra.filter((_, j) => j !== i)]

  return turnoNemico(conLog({ ...s, cambio: false, lancio: false, squadra }, `Torna, ${nome(vecchio)}! Vai, ${nome(nuovo)}!`), rnd)
}

// La probabilità di catturare: più alta se il Mostrino è stanco, più bassa nei mondi avanti,
// moltiplicata dalla sfera scelta.
export function probCattura(s: Stato, nem: Mostrino, sfera: number): number {
  const base = 0.25 + 0.6 * (1 - nem.hp / maxHp(nem))

  return Math.min(0.95, base * (CATTURA_MONDO[s.mondo] ?? 1) * CATTURA_RARITA[rarita(nem.sp)] * (SFERE[sfera]?.cattura ?? 1))
}

// Lancia la sfera scelta nello zaino.
export function lancia(s: Stato, i: number, rnd: () => number = Math.random): Stato {
  if (s.modo !== 'lotta' || !s.nemico) return s
  const nem = s.nemico
  const sf = SFERE[i]
  if (!sf) return s
  if (s.allenatore) return conLog({ ...s, zaino: null }, `Non puoi catturare i Mostrini di ${s.allenatore.nome}!`)
  if ((s.sfere[i] ?? 0) <= 0) return conLog(s, `Non hai ${sf.plurale}: comprale al negozio del Centro cure (M).`)
  const n = { ...s, lancio: false, zaino: null, sfere: s.sfere.map((q, j) => (j === i ? q - 1 : q)) }
  if (rnd() < probCattura(s, nem, i)) {
    const preso = { ...nem, hp: maxHp(nem) }
    const pieno = n.squadra.length >= SQUADRA_MAX
    const r = registra({ ...n, modo: 'mappa', nemico: null }, nem)
    const sc = sconfiggi(r.s, nem.sp)
    r.s = sc.s
    r.righe.push(...sc.righe)
    const fine = pieno ? { ...r.s, box: [...r.s.box, preso] } : { ...r.s, squadra: [...r.s.squadra, preso] }

    return conLog(
      fine,
      `Preso con la ${sf.nome}! ${nome(nem)} è tuo.${pieno ? ' Squadra piena: va nel box (B per scambiare).' : ' Entra in squadra.'}`,
      ...r.righe,
    )
  }

  return turnoNemico(conLog({ ...n, lancio: true, lanciata: i }, `${nome(nem)} è uscito dalla ${sf.nome}!`), rnd)
}

// Le caselle dello zaino che hanno almeno un oggetto: lo zaino aperto le numera da 1.
export const nelloZaino = (quante: number[]) => quante.map((q, i) => ({ i, q })).filter(x => x.q > 0)

// Apre lo zaino delle sfere o delle cure, per scegliere quale usare.
export function apriZaino(s: Stato, cosa: 'sfere' | 'cure'): Stato {
  if (cosa === 'sfere' && s.allenatore) return conLog(s, `Non puoi catturare i Mostrini di ${s.allenatore.nome}!`)
  if (nelloZaino(s[cosa]).length === 0) {
    return conLog(s, cosa === 'sfere' ? 'Non hai sfere: comprale al negozio del Centro cure (M).' : 'Non hai cure: comprale al negozio del Centro cure (M).')
  }

  return { ...s, zaino: cosa }
}

// Lotta: 1 Botta, 2 mossa del tipo, 3 sfere, 4 cure, 5 cambio, 6 fuga.
export const VOCI_LOTTA = 6

export function azione(s0: Stato, i: number, rnd: () => number = Math.random): Stato {
  if (s0.modo !== 'lotta' || !s0.nemico) return s0
  if (i === 4) {
    if (s0.squadra.filter(m => m.hp > 0).length < 2) return conLog(s0, 'Non hai altri Mostrini in forma per dare il cambio.')

    return { ...s0, cambio: true }
  }
  if (i === 2) return apriZaino(s0, 'sfere')
  if (i === 3) return apriZaino(s0, 'cure')
  const s = { ...s0, lancio: false }
  const io = s.squadra[0]
  const nem = s.nemico!
  if (i === 0 || i === 1) {
    const tipo: Tipo = i === 0 ? 'normale' : SPECIE[io.sp].tipo
    const nomeMossa = i === 0 ? 'Botta' : MOSSA[tipo]
    const { val, eff } = danno(io, nem, i === 0 ? 5 : 7, tipo, s.mondo, rnd)
    const hp = Math.max(0, nem.hp - val)
    const colpi = [{ chi: 'io' as const, mossa: i === 0 ? ('botta' as const) : tipo }]
    const n = conLog({ ...s, nemico: { ...nem, hp }, colpi }, `${nome(io)} usa ${nomeMossa}: -${val} PS.${nota(eff)}`)

    return hp === 0 ? vittoria(n, rnd) : turnoNemico(n, rnd)
  }
  if (s.allenatore) return conLog(s, `Non puoi scappare dalla sfida di ${s.allenatore.nome}!`)
  if (rnd() < 0.8) return conLog({ ...s, modo: 'mappa', nemico: null }, 'Sei scappato.')

  return turnoNemico(conLog(s, 'Fuga fallita!'), rnd)
}

// Usa la cura scelta nello zaino sul Mostrino in testa. In lotta costa il turno.
export function usaCura(s: Stato, i: number, rnd: () => number = Math.random): Stato {
  const c = CURE[i]
  if (!c) return s
  if ((s.cure[i] ?? 0) <= 0) return conLog(s, `Non hai ${c.plurale}: comprale al negozio del Centro cure (M).`)
  const io = s.squadra[0]
  if (!io) return s
  if (io.hp === 0) return conLog(s, `${nome(io)} è esausto: portalo al Centro cure.`)
  if (io.hp >= maxHp(io)) return conLog(s, `${nome(io)} è già in forma.`)
  const hp = Math.min(maxHp(io), io.hp + c.ps)
  const n = conLog(
    { ...s, cure: s.cure.map((q, j) => (j === i ? q - 1 : q)), zaino: null, lancio: false, squadra: [{ ...io, hp }, ...s.squadra.slice(1)] },
    `Usi una ${c.nome}: ${nome(io)} recupera ${hp - io.hp} PS.`,
  )

  return s.modo === 'lotta' && s.nemico ? turnoNemico(n, rnd) : n
}

export const alCentro = (s: Stato) => casellaDi(s, s.x, s.y) === 'C'

// Il negozio del Centro cure: in ogni mondo le sfere e le cure di quel mondo e dei mondi prima.
export type Articolo = { cosa: 'sfere' | 'cure'; i: number; nome: string; descr: string; prezzo: number; max: number }

export function articoli(s: Stato, cosa: 'sfere' | 'cure'): Articolo[] {
  const lista = cosa === 'sfere' ? SFERE : CURE

  return lista.slice(0, s.mondo + 1).map((a, i) => ({
    cosa,
    i,
    nome: a.nome,
    descr: 'cattura' in a ? (a.cattura === 1 ? 'per catturare' : `cattura x${a.cattura}`) : a.ps === Infinity ? 'tutti i PS' : `+${a.ps} PS`,
    prezzo: a.prezzo,
    max: cosa === 'sfere' ? SFERE_MAX : CURE_MAX,
  }))
}

export function compra(s: Stato, cosa: 'sfere' | 'cure', i: number): Stato {
  const a = articoli(s, cosa)[i]
  if (!a) return conLog(s, `Questo si vende solo ${MONDI[i]?.nel ?? 'più avanti'} e nei mondi dopo.`)
  if (!alCentro(s)) return conLog(s, 'Si compra al negozio del Centro cure.')
  const quante = s[cosa][i] ?? 0
  if (quante >= a.max) return conLog(s, `Hai già ${a.max} ${(cosa === 'sfere' ? SFERE : CURE)[i]!.plurale}, il massimo.`)
  if (s.monete < a.prezzo) return conLog(s, `${a.nome} costa ${a.prezzo} monete, ne hai ${s.monete}. Vinci qualche lotta!`)

  return conLog(
    { ...s, [cosa]: s[cosa].map((q, j) => (j === i ? q + 1 : q)), monete: s.monete - a.prezzo },
    `Hai comprato: ${a.nome} (-${a.prezzo} monete).`,
  )
}

export function ruotaSquadra(s: Stato): Stato {
  if (s.squadra.length < 2) return s
  const squadra = [...s.squadra.slice(1), s.squadra[0]]

  return conLog({ ...s, squadra }, `In testa ora c'è ${nome(squadra[0])}.`)
}

// B apre lo scambio col box: prima scegli chi entra (1-9 nel box), poi chi esce dalla squadra (1-3).
// Con la squadra non piena il Mostrino scelto entra senza che nessuno esca. R passa a "rilascia".
export const PER_PAGINA = 9

export function apriScambio(s: Stato): Stato {
  if (s.box.length === 0) return conLog(s, 'Il box è vuoto: cattura altri Mostrini con le sfere.')

  return { ...s, scambio: { entra: null, pagina: 0 } }
}

export function scambia(s: Stato, entra: number, esce: number | null): Stato {
  const nuovo = s.box[entra]
  if (!nuovo) return s
  const box = s.box.filter((_, i) => i !== entra)
  if (esce === null || s.squadra.length < SQUADRA_MAX) {
    return conLog({ ...s, scambio: null, squadra: [...s.squadra, nuovo], box }, `${nome(nuovo)} entra in squadra.`)
  }
  const vecchio = s.squadra[esce]
  if (!vecchio) return s
  const squadra = s.squadra.map((m, i) => (i === esce ? nuovo : m))

  return conLog(
    { ...s, scambio: null, squadra, box: [...box, vecchio] },
    `${nome(nuovo)} entra in squadra al posto di ${nome(vecchio)}, che va nel box.`,
  )
}

// Rilascia un Mostrino del box: torna libero e lascia il box. Resta nel catalogo.
export function rilascia(s: Stato, i: number): Stato {
  const m = s.box[i]
  if (!m) return s
  const box = s.box.filter((_, j) => j !== i)

  return conLog({ ...s, box, scambio: box.length > 0 ? s.scambio : null }, `${nome(m)} è tornato in libertà. Ciao ${nome(m)}!`)
}

function tastoScambio(s: Stato, key: string): Stato {
  const sc = s.scambio!
  if (key === 'b' || key === '0' || key === 'backspace') return { ...s, scambio: null }
  const n = Number(key)
  if (sc.entra === null) {
    const pagine = Math.ceil(s.box.length / PER_PAGINA)
    if (key === 'r') return { ...s, scambio: { ...sc, rilascia: !sc.rilascia } }
    if (key === 'down' || key === 's' || key === 'right' || key === 'd') {
      return { ...s, scambio: { ...sc, pagina: (sc.pagina + 1) % pagine } }
    }
    if (key === 'up' || key === 'w' || key === 'left' || key === 'a') {
      return { ...s, scambio: { ...sc, pagina: (sc.pagina + pagine - 1) % pagine } }
    }
    if (!Number.isInteger(n) || n < 1 || n > PER_PAGINA) return s
    const i = sc.pagina * PER_PAGINA + n - 1
    if (!s.box[i]) return s
    if (sc.rilascia) {
      const dopo = rilascia(s, i)
      const pagineDopo = Math.max(1, Math.ceil(dopo.box.length / PER_PAGINA))

      return dopo.scambio ? { ...dopo, scambio: { ...dopo.scambio, pagina: Math.min(sc.pagina, pagineDopo - 1) } } : dopo
    }
    // Squadra non piena: entra subito.
    if (s.squadra.length < SQUADRA_MAX) return scambia(s, i, null)

    return { ...s, scambio: { ...sc, entra: i } }
  }
  if (!Number.isInteger(n) || n < 1 || n > s.squadra.length) return s

  return scambia(s, sc.entra, n - 1)
}

// L apre il catalogo: tutte le 135 forme, 27 per mondo. Ogni riga è una specie con le sue tre forme
// (base, evoluta, finale), e ogni pagina mostra tre righe: tre pagine per mondo.
export function apriCatalogo(s: Stato): Stato {
  return { ...s, catalogoVista: { mondo: s.mondo, sel: 0 } }
}

export const PER_PAGINA_CATALOGO = 9
export const paginaCatalogo = (sel: number) => Math.floor(sel / PER_PAGINA_CATALOGO)

// preso: catturato, con la sfera; visto: incontrato o sconfitto, a colori ma senza sfera.
// Una forma né vista né catturata è solo un ? con ????? al posto del nome.
export type Voce = { sp: string; st: number; numero: number; preso: boolean; visto: boolean; rarita: Rarita }

export const SCONOSCIUTO = '?????'

export function vociCatalogo(s: Stato, mondo: number): Voce[] {
  const tutte = Object.keys(SPECIE)

  return specieDel(mondo).flatMap(sp =>
    Array.from({ length: FORME }, (_, st) => {
      const chiave = forma(sp, st)
      const preso = s.catalogo.includes(chiave)

      return { sp, st, numero: tutte.indexOf(sp) * FORME + st + 1, preso, visto: preso || !!s.visti?.includes(chiave), rarita: rarita(sp) }
    }),
  )
}

// Quante forme hai catturato e visto in ogni mondo.
export const contiCatalogo = (s: Stato) =>
  MONDI.map((_, mondo) => {
    const voci = vociCatalogo(s, mondo)

    return { presi: voci.filter(v => v.preso).length, visti: voci.filter(v => v.visto).length, tot: voci.length }
  })

export const numeroVoce = (v: Voce) => '#' + String(v.numero).padStart(3, '0')

// La scheda della forma scelta nel catalogo: da chi viene e in cosa si evolve se l'hai presa, dove cercarla se manca.
export function descrizione(v: Voce): string {
  const d = SPECIE[v.sp]!
  const num = numeroVoce(v)
  const chi = nomeForma(v.sp, v.st)
  if (!v.visto) return `${num} ${SCONOSCIUTO}: non l'hai ancora incontrato. ${doveSiTrova(v.sp)}.`
  // la bio e il tipo, con contro chi è forte (+10%) e contro chi è debole (-5%)
  const bio = ` ${BIO[v.sp] ?? ''} Tipo ${d.tipo}: forte contro ${fortiContro(d.tipo).join(' e ')}, debole contro ${deboliContro(d.tipo).join(' e ')}.`
  if (!v.preso) {
    return `${num} ${chi} (${d.tipo}): l'hai visto ma non ancora catturato. ${doveSiTrova(v.sp)}${v.rarita !== 'comune' ? ` ed è ${v.rarita}` : ''}.${bio}`
  }
  const linea =
    v.st === 0
      ? `si evolve in ${d.evo[0]} al Lv ${LIVELLI_EVO[0]} e in ${d.evo[1]} al Lv ${LIVELLI_EVO[1]}`
      : v.st === 1
        ? `è l'evoluzione di ${d.nome}, e al Lv ${LIVELLI_EVO[1]} diventa ${d.evo[1]}`
        : `è la forma finale di ${d.nome}`

  return `${num} ${chi} (${d.tipo})${v.rarita !== 'comune' ? `, ${v.rarita}` : ''}: ${linea}.${bio}`
}

// Frecce: sinistra e destra scorrono le forme (e passano al mondo vicino), su e giù di una riga;
// 1-5 saltano al mondo, L o 0 chiudono.
function tastoCatalogo(s: Stato, key: string): Stato {
  const cv = s.catalogoVista!
  if (key === 'l' || key === '0' || key === 'backspace' || key === 'escape') return { ...s, catalogoVista: null }
  const n = Number(key)
  if (Number.isInteger(n) && n >= 1 && n <= MONDI.length) return { ...s, catalogoVista: { mondo: n - 1, sel: 0 } }
  const per = specieDel(cv.mondo).length * FORME
  const passo = key === 'right' || key === 'd' ? 1 : key === 'left' || key === 'a' ? -1 : 0
  if (passo !== 0) {
    const sel = cv.sel + passo
    if (sel >= 0 && sel < per) return { ...s, catalogoVista: { ...cv, sel } }
    const mondo = (cv.mondo + passo + MONDI.length) % MONDI.length

    return { ...s, catalogoVista: { mondo, sel: passo > 0 ? 0 : specieDel(mondo).length * FORME - 1 } }
  }
  if (key === 'down' || key === 's') return { ...s, catalogoVista: { ...cv, sel: (cv.sel + FORME) % per } }
  if (key === 'up' || key === 'w') return { ...s, catalogoVista: { ...cv, sel: (cv.sel + per - FORME) % per } }

  return s
}

// Il negozio: prima 1 sfere o 2 cure, poi il numero compra. 0 torna indietro, M chiude.
function tastoNegozio(s: Stato, key: string): Stato {
  if (key === 'm' || key === 'escape') return { ...s, negozio: false }
  const n = Number(key)
  if (s.negozio === 'scelta') {
    if (key === '0' || key === 'backspace') return { ...s, negozio: false }
    if (key === '1') return { ...s, negozio: 'sfere' }
    if (key === '2') return { ...s, negozio: 'cure' }

    return s
  }
  if (key === '0' || key === 'backspace') return { ...s, negozio: 'scelta' }
  const cosa = s.negozio === 'cure' ? 'cure' : 'sfere'

  return Number.isInteger(n) && n >= 1 && articoli(s, cosa)[n - 1] ? compra(s, cosa, n - 1) : s
}

// Lo zaino aperto: il numero usa quella sfera o quella cura (tra quelle che hai), 0 lo chiude.
function tastoZaino(s: Stato, key: string): Stato {
  if (key === '0' || key === 'backspace' || key === 'escape') return { ...s, zaino: null }
  const cosa = s.zaino!
  const scelta = nelloZaino(s[cosa])[Number(key) - 1]
  if (!Number.isInteger(Number(key)) || !scelta) return s

  return cosa === 'sfere' ? lancia(s, scelta.i) : usaCura(s, scelta.i)
}

// Il menu principale: un numero apre la partita in quella casella (o ne inizia una nuova),
// Invio riprende l'ultima, D e poi un numero (premuto due volte, per conferma) cancella una partita.
export function tastoMenu(
  s: Stato,
  key: string,
  partite: (Stato | null)[],
  attiva: number,
): { s: Stato; cancella?: number } {
  // La conferma: lo stesso numero cancella, qualsiasi altro tasto annulla.
  if (s.daCancellare !== undefined && s.daCancellare !== null) {
    const i = s.daCancellare
    if (key === String(i + 1)) return { s: conLog({ ...s, cancella: false, daCancellare: null }, `Partita ${i + 1} cancellata.`), cancella: i }

    return { s: conLog({ ...s, cancella: false, daCancellare: null }, 'Cancellazione annullata.') }
  }
  if (key === 'd') return { s: { ...s, cancella: !s.cancella } }
  if ((key === 'return' || key === ' ' || key === 'space') && partite[attiva]) {
    return { s: { ...normalizza(partite[attiva]!), slot: attiva } }
  }
  const n = Number(key)
  if (!Number.isInteger(n) || n < 1 || n > PARTITE) return { s }
  const i = n - 1
  if (s.cancella) {
    if (!partite[i]) return { s: conLog({ ...s, cancella: false }, `La partita ${n} è già vuota.`) }

    return { s: conLog({ ...s, daCancellare: i }, `Vuoi davvero cancellare la Partita ${n}? Premi di nuovo ${n} per confermare, un altro tasto annulla.`) }
  }
  const p = partite[i]

  return { s: p ? { ...normalizza(p), slot: i } : { ...statoIniziale(), slot: i } }
}

export function riassunto(p: Stato | null): string {
  if (!p || p.squadra.length === 0) return 'vuota'
  const io = p.squadra[0]!
  const cat = catalogoDel(p)

  return `${nome(io)} Lv${io.lvl} · ${MONDI[p.mondo]?.nome ?? 'Prateria'} · catalogo ${cat.presi}/${cat.tot} · ${p.monete} monete`
}

// Frecce o WASD: il passo sulla mappa.
const PASSI: Record<string, [number, number]> = {
  up: [0, -1], w: [0, -1], down: [0, 1], s: [0, 1], left: [-1, 0], a: [-1, 0], right: [1, 0], d: [1, 0],
}

// I due traguardi del gioco: tutte le medaglie delle palestre, tutte le forme nel catalogo.
export const tutteLeMedaglie = (s: Stato) => MONDI.every((_, i) => medaglia(s, i))
export const catalogoCompleto = (s: Stato) => Object.keys(SPECIE).every(sp => Array.from({ length: FORME }, (_, st) => forma(sp, st)).every(k => s.catalogo.includes(k)))

// Quando un tasto fa raggiungere un traguardo, parte la sua schermata di festa.
export function festeggia(prima: Stato, dopo: Stato): Stato {
  const nuove = [
    ...(!tutteLeMedaglie(prima) && tutteLeMedaglie(dopo) ? (['medaglie'] as const) : []),
    ...(!catalogoCompleto(prima) && catalogoCompleto(dopo) ? (['catalogo'] as const) : []),
  ]

  return nuove.length > 0 ? { ...dopo, feste: [...(dopo.feste ?? []), ...nuove] } : dopo
}

// I colpi da animare valgono per un turno solo: un tasto che cambia qualcosa li toglie,
// e restano solo quelli del nuovo attacco.
export function tasto(s: Stato, k: ClientKeyEvent): Stato {
  const base = s.colpi ? { ...s, colpi: undefined } : s
  const dopo = tastoGioco(base, k)

  return dopo === base ? s : festeggia(s, dopo)
}

function tastoGioco(s: Stato, k: ClientKeyEvent): Stato {
  const key = k.key.toLowerCase()
  // Mentre si guarda un'evoluzione o una festa, un tasto qualsiasi passa alla prossima (o torna al gioco).
  if (s.evoluzioni && s.evoluzioni.length > 0) return { ...s, evoluzioni: s.evoluzioni.slice(1) }
  if (s.feste && s.feste.length > 0) return { ...s, feste: s.feste.slice(1) }
  if (s.modo === 'inizio') {
    const i = ['1', '2', '3'].indexOf(key)

    return i >= 0 ? scegliIniziale(s, i) : s
  }
  if (s.modo === 'mappa') {
    if (s.catalogoVista) return tastoCatalogo(s, key)
    if (s.scambio) return tastoScambio(s, key)
    const passo = PASSI[key]
    // Il negozio e lo zaino non bloccano il movimento: un passo li chiude, e tira su la lenza.
    if (passo) {
      const libero = s.negozio || s.zaino || s.pesca ? { ...s, negozio: false as const, zaino: null, pesca: null } : s

      return s.inPalestra ? muoviInPalestra(libero, passo[0], passo[1]) : muovi(libero, passo[0], passo[1])
    }
    if (s.negozio) return tastoNegozio(s, key)
    if (s.zaino) return tastoZaino(s, key)
    if (key === 'tab' || key === 'q') return ruotaSquadra(s)
    if (key === 'b') return apriScambio(s)
    if (key === 'l') return apriCatalogo(s)
    if (key === 'c') return apriZaino(s, 'cure')
    if (key === 'f') return pesca(s)
    if (key === 'm') return alCentro(s) ? { ...s, negozio: 'scelta' } : conLog(s, 'Il negozio è al Centro cure.')
    if (key === 'p') return { ...statoMenu(), slot: s.slot }

    return s
  }
  if (s.modo !== 'lotta') return s
  if (s.cambio) {
    if (key === '0' || key === '5' || key === 'backspace') return { ...s, cambio: false }
    const j = Number(key)

    return Number.isInteger(j) && j >= 1 && j <= s.squadra.length ? cambiaInLotta(s, j - 1) : s
  }
  if (s.zaino) return tastoZaino(s, key)
  const n = Number(key)
  if (Number.isInteger(n) && n >= 1 && n <= VOCI_LOTTA) return azione(s, n - 1)
  if (key === 'c') return apriZaino(s, 'cure')
  if (key === 'up' || key === 'w') return { ...s, scelta: (s.scelta + VOCI_LOTTA - 1) % VOCI_LOTTA }
  if (key === 'down' || key === 's') return { ...s, scelta: (s.scelta + 1) % VOCI_LOTTA }
  if (key === 'return' || key === ' ' || key === 'space') return azione(s, s.scelta)

  return s
}

// ---------- Disegno ----------

const COL = {
  albero: '#2f7d4f',
  erba: '#7fd36b',
  acqua: '#4ca3e0',
  sentiero: '#8a7f6a',
  centro: '#ff6b81',
  io: '#ffd84c',
  portale: '#b98cff',
  ritorno: '#4cd6c8',
  palestra: '#4c9cff',
}

const somma = (quante: number[]) => quante.reduce((a, q) => a + q, 0)

// I colori delle rarità: azzurro il raro, viola l'epico, oro il leggendario.
export const COLORE_RARITA: Record<Rarita, string> = { comune: '#c8c4e0', raro: '#4c9cff', epico: '#c46cd9', leggendario: '#ffc83c' }

// I colori delle sfere, come nella pixel art.
export const COLORE_SFERA = ['#e8483c', '#3c7ce8', '#f2c230', '#9c4cc8', '#ffd84c']
const COLORE_CURA = ['#6fd36f', '#4cc4c4', '#4c9cff', '#c46cd9', '#ffd84c']

// Le righe dello zaino aperto: numero, nome, quante ne hai e cosa fa (con la probabilità di cattura in lotta).
function righeZaino(s: Stato) {
  const cosa = s.zaino!

  return nelloZaino(s[cosa]).map(({ i, q }, k) => {
    const sfera = SFERE[i]!
    const cura = CURE[i]!
    const dettaglio =
      cosa === 'sfere'
        ? s.nemico ? `cattura ~${Math.round(probCattura(s, s.nemico, i) * 100)}%` : ''
        : cura.ps === Infinity ? 'tutti i PS' : `+${cura.ps} PS`

    return { k, i, q, nome: cosa === 'sfere' ? sfera.nome : cura.nome, dettaglio, colore: (cosa === 'sfere' ? COLORE_SFERA : COLORE_CURA)[i]! }
  })
}

function barra(m: Mostrino, larghezza = 10) {
  const r = m.hp / maxHp(m)
  const pieni = Math.round(r * larghezza)
  const colore = r > 0.5 ? '#6fd36f' : r > 0.2 ? '#ffd84c' : '#ff6b6b'

  return { pieni: '█'.repeat(pieni), vuoti: '░'.repeat(larghezza - pieni), colore }
}

// grafica: il pannello disegna mappa e lotte in pixel art (app desktop),
// qui restano solo menu, squadra e messaggi.
type Props = { partite?: (Stato | null)[]; attiva?: number; grafica?: boolean } | null

// Un solo messaggio per volta arriva al pannello, quindi stato e salvataggio viaggiano insieme.
// partita: la partita da salvare quando non è lo stato mostrato (P salva la posizione e torna al menu).
type Messaggio =
  | { type: 'vista'; stato: Stato; salva: boolean; partita?: Stato }
  | { type: 'cancella'; slot: number; stato: Stato }

let grafica = false
// Le partite salvate come le vede il gioco: si aggiornano a ogni salvataggio e cancellazione.
let partite: (Stato | null)[] = []
let attiva = 0

const Gioco: ClientModule<any, Stato> = (props: Props, surface) => {
  const { Box, Text } = surface.elements
  grafica = !!props?.grafica
  const invia = (m: Messaggio) => {
    if (m.type === 'vista' && !grafica && !m.salva) return
    surface.post(m as any)
  }
  if (surface.state === undefined) {
    partite = Array.from({ length: PARTITE }, (_, i) => props?.partite?.[i] ?? null)
    attiva = props?.attiva ?? 0
    surface.onKey(k => {
      const prima = surface.state ?? statoMenu()
      if (prima.modo === 'menu') {
        const r = tastoMenu(prima, k.key.toLowerCase(), partite, attiva)
        if (r.cancella !== undefined) {
          partite[r.cancella] = null
          surface.setState({ ...r.s })
          surface.post({ type: 'cancella', slot: r.cancella, stato: r.s } as any)

          return
        }
        if (r.s === prima) return
        surface.setState(r.s)
        invia({ type: 'vista', stato: r.s, salva: false })

        return
      }
      const dopo = tasto(prima, k)
      if (dopo === prima) return
      surface.setState(dopo)
      const salva =
        dopo.modo !== prima.modo ||
        dopo.squadra !== prima.squadra ||
        dopo.sfere !== prima.sfere ||
        dopo.cure !== prima.cure ||
        dopo.monete !== prima.monete ||
        dopo.catalogo !== prima.catalogo ||
        dopo.visti !== prima.visti ||
        dopo.palestre !== prima.palestre ||
        dopo.box !== prima.box ||
        dopo.mondo !== prima.mondo
      // P: torna al menu salvando la partita com'era, posizione sulla mappa compresa.
      if (prima.modo === 'mappa' && dopo.modo === 'menu' && prima.slot !== undefined) {
        partite[prima.slot] = prima
        attiva = prima.slot
        surface.post({ type: 'vista', stato: dopo, salva: false, partita: prima } as any)

        return
      }
      const daSalvare = salva && dopo.modo === 'mappa' && dopo.slot !== undefined
      if (daSalvare) {
        partite[dopo.slot!] = dopo
        attiva = dopo.slot!
      }
      invia({ type: 'vista', stato: dopo, salva: daSalvare })
    })
    const inizio = statoMenu()
    surface.setState(inizio)
    invia({ type: 'vista', stato: inizio, salva: false })
  }
  const s = surface.state ?? statoMenu()
  const cat = catalogoDel(s)

  const registro = (
    <Box flexDirection="column" marginTop={1}>
      {s.log.map((r, i) => (
        <Text mono key={'l' + i} dimColor={i < s.log.length - 1} wrap="wrap">
          {r}
        </Text>
      ))}
    </Box>
  )

  if (s.modo === 'menu') {
    return (
      <Box flexDirection="column">
        <Box flexDirection="row" justifyContent="space-between">
          <Text mono bold color={COL.io}>MOSTRINI · menu principale</Text>
          <Text mono dimColor>versione {VERSIONE}</Text>
        </Box>
        <Box flexDirection="column" marginTop={1}>
          {partite.map((p, i) => (
            <Text mono key={'p' + i} bold={i === attiva && !!p}>
              <Text mono bold>{i + 1}</Text> Partita {i + 1}: {riassunto(p)}
            </Text>
          ))}
        </Box>
        {registro}
        <Text mono dimColor>
          {s.daCancellare !== undefined && s.daCancellare !== null
            ? `Premi di nuovo ${s.daCancellare + 1} per cancellare la Partita ${s.daCancellare + 1}, un altro tasto annulla`
            : s.cancella
            ? 'Quale partita cancello? Premi il numero (D annulla)'
            : `Numero: gioca o inizia quella partita${partite[attiva] ? ' · Invio: continua l\'ultima' : ''} · D: cancella una partita`}
        </Text>
        <Text mono dimColor>Clicca qui sul pannello, poi usa la tastiera.</Text>
      </Box>
    )
  }

  const testa = (
    <Box flexDirection="row" justifyContent="space-between">
      <Text mono bold color={COL.io}>MOSTRINI</Text>
      <Text mono dimColor>
        {MONDI[s.mondo]!.nome} · Sfere {somma(s.sfere)} · Cure {somma(s.cure)} · Monete {s.monete} · Catalogo {cat.presi}/{cat.tot} · Medaglie {MONDI.filter((_, i) => medaglia(s, i)).length}/{MONDI.length}
      </Text>
    </Box>
  )

  if (s.modo === 'inizio') {
    return (
      <Box flexDirection="column">
        {testa}
        <Box flexDirection="column" marginTop={1}>
          {INIZIALI.map((sp, i) => {
            const d = SPECIE[sp]

            return (
              <Box key={sp} flexDirection="row" marginBottom={1}>
                {!grafica && (
                  <Box flexDirection="column" width={9}>
                    <Text mono color={COLORE_TIPO[d.tipo]}>{d.arte[0]}</Text>
                    <Text mono color={COLORE_TIPO[d.tipo]}>{d.arte[1]}</Text>
                  </Box>
                )}
                <Text mono>
                  <Text mono bold>{i + 1}</Text> {d.nome} <Text mono color={COLORE_TIPO[d.tipo]}>({d.tipo})</Text>
                </Text>
              </Box>
            )
          })}
        </Box>
        {registro}
      </Box>
    )
  }

  // L'evoluzione: nell'app desktop l'animazione la disegna la pixel art, qui il racconto e il tasto per andare avanti.
  const evo = s.evoluzioni?.[0]
  if (evo) {
    const prima = nomeForma(evo.sp, evo.da)
    const dopo = nomeForma(evo.sp, evo.a)

    return (
      <Box flexDirection="column">
        {testa}
        <Box flexDirection="column" marginTop={1}>
          <Text mono bold color={COL.io}>Cosa succede? {prima} si sta evolvendo...</Text>
          {!grafica && <Text mono color="#ffffff">  ☁ ☁ ☁  POUF!  ☁ ☁ ☁</Text>}
          <Text mono bold color={COLORE_TIPO[SPECIE[evo.sp]!.tipo]}>{prima} è diventato {dopo}!</Text>
          {evo.a === 2 && <Text mono color={COL.io}>È la sua forma finale!</Text>}
        </Box>
        <Text mono dimColor>Premi un tasto per continuare{s.evoluzioni!.length > 1 ? ` (altre evoluzioni: ${s.evoluzioni!.length - 1})` : ''}</Text>
      </Box>
    )
  }

  // Le feste: tutte le medaglie, il catalogo completo. Nell'app desktop c'è l'animazione, qui il racconto.
  const festa = !evo ? s.feste?.[0] : undefined
  if (festa) {
    return (
      <Box flexDirection="column">
        {testa}
        <Box flexDirection="column" marginTop={1}>
          {!grafica && <Text mono color={COL.io}>  ✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦</Text>}
          {festa === 'medaglie' ? (
            <Box flexDirection="column">
              <Text mono bold color={COL.io}>CAMPIONE DI MOSTRINI!</Text>
              <Text mono>Hai vinto tutte e {MONDI.length} le medaglie:</Text>
              {MONDI.map((m, i) => (
                <Text mono key={'m' + i} color={COLORE_TIPO[m.palestra.tipo]}>  ◉ {m.palestra.medaglia} · {m.palestra.capo} · {m.nome}</Text>
              ))}
            </Box>
          ) : (
            <Box flexDirection="column">
              <Text mono bold color={COL.io}>CATALOGO COMPLETO!</Text>
              <Text mono>Hai catturato tutte le {Object.keys(SPECIE).length * FORME} forme di tutti i {Object.keys(SPECIE).length} Mostrini.</Text>
              <Text mono>I leggendari dei cinque mondi: {MONDI.map((_, i) => nomeForma(raroDel(i, 'leggendario'), FORME - 1)).join(', ')}.</Text>
            </Box>
          )}
          {!grafica && <Text mono color={COL.io}>  ✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦</Text>}
        </Box>
        <Text mono dimColor>Premi un tasto per continuare</Text>
      </Box>
    )
  }

  if (s.modo === 'lotta' && s.nemico) {
    const nem = s.nemico
    const io = s.squadra[0]
    const bn = barra(nem)
    const bi = barra(io)
    const dn = SPECIE[nem.sp]
    const di = SPECIE[io.sp]
    // Accanto a ogni mossa i suoi bonus e malus: il tipo contro l'avversario (+10% o -5%)
    // e il bioma del mondo (+5% o -5%).
    const segno = (t: Tipo) => {
      const tipo = efficacia(t, dn.tipo)
      const b = bioma(s.mondo, t)
      const parti = [
        tipo > 1 ? `tipo +10%` : tipo < 1 ? `tipo -5%` : '',
        b > 1 ? 'bioma +5%' : b < 1 ? 'bioma -5%' : '',
      ].filter(Boolean)

      return parti.length > 0 ? ` (${parti.join(', ')})` : ''
    }
    const voci = [
      'Botta' + segno('normale'),
      MOSSA[di.tipo] + segno(di.tipo),
      s.allenatore ? 'Sfera (non contro un allenatore)' : `Sfera… (${somma(s.sfere)})`,
      `Cura… (${somma(s.cure)})`,
      'Cambia Mostrino',
      s.allenatore ? 'Scappa (non da una sfida)' : 'Scappa',
    ]
    // La sfera accanto al nome solo per le specie catturate, non per quelle soltanto sconfitte.
    const giaPreso = s.catalogo.includes(formaDi(nem))
    const palestra = s.allenatore?.palestra

    return (
      <Box flexDirection="column">
        {testa}
        {s.allenatore && (
          <Text mono bold color={COL.centro}>
            {palestra === 'capo' ? 'Palestra · ' : palestra ? `Palestra · sfida ${vinteIn(s, s.mondo) + 1}/${allievi(s.mondo)} · ` : 'Sfida di '}
            {s.allenatore.nome} · gli restano {s.allenatore.squadra.length + 1} Mostrini
          </Text>
        )}
        {!grafica && (
        <Box flexDirection="column">
        <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
          <Box flexDirection="column">
            <Text mono>
              {giaPreso && <Text mono color="#e8483c">◓ </Text>}<Text mono bold>{nome(nem)}</Text> Lv {nem.lvl} <Text mono color={COLORE_TIPO[dn.tipo]}>{dn.tipo}</Text>{!comune(nem.sp) && <Text mono bold color={COLORE_RARITA[rarita(nem.sp)]}> {rarita(nem.sp)}</Text>}
            </Text>
            <Text mono>
              <Text mono color={bn.colore}>{bn.pieni}</Text>
              <Text mono dimColor>{bn.vuoti}</Text> {nem.hp}/{maxHp(nem)}
            </Text>
          </Box>
          <Box flexDirection="column">
            <Text mono color={COLORE_TIPO[dn.tipo]}>{dn.arte[0]}</Text>
            <Text mono color={COLORE_TIPO[dn.tipo]}>{dn.arte[1]}</Text>
          </Box>
        </Box>
        <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
          <Box flexDirection="column">
            <Text mono color={COLORE_TIPO[di.tipo]}>{di.arte[0]}</Text>
            <Text mono color={COLORE_TIPO[di.tipo]}>{di.arte[1]}</Text>
          </Box>
          <Box flexDirection="column">
            <Text mono>
              <Text mono bold>{nome(io)}</Text> Lv {io.lvl} <Text mono color={COLORE_TIPO[di.tipo]}>{di.tipo}</Text>
            </Text>
            <Text mono>
              <Text mono color={bi.colore}>{bi.pieni}</Text>
              <Text mono dimColor>{bi.vuoti}</Text> {io.hp}/{maxHp(io)}
            </Text>
          </Box>
        </Box>
        </Box>
        )}
        {s.cambio ? (
          <Box flexDirection="column" marginTop={1}>
            <Text mono bold color={COL.io}>Chi entra in lotta? Premi il numero (0 annulla)</Text>
            {s.squadra.map((m, i) => (
              <Text mono key={'c' + i} dimColor={i === 0 || m.hp === 0}>
                <Text mono bold>{i + 1}</Text> <Text mono color={COLORE_TIPO[SPECIE[m.sp].tipo]}>{nome(m)}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
                {i === 0 ? ' (in lotta)' : m.hp === 0 ? ' (esausto)' : ''}
              </Text>
            ))}
          </Box>
        ) : s.zaino ? (
          <Box flexDirection="column" marginTop={1}>
            <Text mono bold color={COL.io}>{s.zaino === 'sfere' ? 'Quale sfera lanci?' : `Quale cura usi su ${nome(io!)} (${io!.hp}/${maxHp(io!)} PS)?`} Premi il numero (0 annulla)</Text>
            {righeZaino(s).map(r => (
              <Text mono key={'z' + r.i}>
                <Text mono bold>{r.k + 1}</Text> <Text mono color={r.colore}>●</Text> {r.nome} ×{r.q}{r.dettaglio ? ` · ${r.dettaglio}` : ''}
              </Text>
            ))}
          </Box>
        ) : (
        <Box flexDirection="column" marginTop={1}>
          {grafica && giaPreso && <Text mono dimColor>◓ {nome(nem)} è già nel tuo catalogo</Text>}
          <Text mono dimColor>Bioma {MONDI[s.mondo]!.nome}: {affinita(s.mondo)}</Text>
          {voci.map((v, i) => (
            <Text mono key={'v' + i} inverse={i === s.scelta}>
              {' '}
              {i + 1} {v}{' '}
            </Text>
          ))}
        </Box>
        )}
        {registro}
      </Box>
    )
  }

  if (s.catalogoVista) {
    const cv = s.catalogoVista
    const voci = vociCatalogo(s, cv.mondo)
    const scelta = voci[cv.sel]
    const pagina = paginaCatalogo(cv.sel)
    const pagine = Math.ceil(voci.length / PER_PAGINA_CATALOGO)
    // Nel terminale le tre righe della pagina: ogni riga è una specie, con le sue tre forme.
    const righeVoci = Array.from({ length: PER_PAGINA_CATALOGO / FORME }, (_, r) => voci.slice(pagina * PER_PAGINA_CATALOGO + r * FORME, pagina * PER_PAGINA_CATALOGO + (r + 1) * FORME)).filter(r => r.length > 0)

    return (
      <Box flexDirection="column">
        {testa}
        <Text mono bold color={COL.io}>
          Catalogo · {cv.mondo + 1}/{MONDI.length} {MONDI[cv.mondo]!.nome} {voci.filter(v => v.preso).length}/{voci.length} · pagina {pagina + 1}/{pagine} · in tutto {s.catalogo.length}/{Object.keys(SPECIE).length * FORME}
        </Text>
        {!grafica && (
          <Box flexDirection="column" marginTop={1}>
            {righeVoci.map((riga, r) => (
              <Text mono key={'k' + r}>
                {riga.map((v, i) => (
                  <Text mono key={'v' + i} inverse={pagina * PER_PAGINA_CATALOGO + r * FORME + i === cv.sel} dimColor={!v.preso}>
                    {i > 0 ? ' → ' : ' '}{v.preso ? '◓' : v.visto ? '○' : '?'} {numeroVoce(v)} {v.visto ? nomeForma(v.sp, v.st) : SCONOSCIUTO}{' '}
                  </Text>
                ))}
              </Text>
            ))}
          </Box>
        )}
        {scelta && (
          <Box marginTop={1}>
            <Text mono wrap="wrap">{descrizione(scelta)}</Text>
          </Box>
        )}
        {!grafica && (
          <Text mono dimColor>
            {contiCatalogo(s).map((c, i) => `${i + 1} ${MONDI[i]!.nome} ${c.presi}/${c.tot}`).join(' · ')}
          </Text>
        )}
        <Text mono dimColor>Frecce scegli · 1-{MONDI.length} cambia mondo · ◓ catturato · ○ visto · ? mai visto · L o 0 chiude</Text>
      </Box>
    )
  }

  // Lo zaino delle cure aperto con C, sulla mappa e in palestra.
  const zainoCure = s.zaino && (
    <Box flexDirection="column" marginTop={1}>
      <Text mono bold color={COL.io}>Quale cura usi su {nome(s.squadra[0]!)} ({s.squadra[0]!.hp}/{maxHp(s.squadra[0]!)} PS)? Premi il numero (0 annulla)</Text>
      {righeZaino(s).map(r => (
        <Text mono key={'z' + r.i}>
          <Text mono bold>{r.k + 1}</Text> <Text mono color={r.colore}>●</Text> {r.nome} ×{r.q} · {r.dettaglio}
        </Text>
      ))}
    </Box>
  )

  if (s.inPalestra) {
    const m = MONDI[s.mondo]!
    const vinte = vinteIn(s, s.mondo)
    const tot = allievi(s.mondo)
    const tinta = COLORE_TIPO[m.palestra.tipo]
    const salone = Array.from({ length: SALONE_ALTO }, (_, y) => (
      <Text mono key={'g' + y}>
        {Array.from({ length: saloneLargo(s.mondo) }, (_, x) => {
          if (x === s.inPalestra!.x && y === s.inPalestra!.y) return <Text mono key={'c' + x} bold color={COL.io}>@ </Text>
          const c = casellaSalone(s, x, y)
          if (c === '#') return <Text mono key={'c' + x} dimColor>██</Text>
          if (c === '<') return <Text mono key={'c' + x} color={COL.io}>{'<='}</Text>
          if (c === '=') return <Text mono key={'c' + x} color={COL.centro}>==</Text>
          if (c === 'o') return <Text mono key={'c' + x} dimColor>()</Text>
          if (c === 'a') return <Text mono key={'c' + x} bold color={tinta}>A </Text>
          if (c === 'b') return <Text mono key={'c' + x} dimColor>a </Text>
          if (c === 'K') return <Text mono key={'c' + x} bold color={COL.io}>K </Text>

          return <Text mono key={'c' + x} dimColor>· </Text>
        })}
      </Text>
    ))

    return (
      <Box flexDirection="column">
        {testa}
        <Text mono bold color={COL.palestra}>
          Palestra {m.del} · {vinte > tot ? `${m.palestra.medaglia} vinta` : vinte < tot ? `allievi battuti ${vinte}/${tot}, poi ${m.palestra.capo}` : `tocca a ${m.palestra.capo}`}
        </Text>
        {!grafica && <Box flexDirection="column" marginTop={1}>{salone}</Box>}
        {registro}
        {zainoCure}
        {!s.zaino && <Text mono dimColor>Frecce ← → sul tappeto · fermati davanti a un allievo per sfidarlo · la porta a sinistra esce · C cure · L catalogo</Text>}
      </Box>
    )
  }

  const righe = MONDI[s.mondo]!.mappa.map((riga, y) => {
    const celle = riga.split('').map((_, x) => {
      const t = casellaDi(s, x, y)
      if (x === s.x && y === s.y) return <Text mono key={'c' + x} bold color={COL.io}>@ </Text>
      if (t === '#') return <Text mono key={'c' + x} color={COL.albero}>^^</Text>
      if (t === ',') return <Text mono key={'c' + x} color={COL.erba}>,,</Text>
      if (t === '~' && s.pesca?.x === x && s.pesca.y === y) return <Text mono key={'c' + x} bold color="#ff6b6b">o~</Text>
      if (t === '~') return <Text mono key={'c' + x} color={COL.acqua}>~~</Text>
      if (t === 'C') return <Text mono key={'c' + x} bold color={COL.centro}>C </Text>
      if (t === 'P') return <Text mono key={'c' + x} bold color={COL.portale}>()</Text>
      if (t === 'R') return <Text mono key={'c' + x} bold color={COL.ritorno}>{'<>'}</Text>
      if (t === 'G') return <Text mono key={'c' + x} bold color={COL.palestra}>G </Text>

      return <Text mono key={'c' + x} color={COL.sentiero}>· </Text>
    })

    return <Text mono key={'r' + y}>{celle}</Text>
  })

  return (
    <Box flexDirection="column">
      {testa}
      {!grafica && (
        <Box flexDirection="column" marginTop={1}>
          {righe}
        </Box>
      )}
      <Box flexDirection="row" marginTop={1}>
        {s.squadra.map((m, i) => {
          const d = SPECIE[m.sp]

          return (
            <Text mono key={'s' + i} bold={i === 0} dimColor={m.hp === 0}>
              <Text mono color={COLORE_TIPO[d.tipo]}>{nome(m)}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
              {'  '}
            </Text>
          )
        })}
      </Box>
      {registro}
      {s.scambio ? (
        <Box flexDirection="column" marginTop={1}>
          {s.scambio.entra === null ? (
            <Box flexDirection="column">
              <Text mono bold color={s.scambio.rilascia ? COL.centro : COL.io}>
                {s.scambio.rilascia ? 'Box: chi rilasci? Premi il numero' : 'Box: chi entra in squadra? Premi il numero'}
                {s.box.length > PER_PAGINA ? ` · pagina ${s.scambio.pagina + 1}/${Math.ceil(s.box.length / PER_PAGINA)} (frecce)` : ''}
              </Text>
              {s.box.slice(s.scambio.pagina * PER_PAGINA, (s.scambio.pagina + 1) * PER_PAGINA).map((m, i) => (
                <Text mono key={'b' + i}>
                  <Text mono bold>{i + 1}</Text> <Text mono color={COLORE_TIPO[SPECIE[m.sp].tipo]}>{nome(m)}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
                </Text>
              ))}
              <Text mono dimColor>{s.scambio.rilascia ? 'R torna a scambiare' : 'R per rilasciare un Mostrino'} · B o 0 chiude il box</Text>
            </Box>
          ) : (
            <Box flexDirection="column">
              <Text mono bold color={COL.io}>
                Entra {nome(s.box[s.scambio.entra]!)}: chi esce dalla squadra? Premi il numero
              </Text>
              {s.squadra.map((m, i) => (
                <Text mono key={'q' + i}>
                  <Text mono bold>{i + 1}</Text> <Text mono color={COLORE_TIPO[SPECIE[m.sp].tipo]}>{nome(m)}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
                </Text>
              ))}
              <Text mono dimColor>B o 0 annulla lo scambio</Text>
            </Box>
          )}
        </Box>
      ) : s.negozio === 'scelta' ? (
        <Box flexDirection="column" marginTop={1}>
          <Text mono bold color={COL.centro}>Negozio del Centro cure · hai {s.monete} monete</Text>
          <Text mono><Text mono bold>1</Text> Sfere ({SFERE.slice(0, s.mondo + 1).map(a => a.nome).join(', ')})</Text>
          <Text mono><Text mono bold>2</Text> Cure ({CURE.slice(0, s.mondo + 1).map(a => a.nome).join(', ')})</Text>
          <Text mono dimColor>Premi 1 o 2 · M o 0 chiude il negozio · muoviti per uscire</Text>
        </Box>
      ) : s.negozio ? (
        <Box flexDirection="column" marginTop={1}>
          <Text mono bold color={COL.centro}>Negozio · {s.negozio === 'sfere' ? 'Sfere' : 'Cure'} · hai {s.monete} monete</Text>
          {articoli(s, s.negozio).map((a, i) => (
            <Text mono key={'a' + i}>
              <Text mono bold>{i + 1}</Text> <Text mono color={(a.cosa === 'sfere' ? COLORE_SFERA : COLORE_CURA)[i]!}>●</Text> {a.nome} ({a.descr}) · {a.prezzo} monete · ne hai {s[a.cosa][i] ?? 0}/{a.max}
            </Text>
          ))}
          <Text mono dimColor>Premi il numero per comprare · 0 torna indietro · M chiude · muoviti per uscire</Text>
        </Box>
      ) : s.zaino ? (
        zainoCure
      ) : (
        s.box.length > 0 && <Text mono dimColor>Box: {s.box.map(m => nome(m) + ' Lv' + m.lvl).join(', ')}</Text>
      )}
      {alCentro(s) && !s.scambio && !s.negozio && <Text mono color={COL.centro}>Sei al Centro cure: M apre il negozio</Text>}
      {acquaVicina(s) && !s.scambio && !s.negozio && <Text mono color={COL.acqua}>Sei sulla riva: F per pescare i Mostrini d'acqua</Text>}
      {!s.scambio && !s.negozio && !s.zaino && (
        <Text mono dimColor>
          Bioma {MONDI[s.mondo]!.nome}: {affinita(s.mondo)} · Lv {MONDI[s.mondo]!.lvlMin}-{MONDI[s.mondo]!.lvlMax} · Palestra (G){' '}
          {medaglia(s, s.mondo) ? `vinta: ${MONDI[s.mondo]!.palestra.medaglia}` : vinteIn(s, s.mondo) < allievi(s.mondo) ? `${vinteIn(s, s.mondo)}/${allievi(s.mondo)} allievi` : `tocca a ${MONDI[s.mondo]!.palestra.capo}`}
        </Text>
      )}
      {!s.scambio && !s.negozio && !s.zaino && <Text mono dimColor>Frecce/WASD muovi · Q capofila · B box · L catalogo · C cure ({somma(s.cure)}) · F pesca · P menu{portaleAperto(s) ? ' · portale aperto' : ''}</Text>}
    </Box>
  )
}

export default Gioco
