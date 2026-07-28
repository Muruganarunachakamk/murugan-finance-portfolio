document.addEventListener('DOMContentLoaded', () => {
    
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                htmlElement.setAttribute('data-theme', 'light');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });
    }

    // Mouse Glow Effect
    const mouseGlow = document.getElementById('mouse-glow');
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            mouseGlow.style.left = e.clientX + 'px';
            mouseGlow.style.top = e.clientY + 'px';
            mouseGlow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            mouseGlow.style.opacity = '0';
        });
    }

    // Typing Effect
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const words = ['Financial Analysis', 'FP&A', 'Equity Research', 'Corporate Finance', 'Business Analytics'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; 
            }
            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 1000);
    }

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const animateCounters = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const hasDecimals = target % 1 !== 0;
                    const duration = 2000; 
                    const steps = 60; 
                    const stepTime = Math.abs(Math.floor(duration / steps));
                    let current = 0;
                    const increment = target / steps;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.innerText = hasDecimals ? target.toFixed(2) : target;
                            clearInterval(timer);
                        } else {
                            counter.innerText = hasDecimals ? current.toFixed(2) : Math.ceil(current);
                        }
                    }, stepTime);
                    
                    observer.unobserve(counter);
                }
            });
        };

        const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.5 });
        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Animated Skill Bars
    const skillFills = document.querySelectorAll('.skill-fill');
    if (skillFills.length > 0) {
        const animateSkills = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skill = entry.target;
                    const width = skill.getAttribute('data-width');
                    skill.style.width = width;
                    observer.unobserve(skill);
                }
            });
        };

        const skillObserver = new IntersectionObserver(animateSkills, { threshold: 0.5 });
        skillFills.forEach(skill => skillObserver.observe(skill));
    }

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Resume Download Handler
    const downloadBtn = document.getElementById('download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = 'Murugan_Arunachalam_K_Finance_Resume.docx';
            link.download = 'Murugan_Arunachalam_K_Finance_Resume.docx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
