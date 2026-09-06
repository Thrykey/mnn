// --- STAN GRY ---
let currentTeam = '';
let totalPoints = 0;
let activeModule = null; // klucz aktualnie otwartego modułu
let passwordHintUsed = false; // czy drużyna skorzystała z podpowiedzi do hasła (-1 pkt)

// Struktura naszych nowych modułów
const modules = {
    nav:  { name: 'Nawigacja', stages: 2, currentStage: 1, points: 0 },
    eng:  { name: 'Silniki', stages: 2, currentStage: 1, points: 0 },
    life: { name: 'Wentylacja', stages: 1, currentStage: 1, points: 0 },
    core: { name: 'Rdzeń Pamięci', stages: 1, currentStage: 1, points: 0 },
    comm: { name: 'Nadajnik', stages: 1, currentStage: 1, points: 0 }
};

// --- POMOCNICZE: LITERY ALFABETU I SUMA CYFR ---
// n: numer litery (1 = A, 2 = B ... 26 = Z), zawijane modulo 26
function letterFromNumber(n) {
    const idx = ((n - 1) % 26 + 26) % 26;
    return String.fromCharCode(65 + idx);
}

// Suma cyfr liczby (dla liczb ujemnych liczona jest wartość bezwzględna)
function sumDigits(n) {
    return String(Math.abs(n)).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
}

// Generuje poprawne hasło awaryjne dla numeru drużyny (kroki 1-6, patrz instrukcja na ekranie logowania)
function computeEmergencyPassword(teamNumberStr) {
    const digits = String(teamNumberStr).split('').map(Number);
    const digitSum = digits.reduce((a, b) => a + b, 0);

    // Krok 1: litera z sumy cyfr numeru drużyny
    const letterStart = letterFromNumber(digitSum);

    // Krok 2: dopełnienie każdej cyfry do 10
    const complements = digits.map(d => 10 - d);

    // Krok 3: sortowanie rosnąco i złożenie z powrotem w liczbę
    const sorted = [...complements].sort((a, b) => a - b);
    const afterSort = parseInt(sorted.join(''), 10);

    // Krok 4 i 5: dodaj dzisiejszy dzień miesiąca, odejmij numer dzisiejszego miesiąca
    // (bieżąca data systemowa - drużyny rozwiązują to na żywo w dniu gry)
    const today = new Date();
    const N = afterSort + today.getDate() - (today.getMonth() + 1);

    // Krok 6: litera z sumy cyfr N
    const letterEnd = letterFromNumber(sumDigits(N));

    return `${letterStart}${N}${letterEnd}`;
}

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

document.getElementById('hintUsedBtn').addEventListener('click', () => {
    if (passwordHintUsed) return; // zabezpieczenie przed podwójnym odliczeniem
    passwordHintUsed = true;
    const btn = document.getElementById('hintUsedBtn');
    btn.textContent = 'PODPOWIEDŹ ODNOTOWANA (-1 PKT)';
    btn.disabled = true;
    btn.style.opacity = '0.6';
    document.getElementById('loginBtn').textContent = 'AUTORYZUJ (1 PKT)';
});

document.getElementById('loginBtn').addEventListener('click', () => {
    const pwdInput = document.getElementById('passwordInput').value.trim().toUpperCase();
    const expectedPassword = computeEmergencyPassword(currentTeam);

    if (pwdInput === expectedPassword) {
        // 2 pkt standardowo, 1 pkt jeśli drużyna skorzystała z podpowiedzi
        totalPoints += passwordHintUsed ? 1 : 2;
        updateUI();
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('dashboardScreen').classList.add('active');
        document.getElementById('dashTeamName').textContent = currentTeam;
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});

// --- OBSŁUGA KOKPITU ---
// Odświeża licznik punktów, etykiety modułów i status globalny na kokpicie
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
        if (key === activeModule) return; // moduł już otwarty - ignoruj kliknięcie

        // Usuń klasę active ze wszystkich
        document.querySelectorAll('.module-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn_${key}`).classList.add('active');

        activeModule = key;
        loadGame(key);
    });
});

// --- ŁADOWANIE GIER ---
// Wyświetla instrukcję i uruchamia minigrę dla wybranego modułu
function loadGame(moduleKey) {
    if (typeof window.activeGameCleanup === 'function') {
        try { window.activeGameCleanup(); } catch (e) { console.error(e); }
        window.activeGameCleanup = null;
    }

    const mod = modules[moduleKey];
    const container = document.getElementById('gameContainer');
    const instr = document.getElementById('instructionContent');
    document.getElementById('gameTitle').textContent = `Naprawa: ${mod.name} (Poziom ${mod.currentStage}/${mod.stages})`;

    if (mod.points >= mod.stages) {
        container.innerHTML = `<div class="idle-logo" style="color: var(--success)">MODUŁ W PEŁNI SPRAWNY</div>`;
        instr.innerHTML = `System ${mod.name} działa poprawnie. Nie wymaga dalszych interwencji.`;
        return;
    }

    // Dynamiczne intruckje dla poszczególnych mini-gierek
if (moduleKey === 'nav') {
        instr.innerHTML = `<strong>CEL:</strong> Zaprogramuj trasę lotu.<br><br>
        Wprowadź sekwencję komend napędowych (strzałek), aby ominąć przeszkody <strong>[X]</strong> i zadokować w bazie <strong>[B]</strong>.<br><br>
        <em>Poziom 2: Zbierz klucz autoryzacyjny <strong>[K]</strong> przed dokowaniem.</em>`;
        initNavigationGame(mod.currentStage, moduleKey, container);
    }
    else if (moduleKey === 'eng') {
        instr.innerHTML = `<strong>CEL:</strong> Zsynchronizuj rdzeń silnika.<br><br>
        Użyj suwaków, aby precyzyjnie nałożyć Twój sygnał na uszkodzony strumień mocy.`;
        initOscilloscopeGame(mod.currentStage, moduleKey, container);
    } 
    else if (moduleKey === 'life') {
        instr.innerHTML = `<strong>CEL:</strong> Przywróć zasilanie tlenu.<br><br>
        Klikaj w wybrane segmenty rurociągu, aby je obrócić. Musisz utworzyć nieprzerwany strumień pomiędzy zaworem wejściowym <strong>[O2 IN]</strong>, a strefą załogi <strong>[OUT]</strong>. Ślepe zaułki nie mają znaczenia.`;
        initPipesGame(moduleKey, container);
    }
    else if (moduleKey === 'comm') {
        instr.innerHTML = `<strong>CEL:</strong> Skrosuj przewody nadajnika.<br><br>
        Połącz ze sobą świecące węzły tego samego koloru, przeciągając po ekranie. Ścieżki danych <strong>nie mogą się przecinać</strong>, a każdy węzeł musi zostać podłączony do swojej pary.`;
        initTransmitterGame(moduleKey, container);
    }
    else if (moduleKey === 'core') {
        instr.innerHTML = `<strong>CEL:</strong> Zautoryzuj klastry pamięci.<br><br>
        Cyfra wewnątrz sektora oznacza, <strong>ile z jej 4 narożników (węzłów)</strong> musi zostać zasilonych. <br><br>Klikaj w węzły na rogach, aby je aktywować. Kiedy wartość się zgadza, sektor zaświeci się na zielono.`;
        initMemoryCoreGame(moduleKey, container);
    }
}

// Wywoływana po wygraniu poziomu minigry - nalicza punkty i przechodzi do kolejnego etapu
window.winStage = function(moduleKey) {
    const mod = modules[moduleKey];
    if (mod.points < mod.stages) {
        mod.points++;
        totalPoints++;
        
        if (mod.currentStage < mod.stages) {
            mod.currentStage++;
        }
        
        updateUI();

        // Odśwież widok tylko jeśli gracz nadal patrzy na ten moduł
        if (moduleKey === activeModule) {
            loadGame(moduleKey);
        }
    }
};

// --- LOGIKA GRY: OSCYLOSKOP (SILNIKI) ---
// Minigra: dopasuj falę suwakami do zepsutego sygnału
function initOscilloscopeGame(stage, moduleKey, container) {
    container.innerHTML = `
        <div style="text-align: center; width: 100%;">
            <canvas id="oscCanvas" width="500" height="250" style="background: #001018; border: 2px solid var(--term-fg); border-radius: 8px; margin-bottom: 10px; box-shadow: inset 0 0 15px rgba(30, 231, 255, 0.1); width: 100%; max-width: 500px;"></canvas>
            
            <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 15px; font-size: 0.85rem; font-weight: bold;">
                <span style="color: rgba(255, 68, 68, 0.8);">■ USZKODZONY SYGNAŁ</span>
                <span style="color: var(--term-fg);">■ TWÓJ SYGNAŁ</span>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 15px; width: 90%; margin: 0 auto; background: var(--term-dim); padding: 15px; border: 1px dashed var(--term-fg);">
                
                <div style="display: flex; justify-content: space-between; align-items: center; color: var(--term-fg); font-weight: bold;">
                    <span>AMPLITUDA</span>
                    <input type="range" id="ampSlider" min="10" max="100" value="50" style="width: 65%; margin: 0;">
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; color: var(--term-fg); font-weight: bold;">
                    <span>CZĘSTOTLIWOŚĆ</span>
                    <input type="range" id="freqSlider" min="10" max="60" value="35" style="width: 65%; margin: 0;">
                </div>
                
                <div id="phaseGroup" style="display: ${stage === 2 ? 'flex' : 'none'}; justify-content: space-between; align-items: center; color: var(--term-fg); font-weight: bold;">
                    <span>FAZA</span>
                    <input type="range" id="phaseSlider" min="0" max="62" value="0" style="width: 65%; margin: 0;">
                </div>
                
                <button id="checkSyncBtn" style="margin-top: 10px; width: 100%; min-height: 50px;">INICJUJ SYNCHRONIZACJĘ</button>
            </div>
            
            <p id="oscFeedback" style="color: var(--danger); margin-top: 15px; height: 20px; font-weight: bold;"></p>
        </div>
    `;

    const canvas = document.getElementById('oscCanvas');
    const ctx = canvas.getContext('2d');
    const ampSlider = document.getElementById('ampSlider');
    const freqSlider = document.getElementById('freqSlider');
    const phaseSlider = document.getElementById('phaseSlider');
    const checkBtn = document.getElementById('checkSyncBtn');
    const feedback = document.getElementById('oscFeedback');

    // Resolve CSS custom property for canvas (canvas 2D context doesn't understand var())
    const termFgColor = getComputedStyle(document.documentElement).getPropertyValue('--term-fg').trim();

    // Losujemy parametry zepsutej fali, upewniając się, że nie wylosują się na startowej pozycji suwaków
    let targetAmp = Math.floor(Math.random() * 60) + 20; // 20-80
    let targetFreq = Math.floor(Math.random() * 40) + 15; // 15-55
    let targetPhase = stage === 2 ? Math.floor(Math.random() * 50) + 5 : 0; // 5-55

    // Minimalne przesunięcie żeby gra nie rozwiązała się sama
    if (Math.abs(targetAmp - 50) < 10) targetAmp += 20; 
    if (Math.abs(targetFreq - 35) < 10) targetFreq -= 15;

    // Rysuje siatkę CRT oraz obie fale (docelową i użytkownika)
    function drawWaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Rysowanie siatki "monitora CRT"
        ctx.strokeStyle = 'rgba(30, 231, 255, 0.2)';
        ctx.lineWidth = 1;
        for(let i=0; i<500; i+=25) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 250); ctx.stroke();
        }
        for(let j=0; j<250; j+=25) {
            ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(500, j); ctx.stroke();
        }
        
        // Linia środkowa
        ctx.strokeStyle = 'rgba(30, 231, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, 125); ctx.lineTo(500, 125); ctx.stroke();

        // 1. FALA DOCELOWA (Zepsuty silnik) - Czerwona
        ctx.strokeStyle = 'rgba(255, 68, 68, 0.6)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for(let x=0; x<500; x++) {
            let y = 125 + Math.sin(x / targetFreq + targetPhase/10) * targetAmp;
            if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.stroke();

        // 2. FALA UŻYTKOWNIKA (Sterowanie) - Cyjanowa
        const userAmp = parseInt(ampSlider.value);
        const userFreq = parseInt(freqSlider.value);
        const userPhase = stage === 2 ? parseInt(phaseSlider.value) : 0;

        ctx.strokeStyle = termFgColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        for(let x=0; x<500; x++) {
            let y = 125 + Math.sin(x / userFreq + userPhase/10) * userAmp;
            if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.stroke();
    }

    // Aktualizacja wykresu w czasie rzeczywistym
    ampSlider.addEventListener('input', drawWaves);
    freqSlider.addEventListener('input', drawWaves);
    phaseSlider.addEventListener('input', drawWaves);

    // Renderowanie początkowe
    drawWaves();

    // Sprawdzanie warunku zwycięstwa
    checkBtn.addEventListener('click', () => {
        const userAmp = parseInt(ampSlider.value);
        const userFreq = parseInt(freqSlider.value);
        const userPhase = stage === 2 ? parseInt(phaseSlider.value) : 0;

        // Margines błędu +/- 4 jednostki żeby nie frustrować dzieci
        const ampDiff = Math.abs(userAmp - targetAmp);
        const freqDiff = Math.abs(userFreq - targetFreq);
        const phaseDiff = Math.abs(userPhase - targetPhase);

        if (ampDiff <= 4 && freqDiff <= 4 && phaseDiff <= 4) {
            feedback.style.color = 'var(--success)';
            feedback.textContent = "SYNCHRONIZACJA ZAKOŃCZONA SUKCESEM!";
            checkBtn.disabled = true;
            
            // Lekkie mignięcie wygranego canvasu na zielono dla super efektu
            canvas.style.boxShadow = "inset 0 0 30px rgba(34, 197, 94, 0.5)";
            
            setTimeout(() => {
                winStage(moduleKey);
            }, 1800);
        } else {
            feedback.style.color = 'var(--danger)';
            feedback.textContent = "BŁĄD: SYGNAŁY NIE POKRYWAJĄ SIĘ.";
            
            // Efekt zniknięcia błędu po 2 sekundach
            setTimeout(() => {
                feedback.textContent = "";
            }, 2000);
        }
    });
}

// --- LOGIKA GRY: RUROCIĄGI (WENTYLACJA) ---
// Minigra: obracaj segmenty rurociągu, aby połączyć wejście z wyjściem
function initPipesGame(moduleKey, container) {
    let grid = [
        { id: 0,  t: 'line',   target: 0, r: Math.floor(Math.random() * 4) }, // Start
        { id: 1,  t: 'line',   target: 0, r: Math.floor(Math.random() * 4) },
        { id: 2,  t: 'corner', target: 1, r: Math.floor(Math.random() * 4) }, // Skręt w dół
        { id: 3,  t: 'corner', target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        { id: 4,  t: 'line',   target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        
        { id: 5,  t: 'corner', target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        { id: 6,  t: 'line',   target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        { id: 7,  t: 'corner', target: 3, r: Math.floor(Math.random() * 4) }, // Skręt w prawo
        { id: 8,  t: 'corner', target: 1, r: Math.floor(Math.random() * 4) }, // Skręt w dół
        { id: 9,  t: 'corner', target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        
        { id: 10, t: 'line',   target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        { id: 11, t: 'corner', target: 0, r: Math.floor(Math.random() * 4) }, // Skręt w dół
        { id: 12, t: 'line',   target: 0, r: Math.floor(Math.random() * 4) }, // W lewo
        { id: 13, t: 'corner', target: 2, r: Math.floor(Math.random() * 4) }, // Skręt w lewo
        { id: 14, t: 'line',   target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        
        { id: 15, t: 'corner', target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        { id: 16, t: 'corner', target: 3, r: Math.floor(Math.random() * 4) }, // Skręt w prawo
        { id: 17, t: 'corner', target: 1, r: Math.floor(Math.random() * 4) }, // Skręt w dół
        { id: 18, t: 'line',   target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        { id: 19, t: 'corner', target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        
        { id: 20, t: 'line',   target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        { id: 21, t: 'corner', target: -1,r: Math.floor(Math.random() * 4) }, // Zmyłka
        { id: 22, t: 'corner', target: 3, r: Math.floor(Math.random() * 4) }, // Skręt w prawo
        { id: 23, t: 'line',   target: 0, r: Math.floor(Math.random() * 4) }, // W prawo
        { id: 24, t: 'line',   target: 0, r: Math.floor(Math.random() * 4) }  // Koniec
    ];

    const svgs = {
        line: `<svg viewBox="0 0 100 100"><rect x="0" y="35" width="100" height="30" fill="var(--term-fg)"/></svg>`,
        corner: `<svg viewBox="0 0 100 100"><rect x="35" y="35" width="65" height="30" fill="var(--term-fg)"/><rect x="35" y="35" width="30" height="65" fill="var(--term-fg)"/></svg>`
    };

    container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%;">
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 20px;">
                <!-- Wskaźnik WEJŚCIA umiejscowiony naturalnie obok siatki -->
                <div style="color: var(--success); font-weight: bold; text-align: right; font-size: 1.2rem; text-shadow: 0 0 8px var(--success); margin-top: -200px;">
                    IN &#10142;
                </div>
                
                <!-- Siatka 5x5 -->
                <div id="pipesGrid" style="display: grid; grid-template-columns: repeat(5, 55px); grid-template-rows: repeat(5, 55px); gap: 4px; background: var(--term-dim); padding: 10px; border: 2px solid var(--term-fg); box-shadow: inset 0 0 20px rgba(30,231,255,0.1);">
                    ${grid.map((cell, index) => {
                        let bg = '#000';
                        if (index === 0 || index === 24) bg = 'rgba(34, 197, 94, 0.15)'; // Start i meta na zielono
                        return `
                        <div class="pipe-cell" data-id="${cell.id}" style="width: 100%; height: 100%; background: ${bg}; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: transform 0.2s ease; transform: rotate(${cell.r * 90}deg); border-radius: 4px;">
                            ${svgs[cell.t]}
                        </div>`;
                    }).join('')}
                </div>

                <!-- Wskaźnik WYJŚCIA -->
                <div style="color: var(--success); font-weight: bold; text-align: left; font-size: 1.2rem; text-shadow: 0 0 8px var(--success); margin-top: 200px;">
                    &#10142; OUT
                </div>
            </div>

            <button id="checkPipesBtn" style="width: 250px; min-height: 50px; margin-top: 10px;">WERYFIKUJ PRZEPŁYW</button>
            <p id="pipesFeedback" style="color: var(--danger); margin-top: 15px; height: 20px; font-weight: bold; text-align: center;"></p>
        </div>
    `;

    const checkBtn = document.getElementById('checkPipesBtn');
    const feedback = document.getElementById('pipesFeedback');
    
    document.querySelectorAll('.pipe-cell').forEach(cellElement => {
        const id = parseInt(cellElement.getAttribute('data-id'));
        // Kąt animacji rośnie bez zawijania, żeby obrót zawsze szedł do przodu o 90°
        let visualDeg = grid[id].r * 90;

        cellElement.addEventListener('click', function() {
            if(checkBtn.disabled) return;
            const cell = grid[id];
            cell.r = (cell.r + 1) % 4; // stan logiczny 0-3, używany do sprawdzania rozwiązania
            visualDeg += 90;
            this.style.transform = `rotate(${visualDeg}deg)`;
        });
    });

    checkBtn.addEventListener('click', () => {
        let isSolved = true;
        for (let cell of grid) {
            if (cell.target !== -1) {
                if (cell.t === 'line' && (cell.r % 2 !== cell.target % 2)) isSolved = false;
                else if (cell.t === 'corner' && cell.r !== cell.target) isSolved = false;
            }
        }

        if (isSolved) {
            feedback.style.color = 'var(--success)';
            feedback.textContent = "PRZEPŁYW USTABILIZOWANY.";
            checkBtn.disabled = true;

            // Podświetl tylko komórki na trasie (target !== -1), pomijając ślepe zaułki
            document.querySelectorAll('.pipe-cell').forEach(cellEl => {
                const cellId = parseInt(cellEl.getAttribute('data-id'));
                if (grid[cellId].target !== -1) {
                    cellEl.style.background = 'rgba(34, 197, 94, 0.25)';
                    cellEl.style.boxShadow = '0 0 12px rgba(34, 197, 94, 0.6)';
                    cellEl.querySelectorAll('rect').forEach(rect => rect.setAttribute('fill', 'var(--success)'));
                }
            });

            setTimeout(() => winStage(moduleKey), 2000);
        } else {
            feedback.style.color = 'var(--danger)';
            feedback.textContent = "BŁĄD: ROZSZCZELNIENIE KANAŁÓW.";
            setTimeout(() => feedback.textContent = "", 2000);
        }
    });
}

// --- LOGIKA GRY: NADAJNIK (ŁĄCZENIE KABLI / FLOW FREE) ---
// Minigra: połącz pary węzłów tego samego koloru, nie przecinając ścieżek
function initTransmitterGame(moduleKey, container) {
    const cols = 7; 
    
    const endpoints = {
        0: 'orange', 28: 'orange',   
        2: 'green', 4: 'green',      
        5: 'blue', 27: 'blue',       
        7: 'yellow', 30: 'yellow',   
        9: 'magenta', 18: 'magenta', 
        12: 'cyan', 25: 'cyan',      
        29: 'red', 40: 'red'         
    };

    const colors = {
        'red': 'var(--danger)',
        'blue': '#2962ff',           
        'green': 'var(--success)',
        'yellow': '#ffeb3b',
        'orange': '#ff9800',
        'magenta': '#e040fb',
        'cyan': 'var(--term-fg)'     
    };

    const symbols = {
        'orange': 'A', 'green': 'B', 'blue': 'C', 'yellow': 'D',
        'magenta': 'E', 'cyan': 'F', 'red': 'G'
    };

    let paths = { red: [], blue: [], green: [], yellow: [], orange: [], magenta: [], cyan: [] };
    let isDrawing = null; 
    let isMouseDown = false; 

    const cellSize = 60;
    const gap = 4;
    const padding = 6; 

    let html = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; user-select: none; -webkit-user-select: none;">
            
            <div style="position: relative; margin-bottom: 25px;">
                <div id="svgWrapper" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;">
                    <svg width="100%" height="100%"></svg>
                </div>
                
                <div id="flowGrid" style="display: grid; grid-template-columns: repeat(${cols}, ${cellSize}px); grid-template-rows: repeat(${cols}, ${cellSize}px); gap: ${gap}px; background: var(--term-bg); padding: ${padding}px; border: 2px solid var(--term-fg); position: relative; touch-action: none; transition: all 0.3s ease;">
    `;

    for(let i = 0; i < cols * cols; i++) {
        html += `<div class="flow-cell" data-id="${i}" style="width: 100%; height: 100%; background: var(--term-dim); position: relative; cursor: pointer; border-radius: 4px;">`;
        if (endpoints[i]) {
            html += `<div style="position: absolute; top: 15%; left: 15%; width: 70%; height: 70%; background: ${colors[endpoints[i]]}; border-radius: 50%; pointer-events: none; box-shadow: 0 0 10px ${colors[endpoints[i]]}; z-index: 10; display: flex; align-items: center; justify-content: center; color: var(--term-bg); font-weight: bold; font-size: 1.4rem; font-family: Arial, sans-serif;">${symbols[endpoints[i]]}</div>`;
        }
        html += `</div>`;
    }

    html += `
                </div>
            </div>

            <button id="checkFlowBtn" style="width: 320px; min-height: 55px;">ZAUTORYZUJ POŁĄCZENIA</button>
            <p id="flowFeedback" style="color: var(--danger); margin-top: 15px; height: 20px; font-weight: bold; text-align: center;"></p>
        </div>
    `;
    container.innerHTML = html;

    const gridBox = document.getElementById('flowGrid');
    const svgWrapper = document.getElementById('svgWrapper');
    const checkBtn = document.getElementById('checkFlowBtn');
    const feedback = document.getElementById('flowFeedback');

    // Rysuje aktualne ścieżki jako linie SVG
    function drawPaths() {
        let svgHtml = `<svg width="100%" height="100%">`;
        Object.keys(paths).forEach(color => {
            const p = paths[color];
            if (p.length > 0) {
                let points = p.map(id => {
                    let x = (id % cols) * (cellSize + gap) + padding + (cellSize / 2);
                    let y = Math.floor(id / cols) * (cellSize + gap) + padding + (cellSize / 2);
                    return `${x},${y}`;
                }).join(' ');
                
                svgHtml += `<polyline points="${points}" fill="none" stroke="${colors[color]}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 5px ${colors[color]});" />`;
            }
        });
        svgHtml += `</svg>`;
        svgWrapper.innerHTML = svgHtml; 
    }

    // Rozpoczyna nową ścieżkę od węzła-końcówki albo wznawia rysowanie od punktu na istniejącej ścieżce
    function handleStart(id) {
        if (checkBtn.disabled) return;
        if (endpoints[id]) {
            isDrawing = endpoints[id];
            paths[isDrawing] = [id]; 
            drawPaths();
        } else {
            for (let color in paths) {
                let idx = paths[color].indexOf(id);
                if (idx !== -1) {
                    isDrawing = color;
                    paths[color] = paths[color].slice(0, idx + 1);
                    drawPaths();
                    break;
                }
            }
        }
    }

    // Przedłuża, skraca albo kończy aktualnie rysowaną ścieżkę w zależności od komórki, na którą wjedzie kursor
    function handleMove(id) {
        if (!isDrawing || checkBtn.disabled) return;
        let currentPath = paths[isDrawing];
        if (!currentPath || currentPath.length === 0) return;
        let lastId = currentPath[currentPath.length - 1];
        if (id === lastId) return;

        let isAdjacent = Math.abs((id % cols) - (lastId % cols)) + Math.abs(Math.floor(id / cols) - Math.floor(lastId / cols)) === 1;

        if (isAdjacent) {
            if (endpoints[id] === isDrawing) {
                if (currentPath.length > 1 || currentPath[0] !== id) {
                    currentPath.push(id);
                    isDrawing = null; 
                    drawPaths();
                }
            } else if (!endpoints[id]) {
                let occupiedBy = null;
                for (let color in paths) {
                    if (paths[color].includes(id)) occupiedBy = color;
                }

                if (occupiedBy === isDrawing) {
                    paths[isDrawing] = currentPath.slice(0, currentPath.indexOf(id) + 1);
                    drawPaths();
                } else if (!occupiedBy) {
                    currentPath.push(id);
                    drawPaths();
                }
            }
        }
    }

    document.querySelectorAll('.flow-cell').forEach(cell => {
        cell.addEventListener('mousedown', (e) => {
            e.preventDefault(); 
            isMouseDown = true;
            handleStart(parseInt(cell.getAttribute('data-id')));
        });
        cell.addEventListener('mouseover', (e) => {
            e.preventDefault();
            if (isMouseDown) {
                handleMove(parseInt(cell.getAttribute('data-id')));
            }
        });
    });

    if(window.flowMouseUp) document.removeEventListener('mouseup', window.flowMouseUp);
    window.flowMouseUp = () => { isMouseDown = false; isDrawing = null; };
    document.addEventListener('mouseup', window.flowMouseUp);

    gridBox.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isMouseDown = true;
        let touch = e.touches[0];
        let el = document.elementFromPoint(touch.clientX, touch.clientY);
        let cell = el ? el.closest('.flow-cell') : null;
        if (cell) handleStart(parseInt(cell.getAttribute('data-id')));
    }, { passive: false });

    gridBox.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isMouseDown) return;
        let touch = e.touches[0];
        let el = document.elementFromPoint(touch.clientX, touch.clientY);
        let cell = el ? el.closest('.flow-cell') : null;
        if (cell) handleMove(parseInt(cell.getAttribute('data-id')));
    }, { passive: false });

    if(window.flowTouchEnd) document.removeEventListener('touchend', window.flowTouchEnd);
    window.flowTouchEnd = () => { isMouseDown = false; isDrawing = null; };
    document.addEventListener('touchend', window.flowTouchEnd);

    checkBtn.addEventListener('click', () => {
        let isSolved = true;
        for (let color of Object.keys(colors)) {
            let p = paths[color];
            if (!p || p.length < 2) { isSolved = false; break; }
            if (endpoints[p[0]] !== color || endpoints[p[p.length - 1]] !== color) { isSolved = false; break; }
        }

        if (isSolved) {
            feedback.style.color = 'var(--success)';
            feedback.textContent = "SYNCHRONIZACJA ZAKOŃCZONA SUKCESEM.";
            checkBtn.disabled = true;
            gridBox.style.boxShadow = "0 0 30px rgba(34, 197, 94, 0.5)";
            gridBox.style.borderColor = "var(--success)";
            setTimeout(() => winStage(moduleKey), 2000);
        } else {
            feedback.style.color = 'var(--danger)';
            feedback.textContent = "BŁĄD: ZBYT MAŁO POŁĄCZEŃ LUB PRZEWODY SĄ PRZERWANE.";
            setTimeout(() => feedback.textContent = "", 2000);
        }
    });
}

// --- LOGIKA GRY: RDZEŃ PAMIĘCI (DOTS / KROPKI Z CYFRAMI) ---
// Minigra: zapal węzły w rogach sektorów tak, by suma przy każdym sektorze zgadzała się z podaną cyfrą
function initMemoryCoreGame(moduleKey, container) {
    const cols = 4; 
    const dotCols = cols + 1;
    const totalDots = dotCols * dotCols;
    const totalCells = cols * cols;
    const cellSize = 60; 
    const offset = 25; // margines wewnętrzny planszy (px)

    // Losujemy układ zapalonych węzłów - to jest jednocześnie ukryte, poprawne rozwiązanie.
    // Powtarzamy losowanie dopóki plansza nie będzie miała min. 3 różnych wartości docelowych
    // (żeby uniknąć trywialnych łamigłówek typu "same zera" albo "same czwórki").
    let secretPattern, cellTargets;
    do {
        secretPattern = Array(totalDots).fill(0).map(() => Math.random() > 0.4 ? 1 : 0);
        cellTargets = [];
        for (let r = 0; r < cols; r++) {
            for (let c = 0; c < cols; c++) {
                let tl = r * dotCols + c;
                let tr = tl + 1;
                let bl = (r + 1) * dotCols + c;
                let br = bl + 1;
                let sum = secretPattern[tl] + secretPattern[tr] + secretPattern[bl] + secretPattern[br];
                cellTargets.push(sum);
            }
        }
    } while (new Set(cellTargets).size < 3 || cellTargets.filter(v => v === 0).length > 2);

    let isLit = Array(totalDots).fill(false);

    let html = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; user-select: none;">
            
            <div style="position: relative; margin-bottom: 30px; padding: ${offset}px; background: rgba(0,0,0,0.3); border-radius: 8px; box-shadow: inset 0 0 20px rgba(0,0,0,0.8);">
                
                <!-- Siatka Klastrów (Kwadraty z cyframi) -->
                <div id="coreCellsGrid" style="display: grid; grid-template-columns: repeat(${cols}, ${cellSize}px); grid-template-rows: repeat(${cols}, ${cellSize}px); background: var(--term-bg); border: 2px solid var(--term-fg); box-shadow: 0 0 15px rgba(30,231,255,0.2); transition: all 0.3s ease;">
    `;

    // Generowanie HTML dla wszystkich sektorów z jawnymi cyframami
    for(let i = 0; i < totalCells; i++) {
        html += `<div class="core-cell" data-id="${i}" style="border: 1px solid rgba(30, 231, 255, 0.3); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: bold; color: var(--term-fg); transition: all 0.3s ease;">${cellTargets[i]}</div>`;
    }

    html += `</div>`; 

    // Generowanie HTML dla Węzłów (Kropek)
    for(let i = 0; i < totalDots; i++) {
        let r = Math.floor(i / dotCols);
        let c = i % dotCols;
        let top = r * cellSize + offset - 12; 
        let left = c * cellSize + offset - 12;
        
        html += `<div class="core-dot" data-id="${i}" style="position: absolute; top: ${top}px; left: ${left}px; width: 24px; height: 24px; background: var(--term-dim); border: 2px solid var(--term-fg); border-radius: 50%; cursor: pointer; z-index: 10; transition: all 0.2s ease;"></div>`;
    }

    html += `
            </div>
            <button id="checkCoreBtn" style="width: 280px; min-height: 55px;">ZAUTORYZUJ RDZEŃ</button>
            <p id="coreFeedback" style="color: var(--danger); margin-top: 15px; height: 20px; font-weight: bold; text-align: center;"></p>
        </div>
    `;
    container.innerHTML = html;

    const checkBtn = document.getElementById('checkCoreBtn');
    const feedback = document.getElementById('coreFeedback');
    const dots = document.querySelectorAll('.core-dot');
    const cellDivs = document.querySelectorAll('.core-cell');

    // Przelicza sumy przy sektorach na podstawie zapalonych węzłów i koloruje je odpowiednio
    function updateCells() {
        cellDivs.forEach((cell, i) => {
            let r = Math.floor(i / cols);
            let c = i % cols;
            let tl = r * dotCols + c;
            let tr = tl + 1;
            let bl = (r + 1) * dotCols + c;
            let br = bl + 1;

            let currentSum = (isLit[tl]?1:0) + (isLit[tr]?1:0) + (isLit[bl]?1:0) + (isLit[br]?1:0);

            if (currentSum === cellTargets[i]) {
                cell.style.color = 'var(--success)';
                cell.style.textShadow = '0 0 10px var(--success)';
                cell.style.background = 'rgba(34, 197, 94, 0.1)'; // Delikatne podświetlenie tła
            } else if (currentSum > cellTargets[i]) {
                cell.style.color = 'var(--danger)';
                cell.style.textShadow = '0 0 10px var(--danger)';
                cell.style.background = 'transparent';
            } else {
                cell.style.color = 'var(--term-fg)';
                cell.style.textShadow = 'none';
                cell.style.background = 'transparent';
            }
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            if (checkBtn.disabled) return;
            
            let id = parseInt(dot.getAttribute('data-id'));
            isLit[id] = !isLit[id];
            
            if (isLit[id]) {
                dot.style.background = 'var(--term-fg)';
                dot.style.boxShadow = '0 0 12px var(--term-fg)';
            } else {
                dot.style.background = 'var(--term-dim)';
                dot.style.boxShadow = 'none';
            }
            
            updateCells();
        });
    });

    checkBtn.addEventListener('click', () => {
        let isSolved = true;
        
        for (let i = 0; i < totalCells; i++) {
            let r = Math.floor(i / cols);
            let c = i % cols;
            let tl = r * dotCols + c;
            let tr = tl + 1;
            let bl = (r + 1) * dotCols + c;
            let br = bl + 1;

            let currentSum = (isLit[tl]?1:0) + (isLit[tr]?1:0) + (isLit[bl]?1:0) + (isLit[br]?1:0);
            
            if (currentSum !== cellTargets[i]) {
                isSolved = false;
                break;
            }
        }

        if (isSolved) {
            feedback.style.color = 'var(--success)';
            feedback.textContent = "KLASTRY PAMIĘCI ZAUTORYZOWANE.";
            checkBtn.disabled = true;
            document.getElementById('coreCellsGrid').style.boxShadow = "0 0 30px rgba(34, 197, 94, 0.5)";
            document.getElementById('coreCellsGrid').style.borderColor = "var(--success)";
            setTimeout(() => winStage(moduleKey), 2000);
        } else {
            feedback.style.color = 'var(--danger)';
            feedback.textContent = "BŁĄD: NIEZGODNOŚĆ SUM KONTROLNYCH.";
            setTimeout(() => feedback.textContent = "", 2000);
        }
    });
    
    updateCells();
}

// --- LOGIKA GRY: NAWIGACJA (AUTOPILOT) ---
// Minigra: zaprogramuj sekwencję ruchów, aby dolecieć do celu omijając przeszkody
function initNavigationGame(stage, moduleKey, container) {
    const size = 6; 
    const colLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    let startPos = { x: 0, y: 5 }; // A6
    let targetPos = stage === 1 ? { x: 5, y: 0 } : { x: 5, y: 5 }; // F1 lub F6
    let keyPos = stage === 2 ? { x: 0, y: 0 } : null; // A1
    let keyCollected = stage === 1; 
    
    let walls = stage === 1 
        ? [{x:2,y:2}, {x:2,y:3}, {x:3,y:2}, {x:3,y:3}, {x:2,y:1}, {x:3,y:4}] 
        : [
            {x:1,y:0}, {x:1,y:1}, {x:1,y:2}, 
            {x:2,y:4}, {x:2,y:5},            
            {x:4,y:2}, {x:4,y:3}, {x:4,y:4}  
          ];

    let currentShipPos = { ...startPos };
    let shipAngle = stage === 1 ? 0 : 90; // 0: góra, 90: prawo
    let sequence = [];
    let isExecuting = false;
    let activeStepIndex = -1;
    let interval = null;

    let visitedCells = new Set();
    visitedCells.add(`${startPos.x},${startPos.y}`);

    const dirSymbols = { 'UP': '▲', 'DOWN': '▼', 'LEFT': '◀', 'RIGHT': '▶' };

    function getCoordLabel(pos) {
        if (!pos || pos.x < 0 || pos.x >= size || pos.y < 0 || pos.y >= size) return '???';
        return `${colLabels[pos.x]}${pos.y + 1}`;
    }

    let html = `
        <div class="nav-container-2col">
            <!-- LEWY PANEL: RADAR -->
            <div class="nav-panel-left">
                <div class="nav-radar-area">
                    <div class="nav-coord-cols">
                        <div></div>
                        <div>A</div><div>B</div><div>C</div><div>D</div><div>E</div><div>F</div>
                    </div>
                    <div class="nav-grid-row-wrap">
                        <div class="nav-coord-rows">
                            <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>
                        </div>
                        <div id="navGrid" class="nav-grid">
                            ${Array(size * size).fill(0).map((_, i) => `<div class="nav-cell" data-id="${i}"></div>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="nav-radar-telemetry">
                    <span>POZYCJA: <strong id="navCoordShip" style="color: var(--term-fg); text-shadow: 0 0 5px var(--term-fg);">${getCoordLabel(startPos)}</strong></span>
                    <span>BAZA: <strong id="navCoordTarget" style="color: var(--success);">${getCoordLabel(targetPos)}</strong></span>
                </div>
            </div>

            <!-- PRAWY PANEL: KONSOLA STEROWANIA -->
            <div class="nav-panel-right">
                <!-- Telemetria i status klucza -->
                <div class="nav-hud-row">
                    <span>SYSTEM: <strong style="color: var(--term-fg);">AUTOPILOT</strong></span>
                    <span id="navHudKeyBadge">
                        ${stage === 2 
                            ? `<span class="nav-hud-badge ${keyCollected ? 'ok' : 'req'}" id="navHudKey">${keyCollected ? 'KLUCZ: POBRANY [OK]' : 'KLUCZ: WYMAGANY'}</span>`
                            : `<span class="nav-hud-badge ok">KOD: GOTOWY</span>`
                        }
                    </span>
                </div>

                <!-- Pamięć rozkazów (Matryca 24 slotów, 6x4, ZERO scrollbara) -->
                <div>
                    <div class="nav-seq-header">
                        <span>PAMIĘĆ ROZKAZÓW</span>
                        <span class="nav-seq-counter" id="navSeqCounter">0 / 24</span>
                    </div>
                    <div class="nav-seq-display" id="sequenceDisplay">
                        <!-- 24 sloty renderowane przez JS -->
                    </div>
                </div>

                <!-- Klawiatura strzałek -->
                <div class="nav-keypad">
                    <div></div>
                    <button class="nav-btn" data-dir="UP" title="Kierunek GÓRA (W / Strzałka w górę)">▲</button>
                    <div></div>
                    <button class="nav-btn" data-dir="LEFT" title="Kierunek LEWO (A / Strzałka w lewo)">◀</button>
                    <button class="nav-btn" data-dir="DOWN" title="Kierunek DÓŁ (S / Strzałka w dół)">▼</button>
                    <button class="nav-btn" data-dir="RIGHT" title="Kierunek PRAWO (D / Strzałka w prawo)">▶</button>
                </div>

                <!-- Rząd akcji -->
                <div class="nav-actions">
                    <button id="navExecuteBtn" class="nav-exec-btn" title="Uruchom sekwencję (Enter / Spacja)">START SEKWENCJI</button>
                    <button id="navUndoBtn" class="nav-icon-btn" title="Cofnij ostatnią komendę (Backspace)">⌫</button>
                    <button id="navClearBtn" class="nav-icon-btn danger" title="Wyczyść całą sekwencję (Delete / Escape)">✕</button>
                </div>

                <div class="nav-hint-bar">
                    KLAWIATURA: [W,A,S,D / STRZAŁKI] | [ENTER] START | [BKSP] | [ESC]
                </div>

                <p id="navFeedback" class="nav-feedback"></p>
            </div>
        </div>
    `;
    container.innerHTML = html;

    const cells = document.querySelectorAll('.nav-cell');
    const navGrid = document.getElementById('navGrid');
    const seqDisplay = document.getElementById('sequenceDisplay');
    const seqCounter = document.getElementById('navSeqCounter');
    const executeBtn = document.getElementById('navExecuteBtn');
    const undoBtn = document.getElementById('navUndoBtn');
    const clearBtn = document.getElementById('navClearBtn');
    const feedback = document.getElementById('navFeedback');
    const coordShipEl = document.getElementById('navCoordShip');
    const hudKeyEl = document.getElementById('navHudKey');

    // Czyszczenie timera i listenera klawiatury przy zmianie modułu
    window.activeGameCleanup = () => {
        if (interval) clearInterval(interval);
        window.removeEventListener('keydown', handleKeyDown);
    };

    function getIndex(x, y) { return y * size + x; }

    function updateHud() {
        if (coordShipEl) coordShipEl.textContent = getCoordLabel(currentShipPos);
        if (hudKeyEl && stage === 2) {
            if (keyCollected) {
                hudKeyEl.className = 'nav-hud-badge ok';
                hudKeyEl.textContent = 'KLUCZ: POBRANY [OK]';
            } else {
                hudKeyEl.className = 'nav-hud-badge req';
                hudKeyEl.textContent = 'KLUCZ: WYMAGANY';
            }
        }
    }

    // Rysuje stan mapy radaru
    function drawMap() {
        cells.forEach((c, idx) => {
            const x = idx % size;
            const y = Math.floor(idx / size);
            c.className = 'nav-cell';
            c.innerHTML = '';

            if (visitedCells.has(`${x},${y}`) && !(currentShipPos.x === x && currentShipPos.y === y)) {
                c.classList.add('nav-cell-trail');
            }
        });

        // Przeszkody
        walls.forEach(w => {
            let idx = getIndex(w.x, w.y);
            cells[idx].className = 'nav-cell nav-cell-wall';
            cells[idx].innerHTML = '✕';
        });

        // Klucz (Etap 2)
        if (keyPos && !keyCollected) {
            let idx = getIndex(keyPos.x, keyPos.y);
            cells[idx].className = 'nav-cell nav-cell-key';
            cells[idx].innerHTML = '<span style="color: #facc15; font-size: 1.4rem;">🔑</span>';
        }

        // Baza / Cel
        let targetIdx = getIndex(targetPos.x, targetPos.y);
        cells[targetIdx].className = 'nav-cell nav-cell-target';
        cells[targetIdx].innerHTML = '<span style="color: var(--success); font-size: 1.4rem;">⌖</span>';

        // Statek
        if (currentShipPos.x >= 0 && currentShipPos.x < size && currentShipPos.y >= 0 && currentShipPos.y < size) {
            let shipIdx = getIndex(currentShipPos.x, currentShipPos.y);
            cells[shipIdx].classList.add('nav-cell-ship');
            cells[shipIdx].innerHTML = `<span class="nav-ship" style="transform: rotate(${shipAngle}deg);">▲</span>`;
        }
    }

    // Odświeża sekwencję 24 slotów (6 kolumn x 4 wiersze) - brak scrollbara
    function updateSequenceDisplay() {
        if (seqCounter) {
            seqCounter.textContent = `${sequence.length} / 24`;
        }

        let slotsHtml = '';
        for (let i = 0; i < 24; i++) {
            if (i < sequence.length) {
                const dir = sequence[i];
                let stateClass = '';
                if (activeStepIndex === i) stateClass = 'active';
                else if (activeStepIndex > i) stateClass = 'done';
                slotsHtml += `<div class="nav-cmd-tile ${stateClass}">${dirSymbols[dir]}</div>`;
            } else {
                slotsHtml += `<div class="nav-cmd-slot-empty">·</div>`;
            }
        }
        seqDisplay.innerHTML = slotsHtml;
    }

    function addCommand(dir) {
        if (isExecuting || sequence.length >= 24) return;
        sequence.push(dir);
        updateSequenceDisplay();

        const btn = container.querySelector(`.nav-btn[data-dir="${dir}"]`);
        if (btn) {
            btn.classList.add('key-pressed');
            setTimeout(() => btn.classList.remove('key-pressed'), 120);
        }
    }

    function undoCommand() {
        if (isExecuting || sequence.length === 0) return;
        sequence.pop();
        updateSequenceDisplay();

        undoBtn.classList.add('key-pressed');
        setTimeout(() => undoBtn.classList.remove('key-pressed'), 120);
    }

    function clearCommand() {
        if (isExecuting || sequence.length === 0) return;
        sequence = [];
        updateSequenceDisplay();

        clearBtn.classList.add('key-pressed');
        setTimeout(() => clearBtn.classList.remove('key-pressed'), 120);
    }

    // Obsługa przycisków myszy
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            addCommand(btn.getAttribute('data-dir'));
        });
    });

    undoBtn.addEventListener('click', undoCommand);
    clearBtn.addEventListener('click', clearCommand);

    // Obsługa klawiatury
    function handleKeyDown(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (isExecuting) return;

        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
            e.preventDefault();
            addCommand('UP');
        } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
            e.preventDefault();
            addCommand('DOWN');
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            e.preventDefault();
            addCommand('LEFT');
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            e.preventDefault();
            addCommand('RIGHT');
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            undoCommand();
        } else if (e.key === 'Delete' || e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
            e.preventDefault();
            clearCommand();
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            executeBtn.click();
        }
    }
    window.addEventListener('keydown', handleKeyDown);

    // Uruchomienie sekwencji
    executeBtn.addEventListener('click', () => {
        if (isExecuting || sequence.length === 0) return;
        isExecuting = true;
        feedback.textContent = "";
        executeBtn.disabled = true;
        undoBtn.disabled = true;
        clearBtn.disabled = true;
        
        currentShipPos = { ...startPos };
        shipAngle = stage === 1 ? 0 : 90;
        keyCollected = stage === 1; 
        visitedCells.clear();
        visitedCells.add(`${startPos.x},${startPos.y}`);

        activeStepIndex = 0;
        updateHud();
        drawMap();
        updateSequenceDisplay();

        let step = 0;
        
        interval = setInterval(() => {
            if (step >= sequence.length) {
                clearInterval(interval);
                interval = null;
                activeStepIndex = -1;
                updateSequenceDisplay();
                
                if (currentShipPos.x === targetPos.x && currentShipPos.y === targetPos.y) {
                    if (keyCollected) {
                        feedback.style.color = 'var(--success)';
                        feedback.textContent = "DOKOWANIE ZAKOŃCZONE SUKCESEM.";
                        navGrid.classList.add('success-flash');
                        window.removeEventListener('keydown', handleKeyDown);
                        setTimeout(() => winStage(moduleKey), 1800);
                    } else {
                        failRun("BŁĄD: BRAK KLUCZA AUTORYZACYJNEGO PRZED DOKOWANIEM!");
                    }
                } else {
                    failRun("BŁĄD: NIE OSIĄGNIĘTO BAZY DOKUJĄCEJ!");
                }
                return;
            }

            let dir = sequence[step];
            if (dir === 'UP') { currentShipPos.y -= 1; shipAngle = 0; }
            if (dir === 'DOWN') { currentShipPos.y += 1; shipAngle = 180; }
            if (dir === 'LEFT') { currentShipPos.x -= 1; shipAngle = 270; }
            if (dir === 'RIGHT') { currentShipPos.x += 1; shipAngle = 90; }

            // Sprawdzenie kolizji z krawędzią sektora
            if (currentShipPos.x < 0 || currentShipPos.x >= size || currentShipPos.y < 0 || currentShipPos.y >= size) {
                clearInterval(interval);
                interval = null;
                failRun("KRYTYCZNE USZKODZENIE: OPUSZCZONO SEKTOR!");
                return;
            }

            // Sprawdzenie kolizji z przeszkodą
            if (walls.some(w => w.x === currentShipPos.x && w.y === currentShipPos.y)) {
                clearInterval(interval);
                interval = null;
                failRun(`KOLIZJA: SEKTOR [${getCoordLabel(currentShipPos)}] ZABLOKOWANY!`);
                return;
            }

            // Zebranie klucza (Etap 2)
            if (keyPos && currentShipPos.x === keyPos.x && currentShipPos.y === keyPos.y) {
                keyCollected = true;
            }

            visitedCells.add(`${currentShipPos.x},${currentShipPos.y}`);
            step++;
            activeStepIndex = step < sequence.length ? step : -1;
            updateHud();
            drawMap();
            updateSequenceDisplay();
        }, 320); 
    });

    // Obsługuje nieudaną próbę: pokazuje błąd i resetuje statek do pozycji startowej
    function failRun(msg) {
        feedback.style.color = 'var(--danger)';
        feedback.textContent = msg;
        
        navGrid.classList.add('error-flash');
        activeStepIndex = -1;
        updateSequenceDisplay();

        setTimeout(() => {
            navGrid.classList.remove('error-flash');
            currentShipPos = { ...startPos }; 
            shipAngle = stage === 1 ? 0 : 90;
            keyCollected = stage === 1;
            visitedCells.clear();
            visitedCells.add(`${startPos.x},${startPos.y}`);
            isExecuting = false;
            executeBtn.disabled = false;
            undoBtn.disabled = false;
            clearBtn.disabled = false;
            updateHud();
            drawMap();
        }, 1500);
    }

    updateHud();
    drawMap();
}

// --- KOD ZAKOŃCZENIA MISJI ---
// X: litera kontrolna zależna tylko od numeru drużyny (0 = A, 1 = B ... 25 = Z)
// L: liczba zależna od numeru drużyny i zdobytych punktów
document.getElementById('endMissionBtn').addEventListener('click', () => {
    const confirmed = confirm(
        'Czy na pewno chcesz zakończyć misję?\n\nModuły zostaną zablokowane, a wynik zapisany jako ostateczny. Tej operacji nie można cofnąć.'
    );
    if (!confirmed) return;

    if (typeof window.activeGameCleanup === 'function') {
        try { window.activeGameCleanup(); } catch(e) {}
        window.activeGameCleanup = null;
    }

    const D = parseInt(currentTeam, 10);
    const P = totalPoints;

    const xIndex = ((D + 13) % 26 + 26) % 26;
    const X = String.fromCharCode(65 + xIndex);
    const L = (P + 11) * D + 7;
    const finalCode = `${X}${L}`;

    document.getElementById('endTeamName').textContent = D;
    document.getElementById('endPoints').textContent = P;
    document.getElementById('endCode').textContent = finalCode;

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('endScreen').classList.add('active');
});