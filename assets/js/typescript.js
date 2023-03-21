// h1 hero-title
class TypeWriter {
    constructor(txtElement, words, wait = 2000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = wait;
      this.isDeleting = false;
      this.type();
    }
  
    async type() {
      const currentWord = this.words[this.wordIndex];
      const isDeleting = this.isDeleting;
      const increment = isDeleting ? -1 : 1;
      const fullTxt = isDeleting ? currentWord.substring(0, this.txt.length - 1) : currentWord.substring(0, this.txt.length + 1);
      this.txt = fullTxt;
  
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      let typeSpeed = isDeleting ? 75 : 150;
  
      if (this.txt === currentWord) {
        typeSpeed = this.wait;
        this.isDeleting = true;
      } else if (this.txt === '') {
        this.isDeleting = false;
        this.wordIndex = (this.wordIndex + 1) % this.words.length;
        typeSpeed = 500;
      }
  
      await new Promise(resolve => setTimeout(resolve, typeSpeed));
  
      this.type();
    }
  }
  
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
  }
  
  document.addEventListener('DOMContentLoaded', init);
  