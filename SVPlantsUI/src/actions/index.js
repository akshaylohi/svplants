import backend from "./api";
import { toast } from "react-toastify";
import _ from "lodash";

import { GET_PLANT, GET_PLANTS, EDIT_PLANT, ADD_PLANT, DELETE_PLANT, WATER_PLANT, WATER_ALL_PLANTS,
   STOP_WATER_ALL, STOP_WATER_PLANT, SET_PLANTS_HEALTH } from "./types";

export const getLocaleTime = (utcString) =>{
  var utcDate = new Date(utcString);
  var localeDate = new Date(Date.UTC(
    utcDate.getFullYear(), 
    utcDate.getMonth(), 
    utcDate.getDate(), 
    utcDate.getHours(),
    utcDate.getMinutes(),
    utcDate.getSeconds(),
    utcDate.getMilliseconds()
    ));
    
  return localeDate;
};

export const getLocaleDateTimeString = (utcString) =>{
  var localeTime = getLocaleTime(utcString.slice(0, -1));
  
  return (localeTime.getFullYear()+
  "/"+(localeTime.getMonth()+1)+
  "/"+localeTime.getDate()+
  " "+localeTime.getHours()+
  ":"+localeTime.getMinutes()+
  ":"+localeTime.getSeconds());
};

export const getPlants = () => async (dispatch) => {
    try {
      return backend.get("/api/Plants", {
      }).then((response)=>{
        dispatch({ type: GET_PLANTS, payload: response.data });
      });
      
    } catch (error) {
      if (!_.isEmpty(error)) toast.error(error.response.data.message);
    }
  };

  export const waterPlant = (plantId) => async (dispatch) => {
    try {
      backend.get("/api/Plants/water/"+plantId, {
      })
      .then(response=>{
        dispatch({ type: WATER_PLANT, payload: response.data});
        toast.success("Watering started");
      }).catch(err=> toast.error(err));
      
    } catch (error) {
      if (!_.isEmpty(error)) toast.error(error.response.data.message);
    }
  };

  export const waterAllPlants = () => async (dispatch) => {
    return new Promise((resolve, reject)=>{
      backend.get("/api/Plants/waterAll/", {
      })
      .then(response=>{
        dispatch({ type: WATER_ALL_PLANTS, payload: response.data});
        toast.success("Watering all plants");
        resolve(response);
      }).catch((err)=> {
        toast.error("Cannot water all plants. Please wait!")
        reject(err);
      });
    })
    
  };

  export const stopWaterAllPlants = () => async (dispatch) => {
    return new Promise((resolve, reject)=>{
      backend.get("/api/Plants/stopWaterAll/", {
      })
      .then(response=>{
        dispatch({ type: STOP_WATER_ALL, payload: response.data});
        toast.success("Stopped watering all plants");
        resolve(response);
      }).catch((err)=> {
        toast.error("Cannot stop watering all plants. Please try individually.")
        reject(err);
      });
    })
    
  };

  export const stopWaterPlant = (plantId) => async (dispatch) => {
    try {
      backend.get("/api/Plants/stopWatering/"+plantId, {
      })
      .then(response=>{
        dispatch({ type: STOP_WATER_PLANT, payload: response.data});
        toast.success("Watering stopped");
      })
      .catch(err=> toast.error(err));
      
    } catch (error) {
      if (!_.isEmpty(error)) console.log(error.response.data.message);
    }
  };

  export const addPlant = (plant) => async (dispatch) => {
    try {
      backend.post("/api/Plants", plant)
      .then(response=>{
        dispatch({ type: ADD_PLANT, payload: response.data});
        toast.success("Plant successfully added");
      })
      .catch(err=> toast.error(err));
      
    } catch (error) {
      if (!_.isEmpty(error)) toast.error(error.response.data.message);
    }
  };

    export const deletePlant = (plant) => async (dispatch) => {
    try {
      backend.delete("/api/Plants/"+plant.plantId)
      .then(response=>{
        dispatch({ type: DELETE_PLANT, payload: plant});
        toast.success("Plant successfully deleted");
      })
      .catch(err=> toast.error(err));
      
    } catch (error) {
      if (!_.isEmpty(error)) toast.error(error.response.data.message);
    }
  };

  export const setPlantsHealth = () => async (dispatch) => {
      return new Promise((resolve, reject)=>{
        backend.get("/api/Plants", {
        }).then((response)=>{
          var healthData = {};
          var plantTime;
          let percent;
          response.data.forEach((plant)=>{
            plantTime = getLocaleTime(plant.lastWateredTime);
            let timeDiff = new Date() - plantTime;
            percent = Math.ceil(100 - ((timeDiff*100)/(6*60*1000)));
            healthData[plant.plantId] = percent < 0 ? 0: percent;
          })
          dispatch({ type: SET_PLANTS_HEALTH, payload: healthData});
        });
      });
  };