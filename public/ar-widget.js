(function() {
  if (typeof window === 'undefined') return;

  function injectAR() {
    if (document.getElementById('my-ar-widget')) return;

    // 建立 3D 物件容器
    const frame = document.createElement('iframe');
    frame.id = 'my-ar-widget';
    frame.src = 'https://haning47.github.io/AR/ssshlogo/';
    // 強制透明背景與無邊框
    frame.style.cssText = 'border:none; pointer-events:auto; display:block; background:transparent;';

    // 判斷當前螢幕寬度
    const updatePosition = () => {
      const isMobile = window.innerWidth < 640;
      
      if (isMobile) {
        // 手機或窄螢幕：固定在最下方，寬度調到 200px
        frame.style.position = 'fixed';
        frame.style.bottom = '10px';
        frame.style.left = '50%';
        frame.style.transform = 'translateX(-50%)';
        frame.style.width = '200px';
        frame.style.height = '200px';
        frame.style.zIndex = '9999';
        document.body.appendChild(frame);
      } else {
        // 桌機寬螢幕：嘗試掛載到「關於」卡片下方
        const sideBar = document.querySelector('aside .card'); // 這裡抓取側邊欄卡片節點
        if (sideBar) {
          frame.style.position = 'relative';
          frame.style.bottom = 'auto';
          frame.style.left = 'auto';
          frame.style.transform = 'none';
          frame.style.width = '100%'; // 跟隨卡片寬度
          frame.style.height = '180px';
          frame.style.marginTop = '20px';
          sideBar.parentElement.appendChild(frame);
        } else {
          // 如果找不到側邊欄，則備援至原本的左下角位置
          frame.style.position = 'fixed';
          frame.style.bottom = '20px';
          frame.style.left = '20px';
          frame.style.width = '180px';
          frame.style.height = '180px';
          document.body.appendChild(frame);
        }
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
  }

  // 確保在 NotionNext 載入完成後執行
  if (document.readyState === 'complete') {
    injectAR();
  } else {
    window.addEventListener('load', injectAR);
  }
})();