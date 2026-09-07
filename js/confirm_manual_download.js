{
  // 「使用說明」連到 /doc/dojoHelp.pptx。
  // 攔截實際連結而非按鈕文字，避免點擊子元素時漏掉。
  let allowManualClick = false;

  document.addEventListener('click', function (e) {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const link = target.closest('a[href]');
    if (!link) return;

    let isManual = false;
    try {
      isManual =
        new URL(link.href, location.href).pathname === '/doc/dojoHelp.pptx';
    } catch (_) {
      return;
    }

    if (!isManual) return;

    // 確認後重新觸發的 click 不再次攔截。
    if (allowManualClick) {
      allowManualClick = false;
      return;
    }

    // 在網站原本的 click handler 前攔截，避免直接下載。
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if (window.confirm('要下載使用說明檔案嗎？')) {
      allowManualClick = true;
      link.click();
    }
  }, true);
}
