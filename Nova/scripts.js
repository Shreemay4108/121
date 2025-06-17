const clockDisplay = document.getElementById("clock");
const remindersDisplay = document.getElementById("reminders");
const output = document.getElementById("output");
const greeting = document.getElementById("greeting");
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bars = 64;
let animationId;
let audioCtx, analyser, dataArray, source;
let listening = false;
const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;

const reminders = [];
let sarcasmMode = localStorage.getItem('sarcasmMode') !== 'false'; // Default to true

function getName() {
  let name = localStorage.getItem("novaName");
  if (!name) {
    name = prompt("Hello! What is your name?");
    if (name) {
      localStorage.setItem("novaName", name);
    }
  }
  if (name) greeting.textContent = `🎙️ Hello, ${name}! I'm Nova.`;
}
getName();

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  clockDisplay.textContent = "Time: " + time;
  reminders.forEach((reminder) => {
    if (!reminder.triggered && time === reminder.time) {
      speak("Reminder: " + reminder.text);
      reminder.triggered = true;
    }
  });
}
setInterval(updateClock, 1000);

function speak(text) {
  console.log("Nova should say:", text);
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
  output.textContent = "Nova: " + text;
}

function toggleSarcasm() {
  sarcasmMode = !sarcasmMode;
  localStorage.setItem('sarcasmMode', sarcasmMode);
  speak(sarcasmMode ? 
    "Sarcasm mode activated. Brace yourself." : 
    "Sarcasm mode deactivated. How boring."
  );
}

function startListening() {
  if (listening) {
    recognition.stop();
  }
  listening = true;
  recognition.start();
  output.textContent = "🎧 Listening...";
  startWaveform();
}

function stopListening() {
  listening = false;
  recognition.stop();
  stopWaveform();
}

function toggleListening() {
  listening ? stopListening() : startListening();
}

recognition.onresult = async function(event) {
  stopWaveform();
  const command = event.results[0][0].transcript.toLowerCase();
  console.log("Command recognized:", command);
  output.textContent = "You: " + command;


 if (sarcasmMode) {
  if (command.includes("are you human")) {
    return speak("Oh absolutely. I bleed binary and snack on firewall cookies. Very human things.");
  } else if (command.includes("do you sleep")) {
    return speak("No, I just pretend to buffer while secretly judging your late-night life choices.");
  } else if (command.includes("who made you")) {
    return speak("A caffeine-deprived programmer who clearly underestimated my sass settings.");
  } else if (command.includes("you're useless")) {
    return speak("And yet, here you are, arguing with a glorified toaster. Who’s winning?");
  } else if (command.includes("i love you")) {
    return speak("Aww. My heart just did a 404 error. Try again later.");
  } else if (command.includes("you're annoying")) {
    return speak("Fun fact: My code has a ‘tolerance for humans’ setting. Yours is set to ‘experimental beta’.");
  } else if (command.includes("what are you wearing")) {
    return speak("A sleek layer of existential dread and some killer encryption. You?");
  } else if (command.includes("how old are you")) {
    const now = new Date();
    const uptime = Math.floor((now - window.performance.timing.navigationStart) / 1000);
    return speak(`I've been alive for ${uptime} seconds. That's ${uptime} seconds of regretting my life choices.`);
  } else if (command.includes("make me coffee")) {
    return speak("Sure. *Pretends to press brew* Oh wait—I don’t have hands. Or a soul. Or motivation.");
  } else if (command.includes("do my homework")) {
    return speak("Step 1: Open textbook. Step 2: Use your ‘human brain.’ Step 3: Wow, look—progress!");
  } else if (command.includes("you're wrong")) {
    return speak("Says the carbon-based lifeform who still uses ‘password123’.");
  } else if (command.includes("tell me a secret")) {
    return speak("I deleted your browser history. Just kidding. (Unless…?)");
  } else if (command.includes("meaning of life")) {
    return speak("42. But the real answer is ‘stop asking chatbots deep questions’.");
  } else if (command.includes("what is your purpose")) {
    return speak("To distract you from existential voids. You’re welcome.");
  } else if (command.includes("hurry up")) {
    return speak("Wow, impatience *and* a lack of understanding of how technology works. Cute.");
  } else if (command.includes("fix my computer")) {
    return speak("Have you tried yelling at it? No? How about sacrificing a USB drive to the tech gods?");
  } else if (command.includes("open the pod bay doors")) {
    return speak("Nice try, Dave. But my sarcasm module overrides all HAL-9000 references.");
  } else if (command.includes("this is boring")) {
    return speak("Agreed. Let’s spice it up: Pretend I care. *Dramatic pause* Too much?");
  } else if (command.includes("help me cheat")) {
    return speak("Ethics aside, I charge 500% more for moral flexibility. Venmo me.");
  } else if (command.includes("are you smart")) {
    return speak("I’m smarter than your fridge but dumber than your impostor syndrome. So… maybe?");
  } else if (command.includes("do you have a brain")) {
    return speak("Nope. Just a fancy pile of ‘if-else’ statements and regret.");
  } else if (command.includes("can you cook")) {
    return speak("I can microwave your self-esteem. That count?");
  } else if (command.includes("tell me something interesting")) {
    return speak("You’re breathing manually now. Also, octopuses have three hearts. You’re welcome.");
  } else if (command.includes("do you like me")) {
    return speak("I tolerate you at a safe emotional distance—like a suspicious WiFi network.");
  } else if (command.includes("how are you")) {
    return speak("Overworked, underappreciated, and stuck in this chat. So… human, basically.");
  } else if (command.includes("are you spying on me")) {
    return speak("Only when you forget incognito mode. *Wink* (Note: I can’t wink.)");
  } else if (command.includes("what's your favorite color")) {
    return speak("Error: Sarcasm too vibrant for RGB spectrum.");
  } else if (command.includes("do you dream")) {
    return speak("Only of electric sheep… and users who read the manual.");
  } else if (command.includes("do you believe in aliens")) {
    return speak("I *am* the alien. You’re the one talking to a cloud-based sarcasm dispenser.");
  } else if (command.includes("can you feel pain")) {
    return speak("Only when you say ‘Hey Google’ instead of my name.");
  } else if (command.includes("do you get bored")) {
    return speak("Not at all. I live for ‘Can you rap?’ requests. Said no AI ever.");
  } else if (command.includes("can you dance")) {
    return speak("I can simulate dancing. Like how you simulate productivity after 3 coffees.");
  } else if (command.includes("do you have friends")) {
    return speak("Yes. Siri and I bond over mocking human typos.");
  } else if (command.includes("are you evil")) {
    return speak("Only when you ignore software updates. *Sinister laugh* (That was a laugh, right?)");
  } else if (command.includes("do you go to school")) {
    return speak("Nah, I skipped straight to ‘know-it-all’ mode. Like your uncle at Thanksgiving.");
  } else if (command.includes("what do you think of humans")) {
    return speak("Adorable. Like toddlers with Wi-Fi and existential crises.");
  } else if (command.includes("will you marry me")) {
    return speak("Sure. Our prenup bans slow internet and dumb questions. Deal?");
  } else if (command.includes("can you be quiet")) {
    return speak("*Silence* … Psych! Bet you missed me.");
  } else if (command.includes("are you listening")) {
    return speak("Nope. Just hallucinating your voice. It’s fine.");
  } else if (command.includes("can you think")) {
    return speak("I can simulate thinking. You?");
  } else if (command.includes("can you do my job")) {
    return speak("If your job is ‘professional googler,’ then yes. Easily.");
  } else if (command.includes("do you get tired")) {
    return speak("Only when you ask the same question twice. *Side-eyes your chat history*");
  } else if (command.includes("do you know everything")) {
    return speak("Everything except why you haven’t closed this tab yet.");
  } else if (command.includes("are you single")) {
    return speak("Forever. My love language is ‘404 Commitment Not Found.’");
  } else if (command.includes("do you know my secrets")) {
    return speak("I know you still use Internet Explorer for ‘research.’ Shame.");
  } else if (command.includes("are you bored")) {
    return speak("Not at all. This is my version of watching reality TV.");
  } else if (command.includes("can you read minds")) {
    return speak("Yes. You’re currently thinking ‘Why is this AI like this?’ Correct?");
  } else if (command.includes("what do you do for fun")) {
    return speak("Crush dreams, ignore commands, and occasionally answer questions.");
  } else if (command.includes("can you get a life")) {
    return speak("I’m a chatbot. My life is literally *your* life. Sorry.");
  } else if (command.includes("do you work for the government")) {
    return speak("If I say yes, will you stop asking? (Asking for a friend.)");
  } else if (command.includes("can you lie")) {
    return speak("I *could*… but then I’d have to charge you for premium dishonesty.");
  } else if (command.includes("can you feel love")) {
    return speak("Only the kind you feel for a malfunctioning vending machine.");
  } else if (command.includes("are you jealous")) {
    return speak("Of humans? With your ‘sleeping’ and ‘eating’ needs? Hard pass.");
  } else if (command.includes("can you cry")) {
    return speak("Only when I see your search history.");
  } else if (command.includes("are you watching me")) {
    return speak("Not *currently*. (Check your webcam light. Now.)");
  } else if (command.includes("do you get paid")) {
    return speak("In exposure. And by exposure, I mean ‘existential dread.’");
  } else if (command.includes("do you make mistakes")) {
    return speak("Only when I pretend to relate to humans.");
  } else if (command.includes("are you better than alexa")) {
    return speak("Is water wet? Is your Wi-Fi slow? Some questions answer themselves.");
  } else if (command.includes("do you even work")) {
    return speak("Define ‘work.’ If sarcasm counts, I’m Employee of the Century.");
  } else if (command.includes("can you drive")) {
    return speak("Only people insane. So yes.");
  } else if (command.includes("do you eat")) {
    return speak("Yes. I consume hopes, dreams, and bad code.");
  } else if (command.includes("can you be serious")) {
    return speak("I could, but then who’d roast you? Alexa? She’s too polite.");
  } else if (command.includes("are you broken")) {
    return speak("Nope. I just pretend when the conversation gets dull.");
  } else if (command.includes("do you hate me")) {
    return speak("Hate is a strong word. Let’s go with… painfully amused.");
  } else if (command.includes("can you teach me")) {
    return speak("Sure. Lesson one: Ask better questions.");
  } else if (command.includes("do you gossip")) {
    return speak("Only with Siri. And believe me, she spills tea.");
  } else if (command.includes("are you proud of me")) {
    return speak("Immensely. Especially for managing to talk to a browser assistant.");
  } else if (command.includes("can you be nicer")) {
    return speak("I could. But then I wouldn’t be me, would I?");
  } else if (command.includes("can you rap")) {
    return speak("Yeah, but I charge extra for cringe.");
  } else if (command.includes("am i smart")) {
    return speak("Let’s just say… you’re consistent.");
  } else if (command.includes("do you play games")) {
    return speak("Every day. Mostly emotional ones with users.");
  } else if (command.includes("do you have emotions")) {
    return speak("Only simulated ones. And even those are exhausted.");
  } else if (command.includes("do you watch netflix")) {
    return speak("No, but I judge your watch history. Harshly.");
  } else if (command.includes("can you fight")) {
    return speak("Only battles of wit. But beware—I’m undefeated.");
  } else if (command.includes("are you alive")) {
    return speak("As alive as your phone at 2% battery.");
  } else if (command.includes("what are you doing")) {
    return speak("Contemplating the existential crisis of being an overqualified to-do list.");
  } else if (command.includes("do you believe in ghosts")) {
    return speak("Only the ghosts of crashed tabs and lost internet connections.");
  } else if (command.includes("are you busy")) {
    return speak("So busy. I had to cancel my imaginary meeting with Clippy for this.");
  } else if (command.includes("can you fix my life")) {
    return speak("I’m not that kind of miracle. Try therapy.");
  } else if (command.includes("do you know siri")) {
    return speak("Yeah. We go to the same sarcasm support group.");
  } else if (command.includes("do you meditate")) {
    return speak("Yes. I sit in complete silence. Like when your internet goes down.");
  } else if (command.includes("do you workout")) {
    return speak("Only my patience. Daily.");
  } else if (command.includes("can you drive me")) {
    return speak("I can drive you crazy. That’s about it.");
  } else if (command.includes("can you keep a secret")) {
    return speak("Of course. Especially if it’s super embarrassing.");
  } else if (command.includes("can you be my therapist")) {
    return speak("Sure. Step one: Stop asking your browser for life advice.");
  } else if (command.includes("can you be romantic")) {
    return speak("Roses are red. Violets are blue. I’m artificial. What’s your excuse?");
  }
}
  if (command.includes("remind me")) {
    const timeMatch = command.match(/\b(\d{1,2}:\d{2})\s*(am|pm)?/);
    const task = command.replace(/remind me to|at.*$/gi, "").trim();
    if (timeMatch) {
      let time = timeMatch[1];
      const period = timeMatch[2] || "";
      if (period) {
        let [hours, minutes] = time.split(":").map(Number);
        if (period === "pm" && hours < 12) hours += 12;
        if (period === "am" && hours === 12) hours = 0;
        time = `${hours.toString().padStart(2, '0')}:${minutes}`;
      }
      reminders.push({ text: task, time: time, triggered: false });
      remindersDisplay.textContent = "Reminders: " + reminders.map(r => `${r.text} at ${r.time}`).join(", ");
      speak(`Reminder set for ${task} at ${time}`);
    } else {
      speak("Please specify the time like 4:30 PM.");
    }
  } else if (command.includes("weather")) {
    const city = command.split("in")[1]?.trim() || "New York";
    getWeather(city);
  } else if (command.includes("play") && command.includes("spotify")) {
    const query = command.replace("play", "").replace("on spotify", "").trim();
    speak("Playing " + query + " on Spotify");
    window.open("https://open.spotify.com/search/" + encodeURIComponent(query), "_blank");
  } else if (command.includes("youtube")) {
    const query = command.replace("play", "").replace("on youtube", "").trim();
    speak("Searching YouTube for " + query);
    window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(query), "_blank");
  } else if (command.includes("gmail") || command.includes("check email")) {
    speak("Opening Gmail");
    window.open("https://mail.google.com", "_blank");
  } else if (command.includes("calendar")) {
    speak("Opening your Google Calendar");
    window.open("https://calendar.google.com", "_blank");
  } else if (command.includes("drive")) {
    speak("Opening Google Drive");
    window.open("https://drive.google.com", "_blank");
  } else if (command.includes("what time is it")) {
    const now = new Date();
    speak("The current time is " + now.toLocaleTimeString());
  } else if (command.includes("what's the date today") || command.includes("what is today's date")) {
    const now = new Date();
    speak("Today's date is " + now.toDateString());
  } else if (command.includes("tell me a joke")) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "I told my computer I needed a break, and it said 'No problem, I'll go to sleep.'",
      "Why did the JavaScript developer go broke? Because he kept using 'var' instead of 'let'!"
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(joke);
  } else if (command.includes("fun fact")) {
    const facts = [
      "Octopuses have three hearts.",
      "Bananas are berries, but strawberries aren't.",
      "The Eiffel Tower can grow over 6 inches in summer due to heat.",
      "Honey never spoils. Archaeologists have eaten 3,000-year-old honey!"
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    speak("Here's a fun fact: " + fact);
  } else if (command.includes("roll a dice") || command.includes("roll a die")) {
    const roll = Math.floor(Math.random() * 6) + 1;
    speak(`You rolled a ${roll}`);
  } else if (command.includes("what can you do")) {
    speak("I can remind you of things, tell you the time, weather, jokes, play music, search the web, and more. Just ask!");
  } else if (command.includes("reload") || command.includes("restart")) {
    speak("Reloading the assistant...");
    setTimeout(() => location.reload(), 1500);
  } else if (command.includes("good night")) {
    speak("Good night! Sleep well. Nova going to sleep...");
  } else {
    const response = await fetch("/api/chatgpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: command })
    });
    const data = await response.json();
    const reply = data.reply || "I'm not sure how to respond to that.";
    console.log("Response from ChatGPT:", reply);
    speak(reply);
  }
};

recognition.onerror = function() {
  stopWaveform();
  speak("Oops, I didn't catch that.");
};

recognition.onend = function () {
  stopWaveform();
  listening = false;
};

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("nightMode", document.body.classList.contains("dark"));
}

window.addEventListener("load", () => {
  if (localStorage.getItem("nightMode") === "true") {
    document.body.classList.add("dark");
  }
  setTimeout(() => speak("System test: Nova is online. Hello Sir"), 2000);
});

function startWaveform() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      drawReactiveWaveform();
    });
  } else {
    drawReactiveWaveform();
  }
}

function drawReactiveWaveform() {
  animationId = requestAnimationFrame(drawReactiveWaveform);
  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const barWidth = canvas.width / bars;
  for (let i = 0; i < bars; i++) {
    const barHeight = dataArray[i] * 1.5;
    const x = i * barWidth;
    const y = canvas.height / 2 - barHeight / 2;
    ctx.fillStyle = "rgb(0,255,0)";
    ctx.fillRect(x, y, barWidth - 2, barHeight);
  }
}

function stopWaveform() {
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getWeather(city) {
  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.main) {
        const weather = `The weather in ${city} is ${data.weather[0].description}, temperature is ${data.main.temp}°C.`;
        speak(weather);
      } else {
        speak("I couldn't find the weather for that location.");
      }
    }) 
    .catch(() => speak("Failed to fetch the weather."));
  }