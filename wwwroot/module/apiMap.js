module.exports = [
    {
        link: '/searchline',
        url: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetLineListByLineName&',
        type: 'get',
        param: ['key']
    },
    {
        link: '/searchstation',
        url: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetStationNameList&',
        type: 'get',
        param: ['key']
    },
    {
        link: '/getlinewithstation',
        url: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetLineListByStationName&',
        type: 'get',
        param: ['key']
    },
    {
        link: '/getstationwithlist',
        url: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetStationList&',
        type: 'get',
        param: ['lineid']
    },
    {
        link: '/getbusonroad',
        url: 'http://www.zhbuswx.com/Handlers/BusQuery.ashx?handlerName=GetBusListOnRoad&',
        type: 'get',
        param: ['linename', 'fromstation']
    }
];
