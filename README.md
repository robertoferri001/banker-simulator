# 🏦 Banker Simulator - Simulatore Bancario Realistico

Un gioco di simulazione bancaria immersivo e realistico dove impersoni il ruolo di un banchiere professionista. Gestisci clienti veri, esegui operazioni bancarie autentiche e mantieni la tua reputazione al massimo!

## 📋 Caratteristiche Principali

### 🎮 Gameplay Realistico
- **Chat interattiva** tra banchiere e cliente con dialoghi naturali
- **8 clienti diversi** con profili, account e esigenze differenti
- **17 operazioni bancarie** realistiche disponibili
- **Più operazioni per cliente** - i clienti possono fare più transazioni
- **Tutorial opzionale** ma skippabile per apprendere i meccanismi
- **Modalità libera** per giocare senza vincoli

### 💼 Operazioni Bancarie Disponibili
1. **Prelievo Contante** - Estrai denaro dal conto
2. **Versamento** - Versa denaro nel conto
3. **Bonifico Bancario** - Trasferisci fondi verso altri conti
4. **Estratto Conto** - Richiedi il rendiconto del conto
5. **Richiesta Carta** - Ordina una nuova carta di credito/debito
6. **Pagamento Bollettini** - Paga utenze e bollette
7. **Blocco Carta** - Blocca carte smarrite o rubate
8. **Apertura Nuovo Conto** - Apri un nuovo conto bancario
9. **Richiesta Prestito** - Richiedi un prestito personale
10. **Mutuo Ipotecario** - Richiedi un mutuo per immobili
11. **Bonifico Estero** - Trasferisci fondi all'estero
12. **Certificato di Deposito** - Sottoscrivi un CD a termine
13. **Acquisto Titoli** - Acquista azioni e titoli
14. **Consulenza Finanziaria** - Richiedi consulenza da un esperto
15. **Richiesta Fido** - Richiedi uno scoperto di conto
16. **Attivazione Servizi Online** - Attiva internet banking e app

### 👥 Clienti Unici
Ogni cliente ha:
- **Profilo realistico** con nome, età, foto avatar
- **Conto bancario specifico** con saldo realistico
- **Saluto personalizzato** con esigenze unique
- **Operazioni disponibili** basate sul loro profilo

### 📊 Sistema di Statistiche
- **Clienti serviti** - Traccia il numero di clienti processati
- **Reputazione** - Mantieni una buona reputazione servendo correttamente
- **Cronologia operazioni** - Registra tutte le transazioni effettuate
- **Difficoltà variabile** - Adatta il gioco al tuo livello

## 🎯 Come Giocare

### Inizio
1. Apri `index.html` in un browser web moderno
2. Scegli tra "Inizia con Tutorial" oppure "Inizia Subito"
3. Se scegli il tutorial, impara i meccanismi di base (puoi skipparlo in qualsiasi momento)

### Durante il Gioco
1. **Chiama un cliente** - Clicca "Chiama Cliente" per far entrare il prossimo
2. **Interagisci** - Il cliente ti saluta, rispondi in maniera professionale nella chat
3. **Seleziona operazione** - Scegli l'operazione che il cliente desidera dal pannello a sinistra
4. **Compila modulo** - Inserisci tutti i dati richiesti con attenzione
5. **Conferma** - Clicca "Conferma Operazione" per completare la transazione
6. **Registra** - L'operazione viene registrata e il cliente riceve conferma

### Suggerimenti
- ⭐ Mantieni la reputazione alta servendo clienti professionalmente
- 📋 Verifica sempre i dati prima di confermare
- 💰 Rispetta i limiti di prelievo e versamento
- 🎯 Un cliente può fare più operazioni prima di partire

## 🛠️ Tecnologie Utilizzate

- **HTML5** - Struttura del gioco
- **CSS3** - Styling realistico e animazioni
- **JavaScript Vanilla** - Logica di gioco pura, no dipendenze

## 📁 Struttura del Progetto

```
banker-simulator/
├── index.html          # File HTML principale
├── styles.css          # Foglio di stile completo
├── game.js             # Logica principale del gioco
├── gameData.js         # Database clienti e operazioni
└── README.md           # Questo file
```

### File HTML (index.html)
- Menu principale con opzioni di gioco
- Schermata di gioco principale con 3 aree:
  - Area cliente (info e chat)
  - Area operazioni (liste e moduli)
  - Piè di pagina con pulsanti di controllo
- Tutorial interattivo
- Menu di pausa
- Schermata impostazioni
- Schermata crediti

### File CSS (styles.css)
- Design realistico bancario con gradenti blu professionali
- Animazioni fluide per transizioni
- Chat box con messaggi stilizzati per cliente/banchiere
- Moduli responsivi per le operazioni
- Scrollbar personalizzato
- Supporto mobile (responsive design)

### File JavaScript (game.js)
- **Gestione stato del gioco** - Traccia clienti, reputazione, statistiche
- **Sistema chat** - Dialoghi interattivi realisti
- **Selezione operazioni** - Dinamica basata sul cliente
- **Validazione dati** - Controlla campi obbligatori e limiti
- **Elaborazione transazioni** - Processa operazioni e aggiorna stats
- **Sistema di pausa** - Pausa/riprendi il gioco in qualsiasi momento
- **Gestione menu** - Navigazione tra schermate

### File Dati (gameData.js)
- **clientsDatabase** - 8 clienti con profili dettagliati
- **bankOperations** - 17 operazioni bancarie complete
- **conversationDialogues** - Dialoghi realistici pre-scritti
- **tutorialSteps** - 8 step interattivi di tutorial
- **monetaryLimits** - Limiti di prelievo/versamento/trasferimenti
- **bankCommissions** - Commissioni realistiche
- **interestRates** - Tassi di interesse autentici
- **feedbackMessages** - Messaggi di sistema dinamici

## 🎨 Interfaccia Utente

### Colori Principali
- 🔵 **Blu Scuro** (#1e3a5f, #2d5a8c) - Header e elementi principali
- 🟢 **Verde** (#4CAF50) - Bottoni di azione
- 🔴 **Rosso** (#f44336) - Bottoni di cancellazione
- ⚪ **Bianco** (#ffffff) - Sfondo principale

### Componenti Chiave
- **Bank Logo** - 🏦 icona animata
- **Client Card** - Mostra info cliente corrente
- **Chat Box** - Conversazione cliente-banchiere
- **Operations Panel** - Lista operazioni disponibili
- **Operation Form** - Modulo dinamico per l'operazione
- **Status Bar** - Clienti serviti e reputazione

## 🔧 Impostazioni

Nel menu impostazioni puoi configurare:
- 🔊 **Volume musica** - Slider volume (0-100)
- 📊 **Difficoltà** - Facile, Normale, Difficile
- 🔔 **Effetti sonori** - Attiva/Disattiva suoni

## 📈 Sistema di Reputazione

- Inizi con **⭐⭐⭐⭐⭐** (5 stelle)
- Ogni operazione completata: **+0.2 stelle**
- Errori o operazioni non riuscite: **-0.5 stelle**
- La reputazione influenza la difficoltà delle operazioni successive

## 💡 Gameplay Tips

1. **Leggere attentamente** - Il cliente ti dirà sempre cosa vuole
2. **Essere professionali** - Usa tono cortese nella chat
3. **Verificare i dati** - Controlla IBAN, importi e dettagli prima di confermare
4. **Gestire il tempo** - Alcune operazioni hanno tempi di elaborazione realistici
5. **Diversificare** - Cerca di completare operazioni diverse per migliorare le skill
6. **Mantenere reputazione** - Una buona reputazione sblocca clienti VIP

## 🎓 Tutorial Interattivo

Il tutorial copre:
1. Benvenuto nel simulatore
2. Come chiamare un cliente
3. Interagire con il cliente
4. Selezionare un'operazione
5. Compilare moduli
6. Confermare operazioni
7. Monitorare statistiche
8. Progressione nel gioco

Ogni step ha una spiegazione chiara e un'icona illustrativa.

## 🌐 Browser Compatibilità

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📱 Responsive Design

Il gioco si adatta a:
- 🖥️ Desktop (1920x1080+)
- 💻 Laptop (1280x720+)
- 📱 Tablet (768x1024+) - Layout adattato
- 📱 Mobile - Grid colonna singola

## 🔐 Dati di Gioco

Tutti i dati sono salvati localmente:
- Cronologia clienti serviti
- Operazioni completate
- Reputazione attuale
- Statistiche di gioco

*Nota: I dati si resettano quando il gioco viene riavviato*

## 🚀 Come Eseguire

### Metodo 1: Locale
```bash
# Clona il repository
git clone https://github.com/robertoferri001/banker-simulator.git

# Entra nella directory
cd banker-simulator

# Apri index.html nel browser
open index.html  # macOS
start index.html # Windows
```

### Metodo 2: Online
1. Fai il deploy su GitHub Pages, Vercel, Netlify, o altro servizio hosting
2. Accedi all'URL pubblico

## 🐛 Debug

Nel console JavaScript puoi usare:
```javascript
debugGameState()  // Mostra stato completo del gioco
```

## 📝 Changelog

### v1.0 (Versione Iniziale)
- ✅ Menu principale completo
- ✅ 8 clienti realistici
- ✅ 17 operazioni bancarie
- ✅ Sistema chat interattivo
- ✅ Tutorial opzionale
- ✅ Sistema reputazione
- ✅ Statistiche di gioco
- ✅ UI responsive

## 🎯 Prossime Funzionalità (Roadmap)

- 🔄 Multiplayer locale (2 banchieri)
- 💾 Salvataggio cloud dei dati
- 🏆 Leaderboard globale
- 🎵 Effetti sonori e musica di sottofondo
- 📊 Grafici statistiche dettagliate
- 🤖 IA clienti più intelligente
- 🌍 Localizzazione lingue aggiuntive
- ⏰ Sistema di livelli con progressione

## 🤝 Contributi

Sei benvenuto a contribuire! Per favore:
1. Fai un Fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è rilasciato sotto la licenza MIT. Vedi il file LICENSE per dettagli.

## ✉️ Contatti

- 👤 **Autore**: Roberto Ferri
- 📧 **Email**: roberto.ferri001@libero.it
- 🐙 **GitHub**: [@robertoferri001](https://github.com/robertoferri001)

## 🙏 Ringraziamenti

- Ispirato da simulatori bancari realistici
- Design basato su interfacce bancarie professionali
- Grazie a tutti i tester e contributori

---

## 🎮 Buon Divertimento!

Enjoy the Banker Simulator! Ricorda: il cliente ha sempre ragione... ma tu sei il banchiere! 💼

**Versione**: 1.0  
**Ultimo aggiornamento**: Settembre 2026  
**Stato**: ✅ Completato e funzionante
