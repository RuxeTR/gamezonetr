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

// server.js

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;

// MongoDB bağlantısı
const mongoClient = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
let db;

mongoClient.connect((err, client) => {
  if (err) {
    console.error('MongoDB bağlantısı kurulamadı: ' + err);
    return;
  }
  
  console.log('MongoDB bağlantısı başarılı');
  db = client.db('oyunlar');
});

// Express ile sunucu oluşturma
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.IO ile gerçek zamanlı sohbet
io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı');

  // Kullanıcının katıldığı kanalı al
  socket.on('join', (channel) => {
    console.log(`Kullanıcı ${socket.id} kanala ${channel} katıldı`);
    socket.join(channel);
  });

  // Mesaj gönderme
  socket.on('chat message', (msg, channel) => {
    console.log(`Kullanıcı ${socket.id} mesaj gönderdi: ${msg}`);
    io.to(channel).emit('chat message', msg);
  });

  // Oy kullanma
  socket.on('vote', (gameId) => {
    console.log(`Kullanıcı ${socket.id} oy kullandı: ${gameId}`);
    db.collection('games').updateOne({ _id: gameId }, { $inc: { votes: 1 } }, (err, result) => {
      if (err) {
        console.error('Oy kaydedilemedi: ' + err);
      } else {
        console.log('Oy kaydedildi');
        io.emit('vote', gameId);
      }
    });
  });

  // Kullanıcı çıkışı
  socket.on('disconnect', () => {
    console.log('Bir kullanıcı ayrıldı');
  });
});
// Sunucuyu dinlemeye başla
http.listen(3000, () => {
  console.log('Sunucu çalışıyor...');
});

// Sunucuyu dinlemeye başla
http.listen(3000, () => {
  console.log('Sunucu çalışıyor...');
});

// Yeni bir kullanıcı bağlandığında yapılacaklar
io.on('connection', (socket) => {
  console.log(`Yeni bir kullanıcı bağlandı: ${socket.id}`);

  // Kullanıcı mesaj gönderdiğinde yapılacaklar
  socket.on('chat message', (msg) => {
    console.log(`${socket.id} adlı kullanıcıdan mesaj alındı: ${msg}`);
  });
});
