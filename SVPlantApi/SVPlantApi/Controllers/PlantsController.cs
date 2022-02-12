using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SVPlantApi.PlantData;
using SVPlantApi.Models;

namespace SVPlantApi.Controllers
{
    
    [ApiController]
    public class PlantsController : ControllerBase
    {
        private IPlantData _plantData;

        public PlantsController(IPlantData plantData)
        {
            _plantData = plantData;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult GetPlants()
        {
            return Ok(_plantData.GetPlants());
        }

        [HttpGet]
        [Route("api/[controller]/{plantId}")]
        public IActionResult GetPlant(int plantId)
        {
            var plant = _plantData.GetPlant(plantId);
            if(plant != null)
            {
                return Ok(plant);
            }
            return NotFound("plant not found for given id");
            
        }

        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult AddPlant(Plant plant)
        {
            Plant plantReturn = _plantData.AddPlant(plant);
            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host +
                HttpContext.Request.Path + "/" + plantReturn.PlantId, plantReturn);

        }

        [HttpDelete]
        [Route("api/[controller]/{plantId}")]
        public IActionResult DeletePlant(int plantId)
        {
            var plant = _plantData.GetPlant(plantId);
            if(plant != null)
            {
                Boolean deleteResult = _plantData.DeletePlant(plant);
                if (deleteResult == true)
                {
                    return Ok();
                }
                return StatusCode(500);
                
            }
            return NotFound("Plant not found");
        }

        [HttpPatch]
        [Route("api/[controller]/{plantId}")]
        public IActionResult UpdatePlant(int plantId, Plant plantObj)
        {
            Plant plant = _plantData.GetPlant(plantId);
            if (plant != null)
            {
                plant.Name = plantObj.Name;
                Plant updatedPlant = _plantData.UpdatePlant(plant);
                return Ok(updatedPlant);
            }
            return NotFound("Plant not found");
        }

        [HttpGet]
        [Route("api/[controller]/water/{plantId}")]
        public IActionResult WaterPlant(int plantId)
        {
            var plant = _plantData.GetPlant(plantId);
            if (plant != null)
            {
                if (_plantData.WaterPlant(plantId))
                {
                    return Ok(_plantData.GetPlant(plantId));
                }
                
                return StatusCode(500);
            }
            return NotFound("Plant not found");
            
            
        }

        [HttpGet]
        [Route("api/[controller]/waterAll")]
        public IActionResult WaterPlants()
        {
            var plants = _plantData.GetPlants();
            Boolean okFlag = true;
            if (plants.Count != 0)
            {
                foreach(Plant plant in plants)
                {
                    okFlag = okFlag && _plantData.CanWater(plant);
                }
                if (okFlag)
                {
                    foreach(Plant plant in plants)
                    {
                        okFlag = _plantData.WaterPlant(plant.PlantId);
                    }
                }

                return (okFlag ? Ok(_plantData.GetPlants()) : StatusCode(500));
            }
            return NotFound("Plant not found");


        }

        [HttpGet]
        [Route("api/[controller]/stopWatering/{plantId}")]
        public IActionResult StopWateringPlant(int plantId)
        {
            var plant = _plantData.GetPlant(plantId);
            if (plant != null)
            {
                if (_plantData.StopWateringPlant(plantId))
                {
                    return Ok(_plantData.GetPlant(plantId));
                }
                return StatusCode(500);
            }
            return NotFound("Plant not found");


        }

        [HttpGet]
        [Route("api/[controller]/stopWaterAll")]
        public IActionResult StopWaterPlants()
        {
            var plants = _plantData.GetPlants();
            Boolean okFlag = true;
            if (plants.Count != 0)
            {
                foreach (Plant plant in plants)
                {
                    okFlag = _plantData.StopWateringPlant(plant.PlantId);
                }
                return (okFlag ? Ok(_plantData.GetPlants()) : StatusCode(500));
            }
            return NotFound("Plant not found");


        }
    }
}
