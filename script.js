// Language Switching with Font Support
let currentLang = "en"

const langSwitch = document.getElementById("langSwitch")
const langOptions = document.querySelectorAll(".lang-option")

langOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const lang = option.getAttribute("data-lang")
    if (lang !== currentLang) {
      currentLang = lang
      updateLanguage(lang)
      updateFont(lang)

      // Update active state
      langOptions.forEach((opt) => opt.classList.remove("active"))
      option.classList.add("active")
    }
  })
})

function updateLanguage(lang) {
  // Update all elements with language attributes
  document.querySelectorAll("[data-en]").forEach((element) => {
    const text = element.getAttribute(`data-${lang}`)
    if (text) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = text
      } else {
        element.textContent = text
      }
    }
  })

  // Update placeholders
  document.querySelectorAll("[data-placeholder-en]").forEach((element) => {
    const placeholder = element.getAttribute(`data-placeholder-${lang}`)
    if (placeholder) {
      element.placeholder = placeholder
    }
  })
}

function updateFont(lang) {
  const body = document.body

  if (lang === "km") {
    // Use Khmer font for Khmer language
    body.style.fontFamily = '"Hanuman", sans-serif'
  } else {
    // Use English font for English language
    body.style.fontFamily = '"Poppins", sans-serif'
  }
}

// Initialize with English font on page load
window.addEventListener("DOMContentLoaded", () => {
  updateFont("en")
})


// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const nav = document.getElementById("nav");

mobileMenuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  mobileMenuToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Header Scroll Effect
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// animated counter for stats
function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-count"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + "+";
    }
  };

  updateCounter();
}

// Intersection observer for stats animation
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          if (stat.textContent === "0") {
            animateCounter(stat);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsBar = document.querySelector(".stats-bar");
if (statsBar) {
  statsObserver.observe(statsBar);
}

// product filtering: but add later cuz now that need to do is chnage product

// Newsletter form submission
const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector('input[type="email"]').value;

  // Simulate form submission
  alert(
    currentLang === "en"
      ? `Thank you for subscribing with ${email}!`
      : `អរគុណសម្រាប់ការជាវជាមួយ ${email}!`
  );
  newsletterForm.reset();
});

// Chat Widget
const chatWidget = document.getElementById("chatWidget");
const chatButton = document.getElementById("chatButton");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatMessages = document.getElementById("chatMessages");

chatButton.addEventListener("click", () => {
  chatWidget.classList.toggle("active");
});

function addChatMessage(message, isUser = false) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message");
  messageDiv.classList.add(isUser ? "user" : "bot");

  const p = document.createElement("p");
  p.textContent = message;
  messageDiv.appendChild(p);

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message) {
    addChatMessage(message, true);
    chatInput.value = "";

    // Simulate bot response
    setTimeout(() => {
      const responses =
        currentLang === "en"
          ? [
              "Thank you for your message! How can I help you with our seeds?",
              "I'd be happy to help! What product are you interested in?",
              "Great question! Let me connect you with our team.",
            ]
          : [
              "អរគុណសម្រាប់សាររបស់អ្នក! តើខ្ញុំអាចជួយអ្នកអ្វីអំពីគ្រាប់ពូជរបស់យើង?",
              "ខ្ញុំរីករាយក្នុងការជួយ! តើអ្នកចាប់អារម្មណ៍លើផលិតផលអ្វី?",
              "សំណួរល្អ! ខ្ញុំនឹងភ្ជាប់អ្នកជាមួយក្រុមរបស់យើង។",
            ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      addChatMessage(randomResponse);
    }, 1000);
  }
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    chatSend.click();
  }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Fade-in Animation on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease forwards";
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
document
  .querySelectorAll(
    ".testimonial-card, .product-card, .story-card, .blog-card, .timeline-item, .team-member"
  )
  .forEach((element) => {
    element.style.opacity = "0";
    fadeInObserver.observe(element);
  });

// Video Play Button (Placeholder functionality)
// document.querySelectorAll(".play-button").forEach((button) => {
//   button.addEventListener("click", () => {
//     alert(
//       currentLang === "en"
//         ? "Video player would open here!"
//         : "កម្មវិធីចាក់វីដេអូនឹងបើកនៅទីនេះ!"
//     );
//   });
// });

// // Product "Learn More" Button
// document.querySelectorAll(".btn-product").forEach((button) => {
//   button.addEventListener("click", () => {
//     alert(
//       currentLang === "en"
//         ? "Product details page would open here!"
//         : "ទំព័រព័ត៌មានលម្អិតផលិតផលនឹងបើកនៅទីនេះ!"
//     );
//   });
// });

// Initialize
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Example: detect button text to know language
    const button = document.getElementById("sent");
    const currentText = button.textContent.trim();

    if (currentText === "Send Message") {
      alert("✅ Your message has been sent successfully!");
    } else {
      alert("✅ សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ!");
    }
  });


  