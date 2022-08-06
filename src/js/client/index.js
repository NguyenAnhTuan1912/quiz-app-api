import { 
    createElement,
    show,
    setHandlers,
    setHandler
} from "../Function.js";
import {
    router,
    navigateTo
} from "../Router.js"
import ModalBox from "../components/ModalBox.js";

const app = {
    render: function() {
        const root = document.getElementById('root'),
        modal = createElement({
            'type': 'div',
            'classNames': 'hide',
            'id': 'modal'
        }),
        confirmBox = new ModalBox('', 'confirm'),
        noteBox = new ModalBox('', 'note');
        modal.append(confirmBox.render(), noteBox.render());
        root.append(Header({ 'title': `Home` }));
        root.insertAdjacentHTML('beforeend', '<div id="content"></div>');
        root.append(modal);
    },
    start: function() {
        return this.render();
    }
}

function Header(props = {}, isReturnDom = true) {
    const header = createElement({
        'type': 'header',
        'classNames': 'header'
    });
    const htmls = `
        <div class="header-back hide"><span class="material-symbols-outlined ft-sz-14" js="js-back">arrow_back_ios</span><span class="text-bold ft-sz-14">Home</span></div>
        <h1 class="title">${props.title}</h1>
        <div class="menu move-x">
            <span class="material-symbols-outlined" id="js-menu">menu</span>
            <nav>
                <a href="/" onclick="linkClickHandler(event)" data-link>Home</a>
                <a href="/quiz" onclick="linkClickHandler(event)" data-link>Quiz</a>
            </nav>
        </div>
    `;

    header.insertAdjacentHTML('beforeend', htmls);
    const menu = header.querySelector('#js-menu');
    menu.addEventListener('click', show);
    return (isReturnDom) ? header : header.outerHTML;
}

const linkClickHandler = (function() {
    return function navigaToAnotherPage(event) {
        const { currentTarget } = event;
        event.preventDefault();
        navigateTo(currentTarget.href);
    }
})();

document.addEventListener('DOMContentLoaded', (event) => {
    app.start();
    router()
        // .then(() => {
        //     const links = document.querySelectorAll('[data-link]');
        //     addHandlerToElements(links, 'click', linkClickHandler);
        //     // links.forEach((link) => {
        //     //     link.addEventListener('click', (event => {
        //     //         const { currentTarget } = event;
        //     //         event.preventDefault();
        //     //         navigateTo(currentTarget.href);
        //     //     }));
        //     // });
        // });
});

// window.onpopstate = () => {
//     let currentPathName = location.pathname;
//     console.log(currentPathName);
//     if(confirm('Are you sure?') && (/^\/quiz\/\d+$/gi).test(location.pathname)) {
//         router();
//     } else {
//         navigateTo(currentPathName);
//     }
// };

window.onpopstate = router;
window.linkClickHandler = linkClickHandler;