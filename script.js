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

// --- ŁADOWANIE GIER ---
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

    // Dynamiczne intruckje dla poszczególnych mini-gierek
if (moduleKey === 'eng') {
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
    else {
        // Placeholder przycisków dla pozostałych gier
        container.innerHTML = `<div style="text-align:center;">
            <p>Tutaj wgramy gierkę: <strong>${mod.name}</strong></p>
            <button onclick="winStage('${moduleKey}')">SYMULUJ WYGRANĄ POZIOMU</button>
        </div>`;
        instr.innerHTML = `Zbadaj interfejs na środku ekranu i przywróć system do działania.`;
    }
}

// Funkcja wywoływana po wygraniu poziomu mini-gry
window.winStage = function(moduleKey) {
    const mod = modules[moduleKey];
    if (mod.points < mod.stages) {
        mod.points++;
        totalPoints++;
        
        if (mod.currentStage < mod.stages) {
            mod.currentStage++;
        }
        
        updateUI();
        loadGame(moduleKey); // Przeładowanie widoku
    }
};

// --- LOGIKA GRY: OSCYLOSKOP (SILNIKI) ---
function initOscilloscopeGame(stage, moduleKey, container) {
    container.innerHTML = `
        <div style="text-align: center; width: 100%;">
            <canvas id="oscCanvas" width="500" height="250" style="background: #001018; border: 2px solid var(--term-fg); border-radius: 8px; margin-bottom: 20px; box-shadow: inset 0 0 15px rgba(30, 231, 255, 0.1); width: 100%; max-width: 500px;"></canvas>
            
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

    // Losujemy parametry zepsutej fali, upewniając się, że nie wylosują się na startowej pozycji suwaków
    let targetAmp = Math.floor(Math.random() * 60) + 20; // 20-80
    let targetFreq = Math.floor(Math.random() * 40) + 15; // 15-55
    let targetPhase = stage === 2 ? Math.floor(Math.random() * 50) + 5 : 0; // 5-55

    // Minimalne przesunięcie żeby gra nie rozwiązała się sama
    if (Math.abs(targetAmp - 50) < 10) targetAmp += 20; 
    if (Math.abs(targetFreq - 35) < 10) targetFreq -= 15;

    // Funkcja rysująca cały oscyloskop
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

        ctx.strokeStyle = 'var(--term-fg)';
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
        cellElement.addEventListener('click', function() {
            if(checkBtn.disabled) return;
            const id = parseInt(this.getAttribute('data-id'));
            const cell = grid[id];
            cell.r = (cell.r + 1) % 4;
            this.style.transform = `rotate(${cell.r * 90}deg)`;
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
            document.getElementById('pipesGrid').style.boxShadow = "inset 0 0 40px rgba(34, 197, 94, 0.6)";
            document.querySelectorAll('.pipe-cell rect').forEach(rect => rect.setAttribute('fill', 'var(--success)'));

            setTimeout(() => winStage(moduleKey), 2000);
        } else {
            feedback.style.color = 'var(--danger)';
            feedback.textContent = "BŁĄD: ROZSZCZELNIENIE KANAŁÓW.";
            setTimeout(() => feedback.textContent = "", 2000);
        }
    });
}

// --- LOGIKA GRY: NADAJNIK (ŁĄCZENIE KABLI / FLOW FREE) ---
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