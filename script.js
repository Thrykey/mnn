// Dane drużyn i kodów zakończenia
    const teamData = {
      '111': { code: '804M' },  '112': { code: '811T' },  '113': { code: '818C' },  '114': { code: '825J' },
      '115': { code: '832Q' },  '116': { code: '839X' },  '117': { code: '846G' },  '118': { code: '853N' },
      '119': { code: '860U' },  '121': { code: '874K' },  '122': { code: '881R' },  '123': { code: '888A' },
      '124': { code: '894G' },  '125': { code: '901N' },  '126': { code: '908U' },  '127': { code: '915D' },
      '128': { code: '922K' },  '129': { code: '929R' },  '131': { code: '943H' },  '132': { code: '950O' },
      '133': { code: '957V' },  '134': { code: '964E' },  '135': { code: '971L' },  '136': { code: '978S' },
      '137': { code: '985B' },  '138': { code: '991H' },  '139': { code: '998O' },  '141': { code: '012M' },
      '142': { code: '019T' },  '143': { code: '026C' },  '144': { code: '033J' },  '145': { code: '040Q' },
      '146': { code: '047X' },  '147': { code: '054G' },  '148': { code: '061N' },  '149': { code: '068U' },
      '151': { code: '082K' },  '152': { code: '088Q' },  '153': { code: '095X' },  '154': { code: '102G' },
      '155': { code: '109N' },  '156': { code: '116U' },  '157': { code: '123D' },  '158': { code: '130K' },
      '159': { code: '137R' },  '161': { code: '151H' },  '162': { code: '158O' },  '163': { code: '165V' },
      '164': { code: '172E' },  '165': { code: '179L' },  '166': { code: '185R' },  '167': { code: '192A' },
      '168': { code: '199H' },  '169': { code: '206O' },  '171': { code: '220E' },  '172': { code: '227L' },
      '173': { code: '234S' },  '174': { code: '241B' },  '175': { code: '248I' },  '176': { code: '255P' },
      '177': { code: '262W' },  '178': { code: '269F' },  '179': { code: '276M' },  '181': { code: '289B' },
      '182': { code: '296I' },  '183': { code: '303P' },  '184': { code: '310W' },  '185': { code: '317F' },
      '186': { code: '324M' },  '187': { code: '331T' },  '188': { code: '338C' },  '189': { code: '345J' },
      '191': { code: '359X' },  '192': { code: '366G' },  '193': { code: '373N' },  '194': { code: '379T' },
      '195': { code: '386C' },  '196': { code: '393J' },  '197': { code: '400Q' },  '198': { code: '407X' },
      '199': { code: '414G' },  '211': { code: '497R' },  '212': { code: '504A' },  '213': { code: '511H' },
      '214': { code: '518O' },  '215': { code: '525V' },  '216': { code: '532E' },  '217': { code: '539L' },
      '218': { code: '546S' },  '219': { code: '553B' },  '221': { code: '567P' },  '222': { code: '573V' },
      '223': { code: '580E' },  '224': { code: '587L' },  '225': { code: '594S' },  '226': { code: '601B' },
      '227': { code: '608I' },  '228': { code: '615P' },  '229': { code: '622W' },  '231': { code: '636M' },
      '232': { code: '643T' },  '233': { code: '650C' },  '234': { code: '657J' },  '235': { code: '664Q' },
      '236': { code: '670W' },  '237': { code: '677F' },  '238': { code: '684M' },  '239': { code: '691T' },
      '241': { code: '705J' },  '242': { code: '712Q' },  '243': { code: '719X' },  '244': { code: '726G' },
      '245': { code: '733N' },  '246': { code: '740U' },  '247': { code: '747D' },  '248': { code: '754K' },
      '249': { code: '761R' },  '251': { code: '774G' },  '252': { code: '781N' },  '253': { code: '788U' },
      '254': { code: '795D' },  '255': { code: '802K' },  '256': { code: '809R' },  '257': { code: '816A' },
      '258': { code: '823H' },  '259': { code: '830O' },  '261': { code: '844E' },  '262': { code: '851L' },
      '263': { code: '857R' },  '264': { code: '864A' },  '265': { code: '871H' },  '266': { code: '878O' },
      '267': { code: '885V' },  '268': { code: '892E' },  '269': { code: '899L' },  '271': { code: '913B' },
      '272': { code: '920I' },  '273': { code: '927P' },  '274': { code: '934W' },  '275': { code: '941F' },
      '276': { code: '948M' },  '277': { code: '954S' },  '278': { code: '961B' },  '279': { code: '968I' },
      '281': { code: '982W' },  '282': { code: '989F' },  '283': { code: '996M' },  '284': { code: '003D' },
      '285': { code: '010K' },  '286': { code: '017R' },  '287': { code: '024A' },  '288': { code: '031H' },
      '289': { code: '038O' },  '291': { code: '051D' },  '292': { code: '058K' },  '293': { code: '065R' },
      '294': { code: '072A' },  '295': { code: '079H' },  '296': { code: '086O' },  '297': { code: '093V' },
      '298': { code: '100E' },  '299': { code: '107L' },  '311': { code: '190W' },  '312': { code: '197F' },
      '313': { code: '204M' },  '314': { code: '211T' },  '315': { code: '218C' },  '316': { code: '225J' },
      '317': { code: '232Q' },  '318': { code: '239X' },  '319': { code: '245F' },  '321': { code: '259T' },
      '322': { code: '266C' },  '323': { code: '273J' },  '324': { code: '280Q' },  '325': { code: '287X' },
      '326': { code: '294G' },  '327': { code: '301N' },  '328': { code: '308U' },  '329': { code: '315D' },
      '331': { code: '329R' },  '332': { code: '336A' },  '333': { code: '342G' },  '334': { code: '349N' },
      '335': { code: '356U' },  '336': { code: '363D' },  '337': { code: '370K' },  '338': { code: '377R' },
      '339': { code: '384A' },  '341': { code: '398O' },  '342': { code: '405V' },  '343': { code: '412E' },
      '344': { code: '419L' },  '345': { code: '426S' },  '346': { code: '433B' },  '347': { code: '439H' },
      '348': { code: '446O' },  '349': { code: '453V' },  '351': { code: '467L' },  '352': { code: '474S' },
      '353': { code: '481B' },  '354': { code: '488I' },  '355': { code: '495P' },  '356': { code: '502W' },
      '357': { code: '509F' },  '358': { code: '516M' },  '359': { code: '523T' },  '361': { code: '536I' },
      '362': { code: '543P' },  '363': { code: '550W' },  '364': { code: '557F' },  '365': { code: '564M' },
      '366': { code: '571T' },  '367': { code: '578C' },  '368': { code: '585J' },  '369': { code: '592Q' },
      '371': { code: '606G' },  '372': { code: '613N' },  '373': { code: '620U' },  '374': { code: '627D' },
      '375': { code: '633J' },  '376': { code: '640Q' },  '377': { code: '647X' },  '378': { code: '654G' },
      '379': { code: '661N' },  '381': { code: '675D' },  '382': { code: '682K' },  '383': { code: '689R' },
      '384': { code: '696A' },  '385': { code: '703H' },  '386': { code: '710O' },  '387': { code: '717V' },
      '388': { code: '724E' },  '389': { code: '730K' },  '391': { code: '744A' },  '392': { code: '751H' },
      '393': { code: '758O' },  '394': { code: '765V' },  '395': { code: '772E' },  '396': { code: '779L' },
      '397': { code: '786S' },  '398': { code: '793B' },  '399': { code: '800I' },  '411': { code: '883T' },
      '412': { code: '890C' },  '413': { code: '897J' },  '414': { code: '904Q' },  '415': { code: '911X' },
      '416': { code: '918G' },  '417': { code: '924M' },  '418': { code: '931T' },  '419': { code: '938C' },
      '421': { code: '952Q' },  '422': { code: '959X' },  '423': { code: '966G' },  '424': { code: '973N' },
      '425': { code: '980U' },  '426': { code: '987D' },  '427': { code: '994K' },  '428': { code: '001B' },
      '429': { code: '008I' },  '431': { code: '021V' },  '432': { code: '028E' },  '433': { code: '035L' },
      '434': { code: '042S' },  '435': { code: '049B' },  '436': { code: '056I' },  '437': { code: '063P' },
      '438': { code: '070W' },  '439': { code: '077F' },  '441': { code: '091T' },  '442': { code: '098C' },
      '443': { code: '105J' },  '444': { code: '111P' },  '445': { code: '118W' },  '446': { code: '125F' },
      '447': { code: '132M' },  '448': { code: '139T' },  '449': { code: '146C' },  '451': { code: '160Q' },
      '452': { code: '167X' },  '453': { code: '174G' },  '454': { code: '181N' },  '455': { code: '188U' },
      '456': { code: '195D' },  '457': { code: '202K' },  '458': { code: '208Q' },  '459': { code: '215X' },
      '461': { code: '229N' },  '462': { code: '236U' },  '463': { code: '243D' },  '464': { code: '250K' },
      '465': { code: '257R' },  '466': { code: '264A' },  '467': { code: '271H' },  '468': { code: '278O' },
      '469': { code: '285V' },  '471': { code: '299L' },  '472': { code: '305R' },  '473': { code: '312A' },
      '474': { code: '319H' },  '475': { code: '326O' },  '476': { code: '333V' },  '477': { code: '340E' },
      '478': { code: '347L' },  '479': { code: '354S' },  '481': { code: '368I' },  '482': { code: '375P' },
      '483': { code: '382W' },  '484': { code: '389F' },  '485': { code: '396M' },  '486': { code: '402S' },
      '487': { code: '409B' },  '488': { code: '416I' },  '489': { code: '423P' },  '491': { code: '437F' },
      '492': { code: '444M' },  '493': { code: '451T' },  '494': { code: '458C' },  '495': { code: '465J' },
      '496': { code: '472Q' },  '497': { code: '479X' },  '498': { code: '486G' },  '499': { code: '493N' },
    };
    
    // --- Global State ---
    let loginSolved = false;
    let currentUser = '';
    let currentModule = null;
    let loginState = 'idle';
    let incorrectLoginAttempts = 0;
    let hintUnlocked = false;
    let hintTimer = null;
    let points = { login: 0, nav: 0, life: 0, eng: 0, comm: 0 };
    const initialLightsOutState = [ [0,1,0,1,1], [1,0,1,0,0], [0,1,1,1,1], [1,0,0,0,1], [0,1,1,1,0] ];
    let lightsOutState = JSON.parse(JSON.stringify(initialLightsOutState));

    // --- DOM Elements ---
    const chat = document.getElementById('chat');
    const puzzleTitle = document.getElementById('puzzleTitle');
    const puzzleContent = document.getElementById('puzzleContent');
    const puzzleExtra = document.getElementById('puzzleExtra');
    const input = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const sysStatus = document.getElementById('sysStatus');
    const progress = document.getElementById('progress');
    const endMissionBtn = document.getElementById('endMissionBtn');
    const confirmModal = document.getElementById('confirmModal');
    const confirmSkipModal = document.getElementById('confirmSkipModal');
    const hintModal = document.getElementById('hintModal');
    const currentUserSpan = document.getElementById('currentUser');
    
    const modules = {
      login: {name: 'Logowanie', solved: false},
      nav:   {name: 'System Sterowania', solved: false},
      life:  {name: 'Podtrzymywanie Życia', solved: false},
      eng:   {name: 'Silniki', solved: false},
      comm:  {name: 'Nadajnik', solved: false}
    };
    
    // --- Initial Setup ---
    window.addEventListener('load', initializeGame);

    function initializeGame() {
      updateModuleVisuals();
    }
    
    // --- Game Logic Functions ---
    async function halSay(text, typingSpeed = 25) {
        const d = document.createElement('div');
        d.innerHTML = 'HAL.OS: ';
        const contentSpan = document.createElement('span');
        d.appendChild(contentSpan);
        chat.appendChild(d);

        let isTag = false;
        let currentTag = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '<') {
                isTag = true;
                currentTag += char;
            } else if (char === '>') {
                isTag = false;
                currentTag += char;
                contentSpan.innerHTML += currentTag;
                currentTag = '';
            } else if (isTag) {
                currentTag += char;
            } else {
                contentSpan.innerHTML += char;
                chat.scrollTop = chat.scrollHeight;
                await sleep(typingSpeed);
            }
        }
        chat.scrollTop = chat.scrollHeight;
    }

    function userSay(text){
      const d = document.createElement('div');
      d.textContent = `> ${text}`;
      d.style.color = '#4df2ff';
      chat.appendChild(d);
      chat.scrollTop = chat.scrollHeight;
    }

    function calculateEmergencyPassword(teamNumberStr) {
        if (!teamNumberStr || typeof teamNumberStr !== 'string' || !/^\d+$/.test(teamNumberStr)) return null;
        const digits = teamNumberStr.split('');
        if (digits.length <= 1) return null;
        const minDigit = String(Math.min(...digits.map(Number)));
        const maxDigit = String(Math.max(...digits.map(Number)));
        let tempDigits = [...digits];
        tempDigits.splice(tempDigits.indexOf(maxDigit), 1);
        const minIndexInTemp = tempDigits.indexOf(minDigit);
        if (minIndexInTemp > -1) { tempDigits.splice(minIndexInTemp, 1); }
        const middleStr = tempDigits.join('');
        const rearrangedStr = maxDigit + middleStr + minDigit;
        const newNum = parseInt(rearrangedStr, 10);
        const sumOfNewNumDigits = rearrangedStr.split('').map(Number).reduce((a, b) => a + b, 0);
        const finalNum = (newNum * sumOfNewNumDigits) - parseInt(teamNumberStr, 10);
        const sumOfFinalNumDigits = String(Math.abs(finalNum)).split('').map(Number).reduce((a, b) => a + b, 0);
        let checksumIndex = sumOfFinalNumDigits > 0 ? (sumOfFinalNumDigits - 1) % 26 : 25; // Z for 0
        const checksumLetter = String.fromCharCode(65 + checksumIndex);
        return checksumLetter + String(finalNum);
    }
    
    const fracGrid = [
      {group: 1, pos: 1, letter: 'A'}, {group: 1, pos: 2, letter: 'B'}, {group: 1, pos: 3, letter: 'C'}, 
      {group: 1, pos: 4, letter: 'D'}, {group: 1, pos: 5, letter: 'E'},
      {group: 2, pos: 1, letter: 'F'}, {group: 2, pos: 2, letter: 'G'}, {group: 2, pos: 3, letter: 'H'}, 
      {group: 2, pos: 4, letter: 'I'}, {group: 2, pos: 5, letter: 'J'},
      {group: 3, pos: 1, letter: 'K'}, {group: 3, pos: 2, letter: 'L'}, {group: 3, pos: 3, letter: 'M'}, 
      {group: 3, pos: 4, letter: 'N'}, {group: 3, pos: 5, letter: 'O'},
      {group: 4, pos: 1, letter: 'P'}, {group: 4, pos: 2, letter: 'Q'}, {group: 4, pos: 3, letter: 'R'}, 
      {group: 4, pos: 4, letter: 'S'}, {group: 4, pos: 5, letter: 'T'},
      {group: 5, pos: 1, letter: 'U'}, {group: 5, pos: 2, letter: 'V'}, {group: 5, pos: 3, letter: 'W'}, 
      {group: 5, pos: 4, letter: 'X'}, {group: 5, pos: 5, letter: 'Y'}, {group: 5, pos: 6, letter: 'Z'}
    ];

    function fracEncode(text){
      const mathSymbols = ['+', '-', '×', '÷', '='];
      return text.toUpperCase().replace(/[^A-Z]/g,'').split('').map((ch, index) => {
        const cell = fracGrid.find(x => x.letter === ch);
        if (!cell) return '?/?';
        let result = `${cell.group}/${cell.pos}`;
        if (index < text.replace(/[^A-Z]/g,'').length - 1) {
          result += ` ${mathSymbols[index % mathSymbols.length]} `;
        }
        return result;
      }).join('');
    }

    function drawPigpenSymbol(letter, canvas, scale=1){
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#1ee7ff';
      ctx.lineWidth = 2 * scale;
      ctx.fillStyle = '#1ee7ff';
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = 15 * scale;
      const pigpenMap = {
        'A': {type: 'grid', row: 0, col: 0, dot: false},'B': {type: 'grid', row: 0, col: 1, dot: false},'C': {type: 'grid', row: 0, col: 2, dot: false},'D': {type: 'grid', row: 1, col: 0, dot: false},'E': {type: 'grid', row: 1, col: 1, dot: false},'F': {type: 'grid', row: 1, col: 2, dot: false},'G': {type: 'grid', row: 2, col: 0, dot: false},'H': {type: 'grid', row: 2, col: 1, dot: false},'I': {type: 'grid', row: 2, col: 2, dot: false},'J': {type: 'grid', row: 0, col: 0, dot: true},'K': {type: 'grid', row: 0, col: 1, dot: true},'L': {type: 'grid', row: 0, col: 2, dot: true},'M': {type: 'grid', row: 1, col: 0, dot: true},'N': {type: 'grid', row: 1, col: 1, dot: true},'O': {type: 'grid', row: 1, col: 2, dot: true},'P': {type: 'grid', row: 2, col: 0, dot: true},'Q': {type: 'grid', row: 2, col: 1, dot: true},'R': {type: 'grid', row: 2, col: 2, dot: true},'S': {type: 'cross', pos: 0, dot: false}, 'T': {type: 'cross', pos: 1, dot: false}, 'U': {type: 'cross', pos: 2, dot: false}, 'V': {type: 'cross', pos: 3, dot: false},'W': {type: 'cross', pos: 0, dot: true}, 'X': {type: 'cross', pos: 1, dot: true}, 'Y': {type: 'cross', pos: 2, dot: true}, 'Z': {type: 'cross', pos: 3, dot: true}
      };
      const mapping = pigpenMap[letter];
      if (!mapping) return;
      if (mapping.type === 'grid') drawGridSymbol(ctx, centerX, centerY, size, mapping.row, mapping.col, mapping.dot);
      else if (mapping.type === 'cross') drawCrossSymbol(ctx, centerX, centerY, size, mapping.pos, mapping.dot);
    }

    function drawGridSymbol(ctx, centerX, centerY, size, row, col, hasDot) {
      ctx.beginPath();
      if (col > 0) { ctx.moveTo(centerX - size, centerY - size); ctx.lineTo(centerX - size, centerY + size); }
      if (col < 2) { ctx.moveTo(centerX + size, centerY - size); ctx.lineTo(centerX + size, centerY + size); }
      if (row > 0) { ctx.moveTo(centerX - size, centerY - size); ctx.lineTo(centerX + size, centerY - size); }
      if (row < 2) { ctx.moveTo(centerX - size, centerY + size); ctx.lineTo(centerX + size, centerY + size); }
      ctx.stroke();
      if (hasDot) { ctx.beginPath(); ctx.arc(centerX, centerY, 4, 0, Math.PI * 2); ctx.fill(); }
    }

    function drawCrossSymbol(ctx, centerX, centerY, size, pos, hasDot) {
      ctx.beginPath();
      switch(pos) {
        case 0: ctx.moveTo(centerX - size, centerY); ctx.lineTo(centerX, centerY - size); ctx.moveTo(centerX + size, centerY); ctx.lineTo(centerX, centerY - size); break;
        case 1: ctx.moveTo(centerX, centerY - size); ctx.lineTo(centerX + size, centerY); ctx.moveTo(centerX, centerY + size); ctx.lineTo(centerX + size, centerY); break;
        case 2: ctx.moveTo(centerX - size, centerY); ctx.lineTo(centerX, centerY + size); ctx.moveTo(centerX + size, centerY); ctx.lineTo(centerX, centerY + size); break;
        case 3: ctx.moveTo(centerX, centerY - size); ctx.lineTo(centerX - size, centerY); ctx.moveTo(centerX, centerY + size); ctx.lineTo(centerX - size, centerY); break;
      }
      ctx.stroke();
      if (hasDot) { ctx.beginPath(); ctx.arc(centerX, centerY, 4, 0, Math.PI * 2); ctx.fill(); }
    }

    function railFenceEncode(text, rails) {
      const fence = Array(rails).fill().map(() => []);
      let rail = 0, direction = 1;
      for (let i = 0; i < text.length; i++) {
        fence[rail].push(text[i]);
        rail += direction;
        if (rail === rails - 1 || rail === 0) direction = -direction;
      }
      return fence.map(r => r.join('')).join('');
    }
    
    function unlockHint() {
        if (currentModule === 'login' && !modules.login.solved && !hintUnlocked) {
            hintUnlocked = true;
            halSay('System otrzymał wskazówkę od Generała Pedagogicusa. Aby ją otworzyć, wpisz "pomoc"');
        }
    }

    const puzzles = {
      login: { title:'Logowanie Awaryjne' },
      nav:   { title:'System Sterowania — Szyfr Ułamkowy', intro:'Krytyczny błąd nawigacji. Ostatni zapisany kurs powrotny został zaszyfrowany przez pilota przed awarią. Odszyfruj go, używając dekodera ułamkowego, aby przywrócić sterowanie.', encoded: fracEncode('KURS DOMOWY'), answer:'KURSDOMOWY' },
      life:  { title:'Podtrzymywanie Życia — Szyfr Pigpen', intro:'Systemy podtrzymywania życia w stanie krytycznym. Kod do rekalibracji generatora tlenu został zapisany przez Głównego Inżyniera szyfrem Pigpen jako zabezpieczenie. Czas ucieka.', plain:'GENERATOR', answer:'GENERATOR' },
      eng:   { title:'Silniki — Szyfr Płotkowy (Rail Fence)', intro:'Główne silniki nie odpowiadają. Komunikat diagnostyczny wskazujący na przyczynę awarii został uszkodzony podczas transmisji i zakodowany szyfrem płotkowym (Rail Fence z 3 szynami). Zdekoduj go, aby uruchomić procedurę naprawczą.', encoded: railFenceEncode('MOTORSPRAWNY', 3), answer:'MOTORSPRAWNY' },
      comm:  { title:'Nadajnik — Lights Out 5×5', intro:'Błąd kaskadowy przeciążył panel nadajnika dalekiego zasięgu, uniemożliwiając wezwanie pomocy. Zresetuj panel, wyłączając wszystkie światła ostrzegawcze. To nasza jedyna szansa na kontakt.'}
    };

    async function openModule(key){
      if (key === currentModule || (modules[key] && modules[key].solved)) {
        if (modules[key] && modules[key].solved) await halSay('Ten moduł jest już naprawiony. Wybierz inny.');
        return;
      }
      
      const p = puzzles[key];
      if (!p) return;

      puzzleExtra.style.cssText = ''; 

      if(key==='login'){
          currentModule = 'login';
          loginState = 'awaiting_team_number';
          input.disabled = true;
          sendBtn.disabled = true;
          
          puzzleTitle.innerHTML = `<strong>${p.title}</strong>`;
          let tableHTML = `<table style="table-layout: fixed; width: 100%; max-width: 550px; margin-top: 10px; text-align: center; border-collapse: collapse;"><tr>`;
          for(let i=0; i<26; i++) { tableHTML += `<th style="padding: 2px; border: 1px solid #333; font-weight: normal;">${String.fromCharCode(65 + i)}</th>`; }
          tableHTML += `</tr><tr>`;
          for(let i=0; i<26; i++) { tableHTML += `<td style="padding: 2px; border: 1px solid #333;">${i+1}</td>`; }
          tableHTML += `</tr></table>`;
          puzzleContent.innerHTML = tableHTML;
          puzzleExtra.innerHTML = '<button id="skipLoginBtn" class="module" style="border-color: var(--warning); color: var(--warning); background: #332800; margin-top: 1rem; width: 220px;" disabled>Pomiń logowanie</button>';
          document.getElementById('skipLoginBtn').addEventListener('click', () => { confirmSkipModal.style.display = 'flex'; });

          // Sequential timed messages
          (async () => {
              await halSay('URUCHAMIANIE SYSTEMU...', 10);
              await sleep(1000);
              await halSay('DOSTĘPU ZAŁOGI: ODRZUCONY');
              await sleep(1000);
              await halSay('HASŁO GŁÓWNE: NIEODNALEZIONE');
              await sleep(1000);
              await halSay('ALERT BEZPIECZEŃSTWA');
              await sleep(1000);
              await halSay('WYMAGANE LOGOWANIE AWARYJNE');
              await sleep(1000);
              await halSay(`Oto awaryjny sposób logowania:<br><div style="padding-left: 1em;">Weź numer swojej drużyny oraz wpisz go do systemu.<br>Przestaw cyfry tak, aby największa cyfra była na początku, a najmniejsza na końcu.<br>Pomnóż nowo otrzymaną liczbę przez sumę cyfr, z których się składa.<br>Odejmij numer swojej drużyny.<br>Przed liczbę wstaw sumę kontrolną, czyli literę alfabetu o numerze odpowiadającym sumie cyfr. Jeśli wyjdziesz poza 26. literę alfabetu, zapętl go.<br>Do rozwiązywania hasła możesz użyć wbudowanego kalkulatora oraz długopisu - zapisuj postępy na odwrocie swojej Karty Pokładowej!</div>`);
              await sleep(1000);
              await halSay("Proszę podać numer drużyny, aby kontynuować.");
              input.disabled = false;
              sendBtn.disabled = false;
              input.placeholder = "> Wpisz numer swojej drużyny...";
              input.focus();
          })();
          return;
      }

      currentModule = key;
      puzzleTitle.innerHTML = `<strong>${p.title}</strong>`;
      puzzleContent.textContent = p.intro;
      puzzleExtra.innerHTML = '';
      halSay('Otwieram moduł: ' + modules[key].name + '. Rozpoczynanie diagnostyki...');
      
      if(key==='nav'){
        const pre = document.createElement('pre'); 
        pre.className='small'; 
        pre.textContent = 'Zakodowana sekwencja:\n' + p.encoded;
        puzzleExtra.appendChild(pre);
        const table = document.createElement('div'); 
        table.className='small';
        let html = '<div style="display:flex;gap:20px;margin-top:8px;">';
        for(let i=1; i<=3; i++){
          html += `<div><div style="color:#4df2ff;font-weight:bold;margin-bottom:5px;">Grupa ${i}</div>`;
          html += '<table style="border-collapse:collapse;color:#4df2ff;"><tr>';
          for(let pos=1;pos<=5;pos++) html += `<td style="padding:4px;border:1px solid #1ee7ff;text-align:center;font-size:10px;">${pos}</td>`;
          html += '</tr><tr>';
          for(let pos=1;pos<=5;pos++){ const cell = fracGrid.find(x=>x.group===i && x.pos===pos); html += `<td style="padding:4px;border:1px solid #1ee7ff;text-align:center">${cell ? cell.letter : ' '}</td>`; }
          html += '</tr></table></div>';
        }
        html += '</div><div style="display:flex;gap:20px;margin-top:15px;">';
        html += '<div><div style="color:#4df2ff;font-weight:bold;margin-bottom:5px;">Grupa 4</div>';
        html += '<table style="border-collapse:collapse;color:#4df2ff;"><tr>';
        for(let pos=1;pos<=5;pos++) html += `<td style="padding:4px;border:1px solid #1ee7ff;text-align:center;font-size:10px;">${pos}</td>`;
        html += '</tr><tr>';
        for(let pos=1;pos<=5;pos++){ const cell = fracGrid.find(x=>x.group===4 && x.pos===pos); html += `<td style="padding:4px;border:1px solid #1ee7ff;text-align:center">${cell ? cell.letter : ' '}</td>`; }
        html += '</tr></table></div>';
        html += '<div><div style="color:#4df2ff;font-weight:bold;margin-bottom:5px;">Grupa 5</div>';
        html += '<table style="border-collapse:collapse;color:#4df2ff;"><tr>';
        for(let pos=1;pos<=6;pos++) html += `<td style="padding:4px;border:1px solid #1ee7ff;text-align:center;font-size:10px;">${pos}</td>`;
        html += '</tr><tr>';
        for(let pos=1;pos<=6;pos++){ const cell = fracGrid.find(x=>x.group===5 && x.pos===pos); html += `<td style="padding:4px;border:1px solid #1ee7ff;text-align:center">${cell ? cell.letter : ' '}</td>`; }
        html += '</tr></table></div></div>';
        html += '<div class="small" style="margin-top:10px;color:#4df2ff;">Format: grupa/pozycja (np. 1/1 = A, 2/3 = H, 5/6 = Z)</div>';
        table.innerHTML = html;
        puzzleExtra.appendChild(table);
      }

      if(key==='life'){
        const info = document.createElement('div'); 
        info.className='small'; 
        info.textContent = 'Przeanalizujcie poniższą tabelę i odszyfrujcie ukrytą wiadomość.';
        puzzleExtra.appendChild(info);
        const tableDiv = document.createElement('div');
        tableDiv.style.marginTop = '8px';
        tableDiv.innerHTML = `<div class="small" style="color:#1ee7ff;font-weight:bold;margin-bottom:10px">Standardowa tabela szyfru Pigpen:</div><div style="display:flex;gap:30px;align-items:flex-start;font-family:monospace;"><div style="text-align:center;"><div style="border:2px solid #1ee7ff;padding:8px;display:inline-block;line-height:1.2;width:90px;height:90px;"><div style="display:flex;border-bottom:1px solid #1ee7ff;height:28px;"><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">A</div><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">B</div><div style="padding:8px;width:28px;text-align:center;">C</div></div><div style="display:flex;border-bottom:1px solid #1ee7ff;height:28px;"><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">D</div><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">E</div><div style="padding:8px;width:28px;text-align:center;">F</div></div><div style="display:flex;height:28px;"><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">G</div><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">H</div><div style="padding:8px;width:28px;text-align:center;">I</div></div></div></div><div style="text-align:center;"><div style="border:2px solid #1ee7ff;padding:8px;display:inline-block;line-height:1.2;width:90px;height:90px;"><div style="display:flex;border-bottom:1px solid #1ee7ff;height:28px;"><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">J•</div><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">K•</div><div style="padding:8px;width:28px;text-align:center;">L•</div></div><div style="display:flex;border-bottom:1px solid #1ee7ff;height:28px;"><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">M•</div><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">N•</div><div style="padding:8px;width:28px;text-align:center;">O•</div></div><div style="display:flex;height:28px;"><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">P•</div><div style="padding:8px;border-right:1px solid #1ee7ff;width:28px;text-align:center;">Q•</div><div style="padding:8px;width:28px;text-align:center;">R•</div></div></div></div><div style="text-align:center;"><div style="position:relative;width:106px;height:106px;border:2px solid #1ee7ff;margin:0 auto;"><div style="position:absolute;top:8px;left:50%;transform:translateX(-50%);font-size:11px;">S</div><div style="position:absolute;top:50%;right:8px;transform:translateY(-50%);font-size:11px;">T</div><div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);font-size:11px;">U</div><div style="position:absolute;top:50%;left:8px;transform:translateY(-50%);font-size:11px;">V</div><div style="position:absolute;top:18px;right:18px;font-size:10px;">W•</div><div style="position:absolute;bottom:18px;right:18px;font-size:10px;">X•</div><div style="position:absolute;bottom:18px;left:18px;font-size:10px;">Y•</div><div style="position:absolute;top:18px;left:18px;font-size:10px;">Z•</div><svg style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;"><line x1="53" y1="25" x2="25" y2="53" stroke="#1ee7ff" stroke-width="1"/><line x1="53" y1="25" x2="80" y2="53" stroke="#1ee7ff" stroke-width="1"/><line x1="80" y1="53" x2="53" y2="80" stroke="#1ee7ff" stroke-width="1"/><line x1="53" y1="80" x2="25" y2="53" stroke="#1ee7ff" stroke-width="1"/></svg></div></div></div>`;
        puzzleExtra.appendChild(tableDiv);
        const encDiv = document.createElement('div'); 
        encDiv.style.marginTop='12px'; encDiv.className='small'; encDiv.textContent='Zakodowana wiadomość:';
        const msgDiv = document.createElement('div'); 
        msgDiv.style.display='flex'; msgDiv.style.gap='8px'; msgDiv.style.marginTop='6px';
        p.plain.toUpperCase().split('').forEach(L=>{ const can=document.createElement('canvas'); can.width=80; can.height=80; can.style.width='50px'; can.style.height='50px'; drawPigpenSymbol(L, can); msgDiv.appendChild(can); });
        puzzleExtra.appendChild(encDiv); puzzleExtra.appendChild(msgDiv);
        const tip=document.createElement('div'); tip.className='small'; tip.style.marginTop='6px'; tip.textContent='Użyj tabeli powyżej aby odczytać symbole i wpisz odpowiedź.'; puzzleExtra.appendChild(tip);
      }

      if(key==='eng'){
        const pre=document.createElement('pre'); pre.className='small'; pre.textContent = 'Zakodowane (Rail Fence 3):\n' + p.encoded;
        puzzleExtra.appendChild(pre);
        const helper = document.createElement('div'); helper.className = 'binary-helper small';
        helper.innerHTML = `<strong>Instrukcja Rail Fence:</strong><br>Przykład kodowania HASLOTESTOWE (12 liter) na 3 szynach:<br><pre style="font-family:monospace;font-size:10px;color:#4df2ff;margin:5px 0;">Rząd 1: H . . . O . . . T . . .\nRząd 2: . A . L . T . S . O . E\nRząd 3: . . S . . . E . . . W .</pre>Odczytane rzędami: HOT + ALTSOE + SEW = <strong>HOTALTSOESEW</strong><br>Aby odszyfrować, rozłóż zakodowany tekst na 3 rzędy według ilości liter i odczytaj zygzakiem.`;
        puzzleExtra.appendChild(helper);
      }

      if(key==='comm'){
        const wrap=document.createElement('div'); wrap.className='small'; wrap.style.marginTop='8px';
        wrap.innerHTML = '<div style="margin-bottom:10px;">Kliknij kafelki aby wyłączyć wszystkie światła:</div>';
        const grid=document.createElement('div'); grid.style.display='grid'; grid.style.gridTemplateColumns='repeat(5, 45px)'; grid.style.gap='4px';
        
        function render(){
          grid.innerHTML='';
          for(let r=0;r<5;r++) {
            for(let c=0;c<5;c++){
              const btn=document.createElement('button');
              btn.style.width='45px'; btn.style.height='45px'; btn.style.border='1px solid var(--accent)'; btn.style.borderRadius='6px'; btn.style.cursor='pointer'; btn.style.fontSize='10px';
              btn.style.background = lightsOutState[r][c] ? '#1ee7ff' : '#001018';
              btn.style.boxShadow = lightsOutState[r][c] ? '0 0 15px #1ee7ff' : 'none';
              btn.addEventListener('click',()=>{
                toggle(r,c); render(); 
                if(isSolved()){ 
                  modules.comm.solved=true; points.comm = 1; 
                  halSay('Nadajnik przywrócony. Otrzymano 1 pkt.'); 
                  puzzleExtra.innerHTML='<div class="small done">✓ Moduł naprawiony.</div>'; currentModule=null; updateModuleVisuals();
                }
              });
              grid.appendChild(btn);
            }
          }
        }
        function toggle(r,c){ const deltas=[[0,0],[1,0],[-1,0],[0,1],[0,-1]]; for(const[dr,dc]of deltas){ const rr=r+dr,cc=c+dc; if(rr>=0&&rr<5&&cc>=0&&cc<5) lightsOutState[rr][cc]=1-lightsOutState[rr][cc]; } }
        function isSolved(){ return lightsOutState.flat().every(x=>x===0); }
        
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Resetuj';
        resetBtn.className = 'module';
        resetBtn.style.cssText = 'margin-top: 10px; width: 120px; border-color: var(--warning); color: var(--warning); background: #332800;';
        resetBtn.addEventListener('click', () => {
            lightsOutState = JSON.parse(JSON.stringify(initialLightsOutState));
            render();
            halSay("Plansza zresetowana.");
        });

        wrap.appendChild(grid); 
        puzzleExtra.appendChild(wrap);
        puzzleExtra.appendChild(resetBtn);
        render();
      }
    }

    function updateModuleVisuals(){
      const solvedCount = Object.values(modules).filter(m => m.solved).length;
      progress.textContent = `${solvedCount}/5`;
      const allSolved = solvedCount === 5;
      if (loginSolved) { sysStatus.textContent = allSolved ? 'STABILNY' : 'AWARIA'; } else { sysStatus.textContent = 'WYMAGANA AUTORYZACJA'; }
      if(allSolved) { sysStatus.className = 'done'; endMissionBtn.classList.add('solved'); }

      Object.keys(modules).forEach(key => {
        const btn = document.getElementById(`mod_${key}`);
        if (key !== 'login' && !modules.login.solved) { btn.classList.add('locked'); btn.disabled = true; } else { btn.classList.remove('locked'); btn.disabled = false; }
        btn.classList.toggle('solved', modules[key].solved);
      });
    }

    function processAnswer(){
      const val = input.value.trim();
      if(!val) return;
      userSay(val);
      
      if (currentModule === 'login') {
          if (loginState === 'awaiting_team_number') {
              if (teamData[val]) {
                  currentUser = val;
                  loginState = 'awaiting_password';
                  halSay(`Przyjęto numer drużyny ${currentUser}. Oblicz hasło awaryjne i je wprowadź.`);
                  input.placeholder = "> Wpisz hasło awaryjne...";
                  incorrectLoginAttempts = 0;
                  hintUnlocked = false;
                  hintTimer = setTimeout(unlockHint, 180000); // 3 minutes, STARTS NOW
                  
                  const skipBtn = document.getElementById('skipLoginBtn');
                  if (skipBtn) {
                      skipBtn.disabled = false;
                  }
              } else {
                  halSay("Nie rozpoznano numeru drużyny. Spróbuj ponownie.");
              }
          } else if (loginState === 'awaiting_password') {
              if (val.toUpperCase() === 'POMOC' && hintUnlocked) {
                  hintModal.style.display = 'flex';
                  puzzleExtra.style.display = 'flex';
                  puzzleExtra.style.gap = '10px';
                  if (!document.getElementById('reopenHintBtn')) {
                      const reopenBtn = document.createElement('button');
                      reopenBtn.id = 'reopenHintBtn';
                      reopenBtn.textContent = 'Pokaż wskazówkę ponownie';
                      reopenBtn.className = 'module';
                      reopenBtn.style.cssText = 'margin-top: 1rem; width: 220px; border-color: var(--accent); color: var(--accent); background: #001a2a;';
                      reopenBtn.addEventListener('click', () => hintModal.style.display = 'flex');
                      document.getElementById('puzzleExtra').appendChild(reopenBtn);
                  }
                  if (points.login !== 1) { points.login = 1; halSay("Użyto wskazówki."); }
              } else {
                  const expectedPassword = calculateEmergencyPassword(currentUser);
                  if (val.toUpperCase() === expectedPassword) {
                      clearTimeout(hintTimer);
                      modules.login.solved = true; loginSolved = true;
                      if (!hintUnlocked) points.login = 2; else points.login = 1;
                      halSay(`<strong style="color:var(--success)">Hasło ${expectedPassword} przyjęte! Zalogowano drużynę numer ${currentUser}!</strong>`);
                      halSay("Zapisz hasło w odpowiednim miejscu na Karcie Pokładowej!");
                      currentUserSpan.textContent = `Drużyna ${currentUser}`;
                      sysStatus.textContent = 'AWARIA';
                      puzzleTitle.innerHTML = '<strong>Logowanie pomyślne</strong>';
                      puzzleContent.textContent = 'System odblokowany. Możesz teraz przejść do naprawy pozostałych modułów.';
                      puzzleExtra.innerHTML = `<div class="small done">✓ Moduł naprawiony.</div>`;
                      currentModule = null; loginState = 'idle'; input.placeholder = "> Wpisz odpowiedź lub komendę..."; updateModuleVisuals();
                  } else {
                      incorrectLoginAttempts++;
                      halSay("Nieprawidłowe hasło awaryjne. Spróbuj ponownie.");
                      if (incorrectLoginAttempts >= 2 && !hintUnlocked) { hintUnlocked = true; halSay('Aby otrzymać wskazówkę, wpisz "pomoc"'); }
                  }
              }
          }
          input.value = '';
          return;
      }

      if (!loginSolved || !currentModule) {
        if (!loginSolved) halSay("Najpierw musisz ukończyć moduł logowania.");
        input.value = '';
        return;
      }
      
      const expected = puzzles[currentModule].answer?.toUpperCase();
      const given = val.replace(/[^A-ZĄĆĘŁŃÓŚŹŻ0-9]/gi,'').toUpperCase();
      let isCorrect = (expected && given === expected);
      if (currentModule === 'eng') { const givenWithSpaces = val.replace(/[^A-ZĄĆĘŁŃÓŚŹŻ0-9\s]/gi,'').toUpperCase().replace(/\s+/g, ' ').trim(); isCorrect = (given === puzzles.eng.answer.toUpperCase() || givenWithSpaces === 'MOTOR SPRAWNY'); }
      
      if(isCorrect){
        modules[currentModule].solved = true; points[currentModule] = 1;
        halSay(`Poprawna odpowiedź. Moduł ${modules[currentModule].name} aktywowany. Gratulacje!`);
        puzzleExtra.innerHTML = '<div class="small done">✓ Moduł aktywny. Wybierz następny moduł.</div>';
        currentModule = null; updateModuleVisuals();
      } else {
        halSay('Odpowiedź niepoprawna. Spróbuj ponownie.');
      }
      input.value='';
    }
    
    function skipLogin() {
        clearTimeout(hintTimer); confirmSkipModal.style.display = 'none';
        modules.login.solved = true; loginSolved = true; points.login = 0;
        halSay("Logowanie pominięte.");
        sysStatus.textContent = 'AWARIA';
        currentUserSpan.textContent = `Drużyna ${currentUser || 'NN'}`;
        puzzleTitle.innerHTML = '<strong>Logowanie pominięte</strong>';
        puzzleContent.textContent = 'System odblokowany. Możesz teraz przejść do naprawy pozostałych modułów.';
        puzzleExtra.style.cssText = ''; 
        puzzleExtra.innerHTML = `<div class="small" style="color:var(--warning)">! Moduł pominięty.</div>`;
        currentModule = null; loginState = 'idle'; input.placeholder = "> Wpisz odpowiedź lub komendę..."; updateModuleVisuals();
    }
    
    function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    async function runProgressBar(systemName, isSolved) {
        const d = document.createElement('div');
        d.innerHTML = `HAL.OS: ${systemName}&nbsp;`;
        const bar = document.createElement('span'); d.appendChild(bar); chat.appendChild(d);
        for (let p = 0; p <= 100; p += 10) {
            const filled = '█'.repeat(p / 10); const empty = '░'.repeat(10 - (p / 10));
            bar.textContent = `[${filled}${empty}] ${p}%`;
            chat.scrollTop = chat.scrollHeight; await sleep(50);
        }
        bar.innerHTML += isSolved ? ` <strong style="color:var(--success);">SPRAWNY</strong>` : ` <strong style="color:var(--warning);">AWARIA KRYTYCZNA</strong>`;
        chat.scrollTop = chat.scrollHeight; await sleep(400);
    }

    async function runFinalSequence() {
        document.querySelectorAll('button, input').forEach(el => el.disabled = true);
        await sleep(500); await halSay("Inicjowanie sekwencji końcowej na żądanie...");
        await sleep(1000); await halSay("Weryfikacja integralności systemów..."); await sleep(1000);

        await runProgressBar("System logowania:&nbsp;&nbsp;&nbsp;&nbsp;", modules.login.solved);
        await runProgressBar("System Sterowania:&nbsp;&nbsp;&nbsp;", modules.nav.solved);
        await runProgressBar("Podtrzymywanie życia:", modules.life.solved);
        await runProgressBar("Silniki:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", modules.eng.solved);
        await runProgressBar("Nadajnik:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", modules.comm.solved);

        await sleep(1000);
        const solvedCount = Object.values(modules).filter(m => m.solved).length;
        const totalScore = Object.values(points).reduce((a, b) => a + b, 0);
        const finalCode = teamData[currentUser] ? teamData[currentUser].code + totalScore : "XXXX" + totalScore;

        await halSay("Zakończono diagnostykę."); await sleep(1000);
        if(solvedCount < 5) { await halSay(`<strong style="color:var(--warning);">Wykryto nienaprawione moduły... Uruchamiam systemy awaryjne!</strong>`); } else { await halSay('<strong style="color:var(--success);">Wszystkie systemy w pełni sprawne. Doskonała praca!</strong>'); }
        await sleep(1500);
        await halSay(`Wasz wkład był kluczowy. Dziękujemy za wasze zaangażowanie i gratulujemy pomyślnego ukończenia misji!`);
        await sleep(1000);
        await halSay(`Drużyna <strong class="done">${currentUser || 'NN'}</strong> spisała się na medal!`);
        await sleep(1000);
        const lineDiv = document.createElement('div');
        const introSpan = document.createElement('span');
        lineDiv.appendChild(introSpan);
        chat.appendChild(lineDiv);

        const introText = 'HAL.OS: Wasz kod zakończenia misji to: ';
        for (let i = 0; i < introText.length; i++) {
            introSpan.textContent += introText[i];
            chat.scrollTop = chat.scrollHeight;
            await sleep(25);
            }

        const codeStrong = document.createElement('strong');
        codeStrong.className = 'done';
        codeStrong.style.fontSize = '1.2em';
        codeStrong.style.backgroundColor = '#fff';
        codeStrong.style.color = '#000';
        codeStrong.style.padding = '2px 8px';
        codeStrong.style.marginLeft = '8px';
        codeStrong.style.borderRadius = '4px';
        lineDiv.appendChild(codeStrong);
        chat.scrollTop = chat.scrollHeight;

        for (let i = 0; i < finalCode.length; i++) {
            codeStrong.textContent += finalCode[i];
            chat.scrollTop = chat.scrollHeight;
            await sleep(150);
            }
        await sleep(1000);
        await halSay("Zapiszcie ten kod na karcie przebiegu gry i zanieście go na start.");
        
        puzzleTitle.innerHTML = '<strong class="done">MISJA UKOŃCZONA</strong>';
        puzzleContent.textContent = 'Udało wam się ustabilizować system! Zapiszcie swój kod i udajcie się na start.';
        puzzleExtra.innerHTML = `<div class="final-code">System HAL.OS: STABILNY<br>Naprawione moduły: ${solvedCount}/5<br>Status misji: SUKCES<br>KOD KOŃCOWY: ${finalCode}</div>`;

        setTimeout(() => {
            chat.scrollTop = chat.scrollHeight;
        }, 50);
    }

    // --- Event listeners ---
    document.getElementById('mod_login').addEventListener('click', () => openModule('login'));
    document.getElementById('mod_nav').addEventListener('click', () => openModule('nav'));
    document.getElementById('mod_life').addEventListener('click', () => openModule('life'));
    document.getElementById('mod_eng').addEventListener('click', () => openModule('eng'));
    document.getElementById('mod_comm').addEventListener('click', () => openModule('comm'));
    
    sendBtn.addEventListener('click', processAnswer);
    input.addEventListener('keydown', e => { if(e.key === 'Enter') processAnswer(); });
    
    endMissionBtn.addEventListener('click', () => { confirmModal.style.display = 'flex'; });
    document.getElementById('confirmCancel').addEventListener('click', () => { confirmModal.style.display = 'none'; });
    document.getElementById('confirmYes').addEventListener('click', () => { confirmModal.style.display = 'none'; runFinalSequence(); });

    document.getElementById('confirmSkipYes').addEventListener('click', skipLogin);
    document.getElementById('confirmSkipCancel').addEventListener('click', () => { confirmSkipModal.style.display = 'none'; });
    document.getElementById('closeHintBtn').addEventListener('click', () => { hintModal.style.display = 'none'; });