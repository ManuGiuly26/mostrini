# Mostrini 🌿

**Il tuo prompt sta girando? Vai a caccia di Mostrini.**

Mostrini è un mini gioco di creature da catturare che si apre in un pannello dentro Claude Code. Mentre Claude lavora, tu esplori l'erba alta, affronti creature selvatiche e allenatori in lotte a turni e provi a completare il catalogo. Le partite durano pochi secondi, quindi puoi mollare tutto appena Claude ha finito e riprendere dopo: la partita si salva da sola.

## Cosa trovi

- **Menu principale con 3 partite:** all'apertura scegli quale partita giocare, ne inizi una nuova in una casella vuota o ne cancelli una (con conferma). Ogni partita si salva da sola nella sua casella, e con `P` la salvi e torni al menu.
- **Grafica in pixel art** nell'app desktop: mappa, lotte e Mostrini disegnati come in un gioco 2D. Nel terminale il gioco resta in stile ASCII.
- **3 starter tra cui scegliere:** Braciotto (fuoco), Goccetto (acqua) e Germoglio (erba)
- **5 mondi e 45 Mostrini**, ognuno con la sua fascia di livelli:
  - **Prateria** (Lv 2-7): 9 Mostrini, compreso il raro Scintillo di tipo elettro
  - **Vette Gelate** (Lv 8-14): 9 Mostrini nuovi, compreso il raro Tuonello, con due tipi in più (ghiaccio e roccia)
  - **Deserto Rovente** (Lv 15-21): tra cactus e oasi, con il tipo terra e il raro Mummietto
  - **Palude Nebbiosa** (Lv 22-28): acquitrini e funghi, con il tipo veleno e il raro Draghetto
  - **Rovine Spettrali** (Lv 29-36): colonne spezzate sotto un cielo viola, con il tipo spettro e il raro Eclissino
- **Portali:** completando il catalogo di un mondo si apre il suo portale viola (`P`) verso il mondo dopo. Il portale verde acqua (`R`) riporta al mondo prima.
- **Livelli legati al mondo:** i Mostrini selvatici e gli allenatori hanno i livelli del mondo in cui ti trovi, non quelli della tua squadra. Gli allenatori stanno nella metà alta della fascia.
- **Bioma:** ogni mondo potenzia del 5% le mosse di due tipi e indebolisce del 5% quelle di altri due. In lotta le mosse favorite hanno ▲5%, quelle sfavorite ▼5%, e sotto la mappa trovi il bioma del mondo.
  - Prateria: erba e normale +5%, ghiaccio e spettro -5%
  - Vette Gelate: ghiaccio e roccia +5%, fuoco ed erba -5%
  - Deserto Rovente: fuoco e terra +5%, acqua e ghiaccio -5%
  - Palude Nebbiosa: veleno e acqua +5%, fuoco e roccia -5%
  - Rovine Spettrali: spettro e roccia +5%, normale ed erba -5%
- **Evoluzione:** al livello 15 ogni Mostrino si evolve. Cambia nome (Braciotto diventa Bracione, Goccetto Goccione, Germoglio Fogliardo...), ha il 20% in più di PS e di attacco, e nella pixel art porta una corona, ha colori più intensi e in lotta un alone dorato. Dal Deserto in poi gli allenatori hanno Mostrini già evoluti, e circa un selvatico su tre lo è.
- **Catalogo per mondo:** conta i Mostrini di quel mondo e dei mondi prima: 9 nella Prateria, 18 nelle Vette Gelate e così via fino a 45. Un Mostrino entra nel catalogo appena lo catturi o lo sconfiggi, anche nella forma evoluta.
- **Allenatori:** ogni tanto, nell'erba alta o sul sentiero, un allenatore ti sfida con la sua squadra (2 Mostrini nella Prateria, 3 negli altri mondi). Non puoi catturare i suoi Mostrini né scappare; se li batti tutti vinci un premio in monete.
- **In lotta**, sotto il tuo riquadro, una sfera per ogni Mostrino della tua squadra (grigia se è esausto). Una piccola sfera accanto al nome dell'avversario ti dice che quella specie è già nel tuo catalogo. Contro un allenatore vedi anche quanti Mostrini gli restano. Con `5` dai il cambio a un altro Mostrino della squadra: ti costa il turno.
- **Squadra e box:** una squadra può avere fino a **3 Mostrini**: quelli che catturi in più finiscono nel **box**. Con `B` apri il box: premi il numero del Mostrino che vuoi far entrare e poi il numero di quello della squadra che deve uscire. Nel box, `R` passa a **rilascia**: il numero che premi libera quel Mostrino (resta comunque nel catalogo). `B` o `0` chiude il box.
- **Lotte a turni veloci** con vantaggi di tipo: fuoco batte erba e ghiaccio, erba batte acqua, roccia e terra, acqua batte fuoco, roccia e terra, roccia batte fuoco, ghiaccio ed elettro, ghiaccio batte erba e terra, terra batte fuoco, elettro, roccia e veleno, veleno batte erba, spettro batte spettro e veleno
- **Livelli ed esperienza per tutta la squadra:** chi lotta prende tutta l'esperienza, gli altri Mostrini in forma la metà
- **Monete:** ogni lotta vinta ti dà monete (il doppio del livello del Mostrino sconfitto), più il premio quando batti un allenatore
- **Negozio al Centro cure** (tasto `M` quando ci sei sopra), con i prezzi in monete. Non ti blocca: appena ti muovi il negozio si chiude.
  - **Prateria:** Cura (+20 PS, 15 monete) e Sfera (10 monete)
  - **Dalle Vette Gelate in poi:** anche Super cura (+50 PS, 40 monete) e Mega sfera (25 monete, cattura più facilmente)
  - Si tengono al massimo 5 cure e 5 super cure, 10 sfere e 10 mega sfere. Si parte con 5 sfere e 2 cure.
- **Sfere:** non si ricaricano più da sole, si comprano al negozio. In lotta `3` lancia una sfera e `G` una mega sfera; quante te ne restano è scritto nel menu della lotta.
- **Cure:** `C` ridà 20 PS al Mostrino in testa e `X` (super cura) 50 PS. Funzionano solo se ne hai, e in lotta costano il turno. A volte un Mostrino selvatico sconfitto lascia una cura.
- **Centro cure** (la casetta con la croce) in ogni mondo: passandoci sopra la squadra torna in forma.
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

Scrivi `/mostrini` in una sessione di Claude Code, poi clicca sul pannello che si apre: parti dal menu principale.

Mentre Claude lavora i comandi aspettano in coda, quindi Mostrini **si apre da solo ogni volta che mandi un prompt**: il cursore resta nella casella del prompt, clicca sul pannello quando vuoi giocare. Per spegnere (o riaccendere) l'apertura automatica scrivi `/mostrini auto`.

| Dove | Tasti |
| --- | --- |
| Menu principale | `1` `2` `3` per giocare quella partita (o iniziarne una nuova se è vuota), `Invio` per continuare l'ultima, `D` e poi il numero per cancellare una partita (va confermato premendo di nuovo lo stesso numero) |
| Inizio | `1` `2` `3` per scegliere lo starter |
| Mappa | Frecce o `WASD` per muoverti, `Q` per cambiare il Mostrino in testa, `B` per aprire il box (numeri per scambiare, `R` per rilasciare), `C` per usare una cura, `X` per usare una super cura, `M` sul Centro cure per il negozio (un passo lo chiude), `P` per salvare e tornare al menu principale |
| Lotta | `1` Botta, `2` mossa del tipo, `3` Sfera, `4` Scappa, `5` Cambia Mostrino (poi il numero di chi entra, `0` annulla), `G` Mega sfera, `C` cura, `X` super cura, oppure frecce + `Invio` |

Cammina nell'erba alta per incontrare i Mostrini selvatici. Indeboliscili prima di lanciare la sfera: più sono stanchi, più è facile catturarli. Quando la squadra è a terra passa dal Centro cure, e quando finisci le sfere comprane altre al negozio.

Completa il catalogo della Prateria (9/9) per aprire il portale verso le Vette Gelate, poi quello delle Vette (18/18) per il Deserto Rovente, e così via fino alle Rovine Spettrali. Il portale `R` di ogni mondo ti riporta a quello prima.

**Sul telefono non si può giocare:** l'app Claude per telefono non mostra il pannello di Mostrini. Se scrivi `/mostrini` dal telefono te lo dice; gioca dal computer.

Funziona nel terminale e nell'app desktop di Claude, non sul telefono né in VS Code.

## Cosa fa sul tuo computer

Mostrini **non invia dati a nessuno** e non si collega a internet. Quello che fa:

- **Salva le partite** (fino a 3: squadra, box, catalogo, monete, sfere e cure) nello spazio di archiviazione locale del plugin, sul tuo computer, così riprendi dove eri rimasto.
- **Non legge né modifica** i tuoi prompt, la conversazione con Claude, i tuoi file o altri plugin. L'unico gancio sui prompt (`prompt.submit`) si limita ad aprire il pannello del gioco dopo che hai inviato un prompt, e lascia il prompt esattamente com'è. Si spegne con `/mostrini auto`.
- Aggiunge un solo comando, `/mostrini`, per aprire il pannello (e `/mostrini auto` per accendere o spegnere l'apertura automatica).
- Disegna la grafica in pixel art con immagini generate dal codice stesso: non scarica nulla.
- Contiene anche i test del gioco (cartella `tests/`): non fanno parte del gioco e non vengono eseguiti quando giochi.

## Licenza

MIT, vedi il file `LICENSE`. Creato da ManuGiuly26.
