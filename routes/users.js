const db = require('../db/index')
const router = module.exports = require('express').Router()

// Get all users
router.get('/', async (req, res) => {
    const {rows} = await db.query('SELECT * FROM public."users"')

    res.send(rows)
})

// Get users with page-based pagination
router.get('/page', async (req, res) => {
    const {page = 0, size = 10} = req.query
    const offset = page * size;

    const {rows} = await db.query(
        'SELECT * FROM public."users" OFFSET $1 LIMIT $2',
        [offset, size]
    )

    const totalResult = await db.query('SELECT COUNT(*) FROM public."users"');
    const totalElements = parseInt(totalResult.rows[0].count, 10);
    const currentPage = Math.ceil(offset / size);

    res.send({
        data: rows,
        current_page: currentPage,
        number_of_elements: rows.length,
        total_elements: totalElements
    });
})

// Get users with offset-based pagination
router.get('/offset', async (req, res) => {
    const {offset = 0, size = 10} = req.query

    const {rows} = await db.query(
        'SELECT * FROM public."users" OFFSET $1 LIMIT $2',
        [offset, size]
    )

    const totalResult = await db.query('SELECT COUNT(*) FROM public."users"');
    const totalElements = parseInt(totalResult.rows[0].count, 10);

    res.send({
        data: rows,
        number_of_elements: rows.length,
        total_elements: totalElements
    });
})

// Get users with cursor-based pagination
router.get('/cursor', async (req, res) => {
    const {cursor, size = 10} = req.query;

    let query = 'SELECT * FROM public."users" WHERE id > $1 ORDER BY id LIMIT $2';
    let params = [cursor || 0, size];

    if (!cursor) {
        query = 'SELECT * FROM public."users" ORDER BY id LIMIT $1';
        params = [size];
    }

    const totalResult = await db.query('SELECT COUNT(*) FROM public."users"');
    const totalElements = parseInt(totalResult.rows[0].count, 10);

    const {rows} = await db.query(query, params);
    res.send({
        data: rows,
        number_of_elements: rows.length,
        total_elements: totalElements
    });
})

// Get user by ID
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const {rows} = await db.query('SELECT * FROM public."users" WHERE id = $1', [id])

    res.send(rows[0])
})
