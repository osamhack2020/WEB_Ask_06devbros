import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

// Generate Order Data
function createData(posts) {
  let rows = [];
  let key = 1;
  console.log(posts);
    rows.push({
      key:key,
      id:key,
      title:posts.title,
      content:posts.content,
      user:'익명',
      // createdAt:posts.createdAt.slice(0, 9)
    })
    key++;

  return rows;
}

// const rows = [
//   createData(0, 0, '고민있어요!', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Elvis Presley', '2020-10-11'),
//   createData(1, 1, '이런 고민 하신적 있나요?', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Paul McCartney', '2020-10-11'),
//   createData(2, 2, '너무 힘들어요...', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Tom Scholz', '2020-10-11'),
//   createData(3, 3, '빨리 전역하고 싶다ㅏ..', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Michael Jackson', '2020-10-11'),
//   createData(4, 4, '이거 아는 분!', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Bruce Springsteen', '2020-10-11'),
//   createData(0, 0, '고민있어요!', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Elvis Presley', '2020-10-11'),
//   createData(1, 1, '이런 고민 하신적 있나요?', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Paul McCartney', '2020-10-11'),
//   createData(2, 2, '너무 힘들어요...', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Tom Scholz', '2020-10-11'),
//   createData(3, 3, '빨리 전역하고 싶다ㅏ..', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Michael Jackson', '2020-10-11'),
//   createData(4, 4, '이거 아는 분!', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Bruce Springsteen', '2020-10-11'),
//   createData(0, 0, '고민있어요!', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Elvis Presley', '2020-10-11'),
//   createData(1, 1, '이런 고민 하신적 있나요?', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Paul McCartney', '2020-10-11'),
//   createData(2, 2, '너무 힘들어요...', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Tom Scholz', '2020-10-11'),
//   createData(3, 3, '빨리 전역하고 싶다ㅏ..', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Michael Jackson', '2020-10-11'),
//   createData(4, 4, '이거 아는 분!', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Bruce Springsteen', '2020-10-11'),
//   createData(0, 0, '고민있어요!', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Elvis Presley', '2020-10-11'),
//   createData(1, 1, '이런 고민 하신적 있나요?', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Paul McCartney', '2020-10-11'),
//   createData(2, 2, '너무 힘들어요...', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Tom Scholz', '2020-10-11'),
//   createData(3, 3, '빨리 전역하고 싶다ㅏ..', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Michael Jackson', '2020-10-11'),
//   createData(4, 4, '이거 아는 분!', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Bruce Springsteen', '2020-10-11'),
//   createData(0, 0, '고민있어요!', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Elvis Presley', '2020-10-11'),
//   createData(1, 1, '이런 고민 하신적 있나요?', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Paul McCartney', '2020-10-11'),
//   createData(2, 2, '너무 힘들어요...', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Tom Scholz', '2020-10-11'),
//   createData(3, 3, '빨리 전역하고 싶다ㅏ..', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Michael Jackson', '2020-10-11'),
//   createData(4, 4, '이거 아는 분!', '대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다.', 'Bruce Springsteen', '2020-10-11'),
// ];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const PostsTable = (props) => {
    const { errorMessage, posts } = props;
    const classes = useStyles()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    console.log(posts);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
      <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                고민 게시판
            </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>내용</TableCell>
              <TableCell>작성자</TableCell>
              <TableCell align="right">작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row._id} component={Link} to="/" style={{textDecoration:"none", color:"black"}}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.content.slice(0, 30) + '...'}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more orders
          </Link>
          {/* <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
        </div>
      </React.Fragment>
    );
  }

export default PostsTable;