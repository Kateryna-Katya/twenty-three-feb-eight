document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок Lucide
    lucide.createIcons();

    // 2. Инициализация AOS
    AOS.init({ duration: 1000, once: true });

    // 3. Мобильное меню
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');

    const toggleMenu = () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    burger.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', () => {
        if(nav.classList.contains('active')) toggleMenu();
    }));

    // 4. Валидация телефона (только цифры)
    const phoneInput = document.getElementById('phone-input');
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // 5. Математическая капча
    const captchaTask = document.getElementById('captcha-task');
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 + num2;
    if(captchaTask) captchaTask.textContent = `${num1} + ${num2}`;

    // 6. Обработка формы (AJAX-имитация)
    const form = document.getElementById('main-form');
    const status = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userAnswer = parseInt(document.getElementById('captcha-answer').value);

        if (userAnswer !== correctAnswer) {
            status.textContent = 'Ошибка капчи! Попробуйте снова.';
            status.className = 'form__status error';
            return;
        }

        status.textContent = 'Отправка данных...';
        status.className = 'form__status';
        status.style.display = 'block';

        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 1500));

        status.textContent = 'Спасибо! Заявка успешно отправлена. Мы свяжемся с вами.';
        status.className = 'form__status success';
        form.reset();
    });

    // 7. Cookie Popup
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (!localStorage.getItem('cookies_accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }

    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookies_accepted', 'true');
        cookiePopup.classList.remove('active');
    });

    // 8. Эффект параллакса для Hero Orb (из прошлых этапов)
    const orb = document.getElementById('orb');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        if(orb) orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});