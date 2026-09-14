// Database di clienti con dettagli realistici
const clientsDatabase = [
    {
        id: 1,
        name: "Marco Rossi",
        age: 35,
        accountType: "Conto Corrente",
        balance: 5000,
        avatar: "👨",
        greeting: "Buongiorno, vorrei fare un'operazione",
        possibleOperations: [
            "prelievo",
            "versamento",
            "bonifico",
            "richiesta_estratto"
        ]
    },
    {
        id: 2,
        name: "Lucia Ferrari",
        age: 28,
        accountType: "Conto Risparmio",
        balance: 12000,
        avatar: "👩",
        greeting: "Ciao, avrei bisogno di aiuto con il mio conto",
        possibleOperations: [
            "richiesta_estratto",
            "versamento",
            "certificato_deposito",
            "mutuo"
        ]
    },
    {
        id: 3,
        name: "Giovanni Bianchi",
        age: 55,
        accountType: "Conto Corrente Business",
        balance: 45000,
        avatar: "👨‍💼",
        greeting: "Buongiorno, ho necessità di effettuare alcune operazioni importanti",
        possibleOperations: [
            "bonifico",
            "pagamento_bollettini",
            "estero_pagamento",
            "richiesta_fido"
        ]
    },
    {
        id: 4,
        name: "Anna Moretti",
        age: 42,
        accountType: "Conto Corrente",
        balance: 8500,
        avatar: "👩",
        greeting: "Salve, vorrei aprire un conto aggiuntivo",
        possibleOperations: [
            "apertura_conto",
            "richiesta_carta",
            "prelievo",
            "versamento"
        ]
    },
    {
        id: 5,
        name: "Roberto Colombo",
        age: 48,
        accountType: "Conto Investimenti",
        balance: 75000,
        avatar: "👨",
        greeting: "Buongiorno, vorrei investire alcuni soldi",
        possibleOperations: [
            "acquisto_titoli",
            "richiesta_consulenza",
            "bonifico",
            "prelievo"
        ]
    },
    {
        id: 6,
        name: "Francesca De Luca",
        age: 31,
        accountType: "Conto Corrente",
        balance: 3200,
        avatar: "👩",
        greeting: "Ciao, vorrei un prestito personale",
        possibleOperations: [
            "richiesta_prestito",
            "versamento",
            "prelievo",
            "richiesta_estratto"
        ]
    },
    {
        id: 7,
        name: "Paolo Gallo",
        age: 52,
        accountType: "Conto Corrente",
        balance: 22000,
        avatar: "👨",
        greeting: "Buongiorno, ho un problema con la mia carta di credito",
        possibleOperations: [
            "richiesta_carta",
            "blocco_carta",
            "pagamento_bollettini",
            "prelievo"
        ]
    },
    {
        id: 8,
        name: "Silvia Rizzo",
        age: 26,
        accountType: "Conto Giovani",
        balance: 1500,
        avatar: "👩",
        greeting: "Salve, vorrei attivare servizi online",
        possibleOperations: [
            "attivazione_servizi",
            "richiesta_carta",
            "versamento",
            "prelievo"
        ]
    }
];

// Operazioni bancarie disponibili con dettagli realistici
const bankOperations = {
    prelievo: {
        name: "Prelievo Contante",
        icon: "💵",
        description: "Preleva denaro dal tuo conto",
        fields: [
            { name: "importo", label: "Importo da prelevare (€)", type: "number", required: true, min: 10, max: 2000 },
            { name: "motivazione", label: "Motivazione del prelievo", type: "text", required: false }
        ],
        responses: [
            "Perfetto, procederemo con il prelievo di {importo}€",
            "Ho registrato la richiesta di prelievo. Mi raccomando di conservare la ricevuta",
            "Consenso, verseremo {importo}€ sul suo conto entro 24 ore"
        ],
        duration: "Istantanea"
    },
    versamento: {
        name: "Versamento",
        icon: "💰",
        description: "Versa denaro nel tuo conto",
        fields: [
            { name: "importo", label: "Importo da versare (€)", type: "number", required: true, min: 10, max: 50000 },
            { name: "tipo", label: "Tipo di versamento", type: "select", options: ["Contante", "Assegno", "Bonifico"], required: true },
            { name: "descrizione", label: "Descrizione", type: "text", required: false }
        ],
        responses: [
            "Registrato il versamento di {importo}€",
            "Il versamento verrà accreditato entro 1-2 giorni lavorativi",
            "Grazie per il versamento di {importo}€, la transazione è stata confermata"
        ],
        duration: "1-2 giorni"
    },
    bonifico: {
        name: "Bonifico Bancario",
        icon: "🏦",
        description: "Trasferisci denaro verso un altro conto",
        fields: [
            { name: "iban", label: "IBAN Destinatario", type: "text", required: true, placeholder: "IT60X0542811101000000123456" },
            { name: "beneficiario", label: "Intestatario conto", type: "text", required: true },
            { name: "importo", label: "Importo (€)", type: "number", required: true, min: 1, max: 100000 },
            { name: "causale", label: "Causale", type: "text", required: true },
            { name: "urgente", label: "Bonifico urgente (commissione +3€)", type: "checkbox", required: false }
        ],
        responses: [
            "Bonifico di {importo}€ a {beneficiario} confermato",
            "La transazione sarà elaborata entro 1-2 giorni lavorativi",
            "Ho registrato il bonifico, ecco il numero di riferimento per il suo archivio"
        ],
        duration: "1-2 giorni (urgente: istantaneo)"
    },
    richiesta_estratto: {
        name: "Estratto Conto",
        icon: "📄",
        description: "Richiedi l'estratto del tuo conto",
        fields: [
            { name: "periodo", label: "Periodo", type: "select", options: ["Ultimi 30 giorni", "Ultimi 3 mesi", "Ultimi 6 mesi", "Ultimo anno"], required: true },
            { name: "formato", label: "Formato", type: "select", options: ["Cartaceo", "Email", "Entrambi"], required: true }
        ],
        responses: [
            "Ecco l'estratto conto relativo al periodo richiesto",
            "L'estratto conto sarà inviato via email entro 2 ore",
            "Il documento è pronto, può ritirarlo presso lo sportello"
        ],
        duration: "Immediato"
    },
    richiesta_carta: {
        name: "Richiesta Carta di Credito",
        icon: "💳",
        description: "Richiedi una nuova carta di credito/debito",
        fields: [
            { name: "tipo", label: "Tipo di carta", type: "select", options: ["Carta di Debito Classica", "Carta di Credito Classic", "Carta Platino", "Carta Giovani"], required: true },
            { name: "limite", label: "Limite di spesa (€)", type: "number", required: true, min: 500, max: 50000 },
            { name: "urgente", label: "Consegna in 24h (+15€)", type: "checkbox", required: false }
        ],
        responses: [
            "Ottimo, la carta sarà prodotta e inviata al suo domicilio",
            "La carta di credito arriverà entro 5-7 giorni lavorativi",
            "Abbiamo registrato la richiesta, riceverà la carta via posta raccomandata"
        ],
        duration: "5-7 giorni"
    },
    pagamento_bollettini: {
        name: "Pagamento Bollettini",
        icon: "📋",
        description: "Paga bollette e utenze",
        fields: [
            { name: "tipo_bolletta", label: "Tipo di bolletta", type: "select", options: ["Luce", "Gas", "Acqua", "Telefono", "Internet", "Altro"], required: true },
            { name: "importo", label: "Importo (€)", type: "number", required: true, min: 5, max: 5000 },
            { name: "codice_bolletta", label: "Codice/Riferimento", type: "text", required: true }
        ],
        responses: [
            "Pagamento di {importo}€ registrato con successo",
            "La bolletta sarà pagata entro 24 ore",
            "Transazione confermata, conservi la ricevuta per i suoi archivi"
        ],
        duration: "24 ore"
    },
    blocco_carta: {
        name: "Blocco Carta",
        icon: "🔒",
        description: "Blocca una carta smarrita o rubata",
        fields: [
            { name: "numero_carta", label: "Ultimi 4 numeri della carta", type: "text", required: true, maxlength: 4 },
            { name: "motivo", label: "Motivo del blocco", type: "select", options: ["Smarrita", "Rubata", "Non la uso più", "Sospetti utilizzi fraudolenti"], required: true },
            { name: "nuova_carta", label: "Desidero una nuova carta", type: "checkbox", required: false }
        ],
        responses: [
            "La carta è stata bloccata immediatamente",
            "Per precauzione, la carta è stata disattivata",
            "Registriamo il blocco della carta, se desidera una sostituzione la richiesta è già in fase di elaborazione"
        ],
        duration: "Istantanea"
    },
    apertura_conto: {
        name: "Apertura Nuovo Conto",
        icon: "🆕",
        description: "Apri un nuovo conto bancario",
        fields: [
            { name: "tipo_conto", label: "Tipo di conto", type: "select", options: ["Conto Corrente", "Conto Risparmio", "Conto Giovani", "Conto Business"], required: true },
            { name: "deposito_iniziale", label: "Deposito iniziale (€)", type: "number", required: true, min: 100, max: 100000 },
            { name: "motivo", label: "Motivazione apertura", type: "text", required: true }
        ],
        responses: [
            "Perfetto, procederò con l'apertura del nuovo conto",
            "Ho registrato la richiesta, il conto sarà attivo entro 3 giorni",
            "Molto bene, avrà accesso all'online banking dal prossimo giorno lavorativo"
        ],
        duration: "3 giorni lavorativi"
    },
    richiesta_prestito: {
        name: "Richiesta Prestito",
        icon: "📊",
        description: "Richiedi un prestito personale",
        fields: [
            { name: "importo", label: "Importo richiesto (€)", type: "number", required: true, min: 1000, max: 100000 },
            { name: "durata", label: "Durata (mesi)", type: "select", options: ["12", "24", "36", "48", "60"], required: true },
            { name: "destinazione", label: "Destinazione fondi", type: "text", required: true },
            { name: "reddito_annuo", label: "Reddito annuo (€)", type: "number", required: true, min: 10000 }
        ],
        responses: [
            "La richiesta di prestito di {importo}€ è stata registrata",
            "Procederemo con una valutazione della sua pratica",
            "Riceverà una risposta entro 5 giorni lavorativi, le contatteremo per discutere i termini"
        ],
        duration: "5 giorni lavorativi"
    },
    mutuo: {
        name: "Mutuo Ipotecario",
        icon: "🏠",
        description: "Richiedi un mutuo per l'acquisto di un immobile",
        fields: [
            { name: "importo_mutuo", label: "Importo mutuo (€)", type: "number", required: true, min: 50000, max: 1000000 },
            { name: "durata_anni", label: "Durata (anni)", type: "select", options: ["10", "15", "20", "25", "30"], required: true },
            { name: "immobile", label: "Valore immobile (€)", type: "number", required: true },
            { name: "periodo_inizio", label: "Quando necessita i fondi", type: "text", required: true }
        ],
        responses: [
            "La richiesta di mutuo è stata registrata nel nostro sistema",
            "Un nostro specialista vi contatterà entro 2 giorni lavorativi",
            "Procederemo con una valutazione del vostro profilo e della proprietà"
        ],
        duration: "10-15 giorni"
    },
    estero_pagamento: {
        name: "Bonifico Estero",
        icon: "🌍",
        description: "Trasferisci denaro all'estero",
        fields: [
            { name: "paese", label: "Paese destinazione", type: "text", required: true },
            { name: "iban_estero", label: "IBAN Internazionale", type: "text", required: true },
            { name: "beneficiario", label: "Beneficiario", type: "text", required: true },
            { name: "importo", label: "Importo (€)", type: "number", required: true, min: 100, max: 500000 },
            { name: "valuta", label: "Valuta destinazione", type: "select", options: ["USD", "GBP", "CHF", "JPY", "Altra"], required: true }
        ],
        responses: [
            "Il bonifico internazionale di {importo}€ è stato registrato",
            "La transazione sarà elaborata entro 3-5 giorni lavorativi",
            "Le costerà una commissione di circa il 2-3% per le transazioni internazionali"
        ],
        duration: "3-5 giorni"
    },
    certificato_deposito: {
        name: "Certificato di Deposito",
        icon: "📜",
        description: "Sottoscrivi un certificato di deposito a termine",
        fields: [
            { name: "importo_cd", label: "Importo da depositare (€)", type: "number", required: true, min: 1000, max: 500000 },
            { name: "durata_cd", label: "Durata", type: "select", options: ["3 mesi", "6 mesi", "1 anno", "2 anni", "3 anni"], required: true },
            { name: "tasso_interesse", label: "Tasso di interesse", type: "select", options: ["Fisso", "Variabile"], required: true }
        ],
        responses: [
            "Il certificato di deposito di {importo_cd}€ è stato sottoscritto",
            "Riceverà gli interessi alla scadenza del termine",
            "Il rendimento stimato è di circa il 2-4% annuo a seconda del mercato"
        ],
        duration: "Immediato"
    },
    acquisto_titoli: {
        name: "Acquisto Titoli/Azioni",
        icon: "📈",
        description: "Acquista titoli e azioni",
        fields: [
            { name: "nome_titolo", label: "Nome titolo/azione", type: "text", required: true },
            { name: "quantita", label: "Quantità", type: "number", required: true, min: 1 },
            { name: "importo_totale", label: "Investimento totale (€)", type: "number", required: true, min: 100 },
            { name: "tipo_ordine", label: "Tipo ordine", type: "select", options: ["A mercato", "A limite", "Stop loss"], required: true }
        ],
        responses: [
            "L'ordine di acquisto è stato registrato",
            "Riceverà una conferma non appena l'ordine sarà eseguito",
            "Gli investimenti comportano rischi, è importante mantenere una strategia diversificata"
        ],
        duration: "Giornata borsistica"
    },
    richiesta_consulenza: {
        name: "Consulenza Finanziaria",
        icon: "💼",
        description: "Richiedi una consulenza con un esperto",
        fields: [
            { name: "argomento", label: "Argomento di interesse", type: "select", options: ["Investimenti", "Pianificazione Pensione", "Fiscalità", "Prestiti", "Altro"], required: true },
            { name: "preferenza_incontro", label: "Modalità incontro", type: "select", options: ["Di persona", "Telefonico", "Videochiamata"], required: true },
            { name: "disponibilita", label: "Disponibilità", type: "text", required: true }
        ],
        responses: [
            "La richiesta di consulenza è stata registrata",
            "Un consulente specializzato vi contatterà entro 24 ore",
            "Sarà un piacere assistervi nella pianificazione finanziaria"
        ],
        duration: "24-48 ore"
    },
    richiesta_fido: {
        name: "Richiesta Fido/Scoperto",
        icon: "💰",
        description: "Richiedi uno scoperto di conto o fido",
        fields: [
            { name: "importo_fido", label: "Importo scoperto richiesto (€)", type: "number", required: true, min: 1000, max: 50000 },
            { name: "durata_fido", label: "Durata", type: "select", options: ["Temporaneo 30 giorni", "Temporaneo 90 giorni", "Permanente"], required: true },
            { name: "motivo", label: "Motivo della richiesta", type: "text", required: true }
        ],
        responses: [
            "La richiesta di fido è stata registrata",
            "Riceverà una risposta entro 2-3 giorni lavorativi",
            "Il fido comporterà interessi che verranno calcolati giornalmente"
        ],
        duration: "2-3 giorni"
    },
    attivazione_servizi: {
        name: "Attivazione Servizi Online",
        icon: "💻",
        description: "Attiva servizi di online banking e app mobile",
        fields: [
            { name: "servizi", label: "Servizi desiderati", type: "checkbox", options: ["Internet Banking", "App Mobile", "Mobile Pay", "Notifiche SMS"], required: true },
            { name: "metodo_autenticazione", label: "Autenticazione", type: "select", options: ["PIN", "Biometrica", "OTP via SMS", "Token"], required: true }
        ],
        responses: [
            "Perfetto, i servizi online saranno attivati immediatamente",
            "Riceverà le credenziali via email entro 1 ora",
            "Avrà pieno accesso alla piattaforma dal prossimo aggiornamento"
        ],
        duration: "Istantanea"
    }
};

// Dialoghi conversazionali
const conversationDialogues = {
    greeting: [
        "Buongiorno, benvenuto!",
        "Buongiorno, come posso aiutarla?",
        "Salve, sono molto felice di servirla",
        "Buongiorno, mi dica pure di che cosa ha bisogno",
        "Ciao, sono tutto orecchi!"
    ],
    listening: [
        "Capisco, mi racconti di più...",
        "Interessante, continui pure...",
        "D'accordo, ascoltato. Procediamo?",
        "Ho compreso la situazione",
        "Va bene, vediamo come possiamo risolvere"
    ],
    processing: [
        "Un momento, sto registrando i dati...",
        "Perfetto, elaboro la richiesta...",
        "Va bene, lascimi controllare nel sistema...",
        "Subito, sto verificando...",
        "Grazie per l'informazione, elaboro..."
    ],
    closing: [
        "Grazie mille per la visita, arrivederci!",
        "Perfetto, è stato un piacere servirla. Buona giornata!",
        "Bene, il prossimo cliente prego!",
        "La ringrazio, arrivederci e buona fortuna!",
        "Grazie, spero di averla soddisfatta. Arrivederci!"
    ],
    clientResponses: {
        positive: [
            "Perfetto! Vi ringrazio moltissimo",
            "Eccellente, grazie della vostra cortesia",
            "Meraviglioso! Sono molto soddisfatto",
            "Grazie infinite, siete stati utilissimi",
            "Bellissimo, vi contatterò per eventuali necessità"
        ],
        negative: [
            "Hmm, non mi sembra giusto...",
            "Non credo sia quello che cercavo",
            "Mi scusi, potremmo riprovare?",
            "Forse c'è stato un malinteso",
            "Non sono completamente soddisfatto"
        ],
        confused: [
            "Scusi, potrebbe ripetere?",
            "Non ho ben capito...",
            "Mi scusi, potrebbe spiegare meglio?",
            "Mi perdoni, non sono sicuro di aver compreso",
            "Potrebbe illustrare meglio la procedura?"
        ]
    }
};

// Tutorial Steps
const tutorialSteps = [
    {
        title: "Benvenuto nel Simulatore Bancario",
        content: "Questo è un simulatore realistico di un'operazione bancaria. Imparerai come gestire i clienti e eseguire operazioni bancarie professionali.",
        image: "🏦"
    },
    {
        title: "Chiamare un Cliente",
        content: "Clicca sul pulsante 'Chiama Cliente' per far entrare il cliente successivo. Vedrai il suo nome, il tipo di account e altre informazioni importanti.",
        image: "📞"
    },
    {
        title: "Interagire con il Cliente",
        content: "Il cliente ti darà il benvenuto. Rispondi in maniera professionale e cortese. La chat simula una vera conversazione bancaria.",
        image: "💬"
    },
    {
        title: "Selezionare un'Operazione",
        content: "A sinistra vedrai un elenco di operazioni che il cliente può fare. Seleziona l'operazione desiderata dal pannello operazioni.",
        image: "📋"
    },
    {
        title: "Compilare il Modulo",
        content: "Riempi tutti i campi richiesti con attenzione. Verifica che i dati siano corretti prima di procedere. La precisione è importante!",
        image: "✍️"
    },
    {
        title: "Confermare l'Operazione",
        content: "Clicca su 'Conferma Operazione' per completare la transazione. Il cliente riceverà una conferma e il sistema registrerà l'operazione.",
        image: "✅"
    },
    {
        title: "Monitorare le Statistiche",
        content: "In alto vedrai il numero di clienti serviti e la tua reputazione. Mantieni una buona reputazione servendo i clienti in modo professionale!",
        image: "⭐"
    },
    {
        title: "Avanzare nel Gioco",
        content: "Continua a servire clienti e a completare operazioni. Ogni azione influenza la tua reputazione e il tuo score finale. Buona fortuna!",
        image: "🎯"
    }
];

// Valori monetari realistici
const monetaryLimits = {
    prelievo: { min: 10, max: 2000 },
    versamento: { min: 10, max: 50000 },
    bonifico: { min: 1, max: 100000 },
    prestito: { min: 1000, max: 100000 },
    mutuo: { min: 50000, max: 1000000 },
    investimento: { min: 100, max: 500000 }
};

// Commissioni bancarie
const bankCommissions = {
    bonifico_nazionale: 2,
    bonifico_urgente: 5,
    bonifico_estero: 15,
    carta_sostituzione: 5,
    estratto_conto_cartaceo: 2,
    certificato_deposito: 0,
    fido: 3  // percentuale annuale
};

// Tassi di interesse medi
const interestRates = {
    conto_corrente: 0.1,
    conto_risparmio: 1.5,
    certificato_deposito_3m: 2.0,
    certificato_deposito_6m: 2.5,
    certificato_deposito_1a: 3.0,
    certificato_deposito_2a: 3.2,
    certificato_deposito_3a: 3.5,
    mutuo: 3.5,
    prestito: 6.0,
    fido: 8.0
};

// Messaggi di feedback
const feedbackMessages = {
    success: [
        "✅ Operazione completata con successo!",
        "✅ Transazione confermata!",
        "✅ Perfetto, tutto è stato registrato!",
        "✅ Operazione eseguita correttamente!",
        "✅ Grazie, la pratica è in elaborazione!"
    ],
    error: [
        "❌ Errore: Dati incompleti",
        "❌ Saldo insufficiente",
        "❌ IBAN non valido",
        "❌ Limite superato",
        "❌ Operazione non consentita"
    ],
    warning: [
        "⚠️ Attenzione: Importo elevato",
        "⚠️ Verifica i dati inseriti",
        "⚠️ Commissione applicabile",
        "⚠️ Operazione in sospeso",
        "⚠️ Richiede validazione aggiuntiva"
    ]
};

// Esporta i dati
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        clientsDatabase,
        bankOperations,
        conversationDialogues,
        tutorialSteps,
        monetaryLimits,
        bankCommissions,
        interestRates,
        feedbackMessages
    };
}
