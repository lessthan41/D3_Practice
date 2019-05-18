
  var Air, CarFlow;

// 0926
d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/Climate_Report/data/airdata_0926.csv', function (row) {
  return {
    NOx: +row['NOx(ppb)'],
    O3: +row['O3(ppb)'],
    NO: +row['NO(ppb)'],
    NO2: +row['NO2(ppb)'],
    BENZENE: +row['BENZENE(ppb)'],
    TOLUENE: +row['TOLUENE(ppb)'],
    ETHYLBENZENE: +row['ETHYLBENZENE(ppb)'],
    M_P_XYLENES: +row['M_P_XYLENES(ppb)'],
    O_XYLENE: +row['O_XYLENE(ppb)'],
    SO2: +row['SO2(ppb)'],
    PM25: +row['PM2.5(miug/m3)'],
    PM10: +row['PM10(miug/m3)'],
    NMHC: +row['NMHC(ppm)'],
    CO: +row['CO(ppm)'],
    CH4: +row['CH4(ppm)'],
    THC: +row['THC(ppm)']
  };
}).then(function (Airdata) {
  Air = Airdata;
});

d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/Climate_Report/data/CarFlow0926.csv', function (row) {
  return {
    CarSum: +row['carSum']
  };
}).then(function (CarFlowdata) {
  CarFlow = CarFlowdata;
});

let NOx = new Array();
let O3 = new Array();
let NO = new Array();
let NO2 = new Array();
let BENZENE = new Array();
let TOLUENE = new Array();
let ETHYLBENZENE = new Array();
let M_P_XYLENES = new Array();
let O_XYLENE = new Array();
let SO2 = new Array();
let PM25 = new Array();
let PM10 = new Array();
let NMHC = new Array();
let CO = new Array();
let CH4 = new Array();
let THC = new Array();

setTimeout(function() {
  for(var i in Air){
    NOx.push({ NOx: Air[i]['NOx'] });
    O3.push({ O3: Air[i]['O3'] });
    NO.push({ NO: Air[i]['NO'] });
    NO2.push({ NO2: Air[i]['NO2'] });
    BENZENE.push({ BENZENE: Air[i]['BENZENE'] });
    TOLUENE.push({ TOLUENE: Air[i]['TOLUENE'] });
    ETHYLBENZENE.push({ ETHYLBENZENE: Air[i]['ETHYLBENZENE'] });
    M_P_XYLENES.push({ M_P_XYLENES: Air[i]['M_P_XYLENES'] });
    O_XYLENE.push({ O_XYLENE: Air[i]['O_XYLENE'] });
    SO2.push({ SO2: Air[i]['SO2'] });
    PM25.push({ PM25: Air[i]['PM25'] });
    PM10.push({ PM10: Air[i]['PM10'] });
    NMHC.push({ NMHC: Air[i]['NMHC'] });
    CO.push({ CO: Air[i]['CO'] });
    CH4.push({ CH4: Air[i]['CH4'] });
    THC.push({ THC: Air[i]['THC'] });
  }



  let chart1 = new DashboardComponent(NOx, CarFlow, '#NOxChart_0926', 'ppb');
  let chart2 = new DashboardComponent(O3, CarFlow, '#O3Chart_0926', 'ppb');
  let chart3 = new DashboardComponent(NO, CarFlow, '#NOChart_0926', 'ppb');
  let chart4 = new DashboardComponent(NO2, CarFlow, '#NO2Chart_0926', 'ppb');
  let chart5 = new DashboardComponent(BENZENE, CarFlow, '#BENZENEChart_0926', 'ppb', 5);
  let chart6 = new DashboardComponent(TOLUENE, CarFlow, '#TOLUENEChart_0926', 'ppb', 10);
  let chart7 = new DashboardComponent(ETHYLBENZENE, CarFlow, '#ETHYLBENZENEChart_0926', 'ppb', 5);
  let chart8 = new DashboardComponent(M_P_XYLENES, CarFlow, '#M_P_XYLENESChart_0926', 'ppb', 5);
  let chart9 = new DashboardComponent(O_XYLENE, CarFlow, '#O_XYLENEChart_0926', 'ppb', 5);
  let chart10 = new DashboardComponent(SO2, CarFlow, '#SO2Chart_0926', 'ppb', 10);
  let chart11 = new DashboardComponent(PM25, CarFlow, '#PM25Chart_0926', 'μg/m3');
  let chart12 = new DashboardComponent(PM10, CarFlow, '#PM10Chart_0926', 'μg/m3');
  let chart13 = new DashboardComponent(NMHC, CarFlow, '#NMHCChart_0926', 'ppm', 5);
  let chart14 = new DashboardComponent(CO, CarFlow, '#COChart_0926', 'ppm', 5);
  let chart15 = new DashboardComponent(CH4, CarFlow, '#CH4Chart_0926', 'ppm', 10);
  let chart16 = new DashboardComponent(THC, CarFlow, '#THCChart_0926', 'ppm', 10);


  chart1.init();
  chart2.init();
  chart3.init();
  chart4.init();
  chart5.init();
  chart6.init();
  chart7.init();
  chart8.init();
  chart9.init();
  chart10.init();
  chart11.init();
  chart12.init();
  chart13.init();
  chart14.init();
  chart15.init();
  chart16.init();

}, 1000);
