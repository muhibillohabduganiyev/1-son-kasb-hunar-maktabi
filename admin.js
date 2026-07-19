// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwubXbLapbWd6rYWWOy1qOCiIOQFMQaDo",
  authDomain: "kollej-admin-panel-9984f.firebaseapp.com",
  projectId: "kollej-admin-panel-9984f",
  storageBucket: "kollej-admin-panel-9984f.firebasestorage.app",
  messagingSenderId: "325613067064",
  appId: "1:325613067064:web:2dac5aa573871abde6bfcd"
};

// Firebase-ni ishga tushirish
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

// Elementlarni olish
const loginBox = document.getElementById("loginBox");
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");
const adminPanel = document.getElementById("adminPanel");
const logoutBtn = document.getElementById("logoutBtn");

// ==========================================
// A. AVTOMATIK TEKSHIRUV (TIZIMGA KIRILGANMI YOKI YO'Q)
// ==========================================
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("Foydalanuvchi tizimda:", user.email);
        // Agar foydalanuvchi login qilgan bo'lsa, to'g'ridan-to'g'ri panelni ochamiz
        loginBox.style.display = "none";
        adminPanel.style.display = "block";
        loadStatistika();
    } else {
        console.log("Foydalanuvchi tizimga kirmagan.");
        // Agar chiqib ketgan bo'lsa, login oynasini ko'rsatamiz
        loginBox.style.display = "flex";
        adminPanel.style.display = "none";
    }
});

// ==========================================
// B. LOGIN FORMASI SUBMIT BO'LGANDA
// ==========================================
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.getElementById("adminEmail").value.trim();
        const password = document.getElementById("adminPassword").value.trim();
        
        errorMsg.style.display = "none";
        console.log("Tizimga kirishga urinish:", email);

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("Muvaffaqiyatli kirildi!", userCredential.user);
                // Panel avtomatik ravishda onAuthStateChanged orqali ochiladi
            })
            .catch((error) => {
                console.error("Firebase Auth xatoligi:", error.code, error.message);
                errorMsg.style.display = "block";
                errorMsg.innerText = "Xatolik: " + error.message;
            });
    });
}

// Tizimdan chiqish tugmasi
if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        auth.signOut().then(() => {
            alert("Tizimdan chiqdingiz!");
            window.location.reload();
        }).catch(err => {
            console.error("Chiqishda xatolik:", err);
        });
    });
}

// ==========================================
// D. MENYULARNI ALMASHTIRISH (TAB SYSTEM)
// ==========================================
window.switchTab = function(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    
    // Barcha tablarni yashirish
    contents.forEach(content => content.style.display = 'none');

    // Hamma menyulardan aktivlikni olib tashlash
    const menuItems = document.querySelectorAll('.sidebar-item');
    menuItems.forEach(item => {
        item.style.background = 'transparent';
        item.style.borderLeft = 'none';
        item.style.color = '#b8c7ce';
    });

    // Faqat tanlangan tabni ochish
    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) targetTab.style.display = 'block';

    // Tanlangan menyuni aktiv qilish
    const activeMenu = document.getElementById(`menu-${tabName}`);
    if (activeMenu) {
        activeMenu.style.background = '#1e282c';
        activeMenu.style.borderLeft = '4px solid #007bff';
        activeMenu.style.color = 'white';
    }
};

// ==========================================
// E. 1-BO'LIM: STATISTIKA BAZA BILAN ISHLAYDI
// ==========================================
function loadStatistika() {
    db.collection("sozlamalar").doc("statistika").get()
    .then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            document.getElementById("statBitiruvchi").value = data.bitiruvchilar || 0;
            document.getElementById("statOqituvchi").value = data.oqituvchilar || 0;
            document.getElementById("statYonalish").value = data.yonalishlar || 0;
            document.getElementById("statHamkor").value = data.hamkorlar || 0;
        } else {
            console.log("Bazada hali statistika yo'q. Birinchi marta saqlanganda ochiladi.");
        }
    })
    .catch(err => console.error("Firestore yuklashda xatolik:", err));
}

window.saveStatistika = function() {
    const bitiruvchilar = parseInt(document.getElementById("statBitiruvchi").value) || 0;
    const oqituvchilar = parseInt(document.getElementById("statOqituvchi").value) || 0;
    const yonalishlar = parseInt(document.getElementById("statYonalish").value) || 0;
    const hamkorlar = parseInt(document.getElementById("statHamkor").value) || 0;

    db.collection("sozlamalar").doc("statistika").set({
        bitiruvchilar: bitiruvchilar,
        oqituvchilar: oqituvchilar,
        yonalishlar: yonalishlar,
        hamkorlar: hamkorlar
    })
    .then(() => {
        alert("Statistika ko'rsatkichlari Firestore bazasida muvaffaqiyatli saqlandi! 🎉");
    })
    .catch((error) => {
        alert("Saqlashda xatolik yuz berdi: " + error.message);
    });
};
// ==========================================
// // ==========================================
// F. 2-BO'LIM: KASB YO'NALISHLARINI BOSHQARISH
// ==========================================

const yonalishForm = document.getElementById("yonalishForm");
const yonalishlarJadvali = document.getElementById("yonalishlarJadvali");

// 1. Real-time ma'lumotlarni jadvalda ko'rsatish (Tahrirlash tugmasi bilan)
if (yonalishlarJadvali) {
    db.collection("yonalishlar").orderBy("vaqt", "desc").onSnapshot((snapshot) => {
        yonalishlarJadvali.innerHTML = "";
        
        if (snapshot.empty) {
            yonalishlarJadvali.innerHTML = `<tr><td colspan="4" style="padding: 15px; text-align: center; color: #777;">Hozircha yo'nalishlar yo'q.</td></tr>`;
            return;
        }

        snapshot.forEach((doc) => {
            const data = doc.data();
            const docId = doc.id;

            const tr = document.createElement("tr");
            tr.style.borderBottom = "1px solid #dee2e6";

            tr.innerHTML = `
                <td style="padding: 12px; font-weight: bold; color: #333;">
                    <i class="${data.icon || 'fas fa-graduation-cap'}" style="margin-right:8px; color:#007bff;"></i> ${data.nomi}
                </td>
                <td style="padding: 12px;"><span style="background:#e1f5fe; color:#0288d1; padding:3px 8px; border-radius:12px; font-size:12px;">${data.sinf}-sinf</span></td>
                <td style="padding: 12px; font-size:13px; color:#555;">${data.muddat} <br> <small style="color:green;">${data.imtiyoz}</small></td>
                <td style="padding: 12px;">
                    <button onclick="editYonalish('${docId}')" style="background: #ffc107; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;">✏️</button>
                    <button onclick="deleteYonalish('${docId}')" style="background: #dc3545; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">🗑️</button>
                </td>
            `;
            yonalishlarJadvali.appendChild(tr);
        });
    });
}

// 2. Yangi ma'lumot qo'shish
if (yonalishForm) {
    yonalishForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Agar "Yangilash" rejimida bo'lsa, submit ishlamasligi kerak
        const addBtn = document.querySelector("button[type='submit']");
        if(addBtn.innerText.includes("Yangilash")) return; 

        db.collection("yonalishlar").add({
            nomi: document.getElementById("yonalishNomi").value.trim(),
            tarif: document.getElementById("yonalishTarif").value.trim(),
            muddat: document.getElementById("yonalishMuddat").value.trim(),
            imtiyoz: document.getElementById("yonalishImtiyoz").value.trim(),
            sinf: document.getElementById("yonalishSinf").value,
            icon: document.getElementById("yonalishIcon").value.trim(),
            vaqt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert("Muvaffaqiyatli qo'shildi! 🚀");
            yonalishForm.reset();
        });
    });
}

// 3. O'chirish funksiyasi
window.deleteYonalish = function (id) {
    if (confirm("Ushbu kasb yo'nalishini o'chirmoqchisiz?")) {
        db.collection("yonalishlar").doc(id).delete();
    }
};

// 4. Tahrirlash funksiyasi
window.editYonalish = async function (id) {
    const doc = await db.collection("yonalishlar").doc(id).get();
    const data = doc.data();

    // Inputlarni to'ldirish
    document.getElementById("yonalishNomi").value = data.nomi;
    document.getElementById("yonalishTarif").value = data.tarif;
    document.getElementById("yonalishMuddat").value = data.muddat;
    document.getElementById("yonalishImtiyoz").value = data.imtiyoz;
    document.getElementById("yonalishSinf").value = data.sinf;
    document.getElementById("yonalishIcon").value = data.icon;

    // Tugmani o'zgartirish
    const addBtn = document.querySelector("button[type='submit']");
    addBtn.innerText = "🔄 Ma'lumotni yangilash";
    addBtn.style.background = "#28a745";

    // Yangilash jarayoni
    addBtn.onclick = function(e) {
        e.preventDefault();
        db.collection("yonalishlar").doc(id).update({
            nomi: document.getElementById("yonalishNomi").value,
            tarif: document.getElementById("yonalishTarif").value,
            muddat: document.getElementById("yonalishMuddat").value,
            imtiyoz: document.getElementById("yonalishImtiyoz").value,
            sinf: document.getElementById("yonalishSinf").value,
            icon: document.getElementById("yonalishIcon").value
        }).then(() => {
            alert("Muvaffaqiyatli yangilandi!");
            location.reload(); 
        });
    };
};