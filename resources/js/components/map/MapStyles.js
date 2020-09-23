import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";

export const stylePointDefault = new Style({
    image: new CircleStyle({
        radius: 5,
        fill: new Fill({color: '#FFFFFF'}),
        stroke: new Stroke({color: '#3399CC', width: 1.25}),
    }),
})

export const stylePoint0 = new Style({
    image: new CircleStyle({
        radius: 3,
        fill: new Fill({color: 'rgb(255,0,0)'}),
        stroke: new Stroke({color: '#000000', width: 0}),
    }),
})

export const stylePoint1 = new Style({
    image: new CircleStyle({
        radius: 3,
        fill: new Fill({color: 'rgb(255,133,0)'}),
        stroke: new Stroke({color: '#000000', width: 0}),
    }),
})

export const stylePoint2 = new Style({
    image: new CircleStyle({
        radius: 3,
        fill: new Fill({color: 'rgb(255,255,0)'}),
        stroke: new Stroke({color: '#000000', width: 0}),
    }),
})

export const stylePoint3 = new Style({
    image: new CircleStyle({
        radius: 3,
        fill: new Fill({color: 'rgb(133,255,0)'}),
        stroke: new Stroke({color: '#000000', width: 0}),
    }),
})

export const stylePoint4 = new Style({
    image: new CircleStyle({
        radius: 3,
        fill: new Fill({color: 'rgb(0,255,0)'}),
        stroke: new Stroke({color: '#000000', width: 0}),
    }),
})

export const styleDefault = new Style({
    fill: new Fill({
        color: 'rgb(255,255,255,0.6)'
    }),
    stroke: new Stroke({
        color: 'rgb(255,0,0,0.6)'
    })
})

export const style_selected = (text) => new Style({
    image: new CircleStyle({
        radius: 5,
        fill: new Fill({color: 'rgba(200,20,20,0.4)'}),
        stroke: new Stroke({color: 'rgba(200,20,20,0.8)', width: 1.25}),
    }),
    stroke: new Stroke({
        color: 'rgba(200,20,20,0.8)',
        width: 2,
    }),
    fill: new Fill({
        color: 'rgba(200,20,20,0.4)',
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: 'rgba(200,20,20,0.4)'
        }),
        stroke: new Stroke({
            color: 'rgba(200,20,20,0.8)',
            width: 0.1,
        })
    })
});

export const style0 = (text) => new Style({
    fill: new Fill({
        color: 'rgb(225,225,225,0)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const style0_alt = (text) => new Style({
    fill: new Fill({
        color: 'rgb(232,16,19,0.6)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const style1 = (text) => new Style({
    fill: new Fill({
        color: 'rgb(248,140,50,0.6)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const style2 = (text) => new Style({
    fill: new Fill({
        color: 'rgb(250,250,100,0.6)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const style3 = (text) => new Style({
    fill: new Fill({
        color: 'rgb(161,193,156,0.6)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const style4 = (text) => new Style({
    fill: new Fill({
        color: 'rgb(40,146,196,0.6)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const styleCircle0 = (text) => new Style({
    fill: new Fill({
        color: 'rgb(220,69,50,0.4)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const styleCircle1 = (text) => new Style({
    fill: new Fill({
        color: 'rgb(243,140,65,0.4)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const styleCircle2 = (text) => new Style({
    fill: new Fill({
        color: 'rgb(250,207,68,0.4)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const styleCircle3 = (text) => new Style({
    fill: new Fill({
        color: 'rgb(245,245,73,0.4)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const styleCircle4 = (text) => new Style({
    fill: new Fill({
        color: 'rgb(255,255,210,0.3)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const styleCircle5 = (text) => new Style({
    fill: new Fill({
        color: 'rgb(239,255,210,0.2)'
    }),
    stroke: new Stroke({
        color: 'rgb(0,0,0,0.6)'
    }),
    text: new Text({
        text: text,
        scale: 1,
        fill: new Fill({
            color: '#000000'
        }),
        stroke: new Stroke({
            color: 'rgb(0,0,0,0.6)',
            width: 0.1,
        })
    })
})

export const stylePoint_selected = new Style({
    image: new CircleStyle({
        radius: 5,
        fill: new Fill({color: 'rgb(255,100,255,0.6)'}),
        stroke: new Stroke({color: 'rgb(0,0,0,0.6)', width: 1.25}),
    }),
})
