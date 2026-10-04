const main = document.querySelector("main");
const start = document.querySelector(".start");

// ============================================================
// START
// ============================================================

start.addEventListener("click", () => {
  // Prevent START from being clicked multiple times
  start.disabled = true;

  // ============================================================
  // CREATE DIFFICULTY SELECT
  // ============================================================

  const level_choice = document.createElement("select");

  // NO DIFFICULTY
  const no_difficulty = document.createElement("option");

  no_difficulty.value = "NO-DIFFICULTY";
  no_difficulty.textContent = "NO-DIFFICULTY";
  no_difficulty.selected = true;

  // EASY
  const easy = document.createElement("option");

  easy.value = "EASY";
  easy.textContent = "EASY";

  // MEDIUM
  const medium = document.createElement("option");

  medium.value = "MEDIUM";
  medium.textContent = "MEDIUM";

  // HARD
  const hard = document.createElement("option");

  hard.value = "HARD";
  hard.textContent = "HARD";

  // Add all options
  level_choice.append(no_difficulty, easy, medium, hard);

  // Add select to page
  main.append(level_choice);

  // ============================================================
  // DIFFICULTY CHANGE
  // ============================================================

  level_choice.addEventListener("change", () => {
    const selected_level = level_choice.value;

    // ============================================================
    // IF NO DIFFICULTY
    // ============================================================

    if (selected_level === "NO-DIFFICULTY") {
      return;
    }

    // ============================================================
    // DIFFICULTY SETTINGS
    // ============================================================

    let range;
    let max_attempts;

    if (selected_level === "EASY") {
      range = 250;
      max_attempts = 7;
    } else if (selected_level === "MEDIUM") {
      range = 750;
      max_attempts = 9;
    } else if (selected_level === "HARD") {
      range = 1000;
      max_attempts = 11;
    }

    // ============================================================
    // GENERATE COMPUTER NUMBER
    // ============================================================

    const computer_number = Math.floor(Math.random() * range) + 1;

    // Disable difficulty after selecting it
    level_choice.disabled = true;

    // ============================================================
    // CREATE INPUT
    // ============================================================

    const input = document.createElement("input");

    input.type = "number";

    input.placeholder = `Enter number 1-${range}`;

    // ============================================================
    // CREATE GUESS BUTTON
    // ============================================================

    const guess_button = document.createElement("button");

    guess_button.textContent = "GUESS";

    // ============================================================
    // CREATE HINT
    // ============================================================

    const hint = document.createElement("div");

    hint.textContent = "MAKE YOUR GUESS";

    // ============================================================
    // CREATE ATTEMPT COUNTER
    // ============================================================

    const attempt_counter = document.createElement("div");

    let attempts = 0;

    attempt_counter.textContent = `ATTEMPTS: ${attempts}/${max_attempts}`;

    // ============================================================
    // CREATE HISTORY
    // ============================================================

    const history = document.createElement("div");

    history.textContent = "HISTORY";

    // Add game elements
    main.append(input, guess_button, hint, attempt_counter, history);

    // ============================================================
    // GAME STATE
    // ============================================================

    let game_over = false;

    // ============================================================
    // GUESS
    // ============================================================

    guess_button.addEventListener("click", () => {
      // Game already finished
      if (game_over) {
        return;
      }

      // Empty input
      if (input.value === "") {
        hint.textContent = "ENTER A NUMBER!";

        return;
      }

      // Convert input string to number
      const user_number = Number(input.value);

      // Number outside range
      if (user_number < 1 || user_number > range) {
        hint.textContent = `ENTER NUMBER BETWEEN 1 AND ${range}`;

        return;
      }

      // Increase attempts
      attempts++;

      // Update attempt counter
      attempt_counter.textContent = `ATTEMPTS: ${attempts}/${max_attempts}`;

      // Add guess to history
      history.innerHTML += `<hr>${user_number}`;

      // ========================================================
      // CHECK GUESS
      // ========================================================

      if (user_number > computer_number) {
        hint.textContent = "GUESS LOWER";
      } else if (user_number < computer_number) {
        hint.textContent = "GUESS HIGHER";
      } else {
        hint.textContent = `🎉 YOU WON! NUMBER WAS ${computer_number}`;

        game_over = true;

        input.disabled = true;
        guess_button.disabled = true;

        return;
      }

      // ========================================================
      // LAST ATTEMPT
      // ========================================================

      if (attempts === max_attempts - 1) {
        hint.textContent = "⚠️ LAST ATTEMPT!";
      }

      // ========================================================
      // GAME OVER
      // ========================================================

      if (attempts === max_attempts) {
        hint.textContent = `💀 GAME OVER! NUMBER WAS ${computer_number}`;

        game_over = true;

        input.disabled = true;
        guess_button.disabled = true;

        return;
      }

      // Clear input
      input.value = "";

      input.focus();
    });

    // ============================================================
    // PLAY AGAIN
    // ============================================================

    const play_again = document.createElement("button");

    play_again.textContent = "PLAY AGAIN THIS LEVEL";

    main.append(play_again);

    play_again.addEventListener("click", () => {
      // Remove old game elements
      input.remove();
      guess_button.remove();
      hint.remove();
      attempt_counter.remove();
      history.remove();
      play_again.remove();
      reset.remove();

      // Enable difficulty selector
      level_choice.disabled = false;

      // Keep same difficulty
      level_choice.value = selected_level;

      // Start same level again
      level_choice.dispatchEvent(new Event("change"));
    });

    // ============================================================
    // RESET
    // ============================================================

    const reset = document.createElement("button");

    reset.textContent = "RESET";

    main.append(reset);

    reset.addEventListener("click", () => {
      // Remove game elements
      input.remove();
      guess_button.remove();
      hint.remove();
      attempt_counter.remove();
      history.remove();
      play_again.remove();
      reset.remove();

      // Remove difficulty selector
      level_choice.remove();

      // Enable START
      start.disabled = false;
    });
  });
});
