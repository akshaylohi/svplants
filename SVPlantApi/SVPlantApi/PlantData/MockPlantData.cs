using SVPlantApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SVPlantApi.PlantData
{
    // Class to mock the data fetch without DB
    public class MockPlantData : IPlantData
    {
        private List<Plant> plants = new List<Plant>() {
            new Plant()
            {
                PlantId = 1,
                Name = "Plant 1",
                Status = "ok",
                LastWateredTime = new DateTime()
            },
            new Plant()
            {
                PlantId = 2,
                Name = "Plant 2",
                Status = "busy",
                LastWateredTime = new DateTime()
            }
        };

        public Plant AddPlant(Plant plant)
        {
            plant.PlantId = (new Random()).Next();
            plants.Add(plant);
            return plant;
        }

        public bool DeletePlant(Plant plant)
        {
            plants.Remove(plant);
            return true;
        }

        public Plant GetPlant(int plantId)
        {
            return plants.SingleOrDefault(x => x.PlantId == plantId);
        }

        public List<Plant> GetPlants()
        {
            return plants;
        }

        public Plant UpdatePlant(Plant plant)
        {
            Plant plantObj = GetPlant(plant.PlantId);
            plantObj.Name = plant.Name;
            plantObj.Status = plant.Status;
            plantObj.LastWateredTime = plant.LastWateredTime;
            return plantObj;
        }

        public bool WaterPlant(int plantId)
        {
            Plant plantObj = GetPlant(plantId);
            plantObj.Status = "busy";
            return true;
        }

        public bool StopWateringPlant(int plantId)
        {
            Plant plantObj = GetPlant(plantId);
            plantObj.Status = "ok";
            plantObj.LastWateredTime = (DateTime.Now);
            return true;
        }

        public Boolean CanWater(Plant plant)
        {
            return DateTime.Now.Subtract(plant.LastWateredTime).Seconds > 30;
        }
    }
}
