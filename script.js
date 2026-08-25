// --- STAN GRY ---
let currentTeam = '';
let totalPoints = 0;

// Struktura naszych nowych modułów
const modules = {
    nav:  { name: 'Nawigacja', stages: 2, currentStage: 1, points: 0 },
    eng:  { name: 'Silniki', stages: 2, currentStage: 1, points: 0 },
    life: { name: 'Wentylacja', stages: 1, currentStage: 1, points: 0 },
    core: { name: 'Rdzeń Pamięci', stages: 1, currentStage: 1, points: 0 },
    comm: { name: 'Nadajnik', stages: 1, currentStage: 1, points: 0 }
};

// --- LOGOWANIE ---
document.getElementById('verifyTeamBtn').addEventListener('click', () => {
    const teamInput = document.getElementById('teamInput').value.trim();
    if (teamInput.length > 0 && !isNaN(teamInput)) {
        currentTeam = teamInput;
        document.getElementById('displayTeam').textContent = currentTeam;
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    }
});

document.getElementById('loginBtn').addEventListener('click', () => {
    const pwdInput = document.getElementById('passwordInput').value.trim().toUpperCase();
    const expectedNumber = parseInt(currentTeam) + 150;
    const expectedPassword = `E${expectedNumber}`;

    if (pwdInput === expectedPassword) {
        // Sukces logowania
        totalPoints += 2;
        updateUI();
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('dashboardScreen').classList.add('active');
        document.getElementById('dashTeamName').textContent = currentTeam;
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});

// --- OBSŁUGA KOKPITU ---
function updateUI() {
    document.getElementById('totalPoints').textContent = totalPoints;
    
    let allCompleted = true;
    for (const [key, mod] of Object.entries(modules)) {
        const btn = document.getElementById(`btn_${key}`);
        btn.textContent = `${mod.name} (${mod.points}/${mod.stages})`;
        
        if (mod.points === mod.stages) {
            btn.classList.add('completed');
        } else {
            allCompleted = false;
        }
    }

    if (allCompleted) {
        document.getElementById('globalStatus').textContent = 'STABILNY';
        document.getElementById('globalStatus').style.color = 'var(--success)';
    }
}

// Podpinanie przycisków menu
Object.keys(modules).forEach(key => {
    document.getElementById(`btn_${key}`).addEventListener('click', () => {
        // Usuń klasę active ze wszystkich
        document.querySelectorAll('.module-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn_${key}`).classList.add('active');
        
        loadGame(key);
    });
});

// --- ŁADOWANIE GIER (Miejsce na nasz przyszły kod) ---
function loadGame(moduleKey) {
    const mod = modules[moduleKey];
    const container = document.getElementById('gameContainer');
    const instr = document.getElementById('instructionContent');
    document.getElementById('gameTitle').textContent = `Naprawa: ${mod.name} (Poziom ${mod.currentStage}/${mod.stages})`;

    if (mod.points >= mod.stages) {
        container.innerHTML = `<div class="idle-logo" style="color: var(--success)">MODUŁ W PEŁNI SPRAWNY</div>`;
        instr.innerHTML = `System ${mod.name} działa poprawnie. Nie wymaga dalszych interwencji.`;
        return;
    }

    // TYMCZASOWY PLACEHOLDER (Zaraz tu wrzucimy prawdziwe gry!)
    container.innerHTML = `
        <div style="text-align:center;">
            <p>Tutaj wgramy gierkę: <strong>${mod.name}</strong></p>
            <button onclick="winStage('${moduleKey}')">SYMULUJ WYGRANĄ POZIOMU</button>
        </div>
    `;

    // Dynamiczna instrukcja z boku
    if (moduleKey === 'eng') {
        instr.innerHTML = `<strong>Oscyloskop:</strong> Użyj suwaków, aby zsynchronizować zieloną falę z czerwoną.`;
    } else if (moduleKey === 'life') {
        instr.innerHTML = `<strong>Rurociągi:</strong> Klikaj w kafelki, aby je obrócić i doprowadzić tlen od zielonego źródła do wyjścia.`;
    } else {
        instr.innerHTML = `Zbadaj interfejs na środku ekranu i przywróć system do działania.`;
    }
}

// Funkcja wywoływana po wygraniu mini-gry
window.winStage = function(moduleKey) {
    const mod = modules[moduleKey];
    if (mod.points < mod.stages) {
        mod.points++;
        totalPoints++;
        
        if (mod.currentStage < mod.stages) {
            mod.currentStage++;
        }
        
        updateUI();
        loadGame(moduleKey); // Przeładowanie widoku (następny poziom lub ekran sukcesu)
    }
};