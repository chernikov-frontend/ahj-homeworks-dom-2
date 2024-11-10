// Подключение данных с сервера
import fetchMovies from './mockData.js';

document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#loadingSorting tbody');
    const data = await fetchMovies();
    createTable(tableBody, data);
    startSorting(tableBody);
});

function createTable(tableBody, movies) {
    movies.forEach(movie => {
        const row = document.createElement('tr');
        row.dataset.id = movie.id;
        row.dataset.title = movie.title;
        row.dataset.year = movie.year;
        row.dataset.imdb = movie.imdb;

        row.innerHTML = `
        <td>#${movie.id}</td>
        <td>${movie.title}</td>
        <td>(${movie.year})</td>
        <td>imdb: ${movie.imdb.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    });
}

function startSorting(tableBody) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    let fieldIndex = 0;
    let order = 1;
    const fields = ['id', 'title', 'year', 'imdb'];

    setInterval(() => {
        sortRows(rows, fields[fieldIndex], order);
        updateTableBody(tableBody, rows);
        order *= -1;
        if (order < 0) fieldIndex = (fieldIndex + 1) % fields.length;
    }, 2000);
}

function sortRows(rows, field, order) {
    rows.sort((a, b) => {
        const valueA = a.dataset[field];
        const valueB = b.dataset[field];

        if (field === 'id' || field === 'year' || field === 'imdb') {
        return (Number(valueA) - Number(valueB)) * order;
        }
        return valueA.localeCompare(valueB) * order;
    });
}

function updateTableBody(tableBody, rows) {
    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}
