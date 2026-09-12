document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("toast");

  // -------------------------
  // MOOD BUTTONS
  // -------------------------

  const moodButtons = document.querySelectorAll(".mood-card");

  moodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      moodButtons.forEach((item) => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

      const mood = button.dataset.mood;

      localStorage.setItem("littleberryMood", mood);

      showToast(`${mood} saved ♡`);
    });
  });


  // -------------------------
  // ROUTINE CHECKBOXES
  // -------------------------

  const taskInputs = document.querySelectorAll("[data-task]");

  taskInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const key = `littleberryTask_${input.dataset.task}`;

      localStorage.setItem(
        key,
        input.checked
      );

      if (input.checked) {
        showToast("Little task complete 🍓");
      }
    });
  });


  // -------------------------
  // STICKER CHART
  // -------------------------

  const stickerButtons = document.querySelectorAll("[data-day]");

  stickerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const day = button.dataset.day;
      const key = `littleberrySticker_${day}`;

      const current =
        localStorage.getItem(key) === "true";

      localStorage.setItem(
        key,
        !current
      );

      updateStickerChart();
    });
  });


  // -------------------------
  // QUICK ACTION BUTTONS
  // -------------------------

  const quickCards = document.querySelectorAll(".quick-card");

  quickCards.forEach((button) => {
    button.addEventListener("click", () => {
      const title =
        button.querySelector("strong")?.textContent?.trim();

      if (title === "Play") {
        showToast("Opening little activities 🎨");
      }

      if (title === "Comfort") {
        showToast("Opening comfort corner 💗");
      }

      if (title === "Rewards") {
        scrollToSection("sticker-card");
      }

      if (title === "Routine") {
        scrollToSection("routine-card");
      }
    });
  });


  // -------------------------
  // COMFORT BUTTON
  // -------------------------

  const comfortButton =
    document.querySelector(".comfort-card button");

  if (comfortButton) {
    comfortButton.addEventListener("click", () => {
      showToast("Comfort corner coming up 💗");
    });
  }


  // -------------------------
  // SEE ALL ROUTINE BUTTON
  // -------------------------

  const seeAllButton =
    document.querySelector(".text-button");

  if (seeAllButton) {
    seeAllButton.addEventListener("click", () => {
      scrollToSection("routine-card");
    });
  }


  // -------------------------
  // PROFILE BUTTON
  // -------------------------

  const profileButton =
    document.querySelector(".profile-button");

  if (profileButton) {
    profileButton.addEventListener("click", () => {
      showToast("Profile opened 🐰");
    });
  }


  // -------------------------
  // BOTTOM NAV
  // -------------------------

  const bottomNavButtons =
    document.querySelectorAll(".bottom-nav button");

  bottomNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
      bottomNavButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const label =
        button.querySelector("small")?.textContent?.trim();

      if (label === "Home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

      if (label === "Play") {
        showToast("Play section selected 🎨");
      }

      if (label === "Rewards") {
        scrollToSection("sticker-card");
      }

      if (label === "Comfort") {
        scrollToSection("comfort-card");
      }

      if (label === "Settings") {
        showToast("Settings coming up ⚙️");
      }
    });
  });


  // -------------------------
  // LOAD SAVED DATA
  // -------------------------

  loadSavedMood();
  loadSavedTasks();
  updateStickerChart();


  // -------------------------
  // HELPERS
  // -------------------------

  function loadSavedMood() {
    const savedMood =
      localStorage.getItem("littleberryMood");

    if (!savedMood) return;

    moodButtons.forEach((button) => {
      if (
        button.dataset.mood === savedMood
      ) {
        button.classList.add("selected");
      }
    });
  }


  function loadSavedTasks() {
    taskInputs.forEach((input) => {
      const saved =
        localStorage.getItem(
          `littleberryTask_${input.dataset.task}`
        );

      input.checked =
        saved === "true";
    });
  }


  function updateStickerChart() {
    let count = 0;

    stickerButtons.forEach((button) => {
      const day = button.dataset.day;

      const earned =
        localStorage.getItem(
          `littleberrySticker_${day}`
        ) === "true";

      button.classList.toggle(
        "earned",
        earned
      );

      const star =
        button.querySelector("span");

      if (star) {
        star.textContent =
          earned
            ? "⭐"
            : "☆";
      }

      if (earned) {
        count++;
      }
    });

    const progress =
      document.getElementById(
        "stickerProgress"
      );

    if (progress) {
      progress.style.width =
        `${(count / 7) * 100}%`;
    }

    const countText =
      document.getElementById(
        "stickerCount"
      );

    if (countText) {
      countText.textContent =
        `${count}/7`;
    }
  }


  function scrollToSection(className) {
    const section =
      document.querySelector(
        `.${className}`
      );

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }


  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(
      window.littleberryToastTimer
    );

    window.littleberryToastTimer =
      setTimeout(() => {
        toast.classList.remove("show");
      }, 1800);
  }
});
