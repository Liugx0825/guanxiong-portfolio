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

