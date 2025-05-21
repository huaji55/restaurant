document.addEventListener("DOMContentLoaded", () => {
  // Hero Section
  const heroSection = document.querySelector(".hero-section");

  // Our Menu Categories
  const menuCategoriesSection = document.querySelector(".my-5:nth-of-type(1)");

  // Featured Menu Items
  const featuredItemsSection = document.querySelector(".my-5:nth-of-type(2)");

  // How It Works
  const howItWorksSection = document.querySelector(".my-5:nth-of-type(3)");

  // Function to get the progress of the scroll
  function getProgress(scrollY, start, end) {
    return Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
  }

  // 控制各个区块元素的动画
  function animateSection(progress, section) {
    const elements = section ? section.querySelectorAll(".animate-on-scroll") : [];

    elements.forEach((el, index) => {
      const start = 0.1 + index * 0.1;
      const end = 0.3 + index * 0.1;

      if (progress < start) {
        el.style.opacity = 0;
        el.style.transform = `translateY(20vh)`;
      } else if (progress >= start && progress < end) {
        const percent = (progress - start) / (end - start);
        const move = (1 - percent) * 20;
        el.style.opacity = percent;
        el.style.transform = `translateY(${move}vh)`;
      } else if (progress >= end) {
        el.style.opacity = 1;
        el.style.transform = `translateY(0)`;
      }
    });
  }

  let prevScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const direction = scrollY > prevScrollY ? "down" : "up";
    prevScrollY = scrollY;

    const heroProgress = getProgress(scrollY, 0, vh * 1.5);
    const menuCategoriesProgress = getProgress(scrollY, vh * 0, vh * 2);
    const featuredItemsProgress = getProgress(scrollY, vh * 4, vh * 5);
    const howItWorksProgress = getProgress(scrollY, vh * 6, vh * 8);

    animateSection(heroProgress, heroSection);
    animateSection(menuCategoriesProgress, menuCategoriesSection);
    animateSection(featuredItemsProgress, featuredItemsSection);
    animateSection(howItWorksProgress, howItWorksSection);
  });
});
