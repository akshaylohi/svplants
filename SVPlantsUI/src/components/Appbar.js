import * as React from 'react';
import { AppBar, Box, Dialog, Toolbar, Button, DialogTitle, DialogContent, Grid, TextField, DialogActions } from '@material-ui/core';
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


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button onClick={toggleOpen} variant='contained' color="primary">Add Plant</Button>
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