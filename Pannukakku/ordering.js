

    const typeChoosing = document.getElementById('type');
    const toppingChoosing = document.querySelectorAll('.topping');
    const extraChoosing = document.querySelectorAll('.extra');
    const deliveryChoosing = document.querySelectorAll('.delivery');    
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');
    const totalPriceBanner = document.getElementById('totalPriceBanner');
    const pancakeForm = document.getElementById('pancakeForm');
   
    


    function calculateTotal() {
        // Base choosing
        let total = parseFloat(typeChoosing.options[typeChoosing.selectedIndex].getAttribute('data-price'));
    

        //topping add :
        toppingChoosing.forEach(function (checkbox) {
            if (checkbox.checked) {
                total += parseFloat(checkbox.getAttribute('data-price'));
            }
        });

        // Extra adding:
        extraChoosing.forEach(function (checkbox) {
            if (checkbox.checked) {
                total += parseFloat(checkbox.getAttribute('data-price'));
            }
        });
        
        //Delivery Fee Adding:
        const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
    
        if (selectedDelivery) {
        total += parseFloat(selectedDelivery.getAttribute('data-price'));
        }
        
        
        // Updating total price:

    totalPriceDisplay.textContent = `${total}€`;
    totalPriceBanner.textContent = `${total}€`;

    totalPriceBanner.classList.add('animate-price');

    setTimeout(function () {
        totalPriceBanner.classList.remove('animate-price');
        }, 300);
        }
        
    //pancake form:
    pancakeForm.addEventListener('change', function(event){
            if (event.target.matches('select, input')) {
                calculateTotal();
            }
    });


    const seeOrderButton = document.getElementById('seeOrder');
    const summaryBox = document.getElementById('summaryText');

    seeOrderButton.addEventListener('click', function(){

    // taking the customer's name
    const name = document.getElementById('customerName').value;
        

    // selected pancake
    const selectedType = typeChoosing.options[typeChoosing.selectedIndex].text;



    //selected topping
    const selectedToppings =[];
    toppingChoosing.forEach(function (checkbox){
        if (checkbox.checked){
            selectedToppings.push(checkbox.parentElement.textContent);
            }
    });

    // selected extras
    const selectedExtras =[];
    extraChoosing.forEach(function (checkbox){
        if (checkbox.checked){
            selectedExtras.push(checkbox.parentElement.textContent);
        }
    });


    // selected delivery method
    const selectedDelivery = document.querySelector('input[name="delivery"]:checked').parentElement.textContent;



    // final price show:
    const total = totalPriceDisplay.textContent;



    //summary
    const summary = [
    "Nimi: " + (name.length > 0 ? name : "-"),
    "Tyyppi: " + selectedType,
    "Täytteet: " + (selectedToppings.length > 0 ? selectedToppings.join(', ') : "-"),
    "Lisukkeet: " + (selectedExtras.length > 0 ? selectedExtras.join(', ') : "-"),
    "Toimitus: " + selectedDelivery,
    "Hinta: " + total,
    
     ];

    // Update the page with the summary immediately
    summaryBox.innerHTML = summary.join('<br>');

    history.pushState({ view: 'summary' }, '', '#summary');






    // order objects:
    const order = {
        id : Date.now(),
        customerName:name.length > 0 ? name: "-",
        selectedPancake: selectedType,
        toppings: selectedToppings,
        extras:selectedExtras,
        deliveryMethod: selectedDelivery,
        totalPrice: total,
        status: "Waiting"
    };

    // save to localStorage:
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));



     // Use setTimeout to ensure the alert and page update together
     setTimeout(function() {
        alert(summary.join('\n'));
    }, 0); // This will execute immediately after the page update

});
