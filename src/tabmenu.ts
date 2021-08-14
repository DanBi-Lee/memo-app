export default class TabMenu {
    tabBox : HTMLElement|null;
    buttonBox : HTMLElement|null;
    buttons :  NodeListOf<HTMLButtonElement>;
    formBox : HTMLElement|null;

    constructor(tabSelector : string){
        this.tabBox = document.querySelector(tabSelector);

        if(!this.tabBox){
            throw new Error('tabBox가 정의되지 않음');
        }

        this.buttonBox = this.tabBox.querySelector('.button-box');
        this.buttons = this.tabBox.querySelectorAll('button');  
        this.formBox = this.tabBox.querySelector('.box-form');

        this.bindEvent();
    }
    private bindEvent(){
        this.buttonBox?.addEventListener("click", (e) => {
            if(!this.tabBox){
                return;
            }
            const target = e.target as HTMLElement;
            if(target.nodeName !== "BUTTON"){
                return;
            }

            let buttons = [].slice.call(this.buttons) as HTMLElement[];
            let forms = [].slice.call(this.formBox?.children) as HTMLElement[];
            let i = buttons.indexOf(target);
            this.activation(i, buttons);
            this.activation(i, forms);
        });
    }
    private activation(index:number, arr:HTMLElement[]){
        for(let el of arr){
            el.classList.remove("active");
        }
        arr[index].classList.add("active");
    }
} 