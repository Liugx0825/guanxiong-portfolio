/* Focused browsing, contextual navigation and a single accessible image viewer. */
(() => {
  const zh = () => document.documentElement.lang.startsWith('zh');
  const text = (cn, en) => zh() ? cn : en;
  const label = (element) => element?.textContent.trim() || '';
  const translate = (element) => {
    element.querySelectorAll('[data-zh]').forEach(node => node.innerHTML = node.dataset[zh() ? 'zh' : 'en']);
  };
  const lock = () => document.body.classList.toggle('modal-open', !!document.querySelector('dialog[open]'));
  document.querySelectorAll('dialog').forEach(d => d.addEventListener('close', lock));

  const choices = [...document.querySelectorAll('.feature-choice')];
  function feature(button) {
    const link = document.querySelector('.feature-image-link');
    if (!link) return;
    choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    link.href = button.dataset.href;
    link.querySelector('img').src = button.dataset.src;
    link.querySelector('img').alt = button.dataset[zh() ? 'titleZh' : 'titleEn'];
    const title = link.querySelector('h2');
    title.dataset.zh = button.dataset.titleZh;
    title.dataset.en = button.dataset.titleEn;
    title.textContent = button.dataset[zh() ? 'titleZh' : 'titleEn'];
    link.querySelector('small').textContent = String(choices.indexOf(button)+1).padStart(2,'0') + ' / SELECTED PROJECT';
  }
  choices.forEach(b => b.addEventListener('click', () => feature(b)));

  const rail = document.querySelector('.project-rail');
  if (rail) {
    const links = [...rail.querySelectorAll('.project-menu a')];
    const chapters = links.map(a => document.getElementById(a.hash.slice(1)));
    const progress = rail.querySelector('.rail-progress span');
    let scheduled = false;
    const update = () => {
      scheduled = false;
      const offset = matchMedia('(max-width:800px)').matches ? 160 : 140;
      let current = 0;
      chapters.forEach((chapter,i) => {if (chapter.getBoundingClientRect().top <= offset) current = i;});
      links.forEach((link,i) => {
        if (i === current) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
      const content = document.querySelector('.reading-content').getBoundingClientRect();
      const ratio = Math.max(0,Math.min(1,(offset-content.top)/(content.height-innerHeight+offset)));
      progress.style.transform = `scaleX(${Number.isFinite(ratio)?ratio:0})`;
    };
    addEventListener('scroll', () => {if (!scheduled){scheduled=true;requestAnimationFrame(update);}}, {passive:true});
    addEventListener('resize', update);
    update();
  }

  const sheet = document.querySelector('#project-info');
  if (sheet) {
    document.querySelectorAll('.project-info-open').forEach(button => button.addEventListener('click', () => {sheet.showModal();lock();}));
    sheet.querySelector('.sheet-close').addEventListener('click', () => sheet.close());
    sheet.addEventListener('click', e => {if(e.target===sheet && e.clientX<sheet.getBoundingClientRect().left)sheet.close();});
  }

  document.querySelectorAll('.image-switcher').forEach(switcher => {
    const buttons = [...switcher.querySelectorAll('.switcher-thumbnails button')];
    const stage = switcher.querySelector('.switcher-stage');
    const select = (index) => {
      const b = buttons[index];
      buttons.forEach((item,i) => item.setAttribute('aria-pressed', String(i===index)));
      stage.querySelector('img').src = b.dataset.src;
      stage.querySelector('img').alt = b.dataset.alt;
      stage.querySelector('img').setAttribute('aria-label', b.dataset.alt+' — '+text('放大查看','Enlarge image'));
      if(b.dataset.full)stage.querySelector('img').dataset.full=b.dataset.full;
      else delete stage.querySelector('img').dataset.full;
      const caption = b.querySelector('span').cloneNode(true);
      const cap = document.createElement('figcaption');
      [...caption.attributes].forEach(attr => cap.setAttribute(attr.name,attr.value));
      cap.innerHTML = caption.innerHTML;
      stage.querySelector('figcaption').replaceWith(cap);
      switcher.querySelector('.switcher-counter').textContent = `${index+1} / ${buttons.length}`;
    };
    buttons.forEach((button,i) => {
      button.addEventListener('click', () => select(i));
      button.addEventListener('keydown', e => {
        let index;
        if(e.key==='ArrowRight')index=(i+1)%buttons.length;
        if(e.key==='ArrowLeft')index=(i+buttons.length-1)%buttons.length;
        if(index!==undefined){e.preventDefault();select(index);buttons[index].focus();}
      });
    });
    select(0);
  });

  const viewer = document.querySelector('#lightbox');
  if(viewer){
    viewer.className='viewer';
    viewer.setAttribute('aria-labelledby','viewer-title');
    viewer.innerHTML=`<div class="viewer-toolbar"><p class="viewer-title" id="viewer-title"></p><button type="button" id="viewer-prev" aria-label="上一张 / Previous image">←</button><button type="button" id="viewer-next" aria-label="下一张 / Next image">→</button><button type="button" class="viewer-scale" aria-pressed="false" aria-label="原始尺寸 / Original size">1:1</button><button type="button" id="close" aria-label="关闭 / Close">×</button></div><div class="viewer-canvas"><div class="lightbox-frame"><img alt=""/></div></div><div class="viewer-bottom"><span class="viewer-position" aria-live="polite"></span><div class="viewer-thumbs" role="group" aria-label="图像列表 / Image list"></div></div>`;
    const img=viewer.querySelector('.lightbox-frame img');
    const frame=viewer.querySelector('.lightbox-frame');
    const scale=viewer.querySelector('.viewer-scale');
    const prev=viewer.querySelector('#viewer-prev'),next=viewer.querySelector('#viewer-next');
    let images=[],index=0,origin;
    const fit=()=>{viewer.classList.remove('native-size');scale.setAttribute('aria-pressed','false');scale.textContent='1:1';};
    const caption=(entry)=>entry.caption ? label(entry.caption):entry.alt;
    function show(i){
      index=i;fit();
      const item=images[i];
      img.src=item.src;img.alt=item.alt;
      frame.classList.toggle('board-mask',item.mask);
      viewer.querySelector('.viewer-title').textContent=caption(item);
      viewer.querySelector('.viewer-position').textContent=`${i+1} / ${images.length}`;
      prev.disabled=i===0;next.disabled=i===images.length-1;
      [...viewer.querySelectorAll('.viewer-thumbs button')].forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
    }
    function open(source){
      origin=source;
      const switcher=source.closest('.image-switcher');
      if(switcher){
        const buttons=[...switcher.querySelectorAll('.switcher-thumbnails button')];
        images=buttons.map(b=>({src:b.dataset.full||b.dataset.src,thumb:b.dataset.src,alt:b.dataset.alt,caption:b.querySelector('span'),mask:false}));
        index=buttons.findIndex(b=>b.getAttribute('aria-pressed')==='true');
      }else{
        const group=source.closest('section')||document;
        const items=[...group.querySelectorAll('img.zoom')].filter(e=>e.getClientRects().length && !e.closest('[hidden]'));
        images=items.map(e=>({src:e.dataset.full||e.src,thumb:e.src,alt:e.alt,caption:e.closest('figure')?.querySelector('figcaption'),mask:!!e.closest('.board-frame')}));
        index=items.indexOf(source);
      }
      const thumbs=viewer.querySelector('.viewer-thumbs');thumbs.replaceChildren();
      images.forEach((item,i)=>{
        const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`${i+1}. ${caption(item)}`);
        const thumb=document.createElement('img');thumb.src=item.thumb;thumb.alt='';thumb.loading='lazy';b.append(thumb);
        b.addEventListener('click',()=>show(i));thumbs.append(b);
      });
      show(Math.max(0,index));viewer.showModal();lock();viewer.querySelector('#close').focus();
    }
    document.querySelectorAll('img.zoom').forEach(image=>{
      image.tabIndex=0;image.setAttribute('role','button');image.setAttribute('aria-label',image.alt+' — '+text('放大查看','Enlarge image'));
      image.addEventListener('click',()=>open(image));
      image.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(image);}});
    });
    prev.addEventListener('click',()=>{if(index>0)show(index-1);});
    next.addEventListener('click',()=>{if(index<images.length-1)show(index+1);});
    viewer.addEventListener('keydown',e=>{
      if(e.key==='ArrowLeft'&&index>0){e.preventDefault();show(index-1);}
      if(e.key==='ArrowRight'&&index<images.length-1){e.preventDefault();show(index+1);}
    });
    scale.addEventListener('click',()=>{
      const original=viewer.classList.toggle('native-size');scale.setAttribute('aria-pressed',String(original));scale.textContent=original?text('适应','Fit'):'1:1';
    });
    viewer.querySelector('#close').addEventListener('click',()=>viewer.close());
    viewer.addEventListener('click',e=>{if(e.target.classList.contains('viewer-canvas'))viewer.close();});
    viewer.addEventListener('close',()=>{fit();img.removeAttribute('src');origin?.focus({preventScroll:true});});
  }
  document.addEventListener('portfolio-language-change',()=>{
    const active=document.querySelector('.feature-choice[aria-pressed=true]');if(active)feature(active);
    document.querySelectorAll('img.zoom').forEach(image=>image.setAttribute('aria-label',image.alt+' — '+text('放大查看','Enlarge image')));
  });
})();
