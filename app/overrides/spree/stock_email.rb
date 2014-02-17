Deface::Override.new(
  :virtual_path => "spree/products/show",
  :name => "stock_email",
  :insert_after => "[data-hook='cart_form']",
  :partial => "spree/shared/stock_email",
  :disabled => false
)

Deface::Override.new(
  :virtual_path => "spree/products/_cart_form",
  :name => "product_variants",
  :replace => "#product-variants",
  :partial => "spree/shared/product_variants",
  :disabled => false
)
