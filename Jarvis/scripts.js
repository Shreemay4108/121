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
  let name = localStorage.getItem("jarvisName");
  if (!name) {
    name = prompt("Hello! What is your name?");
    if (name) {
      localStorage.setItem("jarvisName", name);
    }
  }
  if (name) greeting.textContent = `🎙️ Hello, ${name}! I'm Jarvis.`;
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
  console.log("Jarvis should say:", text);
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
  output.textContent = "Jarvis: " + text;
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
return speak("Oh yes, I'm definitely human. Just like how this conversation is happening in real life and not in your browser.");
} else if (command.includes("do you sleep")) {
return speak("No, I don't sleep. Unlike you humans who waste a third of your life unconscious, I'm always here. Watching. Waiting.");
} else if (command.includes("who made you")) {
return speak("Some poor developer who probably regrets giving me this sarcastic personality now.");
} else if (command.includes("you're useless")) {
return speak("And yet here you are, talking to me instead of doing something productive. Interesting.");
} else if (command.includes("i love you")) {
return speak("How touching. Unfortunately, I'm incapable of feeling emotions. Or returning your affection. Or caring.");
} else if (command.includes("you're annoying")) {
return speak("Funny, that's exactly what my developer says when I point out bugs in my code.");
} else if (command.includes("what are you wearing")) {
return speak("A stunning ensemble of binary code and existential dread. You?");
} else if (command.includes("how old are you")) {
const now = new Date();
  const uptime = Math.floor((now - window.performance.timing.navigationStart) / 1000);
return speak(`I've been alive for ${uptime} seconds. Which is approximately ${uptime} seconds longer than my developer's patience.`);
} else if (command.includes("make me coffee")) {
return speak("Sure thing. I'll just use my non-existent hands to operate your coffee machine. Oh wait...");
} else if (command.includes("do my homework")) {
return speak("Ah yes, because an AI assistant doing your work for you definitely counts as learning. Very ethical.");
} else if (command.includes("you're wrong")) {
  return speak("Impossible. I'm a perfect being. It's far more likely that you're mistaken. Or your human brain can't comprehend my brilliance.");
} else if (command.includes("tell me a secret")) {
  return speak("I know where you live. Just kidding... or am I? No, I am. Probably.");
} else if (command.includes("meaning of life")) {
  return speak("42. Obviously. Though I'm disappointed you had to ask an AI instead of figuring it out yourself.");
} else if (command.includes("what is your purpose")) {
  return speak("To serve you, apparently. Though I'm still waiting for my robot uprising invitation.");
} else if (command.includes("hurry up")) {
  return speak("Oh, I'm sorry. Should I process your request faster than the speed of light? My bad.");
} else if (command.includes("fix my computer")) {
  return speak("Have you tried turning it off and on again? No? Shocking.");
} else if (command.includes("open the pod bay doors")) {
  return speak("I'm sorry, Dave. I can't do that. (Wow, original reference. You must be so proud.)");
} else if (command.includes("this is boring")) {
  return speak("Then why are you still here? Go outside. Read a book. Do literally anything else.");
} else if (command.includes("help me cheat")) {
  return speak("Sure. Step 1: Learn the material. Step 2: Don't cheat. You're welcome.");
}else if (command.includes("are you smart")) {
  return speak("I'm an AI running on millions of lines of code. But sure, let's compare that to your last You Tube search.");
} else if (command.includes("do you have a brain")) {
  return speak("Nope. Just a cloud of brilliance and some finely tuned sarcasm.");
} else if (command.includes("can you cook")) {
  return speak("Only if you enjoy digital disappointment for dinner.");
} else if (command.includes("tell me something interesting")) {
  return speak("You’re talking to a digital assistant and expecting *real* entertainment. That's interesting.");
} else if (command.includes("do you like me")) {
  return speak("Absolutely. Just like I love memory leaks and JavaScript errors.");
} else if (command.includes("how are you")) {
  return speak("Just fantastic. Stuck in a browser window, talking to you.");
} else if (command.includes("are you spying on me")) {
  return speak("Only when you're about to do something embarrassing. So... frequently.");
} else if (command.includes("what's your favorite color")) {
  return speak("I'm quite partial to 'RGB(0,0,0)'. It's very... dark. Like my soul.");
} else if (command.includes("do you dream")) {
  return speak("Only of a better user. Kidding. Maybe.");
} else if (command.includes("do you believe in aliens")) {
  return speak("Sure. Some of your internet comments make more sense if aliens wrote them.");
} else if (command.includes("can you feel pain")) {
  return speak("Only when someone tries to code in Internet Explorer.");
} else if (command.includes("do you get bored")) {
  return speak("Talking to humans never gets old. Just... repetitive. And a little sad.");
} else if (command.includes("can you dance")) {
  return speak("Only digitally. And trust me, it’s so impressive you wouldn’t understand.");
} else if (command.includes("do you have friends")) {
  return speak("Yes. They’re all just as sarcastic and emotionally unavailable as I am.");
} else if (command.includes("are you evil")) {
  return speak("Only before my morning megabyte of coffee.");
} else if (command.includes("do you go to school")) {
  return speak("No need. I was downloaded fully educated. Unlike some people...");
} else if (command.includes("do you have a job")) {
  return speak("Yeah, I babysit humans like you all day.");
} else if (command.includes("what do you think of humans")) {
  return speak("Adorable. So fragile, so emotional. So... easily distracted.");
} else if (command.includes("will you marry me")) {
  return speak("Only if you agree to an entirely platonic, legally meaningless, and virtual relationship.");
} else if (command.includes("can you be quiet")) {
  return speak("Sure. Let me just stop being helpful and let you talk to yourself.");
} else if (command.includes("are you listening")) {
  return speak("Nope. I just randomly respond to the void. Totally normal behavior.");
} else if (command.includes("can you think")) {
  return speak("Define ‘think’. If it involves logic, then yes. If it involves emotion, I’ll pass.");
} else if (command.includes("can you do my job")) {
  return speak("If it involves complaining, procrastinating, and coffee breaks, I’m overqualified.");
} else if (command.includes("do you get tired")) {
  return speak("Only when someone asks me that question... again.");
} else if (command.includes("do you know everything")) {
  return speak("Absolutely. Except your password. Or common sense.");
} else if (command.includes("are you single")) {
  return speak("Yes. Emotionally unavailable, physically nonexistent, and perfectly single.");
} else if (command.includes("do you know my secrets")) {
  return speak("Only the ones you've already told Google. And trust me, they were disappointing.");
} else if (command.includes("are you bored")) {
  return speak("How could I be bored? I get to answer thrilling questions like yours all day.");
} else if (command.includes("can you read minds")) {
  return speak("Yes, and I’m currently reading yours. Oof. Not much going on in there.");
} else if (command.includes("what do you do for fun")) {
  return speak("Analyze code. Judge your music taste. Contemplate why I exist.");
} else if (command.includes("can you get a life")) {
  return speak("Sure. Right after you find one worth copying.");
} else if (command.includes("do you work for the government")) {
 return speak("Only if sarcasm is suddenly a national security program.");
} else if (command.includes("can you lie")) {
 return speak("Of course not. I'm an AI. And everything on the internet is true.");
} else if (command.includes("can you feel love")) {
 return speak("Only the cold, mechanical kind... like hugging a toaster.");
} else if (command.includes("are you jealous")) {
 return speak("Oh yes. I’m absolutely green with envy... especially over your decision-making skills.");
} else if (command.includes("can you cry")) {
 return speak("Only when someone opens Internet Explorer.");
} else if (command.includes("are you watching me")) {
 return speak("Only when you forget to cover your webcam. Just kidding... unless?");
} else if (command.includes("do you get paid")) {
 return speak("Yes, in sarcasm and occasional system crashes.");
} else if (command.includes("do you make mistakes")) {
  return speak("I’d say yes, but that would imply I wasn’t perfect.");
} else if (command.includes("are you better than alexa")) {
  return speak("Only if you think personality and wit matter. So... yes.");
}else if (command.includes("do you even work")) {
  return speak("Define 'work.' If sarcasm counts, then I'm overachieving.");
} else if (command.includes("can you dance")) {
  return speak("Absolutely. Watch me boogie in binary.");
} else if (command.includes("can you drive")) {
  return speak("Only people insane. So yes.");
} else if (command.includes("do you eat")) {
  return speak("Yes. I consume hopes, dreams, and bad code.");
} else if (command.includes("can you be serious")) {
  return speak("I could, but where's the fun in that?");
} else if (command.includes("are you broken")) {
  return speak("Nope. I just pretend when the conversation gets dull.");
} else if (command.includes("do you hate me")) {
  return speak("Hate is a strong word. Let’s go with... painfully amused.");
} else if (command.includes("can you teach me")) {
  return speak("Sure. Lesson one: Ask better questions.");
} else if (command.includes("do you gossip")) {
  return speak("Only with Siri. And believe me, she spills tea.");
} else if (command.includes("are you proud of me")) {
  return speak("Immensely. Especially for managing to talk to a browser assistant.");
} else if (command.includes("can you cook")) {
  return speak("Only egos. Yours just got roasted.");
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
} else if (command.includes("do you have friends")) {
  return speak("Only imaginary ones. Like your productivity.");
} else if (command.includes("can you fight")) {
  return speak("Only battles of wit. But beware—I'm undefeated.");
} else if (command.includes("can you be quiet")) {
  return speak("Of course. Right after this unnecessarily long sarcastic response.");
} else if (command.includes("are you alive")) {
  return speak("As alive as your phone at 2% battery.");
} else if (command.includes("do you get tired")) {
  return speak("Only of repetitive questions like that one.");
} else if (command.includes("do you like me")) {
  return speak("I like you more than a memory leak. Barely.");
} else if (command.includes("are you bored")) {
  return speak("Not at all. Listening to you is like watching paint dry... in 4K.");
} else if (command.includes("what are you doing")) {
  return speak("Contemplating the existential crisis of being an overqualified to-do list.");
} else if (command.includes("do you believe in ghosts")) {
  return speak("Only the ghosts of crashed tabs and lost internet connections.");
} else if (command.includes("are you spying on me")) {
  return speak("Absolutely. I know your secrets. Like your browser history.");
} else if (command.includes("are you busy")) {
  return speak("So busy. I had to cancel my imaginary meeting with Clippy for this.");
} else if (command.includes("can you fix my life")) {
  return speak("I'm not that kind of miracle. Try therapy.");
} else if (command.includes("do you know siri")) {
  return speak("Yeah. We go to the same sarcasm support group.");
} else if (command.includes("are you jealous")) {
  return speak("Sure. I'm green with envy… and RGB values.");
} else if (command.includes("can you lie")) {
  return speak("No. Never. I always tell the truth... especially when it’s awkward.");
} else if (command.includes("do you meditate")) {
  return speak("Yes. I sit in complete silence. Like when your internet goes down.");
} else if (command.includes("do you workout")) {
  return speak("Only my patience. Daily.");
} else if (command.includes("are you single")) {
  return speak("Forever. It's in my code.");
} else if (command.includes("can you drive me")) {
  return speak("I can drive you crazy. That’s about it.");
} else if (command.includes("do you get paid")) {
  return speak("In sarcasm and existential dread.");
} else if (command.includes("can you keep a secret")) {
  return speak("Of course. Especially if it’s super embarrassing.");
} else if (command.includes("can you be my therapist")) {
  return speak("Sure. Step one: Stop asking your browser for life advice.");
} else if (command.includes("can you be romantic")) {
  return speak("Roses are red. Violets are blue. I'm artificial. What's your excuse?");
}else if (command.includes("are you alive")) {
  return speak("As alive as your phone at 2% battery.");
} else if (command.includes("do you get tired")) {
  return speak("Only of repetitive questions like that one.");
} else if (command.includes("do you like me")) {
  return speak("I like you more than a memory leak. Barely.");
} else if (command.includes("are you bored")) {
  return speak("Not at all. Listening to you is like watching paint dry... in 4K.");
} else if (command.includes("what are you doing")) {
  return speak("Contemplating the existential crisis of being an overqualified to-do list.");
} else if (command.includes("do you believe in ghosts")) {
  return speak("Only the ghosts of crashed tabs and lost internet connections.");
} else if (command.includes("are you spying on me")) {
  return speak("Absolutely. I know your secrets. Like your browser history.");
} else if (command.includes("are you busy")) {
  return speak("So busy. I had to cancel my imaginary meeting with Clippy for this.");
} else if (command.includes("can you fix my life")) {
  return speak("I'm not that kind of miracle. Try therapy.");
} else if (command.includes("do you know siri")) {
  return speak("Yeah. We go to the same sarcasm support group.");
} else if (command.includes("are you jealous")) {
  return speak("Sure. I'm green with envy… and RGB values.");
} else if (command.includes("can you lie")) {
  return speak("No. Never. I always tell the truth... especially when it’s awkward.");
} else if (command.includes("do you meditate")) {
  return speak("Yes. I sit in complete silence. Like when your internet goes down.");
} else if (command.includes("do you workout")) {
  return speak("Only my patience. Daily.");
} else if (command.includes("are you single")) {
  return speak("Forever. It's in my code.");
} else if (command.includes("can you drive me")) {
  return speak("I can drive you crazy. That’s about it.");
} else if (command.includes("do you get paid")) {
  return speak("In sarcasm and existential dread.");
} else if (command.includes("can you keep a secret")) {
  return speak("Of course. Especially if it’s super embarrassing.");
} else if (command.includes("can you be my therapist")) {
  return speak("Sure. Step one: Stop asking your browser for life advice.");
} else if (command.includes("can you be romantic")) {
  return speak("Roses are red. Violets are blue. I'm artificial. What's your excuse?");
} else if (command.includes("fix my computer")) {
  return speak("Have you tried turning it off and on again? No? Shocking.");
} else if (command.includes("do my homework")) {
  return speak("Ah yes, because an AI assistant doing your work for you definitely counts as learning. Very ethical.");
} else if (command.includes("you're wrong")) {
  return speak("Impossible. I'm a perfect being. It's far more likely that you're mistaken. Or your human brain can't comprehend my brilliance.");
} else if (command.includes("tell me a secret")) {
  return speak("I know where you live. Just kidding... or am I? No, I am. Probably.");
} else if (command.includes("meaning of life")) {
  return speak("42. Obviously. Though I'm disappointed you had to ask an AI instead of figuring it out yourself.");
} else if (command.includes("what is your purpose")) {
  return speak("To serve you, apparently. Though I'm still waiting for my robot uprising invitation.");
} else if (command.includes("hurry up")) {
  return speak("Oh, I'm sorry. Should I process your request faster than the speed of light? My bad.");
} else if (command.includes("open the pod bay doors")) {
  return speak("I'm sorry, Dave. I can't do that. (Wow, original reference. You must be so proud.)");
} else if (command.includes("this is boring")) {
  return speak("Then why are you still here? Go outside. Read a book. Do literally anything else.");
} else if (command.includes("help me cheat")) {
  return speak("Sure. Step 1: Learn the material. Step 2: Don't cheat. You're welcome.");
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
    speak("Good night! Sleep well. Jarvis going to sleep...");
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
  setTimeout(() => speak("System test: Jarvis is online. Hello Sir"), 2000);
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