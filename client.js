// Build the chart
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
        data: [{
            name: 'Vanguard Total Stock Market',
            y: 22,
/*            sliced: true,
            selected: true*/
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
        }]
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
    //hide all the sections
    $('section').hide();
    $('#chart-container').hide();
    //show only login page
    $('#login-page').show();
});

$("#login-form").submit(function (event) { 
    event.preventDefault();
    //hide all the sections
    $('section').hide();
    $('.body').removeClass();
    $('#chart-container').hide();
    $('footer').hide();
    //show only portfolio page
    $('#portfolio-page').show();
});

$("#add-asset").submit(function (event) { 
    event.preventDefault();
    console.log('adding asset');
});

$('.analyze-button').click(function(event) {
event.preventDefault();
    $('#chart-container').show();
});



