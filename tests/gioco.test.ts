import { test, expect } from 'claude-code/testing'
import {
  statoIniziale, scegliIniziale, muovi, azione, efficacia, apriScambio, normalizza, portaleAperto, specieDel, catalogoDel, usaCura, tasto, cambiaInLotta, compra, rilascia, sfida, lancia, tastoMenu, statoMenu, CENTRO,
  MAPPA, MONDI, SPECIE, SFERE, CURE, SFERE_MAX, CURE_MAX, VERSIONE, bioma, livelloNel, evolve, nome, maxHp, stadio, vociCatalogo, descrizione,
  articoli, probCattura, allievi, vinteIn, medaglia, squadraCapo, contiCatalogo, numeroVoce, FORME,
  muoviInPalestra, casellaSalone, postoSfidante, saloneLargo, TAPPETO, ANELLO, fortiContro, deboliContro, BIO,
  festeggia, tutteLeMedaglie, catalogoCompleto, rarita, comune, nellAcqua, nellErba, pesca, acquaVicina, CATTURA_RARITA,
} from '../hooks/gioco.tsx'
import type { Stato } from '../hooks/gioco.tsx'
import { DISEGNI, svgPer, misureDi, riempie } from '../hooks/grafica.ts'

test('la mappa è rettangolare e ogni specie ha una mossa', () => {
  for (const m of MONDI) for (const riga of m.mappa) expect(riga.length).toBe(MAPPA[0]!.length)
  expect(MONDI.length).toBe(5)
  MONDI.forEach((_, i) => {
    // 9 comuni nella Prateria e 8 negli altri mondi, più un raro, un epico e un leggendario;
    // ogni mondo ha almeno un Mostrino d'acqua comune da pescare
    expect(specieDel(i).length).toBe(i === 4 ? 12 : 11)
    for (const r of ['raro', 'epico', 'leggendario'] as const) expect(specieDel(i).filter(sp => rarita(sp) === r).length).toBe(1)
    expect(nellAcqua(i).some(comune)).toBe(true)
  })
  // ogni specie ha il suo disegno in pixel art, con il cappello largo 12
  for (const sp of Object.keys(SPECIE)) expect(DISEGNI[sp]?.cappello.every(r => r.length === 12)).toBe(true)
})

// Le caselle che si raggiungono a piedi dal Centro cure.
function raggiungibili(mappa: string[]): Set<string> {
  const visti = new Set<string>()
  const coda: [number, number][] = [[CENTRO.x + 1, CENTRO.y]]
  while (coda.length > 0) {
    const [x, y] = coda.pop()!
    const t = mappa[y]?.[x]
    if (visti.has(x + ',' + y) || t === undefined || t === '#' || t === '~') continue
    visti.add(x + ',' + y)
    coda.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
  }

  return visti
}

test('ogni mondo ha il Centro cure, la palestra e i portali raggiungibili a piedi', () => {
  MONDI.forEach((m, i) => {
    expect(m.mappa[CENTRO.y]![CENTRO.x]).toBe('C')
    const vie = raggiungibili(m.mappa)
    const dove = (c: string) => m.mappa.flatMap((r, y) => [...r].map((t, x) => (t === c ? x + ',' + y : ''))).filter(Boolean)
    // P verso il mondo dopo (non nell'ultimo), R verso il mondo prima (non nella Prateria), una palestra G
    expect(dove('P').length).toBe(i < MONDI.length - 1 ? 1 : 0)
    expect(dove('R').length).toBe(i > 0 ? 1 : 0)
    expect(dove('G').length).toBe(1)
    for (const k of [...dove('P'), ...dove('R'), ...dove('G')]) expect(vie.has(k)).toBe(true)
  })
})

// Vince la lotta in corso, Mostrino dopo Mostrino.
function vinci(s: Stato): Stato {
  let n = s
  while (n.modo === 'lotta') n = azione({ ...n, nemico: { ...n.nemico!, hp: 1 } }, 0, () => 0.5)

  return n
}

// Cammina a destra sul tappeto della palestra finché non parte una lotta (o non si va più avanti).
function avanza(s: Stato): Stato {
  let n = s
  for (let i = 0; i < 40 && n.modo === 'mappa'; i++) {
    const dopo = muoviInPalestra(n, 1, 0, () => 0.5)
    if (dopo === n) break
    n = dopo
  }

  return n
}

test('in palestra si entra in un salone: n+2 allievi in fila, poi il capopalestra', () => {
  expect(allievi(0)).toBe(3)
  expect(allievi(4)).toBe(7)
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, squadra: [{ sp: 'braciotto', lvl: 60, xp: 0, hp: 999 }] }
  // la palestra della Prateria è in (12,1): ci si entra da (12,2) e si resta davanti alla porta
  expect(MONDI[0]!.mappa[1]![12]).toBe('G')
  s = muovi({ ...s, x: 12, y: 2 }, 0, -1, () => 0.5)
  expect(s.inPalestra).toEqual({ x: 1, y: TAPPETO })
  expect([s.x, s.y]).toEqual([12, 2])
  expect(s.modo).toBe('mappa')
  // il salone: porta a sinistra, allievi sul tappeto, capopalestra in fondo
  expect(casellaSalone(s, 0, TAPPETO)).toBe('<')
  expect(casellaSalone(s, postoSfidante(0), TAPPETO)).toBe('a')
  expect(casellaSalone(s, postoSfidante(allievi(0)), TAPPETO)).toBe('K')
  expect(saloneLargo(0)).toBe(postoSfidante(allievi(0)) + 2)
  // in su e in giù non ci si muove: si cammina solo sul tappeto
  expect(muoviInPalestra(s, 0, -1)).toBe(s)
  for (let k = 0; k < allievi(0); k++) {
    s = avanza(s)
    // la sfida parte fermandosi davanti all'allievo
    expect(s.modo).toBe('lotta')
    expect(s.inPalestra!.x).toBe(postoSfidante(k) - 1)
    expect(s.allenatore?.palestra).toBe('allievo')
    // niente fuga e niente cattura in palestra
    expect(azione(s, 5, () => 0).modo).toBe('lotta')
    expect(lancia(s, 0, () => 0).modo).toBe('lotta')
    s = vinci(s)
    expect(vinteIn(s, 0)).toBe(k + 1)
    // l'allievo battuto si sposta di lato e lascia passare
    expect(casellaSalone(s, postoSfidante(k), TAPPETO)).toBe('=')
  }
  expect(portaleAperto(s)).toBe(false)
  s = avanza(s)
  expect(s.allenatore?.palestra).toBe('capo')
  expect(s.allenatore?.nome).toBe('Capopalestra Flora')
  expect(s.allenatore!.squadra.length + 1).toBe(squadraCapo(0).length)
  const monete = s.monete
  s = vinci(s)
  expect(medaglia(s, 0)).toBe(true)
  // la medaglia da sola non basta: servono anche tutti i Mostrini della Prateria, sconfitti o catturati
  expect(portaleAperto(s)).toBe(false)
  expect(portaleAperto({ ...s, sconfitti: specieDel(0) })).toBe(true)
  expect(s.monete).toBeGreaterThan(monete)
  expect(s.log.join(' ')).toContain('Medaglia Foglia')
  // il capopalestra resta in fondo e non si passa; dalla porta si esce
  expect(avanza(s).modo).toBe('mappa')
  let fuori = s
  for (let i = 0; i < 40 && fuori.inPalestra; i++) fuori = muoviInPalestra(fuori, -1, 0)
  expect(fuori.inPalestra).toBeNull()
  expect([fuori.x, fuori.y]).toEqual([12, 2])
  // rientrando, la medaglia ce l'hai già
  const dentro = muovi(fuori, 0, -1)
  expect(dentro.log.join(' ')).toContain('Hai già la Medaglia Foglia')
  // il capopalestra chiude con il raro del mondo, più forte degli altri
  for (let m = 0; m < MONDI.length; m++) {
    const squadra = squadraCapo(m)
    expect(rarita(squadra.at(-1)!.sp)).toBe('raro')
    expect(squadra.slice(0, -1).every(x => comune(x.sp))).toBe(true)
    expect(squadra.every(x => x.lvl > MONDI[m]!.lvlMax)).toBe(true)
  }
})

test('il portale si apre con la medaglia della palestra e tutti i Mostrini del mondo sconfitti o catturati', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, x: 17, y: 8, sconfitti: specieDel(0) }
  // solo i Mostrini: chiuso, e il messaggio dice che manca la medaglia
  const chiuso = muovi(s, 1, 0)
  expect(chiuso.x).toBe(17)
  expect(chiuso.log.at(-1)).toContain('Medaglia Foglia')
  // solo la medaglia: chiuso, e il messaggio dice quanti Mostrini mancano
  const senza = muovi({ ...s, sconfitti: ['braciotto'], palestre: [allievi(0) + 1, 0, 0, 0, 0] }, 1, 0)
  expect(senza.x).toBe(17)
  expect(senza.log.at(-1)).toContain('10 Mostrini')
  s = { ...s, palestre: [allievi(0) + 1, 0, 0, 0, 0] }
  s = muovi(s, 1, 0, () => 0.99)
  expect(s.mondo).toBe(1)
  // sulle Vette il catalogo conta le forme di due mondi: 2 x 33
  expect(catalogoDel(s)).toEqual({ presi: 1, tot: 66 })
  // il P delle Vette Gelate è in (18,1): chiuso finché non vinci la loro palestra
  expect(muovi({ ...s, x: 17, y: 1 }, 1, 0, () => 0.99).mondo).toBe(1)
  const deserto = muovi({ ...s, x: 17, y: 1, palestre: [4, allievi(1) + 1, 0, 0, 0], sconfitti: [...specieDel(0), ...specieDel(1)] }, 1, 0, () => 0.99)
  expect(deserto.mondo).toBe(2)
  // l'R del Deserto in (1,1) riporta alle Vette
  expect(muovi({ ...deserto, x: 2, y: 1 }, -1, 0, () => 0.99).mondo).toBe(1)
  // le Rovine Spettrali sono l'ultimo mondo: niente portale avanti
  expect(portaleAperto({ ...s, mondo: 4, palestre: MONDI.map((_, i) => allievi(i) + 1) })).toBe(false)
})

test('i livelli dei Mostrini seguono il mondo', () => {
  MONDI.forEach((m, i) => {
    expect(livelloNel(i, () => 0)).toBe(m.lvlMin)
    expect(livelloNel(i, () => 0.999)).toBe(m.lvlMax)
    // gli allenatori stanno nella metà alta della fascia
    expect(livelloNel(i, () => 0, true)).toBeGreaterThan(m.lvlMin)
    if (i > 0) expect(m.lvlMin).toBe(MONDI[i - 1]!.lvlMax + 1)
  })
  // una squadra forte non alza i livelli della Prateria
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, squadra: [{ ...s.squadra[0]!, lvl: 40, hp: 200 }] }
  s = muovi(muovi(s, 1, 0, () => 0.5), 1, 0, () => 0.01)
  expect(s.modo).toBe('lotta')
  expect(s.nemico!.lvl).toBeLessThanOrEqual(MONDI[0]!.lvlMax)
})

test('il bioma potenzia o indebolisce le mosse del 5%', () => {
  expect(bioma(2, 'fuoco')).toBe(1.05)
  expect(bioma(2, 'acqua')).toBe(0.95)
  expect(bioma(0, 'fuoco')).toBe(1)
  const base = {
    ...scegliIniziale(statoIniziale(), 0),
    squadra: [{ sp: 'braciotto', lvl: 50, xp: 0, hp: 500 }],
    modo: 'lotta' as const,
    nemico: { sp: 'zampetto', lvl: 50, xp: 0, hp: 5000 },
  }
  const colpo = (mondo: number) => 5000 - azione({ ...base, mondo }, 1, () => 0.5).nemico!.hp
  // Fiammata: più forte nel Deserto Rovente, più debole sulle Vette Gelate
  expect(colpo(2)).toBeGreaterThan(colpo(0))
  expect(colpo(1)).toBeLessThan(colpo(0))
})

test('catturare è più difficile nei mondi avanti, le sfere migliori aiutano', () => {
  const s = scegliIniziale(statoIniziale(), 0)
  const nem = { sp: 'piumino', lvl: 10, xp: 0, hp: 40 }
  const p = (mondo: number, sfera: number) => probCattura({ ...s, mondo }, nem, sfera)
  for (let m = 1; m < MONDI.length; m++) expect(p(m, 0)).toBeLessThan(p(m - 1, 0))
  for (let i = 1; i < SFERE.length; i++) expect(p(4, i)).toBeGreaterThan(p(4, i - 1))
  expect(p(0, 4)).toBeLessThanOrEqual(0.95)
})

test('in lotta 3 e 4 aprono lo zaino e il numero sceglie quale sfera o quale cura', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, sfere: [0, 2, 0, 0, 1], cure: [1, 0, 3, 0, 0], squadra: [{ ...s.squadra[0]!, hp: 5 }], modo: 'lotta', nemico: { sp: 'piumino', lvl: 2, xp: 0, hp: 20 } }
  s = tasto(s, { key: '3' })
  expect(s.zaino).toBe('sfere')
  // 0 chiude senza consumare niente
  expect(tasto(s, { key: '0' }).zaino).toBeNull()
  // nella lista ci sono solo le sfere che hai: 1 la Mega sfera, 2 la Sfera stellare
  const lanciata = tasto(s, { key: '2' })
  expect(lanciata.sfere).toEqual([0, 2, 0, 0, 0])
  expect(lanciata.zaino).toBeNull()
  // 4 apre le cure: 2 è l'Iper cura, la seconda che hai
  let c = tasto({ ...s, zaino: null }, { key: '4' })
  expect(c.zaino).toBe('cure')
  c = tasto(c, { key: '2' })
  expect(c.cure).toEqual([1, 0, 2, 0, 0])
  expect(c.squadra[0]!.hp).toBeGreaterThan(5)
  // C apre direttamente le cure; senza cure lo zaino non si apre
  expect(tasto({ ...s, zaino: null }, { key: 'c' }).zaino).toBe('cure')
  expect(tasto({ ...s, zaino: null, cure: [0, 0, 0, 0, 0] }, { key: '4' }).zaino).toBeFalsy()
})

test('il negozio ha una sfera e una cura nuove in ogni mondo', () => {
  const s = { ...scegliIniziale(statoIniziale(), 0), x: CENTRO.x, y: CENTRO.y, monete: 1000 }
  expect(articoli(s, 'sfere').map(a => a.nome)).toEqual(['Sfera'])
  expect(articoli({ ...s, mondo: 4 }, 'sfere').length).toBe(SFERE.length)
  expect(articoli({ ...s, mondo: 2 }, 'cure').map(a => a.nome)).toEqual(['Cura', 'Super cura', 'Iper cura'])
  // M, poi 1 per le sfere, poi il numero compra
  let n = tasto(s, { key: 'm' })
  expect(n.negozio).toBe('scelta')
  n = tasto(n, { key: '1' })
  expect(n.negozio).toBe('sfere')
  n = tasto(n, { key: '1' })
  expect(n.sfere[0]).toBe(s.sfere[0]! + 1)
  expect(n.monete).toBe(1000 - SFERE[0]!.prezzo)
  // la Mega sfera nella Prateria non si vende ancora
  expect(compra(n, 'sfere', 1).sfere).toEqual(n.sfere)
  // 0 torna alla scelta, 2 apre le cure
  n = tasto(tasto(n, { key: '0' }), { key: '2' })
  expect(n.negozio).toBe('cure')
  // fino a 20 sfere e 10 cure per tipo
  expect(SFERE_MAX).toBe(20)
  expect(CURE_MAX).toBe(10)
  expect(compra({ ...s, sfere: [SFERE_MAX, 0, 0, 0, 0] }, 'sfere', 0).sfere[0]).toBe(SFERE_MAX)
  // lontano dal Centro cure non si compra, e il Centro non ricarica le sfere
  expect(compra({ ...s, x: CENTRO.x + 1 }, 'cure', 0).cure).toEqual(s.cure)
  expect(muovi({ ...s, sfere: [0, 0, 0, 0, 0], x: CENTRO.x + 1 }, -1, 0).sfere[0]).toBe(0)
  // la Cura totale ridà tutti i PS
  const ferito = { ...s, mondo: 4, cure: [0, 0, 0, 0, 1], squadra: [{ sp: 'braciotto', lvl: 30, xp: 0, hp: 3 }] }
  expect(usaCura(ferito, CURE.length - 1).squadra[0]!.hp).toBe(maxHp(ferito.squadra[0]!))
})

test('nel negozio un passo chiude il negozio e ti muove', () => {
  const s = { ...scegliIniziale(statoIniziale(), 0), x: CENTRO.x, y: CENTRO.y, monete: 100 }
  const negozio = tasto(tasto(s, { key: 'm' }), { key: '1' })
  expect(negozio.negozio).toBe('sfere')
  const fuori = tasto(negozio, { key: 'right' })
  expect(fuori.negozio).toBe(false)
  expect(fuori.x).toBe(CENTRO.x + 1)
  // i numeri comprano e il negozio resta aperto
  const comprato = tasto(negozio, { key: '1' })
  expect(comprato.negozio).toBe('sfere')
  expect(comprato.sfere[0]).toBe(s.sfere[0]! + 1)
})

test('le cure si usano solo se ce ne sono', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, squadra: [{ ...s.squadra[0]!, hp: 5 }] }
  expect(usaCura({ ...s, cure: [0, 0, 0, 0, 0] }, 0).squadra[0]!.hp).toBe(5)
  const con = usaCura({ ...s, cure: [1, 0, 0, 0, 0] }, 0)
  expect(con.squadra[0]!.hp).toBe(25)
  expect(con.cure[0]).toBe(0)
  const piena = scegliIniziale(statoIniziale(), 0)
  expect(usaCura(piena, 0).cure).toEqual(piena.cure)
  // sulla mappa C apre lo zaino delle cure
  expect(tasto(s, { key: 'c' }).zaino).toBe('cure')
})

test('le lotte danno monete e al Centro cure si comprano cure', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, modo: 'lotta', nemico: { sp: 'piumino', lvl: 4, xp: 0, hp: 1 } }
  s = azione(s, 0, () => 0.5)
  expect(s.monete).toBe(8)
  const centro = { ...s, x: CENTRO.x, y: CENTRO.y, monete: CURE[0]!.prezzo }
  const dopo = compra(centro, 'cure', 0)
  expect(dopo.cure[0]).toBe(s.cure[0]! + 1)
  expect(dopo.monete).toBe(0)
  expect(compra({ ...centro, monete: 1 }, 'cure', 0).cure).toEqual(s.cure)
})

test('dal livello 15 un Mostrino si evolve', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, squadra: [{ sp: 'braciotto', lvl: 14, xp: 14 * 8 - 1, hp: 40 }], modo: 'lotta', nemico: { sp: 'piumino', lvl: 2, xp: 0, hp: 1 } }
  const prima = maxHp(s.squadra[0]!)
  s = azione(s, 0, () => 0.5)
  const io = s.squadra[0]!
  expect(io.lvl).toBe(15)
  expect(io.evo).toBe(1)
  expect(nome(io)).toBe('Bracione')
  expect(maxHp(io)).toBeGreaterThan(prima)
  expect(s.log.at(-1)).toContain('si evolve in Bracione')
  // la forma nuova entra nel catalogo come catturata
  expect(s.catalogo).toContain('braciotto:1')
  // e si vede l'animazione: il vecchio, la nuvola con POUF!, il nuovo; un tasto qualsiasi la chiude
  expect(s.evoluzioni).toEqual([{ sp: 'braciotto', da: 0, a: 1 }])
  const scena = svgPer(s)
  expect(scena.animato).toBe(true)
  expect(scena.source).toContain('<animate')
  expect(scena.source).toContain('POUF!')
  expect(scena.source.length).toBeLessThan(131072)
  const dopo = tasto(s, { key: 'x' })
  expect(dopo.evoluzioni).toEqual([])
  expect(dopo.modo).toBe(s.modo)
  expect(svgPer(dopo).animato).toBeUndefined()
  // sotto il 15 niente evoluzione, e chi è già evoluto resta com'è
  expect(evolve({ sp: 'goccetto', lvl: 14, xp: 0, hp: 10 }, []).evo).toBeUndefined()
  expect(evolve(io, [])).toBe(io)
  // ogni specie ha due nomi evoluti, diversi dal suo e da quelli di tutte le altre
  const nomi = Object.values(SPECIE).flatMap(d => [d.nome, ...d.evo])
  expect(new Set(nomi).size).toBe(Object.keys(SPECIE).length * 3)
})

test('al livello 35 arriva la forma finale', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, squadra: [{ sp: 'braciotto', lvl: 34, xp: 34 * 8 - 1, hp: 90, evo: 1 }], modo: 'lotta', nemico: { sp: 'piumino', lvl: 2, xp: 0, hp: 1 } }
  const prima = maxHp(s.squadra[0]!)
  s = azione(s, 0, () => 0.5)
  const io = s.squadra[0]!
  expect(io.lvl).toBe(35)
  expect(stadio(io)).toBe(2)
  expect(nome(io)).toBe('Pirodrago')
  expect(maxHp(io)).toBeGreaterThan(prima)
  expect(s.log.at(-1)).toContain('forma finale: Pirodrago')
  // chi salta dal livello 0 al finale passa da tutte e due le evoluzioni
  const righe: string[] = []
  expect(stadio(evolve({ sp: 'goccetto', lvl: 36, xp: 0, hp: 10 }, righe))).toBe(2)
  expect(righe.length).toBe(2)
})

test('nei mondi alti gli allenatori hanno Mostrini evoluti', () => {
  const s = { ...scegliIniziale(statoIniziale(), 0), mondo: 2 }
  const sfidaDeserto = sfida(s, () => 0.5)
  expect(sfidaDeserto.nemico!.evo).toBe(1)
  expect(sfidaDeserto.nemico!.lvl).toBeGreaterThanOrEqual(MONDI[2]!.lvlMin)
  expect(sfida({ ...s, mondo: 0 }, () => 0.5).nemico!.evo).toBeUndefined()
  // nelle Rovine, dal livello 35, la forma finale
  const rovine = sfida({ ...s, mondo: 4 }, () => 0.999).nemico!
  expect(rovine.lvl).toBeGreaterThanOrEqual(35)
  expect(rovine.evo).toBe(2)
})

test('sconfiggere o catturare mette un Mostrino nel catalogo; catturarlo gli dà la sfera', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, modo: 'lotta', nemico: { sp: 'piumino', lvl: 2, xp: 0, hp: 1 } }
  s = azione(s, 0, () => 0.5)
  expect(s.modo).toBe('mappa')
  // lo sconfitto è visto e conta per il portale, ma senza sfera finché non lo catturi
  expect(s.visti).toContain('piumino')
  expect(s.sconfitti).toContain('piumino')
  expect(s.catalogo).not.toContain('piumino')
  // catturarlo senza averlo mai sconfitto conta lo stesso
  const preso = lancia({ ...scegliIniziale(statoIniziale(), 0), modo: 'lotta', nemico: { sp: 'zampetto', lvl: 2, xp: 0, hp: 1 } }, 0, () => 0)
  expect(preso.sconfitti).toContain('zampetto')
  expect(preso.catalogo).toContain('zampetto')
  // l'ultimo Mostrino che manca, con la medaglia già vinta, apre il portale
  const quasi = { ...scegliIniziale(statoIniziale(), 0), palestre: [allievi(0) + 1, 0, 0, 0, 0], sconfitti: specieDel(0).filter(sp => sp !== 'piumino'), modo: 'lotta' as const, nemico: { sp: 'piumino', lvl: 2, xp: 0, hp: 1 } }
  const aperto = azione(quasi, 0, () => 0.5)
  expect(portaleAperto(aperto)).toBe(true)
  expect(aperto.log.join(' ')).toContain('portale')
  // ogni forma ha la sua voce: catturare un evoluto registra la forma evoluta, non la base
  const evoluto = lancia({ ...s, modo: 'lotta', nemico: { sp: 'ondina', lvl: 16, xp: 0, hp: 1, evo: 1 } }, 0, () => 0)
  expect(evoluto.catalogo).toContain('ondina:1')
  expect(evoluto.catalogo).not.toContain('ondina')
  // anche solo incontrarlo lo rende visto
  const incontro = muovi(muovi(scegliIniziale(statoIniziale(), 0), 1, 0, () => 0.5), 1, 0, () => 0.01)
  expect(incontro.visti).toContain(incontro.nemico!.sp)
})

test('il catalogo ha una voce per ogni forma: 33 per mondo (36 nelle Rovine), 168 in tutto', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, catalogo: ['braciotto', 'braciotto:1', 'zampetto'], visti: ['braciotto', 'braciotto:1', 'braciotto:2', 'zampetto', 'piumino'] }
  s = tasto(s, { key: 'l' })
  expect(s.catalogoVista).toEqual({ mondo: 0, sel: 0 })
  const voci = vociCatalogo(s, 0)
  expect(voci.length).toBe(11 * FORME)
  expect(MONDI.flatMap((_, m) => vociCatalogo(s, m)).length).toBe(168)
  // ogni riga è una specie con le sue tre forme, numerate di seguito
  expect(voci.slice(0, 3).map(v => [v.sp, v.st, numeroVoce(v)])).toEqual([['braciotto', 0, '#001'], ['braciotto', 1, '#002'], ['braciotto', 2, '#003']])
  expect(voci.filter(v => v.preso).map(v => `${v.sp}:${v.st}`)).toEqual(['braciotto:0', 'braciotto:1', 'zampetto:0'])
  expect(voci.filter(v => v.visto && !v.preso).map(v => `${v.sp}:${v.st}`)).toEqual(['braciotto:2', 'piumino:0'])
  // chi non è né visto né catturato è solo un ? con ????? al posto del nome
  expect(descrizione(voci[0]!)).toContain('Bracione')
  expect(descrizione(voci[1]!)).toContain('evoluzione di Braciotto')
  expect(descrizione(voci[2]!)).toContain('Pirodrago')
  expect(descrizione(voci[3]!)).toContain('?????')
  expect(descrizione(voci[3]!)).not.toContain('Fumarello')
  expect(descrizione(vociCatalogo(s, 2)[0]!)).toContain('?????')
  expect(contiCatalogo(s)[0]).toEqual({ presi: 3, visti: 5, tot: 33 })
  expect(catalogoDel(s)).toEqual({ presi: 3, tot: 33 })
  // frecce: destra scorre, giù salta una riga (una specie), oltre l'ultima forma si passa al mondo dopo
  s = tasto(s, { key: 'right' })
  expect(s.catalogoVista?.sel).toBe(1)
  s = tasto(s, { key: 'down' })
  expect(s.catalogoVista?.sel).toBe(4)
  s = { ...s, catalogoVista: { mondo: 0, sel: 32 } }
  s = tasto(s, { key: 'right' })
  expect(s.catalogoVista).toEqual({ mondo: 1, sel: 0 })
  s = tasto(s, { key: '5' })
  expect(s.catalogoVista?.mondo).toBe(4)
  // mentre il catalogo è aperto non ci si muove, e L lo chiude
  expect(tasto(s, { key: 'up' }).x).toBe(s.x)
  expect(tasto(s, { key: 'l' }).catalogoVista).toBeNull()
})

test('in fondo al catalogo la linea evolutiva della forma scelta, con la sua bio', () => {
  const s = { ...scegliIniziale(statoIniziale(), 0), catalogo: ['braciotto'], visti: ['braciotto', 'braciotto:1'] }
  const giu = (sel: number) => svgPer({ ...s, catalogoVista: { mondo: 0, sel } }).source.split('<rect x="14" y="424"')[1]!
  // la forma scelta è l'evoluta: la linea mostra base, evoluta e la finale ancora da scoprire, e la bio
  const linea = giu(1)
  expect(linea).toContain('Braciotto')
  expect(linea).toContain('Bracione')
  expect(linea).toContain('?????')
  expect(linea).toContain('#002 Bracione')
  expect(linea).toContain('fiammella')
  expect(linea).toContain('Lv 35')
  // un Mostrino mai visto non svela né nome né bio, solo dove vive
  const ignoto = giu(3)
  expect(ignoto).not.toContain('Fumarello')
  expect(ignoto).toContain('Prateria')
})

test('le feste: tutte le medaglie e il catalogo completo', () => {
  const tutte = Object.keys(SPECIE).flatMap(sp => [sp, `${sp}:1`, `${sp}:2`])
  const s = scegliIniziale(statoIniziale(), 0)
  const medaglieTutte = MONDI.map((_, i) => allievi(i) + 1)
  expect(tutteLeMedaglie({ ...s, palestre: medaglieTutte })).toBe(true)
  expect(catalogoCompleto({ ...s, catalogo: tutte })).toBe(true)
  expect(catalogoCompleto({ ...s, catalogo: tutte.slice(1) })).toBe(false)
  // la festa parte solo quando il traguardo si raggiunge, non dopo
  const prima = { ...s, palestre: medaglieTutte.map((v, i) => (i === 4 ? v - 1 : v)), catalogo: tutte.slice(1) }
  const dopo = festeggia(prima, { ...prima, palestre: medaglieTutte, catalogo: tutte })
  expect(dopo.feste).toEqual(['medaglie', 'catalogo'])
  expect(festeggia(dopo, dopo).feste).toEqual(['medaglie', 'catalogo'])
  // ognuna ha la sua schermata animata, nel limite del pannello; un tasto passa alla prossima
  const medaglie = svgPer(dopo)
  expect(medaglie.animato).toBe(true)
  expect(medaglie.source).toContain('CAMPIONE DI MOSTRINI!')
  expect(medaglie.source.length).toBeLessThan(131072)
  const secondo = tasto(dopo, { key: 'x' })
  expect(secondo.feste).toEqual(['catalogo'])
  expect(svgPer(secondo).source).toContain('CATALOGO COMPLETO!')
  expect(svgPer(secondo).source.length).toBeLessThan(131072)
  expect(tasto(secondo, { key: 'x' }).feste).toEqual([])
  // battere l'ultimo capopalestra con le altre medaglie già vinte fa partire la festa
  let ultimo = { ...prima, mondo: 4, squadra: [{ sp: 'braciotto', lvl: 80, xp: 0, hp: 9999 }], inPalestra: { x: postoSfidante(allievi(4)) - 2, y: TAPPETO } }
  ultimo = tasto(ultimo, { key: 'right' })
  expect(ultimo.allenatore?.palestra).toBe('capo')
  while (ultimo.modo === 'lotta') ultimo = tasto({ ...ultimo, nemico: { ...ultimo.nemico!, hp: 1 }, scelta: 0 }, { key: '1' })
  expect(ultimo.feste).toContain('medaglie')
})

test('il menu mostra la versione', () => {
  expect(VERSIONE).toMatch(/^\d+\.\d+\.\d+$/)
  expect(svgPer(statoMenu()).source).toContain(`versione ${VERSIONE}`)
})

test('ogni disegno sta nel limite del pannello', () => {
  // il caso più pesante: tutte le forme catturate, quindi ogni scheda del catalogo col suo disegno
  const tutte = Object.keys(SPECIE).flatMap(sp => [sp, `${sp}:1`, `${sp}:2`])
  const base = { ...scegliIniziale(statoIniziale(), 0), catalogo: tutte, visti: tutte }
  const disegni = [svgPer({ ...base, modo: 'menu' }), svgPer(statoIniziale())]
  MONDI.forEach((_, mondo) => {
    const forte = { sp: specieDel(mondo)[0]!, lvl: 40, xp: 0, hp: 50, evo: 2 }
    disegni.push(svgPer({ ...base, mondo }))
    for (const sel of [0, 9, 18]) disegni.push(svgPer({ ...base, mondo, catalogoVista: { mondo, sel } }))
    disegni.push(svgPer({ ...base, mondo, inPalestra: { x: 5, y: TAPPETO }, palestre: [2, 2, 2, 2, 2] }))
    disegni.push(svgPer({ ...base, mondo, modo: 'lotta', squadra: [forte, forte, forte], nemico: forte, lancio: true, lanciata: 4, allenatore: { nome: 'Custode Elio', squadra: [forte, forte], palestra: 'capo' } }))
    disegni.push(svgPer({ ...base, mondo, catalogoVista: { mondo, sel: specieDel(mondo).length * FORME - 1 } }))
    // i colpi animati di ogni tipo, insieme alla Botta del nemico
    for (const mossa of ANELLO) {
      const lotta = svgPer({ ...base, mondo, modo: 'lotta', squadra: [forte], nemico: forte, colpi: [{ chi: 'io', mossa }, { chi: 'nemico', mossa: 'botta' }] })
      expect(lotta.animato).toBe(true)
      disegni.push(lotta)
    }
  })
  for (const d of disegni) {
    expect(d.source.startsWith('<svg')).toBe(true)
    expect(d.source.length).toBeLessThan(131072)
  }
})

// Un rnd che dà i valori in fila, poi sempre 0.5.
const inFila = (...valori: number[]) => () => valori.shift() ?? 0.5

test('i Mostrini d\'acqua si trovano solo pescando, dalla riva', () => {
  for (let m = 0; m < MONDI.length; m++) {
    expect(nellErba(m).every(sp => SPECIE[sp]!.tipo !== 'acqua')).toBe(true)
    expect(nellAcqua(m).length).toBeGreaterThan(0)
  }
  // nella Prateria in (10,6) c'è l'acqua a destra; dal Centro cure no
  let s = { ...scegliIniziale(statoIniziale(), 0), x: 10, y: 6 }
  expect(acquaVicina(s)).toEqual({ x: 11, y: 6 })
  expect(acquaVicina(scegliIniziale(statoIniziale(), 0))).toBeNull()
  expect(tasto(scegliIniziale(statoIniziale(), 0), { key: 'f' }).log.at(-1)).toContain('riva')
  // non abbocca niente: il galleggiante resta in acqua finché non ti muovi
  const vuota = pesca(s, inFila(0.9))
  expect(vuota.modo).toBe('mappa')
  expect(vuota.pesca).toEqual({ x: 11, y: 6 })
  expect(svgPer(vuota).source).toContain('#e8483c')
  expect(tasto(vuota, { key: 'left' }).pesca).toBeNull()
  // abbocca: un Mostrino d'acqua, e con un po' di fortuna il leggendario Carpadoro
  s = pesca(s, inFila(0.1, 0.5))
  expect(s.modo).toBe('lotta')
  expect(SPECIE[s.nemico!.sp]!.tipo).toBe('acqua')
  expect(s.log.at(-1)).toContain('Hai pescato')
  const oro = pesca({ ...s, modo: 'mappa', nemico: null }, inFila(0.1, 0.01, 0))
  expect(oro.nemico!.sp).toBe('carpadoro')
  expect(oro.log.at(-1)).toContain('leggendario')
  // nel catalogo i Mostrini d'acqua dicono dove pescarli
  expect(descrizione(vociCatalogo(s, 0).find(v => v.sp === 'ondina')!)).toContain('Si pesca nella Prateria')
})

test('rari, epici e leggendari: più rari, più forti, più difficili da catturare', () => {
  // dall'erba della Prateria, con il tiro giusto, esce l'epico Trifoglio, due livelli più su
  const s = { ...scegliIniziale(statoIniziale(), 0), x: 4, y: 2 }
  const epico = muovi(s, 1, 0, inFila(0.01, 0.5, 0.02, 0))
  expect(epico.nemico!.sp).toBe('trifoglio')
  expect(rarita('trifoglio')).toBe('epico')
  expect(epico.nemico!.lvl).toBe(MONDI[0]!.lvlMin + 3 + 2)
  // il leggendario della Prateria si pesca soltanto: nell'erba quel tiro dà un comune
  expect(comune(muovi(s, 1, 0, inFila(0.01, 0.5, 0.001, 0)).nemico!.sp)).toBe(true)
  // la cattura: il leggendario si prende il 60% meno di un comune
  const m = { lvl: 5, xp: 0, hp: 0 }
  const p = (sp: string) => probCattura(s, { ...m, sp, hp: maxHp({ ...m, sp }) }, 0)
  expect(Math.round((p('carpadoro') / p('goccetto')) * 100) / 100).toBe(CATTURA_RARITA.leggendario)
  expect(p('trifoglio')).toBeLessThan(p('scintillo'))
  expect(p('scintillo')).toBeLessThan(p('zampetto'))
  // in lotta e nel catalogo la rarità si vede
  expect(svgPer(epico).source).toContain('#c46cd9')
  expect(descrizione({ ...vociCatalogo(s, 0).find(v => v.sp === 'trifoglio')!, visto: true })).toContain('epico')
})

test('in lotta le mosse si animano: chi attacca si muove, sul colpito l\'effetto; la Botta fa SBAM', () => {
  let s = { ...scegliIniziale(statoIniziale(), 0), x: 4, y: 2 }
  s = muovi(s, 1, 0, inFila(0.01, 0.5))
  expect(s.modo).toBe('lotta')
  expect(svgPer(s).animato).toBeUndefined()
  // 2 Fiammata, poi il nemico risponde con la Botta
  s = { ...s, nemico: { ...s.nemico!, hp: 999 } }
  const turno = azione(s, 1, () => 0.5)
  expect(turno.colpi).toEqual([{ chi: 'io', mossa: 'fuoco' }, { chi: 'nemico', mossa: 'botta' }])
  const disegno = svgPer(turno)
  expect(disegno.animato).toBe(true)
  expect(disegno.source).toContain('SBAM!')
  expect(disegno.source).toContain('animateTransform')
  // fermo o animato, il pannello riceve le stesse misure: lo schermo non cambia grandezza;
  // nel riquadro animato il disegno riempie il riquadro, senza misure sue
  expect(misureDi(disegno.source)).toEqual({ largo: 512, alto: 320 })
  expect(misureDi(svgPer(s).source)).toEqual(misureDi(disegno.source))
  expect(riempie(disegno.source)).toMatch(/^<svg [^>]*viewBox="0 0 640 400" width="100%" height="100%"/)
  // un tasto che non cambia niente lascia l'animazione, uno che cambia qualcosa la toglie
  expect(tasto(turno, { key: 'x' })).toBe(turno)
  expect(tasto(turno, { key: 'down' }).colpi).toBeUndefined()
  // con la Botta del giocatore il colpo è 'botta', uguale per tutti
  expect(tasto({ ...s, scelta: 0 }, { key: '1' }).colpi?.[0]).toEqual({ chi: 'io', mossa: 'botta' })
})

test('i tipi si battono a vicenda in cerchio, tutti in equilibrio', () => {
  // acqua batte fuoco: +10% per l'acqua, -5% per il fuoco che attacca l'acqua
  expect(efficacia('acqua', 'fuoco')).toBe(1.1)
  expect(efficacia('fuoco', 'acqua')).toBe(0.95)
  expect(efficacia('fuoco', 'erba')).toBe(1.1)
  expect(efficacia('fuoco', 'fuoco')).toBe(1)
  // ogni tipo: forte contro 2 e debole contro 2 quando attacca, e lo stesso quando difende
  for (const t of ANELLO) {
    expect(fortiContro(t).length).toBe(2)
    expect(deboliContro(t).length).toBe(2)
    expect(ANELLO.filter(a => efficacia(a, t) > 1).length).toBe(2)
    expect(ANELLO.filter(a => efficacia(a, t) < 1).length).toBe(2)
    // se A batte B, allora B attaccando A è svantaggiato
    for (const d of fortiContro(t)) expect(efficacia(d, t)).toBe(0.95)
  }
  // ogni specie ha la sua bio, e la scheda del catalogo mostra il tipo
  for (const sp of Object.keys(SPECIE)) expect(BIO[sp]?.length).toBeGreaterThan(10)
  const s = { ...scegliIniziale(statoIniziale(), 0) }
  expect(descrizione(vociCatalogo(s, 0)[0]!)).toContain('Tipo fuoco: forte contro')
})

test('scelta, incontro nell erba, cattura', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  expect(s.modo).toBe('mappa')
  expect(s.squadra[0]!.sp).toBe('braciotto')
  // da (3,2) a destra verso l'erba in (5,2): rnd basso forza l'incontro
  s = muovi(s, 1, 0, () => 0.5)
  s = muovi(s, 1, 0, () => 0.01)
  expect(s.modo).toBe('lotta')
  expect(s.nemico).not.toBeNull()
  const sfere = s.sfere[0]!
  s = lancia(s, 0, () => 0.0)
  expect(s.modo).toBe('mappa')
  expect(s.sfere[0]).toBe(sfere - 1)
  expect(s.squadra.length).toBe(2)
})

test('le mura bloccano il passo', () => {
  let s = scegliIniziale(statoIniziale(), 1)
  const prima = s
  s = muovi({ ...s, x: 1, y: 1 }, -1, 0)
  expect(s.x).toBe(1)
  expect(prima.x).toBe(3)
})

test('squadra di 3 al massimo, le catture in più vanno nel box', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  for (const sp of ['piumino', 'zampetto', 'ondina']) {
    s = { ...s, modo: 'lotta', nemico: { sp, lvl: 3, xp: 0, hp: 1 } }
    s = lancia(s, 0, () => 0)
  }
  expect(s.squadra.length).toBe(3)
  expect(s.box.map(m => m.sp)).toEqual(['ondina'])
  // B, poi 1 sceglie Ondina nel box, poi 2 fa uscire Piumino
  s = apriScambio(s)
  s = tasto(s, { key: '1' })
  expect(s.scambio?.entra).toBe(0)
  expect(s.squadra.length).toBe(3)
  s = tasto(s, { key: '2' })
  expect(s.scambio).toBeNull()
  expect(s.squadra.map(m => m.sp)).toEqual(['braciotto', 'ondina', 'zampetto'])
  expect(s.box.map(m => m.sp)).toEqual(['piumino'])
  // B e poi 0 annulla senza cambiare niente
  const prima = s
  s = tasto(tasto(apriScambio(s), { key: '0' }), { key: 'left' })
  expect(s.squadra).toEqual(prima.squadra)
})

test('le partite vecchie si caricano: box, zaino a caselle, catalogo, palestre', () => {
  const vecchia: any = { ...scegliIniziale(statoIniziale(), 0) }
  for (const campo of ['box', 'mondo', 'visti', 'palestre', 'sconfitti']) delete vecchia[campo]
  vecchia.squadra = ['piumino', 'zampetto', 'ondina', 'gelino'].map(sp => ({ sp, lvl: 3, xp: 0, hp: 5 }))
  Object.assign(vecchia, { sfere: 7, megaSfere: 2, cure: 3, cureForti: 1 })
  vecchia.catalogo = ['braciotto', 'piumino', 'zampetto', 'ondina', 'gelino', 'germoglio']
  const s = normalizza(vecchia)
  expect(s.squadra.length).toBe(3)
  expect(s.box.length).toBe(1)
  expect(s.mondo).toBe(0)
  expect(s.sfere).toEqual([7, 2, 0, 0, 0])
  expect(s.cure).toEqual([3, 1, 0, 0, 0])
  // nel catalogo restano le specie che hai ancora; le altre diventano viste, ma contano come sconfitte per il portale
  expect([...s.catalogo].sort()).toEqual(['gelino', 'ondina', 'piumino', 'zampetto'])
  expect(s.visti).toContain('germoglio')
  expect(s.visti).toContain('braciotto')
  expect(s.sconfitti).toEqual(expect.arrayContaining(['braciotto', 'germoglio', 'gelino', 'ondina', 'piumino', 'zampetto']))
  // chi era già sulle Vette ha la medaglia della Prateria, ma deve vincere quella delle Vette
  expect(medaglia(normalizza({ ...vecchia, mondo: 1 }), 0)).toBe(true)
  expect(medaglia(normalizza({ ...vecchia, mondo: 1 }), 1)).toBe(false)
  // le partite già nuove non cambiano
  const nuova = normalizza(s)
  expect(nuova.catalogo).toEqual(s.catalogo)
  expect(nuova.sfere).toEqual(s.sfere)
})

test('in lotta il 5 apre il cambio e il numero sceglie chi entra', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, squadra: [...s.squadra, { sp: 'ondina', lvl: 4, xp: 0, hp: 20 }], modo: 'lotta', nemico: { sp: 'piumino', lvl: 2, xp: 0, hp: 20 } }
  s = tasto(s, { key: '5' })
  expect(s.cambio).toBe(true)
  s = tasto(s, { key: '2' })
  expect(s.cambio).toBe(false)
  expect(s.squadra[0]!.sp).toBe('ondina')
  expect(s.squadra[1]!.sp).toBe('braciotto')
  // un Mostrino esausto non entra
  const esausto = { ...s, squadra: [s.squadra[0]!, { ...s.squadra[1]!, hp: 0 }] }
  expect(cambiaInLotta(esausto, 1).squadra[0]!.sp).toBe('ondina')
})

test('dal box si può rilasciare un Mostrino', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, box: [{ sp: 'ondina', lvl: 4, xp: 0, hp: 20 }, { sp: 'piumino', lvl: 3, xp: 0, hp: 10 }] }
  s = apriScambio(s)
  s = tasto(s, { key: 'r' })
  expect(s.scambio?.rilascia).toBe(true)
  s = tasto(s, { key: '1' })
  expect(s.box.map(m => m.sp)).toEqual(['piumino'])
  expect(rilascia(s, 0).box.length).toBe(0)
})

test('gli allenatori sfidano con la loro squadra', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, squadra: [{ ...s.squadra[0]!, lvl: 50, hp: 500 }] }
  s = sfida(s, () => 0.5)
  expect(s.modo).toBe('lotta')
  expect(s.allenatore?.squadra.length).toBe(1)
  // niente cattura e niente fuga contro un allenatore
  expect(lancia(s, 0, () => 0).modo).toBe('lotta')
  expect(tasto(s, { key: '3' }).zaino).toBeFalsy()
  expect(azione(s, 5, () => 0).modo).toBe('lotta')
  const monete = s.monete
  s = azione({ ...s, nemico: { ...s.nemico!, hp: 1 } }, 0, () => 0.5)
  expect(s.modo).toBe('lotta')
  expect(s.allenatore?.squadra.length).toBe(0)
  s = azione({ ...s, nemico: { ...s.nemico!, hp: 1 } }, 0, () => 0.5)
  expect(s.modo).toBe('mappa')
  expect(s.allenatore).toBeNull()
  expect(s.monete).toBeGreaterThan(monete)
  // un allenatore qualsiasi non conta per la palestra
  expect(vinteIn(s, 0)).toBe(0)
})

test('il menu principale apre, inizia e cancella le partite', () => {
  const salvata = { ...scegliIniziale(statoIniziale(), 1), slot: 0 }
  const partite = [salvata, null, null]
  expect(tastoMenu(statoMenu(), '1', partite, 0).s.squadra[0]!.sp).toBe('goccetto')
  expect(tastoMenu(statoMenu(), 'return', partite, 0).s.slot).toBe(0)
  const nuova = tastoMenu(statoMenu(), '2', partite, 0).s
  expect(nuova.modo).toBe('inizio')
  expect(nuova.slot).toBe(1)
  // D, poi il numero chiede conferma; lo stesso numero cancella, un altro tasto annulla
  const cancella = tastoMenu(statoMenu(), 'd', partite, 0).s
  const conferma = tastoMenu(cancella, '1', partite, 0)
  expect(conferma.cancella).toBeUndefined()
  expect(conferma.s.daCancellare).toBe(0)
  expect(tastoMenu(conferma.s, '1', partite, 0).cancella).toBe(0)
  expect(tastoMenu(conferma.s, '2', partite, 0).cancella).toBeUndefined()
  expect(tasto({ ...salvata, modo: 'mappa' }, { key: 'p' }).modo).toBe('menu')
})

for (const surface of ['terminal', 'desktop'] as const) {
  test(`il pannello parte dal menu, inizia una partita e la salva (${surface})`, async ($, on) => {
    const salvati: any[] = []
    on('store.get', async () => ({ value: undefined }))
    on('store.set', async (_$, e) => {
      salvati.push((e as any).value)
      return { value: undefined }
    })
    const ui = await ($.ui as any).mount({
      plugin: 'mostrini',
      surface,
      component: 'Pane',
      requestId: 'mostrini',
      props: { title: 'Mostrini', isFocused: true, bodyColumns: 60, placement: 'dock' },
    })
    expect(await ui.find({ in: 'gioco', text: /Partita 1/ })).toBeTruthy()
    expect(await ui.find({ in: 'gioco', text: new RegExp(`versione ${VERSIONE.replace(/\./g, '\\.')}`) })).toBeTruthy()
    await ui.key({ in: 'gioco', key: '1' })
    expect(await ui.find({ in: 'gioco', text: /Braciotto/ })).toBeTruthy()
    await ui.key({ in: 'gioco', key: '2' })
    expect(await ui.find({ in: 'gioco', text: /Frecce\/WASD/ })).toBeTruthy()
    expect(salvati.length).toBe(1)
    expect(salvati[0].partite[0].squadra[0].sp).toBe('goccetto')
    // L apre il catalogo della Prateria e lo richiude
    await ui.key({ in: 'gioco', key: 'l' })
    expect(await ui.find({ in: 'gioco', text: /Catalogo · 1\/5 Prateria 1\/33/ })).toBeTruthy()
    await ui.key({ in: 'gioco', key: 'l' })
    expect(await ui.find({ in: 'gioco', text: /L catalogo/ })).toBeTruthy()
    // un passo e poi P: la partita si salva con la nuova posizione e si torna al menu
    await ui.key({ in: 'gioco', key: 'left' })
    await ui.key({ in: 'gioco', key: 'p' })
    expect(await ui.find({ in: 'gioco', text: /menu principale/ })).toBeTruthy()
    expect(salvati.at(-1).partite[0].x).toBe(salvati[0].partite[0].x - 1)
    await ui.unmount()
  })
}
