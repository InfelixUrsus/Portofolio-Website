// src/scripts/portfolio-slider.ts
import { globalTranslations } from '../utils/translations';

export function initPortfolio() {
  const btn = document.getElementById('view-toggle-btn');
  const track = document.getElementById('main-track');
  const labelRight = document.getElementById('side-label-right');
  const labelLeft = document.getElementById('side-label-left');
  const langBtn = document.getElementById('global-lang-btn');
  
  let currentScreen = 0; 
  let currentLang: 'en' | 'el' = 'en';

  if (btn && track && labelRight && labelLeft && langBtn) {
    // Language Toggling Logic
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'el' : 'en';
      const data = globalTranslations[currentLang];

      langBtn.innerText = data.btnText;
      labelRight.innerHTML = data.labelRight;
      labelLeft.innerHTML = data.labelLeft;
      
      document.getElementById('portfolio-title')!.innerText = data.title;
      document.getElementById('about-heading')!.innerText = data.aboutHeading;
      document.getElementById('about-intro')!.innerHTML = data.aboutIntro
        .replace('University of Thessaly', '<strong>University of Thessaly</strong>')
        .replace('Biomedicine', '<strong>Biomedicine</strong>');
      
      document.getElementById('sys-title')!.innerText = data.sysTitle;
      document.getElementById('sys-desc')!.innerText = data.sysDesc;
      document.getElementById('web-title')!.innerText = data.webTitle;
      document.getElementById('web-desc')!.innerText = data.webDesc;
      document.getElementById('data-title')!.innerText = data.dataTitle;
      document.getElementById('data-desc')!.innerText = data.dataDesc;
      
      document.getElementById('contact-heading')!.innerText = data.contactHeading;
      document.getElementById('portfolio-architecture-subtitle')!.innerHTML = data.archSubtitle
        .replace("Astro's island architecture", "<strong>Astro's island architecture</strong>")
        .replace("React", "<strong>React</strong>");
      
      document.getElementById('showcase-heading')!.innerText = data.showcaseHeading;
      document.getElementById('showcase-subtitle')!.innerText = data.showcaseSubtitle;
      document.getElementById('preview-badge-text')!.innerText = data.previewBadge;
      document.getElementById('mockup-card-title')!.innerText = data.mockupTitle;
      document.getElementById('mockup-card-desc')!.innerText = data.mockupDesc;
      document.getElementById('tag-biomed')!.innerText = data.tagBiomed;
      document.getElementById('tag-light')!.innerText = data.tagLight;
    });

    // Screen Sliding Logic
    btn.addEventListener('click', () => {
      if (currentScreen === 0) {
        track.style.transform = 'translate3d(-100vw, 0, 0)';
        btn.classList.remove('pointing-right');
        btn.classList.add('pointing-left');
        
        labelRight.style.opacity = '0';
        setTimeout(() => {
          labelRight.style.display = 'none';
          labelLeft.style.display = 'block';
          setTimeout(() => labelLeft.style.opacity = '1', 50);
        }, 300);

        currentScreen = 1;
      } else {
        track.style.transform = 'translate3d(0vw, 0, 0)';
        btn.classList.remove('pointing-left');
        btn.classList.add('pointing-right');
        
        labelLeft.style.opacity = '0';
        setTimeout(() => {
          labelLeft.style.display = 'none';
          labelRight.style.display = 'block';
          setTimeout(() => labelRight.style.opacity = '1', 50);
        }, 300);

        currentScreen = 0;
      }
    });
  }
}

// Ensure execution happens only after the DOM structure is parsing/ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}