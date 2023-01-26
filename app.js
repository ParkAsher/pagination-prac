const express = require('express');
const app = express();

/* movies */
const movies = require('./models/movies');

/* view */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* api */
app.get('/movies', (req, res) => {
    let currentPage = req.query.page;
    if (currentPage === 'null') currentPage = 1;

    let Movies = [...movies];

    // 총 게시글 수
    let totalPostLength = Movies.length;
    // console.log(totalPostLength);

    // 총 페이지 수 : 1페이지당 10개씩
    let totalPage = Math.ceil(totalPostLength / 10);
    // console.log(totalPage);

    // 입력받은 페이지가 총 페이지를 넘었을때 error
    if (totalPage < currentPage) {
        res.send({ error: '마지막 페이지입니다. ' });
    }

    // 화면에 보여줄 그룹 : 한 그룹당 6개 페이지 띄우기
    let pageGroup = Math.ceil(currentPage / 6);

    // 한 그룹의 마지막 페이지번호
    let lastPage = pageGroup * 6;

    // 한 그룹의 첫 페이지번호
    let firstPage = lastPage - 6 + 1 <= 0 ? 1 : lastPage - 6 + 1;

    if (lastPage > totalPage) {
        lastPage = totalPage;
    }

    // 게시글 잘라서 가져오기
    const paginationMovies = Movies.splice((currentPage - 1) * 10, 10);

    paginationMovies.sort((a, b) => {
        const prevTime = new Date(a.created_at).getTime();
        const nextTime = new Date(b.created_at).getTime();
        return nextTime - prevTime;
    });

    console.log(firstPage, lastPage);

    res.send({
        pageInfo: {
            firstPage,
            lastPage,
        },
        movies: paginationMovies,
    });
});

app.listen(5000, () => {
    console.log(`5000포트에서 실행`);
});
