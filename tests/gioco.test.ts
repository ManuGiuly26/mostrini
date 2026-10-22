import { test, expect } from 'claude-code/testing'
import {
  statoIniziale, scegliIniziale, muovi, azione, efficacia, apriScambio, normalizza, portaleAperto, specieDel, catalogoDel, usaCura, tasto, cambiaInLotta, compra, rilascia, sfida, lancia, tastoMenu, statoMenu, CENTRO,
  MAPPA, MONDI, SPECIE, SFERE, CURE, SFERE_MAX, CURE_MAX, VERSIONE, bioma, livelloNel, evolve, nome, maxHp, stadio, vociCatalogo, descrizione,
  articoli, probCattura, allievi, vinteIn, medaglia, squadraCapo,
} from '../hooks/gioco.tsx'
import type { Stato } from '../hooks/gioco.tsx'
import { DISEGNI, svgPer } from '../hooks/grafica.ts'

test('la mappa è rettangolare e ogni specie ha una mossa', () => {
  for (const m of MONDI) for (const riga of m.mappa) expect(riga.length).toBe(MAPPA[0]!.length)
  expect(MONDI.length).toBe(5)
  MONDI.forEach((m, i) => {
    expect(specieDel(i).length).toBe(9)
    expect(specieDel(i)).toContain(m.raro)
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

test('in palestra si battono n+2 allievi e poi il capopalestra, che dà la medaglia', () => {
  expect(allievi(0)).toBe(3)
  expect(allievi(4)).toBe(7)
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, squadra: [{ sp: 'braciotto', lvl: 60, xp: 0, hp: 999 }] }
  // la palestra della Prateria è in (12,1): ci si entra da (12,2)
  expect(MONDI[0]!.mappa[1]![12]).toBe('G')
  for (let k = 0; k < allievi(0); k++) {
    s = muovi({ ...s, x: 12, y: 2 }, 0, -1, () => 0.5)
    expect(s.allenatore?.palestra).toBe('allievo')
    // niente fuga e niente cattura in palestra
    expect(azione(s, 5, () => 0).modo).toBe('lotta')
    expect(lancia(s, 0, () => 0).modo).toBe('lotta')
    s = vinci(s)
    expect(vinteIn(s, 0)).toBe(k + 1)
  }
  expect(portaleAperto(s)).toBe(false)
  s = muovi({ ...s, x: 12, y: 2 }, 0, -1, () => 0.5)
  expect(s.allenatore?.palestra).toBe('capo')
  expect(s.allenatore?.nome).toBe('Capopalestra Flora')
  expect(s.allenatore!.squadra.length + 1).toBe(squadraCapo(0).length)
  const monete = s.monete
  s = vinci(s)
  expect(medaglia(s, 0)).toBe(true)
  // la medaglia da sola non basta: serve anche il catalogo della Prateria completo
  expect(portaleAperto(s)).toBe(false)
  expect(portaleAperto({ ...s, catalogo: specieDel(0) })).toBe(true)
  expect(s.monete).toBeGreaterThan(monete)
  expect(s.log.join(' ')).toContain('Medaglia Foglia')
  // ci si può tornare, ma la medaglia ce l'hai già
  expect(muovi({ ...s, x: 12, y: 2 }, 0, -1).modo).toBe('mappa')
  // il capopalestra chiude con il raro del mondo, più forte degli altri
  for (let m = 0; m < MONDI.length; m++) {
    const squadra = squadraCapo(m)
    expect(squadra.at(-1)!.sp).toBe(MONDI[m]!.raro)
    expect(squadra.every(x => x.lvl > MONDI[m]!.lvlMax)).toBe(true)
  }
})

test('il portale si apre con la medaglia della palestra e il catalogo del mondo completo', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, x: 17, y: 8, catalogo: specieDel(0) }
  // solo il catalogo: chiuso, e il messaggio dice che manca la medaglia
  const chiuso = muovi(s, 1, 0)
  expect(chiuso.x).toBe(17)
  expect(chiuso.log.at(-1)).toContain('Medaglia Foglia')
  // solo la medaglia: chiuso, e il messaggio dice quanti Mostrini mancano
  const senza = muovi({ ...s, catalogo: ['braciotto'], palestre: [allievi(0) + 1, 0, 0, 0, 0] }, 1, 0)
  expect(senza.x).toBe(17)
  expect(senza.log.at(-1)).toContain('8 Mostrini')
  s = { ...s, palestre: [allievi(0) + 1, 0, 0, 0, 0] }
  s = muovi(s, 1, 0, () => 0.99)
  expect(s.mondo).toBe(1)
  expect(catalogoDel(s)).toEqual({ presi: 9, tot: 18 })
  // il P delle Vette Gelate è in (18,1): chiuso finché non vinci la loro palestra
  expect(muovi({ ...s, x: 17, y: 1 }, 1, 0, () => 0.99).mondo).toBe(1)
  const deserto = muovi({ ...s, x: 17, y: 1, palestre: [4, allievi(1) + 1, 0, 0, 0], catalogo: [...specieDel(0), ...specieDel(1)] }, 1, 0, () => 0.99)
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
  expect(s.catalogo).toContain('piumino')
  expect(s.catturati).not.toContain('piumino')
  s = lancia({ ...s, modo: 'lotta', nemico: { sp: 'piumino', lvl: 2, xp: 0, hp: 1 } }, 0, () => 0)
  expect(s.catturati).toContain('piumino')
  // catturarlo senza averlo mai sconfitto lo registra lo stesso
  const preso = lancia({ ...scegliIniziale(statoIniziale(), 0), modo: 'lotta', nemico: { sp: 'zampetto', lvl: 2, xp: 0, hp: 1 } }, 0, () => 0)
  expect(preso.catalogo).toContain('zampetto')
  expect(preso.catturati).toContain('zampetto')
  // anche solo incontrarlo lo rende visto
  const incontro = muovi(muovi(scegliIniziale(statoIniziale(), 0), 1, 0, () => 0.5), 1, 0, () => 0.01)
  expect(incontro.visti).toContain(incontro.nemico!.sp)
})

test('il catalogo mostra chi hai preso, chi hai visto e chi manca, mondo per mondo', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, catalogo: ['braciotto', 'zampetto'], catturati: ['braciotto'], visti: ['braciotto', 'zampetto', 'piumino'], stadi: { braciotto: 1 } }
  s = tasto(s, { key: 'l' })
  expect(s.catalogoVista).toEqual({ mondo: 0, sel: 0 })
  const voci = vociCatalogo(s, 0)
  expect(voci.length).toBe(9)
  expect(voci.filter(v => v.registrato).map(v => v.sp)).toEqual(['braciotto', 'zampetto'])
  expect(voci.filter(v => v.preso).map(v => v.sp)).toEqual(['braciotto'])
  expect(voci.filter(v => v.visto && !v.registrato).map(v => v.sp)).toEqual(['piumino'])
  // la forma più evoluta avuta: Braciotto è arrivato a Bracione, Zampetto solo sconfitto
  expect(voci[0]!.stadio).toBe(1)
  expect(descrizione(voci[0]!)).toContain('catturato')
  expect(descrizione(voci.find(v => v.sp === 'zampetto')!)).toContain('sconfitto')
  // nella Prateria i mancanti hanno il nome; nel Deserto, ancora chiuso, restano ???
  expect(voci.every(v => v.noto)).toBe(true)
  expect(vociCatalogo(s, 2).some(v => v.noto)).toBe(false)
  expect(descrizione(voci[0]!)).toContain('Bracione')
  expect(descrizione(voci[2]!)).toContain('manca')
  expect(descrizione(voci.find(v => v.sp === 'piumino')!)).toContain('visto')
  expect(descrizione(vociCatalogo(s, 2)[0]!)).toContain('???')
  // frecce: destra scorre, giù salta una riga, oltre l'ultimo si passa al mondo dopo
  s = tasto(s, { key: 'right' })
  expect(s.catalogoVista?.sel).toBe(1)
  s = tasto(s, { key: 'down' })
  expect(s.catalogoVista?.sel).toBe(4)
  s = { ...s, catalogoVista: { mondo: 0, sel: 8 } }
  s = tasto(s, { key: 'right' })
  expect(s.catalogoVista).toEqual({ mondo: 1, sel: 0 })
  s = tasto(s, { key: '5' })
  expect(s.catalogoVista?.mondo).toBe(4)
  // mentre il catalogo è aperto non ci si muove, e L lo chiude
  expect(tasto(s, { key: 'up' }).x).toBe(s.x)
  expect(tasto(s, { key: 'l' }).catalogoVista).toBeNull()
})

test('il menu mostra la versione', () => {
  expect(VERSIONE).toMatch(/^\d+\.\d+\.\d+$/)
  expect(svgPer(statoMenu()).source).toContain(`versione ${VERSIONE}`)
})

test('ogni disegno sta nel limite del pannello', () => {
  const tutte = Object.keys(SPECIE)
  const base = { ...scegliIniziale(statoIniziale(), 0), catalogo: tutte }
  const disegni = [svgPer({ ...base, modo: 'menu' }), svgPer(statoIniziale())]
  MONDI.forEach((_, mondo) => {
    const forte = { sp: specieDel(mondo)[0]!, lvl: 40, xp: 0, hp: 50, evo: 2 }
    disegni.push(svgPer({ ...base, mondo }))
    disegni.push(svgPer({ ...base, mondo, catalogoVista: { mondo, sel: 0 } }))
    disegni.push(svgPer({ ...base, mondo, modo: 'lotta', squadra: [forte, forte, forte], nemico: forte, lancio: true, lanciata: 4, allenatore: { nome: 'Custode Elio', squadra: [forte, forte], palestra: 'capo' } }))
  })
  for (const d of disegni) {
    expect(d.source.startsWith('<svg')).toBe(true)
    expect(d.source.length).toBeLessThan(131072)
  }
})

test('i tipi si battono a vicenda in cerchio', () => {
  expect(efficacia('fuoco', 'erba')).toBe(1.5)
  expect(efficacia('erba', 'acqua')).toBe(1.5)
  expect(efficacia('acqua', 'fuoco')).toBe(1.5)
  expect(efficacia('fuoco', 'acqua')).toBe(0.6)
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
  for (const campo of ['box', 'mondo', 'visti', 'palestre', 'catturati', 'stadi', 'versioneCatalogo']) delete vecchia[campo]
  vecchia.squadra = ['piumino', 'zampetto', 'ondina', 'gelino'].map(sp => ({ sp, lvl: 3, xp: 0, hp: 5 }))
  Object.assign(vecchia, { sfere: 7, megaSfere: 2, cure: 3, cureForti: 1 })
  vecchia.catalogo = ['braciotto', 'piumino', 'zampetto', 'ondina', 'gelino', 'germoglio']
  const s = normalizza(vecchia)
  expect(s.squadra.length).toBe(3)
  expect(s.box.length).toBe(1)
  expect(s.mondo).toBe(0)
  expect(s.sfere).toEqual([7, 2, 0, 0, 0])
  expect(s.cure).toEqual([3, 1, 0, 0, 0])
  // il catalogo tiene tutte le specie di prima (catturate o sconfitte); la sfera va a quelle che hai ancora
  expect([...s.catalogo].sort()).toEqual(['braciotto', 'gelino', 'germoglio', 'ondina', 'piumino', 'zampetto'])
  expect([...(s.catturati ?? [])].sort()).toEqual(['gelino', 'ondina', 'piumino', 'zampetto'])
  expect(s.visti).toContain('germoglio')
  // una partita della 0.8.0 recupera nel catalogo i Mostrini rimasti tra i visti
  const ottoZero: any = { ...normalizza(vecchia), catalogo: ['gelino'], visti: ['gelino', 'piumino'], versioneCatalogo: undefined, catturati: undefined }
  const recuperata = normalizza(ottoZero)
  expect(recuperata.catalogo).toContain('piumino')
  expect(recuperata.catturati).toContain('gelino')
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
    expect(await ui.find({ in: 'gioco', text: /Catalogo · 1\/5 Prateria 1\/9/ })).toBeTruthy()
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
