const messageInput = document.getElementById("message");
const timerInput = document.getElementById("timer");
const sendButton = document.getElementById("send");
const urlOutput = document.getElementById("url");

function generateUrl() {
  const message = messageInput.value.trim();
  const timer = timerInput.value;
  const baseUrl = window.location.href.split("?")[0];
  const params = new URLSearchParams({
    message: message,
    timer: timer
  });
  return baseUrl + "?" + params.toString();
}

function copyUrl() {
  const url = generateUrl();
  navigator.clipboard.writeText(url).then(() => {
    alert("Link copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy link.");
  });
}

function showUrl() {
  urlOutput.innerHTML = generateUrl();
}

sendButton.addEventListener("click", (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  const timer = timerInput.value;

  if (message.length === 0) {
    alert("Please enter a message.");
    return;
  }

  if (timer < 1) {
    alert("Please enter a timer value greater than or equal to 1.");
    return;
  }

  const url = generateUrl();
  showUrl();

  // Set timer to delete message and clear URL after expiration
  setTimeout(() => {
    messageInput.value = "";
    urlOutput.innerHTML = "";
  }, timer * 1000);
});
