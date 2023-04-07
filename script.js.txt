// Oyunların oy sayılarını takip eden bir nesne
let gameVotes = {
  "Valorant": 0,
  "League of Legends": 0,
  "Minecraft": 0,
  "Fortnite": 0,
  "Overwatch": 0
};

// HTML'deki oyunlar listesine tıklanınca çağrılan işlev
function voteForGame(game) {
  // Oyunun oy sayısını arttır
  gameVotes[game]++;
  
  // Sayfada gösterilen oy sayısını güncelle
  let voteCountElement = document.getElementById(game + "-votes");
  voteCountElement.innerText = gameVotes[game].toString();
}

// HTML'deki sohbet kutusu için işlevler
function sendMessage() {
  let messageInput = document.getElementById("message-input");
  let message = messageInput.value;

  // Yeni mesajın HTML'ini oluştur
  let messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.innerText = message;

  // Mesaj kutusuna yeni mesajı ekle
  let chatBox = document.getElementById("chat-box");
  chatBox.appendChild(messageElement);

  // Mesaj kutusunu en son mesaja kaydır
  chatBox.scrollTop = chatBox.scrollHeight;

  // Mesaj girdi kutusunu temizle
  messageInput.value = "";
}

// Sesli sohbet işlevleri
function startVoiceChat() {
  // Başlatma kodları burada olacak
}

function stopVoiceChat() {
  // Durdurma kodları burada olacak
}
