function formatTime(time) {
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const hundredths = time % 100;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${hundredths
    .toString()
    .padStart(2, "0")}`;
}

function initializeTimer(timer3, stopwatch2) {
  const timerElement = document.getElementById(`timer${timerId}`);
  const marksList = document.getElementById(`marks-list${timerId}`);
  let intervalId = 0;
  let timer = 0;
  let marks = [];
  let isRunning = false;

  const toggleTimer = () => {
    const button = document.getElementById(`power${timer3}`);
    const action = button.getAttribute("action");

    clearInterval(intervalId);

    if (action === "start" || action === "continue") {
      intervalId = setInterval(() => {
        timer += 1;
        setTimer(timer);
      }, 10);
      button.setAttribute("action", "pause");
      button.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
      isRunning = true;
      synchronizeTimers();
    } else if (action === "pause") {
      button.setAttribute("action", "continue");
      button.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
      isRunning = false;
    }
  };

  const setTimer = (time) => {
    timerElement.innerText = formatTime(time);
  };

  const synchronizeTimers = () => {
    const syncButton = document.getElementById(`power${stopwatch2}`);
    const syncAction = syncButton.getAttribute("action");

    if (isRunning && (syncAction === "pause" || syncAction === "continue")) {
      syncButton.click();
    }
  };

  document
    .getElementById(`power${timer3}`)
    .addEventListener("click", toggleTimer);
  // Outros event listeners e funções podem ser adicionados aqui conforme necessário
}

// Inicializações
initializeTimer("stopwatch2", "stopwatch3");
initializeTimer("stopwatch3", "stopwatch2");
