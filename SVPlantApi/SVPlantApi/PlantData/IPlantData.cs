using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SVPlantApi.Models;

namespace SVPlantApi.PlantData
{
    public interface IPlantData
    {
        List<Plant> GetPlants();

        Plant GetPlant(int plantId);

        Plant AddPlant(Plant plant);

        Boolean DeletePlant(Plant plant);

        Plant UpdatePlant(Plant plant);

        Boolean WaterPlant(int plantId);

        Boolean StopWateringPlant(int PlantId);

        
    }
}
