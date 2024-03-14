'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // расчет высоты выделения популярного тарифа
    const popularTariff = document.getElementById('popular-tariff');
    const tableHeight = document.querySelector('.table-wrapper').getBoundingClientRect().height;
    popularTariff.style.height = `calc(100% + ${tableHeight - 35}px)`;

    // появление липкой шапки
    const tableWrapper = document.querySelector('.tariffs-and-costs');
    const stickyHeader = document.querySelector('.table-sticky-header');
    const tableWrapperPos = tableWrapper.offsetTop * -1;

    document.addEventListener('scroll', e => {
        const scrollWindow = e.target.body.getBoundingClientRect().top;

        scrollWindow <= tableWrapperPos - 142
            ? stickyHeader.classList.add('show-sticky-header')
            : stickyHeader.classList.remove('show-sticky-header');
    });

    //развернуть/свернуть таблицу
    const showFullTableBtn = document.getElementById('show-full-table-btn');
    showFullTableBtn.addEventListener('click', e => {
        const parent = e.target.parentElement;
        const grandParent = e.target.closest('.tariffs-and-costs');
        const tableContainer = grandParent.querySelector('.table-container');

        if (!e.target.classList.contains('showed-table')) {
            const tableHeight = tableContainer.children[0].getBoundingClientRect().height;
            tableContainer.style.maxHeight = `${tableHeight + 200}px`;
            e.target.classList.add('showed-table');
            e.target.innerText = 'Close table';
            parent.classList.remove('mist');
        } else {
            tableContainer.style.maxHeight = `500px`;
            e.target.classList.remove('showed-table');
            e.target.innerText = 'Show table';
            parent.classList.add('mist');
        }
    });

    //логика расчета
    const priceList = {
        one_recruiter: 4000,
        additional_recruiter: 1900,
        additional_connection: 950,
        allowance: 2000
    };

    const calculationForm = document.getElementById('calc-form');
    const calculateBtn = document.getElementById('calc-btn');
    const fastStartPrice = document.querySelectorAll('.fast-start > span');
    const advancedPrice = document.querySelectorAll('.advanced > span')
    calculateBtn.addEventListener('click', () => {
        const fieldValues = [...new FormData(calculationForm)];

        const tmpSumm = fieldValues[0][1] > 1
            ? (--fieldValues[0][1]) * priceList.additional_recruiter + priceList.one_recruiter
            : fieldValues[0][1] * priceList.one_recruiter;

        const formula = (tmpSumm + fieldValues[1][1] * priceList.additional_connection);
        const fastStart = formula / 89 * 3;

        const advanced = (formula + priceList.allowance * (++fieldValues[0][1])) / 89 * 3;

        fastStartPrice.forEach(item => item.innerText = `${Math.ceil(fastStart)} $`);
        advancedPrice.forEach(item => item.innerText = `${Math.ceil(advanced)} $`);
    });
});
