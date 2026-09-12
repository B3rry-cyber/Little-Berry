document.addEventListener(
  "DOMContentLoaded",
  () => {

    const moodButtons =
      document.querySelectorAll(
        ".mood-card"
      );

    const tasks =
      document.querySelectorAll(
        "[data-task]"
      );

    const stickerButtons =
      document.querySelectorAll(
        "[data-day]"
      );


    loadMood();
    loadTasks();
    updateStickers();


    moodButtons.forEach(
      (button) => {

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

            localStorage.setItem(
              "littleberryMood",
              button.dataset.mood
            );

            showToast(
              `${button.dataset.mood} saved ♡`
            );

          }
        );

      }
    );


    tasks.forEach(
      (task) => {

        task.addEventListener(
          "change",
          () => {

            localStorage.setItem(
              `littleberryTask_${task.dataset.task}`,
              task.checked
            );

            if (task.checked) {
              showToast(
                "Little task complete 🍓"
              );
            }

          }
        );

      }
    );


    stickerButtons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            const day =
              button.dataset.day;

            const key =
              `littleberrySticker_${day}`;

            const current =
              localStorage.getItem(
                key
              ) === "true";

            localStorage.setItem(
              key,
              !current
            );

            updateStickers();

          }
        );

      }
    );


    function loadMood() {

      const saved =
        localStorage.getItem(
          "littleberryMood"
        );

      if (!saved) return;


      moodButtons.forEach(
        (button) => {

          if (
            button.dataset.mood
            === saved
          ) {
            button.classList.add(
              "selected"
            );
          }

        }
      );

    }


    function loadTasks() {

      tasks.forEach(
        (task) => {

          const saved =
            localStorage.getItem(
              `littleberryTask_${task.dataset.task}`
            );

          task.checked =
            saved === "true";

        }
      );

    }


    function updateStickers() {

      let count = 0;


      stickerButtons.forEach(
        (button) => {

          const day =
            button.dataset.day;

          const earned =
            localStorage.getItem(
              `littleberrySticker_${day}`
            ) === "true";


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


          if (earned) {
            count++;
          }

        }
      );


      const progress =
        document.getElementById(
          "stickerProgress"
        );


      if (progress) {

        progress.style.width =
          `${(count / 7) * 100}%`;

      }


      const counter =
        document.getElementById(
          "stickerCount"
        );


      if (counter) {

        counter.textContent =
          `${count}/7`;

      }

    }


    function showToast(message) {

      const toast =
        document.getElementById(
          "toast"
        );

      if (!toast) return;


      toast.textContent =
        message;

      toast.classList.add(
        "show"
      );


      clearTimeout(
        window.toastTimer
      );


      window.toastTimer =
        setTimeout(
          () => {

            toast.classList.remove(
              "show"
            );

          },
          2000
        );

    }

  }
);
