
import fetchMovies from './mockData.js';

document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#inMemorySorting tbody');
    const data = await fetchMovies();
    createInMemoryTable(tableBody, data);
});

function createInMemoryTable(tableBody, movies) {
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

    const fields = ['id', 'title', 'year', 'imdb'];
    fields.forEach(field => {
        const header = document.querySelector(`#inMemorySorting th:nth-child(${fields.indexOf(field) + 1})`);
        header.addEventListener('click', () => {
        sortInMemoryRows(tableBody, field);
        });
    });
}

function sortInMemoryRows(tableBody, field) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const order = rows[0].dataset[field] > rows[rows.length - 1].dataset[field] ? -1 : 1;

    rows.sort((a, b) => {
        const valueA = a.dataset[field];
        const valueB = b.dataset[field];

        if (field === 'id' || field === 'year' || field === 'imdb') {
        return (Number(valueA) - Number(valueB)) * order;
        }
        return valueA.localeCompare(valueB) * order;
    });

    updateInMemoryTable(tableBody, rows);
}

function updateInMemoryTable(tableBody, rows) {
    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}
