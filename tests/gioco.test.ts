import { test, expect } from 'claude-code/testing'
import { statoIniziale, scegliIniziale, muovi, azione, efficacia, MAPPA, SPECIE } from '../hooks/gioco.tsx'

test('la mappa è rettangolare e ogni specie ha una mossa', () => {
  for (const riga of MAPPA) expect(riga.length).toBe(MAPPA[0]!.length)
  expect(Object.keys(SPECIE).length).toBe(9)
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
