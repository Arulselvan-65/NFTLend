"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    return (
      <Card className={className}>
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="h-[200px] md:h-[300px] w-full bg-gray-800/30 animate-pulse rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className={className}>
        <CardHeader className="space-y-1 md:space-y-2">
          {title && (
            <CardTitle className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-sm md:text-base text-gray-400">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="h-[200px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={data} 
                margin={isMobile ? 
                  { top: 5, right: 5, bottom: 20, left: 0 } : 
                  { top: 10, right: 30, bottom: 0, left: 10 }}
              >
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  strokeOpacity={0.1}
                  horizontal={!isMobile}
                  vertical={false}
                />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280" 
                  fontSize={isMobile ? 10 : 12}
                  tickMargin={isMobile ? 5 : 10}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 40 : 30}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <YAxis 
                  stroke="#6B7280" 
                  fontSize={isMobile ? 10 : 12}
                  tickMargin={isMobile ? 5 : 10}
                  width={isMobile ? 30 : 40}
                  tickCount={isMobile ? 5 : 7}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.8)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "8px",
                    padding: isMobile ? "8px" : "12px",
                  }}
                  itemStyle={{ 
                    color: "#E5E7EB",
                    fontSize: isMobile ? "10px" : "12px",
                    fontWeight: "500",
                  }}
                  labelStyle={{ 
                    color: "#9CA3AF",
                    fontSize: isMobile ? "10px" : "12px",
                    fontWeight: "600",
                  }}
                />
                <Area 
                  type="monotone"
                  dataKey="value"
                  stroke="url(#colorGradient)"
                  strokeWidth={isMobile ? 1.5 : 2}
                  fillOpacity={1}
                  fill="url(#areaGradient)"
                  dot={{
                    fill: "#8B5CF6",
                    strokeWidth: isMobile ? 1 : 2,
                    stroke: "#7C3AED",
                    r: isMobile ? 2 : 4
                  }}
                  activeDot={{
                    fill: "#8B5CF6",
                    strokeWidth: isMobile ? 1.5 : 2,
                    stroke: "#7C3AED",
                    r: isMobile ? 4 : 6
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActivityChart;