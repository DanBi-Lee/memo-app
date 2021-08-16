import Modal from './modal.js';
import TabMenu from './tabmenu.js';
import Memo from './memo.js';

const modal = new Modal('#buttonAdd', '.modal', '.modal .close');
const tabMemu  = new TabMenu('.modal-dialog');
const memo = new Memo('.memos');

const formBox = document.querySelector('.box-form');
formBox?.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if(target.nodeName !== "BUTTON"){
        return;
    }
    const container =  target.closest('.form-box') as HTMLInputElement;
    const content =  container?.querySelector('[name="memoContent"]') as HTMLInputElement;
    const title = container?.querySelector('[name="memoTitle"]') as HTMLInputElement;
    const type = container?.dataset.type as 'image' | 'video' | 'text' | 'task';
    const memoData = {
        type,
        data : {
            content : content.value,
            title : title.value
        }
    };
    
    memo.addMemo(memoData);
});