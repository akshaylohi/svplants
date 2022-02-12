import * as React from 'react';
import { AppBar, Box, Dialog, CircularProgress, Toolbar, Button, DialogTitle, DialogContent, Grid, TextField, DialogActions } from '@material-ui/core';
import { useState } from 'react';

const Navbar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [plantName, setPlantName] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    // function to toggle the open state
    const toggleOpen = () => {
        setPlantName("");
        setDialogOpen(!dialogOpen);
    }

    const handleNameInput = e => {
        setPlantName(e.target.value);
    }

    const handleSubmit = e =>{
        e.preventDefault();
        props.addPlant({name: plantName, status: "ok"});
        toggleOpen();
    }

    const handleWaterAll = e =>{
        e.preventDefault();
        props.setWaterAllStatus("pending");
        props.waterAllPlants().then((response)=>{
            props.setWaterAllStatus("busy");
            console.log("status: ", response);
            setTimeout(() => {
                props.stopWaterAllPlants().then(()=>{
                    props.setWaterAllStatus("ok");
                }).catch((err)=>{
                    
                });
            }, 10000);
        }).catch((err)=>{
            console.log("error: ", err);
            props.setWaterAllStatus("ok");
        });
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Button style={{margin: 10, width: '10vw'}} onClick={toggleOpen} variant='contained' color="secondary">Add Plant</Button>
                    <Button style={{margin: 10, width: '10vw'}} onClick={handleWaterAll} disabled={props.waterAllStatus!="ok"} variant='contained' color="secondary">
                        {props.waterAllStatus == "pending"? <CircularProgress color="inherit"/>: "Water All"}
                        </Button>
                    <Dialog
                        open={dialogOpen}
                        onClose={toggleOpen}
                        aria-labelledby="form-dialog-title">

                        <DialogTitle id="form-dialog-title">Add Plant</DialogTitle>
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogContent>

                                <Grid container>
                                    <Grid item></Grid>
                                    <TextField
                                        name="plantName"
                                        variant="outlined"
                                        label="Plant Name"
                                        value={plantName}
                                        onChange={handleNameInput}></TextField>
                                </Grid>

                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" type='submit'>
                                    Ok
                                </Button>
                                <Button onClick={toggleOpen} color="secondary">
                                    Close
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Navbar;