import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

let rows = [];
let key = 1;

// Generate Order Data
function createData(posts) {
  let postsAry = [];
  rows = [];

  for(let i = 0; i < posts.length; i++){
    postsAry.push(posts[i]);
  }

  postsAry.map((post) => {
    rows.push({
      key:post._id,
      id:key,
      title:post.title,
      content:post.content,
      user:'익명',
      createdAt:post.createdAt.slice(0, 10),
    })
    key++;
  })
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const PostsTable = (props) => {
    const { posts } = props;
    const classes = useStyles()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
      createData(posts);
      setIsLoading(false);
      key = 1;
    }, []);

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
            {
              isLoading ?
              (
                <div>isLoading....</div>
              )
              :
              (
                (rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                  <TableRow 
                  key={row.key} 
                  component={Link} 
                  to={{
                    pathname: "/posts/" + row.key,
                    state:{
                      id:row.key,
                      title:row.title,
                      content:row.content,
                      user:row.user,
                    }
                  }} 
                  style={{textDecoration:"none", color:"black"}}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.content.slice(0, 30) + '...'}</TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>
                  </TableRow>
                ))
              )
            }
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more orders
          </Link>
          <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </React.Fragment>
    );
  }

export default PostsTable;