(function() {
  if (typeof window !== 'undefined') {
    function injectAR() {
      if (document.getElementById('my-ar-widget')) return;

      const frame = document.createElement('iframe');
      frame.id = 'my-ar-widget';
      frame.src = 'https://haning47.github.io/AR/ssshlogo/';
      
      // 判斷是否為手機版 (寬度小於 768px)
      const isMobile = window.innerWidth < 768;
      
      // 動態設定數值：手機版 120px，電腦版 200px
      const size = isMobile ? '120px' : '200px';
      // 手機版底部留白 10px，電腦版 20px 以免擋到側邊欄
      const spacing = isMobile ? '10px' : '20px';

      frame.style.cssText = `
        position: fixed; 
        bottom: ${spacing}; 
        left: ${spacing}; 
        width: ${size}; 
        height: ${size}; 
        border: none; 
        z-index: 9999; 
        pointer-events: auto;
      `;
      
      document.body.appendChild(frame);
    }

    // 確保頁面載入完成後執行
    if (document.readyState === 'complete') {
      injectAR();
    } else {
      window.addEventListener('load', injectAR);
    }
  }
})();