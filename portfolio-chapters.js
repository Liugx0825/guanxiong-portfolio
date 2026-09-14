(() => {
  const dialog=document.querySelector('#lightbox');
  const scale=document.querySelector('#chapter-scale');
  scale.addEventListener('click',()=>scale.setAttribute('aria-pressed',String(dialog.classList.toggle('native-size'))));
  dialog.addEventListener('close',()=>{dialog.classList.remove('native-size');scale.setAttribute('aria-pressed','false')});
})();
