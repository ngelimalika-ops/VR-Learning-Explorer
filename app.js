

const devices = {
  computer: {
    title: "💻 Computer",
    description: "A computer is an end device that sends and receives information through a network. It allows users to communicate and access network resources."
  },

  router: {
    title: "📡 Router",
    description: "A router connects different networks and forwards data toward its destination."
  },

  switch: {
    title: "🖧 Network Switch",
    description: "A switch connects multiple devices within a local area network (LAN). It forwards data to the correct device."
  },

  server: {
    title: "🖥️ Server",
    description: "A server provides services and resources to other computers, such as websites and files."
  },

  modem: {
    title: "🔌 Modem",
    description: "A modem connects a network to an internet service provider by converting signals into a form suitable for communication."
  },

  accessPoint: {
    title: "📶 Wireless Access Point",
    description: "A wireless access point allows wireless devices such as laptops and phones to connect to a network using Wi-Fi."
  }
};


// Display information about selected devices
const deviceButtons = document.querySelectorAll(".node");
const information = document.getElementById("information");

deviceButtons.forEach(button => {
  button.addEventListener("click", () => {
    const device = button.dataset.device;
    const selected = devices[device];

    information.innerHTML = `
      <h3>${selected.title}</h3>
      <p>${selected.description}</p>
    `;
  });
});

// Welcome button
document.getElementById("startButton")
  .addEventListener("click", () => {
    document.getElementById("learning")
      .scrollIntoView({ behavior: "smooth" });
  });


// Networking Knowledge Center - Quiz

const questions = [
  {
    question: "Which device connects different networks?",
    answers: ["Switch", "Router", "Keyboard"],
    correct: "Router",
    explanation: "A router connects different networks."
  },
  {
    question: "What does LAN stand for?",
    answers: [
      "Local Area Network",
      "Large Access Network",
      "Long Area Node"
    ],
    correct: "Local Area Network",
    explanation: "LAN means Local Area Network."
  },
  {
    question: "Which device connects multiple devices in a LAN?",
    answers: ["Switch", "Printer", "Modem"],
    correct: "Switch",
    explanation: "A switch connects devices within a local network."
  },
  {
    question: "What is the main purpose of a server?",
    answers: [
      "To provide services and resources",
      "To print documents",
      "To supply electricity"
    ],
    correct: "To provide services and resources",
    explanation: "Servers provide resources to other computers."
  },
  {
    question: "What does Wi-Fi allow devices to do?",
    answers: [
      "Connect wirelessly",
      "Increase screen brightness",
      "Charge batteries"
    ],
    correct: "Connect wirelessly",
    explanation: "Wi-Fi allows devices to communicate wirelessly."
  },
  {
    question: "What does IP stand for?",
    answers: [
      "Internet Protocol",
      "Internal Program",
      "Information Point"
    ],
    correct: "Internet Protocol",
    explanation: "IP means Internet Protocol."
  },
  {
    question: "Which device converts signals for internet access?",
    answers: ["Modem", "Mouse", "Monitor"],
    correct: "Modem",
    explanation: "A modem converts signals to enable communication with an internet service provider."
  },
  {
    question: "What is the internet?",
    answers: [
      "A global network of networks",
      "A computer application",
      "A single computer"
    ],
    correct: "A global network of networks",
    explanation: "The internet connects networks around the world."
  },
  {
    question: "What does a network cable help to do?",
    answers: [
      "Connect devices physically",
      "Store passwords",
      "Display pictures"
    ],
    correct: "Connect devices physically",
    explanation: "Network cables carry data between connected devices."
  },
  {
    question: "Which protocol is commonly used to access websites?",
    answers: ["HTTP", "FTP", "SMTP"],
    correct: "HTTP",
    explanation: "HTTP is used for communication between web browsers and web servers."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

// Quiz elements
const questionElement = document.getElementById("question");
const feedback = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("nextButton");

// Create progress bar
const progress = document.createElement("div");
progress.id = "quizProgress";
progress.style.cssText =
  "height:8px;background:#294b71;border-radius:10px;margin:20px 0;overflow:hidden;";

const progressFill = document.createElement("div");
progressFill.style.cssText =
  "height:100%;width:0%;background:#66e2c2;transition:width .3s;";

progress.appendChild(progressFill);

document.querySelector(".challenge").insertBefore(
  progress,
  document.querySelector(".answers")
);

function showQuestion() {
  const q = questions[currentQuestion];

  questionElement.textContent =
    "Question " + (currentQuestion + 1) + ": " + q.question;

  feedback.textContent = "";
  answered = false;

  progressFill.style.width =
    (currentQuestion / questions.length * 100) + "%";

  document.querySelectorAll(".answer").forEach((button, index) => {
    button.textContent = q.answers[index];
    button.dataset.answer = q.answers[index];
    button.disabled = false;
    button.style.opacity = "1";
  });

  nextButton.disabled = true;
  nextButton.textContent = "Next question";
  scoreElement.textContent = "Score: " + score + " / 10";
}

document.querySelectorAll(".answer").forEach(button => {
  button.addEventListener("click", () => {
    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];
    const selected = button.dataset.answer;

    if (selected === q.correct) {
      score++;
      feedback.textContent = "✓ Correct! " + q.explanation;
      feedback.style.color = "#66e2c2";
    } else {
      feedback.textContent =
        "✗ Incorrect. Correct answer: " + q.correct +
        ". " + q.explanation;
      feedback.style.color = "#ff9a9a";
    }

    document.querySelectorAll(".answer").forEach(answer => {
      answer.disabled = true;
      answer.style.opacity =
        answer.dataset.answer === q.correct ? "1" : "0.5";
    });

    scoreElement.textContent = "Score: " + score + " / 10";
    progressFill.style.width =
      ((currentQuestion + 1) / questions.length * 100) + "%";

    nextButton.disabled = false;
  });
});

nextButton.addEventListener("click", () => {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    questionElement.textContent = "🎉 Challenge completed!";

    feedback.textContent =
      "Your final score: " + score + " out of 10.";

    feedback.style.color = "#66e2c2";

    progressFill.style.width = "100%";
    scoreElement.textContent = "Final Score: " + score + " / 10";

    nextButton.textContent = "Restart Quiz";
    nextButton.disabled = false;
    nextButton.onclick = () => location.reload();

    return;
  }

  showQuestion();
});

showQuestion();


// Move to the next question or restart
document.getElementById("nextButton")
  .addEventListener("click", () => {

    if (currentQuestion === -1) {
      currentQuestion = 0;
      score = 0;
      scoreElement.textContent = "Score: 0";
      document.getElementById("nextButton")
        .textContent = "Next question";
      showQuestion();
      return;
    }

    currentQuestion++;

    if (currentQuestion >= questions.length) {
      questionElement.textContent =
        "🎉 You completed the networking challenge!";

      feedback.textContent =
        "Your final score: " + score +
        " out of " + questions.length +
        ". Click restart to play again.";

      document.getElementById("nextButton")
        .textContent = "Restart challenge";

      currentQuestion = -1;
      return;
    }

    showQuestion();
  });

showQuestion();




  

// Restart after finishing
document.getElementById("nextButton")
  .addEventListener("click", () => {
    if (currentQuestion === -1) {
      currentQuestion = 0;
      score = 0;
      scoreElement.textContent = "Score: 0";
      document.getElementById("nextButton")
        .textContent = "Next question";
      showQuestion();
    }
  });

showQuestion();

const simulateButton = document.getElementById("simulateButton");
const packet = document.getElementById("packet");
const simulationStatus = document.getElementById("simulationStatus");

simulateButton.addEventListener("click", () => {
  packet.classList.remove("moving");

  void packet.offsetWidth;

  packet.classList.add("moving");

  simulateButton.disabled = true;
  simulateButton.textContent = "Transferring...";

  simulationStatus.textContent =
    "Data is travelling from the computer to the server...";

  setTimeout(() => {
    packet.classList.remove("moving");

    simulationStatus.textContent =
      "✓ Data transfer completed successfully!";

    simulateButton.disabled = false;
    simulateButton.textContent = "Start Again";
  }, 3100);
});

// SIX INTERACTIVE NETWORKING LESSONS

const lessons = [
  {
    icon: "🌐",
    title: "Introduction to Networks",
    content: "A computer network is a group of connected devices that communicate and share information. Networks help people exchange files, access resources and communicate."
  },
  {
    icon: "📡",
    title: "Network Devices",
    content: "Learn about routers, switches, servers, modems, computers and wireless access points. Each device has a different role in network communication."
  },
  {
    icon: "🔗",
    title: "Network Topologies",
    content: "Network topology describes how devices are arranged and connected. Common examples include star, bus, ring and mesh topology."
  },
  {
    icon: "🌍",
    title: "IP Addressing",
    content: "An IP address identifies a device on an IP network. IPv4 addresses use four numbers separated by dots, for example 192.168.1.1."
  },
  {
    icon: "📶",
    title: "Wireless Networking",
    content: "Wireless networks allow devices to communicate without physical network cables. Wi-Fi is a common wireless networking technology."
  },
  {
    icon: "🔒",
    title: "Network Security",
    content: "Network security protects devices and information from unauthorized access. Strong passwords, firewalls and encryption help protect networks."
  }
];

const lessonGrid = document.getElementById("lessonGrid");
const lessonContent = document.getElementById("lessonContent");
const lessonProgress = document.getElementById("lessonProgress");
const lessonProgressFill = document.getElementById("lessonProgressFill");

let completedLessons = [];

function updateLessonProgress() {
  const count = completedLessons.length;
  const percentage = (count / lessons.length) * 100;

  lessonProgress.textContent =
    count + " of 6 lessons completed";

  lessonProgressFill.style.width = percentage + "%";
}

function showLessons() {
  lessonGrid.innerHTML = "";

  lessons.forEach((lesson, index) => {
    const card = document.createElement("button");

    card.className = "lesson-card";

    if (completedLessons.includes(index)) {
      card.classList.add("completed");
    }

    card.innerHTML =
      lesson.icon + "<br>" +
      lesson.title + "<br>" +
      (completedLessons.includes(index) ? "✓ Completed" : "Start lesson");

    card.addEventListener("click", () => {
      openLesson(index);
    });

    lessonGrid.appendChild(card);
  });
}

function openLesson(index) {
  const lesson = lessons[index];

  lessonContent.innerHTML = `
    <h3>${lesson.icon} ${lesson.title}</h3>
    <p>${lesson.content}</p>
    <button class="complete-lesson" id="completeLesson">
      ${completedLessons.includes(index)
        ? "Completed ✓"
        : "Mark as Completed"}
    </button>
  `;

  document.getElementById("completeLesson")
    .addEventListener("click", () => {

      if (!completedLessons.includes(index)) {
        completedLessons.push(index);
      }

      updateLessonProgress();
      showLessons();
      openLesson(index);
    });
}

showLessons();
updateLessonProgress();

// VIRTUAL NETWORKING LABORATORY

const labDevices = {
  "PC-01": {
    name: "Computer",
    ip: "192.168.1.10",
    role: "Sends and receives network data."
  },
  "SW-01": {
    name: "Network Switch",
    ip: "192.168.1.2",
    role: "Connects devices inside a local network."
  },
  "RT-01": {
    name: "Router",
    ip: "192.168.1.1",
    role: "Connects different networks."
  },
  "SR-01": {
    name: "Server",
    ip: "192.168.1.20",
    role: "Provides resources and services."
  }
};

const labInfo = document.getElementById("labInfo");
const labStatus = document.getElementById("labStatus");

document.querySelectorAll(".lab-device").forEach(device => {
  device.addEventListener("click", () => {
    const id = device.dataset.lab;
    const info = labDevices[id];

    document.querySelectorAll(".lab-device")
      .forEach(item => item.classList.remove("selected"));

    device.classList.add("selected");

    labInfo.innerHTML = `
      <h3>${info.name}</h3>
      <p>Device ID: ${id}</p>
      <p>IP Address: ${info.ip}</p>
      <p>Function: ${info.role}</p>
    `;

    labStatus.textContent = id + " selected successfully.";
  });
});

document.getElementById("testNetwork")
  .addEventListener("click", () => {
    labStatus.textContent =
      "Testing virtual network connections...";

    setTimeout(() => {
      labStatus.textContent =
        "✓ Simulation successful! All four virtual devices are connected.";
    }, 1200);
  });

document.getElementById("resetLab")
  .addEventListener("click", () => {
    document.querySelectorAll(".lab-device")
      .forEach(item => item.classList.remove("selected"));

    labInfo.innerHTML = `
      <h3>Welcome to the laboratory!</h3>
      <p>Select a device to inspect it.</p>
    `;

    labStatus.textContent = "Laboratory reset successfully.";
  });

// VERSION 1.0 ROOM CONTROLS

const room = document.querySelector(".room");
const roomMessage = document.getElementById("roomMessage");
const roomInformation = document.getElementById("roomInformation");

let roomX = 0;
let roomY = 0;

function moveRoom(direction) {
  if (direction === "left") roomX -= 15;
  if (direction === "right") roomX += 15;
  if (direction === "forward") roomY -= 15;
  if (direction === "back") roomY += 15;

  roomX = Math.max(-60, Math.min(60, roomX));
  roomY = Math.max(-45, Math.min(45, roomY));

  document.querySelector(".room-wall").style.transform =
    `translate(${roomX}px, ${roomY}px) rotateX(2deg)`;

  roomMessage.textContent = "You moved around the virtual room.";
}

document.getElementById("moveLeft")
  .addEventListener("click", () => moveRoom("left"));

document.getElementById("moveRight")
  .addEventListener("click", () => moveRoom("right"));

document.getElementById("moveForward")
  .addEventListener("click", () => moveRoom("forward"));

document.getElementById("moveBack")
  .addEventListener("click", () => moveRoom("back"));

const roomDescriptions = {
  computer: "A computer sends and receives information across the network.",
  router: "A router forwards data between different networks.",
  switch: "A switch connects devices within a local network.",
  server: "A server provides resources and services to other devices."
};

document.querySelectorAll("[data-room]").forEach(device => {
  device.addEventListener("click", () => {
    const name = device.dataset.room;

    roomInformation.textContent =
      name.toUpperCase() + ": " + roomDescriptions[name];

    roomMessage.textContent = "Device selected successfully.";
  });
});

// Keyboard movement: arrow keys
document.addEventListener("keydown", event => {
  if (event.target.matches("input, textarea, button")) return;

  const keys = {
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowUp: "forward",
    ArrowDown: "back"
  };

  if (keys[event.key]) {
    event.preventDefault();
    moveRoom(keys[event.key]);
  }
});
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");
const runCommand = document.getElementById("runCommand");

function printTerminal(message, className = "") {
  const line = document.createElement("p");
  line.className = "terminal-line " + className;
  line.textContent = message;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function executeCommand() {
  const command = terminalInput.value.trim().toLowerCase();

  if (!command) return;

  printTerminal("student@network:~$ " + command);

  if (command === "help") {
    printTerminal("hostname - Display computer name");
printTerminal("arp -a - Display ARP table");
printTerminal("netstat - Display network connections");
printTerminal("nslookup example.com - DNS lookup");
printTerminal("tracert 192.168.1.20 - Trace network route");
printTerminal("show devices - Display network devices");
    printTerminal("Available commands:");
    printTerminal("help - Show available commands");
    printTerminal("ipconfig - Display computer IP information");
    printTerminal("ping 192.168.1.20 - Test a simulated server connection");
    printTerminal("ping 192.168.1.1 - Test a simulated router connection");
    printTerminal("clear - Clear the terminal");
  }

  else if (command === "ipconfig") {
    printTerminal("Network Adapter: Ethernet");
    printTerminal("IPv4 Address: 192.168.1.10");
    printTerminal("Subnet Mask: 255.255.255.0");
    printTerminal("Default Gateway: 192.168.1.1");
  }

  else if (command === "ping 192.168.1.20") {
    printTerminal("Pinging server 192.168.1.20...");
    printTerminal("Reply from 192.168.1.20: bytes=32 time=2ms");
    printTerminal("Reply from 192.168.1.20: bytes=32 time=3ms");
    printTerminal("Simulated connection successful!");
  }

  else if (command === "ping 192.168.1.1") {
    printTerminal("Pinging router 192.168.1.1...");
    printTerminal("Reply from 192.168.1.1: bytes=32 time=1ms");
    printTerminal("Simulated connection successful!");
  }

  else if (command === "clear") {
    terminalOutput.innerHTML = "";
  }

  
else if (command === "hostname") {
  printTerminal("Computer Name: VR-STUDENT-PC");
}

else if (command === "arp -a") {
  printTerminal("Interface: 192.168.1.10");
  printTerminal("192.168.1.1    00-AA-BB-CC-DD-01");
  printTerminal("192.168.1.20   00-AA-BB-CC-DD-02");
  printTerminal("ARP table displayed successfully.");
}

else if (command === "netstat") {
  printTerminal("Active Network Connections:");
  printTerminal("TCP 192.168.1.10:443 ESTABLISHED");
  printTerminal("TCP 192.168.1.10:80 ESTABLISHED");
  printTerminal("Connection information displayed.");
}

else if (command === "nslookup example.com") {
  printTerminal("Server: Simulated DNS Server");
  printTerminal("Name: example.com");
  printTerminal("Address: 93.184.216.34");
  printTerminal("DNS lookup completed.");
}

else if (command === "tracert 192.168.1.20") {
  printTerminal("Tracing route to 192.168.1.20");
  printTerminal("1    1 ms    192.168.1.1");
  printTerminal("2    2 ms    192.168.1.20");
  printTerminal("Trace completed successfully.");
}

else if (command === "show devices") {
  printTerminal("CONNECTED NETWORK DEVICES:");
  printTerminal("PC-01      192.168.1.10");
  printTerminal("ROUTER     192.168.1.1");
  printTerminal("SWITCH     192.168.1.2");
  printTerminal("SERVER     192.168.1.20");
}

else {
  printTerminal(
    "Unknown command. Type help to see available commands.",
    "terminal-error"
  );
}


  terminalInput.value = "";
  terminalInput.focus();
}
console.log("Run button:", runCommand);
runCommand.onclick = executeCommand;

terminalInput.onkeydown = function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    executeCommand();
  }
};

// VERSION 1.3 - NETWORK TOPOLOGY BUILDER

const builderNodes = document.getElementById("builderNodes");
const topologyLines = document.getElementById("topologyLines");
const builderStatus = document.getElementById("builderStatus");
const builderConnections = document.getElementById("builderConnections");

let networkDevices = [];
let networkLinks = [];
let selectedDevices = [];
let deviceCounter = 0;

const deviceIcons = {
  Computer: "💻",
  Router: "📡",
  Switch: "🔀",
  Server: "🖥️"
};

document.getElementById("addBuilderDevice").onclick = function () {
  const type = document.getElementById("builderDeviceType").value;

  deviceCounter++;

  const device = {
    id: deviceCounter,
    type: type,
    name: type + "-" + String(deviceCounter).padStart(2, "0"),
    x: 12 + (networkDevices.length % 5) * 19,
    y: 20 + Math.floor(networkDevices.length / 5) * 35
  };

  networkDevices.push(device);
  drawNetwork();

  builderStatus.textContent = device.name + " added successfully.";
};

function drawNetwork() {
  builderNodes.innerHTML = "";
  topologyLines.innerHTML = "";

  networkDevices.forEach(device => {
    const node = document.createElement("button");
    node.className = "builder-node";
    node.style.left = device.x + "%";
    node.style.top = device.y + "%";

    if (selectedDevices.includes(device.id)) {
      node.classList.add("selected");
    }

    node.innerHTML =
      "<span>" + deviceIcons[device.type] + "</span>" +
      device.name;

    node.onclick = function () {
      selectBuilderDevice(device.id);
    };

    builderNodes.appendChild(node);
  });

  networkLinks.forEach(link => {
    const first = networkDevices.find(d => d.id === link.from);
    const second = networkDevices.find(d => d.id === link.to);

    if (!first || !second) return;

    const line = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );

    line.setAttribute("x1", first.x + "%");
    line.setAttribute("y1", first.y + "%");
    line.setAttribute("x2", second.x + "%");
    line.setAttribute("y2", second.y + "%");
    line.setAttribute("class", "topology-line");

    topologyLines.appendChild(line);
  });

  updateBuilderConnections();
}

function selectBuilderDevice(id) {
  if (selectedDevices.includes(id)) {
    selectedDevices = selectedDevices.filter(item => item !== id);
  } else if (selectedDevices.length < 2) {
    selectedDevices.push(id);
  } else {
    selectedDevices = [id];
  }

  drawNetwork();

  if (selectedDevices.length === 1) {
    builderStatus.textContent = "Select a second device.";
  } else if (selectedDevices.length === 2) {
    builderStatus.textContent = "Two devices selected. Click Connect Selected.";
  } else {
    builderStatus.textContent = "Selection cleared.";
  }
}

document.getElementById("connectBuilderDevices").onclick = function () {
  if (selectedDevices.length !== 2) {
    builderStatus.textContent = "Please select two devices first.";
    return;
  }

  const [first, second] = selectedDevices;

  const alreadyConnected = networkLinks.some(link =>
    (link.from === first && link.to === second) ||
    (link.from === second && link.to === first)
  );

  if (alreadyConnected) {
    builderStatus.textContent = "These devices are already connected.";
    return;
  }

  networkLinks.push({ from: first, to: second });
  selectedDevices = [];

  drawNetwork();
  builderStatus.textContent = "Connection created successfully!";
};

function updateBuilderConnections() {
  builderConnections.innerHTML = "";

  if (networkLinks.length === 0) {
    builderConnections.innerHTML = "<li>No connections yet.</li>";
    return;
  }

  networkLinks.forEach(link => {
    const first = networkDevices.find(d => d.id === link.from);
    const second = networkDevices.find(d => d.id === link.to);

    if (!first || !second) return;

    const item = document.createElement("li");
    item.textContent = first.name + " ↔ " + second.name;
    builderConnections.appendChild(item);
  });
}

document.getElementById("clearBuilder").onclick = function () {
  networkDevices = [];
  networkLinks = [];
  selectedDevices = [];
  deviceCounter = 0;

  drawNetwork();
  builderStatus.textContent = "Network reset. Start building again.";
};

// VERSION 1.4 - CONNECTIVITY SIMULATOR

const sourceDevice = document.getElementById("sourceDevice");
const destinationDevice = document.getElementById("destinationDevice");
const simulationResult = document.getElementById("simulationResult");
const simulationRoute = document.getElementById("simulationRoute");

function updateSimulationDevices() {
  const previousSource = sourceDevice.value;
  const previousDestination = destinationDevice.value;

  sourceDevice.innerHTML = "";
  destinationDevice.innerHTML = "";

  networkDevices.forEach(device => {
    const option1 = document.createElement("option");
    option1.value = device.id;
    option1.textContent = device.name;

    const option2 = option1.cloneNode(true);

    sourceDevice.appendChild(option1);
    destinationDevice.appendChild(option2);
  });

  if (networkDevices.some(d => String(d.id) === previousSource)) {
    sourceDevice.value = previousSource;
  }

  if (networkDevices.some(d => String(d.id) === previousDestination)) {
    destinationDevice.value = previousDestination;
  }

  if (networkDevices.length > 1 &&
      sourceDevice.value === destinationDevice.value) {
    destinationDevice.selectedIndex = 1;
  }
}

// Find a path using the network connections.
function findNetworkRoute(startId, endId) {
  const queue = [[startId]];
  const visited = new Set([startId]);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    if (current === endId) {
      return path;
    }

    const neighbors = [];

    networkLinks.forEach(link => {
      if (link.from === current) neighbors.push(link.to);
      if (link.to === current) neighbors.push(link.from);
    });

    neighbors.forEach(neighbor => {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    });
  }

  return null;
}

function displayNetworkRoute(route) {
  simulationRoute.innerHTML = "";

  route.forEach((id, index) => {
    const device = networkDevices.find(d => d.id === id);
    if (!device) return;

    const node = document.createElement("span");
    node.className = "route-device";
    node.textContent = device.name;

    simulationRoute.appendChild(node);

    if (index < route.length - 1) {
      const arrow = document.createElement("span");
      arrow.className = "route-arrow";
      arrow.textContent = "→";
      simulationRoute.appendChild(arrow);
    }
  });
}

document.getElementById("testConnectivity").onclick = function () {
  const startId = Number(sourceDevice.value);
  const endId = Number(destinationDevice.value);

  if (!startId || !endId) {
    simulationResult.innerHTML =
      '<span class="simulation-failure">Add at least two devices first.</span>';
    simulationRoute.textContent = "No route available.";
    return;
  }

  if (startId === endId) {
    simulationResult.innerHTML =
      '<span class="simulation-failure">Choose two different devices.</span>';
    simulationRoute.textContent = "No route tested.";
    return;
  }

  const route = findNetworkRoute(startId, endId);

  if (route) {
    const hops = route.length - 1;

    simulationResult.innerHTML =
      '<span class="simulation-success">CONNECTION SUCCESSFUL!</span><br>' +
      "The devices can communicate.<br>" +
      "Number of links crossed: " + hops + "<br>" +
      "Status: Destination reachable.";

    displayNetworkRoute(route);
  } else {
    simulationResult.innerHTML =
      '<span class="simulation-failure">CONNECTION FAILED!</span><br>' +
      "No connected path exists between these devices.<br>" +
      "Check the network cables and connections.";

    simulationRoute.textContent = "Destination unreachable.";
  }
};

document.getElementById("clearSimulation").onclick = function () {
  simulationResult.textContent = "Waiting for a connectivity test...";
  simulationRoute.textContent = "No route tested yet.";
};

// Keep device selections updated when the topology changes.
const originalDrawNetwork = drawNetwork;

drawNetwork = function () {
  originalDrawNetwork();
  updateSimulationDevices();
};

updateSimulationDevices();

// VERSION 1.5 - ANIMATED DATA PACKET SIMULATOR

const sendPacketButton = document.getElementById("sendPacket");
const packetStatus = document.getElementById("packetStatus");

let packetRunning = false;
let packetAnimationFrame = null;

function animateDataPacket(route) {
  const svg = document.getElementById("topologyLines");

  const packet = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  packet.setAttribute("r", "1.5");
  packet.setAttribute("class", "packet-dot");

  svg.appendChild(packet);
  packet.setAttribute("cx", "20");
packet.setAttribute("cy", "20");
packet.setAttribute("r", "9");

  let currentStep = 0;
  const duration = 700;

  function animateSegment() {
    if (currentStep >= route.length - 1) {
      packet.remove();

      packetRunning = false;
      sendPacketButton.disabled = false;

      packetStatus.textContent =
        "✓ DATA DELIVERED SUCCESSFULLY! Destination reached.";
        packetStats.delivered++;
updatePacketDashboard();

      return;
    }

    const start = networkDevices.find(
      device => device.id === route[currentStep]
    );

    const end = networkDevices.find(
      device => device.id === route[currentStep + 1]
    );

    if (!start || !end) {
      packet.remove();
      packetRunning = false;
      sendPacketButton.disabled = false;
      packetStatus.textContent = "Packet transmission interrupted.";
      return;
    }

    const startTime = performance.now();

    function movePacket(now) {
      const progress = Math.min(
        (now - startTime) / duration,
        1
      );

      const x = start.x + (end.x - start.x) * progress;
      const y = start.y + (end.y - start.y) * progress;

      const canvas = document.getElementById("builderCanvas");

const pixelX = (x / 100) * canvas.clientWidth;
const pixelY = (y / 100) * canvas.clientHeight;

packet.setAttribute("cx", pixelX);
packet.setAttribute("cy", pixelY);
      packetStatus.textContent =
        "Transmitting packet... " +
        Math.round(
          ((currentStep + progress) / (route.length - 1)) * 100
        ) + "%";

      if (progress < 1) {
        packetAnimationFrame = requestAnimationFrame(movePacket);
      } else {
        currentStep++;
        animateSegment();
      }
    }

    packetAnimationFrame = requestAnimationFrame(movePacket);
  }

  animateSegment();
}


// VERSION 1.6 - FIXED NETWORK MONITOR

let packetStats = {
  sent: 0,
  delivered: 0,
  lost: 0,
  latency: 0
};

function updatePacketDashboard() {
  document.getElementById("packetsSent").textContent =
    packetStats.sent;

  document.getElementById("packetsDelivered").textContent =
    packetStats.delivered;

  document.getElementById("packetsLost").textContent =
    packetStats.lost;

  document.getElementById("networkLatency").textContent =
    packetStats.latency + " ms";
}

// SINGLE PACKET TRANSMISSION HANDLER
sendPacketButton.onclick = function () {
  if (packetRunning) return;

  const startId = Number(sourceDevice.value);
  const endId = Number(destinationDevice.value);

  if (!startId || !endId || startId === endId) {
    packetStatus.textContent = "Select two different devices.";
    return;
  }

  const route = findNetworkRoute(startId, endId);

  packetStats.sent++;

  if (!route) {
    packetStats.lost++;
    packetStats.latency = 0;

    packetStatus.textContent = "Packet lost: no connection!";

    updatePacketDashboard();
    return;
  }

  const lossEnabled =
    document.getElementById("simulatePacketLoss").checked;

  if (lossEnabled && Math.random() < 0.3) {
    packetStats.lost++;
    packetStats.latency = 0;

    packetStatus.textContent = "Packet lost! Try sending again.";

    updatePacketDashboard();
    return;
  }

  packetStats.latency = (route.length - 1) * 700;

  updatePacketDashboard();

  packetRunning = true;
  sendPacketButton.disabled = true;

  packetStatus.textContent = "Sending packet...";

  animateDataPacket(route);
};

// RESET STATISTICS
document.getElementById("resetStatistics").onclick = function () {
  if (packetRunning) {
    packetStatus.textContent =
      "Wait for the current packet transmission to finish.";
    return;
  }

  packetStats = {
    sent: 0,
    delivered: 0,
    lost: 0,
    latency: 0
  };

  updatePacketDashboard();

  packetStatus.textContent =
    "Statistics reset. Ready to send data.";
};

updatePacketDashboard();

console.log("Version 1.6 Network Monitor Ready!");
