// ===== STATE =====
let nickname = '';
let gameMode = 'pvp';
let aiDifficulty = 'easy';
let currentPlayer = 'X';
let gameState = Array(9).fill('');
let gameActive = false;
let scores = {X:0, O:0, D:0};
let joinTime = '';
let opponentName = '';

const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function pad(n){return n<10?'0'+n:n;}
function nowTime(){let d=new Date();return pad(d.getHours())+':'+pad(d.getMinutes());}

// ===== LOBBY =====
function selectMode(mode, el){
  gameMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('diffSection').style.display = mode==='ai'?'block':'none';
}

function selectDiff(diff, el){
  aiDifficulty = diff;
  document.querySelectorAll('.diff-btn').forEach(b=>b.classList.remove('selected'));
  el.classList.add('selected');
}

function enterRoom(){
  const val = document.getElementById('nickInput').value.trim();
  if(!val){ document.getElementById('nickInput').focus(); return; }
  nickname = val;
  joinTime = nowTime();
  opponentName = gameMode==='ai' ? (aiDifficulty==='hard'?'HAL-9000':'R2-D2') : 'Player 2';

  document.getElementById('lobby').style.display='none';
  document.getElementById('gameroom').style.display='block';

  document.getElementById('hdr-p1').textContent = nickname;
  document.getElementById('hdr-p2').textContent = opponentName;

  buildPlayersList();
  buildBoard();
  addSystemMsg(nickname + ' entered the game room at ' + joinTime + ' 🎮');
  addSystemMsg(opponentName + ' is ready to play!');
  gameActive = true;
}

function backToLobby(){
  document.getElementById('lobby').style.display='flex';
  document.getElementById('gameroom').style.display='none';
  document.getElementById('chatMessages').innerHTML='';
  scores = {X:0, O:0, D:0};
}

// ===== PLAYERS PANEL =====
function buildPlayersList(){
  const el = document.getElementById('playersList');
  el.innerHTML = '';
  el.appendChild(makePlayerEntry(nickname, 'X', joinTime, true));
  el.appendChild(makePlayerEntry(opponentName, 'O', joinTime, gameMode!=='ai'));
}

function makePlayerEntry(name, sym, time, online){
  const d = document.createElement('div');
  d.className = 'player-entry' + (currentPlayer===sym?' active':'');
  d.id = 'pentry-'+sym;
  d.innerHTML =
    '<div class="avatar ' + sym.toLowerCase() + '-avatar">' + sym + '</div>' +
    '<div>' +
      '<div class="pname">' + name + '</div>' +
      '<div class="ptime">' + time + ' · entered the game</div>' +
      '<div class="ptag">' + (sym==='X'?'First move':'Second move') + '</div>' +
    '</div>' +
    (online ? '<div class="active-dot"></div>' : '');
  return d;
}

function updatePlayerActive(){
  document.querySelectorAll('.player-entry').forEach(e=>e.classList.remove('active'));
  const act = document.getElementById('pentry-'+currentPlayer);
  if(act) act.classList.add('active');
}

// ===== BOARD =====
function buildBoard(){
  const board = document.getElementById('board');
  board.innerHTML='';
  gameState = Array(9).fill('');
  for(let i=0;i<9;i++){
    const cell = document.createElement('div');
    cell.className='cell';
    cell.dataset.i=i;
    cell.addEventListener('click',handleClick);
    board.appendChild(cell);
  }
  document.getElementById('resultOverlay').classList.remove('show');
  updateStatus();
  updatePlayerActive();
}

function handleClick(e){
  if(!gameActive) return;
  if(gameMode==='ai' && currentPlayer==='O') return;
  const idx = +e.target.dataset.i;
  if(gameState[idx]) return;
  makeMove(idx, currentPlayer);
}

function makeMove(idx, player){
  gameState[idx]=player;
  const cell=document.getElementById('board').children[idx];
  cell.textContent=player;
  cell.classList.add(player.toLowerCase(),'taken');

  const result = checkResult();
  if(result){
    handleResult(result);
    return;
  }

  currentPlayer = player==='X'?'O':'X';
  updateStatus();
  updatePlayerActive();

  if(gameMode==='ai' && currentPlayer==='O' && gameActive){
    setTimeout(aiMove, 500);
  }
}

function updateStatus(){
  const sym = document.getElementById('turnSym');
  const txt = document.getElementById('turnTxt');
  sym.textContent = currentPlayer;
  sym.className = 'turn-sym '+currentPlayer.toLowerCase();
  const name = currentPlayer==='X'?nickname:opponentName;
  txt.textContent = ' (' + name + ')\'s turn';
}

function checkResult(){
  for(const [a,b,c] of WIN_LINES){
    if(gameState[a] && gameState[a]===gameState[b] && gameState[a]===gameState[c]){
      return {winner:gameState[a], line:[a,b,c]};
    }
  }
  if(gameState.every(c=>c)) return {winner:'draw'};
  return null;
}

function handleResult(result){
  gameActive = false;
  const overlay = document.getElementById('resultOverlay');
  const title = document.getElementById('resultTitle');
  const sub = document.getElementById('resultSub');

  if(result.winner==='draw'){
    scores.D++;
    title.textContent='DRAW';
    title.className='result-title draw';
    sub.textContent="No winner this time";
    addSystemMsg("It's a draw! 🤝");
    document.getElementById('drawCount').textContent='Draws: '+scores.D;
  } else {
    const winName = result.winner==='X'?nickname:opponentName;
    scores[result.winner]++;
    title.textContent = result.winner+' WINS!';
    title.className = 'result-title '+result.winner.toLowerCase();
    sub.textContent = winName + ' takes the round';

    result.line.forEach(idx=>{
      const cell=document.getElementById('board').children[idx];
      cell.classList.add('winner');
      if(result.winner==='O') cell.classList.add('o');
    });

    addSystemMsg('🏆 ' + winName + ' wins the round!');
    document.getElementById('scoreX').textContent=scores.X;
    document.getElementById('scoreO').textContent=scores.O;
  }

  overlay.classList.add('show');
}

function restartGame(){
  currentPlayer='X';
  gameActive=true;
  buildBoard();
  addSystemMsg("New round started! ⚡");
}

// ===== AI =====
function aiMove(){
  if(!gameActive) return;
  let idx;
  if(aiDifficulty==='easy'){
    const empty = gameState.map((v,i)=>v?null:i).filter(i=>i!==null);
    idx = empty[Math.floor(Math.random()*empty.length)];
  } else {
    idx = minimax(gameState.slice(), 'O').index;
  }
  makeMove(idx,'O');
}

function minimax(state, player){
  const res = quickCheck(state);
  if(res==='O') return {score:10};
  if(res==='X') return {score:-10};
  if(state.every(c=>c)) return {score:0};

  const moves=[];
  for(let i=0;i<9;i++){
    if(!state[i]){
      state[i]=player;
      const s=minimax(state,player==='O'?'X':'O').score;
      moves.push({index:i,score:s});
      state[i]='';
    }
  }
  return player==='O'
    ? moves.reduce((a,b)=>a.score>b.score?a:b)
    : moves.reduce((a,b)=>a.score<b.score?a:b);
}

function quickCheck(state){
  for(const [a,b,c] of WIN_LINES){
    if(state[a]&&state[a]===state[b]&&state[a]===state[c]) return state[a];
  }
  return null;
}

// ===== CHAT =====
function addSystemMsg(text){
  const el=document.getElementById('chatMessages');
  const d=document.createElement('div');
  d.className='chat-msg system-msg';
  d.innerHTML='<div class="msg-text">'+text+'</div>';
  el.appendChild(d);
  el.scrollTop=el.scrollHeight;
}

function addChatMsg(author, text, sym){
  const el=document.getElementById('chatMessages');
  const d=document.createElement('div');
  d.className='chat-msg '+(sym==='X'?'x-msg':'o-msg');
  d.innerHTML='<div class="msg-author">'+author+' ['+sym+']</div><div class="msg-text">'+escHtml(text)+'</div>';
  el.appendChild(d);
  el.scrollTop=el.scrollHeight;
}

function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function sendChat(){
  const inp=document.getElementById('chatInput');
  const val=inp.value.trim();
  if(!val) return;
  addChatMsg(nickname, val, 'X');
  inp.value='';
  if(gameMode==='ai'){
    setTimeout(function(){
      const replies=["💭 Processing...", "🤖 Nice try human!", "Calculating best response... 🔢", "😐 Is that your strategy?", "🤖 My circuits are not impressed."];
      addChatMsg(opponentName, replies[Math.floor(Math.random()*replies.length)], 'O');
    }, 700);
  }
}

function sendSticker(text){
  addChatMsg(nickname, text, 'X');
  if(gameMode==='ai'){
    setTimeout(function(){
      const r=["...", "🤖 Acknowledged.", "Processing emotion.exe", "Nice sticker lol", "🤖 Irrelevant. I will still win."];
      addChatMsg(opponentName, r[Math.floor(Math.random()*r.length)], 'O');
    }, 600);
  }
}
