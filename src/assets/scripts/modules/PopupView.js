export class Popup {
    constructor(href) {
        this.href = href;
        this.containerClassName = 'vr-popup';
    }

    render() {
        const layout = `
        <div class="${this.containerClassName}">
          <div class="${this.containerClassName}__content">
            <iframe src="${this.href}"></iframe>
          </div>
          <svg class="vr-popup__close" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#E3E3E3"/>
            <path d="M24 24L16 16M16 24L24 16L16 24Z" stroke="#212721" stroke-width="2"/>
          </svg>
        </div>
      `;
        document.body.insertAdjacentHTML('beforeend', layout);
        document.querySelector(`.${this.containerClassName} .${this.containerClassName}__close`)
            .addEventListener('click', () => {
                document.querySelector(`.${this.containerClassName}`).remove();
            }, { once: true });
    }
}