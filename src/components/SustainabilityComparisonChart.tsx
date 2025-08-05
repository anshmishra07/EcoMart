import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

export interface ComparisonProduct {
  name: string;
  version?: string;
  sustainabilityScore: number;
  type: 'current' | 'similar' | 'previous';
}

interface Props {
  data: ComparisonProduct[];
}

const getColor = (score: number) => {
  if (score >= 70) return '#22c55e'; // green-500
  if (score >= 40) return '#f59e42'; // orange-400
  return '#ef4444'; // red-500
};

const getTypeLabel = (type: string) => {
  if (type === 'current') return 'Current Product';
  if (type === 'similar') return 'Similar Product';
  if (type === 'previous') return 'Previous Version';
  return '';
};

const SustainabilityComparisonChart: React.FC<Props> = ({ data }) => {
  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');

  // Prepare data for chart
  const chartData = data.map((item) => ({
    ...item,
    label: item.version ? `${item.name} (${item.version})` : item.name,
    fill: item.type === 'current' ? '#2563eb' : getColor(item.sustainabilityScore), // blue-600 for current
    isCurrent: item.type === 'current',
  }));

  // Legend data
  const legendItems = [
    { label: 'Current Product', color: '#2563eb' },
    { label: 'Similar Product', color: '#22c55e' },
    { label: 'Previous Version', color: '#f59e42' },
    { label: 'Low Score', color: '#ef4444' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Sustainability Comparison</h3>
        <select
          className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={chartType}
          onChange={e => setChartType(e.target.value as 'bar' | 'radar')}
        >
          <option value="bar">Bar Chart</option>
          <option value="radar">Radar Chart</option>
        </select>
      </div>
      <div className="w-full h-72">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap={32}>
              <XAxis dataKey="label" tick={{ fontWeight: 500, fontSize: 13 }} interval={0} angle={-15} textAnchor="end" height={60} />
              <YAxis domain={[0, 100]} tick={{ fontWeight: 500, fontSize: 13 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-lg shadow text-sm border border-gray-100">
                      <div className="font-bold text-gray-800">{d.label}</div>
                      <div className="text-gray-600">Score: <span className="font-semibold">{d.sustainabilityScore}</span></div>
                      <div className="text-xs text-gray-400 mt-1">{getTypeLabel(d.type)}</div>
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: 13 }}
                payload={legendItems.map(item => ({
                  value: item.label,
                  type: 'circle',
                  color: item.color
                }))}
              />
              <Bar dataKey="sustainabilityScore" radius={[8, 8, 0, 0]} isAnimationActive>
                {chartData.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={entry.fill}
                    stroke={entry.isCurrent ? '#2563eb' : undefined}
                    strokeWidth={entry.isCurrent ? 3 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} outerRadius={90}>
              <PolarGrid />
              <PolarAngleAxis dataKey="label" tick={{ fontWeight: 500, fontSize: 13 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontWeight: 500, fontSize: 13 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded-lg shadow text-sm border border-gray-100">
                      <div className="font-bold text-gray-800">{d.label}</div>
                      <div className="text-gray-600">Score: <span className="font-semibold">{d.sustainabilityScore}</span></div>
                      <div className="text-xs text-gray-400 mt-1">{getTypeLabel(d.type)}</div>
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: 13 }}
                payload={legendItems.map(item => ({
                  value: item.label,
                  type: 'circle',
                  color: item.color
                }))}
              />
              <Radar
                name="Sustainability Score"
                dataKey="sustainabilityScore"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.3}
                isAnimationActive
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SustainabilityComparisonChart; 