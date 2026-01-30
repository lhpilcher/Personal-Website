// Typing Animation for Subtitle
class TypingEffect {
    constructor(element, phrases, options = {}) {
      this.element = element;
      this.phrases = phrases;
      this.currentPhraseIndex = 0;
      this.currentText = '';
      this.isDeleting = false;
      
      // Customizable options
      this.typingSpeed = options.typingSpeed || 100;
      this.deletingSpeed = options.deletingSpeed || 50;
      this.pauseAfterTyping = options.pauseAfterTyping || 2000;
      this.pauseAfterDeleting = options.pauseAfterDeleting || 500;
      
      this.init();
    }
    
    init() {
      // Create a wrapper span for the typing text
      this.element.innerHTML = '<span class="typing-text"></span>';
      this.typingElement = this.element.querySelector('.typing-text');
      this.type();
    }
    
    type() {
      const currentPhrase = this.phrases[this.currentPhraseIndex];
      
      if (this.isDeleting) {
        // Delete character
        this.currentText = currentPhrase.substring(0, this.currentText.length - 1);
      } else {
        // Add character
        this.currentText = currentPhrase.substring(0, this.currentText.length + 1);
      }
      
      // Update the text
      this.typingElement.textContent = this.currentText;
      
      // Determine the speed
      let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
      
      // Check if we finished typing the phrase
      if (!this.isDeleting && this.currentText === currentPhrase) {
        // Pause before deleting
        speed = this.pauseAfterTyping;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentText === '') {
        // Move to next phrase
        this.isDeleting = false;
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
        speed = this.pauseAfterDeleting;
      }
      
      // Continue typing
      setTimeout(() => this.type(), speed);
    }
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const subtitleElement = document.querySelector('.subtitle');
    
    if (subtitleElement) {
      // Array of phrases to rotate through
      const phrases = [
        'UNC Chapel Hill Senior',
        'Eager to Work',
        'Problem Solver',
        'Tech Enthusiast'
      ];
      
      // Initialize the typing effect
      new TypingEffect(subtitleElement, phrases, {
        typingSpeed: 80,        // Speed of typing (ms per character)
        deletingSpeed: 40,      // Speed of deleting (ms per character)
        pauseAfterTyping: 2500, // Pause after finishing typing (ms)
        pauseAfterDeleting: 500 // Pause after deleting before next phrase (ms)
      });
    }
  });