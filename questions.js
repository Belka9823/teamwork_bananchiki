(function() {
    // ===== БАЗА ШУТОЧНЫХ ВОПРОСОВ ПРО БАНАНЫ =====
    const questions = [
        {
            question: "Почему банан никогда не грустит?",
            answers: [
                "Потому что у него всегда всё в шоколаде",
                "Потому что он всегда в связке с друзьями",
                "Потому что он жёлтый от счастья",
                "Потому что он не умеет плакать"
            ],
            correct: 2
        },
        {
            question: "Что говорит банан, когда спотыкается?",
            answers: [
                "«Ой, я поскользнулся!»",
                "«Я упал, но не сдался!»",
                "«Кожура, ты меня подвела!»",
                "«Я банан, а не спортсмен!»"
            ],
            correct: 2
        },
        {
            question: "Как банан здоровается с другими фруктами?",
            answers: [
                "«Привет, я банан!»",
                "Машет кожурой",
                "«Здравствуйте, я к вашим услугам!»",
                "Просто висит и молчит"
            ],
            correct: 1
        },
        {
            question: "Почему банан не любит математику?",
            answers: [
                "Потому что он гуманитарий",
                "Потому что его всегда делят",
                "Потому что он не умеет считать до трёх",
                "Потому что числа не жёлтые"
            ],
            correct: 1
        },
        {
            question: "Что делает банан на дискотеке?",
            answers: [
                "Стоит в углу и стесняется",
                "Танцует тверк",
                "Гнётся во все стороны",
                "Играет роль диджея"
            ],
            correct: 2
        },
        {
            question: "Какая любимая песня банана?",
            answers: [
                "«Я жёлтый, я красивый»",
                "«Банановая страна»",
                "«Жёлтая подводная лодка»",
                "«Всё будет в шоколаде»"
            ],
            correct: 2
        },
        {
            question: "Почему банан не любит зиму?",
            answers: [
                "Потому что холодно",
                "Потому что его кожура синеет",
                "Потому что он не умеет кататься на санках",
                "Потому что нет солнца"
            ],
            correct: 1
        },
        {
            question: "Что банан говорит, когда его чистят?",
            answers: [
                "«Ой, щекотно!»",
                "«Наконец-то свобода!»",
                "«Я голый!»",
                "«Спасибо, что раздели!»"
            ],
            correct: 0
        },
        {
            question: "Как банан называет своих друзей?",
            answers: [
                "Бананами",
                "Братанами",
                "Связкой",
                "Друзьянами"
            ],
            correct: 1
        },
        {
            question: "Какая мечта у банана?",
            answers: [
                "Стать шоколадным",
                "Стать банановым хлебом",
                "Попасть в смузи",
                "Стать королём фруктов"
            ],
            correct: 0
        },
        {
            question: "Почему банан всегда опаздывает?",
            answers: [
                "Потому что он медленный",
                "Потому что он долго одевается (чистится)",
                "Потому что он забыл дорогу",
                "Потому что он ждёт друзей"
            ],
            correct: 1
        },
        {
            question: "Что банан говорит, когда его роняют?",
            answers: [
                "«Ай!»",
                "«Я в шоке!»",
                "«Опять на пол!»",
                "«Я банан, а не мяч!»"
            ],
            correct: 1
        }
    ];

    // ===== DOM-ЭЛЕМЕНТЫ =====
    const questionText = document.getElementById('questionText');
    const answersContainer = document.getElementById('answersContainer');
    const quizResult = document.getElementById('quizResult');
    const nextBtn = document.getElementById('nextBtn');
    const restartBtn = document.getElementById('restartBtn');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const scoreValueSpan = document.getElementById('scoreValue');

    // ===== СОСТОЯНИЕ ИГРЫ =====
    let currentIndex = 0;
    let score = 0;
    let answered = false;
    let shuffledQuestions = [];

    // ===== ПЕРЕМЕШИВАНИЕ ВОПРОСОВ =====
    function shuffleArray(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    // ===== ОТОБРАЖЕНИЕ ВОПРОСА =====
    function renderQuestion() {
        answered = false;
        nextBtn.disabled = true;
        quizResult.textContent = '';
        quizResult.className = 'quiz-result';

        const q = shuffledQuestions[currentIndex];

        // Обновляем счётчик
        currentQuestionSpan.textContent = currentIndex + 1;
        totalQuestionsSpan.textContent = shuffledQuestions.length;

        // Текст вопроса
        questionText.textContent = q.question;

        // Очищаем контейнер ответов
        answersContainer.innerHTML = '';

        // Перемешиваем ответы (но запоминаем правильный)
        const correctAnswerText = q.answers[q.correct];
        const shuffledAnswers = shuffleArray(q.answers);

        shuffledAnswers.forEach((answerText) => {
            const btn = document.createElement('button');
            btn.classList.add('answer-btn');
            btn.type = 'button';
            btn.textContent = '🍌 ' + answerText;

            btn.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                // Блокируем все кнопки
                const allButtons = answersContainer.querySelectorAll('.answer-btn');
                allButtons.forEach(b => b.disabled = true);

                // Проверяем правильность
                const isCorrect = (answerText === correctAnswerText);

                if (isCorrect) {
                    btn.classList.add('correct');
                    score++;
                    scoreValueSpan.textContent = score;
                    quizResult.textContent = '✅ Правильно! Банан доволен!';
                    quizResult.classList.add('correct');
                } else {
                    btn.classList.add('wrong');
                    quizResult.textContent = `❌ Неправильно! Правильный ответ: «${correctAnswerText}»`;
                    quizResult.classList.add('wrong');

                    // Подсвечиваем правильный ответ
                    allButtons.forEach(b => {
                        const text = b.textContent.replace('🍌 ', '');
                        if (text === correctAnswerText) {
                            b.classList.add('correct');
                        }
                    });
                }

                // Активируем кнопку "Следующий вопрос" (или "Результат" на последнем)
                nextBtn.disabled = false;

                // Если это был последний вопрос — меняем текст кнопки
                if (currentIndex === shuffledQuestions.length - 1) {
                    nextBtn.textContent = '🏆 Показать результат';
                } else {
                    nextBtn.textContent = 'Следующий вопрос →';
                }
            });

            answersContainer.appendChild(btn);
        });
    }

    // ===== КНОПКА "СЛЕДУЮЩИЙ ВОПРОС" =====
    nextBtn.addEventListener('click', () => {
        if (currentIndex < shuffledQuestions.length - 1) {
            currentIndex++;
            renderQuestion();
        } else {
            // Игра окончена — показываем финальный результат
            showFinalResult();
        }
    });

    // ===== ФИНАЛЬНЫЙ РЕЗУЛЬТАТ =====
    function showFinalResult() {
        questionText.textContent = '🎉 Игра окончена!';
        answersContainer.innerHTML = '';

        const percent = Math.round((score / shuffledQuestions.length) * 100);
        let message = '';

        if (percent === 100) {
            message = '🏆 Идеально! Ты настоящий банановый эксперт!';
        } else if (percent >= 70) {
            message = '🍌 Отлично! Ты знаешь о бананах почти всё!';
        } else if (percent >= 40) {
            message = '🙂 Неплохо! Но бананы знают, что ты можешь лучше.';
        } else {
            message = '😅 Похоже, ты съел слишком мало бананов. Попробуй ещё!';
        }

        const resultDiv = document.createElement('div');
        resultDiv.style.textAlign = 'center';
        resultDiv.style.padding = '1.5rem';
        resultDiv.style.fontSize = '1.3rem';
        resultDiv.style.fontWeight = '700';
        resultDiv.style.color = '#b87c1b';
        resultDiv.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">🍌</div>
            <div>Правильных ответов: ${score} из ${shuffledQuestions.length}</div>
            <div style="margin-top: 0.8rem;">${message}</div>
        `;
        answersContainer.appendChild(resultDiv);

        quizResult.textContent = '';
        nextBtn.disabled = true;
        nextBtn.textContent = 'Следующий вопрос →';
    }

    // ===== ПЕРЕЗАПУСК =====
    function restartQuiz() {
        currentIndex = 0;
        score = 0;
        answered = false;
        scoreValueSpan.textContent = '0';
        shuffledQuestions = shuffleArray(questions);
        nextBtn.textContent = 'Следующий вопрос →';
        nextBtn.disabled = true;
        renderQuestion();
    }

    restartBtn.addEventListener('click', restartQuiz);

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    // Перемешиваем вопросы при загрузке
    shuffledQuestions = shuffleArray(questions);
    totalQuestionsSpan.textContent = shuffledQuestions.length;
    renderQuestion();
})();