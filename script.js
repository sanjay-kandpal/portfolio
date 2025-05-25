// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize GSAP animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGSAPAnimations();
});

function initializeGSAPAnimations() {
    // Set initial states for elements
    gsap.set("#nav-bar a", { y: -50, opacity: 0 });
    gsap.set("#my-name", { scale: 0, opacity: 0 });
    gsap.set(".social-icons a", { scale: 0, opacity: 0 });
    gsap.set("#resume", { rotation: 0, scale: 0 });
    gsap.set("#my-image", { scale: 0, opacity: 0 });
    gsap.set(".skill-progress", { x: -100, opacity: 0 });
    gsap.set(".timeline-box", { x: 100, opacity: 0 });
    gsap.set(".portfolio-image-container", { y: 50, opacity: 0 });
    gsap.set(".section-heading", { y: 50, opacity: 0 });

    // Header animations timeline
    const headerTl = gsap.timeline();
    
    // Navigation animation
    headerTl.to("#nav-bar a", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
    })
    // Resume icon animation
    .to("#resume", {
        scale: 1,
        rotation: 360,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
    }, "-=0.5")
    // Name animation
    .to("#my-name", {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)"
    }, "-=0.8")
    // Social icons animation
    .to(".social-icons a", {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.5");

    // Profile image animation with scroll trigger
    gsap.to("#my-image", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
            trigger: "#my-image",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // About section typewriter effect with GSAP
    const aboutText = "Hello! I am Full-Stack Developer.";
    const aboutPara = document.getElementById('about-para');
    
    gsap.to({}, {
        duration: aboutText.length * 0.1,
        ease: "none",
        onUpdate: function() {
            const progress = this.progress();
            const currentLength = Math.floor(progress * aboutText.length);
            const currentText = aboutText.substring(0, currentLength);
            const highlightedText = currentText.replace(
                /(Full-Stack Developer)/g, 
                '<span class="highlight">$1</span>'
            );
            aboutPara.innerHTML = highlightedText;
        },
        scrollTrigger: {
            trigger: "#about-para",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
        }
    });

    // Section headings animation
    gsap.utils.toArray(".section-heading").forEach(heading => {
        gsap.to(heading, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Skills section animations
    gsap.utils.toArray(".skill-progress").forEach((skill, index) => {
        gsap.to(skill, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: skill,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Skill bar fill animation
        const skillBar = skill.querySelector('.eighty-percent, .fifty-percent, .thirty-percent');
        if (skillBar) {
            gsap.fromTo(skillBar, 
                { width: "0%" },
                {
                    width: skillBar.classList.contains('eighty-percent') ? "100%" : 
                           skillBar.classList.contains('fifty-percent') ? "60%" : "40%",
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: skill,
                        start: "top 70%",
                        end: "bottom 30%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // Timeline animations
    gsap.utils.toArray(".timeline-box").forEach((box, index) => {
        const isEven = index % 2 === 0;
        gsap.to(box, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: box,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Portfolio items animation
    gsap.utils.toArray(".portfolio-image-container").forEach((item, index) => {
        gsap.to(item, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Hover animations for portfolio items
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(item.querySelector('img'), {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(item.querySelector('img'), {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Contact form animations
    gsap.utils.toArray(".input-tag").forEach((input, index) => {
        gsap.fromTo(input, 
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: input,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Button hover animations
    gsap.utils.toArray(".cls-btn button").forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Navigation hover animations
    gsap.utils.toArray("#nav-bar a").forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Social icons hover animations
    gsap.utils.toArray(".social-icons a").forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                y: -10,
                rotation: 360,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                y: 0,
                rotation: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // Parallax effect for header background
    gsap.to("#body-header", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
            trigger: "#body-header",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Smooth scroll for navigation links
    gsap.utils.toArray("#nav-bar a").forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId !== '#') {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: targetId,
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Enhanced confetti animation with GSAP
function createGSAPConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    const colors = ['#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff', '#ffffff', '#ff8000', '#800080', '#00ffff', '#ff1493'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confettiContainer.appendChild(confetti);

        gsap.to(confetti, {
            y: window.innerHeight + 20,
            rotation: Math.random() * 360,
            duration: Math.random() * 3 + 2,
            ease: "power1.in",
            onComplete: () => {
                confetti.remove();
            }
        });

        gsap.to(confetti, {
            x: (Math.random() - 0.5) * 200,
            duration: Math.random() * 3 + 2,
            ease: "power1.inOut"
        });
    }

    // Remove container after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Trigger confetti on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createGSAPConfetti, 1000);
});