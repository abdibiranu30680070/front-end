import React, { useState, useEffect } from 'react';
import { fetchSystemStats } from '../api/api';
import { Tooltip, PieChart, Pie } from 'recharts';
import '../styles/adminanalytcs.css';

const SystemAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchSystemStats();
        console.log("Fetched stats:", data); // Debugging log
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch system stats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <div>Loading statistics...</div>;
  if (!stats) return <div>Error loading statistics.</div>;

  // Check the structure of stats to debug the data
  console.log("System stats:", stats);

  // Ensure roleDistribution is an array with valid count data
  const roleDistribution = stats.roleDistribution?.map(entry => ({
    role: entry.role,
    count: entry._count?.role || 0, // Ensure correct key inside _count
  })) || [];

  if (roleDistribution.length === 0) {
    return <div>No role data available.</div>;
  }
  console.log("Role distribution for PieChart:", roleDistribution); 
  return (
    <div className="analytics-container">
      <h2>System Analytics</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers ?? 0}</p> {/* Default to 0 if undefined */}
        </div>
        
        <div className="stat-card">
          <h3>Active Patients</h3>
          <p>{stats.activePatients ?? 0}</p> {/* Active patients from the backend */}
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h4>User Roles</h4>
          <PieChart width={500} height={400}>  {/* Adjusted width and height */}
            <Pie
              data={roleDistribution}
              dataKey="count"
              nameKey="role"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
