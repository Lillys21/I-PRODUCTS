$(document).ready(() => {
    const mercado = () => {
        $.ajax({
            url: `https://api.mercadolibre.com/sites/MLM/search?q=relojes%20y%20celulares`,
            type: 'GET',
            crossDomain: true,
            datatype: 'json',
            success: function (response) {
                console.log(response);
                for (var i = 0; i < response.results.length; i++) {
                    var photo = response.results[i].thumbnail;
                    console.log(photo);

                    var titleProduct = response.results[i].title;
                    var priceProduct = '$' + '' + response.results[i].price;
                    var averageOpinion = response.results[i].reviews.rating_average;
                    /*var av = averageOpinion.rating_average;*/
                    console.log(response.results[i].reviews);
                    var totalOpinion = `Average between ${response.results[i].reviews.total} opinions`;
                    console.log(totalOpinion);
                
                    var template = `
                                    <div class="col-sm-3">

                                      <div class="card">
                                        <img class="card-img" src="${photo}" alt="Card image cap">
                                        
                                        <h5 class="card-title" style= "font-size: 15px;">${titleProduct}</h5>
                                        <p class="card-text">${priceProduct}</p>
                                        <ul>
                                        <li class="d-inline"><i class="fas fa-star"></i></li>
                                        <li class="d-inline"><i class="fas fa-star"></i></li>
                                        <li class="d-inline"><i class="fas fa-star"></i></li>
                                        <li class="d-inline"><i class="fas fa-star"></i></li>
                                        <li class="d-inline"><i class="fas fa-star"></i></li>
                                        </ul>
                                        <button type="button" class="btn btn-primary opinionBtn" data-toggle="modal" data-target="#exampleModal" data-opinion= "${totalOpinion}" data-average="${averageOpinion}" >
                                            Opinion
                                        </button>
                                        
                                    </div>
                                    </div>
                                    `;

                    
                    $('#card-deck').append(template);
                    
                };
                
            }
        }).done((response) => {
            console.log(response);
            console.log(response.results["0"].thumbnail);

        });
    }
    $('#exampleModal').on('shown.bs.modal', function (event) {
        let totalOpinion = $(event.relatedTarget).data('opinion');
        let averageOpinion = $(event.relatedTarget).data('average');
        $('#average').html(averageOpinion);
        $('#opinion').html(totalOpinion);
      })
    mercado();
});


/*** PAYPAL MODULE ***/
paypal.Button.render({
    env: 'sandbox',
    client: {
      sandbox: 'demo_sandbox_client_id'
    },
    payment: function (data, actions) {
      return actions.payment.create({
        transactions: [{
          amount: {
            total: '0.01',
            currency: 'USD'
          }
        }]
      });
    },
    onAuthorize: function (data, actions) {
      return actions.payment.execute()
        .then(function () {
          window.alert('Thank you for your purchase!');
        });
    }
  }, '#paypal-button');