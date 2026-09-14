let language=localStorage.getItem('portfolio-language')==='en'?'en':'zh';
function applyLanguage(){
  document.documentElement.lang=language==='zh'?'zh-CN':'en';
  document.querySelectorAll('[data-zh]').forEach(e=>e.innerHTML=e.dataset[language]);
  document.querySelectorAll('[data-placeholder-zh]').forEach(e=>e.placeholder=e.getAttribute('data-placeholder-'+language));
  document.querySelectorAll('[data-aria-zh]').forEach(e=>e.setAttribute('aria-label',e.getAttribute('data-aria-'+language)));
  document.querySelector('#lang').textContent=language==='zh'?'EN':'中';
  document.title=document.documentElement.getAttribute('data-title-'+language)||document.title;
  document.dispatchEvent(new CustomEvent('portfolio-language-change'));
}
document.querySelector('#lang').addEventListener('click',()=>{language=language==='zh'?'en':'zh';localStorage.setItem('portfolio-language',language);applyLanguage()});
applyLanguage();

// Carry the exploration context through details and back to the project index.
const incomingParams=new URLSearchParams(location.search);
const explorationParams=new URLSearchParams();
if(incomingParams.get('q'))explorationParams.set('q',incomingParams.get('q'));
if(['practice','academic','research'].includes(incomingParams.get('category')))explorationParams.set('category',incomingParams.get('category'));
const explorationQuery=explorationParams.toString();
if(explorationQuery){
  document.querySelectorAll('[data-project-index]').forEach(a=>a.href='index.html?'+explorationQuery+'#work');
  document.querySelectorAll('[data-project-peer]').forEach(a=>{const url=new URL(a.href,location.href);url.search=explorationQuery;a.href=url.pathname+url.search});
}

const dialog=document.querySelector('#lightbox');
if(dialog){
  let origin;
  document.querySelectorAll('.zoom').forEach(img=>{
    img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label',img.alt+' — zoom');
    const open=()=>{origin=img;dialog.querySelector('.lightbox-frame').classList.toggle('board-mask',!!img.closest('.board-frame'));dialog.querySelector('img').src=img.dataset.full||img.src;dialog.querySelector('img').alt=img.alt;dialog.showModal()};
    img.addEventListener('click',open);
    img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
  });
  document.querySelector('#close').onclick=()=>dialog.close();
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  dialog.addEventListener('close',()=>origin?.focus());
}
