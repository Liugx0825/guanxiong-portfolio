(() => {
  const tabs=[...document.querySelectorAll('[data-exhibit-tab]')];
  const panels=tabs.map(tab=>document.getElementById(tab.getAttribute('aria-controls')));
  function select(index,focus=false){
    tabs.forEach((tab,i)=>{
      tab.setAttribute('aria-selected',String(i===index));
      tab.tabIndex=i===index?0:-1;
      panels[i].hidden=i!==index;
    });
    if(focus)tabs[index].focus();
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>select(i));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight')next=(i+1)%tabs.length;
      if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      if(next!==undefined){event.preventDefault();select(next,true)}
    });
  });
  select(0);
  const dialog=document.querySelector('#lightbox');
  const scale=document.querySelector('#peace-scale');
  scale.addEventListener('click',()=>scale.setAttribute('aria-pressed',String(dialog.classList.toggle('native-size'))));
  dialog.addEventListener('close',()=>{dialog.classList.remove('native-size');scale.setAttribute('aria-pressed','false')});
})();
