document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close all other accordions
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current accordion
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Sticky Process Timeline Tabs
    const navSteps = document.querySelectorAll('.nav-step');
    const processContent = document.querySelector('.process-content');
    
    // Process content data matching the new design
    const processData = {
        1: {
            title: "Mapping the Unknown",
            desc: "We perform a comprehensive technical audit of your existing PHP application, mapping out dependencies, identifying security vulnerabilities, and establishing a baseline for the migration.",
            icon: "search"
        },
        2: {
            title: "Architecture Strategy",
            desc: "We build a comprehensive roadmap detailing the target Laravel architecture, API connections, and a module-by-module rollout plan to ensure zero downtime.",
            icon: "map"
        },
        3: {
            title: "Phased Extraction",
            desc: "Using the Strangler Fig pattern, we systematically rebuild your legacy modules into clean, scalable Laravel microservices or a modular monolith.",
            icon: "tool"
        },
        4: {
            title: "Testing & CI/CD",
            desc: "Rigorous automated testing and parallel run validation ensure that the new system perfectly replicates required business logic without the bugs.",
            icon: "check-circle"
        },
        5: {
            title: "Scale & Support",
            desc: "We seamlessly transition traffic to the new system, then provide ongoing maintenance and feature development to support your growth.",
            icon: "send"
        }
    };

    navSteps.forEach(step => {
        step.addEventListener('click', () => {
            // Remove active class from all steps
            navSteps.forEach(s => s.classList.remove('active'));
            // Add active class to clicked step
            step.classList.add('active');
            
            const stepNum = step.getAttribute('data-step');
            const data = processData[stepNum];
            
            // Re-render content
            processContent.innerHTML = `
                <div class="process-panel active" id="step-${stepNum}">
                    <div class="panel-visual bg-gradient-mesh">
                        <div class="audit-graphic">
                            <i data-feather="${data.icon}" class="text-white w-16 h-16"></i>
                            <div class="pulse-ring-large"></div>
                        </div>
                    </div>
                    <div class="panel-text">
                        <h3>${data.title}</h3>
                        <p>${data.desc}</p>
                    </div>
                </div>
            `;
            
            // Re-initialize feather icons for newly injected HTML
            if (window.feather) {
                feather.replace();
            }
        });
    });

    // --- WOW REVEAL ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal, .fade-up').forEach(el => revealObserver.observe(el));

    // --- ORB PARALLAX ---
    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.bg-orb');
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        orbs.forEach((orb, i) => {
            orb.style.transform = `translate(${x * (i + 1)}px, ${y * (i + 1)}px)`;
        });
    });

    // --- MAGNETIC BUTTONS ---
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });

    // Initial icon replacement
    if (window.feather) {
        feather.replace();
    }
});
