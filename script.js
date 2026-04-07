document.addEventListener('DOMContentLoaded', () => {

    // ===============================
    // 🎯 HERO TEXT ANIMATION
    // ===============================
    const words = ["Heals", "Protects", "Restores"];
    let i = 0;

    const dynamicWord = document.querySelector('.dinamic-word');

    if (dynamicWord) {
        setInterval(() => {
            dynamicWord.style.opacity = 0;

            setTimeout(() => {
                i = (i + 1) % words.length;
                dynamicWord.textContent = words[i];
                dynamicWord.style.opacity = 1;
            }, 300);
        }, 2500);
    }

    // ===============================
    // 🎯 PRODUCT ZOOM
    // ===============================
    document.querySelectorAll('.product-img').forEach(container => {
        const img = container.querySelector('img');

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / container.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / container.clientHeight) * 100;

            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = "scale(1.8)";
        });

        container.addEventListener('mouseleave', () => {
            img.style.transformOrigin = "center";
            img.style.transform = "scale(1)";
        });
    });

    // ===============================
    // 🎯 SMOOTH SCROLL (для ссылок)
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===============================
    // 🎯 КНОПКИ (ГЛАВНОЕ)
    // ===============================

    // Explore Collection
    document.querySelectorAll('.btn-collection').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = document.getElementById('collection');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Our Mission → Impact
    document.querySelectorAll('.btn-impact-scroll').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = document.getElementById('impact');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Shop Now (navbar)
    const navBtn = document.querySelector('.nav-btn');
    if (navBtn) {
        navBtn.addEventListener('click', () => {
            const section = document.getElementById('collection');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ===============================
    // 🎯 MODAL (форма)
    // ===============================
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.querySelector('.modal .close');

    // Открытие модалки
    document.querySelectorAll('.btn-contact').forEach(btn => {
        btn.addEventListener('click', () => {
            if (modal) modal.classList.add('active');
        });
    });

    // Footer "Get in touch"
    document.querySelectorAll('.footer-contact a[href="#contact-form"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) modal.classList.add('active');
        });
    });

    // Закрытие
    if (modal && closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));

        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') modal.classList.remove('active');
        });
    }

    // ===============================
    // 🎯 FORM SUBMIT
    // ===============================
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent!');
            modal.style.display = 'none';
        });
    }

    // ===============================
    // 🎯 REVEAL ANIMATION
    // ===============================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                animateNumbers(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.reveal, .impact-section, .trust-bar').forEach(el => {
        observer.observe(el);
    });

    // ===============================
    // 🎯 COUNTER ANIMATION
    // ===============================
    function animateNumbers(section) {
        const nums = section.querySelectorAll('.trust-num');

        nums.forEach(num => {
            const text = num.innerText.trim();
            const hasK = text.toLowerCase().includes('k');
            const hasPercent = text.includes('%');

            let target = parseInt(text);
            if (isNaN(target)) return;

            if (hasK) target *= 1000;

            let count = 0;

            const update = () => {
                count += Math.ceil(target / 60);

                if (count < target) {
                    let display = count;

                    if (hasK) display = Math.floor(count / 1000) + 'k';
                    if (hasPercent) display = count + '%';

                    num.innerText = display;
                    requestAnimationFrame(update);
                } else {
                    num.innerText = text;
                }
            };

            update();
        });
    }

});
