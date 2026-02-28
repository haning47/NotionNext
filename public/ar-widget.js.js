(function() {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
      // 避免重複載入
      if (document.getElementById('my-ar-widget')) return;

      const frame = document.createElement('iframe');
      frame.id = 'my-ar-widget';
      frame.src = 'https://haning47.github.io/AR/ssshlogo/';
      // 設定位置與大小
      frame.style.cssText = 'position:fixed; bottom:20px; left:20px; width:180px; height:180px; border:none; z-index:9999; pointer-events:auto;';
      
      document.body.appendChild(frame);
    });
  }
})();