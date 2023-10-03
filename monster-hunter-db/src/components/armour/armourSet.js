import * as React from 'react';
import {useState, useEffect} from "react";
import { Box } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import Fire from '../../assets/icons/Element_Fire_Icon.webp'
import Water from '../../assets/icons/Element_Water_Icon.webp'
import Ice from '../../assets/icons/Element_Ice_Icon.webp'
import Thunder from '../../assets/icons/Element_Thunder_Icon.webp'
import Dragon from '../../assets/icons/Element_Dragon_Icon.webp'
import { useTheme } from "@mui/material";
import {DataGrid,GridToolbar} from "@mui/x-data-grid";
import { getArmourIcon } from './getArmourIcon';
import MUIDataTable from "mui-datatables";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";





export default function ArmourSet() {
    const { id } = useParams();
    console.log(id);
    const [armourset, setArmourSet] = useState([]);
    const [armourpieces, setArmourpieces] = useState([]);
    // console.log(Object.keys(armour_pieces))
    const [hoveredCard, setHoveredCard] = useState(null);
    const [searchBtn, setSearchBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const { palette } = useTheme();

    const elementIcons = {
        Fire,
        Water,
        Ice,
        Thunder,
        Dragon
    };

    const datagridSx = {
        border: palette.borderColour.MUIDataGrid,
        borderRadius: '5px',
        '.centered-cell': { justifyContent: 'center' },
        "& .MuiDataGrid-columnHeaders": {
        backgroundColor: palette.background.MuiDataGridcolumnHeaders,
        fontSize: 16
        },
        "& .MuiDataGrid-row": {
            backgroundColor: palette.background.MuiDataGridrow
        }
    };

    const sortOrder = {
        "Head": 1,
        "Chest": 2,
        "Arms": 3,
        "Waist": 4,
        "Legs": 5,
      };

    useEffect(() => {
        const fetchArmourSet = async () => {
            try {
                const response = await fetch(`https://localhost:443/api/v1/armour/armourSets/${id}`);
                const data = await response.json();
                setArmourSet(data);
                setArmourpieces(data.armours.sort((a, b) => sortOrder[a.piece_type] - sortOrder[b.piece_type]))
                console.log(data);
            } catch (error) {
                console.error('Error fetching armour set:', error);
            }
        };

        fetchArmourSet()
    }, [id]);

    const armourSkills = armourpieces.map((piece) => {
        return JSON.parse(piece.armourskills)
    })


    // const columns = [
    //     { field: 'armour_name', headerName: 'Name', flex:0.3, sortable: true, valueGetter: (params) => params.row.armour_name,
    //         renderCell: (params) => (
    //             <Link to={`/armour/${params.row.id}`} style={{ textDecoration: 'none' }}>
    //                 <Box
    //                     sx={{
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     alignItems: 'center',
    //                     gap: '5px',
    //                     }}
    //                 >
    //                    <div>
    //                         <Box
    //                         component="img"
    //                         mr={1}
    //                         mt={1}
    //                         sx={{
    //                             height: 100,
    //                             width: 100,
    //                             border: '2px solid black',
    //                         }}
    //                         alt=""
    //                         src={params.row['m_armour_img_url']}
    //                         />
    //                         <Box
    //                         mt={1}
    //                         component="img"
    //                         sx={{
    //                             height: 100,
    //                             width: 100,
    //                             border: '2px solid black',
    //                         }}
    //                         alt=""
    //                         src={params.row['f_armour_img_url']}
    //                         />
    //                     </div>
    //                 {params.row.armour_name}
    //                 </Box>
    //             </Link>
    //         ),
    //         cellClassName: 'centered-cell',
    //     },
    //     {
    //         field: 'piece_type',
    //         headerName: '',
    //         flex: 0.1,
    //         sortable: true,
    //         renderCell: (params) =>
    //             <Box
    //                 component="img"
    //                 sx={{
    //                     height: 40,
    //                     width: 40,
    //                     marginRight: '8px',
    //                 }}
    //                 alt={params.row.piece_type}
    //                 src={getArmourIcon(params.row.piece_type)}// Remove the parentheses and return the JSX directly}
    //             />
                
    //     },
    //     { field: 'defense', headerName: 'Defense', flex:0.1, sortable: true},
    //     { field: 'fire_res', headerName: 'Fire', flex:0.1, sortable: true,
    //     renderHeader: (params: GridColumnHeaderParams) => (
    //         <Box
    //             component="img"
    //             sx={{
    //                 height: 40,
    //                 width: 40,
    //                 marginRight: '8px',
    //             }}
    //             alt="Fire"
    //             src={Fire}
    //         />
    //     ),},
    //     { field: 'water_res', headerName: 'Water', flex:0.1, sortable: true,
    //     renderHeader: (params: GridColumnHeaderParams) => (
    //         <Box
    //             component="img"
    //             sx={{
    //                 height: 40,
    //                 width: 40,
    //                 marginRight: '8px',
    //             }}
    //             alt="Water"
    //             src={Water}
    //         />
    //     ),},
    //     { field: 'ice_res', headerName: 'Ice', flex:0.1, sortable: true,
    //     renderHeader: (params: GridColumnHeaderParams) => (
    //         <Box
    //             component="img"
    //             sx={{
    //                 height: 40,
    //                 width: 40,
    //                 marginRight: '8px',
    //             }}
    //             alt="Ice"
    //             src={Ice}
    //         />
    //     ),},
    //     { field: 'thunder_res', headerName: 'Thunder', flex:0.1, sortable: true,
    //     renderHeader: (params: GridColumnHeaderParams) => (
    //         <Box
    //             component="img"
    //             sx={{
    //                 height: 40,
    //                 width: 40,
    //                 marginRight: '8px',
    //             }}
    //             alt="Thunder"
    //             src={Thunder}
    //         />
    //     ),},
    //     { field: 'dragon_res', headerName: 'Dragon', flex:0.1, sortable: true,
    //     renderHeader: (params: GridColumnHeaderParams) => (
    //         <Box
    //             component="img"
    //             sx={{
    //                 height: 40,
    //                 width: 40,
    //                 marginRight: '8px',
    //             }}
    //             alt="Dragon"
    //             src={Dragon}
    //         />
    //     ),},
    //     { field: 'decoSlots', headerName: 'Deco Slots', flex:0.3, sortable: true, renderCell: (params) => {
    //     const decoSlots = JSON.parse(params.value);

    //     return (
    //         <div>
    //             {decoSlots &&
    //                 decoSlots.map((decoration, index) => (
    //                     <span key={index}>
    //                         <Box
    //                             component="img"
    //                             sx={{
    //                                 height: 40,
    //                                 width: 40,
    //                                 marginRight: '8px',
    //                             }}
    //                             alt={decoration}
    //                             src={deco_imgs[decoration]}
    //                         />
    //                       {/*<img src={deco_imgs[decoration]} alt={decoration} />*/}
    //                     </span>
    //                                 ))}
    //         </div>
    //             );
    //         },
    //     },
    //     { field: 'rarity', headerName: 'Rarity', flex:0.1, sortable: true},
    // ];


    const deco_imgs = {
        "deco1": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco1.png",
        "deco2": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco2.png",
        "deco3": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco3.png",
        "deco4": "https://cdn.kiranico.net/file/kiranico/mhrise-web/images/ui/deco4.png"
    }

    const columns = [
        {
          name: 'Name',
          options: {
            customBodyRender: (value, tableMeta, updateValue) => (
                console.log(tableMeta)
            //   <div className="name-column">
            //     <div className="image-container">
            //       <img
            //         src={tableMeta.rowData[0]} // Assuming the image URL is in the first column
            //         alt="Armour"
            //         className="armour-image"
            //       />
            //     </div>
            //     <div className="name-text">{tableMeta.rowData[1]}</div>
            //   </div>
            ),
          },
        },
        {
            name: 'Defense',
            options: {
              customBodyRender: (value, tableMeta, updateValue) => (
                  // console.log(tableMeta)
               tableMeta.rowData[2]
              ),
            },
          },
        {
            name: 'Fire Res',
            options: {
              customBodyRender: (value, tableMeta, updateValue) => (
                  // console.log(tableMeta)
               tableMeta.rowData[3]
              ),
            },
          },
        {
            name: 'Water Res',
            options: {
              customBodyRender: (value, tableMeta, updateValue) => (
                  // console.log(tableMeta)
               tableMeta.rowData[4]
              ),
            },
          },
        {
            name: 'Ice Res',
            options: {
              customBodyRender: (value, tableMeta, updateValue) => (
                  // console.log(tableMeta)
               tableMeta.rowData[5]
              ),
            },
          },
        {
            name: 'Thunder Res',
            options: {
              customBodyRender: (value, tableMeta, updateValue) => (
                  // console.log(tableMeta)
               tableMeta.rowData[6]
              ),
            },
          },
        {
            name: 'Dragon Res',
            options: {
              customBodyRender: (value, tableMeta, updateValue) => (
                  // console.log(tableMeta)
               tableMeta.rowData[7]
              ),
            },
          },
      ];
    
      const data = armourpieces.map((piece) => [
        piece.m_armour_img_url, // Assuming the image URL is in the first column
        piece.armour_name,
        piece.defense,
        piece.fire_res,
        piece.water_res,
        piece.ice_res,
        piece.thunder_res,
        piece.dragon_res,
      ]);

      console.log(data);
    
      const options = {
        filterType: 'checkbox',
        selectableRows: 'none',
        responsive: 'standard',
      };


    return (
        <div className="armour-set">
            <h1>placeholder</h1>
           
            <MUIDataTable title={"Armour"} data={data} columns={columns} options={options}/>
           
            {/* <div className="armour-pieces">
                <Box>
                        <DataGrid
                            rows={armourpieces}
                            columns={columns}
                            getRowId={(row) => row.id}
                            autoHeight
                            slots={{ toolbar: GridToolbar }}
                            sx={datagridSx}
                            // pageSize={5}
                            disableRowSelectionOnClick
                            // initialState={{
                            //     sorting: {
                            //         sortModel: [{ field: 'quest_name', sort: 'asc' }],
                            //     },
                            //     pagination: { paginationModel: { pageSize: 5 } },
                            // }}
                            // pageSizeOptions={[5, 10, 25]}
                            getRowHeight={() => 'auto'}
                        />
                    </Box>
            </div> */}
        </div>
       
       
    );
}