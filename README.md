# Mostrini 🌿

**Il tuo prompt sta girando? Vai a caccia di Mostrini.**

Mostrini è un mini gioco di creature da catturare che si apre in un pannello dentro Claude Code. Mentre Claude lavora, tu esplori l'erba alta, affronti creature selvatiche e allenatori in lotte a turni e provi a completare il catalogo. Le partite durano pochi secondi, quindi puoi mollare tutto appena Claude ha finito e riprendere dopo: la partita si salva da sola.

## Cosa trovi

- **Menu principale con 3 partite:** all'apertura scegli quale partita giocare, ne inizi una nuova in una casella vuota o ne cancelli una (con conferma). Ogni partita si salva da sola nella sua casella, e con `P` la salvi e torni al menu. In alto a destra c'è la versione del gioco.
- **Grafica in pixel art** nell'app desktop, a risoluzione doppia: Mostrini con volume, contorni e facce espressive; per ogni mondo caselle con alberi, abeti innevati, cactus, salici o colonne, rive dell'acqua, il Centro cure come casetta e portali a spirale; lotte con paesaggi (colline, montagne, dune col sole, alberi della palude, rovine sotto la luna) e la barra dell'esperienza. Nel terminale il gioco resta in stile ASCII.
- **3 starter tra cui scegliere:** Braciotto (fuoco), Goccetto (acqua) e Germoglio (erba)
- **5 mondi e 45 Mostrini**, ognuno con la sua fascia di livelli:
  - **Prateria** (Lv 2-7): 9 Mostrini, compreso il raro Scintillo di tipo elettro
  - **Vette Gelate** (Lv 8-14): 9 Mostrini nuovi, compreso il raro Tuonello, con due tipi in più (ghiaccio e roccia)
  - **Deserto Rovente** (Lv 15-21): tra cactus e oasi, con il tipo terra e il raro Mummietto
  - **Palude Nebbiosa** (Lv 22-28): acquitrini e funghi, con il tipo veleno e il raro Draghetto
  - **Rovine Spettrali** (Lv 29-36): colonne spezzate sotto un cielo viola, con il tipo spettro e il raro Eclissino
- **Palestre:** in ogni mondo c'è una palestra (la casa col tetto blu, `G`). Ogni volta che ci entri affronti la sfida successiva: prima n+2 allievi, uno alla volta (3 nella Prateria, 4 sulle Vette, fino a 7 nelle Rovine), poi il capopalestra. Il capopalestra ha i Mostrini del tipo della sua palestra un livello sopra la fascia del mondo, e per ultimo il Mostrino raro, ancora più forte. Battendolo vinci la sua medaglia e un premio grosso. Le vittorie restano anche se perdi: torni al Centro cure e riprendi da dove eri.
  - Prateria: Capopalestra Flora (erba), Medaglia Foglia
  - Vette Gelate: Capopalestra Brina (ghiaccio), Medaglia Cristallo
  - Deserto Rovente: Capopalestra Ambra (terra), Medaglia Duna
  - Palude Nebbiosa: Capopalestra Ortica (veleno), Medaglia Miasma
  - Rovine Spettrali: Capopalestra Corvino (spettro), Medaglia Eclisse: chi la vince è il campione di Mostrini
- **Portali:** la medaglia della palestra apre il portale viola (`P`) verso il mondo dopo. Il portale verde acqua (`R`) riporta al mondo prima.
- **Livelli legati al mondo:** i Mostrini selvatici e gli allenatori hanno i livelli del mondo in cui ti trovi, non quelli della tua squadra. Gli allenatori stanno nella metà alta della fascia.
- **Bioma:** ogni mondo potenzia del 5% le mosse di due tipi e indebolisce del 5% quelle di altri due. In lotta le mosse favorite hanno ▲5%, quelle sfavorite ▼5%, e sotto la mappa trovi il bioma del mondo.
  - Prateria: erba e normale +5%, ghiaccio e spettro -5%
  - Vette Gelate: ghiaccio e roccia +5%, fuoco ed erba -5%
  - Deserto Rovente: fuoco e terra +5%, acqua e ghiaccio -5%
  - Palude Nebbiosa: veleno e acqua +5%, fuoco e roccia -5%
  - Rovine Spettrali: spettro e roccia +5%, normale ed erba -5%
- **Evoluzione in due tappe:** ogni Mostrino si evolve al livello 15 e arriva alla forma finale al 35, cambiando nome ogni volta (Braciotto → Bracione → Pirodrago, Goccetto → Goccione → Diluvione, Germoglio → Fogliardo → Arborone...).
  - **Evoluto** (Lv 15): 20% in più di PS e attacco, più grande, con le braccine, lo sguardo deciso e i colori più intensi.
  - **Forma finale** (Lv 35): 45% in più di PS e attacco, ancora più grande, con corona e ali, e in lotta un alone dorato.
  - Dal Deserto in poi gli allenatori hanno Mostrini già evoluti (nelle Rovine, dal livello 35, nella forma finale), e circa un selvatico su tre lo è.
- **Catalogo** (tasto `L` sulla mappa): una pagina per mondo con i suoi 9 Mostrini. Nel catalogo entrano solo i Mostrini che **catturi**: hanno la sfera, il disegno a colori e la linea evolutiva. Quelli che hai incontrato o sconfitto senza catturarli sono **visti**: a colori, ma senza sfera. Quelli che mancano sono un'ombra col nome e il tipo, così sai chi cercare. Nei mondi non ancora aperti anche il nome resta `???`. Con le frecce scegli un Mostrino e leggi la sua scheda, con `1`-`5` cambi mondo, con `L` o `0` chiudi.
- **Catalogo per mondo:** il conto in alto nella mappa considera i Mostrini catturati di quel mondo e dei mondi prima: 9 nella Prateria, 18 nelle Vette Gelate e così via fino a 45.
- **Allenatori:** ogni tanto, nell'erba alta o sul sentiero, un allenatore ti sfida con la sua squadra (2 Mostrini nella Prateria, 3 negli altri mondi). Non puoi catturare i suoi Mostrini né scappare; se li batti tutti vinci un premio in monete.
- **In lotta**, sotto il tuo riquadro, una sfera per ogni Mostrino della tua squadra (grigia se è esausto). Una piccola sfera accanto al nome dell'avversario ti dice che quella specie l'hai già catturata (non basta averla sconfitta). Contro un allenatore vedi anche quanti Mostrini gli restano. Con `5` dai il cambio a un altro Mostrino della squadra: ti costa il turno.
- **Squadra e box:** una squadra può avere fino a **3 Mostrini**: quelli che catturi in più finiscono nel **box**. Con `B` apri il box: premi il numero del Mostrino che vuoi far entrare e poi il numero di quello della squadra che deve uscire. Nel box, `R` passa a **rilascia**: il numero che premi libera quel Mostrino (resta comunque nel catalogo). `B` o `0` chiude il box.
- **Lotte a turni veloci** con vantaggi di tipo: fuoco batte erba e ghiaccio, erba batte acqua, roccia e terra, acqua batte fuoco, roccia e terra, roccia batte fuoco, ghiaccio ed elettro, ghiaccio batte erba e terra, terra batte fuoco, elettro, roccia e veleno, veleno batte erba, spettro batte spettro e veleno
- **Livelli ed esperienza per tutta la squadra:** chi lotta prende tutta l'esperienza, gli altri Mostrini in forma la metà
- **Monete:** ogni lotta vinta ti dà monete (il doppio del livello del Mostrino sconfitto), più il premio quando batti un allenatore
- **Negozio al Centro cure** (tasto `M` quando ci sei sopra): `1` per le sfere, `2` per le cure, poi il numero per comprare (`0` torna indietro). Non ti blocca: appena ti muovi il negozio si chiude. Ogni mondo aggiunge una sfera e una cura più forti di quelle prima:

  | Mondo | Sfera (cattura) | Cura |
  | --- | --- | --- |
  | Prateria | Sfera (x1, 10 monete) | Cura (+20 PS, 15 monete) |
  | Vette Gelate | Mega sfera (x1,5, 25 monete) | Super cura (+50 PS, 40 monete) |
  | Deserto Rovente | Ultra sfera (x2, 45 monete) | Iper cura (+100 PS, 80 monete) |
  | Palude Nebbiosa | Iper sfera (x2,6, 70 monete) | Mega cura (+180 PS, 130 monete) |
  | Rovine Spettrali | Sfera stellare (x3,5, 100 monete) | Cura totale (tutti i PS, 200 monete) |

  Si tengono fino a 20 sfere e 10 cure di ogni tipo. Si parte con 5 sfere e 2 cure.
- **Catturare è più difficile più vai avanti:** la probabilità scende in ogni mondo (le Rovine sono circa la metà della Prateria). Indebolire il Mostrino e usare sfere migliori la alza; nello zaino vedi la probabilità di ogni sfera.
- **Sfere e cure in lotta:** `3` apre lo zaino delle sfere e `4` quello delle cure (anche `C`). Nello zaino ci sono solo quelle che hai, ognuna col suo numero, quante te ne restano e cosa fa: premi il numero per usarla, `0` per tornare al menu della lotta. Lanciare e curare costano il turno.
- **Cure sulla mappa:** `C` apre lo zaino delle cure per il Mostrino in testa. A volte un Mostrino selvatico sconfitto lascia una cura.
- **Centro cure** (la casetta con la croce) in ogni mondo: passandoci sopra la squadra torna in forma.
- **Salvataggio automatico** tra una sessione e l'altra, con catalogo, medaglie e zaino

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
| Mappa | Frecce o `WASD` per muoverti, `Q` per cambiare il Mostrino in testa, `B` per aprire il box (numeri per scambiare, `R` per rilasciare), `C` per scegliere una cura, `M` sul Centro cure per il negozio (un passo lo chiude), `L` per il catalogo, `P` per salvare e tornare al menu principale. Si entra in palestra camminando sulla `G` |
| Catalogo | Frecce per scegliere un Mostrino (oltre l'ultimo si passa al mondo dopo), `1`-`5` per cambiare mondo, `L` o `0` per chiudere |
| Lotta | `1` Botta, `2` mossa del tipo, `3` sfere (poi il numero della sfera), `4` cure (poi il numero della cura; anche `C`), `5` Cambia Mostrino (poi il numero di chi entra), `6` Scappa, oppure frecce + `Invio`. Nello zaino e nel cambio `0` annulla |

Cammina nell'erba alta per incontrare i Mostrini selvatici. Indeboliscili prima di lanciare la sfera: più sono stanchi, più è facile catturarli. Quando la squadra è a terra passa dal Centro cure, e quando finisci le sfere comprane altre al negozio.

Batti la palestra della Prateria per aprire il portale verso le Vette Gelate, poi quella delle Vette per il Deserto Rovente, e così via fino alle Rovine Spettrali, dove la palestra di Corvino ti fa campione. Il portale `R` di ogni mondo ti riporta a quello prima.

**Partite delle versioni prima della 0.8.0:** sfere e cure passano nello zaino nuovo (con mega sfere e super cure nella seconda casella). Nel catalogo restano le specie che hai ancora in squadra o nel box, le altre diventano viste. Le palestre dei mondi che avevi già lasciato alle spalle contano come vinte; quella del mondo dove sei va battuta per andare avanti.

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
