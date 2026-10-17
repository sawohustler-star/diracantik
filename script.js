document.addEventListener('DOMContentLoaded', function () {
  const musicUpload = document.getElementById('musicUpload');
  const audioPlayer = document.getElementById('audioPlayer');
  const songName = document.getElementById('songName');
  const songHint = document.getElementById('songHint');
  const vinyl = document.querySelector('.vinyl');
  const photoUpload = document.getElementById('photoUpload');
  const gallery = document.getElementById('gallery');
  const photoCount = document.getElementById('photoCount');
  const surpriseButton = document.getElementById('surpriseButton');
  const finalMessage = document.getElementById('finalMessage');
  const menuButton = document.getElementById('menuButton');
  const nav = document.querySelector('.navbar nav');
  const toast = document.getElementById('toast');
  let toastTimer;
  let currentMusicUrl = null;
  let photoUrls = [];

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2800);
  }

  musicUpload.addEventListener('change', function () {
    const file = musicUpload.files && musicUpload.files[0];
    if (!file) return;
    if (!file.type.startsWith('audio/')) {
      showToast('Pilih file audio seperti MP3, ya.');
      musicUpload.value = '';
      return;
    }
    if (currentMusicUrl) URL.revokeObjectURL(currentMusicUrl);
    currentMusicUrl = URL.createObjectURL(file);
    audioPlayer.src = currentMusicUrl;
    songName.textContent = file.name.replace(/\.[^/.]+$/, '');
    songHint.textContent = 'Lagu pilihanmu sudah siap diputar ♡';
    audioPlayer.load();
    audioPlayer.play().then(function () {
      vinyl.classList.add('playing');
    }).catch(function () {
      showToast('Lagu siap! Tekan tombol play pada pemutar musik.');
    });
  });

  audioPlayer.addEventListener('play', function () {
    vinyl.classList.add('playing');
  });
  audioPlayer.addEventListener('pause', function () {
    vinyl.classList.remove('playing');
  });
  audioPlayer.addEventListener('ended', function () {
    vinyl.classList.remove('playing');
  });

  photoUpload.addEventListener('change', function () {
    const files = Array.from(photoUpload.files || []).filter(function (file) {
      return file.type.startsWith('image/');
    });
    if (!files.length) {
      showToast('Pilih file foto dengan format gambar, ya.');
      return;
    }
    photoUrls.forEach(function (url) { URL.revokeObjectURL(url); });
    photoUrls = files.map(function (file) { return URL.createObjectURL(file); });

    
gallery.innerHTML = '';

files.forEach(function (file, index) {
    const card = document.createElement('article');
    card.className = 'photo-card';

    const frame = document.createElement('div');
    frame.className = 'photo-frame';

    const img = document.createElement('img');
    img.src = photoUrls[index];
    img.alt = 'Kenangan bersama Dira, foto ' + (index + 1);

    const caption = document.createElement('p');
    const captions = [
        'Awal cerita kita ♡',
        'Senyum favoritku ♡',
        'Selalu bersama ♡',
        'Bahagia sederhana ♡',
        'Cerita yang berlanjut ♡'
    ];

    caption.textContent = captions[index] || 'Kenangan kita ♡';

    frame.appendChild(img);
    card.appendChild(frame);
    card.appendChild(caption);
    gallery.appendChild(card);
});

photoCount.textContent = files.length + ' foto dipilih';
showToast(files.length + ' foto berhasil ditambahkan ke galeri ♡');


  surpriseButton.addEventListener('click', function () {
    finalMessage.hidden = false;
    surpriseButton.textContent = 'Kejutan terbuka ♡';
    surpriseButton.disabled = true;
    surpriseButton.style.opacity = '.8';
    showToast('Satu peluk virtual untuk Dira Sayang! 💗');
    finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    makeHearts();
  });

  function makeHearts() {
    const symbols = ['♡', '♥', '✦', '💕'];
    for (let i = 0; i < 18; i++) {
      const heart = document.createElement('span');
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * 96 + 'vw';
      heart.style.bottom = '-30px';
      heart.style.zIndex = '60';
      heart.style.pointerEvents = 'none';
      heart.style.color = ['#ff9fc3', '#ffd9e7', '#ffffff'][i % 3];
      heart.style.fontSize = (16 + Math.random() * 18) + 'px';
      heart.style.textShadow = '0 0 12px #ff78ad';
      heart.style.transition = 'transform 3s ease-out, opacity 3s ease-out';
      document.body.appendChild(heart);
      requestAnimationFrame(function () {
        heart.style.transform = 'translateY(-' + (window.innerHeight + 80) + 'px) rotate(' + (Math.random() * 90 - 45) + 'deg)';
        heart.style.opacity = '0';
      });
      setTimeout(function () { heart.remove(); }, 3200);
    }
  }

  menuButton.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { nav.classList.remove('open'); });
  });

  window.addEventListener('beforeunload', function () {
    if (currentMusicUrl) URL.revokeObjectURL(currentMusicUrl);
    photoUrls.forEach(function (url) { URL.revokeObjectURL(url); });
  });
      });
  });
