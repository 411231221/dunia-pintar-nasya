
const lesson = document.getElementById("lesson");
const starCount = document.getElementById("starCount");
const level = document.getElementById("level");

let stars = Number(localStorage.getItem("nasyaStars")) || 0;
let savings = Number(localStorage.getItem("nasyaSavings")) || 0;
let goal = Number(localStorage.getItem("nasyaGoal")) || 100000;
let missions = JSON.parse(localStorage.getItem("nasyaMissions") || "[]");

function updateStats() {
  starCount.textContent = stars;
  level.textContent = Math.floor(stars / 5) + 1;
  localStorage.setItem("nasyaStars", stars);
}

function earnStar() {
  stars++;
  updateStats();
}

updateStats();

function openClass(name) {
  const pages = {
    english: englishPage,
    mandarin: mandarinPage,
    quran: quranPage,
    math: mathPage,
    indonesia: indonesiaPage,
    science: sciencePage,
    coding: codingPage,
    missions: missionsPage,
    savings: savingsPage
  };

  if (pages[name]) {
    pages[name]();
  }
}

// Fungsi kuis yang bisa dipakai semua pelajaran
function makeQuiz(title, emoji, questions, intro = "") {
  let current = 0;
  let correct = 0;
  let answered = false;

  function showQuestion() {
    answered = false;
    const q = questions[current];

    lesson.innerHTML = `
      <h2>${emoji} ${title}</h2>
      <p>Soal ${current + 1} dari ${questions.length}</p>

      <div class="progress">
        <span style="width:${current / questions.length * 100}%"></span>
      </div>

      ${intro ? `<div class="tip">${intro}</div>` : ""}

      <h3>${q.question}</h3>

      <div class="answer-grid">
        ${q.options.map((option, index) => `
          <button class="answer" data-index="${index}">
            ${option}
          </button>
        `).join("")}
      </div>

      <div id="feedback" class="feedback" aria-live="polite"></div>

      <button id="nextQuestion" class="btn" hidden>
        ${current === questions.length - 1
          ? "Lihat hasil 🏆"
          : "Soal berikutnya ➜"}
      </button>
    `;

    document.querySelectorAll(".answer").forEach(button => {
      button.addEventListener("click", () => {
        if (answered) return;
        answered = true;

        const chosen = Number(button.dataset.index);
        const feedback = document.getElementById("feedback");

        document.querySelectorAll(".answer").forEach(b => {
          b.disabled = true;
        });

        if (chosen === q.correct) {
          correct++;
          earnStar();
          feedback.textContent = "Hebat, Nasya! Jawabanmu benar! ⭐";
        } else {
          feedback.textContent =
            "Belum tepat. Jawaban yang benar: " +
            q.options[q.correct] + ". Semangat ya!";
        }

        document.getElementById("nextQuestion").hidden = false;
      });
    });

    document.getElementById("nextQuestion").addEventListener("click", () => {
      if (current < questions.length - 1) {
        current++;
      showQuestion();
    } else {
      lesson.innerHTML = `
        <div class="celebration">
          <div class="celebration-emoji">🏆🎉⭐</div>

          <h2>Hore, Nasya Hebat!</h2>
          <p>${title} sudah selesai dikerjakan!</p>

          <div class="score-card">
            <h3>Nilai Nasya</h3>
            <div class="big-score">
              ${correct}/${questions.length}
            </div>

            <p>${
              correct === questions.length
                ? "Sempurna! Kamu luar biasa! 🌟"
                : correct >= questions.length * 0.7
                  ? "Hebat! Terus semangat belajar! 💚"
                  : "Bagus sudah mencoba! Ayo belajar lagi! 🌈"
            }</p>
          </div>

          <div class="reward-stars">
            ${"⭐".repeat(correct)}
          </div>

          <p>Kamu menjawab ${correct} soal dengan benar!</p>

          <button class="btn" id="playAgain">
            🔄 Main lagi
          </button>

          <button class="btn light" id="backToClass">
            📚 Pilih kelas lain
          </button>

          <div id="confettiContainer" class="confetti-container"></div>
        </div>
      `;

      document.getElementById("playAgain").addEventListener(
        "click",
        () => makeQuiz(title, emoji, questions, intro)
      );

      document.getElementById("backToClass").addEventListener(
        "click",
        () => window.scrollTo({ top: 0, behavior: "smooth" })
      );

      if (correct >= questions.length * 0.7) {
        const container =
          document.getElementById("confettiContainer");

        for (let i = 0; i < 35; i++) {
          const piece = document.createElement("span");
          piece.className = "confetti-piece";
          piece.textContent = ["🎉", "⭐", "✨", "🎊"][i % 4];
          piece.style.left = Math.random() * 100 + "%";
          piece.style.animationDelay = Math.random() * 2 + "s";
          container.appendChild(piece);
        }
      }
    }
  });
}

showQuestion();
}

// 1. BAHASA INGGRIS
function englishPage() {
  const questions = [
    { question: "Apple", meaning: "Apel", options: ["Apel", "Kucing", "Buku"], correct: 0 },
    { question: "Cat", meaning: "Kucing", options: ["Ikan", "Kucing", "Burung"], correct: 1 },
    { question: "Book", meaning: "Buku", options: ["Buku", "Meja", "Pensil"], correct: 0 },
    { question: "Thank you", meaning: "Terima kasih", options: ["Maaf", "Selamat pagi", "Terima kasih"], correct: 2 },
    { question: "Good morning", meaning: "Selamat pagi", options: ["Selamat malam", "Selamat pagi", "Sampai jumpa"], correct: 1 },
    { question: "Blue", meaning: "Biru", options: ["Merah", "Biru", "Hijau"], correct: 1 },
    { question: "Mother", meaning: "Ibu", options: ["Ibu", "Ayah", "Kakak"], correct: 0 },
    { question: "One, two, three", meaning: "Satu, dua, tiga", options: ["Satu, dua, tiga", "Empat, lima, enam", "Tujuh, delapan, sembilan"], correct: 0 },
    { question: "Dog", meaning: "Anjing", options: ["Kucing", "Anjing", "Kelinci"], correct: 1 },
    { question: "Red", meaning: "Merah", options: ["Merah", "Kuning", "Biru"], correct: 0 },
    { question: "Father", meaning: "Ayah", options: ["Ibu", "Nenek", "Ayah"], correct: 2 },
    { question: "Good night", meaning: "Selamat malam", options: ["Selamat malam", "Selamat pagi", "Terima kasih"], correct: 0 },
    { question: "School", meaning: "Sekolah", options: ["Rumah", "Sekolah", "Pasar"], correct: 1 },
    { question: "Fish", meaning: "Ikan", options: ["Burung", "Ikan", "Kuda"], correct: 1 },
    { question: "Yellow", meaning: "Kuning", options: ["Hijau", "Hitam", "Kuning"], correct: 2 },
    { question: "You're welcome", meaning: "Sama-sama", options: ["Sama-sama", "Selamat malam", "Sampai jumpa"], correct: 0 },
    { question: "Three", meaning: "Tiga", options: ["Dua", "Tiga", "Empat"], correct: 1 },
    { question: "Happy", meaning: "Bahagia", options: ["Sedih", "Marah", "Bahagia"], correct: 2 },
    { question: "Sun", meaning: "Matahari", options: ["Bulan", "Matahari", "Bintang"], correct: 1 },
    { question: "Goodbye", meaning: "Sampai jumpa", options: ["Sampai jumpa", "Selamat pagi", "Maaf"], correct: 0 }
  ];

  let current = 0;
  let correct = 0;
  let answered = false;

  // Fungsi suara khusus untuk halaman English
  function playEnglishSound(text, language) {
    if (!("speechSynthesis" in window)) {
      alert("Browser belum mendukung fitur suara. Coba buka Dunia Pintar di Google Chrome.");
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = language;
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onerror = function (event) {
      console.error("Kesalahan suara:", event.error);
      document.getElementById("soundStatus")?.replaceChildren(
        document.createTextNode("Suara gagal diputar. Periksa volume laptop.")
      );
    };

    // Jangan panggil cancel() di sini agar suara yang baru
    // tidak langsung terhenti saat tombol ditekan.
    synth.speak(utterance);
  }

  function showQuestion() {
    answered = false;
    const q = questions[current];

    lesson.innerHTML = `
      <h2>🇬🇧 English Fun</h2>
      <p>Soal ${current + 1} dari ${questions.length}</p>

      <div class="progress">
        <span style="width:${((current + 1) / questions.length) * 100}%"></span>
      </div>

      <div class="tip">
        Dengarkan kata bahasa Inggris, lalu pilih artinya.
      </div>

      <h2 style="text-align:center;font-size:36px">
        ${q.question}
      </h2>

      <p style="text-align:center">
        <button class="btn" id="speakEnglish" type="button">
          🔊 Dengarkan Bahasa Inggris
        </button>
      </p>

      <div id="soundStatus" class="feedback" aria-live="polite"></div>

      <div class="answer-grid">
        ${q.options.map((option, index) => `
          <button class="answer" type="button" data-index="${index}">
            ${option} 🔊
          </button>
        `).join("")}
      </div>

      <div id="feedback" class="feedback" aria-live="polite"></div>

      <button id="nextQuestion" class="btn" type="button" hidden>
        ${current === questions.length - 1
          ? "Lihat hasil 🏆"
          : "Soal berikutnya ➜"}
      </button>
    `;

    // Tombol untuk mendengarkan kata bahasa Inggris
    document.getElementById("speakEnglish").addEventListener("click", () => {
      const status = document.getElementById("soundStatus");
      status.textContent = "Memutar suara... 🔊";
      playEnglishSound(q.question, "en-US");
    });

    // Pilihan jawaban sekaligus tombol suara
    document.querySelectorAll(".answer").forEach(button => {
      button.addEventListener("click", () => {
        if (answered) return;

        const chosen = Number(button.dataset.index);

        // Bacakan pilihan dalam bahasa Indonesia
        playEnglishSound(q.options[chosen], "id-ID");

        if (chosen === q.correct) {
          correct++;
          earnStar();
        }

        answered = true;

        document.querySelectorAll(".answer").forEach((b, index) => {
          b.disabled = true;

          if (index === q.correct) {
            b.classList.add("correct");
          } else if (index === chosen) {
            b.classList.add("wrong");
          }
        });

        const feedback = document.getElementById("feedback");

        if (chosen === q.correct) {
          feedback.textContent =
            "Hebat! " + q.question + " artinya " + q.meaning + ". ⭐";
        } else {
          feedback.textContent =
            "Belum tepat. " + q.question + " artinya " +
            q.meaning + ". Semangat ya!";
        }

        document.getElementById("nextQuestion").hidden = false;
      });
    });

    document.getElementById("nextQuestion").addEventListener("click", () => {
      if (current < questions.length - 1) {
        current++;
        showQuestion();
      } else {
        lesson.innerHTML = `
          <div class="celebration">
            <div class="celebration-emoji">🏆🎉⭐</div>
            <h2>Hore, Nasya Hebat!</h2>
            <h3>Nilai: ${correct} dari ${questions.length}</h3>
            <p>${"⭐".repeat(correct)}</p>
            <p>${
              correct === questions.length
                ? "Wonderful! Semua jawaban benar! 🌟"
                : "Keep learning! Terus semangat belajar! 💚"
            }</p>
            <button class="btn" id="englishAgain" type="button">
              🔄 Main lagi
            </button>
          </div>
        `;

        document.getElementById("englishAgain").addEventListener("click", englishPage);
      }
    });
  }

  showQuestion();
}

// 2. BAHASA MANDARIN
function mandarinPage() {
  const questions = [
    { question: "你好", pinyin: "Nǐ hǎo", meaning: "Halo", options: ["Halo", "Terima kasih", "Sampai jumpa"], correct: 0 },
    { question: "谢谢", pinyin: "Xièxie", meaning: "Terima kasih", options: ["Halo", "Terima kasih", "Maaf"], correct: 1 },
    { question: "再见", pinyin: "Zàijiàn", meaning: "Sampai jumpa", options: ["Sampai jumpa", "Halo", "Terima kasih"], correct: 0 },
    { question: "一", pinyin: "Yī", meaning: "Satu", options: ["Dua", "Tiga", "Satu"], correct: 2 },
    { question: "二", pinyin: "Èr", meaning: "Dua", options: ["Satu", "Dua", "Empat"], correct: 1 },
    { question: "三", pinyin: "Sān", meaning: "Tiga", options: ["Tiga", "Lima", "Dua"], correct: 0 },
    { question: "四", pinyin: "Sì", meaning: "Empat", options: ["Enam", "Empat", "Dua"], correct: 1 },
    { question: "五", pinyin: "Wǔ", meaning: "Lima", options: ["Lima", "Tiga", "Satu"], correct: 0 },
    { question: "六", pinyin: "Liù", meaning: "Enam", options: ["Dua", "Enam", "Tujuh"], correct: 1 },
    { question: "七", pinyin: "Qī", meaning: "Tujuh", options: ["Tujuh", "Delapan", "Sembilan"], correct: 0 },
    { question: "八", pinyin: "Bā", meaning: "Delapan", options: ["Lima", "Delapan", "Sepuluh"], correct: 1 },
    { question: "九", pinyin: "Jiǔ", meaning: "Sembilan", options: ["Sembilan", "Enam", "Empat"], correct: 0 },
    { question: "十", pinyin: "Shí", meaning: "Sepuluh", options: ["Delapan", "Tujuh", "Sepuluh"], correct: 2 },
    { question: "妈妈", pinyin: "Māma", meaning: "Ibu", options: ["Ayah", "Ibu", "Kakak"], correct: 1 },
    { question: "爸爸", pinyin: "Bàba", meaning: "Ayah", options: ["Ayah", "Ibu", "Adik"], correct: 0 }
  ];

  let current = 0;
  let correct = 0;
  let answered = false;

  // Memutar suara dan menghentikan suara sebelumnya
  function playMandarinSound(text, language) {
    if (!("speechSynthesis" in window)) {
      alert("Browser tidak mendukung fitur suara. Coba gunakan Google Chrome.");
      return;
    }

    const synth = window.speechSynthesis;

    // Hentikan suara sebelumnya agar tidak bertumpuk
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.75;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      const status = document.getElementById("soundStatus");
      if (status) status.textContent = "Suara sedang diputar 🔊";
    };

    utterance.onend = () => {
      const status = document.getElementById("soundStatus");
      if (status) status.textContent = "";
    };

    utterance.onerror = (event) => {
      console.error("Kesalahan suara:", event.error);

      const status = document.getElementById("soundStatus");
      if (status) {
        status.textContent =
          "Suara gagal diputar. Periksa volume laptop dan suara Mandarin di Windows.";
      }
    };

    // Tunggu sebentar setelah cancel agar browser siap
    setTimeout(() => {
      synth.speak(utterance);
    }, 100);
  }

  function showQuestion() {
    answered = false;
    const q = questions[current];

    lesson.innerHTML = `
      <h2>🇨🇳 Mandarin Ceria</h2>

      <p>Soal ${current + 1} dari ${questions.length}</p>

      <div class="progress">
        <span style="width:${((current + 1) / questions.length) * 100}%"></span>
      </div>

      <div class="tip">
        Dengarkan pengucapannya, lalu pilih arti yang benar.
      </div>

      <h2 style="font-size:42px;text-align:center">
        ${q.question}
      </h2>

      <h3 style="text-align:center">${q.pinyin}</h3>

      <p style="text-align:center">
        <button class="btn" id="speakMandarin" type="button">
          🔊 Dengarkan Mandarin
        </button>
      </p>

      <div id="soundStatus" class="feedback" aria-live="polite"></div>

      <div class="answer-grid">
        ${q.options.map((option, index) => `
          <button
            class="answer"
            type="button"
            data-index="${index}"
          >
            ${option} 🔊
          </button>
        `).join("")}
      </div>

      <div id="feedback" class="feedback" aria-live="polite"></div>

      <button id="nextQuestion" class="btn" type="button" hidden>
        ${current === questions.length - 1
          ? "Lihat hasil 🏆"
          : "Soal berikutnya ➜"}
      </button>
    `;

    // Tombol suara Mandarin
    document.getElementById("speakMandarin").addEventListener("click", () => {
      playMandarinSound(q.question, "zh-CN");
    });

    // Pilihan jawaban sekaligus membacakan artinya
    document.querySelectorAll(".answer").forEach(button => {
      button.addEventListener("click", () => {
        if (answered) return;

        answered = true;

        const chosen = Number(button.dataset.index);

        document.querySelectorAll(".answer").forEach((b, index) => {
          b.disabled = true;

          if (index === q.correct) {
            b.classList.add("correct");
          } else if (index === chosen) {
            b.classList.add("wrong");
          }
        });

        const feedback = document.getElementById("feedback");

        if (chosen === q.correct) {
          correct++;
          earnStar();

          feedback.textContent =
            "Hebat! " + q.pinyin + " artinya " +
            q.meaning + ". ⭐";
        } else {
          feedback.textContent =
            "Belum tepat. " + q.pinyin +
            " artinya " + q.meaning + ". Semangat ya!";
        }

        // Bacakan arti jawaban dengan suara Indonesia
        playMandarinSound(q.meaning, "id-ID");

        document.getElementById("nextQuestion").hidden = false;
      });
    });

    // Tombol soal berikutnya
    document.getElementById("nextQuestion").addEventListener("click", () => {
      if (current < questions.length - 1) {
        current++;
        showQuestion();
      } else {
        lesson.innerHTML = `
          <div class="celebration">
            <div class="celebration-emoji">🏆🎉⭐</div>
            <h2>Mandarin selesai!</h2>
            <h3>Nilai Nasya: ${correct} dari ${questions.length}</h3>
            <p>${"⭐".repeat(correct)}</p>

            <p>${
              correct === questions.length
                ? "Luar biasa! Semua jawaban benar! 🌟"
                : "Terus berlatih Mandarin, ya! 💚"
            }</p>

            <button class="btn" id="mandarinAgain" type="button">
              🔄 Main lagi
            </button>
          </div>
        `;

        document.getElementById("mandarinAgain")
          .addEventListener("click", mandarinPage);
      }
    });
  }

  showQuestion();
}

// 3. MATEMATIKA
function mathPage() {
  const questions = [];

  for (let i = 0; i < 10; i++) {
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 50) + 1;
    const answer = a + b;

    const options = [
        answer,
        answer + 2,
        Math.max(0, answer - 2)
    ].sort(() => Math.random() - 0.5);

    questions.push({
      question: `Berapa hasil ${a} + ${b}?`,
      options: options.map(String),
      correct: options.indexOf(answer)
    });
  }

  makeQuiz("Matematika Ceria", "🔢", questions);
}

// 4. BAHASA INDONESIA
function indonesiaPage() {
  makeQuiz("Bahasa Indonesia", "📚", [
    {question:"Susun kata: membaca — Nasya — buku",options:["Nasya membaca buku.","Buku membaca Nasya.","Membaca buku Nasya."],correct:0},
    {question:"Lawan kata besar adalah...",options:["Tinggi","Kecil","Panjang"],correct:1},
    {question:"Kalimat tanya yang benar...",options:["Apa kabar?","Saya suka buku.","Ayo belajar."],correct:0},
    {question:"Sinonim kata gembira adalah...",options:["Sedih","Marah","Senang"],correct:2},
    {question:"Kata yang menunjukkan tempat...",options:["Sekolah","Berlari","Cantik"],correct:0},
    {question:"Lawan kata panas adalah...",options:["Hangat","Dingin","Terang"],correct:1},
    {question:"Sinonim kata pintar adalah...",options:["Pandai","Malas","Lambat"],correct:0},
    {question:"Huruf pertama nama orang ditulis dengan...",options:["Huruf kecil","Huruf kapital","Angka"],correct:1},
    {question:"Tanda baca untuk kalimat tanya adalah...",options:["Titik","Koma","Tanda tanya"],correct:2},
    {question:"Lawan kata rajin adalah...",options:["Tekun","Malas","Pintar"],correct:1},
    {question:"Kata kerja dalam kalimat 'Ibu memasak nasi' adalah...",options:["Ibu","Memasak","Nasi"],correct:1},
    {question:"Bentuk jamak dari kata 'buku' adalah...",options:["Buku-buku","Membuku","Bukuan"],correct:0},
    {question:"Kalimat perintah adalah...",options:["Siapa namamu?","Tolong tutup pintu!","Hari ini cerah."],correct:1},
    {question:"Lawan kata tinggi adalah...",options:["Rendah","Besar","Lebar"],correct:0},
    {question:"Sinonim kata cantik adalah...",options:["Indah","Buruk","Kotor"],correct:0}
  ]);
}

// 5. SAINS DAN ALAM
function sciencePage() {
  makeQuiz("Sains dan Alam", "🌍", [
    {question:"Apa yang dibutuhkan tumbuhan untuk tumbuh?",options:["Air dan cahaya","Cokelat","Mainan"],correct:0},
    {question:"Planet tempat kita tinggal adalah...",options:["Mars","Bumi","Jupiter"],correct:1},
    {question:"Matahari memberikan...",options:["Cahaya dan panas","Es krim","Mainan"],correct:0},
    {question:"Air yang membeku menjadi...",options:["Uap","Es","Tanah"],correct:1},
    {question:"Bagian tumbuhan yang menyerap air...",options:["Akar","Bunga","Buah"],correct:0},
    {question:"Hewan yang hidup di air adalah...",options:["Ikan","Kucing","Ayam"],correct:0},
    {question:"Kita bernapas menggunakan...",options:["Telinga","Paru-paru","Tangan"],correct:1},
    {question:"Sumber cahaya alami pada siang hari adalah...",options:["Matahari","Buku","Meja"],correct:0},
    {question:"Hewan yang menghasilkan susu adalah...",options:["Sapi","Ikan","Kupu-kupu"],correct:0},
    {question:"Indra untuk melihat adalah...",options:["Hidung","Mata","Lidah"],correct:1},
    {question:"Bagian tumbuhan yang biasanya berwarna-warni adalah...",options:["Akar","Batang","Bunga"],correct:2},
    {question:"Pelangi biasanya muncul ketika...",options:["Cahaya matahari mengenai titik-titik air","Malam gelap","Tidak ada cahaya"],correct:0},
    {question:"Es akan mencair jika...",options:["Dipanaskan","Dibekukan lagi","Disimpan di freezer"],correct:0},
    {question:"Hewan yang memiliki sayap dan bisa terbang adalah...",options:["Kupu-kupu","Kambing","Kucing"],correct:0},
    {question:"Kita menggunakan gigi untuk...",options:["Mendengar","Mengunyah makanan","Melihat"],correct:1}
  ]);
}

// 6. CODING ACADEMY
function codingPage() {
  lesson.innerHTML = `
    <h2>💻 Coding Academy</h2>
    <p>Selamat datang di kelas programmer cilik, Nasya!</p>

    <div class="row-item">
      <span>🧩</span>
      <div><b>Logika</b><br>Belajar memecahkan masalah.</div>
    </div>

    <div class="row-item">
      <span>🌐</span>
      <div><b>HTML</b><br>Membuat struktur halaman website.</div>
    </div>

    <div class="row-item">
      <span>🎨</span>
      <div><b>CSS</b><br>Mengatur warna dan tampilan website.</div>
    </div>

    <div class="row-item">
      <span>⚡</span>
      <div><b>JavaScript</b><br>Membuat website menjadi interaktif.</div>
    </div>

    <h3>Contoh kode HTML</h3>
    <pre class="code">&lt;h1&gt;Halo, Nasya!&lt;/h1&gt;
&lt;p&gt;Aku sedang belajar coding.&lt;/p&gt;
&lt;button&gt;Klik aku!&lt;/button&gt;</pre>

    <button class="btn" id="codingQuiz">Mulai kuis coding</button>
  `;

  document.getElementById("codingQuiz").addEventListener("click", () => {
    makeQuiz("Kuis Coding", "💻", [
      {question:"Apa fungsi HTML?",options:["Membuat struktur halaman","Mengatur warna","Membuat makanan"],correct:0},
      {question:"Apa fungsi CSS?",options:["Mengatur tampilan","Menyimpan uang","Mencetak kertas"],correct:0},
      {question:"Apa yang membuat website interaktif?",options:["JavaScript","Pensil","Kamera"],correct:0},
      {question:"Apa arti debugging?",options:["Memperbaiki kesalahan program","Menggambar","Mematikan komputer"],correct:0},
      {question:"Instruksi yang dilakukan berurutan disebut...",options:["Sequence","Sandwich","Sepatu"],correct:0}
    ]);
  });
}

// 7. HAFALAN SURAT
function quranPage() {
  const daftarSurat = [
    [1, "Al-Fatihah"],
    [78, "An-Naba"],
    [79, "An-Nazi'at"],
    [80, "Abasa"],
    [81, "At-Takwir"],
    [82, "Al-Infitar"],
    [83, "Al-Mutaffifin"],
    [84, "Al-Insyiqaq"],
    [85, "Al-Buruj"],
    [86, "At-Tariq"],
    [87, "Al-A'la"],
    [88, "Al-Ghasyiyah"],
    [89, "Al-Fajr"],
    [90, "Al-Balad"],
    [91, "Asy-Syams"],
    [92, "Al-Lail"],
    [93, "Ad-Duha"],
    [94, "Asy-Syarh"],
    [95, "At-Tin"],
    [96, "Al-Alaq"],
    [97, "Al-Qadr"],
    [98, "Al-Bayyinah"],
    [99, "Az-Zalzalah"],
    [100, "Al-Adiyat"],
    [101, "Al-Qari'ah"],
    [102, "At-Takatsur"],
    [103, "Al-Asr"],
    [104, "Al-Humazah"],
    [105, "Al-Fil"],
    [106, "Quraisy"],
    [107, "Al-Ma'un"],
    [108, "Al-Kautsar"],
    [109, "Al-Kafirun"],
    [110, "An-Nasr"],
    [111, "Al-Lahab"],
    [112, "Al-Ikhlas"],
    [113, "Al-Falaq"],
    [114, "An-Nas"]
  ];

  lesson.innerHTML = `
    <h2>🕌 Hafalan Surat Pendek</h2>
    <p>Belajar membaca dan menghafal bersama Nasya 🌙</p>

    <label for="surahSelect">Pilih surat:</label>
    <select id="surahSelect">
      ${daftarSurat.map(([nomor, nama]) =>
        `<option value="${nomor}">${nama}</option>`
      ).join("")}
    </select>

    <div id="surahContent" class="tip">
      Memuat surat dan audio...
    </div>
  `;

  const select = document.getElementById("surahSelect");

  async function loadSurah(nomor) {
    const content = document.getElementById("surahContent");
    content.innerHTML = "⏳ Sedang memuat surat...";

    try {
      const response = await fetch(
        `https://equran.id/api/v2/surat/${nomor}`
      );

      if (!response.ok) {
        throw new Error("Gagal memuat surat");
      }

      const result = await response.json();
      const data = result.data;

      if (!data || !data.ayat) {
        throw new Error("Data surat tidak ditemukan");
      }

      content.innerHTML = `
        <h3>${data.namaLatin} — ${data.arti}</h3>
        <p>${data.jumlahAyat} ayat</p>

        <h4>🔊 Dengarkan seluruh surat</h4>
        <audio id="fullAudio" controls preload="none"
          style="width:100%"></audio>

        <div id="ayahList"></div>

        <hr>

        <label class="mission">
          <input type="checkbox" id="quranDone">
          Saya sudah hafal surat ini.
        </label>

        <button class="btn" id="saveQuran">
          Simpan hafalan ⭐
        </button>

        <p id="quranFeedback" class="feedback"></p>
      `;

      const fullAudio = document.getElementById("fullAudio");
      const fullUrl = data.audioFull?.["05"];

      if (fullUrl) {
        fullAudio.src = fullUrl;
      } else {
        fullAudio.outerHTML =
          "<p>Audio surat lengkap belum tersedia.</p>";
      }

      const ayahList = document.getElementById("ayahList");

      data.ayat.forEach((ayah) => {
        const card = document.createElement("div");
        card.className = "row-item";
        card.style.display = "block";
        card.style.marginTop = "14px";
        card.style.padding = "16px";

        const heading = document.createElement("h4");
        heading.textContent = `Ayat ${ayah.nomorAyat}`;

        const arabic = document.createElement("div");
        arabic.textContent = ayah.teksArab;
        arabic.style.fontSize = "30px";
        arabic.style.lineHeight = "2";
        arabic.style.textAlign = "right";
        arabic.style.direction = "rtl";
        arabic.style.margin = "12px 0";

        const latin = document.createElement("p");
        latin.textContent = ayah.teksLatin || "";

        const translation = document.createElement("p");
        translation.textContent =
          "Artinya: " + (ayah.teksIndonesia || "");

        const label = document.createElement("p");
        label.textContent = "🔊 Dengarkan ayat ini";

        const audio = document.createElement("audio");
        audio.controls = true;
        audio.preload = "none";
        audio.style.width = "100%";

        const audioUrl = ayah.audio?.["05"];

        if (audioUrl) {
          audio.src = audioUrl;
        } else {
          label.textContent = "Audio ayat belum tersedia.";
        }

        card.append(
          heading,
          arabic,
          latin,
          translation,
          label,
          audio
        );

        ayahList.appendChild(card);
      });

      const savedKey = "nasyaMemorizedSurahs";
      const getSaved = () => JSON.parse(
        localStorage.getItem(savedKey) || "[]"
      );

      const checkbox = document.getElementById("quranDone");
      const feedback = document.getElementById("quranFeedback");
      const saveButton = document.getElementById("saveQuran");

      checkbox.checked = getSaved().includes(Number(nomor));

      saveButton.addEventListener("click", () => {
        let saved = getSaved();
        const id = Number(nomor);

        if (checkbox.checked && !saved.includes(id)) {
          saved.push(id);
          localStorage.setItem(savedKey, JSON.stringify(saved));
          earnStar();
          feedback.textContent =
            "MasyaAllah! Hafalan berhasil disimpan ⭐";
        } else if (!checkbox.checked && saved.includes(id)) {
          saved = saved.filter(item => item !== id);
          localStorage.setItem(savedKey, JSON.stringify(saved));
          feedback.textContent =
            "Tanda hafalan dihapus.";
        } else if (checkbox.checked) {
          feedback.textContent =
            "Surat ini sudah tersimpan sebagai hafalan.";
        } else {
          feedback.textContent =
            "Centang jika Nasya sudah hafal surat ini.";
        }
      });

    } catch (error) {
      console.error(error);
      content.innerHTML = `
        <p>Maaf, surat belum berhasil dimuat.</p>
        <p>Periksa koneksi internet, lalu coba lagi.</p>
        <button class="btn" id="retrySurah">Coba lagi 🔄</button>
      `;

      document.getElementById("retrySurah")
        .addEventListener("click", () => loadSurah(nomor));
    }
  }

  select.addEventListener("change", () => {
    loadSurah(select.value);
  });

  loadSurah(select.value);
}

// 8. MISI HARIAN
function missionsPage() {
  const tasks = [
    "📚 Membaca buku selama 10 menit",
    "🇬🇧 Belajar bahasa Inggris",
    "🇨🇳 Menghafal 3 kata Mandarin",
    "🕌 Berlatih hafalan surat",
    "🧸 Merapikan mainan",
    "💻 Mencoba tantangan coding"
  ];

  lesson.innerHTML = `
    <h2>🌟 Misi Harian Nasya</h2>
    <p>Selesaikan kegiatan dan dapatkan bintang.</p>
    ${tasks.map((task, i) => `
      <label class="mission">
        <input type="checkbox" data-mission="${i}"
          ${missions.includes(i) ? "checked" : ""}>
        ${task}
      </label>
    `).join("")}
  `;

  document.querySelectorAll("[data-mission]").forEach(box => {
    box.addEventListener("change", () => {
      const i = Number(box.dataset.mission);

      if (box.checked && !missions.includes(i)) {
        missions.push(i);
        earnStar();
      } else if (!box.checked && missions.includes(i)) {
        missions = missions.filter(n => n !== i);
        stars = Math.max(0, stars - 1);
        updateStats();
      }

      localStorage.setItem("nasyaMissions", JSON.stringify(missions));
      missionsPage();
    });
  });
}

// 9. TABUNGAN IMPIAN
function savingsPage() {
  const percent = Math.min(100, Math.round(savings / goal * 100));

  lesson.innerHTML = `
    <h2>🐷 Tabungan Impian Nasya</h2>
    <p>Tabungan sekarang: <b>${formatMoney(savings)}</b></p>
    <p>Target: <b>${formatMoney(goal)}</b></p>

    <div class="progress">
      <span style="width:${percent}%"></span>
    </div>
    <p>${percent}% dari target</p>

    <label>Tambah catatan tabungan (Rp)</label><br>
    <input id="savingAmount" type="number" min="1" placeholder="Contoh: 5000">
    <br>
    <button class="btn" id="addSaving">Tambah tabungan</button>

    <br><br>
    <label>Target baru (Rp)</label><br>
    <input id="savingGoal" type="number" min="1" value="${goal}">
    <br>
    <button class="btn light" id="changeGoal">Simpan target</button>

    <p class="small">Ini catatan latihan, bukan rekening bank.</p>
    <p id="savingFeedback" class="feedback"></p>
  `;

  document.getElementById("addSaving").addEventListener("click", () => {
    const amount = Number(document.getElementById("savingAmount").value);

    if (!Number.isSafeInteger(amount) || amount <= 0) {
      document.getElementById("savingFeedback").textContent =
        "Masukkan jumlah yang valid.";
      return;
    }

    savings += amount;
    localStorage.setItem("nasyaSavings", savings);
    savingsPage();
  });

  document.getElementById("changeGoal").addEventListener("click", () => {
    const value = Number(document.getElementById("savingGoal").value);

    if (!Number.isSafeInteger(value) || value <= 0) {
      document.getElementById("savingFeedback").textContent =
        "Masukkan target yang valid.";
      return;
    }

    goal = value;
    localStorage.setItem("nasyaGoal", goal);
    savingsPage();
  });
}

function formatMoney(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}
