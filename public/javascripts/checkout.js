//My own pb key
Stripe.setPublishableKey('pk_test_SjRmObEbJQ6dAkDwZs9dZHZq');
//Example pb key
// Stripe.setPublishableKey('pk_test_m6ZWLYyvkUAqJzr1fvr1uRj2');

$form = $('#checkout-form');

$form.submit(function(event) { //Fetch value from checkout form, after fetching data run stripeResponseHandler
  $form.find('button').prop('disabled', true);
  Stripe.card.createToken({
    number: $('#card-number').val(),
    cvc: $('#card-cvc').val(),
    exp_month: $('#card-expiry-month').val(),
    exp_year: $('#card-expiry-year').val(),
    name: $('#card-name').val(),
  }, stripeResponseHandler);
  return false;
});

function stripeResponseHandler(status, response) {
  if (response.error) {
    $('#charge-error').text(response.error.message);
    $form.find('button').prop('disabled', false);
  } else {
    var token = response.id;
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    $form.get(0).submit();
  }
}

