const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');

const dom = new JSDOM(html);
const document = dom.window.document;

test('Проверка наличия заголовка "Компьютеры"', () => {
    const h2Element = document.querySelector('h2');
    expect(h2Element).not.toBeNull();
    expect(h2Element.textContent).toBe('Компьютеры');
});









