async function updateScore(score) {
  try {
    const userId = localStorage.getItem("super-mario-userId");
    console.log(score);

    await fetch(`http://13.200.13.164:3333/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchLeaderboardData() {
  try {
    const response = await fetch("http://13.200.13.164:3333/users");
    if (response.ok) {
      const users = await response.json();
      populateLeaderboard(users);
      showLeaderboard();
    } else {
      console.error("Failed to fetch leaderboard data");
    }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  }
}

function populateLeaderboard(users) {
  const leaderboardList = document.getElementById("leaderboardList");
  leaderboardList.innerHTML = ""; // Clear existing list items

  users.forEach((user, key) => {
    const rank = key + 1;

    const userId = localStorage.getItem("super-mario-userId");
    const userIsMe = userId === user.userId;

    const listItem = document.createElement("li");
    listItem.classList.add("leaderboard-item");

    if (userIsMe) {
      listItem.classList.add("my-rank");
    }

    const rankElement = document.createElement("span");
    rankElement.classList.add("rank");
    rankElement.textContent = `${
      rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `${rank}`
    }`;
    listItem.appendChild(rankElement);

    const nameElement = document.createElement("span");
    nameElement.classList.add("name");
    nameElement.textContent = user.name;
    listItem.appendChild(nameElement);

    const scoreElement = document.createElement("span");
    scoreElement.classList.add("score");
    scoreElement.textContent = user.score;
    listItem.appendChild(scoreElement);

    leaderboardList.appendChild(listItem);
  });
}

function showLeaderboard() {
  const leaderboard = document.getElementById("leaderboard");
  leaderboard.style.display = "flex";
}
