//= require store/spree_frontend
var $notify_div;
var $cart_div;
var $variant_stock;

$(function() {
  $notify_div = $('div#notify_stock');
  $cart_div = $('div.add-to-cart');
  $variant_stock = $('#variant_in_stock');

  toggleNotify($variant_stock.val());

  // atualizar link ou variant_id do formulário para notificar variação corretamente
  var $variant_selector = $('#product-variants').find(':radio');
  $variant_selector.click(function(event) {
    var $link = $('a#notify_me');
    var $variant_input = $('#stock_email_variant');
    $variant_stock.val($(this).data('stock'));

    if ($variant_stock.val() == 'false') {
      if ($link.length > 0) {
        var newUrl = $('#base_url').val();
        newUrl = newUrl + $(this).val();
        $link.attr('href', newUrl);
      }
      else if ($variant_input.length > 0) {
        $variant_input.val($(this).val());
      }
    }

    toggleNotify($variant_stock.val());
  });

  $variant_selector.filter(':checked').trigger("click");
});

// torna formulário para notificação em estoque disponível ou não
function toggleNotify(visible) {
  if (visible == 'false') {
    $notify_div.show();
    $cart_div.hide();
  }
  else {
    $notify_div.hide();
    $cart_div.show();
  }
};