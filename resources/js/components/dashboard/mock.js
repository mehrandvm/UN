const data = {
    'title': "National",
    'mapParams': {
        'layers': [
            {
                'type': 'bing',
                'url': 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'projection': 'EPSG:3857',
            },
            // {
            //     'type': 'tile',
            //     'url': 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            //     'projection': 'EPSG:3857',
            // },
            {
                'type': 'vector',
                'url': 'http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AOstan&outputFormat=application%2Fjson',
            },
            {
                'type': 'vector',
                'url': 'http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AShahrestan&outputFormat=application%2Fjson',
            },
            {
                'type': 'vector',
                'url': 'http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AK_Villages&outputFormat=application%2Fjson',
            },
            {
                'type': 'image',
                'url': 'http://194.5.188.215:8080/geoserver/wms',
                'params': {
                    'LAYERS': 'UN:K_Flood',
                },
                'serverType': 'geoserver',
            },
            {
                'type': 'image',
                'url': 'http://194.5.188.215:8080/geoserver/wms',
                'params': {
                    'LAYERS': 'UN:K_Seismic',
                },
                'serverType': 'geoserver',
            },
        ],
        'view': {
            'projection': 'EPSG:4326',
            'center': {
                'x': 53.6880,
                'y': 32.4279,
            },
            'zoom': '5',
        },
    },
    'rightCharts': {
        '0': {
            // 'title': 'All Stages',
            'type': 'pie',
            'dataset': {
                'Stage One': 15,
                'Stage Two': 35,
                'Stage Three': 30,
                'Stage Four': 20,
            },
        },
        '1': {
            // 'title': 'Stage One',
            'type': 'bar',
            'labels': [
                'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            ],
            'datasets': {
                'Stage One': [
                    15, 18, 20, 25, 30, 40, 45, 50, 55, 60, 70, 80,
                ],
            },
            'theme': 0,
        },
        '2': {
            // 'title': 'Stage Two',
            'type': 'bar',
            'labels': [
                'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            ],
            'datasets': {
                'Stage Two': [
                    15, 18, 20, 25, 30, 40, 45, 50, 55, 60, 70, 80,
                ],
            },
            'theme': 1,
        },
        '3': {
            // 'title': 'Stage Three',
            'type': 'bar',
            'labels': [
                'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            ],
            'datasets': {
                'Stage Three': [
                    15, 18, 20, 25, 30, 40, 45, 50, 55, 60, 70, 80,
                ],
            },
            'theme': 2,
        },
        '4': {
            // 'title': 'Stage Three',
            'type': 'bar',
            'labels': [
                'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            ],
            'datasets': {
                'Stage Four': [
                    15, 18, 20, 25, 30, 40, 45, 50, 55, 60, 70, 80,
                ],
            },
            'theme': 3,
        },
    },
    'bottomCharts': {
        '0': {
            // 'title': 'Stage One',
            'type': 'line',
            'labels': [
                'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            ],
            'datasets': {
                'Past Year Progress by Month': [
                    15, 18, 20, 25, 30, 40, 45, 50, 55, 60, 70, 80,
                ],
            },
            'theme': 0
        },
    },
};

export default data
