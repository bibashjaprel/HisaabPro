import { Text, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';

import { formatCurrency } from '@/lib/formatCurrency';

interface DonutItem {
  value: number;
  color: string;
  text: string;
}

interface BarItem {
  value: number;
  label: string;
}

interface ReportChartsProps {
  donutData: DonutItem[];
  barData: BarItem[];
  totalExpense: number;
}

export function ReportCharts({
  donutData,
  barData,
  totalExpense,
}: ReportChartsProps) {
  return (
    <View className="gap-4">
      <View className="rounded-[28px] border border-border/70 bg-card p-5 shadow-soft">
        <Text className="text-lg font-semibold text-textPrimary">Expense by Category</Text>
        <Text className="mt-1 text-sm text-textSecondary">
          A quick look at where your money is going.
        </Text>

        {donutData.length > 0 ? (
          <View className="mt-5 items-center">
            <PieChart
              data={donutData}
              donut
              radius={92}
              innerRadius={62}
              showText={false}
              focusOnPress
              strokeColor="#FFFFFF"
              strokeWidth={3}
              innerCircleColor="#FFFFFF"
              centerLabelComponent={() => (
                <View className="items-center">
                  <Text className="text-xs font-medium text-textSecondary">Total</Text>
                  <Text className="mt-1 text-base font-bold text-textPrimary">
                    {formatCurrency(totalExpense)}
                  </Text>
                </View>
              )}
            />

            <View className="mt-5 w-full gap-3">
              {donutData.map((item) => {
                const percentage =
                  totalExpense === 0 ? 0 : Math.round((item.value / totalExpense) * 100);

                return (
                  <View key={item.text} className="flex-row items-center justify-between">
                    <View className="flex-1 flex-row items-center pr-3">
                      <View
                        className="mr-3 h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <Text className="text-sm font-medium text-textPrimary">{item.text}</Text>
                    </View>

                    <View className="items-end">
                      <Text className="text-sm font-semibold text-textPrimary">
                        {formatCurrency(item.value)}
                      </Text>
                      <Text className="text-xs text-textSecondary">{percentage}%</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          <Text className="mt-4 text-sm text-textSecondary">No expense data yet.</Text>
        )}
      </View>

      <View className="rounded-[28px] border border-border/70 bg-card p-5 shadow-soft">
        <Text className="text-lg font-semibold text-textPrimary">Daily Expense</Text>
        <Text className="mt-1 text-sm text-textSecondary">
          Recent spending trend for the selected range.
        </Text>

        {barData.length > 0 ? (
          <View className="mt-5 overflow-hidden">
            <BarChart
              data={barData}
              frontColor="#16A34A"
              gradientColor="#22C55E"
              showGradient
              yAxisTextStyle={{ color: '#94A3B8', fontSize: 11 }}
              xAxisLabelTextStyle={{ color: '#94A3B8', fontSize: 11 }}
              xAxisColor="#E5E7EB"
              yAxisColor="#E5E7EB"
              rulesColor="#F1F5F9"
              spacing={18}
              initialSpacing={8}
              endSpacing={8}
              noOfSections={4}
              roundedTop
              barBorderTopLeftRadius={6}
              barBorderTopRightRadius={6}
              barWidth={16}
              width={290}
              maxValue={Math.max(...barData.map((item) => item.value)) * 1.2}
            />
          </View>
        ) : (
          <Text className="mt-4 text-sm text-textSecondary">No bar chart data available.</Text>
        )}
      </View>
    </View>
  );
}
