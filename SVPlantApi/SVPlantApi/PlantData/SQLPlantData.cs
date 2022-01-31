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

        static Boolean CanWater(Plant plant)
        {
            Boolean timeOk = DateTime.Now.Subtract(plant.LastWateredTime).Seconds > 30;
            return   timeOk && plant.Status != "busy";
        }

    }
}
