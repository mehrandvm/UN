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
            'title': 'Palms infected',
            'type': 'bar',
            'labels': [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ],
            'datasets': {
                'RPW': [
                    15, 45, 65, 25, 35, 65, 25, 35, 55, 65, 45, 10,
                ],
                'RPW2': [
                    25, 35, 55, 65, 45, 10, 15, 45, 65, 25, 35, 65,
                ],
                'RPW3': [
                    15, 45, 65, 25, 45, 10, 35, 65, 25, 35, 55, 65,
                ],
                'RPW4': [
                    65, 45, 10, 15, 45, 65, 25, 35, 65, 25, 35, 55,
                ],
            },
        },
        '1': {
            'title': 'RPW Total',
            'type': 'bar',
            'labels': [
                'Bushehr', 'Fars', 'Hormozgan', 'Kerman', 'Khozestan', 'Sistan o balochistan',
            ],
            'datasets': {
                'RPW': [
                    15, 45, 65, 25, 35, 65, 25, 35, 55, 65, 45, 10,
                ],
                'RPW2': [
                    25, 35, 55, 65, 45, 10, 15, 45, 65, 25, 35, 65,
                ],
            },
        },
    },
};

export default data
