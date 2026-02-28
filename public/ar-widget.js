(function() {
  if (typeof window === 'undefined') return;

  function injectAR() {
    // 移除舊的避免重複
    const oldFrame = document.getElementById('my-ar-widget');
    if (oldFrame) oldFrame.remove();

    const frame = document.createElement('iframe');
    frame.id = 'my-ar-widget';
    frame.src = 'https://haning47.github.io/AR/ssshlogo/';
    // 強制透明與移除邊框
    frame.style.cssText = 'border:none; background:transparent; display:block; overflow:hidden;';

    const isMobile = window.innerWidth < 640;

    if (isMobile) {
      // 手機版：固定在底部，寬度 200px
      frame.style.position = 'fixed';
      frame.style.bottom = '10px';
      frame.style.left = '50%';
      frame.style.transform = 'translateX(-50%)';
      frame.style.width = '200px';
      frame.style.height = '200px';
      frame.style.zIndex = '99999';
      document.body.appendChild(frame);
    } else {
      // 桌機版：尋找左側側邊欄容器
      // NotionNext 的側邊欄通常在 <aside> 標籤內
      const sideBarWrapper = document.querySelector('aside .sticky-top') || document.querySelector('aside');
      
      if (sideBarWrapper) {
        frame.style.position = 'relative';
        frame.style.width = '100%';
        frame.style.height = '200px';
        frame.style.marginTop = '15px';
        frame.style.zIndex = '10';
        // 確保背景透明，不被父層遮擋
        sideBarWrapper.appendChild(frame);
      } else {
        // 備援方案：若找不到側邊欄則放左下角
        frame.style.position = 'fixed';
        frame.style.bottom = '20px';
        frame.style.left = '20px';
        frame.style.width = '180px';
        frame.style.height = '180px';
        frame.style.zIndex = '9999';
        document.body.appendChild(frame);
      }
    }
  }

  // 監聽路由變化，確保切換頁面後 3D 物件還在
  let lastUrl = location.href;
  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(injectAR, 1000);
    }
  }).observe(document, {subtree: true, childList: true});

  if (document.readyState === 'complete') {
    injectAR();
  } else {
    window.addEventListener('load', injectAR);
  }
  window.addEventListener('resize', injectAR);
})();