# Refactoring
La parola __refactoring__ si riferisce ad un insieme di tecniche applicate a del codice funzionante, per migliorarne il design. Leggendo questa definizione, sono due le cose su cui ci si dovrebbe soffermare e riflettere:

1. Il Refactoring è un processo che si applica a posteriori, dopo aver scritto il codice. Anche se non esiste una rigida regola per questo. Si potrebbe anche poter pensare ad integrare il processo di refactoring anche all'interno di un processo di sviluppo agile.

2. E' importante concepire che cosa si intenda con _design_ del codice. Molto spesso, capita di sentire sviluppatori per i quali è sufficiente che il codice funzioni e superi i test perché questo possa essere rilasciato. Mi trovo molto in disaccordo con questa pratica, sopratutto in ambito lavorativo, in quanto ritengo che sia semplice scrivere codice che una macchina comprenda, ma è molto più difficile scrivere del codice che un essere umano comprenda.

Riguardo l'ultimo punto, vorrei che chi legga il contenuto di questa repository, comprenda come scrivere del codice con del buon design, semplifichi la vita non soltato a chi verrà dopo di lui, ma anche allo sviluppatore stesso. Molto spesso in passato, nella mia esperienza accademica o anche lavorativa, mi è capitato di scrivere del codice, dimenticare quello che ho fatto, e successivamente quando ci sono tornato sopra, non comprendevo bene quello che io stesso ho fatto, e spendevo tempo inutilmente ad analizzare qualcosa che invece avrei potuto scrivere meglio.

Per uno studio approfondito di questa tecnica, rimando assolutamente al libro di _Martin Fowler_ _L'arte del Refactoring_, [Link libro su Amazon](https://www.amazon.it/refactoring-tecniche-migliorare-design-leggibilità/dp/8850334834/ref=sr_1_1?adgrpid=71417006597&hvadid=353839857768&hvdev=c&hvlocphy=1008080&hvnetw=g&hvqmt=e&hvrand=15678786049251969389&hvtargid=kwd-783002449852&hydadcr=29063_1716363&keywords=l+arte+del+refactoring&qid=1688812449&sr=8-1), che consiglio a qualsiasi sviluppatore di leggerlo con attenzione se si vuole migliorare nel proprio lavoro.

![Copertina del libro usato per la repository](Copertina.jpeg)

## Organizzazione della repository
La repository è organizzata in base ai topic più rilvanti per la rifattorizzazione, e per ciascuno di questi è presente un esempio del problema che si vuole risolvere e la relativa soluzione. Inoltre, sono presenti un file di descizione del problema, ed un file di test utilizzato per avvalorare il processo di rifattorizzazione. 

Il testing, infatti, ricopre un ruolo fondamentale nel processo di rifattorizzazione, motivo per il quale spesso si utilizza un approccio TDD, in cui, per ciascuna modifica si eseguono nuovamente i test.

Di seguito le cartelle che compongono la repository sono:

* [1. Simple Refactoring Mehods](/1.%20Simple%20Refactoring%20Methods/), che contiene i metodi di rifattorizzazione più comunemente utilizzati e che sicuramente almeno una volta anche inconsciamente avremmo usato. 



### Leggere attentamente !
Ci tengo però a sottolineare che la repository è semplicemente una rielaborazione personale di quello che troverete nel testo, e quindi non va considerata come un valido sostituto alla teoria.