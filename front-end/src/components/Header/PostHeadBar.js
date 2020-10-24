import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const currencies = [
  {
    value: 'title',
    label: '제목',
  },
  {
    value: 'user',
    label: '작성자',
  },
  {
    value: 'content',
    label: '내용',
  },
  {
    value: 'title_content',
    label: '제목 + 내용',
  },
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    margin: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  tool: {
    padding:0,
  }
}));

const PostHeadBar = (props) => {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState('title');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Grid container direction="row" justify="space-between" alignItems="center" >
      <Grid item xs={4} >
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button>인기</Button>
          <Button>정보</Button>
          <Button>최신</Button>
        </ButtonGroup>
      </Grid>
        <Grid item xs={8}>
        <Box display="flex" justifyContent="flex-end">
          <Toolbar className={classes.tool}>
          <TextField
            id="outlined-select-currency"
            select
            value={currency}
            onChange={handleChange}
            variant="outlined"
            size="small"
            label="Select"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <Button variant="contained" component={Link} to="/" >글쓰기</Button>
          </Toolbar>
        </Box>
        </Grid>
    </Grid>
    
  );
}

export default PostHeadBar;