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

