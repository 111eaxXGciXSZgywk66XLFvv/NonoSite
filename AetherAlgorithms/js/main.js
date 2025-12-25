// 画像の事前読み込み
const preloadImages = () => {
  const images = ['./images/bg1.png', './images/bg2.png', './images/bg3.png'];
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};
preloadImages();

// ==========================================================================
// DOM読み込み後の初期化
// ==========================================================================

window.addEventListener("DOMContentLoaded", () => {

  // ローディング画面を非表示
  initLoadingScreen();

  // ホバー背景の設定（既存機能）
  initHoverBackground();

  // スクロール時の表示アニメーション
  initScrollReveal();

  // ハンバーガーメニュー
  initHamburgerMenu();

  // アクティブナビゲーション
  initActiveNavigation();

  // 固定トップに戻るボタン
  initScrollToTop();

  // スムーズスクロール
  initSmoothScroll();

  // フォーム送信処理
  initFormSubmit();

  // モーダル制御
  initModal();

});

// ==========================================================================
// 1. ローディング画面
// ==========================================================================

function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  
  // ページの読み込みが完了したら非表示
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 500); // 0.5秒後にフェードアウト
  });
}

// ==========================================================================
// 2. ホバー背景（既存機能）
// ==========================================================================

function initHoverBackground() {
  const bgContainer = document.getElementById('hover-bg');
  const cards = document.querySelectorAll('.service-card');

  if (!bgContainer || !cards.length) return;

  const images = {
    'bg-1': './images/bg1.png',
    'bg-2': './images/bg2.png',
    'bg-3': './images/bg3.png'
  };

  let hoverTimer = null;
  let isVisible = false;

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const bgId = card.dataset.image;
      if (!images[bgId]) return;

      // 高速 hover 対策
      clearTimeout(hoverTimer);

      hoverTimer = setTimeout(() => {
        bgContainer.style.backgroundImage = `url(${images[bgId]})`;
        bgContainer.classList.add('is-visible');
        isVisible = true;
      }, 200); // ← ここが「人間的な遅延」
    });

    card.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);

      // すぐ消さず、フェードアウトを必ず走らせる
      if (isVisible) {
        hoverTimer = setTimeout(() => {
          bgContainer.classList.remove('is-visible');
          isVisible = false;
        }, 250);
      }
    });
  });
}


// ==========================================================================
// 3. スクロール時の表示アニメーション
// ==========================================================================

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // 初回実行
}

// ==========================================================================
// 4. ハンバーガーメニュー
// ==========================================================================

function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // ナビゲーション項目をクリックしたらメニューを閉じる
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ==========================================================================
// 5. アクティブナビゲーション
// ==========================================================================

function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  const setActiveNav = () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', setActiveNav);
  setActiveNav(); // 初回実行
}

// ==========================================================================
// 6. 固定トップに戻るボタン
// ==========================================================================

function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (!scrollToTopBtn) return;

  // スクロール位置に応じて表示/非表示
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  // クリックでトップへスクロール
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // フッターの「BACK TO TOP」も同様に動作
  const backToTopLink = document.querySelector('.back-to-top');
  if (backToTopLink) {
    backToTopLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ==========================================================================
// 7. スムーズスクロール
// ==========================================================================

function initSmoothScroll() {
  const navItems = document.querySelectorAll('a[href^="#"]');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      
      // "#" のみの場合はトップへ
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      // セクションへスクロール
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        e.preventDefault();
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==========================================================================
// 8. フォーム送信処理
// ==========================================================================

function initFormSubmit() {
  const form = document.querySelector('.contact-form');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // フォームデータを取得
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // ここで実際の送信処理を実装
    console.log('Form submitted:', { name, email, message });

    // 送信ボタンのフィードバック
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;

    // 疑似的な送信処理（実際はバックエンドと連携）
    setTimeout(() => {
      submitBtn.textContent = 'MESSAGE SENT ✓';
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
      }, 2000);
    }, 1500);
  });
}

// ==========================================================================
// 9. ダークモード切り替え（オプション）
// ==========================================================================

// ダークモード切り替えボタンを追加する場合
function initDarkModeToggle() {
  const toggle = document.getElementById('dark-mode-toggle');
  
  if (!toggle) return;

  // ローカルストレージから設定を読み込み
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', currentTheme);

  toggle.addEventListener('click', () => {
    const theme = document.body.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}


// ==========================================================================
// 10. モーダル制御
// ==========================================================================

function initModal(){
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const modalHero = document.querySelector('.modal-hero');
const modalClose = document.getElementById('modal-close');
const hoverBg = document.getElementById('hover-bg');

const images = {
  'bg-1': './images/bg1.png',
  'bg-2': './images/bg2.png',
  'bg-3': './images/bg3.png'
};

const modalContents = {
  predictive: `
    <h2>Predictive Analytics</h2>
    <p>
      多次元データに内在する相関構造を幾何学的アルゴリズムで解析し、
      市場変動・需要推移・リスク兆候などの未来的パターンを高精度に予測します。
      単純な統計処理では捉えきれない非線形な関係性を可視化することで、
      意思決定の速度と確度を同時に向上させ、
      不確実性の高い環境下でも優位性を確保します。
    </p>
  `,

  optimization: `
    <h2>Structural Optimization</h2>
    <p>
      複雑な制約条件を持つ構造問題に対し、
      幾何学的最適化アルゴリズムを用いて
      最短・最軽量・最高効率な構造解を導出します。
      設計段階から計算的視点を取り入れることで、
      コスト削減と性能向上を同時に実現。
      建築・プロダクト・システム設計など、
      多様な分野に応用可能な最適化ソリューションを提供します
    </p>
  `,

  generative: `
    <h2>Generative Insight</h2>
    <p>
      膨大なデータ空間を探索し、
      人間の直感だけでは到達できない新たな示唆や構造を生成します。
      生成アルゴリズムと解析モデルを融合させることで、
      単なる予測に留まらない「次の一手」を提示。
      創造性と論理性を横断するインサイトを通じて、
      戦略立案やプロダクト開発に革新的な視点をもたらします。
    </p>
  `,

  traffic: `
    <h2>Urban Traffic Simulation</h2>
    <p>
      都市内の交通流を多次元トポロジーモデルとして再構築し、
      交差点・道路ネットワーク・時間帯ごとの振る舞いを解析しました。
      シミュレーション結果をもとに信号制御アルゴリズムを最適化し、
      ピーク時の渋滞発生率を約30%低減。
      複雑系としての都市交通を可視化し、
      持続可能な都市設計への示唆を提供します。
    </p>
  `,

  finance: `
    <h2>Financial Risk Topology</h2>
    <p>
      金融市場における価格変動や相関関係を
      多次元空間上のトポロジー構造としてモデル化。
      通常は見落とされがちなリスクの集中や歪みを
      形状として可視化することで、
      市場変動の兆候を早期に検知可能にしました。
      不確実性の高い金融環境において、
      定量的かつ直感的なリスク把握を実現します。
    </p>
  `,
};

document.querySelectorAll('[data-modal]').forEach(card => {
  card.addEventListener('click', e => {
    e.stopPropagation();

    const modalKey = card.dataset.modal;
    const imageKey = card.dataset.image;

    modalBody.innerHTML = modalContents[modalKey] || '';

    // ★ ここがポイント
    if (imageKey && images[imageKey]) {
      modalHero.style.backgroundImage = `url(${images[imageKey]})`;
      modalHero.classList.remove('is-hidden');
    } else {
      modalHero.classList.add('is-hidden');
    }

    modalOverlay.classList.add('is-open');

    // ① カード拡大
    card.classList.add('is-expanding');

    // ② 背景画像を固定表示
    if (hoverBg && images[imageKey]) {
      hoverBg.style.backgroundImage = `url(${images[imageKey]})`;
      hoverBg.classList.add('is-visible');
    }

    // ③ モーダル画像
    if (images[imageKey]) {
      modalHero.style.backgroundImage = `url(${images[imageKey]})`;
    }

    // ④ 内容挿入
    modalBody.innerHTML = modalContents[modalKey] || '';

    // ⑤ 少し遅らせてモーダル表示
    setTimeout(() => {
      modalOverlay.classList.add('is-open');
    }, 200);

    // ⑥ 拡大解除
    setTimeout(() => {
      card.classList.remove('is-expanding');
    }, 600);

    if (imageKey && images[imageKey]) {
  modalHero.style.backgroundImage = `url(${images[imageKey]})`;
}

  });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

function closeModal() {
  modalOverlay.classList.remove('is-open');
  hoverBg.classList.remove('is-visible');
}


}