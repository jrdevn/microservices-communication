package br.com.productapi.productapi.modules.product.service;

import br.com.productapi.productapi.config.exception.SuccessResponse;
import br.com.productapi.productapi.config.exception.ValidationException;
import br.com.productapi.productapi.modules.category.dto.CategoryResponse;
import br.com.productapi.productapi.modules.category.model.Category;
import br.com.productapi.productapi.modules.category.service.CategoryService;
import br.com.productapi.productapi.modules.product.dto.ProductRequest;
import br.com.productapi.productapi.modules.product.dto.ProductResponse;
import br.com.productapi.productapi.modules.product.model.Product;
import br.com.productapi.productapi.modules.product.repository.ProductRepository;
import br.com.productapi.productapi.modules.product.dto.ProductRequest;
import br.com.productapi.productapi.modules.product.dto.ProductResponse;
import br.com.productapi.productapi.modules.product.repository.ProductRepository;
import br.com.productapi.productapi.modules.supplier.dto.SupplierRequest;
import br.com.productapi.productapi.modules.supplier.dto.SupplierResponse;
import br.com.productapi.productapi.modules.supplier.model.Supplier;
import br.com.productapi.productapi.modules.supplier.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.util.ObjectUtils.isEmpty;


@Service
public class ProductService {

    private static final Integer ZERO = 0;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private CategoryService categoryService;

    public List<ProductResponse> findByName(String name) {
        if (isEmpty(name)) {
            throw new ValidationException("The product name must be informed!");
        }
        return productRepository
                .findByName(name)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> findAll() {
        return productRepository
                .findAll()
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public ProductResponse findByIdResponse(Integer id) {
        return ProductResponse.of(findById(id));
    }

    public Product findById(Integer id) {
        if (isEmpty(id)) {
            throw new ValidationException("The product Id was not informed");
        }
        return productRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Product not found!"));
    }

    public List<ProductResponse> findBySupplierId(Integer supplierId) {
        if (isEmpty(supplierId)) {
            throw new ValidationException("The supplier Id must be informed!");
        }
        return productRepository
                .findBySupplierId(supplierId)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> findByCategoryId(Integer categoryId) {
        if (isEmpty(categoryId)) {
            throw new ValidationException("The category Id must be informed!");
        }
        return productRepository
                .findByCategoryId(categoryId)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public ProductResponse save(ProductRequest productRequest) {
        validateProductDataInformed(productRequest);
        validateCategoryAndSupplierId(productRequest);
        var category = categoryService.findById(productRequest.getCategoryId());
        var supplier = supplierService.findById(productRequest.getSupplierId());
        var product = productRepository.save(Product.of(productRequest, supplier, category));
        return ProductResponse.of(product); // irá retornar o product response conforme o produto salvo no banco.
    }

    private void validateProductDataInformed(ProductRequest productRequest) {
        if (isEmpty(productRequest.getName())) {
            throw new ValidationException("The product name was not informed!");
        }

        if (isEmpty(productRequest.getQuantityAvailable())) {
            throw new ValidationException("The quantity was not informed!");
        }

        if ((productRequest.getQuantityAvailable()) <= ZERO) {
            throw new ValidationException("The quantity should not be less or equal to zero!");
        }
    }

    private void validateCategoryAndSupplierId(ProductRequest productRequest) {
        if (isEmpty(productRequest.getCategoryId())) {
            throw new ValidationException("The category id was not informed!");
        }

        if (isEmpty(productRequest.getSupplierId())) {
            throw new ValidationException("The supplier id was not informed!");
        }
    }

    public Boolean existsByCategoryId(Integer categoryId) {
        return productRepository.existsByCategoryId(categoryId);
    }

    public Boolean existsBySupplierId(Integer supplierId) {
        return productRepository.existsBySupplierId(supplierId);
    }

    public SuccessResponse delete(Integer id) {
        validateInformedId(id);
        productRepository.deleteById(id);
        return SuccessResponse.create("The product was deleted!");
    }

    private void validateInformedId(Integer id) {
        if (isEmpty(id)) {
            throw new ValidationException("The Product Id must be informed!");
        }
    }

    public ProductResponse update(ProductRequest productRequest, Integer id) {
        validateProductDataInformed(productRequest);
        validateCategoryAndSupplierId(productRequest);
        validateInformedId(id);
        var category = categoryService.findById(productRequest.getCategoryId());
        var supplier = supplierService.findById(productRequest.getSupplierId());
        var product = Product.of(productRequest, supplier, category);
        product.setId(id);
        productRepository.save(product);
        return ProductResponse.of(product);
    }

}
