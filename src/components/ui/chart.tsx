
import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

interface ChartConfig {
  [key: string]: {
    theme: {
      light: string;
      dark: string;
    };
  };
}

interface ChartContextValue {
  config: ChartConfig;
}

const ChartContext = createContext<ChartContextValue | undefined>(undefined);

export function ChartContainer({
  children,
  config,
  className,
}: {
  children: React.ReactNode;
  config: ChartConfig;
  className?: string;
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn('w-full h-full', className)}>{children}</div>
    </ChartContext.Provider>
  );
}

export function ChartTooltip({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        'border rounded-md bg-background p-2 shadow-md text-sm text-foreground',
        className
      )}
    >
      {children}
    </div>
  );
}

export function ChartTooltipContent({ active, payload, label }: any) {
  const context = useContext(ChartContext);

  if (!active || !payload || !context) {
    return null;
  }

  return (
    <ChartTooltip>
      <div className="font-medium mb-2">{label}</div>
      <div className="space-y-1">
        {payload.map((item: any, index: number) => {
          const dataKey = item.dataKey;
          const color = context.config[dataKey]?.theme.light || item.color;

          return (
            <div key={index} className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs">{item.name}:</span>
              </div>
              <span className="font-medium">{item.value}</span>
            </div>
          );
        })}
      </div>
    </ChartTooltip>
  );
}
