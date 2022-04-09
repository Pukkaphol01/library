import {useState,useEffect} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonGroup from '@mui/material/ButtonGroup';
import DataTable, { createTheme } from 'react-data-table-component';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from '../navbar/SidebarData';



function App() {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  

const columns = [
  {
      name: 'ID',
      selector: row => row.Borrowid,style:{fontSize:'20px',textAlign:'center'},
      width:'120px',
      sortable:true,
  },
  {
      name: 'FirstName' ,
      selector: row => row.firstname,style:{padding:'10px',fontSize:'20px'},
      width:'150px'
  },
  {
      name: 'LastName',
      selector: row => row.lastname,style:{fontSize:'20px'},
      sortable:true,width:'150px'
  },
  {
      name: 'Bookid',
      selector: row => row.Bookid,style:{fontSize:'20px'},
      sortable:true,width:'120px'
  },
  {
      name: 'BookName',
      selector: row => row.Bookname,style:{fontSize:'20px'},
      sortable:true,width:'200px'
  },
  {
      name: 'DateBorrow',
      selector: row => row.dateBorrow ,style:{fontSize:'20px'},
      sortable:true,width:'250px'
  },
  {
      name: 'Status',
      selector: row => row.status,style:{fontSize:'20px'},
      sortable:true,width:'150px'
  },
  {
    name: 'Action',
    selector:row => row.Borrowid,
    cell:row => <ButtonGroup variant="contained" aria-label="outlined primary button group">
    <Button onClick={()=>haddleReturn(row.Borrowid)}>Return</Button>
    <Button onClick={()=>window.location=`/loan/${row.Borrowid}`}>Edit</Button>
    <Button onClick={()=>haddleDelete(row.Borrowid)}>Del</Button>
  </ButtonGroup>
  }

];

const customStyles = {
  table:{
    style:{
    margin:'auto',
    paddingLeft: '50px', // override the cell padding for data cells
    paddingRight: '50px',
    }
  },
  rows: {
      style: {
          margin:'auto',
          minHeight: '72px', // override the row height
      },
  },
  headCells: {
      style: {
          fontSize:'20px',
          height:'80px',
          textAlign:'Center',
          margin:'auto'

      },
  },
  cells: {
      style: {
        textAlign:'center'
  },
}
}

createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');

  const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
  const [sortcolumn, setSortcolumn] = useState('');
  const [sortcolumnDirection, setSortcolumnDirection] = useState('');
  
  var url = `http://localhost:3333/loanbooklist?page=${page}&per_page=${perPage}`;
  const [search, setSearch] = useState('');

  if(search){
    url += `&search=${search}`;
  }

  if (sortcolumn){
    url += `&sort_column=${sortcolumn}&sort_direction=${sortcolumnDirection}`
  }


	const fetchData = async () => {
		setLoading(true);

		const response = await axios.get(url);

		setData(response.data.data);
		setTotalRows(response.data.total);
		setLoading(false);
	};

  const haddleDelete = Borrowid => {
    var data ={
      'Borrowid':Borrowid
    }

    fetch('http://localhost:3333/deleteborrow', {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        
        if (result['status'] === 'ok') {
          alert('Delete Complete')
          fetchData();
        }
      }
    )
  }

  const haddleReturn = Borrowid => {
    var list = {
      'Borrowid':Borrowid
    }

    fetch('http://localhost:3333/return', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list),
    })
    .then(res => res.json())
    .then(
      (result) => {
        
        if (result['status'] === 'ok') {
         alert('Return Complete') 
         fetchData();
        }
      }
    )
  }

  

	const handlePageChange = page => {
		setPage(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setPerPage(newPerPage);
	};

  const handleSort = (column, sortDirection) => {
    setSortcolumn(column.name);
    setSortcolumnDirection(sortDirection);
	};

  const haddleSearchChange = (event) =>{
    setSearch(event.target.value);
  }
  
  const haddleSearchsubmit = (event)=>{
    event.preventDefault(); // ไม่ใช้เปลี่ยนหน้าหรือเข้าหน้ามาใหม่
    fetchData();
  }
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  

	useEffect(() => {
		fetchData()
	}, [page, perPage,setSortcolumn,setSortcolumnDirection]);


	return (
    
    <div>
       <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" style={{height:'100px'}} >
        <Toolbar >
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={showSidebar}
          >
            <MenuIcon sx ={{flexGrow:1}}  style={{fontSize:'40px',marginRight:'5px',marginTop:'15px'}}/>
          </IconButton>
          <Typography variant="h4" component="div" style={{fontWeight:'800',marginTop:'20px'}} sx={{ flexGrow: 1 }}>
           LoanBookList 
          </Typography>
          
     <Paper
      component="form"
      onSubmit={haddleSearchsubmit}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Book... "
        inputProps={{ 'aria-label': 'search ' }}
        onChange={haddleSearchChange}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      </Paper>

        </Toolbar>

      </AppBar>
    </Box>
		<DataTable 
    
		columns={columns}
		data={data}
        customStyles={customStyles}
        theme="solarized"
		progressPending={loading}
		pagination
		paginationServer
		paginationTotalRows={totalRows}
		onChangeRowsPerPage={handlePerRowsChange}
		onChangePage={handlePageChange}
        onSort={handleSort}
        highlightOnHover

		/>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} >
          <ul className='nav-menu-items' onClick={showSidebar} >
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
    </div>
	);
}

export default App;
