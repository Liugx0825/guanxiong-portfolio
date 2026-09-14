(() => {
  // Keep previously shared links to the graduation project working.
  const legacySections=new Set(['project','strategy','museum','arts','commerce','hotel','boards']);
  if(legacySections.has(location.hash.slice(1))){
    location.replace('furnace-warehouse.html'+location.search+location.hash);
    return;
  }
  const input=document.querySelector('#project-query');
  const buttons=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('[data-project-route]')];
  const count=document.querySelector('#project-count');
  const empty=document.querySelector('#project-empty');
  const normalize=value=>value.normalize('NFKC').toLowerCase().replace(/[\p{P}\p{S}\s]/gu,'');
  const searchData=new Map(cards.map(card=>[card,normalize(card.dataset.search)]));
  let category='all';

  function render(updateUrl=false){
    const terms=input.value.trim().split(/\s+/).map(normalize).filter(Boolean);
    let visible=0;
    cards.forEach(card=>{
      card.hidden=!(category==='all'||card.dataset.category===category)||!terms.every(term=>searchData.get(card).includes(term));
      if(!card.hidden)visible++;
    });
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
    empty.hidden=visible!==0;
    const en=document.documentElement.lang==='en';
    count.textContent=en?`${visible} of ${cards.length} projects`:`${visible} / ${cards.length} 个项目`;
    const params=new URLSearchParams();
    if(input.value.trim())params.set('q',input.value.trim());
    if(category!=='all')params.set('category',category);
    const query=params.toString();
    cards.forEach(card=>card.href=card.dataset.projectRoute+(query?'?'+query:''));
    document.querySelectorAll('[data-project-index]').forEach(link=>link.href='index.html'+(query?'?'+query:'')+'#work');
    if(updateUrl){
      const url=new URL(location.href);url.search=query;history.replaceState(null,'',url);
    }
  }
  function restore(){
    const params=new URLSearchParams(location.search);
    input.value=params.get('q')||'';
    category=buttons.some(button=>button.dataset.filter===params.get('category'))?params.get('category'):'all';
    render();
  }
  buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;render(true)}));
  input.addEventListener('input',()=>render(true));
  document.querySelector('#reset-projects').addEventListener('click',()=>{input.value='';category='all';render(true);input.focus()});
  document.addEventListener('portfolio-language-change',()=>render());
  window.addEventListener('popstate',restore);
  window.addEventListener('pageshow',restore);
  restore();
})();
