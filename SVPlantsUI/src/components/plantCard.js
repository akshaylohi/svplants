import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';


const PlantCard = (props) => {

    const { classes, plant } = props;
    return (
        <Card sx={{ maxWidth: 345 }} className={classes.noHighlight}>
            <CardMedia
                component="img"
                height="350"
                image={props.image}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Plant Id: {props.plant.plantId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Name: {props.plant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Water: {props.plant.status=="ok"?"OFF":"ON"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Last Watered: {props.plant.lastWateredTime}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={()=>{props.waterPlant(plant)}}>{
                     plant.status=="ok"? "Water":"Stop water"
                }</Button>
                <Button variant="outlined" color="secondary" onClick={()=>{
                    props.deletePlant(props.plant);
                }}>Delete</Button>
            </CardActions>
        </Card>
    );
};

export default PlantCard;