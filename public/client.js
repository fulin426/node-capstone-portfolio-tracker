function displayAssets(loggedInUser) {
    let result = $.ajax({
                /* update API end point */
                url: "/asset/get/"+ loggedInUser,
                dataType: "json",
                type: "GET"
            })
            .done(function (result) {               
                console.log(result);

                let buildTable = '';
                    buildTable += '<div class="results-header">';
                    buildTable += '<div class="header result-name">';
                    buildTable += '<p>Name</p>';
                    buildTable += '</div>';
                    buildTable += '<div class="header current-value">';
                    buildTable += '<p>Current Value $</p>';
                    buildTable += '</div>';
                    buildTable += '<div class="header current-percent">';
                    buildTable += '<p>Current %</p>';
                    buildTable += '</div>';
                    buildTable += '<div class="header target-percent">';
                    buildTable += '<p>Target %</p>';
                    buildTable += '</div>';
                    buildTable += '</div>';


                $.each(result, function (resulteKey, resulteValue) {
                    buildTable += '<div class="results-item">';
                    buildTable += '<div class="results-wrapper">';
                    buildTable += '<div class="item result-name">';
                    buildTable += '<input class="asset-name" value="' + resulteValue.name + '"></input>';
                    buildTable += '</div>';
                    buildTable += ' <div class="item current-value">';
                    buildTable += '<input class="asset-value" value="' + resulteValue.value + '"></input>';
                    buildTable += '</div>';
                    buildTable += ' <div class="item current-percent">';
                    buildTable += '<input class="result-number"></input>';
                    buildTable += '</div>';
                    buildTable += '<div class="item target-percent">';
                    buildTable += '<input class="target-number" value="' + resulteValue.target + '"></input>';
                    buildTable += '</div>';
                    buildTable += '</div>';
                    buildTable += '<div class="edit-delete-container">';
                    buildTable += '<button class="edit-delete" id="edit-button">Edit</button>';
                    buildTable += '<button class="edit-delete" id="delete-button">Delete</button>';
                    buildTable += '</div>';
                    buildTable += '</div>';
                });
                $('.results-container').html(buildTable);
                $('.edit-delete-container').hide();
            })
            /* if the call is NOT successful show errors */
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
}
//when the page loads
$(document).ready(function () {
    //hide all the sections
    $('section').hide();
    //hide pie chart
    $('#chart-container').hide();
    //hide edit and delete buttons
    $('.edit-delete-container').hide();
    //show only landing page
    $('#landing-page').show();
/*    $('#portfolio-page').show();*/
});

$('#login-trigger').click(function(event) {
event.preventDefault();
    $('section').hide();
    $('#chart-container').hide();
    $('.edit-delete-container').hide();
    $('#login-page').show();
});

$('#sign-up-trigger').click(function(event) {
event.preventDefault();
    $('section').hide();
    $('#chart-container').hide();
    $('.edit-delete-container').hide();    
    $('#signup-page').show();
});

$('#sigup-form-login-trigger').click(function(event) {
event.preventDefault();
    $('section').hide();
    $('#chart-container').hide();
    $('.edit-delete-container').hide();    
    $('#login-page').show();
});

$('#login-form-signup-trigger').click(function(event) {
event.preventDefault();
    $('section').hide();
    $('#chart-container').hide();
    $('.edit-delete-container').hide();
    $('#signup-page').show();
});
//signup form submission trigger
$("#signup-form").submit(function (event) { 
    event.preventDefault(); 
   

    //take the input from the user
    const email = $('#signup-email').val();
    const password = $('#signup-password').val();

    //validtae the input
        if (email === '') {
            alert('Please Add Valid Email');
        } else if (password === '') {
            alert('Please Add Valid Password');
        } 

        //if the input is valid
        else {
            //create a new user object
            const newUserObject = {
                email: email,
                password: password
            };
            console.log(newUserObject);
            // send the user object to the api call
            $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })

            //if the api call is succefull
            .done(function (result) {

                //display the results
                console.log(result);               
                //hide all the sections
                $('section').hide();
                $('#chart-container').hide();
                //show only login page
                $('#login-page').show();
            })
            //if the api call is NOT succefull
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
        };
});

$("#login-form").submit(function (event) { 
    event.preventDefault();
    
    //take the input from the user
    const email = $('#login-email').val();
    const password = $('#login-password').val();

    //validate the input
        if (email === '') {
            alert('Please Add Valid Email');
        } else if (password === '') {
            alert('Please Add Valid Password');
        } 

        //if the input is valid
        else {
            //create a login user object
            const loginUserObject = {
                email: email,
                password: password
            };
            console.log(loginUserObject);


            // send the user object to the api call
            $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: JSON.stringify(loginUserObject),
                contentType: 'application/json'
            })

            //if the api call is succefull
            .done(function (result) {

                //display the results
                console.log(result);
                //show user assets on login
                displayAssets(loginUserObject.email)              
                //hide all the sections
                $('section').hide();
                $('.body').removeClass();
                $('#chart-container').hide();
                $('footer').hide();
                //show only portfolio page and welcome user
                $('#portfolio-page').show();
                $('#welcome-user').text(`Welcome User ${result.email}`);
                $('.loggedin-user').val(result.email);
                
            })
            //if the api call is NOT succefull
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
        };
});

$("#add-asset").submit(function (event) { 
    event.preventDefault();
    console.log('adding asset');
    const addName = $('.name-input').val();
    const addValue = $('.value-input').val();
    const addTarget = $('.target-input').val();
    const loggedInUser = $('.loggedin-user').val();

    if (addName == "") {
        alert('Please add asset name');
    } 
    else if (addValue == "") {
        alert('Please add asset value');
    }
    else if (addTarget == "") {
        alert('Please add asset target');
    }
    else {
            const newAssetObject = {
                name: addName,
                value: addValue,
                target: addTarget,
                user: loggedInUser
            };
            console.log(newAssetObject);
            $.ajax({
                type: 'POST',
                url: '/asset/create',
                dataType: 'json',
                data: JSON.stringify(newAssetObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);
                alert('Asset added');
                displayAssets(loggedInUser);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
        }
});

// Build the chart
//MDN rounding function 
function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function calculateTotalTargets () {
    //determine the number of items
    const numItems = $('.target-number').length;
    let total = 0;
    for (i = 0; i < numItems; i++) {
        total = parseInt(document.getElementsByClassName('target-number')[i].value) + total;
    }
    //insert new calculated total into chart
    $('#total-targets').val(total);
    return total;
}
console.log(calculateTotalTargets());

function calculateTotalAssets () {
    //determine the number of items
    const numItems = $('.asset-value').length;
    let total = 0;
    for (i = 0; i < numItems; i++) {
        total = parseInt(document.getElementsByClassName('asset-value')[i].value) + total;
    }
    //insert new calculated total into chart
    $('#total-assets').val(total);
    return total;
}

function calculateCurrentPercentages() {
    const numItems = $('.asset-value').length;
    let total = calculateTotalAssets();
    let percentages=[];
    for(i = 0; i < numItems; i++) {
        percentages.push(((document.getElementsByClassName('asset-value')[i].value)/total)*100);
        percentages = percentages.map(a => precisionRound(a, 2));
    }
    return percentages;
}

//Create an array for objects for chartdata
function createPieChartData() {
    //determine the number of items
    const numItems = $('.asset-name').length;
    const chartData = [];
    const currentPercentages = calculateCurrentPercentages();
    //create chart data objects
    for(i = 0; i < numItems; i++) {
        chartData.push({name: document.getElementsByClassName('asset-name')[i].value, y: currentPercentages[i]});
    }
    return chartData;
}

//Analyze Button
$('.summary-container').on('click', '.analyze-button', function(event) {
    event.preventDefault();
    const chartData = createPieChartData();
    const loggedInUser = $('.loggedin-user').val();
    displayAssets(loggedInUser);
    calculateTotalTargets();
    calculateTotalAssets ();
    $('#chart-container').show();
    //Create Chart
    Highcharts.chart('chart-container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Portfolio Result'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Assets',
            colorByPoint: true,
            data: chartData
        }]
    });
});

//Toggle edit-delete buttons
$('.results-container').on('click', '.results-wrapper', function(event) {
    $(event.target).closest('.results-item').find('.edit-delete-container').toggle();
});

//Edit button
$('.results-container').on('click', '#edit-button', function(event) {
    event.preventDefault();
    console.log('editing asset');
    const newName = $(event.target).closest('.results-item').find('.asset-name').val();
    const newValue = $(event.target).closest('.results-item').find('.asset-value').val();
    const newTarget = $(event.target).closest('.results-item').find('.target-number').val();
    let assetId = event.target.parentNode.id;
    
    if (newName == "") {
        alert('Please add asset name');
    } 
    else if (newValue == "") {
        alert('Please add asset value');
    }
    else if (newTarget == "") {
        alert('Please add asset target');
    }
    else {
        const editAssetObject = {
        _id: assetId,
        name: newName,
        value: newValue,
        target: newTarget,
        };
        console.log(editAssetObject);
        
        $.ajax({
            type: 'PUT',
            url: `/asset/${assetId}`,
            dataType: 'json',
            data: JSON.stringify(editAssetObject),
            contentType: 'application/json'
        })
        .done(function (result) {
           console.log(result);
            alert('Asset edited');
            displayAssets(loggedInUser);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
    }
});

//delete button
$('.results-container').on('click', '#delete-button', function(event) {
    event.preventDefault();
    let assetId = event.target.parentNode.id;
    console.log(assetId);
    console.log('deleting item');

    $.ajax({
        type: 'DELETE',
        url: `/asset/delete/${assetId}`,
        success: displayAssets(),
    });
});
