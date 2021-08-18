type MemoData = {
    title: string;
    content: string;
}

type MemoType = {
    data : MemoData;
    type : 'image' | 'video' | 'text' | 'task';
};

interface MemoInterface {
    memos : MemoType[];
    addMemo : (memo:MemoType) => void;
    removeMemo : (memo:HTMLElement)=>void;
}

export default class Memo implements MemoInterface {
    memoBox : HTMLElement|null;
    memos : MemoType[];

    constructor(memoBoxSelector:string){
        this.memos = [];
        this.memoBox = document.querySelector(memoBoxSelector);
    }
    addMemo(memo:MemoType){
        let template;
        const {type} = memo;

        switch(type){
            case 'image' : 
                template = this.addImage(memo);
                break;
            case 'video':
                template = this.addVideo(memo);
                break;
            case 'text' :
                template = this.addText(memo);
                break;
            case 'task' :
                template = this.addTask(memo);
                break;
            default :
                throw new Error('정의되지 않은 타입입니다.');
        }
        this.memoBox?.prepend(template);
    }

    private addImage(memo:MemoType):HTMLElement{
        const {type} = memo;
        const {title, content} = memo.data;
        const template = `
            <div class="memo-image">
            <img src="${content}" alt="">
            </div>
            <div class="memo-title">${title}</div>
        `;
        return this.createArticle(template, type);
    }
    private addVideo(memo:MemoType):HTMLElement{
        const {type} = memo;
        const {title, content} = memo.data;
        const template = `
                <div class="memo-video">
                    <iframe src="${content}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="memo-title">${title}</div>
        `;
        return this.createArticle(template, type);
    }
    private addText(memo:MemoType):HTMLElement{
        const {type} = memo;
        const {title, content} = memo.data;
        const template = `
                <p class="memo-title">${title}</p>
                <p class="memo-desc">${content}</p>
        `;
        return this.createArticle(template, type);
    }
    private addTask(memo:MemoType):HTMLElement{
        const {type} = memo;
        const {title, content} = memo.data;
        const template = `
                <p class="memo-title">${title}</p>
                <ul class="memo-task">
                    <li>${content}</li>
                </ul>
        `;
        return this.createArticle(template, type);
    }
    private createArticle(template:string, type:string):HTMLElement{
        const article = document.createElement('article');
        article.setAttribute('data-type', type);
        article.classList.add('memo');
        article.innerHTML = template;
        const removeButton = document.createElement('button');
        removeButton.innerHTML = `
            <i class="fas fa-times"></i>
            <span class="hidden">삭제</span>
        `;
        removeButton.classList.add('remove');
        article.append(removeButton);
        return article;
    }

    removeMemo(memo:HTMLElement){
        memo.remove();
    }
}