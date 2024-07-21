import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { getPatients } from '../api/PatientsAPI';

export function DashboardSmallChart({ data, colors }) {
  const options = {
    chart: {
      id: 'basic-bar',
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 400,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 150,
        },
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div className="">' +
          'Total:' +
          ' ' +
          '<span className="font-semibold">' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        );
      },
    },
    grid: {
      show: true,
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
        distributed: false,
        borderRadius: 2,

      },
    },
    colors: [colors],
  };
  const series = [
    {
      name: 'series-1',
      data: data,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height={50}
    />
  );
}

export function DashboardBigChart() {
  const [dataPatient, setDataPatient] = useState([]);
  const [status, setStatus] = useState(false);

  // api - get patients
  const fetchPatients = async () => {
    const responseDataPatient = await getPatients();
    if (responseDataPatient.length === 0) {
      return
    }
    setDataPatient(responseDataPatient)
    setStatus(false)
  }

  const months = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

  const dynamicMonths = months.map((month) => {
    const monthData = dataPatient.filter((item) => {
      const date = new Date(item.createdAt);
      return date.getMonth() === parseInt(month);
    });
    return monthData.length
  });

  // dependencies
  useEffect(() => {
    fetchPatients()
  }, [status])

  const options = {
    chart: {
      locales: [{
        "name": "en",
        "options": {
          "months": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
          "shortMonths": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
          "days": ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
          "shortDays": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
          "toolbar": {
            "exportToSVG": "Baixar em SVG",
            "exportToPNG": "Baixar em PNG",
            "exportToCSV": "Baixar em CSV",
            "menu": "Opções",
            "selection": "Seleção",
            "selectionZoom": "Zoom Selecionado",
            "zoomIn": "Aproximar",
            "zoomOut": "Afastar",
            "pan": "Mover",
            "reset": "Voltar ao Início"
          }
        }
      }],
      defaultLocale: "en",
      id: 'area-datetime',
      toolbar: {
        show: true,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 800,
        },
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      labels: {
        show: true,
        style: {
          colors: '#A0A0A0',
          fontSize: '12px',
          fontWeight: 400,
        },
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          colors: '#A0A0A0',
          fontSize: '13px',
          fontWeight: 400,
        },
        formatter: function (value) {
          return value + '';
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      colors: undefined,
      strokeColors: ['#66B5A3', '#F9C851', '#34C759', '#FF3B30'],
      strokeWidth: 7,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3
      }
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="arrow_box bg-white py-2 px-2 text-xs border-[.5px] border-border">' +
          'Total: ' +
          '<span class="font-semibold">' +
          '' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        );
      },
      enabledOnSeries: {
        index: [0, 1, 2, 3],
      },
      shared: false,
      followCursor: false,
      intersect: false,
      inverseOrder: true,
      hideEmptySeries: false,
      fillSeriesColor: true,
      theme: false,
      marker: {
        show: true,
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
    },
    grid: {
      show: true,
      borderColor: '#E8EBEE',
      strokeDashArray: 4,
      position: 'back',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: ['#66B5A3', '#F9C851', '#34C759', '#FF3B30'],
    legend: {
      show: true,
      showForSingleSeries: true,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'bottom',
      horizontalAlign: 'left',
      floating: false,
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial',
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: function (val, opts) {
        return (
          '<span>' +
          '<span class="font-semibold">' +
          val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '' +
          '</span>' +
          '</span>'
        )
      },
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: true,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: false,
        radius: 12,
        customHTML: undefined,
        onClick: {
          toggleDataSeries: true,
        },
        offsetX: 0,
        offsetY: 0
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true
      },
    }
  };
  const series = [
    {
      index: 0,
      name: 'Pacientes',
      data: [dynamicMonths[0], dynamicMonths[1], dynamicMonths[2], dynamicMonths[3], dynamicMonths[4], dynamicMonths[5], dynamicMonths[6], dynamicMonths[7], dynamicMonths[8], dynamicMonths[9], dynamicMonths[10], dynamicMonths[11]],
    },
    {
      index: 1,
      name: 'Atendimentos',
      data: [6, 5, 2, 7, 6, 9, 8, 7, 4, 7, 8, 10],
    },
    {
      index: 2,
      name: 'Prescriptions',
      data: [3, 6, 3, 8, 4, 6, 9, 4, 5, 5, 4, 11],
    },
    {
      index: 3,
      name: 'Total Earnings',
      data: [4, 7, 4, 9, 5, 7, 10, 5, 6, 8, 10, 12],
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width="100%"
      height={300}
    />
  );
}
