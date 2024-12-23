import { useState, useEffect, useRef } from 'react';
import { RiMenu3Line, RiCloseLine } from '@remixicon/react';
import { gsap } from 'gsap';

// Navigation Links
const NAVIGATION_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work Experience', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = -85;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  //GSAP animation for the desktop menu links - letter by letter
  useEffect(() => {
    const navbar = navRef.current;
  
    if (navbar) {
      const nameElement = navbar.querySelector('.nav-name span');
      const links = navbar.querySelectorAll('.nav-link');
  
      // Animate the entire navbar container
      gsap.fromTo(
        navbar,
        { opacity: 0, y: -50 }, // Start above the viewport
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' } // Slide down to final position
      );
  
      // Split name into individual letters
      const nameText = nameElement.textContent
        .split('')
        .map((char) => `<span class="char">${char}</span>`)
        .join('');
      nameElement.innerHTML = nameText;
  
      // Split links into individual letters
      links.forEach((link) => {
        const linkText = link.textContent
          .split('')
          .map((char) => `<span class="char">${char}</span>`)
          .join('');
        link.innerHTML = linkText;
      });
  
      // Animate all characters (name + links) in sequence with y-axis motion
      const chars = navbar.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { opacity: 0, y: -100 }, // Start slightly above
        {
          opacity: 1,
          y: 0, // Final position
          duration: 1.5,
          stagger: 0.02, // Uniform left-to-right effect
          ease: 'power2.out',
          delay: 0.3, // Wait for the navbar animation to finish
        }
      );
    }
  }, []);
  
  
  // GSAP animation for the Desktop Menu links
//   useEffect(() => {
//     const navbar = navRef.current;
  
//     if (navbar) {
//       const links = navbar.querySelectorAll('.nav-link');
//       const nameElement = navbar.querySelector('.nav-name');
  
//       // Animate the entire navbar container
//       gsap.fromTo(
//         navbar,
//         { opacity: 0, y: -50 }, // Start position
//         { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
//       );
  
 
//       // Animate the links with stagger
//       if (links.length > 0) {
//         gsap.fromTo(
//           links,
//           { opacity: 0, y: 30 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 1,
//             stagger: 0.15,
//             ease: 'power2.out',
//             delay: 0.4, // Links start animating after navbar and name
//           }
//         );
//       }
//     }
//   }, []);
  

  // GSAP animation for Mobile Menu links when it opens
  // GSAP animation for Mobile Menu links when it opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(
        '.mobile-nav-link',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    } else {
      // GSAP animation for closing the mobile menu smoothly
      gsap.to('.mobile-nav-link', {
        opacity: 1,
        x: -50,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        onComplete: () => {
          // After the animation completes, hide the menu
          const menu = mobileMenuRef.current;
          if (menu) menu.style.display = 'none'; // Hide menu after animation
        },
      });
    }
  }, [isMobileMenuOpen]);


  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">

        {/* Desktop Menu */}
        <div
          ref={navRef}
          className="mx-auto hidden max-w-xl items-center justify-center rounded-full border border-white py-2 backdrop-blur-sm lg:flex"
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              <a href="/" className="nav-link nav-name">
                <span className="uppercase hover:text-stone-300">Leoni Cesar</span>
              </a>
            </div>
            <div>
              <ul className="flex items-center gap-4">
                {NAVIGATION_LINKS.map((item, index) => (
                  <li key={index}>
                    <a
                      className="nav-link text-sm text-white hover:text-stone-300"
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="py-2 backdrop-blur-md border-b lg:hidden">
          <div className="flex items-center justify-between">
            <div>
              <a href="#">
                <span className="pl-2 text-2xl">Leoni Cesar</span>
              </a>
            </div>
            <div className="flex items-center">
              <button
                className="focus:outline-none lg:hidden"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {isMobileMenuOpen ? (
                  <RiCloseLine className="m-2 h-8 w-8" />
                ) : (
                  <RiMenu3Line className="m-2 h-8 w-8" />
                )}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <ul className="my-4 ml-4 flex flex-col gap-6 backdrop-blur-md">
              {NAVIGATION_LINKS.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="mobile-nav-link block w-full text-lg"
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
