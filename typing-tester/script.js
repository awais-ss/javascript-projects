const html_timer = document.querySelector(".timer");
const html_result = document.querySelector(".result");
const html_accuracy = document.querySelector(".accuracy");
const html_correct = document.querySelector(".correct");
const html_wrong = document.querySelector(".wrong");
const html_best = document.querySelector(".best");
const html_lines = document.querySelector(".lines");
const html_input = document.querySelector(".input");
const html_restartBtn = document.querySelector(".restartBtn");
const html_newTextBtn = document.querySelector(".newTextBtn");
const html_start = document.querySelector(".start");

// backup lines
let backupArray = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes progress, so keep typing every day.",
  "Success comes from patience, consistency, and hard work.",
  "JavaScript makes websites interactive and dynamic.",
  "A good programmer solves problems step by step.",
  "Focus on accuracy first, then improve your typing speed.",
  "Small improvements every day lead to great results.",
  "Technology is changing the way people work and communicate.",
  "Never stop learning because knowledge creates opportunities.",
  "The best way to learn programming is by building projects.",
  "Stay focused on your goal and ignore unnecessary distractions.",
  "Writing clean code makes future development much easier.",
  "Every mistake is an opportunity to learn something new.",
  "Great things take time, so be patient with yourself.",
  "Keep practicing until difficult things become easy.",
];

let arraySize = 15;
let sentence = "";
let correct_characters = 0;
let wrong_characters = 0;
let wordCounter = 1;
let counter = 30;
let timer;

html_newTextBtn.disabled = true;

// MOVEMENT control
html_input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    html_newTextBtn.click();
  }
});

//
let BestWords = localStorage.getItem("bestWPM")
  ? parseFloat(localStorage.getItem("bestWPM"))
  : 0;

// quote generator
async function getQuote() {
  try {
    const dict = await fetch("https://dummyjson.com/quotes/random");
    const data = await dict.json();

    sentence = data["quote"];

    let QuoteLine = sentence.split("");
    let i = 0;

    QuoteLine.forEach((element) => {
      let span = document.createElement("span");

      span.classList.add(`classNo${i}`);
      span.textContent = element;

      html_lines.append(span);

      i++;
    });
  } catch (error) {
    let idx = Math.floor(Math.random() * arraySize);

    sentence = backupArray[idx];

    let QuoteLine = sentence.split("");
    let i = 0;

    QuoteLine.forEach((element) => {
      let span = document.createElement("span");

      span.classList.add(`classNo${i}`);
      span.textContent = element;

      html_lines.append(span);

      i++;
    });
  }
}

// text viewer
html_start.addEventListener("click", () => {
  getQuote();
  time_counter();
  html_input.focus();
  html_start.disabled = true;
  html_newTextBtn.disabled = false;
});

// next text
html_newTextBtn.addEventListener("click", () => {
  getQuote();

  html_input.value = "";
  html_lines.innerHTML = "";

  html_start.style.backgroundColor = "rgb(255 253 247)";
  html_start.style.color = "rgb(96, 15, 10)";
});

// restart logic
html_restartBtn.addEventListener("click", () => {
  html_start.textContent = "START";

  html_start.style.backgroundColor = "#b08d57";
  html_start.style.color = "#fffdf7";

  html_input.value = "";
  html_lines.textContent = "";

  html_timer.textContent = "00 : 30";
  html_result.textContent = "WPM: 0";
  html_accuracy.textContent = "Accuracy: 0%";
  html_correct.textContent = "Correct: 0";
  html_wrong.textContent = "Wrong: 0";
  // html_best.textContent = "Best: 0 WPM";

  clearInterval(timer);

  counter = 30;

  html_timer.textContent = `00 : ${counter}`;

  html_start.disabled = false;
  html_input.disabled = false;
  html_start.disabled = false;
});

// comparison
html_input.addEventListener("input", function () {
  correct_characters = 0;
  wrong_characters = 0;
  wordCounter = 0;

  const typedText = html_input.value;

  for (let i = 0; i < sentence.length; i++) {
    let span = document.querySelector(`.classNo${i}`);

    if (sentence[i] === " ") {
      wordCounter++;
    }

    if (i < typedText.length) {
      // is position tak user type kar chuka hai

      if (typedText[i] === sentence[i]) {
        span.style.color = "green";

        correct_characters = correct_characters + 1;
      } else {
        span.style.color = "red";

        wrong_characters++;
      }
    } else {
      // abhi tak type nahi hua

      span.style.color = "black";
    }
  }
});

function time_counter() {
  timer = setInterval(() => {
    counter--;

    if (counter <= 0) {
      // correctness formula
      let correctness =
        (correct_characters / (correct_characters + wrong_characters)) * 100;

      clearInterval(timer);

      html_input.disabled = true;
      html_start.disabled = false;
      html_newTextBtn.disabled = true;

      html_correct.textContent = `Correct Characters : ${correct_characters}`;

      html_wrong.textContent = `Wrong Characters : ${wrong_characters}`;

      html_accuracy.textContent = `Accuracy : ${correctness.toFixed(2)}%`;

      // =================================================
      // CHANGED: WPM LOGIC
      // =================================================

      // User ne total kitne characters type kiye
      const totalTypedCharacters = html_input.value.length;

      // Standard WPM:
      // characters / 5 = words
      // 30 seconds = 0.5 minutes
      const currentWPM = totalTypedCharacters / 5 / 0.5;

      // CHANGED: Final WPM display
      html_result.textContent = `WPM : ${currentWPM.toFixed(2)}`;

      // =================================================
      // CHANGED: BEST WPM LOGIC
      // =================================================

      // Current WPM agar previous Best se zyada hai
      // to new Best ban jayega
      if (currentWPM > BestWords) {
        BestWords = currentWPM;
      }

      // CHANGED: Best WPM display
      html_best.textContent = `Best : ${BestWords.toFixed(2)} WPM`;
      localStorage.setItem("bestWPM", BestWords);
    }

    html_timer.textContent = `00 : ${String(counter).padStart(2, "0")}`;
  }, 1000);
}
