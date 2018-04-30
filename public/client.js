// Build the chart
function calculateCurrentPercentages() {
    //determine the number of items
    const numItems = $('.asset-value').length;
    let total = 0;
    let percentages=[];
    //add up each value to get the total
    for(i = 0; i < numItems; i++) {
        total = parseInt(document.getElementsByClassName('asset-value')[i].value) + total;
    }
    //find the percentage of each asset and create an array
    for(i = 0; i < numItems; i++) {
        percentages.push(((document.getElementsByClassName('asset-value')[i].value)/total)*100);
    }
    return percentages;
}
currentPercentages = calculateCurrentPercentages();
console.log(currentPercentages);

//Create data for piechart
function createPieChartData() {
    //determine the number of items
    const numItems = $('.asset-name').length;
    const chartData = [];
    //create chart data objects
    for(i = 0; i < numItems; i++) {
        chartData.push(`name: ${document.getElementsByClassName('asset-name')[i].value}, y: ${currentPercentages[i]}`);
    }
    return chartData;
}
const chartData = createPieChartData();
console.log(chartData);

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
        data: chartData /*[{
            name: 'Vanguard Total Stock Market',
            y: 22,
        }, {
            name: 'Vanguard Total International',
            y: 38
        }, {
            name: 'Vanguard Total Bond Market',
            y: 12
        }, {
            name: 'Schwab U.S. REIT ETF',
            y: 20
        }, {
            name: 'Fidelity® Small Cap Growth Fund',
            y: 8
        }]*/
    }]
});
//when the page loads
$(document).ready(function () {
    //hide all the sections
    $('section').hide();
    $('#chart-container').hide();
    //show only landing page
    $('#landing-page').show();
/*    $('#portfolio-page').show();*/
});

$('#login-trigger').click(function(event) {
event.preventDefault();
    //hide all the sections
    $('section').hide();
    $('#chart-container').hide();
    //show only login page
    $('#login-page').show();
});

$('#sign-up-trigger').click(function(event) {
event.preventDefault();
    //hide all the sections
    $('section').hide();
    $('#chart-container').hide();
    //show only signup page
    $('#signup-page').show();
});

$('#sigup-form-login-trigger').click(function(event) {
event.preventDefault();
    //hide all the sections
    $('section').hide();
    $('#chart-container').hide();
    //show only login page
    $('#login-page').show();
});

$('#login-form-signup-trigger').click(function(event) {
event.preventDefault();
    //hide all the sections
    $('section').hide();
    $('#chart-container').hide();
    //show only signup page
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

    //validtae the input
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
                //hide all the sections
                $('section').hide();
                $('.body').removeClass();
                $('#chart-container').hide();
                $('footer').hide();
                //show only portfolio page
                $('#portfolio-page').show();
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
});

$('.analyze-button').click(function(event) {
event.preventDefault();
    $('#chart-container').show();
});

