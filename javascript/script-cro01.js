function initializeTimer(timer1) {
  const timerElement = document.getElementById(`timer${timer1}`);
  const marksList = document.getElementById(`marks-list${timer1}`);
  let intervalId = 0;
  let timer = 0;
  let marks = [];

  const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${hundredths
      .toString()
      .padStart(2, "0")}`;
  };

  const addMarkToList = (markIndex, markTime) => {
    marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
  };

  const markTime = () => {
    marks.push(timer);
    addMarkToList(marks.length, timer);
  };

  const toggleTimer = () => {
    const button = document.getElementById(`power${timer1}`);
    const action = button.getAttribute("action");

    clearInterval(intervalId);

    if (action === "start" || action === "continue") {
      intervalId = setInterval(() => {
        timer += 1;
        setTimer(timer);
      }, 10);
      button.setAttribute("action", "pause");
      button.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
    } else if (action === "pause") {
      button.setAttribute("action", "continue");
      button.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
    }
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTimer(timer);
    marksList.innerHTML = "";
    const button = document.getElementById(`power${timer1}`);
    button.setAttribute("action", "start");
    button.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
  };

  const setTimer = (time) => {
    timerElement.innerText = formatTime(time);
  };

  document
    .getElementById(`power${timer1}`)
    .addEventListener("click", toggleTimer);
  document.getElementById(`mark${timer1}`).addEventListener("click", markTime);
  document
    .getElementById(`reset${timer1}`)
    .addEventListener("click", resetTimer);
}

// Inicialize cada cronômetro
initializeTimer(1);
initializeTimer(2);
initializeTimer(3);
