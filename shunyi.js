(() => {
  const tabs=[...document.querySelectorAll('[data-stage]')];
  const panels=tabs.map(tab=>document.getElementById(tab.getAttribute('aria-controls')));
  function selectStage(index,focus=false){
    tabs.forEach((tab,i)=>{
      tab.setAttribute('aria-selected',String(i===index));
      tab.tabIndex=i===index?0:-1;
      panels[i].hidden=i!==index;
    });
    if(focus)tabs[index].focus();
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>selectStage(i));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight')next=(i+1)%tabs.length;
      if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      if(next!==undefined){event.preventDefault();selectStage(next,true)}
    });
  });
  selectStage(4);
  const dialog=document.querySelector('#lightbox');
  const scale=document.createElement('button');
  scale.id='shunyi-scale';scale.type='button';scale.textContent='1:1 / Fit';
  scale.setAttribute('aria-label','Toggle original image size');scale.setAttribute('aria-pressed','false');
  dialog.append(scale);
  scale.addEventListener('click',()=>scale.setAttribute('aria-pressed',String(dialog.classList.toggle('native-size'))));
  dialog.addEventListener('close',()=>{dialog.classList.remove('native-size');scale.setAttribute('aria-pressed','false')});
})();
