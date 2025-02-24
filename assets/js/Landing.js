var windowOn = window;

////////////////////////////////////////////////////
//preloader
windowOn.addEventListener("load", function () {
  var backPreloader = document.getElementById("back__preloader");
  setTimeout(function () {
    backPreloader.style.display = "none";
  }, 1000);
});
//Herobanner Slider
var swiper = new Swiper(".herobanner__slider__active", {
  grabCursor: true,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
//  Sticky header
function TopOffset(el) {
  let rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop };
}
function ScrollSticky() {
  const headerStickyWrapper = document.querySelector("header");
  const headerStickyTarget = document.querySelector(".header__sticky");

  if (headerStickyTarget) {
    window.addEventListener("scroll", function () {
      let StickyTargetElement = TopOffset(headerStickyWrapper);
      let TargetElementTopOffset = StickyTargetElement.top;

      if (window.scrollY > TargetElementTopOffset) {
        headerStickyTarget.classList.add("sticky");
      } else {
        headerStickyTarget.classList.remove("sticky");
      }
    });
  }
}
ScrollSticky();
/* Offcanvas Mobile Menu Function */
const offcanvasHeader = function () {
  const offcanvasOpen = document.querySelector(
      ".offcanvas__header--menu__open--btn"
    ),
    offcanvasClose = document.querySelector(".offcanvas__close--btn"),
    offcanvasHeader = document.querySelector(".offcanvas__header"),
    offcanvasMenu = document.querySelector(".offcanvas__menu"),
    body = document.querySelector("body");
  /* Offcanvas SubMenu Toggle */
  if (offcanvasMenu) {
    offcanvasMenu
      .querySelectorAll(".offcanvas__sub_menu")
      .forEach(function (ul) {
        const subMenuToggle = document.createElement("button");
        subMenuToggle.classList.add("offcanvas__sub_menu_toggle");
        ul.parentNode.appendChild(subMenuToggle);
      });
  }
  /* Open/Close Menu On Click Toggle Button */
  if (offcanvasOpen) {
    offcanvasOpen.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.dataset.offcanvas != undefined) {
        offcanvasHeader.classList.add("open");
        body.classList.add("mobile_menu_open");
      }
    });
  }
  if (offcanvasClose) {
    offcanvasClose.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.dataset.offcanvas != undefined) {
        offcanvasHeader.classList.remove("open");
        body.classList.remove("mobile_menu_open");
      }
    });
  }

  /* Mobile submenu slideToggle Activation */
  let mobileMenuWrapper = document.querySelector(".offcanvas__menu_ul");
  if (mobileMenuWrapper) {
    mobileMenuWrapper.addEventListener("click", function (e) {
      let targetElement = e.target;
      if (targetElement.classList.contains("offcanvas__sub_menu_toggle")) {
        const parent = targetElement.parentElement;
        if (parent.classList.contains("active")) {
          targetElement.classList.remove("active");
          parent.classList.remove("active");
          parent
            .querySelectorAll(".offcanvas__sub_menu")
            .forEach(function (subMenu) {
              subMenu.parentElement.classList.remove("active");
              subMenu.nextElementSibling.classList.remove("active");
              slideUp(subMenu);
            });
        } else {
          targetElement.classList.add("active");
          parent.classList.add("active");
          slideDown(targetElement.previousElementSibling);
          getSiblings(parent).forEach(function (item) {
            item.classList.remove("active");
            item
              .querySelectorAll(".offcanvas__sub_menu")
              .forEach(function (subMenu) {
                subMenu.parentElement.classList.remove("active");
                subMenu.nextElementSibling.classList.remove("active");
                slideUp(subMenu);
              });
          });
        }
      }
    });
  }

  if (offcanvasHeader) {
    document.addEventListener("click", function (event) {
      if (
        !event.target.closest(".offcanvas__header--menu__open--btn") &&
        !event.target.classList.contains(
          ".offcanvas__header--menu__open--btn".replace(/\./, "")
        )
      ) {
        if (
          !event.target.closest(".offcanvas__header") &&
          !event.target.classList.contains(
            ".offcanvas__header".replace(/\./, "")
          )
        ) {
          offcanvasHeader.classList.remove("open");
          body.classList.remove("mobile_menu_open");
        }
      }
    });
  }

  /* Remove Mobile Menu Open Class & Hide Mobile Menu When Window Width in More Than 991 */
  if (offcanvasHeader) {
    window.addEventListener("resize", function () {
      if (window.outerWidth >= 992) {
        offcanvasHeader.classList.remove("open");
        body.classList.remove("mobile_menu_open");
      }
    });
  }
};
offcanvasHeader();
// Dark to light mode js
const lightToDarkButton = document.getElementById("light--to-dark-button");
lightToDarkButton?.addEventListener("click", function () {
  if (localStorage.getItem("theme-color")) {
    if (localStorage.getItem("theme-color") === "light") {
      document.documentElement.classList.add("is_dark");
      localStorage.setItem("theme-color", "dark");
      lightToDarkButton?.classList.add("dark--mode");
    } else {
      document.documentElement.classList.remove("is_dark");
      localStorage.setItem("theme-color", "light");
      lightToDarkButton?.classList?.remove("dark--mode");
    }
  } else {
    if (document.documentElement.classList.contains("is_dark")) {
      document.documentElement.classList.remove("is_dark");
      lightToDarkButton?.classList?.remove("dark--mode");
      localStorage.setItem("theme-color", "light");
    } else {
      document.documentElement.classList.add("is_dark");
      localStorage.setItem("theme-color", "dark");
      lightToDarkButton?.classList.add("dark--mode");
    }
  }
});

// -- back to top --
document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });
  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// navbar data scroll
document.addEventListener("DOMContentLoaded", function () {
  // Select all links with data-scroll-nav
  const links = document.querySelectorAll("a[data-scroll-nav]");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior

      let targetNav = this.getAttribute("data-scroll-nav");
      let targetSection = document.querySelector(
        `[data-scroll='${targetNav}']`
      );

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Adjust for sticky header
          behavior: "smooth", // Enable smooth scrolling
        });

        // Close off-canvas menu (if applicable)
        const offcanvasMenu = document.querySelector(".offcanvas__menu");
        if (offcanvasMenu) {
          offcanvasMenu.classList.remove("active"); // Adjust based on your class toggling
        }
      }
    });
  });
});

// ===portiflio  pic scroll
document.addEventListener("DOMContentLoaded", function () {
  const projectImages = document.querySelectorAll(".project__img");

  projectImages.forEach((projectImg) => {
    const img = projectImg.querySelector("img");
    img.addEventListener("load", function () {
      const containerHeight = projectImg.offsetHeight;
      const imgHeight = img.offsetHeight;
      projectImg.addEventListener("mouseenter", function () {
        if (imgHeight > containerHeight) {
          const translateValue = -(imgHeight - containerHeight);
          img.style.transform = `translateY(${translateValue}px)`;
          img.style.transition = "transform 5s linear";
        }
      });

      projectImg.addEventListener("mouseleave", function () {
        img.style.transform = "translateY(0)";
        img.style.transition = "transform 5s linear";
      });
    });
    if (img.complete) {
      img.dispatchEvent(new Event("load"));
    }
  });
});
// animation on scroll
AOS.init({
  offset: 40,
  duration: 1000,
  once: true,
  easing: "ease",
});

//testimonial Slider (Testimonial)
var swiper = new Swiper(".testimonial__slider__active", {
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".testimonial__slider__active__2", {
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
  breakpoints: {
    575: {
      slidesPerView: 1,
    },

    768: {
      slidesPerView: 1,
    },

    992: {
      slidesPerView: 1,
    },
    1200: {
      slidesPerView: 2,
    },
    1500: {
      slidesPerView: 2,
    },
  },
});

var swiper = new Swiper(".testimonial__3__slider__active", {
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 3,
  breakpoints: {
    350: {
      slidesPerView: 1,
    },
    575: {
      slidesPerView: 1,
    },

    768: {
      slidesPerView: 2,
    },

    992: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
    1500: {
      slidesPerView: 3,
    },
  },
});
