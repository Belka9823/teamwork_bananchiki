// Переключение мобильного меню
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  });
}

// Раскрытие фактов
document.querySelectorAll(".fact-card").forEach((card) => {
  card.addEventListener("click", () => {
    const expanded = card.getAttribute("aria-expanded") === "true";
    card.setAttribute("aria-expanded", String(!expanded));
    const hint = card.querySelector(".card-hint");
    if (hint) hint.textContent = expanded ? "Нажми, чтобы узнать больше ＋" : "Свернуть заметку −";
  });
});

// Шуткомет
const jokes = [
  "Почему банан пошёл к врачу? Он плохо себя очищал. 🍌",
  "Банан не опаздывает — он просто дозревает по дороге.",
  "Как зовут банана-супергероя? Бананмен!",
  "Главное в жизни — не скользить на кожуре чужих ошибок."
];

const jokeButton = document.querySelector("#banana-joke");
const jokeOutput = document.querySelector("#joke-output");
if (jokeButton && jokeOutput) {
  jokeButton.addEventListener("click", () => {
    const current = jokeOutput.dataset.index;
    let next = Math.floor(Math.random() * jokes.length);
    if (jokes.length > 1 && String(next) === current) next = (next + 1) % jokes.length;
    jokeOutput.dataset.index = String(next);
    jokeOutput.textContent = jokes[next];
  });
}

// Логика отзывов и лайков
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');

if (reviewForm && reviewsList) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const text = document.getElementById('text').value;

    const newCard = document.createElement('article');
    newCard.className = 'review-card';
    newCard.innerHTML = `
      <div class="review-header">
        <strong>${escapeHtml(name)}</strong>
        <button class="like-btn" type="button">❤️ <span class="like-count">0</span></button>
      </div>
      <p>«${escapeHtml(text)}»</p>
    `;

    reviewsList.prepend(newCard);
    reviewForm.reset();
  });
}

document.addEventListener('click', (e) => {
  if (e.target.closest('.like-btn')) {
    const btn = e.target.closest('.like-btn');
    const countSpan = btn.querySelector('.like-count');
    let count = parseInt(countSpan.textContent);
    btn.classList.toggle('liked');
    if (btn.classList.contains('liked')) {
      count++;
    } else {
      count--;
    }
    countSpan.textContent = count;
  }
});

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

document.querySelectorAll(".current-year").forEach((node) => {
  node.textContent = new Date().getFullYear();
});