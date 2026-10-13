(function() {
    // ---------- ИГРА 1: БАНАН-КЛИКЕР ----------
    const bananaClicker = document.getElementById('bananaClicker');
    const clickerScoreSpan = document.getElementById('clickerScore');
    const resetClickerBtn = document.getElementById('resetClicker');
    let clickerScore = 0;

    bananaClicker.addEventListener('click', () => {
        clickerScore++;
        clickerScoreSpan.textContent = clickerScore;
        // небольшая анимация при клике
        bananaClicker.style.transform = 'scale(0.85)';
        setTimeout(() => {
            bananaClicker.style.transform = 'scale(1)';
        }, 80);
    });

    resetClickerBtn.addEventListener('click', () => {
        clickerScore = 0;
        clickerScoreSpan.textContent = '0';
    });

    // ---------- ИГРА 2: УБЕГАЮЩИЙ БАНАН ----------
    const runnerPlayground = document.getElementById('runnerPlayground');
    const runnerBanana = document.getElementById('runnerBanana');
    const runnerScoreSpan = document.getElementById('runnerScore');
    const runnerTimerSpan = document.getElementById('runnerTimer');
    const startRunnerBtn = document.getElementById('startRunner');

    let runnerScore = 0;
    let runnerTimeLeft = 20;
    let runnerTimerInterval = null;
    let runnerMoveInterval = null;
    let runnerGameActive = false;

    // Функция перемещения банана в случайную точку
    function moveBananaRandomly() {
        if (!runnerGameActive) return;
        const playgroundRect = runnerPlayground.getBoundingClientRect();
        const bananaRect = runnerBanana.getBoundingClientRect();

        const maxLeft = playgroundRect.width - bananaRect.width;
        const maxTop = playgroundRect.height - bananaRect.height;

        if (maxLeft <= 0 || maxTop <= 0) return;

        const newLeft = Math.floor(Math.random() * maxLeft);
        const newTop = Math.floor(Math.random() * maxTop);

        runnerBanana.style.left = newLeft + 'px';
        runnerBanana.style.top = newTop + 'px';
    }

    // Обработчик клика по убегающему банану
    runnerBanana.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!runnerGameActive) return;

        runnerScore++;
        runnerScoreSpan.textContent = runnerScore;

        // Мгновенно перемещаем банан в новое место (эффект убегания)
        moveBananaRandomly();
    });

    // Запуск игры
    function startRunnerGame() {
        if (runnerTimerInterval) clearInterval(runnerTimerInterval);
        if (runnerMoveInterval) clearInterval(runnerMoveInterval);

        runnerScore = 0;
        runnerTimeLeft = 20;
        runnerScoreSpan.textContent = '0';
        runnerTimerSpan.textContent = `⏱️ 20 сек`;
        runnerGameActive = true;

        runnerBanana.style.left = '45%';
        runnerBanana.style.top = '40%';

        runnerTimerInterval = setInterval(() => {
            runnerTimeLeft--;
            runnerTimerSpan.textContent = `⏱️ ${runnerTimeLeft} сек`;

            if (runnerTimeLeft <= 0) {
                clearInterval(runnerTimerInterval);
                clearInterval(runnerMoveInterval);
                runnerGameActive = false;
                runnerTimerSpan.textContent = `⏱️ Игра окончена! Счёт: ${runnerScore}`;
            }
        }, 1000);

        runnerMoveInterval = setInterval(() => {
            if (runnerGameActive) {
                moveBananaRandomly();
            }
        }, 700);

        setTimeout(() => {
            if (runnerGameActive) moveBananaRandomly();
        }, 100);
    }

    startRunnerBtn.addEventListener('click', startRunnerGame);

    // ---------- ИГРА 3: БАНАНОВАЯ ПАМЯТЬ (МЕМОРИ) ----------
    const memoryGrid = document.getElementById('memoryGrid');
    const memoryPairsSpan = document.getElementById('memoryPairs');
    const memoryStatus = document.getElementById('memoryStatus');
    const resetMemoryBtn = document.getElementById('resetMemory');

    const cardIcons = [
        '🍌', '🍌',
        '🍌', '🍌',
        '🍋', '🍋',
        '🍯', '🍯',
        '🥞', '🥞',
        '🧀', '🧀'
    ];

    let flippedIndices = [];
    let matchedPairs = 0;
    let lockBoard = false;
    let memoryGameActive = true;

    // Перемешивание массива
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Создание игрового поля
    function createMemoryBoard() {
        memoryGrid.innerHTML = '';
        flippedIndices = [];
        matchedPairs = 0;
        memoryPairsSpan.textContent = '0';
        lockBoard = false;
        memoryGameActive = true;
        memoryStatus.textContent = 'Найди все пары бананов!';

        const shuffledIcons = shuffleArray([...cardIcons]);

        shuffledIcons.forEach((icon, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.index = index;
            card.dataset.icon = icon;
            card.dataset.flipped = 'false';
            card.dataset.matched = 'false';
            card.textContent = '❓';
            card.addEventListener('click', () => onCardClick(card));
            memoryGrid.appendChild(card);
        });
    }

    // Обработчик клика по карточке
    function onCardClick(card) {
        if (!memoryGameActive) return;
        if (lockBoard) return;
        if (card.dataset.matched === 'true') return;
        if (card.dataset.flipped === 'true') return;
        if (flippedIndices.length === 2) return;

        card.textContent = card.dataset.icon;
        card.dataset.flipped = 'true';
        card.classList.add('flipped');
        flippedIndices.push(card);

        if (flippedIndices.length === 2) {
            lockBoard = true;
            const card1 = flippedIndices[0];
            const card2 = flippedIndices[1];

            if (card1.dataset.icon === card2.dataset.icon) {
                card1.dataset.matched = 'true';
                card2.dataset.matched = 'true';
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                memoryPairsSpan.textContent = matchedPairs;

                flippedIndices = [];
                lockBoard = false;

                if (matchedPairs === 6) {
                    memoryStatus.textContent = '🎉 Победа! Все бананы найдены!';
                    memoryGameActive = false;
                } else {
                    memoryStatus.textContent = '✅ Пара найдена! Продолжай!';
                }
            } else {
                memoryStatus.textContent = '❌ Не пара, попробуй ещё';
                setTimeout(() => {
                    card1.textContent = '❓';
                    card1.dataset.flipped = 'false';
                    card1.classList.remove('flipped');
                    card2.textContent = '❓';
                    card2.dataset.flipped = 'false';
                    card2.classList.remove('flipped');
                    flippedIndices = [];
                    lockBoard = false;
                }, 800);
            }
        } else {
            memoryStatus.textContent = 'Выбери вторую карточку';
        }
    }

    // Сброс игры памяти
    function resetMemoryGame() {
        if (lockBoard) lockBoard = false;
        createMemoryBoard();
    }

    resetMemoryBtn.addEventListener('click', resetMemoryGame);

    // Инициализация при загрузке
    window.addEventListener('load', () => {
        runnerTimerSpan.textContent = '⏱️ 20 сек';
        runnerScoreSpan.textContent = '0';
        runnerGameActive = false;
        createMemoryBoard();
    });
})();