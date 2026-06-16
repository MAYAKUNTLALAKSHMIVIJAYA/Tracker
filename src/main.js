// ============================================
// AI PLACEMENT TRACKER — MAIN APPLICATION
// ============================================

import './style.css';

// ============ DATA STORE ============
const DB_KEY = 'elite_tracker_v1';

const defaultState = {
  theme: 'dark',
  startDate: '2026-06-16',
  totalDays: 60,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  lastBriefingDate: null,
  lastReportDate: null,
  totalHoursStudied: 0,
  hoursToday: 0,
  todayDate: null,
  xp: 0,
  level: 1,
  coins: 0,
  tasks: [],
  skills: getDefaultSkills(),
  dsa: getDefaultDSA(),
  aiRoadmap: getDefaultAIRoadmap(),
  fullstack: getDefaultFullstack(),
  coreCse: getDefaultCoreCse(),
  java: getDefaultJava(),
  projects: getDefaultProjects(),
  interview: getDefaultInterview(),
  communication: [],
  achievements: getDefaultAchievements(),
  notes: [{ id: genId(), title: 'Welcome Note', content: '<p>Welcome to EliteTracker! Start your 60-day journey to becoming an Elite AI Engineer.</p>', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }],
  dailyMission: null,
  weeklyMission: null,
  monthlyMission: null,
  missionDate: null,
};

function genId() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); }

function loadState() {
  try {
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const loaded = { ...defaultState, ...parsed };
      // Smart merge for interview categories if they are empty
      if (loaded.interview) {
        const categories = ['hr', 'technical', 'project', 'behavioral', 'companySpecific'];
        categories.forEach(cat => {
          if (!loaded.interview[cat] || loaded.interview[cat].length === 0) {
            loaded.interview[cat] = defaultState.interview[cat];
          }
        });
      }
      return loaded;
    }
  } catch (e) { console.error('Load error:', e); }
  return { ...defaultState };
}

function saveState() {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(state));
  } catch (e) { console.error('Save error:', e); }
}

let state = loadState();

// ============ DEFAULT DATA GENERATORS ============
function getDefaultSkills() {
  const skillNames = ['Python','Java','DSA','React','SQL','Docker','Git','AWS','Machine Learning','Deep Learning','NLP','Computer Vision','RAG','LLMs','AI Agents','Spring Boot','System Design','Operating Systems','DBMS','Computer Networks','OOP'];
  return skillNames.map(name => ({
    id: genId(), name, progress: 0, difficulty: 'Medium',
    confidence: 0, lastRevised: null, nextRevision: null,
    timeInvested: 0, mastery: 'Beginner', notes: ''
  }));
}

function getDefaultDSA() {
  const topics = ['Arrays','Strings','Hashing','Linked List','Stack','Queue','Trees','BST','Heap','Trie','Graph','Recursion','Backtracking','Sliding Window','Greedy','Binary Search','Dynamic Programming'];
  return topics.map(name => ({
    id: genId(), name, conceptLearned: false, problemsSolved: 0,
    easy: 0, medium: 0, hard: 0, revisionStatus: 'Not Revised',
    confidence: 0, notes: ''
  }));
}

function getDefaultAIRoadmap() {
  const modules = ['Python','NumPy','Pandas','Matplotlib','Machine Learning','Deep Learning','CNN','RNN','LSTM','Attention','Transformers','BERT','GPT','Embeddings','Vector Database','RAG','AI Agents','Prompt Engineering','Fine-tuning Concepts','Deployment'];
  return modules.map(name => ({
    id: genId(), name, progress: 0, resources: '', notes: '',
    completed: false, revised: false, confidence: 0
  }));
}

function getDefaultFullstack() {
  return {
    frontend: ['HTML','CSS','JavaScript','React','API'].map(name => ({
      id: genId(), name, progress: 0, checklist: [], notes: '', hours: 0, confidence: 0
    })),
    backend: ['Spring Boot','Authentication','REST API','Database','Deployment'].map(name => ({
      id: genId(), name, progress: 0, checklist: [], notes: '', hours: 0, confidence: 0
    }))
  };
}

function getDefaultCoreCse() {
  return ['OOP','DBMS','Operating Systems','Computer Networks','System Design'].map(name => ({
    id: genId(), name, topics: [], completion: 0, revised: false, interviewReady: false
  }));
}

function getDefaultJava() {
  return ['Basics','OOP','Collections','Exception Handling','Multithreading','Streams','Generics','JVM','JDK','JRE'].map(name => ({
    id: genId(), name, progress: 0, notes: '', completed: false
  }));
}

function getDefaultProjects() {
  return ['KiranaSightAI','DesignIQ','LegalNER','Hostel Management','Contact Book'].map(name => ({
    id: genId(), name, architecture: '', techStack: '', interviewQuestions: '',
    improvements: '', deployment: '', documentation: '', presentationReady: false,
    status: 'Not Started'
  }));
}

function getDefaultInterview() {
  return {
    hr: [
      { id: genId(), question: "Tell me about yourself and your journey to becoming an AI Developer.", status: "Needs Revision" },
      { id: genId(), question: "Why do you want to join our team as an AI Engineer, and where do you see yourself in 3 years?", status: "Needs Revision" },
      { id: genId(), question: "What are your biggest technical strengths and weaknesses when it comes to deep learning?", status: "Needs Revision" }
    ],
    technical: [
      { id: genId(), question: "How does the self-attention mechanism work in Transformers, and why is it superior to LSTMs?", status: "Needs Revision" },
      { id: genId(), question: "What is the difference between supervised, unsupervised, and reinforcement learning? Give examples.", status: "Needs Revision" },
      { id: genId(), question: "Explain gradient descent, backpropagation, and common regularization techniques (like Dropout/L2).", status: "Needs Revision" },
      { id: genId(), question: "Describe RAG (Retrieval-Augmented Generation) and how you optimize vector search databases.", status: "Needs Revision" }
    ],
    project: [
      { id: genId(), question: "Walk through the architecture, tech stack, and data flow of your project KiranaSightAI.", status: "Needs Revision" },
      { id: genId(), question: "What was the most challenging technical roadblock in LegalNER, and how did you resolve it?", status: "Needs Revision" },
      { id: genId(), question: "How would you design the database and REST APIs for a Hostel Management system to handle concurrent bookings?", status: "Needs Revision" }
    ],
    behavioral: [
      { id: genId(), question: "Describe a project challenge where you had to work with a teammate whose approach conflicted with yours. How did you align?", status: "Needs Revision" },
      { id: genId(), question: "Tell me about a time you made a mistake or failed on a coding project. How did you handle it and what did you learn?", status: "Needs Revision" },
      { id: genId(), question: "Describe a time you had to learn a complex new AI concept or technology in a very short timeframe.", status: "Needs Revision" }
    ],
    companySpecific: [
      { id: genId(), question: "Reverse a Singly Linked List in place. Write the Python code and state the time/space complexity.", status: "Needs Revision" },
      { id: genId(), question: "Design a system like Twitter: scale requirements, DB schema, load balancer, cache layer, and CDN.", status: "Needs Revision" },
      { id: genId(), question: "Given a text stream, how would you search for a list of pattern strings efficiently? (Aho-Corasick or Trie-based).", status: "Needs Revision" }
    ]
  };
}

function getDefaultAchievements() {
  return [
    { id: 'first_day', icon: '🌅', title: 'First Day', desc: 'Complete your first task', unlocked: false },
    { id: 'streak_7', icon: '🔥', title: '7 Day Streak', desc: 'Maintain a 7-day streak', unlocked: false },
    { id: 'streak_30', icon: '⚡', title: '30 Day Streak', desc: 'Maintain a 30-day streak', unlocked: false },
    { id: 'problems_50', icon: '💪', title: '50 Problems', desc: 'Solve 50 DSA problems', unlocked: false },
    { id: 'problems_100', icon: '🏆', title: '100 Problems', desc: 'Solve 100 DSA problems', unlocked: false },
    { id: 'python_done', icon: '🐍', title: 'Python Master', desc: 'Complete Python skill', unlocked: false },
    { id: 'ai_done', icon: '🤖', title: 'AI Complete', desc: 'Complete AI Roadmap', unlocked: false },
    { id: 'dsa_done', icon: '🧮', title: 'DSA Champion', desc: 'Complete all DSA topics', unlocked: false },
    { id: 'java_done', icon: '☕', title: 'Java Expert', desc: 'Complete Java tracker', unlocked: false },
    { id: 'interview_ready', icon: '🎯', title: 'Interview Ready', desc: 'Mark 20+ questions as mastered', unlocked: false },
    { id: 'placement_ready', icon: '👑', title: 'Placement Ready', desc: 'Reach 80% total progress', unlocked: false },
    { id: 'early_bird', icon: '🐦', title: 'Early Bird', desc: 'Log study before 8 AM', unlocked: false },
  ];
}

// ============ QUOTES ============
const quotes = [
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Code is like humor. When you have to explain it, it's bad. — Cory House",
  "First, solve the problem. Then, write the code. — John Johnson",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Stay hungry, stay foolish. — Steve Jobs",
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Discipline is the bridge between goals and accomplishment.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The expert in anything was once a beginner.",
  "Don't watch the clock; do what it does. Keep going."
];

// ============ MISSIONS ============
function generateMissions() {
  const today = new Date().toDateString();
  if (state.missionDate !== today) {
    state.dailyMission = { title: 'Daily Grind', desc: 'Complete 3 tasks today', target: 3, progress: 0, reward: 50, type: 'daily' };
    state.missionDate = today;
    if (!state.weeklyMission || !state.weeklyMission.progress) {
      state.weeklyMission = { title: 'Week Warrior', desc: 'Study 10 hours this week', target: 10, progress: 0, reward: 200, type: 'weekly' };
    }
    if (!state.monthlyMission || !state.monthlyMission.progress) {
      state.monthlyMission = { title: 'Monthly Master', desc: 'Solve 30 DSA problems', target: 30, progress: 0, reward: 500, type: 'monthly' };
    }
    saveState();
  }
}

// ============ GAMIFICATION ============
function addXP(amount) {
  state.xp += amount;
  const newLevel = Math.floor(state.xp / 200) + 1;
  if (newLevel > state.level) {
    state.level = newLevel;
    showToast(`🎉 Level Up! You're now Level ${state.level}!`, 'success');
  }
  state.coins += Math.floor(amount / 5);
  updateGamificationUI();
  saveState();
}

function updateGamificationUI() {
  const xpEl = document.getElementById('xp-value');
  const coinsEl = document.getElementById('coins-value');
  const streakEl = document.getElementById('streak-value');
  const levelEl = document.getElementById('sidebar-level');
  if (xpEl) xpEl.textContent = `${state.xp} XP`;
  if (coinsEl) coinsEl.textContent = state.coins;
  if (streakEl) streakEl.textContent = state.currentStreak;
  if (levelEl) levelEl.textContent = `Level ${state.level} • ${state.xp} XP`;
}

// ============ STREAK MANAGEMENT ============
function updateStreak() {
  const today = new Date().toDateString();
  if (state.lastActiveDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (state.lastActiveDate === yesterday.toDateString()) {
      state.currentStreak++;
    } else if (state.lastActiveDate !== today) {
      state.currentStreak = 1;
    }
    state.lastActiveDate = today;
    if (state.currentStreak > state.longestStreak) {
      state.longestStreak = state.currentStreak;
    }
    saveState();
  }
}

// ============ CONFETTI ============
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#22c55e', '#f59e0b', '#ec4899', '#3b82f6'];
  
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      w: Math.random() * 10 + 4,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }
  
  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      if (p.opacity <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.005;
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (alive && frame < 300) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  animate();
}

// ============ TOAST ============
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type] || ''}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(20px)'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ============ ROUTER ============
let currentPage = 'dashboard';

function navigateTo(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  const pageTitle = document.getElementById('page-title');
  const pageTitles = {
    dashboard: 'Dashboard', roadmap: 'Roadmap', planner: 'Daily Planner',
    skills: 'Skills Tracker', dsa: 'DSA Tracker', 'ai-roadmap': 'AI Roadmap',
    fullstack: 'Full Stack Roadmap', 'core-cse': 'Core CSE', java: 'Java Tracker',
    projects: 'Projects', interview: 'Interview Prep', communication: 'Communication',
    achievements: 'Achievements', analytics: 'Analytics', notes: 'Notes', settings: 'Settings'
  };
  pageTitle.textContent = pageTitles[page] || page;
  renderPage(page);
  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('mobile-open');
}

// ============ HELPER FUNCTIONS ============
function getDaysRemaining() {
  const start = new Date(state.startDate);
  const now = new Date();
  const elapsed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return Math.max(0, state.totalDays - elapsed);
}

function getTotalProgress() {
  let total = 0, count = 0;
  state.skills.forEach(s => { total += s.progress; count++; });
  state.dsa.forEach(d => { total += d.confidence; count++; });
  state.aiRoadmap.forEach(a => { total += a.progress; count++; });
  return count > 0 ? Math.round(total / count) : 0;
}

function getTasksCompletedToday() {
  const today = new Date().toDateString();
  return state.tasks.filter(t => t.status === 'completed' && t.completedDate && new Date(t.completedDate).toDateString() === today).length;
}

function getTasksPending() {
  return state.tasks.filter(t => t.status !== 'completed').length;
}

function getTotalDSAProblems() {
  return state.dsa.reduce((sum, d) => sum + d.problemsSolved, 0);
}

function circularProgressSVG(percent, color = 'url(#gradient)', size = 80) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return `<svg width="${size}" height="${size}" viewBox="0 0 80 80">
    <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366f1"/><stop offset="100%" style="stop-color:#a855f7"/></linearGradient></defs>
    <circle class="progress-bg" cx="40" cy="40" r="${r}"/>
    <circle class="progress-fill" cx="40" cy="40" r="${r}" stroke="${color}" stroke-dasharray="${c}" stroke-dashoffset="${offset}"/>
  </svg>`;
}

// ============ RENDER PAGE ============
function renderPage(page) {
  const content = document.getElementById('page-content');
  content.scrollTop = 0;
  
  switch(page) {
    case 'dashboard': renderDashboard(content); break;
    case 'roadmap': renderRoadmap(content); break;
    case 'planner': renderPlanner(content); break;
    case 'skills': renderSkills(content); break;
    case 'dsa': renderDSA(content); break;
    case 'ai-roadmap': renderAIRoadmap(content); break;
    case 'fullstack': renderFullstack(content); break;
    case 'core-cse': renderCoreCse(content); break;
    case 'java': renderJavaTracker(content); break;
    case 'projects': renderProjects(content); break;
    case 'interview': renderInterview(content); break;
    case 'communication': renderCommunication(content); break;
    case 'achievements': renderAchievements(content); break;
    case 'analytics': renderAnalytics(content); break;
    case 'notes': renderNotes(content); break;
    case 'settings': renderSettings(content); break;
    default: renderDashboard(content);
  }
}

// ============ DASHBOARD ============
function renderDashboard(el) {
  const totalProgress = getTotalProgress();
  const daysRemaining = getDaysRemaining();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  generateMissions();
  
  const weeklyProgress = Math.min(100, Math.round((state.tasks.filter(t => {
    const d = new Date(t.createdAt);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return t.status === 'completed' && d >= weekAgo;
  }).length / Math.max(1, state.tasks.filter(t => {
    const d = new Date(t.createdAt);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  }).length)) * 100));

  el.innerHTML = `
    <div class="dashboard-welcome animate-in">
      <div class="welcome-card">
        <h2>Welcome, Mayakuntla Lakshmi Vijaya 👋</h2>
        <div class="welcome-subtitle">Your personal operating system for becoming an Elite AI Engineer</div>
        <div class="welcome-goals">
          <span class="goal-tag">🤖 Become an AI Developer</span>
          <span class="goal-tag">💻 AI Full Stack Developer</span>
          <span class="goal-tag">🧮 Master DSA with Python</span>
          <span class="goal-tag">💰 Crack 30+ LPA Placements</span>
        </div>
        <div class="welcome-quote">"${quote}"</div>
      </div>
    </div>

    <div class="circular-progress-container animate-in">
      <div class="circular-progress-card">
        <div class="circular-progress">
          ${circularProgressSVG(totalProgress)}
          <div class="progress-text">${totalProgress}%</div>
        </div>
        <div class="circular-progress-label">Total Progress</div>
      </div>
      <div class="circular-progress-card">
        <div class="circular-progress">
          ${circularProgressSVG(Math.min(100, getTasksCompletedToday() * 20))}
          <div class="progress-text">${getTasksCompletedToday()}</div>
        </div>
        <div class="circular-progress-label">Today's Tasks</div>
      </div>
      <div class="circular-progress-card">
        <div class="circular-progress">
          ${circularProgressSVG(weeklyProgress)}
          <div class="progress-text">${weeklyProgress}%</div>
        </div>
        <div class="circular-progress-label">Weekly Progress</div>
      </div>
      <div class="circular-progress-card">
        <div class="circular-progress">
          ${circularProgressSVG(Math.min(100, Math.round(state.skills.filter(s => s.progress >= 50).length / state.skills.length * 100)))}
          <div class="progress-text">${Math.round(state.skills.filter(s => s.progress >= 50).length / state.skills.length * 100)}%</div>
        </div>
        <div class="circular-progress-label">Monthly Progress</div>
      </div>
    </div>

    <div class="stats-grid animate-in">
      <div class="stat-card">
        <div class="stat-header"><div class="stat-icon" style="background:var(--accent-primary-subtle)">🔥</div></div>
        <div class="stat-value">${state.currentStreak}</div>
        <div class="stat-label">Current Streak</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><div class="stat-icon" style="background:var(--warning-subtle)">⚡</div></div>
        <div class="stat-value">${state.longestStreak}</div>
        <div class="stat-label">Longest Streak</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><div class="stat-icon" style="background:var(--error-subtle)">⏳</div></div>
        <div class="stat-value">${daysRemaining}</div>
        <div class="stat-label">Days Remaining</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><div class="stat-icon" style="background:var(--info-subtle)">📚</div></div>
        <div class="stat-value">${state.totalHoursStudied.toFixed(1)}</div>
        <div class="stat-label">Total Hours</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><div class="stat-icon" style="background:var(--success-subtle)">🕐</div></div>
        <div class="stat-value">${state.hoursToday.toFixed(1)}</div>
        <div class="stat-label">Hours Today</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><div class="stat-icon" style="background:var(--accent-primary-subtle)">✅</div></div>
        <div class="stat-value">${state.tasks.filter(t => t.status === 'completed').length}</div>
        <div class="stat-label">Tasks Completed</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><div class="stat-icon" style="background:var(--warning-subtle)">📋</div></div>
        <div class="stat-value">${getTasksPending()}</div>
        <div class="stat-label">Tasks Pending</div>
      </div>
      <div class="stat-card">
        <div class="stat-header"><div class="stat-icon" style="background:var(--info-subtle)">🧮</div></div>
        <div class="stat-value">${getTotalDSAProblems()}</div>
        <div class="stat-label">DSA Problems</div>
      </div>
    </div>

    <div class="section-header animate-in">
      <div class="section-title"><span class="section-icon">🎯</span> Active Missions</div>
    </div>
    <div class="card-grid mb-24 animate-in">
      ${renderMissionCard(state.dailyMission, 'daily')}
      ${renderMissionCard(state.weeklyMission, 'weekly')}
      ${renderMissionCard(state.monthlyMission, 'monthly')}
    </div>

    <div class="section-header animate-in">
      <div class="section-title"><span class="section-icon">📊</span> Quick Overview</div>
    </div>
    <div class="card-grid animate-in">
      <div class="card">
        <div class="card-header"><div class="card-title">Top Skills</div></div>
        ${state.skills.sort((a,b) => b.progress - a.progress).slice(0, 5).map(s => `
          <div class="progress-bar-label"><span class="label">${s.name}</span><span class="value">${s.progress}%</span></div>
          <div class="progress-bar-wrap mb-8"><div class="progress-bar-fill" style="width:${s.progress}%"></div></div>
        `).join('')}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">DSA Progress</div></div>
        ${state.dsa.slice(0, 5).map(d => `
          <div class="progress-bar-label"><span class="label">${d.name}</span><span class="value">${d.confidence}%</span></div>
          <div class="progress-bar-wrap mb-8"><div class="progress-bar-fill" style="width:${d.confidence}%"></div></div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderMissionCard(mission, type) {
  if (!mission) return '';
  const icons = { daily: '🎯', weekly: '📅', monthly: '🏆' };
  const bgColors = { daily: 'var(--accent-primary-subtle)', weekly: 'var(--success-subtle)', monthly: 'var(--warning-subtle)' };
  const pct = Math.min(100, Math.round((mission.progress / mission.target) * 100));
  return `
    <div class="mission-card">
      <div class="mission-icon" style="background:${bgColors[type]}">${icons[type]}</div>
      <div class="mission-info">
        <div class="mission-title">${mission.title}</div>
        <div class="mission-desc">${mission.desc}</div>
        <div class="progress-bar-wrap mt-8"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="mission-reward">+${mission.reward} XP</div>
    </div>
  `;
}

// ============ ROADMAP ============
function renderRoadmap(el) {
  const phases = [
    { phase: 'Week 1-2', title: 'Foundation & Core Concepts', desc: 'Master Python, DSA basics, Git, and set up development environment', items: ['Python mastery', 'DSA fundamentals', 'Git & GitHub', 'Dev environment setup'] },
    { phase: 'Week 3-4', title: 'Data Science & ML Foundations', desc: 'Learn NumPy, Pandas, ML algorithms, and build first models', items: ['NumPy & Pandas', 'Machine Learning basics', 'Scikit-learn projects', 'SQL & Databases'] },
    { phase: 'Week 5-6', title: 'Deep Learning & NLP', desc: 'Neural networks, CNNs, RNNs, Transformers, and NLP techniques', items: ['Deep Learning', 'CNN & Computer Vision', 'NLP & Transformers', 'BERT & GPT fine-tuning'] },
    { phase: 'Week 7-8', title: 'AI Engineering & Full Stack', desc: 'RAG, AI Agents, LLMs, React, Spring Boot, and deployment', items: ['RAG & Vector DBs', 'AI Agents', 'React & Spring Boot', 'API development'] },
    { phase: 'Week 9', title: 'Interview Preparation', desc: 'Mock interviews, system design, behavioral questions', items: ['DSA problem solving', 'System design', 'Mock interviews', 'Communication practice'] },
  ];

  el.innerHTML = `
    <div class="roadmap-timeline">
      ${phases.map((p, i) => `
        <div class="roadmap-item animate-in" style="animation-delay:${i * 80}ms">
          <div class="roadmap-phase">${p.phase}</div>
          <div class="roadmap-title">${p.title}</div>
          <div class="roadmap-desc">${p.desc}</div>
          <div class="flex flex-wrap gap-8">
            ${p.items.map(item => `<span class="badge badge-primary">${item}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ============ DAILY PLANNER ============
function renderPlanner(el) {
  const today = new Date().toDateString();
  const todayTasks = state.tasks.filter(t => !t.completedDate || new Date(t.completedDate).toDateString() === today || t.status !== 'completed');
  
  el.innerHTML = `
    <div class="section-header">
      <div class="section-title"><span class="section-icon">📅</span> Today's Plan</div>
      <button class="btn btn-primary" id="add-task-btn">+ Add Task</button>
    </div>
    
    <div class="tabs">
      <button class="tab-btn active" data-filter="all">All</button>
      <button class="tab-btn" data-filter="not-started">⬜ Not Started</button>
      <button class="tab-btn" data-filter="in-progress">🟡 In Progress</button>
      <button class="tab-btn" data-filter="completed">🟢 Completed</button>
      <button class="tab-btn" data-filter="missed">🔴 Missed</button>
    </div>

    <div class="task-list" id="task-list">
      ${state.tasks.length === 0 ? `
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <div class="empty-title">No tasks yet</div>
          <div class="empty-desc">Click "Add Task" to start planning your day</div>
        </div>
      ` : state.tasks.map(t => renderTaskItem(t)).join('')}
    </div>
  `;
  
  document.getElementById('add-task-btn').addEventListener('click', () => openTaskModal());
  
  // Tab filtering
  el.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      el.querySelectorAll('.task-item').forEach(item => {
        if (filter === 'all') item.style.display = '';
        else item.style.display = item.dataset.status === filter ? '' : 'none';
      });
    });
  });

  // Drag and drop
  initDragDrop();
}

function renderTaskItem(task) {
  const statusClass = task.status === 'completed' ? 'completed' : task.status === 'in-progress' ? 'in-progress' : task.status === 'missed' ? 'missed' : '';
  const priorityClass = task.priority === 'High' ? 'priority-high' : task.priority === 'Medium' ? 'priority-medium' : 'priority-low';
  const statusIcons = { 'not-started': '', 'in-progress': '⏳', 'completed': '✓', 'missed': '✕' };
  
  return `
    <div class="task-item" draggable="true" data-id="${task.id}" data-status="${task.status}">
      <div class="drag-handle">⠿</div>
      <div class="priority-dot ${priorityClass}"></div>
      <button class="task-checkbox ${statusClass}" data-task-id="${task.id}">${statusIcons[task.status] || ''}</button>
      <div class="task-info">
        <div class="task-title ${task.status === 'completed' ? 'completed-text' : ''}">${task.title}</div>
        <div class="task-meta">
          <span class="badge badge-${task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'success'}">${task.priority}</span>
          ${task.category ? `<span class="badge badge-info">${task.category}</span>` : ''}
          ${task.estimatedTime ? `<span>⏱ Est: ${task.estimatedTime}</span>` : ''}
          ${task.actualTime ? `<span>⏱ Act: ${task.actualTime}</span>` : ''}
          ${task.deadline ? `<span>📅 ${task.deadline}</span>` : ''}
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-icon" onclick="editTask('${task.id}')" title="Edit">✏️</button>
        <button class="btn-icon" onclick="duplicateTask('${task.id}')" title="Duplicate">📋</button>
        <button class="btn-icon" onclick="deleteTask('${task.id}')" title="Delete">🗑️</button>
      </div>
    </div>
  `;
}

function initDragDrop() {
  const list = document.getElementById('task-list');
  if (!list) return;
  let dragItem = null;

  list.addEventListener('dragstart', e => {
    dragItem = e.target.closest('.task-item');
    if (dragItem) {
      dragItem.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    }
  });

  list.addEventListener('dragend', e => {
    if (dragItem) {
      dragItem.classList.remove('dragging');
      // Save new order to state
      const taskElements = [...list.querySelectorAll('.task-item')];
      const orderedIds = taskElements.map(el => el.dataset.id);
      
      const newTasks = [];
      orderedIds.forEach(id => {
        const found = state.tasks.find(t => t.id === id);
        if (found) newTasks.push(found);
      });
      
      // Also append any tasks that were not in the DOM list (if they were filtered)
      state.tasks.forEach(t => {
        if (!orderedIds.includes(t.id)) {
          newTasks.push(t);
        }
      });
      
      state.tasks = newTasks;
      saveState();
    }
    dragItem = null;
  });

  list.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientY);
    if (dragItem) {
      if (afterElement == null) list.appendChild(dragItem);
      else list.insertBefore(dragItem, afterElement);
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) return { offset, element: child };
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  // Task checkbox click
  list.querySelectorAll('.task-checkbox').forEach(cb => {
    cb.addEventListener('click', () => {
      const taskId = cb.dataset.taskId;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        const statuses = ['not-started', 'in-progress', 'completed', 'missed'];
        const currentIdx = statuses.indexOf(task.status);
        task.status = statuses[(currentIdx + 1) % statuses.length];
        if (task.status === 'completed') {
          task.completedDate = new Date().toISOString();
          addXP(25);
          fireConfetti();
          showToast('🎉 Task completed! +25 XP', 'success');
          // Update daily mission
          if (state.dailyMission) state.dailyMission.progress++;
          checkAchievements();
        }
        saveState();
        renderPage('planner');
      }
    });
  });
}

function openTaskModal(taskToEdit = null) {
  const existing = document.querySelector('.modal');
  if (existing) existing.remove();
  
  const isEdit = !!taskToEdit;
  const task = taskToEdit || { title: '', description: '', category: '', priority: 'Medium', estimatedTime: '', actualTime: '', deadline: '', notes: '', status: 'not-started' };
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'task-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">${isEdit ? 'Edit Task' : 'New Task'}</div>
        <button class="btn-icon" id="close-modal">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Title</label>
          <input class="form-input" id="task-title" value="${task.title}" placeholder="Task title..." />
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-textarea" id="task-desc" placeholder="Add description...">${task.description}</textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Category</label>
            <select class="form-select" id="task-category">
              <option value="">Select...</option>
              ${['DSA','AI/ML','Full Stack','Java','Core CSE','Projects','Interview','Communication','Other'].map(c => `<option value="${c}" ${task.category === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Priority</label>
            <select class="form-select" id="task-priority">
              ${['Low','Medium','High'].map(p => `<option value="${p}" ${task.priority === p ? 'selected' : ''}>${p}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Estimated Time</label>
            <input class="form-input" id="task-est" value="${task.estimatedTime}" placeholder="e.g. 2h" />
          </div>
          <div class="form-group">
            <label class="form-label">Actual Time</label>
            <input class="form-input" id="task-act" value="${task.actualTime || ''}" placeholder="e.g. 1.5h" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Deadline</label>
            <input class="form-input" id="task-deadline" type="date" value="${task.deadline}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Notes</label>
          <textarea class="form-textarea" id="task-notes" placeholder="Additional notes...">${task.notes || ''}</textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="cancel-task">Cancel</button>
        <button class="btn btn-primary" id="save-task">${isEdit ? 'Update' : 'Add Task'}</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  document.getElementById('close-modal').addEventListener('click', () => modal.remove());
  document.getElementById('cancel-task').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  
  document.getElementById('save-task').addEventListener('click', () => {
    const title = document.getElementById('task-title').value.trim();
    if (!title) { showToast('Please enter a task title', 'warning'); return; }
    
    const newTask = {
      id: isEdit ? task.id : genId(),
      title,
      description: document.getElementById('task-desc').value,
      category: document.getElementById('task-category').value,
      priority: document.getElementById('task-priority').value,
      estimatedTime: document.getElementById('task-est').value,
      actualTime: document.getElementById('task-act').value,
      deadline: document.getElementById('task-deadline').value,
      notes: document.getElementById('task-notes').value,
      status: isEdit ? task.status : 'not-started',
      createdAt: isEdit ? task.createdAt : new Date().toISOString(),
      completedDate: isEdit ? task.completedDate : null
    };
    
    if (isEdit) {
      const idx = state.tasks.findIndex(t => t.id === task.id);
      if (idx !== -1) state.tasks[idx] = newTask;
    } else {
      state.tasks.push(newTask);
      addXP(5);
    }
    
    saveState();
    modal.remove();
    showToast(isEdit ? 'Task updated!' : 'Task added! +5 XP', 'success');
    renderPage('planner');
  });
}

// Global task functions
window.editTask = function(id) {
  const task = state.tasks.find(t => t.id === id);
  if (task) openTaskModal(task);
};

window.duplicateTask = function(id) {
  const task = state.tasks.find(t => t.id === id);
  if (task) {
    const dup = { ...task, id: genId(), status: 'not-started', completedDate: null, createdAt: new Date().toISOString() };
    state.tasks.push(dup);
    saveState();
    showToast('Task duplicated!', 'info');
    renderPage('planner');
  }
};

window.deleteTask = function(id) {
  state.tasks = state.tasks.filter(t => t.id !== id);
  saveState();
  showToast('Task deleted', 'info');
  renderPage('planner');
};

// ============ SKILLS TRACKER ============
function renderSkills(el) {
  el.innerHTML = `
    <div class="section-header">
      <div class="section-title"><span class="section-icon">⭐</span> Skills (${state.skills.length})</div>
      <button class="btn btn-primary" id="add-skill-btn">+ Add Skill</button>
    </div>
    <div class="tracker-grid">
      ${state.skills.map(s => `
        <div class="tracker-card animate-in">
          <div class="tracker-card-header">
            <div class="tracker-card-title">${s.name}</div>
            <span class="mastery-badge mastery-${s.mastery.toLowerCase()}">${s.mastery}</span>
          </div>
          <div class="progress-bar-label"><span class="label">Progress</span><span class="value">${s.progress}%</span></div>
          <div class="progress-bar-wrap mb-16"><div class="progress-bar-fill" style="width:${s.progress}%"></div></div>
          <div class="tracker-stat-row"><span class="stat-key">Difficulty</span><span class="stat-val">${s.difficulty}</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Confidence</span><span class="stat-val">${s.confidence}%</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Time Invested</span><span class="stat-val">${s.timeInvested}h</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Last Revised</span><span class="stat-val">${s.lastRevised || 'Never'}</span></div>
          <div class="flex gap-8 mt-16">
            <button class="btn btn-sm btn-secondary" onclick="editSkill('${s.id}')">Edit</button>
            <button class="btn btn-sm btn-ghost" onclick="deleteSkill('${s.id}')">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  document.getElementById('add-skill-btn').addEventListener('click', () => openSkillModal());
}

function openSkillModal(skillToEdit = null) {
  const existing = document.querySelector('.modal');
  if (existing) existing.remove();
  const isEdit = !!skillToEdit;
  const s = skillToEdit || { name: '', progress: 0, difficulty: 'Medium', confidence: 0, timeInvested: 0, mastery: 'Beginner', notes: '' };
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">${isEdit ? 'Edit Skill' : 'Add Skill'}</div>
        <button class="btn-icon" onclick="this.closest('.modal').remove()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">Name</label><input class="form-input" id="sk-name" value="${s.name}" placeholder="Skill name..." /></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Progress (%)</label><input class="form-input" id="sk-progress" type="number" min="0" max="100" value="${s.progress}" /></div>
          <div class="form-group"><label class="form-label">Confidence (%)</label><input class="form-input" id="sk-confidence" type="number" min="0" max="100" value="${s.confidence}" /></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Difficulty</label><select class="form-select" id="sk-diff">${['Easy','Medium','Hard'].map(d => `<option ${s.difficulty===d?'selected':''}>${d}</option>`).join('')}</select></div>
          <div class="form-group"><label class="form-label">Mastery</label><select class="form-select" id="sk-mastery">${['Beginner','Intermediate','Advanced','Mastered'].map(m => `<option ${s.mastery===m?'selected':''}>${m}</option>`).join('')}</select></div>
        </div>
        <div class="form-group"><label class="form-label">Time Invested (hours)</label><input class="form-input" id="sk-time" type="number" min="0" value="${s.timeInvested}" /></div>
        <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" id="sk-notes">${s.notes}</textarea></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
        <button class="btn btn-primary" id="save-skill">Save</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  
  document.getElementById('save-skill').addEventListener('click', () => {
    const name = document.getElementById('sk-name').value.trim();
    if (!name) return showToast('Enter skill name', 'warning');
    const data = {
      id: isEdit ? s.id : genId(), name,
      progress: parseInt(document.getElementById('sk-progress').value) || 0,
      confidence: parseInt(document.getElementById('sk-confidence').value) || 0,
      difficulty: document.getElementById('sk-diff').value,
      mastery: document.getElementById('sk-mastery').value,
      timeInvested: parseFloat(document.getElementById('sk-time').value) || 0,
      notes: document.getElementById('sk-notes').value,
      lastRevised: new Date().toLocaleDateString(),
      nextRevision: s.nextRevision
    };
    if (isEdit) { const idx = state.skills.findIndex(sk => sk.id === s.id); if (idx !== -1) state.skills[idx] = data; }
    else { state.skills.push(data); addXP(10); }
    saveState(); modal.remove(); renderPage('skills');
    showToast(isEdit ? 'Skill updated!' : 'Skill added!', 'success');
  });
}

window.editSkill = function(id) { const s = state.skills.find(s => s.id === id); if (s) openSkillModal(s); };
window.deleteSkill = function(id) { state.skills = state.skills.filter(s => s.id !== id); saveState(); renderPage('skills'); showToast('Skill deleted', 'info'); };

// ============ DSA TRACKER ============
function renderDSA(el) {
  const totalProblems = getTotalDSAProblems();
  const avgConfidence = Math.round(state.dsa.reduce((s, d) => s + d.confidence, 0) / state.dsa.length);
  
  el.innerHTML = `
    <div class="stats-grid mb-24 animate-in">
      <div class="stat-card"><div class="stat-value">${totalProblems}</div><div class="stat-label">Total Problems</div></div>
      <div class="stat-card"><div class="stat-value">${avgConfidence}%</div><div class="stat-label">Avg Confidence</div></div>
      <div class="stat-card"><div class="stat-value">${state.dsa.filter(d => d.conceptLearned).length}/${state.dsa.length}</div><div class="stat-label">Concepts Learned</div></div>
      <div class="stat-card"><div class="stat-value">${state.dsa.reduce((s,d) => s + d.easy, 0)}</div><div class="stat-label">Easy Solved</div></div>
      <div class="stat-card"><div class="stat-value">${state.dsa.reduce((s,d) => s + d.medium, 0)}</div><div class="stat-label">Medium Solved</div></div>
      <div class="stat-card"><div class="stat-value">${state.dsa.reduce((s,d) => s + d.hard, 0)}</div><div class="stat-label">Hard Solved</div></div>
    </div>
    <div class="tracker-grid">
      ${state.dsa.map(d => `
        <div class="tracker-card animate-in">
          <div class="tracker-card-header">
            <div class="tracker-card-title">${d.name}</div>
            <span class="badge ${d.conceptLearned ? 'badge-success' : 'badge-warning'}">${d.conceptLearned ? '✓ Learned' : 'Pending'}</span>
          </div>
          <div class="progress-bar-label"><span class="label">Confidence</span><span class="value">${d.confidence}%</span></div>
          <div class="progress-bar-wrap mb-16"><div class="progress-bar-fill" style="width:${d.confidence}%"></div></div>
          <div class="tracker-stat-row"><span class="stat-key">Problems Solved</span><span class="stat-val">${d.problemsSolved}</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Easy / Med / Hard</span><span class="stat-val text-success">${d.easy}</span> / <span class="stat-val text-warning">${d.medium}</span> / <span class="stat-val text-error">${d.hard}</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Revision</span><span class="stat-val">${d.revisionStatus}</span></div>
          <button class="btn btn-sm btn-secondary mt-16 w-full" onclick="editDSA('${d.id}')">Update Progress</button>
        </div>
      `).join('')}
    </div>
  `;
}

window.editDSA = function(id) {
  const d = state.dsa.find(d => d.id === id);
  if (!d) return;
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header"><div class="modal-title">Update: ${d.name}</div><button class="btn-icon" onclick="this.closest('.modal').remove()">✕</button></div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label"><input type="checkbox" id="dsa-concept" ${d.conceptLearned ? 'checked' : ''} /> Concept Learned</label></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Easy</label><input class="form-input" id="dsa-easy" type="number" min="0" value="${d.easy}" /></div>
          <div class="form-group"><label class="form-label">Medium</label><input class="form-input" id="dsa-med" type="number" min="0" value="${d.medium}" /></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Hard</label><input class="form-input" id="dsa-hard" type="number" min="0" value="${d.hard}" /></div>
          <div class="form-group"><label class="form-label">Confidence %</label><input class="form-input" id="dsa-conf" type="number" min="0" max="100" value="${d.confidence}" /></div>
        </div>
        <div class="form-group"><label class="form-label">Revision Status</label><select class="form-select" id="dsa-rev">${['Not Revised','Needs Revision','Revised','Mastered'].map(r => `<option ${d.revisionStatus===r?'selected':''}>${r}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" id="dsa-notes">${d.notes}</textarea></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button><button class="btn btn-primary" id="save-dsa">Save</button></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  
  document.getElementById('save-dsa').addEventListener('click', () => {
    const oldProblems = d.problemsSolved;
    d.conceptLearned = document.getElementById('dsa-concept').checked;
    d.easy = parseInt(document.getElementById('dsa-easy').value) || 0;
    d.medium = parseInt(document.getElementById('dsa-med').value) || 0;
    d.hard = parseInt(document.getElementById('dsa-hard').value) || 0;
    d.problemsSolved = d.easy + d.medium + d.hard;
    d.confidence = parseInt(document.getElementById('dsa-conf').value) || 0;
    d.revisionStatus = document.getElementById('dsa-rev').value;
    d.notes = document.getElementById('dsa-notes').value;
    const newProblems = d.problemsSolved - oldProblems;
    if (newProblems > 0) { addXP(newProblems * 10); if (state.monthlyMission) state.monthlyMission.progress += newProblems; }
    checkAchievements();
    saveState(); modal.remove(); renderPage('dsa');
    showToast('DSA topic updated!', 'success');
  });
};

// ============ AI ROADMAP ============
function renderAIRoadmap(el) {
  const completed = state.aiRoadmap.filter(a => a.completed).length;
  const avgProgress = Math.round(state.aiRoadmap.reduce((s, a) => s + a.progress, 0) / state.aiRoadmap.length);
  
  el.innerHTML = `
    <div class="stats-grid mb-24 animate-in">
      <div class="stat-card"><div class="stat-value">${avgProgress}%</div><div class="stat-label">Overall Progress</div></div>
      <div class="stat-card"><div class="stat-value">${completed}/${state.aiRoadmap.length}</div><div class="stat-label">Modules Completed</div></div>
    </div>
    <div class="tracker-grid">
      ${state.aiRoadmap.map(a => `
        <div class="tracker-card animate-in">
          <div class="tracker-card-header">
            <div class="tracker-card-title">${a.name}</div>
            <span class="badge ${a.completed ? 'badge-success' : 'badge-warning'}">${a.completed ? '✓ Done' : `${a.progress}%`}</span>
          </div>
          <div class="progress-bar-wrap mb-16"><div class="progress-bar-fill" style="width:${a.progress}%"></div></div>
          <div class="tracker-stat-row"><span class="stat-key">Confidence</span><span class="stat-val">${a.confidence}%</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Revised</span><span class="stat-val">${a.revised ? '✓' : '—'}</span></div>
          <button class="btn btn-sm btn-secondary mt-16 w-full" onclick="editAI('${a.id}')">Update</button>
        </div>
      `).join('')}
    </div>
  `;
}

window.editAI = function(id) {
  const a = state.aiRoadmap.find(a => a.id === id);
  if (!a) return;
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header"><div class="modal-title">${a.name}</div><button class="btn-icon" onclick="this.closest('.modal').remove()">✕</button></div>
      <div class="modal-body">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Progress %</label><input class="form-input" id="ai-prog" type="number" min="0" max="100" value="${a.progress}" /></div>
          <div class="form-group"><label class="form-label">Confidence %</label><input class="form-input" id="ai-conf" type="number" min="0" max="100" value="${a.confidence}" /></div>
        </div>
        <div class="form-group"><label class="form-label"><input type="checkbox" id="ai-done" ${a.completed?'checked':''} /> Completed</label></div>
        <div class="form-group"><label class="form-label"><input type="checkbox" id="ai-rev" ${a.revised?'checked':''} /> Revised</label></div>
        <div class="form-group"><label class="form-label">Resources</label><textarea class="form-textarea" id="ai-res">${a.resources}</textarea></div>
        <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" id="ai-notes">${a.notes}</textarea></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button><button class="btn btn-primary" id="save-ai">Save</button></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.getElementById('save-ai').addEventListener('click', () => {
    a.progress = parseInt(document.getElementById('ai-prog').value) || 0;
    a.confidence = parseInt(document.getElementById('ai-conf').value) || 0;
    a.completed = document.getElementById('ai-done').checked;
    a.revised = document.getElementById('ai-rev').checked;
    a.resources = document.getElementById('ai-res').value;
    a.notes = document.getElementById('ai-notes').value;
    if (a.completed) addXP(20);
    checkAchievements(); saveState(); modal.remove(); renderPage('ai-roadmap');
    showToast('Module updated!', 'success');
  });
};

// ============ FULL STACK ROADMAP ============
function renderFullstack(el) {
  el.innerHTML = `
    <div class="tabs">
      <button class="tab-btn active" data-tab="frontend">Frontend</button>
      <button class="tab-btn" data-tab="backend">Backend</button>
    </div>
    <div id="fullstack-content">
      ${renderFullstackSection(state.fullstack.frontend, 'frontend')}
    </div>
  `;
  el.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.getElementById('fullstack-content').innerHTML = renderFullstackSection(state.fullstack[tab], tab);
    });
  });
}

function renderFullstackSection(items, section) {
  return `<div class="tracker-grid">${items.map(item => `
    <div class="tracker-card animate-in">
      <div class="tracker-card-header"><div class="tracker-card-title">${item.name}</div><span class="badge badge-primary">${item.progress}%</span></div>
      <div class="progress-bar-wrap mb-16"><div class="progress-bar-fill" style="width:${item.progress}%"></div></div>
      <div class="tracker-stat-row"><span class="stat-key">Hours</span><span class="stat-val">${item.hours}h</span></div>
      <div class="tracker-stat-row"><span class="stat-key">Confidence</span><span class="stat-val">${item.confidence}%</span></div>
      <button class="btn btn-sm btn-secondary mt-16 w-full" onclick="editFullstack('${item.id}','${section}')">Update</button>
    </div>
  `).join('')}</div>`;
}

window.editFullstack = function(id, section) {
  const items = state.fullstack[section];
  const item = items.find(i => i.id === id);
  if (!item) return;
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header"><div class="modal-title">${item.name}</div><button class="btn-icon" onclick="this.closest('.modal').remove()">✕</button></div>
      <div class="modal-body">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Progress %</label><input class="form-input" id="fs-prog" type="number" min="0" max="100" value="${item.progress}" /></div>
          <div class="form-group"><label class="form-label">Confidence %</label><input class="form-input" id="fs-conf" type="number" min="0" max="100" value="${item.confidence}" /></div>
        </div>
        <div class="form-group"><label class="form-label">Hours</label><input class="form-input" id="fs-hours" type="number" min="0" value="${item.hours}" /></div>
        <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" id="fs-notes">${item.notes}</textarea></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button><button class="btn btn-primary" id="save-fs">Save</button></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.getElementById('save-fs').addEventListener('click', () => {
    item.progress = parseInt(document.getElementById('fs-prog').value) || 0;
    item.confidence = parseInt(document.getElementById('fs-conf').value) || 0;
    item.hours = parseFloat(document.getElementById('fs-hours').value) || 0;
    item.notes = document.getElementById('fs-notes').value;
    saveState(); modal.remove(); renderPage('fullstack');
    showToast('Updated!', 'success');
  });
};

// ============ CORE CSE ============
function renderCoreCse(el) {
  el.innerHTML = `
    <div class="tracker-grid">
      ${state.coreCse.map(c => `
        <div class="tracker-card animate-in">
          <div class="tracker-card-header">
            <div class="tracker-card-title">${c.name}</div>
            ${c.interviewReady ? '<span class="badge badge-success">🎯 Interview Ready</span>' : ''}
          </div>
          <div class="progress-bar-label"><span class="label">Completion</span><span class="value">${c.completion}%</span></div>
          <div class="progress-bar-wrap mb-16"><div class="progress-bar-fill" style="width:${c.completion}%"></div></div>
          <div class="tracker-stat-row"><span class="stat-key">Revised</span><span class="stat-val">${c.revised ? '✓ Yes' : '—'}</span></div>
          <button class="btn btn-sm btn-secondary mt-16 w-full" onclick="editCoreCse('${c.id}')">Update</button>
        </div>
      `).join('')}
    </div>
  `;
}

window.editCoreCse = function(id) {
  const c = state.coreCse.find(c => c.id === id);
  if (!c) return;
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header"><div class="modal-title">${c.name}</div><button class="btn-icon" onclick="this.closest('.modal').remove()">✕</button></div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">Completion %</label><input class="form-input" id="cse-comp" type="number" min="0" max="100" value="${c.completion}" /></div>
        <div class="form-group"><label class="form-label"><input type="checkbox" id="cse-rev" ${c.revised?'checked':''} /> Revised</label></div>
        <div class="form-group"><label class="form-label"><input type="checkbox" id="cse-ir" ${c.interviewReady?'checked':''} /> Interview Ready</label></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button><button class="btn btn-primary" id="save-cse">Save</button></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.getElementById('save-cse').addEventListener('click', () => {
    c.completion = parseInt(document.getElementById('cse-comp').value) || 0;
    c.revised = document.getElementById('cse-rev').checked;
    c.interviewReady = document.getElementById('cse-ir').checked;
    saveState(); modal.remove(); renderPage('core-cse'); showToast('Updated!', 'success');
  });
};

// ============ JAVA TRACKER ============
function renderJavaTracker(el) {
  const completed = state.java.filter(j => j.completed).length;
  el.innerHTML = `
    <div class="stats-grid mb-24 animate-in">
      <div class="stat-card"><div class="stat-value">${completed}/${state.java.length}</div><div class="stat-label">Completed</div></div>
      <div class="stat-card"><div class="stat-value">${Math.round(state.java.reduce((s,j) => s + j.progress, 0) / state.java.length)}%</div><div class="stat-label">Avg Progress</div></div>
    </div>
    <div class="tracker-grid">
      ${state.java.map(j => `
        <div class="tracker-card animate-in">
          <div class="tracker-card-header">
            <div class="tracker-card-title">${j.name}</div>
            <span class="badge ${j.completed ? 'badge-success' : 'badge-warning'}">${j.completed ? '✓ Done' : `${j.progress}%`}</span>
          </div>
          <div class="progress-bar-wrap mb-16"><div class="progress-bar-fill" style="width:${j.progress}%"></div></div>
          <button class="btn btn-sm btn-secondary w-full" onclick="editJava('${j.id}')">Update</button>
        </div>
      `).join('')}
    </div>
  `;
}

window.editJava = function(id) {
  const j = state.java.find(j => j.id === id);
  if (!j) return;
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header"><div class="modal-title">${j.name}</div><button class="btn-icon" onclick="this.closest('.modal').remove()">✕</button></div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">Progress %</label><input class="form-input" id="java-prog" type="number" min="0" max="100" value="${j.progress}" /></div>
        <div class="form-group"><label class="form-label"><input type="checkbox" id="java-done" ${j.completed?'checked':''} /> Completed</label></div>
        <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" id="java-notes">${j.notes}</textarea></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button><button class="btn btn-primary" id="save-java">Save</button></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.getElementById('save-java').addEventListener('click', () => {
    j.progress = parseInt(document.getElementById('java-prog').value) || 0;
    j.completed = document.getElementById('java-done').checked;
    j.notes = document.getElementById('java-notes').value;
    if (j.completed) addXP(15);
    checkAchievements(); saveState(); modal.remove(); renderPage('java'); showToast('Updated!', 'success');
  });
};

// ============ PROJECTS ============
function renderProjects(el) {
  el.innerHTML = `
    <div class="section-header"><div class="section-title"><span class="section-icon">📁</span> Projects</div></div>
    <div class="card-grid">
      ${state.projects.map(p => `
        <div class="card animate-in">
          <div class="card-header">
            <div class="card-title">${p.name}</div>
            <span class="badge ${p.status === 'Completed' ? 'badge-success' : p.status === 'In Progress' ? 'badge-warning' : p.status === 'In Progress' ? 'badge-info' : 'badge-warning'}">${p.status}</span>
          </div>
          <div class="tracker-stat-row"><span class="stat-key">Tech Stack</span><span class="stat-val">${p.techStack || '—'}</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Deployment</span><span class="stat-val">${p.deployment ? `<a href="${p.deployment}" target="_blank" class="text-info" style="text-decoration: underline; color: var(--accent-primary);">${p.deployment}</a>` : '—'}</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Presentation</span><span class="stat-val">${p.presentationReady ? '✓ Ready' : 'Not Ready'}</span></div>
          
          <details class="project-details mt-12" style="background: var(--bg-tertiary); padding: 8px 12px; border-radius: var(--radius-md); margin-top: 12px; cursor: pointer;">
            <summary class="text-secondary font-semibold" style="font-size:12px; list-style: none; display: flex; align-items: center; justify-content: space-between;">
              <span>📁 Architecture & Notes</span>
              <span class="details-icon">▼</span>
            </summary>
            <div class="details-content mt-8" style="font-size:12px; border-top: 1px solid var(--border-primary); padding-top: 8px; margin-top: 8px; line-height: 1.6; cursor: default;">
              <div class="mb-8" style="margin-bottom: 8px;"><strong>Architecture:</strong><div class="text-secondary mt-2" style="color: var(--text-secondary); margin-top: 2px; white-space: pre-wrap;">${p.architecture || 'No details provided.'}</div></div>
              <div class="mb-8" style="margin-bottom: 8px;"><strong>Interview Questions:</strong><div class="text-secondary mt-2" style="color: var(--text-secondary); margin-top: 2px; white-space: pre-wrap;">${p.interviewQuestions || 'No details provided.'}</div></div>
              <div class="mb-8" style="margin-bottom: 8px;"><strong>Improvements:</strong><div class="text-secondary mt-2" style="color: var(--text-secondary); margin-top: 2px; white-space: pre-wrap;">${p.improvements || 'No details provided.'}</div></div>
              <div class="mb-8" style="margin-bottom: 8px;"><strong>Documentation:</strong><div class="text-secondary mt-2" style="color: var(--text-secondary); margin-top: 2px; white-space: pre-wrap;">${p.documentation || 'No details provided.'}</div></div>
            </div>
          </details>
          
          <button class="btn btn-sm btn-secondary mt-16 w-full" style="margin-top: 16px;" onclick="editProject('${p.id}')">Edit Details</button>
        </div>
      `).join('')}
    </div>
  `;
}

window.editProject = function(id) {
  const p = state.projects.find(p => p.id === id);
  if (!p) return;
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header"><div class="modal-title">${p.name}</div><button class="btn-icon" onclick="this.closest('.modal').remove()">✕</button></div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">Status</label><select class="form-select" id="proj-status">${['Not Started','In Progress','Completed','On Hold'].map(s => `<option ${p.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Tech Stack</label><input class="form-input" id="proj-tech" value="${p.techStack}" /></div>
        <div class="form-group"><label class="form-label">Architecture</label><textarea class="form-textarea" id="proj-arch">${p.architecture}</textarea></div>
        <div class="form-group"><label class="form-label">Interview Questions</label><textarea class="form-textarea" id="proj-iq">${p.interviewQuestions}</textarea></div>
        <div class="form-group"><label class="form-label">Improvements</label><textarea class="form-textarea" id="proj-imp">${p.improvements}</textarea></div>
        <div class="form-group"><label class="form-label">Deployment</label><input class="form-input" id="proj-dep" value="${p.deployment}" /></div>
        <div class="form-group"><label class="form-label">Documentation</label><textarea class="form-textarea" id="proj-doc">${p.documentation}</textarea></div>
        <div class="form-group"><label class="form-label"><input type="checkbox" id="proj-pres" ${p.presentationReady?'checked':''} /> Presentation Ready</label></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button><button class="btn btn-primary" id="save-proj">Save</button></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.getElementById('save-proj').addEventListener('click', () => {
    p.status = document.getElementById('proj-status').value;
    p.techStack = document.getElementById('proj-tech').value;
    p.architecture = document.getElementById('proj-arch').value;
    p.interviewQuestions = document.getElementById('proj-iq').value;
    p.improvements = document.getElementById('proj-imp').value;
    p.deployment = document.getElementById('proj-dep').value;
    p.documentation = document.getElementById('proj-doc').value;
    p.presentationReady = document.getElementById('proj-pres').checked;
    saveState(); modal.remove(); renderPage('projects'); showToast('Project updated!', 'success');
  });
};

// ============ INTERVIEW PREP ============
function renderInterview(el) {
  const categories = [
    { key: 'hr', label: 'HR Questions', icon: '💼' },
    { key: 'technical', label: 'Technical Questions', icon: '💻' },
    { key: 'project', label: 'Project Questions', icon: '📁' },
    { key: 'behavioral', label: 'Behavioral Questions', icon: '🧠' },
    { key: 'companySpecific', label: 'Company Specific', icon: '🏢' }
  ];
  
  el.innerHTML = `
    <div class="section-header">
      <div class="section-title"><span class="section-icon">🎤</span> Interview Preparation</div>
    </div>
    ${categories.map(cat => `
      <div class="card mb-16 animate-in">
        <div class="card-header">
          <div class="card-title">${cat.icon} ${cat.label} (${state.interview[cat.key].length})</div>
          <button class="btn btn-sm btn-primary" onclick="addInterviewQ('${cat.key}')">+ Add</button>
        </div>
        <div class="task-list">
          ${state.interview[cat.key].length === 0 ? '<div class="text-muted" style="padding:12px;font-size:13px;">No questions added yet</div>' :
            state.interview[cat.key].map(q => `
              <div class="task-item" data-status="${q.status}">
                <span class="badge ${q.status === 'Mastered' ? 'badge-success' : q.status === 'Practiced' ? 'badge-info' : 'badge-warning'}">${q.status}</span>
                <div class="task-info"><div class="task-title">${q.question}</div></div>
                <div class="task-actions" style="opacity:1">
                  <select class="form-select" style="padding:4px 8px;font-size:11px;min-width:100px" onchange="updateInterviewQ('${cat.key}','${q.id}',this.value)">
                    ${['Needs Revision','Practiced','Mastered'].map(s => `<option ${q.status===s?'selected':''}>${s}</option>`).join('')}
                  </select>
                  <button class="btn-icon" onclick="deleteInterviewQ('${cat.key}','${q.id}')">🗑️</button>
                </div>
              </div>
            `).join('')}
        </div>
      </div>
    `).join('')}
  `;
}

window.addInterviewQ = function(category) {
  const q = prompt('Enter the interview question:');
  if (q && q.trim()) {
    state.interview[category].push({ id: genId(), question: q.trim(), status: 'Needs Revision' });
    saveState(); renderPage('interview');
    showToast('Question added!', 'success');
  }
};

window.updateInterviewQ = function(category, id, status) {
  const q = state.interview[category].find(q => q.id === id);
  if (q) { q.status = status; if (status === 'Mastered') addXP(10); checkAchievements(); saveState(); }
};

window.deleteInterviewQ = function(category, id) {
  state.interview[category] = state.interview[category].filter(q => q.id !== id);
  saveState(); renderPage('interview');
};

// ============ COMMUNICATION ============
function renderCommunication(el) {
  el.innerHTML = `
    <div class="section-header">
      <div class="section-title"><span class="section-icon">🎤</span> Communication Practice</div>
      <button class="btn btn-primary" id="add-comm-btn">+ Log Session</button>
    </div>
    
    <div class="card mb-24 animate-in">
      <div class="card-title mb-16">Weekly Overview</div>
      <div class="chart-container">
        <div class="bar-chart" id="comm-chart">
          ${state.communication.slice(-7).map((c, i) => {
            const h = Math.max(10, c.selfRating * 20);
            return `<div class="bar" style="height:${h}%"><div class="bar-value">${c.selfRating}/5</div><div class="bar-label">Day ${i+1}</div></div>`;
          }).join('') || '<div class="empty-state"><div class="empty-icon">📊</div><div class="empty-title">No data yet</div></div>'}
        </div>
      </div>
    </div>

    <div class="card-grid">
      ${state.communication.slice(-10).reverse().map(c => `
        <div class="card animate-in">
          <div class="card-header"><div class="card-title">${c.topic}</div><span class="text-muted" style="font-size:12px">${new Date(c.date).toLocaleDateString()}</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Duration</span><span class="stat-val">${c.duration} min</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Confidence</span><span class="stat-val">${c.confidence}/5</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Fluency</span><span class="stat-val">${c.fluency}/5</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Vocabulary</span><span class="stat-val">${c.vocabulary}/5</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Body Language</span><span class="stat-val">${c.bodyLanguage}/5</span></div>
          <div class="tracker-stat-row"><span class="stat-key">Self Rating</span><span class="stat-val">⭐ ${c.selfRating}/5</span></div>
        </div>
      `).join('')}
    </div>
  `;
  
  document.getElementById('add-comm-btn').addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header"><div class="modal-title">Log Communication Practice</div><button class="btn-icon" onclick="this.closest('.modal').remove()">✕</button></div>
        <div class="modal-body">
          <div class="form-group"><label class="form-label">Topic</label><input class="form-input" id="comm-topic" placeholder="What did you practice?" /></div>
          <div class="form-group"><label class="form-label">Duration (minutes)</label><input class="form-input" id="comm-dur" type="number" min="1" value="15" /></div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Confidence (1-5)</label><input class="form-input" id="comm-conf" type="number" min="1" max="5" value="3" /></div>
            <div class="form-group"><label class="form-label">Fluency (1-5)</label><input class="form-input" id="comm-flu" type="number" min="1" max="5" value="3" /></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Vocabulary (1-5)</label><input class="form-input" id="comm-voc" type="number" min="1" max="5" value="3" /></div>
            <div class="form-group"><label class="form-label">Body Language (1-5)</label><input class="form-input" id="comm-bl" type="number" min="1" max="5" value="3" /></div>
          </div>
          <div class="form-group"><label class="form-label">Self Rating (1-5)</label><input class="form-input" id="comm-rating" type="number" min="1" max="5" value="3" /></div>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button><button class="btn btn-primary" id="save-comm">Save</button></div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.getElementById('save-comm').addEventListener('click', () => {
      const topic = document.getElementById('comm-topic').value.trim();
      if (!topic) return showToast('Enter a topic', 'warning');
      state.communication.push({
        id: genId(), topic, date: new Date().toISOString(),
        duration: parseInt(document.getElementById('comm-dur').value) || 15,
        confidence: parseInt(document.getElementById('comm-conf').value) || 3,
        fluency: parseInt(document.getElementById('comm-flu').value) || 3,
        vocabulary: parseInt(document.getElementById('comm-voc').value) || 3,
        bodyLanguage: parseInt(document.getElementById('comm-bl').value) || 3,
        selfRating: parseInt(document.getElementById('comm-rating').value) || 3,
      });
      addXP(15); saveState(); modal.remove(); renderPage('communication');
      showToast('Session logged! +15 XP', 'success');
    });
  });
}

// ============ ACHIEVEMENTS ============
function renderAchievements(el) {
  el.innerHTML = `
    <div class="section-header"><div class="section-title"><span class="section-icon">🏅</span> Achievements</div></div>
    <div class="achievement-grid">
      ${state.achievements.map(a => `
        <div class="achievement-card ${a.unlocked ? 'unlocked' : 'locked'} animate-in">
          <span class="achievement-icon">${a.icon}</span>
          <div class="achievement-title">${a.title}</div>
          <div class="achievement-desc">${a.desc}</div>
          ${a.unlocked ? '<div class="badge badge-success mt-8">✓ Unlocked</div>' : '<div class="badge badge-info mt-8">🔒 Locked</div>'}
        </div>
      `).join('')}
    </div>
  `;
}

function checkAchievements() {
  const a = state.achievements;
  const find = id => a.find(x => x.id === id);
  
  // First Day
  if (state.tasks.some(t => t.status === 'completed') && !find('first_day').unlocked) {
    find('first_day').unlocked = true; showToast('🏅 Achievement Unlocked: First Day!', 'success'); addXP(50);
  }
  // Streaks
  if (state.currentStreak >= 7 && !find('streak_7').unlocked) {
    find('streak_7').unlocked = true; showToast('🏅 Achievement Unlocked: 7 Day Streak!', 'success'); addXP(100);
  }
  if (state.currentStreak >= 30 && !find('streak_30').unlocked) {
    find('streak_30').unlocked = true; showToast('🏅 Achievement Unlocked: 30 Day Streak!', 'success'); addXP(200);
  }
  // Problems
  const totalProblems = getTotalDSAProblems();
  if (totalProblems >= 50 && !find('problems_50').unlocked) {
    find('problems_50').unlocked = true; showToast('🏅 Achievement Unlocked: 50 Problems!', 'success'); addXP(150);
  }
  if (totalProblems >= 100 && !find('problems_100').unlocked) {
    find('problems_100').unlocked = true; showToast('🏅 Achievement Unlocked: 100 Problems!', 'success'); addXP(300);
  }
  // Completion checks
  const pythonSkill = state.skills.find(s => s.name === 'Python');
  if (pythonSkill && pythonSkill.progress >= 100 && !find('python_done').unlocked) {
    find('python_done').unlocked = true; showToast('🏅 Achievement Unlocked: Python Master!', 'success'); addXP(200);
  }
  if (state.aiRoadmap.every(a => a.completed) && !find('ai_done').unlocked) {
    find('ai_done').unlocked = true; showToast('🏅 Achievement Unlocked: AI Complete!', 'success'); addXP(500);
  }
  if (state.dsa.every(d => d.confidence >= 80) && !find('dsa_done').unlocked) {
    find('dsa_done').unlocked = true; showToast('🏅 Achievement Unlocked: DSA Champion!', 'success'); addXP(400);
  }
  if (state.java.every(j => j.completed) && !find('java_done').unlocked) {
    find('java_done').unlocked = true; showToast('🏅 Achievement Unlocked: Java Expert!', 'success'); addXP(300);
  }
  // Interview ready
  const allQ = Object.values(state.interview).flat();
  if (allQ.filter(q => q.status === 'Mastered').length >= 20 && !find('interview_ready').unlocked) {
    find('interview_ready').unlocked = true; showToast('🏅 Achievement Unlocked: Interview Ready!', 'success'); addXP(400);
  }
  // Placement ready
  if (getTotalProgress() >= 80 && !find('placement_ready').unlocked) {
    find('placement_ready').unlocked = true; showToast('👑 Achievement Unlocked: Placement Ready!', 'success'); addXP(1000); fireConfetti();
  }
  
  saveState();
}

// ============ ANALYTICS ============
function renderAnalytics(el) {
  // Generate heatmap data
  const heatmapData = [];
  for (let i = 0; i < 60; i++) {
    const d = new Date(state.startDate);
    d.setDate(d.getDate() + i);
    const dayStr = d.toDateString();
    const tasksOnDay = state.tasks.filter(t => t.completedDate && new Date(t.completedDate).toDateString() === dayStr).length;
    let level = 0;
    if (tasksOnDay >= 1) level = 1;
    if (tasksOnDay >= 3) level = 2;
    if (tasksOnDay >= 5) level = 3;
    if (tasksOnDay >= 8) level = 4;
    heatmapData.push({ date: d, level, count: tasksOnDay });
  }

  // Skills distribution
  const masteryCount = { Beginner: 0, Intermediate: 0, Advanced: 0, Mastered: 0 };
  state.skills.forEach(s => { masteryCount[s.mastery] = (masteryCount[s.mastery] || 0) + 1; });

  el.innerHTML = `
    <div class="chart-grid animate-in">
      <div class="chart-card">
        <div class="chart-title">📊 Skills Distribution</div>
        <div class="chart-container">
          <div class="bar-chart">
            ${Object.entries(masteryCount).map(([k, v]) => `
              <div class="bar" style="height:${Math.max(5, v / state.skills.length * 100)}%">
                <div class="bar-value">${v}</div>
                <div class="bar-label">${k}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="chart-card">
        <div class="chart-title">🧮 DSA Progress by Topic</div>
        <div class="chart-container">
          <div class="bar-chart">
            ${state.dsa.slice(0, 8).map(d => `
              <div class="bar" style="height:${Math.max(5, d.confidence)}%">
                <div class="bar-value">${d.confidence}%</div>
                <div class="bar-label">${d.name.substring(0, 6)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="chart-card">
        <div class="chart-title">🤖 AI Roadmap Progress</div>
        <div class="chart-container">
          <div class="bar-chart">
            ${state.aiRoadmap.slice(0, 8).map(a => `
              <div class="bar" style="height:${Math.max(5, a.progress)}%">
                <div class="bar-value">${a.progress}%</div>
                <div class="bar-label">${a.name.substring(0, 6)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="chart-card">
        <div class="chart-title">📅 Weekly Task Completion</div>
        <div class="chart-container">
          <div class="bar-chart">
            ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => {
              const count = state.tasks.filter(t => t.completedDate && new Date(t.completedDate).getDay() === (i + 1) % 7).length;
              return `<div class="bar" style="height:${Math.max(5, count * 15)}%"><div class="bar-value">${count}</div><div class="bar-label">${day}</div></div>`;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
    
    <div class="card mt-24 animate-in">
      <div class="card-title mb-16">🔥 Completion Heatmap (60 Days)</div>
      <div class="heatmap">
        ${heatmapData.map(h => `<div class="heatmap-cell level-${h.level}" title="${h.date.toLocaleDateString()}: ${h.count} tasks"></div>`).join('')}
      </div>
      <div class="heatmap-label-row">
        ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => `<div class="heatmap-label">${d}</div>`).join('')}
      </div>
      <div class="flex justify-between mt-16" style="font-size:12px;color:var(--text-muted)">
        <span>Less</span>
        <div class="flex gap-8 items-center">
          <div class="heatmap-cell" style="width:14px;height:14px;display:inline-block"></div>
          <div class="heatmap-cell level-1" style="width:14px;height:14px;display:inline-block"></div>
          <div class="heatmap-cell level-2" style="width:14px;height:14px;display:inline-block"></div>
          <div class="heatmap-cell level-3" style="width:14px;height:14px;display:inline-block"></div>
          <div class="heatmap-cell level-4" style="width:14px;height:14px;display:inline-block"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  `;
}

// ============ NOTES ============
let currentNoteId = null;

function renderNotes(el) {
  if (!currentNoteId && state.notes.length > 0) currentNoteId = state.notes[0].id;
  const currentNote = state.notes.find(n => n.id === currentNoteId);
  
  el.innerHTML = `
    <div class="notes-container">
      <div class="notes-sidebar">
        <div class="notes-sidebar-header">
          <span style="font-weight:700;font-size:14px">Notes</span>
          <button class="btn btn-sm btn-primary" id="new-note-btn">+</button>
        </div>
        <div class="notes-list">
          ${state.notes.map(n => `
            <div class="note-list-item ${n.id === currentNoteId ? 'active' : ''}" data-note-id="${n.id}">
              <div class="note-item-title">${n.title || 'Untitled'}</div>
              <div class="note-item-date">${new Date(n.updatedAt).toLocaleDateString()}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="notes-editor-area">
        <div class="notes-toolbar">
          <button class="toolbar-btn" onclick="document.execCommand('bold')" title="Bold"><b>B</b></button>
          <button class="toolbar-btn" onclick="document.execCommand('italic')" title="Italic"><i>I</i></button>
          <button class="toolbar-btn" onclick="document.execCommand('underline')" title="Underline"><u>U</u></button>
          <div class="toolbar-divider"></div>
          <button class="toolbar-btn" onclick="document.execCommand('insertUnorderedList')" title="Bullet List">• List</button>
          <button class="toolbar-btn" onclick="document.execCommand('insertOrderedList')" title="Numbered List">1. List</button>
          <button class="toolbar-btn" onclick="insertChecklist()" title="Todo Checklist">☑ Checklist</button>
          <div class="toolbar-divider"></div>
          <button class="toolbar-btn" onclick="insertLink()" title="Insert Link">🔗 Link</button>
          <button class="toolbar-btn" onclick="insertImage()" title="Insert Image">🖼️ Image</button>
          <button class="toolbar-btn" onclick="insertHorizontalRule()" title="Horizontal Line">➖ Line</button>
          <div class="toolbar-divider"></div>
          <button class="toolbar-btn" onclick="document.execCommand('formatBlock', false, 'pre')" title="Code Block">Code</button>
          <button class="toolbar-btn" onclick="insertTable()" title="Insert Table">Table</button>
          <div class="toolbar-divider"></div>
          <button class="toolbar-btn" onclick="document.execCommand('formatBlock', false, 'h2')" title="Header 2">H2</button>
          <button class="toolbar-btn" onclick="document.execCommand('formatBlock', false, 'h3')" title="Header 3">H3</button>
          <div class="toolbar-divider"></div>
          <button class="toolbar-btn btn-danger" style="margin-left:auto" id="delete-note-btn">Delete</button>
        </div>
        <input class="note-title-input" id="note-title" placeholder="Note title..." value="${currentNote ? currentNote.title : ''}" />
        <div class="note-content-editor" id="note-editor" contenteditable="true">${currentNote ? currentNote.content : ''}</div>
      </div>
    </div>
  `;
  
  // Note list click
  el.querySelectorAll('.note-list-item').forEach(item => {
    item.addEventListener('click', () => {
      saveCurrentNote();
      currentNoteId = item.dataset.noteId;
      renderPage('notes');
    });
  });
  
  // New note
  document.getElementById('new-note-btn').addEventListener('click', () => {
    saveCurrentNote();
    const newNote = { id: genId(), title: '', content: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    state.notes.unshift(newNote);
    currentNoteId = newNote.id;
    saveState();
    renderPage('notes');
  });
  
  // Delete note
  document.getElementById('delete-note-btn').addEventListener('click', () => {
    if (state.notes.length <= 1) return showToast('Cannot delete the last note', 'warning');
    state.notes = state.notes.filter(n => n.id !== currentNoteId);
    currentNoteId = state.notes[0]?.id;
    saveState();
    renderPage('notes');
  });
  
  // Auto-save on typing
  const titleEl = document.getElementById('note-title');
  const editorEl = document.getElementById('note-editor');
  let saveTimeout;
  const autoSave = () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => saveCurrentNote(), 1000);
  };
  titleEl?.addEventListener('input', autoSave);
  editorEl?.addEventListener('input', autoSave);

  // Sync checkbox state in HTML on click/change
  editorEl?.addEventListener('click', e => {
    if (e.target.classList.contains('note-todo-checkbox')) {
      if (e.target.checked) {
        e.target.setAttribute('checked', 'true');
      } else {
        e.target.removeAttribute('checked');
      }
      saveCurrentNote();
    }
  });

  // Markdown shortcuts in contenteditable
  editorEl?.addEventListener('keyup', e => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      const range = selection.getRangeAt(0);
      const container = range.startContainer;
      
      if (container.nodeType === Node.TEXT_NODE) {
        const text = container.textContent;
        const offset = range.startOffset;
        const textBeforeCursor = text.substring(0, offset);
        
        let match = false;
        let replaceWith = '';
        let targetText = '';
        
        if (textBeforeCursor.startsWith('# ')) {
          match = true;
          targetText = '# ';
          replaceWith = `<h2>&nbsp;</h2>`;
        } else if (textBeforeCursor.startsWith('## ')) {
          match = true;
          targetText = '## ';
          replaceWith = `<h3>&nbsp;</h3>`;
        } else if (textBeforeCursor.startsWith('### ')) {
          match = true;
          targetText = '### ';
          replaceWith = `<h4>&nbsp;</h4>`;
        } else if (textBeforeCursor.startsWith('- ') || textBeforeCursor.startsWith('* ')) {
          match = true;
          targetText = textBeforeCursor.startsWith('- ') ? '- ' : '* ';
          replaceWith = `<ul><li>&nbsp;</li></ul>`;
        } else if (textBeforeCursor.startsWith('[] ') || textBeforeCursor.startsWith('[ ] ')) {
          match = true;
          targetText = textBeforeCursor.startsWith('[] ') ? '[] ' : '[ ] ';
          replaceWith = `<div><input type="checkbox" class="note-todo-checkbox" style="margin-right: 8px;">&nbsp;</div>`;
        }
        
        if (match) {
          e.preventDefault();
          // Clean text node before cursor
          container.textContent = text.substring(offset);
          
          // Insert target element
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = replaceWith;
          const newEl = tempDiv.firstElementChild;
          
          // Find root block in contenteditable
          let block = container;
          while (block.parentNode && block.parentNode !== editorEl) {
            block = block.parentNode;
          }
          
          editorEl.insertBefore(newEl, block);
          if (block.textContent.trim() === '') {
            block.remove();
          }
          
          // Position cursor inside the new element
          const newRange = document.createRange();
          newRange.selectNodeContents(newEl);
          newRange.collapse(false);
          selection.removeAllRanges();
          selection.addRange(newRange);
          autoSave();
        }
      }
    }
  });
}

function saveCurrentNote() {
  const note = state.notes.find(n => n.id === currentNoteId);
  if (!note) return;
  const titleEl = document.getElementById('note-title');
  const editorEl = document.getElementById('note-editor');
  if (titleEl) note.title = titleEl.value;
  if (editorEl) note.content = editorEl.innerHTML;
  note.updatedAt = new Date().toISOString();
  saveState();
}

window.insertChecklist = function() {
  document.execCommand('insertHTML', false, '<div><input type="checkbox" class="note-todo-checkbox" style="margin-right: 8px;">Task item...</div>');
};

window.insertLink = function() {
  const url = prompt('Enter URL:');
  if (url) {
    let text = document.getSelection().toString().trim();
    if (!text) text = prompt('Enter link text:', url) || url;
    document.execCommand('insertHTML', false, `<a href="${url}" target="_blank" class="text-info" style="color: var(--accent-primary); text-decoration: underline;">${text}</a>`);
  }
};

window.insertImage = function() {
  const url = prompt('Enter image URL:');
  if (url) {
    document.execCommand('insertHTML', false, `<img src="${url}" alt="Note Image" style="max-width: 100%; border-radius: 8px; margin: 8px 0; display: block;" />`);
  }
};

window.insertHorizontalRule = function() {
  document.execCommand('insertHTML', false, '<hr style="border: 0; border-top: 1px solid var(--border-primary); margin: 16px 0;" />');
};

window.insertTable = function() {
  document.execCommand('insertHTML', false, '<table><tr><th>Header 1</th><th>Header 2</th></tr><tr><td>Cell 1</td><td>Cell 2</td></tr></table>');
};

// ============ SETTINGS ============
function renderSettings(el) {
  el.innerHTML = `
    <div class="settings-grid animate-in">
      <div class="settings-card">
        <h3>🎨 Appearance</h3>
        <div class="setting-row">
          <div class="setting-info">
            <div class="setting-label">Dark Mode</div>
            <div class="setting-desc">Toggle between dark and light theme</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="setting-theme" ${state.theme === 'dark' ? 'checked' : ''} />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div class="settings-card">
        <h3>📊 Gamification</h3>
        <div class="setting-row">
          <div class="setting-info"><div class="setting-label">XP</div></div>
          <span style="font-weight:700;font-size:18px">${state.xp}</span>
        </div>
        <div class="setting-row">
          <div class="setting-info"><div class="setting-label">Level</div></div>
          <span style="font-weight:700;font-size:18px">${state.level}</span>
        </div>
        <div class="setting-row">
          <div class="setting-info"><div class="setting-label">Coins</div></div>
          <span style="font-weight:700;font-size:18px">${state.coins}</span>
        </div>
      </div>

      <div class="settings-card">
        <h3>⏱ Study Time</h3>
        <div class="form-group">
          <label class="form-label">Log Study Hours Today</label>
          <div class="flex gap-8">
            <input class="form-input" id="log-hours" type="number" min="0" step="0.5" value="0" placeholder="Hours..." />
            <button class="btn btn-primary" id="log-hours-btn">Log</button>
          </div>
        </div>
      </div>
      
      <div class="settings-card">
        <h3>💾 Data Management</h3>
        <div class="setting-row">
          <div class="setting-info">
            <div class="setting-label">Export Data</div>
            <div class="setting-desc">Download all your data as JSON</div>
          </div>
          <button class="btn btn-secondary" id="export-btn">Export</button>
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <div class="setting-label">Import Data</div>
            <div class="setting-desc">Restore from a JSON backup</div>
          </div>
          <button class="btn btn-secondary" id="import-btn">Import</button>
          <input type="file" id="import-file" accept=".json" style="display:none" />
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <div class="setting-label">Reset All Data</div>
            <div class="setting-desc">⚠️ This cannot be undone</div>
          </div>
          <button class="btn btn-danger" id="reset-btn">Reset</button>
        </div>
      </div>
    </div>
  `;
  
  // Theme toggle
  document.getElementById('setting-theme').addEventListener('change', (e) => {
    state.theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcons();
    saveState();
  });
  
  // Log hours
  document.getElementById('log-hours-btn').addEventListener('click', () => {
    const hours = parseFloat(document.getElementById('log-hours').value) || 0;
    if (hours > 0) {
      const today = new Date().toDateString();
      if (state.todayDate !== today) { state.hoursToday = 0; state.todayDate = today; }
      state.hoursToday += hours;
      state.totalHoursStudied += hours;
      if (state.weeklyMission) state.weeklyMission.progress += hours;
      addXP(Math.floor(hours * 20));
      updateStreak();
      saveState();
      showToast(`Logged ${hours} hours! +${Math.floor(hours * 20)} XP`, 'success');
      renderPage('settings');
    }
  });
  
  // Export
  document.getElementById('export-btn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `elite-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click(); URL.revokeObjectURL(url);
    showToast('Data exported successfully!', 'success');
  });
  
  // Import
  document.getElementById('import-btn').addEventListener('click', () => {
    document.getElementById('import-file').click();
  });
  document.getElementById('import-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const imported = JSON.parse(ev.target.result);
          state = { ...defaultState, ...imported };
          saveState();
          showToast('Data imported successfully!', 'success');
          navigateTo('dashboard');
        } catch { showToast('Invalid JSON file', 'error'); }
      };
      reader.readAsText(file);
    }
  });
  
  // Reset
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('⚠️ Are you sure you want to reset ALL data? This cannot be undone!')) {
      if (confirm('This is your last chance. All progress will be lost. Continue?')) {
        localStorage.removeItem(DB_KEY);
        state = { ...defaultState };
        saveState();
        showToast('All data has been reset', 'info');
        navigateTo('dashboard');
      }
    }
  });
}

// ============ SEARCH ============
function initSearch() {
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('global-search-input');
  const resultsEl = document.getElementById('search-results');
  
  function openSearch() {
    modal.classList.remove('hidden');
    input.value = '';
    resultsEl.innerHTML = '';
    setTimeout(() => input.focus(), 100);
  }
  
  function closeSearch() { modal.classList.add('hidden'); }
  
  document.getElementById('search-btn').addEventListener('click', openSearch);
  document.getElementById('top-search-trigger').addEventListener('click', openSearch);
  
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });
  
  modal.addEventListener('click', (e) => { if (e.target === modal) closeSearch(); });
  
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { resultsEl.innerHTML = ''; return; }
    
    const results = [];
    
    // Search tasks
    state.tasks.forEach(t => {
      if (t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q))) {
        results.push({ type: 'Task', title: t.title, meta: t.status, page: 'planner' });
      }
    });
    
    // Search skills
    state.skills.forEach(s => {
      if (s.name.toLowerCase().includes(q)) {
        results.push({ type: 'Skill', title: s.name, meta: `${s.progress}%`, page: 'skills' });
      }
    });
    
    // Search DSA
    state.dsa.forEach(d => {
      if (d.name.toLowerCase().includes(q)) {
        results.push({ type: 'DSA', title: d.name, meta: `${d.confidence}%`, page: 'dsa' });
      }
    });
    
    // Search projects
    state.projects.forEach(p => {
      if (p.name.toLowerCase().includes(q)) {
        results.push({ type: 'Project', title: p.name, meta: p.status, page: 'projects' });
      }
    });
    
    // Search notes
    state.notes.forEach(n => {
      if ((n.title && n.title.toLowerCase().includes(q)) || (n.content && n.content.toLowerCase().includes(q))) {
        results.push({ type: 'Note', title: n.title || 'Untitled', meta: '', page: 'notes' });
      }
    });
    
    // Search AI roadmap
    state.aiRoadmap.forEach(a => {
      if (a.name.toLowerCase().includes(q)) {
        results.push({ type: 'AI Module', title: a.name, meta: `${a.progress}%`, page: 'ai-roadmap' });
      }
    });
    
    resultsEl.innerHTML = results.length === 0 
      ? '<div class="empty-state" style="padding:24px"><div class="empty-title">No results found</div></div>'
      : results.slice(0, 10).map(r => `
        <div class="search-result-item" data-page="${r.page}">
          <span class="result-type">${r.type}</span>
          <span class="result-title">${r.title}</span>
          <span class="result-meta">${r.meta}</span>
        </div>
      `).join('');
    
    resultsEl.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        closeSearch();
        navigateTo(item.dataset.page);
      });
    });
  });
}

// ============ DAILY BRIEFING & REPORT ============
function getDayNumber() {
  const start = new Date(state.startDate);
  const today = new Date();
  const diff = today.getTime() - start.getTime();
  const days = Math.floor(diff / (1000 * 3600 * 24)) + 1;
  return Math.max(1, Math.min(days, state.totalDays));
}

function showDailyBriefing() {
  document.getElementById('briefing-day-number').textContent = getDayNumber();
  
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysTasks = state.tasks.filter(t => t.date === todayStr);
  
  let targetTime = 0;
  todaysTasks.forEach(t => targetTime += t.estimatedTime || 0);
  if (targetTime === 0) targetTime = 5;
  document.getElementById('briefing-target-time').textContent = targetTime;
  
  const tasksList = document.getElementById('briefing-tasks-list');
  const todoTasks = todaysTasks.filter(t => t.status === 'todo').slice(0, 5);
  
  if (todoTasks.length > 0) {
    tasksList.innerHTML = todoTasks.map(t => `
      <div class="briefing-task-item">
        <div class="checkbox-mock"></div>
        <span>${t.title}</span>
      </div>
    `).join('');
  } else {
    tasksList.innerHTML = `<div class="text-muted" style="font-size: 13px;">No goals planned for today yet. Go to Daily Planner to set them!</div>`;
  }
  
  const modal = document.getElementById('daily-briefing-modal');
  modal.classList.remove('hidden');
  
  document.getElementById('close-briefing-btn').onclick = () => modal.classList.add('hidden');
  document.getElementById('start-day-btn').onclick = () => {
    modal.classList.add('hidden');
    state.lastBriefingDate = new Date().toDateString();
    saveState();
  };
}

window.showDailyReport = function() {
  document.getElementById('report-day-number').textContent = getDayNumber();
  
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysTasks = state.tasks.filter(t => t.date === todayStr);
  const doneTasks = todaysTasks.filter(t => t.status === 'done');
  
  document.getElementById('report-tasks-done').textContent = `${doneTasks.length}/${todaysTasks.length}`;
  document.getElementById('report-time-logged').textContent = `${state.hoursToday}h`;
  
  const xpEarned = (state.hoursToday * 20) + (doneTasks.length * 5);
  document.getElementById('report-xp-earned').textContent = `+${xpEarned}`;
  
  const completedList = document.getElementById('report-completed-tasks');
  if (doneTasks.length > 0) {
    completedList.innerHTML = doneTasks.map(t => `
      <div class="briefing-task-item">
        <div class="checkbox-mock"></div>
        <span>${t.title}</span>
      </div>
    `).join('');
  } else {
    completedList.innerHTML = `<div class="text-muted" style="font-size: 13px;">No tasks completed today. Tomorrow is a new day!</div>`;
  }
  
  const modal = document.getElementById('daily-report-modal');
  modal.classList.remove('hidden');
  
  document.getElementById('close-report-btn').onclick = () => modal.classList.add('hidden');
  document.getElementById('end-day-btn').onclick = () => {
    modal.classList.add('hidden');
    state.lastReportDate = new Date().toDateString();
    saveState();
  };
}

function checkDailyModals() {
  const todayStr = new Date().toDateString();
  const now = new Date();
  const hour = now.getHours();
  
  if (state.lastBriefingDate !== todayStr && hour < 16) {
    setTimeout(showDailyBriefing, 500);
  }
  
  if (state.lastReportDate !== todayStr && hour >= 21) {
    setTimeout(showDailyReport, 500);
  }
}

// ============ THEME ============
function updateThemeIcons() {
  const isDark = state.theme === 'dark';
  document.getElementById('theme-icon-dark').classList.toggle('hidden', !isDark);
  document.getElementById('theme-icon-light').classList.toggle('hidden', isDark);
}

function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcons();
  
  document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcons();
    saveState();
  });
}

// ============ SIDEBAR ============
function initSidebar() {
  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(item.dataset.page);
    });
  });
  
  // Toggle
  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });
  
  // Mobile menu
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('mobile-open');
  });
}

// ============ INITIALIZATION ============
function init() {
  // Reset today's hours if new day
  const today = new Date().toDateString();
  if (state.todayDate !== today) {
    state.hoursToday = 0;
    state.todayDate = today;
    saveState();
  }
  
  initTheme();
  initSidebar();
  initSearch();
  updateGamificationUI();
  updateStreak();
  generateMissions();
  renderPage('dashboard');
  checkDailyModals();
  
  // Remove Vite default content
  const viteSvg = document.querySelector('link[rel="icon"]');
  if (viteSvg) viteSvg.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>';
}

init();
