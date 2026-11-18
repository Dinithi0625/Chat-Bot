const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-btn");
const themeBtn = document.getElementById("theme-btn");
const chips = document.querySelectorAll(".chip");

// Current Time Helper
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Add Message to Chat UI
function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");

    if (sender === "bot") {
        msgDiv.innerHTML = `
            <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="msg-content">
                <p>${text}</p>
                <span class="msg-time">${getCurrentTime()}</span>
            </div>
        `;
    } else {
        msgDiv.innerHTML = `
            <div class="msg-content">
                <p>${text}</p>
                <span class="msg-time">${getCurrentTime()}</span>
            </div>
        `;
    }

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Show Typing Indicator
function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot-message");
    typingDiv.id = "typing-indicator";
    typingDiv.innerHTML = `
        <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="msg-content">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typing-indicator");
    if (typing) typing.remove();
}

// Bot Response Logic (Sinhala & English)
function getBotReply(input) {
    const text = input.toLowerCase().trim();

    if (text.includes("hi") || text.includes("hello") || text.includes("ආයුබෝවන්") || text.includes("kohomada")) {
        return "ආයුබෝවන්! 😊 මම හොඳින් ඉන්නවා. ඔයාට මම කොහොමද උදව් කරන්න ඕනේ?";
    }
    if (text.includes("කවුද") || text.includes("who are you") || text.includes("nama")) {
        return "මම **Nova AI** 🤖 — HTML, CSS, සහ JavaScript වලින් නිර්මාණය කරපු ඔයාගේ පුද්ගලික Assistant!";
    }
    if (text.includes("වෙලාව") || text.includes("time")) {
        return `දැන් වෙලාව **${new Date().toLocaleTimeString()}** ⏰`;
    }
    if (text.includes("දිනය") || text.includes("date")) {
        return `අද දිනය **${new Date().toLocaleDateString()}** 📅`;
    }
    if (text.includes("විහිළු") || text.includes("joke")) {
        const jokes = [
            "Programmer කෙනෙක් ඇයි Dark Mode පාවිච්චි කරන්නේ? මොකද Light එකට Bugs ලා ආකර්ෂණය වෙන නිසා! 🐛😂",
            "ගුරුවරයා: 'ඔයාගේ බල්ලා ඇයි ගෙදර වැඩ පොත කෑවේ?' ශිෂ්‍යයා: 'මම ඒකට බලෙන් කැව්වා සර්, සර් කිව්වනේ ඒක හරිම රසවත් රචනාවක් වෙන්න ඕනේ කියලා!' 😄"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }
    if (text.includes("coding") || text.includes("programming")) {
        return "Coding කියන්නේ අලුත් ලෝකයක් නිර්මාණය කරන කලාවක්! 💻 HTML, CSS, JS වලින් පටන් ගත්තාම ඔයාට ඕනෑම Web App එකක් හදන්න පුළුවන්.";
    }
    if (text.includes("bye") || text.includes("ගිහින් එන්නම්")) {
        return "හොඳයි, සුභ දවසක්! 👋 නැවත හමුවෙමු.";
    }

    return "හරිම රසවත් ප්‍රශ්නයක්! 🤔 මට තවම ඒ ගැන ඉගෙන ගන්න දේවල් තියෙනවා. වෙනත් ප්‍රශ්නයක් අහලා බලන්න!";
}

// Handle Send
function handleSend() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";

    showTyping();
    setTimeout(() => {
        removeTyping();
        const reply = getBotReply(message);
        addMessage(reply, "bot");
    }, 800);
}

// Event Listeners
sendBtn.addEventListener("click", handleSend);

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
});

chips.forEach(chip => {
    chip.addEventListener("click", () => {
        userInput.value = chip.innerText;
        handleSend();
    });
});

clearBtn.addEventListener("click", () => {
    chatBox.innerHTML = `
        <div class="message bot-message">
            <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="msg-content">
                <p>Chat එක clear කළා! 🧹 අලුතින් කතා කරමු.</p>
                <span class="msg-time">${getCurrentTime()}</span>
            </div>
        </div>
    `;
});

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const icon = themeBtn.querySelector("i");
    icon.classList.toggle("fa-sun");
    icon.classList.toggle("fa-moon");
});