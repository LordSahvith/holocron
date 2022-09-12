const brandColors = {
    primary: [
        {name: 'Forrest', variable: 'forrest', hex: '0a3728', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Accessible Green', variable: 'accessible-green', hex: '168666', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Cricut Green', variable: 'cricut-green', hex: '00a977', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Shamrock', variable: 'shamrock', hex: 'b9dcc8', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Shamrock Light', variable: 'shamrock-light', hex: 'dcede3', contrastPairings: [{name:'black', hex:'000000'}]}
    ],
    neutral: [
        {name: 'Black', variable: 'black', hex: '000000', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Dark Gray', variable: 'dark-gray', hex: '555555', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Mid Gray', variable: 'mid-gray', hex: '949494', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Stone', variable: 'stone', hex: 'bebebe', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Light Gray', variable: 'light-gray', hex: 'e4e4e4', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Fog', variable: 'fog', hex: 'f0f0f0', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Alabaster', variable: 'alabaster', hex: 'fafafa', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'White', variable: 'white', hex: 'ffffff', contrastPairings: [{name:'black', hex:'000000'}]}
    ],
    secondary: [
        {name: 'Sky', variable: 'sky', hex: 'a5cdeb', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Ocean', variable: 'ocean', hex: '0f4bc3', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Indigo', variable: 'indigo', hex: '00237d', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Corn', variable: 'corn', hex: 'ffd25f', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Eggnog', variable: 'eggnog', hex: 'ffebc8', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Sand', variable: 'sand', hex: 'f0e6dc', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Sand Light', variable: 'sand-light', hex: 'fbf2e9', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Pale Pink', variable: 'pale-pink', hex: 'fac3be', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Salmon', variable: 'salmon', hex: 'eb786e', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Manderine', variable: 'manderine', hex: 'ff6432', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Orchid', variable: 'orchid', hex: '8c005a', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Dark Wood', variable: 'dark-wood', hex: '461e14', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Ginger Bread', variable: 'ginger-bread', hex: 'af783c', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Burnt Orange', variable: 'burnt-orange', hex: 'c75001', contrastPairings: [{name:'white', hex:'ffffff'}]}
    ],
    status: [
        {name: 'Error Dark', variable: 'error-dark', hex: '721515', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Error Medium', variable: 'error-medium', hex: 'aa0000', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Error Light', variable: 'error-light', hex: 'ffd3d3', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Warning Dark', variable: 'warning-dark', hex: 'af2e02', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Warning Medium', variable: 'warning-medium', hex: 'bd5b00', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Warning Light', variable: 'warning-light', hex: 'ffdbba', contrastPairings: [{name:'black', hex:'000000'}]},
        {name: 'Success Dark', variable: 'success-dark', hex: '244916', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Success Medium', variable: 'success-medium', hex: '23650c', contrastPairings: [{name:'white', hex:'ffffff'}]},
        {name: 'Success Light', variable: 'success-light', hex: 'd7e8d1', contrastPairings: [{name:'black', hex:'000000'}]}
    ],
    dim: [
        {name: 'Black Dim', variable: 'black-dim', hex: '000000', contrastPairings: [{name:'white', hex:'ffffff'}]},
    ]
};

const brandFonts = {
    euclid: {name: 'Euclid', variable: ''},
    gascogne: {name: 'Gascogne', variable: 'font-serif'}
};

module.exports = {
    brandColors: brandColors,
    brandFonts: brandFonts
};
