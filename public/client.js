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
    const email = $('#signup-email').val();
    const password = $('#signup-password').val();
        if (email === '') {
            alert('Please Add Valid Email');
        } else if (password === '') {
            alert('Please Add Valid Password');
        } else {
            const newUserObject = {
                email: email,
                password: password
            };
            console.log(newUserObject);
            // will assign a value to variable 'user' in signin step below
            // AJAX call to send form data up to server/DB and create new user
            $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                console.log(result);               
               /* newUserToggle = true;
                alert('Thanks for signing up! You may now sign in with your username and password.');
                showSignInPage();*/
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
        };
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



