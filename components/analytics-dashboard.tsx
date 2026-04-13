'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Wallet, Zap, Users } from 'lucide-react';

const salesData = [
  { name: 'Mon', sales: 2400, earnings: 2.4 },
  { name: 'Tue', sales: 1398, earnings: 2.2 },
  { name: 'Wed', sales: 9800, earnings: 3.8 },
  { name: 'Thu', sales: 3908, earnings: 1.9 },
  { name: 'Fri', sales: 4800, earnings: 2.8 },
  { name: 'Sat', sales: 3800, earnings: 2.5 },
  { name: 'Sun', sales: 4300, earnings: 2.3 },
];

const portfolioData = [
  { name: 'Minted', value: 47, fill: '#00d9ff' },
  { name: 'Sold', value: 23, fill: '#b800ff' },
  { name: 'Held', value: 24, fill: '#ff006e' },
];

const COLORS = ['#00d9ff', '#b800ff', '#ff006e', '#00f5d4'];

const statCards = [
  {
    label: 'Total Earnings',
    value: '12.5',
    unit: 'ETH',
    icon: <Wallet className="w-5 h-5" />,
    color: 'from-cyan-400/20 to-cyan-400/5',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-400/30',
  },
  {
    label: 'NFTs Minted',
    value: '47',
    unit: '',
    icon: <Zap className="w-5 h-5" />,
    color: 'from-purple-400/20 to-purple-400/5',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-400/30',
  },
  {
    label: 'NFTs Sold',
    value: '23',
    unit: '',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'from-pink-400/20 to-pink-400/5',
    textColor: 'text-pink-400',
    borderColor: 'border-pink-400/30',
  },
  {
    label: 'Followers',
    value: '1.2K',
    unit: '',
    icon: <Users className="w-5 h-5" />,
    color: 'from-blue-400/20 to-blue-400/5',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-400/30',
  },
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`glass rounded-lg p-6 border ${stat.borderColor} bg-gradient-to-br ${stat.color}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.textColor}`}>{stat.icon}</div>
              <TrendingUp className={`w-4 h-4 ${stat.textColor}`} />
            </div>
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.textColor}`}>
              {stat.value}
              <span className="text-lg ml-1">{stat.unit}</span>
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-2 glass rounded-lg p-6"
        >
          <h3 className="text-lg font-bold mb-6">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,217,255,0.1)" />
              <XAxis stroke="rgba(148,163,184,0.5)" />
              <YAxis stroke="rgba(148,163,184,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(0,217,255,0.2)',
                  borderRadius: '8px',
                }}
                cursor={{ fill: 'rgba(0,217,255,0.1)' }}
              />
              <Bar dataKey="sales" fill="#00d9ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Portfolio Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="glass rounded-lg p-6 flex flex-col"
        >
          <h3 className="text-lg font-bold mb-6">Portfolio</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {portfolioData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Earnings Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="glass rounded-lg p-6"
      >
        <h3 className="text-lg font-bold mb-6">Earnings Trend (ETH)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,217,255,0.1)" />
            <XAxis stroke="rgba(148,163,184,0.5)" />
            <YAxis stroke="rgba(148,163,184,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(0,217,255,0.2)',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#b800ff"
              strokeWidth={3}
              dot={{ fill: '#b800ff', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
