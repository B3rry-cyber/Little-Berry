document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ELEMENTS
  // =========================

  const pages =
    document.querySelectorAll(".page");

  const navButtons =
    document.querySelectorAll("[data-nav]");

  const bottomNavButtons =
    document.querySelectorAll(
      ".bottom-nav [data-nav]"
    );

  const moodButtons =
    document.querySelectorAll(
      ".mood-card"
    );

  const taskInputs =
    document.querySelectorAll(
      "[data-task]"
    );

  const stickerButtons =
    document.querySelectorAll(
      "[data-day]"
    );

  const activityButtons =
    document.querySelectorAll(
      "[data-activity]"
    );

  const comfortButtons =
    document.querySelectorAll(
      "[data-comfort]"
    );

  const themeButtons =
    document.querySelectorAll(
      "[data-theme]"
    );

  const avatarButtons =
    document.querySelectorAll(
      "[data-avatar]"
    );

  const toast =
    document.getElementById("toast");


  // =========================
  // START APP
  // =========================

  loadApp();


  // =========================
  // PAGE NAVIGATION
  // =========================

  navButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const page =
          button.dataset.nav;

        openPage(page);

      }
    );

  });


  function openPage(pageName) {

    pages.forEach((page) => {

      page.classList.remove(
        "active"
      );

    });


    const requestedPage =
      document.getElementById(
        `page-${pageName}`
      );


    if (!requestedPage) {
      return;
    }


    requestedPage.classList.add(
      "active"
    );


    bottomNavButtons.forEach(
      (button) => {

        button.classList.toggle(
          "active",
          button.dataset.nav === pageName
        );

      }
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


    localStorage.setItem(
      "littleberryPage",
      pageName
    );

  }


  // =========================
  // MOOD CHECK-IN
  // =========================

  moodButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        moodButtons.forEach(
          (item) => {

            item.classList.remove(
              "selected"
            );

          }
        );


        button.classList.add(
          "selected"
        );


        const mood =
          button.dataset.mood;


        localStorage.setItem(
          "littleberryMood",
          mood
        );


        showToast(
          `${mood} saved ♡`
        );

      }
    );

  });


  function loadMood() {

    const savedMood =
      localStorage.getItem(
        "littleberryMood"
      );


    if (!savedMood) {
      return;
    }


    moodButtons.forEach(
      (button) => {

        button.classList.toggle(
          "selected",
          button.dataset.mood === savedMood
        );

      }
    );

  }


  // =========================
  // ROUTINE
  // =========================

  taskInputs.forEach((input) => {

    input.addEventListener(
      "change",
      () => {

        const task =
          input.dataset.task;


        localStorage.setItem(
          `littleberryTask_${task}`,
          input.checked
        );


        syncTask(
          task,
          input.checked
        );


        if (input.checked) {

          showToast(
            "Little task complete 🍓"
          );

        }

      }
    );

  });


  function syncTask(
    taskName,
    checked
  ) {

    document
      .querySelectorAll(
        `[data-task="${taskName}"]`
      )
      .forEach((input) => {

        input.checked =
          checked;

      });

  }


  function loadTasks() {

    taskInputs.forEach(
      (input) => {

        const saved =
          localStorage.getItem(
            `littleberryTask_${input.dataset.task}`
          );


        input.checked =
          saved === "true";

      }
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

        taskInputs.forEach(
          (input) => {

            input.checked =
              false;


            localStorage.removeItem(
              `littleberryTask_${input.dataset.task}`
            );

          }
        );


        showToast(
          "Routine reset ♡"
        );

      }
    );

  }


  // =========================
  // STICKER REWARDS
  // =========================

  stickerButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const day =
            button.dataset.day;


          const key =
            `littleberrySticker_${day}`;


          const currentlyEarned =
            localStorage.getItem(
              key
            ) === "true";


          localStorage.setItem(
            key,
            !currentlyEarned
          );


          updateStickerChart();


          if (!currentlyEarned) {

            showToast(
              "Sticker earned! ⭐"
            );

          }

        }
      );

    }
  );


  function updateStickerChart() {

    const days = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ];


    let total = 0;


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
            button.querySelector(
              "span"
            );


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
        `${total}/7`;

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


  const clearStickers =
    document.getElementById(
      "clearStickers"
    );


  if (clearStickers) {

    clearStickers.addEventListener(
      "click",
      () => {

        [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ].forEach((day) => {

          localStorage.removeItem(
            `littleberrySticker_${day}`
          );

        });


        updateStickerChart();


        showToast(
          "Sticker chart reset ♡"
        );

      }
    );

  }


  // =========================
  // ACTIVITIES
  // =========================

  activityButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const activity =
            button.dataset.activity;


          localStorage.setItem(
            "littleberryActivity",
            activity
          );


          updateActivityChoice();


          showToast(
            `${activity} chosen ♡`
          );

        }
      );

    }
  );


  function updateActivityChoice() {

    const activity =
      localStorage.getItem(
        "littleberryActivity"
      );


    const choice =
      document.getElementById(
        "activityChoice"
      );


    if (
      activity &&
      choice
    ) {

      choice.textContent =
        `🍓 You chose ${activity} ♡`;

    }

  }


  // =========================
  // COMFORT CORNER
  // =========================

  comfortButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const type =
            button.dataset.comfort;


          if (type === "breathing") {

            document
              .getElementById(
                "breathingCard"
              )
              ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });

          }


          if (type === "plushie") {

            showToast(
              "Time for a cozy plushie cuddle 🧸"
            );

          }


          if (type === "drink") {

            showToast(
              "Take a few gentle sips 🥤"
            );

          }


          if (type === "quiet") {

            showToast(
              "Quiet mode activated 🌙"
            );

          }

        }
      );

    }
  );


  // =========================
  // BREATHING TOOL
  // =========================

  const startBreathing =
    document.getElementById(
      "startBreathing"
    );

  const breathingOrb =
    document.getElementById(
      "breathingOrb"
    );

  const breathingTitle =
    document.getElementById(
      "breathingTitle"
    );

  const breathingText =
    document.getElementById(
      "breathingText"
    );


  let breathingRunning =
    false;

  let breathingTimeout;


  if (startBreathing) {

    startBreathing.addEventListener(
      "click",
      () => {

        if (breathingRunning) {

          stopBreathing();

        } else {

          breathingRunning =
            true;


          startBreathing.textContent =
            "Stop breathing session";


          breathingCycle();

        }

      }
    );

  }


  function breathingCycle() {

    if (!breathingRunning) {
      return;
    }


    breathingTitle.textContent =
      "Breathe in...";

    breathingText.textContent =
      "Slowly fill your lungs ♡";

    breathingOrb.textContent =
      "🌸";

    breathingOrb.classList.add(
      "breathe"
    );


    breathingTimeout =
      setTimeout(() => {

        if (!breathingRunning) {
          return;
        }


        breathingTitle.textContent =
          "Breathe out...";

        breathingText.textContent =
          "Let everything soften.";

        breathingOrb.textContent =
          "☁️";

        breathingOrb.classList.remove(
          "breathe"
        );


        breathingTimeout =
          setTimeout(
            breathingCycle,
            4000
          );

      }, 4000);

  }


  function stopBreathing() {

    breathingRunning =
      false;


    clearTimeout(
      breathingTimeout
    );


    breathingOrb.classList.remove(
      "breathe"
    );


    breathingOrb.textContent =
      "☁️";


    breathingTitle.textContent =
      "Ready when you are";


    breathingText.textContent =
      "Tap start and follow the gentle prompts.";


    startBreathing.textContent =
      "Start breathing";

  }


  // =========================
  // THEMES
  // =========================

  themeButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          setTheme(
            button.dataset.theme
          );

        }
      );

    }
  );


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


    const names = {
      strawberry:
        "Strawberry Cream 🍓",

      moon:
        "Moonbaby 🌙",

      garden:
        "Fairy Garden 🌷"
    };


    showToast(
      `${names[theme]} selected`
    );

  }


  function loadTheme() {

    const theme =
      localStorage.getItem(
        "littleberryTheme"
      ) || "strawberry";


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

  }


  // =========================
  // PROFILE
  // =========================

  const profileName =
    document.getElementById(
      "profileName"
    );

  const profileTagline =
    document.getElementById(
      "profileTagline"
    );

  const profilePronouns =
    document.getElementById(
      "profilePronouns"
    );

  const profileLittleAge =
    document.getElementById(
      "profileLittleAge"
    );

  const profileComfort =
    document.getElementById(
      "profileComfort"
    );

  const saveProfile =
    document.getElementById(
      "saveProfile"
    );


  let selectedAvatar =
    localStorage.getItem(
      "littleberryAvatar"
    ) || "🐰";


  avatarButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          selectedAvatar =
            button.dataset.avatar;


          avatarButtons.forEach(
            (item) => {

              item.classList.remove(
                "selected"
              );

            }
          );


          button.classList.add(
            "selected"
          );


          updateProfilePreview();

        }
      );

    }
  );


  if (saveProfile) {

    saveProfile.addEventListener(
      "click",
      () => {

        const profile = {

          name:
            profileName.value.trim()
            || "Little Berry",

          tagline:
            profileTagline.value.trim()
            || "cozy little dreamer ♡",

          pronouns:
            profilePronouns.value.trim(),

          littleAge:
            profileLittleAge.value.trim(),

          comfort:
            profileComfort.value.trim(),

          avatar:
            selectedAvatar

        };


        localStorage.setItem(
          "littleberryProfile",
          JSON.stringify(profile)
        );


        localStorage.setItem(
          "littleberryAvatar",
          selectedAvatar
        );


        updateProfileUI();


        showToast(
          "Profile saved 🍓"
        );

      }
    );

  }


  function getProfile() {

    const saved =
      localStorage.getItem(
        "littleberryProfile"
      );


    if (!saved) {

      return {
        name: "Little Berry",
        tagline:
          "cozy little dreamer ♡",
        pronouns: "",
        littleAge: "",
        comfort: "",
        avatar:
          localStorage.getItem(
            "littleberryAvatar"
          ) || "🐰"
      };

    }


    try {

      return JSON.parse(saved);

    } catch {

      return {
        name: "Little Berry",
        tagline:
          "cozy little dreamer ♡",
        pronouns: "",
        littleAge: "",
        comfort: "",
        avatar: "🐰"
      };

    }

  }


  function loadProfileForm() {

    const profile =
      getProfile();


    selectedAvatar =
      profile.avatar || "🐰";


    profileName.value =
      profile.name || "";


    profileTagline.value =
      profile.tagline || "";


    profilePronouns.value =
      profile.pronouns || "";


    profileLittleAge.value =
      profile.littleAge || "";


    profileComfort.value =
      profile.comfort || "";


    avatarButtons.forEach(
      (button) => {

        button.classList.toggle(
          "selected",
          button.dataset.avatar ===
            selectedAvatar
        );

      }
    );


    updateProfilePreview();

  }


  function updateProfilePreview() {

    const previewAvatar =
      document.getElementById(
        "profilePreviewAvatar"
      );


    if (previewAvatar) {

      previewAvatar.textContent =
        selectedAvatar;

    }


    const previewName =
      document.getElementById(
        "profilePreviewName"
      );


    if (previewName) {

      previewName.textContent =
        profileName.value.trim()
        || "Little Berry";

    }


    const previewTagline =
      document.getElementById(
        "profilePreviewTagline"
      );


    if (previewTagline) {

      previewTagline.textContent =
        profileTagline.value.trim()
        || "cozy little dreamer ♡";

    }

  }


  profileName?.addEventListener(
    "input",
    updateProfilePreview
  );


  profileTagline?.addEventListener(
    "input",
    updateProfilePreview
  );


  function updateProfileUI() {

    const profile =
      getProfile();


    const headerAvatar =
      document.getElementById(
        "headerAvatar"
      );


    const heroAvatar =
      document.getElementById(
        "heroAvatar"
      );


    const homeName =
      document.getElementById(
        "homeName"
      );


    if (headerAvatar) {

      headerAvatar.textContent =
        profile.avatar || "🐰";

    }


    if (heroAvatar) {

      heroAvatar.textContent =
        profile.avatar || "🐰";

    }


    if (homeName) {

      homeName.textContent =
        profile.name || "little berry";

    }

  }


  // =========================
  // RESET ALL DATA
  // =========================

  const clearAllData =
    document.getElementById(
      "clearAllData"
    );


  if (clearAllData) {

    clearAllData.addEventListener(
      "click",
      () => {

        const confirmed =
          window.confirm(
            "Reset all Littleberry data?"
          );


        if (!confirmed) {
          return;
        }


        localStorage.clear();


        window.location.reload();

      }
    );

  }


  // =========================
  // TOAST
  // =========================

  function showToast(message) {

    if (!toast) {
      return;
    }


    toast.textContent =
      message;


    toast.classList.add(
      "show"
    );


    clearTimeout(
      window.littleberryToastTimer
    );


    window.littleberryToastTimer =
      setTimeout(
        () => {

          toast.classList.remove(
            "show"
          );

        },
        1900
      );

  }


  // =========================
  // LOAD EVERYTHING
  // =========================

  function loadApp() {

    loadMood();

    loadTasks();

    updateStickerChart();

    updateActivityChoice();

    loadTheme();

    loadProfileForm();

    updateProfileUI();


    const savedPage =
      localStorage.getItem(
        "littleberryPage"
      );


    if (
      savedPage &&
      document.getElementById(
        `page-${savedPage}`
      )
    ) {

      openPage(savedPage);

    }

  }

});
