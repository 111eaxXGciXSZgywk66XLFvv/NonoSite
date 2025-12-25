window.addEventListener('scroll', () => {
  const overlay = document.querySelector('#bg-overlay');
  const contactSection = document.querySelector('#contact-section');
  const projectsSection = document.querySelector('#projects-section');
  const canvas = document.querySelector('canvas');

  if (!contactSection || !overlay) return;

  // 各セクションの位置を取得
  const cRect = contactSection.getBoundingClientRect();
  const pRect = projectsSection ? projectsSection.getBoundingClientRect() : null;

  // --- 1. CONTACTの判定（ここを鉄壁にする） ---
  // セクションの「上端」が画面の真ん中より上に来たらON
  // セクションの「下端」が画面内にあるうちはずっとON
  if (cRect.top < window.innerHeight / 2 && cRect.bottom > 0) {
    overlay.classList.add('is-dark');
  } else {
    overlay.classList.remove('is-dark');
  }

  // --- 2. PROJECTSのぼかし判定 ---
  if (pRect && canvas) {
    if (pRect.top < window.innerHeight / 2 && pRect.bottom > 0) {
      canvas.classList.add('canvas-focus');
    } else {
      canvas.classList.remove('canvas-focus');
    }
  }
});
