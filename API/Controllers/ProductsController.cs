using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {

        private readonly IGenericRepository<Product> _productRepository;
        private readonly IGenericRepository<ProductBrand> _productBrandRepository;
        private readonly IGenericRepository<ProductType> _producTypetRepository;

        private readonly IMapper _mapper;

        public ProductsController(
                                    IMapper mapper,
                                    IGenericRepository<Product> productRepository,
                                    IGenericRepository<ProductBrand> productBrandRepository,
                                    IGenericRepository<ProductType> producTypetRepository
                                 )
        {
            _mapper = mapper;
            _productRepository = productRepository;
            _producTypetRepository = producTypetRepository;
            _productBrandRepository = productBrandRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductDto>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();
            var products = await _productRepository.ListAsync(spec);

            return Ok(_mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductDto>>(products));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProductById(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productRepository.GetEntityWithSpec(spec);

            return Ok(_mapper.Map<Product, ProductDto>(product));

        }

        [HttpGet("GetPrductBrands")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productBrandRepository.ListAllAsync());
        }

        [HttpGet("GetPrductTypes")]
        public async Task<ActionResult<List<ProductType>>> GetPrductTypes()
        {
            return Ok(await _productBrandRepository.ListAllAsync());
        }
    }
}