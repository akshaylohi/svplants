import { CssBaseline, Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux'
import * as actions from "../actions"
import _ from "lodash";
import store from "store";
import PlantCard from "./plantCard";
import Navbar from "./Appbar";
import { withStyles } from '@material-ui/core/styles';
import plant1Image from '../resources/images/plant1.jpg';
import plant2Image from '../resources/images/plant2.jpg';
import plant3Image from '../resources/images/plant3.jpg';
import plant4Image from '../resources/images/plant4.jpg';
import plant5Image from '../resources/images/plant5.jpg';
import { toast } from "react-toastify";

const getImage = (id) => {
    switch (id) {
        case 0: { return plant1Image; break; }
        case 1: { return plant2Image; break; }
        case 2: { return plant3Image; break; }
        case 3: { return plant4Image; break; }
        case 4: { return plant5Image; break; }
        default: { return null; }
    }
};



const styles = theme => ({
    noHighlight: {
        marginTop: '30px',
        marginBottom: '30px',
        marginLeft: '15px',
        marginRight: '15px'
    },
    plantContainer: {
        background: '#f2f2f2',
        padding: '20px'
    }
});
const LandingContainer = (props) => {

    const [waterAllStatus, setWaterAllStatus] = useState("pending");

    //componentDidMount
    useEffect(() => {
        props.getPlants();
        props.setPlantsHealth();
    }, [])

    useEffect(() => {
        var flag = true;
        props.plants.forEach((plant)=>{
            
            if(plant.status !="ok"){
                flag = false;
            }
        });
        setWaterAllStatus(flag?"ok":"busy");
    }, [props.plants])


    const { classes } = props;

    //wrapper for waterPlant action
    const WaterPlantWrapper = (plant) => {
        if ((new Date() - (actions.getLocaleTime(plant.lastWateredTime)))/1000 < 30) {
            toast.error("Please wait for 30seconds");
            return;
        }
        
        if (canWater(plant.plantId)) {
            props.waterPlant(plant.plantId);
            setTimeout(() => {
            stopWaterWrapper(plant);
        }, 10000);
        } else {
            stopWaterWrapper(plant);
        }

    }

    //Wrapper for stopWatering action
    const stopWaterWrapper = (plant) =>{
        props.stopWatering(plant.plantId);
    }


    // function to check if plant can water
    const canWater = (plantId) => {
        var out = false;
        var plantTime;
        props.plants.forEach(plant => {
            plantTime = actions.getLocaleTime(plant.lastWateredTime);
            if (plant.plantId == plantId && plant.status === "ok" && ((new Date() - plantTime) / 1000) > 30) {
                out = true;
            }
        })
        return out;
    }

    let healthCheckInterval = setInterval(props.setPlantsHealth,25000);

    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar addPlant={props.addPlant} 
            waterAllPlants={props.waterAllPlants} 
            waterAllStatus={waterAllStatus} 
            stopWaterAllPlants={props.stopWaterAllPlants}
            setWaterAllStatus={setWaterAllStatus}/>
            <Container maxWidth="lg" className={classes.plantContainer}>

                <Grid id="plantsGrid" container>
                    {

                        props.plants.map((plant, index) => {
                            return (
                                <Grid item key={index} sm={4}>
                                    <PlantCard
                                        classes={classes}
                                        image={getImage(index)}
                                        plant={plant}
                                        waterPlant={WaterPlantWrapper}
                                        canWater={canWater}
                                        deletePlant={props.deletePlant}
                                        plantsHealth={props.plantsHealth}
                                    />
                                </Grid>
                            );
                        })}

                </Grid>
            </Container>
        </React.Fragment>
    )


}
const mapStateToProps = state => {
    return {
        plants: _.values(state.plants),
        plantsHealth: state.utils.plantsHealth
    };
}
const mapActionToProps = {
    getPlants: actions.getPlants,
    waterPlant: actions.waterPlant,
    stopWatering: actions.stopWaterPlant,
    addPlant: actions.addPlant,
    deletePlant: actions.deletePlant,
    waterAllPlants: actions.waterAllPlants,
    stopWaterAllPlants: actions.stopWaterAllPlants,
    setPlantsHealth: actions.setPlantsHealth
}
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(LandingContainer));