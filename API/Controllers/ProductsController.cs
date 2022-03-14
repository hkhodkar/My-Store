using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
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

        public async Task<ActionResult<Pagination<ProductDto>>> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountsSpecification(productParams);
            var totalItems = await _productRepository.CountAsync(countSpec);

            var products = await _productRepository.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDto>>(products);

            return Ok(new Pagination<ProductDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }


        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductDto>> GetProductById(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productRepository.GetEntityWithSpec(spec);

            if (product is null) return NotFound(new ApiResponse(404));

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
            return Ok(await _producTypetRepository.ListAllAsync());
        }
    }
}