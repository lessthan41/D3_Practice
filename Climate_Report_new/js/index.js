(function () {

  d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/Climate_Report/data/airdata_0905.csv', function (row) {
    return { // 0905
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
  }).then(function (Air0905) {

    d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/Climate_Report/data/CarFlow0905.csv', function (row) {
      return { // 0905
        CarSum: +row['carSum']
      };
    }).then(function (CarFlow0905) {

      d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/Climate_Report/data/airdata_0926.csv', function (row) {
        return { // 0926
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
      }).then(function (Air0926) {
        d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/Climate_Report/data/CarFlow0926.csv', function (row) {
          return { // 0926
            CarSum: +row['carSum']
          };
        }).then(function (CarFlow0926) {

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
          let NOx2 = new Array();
          let O32 = new Array();
          let NO_2 = new Array();
          let NO22 = new Array();
          let BENZENE2 = new Array();
          let TOLUENE2 = new Array();
          let ETHYLBENZENE2 = new Array();
          let M_P_XYLENES2 = new Array();
          let O_XYLENE2 = new Array();
          let SO22 = new Array();
          let PM252 = new Array();
          let PM102 = new Array();
          let NMHC2 = new Array();
          let CO2 = new Array();
          let CH42 = new Array();
          let THC2 = new Array();

          for(i=0; i<Air0905.length; i++){
            NOx.push({ NOx: Air0905[i]['NOx'] });
            O3.push({ O3: Air0905[i]['O3'] });
            NO.push({ NO: Air0905[i]['NO'] });
            NO2.push({ NO2: Air0905[i]['NO2'] });
            BENZENE.push({ BENZENE: Air0905[i]['BENZENE'] });
            TOLUENE.push({ TOLUENE: Air0905[i]['TOLUENE'] });
            ETHYLBENZENE.push({ ETHYLBENZENE: Air0905[i]['ETHYLBENZENE'] });
            M_P_XYLENES.push({ M_P_XYLENES: Air0905[i]['M_P_XYLENES'] });
            O_XYLENE.push({ O_XYLENE: Air0905[i]['O_XYLENE'] });
            SO2.push({ SO2: Air0905[i]['SO2'] });
            PM25.push({ PM25: Air0905[i]['PM25'] });
            PM10.push({ PM10: Air0905[i]['PM10'] });
            NMHC.push({ NMHC: Air0905[i]['NMHC'] });
            CO.push({ CO: Air0905[i]['CO'] });
            CH4.push({ CH4: Air0905[i]['CH4'] });
            THC.push({ THC: Air0905[i]['THC'] });
          }

          for(i=0; i<Air0926.length; i++){
            NOx2.push({ NOx: Air0926[i]['NOx'] });
            O32.push({ O3: Air0926[i]['O3'] });
            NO_2.push({ NO: Air0926[i]['NO'] });
            NO22.push({ NO2: Air0926[i]['NO2'] });
            BENZENE2.push({ BENZENE: Air0926[i]['BENZENE'] });
            TOLUENE2.push({ TOLUENE: Air0926[i]['TOLUENE'] });
            ETHYLBENZENE2.push({ ETHYLBENZENE: Air0926[i]['ETHYLBENZENE'] });
            M_P_XYLENES2.push({ M_P_XYLENES: Air0926[i]['M_P_XYLENES'] });
            O_XYLENE2.push({ O_XYLENE: Air0926[i]['O_XYLENE'] });
            SO22.push({ SO2: Air0926[i]['SO2'] });
            PM252.push({ PM25: Air0926[i]['PM25'] });
            PM102.push({ PM10: Air0926[i]['PM10'] });
            NMHC2.push({ NMHC: Air0926[i]['NMHC'] });
            CO2.push({ CO: Air0926[i]['CO'] });
            CH42.push({ CH4: Air0926[i]['CH4'] });
            THC2.push({ THC: Air0926[i]['THC'] });
          }

          let chart1 = new DashboardComponent(NOx, CarFlow0905, NOx2, CarFlow0926, '#NOxChart_0905', 'ppb');
          let chart2 = new DashboardComponent(O3, CarFlow0905, O32, CarFlow0926, '#O3Chart_0905', 'ppb');
          let chart3 = new DashboardComponent(NO, CarFlow0905, NO_2, CarFlow0926, '#NOChart_0905', 'ppb');
          let chart4 = new DashboardComponent(NO2, CarFlow0905, NO22, CarFlow0926, '#NO2Chart_0905', 'ppb');
          let chart5 = new DashboardComponent(BENZENE, CarFlow0905, BENZENE2, CarFlow0926, '#BENZENEChart_0905', 'ppb', 5);
          let chart6 = new DashboardComponent(TOLUENE, CarFlow0905, TOLUENE2, CarFlow0926, '#TOLUENEChart_0905', 'ppb', 20);
          let chart7 = new DashboardComponent(ETHYLBENZENE, CarFlow0905, ETHYLBENZENE2, CarFlow0926, '#ETHYLBENZENEChart_0905', 'ppb', 5);
          let chart8 = new DashboardComponent(M_P_XYLENES, CarFlow0905, M_P_XYLENES2, CarFlow0926, '#M_P_XYLENESChart_0905', 'ppb', 10);
          let chart9 = new DashboardComponent(O_XYLENE, CarFlow0905, O_XYLENE2, CarFlow0926, '#O_XYLENEChart_0905', 'ppb', 5);
          let chart10 = new DashboardComponent(SO2, CarFlow0905, SO22, CarFlow0926, '#SO2Chart_0905', 'ppb', 10);
          let chart11 = new DashboardComponent(PM25, CarFlow0905, PM252, CarFlow0926, '#PM25Chart_0905', 'μg/m3');
          let chart12 = new DashboardComponent(PM10, CarFlow0905, PM102, CarFlow0926, '#PM10Chart_0905', 'μg/m3');
          let chart13 = new DashboardComponent(NMHC, CarFlow0905, NMHC2, CarFlow0926, '#NMHCChart_0905', 'ppm', 5);
          let chart14 = new DashboardComponent(CO, CarFlow0905, CO2, CarFlow0926, '#COChart_0905', 'ppm', 5);
          let chart15 = new DashboardComponent(CH4, CarFlow0905, CH42, CarFlow0926, '#CH4Chart_0905', 'ppm', 10);
          let chart16 = new DashboardComponent(THC, CarFlow0905, THC2, CarFlow0926, '#THCChart_0905', 'ppm', 10);


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
        });
      });
    });
  });

})();
