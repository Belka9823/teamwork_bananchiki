(function() {
    // ===== БАЗА БАНАНОВЫХ СОБЫТИЙ =====
    const events = [
        {
            emoji: '🍌',
            category: 'fun',
            categoryLabel: '🎈 Весёлое',
            date: '15 марта',
            title: 'День банановой кожуры',
            desc: 'Самый скользкий праздник в году! В этот день принято поскользнуться на банановой кожуре как минимум один раз — на удачу. Считается, что тот, кто упадёт красиво, весь год будет жить без забот.',
            traditions: 'Бросать кожуру под ноги друзьям, устраивать забеги по скользкой дорожке, вручать «Золотую кожуру» самому грациозному падению.',
            attendees: 3421
        },
        {
            emoji: '💒',
            category: 'official',
            categoryLabel: '📅 Официальное',
            date: '1 июня',
            title: 'Банановая свадьба',
            desc: 'Торжественная церемония соединения двух бананов в одну связку. Молодожёны обмениваются кожурой и дают клятву «быть вместе, пока не потемнеем». Гости бросают не рис, а маленькие бананчики.',
            traditions: 'Разрезание бананового торта, танец «Жёлтый вальс», бросание букета из банановых листьев, первый поцелуй под пальмой.',
            attendees: 5217
        },
        {
            emoji: '🥞',
            category: 'food',
            categoryLabel: '🍽️ Вкусное',
            date: '20 июля',
            title: 'Всемирный день бананового хлеба',
            desc: 'Все пекарни мира соревнуются, кто испечёт самый вкусный банановый хлеб. Победитель получает титул «Банановый пекарь года» и золотую лопатку.',
            traditions: 'Дегустация хлеба с 20 видами начинки, конкурс на самый длинный батон, бесплатная раздача бананов детям.',
            attendees: 8934
        },
        {
            emoji: '🏃',
            category: 'fun',
            categoryLabel: '🎈 Весёлое',
            date: '3 августа',
            title: 'Банановый забег',
            desc: 'Участники бегут дистанцию 5 км, держа в руках банан. Нельзя раздавить, съесть или уронить — иначе дисквалификация. Победитель получает корзину бананов и годовой запас смузи.',
            traditions: 'Разминка под песню «Yellow Submarine», финишное фото с бананом в руке, награждение самого аккуратного бегуна.',
            attendees: 2189
        },
        {
            emoji: '🎭',
            category: 'fun',
            categoryLabel: '🎈 Весёлое',
            date: '12 сентября',
            title: 'Карнавал банановых масок',
            desc: 'Все приходят в масках, сделанных из банановой кожуры и жёлтой бумаги. Лучшая маска получает приз — поездку на банановую плантацию.',
            traditions: 'Парад жёлтых костюмов, конкурс на самую креативную маску, вечерние танцы под банановое диско.',
            attendees: 4102
        },
        {
            emoji: '🧘',
            category: 'official',
            categoryLabel: '📅 Официальное',
            date: '8 октября',
            title: 'День медитации с бананом',
            desc: 'День, когда нужно сесть в позу лотоса, взять в руки спелый банан и медитировать на его жёлтый цвет. Считается, что это приносит внутренний покой и калий в организм.',
            traditions: 'Утренняя групповая медитация в парке, обмен бананами в знак дружбы, чтение мантр про бананы.',
            attendees: 1567
        },
        {
            emoji: '🎨',
            category: 'fun',
            categoryLabel: '🎈 Весёлое',
            date: '5 ноября',
            title: 'Конкурс бананового искусства',
            desc: 'Художники со всего мира создают скульптуры и картины из бананов. Главное правило — не использовать ничего, кроме бананов и их кожуры.',
            traditions: 'Выставка работ в банановой галерее, приз зрительских симпатий, мастер-класс «Как нарисовать банан за 30 секунд».',
            attendees: 2876
        },
        {
            emoji: '🍹',
            category: 'food',
            categoryLabel: '🍽️ Вкусное',
            date: '25 декабря',
            title: 'Новогодний банановый смузи-фест',
            desc: 'В самый разгар зимы все собираются, чтобы приготовить самый большой смузи из бананов. Рекорд прошлого года — 500 литров!',
            traditions: 'Совместное приготовление смузи, конкурс на самый жёлтый напиток, обмен рецептами, зимние банановые песни.',
            attendees: 6743
        }
    ];

    // ===== DOM-ЭЛЕМЕНТЫ =====
    const eventsGrid = document.getElementById('eventsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // ===== ФОРМАТИРОВАНИЕ ЧИСЛА =====
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    // ===== РЕНДЕР СОБЫТИЙ =====
    function renderEvents(filter = 'all') {
        const filtered = filter === 'all'
            ? events
            : events.filter(e => e.category === filter);

        eventsGrid.innerHTML = '';

        if (filtered.length === 0) {
            const empty = document.createElement('div');
            empty.classList.add('empty-state');
            empty.textContent = '😢 В этой категории пока нет событий. Заходите позже!';
            eventsGrid.appendChild(empty);
            return;
        }

        filtered.forEach((event, index) => {
            const card = document.createElement('div');
            card.classList.add('event-card');
            // Плавное появление с задержкой
            card.style.animation = `fadeInUp 0.4s ease ${index * 0.08}s both`;

            card.innerHTML = `
                <div class="event-header">
                    <div class="event-emoji">${event.emoji}</div>
                    <div class="event-category">${event.categoryLabel}</div>
                </div>
                <div class="event-body">
                    <div class="event-date">📅 ${event.date}</div>
                    <div class="event-title">${event.title}</div>
                    <div class="event-desc">${event.desc}</div>
                    <div class="event-traditions">
                        <strong>🎊 Традиции:</strong>
                        ${event.traditions}
                    </div>
                    <div class="event-footer">
                        <div class="event-attendees">👥 ${formatNumber(event.attendees)} участников</div>
                        <div>🍌 Присоединиться</div>
                    </div>
                </div>
            `;

            eventsGrid.appendChild(card);
        });
    }

    // ===== ОБРАБОТКА ФИЛЬТРОВ =====
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Убираем активный класс у всех
            filterButtons.forEach(b => b.classList.remove('active'));
            // Добавляем активный на нажатую
            btn.classList.add('active');
            // Рендерим с фильтром
            renderEvents(btn.dataset.filter);
        });
    });

    // ===== ДИНАМИЧЕСКОЕ ДОБАВЛЕНИЕ АНИМАЦИИ =====
    // Добавляем keyframes в head, если их нет
    if (!document.getElementById('iventsKeyframes')) {
        const style = document.createElement('style');
        style.id = 'iventsKeyframes';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    renderEvents('all');

    // ===== КЛИК ПО ССЫЛКЕ "ПРИСОЕДИНИТЬСЯ" (делегирование) =====
    eventsGrid.addEventListener('click', (e) => {
        const footer = e.target.closest('.event-footer');
        if (footer && e.target.textContent.includes('Присоединиться')) {
            const card = footer.closest('.event-card');
            const title = card.querySelector('.event-title').textContent;
            // Простой фидбэк
            const originalText = e.target.textContent;
            e.target.textContent = '✅ Вы записаны!';
            e.target.style.color = '#5a8a1e';
            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.style.color = '';
            }, 1500);
            console.log(`Пользователь присоединился к событию: ${title}`);
        }
    });
})();