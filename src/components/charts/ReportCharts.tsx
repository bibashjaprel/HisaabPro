import { Text, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';

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
}

export function ReportCharts({ donutData, barData }: ReportChartsProps) {
  return (
    <View className="gap-4">
      <View className="rounded-2xl bg-card p-4 shadow-soft">
        <Text className="mb-3 text-base font-semibold text-textPrimary">Expense by Category</Text>
        {donutData.length > 0 ? (
          <PieChart
            data={donutData}
            donut
            radius={90}
            innerRadius={55}
            textColor="#111827"
            showText
            textSize={10}
            focusOnPress
            centerLabelComponent={() => (
              <View className="items-center">
                <Text className="text-xs text-textSecondary">Total</Text>
                <Text className="text-base font-bold text-textPrimary">
                  Rs {Math.round(donutData.reduce((sum, item) => sum + item.value, 0))}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text className="text-sm text-textSecondary">No expense data yet.</Text>
        )}
      </View>

      <View className="rounded-2xl bg-card p-4 shadow-soft">
        <Text className="mb-3 text-base font-semibold text-textPrimary">Daily Expense</Text>
        {barData.length > 0 ? (
          <BarChart
            data={barData}
            frontColor="#16A34A"
            yAxisTextStyle={{ color: '#6B7280' }}
            xAxisLabelTextStyle={{ color: '#6B7280' }}
            spacing={14}
            noOfSections={4}
            hideRules
            width={290}
            roundedTop
          />
        ) : (
          <Text className="text-sm text-textSecondary">No bar chart data available.</Text>
        )}
      </View>
    </View>
  );
}
