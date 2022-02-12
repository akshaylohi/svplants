import * as React from 'react';
import { Typography, CircularProgress, Box } from '@material-ui/core';

const CircularProgressWithLabel = (props) =>{

    const getStyle = (value) =>{
        let styleObj = {};
        styleObj['color'] = (value>=50?'green':(value>=25?'amber':'red'));
        return styleObj;
    };

    return(
        <Box sx={{margin: '10vh', display: 'flex', alignContent: 'center', justifyItems: 'center', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="subtitle2" style={getStyle(props.value)}>Health</Typography>
        <Box sx={{position: 'relative', display:'inline-flex'}}>
            <CircularProgress variant='determinate' {...props} style={getStyle(props.value)}/>
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="textSecondary">
                    {props.value+"%"}
                </Typography>
            </Box>
        </Box>
        </Box>
    );
};

export default CircularProgressWithLabel;