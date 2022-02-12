using SVPlantApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SVPlantApi.PlantData
{
    public class SQLPlantData : IPlantData
    {
        private PlantContext _plantContext;

        public SQLPlantData(PlantContext plantContext)
        {
            _plantContext = plantContext;
        }

        public Plant AddPlant(Plant plant)
        {
            plant.Status = "ok";
            plant.LastWateredTime = new DateTime();
            _plantContext.Add(plant);
            _plantContext.SaveChanges();
            return plant;
        }

        public bool DeletePlant(Plant plant)
        {
            try
            {
                _plantContext.Plants.Remove(plant);
                _plantContext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public Plant GetPlant(int plantId)
        {
            return _plantContext.Plants.Find(plantId);
        }

        public List<Plant> GetPlants()
        {
            return _plantContext.Plants.ToList();
        }

        public bool StopWateringPlant(int PlantId)
        {
            Plant plantObj = GetPlant(PlantId);
            if(plantObj.Status == "ok")
            {
                return false;
            }
            plantObj.Status = "ok";
            plantObj.LastWateredTime = (DateTime.Now);
            _plantContext.Plants.Update(plantObj);
            _plantContext.SaveChanges();
            return true;
        }

        public Plant UpdatePlant(Plant plant)
        {
            _plantContext.Plants.Update(plant);
            _plantContext.SaveChanges();
            return plant;
        }

        public bool WaterPlant(int plantId)
        {
            Plant plantObj = GetPlant(plantId);
            if (!CanWater(plantObj))
            {
                return false;
            }
            plantObj.Status = "busy";
            _plantContext.Plants.Update(plantObj);
            _plantContext.SaveChanges();
            return true;
        }

        public Boolean CanWater(Plant plant)
        {
            DateTime currentTime = DateTime.Now;
            Boolean timeOk = currentTime.Subtract(plant.LastWateredTime).TotalSeconds > 30;
            //System.Diagnostics.Debug.WriteLine("Current time: " + currentTime);
            //System.Diagnostics.Debug.WriteLine("Plant last watered time: " + plant.LastWateredTime);
            //System.Diagnostics.Debug.WriteLine("time diff: " + currentTime.Subtract(plant.LastWateredTime));
            //System.Diagnostics.Debug.WriteLine("time diff secs: " + currentTime.Subtract(plant.LastWateredTime).TotalSeconds);
            return   timeOk && plant.Status != "busy";
        }

    }
}
