import { test, expect } from 'claude-code/testing'
import {
  statoIniziale, scegliIniziale, muovi, azione, efficacia, apriScambio, normalizza, portaleAperto, specieDel, catalogoDel, usaCura, tasto, compraCura, cambiaInLotta, compra, rilascia, sfida, lancia, tastoMenu, statoMenu, SFERA_PREZZO, MEGA_PREZZO, CURA_PREZZO, SUPER_PREZZO, CENTRO,
  MAPPA, MONDI, SPECIE, bioma, livelloNel, evolve, nome, maxHp,
} from '../hooks/gioco.tsx'
import { DISEGNI } from '../hooks/grafica.ts'

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

test('ogni mondo ha il Centro cure e i portali raggiungibili a piedi', () => {
  MONDI.forEach((m, i) => {
    expect(m.mappa[CENTRO.y]![CENTRO.x]).toBe('C')
    const vie = raggiungibili(m.mappa)
    const dove = (c: string) => m.mappa.flatMap((r, y) => [...r].map((t, x) => (t === c ? x + ',' + y : ''))).filter(Boolean)
    // P verso il mondo dopo (non nell'ultimo), R verso il mondo prima (non nella Prateria)
    expect(dove('P').length).toBe(i < MONDI.length - 1 ? 1 : 0)
    expect(dove('R').length).toBe(i > 0 ? 1 : 0)
    for (const k of [...dove('P'), ...dove('R')]) expect(vie.has(k)).toBe(true)
  })
})

test('i portali portano avanti e indietro tra i cinque mondi', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, mondo: 1, catalogo: [...specieDel(0), ...specieDel(1)] }
  expect(portaleAperto(s)).toBe(true)
  // il P delle Vette Gelate è in (18,1)
  const deserto = muovi({ ...s, x: 17, y: 1 }, 1, 0, () => 0.99)
  expect(deserto.mondo).toBe(2)
  expect(catalogoDel(deserto)).toEqual({ presi: 18, tot: 27 })
  // l'R del Deserto in (1,1) riporta alle Vette
  expect(muovi({ ...deserto, x: 2, y: 1 }, -1, 0, () => 0.99).mondo).toBe(1)
  // senza il catalogo del Deserto il suo portale resta chiuso
  expect(muovi({ ...deserto, x: 17, y: 8 }, 1, 0, () => 0.99).x).toBe(17)
  // le Rovine Spettrali sono l'ultimo mondo: niente portale avanti
  expect(portaleAperto({ ...s, mondo: 4, catalogo: Object.keys(SPECIE) })).toBe(false)
  // completare il catalogo delle Vette annuncia il portale verso il Deserto
  const ultimo = specieDel(1).at(-1)!
  const quasi = { ...s, catalogo: s.catalogo.filter(sp => sp !== ultimo), modo: 'lotta' as const, nemico: { sp: ultimo, lvl: 8, xp: 0, hp: 1 } }
  expect(azione(quasi, 0, () => 0.5).log.join(' ')).toContain('verso Deserto Rovente')
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

test('nel negozio un passo chiude il negozio e ti muove', () => {
  const s = { ...scegliIniziale(statoIniziale(), 0), x: CENTRO.x, y: CENTRO.y, monete: SFERA_PREZZO }
  const negozio = tasto(s, { key: 'm' })
  expect(negozio.negozio).toBe(true)
  const fuori = tasto(negozio, { key: 'right' })
  expect(fuori.negozio).toBe(false)
  expect(fuori.x).toBe(CENTRO.x + 1)
  // i numeri comprano e il negozio resta aperto
  const comprato = tasto(negozio, { key: '2' })
  expect(comprato.negozio).toBe(true)
  expect(comprato.sfere).toBe(s.sfere + 1)
})

test('dal livello 15 un Mostrino si evolve', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, squadra: [{ sp: 'braciotto', lvl: 14, xp: 14 * 8 - 1, hp: 40 }], modo: 'lotta', nemico: { sp: 'piumino', lvl: 2, xp: 0, hp: 1 } }
  const prima = maxHp(s.squadra[0]!)
  s = azione(s, 0, () => 0.5)
  const io = s.squadra[0]!
  expect(io.lvl).toBe(15)
  expect(io.evo).toBe(true)
  expect(nome(io)).toBe('Bracione')
  expect(maxHp(io)).toBeGreaterThan(prima)
  expect(s.log.at(-1)).toContain('si evolve in Bracione')
  // sotto il 15 niente evoluzione, e chi è già evoluto resta com'è
  expect(evolve({ sp: 'goccetto', lvl: 14, xp: 0, hp: 10 }, []).evo).toBeUndefined()
  expect(evolve(io, [])).toBe(io)
  // ogni specie ha un nome evoluto diverso dal suo
  for (const sp of Object.keys(SPECIE)) expect(SPECIE[sp]!.evo).not.toBe(SPECIE[sp]!.nome)
})

test('nei mondi alti gli allenatori hanno Mostrini evoluti', () => {
  const s = { ...scegliIniziale(statoIniziale(), 0), mondo: 2 }
  const sfidaDeserto = sfida(s, () => 0.5)
  expect(sfidaDeserto.nemico!.evo).toBe(true)
  expect(sfidaDeserto.nemico!.lvl).toBeGreaterThanOrEqual(MONDI[2]!.lvlMin)
  expect(sfida({ ...s, mondo: 0 }, () => 0.5).nemico!.evo).toBeUndefined()
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
  const sfere = s.sfere
  s = azione(s, 2, () => 0.0)
  expect(s.modo).toBe('mappa')
  expect(s.sfere).toBe(sfere - 1)
  expect(s.squadra.length).toBe(2)
})

test('le mura bloccano il passo', () => {
  let s = scegliIniziale(statoIniziale(), 1)
  const prima = s
  s = muovi({ ...s, x: 1, y: 1 }, -1, 0)
  expect(s.x).toBe(1)
  expect(prima.x).toBe(3)
})

test('sconfiggere un Mostrino nuovo lo registra nel catalogo', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, modo: 'lotta', nemico: { sp: 'piumino', lvl: 2, xp: 0, hp: 1 } }
  s = azione(s, 0, () => 0.5)
  expect(s.modo).toBe('mappa')
  expect(s.catalogo).toContain('piumino')
})

test('squadra di 3 al massimo, le catture in più vanno nel box', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  for (const sp of ['piumino', 'zampetto', 'ondina']) {
    s = { ...s, modo: 'lotta', nemico: { sp, lvl: 3, xp: 0, hp: 1 } }
    s = azione(s, 2, () => 0)
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

test('il portale si apre col catalogo della Prateria completo', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, x: 17, y: 8 }
  expect(muovi(s, 1, 0).x).toBe(17)
  s = { ...s, catalogo: specieDel(0) }
  expect(portaleAperto(s)).toBe(true)
  expect(catalogoDel(s)).toEqual({ presi: 9, tot: 9 })
  s = muovi(s, 1, 0, () => 0.99)
  expect(s.mondo).toBe(1)
  expect(catalogoDel(s)).toEqual({ presi: 9, tot: 18 })
})

test('le partite vecchie si caricano col box', () => {
  const vecchia: any = { ...scegliIniziale(statoIniziale(), 0) }
  delete vecchia.box
  delete vecchia.mondo
  vecchia.squadra = ['piumino', 'zampetto', 'ondina', 'gelino'].map(sp => ({ sp, lvl: 3, xp: 0, hp: 5 }))
  const s = normalizza(vecchia)
  expect(s.squadra.length).toBe(3)
  expect(s.box.length).toBe(1)
  expect(s.mondo).toBe(0)
})

test('C cura solo se ci sono cure nell inventario', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, squadra: [{ ...s.squadra[0]!, hp: 5 }] }
  const senza = usaCura({ ...s, cure: 0 })
  expect(senza.squadra[0]!.hp).toBe(5)
  const con = usaCura({ ...s, cure: 1 })
  expect(con.squadra[0]!.hp).toBe(25)
  expect(con.cure).toBe(0)
  const piena = scegliIniziale(statoIniziale(), 0)
  expect(usaCura(piena).cure).toBe(piena.cure)
})

test('le lotte danno monete e al Centro cure si comprano cure', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, modo: 'lotta', nemico: { sp: 'piumino', lvl: 4, xp: 0, hp: 1 } }
  s = azione(s, 0, () => 0.5)
  expect(s.monete).toBe(8)
  expect(compraCura({ ...s, monete: CURA_PREZZO }).cure).toBe(s.cure)
  const centro = { ...s, x: CENTRO.x, y: CENTRO.y, monete: CURA_PREZZO }
  const dopo = compraCura(centro)
  expect(dopo.cure).toBe(s.cure + 1)
  expect(dopo.monete).toBe(0)
  expect(compraCura({ ...centro, monete: 1 }).cure).toBe(s.cure)
})

test('le super cure si comprano solo nelle Vette Gelate e ridanno 50 PS', () => {
  const s = scegliIniziale(statoIniziale(), 0)
  const centro = { ...s, x: CENTRO.x, y: CENTRO.y, monete: SUPER_PREZZO }
  expect(compraCura(centro, true).cureForti).toBe(0)
  const vette = compraCura({ ...centro, mondo: 1 }, true)
  expect(vette.cureForti).toBe(1)
  expect(vette.monete).toBe(0)
  const ferito = { ...vette, squadra: [{ ...vette.squadra[0]!, lvl: 20, hp: 10 }] }
  const curato = usaCura(ferito, () => 0.5, true)
  expect(curato.squadra[0]!.hp).toBe(60)
  expect(curato.cureForti).toBe(0)
  expect(curato.cure).toBe(ferito.cure)
})

test('X usa la super cura anche in lotta', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, cureForti: 1, modo: 'lotta', nemico: { sp: 'piumino', lvl: 2, xp: 0, hp: 20 }, squadra: [{ ...s.squadra[0]!, hp: 5 }] }
  expect(tasto(s, { key: 'x' }).cureForti).toBe(0)
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

test('le sfere si comprano al negozio: le mega solo nelle Vette Gelate', () => {
  const s = { ...scegliIniziale(statoIniziale(), 0), x: CENTRO.x, y: CENTRO.y, monete: SFERA_PREZZO + MEGA_PREZZO }
  const dopo = compra(s, 'sfera')
  expect(dopo.sfere).toBe(s.sfere + 1)
  expect(dopo.monete).toBe(MEGA_PREZZO)
  expect(compra(dopo, 'mega').megaSfere).toBe(0)
  expect(compra({ ...dopo, mondo: 1 }, 'mega').megaSfere).toBe(1)
  // Il Centro cure non ricarica più le sfere
  const vuoto = { ...s, sfere: 0, x: CENTRO.x + 1 }
  expect(muovi(vuoto, -1, 0).sfere).toBe(0)
  // Il negozio si apre con M e si compra col numero
  const negozio = tasto(s, { key: 'm' })
  expect(negozio.negozio).toBe(true)
  expect(tasto(negozio, { key: '2' }).sfere).toBe(s.sfere + 1)
})

test('gli allenatori sfidano con la loro squadra', () => {
  let s = scegliIniziale(statoIniziale(), 0)
  s = { ...s, squadra: [{ ...s.squadra[0]!, lvl: 50, hp: 500 }] }
  s = sfida(s, () => 0.5)
  expect(s.modo).toBe('lotta')
  expect(s.allenatore?.squadra.length).toBe(1)
  // niente cattura e niente fuga contro un allenatore
  expect(lancia(s, false, () => 0).modo).toBe('lotta')
  expect(azione(s, 3, () => 0).modo).toBe('lotta')
  const monete = s.monete
  s = azione({ ...s, nemico: { ...s.nemico!, hp: 1 } }, 0, () => 0.5)
  expect(s.modo).toBe('lotta')
  expect(s.allenatore?.squadra.length).toBe(0)
  s = azione({ ...s, nemico: { ...s.nemico!, hp: 1 } }, 0, () => 0.5)
  expect(s.modo).toBe('mappa')
  expect(s.allenatore).toBeNull()
  expect(s.monete).toBeGreaterThan(monete)
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
    await ui.key({ in: 'gioco', key: '1' })
    expect(await ui.find({ in: 'gioco', text: /Braciotto/ })).toBeTruthy()
    await ui.key({ in: 'gioco', key: '2' })
    expect(await ui.find({ in: 'gioco', text: /Frecce\/WASD/ })).toBeTruthy()
    expect(salvati.length).toBe(1)
    expect(salvati[0].partite[0].squadra[0].sp).toBe('goccetto')
    // un passo e poi P: la partita si salva con la nuova posizione e si torna al menu
    await ui.key({ in: 'gioco', key: 'left' })
    await ui.key({ in: 'gioco', key: 'p' })
    expect(await ui.find({ in: 'gioco', text: /menu principale/ })).toBeTruthy()
    expect(salvati.at(-1).partite[0].x).toBe(salvati[0].partite[0].x - 1)
    await ui.unmount()
  })
}
