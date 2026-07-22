import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const biomes = [
  {
    name: "ocean",
    min: 0,
    max: 6,
    board: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/deepsea.png",
    page: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/Deepsea-blurbg.png",
  },
  {
    name: "reef",
    min: 7,
    max: 9,
    board: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/coralsea.png",
    page: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/coralsea-blurbg.png",
  },
  {
    name: "forest",
    min: 10,
    max: 12,
    board: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/forest.png",
    page: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/forest-blurbg.png",
  },
  {
  name: "human",
  min: 13,
  max: 13,
  board: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/human.png",
  page: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/human-bgblur.png",
},
  {
  name: "cyborg",
  min: 14,
  max: 14,
  board: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/cyborg.png",
  page: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/cyborg-blurbg.png",
},
  {
  name: "spacecolony",
  min: 15,
  max: 15,
  board: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/space-colony.png",
  page: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/space-colony-blurbg.png",
},
 {
  name: "planetary",
  min: 16,
  max: 16,
  board: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/planetary.png",
  page: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/planetary-blurbg.png",
},
  {
  name: "interstellar",
  min: 17,
  max: 17,
  board: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/interstellar.png",
  page: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/interstellar-blurbg.png",
},
  {
  name: "galactic",
  min: 18,
  max: 18,
  board: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/galactic.png",
  page: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/galactic-blurbg.png",
},
  {
  name: "cosmic",
  min: 19,
  max: 19,
  board: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/cosmic.png",
  page: "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/background/cosmic-blurbg.png",
},
];
const getCurrentBiome = (level) => {
  if (level < 0) return biomes[0];

  return (
    biomes.find(
      biome => level >= biome.min && level <= biome.max
    ) || biomes[0]
  );
};
const EvolutionMergeGame = () => {
  // Add Google Fonts
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Comfortaa:wght@400;700&family=Righteous&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const fruitsRef = useRef([]);
  const gameStateRef = useRef({
    gameOver: false,
    nextFruitId: 0,
  });
  const spriteImagesRef = useRef([]);
  const backgroundImageRef = useRef(null);

  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [nextFruit, setNextFruit] = useState(0);
  const [futureNextFruit, setFutureNextFruit] = useState(0);
  const [highestFruit, setHighestFruit] = useState(-1);
  const [mouseX, setMouseX] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [renderTrigger, setRenderTrigger] = useState(0);
  const [spriteLoaded, setSpriteLoaded] = useState(false);
  const [spriteFailed, setSpriteFailed] = useState(false);
  const [highScores, setHighScores] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('menu'); // 'menu', 'playing', 'gameOver'

  const biome = getCurrentBiome(highestFruit);

  const canvasWidth = 400;
const canvasHeight = 600;

  const gravity = 0.4;
  const friction = 0.96;
  console.log("Highest Fruit:", highestFruit);
console.log("Biome:", biome);

  // Evolution progression metadata
  const evolutionData = [
  {
    level: 0,
    display: 'Primordial\nMolecule',
    size: 15,
    scoreValue: 1,
    fact: 'The spark of chemistry.',
    era: 'Prebiotic Earth',
    age: '≈4.4 Billion Years Ago'
  },
  {
    level: 1,
    display: 'Amino\nAcid',
    size: 20,
    scoreValue: 1,
    fact: 'Building blocks of life.',
    era: 'Chemical Evolution',
    age: '≈4.1 Billion Years Ago'
  },
  {
    level: 2,
    display: 'Protein',
    size: 25,
    scoreValue: 2,
    fact: 'Complex structures with purpose.',
    era: 'Chemical Evolution',
    age: '≈4.0 Billion Years Ago'
  },
  {
    level: 3,
    display: 'RNA\nWorld',
    size: 30,
    scoreValue: 3,
    fact: 'Information starts to flow.',
    era: 'RNA World',
    age: '≈3.9 Billion Years Ago'
  },
  {
    level: 4,
    display: 'DNA',
    size: 35,
    scoreValue: 5,
    fact: 'The code of life is written.',
    era: 'Origin of Life',
    age: '≈3.8 Billion Years Ago'
  },
  {
    level: 5,
    display: 'Single\nCell',
    size: 42,
    scoreValue: 8,
    fact: 'Life takes its first breath.',
    era: 'Origin of Life',
    age: '≈3.7 Billion Years Ago'
  },
  {
    level: 6,
    display: 'Multicellular\nLife',
    size: 50,
    scoreValue: 13,
    fact: 'Together, we become more.',
    era: 'Proterozoic',
    age: '≈1.6 Billion Years Ago'
  },
  {
    level: 7,
    display: 'Fish',
    size: 58,
    scoreValue: 21,
    fact: 'Life explores the oceans.',
    era: 'Cambrian–Devonian',
    age: '≈530 Million Years Ago'
  },
  {
    level: 8,
    display: 'Amphibian',
    size: 65,
    scoreValue: 34,
    fact: 'First steps on land.',
    era: 'Devonian',
    age: '≈370 Million Years Ago'
  },
  {
    level: 9,
    display: 'Reptile',
    size: 72,
    scoreValue: 55,
    fact: 'Masters of the dry land.',
    era: 'Carboniferous',
    age: '≈310 Million Years Ago'
  },
  {
    level: 10,
    display: 'Dinosaur',
    size: 80,
    scoreValue: 89,
    fact: 'Giants rule the Earth.',
    era: 'Mesozoic',
    age: '≈230 Million Years Ago'
  },
  {
    level: 11,
    display: 'Mammal',
    size: 88,
    scoreValue: 144,
    fact: 'Warmth, care, and survival.',
    era: 'Cenozoic',
    age: '≈66 Million Years Ago'
  },
  {
    level: 12,
    display: 'Primate',
    size: 95,
    scoreValue: 233,
    fact: 'Smarter. Social. Curious.',
    era: 'Cenozoic',
    age: '≈55 Million Years Ago'
  },
  {
    level: 13,
    display: 'Human',
    size: 102,
    scoreValue: 377,
    fact: 'We imagine. We build. We dream.',
    era: 'Quaternary',
    age: '≈300,000 Years Ago'
  },
  {
    level: 14,
    display: 'Cyborg',
    size: 110,
    scoreValue: 610,
    fact: 'Technology becomes part of us.',
    era: 'Transhuman Era',
    age: '≈22nd Century'
  },
  {
    level: 15,
    display: 'Space\nColony',
    size: 118,
    scoreValue: 987,
    fact: 'We reach beyond our home.',
    era: 'Spacefaring Age',
    age: '≈24th Century'
  },
  {
    level: 16,
    display: 'Planetary\nCivilization',
    size: 126,
    scoreValue: 1597,
    fact: 'A world united and advanced.',
    era: 'Planetary Age',
    age: '≈26th Century'
  },
  {
    level: 17,
    display: 'Interstellar\nCivilization',
    size: 134,
    scoreValue: 2584,
    fact: 'Among the stars, we thrive.',
    era: 'Interstellar Age',
    age: '≈3000 AD'
  },
  {
    level: 18,
    display: 'Galactic\nCivilization',
    size: 142,
    scoreValue: 4181,
    fact: 'A galaxy united in consciousness.',
    era: 'Galactic Age',
    age: '≈100,000 AD'
  },
  {
    level: 19,
    display: 'Cosmic\nMind',
    size: 150,
    scoreValue: 6765,
    fact: 'We become one with the cosmos.',
    era: 'Cosmic Age',
    age: 'The Far Future'
  }
];


  // Grid layout: 5 columns × 4 rows = 20 sprites
  // Row 0: Primordial, Amino, Protein, RNA, DNA
  // Row 1: Single Cell, Multicellular, Fish, Amphibian, Reptile
  // Row 2: Dinosaur, Mammal, Primate, Human, Cyborg
  // Row 3: Space Colony, Planetary, Interstellar, Galactic, Cosmic Mind


  const spriteUrls = [
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/1-Primordial-molecule.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/2-amino-acid.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/3-Protein.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/4-rna-world.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/5-dna.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/6-single-cell.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/7-multicellular.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/8-fish.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/9-amphibian.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/10-reptile.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/11-dinosaur.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/12-mammal.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/13-primate.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/14-human.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/15-cyborg.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/16-space-colony.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/17-planetary-civilization.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/18-interstellar-civilization.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/19-galactic-civilization.png",
  "https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/sprites/20-cosmic-mind.png"
];

useEffect(() => {
  let loaded = 0;

  spriteUrls.forEach((url, index) => {
    const img = new Image();

    img.onload = () => {
      spriteImagesRef.current[index] = img;

      loaded++;

      if (loaded === spriteUrls.length) {
        setSpriteLoaded(true);
      }
    };

    img.onerror = () => {
      console.log("Failed:", url);
    };

    img.src = url;
  });
}, []);
useEffect(() => {
  const img = new Image();

  img.onload = () => {
    backgroundImageRef.current = img;
    console.log("✅ Background image loaded");
  };

  img.onerror = () => {
    console.log("❌ Failed to load background image");
  };

  img.src =biome.board;
}, [biome]);

const drawCreatureFromSprite = (ctx, level, x, y, size, isTransformed = false) => {
  const img = spriteImagesRef.current[level];

  if (!img) {
    drawFallbackCreature(ctx, level, x, y, size, isTransformed);
    return;
  }

  const drawX = isTransformed ? -size : x - size;
  const drawY = isTransformed ? -size : y - size;

  try {
    ctx.drawImage(
      img,
      drawX,
      drawY,
      size * 2,
      size * 2
    );
  } catch (e) {
    console.log("Error drawing sprite:", e);
    drawFallbackCreature(ctx, level, x, y, size, isTransformed);
  }
};

  const drawFallbackCreature = (ctx, level, x, y, size, isTransformed = false) => {
    const colors = ['#9d4edd', '#5a189a', '#3a0ca3', '#3c096c', '#5a189a', '#240046', '#10002b', '#06ffa5', '#10c876', '#1adb8a', '#1adb8a', '#26f26d', '#5dff61', '#ffc857', '#ffb700', '#ffa500', '#ff8c42', '#ff6b35', '#f7931e', '#00d9ff'];
    const names = ['Primordial', 'Amino', 'Protein', 'RNA', 'DNA', 'Cell', 'Multicellular', 'Fish', 'Amphibian', 'Reptile', 'Dinosaur', 'Mammal', 'Primate', 'Human', 'Cyborg', 'Colony', 'Planetary', 'Interstellar', 'Galactic', 'Cosmic'];
    const color = colors[level] || '#00e5ff';
    
    const drawPos = isTransformed ? { x: 0, y: 0 } : { x, y };
    
    // Draw glossy orb
    const gradient = ctx.createRadialGradient(drawPos.x - size / 3, drawPos.y - size / 3, 0, drawPos.x, drawPos.y, size);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(0.5, color);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(drawPos.x, drawPos.y, size, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw stage number or name
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${size * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((level + 1), drawPos.x, drawPos.y);
  };

  // Test image loading separately
  useEffect(() => {
    const testImg = new Image();
    testImg.crossOrigin = 'anonymous';
    testImg.onload = () => {
      console.log('✅ TEST: Image loaded successfully from GitHub');
      console.log('Image dimensions:', testImg.width, 'x', testImg.height);
    };
    testImg.onerror = () => {
      console.error('❌ TEST: GitHub image failed to load');
    };
    testImg.src = 'https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/36a4ae13bde585445d60c290ae5adb559b277ba4/Evolution-merger.png';
  }, []);

  // Load high scores from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('evolutionMergeHighScores');
      if (saved) {
        setHighScores(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading high scores:', e);
    }
  }, []);

  // Save high score to localStorage
  const saveHighScore = (finalScore, stage) => {
    const newScore = {
      score: finalScore,
      stage: stage,
      timestamp: new Date().toLocaleString(),
      evolutionName: stage >= 0 ? evolutionData[stage].display.replace(/\n/g, ' ') : 'Unknown'
    };

    const updated = [newScore, ...highScores].sort((a, b) => b.score - a.score).slice(0, 10);
    setHighScores(updated);
    
    try {
      localStorage.setItem('evolutionMergeHighScores', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving high scores:', e);
    }
  };

  const getRestitution = (level) => {
    if (level < 6) return 0.45; // Lighter bounces
    if (level < 13) return 0.30;
    return 0.15;
  };

  const getMass = (level) => Math.pow(2, level);

  const getPhysicsMultiplier = (level) => {
    // Larger objects are heavier and harder to affect
    const mass = getMass(level);
    return 1 / (1 + mass * 0.15); // Reduces movement/rotation with size
  };

  const separateCollisions = (fruits) => {
    // Separate overlapping fruits
    for (let i = 0; i < fruits.length; i++) {
      for (let j = i + 1; j < fruits.length; j++) {
        const f1 = fruits[i];
        const f2 = fruits[j];
        if (f1.merged || f2.merged) continue;

        const dx = f2.x - f1.x;
        const dy = f2.y - f1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const r1 = evolutionData[f1.level].size;
        const r2 = evolutionData[f2.level].size;
        const minDist = r1 + r2;

        if (dist < minDist && dist > 0) {
          // Push fruits apart
          const angle = Math.atan2(dy, dx);
          const overlap = (minDist - dist) / 2 + 0.5;
          f1.x -= Math.cos(angle) * overlap;
          f1.y -= Math.sin(angle) * overlap;
          f2.x += Math.cos(angle) * overlap;
          f2.y += Math.sin(angle) * overlap;
        }
      }
    }
  };

  const getBackgroundStyle = () => ({
  backgroundColor: "#000814",
  transition: "background 0.8s ease",
});

const drawBackground = (ctx) => {
  // Draw biome background
  if (backgroundImageRef.current) {
    ctx.drawImage(
      backgroundImageRef.current,
      0,
      0,
      canvasWidth,
      canvasHeight
    );
  } else {
    ctx.fillStyle = "#000814";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  // Particle color based on biome
  let particleColor = "rgba(255,255,255,0.08)";

  switch (biome.name) {
    case "ocean":
      particleColor = "rgba(120,200,255,0.15)";
      break;

    case "reef":
      particleColor = "rgba(120,255,220,0.12)";
      break;

    case "forest":
      particleColor = "rgba(170,255,170,0.12)";
      break;

    case "human":
      particleColor = "rgba(255,220,120,0.12)";
      break;

    case "cyborg":
      particleColor = "rgba(0,255,255,0.15)";
      break;

    case "spaceColony":
      particleColor = "rgba(220,220,255,0.12)";
      break;

    case "planetary":
      particleColor = "rgba(120,255,255,0.12)";
      break;

    case "interstellar":
      particleColor = "rgba(180,180,255,0.10)";
      break;

    case "galactic":
      particleColor = "rgba(255,180,255,0.10)";
      break;

    case "cosmic":
      particleColor = "rgba(255,255,255,0.18)";
      break;
  }

  ctx.fillStyle = particleColor;

  for (let i = 0; i < 20; i++) {
    const x =
      (Math.sin(renderTrigger * 0.001 + i) * canvasWidth * 0.5 +
        canvasWidth * 0.5) %
      canvasWidth;

    const y =
      (i * canvasHeight / 20 + renderTrigger * 0.05) %
      canvasHeight;

    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2);
    ctx.fill();
  }
};

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playDropSound = () => {
    if (!soundEnabled) return;
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  };

  const playMergeSound = (level) => {
    if (!soundEnabled) return;
    const ctx = initAudio();
    
    if (level < 7) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const frequency = 200 + level * 50;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.3, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } else if (level < 14) {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      const freq1 = 300 + level * 60;
      const freq2 = freq1 * 1.5;
      
      osc1.frequency.setValueAtTime(freq1, ctx.currentTime);
      osc2.frequency.setValueAtTime(freq2, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(freq1 * 1.4, ctx.currentTime + 0.25);
      osc2.frequency.exponentialRampToValueAtTime(freq2 * 1.4, ctx.currentTime + 0.25);
      
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.25);
      osc2.stop(ctx.currentTime + 0.25);
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const frequency = 600 + level * 80;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.6, ctx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }
  };

  const playGameOverSound = () => {
    if (!soundEnabled) return;
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.6);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0, ctx.currentTime + 0.6);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
  };

  const updatePhysics = () => {
    const fruits = fruitsRef.current;

    fruits.forEach(fruit => {
      const multiplier = getPhysicsMultiplier(fruit.level);
      
      // Larger objects fall faster (less affected by multiplier)
      fruit.vy += gravity * (1 - multiplier * 0.3); // Heavier = faster fall
      fruit.vx *= friction;
      fruit.vy *= friction;
      fruit.angularVelocity *= 0.98;

      fruit.x += fruit.vx * multiplier; // Larger objects move slower
      fruit.y += fruit.vy;
      fruit.rotation += fruit.angularVelocity * multiplier; // Larger objects rotate slower

      const radius = evolutionData[fruit.level].size;
      const restitution = getRestitution(fruit.level);

      // Collisions with walls and ground - harder to bounce large objects
      if (fruit.x - radius < 0) {
        fruit.x = radius;
        fruit.vx *= -restitution * multiplier; // Large objects bounce less
        fruit.angularVelocity += fruit.vx * 0.002 * multiplier;
      }
      if (fruit.x + radius > canvasWidth) {
        fruit.x = canvasWidth - radius;
        fruit.vx *= -restitution * multiplier;
        fruit.angularVelocity -= fruit.vx * 0.002 * multiplier;
      }
      if (fruit.y + radius > canvasHeight) {
        fruit.y = canvasHeight - radius;
        fruit.vy *= -restitution * multiplier;
        fruit.angularVelocity += fruit.vx * 0.001 * multiplier;
      }
      if (fruit.y - radius < 0) {
        fruit.y = radius;
        fruit.vy *= -restitution * multiplier;
        fruit.angularVelocity -= fruit.vx * 0.001 * multiplier;
      }
    });

    // Check collisions
    for (let i = 0; i < fruits.length; i++) {
      for (let j = i + 1; j < fruits.length; j++) {
        const f1 = fruits[i];
        const f2 = fruits[j];
        if (f1.merged || f2.merged) continue;

        const dx = f2.x - f1.x;
        const dy = f2.y - f1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const r1 = evolutionData[f1.level].size;
        const r2 = evolutionData[f2.level].size;
        const minDist = r1 + r2;

        if (dist < minDist && dist > 0) {
          // Check if they should merge
          if (f1.level === f2.level && f1.level < evolutionData.length - 1) {
            // MERGE!
            const newLevel = f1.level + 1;
            const newFruit = {
              id: gameStateRef.current.nextFruitId++,
              level: newLevel,
              x: (f1.x + f2.x) / 2,
              y: (f1.y + f2.y) / 2,
              vx: (f1.vx + f2.vx) / 2, // Average velocity
              vy: (f1.vy + f2.vy) / 2,
              rotation: 0,
              angularVelocity: 0,
              merged: false
            };

            setScore(prev => prev + evolutionData[newLevel].scoreValue);
            setHighestFruit(prev => Math.max(prev, newLevel));

            f1.merged = true;
            f2.merged = true;
            fruits.push(newFruit);
            playMergeSound(newLevel);
          } else if (f1.level !== f2.level) {
            // Different sizes - light bounce
            const m1 = getMass(f1.level);
            const m2 = getMass(f2.level);
            const totalMass = m1 + m2;
            const angle = Math.atan2(dy, dx);
            const f1Mass = m2 / totalMass;
            const f2Mass = m1 / totalMass;
            
            // Lighter push for big objects
            const pushForce = 0.8 * (f1Mass * getPhysicsMultiplier(f1.level) + f2Mass * getPhysicsMultiplier(f2.level)) / 2;

            f1.vx -= Math.cos(angle) * pushForce * f1Mass;
            f1.vy -= Math.sin(angle) * pushForce * f1Mass;
            f2.vx += Math.cos(angle) * pushForce * f2Mass;
            f2.vy += Math.sin(angle) * pushForce * f2Mass;

            // Large objects resist rotation from collisions
            f1.angularVelocity -= Math.sin(angle) * 0.003 * getPhysicsMultiplier(f1.level);
            f2.angularVelocity += Math.sin(angle) * 0.003 * getPhysicsMultiplier(f2.level);
          }

          // Separate to prevent overlap
          if (dist < minDist) {
            const overlap = minDist - dist + 1;
            const angle = Math.atan2(dy, dx);
            f1.x -= Math.cos(angle) * overlap / 2;
            f1.y -= Math.sin(angle) * overlap / 2;
            f2.x += Math.cos(angle) * overlap / 2;
            f2.y += Math.sin(angle) * overlap / 2;
          }
        }
      }
    }

    fruitsRef.current = fruits.filter(f => !f.merged);

    const fruitNearTop = fruitsRef.current.filter(f => f.y < 120).length;
    if (fruitNearTop > 3 && !gameStateRef.current.gameOver) {
      gameStateRef.current.gameOver = true;
      setGameOver(true);
      setCurrentScreen('gameOver');
      playGameOverSound();
    }
  };

  // Save high score when game over state changes
  useEffect(() => {
    if (gameOver && gameStarted && currentScreen === 'gameOver') {
      saveHighScore(score, highestFruit);
    }
  }, [gameOver, currentScreen]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      updatePhysics();
      setRenderTrigger(prev => prev + 1);
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    drawBackground(ctx);

    ctx.fillStyle = 'rgba(52, 152, 219, 0.1)';
    ctx.fillRect(0, 0, canvasWidth, 80);
    ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvasWidth, 80);

    if (gameStarted && !gameOver) {
      const nextData = evolutionData[nextFruit];
      const previewX = mouseX !== null ? mouseX : canvasWidth / 2;
      const previewY = 40;

      ctx.font = '11px Arial';
      ctx.fillStyle = 'rgba(100, 200, 255, 0.7)';
      ctx.textAlign = 'center';
      ctx.fillText('EVOLVING', previewX, 15);

      // Draw preview bubble with creature
      drawCreatureFromSprite(ctx, nextFruit, previewX, previewY, nextData.size, false);
    }

    fruitsRef.current.forEach(fruit => {
      const data = evolutionData[fruit.level];

      ctx.save();
      ctx.translate(fruit.x, fruit.y);
      ctx.rotate(fruit.rotation);

      // Draw sprite (which includes the orb from the sprite sheet)
      drawCreatureFromSprite(ctx, fruit.level, 0, 0, data.size, true);

      ctx.restore();
    });

    if (mouseX !== null && gameStarted && !gameOver) {
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(mouseX, 80);
      ctx.lineTo(mouseX, canvasHeight);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = '#00e5ff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Evolution Halted', canvasWidth / 2, canvasHeight / 2 - 40);
      ctx.font = '18px Arial';
      ctx.fillText(`Score: ${score}`, canvasWidth / 2, canvasHeight / 2 + 20);
      if (highestFruit >= 0) {
        ctx.fillStyle = 'rgba(0, 229, 255, 0.8)';
        ctx.font = '14px Arial';
        ctx.fillText(`Reached: ${evolutionData[highestFruit].display.replace(/\n/g, ' ')}`, canvasWidth / 2, canvasHeight / 2 + 50);
      }
    }

    // Display sprite loading status on canvas
    if (!gameStarted && !spriteLoaded) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, canvasHeight - 50, canvasWidth, 50);
      ctx.fillStyle = spriteFailed ? '#ff9800' : '#2196f3';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(spriteFailed ? '⚠️ Sprites failed - using colored bubbles' : '⏳ Loading sprites...', canvasWidth / 2, canvasHeight - 25);
    }
  }, [renderTrigger, gameStarted, gameOver, score, nextFruit, mouseX, highestFruit]);

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  const dropFruit = (e) => {
    // Prevent double-firing on touch devices
    if (e.type === 'click' && touchTrackerRef.current.moved) {
      return; // Let touch handler deal with it
    }
    
    if (gameOver || !gameStarted) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const fruitSize = evolutionData[nextFruit].size;
    const clampedX = Math.max(fruitSize, Math.min(x, canvasWidth - fruitSize));

    const newFruit = {
      id: gameStateRef.current.nextFruitId++,
      level: nextFruit,
      x: clampedX,
      y: 40,
      vx: 0,
      vy: 0,
      rotation: 0,
      angularVelocity: 0,
      merged: false
    };

    fruitsRef.current.push(newFruit);
    setNextFruit(futureNextFruit);
    setFutureNextFruit((Math.random() * 3) | 0);
    playDropSound();
  };

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x >= 0 && x <= canvasWidth) {
      setMouseX(x);
    }
  };

  const touchTrackerRef = useRef({
    startX: null,
    moved: false,
    startTime: null
  });

  const handleTouchStart = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    
    touchTrackerRef.current = {
      startX: x,
      moved: false,
      startTime: Date.now()
    };
    
    if (x >= 0 && x <= canvasWidth) {
      setMouseX(x);
    }
  };

  const handleTouchMove = (e) => {
    if (!canvasRef.current) return;
    e.preventDefault();
    
    // Mark that user moved their finger
    touchTrackerRef.current.moved = true;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    if (x >= 0 && x <= canvasWidth) {
      setMouseX(x);
    }
  };

  const handleTouchEnd = () => {
    // Only drop if user actually slid their finger (moved)
    // If they just tapped, let onClick handle it
    if (touchTrackerRef.current.moved && gameStarted && !gameOver && mouseX !== null) {
      const fruitSize = evolutionData[nextFruit].size;
      const clampedX = Math.max(fruitSize, Math.min(mouseX, canvasWidth - fruitSize));

      const newFruit = {
        id: gameStateRef.current.nextFruitId++,
        level: nextFruit,
        x: clampedX,
        y: 40,
        vx: 0,
        vy: 0,
        rotation: 0,
        angularVelocity: 0,
        merged: false
      };

      fruitsRef.current.push(newFruit);
      setNextFruit(futureNextFruit);
      setFutureNextFruit((Math.random() * 3) | 0);
      playDropSound();
    }
    setMouseX(null);
    touchTrackerRef.current = { startX: null, moved: false, startTime: null };
  };

  const startGame = () => {
    fruitsRef.current = [];
    gameStateRef.current = { gameOver: false, nextFruitId: 0 };
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setHighestFruit(0); // Changed from -1 to 0
    setNextFruit((Math.random() * 3) | 0);
    setFutureNextFruit((Math.random() * 3) | 0);
    setCurrentScreen('playing');
  };

  const resetGame = () => {
    startGame();
  };

  const goToMenu = () => {
    setCurrentScreen('menu');
    setGameStarted(false);
    setGameOver(false);
    fruitsRef.current = [];
    gameStateRef.current = { gameOver: false, nextFruitId: 0 };
  };

  const quitGame = () => {
    goToMenu();
  };

  // Main Menu Screen
  if (currentScreen === 'menu') {
    return (
      <div style={{...styles.container, overflow: 'hidden', position: 'relative'}}>
        {/* Background Image using img tag */}
        <img 
          src="https://raw.githubusercontent.com/Elixirpiyush46/MERGER-EVOLUTION/main/main.png"
          alt="background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
          }}
        />
        
        {/* Content */}
        <div style={{...styles.menuContainer, position: 'relative', zIndex: 2}}>
          <div style={styles.menuHeader}>
            <h1 style={styles.menuTitle}>🧬 Evolution Merge</h1>
            <p style={styles.menuSubtitle}>A Journey Through 4 Billion Years</p>
          </div>

          <div style={styles.menuContentTransparent}>
            <p style={styles.menuDescription}>
              Merge identical lifeforms and witness the incredible journey from primordial molecules to cosmic consciousness!
            </p>

            <div style={styles.menuButtons}>
              <button 
                onClick={startGame} 
                style={{...styles.menuButton, ...styles.primaryButton}}
              >
                🚀 Start Evolution
              </button>

              <button 
                onClick={() => setShowHighScores(true)} 
                style={{...styles.menuButton, ...styles.secondaryButton}}
              >
                🏆 High Scores
              </button>

              <button 
                onClick={quitGame} 
                style={{...styles.menuButton, ...styles.quitButton}}
               
              >
                🚪 Quit
              </button>
            </div>
          </div>

          {spriteLoaded && (
            <p style={{ fontSize: '12px', color: '#4caf50', textAlign: 'center', marginTop: '20px' }}>
              ✅ Sprites Loaded
            </p>
          )}
        </div>

        {showHighScores && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <button
                onClick={() => setShowHighScores(false)}
                style={styles.closeButton}
              >
                ✕
              </button>
              <h2 style={styles.modalTitle}>🏆 High Scores</h2>
              {highScores.length === 0 ? (
                <p style={styles.noScores}>No high scores yet. Start playing to earn a spot!</p>
              ) : (
                <div style={styles.scoresList}>
                  {highScores.map((entry, index) => (
                    <div key={index} style={styles.scoreEntry}>
                      <div style={styles.scoreRank}>#{index + 1}</div>
                      <div style={styles.scoreInfo}>
                        <div style={styles.scoreValue}>{entry.score.toLocaleString()}</div>
                        <div style={styles.scoreEvolution}>{entry.evolutionName}</div>
                        <div style={styles.scoreTime}>{entry.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Game Over Screen
  if (currentScreen === 'gameOver') {
    return (
      <div style={{...styles.container, ...getBackgroundStyle()}}>
        <div style={styles.gameOverContainer}>
          <div style={styles.gameOverHeader}>
            <h1 style={styles.gameOverTitle}>Evolution Halted</h1>
            <p style={styles.gameOverSubtitle}>Your journey ends here...</p>
          </div>

          <div style={styles.gameOverStats}>
            <div style={styles.statBox}>
              <div style={styles.statLabel}>Final Score</div>
              <div style={styles.statValue}>{score.toLocaleString()}</div>
            </div>
            {highestFruit >= 0 && (
              <div style={styles.statBox}>
                <div style={styles.statLabel}>Highest Stage Reached</div>
                <div style={styles.statValue}>{highestFruit + 1}</div>
                <div style={styles.statEvolution}>{evolutionData[highestFruit].display.replace(/\n/g, ' ')}</div>
              </div>
            )}
          </div>

          <div style={styles.highScoresPreview}>
            <h3 style={styles.previewTitle}>🏆 Recent High Scores</h3>
            {highScores.length === 0 ? (
              <p style={styles.noScores}>No high scores yet.</p>
            ) : (
              <div style={styles.scoresList}>
                {highScores.slice(0, 5).map((entry, index) => (
                  <div key={index} style={styles.scoreEntry}>
                    <div style={styles.scoreRank}>#{index + 1}</div>
                    <div style={styles.scoreInfo}>
                      <div style={styles.scoreValue}>{entry.score.toLocaleString()}</div>
                      <div style={styles.scoreEvolution}>{entry.evolutionName}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={styles.gameOverButtons}>
            <button 
              onClick={resetGame} 
              style={{...styles.menuButton, ...styles.primaryButton}}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              🔄 Try Again
            </button>
            <button 
              onClick={goToMenu} 
              style={{...styles.menuButton, ...styles.secondaryButton}}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              🏠 Main Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  return (
    <div style={{...styles.container, position: 'relative', overflow: 'hidden'}}>
      <img
src={biome.page}
  alt="Background"
  style={{
   position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',

 animation: 'oceanDrift 40s ease-in-out infinite',

  zIndex: -2,
  opacity: 0.55,
  pointerEvents: 'none',
  }}
/>
<div
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,40,70,0.12), rgba(0,15,30,0.45))',
    zIndex: -1,
    pointerEvents: 'none',
  }}
/>
<div
  style={{
    position: 'absolute',
    top: '-20%',
    left: '-15%',
    width: '130%',
    height: '70%',
    background:
      'linear-gradient(105deg, transparent 15%, rgba(255,255,255,0.05) 30%, transparent 45%, rgba(255,255,255,0.035) 60%, transparent 75%)',
    filter: 'blur(45px)',
    opacity: 0.7,
    transform: 'rotate(-8deg)',
    pointerEvents: 'none',
    zIndex: -1,
  }}
/>
      {/* Background Image Layer for early stages */}
   
      
      <div style={styles.header}>
        <h1 style={styles.title}>🧬 Evolution Merge</h1>
        <p style={styles.subtitle}>Merge identical lifeforms and witness 4 billion years of evolution!</p>
      </div>
<div style={styles.headerDivider}></div>
      {highestFruit >= 0 && (
        <div style={styles.achievementBox}>
          <div style={styles.achievementTitle}>Current Evolution Stage</div>
          <div style={styles.achievementContent}>

  <canvas
    width={100}
    height={100}
    ref={(canvas) => {
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 60, 60);

      const img = spriteImagesRef.current[highestFruit];

      if (img) {
        ctx.drawImage(img, 4, 4, 96, 96);
      }
    }}
    style={styles.achievementSprite}
  />

  <div style={styles.achievementInfo}>

    <div style={styles.achievementName}>
      {evolutionData[highestFruit].display.replace(/\n/g, ' ')}
    </div>

    <div style={styles.achievementFact}>
      "{evolutionData[highestFruit].fact}"
    </div>

    <div style={styles.achievementMeta}>
      🌍 {evolutionData[highestFruit].era}
    </div>

    <div style={styles.achievementMeta}>
      🕒 {evolutionData[highestFruit].age}
    </div>

  </div>

</div>
        </div>
      )}

      <div style={styles.gameArea}>
  <div style={styles.leftPanel}>
          <div style={styles.currentFruitBox}>
            <div style={styles.label}>Next Stage</div>
            <div style={styles.creaturePreview}>
              <canvas
                width={80}
                height={80}
               ref={(canvas) => {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 80, 80);

  const img = spriteImagesRef.current[nextFruit];

  if (img) {
    ctx.drawImage(img, 5, 5, 70, 70);
  } else {
    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.arc(40, 40, 30, 0, Math.PI * 2);
    ctx.fill();
  }
}}
                style={{
  borderRadius: '8px',
  width: 'clamp(44px, 6vw, 80px)',
  height: 'clamp(44px, 6vw, 80px)',
}}
              />
            </div>
            <div style={styles.nextFruitName}>{evolutionData[nextFruit]?.display.replace(/\n/g, ' ')}</div>
          </div>

          <div style={styles.scoreBox}>
            <div style={styles.scoreLabel}>Score</div>
            <div style={styles.scoreValue}>{score}</div>
          </div>

          <div style={styles.nextFruitBox}>
            <div style={styles.label}>After Next</div>
            <div style={styles.creaturePreview}>
              <canvas
                width={80}
                height={80}
                ref={(canvas) => {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 80, 80);

  const img = spriteImagesRef.current[futureNextFruit];

  if (img) {
    ctx.drawImage(img, 5, 5, 70, 70);
  } else {
    ctx.fillStyle = '#9c27b0';
    ctx.beginPath();
    ctx.arc(40, 40, 30, 0, Math.PI * 2);
    ctx.fill();
  }
}}
                style={{
  borderRadius: '8px',
  width: 'clamp(44px, 6vw, 80px)',
  height: 'clamp(44px, 6vw, 80px)',
}}
              />
            </div>
            
            <div style={styles.nextFruitName}>{evolutionData[futureNextFruit]?.display.replace(/\n/g, ' ')}</div>
          </div>
          <div style={styles.controls}>
  <button
    onClick={goToMenu}
    style={{ ...styles.button, backgroundColor: '#ff6b6b' }}
  >
    🏠 Menu
  </button>

  <button
    onClick={() => setSoundEnabled(!soundEnabled)}
    style={{
      ...styles.button,
      backgroundColor: soundEnabled ? '#27ae60' : '#95a5a6',
    }}
  >
    {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
  </button>
</div>
        </div>

 <div style={styles.boardPanel}>
  <div style={styles.instruction}>
    Click to release lifeform
  </div>
<div style={styles.boardContainer}>
  <canvas
  ref={canvasRef}
  width={canvasWidth}
  height={canvasHeight}
    onClick={dropFruit}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
    style={{
  ...styles.canvas,
  touchAction: 'none',

  width: '100%',
  height: 'auto',

  maxWidth: '400px',
  maxHeight: '600px',

  aspectRatio: '2 / 3',
}}
  />
  </div>
</div>
 <div style={styles.rightPanel}>
  </div>
</div>
</div>

);
};
const glassPanel = {
  background: 'rgba(255, 255, 255, 0.001)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.15)',
  boxShadow:
    '0 10px 30px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.05)',
};
const styles = {
  container: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: '100%',
  height: '100vh',
  overflow: 'hidden',

  padding: '12px',
  boxSizing: 'border-box',

  fontFamily: "'Comfortaa', 'Fredoka', sans-serif",
  transition: 'background 0.8s ease',
  position: 'relative',
  zIndex: 1,
},
  
 header: {
  textAlign: 'center',

  marginBottom: 'clamp(4px, 0.8vh, 10px)',

  flexShrink: 0,

  color: '#fff',
},
headerDivider: {
  width: 'min(620px, 90%)',

  height: '1px',

  margin: 'clamp(4px, 0.8vh, 10px) 0',

  background:
    'linear-gradient(to right, transparent, rgba(0,229,255,0.35), transparent)',

  opacity: 0.9,
},
  title: {
  fontSize: 'clamp(24px, 2.8vw, 34px)',

  margin: '0',

  color: '#00e5ff',

  fontWeight: '700',

  textShadow: '0 0 18px rgba(0,229,255,0.45)',

  fontFamily: "'Fredoka', sans-serif",

  letterSpacing: '0.5px',

  lineHeight: 1.1,
},
 subtitle: {
  fontSize: 'clamp(10px, 1vw, 14px)',

  color: 'rgba(255,255,255,0.82)',

  marginTop: '2px',

  lineHeight: 1.2,

  fontFamily: "'Comfortaa', sans-serif",
},
achievementBox: {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '18px',

  padding: 'clamp(6px, 0.8vh, 10px)',
  marginBottom: 'clamp(4px, 0.8vh, 8px)',

  width: 'clamp(280px, 38vw, 560px)',

  color: '#fff',

  boxShadow:
    '0 12px 35px rgba(0,0,0,0.30), inset 0 1px 1px rgba(255,255,255,0.08)',
},
achievementContent: {
  display: 'flex',
  alignItems: 'center',

  gap: 'clamp(10px, 1vw, 18px)',

  width: '100%',
},

achievementSprite: {
  width: '100px',
  height: '100px',

  flexShrink: 0,

  borderRadius: '18px',

  padding: '4px',

  background:
    'linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',

  border: '1px solid rgba(255,255,255,0.12)',

  boxShadow:
    '0 0 24px rgba(0,229,255,0.15), inset 0 1px 1px rgba(255,255,255,0.08)',
},

achievementInfo: {
  flex: 1,

  display: 'flex',
  flexDirection: 'column',

  justifyContent: 'center',

  textAlign: 'left',

  gap: '2px',
},

achievementMeta: {
  fontSize: 'clamp(10px, 0.8vw, 13px)',
  color: 'rgba(255,255,255,0.72)',
  lineHeight: 1.25,
},
  achievementTitle: {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    opacity: 0.9,
    color: '#00e5ff',
    fontFamily: "'Comfortaa', sans-serif",
  },
 achievementName: {
  fontSize: 'clamp(22px, 2vw, 28px)',
  fontWeight: '700',
  marginBottom: '2px',
  color: '#ffffff',
  fontFamily: "'Fredoka', sans-serif",
},
  achievementFact: {
  fontSize: '14px',

  color: 'rgba(255,255,255,0.92)',

  marginBottom: '8px',

  fontStyle: 'italic',

  lineHeight: 1.4,

  fontFamily: "'Comfortaa', sans-serif",
},
gameArea: {
  display: 'flex',

  flex: 1,

  width: '100%',
  minHeight: 0,

  justifyContent: 'center',
  alignItems: 'stretch',

  gap: 'clamp(8px, 1vw, 20px)',

  overflow: 'hidden',
},
leftPanel: {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',

  flex: '0 1 clamp(110px, 16vw, 180px)',
  maxWidth: '180px',

  minWidth: 0,

  gap: 'clamp(4px, 0.8vh, 12px)',
},
rightPanel: {
   display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',

  flex: '0 1 clamp(110px, 16vw, 180px)',
  maxWidth: '180px',

  minWidth: 0,

  gap: 'clamp(4px, 0.8vh, 12px)',
},
boardPanel: {
  flex: 1,

  display: 'flex',
  flexDirection: 'column',

  justifyContent: 'center',
  alignItems: 'center',

  minWidth: 0,
  minHeight: 0,
},
boardContainer: {
  flex: 1,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '100%',

  minWidth: 0,
  minHeight: 0,

  overflow: 'hidden',
},
  currentFruitBox: {
  background: glassPanel.background,
  backdropFilter: glassPanel.backdropFilter,
  WebkitBackdropFilter: glassPanel.WebkitBackdropFilter,
  border: glassPanel.border,
  boxShadow: glassPanel.boxShadow,
  borderRadius: '16px',
  padding: 'clamp(8px, 1vw, 15px)',
  textAlign: 'center',
  width: 'clamp(120px, 15vw, 180px)',
},

nextFruitBox: {
  background: glassPanel.background,
  backdropFilter: glassPanel.backdropFilter,
  WebkitBackdropFilter: glassPanel.WebkitBackdropFilter,
  border: glassPanel.border,
  boxShadow: glassPanel.boxShadow,
  borderRadius: '16px',
  padding: 'clamp(8px, 1vw, 15px)',
  textAlign: 'center',
  width: 'clamp(120px, 15vw, 180px)',
},
  currentFruitDisplay: {
    fontSize: '40px',
    marginTop: '8px',
    fontWeight: '700',
    color: '#00a8cc',
  },
  scoreBox: {
    background: glassPanel.background,
backdropFilter: glassPanel.backdropFilter,
WebkitBackdropFilter: glassPanel.WebkitBackdropFilter,
border: glassPanel.border,
boxShadow: glassPanel.boxShadow,
borderRadius: '16px',
    padding: 'clamp(8px, 1vw, 18px)',
    textAlign: 'center',
    width: 'clamp(120px, 15vw, 180px)',
  },
  scoreLabel: {
    fontSize: 'clamp(9px, 0.8vw, 12px)',
    fontWeight: '600',
    color: '#00a8cc',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: "'Fredoka', sans-serif",
  },
  label: {
    fontSize: 'clamp(9px, 0.8vw, 12px)',
    fontWeight: '600',
    color: '#00a8cc',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: "'Fredoka', sans-serif",
  },
  creaturePreview: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'clamp(2px, 0.3vw, 6px)',
marginBottom: 'clamp(2px, 0.3vw, 6px)',
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    borderRadius: '8px',
    padding: 'clamp(1px, 0.3vw, 4px)',
  },
  nextFruitName: {
    fontSize: 'clamp(9px, 0.8vw, 12px)',
    color: '#00a8cc',
    fontWeight: '600',
    fontFamily: "'Comfortaa', sans-serif",
    textAlign: 'center',
    lineHeight: '1.3',
  },
  canvasWrapper: {
    position: 'relative',
  },
canvas: {
  position: 'relative',
  zIndex: 2,
  display: 'block',
  cursor: 'crosshair',

  borderRadius: '22px',
  border: '1px solid rgba(255,255,255,0.15)',

  boxShadow:
    '0 20px 45px rgba(0,0,0,0.35), 0 0 25px rgba(0,229,255,0.18)',

  overflow: 'hidden',
},
  instruction: {
    marginTop: '8px',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: "'Comfortaa', sans-serif",
  },
 controls: {
  display: 'flex',
  flexDirection: 'column',

  gap: 'clamp(6px, 1vh, 10px)',
},
 button: {
  padding: '12px 28px',
  fontSize: '16px',
  fontWeight: '700',

  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',

  color: '#ffffff',

  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '14px',

  cursor: 'pointer',
  transition: 'all 0.25s ease',

  boxShadow:
    '0 8px 22px rgba(0,0,0,0.28), inset 0 1px 1px rgba(255,255,255,0.08)',

  fontFamily: "'Fredoka', sans-serif",
},

  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    backdropFilter: 'blur(8px)',
  },
  modalContent: {
    backgroundColor: 'rgba(20, 30, 60, 0.95)',
    borderRadius: '16px',
    padding: '30px',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflowY: 'auto',
    border: '2px solid #00e5ff',
    boxShadow: '0 0 40px rgba(0, 229, 255, 0.3)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#00e5ff',
    fontSize: '24px',
    cursor: 'pointer',
    fontWeight: '700',
  },
  modalTitle: {
    fontSize: '28px',
    color: '#00e5ff',
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
    fontFamily: "'Fredoka', sans-serif",
    letterSpacing: '1px',
  },
  scoreValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#fff',
    fontFamily: "'Fredoka', sans-serif",
  },
  scoreEvolution: {
    fontSize: '14px',
    color: '#00e5ff',
    fontWeight: '600',
    fontFamily: "'Comfortaa', sans-serif",
  },
  scoreTime: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: "'Comfortaa', sans-serif",
  },
  scoreRank: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#00e5ff',
    minWidth: '50px',
    textAlign: 'center',
    fontFamily: "'Fredoka', sans-serif",
  },
  noScores: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    padding: '20px',
    fontFamily: "'Comfortaa', sans-serif",
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  menuHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  menuTitle: {
    fontSize: '56px',
    margin: 0,
    color: '#00e5ff',
    fontWeight: '700',
    textShadow: '0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.9)',
    marginBottom: '10px',
    fontFamily: "'Fredoka', sans-serif",
    letterSpacing: '2px',
  },
  menuSubtitle: {
    fontSize: '20px',
    color: '#fff',
    margin: 0,
    fontWeight: '400',
    letterSpacing: '1px',
    textShadow: '0 0 10px rgba(0, 0, 0, 0.9), 2px 2px 4px rgba(0, 0, 0, 0.8)',
    fontFamily: "'Comfortaa', sans-serif",
  },
  menuDescription: {
    fontSize: '16px',
    color: '#fff',
    marginBottom: '30px',
    lineHeight: '1.6',
    textShadow: '0 0 10px rgba(0, 0, 0, 0.9), 1px 1px 3px rgba(0, 0, 0, 0.8)',
    fontFamily: "'Comfortaa', sans-serif",
  },
 menuButton: {
  padding: '16px 32px',
  fontSize: '18px',
  fontWeight: '700',

  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',

  color: '#fff',

  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '16px',

  cursor: 'pointer',
  transition: 'all 0.3s ease',

  boxShadow:
    '0 10px 28px rgba(0,0,0,0.28), inset 0 1px 1px rgba(255,255,255,0.08)',

  textAlign: 'center',
  fontFamily: "'Fredoka', sans-serif",
  letterSpacing: '0.5px',
},
  primaryButton: {
    backgroundColor: '#00e5ff',
    color: '#001a2e',
    boxShadow: '0 0 25px rgba(0, 229, 255, 0.7), 0 4px 15px rgba(0, 0, 0, 0.5)',
  },
  secondaryButton: {
    backgroundColor: '#9c27b0',
    color: '#fff',
    boxShadow: '0 0 25px rgba(156, 39, 176, 0.6), 0 4px 15px rgba(0, 0, 0, 0.5)',
  },
  quitButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    boxShadow: '0 0 25px rgba(244, 67, 54, 0.6), 0 4px 15px rgba(0, 0, 0, 0.5)',
  },
  gameOverContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    maxWidth: '700px',
    margin: '0 auto',
  },
  gameOverHeader: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  gameOverTitle: {
    fontSize: '48px',
    margin: 0,
    color: '#ff6b6b',
    fontWeight: '700',
    textShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
    marginBottom: '10px',
    fontFamily: "'Fredoka', sans-serif",
    letterSpacing: '2px',
  },
  gameOverSubtitle: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
    fontStyle: 'italic',
    fontFamily: "'Comfortaa', sans-serif",
  },
  gameOverStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    marginBottom: '30px',
  },
  statBox: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderRadius: '12px',
    padding: '20px',
    border: '2px solid rgba(0, 229, 255, 0.3)',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
    fontFamily: "'Comfortaa', sans-serif",
  },
  statValue: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#00e5ff',
    fontFamily: "'Fredoka', sans-serif",
  },
  statEvolution: {
    fontSize: '14px',
    color: '#00e5ff',
    marginTop: '8px',
    fontWeight: '600',
    fontFamily: "'Fredoka', sans-serif",
  },
  previewTitle: {
    fontSize: '16px',
    color: '#9c27b0',
    textAlign: 'center',
    margin: '0 0 15px 0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: "'Fredoka', sans-serif",
  },
  gameOverButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
};

export default EvolutionMergeGame;