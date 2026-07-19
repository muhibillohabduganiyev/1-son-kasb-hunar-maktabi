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
// ==========================================
// LOYIHA: ALOQA (MUROJAAT) BO'LIMI INTEGRATSIYASI
// ==========================================
const murojaatAnonim = document.getElementById("murojaatAnonim");
const murojaatTelBloki = document.getElementById("murojaatTelBloki");
const murojaatTel = document.getElementById("murojaatTel");
const murojaatForm = document.getElementById("murojaatForm");
const submitMurojaatBtn = document.getElementById("submitMurojaatBtn");

// 1. ANONIM CHECKBOX BOSILGANDA TELEFONNI YASHIRISH/KO'RSATISH
if (murojaatAnonim && murojaatTelBloki && murojaatTel) {
    murojaatAnonim.addEventListener("change", function() {
        if (this.checked) {
            murojaatTelBloki.style.display = "none";
            murojaatTel.required = false;
            murojaatTel.value = ""; // Maydonni tozalaydi
        } else {
            murojaatTelBloki.style.display = "block";
            murojaatTel.required = true;
        }
    });
}

// 2. MUROJAATNI MUTLAQO YANGI BOTGA YUBORISH LIKASI
if (murojaatForm) {
    murojaatForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        if (submitMurojaatBtn) {
            submitMurojaatBtn.disabled = true;
            submitMurojaatBtn.innerText = "Yuborilmoqda...";
        }

        // Yangi Murojaat boting tokeni va chat_id'sini shu yerga yozasan:
        const MUROJAAT_BOT_TOKEN = "7894709242:AAHQz1DX-ehB74hT31fYPffhbPZLUsfJo1k"; 
        const MUROJAAT_CHAT_ID = "7126399414"; 

        const ism = document.getElementById("murojaatIsm").value;
        const matn = document.getElementById("murojaatMatn").value;
        const isAnonim = murojaatAnonim ? murojaatAnonim.checked : false;
        
        // Agar anonim bo'lsa raqam o'rniga "Anonim kiritildi" deb ketadi
        const telefon = isAnonim ? "🤫 Yashirilgan (Anonim murojaat)" : murojaatTel.value;

        const message = `
📩 *YANGI MUROJAAT / TAKLIF KELDI!*
━━━━━━━━━━━━━━━━━━━━
👤 *Kimdan:* ${ism}
📞 *Telefon:* ${telefon}
💬 *Murojaat matni:* 
${matn}
━━━━━━━━━━━━━━━━━━━━
`;

        fetch(`https://api.telegram.org/bot${MUROJAAT_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: MUROJAAT_CHAT_ID,
                text: message,
                parse_mode: "Markdown"
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("Murojaatingiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.");
                murojaatForm.reset();
                if (murojaatTelBloki) murojaatTelBloki.style.display = "block";
                if (murojaatTel) murojaatTel.required = true;
            } else {
                throw new Error("Xatolik");
            }
        })
        .catch(err => {
            alert("Murojaatni yuborishda xatolik yuz berdi!");
        })
        .finally(() => {
            if (submitMurojaatBtn) {
                submitMurojaatBtn.disabled = false;
                submitMurojaatBtn.innerHTML = 'Xabarni yuborish <i class="fas fa-paper-plane"></i>';
            }
        });
    });
}
// Agarda main.js ichida Firebase hali tashabbuslashtirilmagan bo'lsa (init qilinmagan bo'lsa), mana bu blokni qo'sh:
const firebaseConfig = {
  apiKey: "AIzaSyCwubXbLapbWd6rYWWOy1qOCiIOQFMQaDo",
  authDomain: "kollej-admin-panel-9984f.firebaseapp.com",
  projectId: "kollej-admin-panel-9984f",
  storageBucket: "kollej-admin-panel-9984f.firebasestorage.app",
  messagingSenderId: "325613067064",
  appId: "1:325613067064:web:2dac5aa573871abde6bfcd"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// BAZADAN STATISTIKANI O'QIB EKRAINGA CHIQARISH
db.collection("sozlamalar").doc("statistika").get()
.then((doc) => {
    if (doc.exists) {
        const data = doc.data();
        // HTML elementlarga bazadagi ma'lumotni plyus belgisi bilan yozamiz
        if(document.getElementById("displayBitiruvchi")) document.getElementById("displayBitiruvchi").innerText = (data.bitiruvchilar || 0) + "+";
        if(document.getElementById("displayOqituvchi")) document.getElementById("displayOqituvchi").innerText = (data.oqituvchilar || 0) + "+";
        if(document.getElementById("displayYonalish")) document.getElementById("displayYonalish").innerText = (data.yonalishlar || 0) + "+";
        if(document.getElementById("displayHamkor")) document.getElementById("displayHamkor").innerText = (data.hamkorlar || 0) + "+";
    }
})
.catch(err => console.error("Statistikani yuklashda xatolik:", err));
// ==========================================
// KASB YO'NALISHLARINI ASOSIY SAHIFADA CHIZISH
// ==========================================

// ==========================================
// YO'NALISHLARNI ESKILARINI SAQLAB, DAVOMIDAN QO'SHISH
// ==========================================

const container9 = document.getElementById("yonalishlar-9-container");
const container11 = document.getElementById("yonalishlar-11-container");

if (typeof db !== 'undefined') {
    db.collection("yonalishlar").orderBy("vaqt", "asc").onSnapshot((snapshot) => {
        // Har safar ma'lumot yangilanganda konteynerlarni tozalaymiz
        if (container9) container9.innerHTML = "";
        if (container11) container11.innerHTML = "";

        snapshot.forEach((doc) => {
            const data = doc.data();
            
            // Sinfga qarab rang ajratamiz (9-sinf ko'k, 11-sinf yashil)
            const themeColor = data.sinf === "9" ? "#0056b3" : "#28a745";
            const bgColor = data.sinf === "9" ? "#eaf4ff" : "#e8f5e9";

            const cardHTML = `
                <div class="yonalish-card" style="padding: 30px 25px; background: #fff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; justify-content: space-between; min-height: 380px; box-sizing: border-box; border: 1px solid #f0f0f0; border-left: 5px solid ${themeColor};">
                    <div>
                        <!-- Icon qutisi -->
                        <div class="icon-box" style="background: ${bgColor}; width: 54px; height: 54px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                            <i class="${data.icon || 'fas fa-graduation-cap'}" style="color: ${themeColor}; font-size: 22px;"></i>
                        </div>
                        
                        <!-- Yo'nalish nomi -->
                        <h3 style="font-size: 21px; color: #1e1e1e; margin: 0 0 14px 0; font-weight: 700; line-height: 1.4; font-family: sans-serif; text-align: left;">${data.nomi}</h3>
                        
                        <!-- Ta'rifi -->
                        <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0; font-family: sans-serif; text-align: left;">${data.tarif}</p>
                    </div>

                    <!-- Pastki qism paneli -->
                    <div style="border-top: 1px solid #eeeeee; padding-top: 18px; display: flex; justify-content: space-between; font-size: 14px; color: #666; font-family: sans-serif;">
                        <span style="display: flex; align-items: center; gap: 6px;"><i class="far fa-clock"></i> ${data.muddat}</span>
                        <span style="display: flex; align-items: center; gap: 6px;"><i class="far fa-user"></i> ${data.imtiyoz}</span>
                    </div>
                </div>
            `;

            // Ma'lumotni o'zining shaxsiy toza konteyneriga joylaymiz
            if (data.sinf === "9" && container9) {
                container9.insertAdjacentHTML('beforeend', cardHTML);
            } else if (data.sinf === "11" && container11) {
                container11.insertAdjacentHTML('beforeend', cardHTML);
            }
        });
    });
}