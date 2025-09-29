async function loadCases(){
  try{
    const res = await fetch('assets/cases.json');
    const data = await res.json();
    document.getElementById('logoText').innerText = data.company || '设计公司';
    document.getElementById('footerCompany').innerText = data.company || '设计公司';
    document.getElementById('phoneLink').href = 'tel:' + (data.phone || '');
    document.getElementById('phoneLink').innerText = data.phone || '';
    document.getElementById('wechatId').innerText = data.wechat || '';
    if(data.hero) document.getElementById('heroImage').src = data.hero;
    const grid = document.getElementById('case-grid');
    grid.innerHTML = '';
    (data.cases || []).forEach(c=>{
      const card = document.createElement('div'); card.className='card';
      card.innerHTML = `<img src="${c.image}" alt="${c.title}" /><h4>${c.title}</h4><p>${c.short}</p>`;
      card.addEventListener('click',()=> showCaseDetail(c));
      grid.appendChild(card);
    });
  }catch(e){ console.error(e) }
}

function showCaseDetail(c){
  const html = `<div style="padding:16px;font-family:sans-serif;color:#111;background:#fff;"><h2>${c.title}</h2><img src="${c.image}" style="width:100%;height:auto"/><p>${c.long}</p></div>`;
  const w = window.open('','_blank','width=900,height=700'); w.document.write(html);
}

document.addEventListener('DOMContentLoaded',()=>{
  loadCases();
  const menu = document.getElementById('menuToggle');
  menu.addEventListener('click',()=>{
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display==='flex'?'none':'flex';
  });
  document.getElementById('contactForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    document.getElementById('formResult').innerText = '感谢提交，我们会尽快联系你（此为模板演示，未提交服务器）。';
    e.target.reset();
  });

  // 新增按钮事件
  const btnCall = document.getElementById("btn-call");
  if(btnCall){
    btnCall.addEventListener("click", function(){
      alert("请拨打电话：400-123-4567");
    });
  }
  const btnWechat = document.getElementById("btn-wechat");
  if(btnWechat){
    btnWechat.addEventListener("click", function(){
      alert("请添加微信：design123");
    });
  }
  const btnChat = document.getElementById("btn-chat");
  if(btnChat){
    btnChat.addEventListener("click", function(){
      alert("打开在线对话窗口（这里可以嵌入第三方客服系统）");
    });
  }
});
