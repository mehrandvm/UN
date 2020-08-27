const data = {
    'title': "National",
    'mapParams': {
        'layers': [
            {
                'type': 'tile',
                'url': 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'projection': 'EPSG:3857',
            },
            {
                'type': 'image',
                'url': 'http://194.5.195.33:8080/geoserver/wms',
                'params': {
                    'LAYERS': 'Agri:shahrestan',
                },
                'serverType': 'geoserver',
            },
            {
                'type': 'image',
                'url': 'http://194.5.195.33:8080/geoserver/wms',
                'params': {
                    'LAYERS': 'Agri:RedPalm',
                },
                'serverType': 'geoserver',
            },
        ],
        'view': {
            'projection': 'EPSG:4326',
            'center': {
                'x': 55.3825708,
                'y': 28.7258838,
            },
            'zoom': '6',
        },
    },
    'rightCharts': {
        '0': {
            // 'title': 'Stage One',
            'type': 'bar',
            'labels': [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ],
            'datasets': {
                'Stage One': [
                    15, 18, 20, 25, 30, 40, 45, 50, 55, 60, 70, 80,
                ],
            },
        },
        '1': {
            // 'title': 'Stage Two',
            'type': 'bar',
            'labels': [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ],
            'datasets': {
                'Stage Two': [
                    15, 18, 20, 25, 30, 40, 45, 50, 55, 60, 70, 80,
                ],
            },
        },
        '2': {
            // 'title': 'Stage Three',
            'type': 'bar',
            'labels': [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ],
            'datasets': {
                'Stage Three': [
                    15, 18, 20, 25, 30, 40, 45, 50, 55, 60, 70, 80,
                ],
            },
        },
        '3': {
            'title': 'All Stages',
            'type': 'pie',
            'dataset': {
                'Stage One': 15,
                'Stage Two': 35,
                'Stage Three': 30,
                'Stage Four': 20,
            },
        },
    },
    'bottomCharts': {
        '0': {
            // 'title': 'Stage One',
            'type': 'bar',
            'labels': [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ],
            'datasets': {
                'Past Year Progress by Month': [
                    15, 18, 20, 25, 30, 40, 45, 50, 55, 60, 70, 80,
                ],
            },
        },
    },
};

export default data
