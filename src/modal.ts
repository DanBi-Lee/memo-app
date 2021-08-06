interface ModalInterface {
    open : () => void;
    close : () => void;
}

export default class Modal implements ModalInterface {
    private button :  Element | null;
    private modal : Element | null;
    private closeButton : Element | null;

    constructor(buttonSeletor: string , modalSelector: string , closeSelector: string){
        this.button = document.querySelector(buttonSeletor);
        this.modal = document.querySelector(modalSelector);
        this.closeButton = document.querySelector(closeSelector);

        this.init();
    }

    private init () {
        this.openEvent();
        this.closeEvent();
    }

    private openEvent () {
        this.button?.addEventListener('click', () => {
            this.open();
        });
    }

    private closeEvent (){
        this.closeButton?.addEventListener('click', ()=> {
            this.close();
        });

        this.modal?.addEventListener('click', e=>{
            if(e.target !== this.modal){
                return;
            }
            this.close();
        });

        window.addEventListener('keyup', e=>{
            if(e.key !== 'Escape'){
                return;
            }
            this.close();
        })
    }

    open () {
        this.modal?.classList.remove('hide');
    }

    close () {
        this.modal?.classList.add('hide');
    }
}