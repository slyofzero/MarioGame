function saveName() {
  const name = document.getElementById("userNameInput").value;
  if (name.trim() !== "") {
    closeModal();
  } else {
    alert("Please enter a valid name.");
  }
}

function closeModal() {
  const modal = document.getElementById("userNameForm");
  modal.style.display = "none";
}

function checkLogin() {
  console.log(localStorage.getItem("super-mario-userId"));

  if (localStorage.getItem("super-mario-userId") === null) {
    const modal = document.getElementById("userNameForm");
    modal.style.display = "block";
  }
}

document.getElementById("userNameForm").onsubmit = async function (event) {
  try {
    event.preventDefault();
    const name = document.getElementById("userNameInput").value;

    const response = await fetch("https://mario-be.vercel.app/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });

    const { userId } = await response.json();
    localStorage.setItem("super-mario-userId", userId);
    closeModal();
  } catch (error) {
    console.log(error.message);
  }
};
