import React, { useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

let rows = [];

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
        marginBottom:theme.spacing(4),
    }
}));

const CommentTable = (props) => {
    const { id } = props;
    const classes = useStyles()
    const [isLoading, setIsLoading] = React.useState(true);
    const [commentList, setCommentList] = React.useState(null);

    useEffect(() => {
      const getComments = async () => {
        const {
          comments
        } = await axios.get(`/posts/${id}/comments`);
        setCommentList(comments);
        setIsLoading(false);
      }

      getComments();
      console.log(commentList);
    }, []);

    return (
      <div className={classes.container}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                댓글
            </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">내용</TableCell>
              <TableCell align="right">작성자</TableCell>
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
                rows.map((row) => (
                  <TableRow key={row.key}>
                    <TableCell>{row.content}</TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>
                  </TableRow>
                ))
              )
            }
          </TableBody>
        </Table>
      </div>
    );
  }

export default CommentTable;