import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';

function DashboardCard01({ className = "" }) {

  const chartData = {
    labels: [
      '12-01-2022',
      '01-01-2023',
      '02-01-2023',
      '03-01-2023',
      '04-01-2023',
      '05-01-2023',
      '06-01-2023',
      '07-01-2023',
      '08-01-2023',
      '09-01-2023',
      '10-01-2023',
      '11-01-2023',
      '12-01-2023',
      '01-01-2024',
      '02-01-2024',
      '03-01-2024',
      '04-01-2024',
      '05-01-2024',
      '06-01-2024',
      '07-01-2024',
      '08-01-2024',
      '09-01-2024',
      '10-01-2024',
      '11-01-2024',
      '12-01-2024',
      '01-01-2025',
    ],
    datasets: [
      // Indigo line
      {
        data: [732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192, 154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532],
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: adjustColorOpacity(getCssVariable('--color-violet-500'), 0) },
            { stop: 1, color: adjustColorOpacity(getCssVariable('--color-violet-500'), 0.2) }
          ]);
        },            
        borderColor: getCssVariable('--color-violet-500'),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable('--color-violet-500'),
        pointHoverBackgroundColor: getCssVariable('--color-violet-500'),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
      // Gray line
      {
        data: [532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234, 314, 314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642],
        borderColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        pointHoverBackgroundColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-center items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Battery Monitor</h2>
        </header>

        
      </div>

      {/* Area chart fleksibel: isi sisa tinggi card */}
      <div className="flex-1 min-h-0"> 
        {/* Biarkan chart mengikuti container, jangan hardcode width/height */}
        <LineChart
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
          className="w-full h-full"
          /* kalau komponen LineChart belum support className/style, bungkus canvas-nya di div `relative h-full` di dalamnya */
        />
      </div>
    </div>
  );
}

export default DashboardCard01;
