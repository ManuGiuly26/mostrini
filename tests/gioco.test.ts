import { test, expect } from 'claude-code/testing'
import {
  statoIniziale, scegliIniziale, muovi, azione, efficacia, apriScambio, normalizza, portaleAperto, specieDel, catalogoDel, usaCura, tasto, compraCura, cambiaInLotta, CURA_PREZZO, SUPER_PREZZO, CENTRO,
  MAPPA, MONDI, SPECIE,
} from '../hooks/gioco.tsx'

test('la mappa è rettangolare e ogni specie ha una mossa', () => {
  for (const m of MONDI) for (const riga of m.mappa) expect(riga.length).toBe(MAPPA[0]!.length)
  expect(specieDel(0).length).toBe(9)
  expect(specieDel(1).length).toBe(9)
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

for (const surface of ['terminal', 'desktop'] as const) {
  test(`il pannello disegna il gioco e salva (${surface})`, async ($, on) => {
    const salvati: unknown[] = []
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
    expect(await ui.find({ in: 'gioco', text: /Braciotto/ })).toBeTruthy()
    await ui.key({ in: 'gioco', key: '2' })
    expect(await ui.find({ in: 'gioco', text: /Frecce\/WASD/ })).toBeTruthy()
    expect(salvati.length).toBe(1)
    await ui.unmount()
  })
}

test('sul telefono si gioca con i pulsanti, un passo per tocco', async ($, on) => {
  const salvati: any[] = []
  on('store.get', async () => ({ value: undefined }))
  on('store.set', async (_$, e) => {
    salvati.push((e as any).value)
    return { value: undefined }
  })
  const ui = await ($.ui as any).mount({
    plugin: 'mostrini',
    surface: 'mobile',
    component: 'Pane',
    requestId: 'mostrini',
    props: { title: 'Mostrini', isFocused: true, bodyColumns: 40, placement: 'dock' },
  })
  await ui.press({ key: 't1' })
  const scelto = salvati.at(-1)
  expect(scelto.squadra[0].sp).toBe('braciotto')
  await ui.press({ key: 'tleft' })
  expect(salvati.at(-1).x).toBe(scelto.x - 1)
  await ui.unmount()
})
