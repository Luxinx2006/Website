const pcData = [
  {id:'PC-01',state:'in-use',user:'Juan Dela Cruz',time:'00:42:18 left',rate:'₱20/hr'},
  {id:'PC-02',state:'in-use',user:'Maria Santos',time:'01:15:04 left',rate:'₱20/hr'},
  {id:'PC-03',state:'available',user:'Available',time:'Ready to use',rate:'₱20/hr'},
  {id:'PC-04',state:'in-use',user:'Carlo Reyes',time:'00:18:32 left',rate:'₱20/hr'},
  {id:'PC-05',state:'in-use',user:'Angela Lim',time:'02:05:10 left',rate:'₱25/hr'},
  {id:'PC-06',state:'maintenance',user:'Under maintenance',time:'Technician assigned',rate:'—'},
  {id:'PC-07',state:'available',user:'Available',time:'Ready to use',rate:'₱20/hr'},
  {id:'PC-08',state:'in-use',user:'Mark Villanueva',time:'00:55:41 left',rate:'₱20/hr'},
  {id:'PC-09',state:'in-use',user:'Ella Garcia',time:'00:32:08 left',rate:'₱20/hr'},
  {id:'PC-10',state:'available',user:'Available',time:'Ready to use',rate:'₱20/hr'},
  {id:'PC-11',state:'in-use',user:'Paolo Cruz',time:'01:02:44 left',rate:'₱25/hr'},
  {id:'PC-12',state:'in-use',user:'Nico Flores',time:'00:24:51 left',rate:'₱20/hr'}
];
const sessions = [
  {pc:'PC-01',name:'Juan Dela Cruz',package:'2-hour package',time:'00:42:18',left:'remaining'},
  {pc:'PC-02',name:'Maria Santos',package:'3-hour package',time:'01:15:04',left:'remaining'},
  {pc:'PC-04',name:'Carlo Reyes',package:'1-hour package',time:'00:18:32',left:'remaining'},
  {pc:'PC-05',name:'Angela Lim',package:'3-hour package',time:'02:05:10',left:'remaining'}
];
let transactions = [
  {id:'TXN-02841',name:'Maria Santos',code:'MEM-0024',initials:'MS',type:'Top-up',kind:'topup',date:'Oct 09, 2026 · 8:42 PM',amount:'+ ₱500.00',positive:true,status:'Completed',state:'completed'},
  {id:'TXN-02840',name:'Juan Dela Cruz',code:'MEM-0008',initials:'JD',type:'PC Session',kind:'session',date:'Oct 09, 2026 · 8:31 PM',amount:'₱40.00',status:'Completed',state:'completed'},
  {id:'TXN-02839',name:'Carlo Reyes',code:'MEM-0031',initials:'CR',type:'Top-up',kind:'topup',date:'Oct 09, 2026 · 8:15 PM',amount:'+ ₱200.00',positive:true,status:'Pending',state:'pending'},
  {id:'TXN-02838',name:'Angela Lim',code:'MEM-0017',initials:'AL',type:'Product sale',kind:'product',date:'Oct 09, 2026 · 7:58 PM',amount:'₱85.00',status:'Completed',state:'completed'},
  {id:'TXN-02837',name:'Paolo Cruz',code:'MEM-0042',initials:'PC',type:'Top-up',kind:'topup',date:'Oct 09, 2026 · 7:42 PM',amount:'+ ₱300.00',positive:true,status:'Failed',state:'failed'}
];
const pcGrid = document.getElementById('pcGrid');
const sessionList = document.getElementById('sessionList');
const transactionRows = document.getElementById('transactionRows');
const notice = document.getElementById('notice');
const sessionDialog = document.getElementById('sessionDialog');
const computerSelect = document.getElementById('computerSelect');
function iconMonitor(){return '<svg viewBox="0 0 48 42" fill="none" aria-hidden="true"><rect x="5" y="4" width="38" height="27" rx="4" stroke="currentColor" stroke-width="2"/><path d="M18 38h12M24 31v7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M11 10h26" stroke="currentColor" stroke-width="1.5" opacity=".35"/></svg>'}
function renderPCs(){
  pcGrid.innerHTML = pcData.map(pc=>{
    const label = pc.state==='in-use'?'In use':pc.state==='available'?'Available':'Service';
    const action = pc.state==='available'?'Start':pc.state==='in-use'?'Details':'View';
    return `<article class="pc-card ${pc.state}"><div class="pc-head"><span class="pc-number">${pc.id}</span><span class="pc-state">${label}</span></div><div class="monitor">${iconMonitor()}</div><div class="pc-user" title="${pc.user}">${pc.user}</div><div class="pc-time">${pc.time}</div><div class="pc-bottom"><span class="pc-rate">${pc.rate}</span><button class="pc-action" data-pc-action="${pc.id}">${action}</button></div></article>`;
  }).join('');
  computerSelect.innerHTML = pcData.filter(pc=>pc.state==='available').map(pc=>`<option value="${pc.id}">${pc.id} — Available</option>`).join('');
  if(!computerSelect.options.length) computerSelect.innerHTML='<option value="">No available PCs</option>';
}
function renderSessions(){
  sessionList.innerHTML = sessions.slice(0,4).map(s=>`<div class="session-item"><div class="session-pc">${s.pc.replace('PC-','')}</div><div class="session-info"><strong>${s.name}</strong><span>${s.pc} · ${s.package}</span></div><div class="session-time"><strong>${s.time}</strong><span>${s.left}</span></div></div>`).join('');
}
function renderTransactions(query=''){
  const filtered = transactions.filter(t=>`${t.id} ${t.name} ${t.type} ${t.status}`.toLowerCase().includes(query.toLowerCase()));
  transactionRows.innerHTML = filtered.map(t=>`<tr><td><span class="tx-id">${t.id}</span></td><td><div class="member-cell"><span class="member-avatar">${t.initials}</span><span><span class="member-name">${t.name}</span><span class="member-code">${t.code}</span></span></div></td><td><span class="type-pill ${t.kind}">${t.type}</span></td><td>${t.date}</td><td><span class="amount ${t.positive?'positive':''}">${t.amount}</span></td><td><span class="status-pill ${t.state}">${t.status}</span></td></tr>`).join('');
  document.getElementById('transactionCount').textContent = `Showing ${filtered.length} transaction${filtered.length===1?'':'s'}`;
}
function showNotice(message){notice.textContent=message;notice.classList.add('show');window.clearTimeout(showNotice.timer);showNotice.timer=window.setTimeout(()=>notice.classList.remove('show'),4000)}
const pageCopy = {
  overview:['Good evening, Admin ✦','Here’s what’s happening at your shop today.'],
  computers:['Computer management','Monitor PC availability, status, and hourly rates.'],
  sessions:['Session management','Review active customer sessions and remaining time.'],
  members:['Members','Manage customer accounts and membership activity.'],
  transactions:['Transactions','Review wallet top-ups, session charges, and payments.'],
  inventory:['Inventory','Track products, stock levels, and shop sales.'],
  reports:['Reports & analytics','Review revenue, occupancy, and shop performance.'],
  settings:['Settings','Manage your branch, pricing, and system preferences.']
};
function navigate(page){
  document.querySelectorAll('.nav-item[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  document.getElementById('breadcrumbPage').textContent=page.charAt(0).toUpperCase()+page.slice(1);
  document.getElementById('pageTitle').textContent=pageCopy[page]?.[0]||'Pondo Billing System';
  document.getElementById('pageSubtitle').textContent=pageCopy[page]?.[1]||'';
  if(page!=='overview') showNotice(`${page.charAt(0).toUpperCase()+page.slice(1)} view selected. This frontend prototype currently uses demo data.`);
  else notice.classList.remove('show');
  if(window.innerWidth<=760) document.getElementById('sidebar').classList.remove('open');
}
document.querySelectorAll('.nav-item[data-page]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.page)));
document.querySelectorAll('[data-page-link]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.pageLink)));
document.getElementById('mobileMenu').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));
document.getElementById('newSessionBtn').addEventListener('click',()=>sessionDialog.showModal());
document.getElementById('sessionForm').addEventListener('submit',e=>{
  e.preventDefault();
  const form=new FormData(e.currentTarget);const member=String(form.get('member')).trim();const pcId=String(form.get('computer'));const hours=Number(form.get('package'));
  if(!member||!pcId){showNotice('Enter a member name and choose an available PC.');return}
  const pc=pcData.find(p=>p.id===pcId);if(!pc||pc.state!=='available'){showNotice('That PC is no longer available.');return}
  pc.state='in-use';pc.user=member;pc.time=`0${hours}:00:00 left`;pc.rate=hours===3?'₱16.67/hr':'₱20/hr';
  sessions.unshift({pc:pcId,name:member,package:`${hours}-hour package`,time:`0${hours}:00:00`,left:'remaining'});
  const nextNum=2842+transactions.length-5;
  transactions.unshift({id:`TXN-${nextNum}`,name:member,code:'WALK-IN',initials:member.split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase(),type:'PC Session',kind:'session',date:'Oct 09, 2026 · Just now',amount:`₱${hours===1?'20.00':hours===2?'35.00':'50.00'}`,status:'Completed',state:'completed'});
  renderPCs();renderSessions();renderTransactions(document.getElementById('transactionSearch').value);
  sessionDialog.close();e.currentTarget.reset();showNotice(`Session started for ${member} on ${pcId}. Demo state updated locally.`);
});
document.getElementById('sessionDialog').addEventListener('close',()=>{});
document.getElementById('transactionSearch').addEventListener('input',e=>renderTransactions(e.target.value));
document.getElementById('exportBtn').addEventListener('click',()=>{
  const header=['Transaction ID','Member','Member Code','Type','Date & Time','Amount','Status'];
  const rows=transactions.map(t=>[t.id,t.name,t.code,t.type,t.date,t.amount,t.status]);
  const csv=[header,...rows].map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='pondo-transactions-demo.csv';a.click();URL.revokeObjectURL(url);showNotice('Demo transaction report exported as CSV.');
});
pcGrid.addEventListener('click',e=>{
  const btn=e.target.closest('[data-pc-action]');if(!btn)return;
  const pc=pcData.find(p=>p.id===btn.dataset.pcAction);
  if(pc.state==='available'){computerSelect.value=pc.id;sessionDialog.showModal()}
  else showNotice(`${pc.id}: ${pc.user} · ${pc.time}. This is a demo status; backend controls are not connected.`);
});
document.getElementById('todayLabel').textContent=new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric'}).format(new Date()).toUpperCase();
renderPCs();renderSessions();renderTransactions();
