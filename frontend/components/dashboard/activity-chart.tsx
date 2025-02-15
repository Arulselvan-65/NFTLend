"use client"

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/CustomCard";

interface ActivityData {
  name: string;
  value: number;
}

interface ActivityChartProps {
  data: ActivityData[];
  title?: string;
  description?: string;
  className?: string;
}

const ActivityChart = ({ data, title, description, className }: ActivityChartProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className={className}>
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-gray-800/30 animate-pulse rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        {title && (
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
            {title}
          </CardTitle>
        )}
        {description && (
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="#6B7280" 
                fontSize={12}
                tickMargin={10}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={12}
                tickMargin={10}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "rgba(17, 24, 39, 0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "12px",
                  padding: "12px",
                }}
                itemStyle={{ 
                  color: "#E5E7EB",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
                labelStyle={{ 
                  color: "#9CA3AF",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              />
              <Area 
                type="monotone"
                dataKey="value"
                stroke="#8B5CF6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#areaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
