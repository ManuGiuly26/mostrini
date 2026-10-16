# Mostrini 🌿

**Il tuo prompt sta girando? Vai a caccia di Mostrini.**

Mostrini è un mini gioco di creature da catturare che si apre in un pannello dentro Claude Code. Mentre Claude lavora, tu esplori l'erba alta, affronti creature selvatiche in lotte a turni e provi a completare il catalogo. Le partite durano pochi secondi, quindi puoi mollare tutto appena Claude ha finito e riprendere dopo: la partita si salva da sola.

## Cosa trovi

- **3 starter tra cui scegliere:** Braciotto (fuoco), Goccetto (acqua) e Germoglio (erba)
- **9 Mostrini da catturare**, compreso il raro Scintillo di tipo elettro
- **Lotte a turni veloci** con vantaggi di tipo: fuoco batte erba, erba batte acqua, acqua batte fuoco
- **Livelli ed esperienza**, una squadra fino a 4 Mostrini e un Centro cure per rimetterti in sesto
- **Salvataggio automatico** tra una sessione e l'altra

## Installazione

**App desktop di Claude:** clicca **+** accanto alla casella del prompt, poi **Plugins**, **Add marketplace** e inserisci `ManuGiuly26/mostrini`. Infine clicca **Add plugin** su Mostrini.

**Claude Code nel terminale:**

```
/plugin install mostrini --marketplace ManuGiuly26/mostrini
```

Rispondi `y` quando ti chiede di aggiungere il marketplace e scegli lo scope **user**: così Mostrini è disponibile in tutte le tue sessioni.

**Da una shell:**

```
claude plugin install mostrini --marketplace ManuGiuly26/mostrini
```

## Come si gioca

Scrivi `/mostrini` in una sessione di Claude Code, poi clicca sul pannello che si apre.

| Dove | Tasti |
| --- | --- |
| Inizio | `1` `2` `3` per scegliere lo starter |
| Mappa | Frecce o `WASD` per muoverti, `Q` per cambiare il Mostrino in testa |
| Lotta | `1` Botta, `2` mossa del tipo, `3` Sfera, `4` Scappa, oppure frecce + `Invio` |

Cammina nell'erba alta (`,,`) per incontrare i Mostrini selvatici. Indeboliscili prima di lanciare la sfera: più sono stanchi, più è facile catturarli. Quando finisci le sfere o la squadra è a terra, passa dal Centro cure (`C`).

Funziona nel terminale e nell'app desktop di Claude, non nell'app mobile né in VS Code.
