document.addEventListener("DOMContentLoaded", () => {

  const pages = document.querySelectorAll(".page");

  const navButtons = document.querySelectorAll(
    ".nav-button, .mobile-nav-button"
  );

  const goButtons = document.querySelectorAll("[data-go]");

  const moodButtons = document.querySelectorAll(
    ".mood-button"
  );

  const taskInputs = document.querySelectorAll(
    "[data-task]"
  );

  const stickerButtons = document.querySelectorAll(
    "[data-day]"
  );

  const activityButtons = document.querySelectorAll(
    "[data-activity]"
  );

  const counterButtons = document.querySelectorAll(
    "[data-counter]"
  );

  const themeButtons = document.querySelectorAll(
    "[data-theme]"
  );


  loadEverything();


  navButtons.forEach((button) => {

    button.addEventListener("click", () => {
      openPage(button.dataset.page);
    });

  });


  goButtons.forEach((button) => {

    button.addEventListener("click", () => {
      openPage(button.dataset.go);
    });

  });


  moodButtons.forEach((button) => {

    button.addEventListener("click", () => {

      moodButtons.forEach((item) => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

      localStorage.setItem(
        "littleberryMood",
        button.dataset.mood
      );

      showToast(
        `${button.dataset.mood} mood saved ♡`
      );

    });

  });


  taskInputs.forEach((input) => {

    input.addEventListener("change", () => {

      const key =
        `littleberryTask_${input.dataset.task}`;

      localStorage.setItem(
        key,
        input.checked
      );

      syncDuplicateTasks(
        input.dataset.task,
        input.checked
      );

      if (input.checked) {
        showToast("Tiny task complete 🍓");
      }

    });

  });


  stickerButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const day = button.dataset.day;

      const current =
        localStorage.getItem(
          `littleberrySticker_${day}`
        ) === "true";

      localStorage.setItem(
        `littleberrySticker_${day}`,
        !current
      );

      updateStickers();

    });

  });


  activityButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const activity =
        button.dataset.activity;

      localStorage.setItem(
        "littleberryActivity",
        activity
      );

      const choice =
        document.getElementById(
          "activityChoice"
        );

      if (choice) {
        choice.textContent =
          `🍓 You chose ${activity} ♡`;
      }

      showToast(
        `${activity} selected ♡`
      );

    });

  });


  counterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const type =
        button.dataset.counter;

      const change =
        Number(button.dataset.change);

      const key =
        `littleberry_${type}`;

      let count =
        Number(
          localStorage.getItem(key)
        ) || 0;

      count =
        Math.max(
          0,
          count + change
        );

      localStorage.setItem(
        key,
        count
      );

      updateCounters();

    });

  });


  themeButtons.forEach((button) => {

    button.addEventListener("click", () => {

      setTheme(
        button.dataset.theme
      );

    });

  });


  const themeCycle =
    document.getElementById(
      "themeCycle"
    );

  if (themeCycle) {

    themeCycle.addEventListener(
      "click",
      cycleTheme
    );

  }


  const resetRoutine =
    document.getElementById(
      "resetRoutine"
    );

  if (resetRoutine) {

    resetRoutine.addEventListener(
      "click",
      () => {

        taskInputs.forEach((input) => {

          input.checked = false;

          localStorage.removeItem(
            `littleberryTask_${input.dataset.task}`
          );

        });

        showToast(
          "Routine reset ♡"
        );

      }
    );

  }


  const clearData =
    document.getElementById(
      "clearData"
    );

  if (clearData) {

    clearData.addEventListener(
      "click",
      () => {

        localStorage.clear();

        location.reload();

      }
    );

  }


  function openPage(pageName) {

    pages.forEach((page) => {
      page.classList.remove("active");
    });

    const page =
      document.getElementById(
        pageName
      );

    if (page) {
      page.classList.add("active");
    }


    navButtons.forEach((button) => {

      button.classList.toggle(
        "active",
        button.dataset.page === pageName
      );

    });


    const title =
      document.getElementById(
        "pageTitle"
      );

    if (title) {

      const niceNames = {
        home: "Home",
        activities: "Activities",
        rewards: "Rewards",
        comfort: "Comfort Corner",
        routine: "Routine",
        settings: "Settings"
      };

      title.textContent =
        niceNames[pageName] || "Littleberry";

    }


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  function loadEverything() {

    loadMood();
    loadTasks();
    updateStickers();
    updateCounters();
    loadTheme();
    loadActivity();

  }


  function loadMood() {

    const mood =
      localStorage.getItem(
        "littleberryMood"
      );

    if (!mood) return;


    moodButtons.forEach((button) => {

      button.classList.toggle(
        "selected",
        button.dataset.mood === mood
      );

    });

  }


  function loadTasks() {

    taskInputs.forEach((input) => {

      const saved =
        localStorage.getItem(
          `littleberryTask_${input.dataset.task}`
        );

      input.checked =
        saved === "true";

    });

  }


  function syncDuplicateTasks(
    taskName,
    checked
  ) {

    document
      .querySelectorAll(
        `[data-task="${taskName}"]`
      )
      .forEach((input) => {

        input.checked = checked;

      });

  }


  function updateStickers() {

    let total = 0;

    const days = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ];


    days.forEach((day) => {

      const earned =
        localStorage.getItem(
          `littleberrySticker_${day}`
        ) === "true";

      if (earned) {
        total++;
      }


      document
        .querySelectorAll(
          `[data-day="${day}"]`
        )
        .forEach((button) => {

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

        });

    });


    const progress =
      document.getElementById(
        "stickerProgress"
      );

    if (progress) {

      progress.style.width =
        `${(total / 7) * 100}%`;

    }


    const count =
      document.getElementById(
        "stickerCount"
      );

    if (count) {

      count.textContent =
        `${total} / 7`;

    }


    const bigCount =
      document.getElementById(
        "rewardBigCount"
      );

    if (bigCount) {

      bigCount.textContent =
        total;

    }

  }


  function updateCounters() {

    const snack =
      Number(
        localStorage.getItem(
          "littleberry_snack"
        )
      ) || 0;

    const drink =
      Number(
        localStorage.getItem(
          "littleberry_drink"
        )
      ) || 0;


    const snackCount =
      document.getElementById(
        "snackCount"
      );

    const drinkCount =
      document.getElementById(
        "drinkCount"
      );


    if (snackCount) {

      snackCount.textContent =
        `${snack} today`;

    }


    if (drinkCount) {

      drinkCount.textContent =
        `${drink} today`;

    }

  }


  function loadActivity() {

    const activity =
      localStorage.getItem(
        "littleberryActivity"
      );

    if (!activity) return;


    const choice =
      document.getElementById(
        "activityChoice"
      );

    if (choice) {

      choice.textContent =
        `🍓 You chose ${activity} ♡`;

    }

  }


  function setTheme(theme) {

    document.body.classList.remove(
      "theme-moon",
      "theme-garden"
    );


    if (theme === "moon") {

      document.body.classList.add(
        "theme-moon"
      );

    }


    if (theme === "garden") {

      document.body.classList.add(
        "theme-garden"
      );

    }


    localStorage.setItem(
      "littleberryTheme",
      theme
    );


    showToast(
      `${theme} theme selected ♡`
    );

  }


  function loadTheme() {

    const theme =
      localStorage.getItem(
        "littleberryTheme"
      ) || "strawberry";

    setTheme(theme);

  }


  function cycleTheme() {

    const current =
      localStorage.getItem(
        "littleberryTheme"
      ) || "strawberry";


    const order = [
      "strawberry",
      "moon",
      "garden"
    ];


    const nextIndex =
      (
        order.indexOf(current) + 1
      ) % order.length;


    setTheme(
      order[nextIndex]
    );

  }


  function showToast(message) {

    const toast =
      document.getElementById(
        "toast"
      );

    if (!toast) return;


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(
      window.littleberryToastTimer
    );


    window.littleberryToastTimer =
      setTimeout(() => {

        toast.classList.remove(
          "show"
        );

      }, 2200);

  }


  if (
    "serviceWorker" in navigator
  ) {

    navigator.serviceWorker
      .register(
        "service-worker.js"
      )
      .catch(() => {});

  }

});
