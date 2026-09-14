// Variabili globali del gioco
let gameState = {
    isRunning: false,
    isPaused: false,
    currentClient: null,
    clientsServed: 0,
    reputation: 5,
    maxReputation: 5,
    tutorialActive: false,
    tutorialStep: 0,
    currentOperation: null,
    difficulty: 'normal',
    soundEnabled: true,
    clientHistory: []
};

let clientQueue = [];
let usedClients = [];

// Inizializzazione del gioco
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('gameContainer').classList.remove('hidden');
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }, 2000);
});

// Aggiorna data e ora
function updateDateTime() {
    const now = new Date();
    const dateTimeStr = now.toLocaleString('it-IT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const elem = document.getElementById('dateTime');
    if (elem) {
        elem.textContent = dateTimeStr;
    }
}

// Avvia il gioco
function startGame(withTutorial) {
    if (withTutorial) {
        showTutorial();
    } else {
        startMainGame();
    }
}

// Mostra il tutorial
function showTutorial() {
    gameState.tutorialActive = true;
    gameState.tutorialStep = 0;
    
    const tutorialContent = document.getElementById('tutorialSteps');
    tutorialContent.innerHTML = '';
    
    tutorialSteps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = `tutorial-step ${index === 0 ? 'active' : ''}`;
        stepDiv.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 3rem;">${step.image}</div>
            </div>
            <h3>${step.title}</h3>
            <p>${step.content}</p>
        `;
        tutorialContent.appendChild(stepDiv);
    });
    
    showScreen('tutorialScreen');
    updateTutorialButtons();
}

// Aggiorna i pulsanti del tutorial
function updateTutorialButtons() {
    const nextBtn = document.getElementById('nextTutBtn');
    if (gameState.tutorialStep === tutorialSteps.length - 1) {
        nextBtn.textContent = 'Inizia Gioco →';
    } else {
        nextBtn.textContent = 'Successivo →';
    }
}

// Prossimo step del tutorial
function nextTutorialStep() {
    if (gameState.tutorialStep < tutorialSteps.length - 1) {
        gameState.tutorialStep++;
        const steps = document.querySelectorAll('.tutorial-step');
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === gameState.tutorialStep);
        });
        updateTutorialButtons();
    } else {
        skipTutorial();
    }
}

// Step precedente del tutorial
function previousTutorialStep() {
    if (gameState.tutorialStep > 0) {
        gameState.tutorialStep--;
        const steps = document.querySelectorAll('.tutorial-step');
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === gameState.tutorialStep);
        });
        updateTutorialButtons();
    }
}

// Salta il tutorial
function skipTutorial() {
    gameState.tutorialActive = false;
    startMainGame();
}

// Avvia il gioco principale
function startMainGame() {
    gameState.isRunning = true;
    gameState.isPaused = false;
    gameState.clientsServed = 0;
    gameState.reputation = 5;
    gameState.clientHistory = [];
    
    // Inizializza la coda dei clienti
    initializeClientQueue();
    
    // Mostra lo schermo di gioco
    showScreen('gameScreen');
    
    // Aggiorna l'interfaccia
    updateGameUI();
    
    // Abilita il pulsante per chiamare un cliente
    document.getElementById('callClientBtn').disabled = false;
}

// Inizializza la coda dei clienti
function initializeClientQueue() {
    clientQueue = [...clientsDatabase].sort(() => Math.random() - 0.5);
    usedClients = [];
}

// Chiama il prossimo cliente
function callNextClient() {
    // Se non ci sono più clienti nella coda, ricomincia
    if (clientQueue.length === 0) {
        // Ripeti la sequenza
        if (usedClients.length > 0) {
            clientQueue = [...usedClients].sort(() => Math.random() - 0.5);
            usedClients = [];
        } else {
            initializeClientQueue();
        }
    }
    
    if (clientQueue.length === 0) return;
    
    // Estrai il primo cliente dalla coda
    gameState.currentClient = clientQueue.shift();
    usedClients.push(gameState.currentClient);
    
    // Aggiorna l'interfaccia
    updateClientCard();
    clearChat();
    updateOperations();
    
    // Il cliente fa il primo saluto
    addChatMessage('client', gameState.currentClient.greeting);
    
    // Mostra il pulsante per il prossimo cliente
    document.getElementById('nextClientBtn').style.display = 'inline-block';
    document.getElementById('callClientBtn').disabled = true;
    document.getElementById('sendBtn').disabled = false;
    document.getElementById('bankerInput').disabled = false;
    
    playSound('client-entered');
}

// Aggiorna la carta del cliente
function updateClientCard() {
    if (!gameState.currentClient) return;
    
    const clientCard = document.getElementById('clientCard');
    const client = gameState.currentClient;
    
    clientCard.innerHTML = `
        <div class="client-entry">
            <div class="client-icon">${client.avatar}</div>
            <div class="client-info">
                <p class="client-name">${client.name}</p>
                <p class="client-status">
                    ${client.age} anni • ${client.accountType}<br>
                    Saldo: €${client.balance.toLocaleString('it-IT')}
                </p>
            </div>
        </div>
    `;
}

// Pulisci la chat
function clearChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = '';
}

// Aggiungi messaggio alla chat
function addChatMessage(sender, message) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    playSound('message-received');
}

// Invia messaggio del banchiere
function sendMessage() {
    const input = document.getElementById('bankerInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Aggiungi il messaggio del banchiere alla chat
    addChatMessage('banker', message);
    input.value = '';
    
    // Il cliente risponde
    setTimeout(() => {
        const responseIndex = Math.floor(Math.random() * conversationDialogues.listening.length);
        const clientResponse = conversationDialogues.listening[responseIndex];
        addChatMessage('client', clientResponse);
        
        // Dopo che il cliente risponde, mostra le operazioni disponibili
        setTimeout(() => {
            addChatMessage('system', '�� Operazioni disponibili per questo cliente:');
            updateOperations();
        }, 500);
    }, 800);
}

// Aggiorna le operazioni disponibili
function updateOperations() {
    if (!gameState.currentClient) return;
    
    const container = document.getElementById('operationsContainer');
    container.innerHTML = '';
    
    const operations = gameState.currentClient.possibleOperations;
    
    if (operations.length === 0) {
        container.innerHTML = '<p class="placeholder">Nessuna operazione disponibile</p>';
        return;
    }
    
    operations.forEach(opKey => {
        const operation = bankOperations[opKey];
        if (!operation) return;
        
        const btn = document.createElement('button');
        btn.className = 'operation-btn';
        btn.onclick = () => selectOperation(opKey);
        btn.innerHTML = `
            <span>${operation.icon} ${operation.name}</span>
            <span style="font-size: 0.8rem;">${operation.duration}</span>
        `;
        container.appendChild(btn);
    });
}

// Seleziona un'operazione
function selectOperation(operationKey) {
    const operation = bankOperations[operationKey];
    if (!operation) return;
    
    gameState.currentOperation = operationKey;
    
    // Mostra il modulo dell'operazione
    const formContainer = document.getElementById('operationForm');
    formContainer.classList.remove('hidden');
    
    document.getElementById('operationTitle').textContent = operation.name;
    
    const fieldsContainer = document.getElementById('formFields');
    fieldsContainer.innerHTML = '';
    
    // Crea i campi del modulo
    operation.fields.forEach(field => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'form-group';
        
        let fieldHTML = `<label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>`;
        
        if (field.type === 'number') {
            fieldHTML += `<input type="number" id="${field.name}" name="${field.name}" required="${field.required}" min="${field.min || 0}" max="${field.max || 999999999}" />`;
        } else if (field.type === 'select') {
            fieldHTML += `<select id="${field.name}" name="${field.name}" required="${field.required}">
                <option value="">Seleziona...</option>
                ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>`;
        } else if (field.type === 'checkbox') {
            fieldHTML = `<label><input type="checkbox" id="${field.name}" name="${field.name}" /> ${field.label}</label>`;
        } else {
            fieldHTML += `<input type="${field.type}" id="${field.name}" name="${field.name}" required="${field.required}" placeholder="${field.placeholder || ''}" />`;
        }
        
        fieldDiv.innerHTML = fieldHTML;
        fieldsContainer.appendChild(fieldDiv);
    });
    
    // Aggiungi messaggio di conferma
    addChatMessage('system', `✅ ${operation.name} selezionata. Compila il modulo a sinistra.`);
}

// Completa l'operazione
function completeOperation(event) {
    event.preventDefault();
    
    if (!gameState.currentOperation) return;
    
    const operation = bankOperations[gameState.currentOperation];
    const form = document.getElementById('formOperation');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Valida i dati
    if (!validateOperationData(data, operation)) {
        addChatMessage('system', '❌ Errore: Compila tutti i campi obbligatori');
        playSound('error');
        return;
    }
    
    // Processa l'operazione
    processOperation(data);
    
    // Nasconde il modulo
    document.getElementById('operationForm').classList.add('hidden');
    
    // Cancella gli input
    form.reset();
}

// Valida i dati dell'operazione
function validateOperationData(data, operation) {
    for (let field of operation.fields) {
        if (field.required && (!data[field.name] || data[field.name].trim() === '')) {
            return false;
        }
        
        if (field.type === 'number' && data[field.name]) {
            const value = parseFloat(data[field.name]);
            if (value < (field.min || 0) || value > (field.max || 999999999)) {
                return false;
            }
        }
    }
    return true;
}

// Processa l'operazione
function processOperation(data) {
    const operation = bankOperations[gameState.currentOperation];
    const responseIndex = Math.floor(Math.random() * operation.responses.length);
    let response = operation.responses[responseIndex];
    
    // Sostituisci le variabili nel messaggio
    Object.keys(data).forEach(key => {
        response = response.replace(`{${key}}`, data[key]);
    });
    
    addChatMessage('banker', response);
    
    // Mostra il messaggio di successo
    setTimeout(() => {
        const successMsg = feedbackMessages.success[
            Math.floor(Math.random() * feedbackMessages.success.length)
        ];
        addChatMessage('system', successMsg);
        playSound('success');
        
        // Aggiorna le statistiche
        gameState.clientsServed++;
        gameState.reputation = Math.min(5, gameState.reputation + 0.2);
        updateGameUI();
        
        // Registra l'operazione nella storia
        gameState.clientHistory.push({
            client: gameState.currentClient.name,
            operation: gameState.currentOperation,
            data: data,
            timestamp: new Date()
        });
        
    }, 500);
}

// Annulla l'operazione
function cancelOperation() {
    document.getElementById('operationForm').classList.add('hidden');
    document.getElementById('formOperation').reset();
    gameState.currentOperation = null;
}

// Aggiorna l'interfaccia del gioco
function updateGameUI() {
    document.getElementById('clientsServed').textContent = gameState.clientsServed;
    
    const stars = '⭐'.repeat(Math.floor(gameState.reputation));
    const emptyStars = '☆'.repeat(gameState.maxReputation - Math.floor(gameState.reputation));
    document.getElementById('reputation').textContent = stars + emptyStars;
}

// Chiama il prossimo cliente
function callNextClient() {
    gameState.currentClient = null;
    gameState.currentOperation = null;
    
    clearChat();
    document.getElementById('operationForm').classList.add('hidden');
    document.getElementById('formOperation').reset();
    document.getElementById('operationsContainer').innerHTML = 
        '<p class="placeholder">Seleziona un cliente per visualizzare le operazioni disponibili</p>';
    
    document.getElementById('nextClientBtn').style.display = 'none';
    document.getElementById('callClientBtn').disabled = false;
    document.getElementById('sendBtn').disabled = true;
    document.getElementById('bankerInput').disabled = true;
    document.getElementById('bankerInput').value = '';
    
    // Chiama automaticamente il prossimo cliente
    setTimeout(() => {
        callNextClient();
    }, 1500);
}

// Mostra una schermata
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

// Pausa il gioco
function pauseGame() {
    gameState.isPaused = true;
    showScreen('pauseMenu');
    playSound('pause');
}

// Riprendi il gioco
function resumeGame() {
    gameState.isPaused = false;
    showScreen('gameScreen');
    playSound('resume');
}

// Torna al menu principale
function returnToMenu() {
    gameState.isRunning = false;
    gameState.isPaused = false;
    gameState.currentClient = null;
    gameState.currentOperation = null;
    gameState.clientHistory = [];
    
    document.getElementById('chatBox').innerHTML = '';
    document.getElementById('operationForm').classList.add('hidden');
    document.getElementById('formOperation').reset();
    document.getElementById('operationsContainer').innerHTML = 
        '<p class="placeholder">Seleziona un cliente per visualizzare le operazioni disponibili</p>';
    
    showScreen('mainMenu');
}

// Apri impostazioni
function openSettings() {
    showScreen('settingsScreen');
    
    document.getElementById('volumeSlider').addEventListener('change', (e) => {
        gameState.volume = e.target.value;
    });
    
    document.getElementById('difficultySelect').addEventListener('change', (e) => {
        gameState.difficulty = e.target.value;
    });
    
    document.getElementById('soundEffects').addEventListener('change', (e) => {
        gameState.soundEnabled = e.checked;
    });
}

// Mostra i crediti
function showCredits() {
    showScreen('creditsScreen');
}

// Riproduci suoni
function playSound(soundName) {
    if (!gameState.soundEnabled) return;
    
    // Simulazione di suoni (potrebbe essere implementata con Web Audio API)
    const soundMap = {
        'client-entered': '🔔',
        'message-received': '💬',
        'success': '✅',
        'error': '❌',
        'pause': '⏸️',
        'resume': '▶️'
    };
    
    // Logga il suono per debug
    console.log(`🔊 Suono: ${soundMap[soundName] || '🔊'}`);
}

// Event listener per il form delle operazioni
document.addEventListener('DOMContentLoaded', () => {
    const bankerInput = document.getElementById('bankerInput');
    
    if (bankerInput) {
        bankerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});

// Funzione di debug per testare il gioco
function debugGameState() {
    console.log('=== DEBUG GAME STATE ===');
    console.log('Clienti serviti:', gameState.clientsServed);
    console.log('Reputazione:', gameState.reputation);
    console.log('Cliente attuale:', gameState.currentClient?.name);
    console.log('Operazione attuale:', gameState.currentOperation);
    console.log('Cronologia:', gameState.clientHistory);
}

// Esporta il debug
window.debugGameState = debugGameState;

console.log('✅ Game.js caricato correttamente');
