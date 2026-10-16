import type { Register } from 'claude-code'

const PANE = 'mostrini'
const TITLE = 'Mostrini'
const SAVE_KEY = 'salvataggio'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'mostrini',
      description: 'Apri il gioco Mostrini in un pannello mentre aspetti',
    })

    return next(e)
  })

  on('command.run', { command: 'mostrini' }, async $ => {
    await $.ui.open({ id: PANE, title: TITLE, focus: true })

    return { text: 'Mostrini aperto. Clicca sul pannello per giocare.' }
  })

  // Il gioco salva da solo: la partita resta anche tra una sessione e l'altra.
  on('ui.message', { requestId: PANE }, async ($, e, next) => {
    const data = e.data as { type?: string; save?: unknown } | null
    if (data && data.type === 'save' && data.save) {
      await $.store.set(SAVE_KEY, data.save)
    } else if (data && data.type === 'reset') {
      await $.store.delete(SAVE_KEY)
    }

    return next(e)
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Client } = $.ui.resolve(e) as any
    if (!Client) {
      return (
        <Box flexDirection="column">
          <Text>Mostrini si gioca nel terminale o nell'app desktop.</Text>
        </Box>
      )
    }
    const save = (await $.store.get(SAVE_KEY)) ?? null

    return (
      <Box flexDirection="column" flexGrow={1}>
        <Client key="gioco" module="./gioco.tsx" props={{ save }} flexGrow={1} />
      </Box>
    )
  })
}
