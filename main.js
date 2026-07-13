// ==========================================================================
// TELEGRAM BOTGA ARIZALARNI YUBORISH TIZIMI
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('apply');

    const TELEGRAM_BOT_TOKEN = '7123456789:AAFxExampleToken'; 
    const TELEGRAM_CHAT_ID = '123456789'; 

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const text = `🔔 **Yangi Ariza (1-son Maktab Sayti)**\n\n` +
                         `👤 **Foydalanuvchi:** ${name}\n` +
                         `📞 **Telefon:** ${phone}\n` +
                         `✉️ **Xabar:** ${message}`;

            fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown'
                })
            })
            .then(response => {
                if(response.ok) {
                    alert(`Rahmat, ${name}! Sizning arizangiz maktab ma'muriyatiga muvaffaqiyatli yuborildi.`);
                    contactForm.reset();
                } else {
                    alert("Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.");
                }
            })
            .catch(error => {
                alert("Tarmoq ulanishida xatolik!");
                console.error(error);
            });
        });
    }
});

// ==========================================================================
// DARK MODE / LIGHT MODE TIZIMI (TO'G'RILANGAN VARIANT)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // HTML dagi id bilan bir xil qilindi: "dark-mode-toggle"
    const themeToggleBtn = document.getElementById("dark-mode-toggle"); 
    
    // Agar xotirada hech narsa bo'lmasa, standart variant "light" (oq fon) bo'ladi
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "light");
    }

    const savedTheme = localStorage.getItem("theme");
    const icon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Tekshirish va mos klassni qo'shish
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove("dark-mode");
        if (icon) icon.classList.replace('fa-sun', 'fa-moon');
    }

    // Tugma bosilganda rejimni o'zgartirish algoritmi
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                if (icon) icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                localStorage.setItem("theme", "light");
                if (icon) icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }
});
// ==========================================================================
// DARK MODE / LIGHT MODE TIZIMI (UNIVERSAL VARIANT)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Saytdagi har qanday ehtimoliy ID yoki klass bo'yicha tugmani qidiramiz
    const themeToggleBtn = document.getElementById("dark-mode-toggle") || 
                           document.getElementById("theme-toggle") || 
                           document.querySelector(".theme-toggle") ||
                           document.querySelector("[id*='toggle']"); 
    
    // Agar xotirada hech narsa bo'lmasa, standart variant "light" (oq fon) bo'ladi
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "light");
    }

    const savedTheme = localStorage.getItem("theme");

    // Sahifa yuklanganda rejimni tekshirish va o'rnatish
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        updateIcon(themeToggleBtn, true);
    } else {
        document.body.classList.remove("dark-mode");
        updateIcon(themeToggleBtn, false);
    }

    // Tugma bosilganda rejimni o'zgartirish
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                updateIcon(themeToggleBtn, true);
            } else {
                localStorage.setItem("theme", "light");
                updateIcon(themeToggleBtn, false);
            }
        });
    } else {
        console.error("Dark mode tugmasi topilmadi! HTML faylda tugmaning ID yoki klassini tekshiring.");
    }

    // Ikonkani almashtirish funksiyasi (xatolik bermasligi uchun xavfsiz qilingan)
    function updateIcon(btn, isDark) {
        if (!btn) return;
        const icon = btn.querySelector('i') || btn;
        if (icon && icon.classList) {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
});
// ==========================================================================
// TADBIRLAR MODAL OYNASINI BOSHQARISH
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const eventsModal = document.getElementById("events-modal");
    const openEventsBtn = document.getElementById("open-events-btn");
    const closeEventsModal = document.getElementById("close-events-modal");

    if (openEventsBtn && eventsModal) {
        // Oynani ochish
        openEventsBtn.addEventListener("click", () => {
            eventsModal.style.display = "block";
            document.body.style.overflow = "hidden"; // Orqa fon skrol bo'lmaydi
        });
    }

    if (closeEventsModal && eventsModal) {
        // Oynani yopish (Iks tugmasi bilan)
        closeEventsModal.addEventListener("click", () => {
            eventsModal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }

    // Oynadan tashqariga (fonga) bosilganda ham yopish
    window.addEventListener("click", (e) => {
        if (e.target === eventsModal) {
            eventsModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});
// ==========================================================================
// TADBIRLAR VA RASMLARNI LIGHTBOXDA KO'RSATISH TIZIMI
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const eventsModal = document.getElementById("events-modal");
    const openEventsBtn = document.getElementById("open-events-btn");
    const closeEventsModal = document.getElementById("close-events-modal");

    // Oynani ochish (Bosh sahifadan)
    if (openEventsBtn && eventsModal) {
        openEventsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            eventsModal.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    }

    // Oynani yopish (Orqaga qaytish tugmasi)
    if (closeEventsModal && eventsModal) {
        closeEventsModal.addEventListener("click", () => {
            eventsModal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }

    // LIGHTBOX - RASMNI BOSGANDA KATTA QILISH
    const lightbox = document.getElementById("image-lightbox");
    const lightboxImg = document.getElementById("lightbox-full-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const zoomableImages = document.querySelectorAll(".zoomable-img");
    const lightboxClose = document.querySelector(".lightbox-close");

    zoomableImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = img.alt; // Rasm tagidagi yozuv
        });
    });

    // Katta rasmni yopish (Iks bosilganda yoki fon bosilganda)
    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            lightbox.style.display = "none";
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox || e.target === lightboxClose) {
                lightbox.style.display = "none";
            }
        });
    }
});