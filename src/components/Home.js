import AbstractView from "./AbstractView.js";
import { createElement } from "./Function.js";

export default class extends AbstractView {
    #data;
    #dom;

    constructor() {
        super();
        this.setTitle('Home');
        this.#dom = createElement({
            'type': 'div',
            'classNames': 'home-page'
        });
        this.#data = {
            questions: [
                {
                    'name': '25 điều thú vị về loài mèo mà bạn có biết?',
                    'questions': 25
                },
                {
                    'name': '10 câu hỏi toán lớp 1',
                    'questions': 10
                },
                {
                    'name': 'Nhũng câu hỏi hóc búa - Phần 3',
                    'questions': 20
                },
                {
                    'name': 'Những câu hỏi học búa - Phần 2',
                    'questions': 15
                }
            ],
            categories: ['Nổi bật', 'Yêu thích', 'Lập trình', 'Toán học']
        }
    }

    get getDom() {
        return this.#dom;
    }

    get getData() {
        return this.#data;
    }

    async render() {
        const { categories, questions } = this.#data;
        return `
            <div class="home-page">
                ${Banner({
                    'banner-text__title': 'Quiz nổi bật nhất',
                    'banner-text__description': 'Đây là bài quiz được nhiều người dùng làm nhất tuần qua.'
                }, false)}
                <hr>
                ${await QuizCategory({ categories }, false)}
                <hr>
                ${await Quizzes({ questions }, false)}
            </div>
        `;
    }
}

function Banner(props = {}, isReturnDom = true) {
    const div = createElement({
        'type': 'div',
        'classNames': 'home-page__banner',
        'id': 'js-homePageBannerContainer'
    });
    const htmls = `
        <div class="banner-image"></div> 
        <div class="banner-text">
            <h3 class="banner-text__title">${props['banner-text__title']}</h3>
            <p class="banner-text__description">${props['banner-text__description']}</p>
            <div class="btn btn-banner btn-no-background btn-rounded-5px">Làm ngay</div>
        </div>
    `;
    div.insertAdjacentHTML('beforeend', htmls);
    return (isReturnDom) ? div : div.outerHTML;
}

async function QuizCategory(props = {}, isReturnDom = true) {
    const div = createElement({
        'type': 'div',
        'classNames': 'quiz-category',
        'id': 'js-homePageQuizCategoryContainer'
    });

    const div2 = createElement({
        'type': 'div',
        'classNames': 'category-items'
    });

    let htmls = ``;
    props.categories.forEach((value) => {
        htmls += `
            <div class="btn btn-rounded-5px category-item">
                <p class="category-item__text">${value}</p>
            </div>
        `;
    });

    div2.insertAdjacentHTML('beforeend', htmls);
    div.appendChild(div2);
    return (isReturnDom) ? div : div.outerHTML;
}

async function Quizzes(props = {}, isReturnDom = true) {
    const div = createElement({
        'type': 'div',
        'classNames': 'quizzes',
        'id': 'js-homePageQuizzesContainer'
    });

    let htmls = ``, index = 0;
    props.questions.forEach((value) => {
        htmls += `
            <a href="/quiz" data-id="quiz-${index}" data-link>
                <div class="quiz">
                    <div class="quiz-image"></div>
                    <div class="quiz-text">
                        <h3 class="quiz-name">${value.name}</h3>
                        <p class="quiz-amount">${value.questions} câu</p>
                    </div>
                    <span class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </a>
        `;
        index++;
    });
    div.insertAdjacentHTML('beforeend', htmls);
    return (isReturnDom) ? div : div.outerHTML;
}

// htmlDOM: createElement({
//     'type': 'div',
//     'classNames': 'home-page'
// }),
// data: {},
// render: async function() {
//     document.title = 'Home';
//     const root = document.getElementById('root');
//     const questions = [
//         {
//             'name': '25 điều thú vị về loài mèo mà bạn có biết?',
//             'questions': 25
//         },
//         {
//             'name': '10 câu hỏi toán lớp 1',
//             'questions': 10
//         },
//         {
//             'name': 'Nhũng câu hỏi hóc búa - Phần 3',
//             'questions': 20
//         },
//         {
//             'name': 'Những câu hỏi học búa - Phần 2',
//             'questions': 15
//         }
//     ];
//     const categories = ['Nổi bật', 'Yêu thích', 'Lập trình', 'Toán học'];
//     const htmls = `
//         ${Banner({
//             'banner-text__title': 'Quiz nổi bật nhất',
//             'banner-text__description': 'Đây là bài quiz được nhiều người dùng làm nhất tuần qua.'
//         }, false)}
//         <hr>
//         ${await QuizCategory({ categories }, false)}
//         <hr>
//         ${await Quizzes({ questions }, false)}
//     `;
//     this.htmlDOM.insertAdjacentHTML('beforeend', htmls);
//     root.appendChild(this.htmlDOM);
// },
// renderData: function() {

// }