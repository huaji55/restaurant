document.addEventListener("DOMContentLoaded", () => {
    const restaurantName = document.querySelector(".restaurant-name");
  
    // ABOUT
    const aboutLines = document.querySelectorAll(".about-section .vertical-text .line");
    const aboutText = document.querySelectorAll(".about-section .horizontal-text");
  
    // FRESH
    const freshLines = document.querySelectorAll(".fresh-section .vertical-text .line");
    const freshText = document.querySelectorAll(".fresh-section .horizontal-text");
    const freshImage = document.querySelector(".fresh-image");
  
    // SELECTIVITY
    const selectivityLines = document.querySelectorAll(".selectivity-section .vertical-text .line");
    const selectivityText = document.querySelectorAll(".selectivity-section .horizontal-text");
    const selectivityImage = document.querySelector(".selectivity-image");
  
    let prevScrollY = window.scrollY;
  
    // 餐廳名稱淡入（快速）
    setTimeout(() => {
      restaurantName.style.opacity = 1;
    }, 200); // 更快顯示
  
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const direction = scrollY > prevScrollY ? "down" : "up";
      prevScrollY = scrollY;
  
      // 滾動進度區段
      const aboutProgress = getProgress(scrollY, 0, vh * 1.5);
      const freshProgress = getProgress(scrollY, vh * 1.5, vh * 3);
      const selectivityProgress = getProgress(scrollY, vh * 3, vh * 4.5);
  
      animateSection(aboutProgress, direction, aboutLines, aboutText, null, false);
      animateSection(freshProgress, direction, freshLines, freshText, freshImage, true, false);
      animateSection(selectivityProgress, direction, selectivityLines, selectivityText, selectivityImage, true, true, freshImage);
      animateImageAcrossSections(scrollY, vh, freshImage);
    });
  
    function getProgress(scrollY, start, end) {
      return Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
    }
  
    /**
     * 控制動畫淡入淡出
     */
    function animateSection(progress, direction, lines, textElements, image, includeImage = false, imageShouldFadeOut = true, extraElementForFadeOut = null) {
      const elements = [];
  
      lines.forEach((el, index) => {
        elements.push({ el, isHorizontal: false, start: 0.1 + index * 0.1, end: 0.2 + index * 0.1 });
      });
  
      textElements.forEach((el, index) => {
        elements.push({ el, isHorizontal: true, start: 0.4 + index * 0.1, end: 0.5 + index * 0.1 });
      });
  
      if (includeImage && image) {
        elements.push({ el: image, isHorizontal: true, start: 0.3, end: 0.4 });
      }
  
      if (extraElementForFadeOut) {
        elements.push({ el: extraElementForFadeOut, isHorizontal: true, start: 0.3, end: 0.4 });
      }
  
      elements.forEach(({ el, isHorizontal, start, end }) => {
        const isImage = el.classList.contains("fresh-image") || el.classList.contains("selectivity-image");
  
        // 淡入前
        if (progress < start) {
          el.style.opacity = 0;
          el.style.transform = isHorizontal
            ? `translate(-50%, -50%) translateX(20vw)`
            : `translate(-50%, -50%) translateY(20vh)`;
        }
        // 淡入中
        else if (progress >= start && progress < end) {
          const percent = (progress - start) / (end - start);
          const move = (1 - percent) * 20;
          el.style.opacity = isImage ? percent * 0.8 : percent;
          el.style.transform = isHorizontal
            ? `translate(-50%, -50%) translateX(${move}vw)`
            : `translate(-50%, -50%) translateY(${move}vh)`;
        }
        // 完全顯示
        else if (progress >= end && progress < 0.85) {
          el.style.opacity = isImage ? 0.8 : 1;
          el.style.transform = `translate(-50%, -50%)`;
        }
        // 淡出中
        else if (progress >= 0.85 && progress <= 0.95) {
          const fade = 1 - (progress - 0.85) / 0.1;
          const shouldFade = imageShouldFadeOut || (!includeImage || el !== image);
          if (shouldFade) {
            el.style.opacity = isImage ? fade * 0.8 : fade;
          }
          el.style.transform = `translate(-50%, -50%)`;
        }
        // 淡出後
        else if (progress > 0.95) {
          const shouldFade = imageShouldFadeOut || (!includeImage || el !== image);
          if (shouldFade) el.style.opacity = 0;
          el.style.transform = `translate(-50%, -50%)`;
        }
      });
  
      // 滾動回上方時重設
      if (progress < 0.05 && direction === "up") {
        elements.forEach(({ el, isHorizontal }) => {
          el.style.opacity = 0;
          el.style.transform = isHorizontal
            ? `translate(-50%, -50%) translateX(20vw)`
            : `translate(-50%, -50%) translateY(20vh)`;
        });
      }
    }

    // 額外處理 freshImage：出現在 fresh-section 開始，到 selectivity-section 結束後才淡出
    function animateImageAcrossSections(scrollY, vh, image) {
        const start = vh * 1.5;
        const end = vh * 4.5;
        const fadeOutStart = end - vh * 0.5;

        if (scrollY < start) {
        image.style.opacity = 0;
        image.style.transform = `translate(-50%, -50%) translateX(20vw)`;
        } else if (scrollY >= start && scrollY < fadeOutStart) {
        image.style.opacity = 0.8;
        image.style.transform = `translate(-50%, -50%)`;
        } else if (scrollY >= fadeOutStart && scrollY < end) {
        const fade = 1 - (scrollY - fadeOutStart) / (end - fadeOutStart);
        image.style.opacity = fade * 0.8;
        image.style.transform = `translate(-50%, -50%)`;
        } else {
        image.style.opacity = 0;
        }
    }  
  });
  
  
  
  
