// ==========================================================================
// TELEGRAM BOTGA ARIZALARNI YUBORISH TIZIMI
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('apply');

    // !!! MAKTAB UCHUN SOZLAMALAR !!!
    // Maktab xodimi o'z botini va ID sini bu yerga yozadi
    const TELEGRAM_BOT_TOKEN = '7123456789:AAFxExampleToken'; // Bu yerga Bot token qo'yiladi
    const TELEGRAM_CHAT_ID = '123456789'; // Bu yerga maktab direktorining yoki mas'ulning IDsi qo'yiladi

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Telegramga boradigan xabar formati
            const text = `🔔 **Yangi Ariza (1-son Maktab Sayti)**\n\n` +
                         `👤 **Foydalanuvchi:** ${name}\n` +
                         `📞 **Telefon:** ${phone}\n` +
                         `✉️ **Xabar:** ${message}`;

            // Telegram API ga so'rov yuborish
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